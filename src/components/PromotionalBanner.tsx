"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function PromotionalBanner() {
  return (
    <section className="bg-[#F3EBDD]/60 border-b border-[#F3EBDD] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FFFFFF] border border-[#F3EBDD] shadow-sm overflow-hidden">
          {/* Fashion Photograph (6 cols) */}
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full bg-[#F3EBDD] overflow-hidden">
            <Image
              src={encodeURI("/images/dress/file_00000000149482118cafca2e068e6acc.png")}
              alt="Every Occasion Your Signature Style - SHIVOHAM"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top hover:scale-103 transition-transform duration-700"
            />
          </div>

          {/* Campaign Narrative (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-5 text-center lg:text-left">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold block">
              THE OCCASION EDIT
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl text-[#173D2B] font-normal leading-tight">
              Every Occasion, Your Signature Style
            </h2>

            <p className="text-xs sm:text-base text-[#242424]/80 leading-relaxed font-normal max-w-lg mx-auto lg:mx-0">
              Explore 28 handcrafted designer dresses and gowns styled for festive dinners, sangeet nights, and grand celebrations.
            </p>

            <div className="pt-2">
              <a
                href="#catalog-section"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md group"
              >
                <span>DISCOVER ALL DRESSES</span>
                <ArrowRight className="w-4 h-4 text-[#B89A5A] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
