"use client";

import React from "react";
import { Star, ShieldCheck } from "lucide-react";
import { CUSTOMER_REVIEWS, BUSINESS_CONTACT } from "@/data/sampleProducts";

export default function CustomerReviews() {
  return (
    <section className="py-14 sm:py-20 bg-[#FAF7F0] border-b border-[#F3EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-2">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold block">
            VERIFIED CLIENT LOVE
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#173D2B] font-normal tracking-tight">
            The #ShivohamDiaries
          </h2>
          <div className="w-16 h-0.5 bg-[#B89A5A] mx-auto" />
          <p className="text-xs sm:text-sm text-[#242424]/75">
            Cherished reflections from women who wear tradition with elegance and pride.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FFFFFF] border border-[#F3EBDD] hover:border-[#173D2B] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-md"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#B89A5A] text-[#B89A5A]"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="font-serif italic text-sm text-[#242424]/85 leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author & Product */}
              <div className="mt-6 pt-4 border-t border-[#F3EBDD] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-medium text-sm text-[#173D2B]">
                    {review.name}
                  </span>
                  <span className="text-[11px] text-[#242424]/60 font-sans">
                    {review.city}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#B89A5A] font-semibold">
                  <ShieldCheck className="w-3 h-3 text-[#173D2B]" />
                  <span>{review.productTitle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Guarantees Row (Surekhi & Libas Hallmark) */}
        <div className="mt-14 pt-10 border-t border-[#F3EBDD] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="font-serif text-lg text-[#173D2B] font-medium block">
              100% Authentic
            </span>
            <span className="text-xs text-[#242424]/70">
              Direct from Master Weaving Clusters
            </span>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-lg text-[#173D2B] font-medium block">
              Complimentary Shipping
            </span>
            <span className="text-xs text-[#242424]/70">
              Pan-India Orders Above ₹1,999
            </span>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-lg text-[#173D2B] font-medium block">
              7-Day Returns
            </span>
            <span className="text-xs text-[#242424]/70">
              Hassle-Free Exchange Guarantee
            </span>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-lg text-[#173D2B] font-medium block">
              Bespoke Styling
            </span>
            <span className="text-xs text-[#242424]/70">
              Personal WhatsApp Concierge
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
