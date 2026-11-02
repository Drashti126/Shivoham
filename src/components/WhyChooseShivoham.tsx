"use client";

import React from "react";
import { Sparkles, ShieldCheck, Tag } from "lucide-react";

export default function WhyChooseShivoham() {
  const pillars = [
    {
      icon: Sparkles,
      title: "Elegant Ethnic Collection",
      tagline: "Curated Indian Grace",
      description:
        "Thoughtfully designed sarees, handcrafted kurtis, and regal suit sets that celebrate authentic Indian tradition with modern boutique elegance.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Fabrics",
      tagline: "Pure Handloom & Breathable Cottons",
      description:
        "Every garment is crafted from 100% skin-friendly, breathable cottons and artisanal textiles selected for unparalleled comfort, drape, and longevity.",
    },
    {
      icon: Tag,
      title: "Affordable Fashion",
      tagline: "Direct Boutique Value",
      description:
        "Direct-from-weaver craftsmanship that brings luxurious, occasion-worthy ethnic wear directly to you at honest, accessible boutique prices.",
    },
  ];

  return (
    <section
      id="why-choose"
      aria-label="Why Choose SHIVOHAM"
      className="py-14 sm:py-20 lg:py-24 bg-[#F9F6EF] border-b border-[#DCC7A5]/35 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#B99A55] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A55]" />
            <span>THE SHIVOHAM PROMISE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A55]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#173F35] font-normal tracking-tight">
            Why Choose SHIVOHAM
          </h2>

          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="w-8 h-[1px] bg-[#B99A55]/40" />
            <span className="text-[#B99A55] text-xs">◆</span>
            <span className="w-8 h-[1px] bg-[#B99A55]/40" />
          </div>

          <p className="text-xs sm:text-sm text-[#343434]/75 font-normal leading-relaxed pt-1">
            Dedicated to pure handcrafted Indian fabrics, artisanal detailing, and timeless drapes.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#DCC7A5]/45 hover:border-[#173F35] transition-all duration-300 p-6 sm:p-8 rounded-xs shadow-2xs hover:shadow-xl text-center space-y-3 sm:space-y-4 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-[#F4EFE5] border border-[#DCC7A5]/50 group-hover:border-[#B99A55] flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#173F35] group-hover:text-[#B99A55] transition-colors" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#B99A55] font-semibold block mb-1">
                    {pillar.tagline}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#173F35] font-medium">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#343434]/75 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
