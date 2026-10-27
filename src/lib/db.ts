import fs from "fs";
import path from "path";
import { Product, Order, Customer, CustomerAddress } from "@/types";
import { ALL_PRODUCTS } from "@/data/sampleProducts";

interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  customers?: Customer[];
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "database.json");

// Ensure DB exists and is seeded
function initDb(): Required<DatabaseSchema> {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_PATH)) {
      const seededProducts: Product[] = ALL_PRODUCTS.map((p) => ({
        ...p,
        isPublished: true,
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      const initialData: Required<DatabaseSchema> = {
        products: seededProducts,
        orders: [],
        customers: [],
      };

      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf-8");
      return initialData;
    }

    const raw = fs.readFileSync(DB_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      products: Array.isArray(parsed.products) ? parsed.products : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
      customers: Array.isArray(parsed.customers) ? parsed.customers : [],
    };
  } catch (error) {
    console.error("Error reading database:", error);
    return { products: [], orders: [], customers: [] };
  }
}

function writeDb(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    const tempPath = `${DB_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempPath, DB_PATH);
  } catch (error) {
    console.error("Error writing database:", error);
    throw error;
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
  return db.customers;
}

export function getCustomerById(id: string): Customer | null {
  const db = initDb();
  return db.customers.find((c) => c.id === id) || null;
}

export function getCustomerByEmail(email: string): Customer | null {
  const db = initDb();
  const normalized = email.toLowerCase().trim();
  return db.customers.find((c) => c.email.toLowerCase().trim() === normalized) || null;
}

export function getCustomerByPhone(phone: string): Customer | null {
  const db = initDb();
  const clean = phone.replace(/\D/g, "");
  return db.customers.find((c) => c.phone.replace(/\D/g, "") === clean) || null;
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

  db.customers.push(newCustomer);
  writeDb(db);

  // Link prior guest orders with same email/phone
  linkOrdersToCustomer(newCustomer.id, newCustomer.email, newCustomer.phone);

  return newCustomer;
}

export function updateCustomer(id: string, patch: Partial<Customer>): Customer | null {
  const db = initDb();
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
  const customer = db.customers.find((c) => c.id === customerId);
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
  const customer = db.customers.find((c) => c.id === customerId);
  if (!customer) return null;

  customer.addresses = customer.addresses.filter((a) => a.id !== addressId);
  customer.updatedAt = new Date().toISOString();
  writeDb(db);
  return customer;
}

export function syncCustomerWishlist(customerId: string, wishlist: string[]): Customer | null {
  const db = initDb();
  const customer = db.customers.find((c) => c.id === customerId);
  if (!customer) return null;

  const merged = Array.from(new Set([...customer.wishlist, ...wishlist]));
  customer.wishlist = merged;
  customer.updatedAt = new Date().toISOString();
  writeDb(db);
  return customer;
}
