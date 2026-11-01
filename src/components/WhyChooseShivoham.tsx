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
    <section id="why-choose" className="py-10 sm:py-16 lg:py-20 bg-[#FAF7F0] border-b border-[#F3EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#B89A5A]" />
            <span>The Shivoham Promise</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#173D2B] font-normal tracking-tight">
            Why Choose SHIVOHAM
          </h2>
          <div className="w-14 h-0.5 bg-[#B89A5A] mx-auto" />
          <p className="text-xs sm:text-sm text-[#242424]/75">
            Dedicated to pure handcrafted Indian fabrics, artisanal detailing, and timeless drapes.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#F3EBDD] hover:border-[#B89A5A] transition-all duration-300 p-5 sm:p-8 rounded-xs shadow-2xs hover:shadow-lg text-center space-y-3 sm:space-y-4 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-[#FAF7F0] border border-[#F3EBDD] group-hover:border-[#B89A5A] flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#173D2B] group-hover:text-[#B89A5A] transition-colors" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#B89A5A] font-semibold block mb-0.5 sm:mb-1">
                    {pillar.tagline}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#173D2B] font-medium">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#242424]/75 leading-relaxed font-normal">
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
