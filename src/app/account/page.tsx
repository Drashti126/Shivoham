"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  LogOut,
  Calendar,
  Phone,
  Mail,
  Plus,
  Trash2,
  ExternalLink,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { ShopProvider, useShop } from "@/context/ShopContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Order, CustomerAddress, Product } from "@/types";

function AccountDashboardContent() {
  const router = useRouter();
  const { customer, refreshCustomer, logoutCustomer, formatPrice, addToCart, allCatalogProducts } = useShop();

  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "wishlist" | "profile">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Address Modal state
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAccountData() {
      setLoading(true);
      try {
        const res = await fetch("/api/customer/me");
        const data = await res.json();
        if (res.ok && data.authenticated && data.customer) {
          setOrders(data.orders || []);
          setAddresses(data.customer.addresses || []);
        } else {
          router.push("/account/login");
        }
      } catch {
        router.push("/account/login");
      } finally {
        setLoading(false);
      }
    }
    loadAccountData();
  }, [router]);

  const handleLogout = async () => {
    await logoutCustomer();
    router.push("/");
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressError(null);
    setSavingAddress(true);

    try {
      const res = await fetch("/api/customer/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddress),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAddresses(data.addresses || []);
        setIsAddAddressOpen(false);
        setNewAddress({
          fullName: "",
          phone: "",
          street: "",
          city: "",
          state: "",
          pincode: "",
        });
      } else {
        setAddressError(data.error || "Failed to save address");
      }
    } catch {
      setAddressError("Network error. Please try again.");
    } finally {
      setSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!window.confirm("Are you sure you want to delete this delivery address?")) return;
    try {
      const res = await fetch(`/api/customer/addresses?id=${addressId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAddresses(data.addresses || []);
      }
    } catch (err) {
      console.error("Delete address failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[55vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <Sparkles className="w-8 h-8 text-[#B89A5A] animate-pulse mx-auto" />
          <p className="font-serif text-lg text-[#173D2B]">Opening Your Boutique Account...</p>
        </div>
      </div>
    );
  }

  if (!customer) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Customer Header Banner */}
      <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-6 sm:p-8 rounded-xs shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#173D2B] text-[#FAF7F0] flex items-center justify-center font-serif text-xl font-bold shadow-xs">
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold">
              Namaste &amp; Welcome
            </span>
            <h1 className="font-serif text-2xl text-[#173D2B] font-normal">
              {customer.name}
            </h1>
            <div className="flex items-center gap-3 text-xs text-[#242424]/65">
              <span>+91 {customer.phone}</span>
              <span>•</span>
              <span>{customer.email}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="self-start sm:self-center px-4 py-2 border border-[#F3EBDD] hover:bg-[#FAF7F0] text-xs font-semibold text-[#801426] flex items-center gap-1.5 rounded-xs transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[#F3EBDD] overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === "orders"
              ? "border-[#173D2B] text-[#173D2B]"
              : "border-transparent text-[#242424]/60 hover:text-[#173D2B]"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("addresses")}
          className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === "addresses"
              ? "border-[#173D2B] text-[#173D2B]"
              : "border-transparent text-[#242424]/60 hover:text-[#173D2B]"
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses ({addresses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === "profile"
              ? "border-[#173D2B] text-[#173D2B]"
              : "border-transparent text-[#242424]/60 hover:text-[#173D2B]"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Account Profile</span>
        </button>
      </div>

      {/* TAB 1: ORDERS */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-[#FFFFFF] border border-[#F3EBDD] rounded-xs space-y-3">
              <ShoppingBag className="w-10 h-10 text-[#B89A5A] mx-auto opacity-70" />
              <h3 className="font-serif text-xl text-[#173D2B]">No Orders Placed Yet</h3>
              <p className="text-xs text-[#242424]/60 max-w-sm mx-auto">
                Explore our curated Sarees, Anarkalis, and Kurtis to place your first handcrafted order.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-2.5 bg-[#173D2B] text-[#FAF7F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#0f291d]"
              >
                Browse Collections
              </Link>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-[#FFFFFF] border border-[#F3EBDD] p-5 sm:p-6 rounded-xs shadow-2xs space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F3EBDD] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#173D2B]">
                        {ord.id}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          ord.status === "Delivered"
                            ? "bg-emerald-100 text-emerald-800"
                            : ord.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : ord.status === "Confirmed"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#242424]/60 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-[#B89A5A]" />
                      {new Date(ord.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[#173D2B]">
                      {formatPrice(ord.totalAmount)}
                    </span>
                    <Link
                      href={`/order-confirmation?orderId=${ord.id}`}
                      className="px-3 py-1.5 border border-[#F3EBDD] hover:bg-[#FAF7F0] text-xs font-semibold text-[#173D2B] rounded-xs flex items-center gap-1"
                    >
                      <span>Invoice</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ord.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2 bg-[#FAF7F0] border border-[#F3EBDD] rounded-2xs text-xs"
                    >
                      <div className="relative w-12 h-14 bg-[#F3EBDD] overflow-hidden shrink-0">
                        <Image
                          src={encodeURI(item.image)}
                          alt={item.productName}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-[#173D2B] line-clamp-1 block">
                          {item.productName}
                        </span>
                        <span className="text-[10px] text-[#B89A5A] font-semibold block">
                          Size: {item.selectedSize} • Qty: {item.quantity}
                        </span>
                        <span className="font-semibold text-xs text-[#173D2B]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking info if available */}
                {ord.trackingNumber && (
                  <div className="p-2.5 bg-blue-50 border border-blue-200 text-blue-900 text-xs rounded-xs flex items-center justify-between">
                    <span>AWB Tracking Number: <strong>{ord.trackingNumber}</strong></span>
                    <span className="text-[11px] font-semibold">In Transit</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: SAVED ADDRESSES */}
      {activeTab === "addresses" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#242424]/70">
              Manage your delivery addresses for seamless 1-click checkout.
            </p>
            <button
              onClick={() => setIsAddAddressOpen(true)}
              className="px-4 py-2 bg-[#173D2B] text-[#FAF7F0] text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#0f291d] flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 text-[#B89A5A]" />
              <span>Add New Address</span>
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-12 bg-[#FFFFFF] border border-[#F3EBDD] rounded-xs space-y-2">
              <MapPin className="w-8 h-8 text-[#B89A5A] mx-auto opacity-70" />
              <h4 className="font-serif text-base text-[#173D2B]">No Saved Delivery Addresses</h4>
              <p className="text-xs text-[#242424]/60">
                Add your home or office address to save time when placing future orders.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-[#FFFFFF] border border-[#F3EBDD] p-5 rounded-xs space-y-3 shadow-2xs relative"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#173D2B]">
                        {addr.fullName}
                      </h4>
                      <span className="text-xs text-[#242424]/70 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-[#B89A5A]" />
                        +91 {addr.phone}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-[#242424]/40 hover:text-[#801426] p-1 cursor-pointer"
                      title="Delete Address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-[#242424]/80 leading-relaxed border-t border-[#F3EBDD] pt-2">
                    {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Add Address Modal */}
          {isAddAddressOpen && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#173D2B]/40 backdrop-blur-xs"
            >
              <div className="relative w-full max-w-md bg-[#FFFFFF] border border-[#F3EBDD] p-6 rounded-xs shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#F3EBDD] pb-3">
                  <h3 className="font-serif text-base text-[#173D2B]">Add New Delivery Address</h3>
                  <button
                    onClick={() => setIsAddAddressOpen(false)}
                    className="text-[#242424]/40 hover:text-[#242424]"
                  >
                    ✕
                  </button>
                </div>

                {addressError && (
                  <p className="text-xs text-red-700 bg-red-50 p-2 border border-red-200">
                    {addressError}
                  </p>
                )}

                <form onSubmit={handleSaveAddress} className="space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyadarshini Sharma"
                      value={newAddress.fullName}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, fullName: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                      10-Digit Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={newAddress.phone}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                      Street Address &amp; Apartment *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Building, Street, Landmark"
                      value={newAddress.street}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, street: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-[#173D2B] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-[#173D2B] mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, state: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-[#173D2B] mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="380015"
                        value={newAddress.pincode}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            pincode: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddAddressOpen(false)}
                      className="px-3.5 py-2 border border-[#F3EBDD] text-xs text-[#242424] rounded-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingAddress}
                      className="px-5 py-2 bg-[#173D2B] text-[#FAF7F0] text-xs uppercase tracking-wider font-semibold rounded-xs"
                    >
                      {savingAddress ? "Saving..." : "Save Address"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PROFILE SETTINGS */}
      {activeTab === "profile" && (
        <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-6 rounded-xs shadow-2xs max-w-lg space-y-4">
          <h3 className="font-serif text-lg text-[#173D2B] border-b border-[#F3EBDD] pb-3">
            Profile Credentials
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
                Account ID:
              </span>
              <span className="font-mono text-xs">{customer.id}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
                Full Name:
              </span>
              <span className="font-semibold text-[#173D2B] text-sm">{customer.name}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
                Registered Mobile:
              </span>
              <span>+91 {customer.phone}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
                Email Address:
              </span>
              <span>{customer.email}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";

export default function AccountPage() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#242424]">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">
          <AccountDashboardContent />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </ShopProvider>
  );
}
