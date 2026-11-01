"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-[#FAF7F0] border-b border-[#F3EBDD] overflow-hidden">
      {/* Decorative Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#B89A5A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-60 sm:w-80 h-60 sm:h-80 bg-[#173D2B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] items-center py-8 sm:py-12 lg:py-0 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Left: Brand Typography & Call to Action */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-4 sm:space-y-6 z-10">
            {/* Small uppercase eyebrow text */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#B89A5A] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#B89A5A]" />
              <span>SHIVOHAM</span>
            </div>

            {/* Refined Serif Heading */}
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-6xl text-[#173D2B] font-normal tracking-tight leading-tight">
              Elegance in Every Thread
            </h1>

            {/* Short Description */}
            <p className="text-xs sm:text-base lg:text-lg text-[#242424]/80 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover Timeless Indian Ethnic Wear. Thoughtfully handcrafted sarees, graceful kurtis, and royal suit sets for life&apos;s celebrated moments.
            </p>

            {/* Premium Call to Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-10 py-3 sm:py-4 bg-[#173D2B] text-[#FAF7F0] hover:bg-[#123022] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-xs shadow-md hover:shadow-xl cursor-pointer group"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 text-[#B89A5A] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#categories"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3.5 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-[#173D2B] hover:text-[#B89A5A] transition-colors border-b border-transparent hover:border-[#B89A5A]"
              >
                <span>View Categories</span>
              </Link>
            </div>

            {/* Subtle Brand Trust Note */}
            <div className="pt-3 sm:pt-4 border-t border-[#F3EBDD]/80 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] sm:text-xs text-[#242424]/70">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
                <span>100% Pure Cotton Sarees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
                <span>Artisanal Kurtis &amp; Suits</span>
              </div>
            </div>
          </div>

          {/* Right: Beautiful Indian Ethnic Fashion Model */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative">
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-md aspect-[3/4] rounded-xs overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-[#FAF7F0] outline outline-1 outline-[#B89A5A]/40 bg-[#F3EBDD]">
              <Image
                src={encodeURI("/images/saree/saree 10.png")}
                alt="SHIVOHAM Indian Ethnic Wear - Elegance in Every Thread"
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 40vw"
                className="object-cover object-top hover:scale-103 transition-transform duration-700"
              />

              {/* Subtle Luxury Corner Stamp */}
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-[#173D2B]/90 backdrop-blur-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xs border border-[#B89A5A]/50 text-right">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-semibold text-[#E5D2A5] block">
                  ATELIER EDIT
                </span>
                <span className="text-[10px] sm:text-[11px] font-serif text-[#FAF7F0]">
                  Handloom Heritage
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
