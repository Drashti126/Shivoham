# SHIVOHAM — Luxury Indian Ethnic Wear Storefront & Admin Portal

SHIVOHAM is a premium, elegant, and minimal Indian ethnic wear ecommerce platform built with **Next.js 16**, **React 19**, and **Tailwind CSS**. It showcases handcrafted Sarees, Anarkalis & Dresses, and Chikankari Kurtis, inspired by premier fashion destinations like Libas, Myntra Luxe, and Flipkart.

---

## 🌟 Key Features

### 1. Customer Storefront
- **Editorial Fashion Lookbook & Hero Banner**: Highlighting festive and bespoke bridal curations.
- **Three Core Categories**: Sarees (Banarasi, Katan, Tussar), Dresses (Anarkalis, Indo-Western gowns), and Kurtis (Chikankari, Handloom).
- **Three Dedicated Sections**:
  - **New Arrivals**: Just-in weaves and seasonal arrivals with live stock status and discount tags.
  - **Best Sellers**: Most loved drapes and patron favorites.
  - **The Grand Product Atelier**: Full catalog with multi-filter controls (Category tabs, Price ranges: Under ₹3,000 to Above ₹12,000, Availability: In Stock only, and Sorting: Newest first, Price Low-to-High, Price High-to-Low, Biggest Discount).
- **Product Detail Pages (`/products/[id]`)**: Dual-angle photography gallery, size selector, quantity adjuster, "Buy Now" express checkout, "Add to Shopping Bag", and "Order on WhatsApp".
- **Real-Time Search (`SearchModal`)**: Autocomplete search by title, fabric, category, or ID with category pills.
- **Wishlist Drawer**: Interactive slide-out drawer to view saved favorites, 1-click move to shopping bag, and WhatsApp trousseau sharing.
- **Shopping Bag (`CartDrawer`)**: Free-shipping progress bar (complimentary pan-India delivery above ₹1,999), coupon code engine (`SHIVOHAM15`, `FESTIVE500`, `ROYAL1000`), item quantity controls, and two checkout options.
- **Floating WhatsApp Concierge**: Fixed bottom-right button across all public pages for direct stylist consultation.

### 2. Guest Browsing & Frictionless Checkout
- **100% Guest Browsing**: Customers can view all products, prices, discounts, open product details, use the cart, wishlist, and contact WhatsApp without logging in.
- **Option A: Buy Now / Website Checkout (`/checkout`)**:
  - Fast guest checkout without requiring account registration.
  - Full address, 10-digit mobile number, and 6-digit PIN code validation.
  - Order summary with live coupon discounts and shipping fees.
  - Payment choices: **Cash on Delivery (COD)** or **Online Payment Gateway**.
  - Generates unique order number (e.g. `SHIV-2026-XXXX`).
  - Displays complete Order Confirmation page (`/order-confirmation?orderId=...`) with printable invoice and WhatsApp order tracking.
- **Option B: Order on WhatsApp**:
  - Available on product detail pages and within the shopping bag.
  - Generates prefilled WhatsApp message including: Product Name, Product ID, Current Price, Selected Quantity & Size, and Product URL.
  - Uses the official SHIVOHAM business WhatsApp number configured via environment variable.

### 3. Optional Customer Account (`/account`)
- **Registration & Login are strictly optional**:
  - Customer Registration (`/account/register`): Fast sign up with PBKDF2 password hashing. Past guest orders placed with the same email or mobile number are automatically linked!
  - Customer Login (`/account/login`): Secure session with "Continue as Guest" shortcut.
  - Customer Dashboard (`/account`):
    - **Order History**: Track past orders, view invoices, and check dispatch status.
    - **Saved Delivery Addresses**: Add and manage multiple shipping destinations.
    - **Trousseau Wishlist**: Access saved styles.
    - **Account Profile & Sign Out**.

### 4. Protected Admin Panel (`/admin`)
- **Secure Admin Authentication (`/admin/login`)**: HMAC-SHA256 session token with httpOnly cookie.
- **Executive Metrics Dashboard**: Total products, Sarees, Dresses, Kurtis count, orders count, and gross order revenue.
- **Product Management**:
  - Add new products with multiple images, category, fabric, price, MRP, sizes, and badges.
  - Edit existing products with instant real-time synchronization to the customer storefront.
  - Delete products with confirmation.
  - In Stock / Out of Stock toggle.
  - Publish / Unpublish visibility toggle.
  - Direct file upload from computer or mobile (`/api/admin/upload`).
- **Order Fulfilment**:
  - View full customer delivery information (Name, Phone, Email, Address, PIN code).
  - Track payment method (COD vs. Online) and payment status (`Paid` / `Pending`).
  - Update order status: `Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`.
  - Add and save courier AWB Tracking Numbers.
  - Search orders by ID, customer name, or phone.

---

## 🛠️ Environment Configuration

Configuration is managed via `.env.local` (or `.env` in production):

```env
# Admin Credentials & Authentication
ADMIN_EMAIL=admin@shivoham.com
ADMIN_PASSWORD=shivoham@admin2026
ADMIN_JWT_SECRET=shivoham_secure_boutique_token_secret_2026

# Customer Authentication
CUSTOMER_JWT_SECRET=shivoham_customer_secure_secret_2026

# WhatsApp Concierge Business Contact (Without + or country code)
NEXT_PUBLIC_WHATSAPP_NUMBER=9724984714

# Payment Gateway (Optional - If unset, runs in simulated test mode)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## 🚀 Running the Project

### 1. Install Dependencies (if not already installed)
```bash
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Start
```bash
npm run build
npm run start
```

---

## 🔑 Default Credentials

- **Admin Portal**: [http://localhost:3000/admin](http://localhost:3000/admin)
  - **Email**: `admin@shivoham.com`
  - **Password**: `shivoham@admin2026`
- **Customer Sign In**: [http://localhost:3000/account/login](http://localhost:3000/account/login)
  - Customers can register optionally or continue as guest.
- **Customer Storefront**: [http://localhost:3000](http://localhost:3000)
- **Official WhatsApp Number**: `+91 9724984714`
