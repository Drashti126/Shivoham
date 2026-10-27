export type ProductCategory =
  | "Sarees"
  | "Suits"
  | "Kurtis"
  | "Dresses"
  | "Co-ord Sets";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  fabric: string;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
  description: string;
  sizes: string[];
  isSample: boolean;
  isPublished?: boolean;
  inStock?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  title: string;
  tagline: string;
  image: string;
  itemCountLabel: string;
}

export interface OccasionInfo {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  ctaText: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  price: number;
  selectedSize: string;
  quantity: number;
}

export interface CustomerAddress {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  addresses: CustomerAddress[];
  wishlist: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  customerCity?: string;
  customerState?: string;
  customerPincode?: string;
  customerAddress?: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  couponCode?: string;
  discountAmount?: number;
  deliveryCharge?: number;
  paymentMethod?: "COD" | "Online" | "WhatsApp";
  paymentStatus?: "Pending" | "Paid" | "Failed";
  paymentId?: string;
  status: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  trackingNumber?: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
  customerId?: string;
}
