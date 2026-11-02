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
      edition: "EDITION I",
      tagline: "Pure Cotton Handloom Sarees with Zari Weaves",
      href: "/category/sarees",
      image: "/images/saree/saree 10.png",
      cta: "Explore Sarees",
    },
    {
      id: "kurtis",
      name: "KURTIS",
      edition: "EDITION II",
      tagline: "Short & Long Kurtas, Co-ords & Tunic Sets",
      href: "/category/kurtis",
      image: "/images/kurtis/DocScanner 12 Oct 2026 10-51 am-1(201621346495824).jpg",
      cta: "Explore Kurtis",
    },
    {
      id: "suits",
      name: "SUITS",
      edition: "EDITION III",
      tagline: "Royal 2-Piece & 3-Piece Artisanal Suit Sets",
      href: "/category/suits",
      image: "/images/dress/file_0000000006b0821191833494d124292f.png",
      cta: "Explore Suits",
    },
  ];

  return (
    <section
      id="categories"
      aria-label="Curated Collections"
      className="py-14 sm:py-20 lg:py-24 bg-[#F4EFE5] border-b border-[#DCC7A5]/35 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#B99A55] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A55]" />
            <span>THE MAISON ARCHIVE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A55]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#173F35] font-normal tracking-tight">
            Curated Collections
          </h2>

          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="w-8 h-[1px] bg-[#B99A55]/40" />
            <span className="text-[#B99A55] text-xs">◆</span>
            <span className="w-8 h-[1px] bg-[#B99A55]/40" />
          </div>

          <p className="text-xs sm:text-sm text-[#343434]/75 font-normal leading-relaxed pt-1">
            Three signature silhouettes embodying India&apos;s timeless sartorial grace, woven with artisanal integrity.
          </p>
        </div>

        {/* Three Large Premium Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex flex-col h-full bg-[#F9F6EF] border border-[#DCC7A5]/50 hover:border-[#B99A55] transition-all duration-500 shadow-2xs hover:shadow-xl rounded-xs overflow-hidden"
            >
              {/* Category Image: Equal Aspect Ratio across all cards */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-[#F4EFE5]">
                <Image
                  src={encodeURI(cat.image)}
                  alt={`SHIVOHAM ${cat.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Minimal Luxury Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#173F35]/85 via-[#173F35]/25 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                {/* Top Corner Edition Kicker */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                  <span className="px-2.5 py-1 bg-[#F9F6EF]/90 backdrop-blur-xs text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.24em] font-semibold text-[#173F35] border border-[#B99A55]/30 rounded-2xs">
                    {cat.edition}
                  </span>
                </div>

                {/* Overlaid Category Content */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-left z-10">
                  <h3 className="font-serif text-2xl lg:text-3xl font-medium text-[#F9F6EF] tracking-wide leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#F9F6EF]/85 font-sans mt-1 line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
              </div>

              {/* Minimal Action Bar at Card Base */}
              <div className="p-3.5 sm:p-4 bg-[#F9F6EF] flex items-center justify-between text-xs font-semibold text-[#173F35] group-hover:text-[#B99A55] transition-colors border-t border-[#DCC7A5]/40 mt-auto">
                <span className="uppercase tracking-[0.2em] text-[11px]">
                  {cat.cta}
                </span>
                <div className="w-7 h-7 rounded-full bg-[#F4EFE5] group-hover:bg-[#173F35] flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 text-[#B99A55] group-hover:text-[#F9F6EF] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
