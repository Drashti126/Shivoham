"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Tag,
  Check,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  User,
  ShoppingBag,
} from "lucide-react";
import { ShopProvider, useShop } from "@/context/ShopContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LogoPlaceholder from "@/components/LogoPlaceholder";

function CheckoutContent() {
  const router = useRouter();
  const {
    cart,
    cartTotal,
    cartCount,
    clearCart,
    currency,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal,
    freeShippingThreshold,
    customer,
  } = useShop();

  // Delivery Details Form
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  // Payment method: "COD" | "Online"
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "Online">("COD");

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Submission & Validation States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  // Online Payment Simulation / Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [onlineOrderPayload, setOnlineOrderPayload] = useState<any>(null);

  // Pre-fill from customer account if logged in
  useEffect(() => {
    if (customer) {
      if (!fullName) setFullName(customer.name || "");
      if (!phone) setPhone(customer.phone || "");
      if (!email) setEmail(customer.email || "");
    }
  }, [customer, fullName, phone, email]);

  const deliveryCharge = cartTotal >= freeShippingThreshold ? 0 : 150;
  const grandTotal = finalTotal + deliveryCharge;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponInput("");
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full recipient name (min. 2 characters)";
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number for delivery updates";
    }

    if (email.trim() && !email.includes("@")) {
      errs.email = "Please enter a valid email address";
    }

    if (!street.trim() || street.trim().length < 5) {
      errs.street = "Please provide your complete street address / apartment details";
    }

    if (!city.trim()) {
      errs.city = "Please enter your city";
    }

    if (!state.trim()) {
      errs.state = "Please enter your state";
    }

    const cleanPincode = pincode.replace(/\D/g, "");
    if (!cleanPincode || cleanPincode.length !== 6) {
      errs.pincode = "Please enter a valid 6-digit postal PIN code";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Order
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (cart.length === 0) {
      setApiError("Your shopping bag is empty. Please add items to checkout.");
      return;
    }

    if (!validateForm()) {
      window.scrollTo({ top: 100, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        image: item.product.image,
        price: item.product.price,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
      }));

      // If Online Payment is chosen, initialize payment gateway / simulation
      if (paymentMethod === "Online") {
        const initRes = await fetch("/api/payment/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: grandTotal,
            currency: currency.code,
            receipt: `rcpt_${Date.now()}`,
          }),
        });

        const initData = await initRes.json();
        if (!initRes.ok || !initData.success) {
          throw new Error(initData.error || "Failed to initialize online payment gateway");
        }

        // Store payload and open payment authorization modal
        setOnlineOrderPayload({
          paymentInit: initData,
          orderData: {
            customerName: fullName.trim(),
            customerPhone: phone.trim(),
            customerEmail: email.trim().toLowerCase() || undefined,
            customerCity: city.trim(),
            customerState: state.trim(),
            customerPincode: pincode.trim(),
            customerAddress: `${street.trim()}, ${city.trim()}, ${state.trim()} - ${pincode.trim()}`,
            items: orderItems,
            totalAmount: grandTotal,
            currency: currency.code,
            couponCode: appliedCoupon?.code,
            discountAmount,
            deliveryCharge,
            paymentMethod: "Online",
            notes: orderNotes.trim(),
            customerId: customer?.id,
          },
        });

        setIsPaymentModalOpen(true);
        setIsSubmitting(false);
        return;
      }

      // COD Flow: Save order directly in database
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: fullName.trim(),
          customerPhone: phone.trim(),
          customerEmail: email.trim().toLowerCase() || undefined,
          customerCity: city.trim(),
          customerState: state.trim(),
          customerPincode: pincode.trim(),
          customerAddress: `${street.trim()}, ${city.trim()}, ${state.trim()} - ${pincode.trim()}`,
          items: orderItems,
          totalAmount: grandTotal,
          currency: currency.code,
          couponCode: appliedCoupon?.code,
          discountAmount,
          deliveryCharge,
          paymentMethod: "COD",
          paymentStatus: "Pending",
          status: "Pending",
          notes: orderNotes.trim(),
          customerId: customer?.id,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to place your order. Please try again.");
      }

      clearCart();
      router.push(`/order-confirmation?orderId=${data.order.id}`);
    } catch (err: any) {
      console.error("Checkout submission failed:", err);
      setApiError(err.message || "An unexpected error occurred during checkout. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Complete Online Payment Verification
  const handleVerifyOnlinePayment = async () => {
    if (!onlineOrderPayload) return;
    setIsSubmitting(true);
    setApiError(null);

    try {
      const { paymentInit, orderData } = onlineOrderPayload;
      const simPaymentId = `pay_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

      // Server-side payment verification
      const verifyRes = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: paymentInit.orderId,
          razorpay_payment_id: simPaymentId,
          isMock: true,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.verified) {
        throw new Error("Online payment verification could not be confirmed on server.");
      }

      // Record verified order in persistent database
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...orderData,
          paymentStatus: "Paid",
          paymentId: verifyData.paymentId,
          status: "Confirmed",
        }),
      });

      const savedOrderData = await orderRes.json();
      if (!orderRes.ok || !savedOrderData.success) {
        throw new Error(savedOrderData.error || "Failed to record confirmed paid order.");
      }

      setIsPaymentModalOpen(false);
      clearCart();
      router.push(`/order-confirmation?orderId=${savedOrderData.order.id}`);
    } catch (err: any) {
      console.error("Online payment completion error:", err);
      setApiError(err.message || "Payment verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#F3EBDD] flex items-center justify-center mx-auto shadow-xs">
          <ShoppingBag className="w-8 h-8 text-[#B89A5A]" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#173D2B]">Your Bag is Currently Empty</h2>
        <p className="text-xs sm:text-sm text-[#242424]/70 max-w-md mx-auto">
          Please select your preferred Sarees, Anarkalis, or Kurtis before proceeding to checkout.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#173D2B] text-[#FAF7F0] text-xs uppercase tracking-widest font-semibold hover:bg-[#0f291d] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Breadcrumb & Heading */}
      <div className="mb-8 space-y-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#242424]/60">
          <Link href="/" className="hover:text-[#173D2B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#173D2B] font-medium">Boutique Checkout</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#173D2B] font-normal">
              Frictionless Checkout
            </h1>
            <p className="text-xs text-[#242424]/70 mt-1">
              Guest checkout supported. No mandatory account creation needed.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xs w-fit">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span>256-bit SSL Secure Checkout</span>
          </div>
        </div>
      </div>

      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xs flex items-center gap-3 text-red-800 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Delivery Details & Payment Choice (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSubmitOrder} className="space-y-8">
            {/* 1. Customer & Shipping Address */}
            <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-6 shadow-2xs space-y-5 rounded-xs">
              <div className="flex items-center justify-between border-b border-[#F3EBDD] pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B89A5A]" />
                  <h2 className="font-serif text-base sm:text-lg font-medium text-[#173D2B]">
                    1. Shipping &amp; Delivery Address
                  </h2>
                </div>
                {!customer && (
                  <Link
                    href="/account/login"
                    className="text-[11px] text-[#173D2B] hover:text-[#B89A5A] font-semibold underline"
                  >
                    Have an account? Sign in
                  </Link>
                )}
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Priyadarshini Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#FAF7F0] border rounded-xs focus:outline-none focus:bg-[#FFFFFF] ${
                      errors.fullName ? "border-red-500" : "border-[#F3EBDD] focus:border-[#173D2B]"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[10px] text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                      10-Digit Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#242424]/60 font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className={`w-full pl-11 pr-3 py-2.5 text-xs bg-[#FAF7F0] border rounded-xs focus:outline-none focus:bg-[#FFFFFF] ${
                          errors.phone ? "border-red-500" : "border-[#F3EBDD] focus:border-[#173D2B]"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[10px] text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#FAF7F0] border rounded-xs focus:outline-none focus:bg-[#FFFFFF] ${
                        errors.email ? "border-red-500" : "border-[#F3EBDD] focus:border-[#173D2B]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                    Street Address &amp; House / Apartment *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="House/Flat No., Building Name, Street, Landmark"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#FAF7F0] border rounded-xs focus:outline-none focus:bg-[#FFFFFF] ${
                      errors.street ? "border-red-500" : "border-[#F3EBDD] focus:border-[#173D2B]"
                    }`}
                  />
                  {errors.street && (
                    <p className="text-[10px] text-red-600 mt-1">{errors.street}</p>
                  )}
                </div>

                {/* City, State, PIN */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="Ahmedabad / Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`w-full px-3 py-2 text-xs bg-[#FAF7F0] border rounded-xs focus:outline-none focus:bg-[#FFFFFF] ${
                        errors.city ? "border-red-500" : "border-[#F3EBDD] focus:border-[#173D2B]"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-[10px] text-red-600 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      placeholder="Gujarat / Maharashtra"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className={`w-full px-3 py-2 text-xs bg-[#FAF7F0] border rounded-xs focus:outline-none focus:bg-[#FFFFFF] ${
                        errors.state ? "border-red-500" : "border-[#F3EBDD] focus:border-[#173D2B]"
                      }`}
                    />
                    {errors.state && (
                      <p className="text-[10px] text-red-600 mt-1">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                      PIN Code (6 digits) *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="380015"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                      className={`w-full px-3 py-2 text-xs bg-[#FAF7F0] border rounded-xs focus:outline-none focus:bg-[#FFFFFF] ${
                        errors.pincode ? "border-red-500" : "border-[#F3EBDD] focus:border-[#173D2B]"
                      }`}
                    />
                    {errors.pincode && (
                      <p className="text-[10px] text-red-600 mt-1">{errors.pincode}</p>
                    )}
                  </div>
                </div>

                {/* Delivery Notes */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ring doorbell, call before arrival"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selection */}
            <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-6 shadow-2xs space-y-4 rounded-xs">
              <div className="flex items-center gap-2 border-b border-[#F3EBDD] pb-3">
                <CreditCard className="w-4 h-4 text-[#B89A5A]" />
                <h2 className="font-serif text-base sm:text-lg font-medium text-[#173D2B]">
                  2. Choose Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Option 1: Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-4 border rounded-xs flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === "COD"
                      ? "border-[#173D2B] bg-[#FAF7F0] shadow-xs"
                      : "border-[#F3EBDD] bg-[#FFFFFF] hover:border-[#173D2B]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="mt-1 text-[#173D2B] focus:ring-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-[#173D2B]">
                      <Banknote className="w-4 h-4 text-[#B89A5A]" />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-[11px] text-[#242424]/70 mt-1 leading-relaxed">
                      Pay with cash or scan delivery QR upon receiving your order.
                    </p>
                  </div>
                </label>

                {/* Option 2: Online Payment */}
                <label
                  onClick={() => setPaymentMethod("Online")}
                  className={`p-4 border rounded-xs flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === "Online"
                      ? "border-[#173D2B] bg-[#FAF7F0] shadow-xs"
                      : "border-[#F3EBDD] bg-[#FFFFFF] hover:border-[#173D2B]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "Online"}
                    onChange={() => setPaymentMethod("Online")}
                    className="mt-1 text-[#173D2B] focus:ring-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-[#173D2B]">
                      <CreditCard className="w-4 h-4 text-[#B89A5A]" />
                      <span>Online Payment Gateway</span>
                    </div>
                    <p className="text-[11px] text-[#242424]/70 mt-1 leading-relaxed">
                      UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards &amp; NetBanking.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer rounded-xs disabled:opacity-60"
            >
              <Lock className="w-4 h-4 text-[#B89A5A]" />
              <span>
                {isSubmitting
                  ? "Securing Your Order..."
                  : paymentMethod === "COD"
                  ? `CONFIRM ORDER & PAY ON DELIVERY (₹${grandTotal.toLocaleString("en-IN")})`
                  : `PROCEED TO SECURE PAYMENT (₹${grandTotal.toLocaleString("en-IN")})`}
              </span>
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary & Coupon (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-6 shadow-2xs space-y-5 rounded-xs sticky top-28">
            <h3 className="font-serif text-lg text-[#173D2B] border-b border-[#F3EBDD] pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-[#B89A5A] font-sans font-semibold">
                {cartCount} item{cartCount > 1 ? "s" : ""}
              </span>
            </h3>

            {/* Items List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 bg-[#F3EBDD] shrink-0 overflow-hidden rounded-2xs">
                      <Image
                        src={encodeURI(item.product.image)}
                        alt={item.product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-medium text-[#173D2B] line-clamp-1 block">
                        {item.product.name}
                      </span>
                      <span className="text-[10px] text-[#242424]/60">
                        Size: {item.selectedSize} • Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold text-[#173D2B] shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Application */}
            <div className="pt-3 border-t border-[#F3EBDD] space-y-2">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-2 py-2 text-xs uppercase bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#173D2B] text-[#FAF7F0] text-xs uppercase tracking-wider font-semibold rounded-xs"
                >
                  Apply
                </button>
              </form>

              {couponMessage && (
                <p
                  className={`text-[10px] ${
                    couponMessage.isError ? "text-red-700" : "text-emerald-700 font-semibold"
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xs text-[11px] text-emerald-800">
                  <span className="flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3 text-emerald-600" />
                    Applied: <strong>{appliedCoupon.code}</strong> (-{formatPrice(discountAmount)})
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#801426] hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Calculation Totals */}
            <div className="pt-3 border-t border-[#F3EBDD] space-y-2 text-xs text-[#242424]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-[#801426] font-medium">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Pan-India Shipping</span>
                <span className={deliveryCharge === 0 ? "text-emerald-700 font-semibold" : ""}>
                  {deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}
                </span>
              </div>

              <div className="flex justify-between text-base font-semibold text-[#173D2B] pt-3 border-t border-[#F3EBDD]">
                <span>Total Amount</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-[#F3EBDD] space-y-2 text-[11px] text-[#242424]/70">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#B89A5A]" />
                <span>Pan-India express dispatch within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89A5A]" />
                <span>Original authentic handlooms with hallmark quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Online Payment Authorization Modal */}
      {isPaymentModalOpen && onlineOrderPayload && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#173D2B]/50 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-[#FFFFFF] border border-[#F3EBDD] p-6 shadow-2xl rounded-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#F3EBDD] pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                <h3 className="font-serif text-lg text-[#173D2B]">
                  Online Payment Gateway
                </h3>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="text-[#242424]/40 hover:text-[#242424]"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#FAF7F0] p-4 border border-[#F3EBDD] rounded-xs space-y-2 text-xs">
              <div className="flex justify-between font-medium">
                <span>Merchant:</span>
                <span className="font-semibold text-[#173D2B]">SHIVOHAM Premium Ethnic Wear</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-bold text-sm text-[#173D2B]">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-[#242424]/60">
                <span>Gateway Session:</span>
                <span className="font-mono">{onlineOrderPayload.paymentInit.orderId}</span>
              </div>
              <p className="pt-1 text-[11px] text-[#B89A5A]">
                {onlineOrderPayload.paymentInit.message}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleVerifyOnlinePayment}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase tracking-wider font-semibold rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isSubmitting ? "Verifying Transaction..." : "Simulate Successful Payment"}
                </span>
              </button>

              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-full py-2 text-xs text-[#242424]/60 hover:text-[#242424] font-medium"
              >
                Cancel &amp; Select Different Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#242424]">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">
          <CheckoutContent />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </ShopProvider>
  );
}
