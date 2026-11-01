"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CategoryShowcase() {
  const categories = [
    {
      id: "sarees",
      name: "SAREES",
      tagline: "Pure Cotton Handloom Sarees",
      href: "/category/sarees",
      image: "/images/saree/saree 10.png",
    },
    {
      id: "kurtis",
      name: "KURTIS",
      tagline: "Short & Long Kurtas, Co-ords & Sets",
      href: "/category/kurtis",
      image: "/images/kurtis/DocScanner 12 Oct 2026 10-51 am-1(201621346495824).jpg",
    },
    {
      id: "suits",
      name: "SUITS",
      tagline: "2-Piece & 3-Piece Suit Sets",
      href: "/category/suits",
      image: "/images/dress/file_0000000006b0821191833494d124292f.png",
    },
  ];

  return (
    <section id="categories" className="py-10 sm:py-16 lg:py-20 bg-[#FAF7F0] border-b border-[#F3EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#B89A5A]" />
            <span>Shop By Category</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#173D2B] font-normal tracking-tight">
            Curated Collections
          </h2>
          <div className="w-14 h-0.5 bg-[#B89A5A] mx-auto" />
          <p className="text-xs sm:text-sm text-[#242424]/75">
            Discover our three signature categories crafted for timeless Indian grace.
          </p>
        </div>

        {/* Three Category Cards: Equal in height and width in one horizontal row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex flex-col h-full bg-[#FFFFFF] border border-[#F3EBDD] hover:border-[#B89A5A] transition-all duration-300 shadow-2xs hover:shadow-xl rounded-xs overflow-hidden"
            >
              {/* Category Image: Equal Aspect Ratio across all cards */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F3EBDD]">
                <Image
                  src={encodeURI(cat.image)}
                  alt={`SHIVOHAM ${cat.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-106"
                />

                {/* Vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#143426]/85 via-[#143426]/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                {/* Overlaid Category Content */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <h3 className="font-serif text-2xl lg:text-3xl font-medium text-[#FAF7F0] leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#FAF7F0]/85 font-sans mt-1 line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
              </div>

              {/* Shop Now Button at Card Base */}
              <div className="p-3.5 sm:p-4 bg-[#FFFFFF] flex items-center justify-between text-xs font-semibold text-[#173D2B] group-hover:text-[#B89A5A] transition-colors border-t border-[#F3EBDD] mt-auto">
                <span className="uppercase tracking-[0.18em] text-[11px]">
                  Shop Now
                </span>
                <div className="w-7 h-7 rounded-full bg-[#FAF7F0] group-hover:bg-[#173D2B] flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#B89A5A] group-hover:text-[#FAF7F0] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
