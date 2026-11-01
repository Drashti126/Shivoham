import fs from "fs";
import path from "path";
import { Product, Order, Customer, CustomerAddress } from "@/types";
import { ALL_PRODUCTS } from "@/data/sampleProducts";

export interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  customers?: Customer[];
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "database.json");
const TMP_PATH = path.join("/tmp", "shivoham_database.json");

// In-memory runtime cache for serverless lifecycle
let cachedDb: Required<DatabaseSchema> | null = null;
let isCloudSynced = false;

// KV Cloud Configuration (Vercel KV or Upstash Redis REST)
function getKvConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    return { url: url.replace(/\/$/, ""), token };
  }
  return null;
}

// Initial seed data generator
function getSeededData(): Required<DatabaseSchema> {
  const seededProducts: Product[] = ALL_PRODUCTS.map((p) => ({
    ...p,
    isPublished: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return {
    products: seededProducts,
    orders: [],
    customers: [],
  };
}

// Ensure DB exists and is seeded in memory / disk
export function initDb(): Required<DatabaseSchema> {
  if (cachedDb) {
    return cachedDb;
  }

  // 1. Try reading from primary local database.json
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      cachedDb = {
        products: Array.isArray(parsed.products) ? parsed.products : [],
        orders: Array.isArray(parsed.orders) ? parsed.orders : [],
        customers: Array.isArray(parsed.customers) ? parsed.customers : [],
      };
      return cachedDb;
    }
  } catch (err) {
    console.warn("Could not read from primary database file:", err);
  }

  // 2. Try reading from /tmp fallback (on serverless instances)
  try {
    if (fs.existsSync(TMP_PATH)) {
      const raw = fs.readFileSync(TMP_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      cachedDb = {
        products: Array.isArray(parsed.products) ? parsed.products : [],
        orders: Array.isArray(parsed.orders) ? parsed.orders : [],
        customers: Array.isArray(parsed.customers) ? parsed.customers : [],
      };
      return cachedDb;
    }
  } catch {
    // Continue to seed
  }

  // 3. Seed initial database
  const initialData = getSeededData();
  cachedDb = initialData;

  // Attempt to write seeded data to disk if writable
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf-8");
  } catch {
    // Read-only filesystem (e.g. Vercel Lambda) - write to /tmp
    try {
      fs.writeFileSync(TMP_PATH, JSON.stringify(initialData, null, 2), "utf-8");
    } catch {
      // In-memory only
    }
  }

  return cachedDb;
}

// Asynchronously pull from Vercel KV / Upstash if configured
export async function syncWithCloudDb(): Promise<void> {
  const kv = getKvConfig();
  if (!kv || isCloudSynced) return;

  try {
    const res = await fetch(`${kv.url}/get/shivoham_db`, {
      headers: { Authorization: `Bearer ${kv.token}` },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.result) {
        const parsed = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
        if (parsed && Array.isArray(parsed.products)) {
          cachedDb = {
            products: parsed.products,
            orders: Array.isArray(parsed.orders) ? parsed.orders : [],
            customers: Array.isArray(parsed.customers) ? parsed.customers : [],
          };
          isCloudSynced = true;
          return;
        }
      }
    }

    // If cloud KV is empty, seed it with our current database
    if (cachedDb) {
      await pushToCloudDb(cachedDb);
      isCloudSynced = true;
    }
  } catch (err) {
    console.error("Cloud DB sync failed:", err);
  }
}

// Push to Vercel KV / Upstash in background
async function pushToCloudDb(data: DatabaseSchema): Promise<void> {
  const kv = getKvConfig();
  if (!kv) return;

  try {
    await fetch(`${kv.url}/set/shivoham_db`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kv.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSON.stringify(data)),
    });
  } catch (err) {
    console.error("Failed to push data to cloud KV:", err);
  }
}

export function writeDb(data: DatabaseSchema): void {
  // Always update in-memory cache first
  cachedDb = {
    products: data.products || [],
    orders: data.orders || [],
    customers: data.customers || [],
  };

  // Try writing to primary DB_PATH (local development)
  let writeSucceeded = false;
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    const tempPath = `${DB_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempPath, DB_PATH);
    writeSucceeded = true;
  } catch (localErr: any) {
    // On Vercel serverless, process.cwd() is read-only (EROFS).
    // Write to /tmp so other functions in the same warm lambda can access it
    try {
      fs.writeFileSync(TMP_PATH, JSON.stringify(data, null, 2), "utf-8");
      writeSucceeded = true;
    } catch (tmpErr) {
      console.warn("Could not write to /tmp fallback:", tmpErr);
    }
  }

  // Trigger cloud sync asynchronously without blocking
  const kv = getKvConfig();
  if (kv) {
    pushToCloudDb(data).catch((e) => console.error("Cloud KV push error:", e));
  }
}

// Product Operations
export function getProducts(options?: { includeUnpublished?: boolean }): Product[] {
  const db = initDb();
  if (options?.includeUnpublished) {
    return db.products;
  }
  return db.products.filter((p) => p.isPublished !== false);
}

export function getProductById(id: string): Product | null {
  const db = initDb();
  return db.products.find((p) => p.id === id) || null;
}

export function createProduct(productData: Omit<Product, "id">): Product {
  const db = initDb();
  const newId = `sh-prod-${Date.now()}`;
  const newProduct: Product = {
    ...productData,
    id: newId,
    isPublished: productData.isPublished !== undefined ? productData.isPublished : true,
    inStock: productData.inStock !== undefined ? productData.inStock : true,
    gallery: Array.isArray(productData.gallery) ? productData.gallery : undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.products.unshift(newProduct);
  writeDb(db);
  return newProduct;
}

export function updateProduct(id: string, patch: Partial<Product>): Product | null {
  const db = initDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.products[index] = {
    ...db.products[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  writeDb(db);
  return db.products[index];
}

export function deleteProduct(id: string): boolean {
  const db = initDb();
  const initialLength = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);

  if (db.products.length !== initialLength) {
    writeDb(db);
    return true;
  }
  return false;
}

// Order Operations
export function getOrders(): Order[] {
  const db = initDb();
  return db.orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrderById(id: string): Order | null {
  const db = initDb();
  return db.orders.find((o) => o.id === id) || null;
}

export function createOrder(
  orderData: Omit<Order, "id" | "createdAt" | "status"> & { status?: Order["status"] }
): Order {
  const db = initDb();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const year = now.getFullYear();
  const newOrder: Order = {
    ...orderData,
    id: `SHIV-${year}-${randomSuffix}`,
    status: orderData.status || "Pending",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  db.orders.unshift(newOrder);
  writeDb(db);
  return newOrder;
}

export function updateOrderStatus(id: string, status: Order["status"]): Order | null {
  const db = initDb();
  const order = db.orders.find((o) => o.id === id);
  if (!order) return null;

  order.status = status;
  order.updatedAt = new Date().toISOString();
  writeDb(db);
  return order;
}

export function updateOrder(id: string, patch: Partial<Order>): Order | null {
  const db = initDb();
  const index = db.orders.findIndex((o) => o.id === id);
  if (index === -1) return null;

  db.orders[index] = {
    ...db.orders[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  writeDb(db);
  return db.orders[index];
}

export function getOrdersByCustomer(customerId?: string, email?: string, phone?: string): Order[] {
  const db = initDb();
  return db.orders.filter((o) => {
    if (customerId && o.customerId === customerId) return true;
    if (email && o.customerEmail && o.customerEmail.toLowerCase() === email.toLowerCase()) return true;
    if (phone && o.customerPhone && o.customerPhone.replace(/\D/g, "") === phone.replace(/\D/g, "")) return true;
    return false;
  }).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function linkOrdersToCustomer(customerId: string, email?: string, phone?: string): number {
  const db = initDb();
  let count = 0;
  const cleanPhone = phone ? phone.replace(/\D/g, "") : null;
  const cleanEmail = email ? email.toLowerCase().trim() : null;

  db.orders.forEach((o) => {
    const matchesEmail = cleanEmail && o.customerEmail && o.customerEmail.toLowerCase().trim() === cleanEmail;
    const matchesPhone = cleanPhone && o.customerPhone && o.customerPhone.replace(/\D/g, "") === cleanPhone;
    if ((matchesEmail || matchesPhone) && !o.customerId) {
      o.customerId = customerId;
      count++;
    }
  });

  if (count > 0) {
    writeDb(db);
  }
  return count;
}

// Customer Operations
export function getCustomers(): Customer[] {
  const db = initDb();
  return db.customers || [];
}

export function getCustomerById(id: string): Customer | null {
  const db = initDb();
  return db.customers?.find((c) => c.id === id) || null;
}

export function getCustomerByEmail(email: string): Customer | null {
  const db = initDb();
  const normalized = email.toLowerCase().trim();
  return db.customers?.find((c) => c.email.toLowerCase().trim() === normalized) || null;
}

export function getCustomerByPhone(phone: string): Customer | null {
  const db = initDb();
  const clean = phone.replace(/\D/g, "");
  return db.customers?.find((c) => c.phone.replace(/\D/g, "") === clean) || null;
}

export function createCustomer(data: Omit<Customer, "id" | "createdAt" | "updatedAt">): Customer {
  const db = initDb();
  const now = new Date().toISOString();
  const newCustomer: Customer = {
    ...data,
    id: `sh-cust-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    addresses: data.addresses || [],
    wishlist: data.wishlist || [],
    createdAt: now,
    updatedAt: now,
  };

  if (!db.customers) db.customers = [];
  db.customers.push(newCustomer);
  writeDb(db);

  // Link prior guest orders with same email/phone
  linkOrdersToCustomer(newCustomer.id, newCustomer.email, newCustomer.phone);

  return newCustomer;
}

export function updateCustomer(id: string, patch: Partial<Customer>): Customer | null {
  const db = initDb();
  if (!db.customers) db.customers = [];
  const index = db.customers.findIndex((c) => c.id === id);
  if (index === -1) return null;

  db.customers[index] = {
    ...db.customers[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  writeDb(db);
  return db.customers[index];
}

export function addCustomerAddress(customerId: string, address: Omit<CustomerAddress, "id">): Customer | null {
  const db = initDb();
  const customer = db.customers?.find((c) => c.id === customerId);
  if (!customer) return null;

  const newAddress: CustomerAddress = {
    ...address,
    id: `addr-${Date.now()}`,
  };

  if (address.isDefault) {
    customer.addresses.forEach((a) => (a.isDefault = false));
  } else if (customer.addresses.length === 0) {
    newAddress.isDefault = true;
  }

  customer.addresses.push(newAddress);
  customer.updatedAt = new Date().toISOString();
  writeDb(db);
  return customer;
}

export function deleteCustomerAddress(customerId: string, addressId: string): Customer | null {
  const db = initDb();
  const customer = db.customers?.find((c) => c.id === customerId);
  if (!customer) return null;

  customer.addresses = customer.addresses.filter((a) => a.id !== addressId);
  customer.updatedAt = new Date().toISOString();
  writeDb(db);
  return customer;
}

export function syncCustomerWishlist(customerId: string, wishlist: string[]): Customer | null {
  const db = initDb();
  const customer = db.customers?.find((c) => c.id === customerId);
  if (!customer) return null;

  const merged = Array.from(new Set([...customer.wishlist, ...wishlist]));
  customer.wishlist = merged;
  customer.updatedAt = new Date().toISOString();
  writeDb(db);
  return customer;
}
