"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Tag,
  Truck,
  Check,
  Sparkles,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { BUSINESS_CONTACT } from "@/data/sampleProducts";

export default function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    currency,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal,
    freeShippingThreshold,
    generateWhatsAppCartLink,
  } = useShop();

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponInput("");
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  const handleOrderOnWhatsApp = () => {
    window.open(generateWhatsAppCartLink(), "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#173D2B]/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F0] border-l border-[#F3EBDD] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3EBDD] bg-[#FFFFFF]">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg font-medium text-[#173D2B]">
                Your Shopping Bag
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#173D2B]/10 text-[#173D2B] font-bold">
                {cartCount}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#242424]/60 hover:text-[#173D2B] transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter (Libas Style) */}
          <div className="bg-[#FFFFFF] px-6 py-3 border-b border-[#F3EBDD] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-[#173D2B]">
                <Truck className="w-3.5 h-3.5 text-[#B89A5A]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-semibold">
                    Congratulations! You unlocked FREE Pan-India Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more for <strong>FREE Delivery</strong>
                  </span>
                )}
              </span>
            </div>
            <div className="w-full bg-[#FAF7F0] h-1.5 rounded-full overflow-hidden border border-[#F3EBDD]">
              <div
                className="bg-[#173D2B] h-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#F3EBDD] flex items-center justify-center shadow-xs">
                  <Sparkles className="w-8 h-8 text-[#B89A5A]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-[#173D2B]">Your Bag is Empty</h3>
                  <p className="text-xs text-[#242424]/60 max-w-xs">
                    Explore our exquisite Sarees, Anarkalis, and Kurtis to fill your trousseau with grace.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-[#173D2B] text-[#FAF7F0] text-xs uppercase tracking-widest font-semibold hover:bg-[#0f291d] transition-all cursor-pointer shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-[#FFFFFF] border border-[#F3EBDD] rounded-xs shadow-2xs hover:border-[#173D2B]/30 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 bg-[#F3EBDD] shrink-0 overflow-hidden rounded-xs">
                    <Image
                      src={encodeURI(item.product.image)}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[9px] uppercase tracking-wider text-[#B89A5A] font-semibold">
                          {item.product.category}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-[#242424]/40 hover:text-[#801426] transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-serif text-xs sm:text-sm text-[#173D2B] font-medium line-clamp-1 mt-0.5">
                        {item.product.name}
                      </h4>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] px-1.5 py-0.5 bg-[#FAF7F0] border border-[#F3EBDD] text-[#242424] font-medium rounded-2xs">
                          Size: {item.selectedSize}
                        </span>
                        <span className="text-xs font-semibold text-[#173D2B]">
                          {formatPrice(item.product.price)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#F3EBDD]/60 mt-2">
                      <div className="flex items-center border border-[#F3EBDD] bg-[#FAF7F0] rounded-2xs">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)
                          }
                          className="p-1 text-[#242424] hover:bg-[#F3EBDD] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#173D2B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)
                          }
                          className="p-1 text-[#242424] hover:bg-[#F3EBDD] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#173D2B]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout & Coupon Section */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#F3EBDD] space-y-4 bg-[#FFFFFF] max-h-[55vh] overflow-y-auto">
              {/* Coupon Applicator */}
              <div className="space-y-1.5">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. SHIVOHAM15)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs uppercase bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {couponMessage && (
                  <p
                    className={`text-[10px] ${
                      couponMessage.isError ? "text-[#801426]" : "text-emerald-700 font-semibold"
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
                      className="text-xs text-[#801426] hover:underline font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#242424]/80 pt-2 border-t border-[#F3EBDD]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-[#801426] font-medium">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Pan-India Delivery</span>
                  <span
                    className={
                      amountNeededForFreeShipping === 0 ? "text-emerald-700 font-semibold" : ""
                    }
                  >
                    {amountNeededForFreeShipping === 0 ? "FREE" : formatPrice(150)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-[#173D2B] pt-2 border-t border-[#F3EBDD]">
                  <span>Total Amount</span>
                  <span>
                    {formatPrice(finalTotal + (amountNeededForFreeShipping === 0 ? 0 : 150))}
                  </span>
                </div>
              </div>

              {/* Order Methods: Option A & Option B */}
              <div className="space-y-2 pt-2">
                {/* Option A: Buy Now / Website Checkout */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-4 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer rounded-xs"
                >
                  <span>PROCEED TO WEBSITE CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 text-[#B89A5A]" />
                </button>

                {/* Option B: Order on WhatsApp */}
                <button
                  onClick={handleOrderOnWhatsApp}
                  className="w-full py-3 px-4 border border-[#25D366] bg-[#FFFFFF] hover:bg-[#25D366]/5 text-[#173D2B] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer rounded-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>ORDER ON WHATSAPP (INSTANT CONCIERGE)</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3 text-[10px] text-[#242424]/60 text-center">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Guest Checkout Supported
                </span>
                <span>•</span>
                <span>No Mandatory Account Required</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
