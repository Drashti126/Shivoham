"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Printer,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Package,
  Truck,
  Sparkles,
} from "lucide-react";
import { ShopProvider, useShop } from "@/context/ShopContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { BUSINESS_CONTACT } from "@/data/sampleProducts";
import { Order } from "@/types";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { formatPrice } = useShop();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        if (res.ok && data.success && data.order) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error("Failed to load order confirmation:", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <Sparkles className="w-8 h-8 text-[#B89A5A] animate-pulse mx-auto" />
          <p className="font-serif text-lg text-[#173D2B]">Confirming Your Order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl text-[#173D2B]">Order Not Found</h2>
        <p className="text-xs text-[#242424]/70">
          We could not locate this order. If you recently placed an order, please contact our concierge team with your details.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-[#173D2B] text-[#FAF7F0] text-xs uppercase tracking-wider font-semibold"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const officialPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || BUSINESS_CONTACT.phone;
  const whatsappTrackUrl = `https://wa.me/91${officialPhone}?text=${encodeURIComponent(
    `Namaste SHIVOHAM,\n\nI have placed order ${order.id}.\nCustomer: ${order.customerName}\nAmount: ₹${order.totalAmount.toLocaleString(
      "en-IN"
    )}\n\nCould you please share tracking and dispatch confirmation? Thank you!`
  )}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Celebration Banner */}
      <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-6 sm:p-8 text-center space-y-3 shadow-sm rounded-xs">
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-700" />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89A5A] font-semibold block">
            Order Confirmed &amp; Placed
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#173D2B] font-normal">
            Thank You, {order.customerName}!
          </h1>
          <p className="text-xs sm:text-sm text-[#242424]/75 max-w-md mx-auto">
            Your ethnic wear order has been safely received. Our artisans and dispatch team are preparing your pieces for complimentary express delivery.
          </p>
        </div>

        {/* Order ID Pill */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 bg-[#FAF7F0] border border-[#F3EBDD] px-4 py-2 rounded-xs font-mono text-sm text-[#173D2B] font-bold">
            <span>Order ID:</span>
            <span className="text-[#801426]">{order.id}</span>
          </div>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="bg-[#FFFFFF] border border-[#F3EBDD] shadow-sm rounded-xs overflow-hidden print:border-none print:shadow-none">
        <div className="p-6 border-b border-[#F3EBDD] bg-[#FAF7F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
              Placement Timestamp
            </span>
            <p className="font-semibold text-[#173D2B] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B89A5A]" />
              <span>{new Date(order.createdAt).toLocaleString("en-IN")}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#242424]/60 block">
                Payment Method:
              </span>
              <span className="font-semibold text-[#173D2B]">
                {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online Gateway"} (
                <span className={order.paymentStatus === "Paid" ? "text-emerald-700 font-bold" : "text-amber-800"}>
                  {order.paymentStatus}
                </span>
                )
              </span>
            </div>

            <span
              className={`px-3 py-1 text-xs font-bold rounded-full ${
                order.status === "Delivered"
                  ? "bg-emerald-100 text-emerald-800"
                  : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-800"
                  : order.status === "Confirmed"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* Customer & Address Details */}
        <div className="p-6 border-b border-[#F3EBDD] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#242424]">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
              Delivery Address:
            </span>
            <p className="font-semibold text-sm text-[#173D2B]">{order.customerName}</p>
            <p className="text-[#242424]/80 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#B89A5A]" />
              <span>+91 {order.customerPhone}</span>
            </p>
            {order.customerEmail && (
              <p className="text-[#242424]/80 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#B89A5A]" />
                <span>{order.customerEmail}</span>
              </p>
            )}
            <p className="text-[#242424]/80 leading-relaxed pt-1">
              {order.customerAddress || order.customerCity}
            </p>
          </div>

          <div className="space-y-1.5 bg-[#FAF7F0] p-4 border border-[#F3EBDD] rounded-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
              Dispatch &amp; Delivery Timeline
            </span>
            <div className="space-y-1 text-xs text-[#242424]/80">
              <p className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Estimated Delivery: <strong>2 – 4 Business Days</strong></span>
              </p>
              <p className="text-[11px] text-[#242424]/60">
                You will receive dispatch confirmation and courier live updates via SMS and WhatsApp.
              </p>
              {order.trackingNumber && (
                <p className="pt-1 text-xs font-mono font-semibold text-[#173D2B]">
                  Tracking AWB: {order.trackingNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Ordered Items Table */}
        <div className="p-6 space-y-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#173D2B] block">
            Items in This Order ({order.items.length})
          </span>
          <div className="divide-y divide-[#F3EBDD]">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-16 bg-[#F3EBDD] overflow-hidden shrink-0 rounded-2xs">
                    <Image
                      src={encodeURI(item.image)}
                      alt={item.productName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs sm:text-sm text-[#173D2B] font-medium">
                      {item.productName}
                    </h4>
                    <span className="text-[10px] text-[#B89A5A] font-semibold block mt-0.5">
                      Size: {item.selectedSize} • Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-semibold text-sm text-[#173D2B] shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-[#F3EBDD] space-y-2 text-xs text-[#242424]/80 max-w-xs ml-auto">
            {order.discountAmount ? (
              <div className="flex justify-between text-[#801426] font-medium">
                <span>Coupon Discount ({order.couponCode || "PROMO"}):</span>
                <span>-₹{order.discountAmount.toLocaleString("en-IN")}</span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span className="text-emerald-700 font-semibold">
                {order.deliveryCharge && order.deliveryCharge > 0
                  ? `₹${order.deliveryCharge.toLocaleString("en-IN")}`
                  : "FREE"}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold text-[#173D2B] pt-2 border-t border-[#F3EBDD]">
              <span>Final Total Paid:</span>
              <span>₹{order.totalAmount.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 border border-[#173D2B] hover:bg-[#FAF7F0] text-[#173D2B] text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors text-center"
        >
          Continue Shopping
        </Link>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial px-4 py-3 border border-[#F3EBDD] hover:bg-[#FAF7F0] text-xs font-semibold text-[#242424] flex items-center justify-center gap-1.5 rounded-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#B89A5A]" />
            <span>Print Invoice</span>
          </button>

          <a
            href={whatsappTrackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial px-5 py-3 bg-[#25D366] hover:bg-[#1ebc59] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 rounded-xs shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Track on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default function OrderConfirmationPage() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#242424]">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">
          <React.Suspense fallback={<div className="p-12 text-center text-xs">Loading Order...</div>}>
            <OrderConfirmationContent />
          </React.Suspense>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </ShopProvider>
  );
}
