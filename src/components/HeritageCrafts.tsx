"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, MapPin } from "lucide-react";
import { HERITAGE_CRAFTS } from "@/data/sampleProducts";

export default function HeritageCrafts() {
  return (
    <section id="heritage-crafts" className="py-16 sm:py-24 bg-[#143426] text-[#FAF7F0] relative overflow-hidden">
      {/* Background Subtle Luxury Accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#B89A5A_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading (Surekhi Artisanal Tribute) */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0]/10 border border-[#B89A5A]/40 text-[#E5D2A5] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3 h-3 text-[#B89A5A]" />
            <span>THE WEAVES OF INDIA</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0] font-normal tracking-tight">
            Heirloom Crafts &amp; Master Looms
          </h2>

          <div className="w-20 h-0.5 bg-[#B89A5A] mx-auto" />

          <p className="text-xs sm:text-sm text-[#FAF7F0]/80 leading-relaxed font-light">
            Every Shivoham drape preserves the timeless soul of Indian artisans. We work directly
            with generational weaving clusters to bring you pure, unadulterated luxury.
          </p>
        </div>

        {/* 4 Heritage Craft Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HERITAGE_CRAFTS.map((craft) => (
            <div
              key={craft.id}
              className="group bg-[#FAF7F0]/5 border border-[#B89A5A]/30 hover:border-[#E5D2A5] p-5 flex flex-col justify-between transition-all duration-500 hover:bg-[#FAF7F0]/10 hover:-translate-y-1.5 shadow-lg"
            >
              <div className="space-y-4">
                {/* Craft Image with Gold Outline */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#173D2B] border border-[#B89A5A]/40">
                  <Image
                    src={encodeURI(craft.image)}
                    alt={craft.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#143426] via-transparent to-transparent opacity-60" />

                  {/* Origin Tag */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-[#143426]/90 backdrop-blur-xs px-2 py-0.5 text-[9px] text-[#E5D2A5] font-sans">
                    <MapPin className="w-2.5 h-2.5 text-[#B89A5A]" />
                    <span>{craft.origin}</span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-[#B89A5A] uppercase tracking-widest font-semibold block">
                    {craft.tagline}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-[#FAF7F0] leading-snug">
                    {craft.name}
                  </h3>
                  <p className="text-xs text-[#FAF7F0]/75 leading-relaxed font-light line-clamp-3">
                    {craft.description}
                  </p>
                </div>
              </div>

              {/* Bottom Craft Highlight */}
              <div className="mt-4 pt-3 border-t border-[#B89A5A]/30 flex items-center justify-between text-[10px] text-[#E5D2A5] uppercase tracking-wider font-semibold">
                <span>{craft.detail}</span>
                <span className="text-xs font-serif italic text-[#FAF7F0]/70">Pure Drape</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
