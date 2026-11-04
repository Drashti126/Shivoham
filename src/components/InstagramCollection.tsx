"use client";

import React from "react";
import Image from "next/image";
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
    <section
      id="instagram-collection"
      aria-label="Instagram Collection Gallery"
      className="py-14 sm:py-20 lg:py-24 bg-[#F4EFE5] border-b border-[#DCC7A5]/35 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Minimal & Sophisticated */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-2.5">
          <a
            href={BUSINESS_CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B99A55] hover:text-[#173F35] font-semibold transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-[#B99A55]" />
            <span>{BUSINESS_CONTACT.instagramHandle.toUpperCase()}</span>
          </a>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#173F35] font-normal tracking-tight">
            Instagram Collection
          </h2>

          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="w-8 h-[1px] bg-[#B99A55]/40" />
            <span className="text-[#B99A55] text-xs">◆</span>
            <span className="w-8 h-[1px] bg-[#B99A55]/40" />
          </div>

          <p className="text-xs sm:text-sm text-[#343434]/75 font-normal leading-relaxed pt-1">
            Follow our styling journeys, real client celebrations, and artisanal unveilings.
          </p>
        </div>

        {/* Four Elegant Square Photographs with Consistent Spacing */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={BUSINESS_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-[#F9F6EF] border border-[#DCC7A5]/45 overflow-hidden rounded-xs shadow-2xs hover:shadow-xl transition-all duration-300 block cursor-pointer"
            >
              <Image
                src={encodeURI(post.image)}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-106"
              />

              {/* Minimal Hover Overlay */}
              <div className="absolute inset-0 bg-[#173F35]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-[#F9F6EF]">
                <div className="w-9 h-9 rounded-full bg-[#F9F6EF]/15 flex items-center justify-center mb-2 border border-[#B99A55]/50">
                  <InstagramIcon className="w-4 h-4 text-[#F9F6EF]" />
                </div>
                <span className="text-[9px] uppercase tracking-wider text-[#DCC7A5] font-semibold block mb-1">
                  {post.category}
                </span>
                <p className="text-[11px] text-[#F9F6EF]/90 font-serif line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
