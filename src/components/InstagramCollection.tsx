"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { BUSINESS_CONTACT } from "@/data/sampleProducts";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramCollection() {
  const instagramPosts = [
    {
      id: "ig-1",
      image: "/images/saree/saree 10.png",
      caption: "Turquoise cotton drape radiating timeless Indian charm ✨ #ShivohamSarees",
      category: "Pure Cotton Sarees",
    },
    {
      id: "ig-2",
      image: "/images/kurtis/DocScanner 12 Oct 2026 10-51 am-1(201621346495824).jpg",
      caption: "Everyday comfort meets Lucknowi needlecraft elegance 🌿 #ShivohamKurtis",
      category: "Artisanal Kurtis",
    },
    {
      id: "ig-3",
      image: "/images/dress/file_0000000006b0821191833494d124292f.png",
      caption: "Emerald green 3-piece Anarkali suit set for festive celebrations 💫 #ShivohamSuits",
      category: "Designer Suit Sets",
    },
    {
      id: "ig-4",
      image: "/images/saree/saree 12.png",
      caption: "Woven heritage crafted with soul and authentic Indian artistry 🌸 #ShivohamDiaries",
      category: "Heritage Weaves",
    },
  ];

  return (
    <section id="instagram-collection" className="py-10 sm:py-16 lg:py-20 bg-[#FAF7F0] border-b border-[#F3EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold">
            <InstagramIcon className="w-3.5 h-3.5 text-[#B89A5A]" />
            <span>@SHIVOHAM_ETHNIC</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#173D2B] font-normal tracking-tight">
            Instagram Collection
          </h2>
          <div className="w-14 h-0.5 bg-[#B89A5A] mx-auto" />
          <p className="text-xs sm:text-sm text-[#242424]/75">
            Follow our styling journeys, real client celebrations, and artisanal unveilings.
          </p>
        </div>

        {/* 4 Selected Boutique Images in 1 Row (2-col on mobile, 4-col on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-[3/4] bg-[#F3EBDD] border border-[#F3EBDD] overflow-hidden rounded-xs shadow-2xs hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={encodeURI(post.image)}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-108"
              />

              {/* Mobile Subtle Bottom Stamp (for touch screens without hover) */}
              <div className="sm:hidden absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 flex items-center justify-between text-[#FAF7F0]">
                <span className="text-[9px] font-sans font-medium">
                  {post.category}
                </span>
                <InstagramIcon className="w-3 h-3 text-[#B89A5A]" />
              </div>

              {/* Desktop Instagram Hover Overlay */}
              <div className="hidden sm:flex absolute inset-0 bg-[#173D2B]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col items-center justify-center p-4 text-center text-[#FAF7F0]">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F0]/20 flex items-center justify-center mb-2.5 border border-[#B89A5A]/50">
                  <InstagramIcon className="w-5 h-5 text-[#FAF7F0]" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block mb-1">
                  {post.category}
                </span>
                <p className="text-xs text-[#FAF7F0]/90 font-serif line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-6 sm:mt-8">
          <a
            href={BUSINESS_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-semibold text-[#173D2B] hover:text-[#B89A5A] transition-colors border-b border-[#173D2B]/40 hover:border-[#B89A5A] pb-1"
          >
            <span>Connect With Our Stylists on WhatsApp</span>
            <Sparkles className="w-3.5 h-3.5 text-[#B89A5A]" />
          </a>
        </div>
      </div>
    </section>
  );
}
