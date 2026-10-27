"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/sampleProducts";
import { ProductCategory } from "@/types";

interface CategoryShowcaseProps {
  onSelectCategory?: (category: ProductCategory) => void;
}

export default function CategoryShowcase({ onSelectCategory }: CategoryShowcaseProps) {
  const handleCategoryClick = (category: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const target = document.getElementById("catalog-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="py-14 sm:py-20 bg-[#FAF7F0] border-b border-[#F3EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading (Surekhi Luxury Style) */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold">
            <Sparkles className="w-3 h-3 text-[#B89A5A]" />
            <span>Curated Silhouettes</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#173D2B] font-normal tracking-tight">
            Shop by Category
          </h2>
          <div className="w-16 h-0.5 bg-[#B89A5A] mx-auto" />
          <p className="text-xs sm:text-sm text-[#242424]/75">
            Discover all 78 handcrafted masterpieces woven for life&apos;s most cherished celebrations.
          </p>
        </div>

        {/* 3 Prominent Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group cursor-pointer flex flex-col bg-[#FFFFFF] border border-[#F3EBDD] hover:border-[#B89A5A] transition-all duration-300 shadow-xs hover:shadow-2xl overflow-hidden"
            >
              {/* Category Image with Elegant Framing */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F3EBDD]">
                <Image
                  src={cat.image}
                  alt={`SHIVOHAM ${cat.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-108"
                />
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#143426]/85 via-[#143426]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Overlaid Title */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] text-[#E5D2A5] uppercase tracking-widest font-sans font-semibold block">
                    {cat.itemCountLabel}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#FAF7F0] leading-snug mt-1">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#FAF7F0]/80 font-sans mt-0.5 line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action with Gold Accent */}
              <div className="p-4 bg-[#FFFFFF] flex items-center justify-between text-xs font-medium text-[#173D2B] group-hover:text-[#B89A5A] transition-colors border-t border-[#F3EBDD]">
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  Explore {cat.title} Collection
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#B89A5A]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
