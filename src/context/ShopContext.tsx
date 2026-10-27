"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, CartItem } from "@/types";
import {
  ALL_PRODUCTS,
  BUSINESS_CONTACT,
  CURRENCIES,
  Currency,
  ACTIVE_COUPONS,
  Coupon,
} from "@/data/sampleProducts";

export interface CustomerSessionUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ShopContextType {
  wishlist: string[];
  cart: CartItem[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  quickViewProduct: Product | null;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatPrice: (amountInInr: number) => string;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  finalTotal: number;
  freeShippingThreshold: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addToCart: (product: Product, selectedSize?: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  updateQuantity: (
    productId: string,
    selectedSize: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  cartTotal: number;
  cartCount: number;
  allCatalogProducts: Product[];
  customer: CustomerSessionUser | null;
  refreshCustomer: () => Promise<void>;
  logoutCustomer: () => Promise<void>;
  generateWhatsAppCartLink: () => string;
  generateProductWhatsAppLink: (
    product: Product,
    quantity?: number,
    selectedSize?: string
  ) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [allCatalogProducts, setAllCatalogProducts] = useState<Product[]>(ALL_PRODUCTS);
  const [customer, setCustomer] = useState<CustomerSessionUser | null>(null);

  const freeShippingThreshold = 1999;
  const officialPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || BUSINESS_CONTACT.phone;
  const whatsappBaseUrl = `https://wa.me/91${officialPhone}`;

  // Fetch products from database
  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.products) && data.products.length > 0) {
          setAllCatalogProducts(data.products);
        }
      } catch (err) {
        console.warn("Could not load products from API, using fallback catalog:", err);
      }
    }
    loadCatalog();
  }, []);

  // Fetch authenticated customer session
  const refreshCustomer = useCallback(async () => {
    try {
      const res = await fetch("/api/customer/me");
      const data = await res.json();
      if (res.ok && data.authenticated && data.customer) {
        setCustomer(data.customer);
        if (Array.isArray(data.customer.wishlist) && data.customer.wishlist.length > 0) {
          setWishlist((prev) => Array.from(new Set([...prev, ...data.customer.wishlist])));
        }
      } else {
        setCustomer(null);
      }
    } catch {
      setCustomer(null);
    }
  }, []);

  useEffect(() => {
    refreshCustomer();
  }, [refreshCustomer]);

  const logoutCustomer = async () => {
    try {
      await fetch("/api/customer/logout", { method: "POST" });
      setCustomer(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("shivoham_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCart = localStorage.getItem("shivoham_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedCurrency = localStorage.getItem("shivoham_currency");
      if (savedCurrency) {
        const found = CURRENCIES.find((c) => c.code === savedCurrency);
        if (found) setCurrencyState(found);
      }
    } catch {}
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem("shivoham_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("shivoham_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem("shivoham_currency", curr.code);
    } catch {}
  };

  const formatPrice = (amountInInr: number) => {
    if (currency.code === "INR") {
      return `₹${amountInInr.toLocaleString("en-IN")}`;
    }
    const converted = Math.round(amountInInr * currency.rate);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      // If logged in, sync with account
      if (customer) {
        fetch("/api/customer/sync-wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wishlist: updated }),
        }).catch(() => {});
      }

      return updated;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addToCart = (product: Product, selectedSize?: string, quantity: number = 1) => {
    const size = selectedSize || product.sizes[0] || "Standard";
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedSize: size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (
    productId: string,
    selectedSize: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    try {
      localStorage.removeItem("shivoham_cart");
    } catch {}
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Calculate discount based on applied coupon
  let discountAmount = 0;
  if (appliedCoupon && cartTotal >= appliedCoupon.minSpend) {
    if (appliedCoupon.discountType === "percentage") {
      discountAmount = Math.round(
        (cartTotal * appliedCoupon.discountValue) / 100
      );
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const found = ACTIVE_COUPONS.find((c) => c.code === normalized);
    if (!found) {
      return { success: false, message: "Invalid coupon code. Try SHIVOHAM15" };
    }
    if (cartTotal < found.minSpend) {
      return {
        success: false,
        message: `Min. spend of ₹${found.minSpend.toLocaleString(
          "en-IN"
        )} required for ${found.code}.`,
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const generateWhatsAppCartLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://shivoham.com";

    if (cart.length === 0) {
      return `${whatsappBaseUrl}?text=${encodeURIComponent(
        BUSINESS_CONTACT.defaultGreeting
      )}`;
    }
    const itemsSummary = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.product.name}\n   Product ID: ${item.product.id}\n   Size: ${
            item.selectedSize
          } | Qty: ${item.quantity} | ₹${(
            item.product.price * item.quantity
          ).toLocaleString("en-IN")}\n   Link: ${origin}/products/${item.product.id}`
      )
      .join("\n\n");

    const message = `Namaste SHIVOHAM,\n\nI would like to inquire and place an order for the following items from my shopping bag:\n\n${itemsSummary}\n\nSubtotal: ₹${cartTotal.toLocaleString(
      "en-IN"
    )}${
      appliedCoupon
        ? `\nCoupon Applied: ${appliedCoupon.code} (-₹${discountAmount.toLocaleString(
            "en-IN"
          )})`
        : ""
    }\nFinal Bag Total: ₹${finalTotal.toLocaleString(
      "en-IN"
    )}\n\nPlease assist with availability, payment, and delivery timeline.\nThank you!`;

    return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
  };

  const generateProductWhatsAppLink = (
    product: Product,
    quantity: number = 1,
    selectedSize?: string
  ) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://shivoham.com";
    const size = selectedSize || product.sizes[0] || "Standard";
    const url = `${origin}/products/${product.id}`;

    const message = `Namaste SHIVOHAM,\n\nI would like to order / inquire about:\nProduct: "${product.name}"\nProduct ID: ${product.id}\nCategory: ${product.category}\nFabric: ${product.fabric}\nCurrent Price: ₹${product.price.toLocaleString(
      "en-IN"
    )}\nSelected Quantity: ${quantity}\nSelected Size: ${size}\nProduct URL: ${url}\n\nPlease let me know availability and dispatch timeline.`;

    return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
  };

  return (
    <ShopContext.Provider
      value={{
        wishlist,
        cart,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        quickViewProduct,
        currency,
        setCurrency,
        formatPrice,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        finalTotal,
        freeShippingThreshold,
        toggleWishlist,
        isInWishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        openWishlist: () => setIsWishlistOpen(true),
        closeWishlist: () => setIsWishlistOpen(false),
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        openQuickView: (product: Product) => setQuickViewProduct(product),
        closeQuickView: () => setQuickViewProduct(null),
        cartTotal,
        cartCount,
        allCatalogProducts,
        customer,
        refreshCustomer,
        logoutCustomer,
        generateWhatsAppCartLink,
        generateProductWhatsAppLink,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
