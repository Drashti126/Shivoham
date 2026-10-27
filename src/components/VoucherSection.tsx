"use client";

import React, { useState } from "react";
import { Tag, Copy, Check, Sparkles } from "lucide-react";
import { ACTIVE_COUPONS } from "@/data/sampleProducts";
import { useShop } from "@/context/ShopContext";

export default function VoucherSection() {
  const { applyCoupon, openCart } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => {
      setCopiedCode(null);
      openCart();
    }, 1000);
  };

  return (
    <section id="voucher-offers" className="py-12 sm:py-16 bg-[#FAF7F0] border-b border-[#F3EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border-2 border-dashed border-[#B89A5A]/50 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#B89A5A]" />
              <span>LIMITED PERIOD CELEBRATORY PRIVILEGES</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#173D2B] font-normal">
              Exclusive Boutique Voucher Codes
            </h2>
            <p className="text-xs sm:text-sm text-[#242424]/75">
              Click to copy and automatically apply the discount coupon to your shopping bag.
            </p>
          </div>

          {/* 3 Voucher Cards (Libas Coupon Style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ACTIVE_COUPONS.map((coupon) => {
              const isCopied = copiedCode === coupon.code;

              return (
                <div
                  key={coupon.code}
                  className="bg-[#FAF7F0] border border-[#F3EBDD] hover:border-[#173D2B] p-5 flex flex-col justify-between transition-all duration-300 relative group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[#801426] font-bold">
                        {coupon.title}
                      </span>
                      <Tag className="w-4 h-4 text-[#B89A5A]" />
                    </div>

                    <p className="text-xs text-[#242424]/80 leading-relaxed">
                      {coupon.description}
                    </p>
                  </div>

                  {/* Code & Copy Button */}
                  <div className="mt-5 pt-3 border-t border-[#F3EBDD] flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-[#173D2B] tracking-wider">
                      {coupon.code}
                    </span>

                    <button
                      onClick={() => handleCopyAndApply(coupon.code)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                        isCopied
                          ? "bg-emerald-700 text-white"
                          : "bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0]"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#B89A5A]" />
                          <span>Apply</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
