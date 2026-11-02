"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function ShivohamEdit() {
  const { openQuickView, allCatalogProducts, formatPrice } = useShop();

  // Curated actual SHIVOHAM boutique pieces featured in the editorial spread
  const mainLook = {
    id: "sh-sar-01",
    plate: "PLATE I • COUTURE DRAPE",
    title: "Turquoise Blue Handloom Saree",
    subtitle: "Pure Cotton • Handcrafted Gold Zari Pallu",
    category: "Sarees",
    price: 550,
    image: "/images/saree/saree 10.png",
    href: "/products/sh-sar-01",
  };

  const secondaryLooks = [
    {
      id: "sh-sar-02",
      plate: "PLATE II • WEAVE DETAIL",
      title: "Peacock Teal Zari Booti Saree",
      subtitle: "Handloom Cotton Weave with Intricate Zari Motifs",
      category: "Sarees",
      price: 550,
      image: "/images/saree/saree 11.png",
      href: "/products/sh-sar-02",
    },
    {
      id: "sh-prod-1793103042622",
      plate: "PLATE III • ANARKALI SILHOUETTE",
      title: "Emerald Royal Anarkali Set",
      subtitle: "3-Piece Pure Cotton Suit with Printed Dupatta",
      category: "Suits",
      price: 1400,
      image: "/images/dress/file_0000000006b0821191833494d124292f.png",
      href: "/products/sh-prod-1793103042622",
    },
  ];

  const handleOpenProduct = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const product = allCatalogProducts.find((p) => p.id === productId);
    if (product) {
      openQuickView(product);
    }
  };

  return (
    <section
      id="shivoham-edit"
      aria-label="The Shivoham Edit Editorial Magazine"
      className="py-16 sm:py-24 lg:py-28 bg-[#F4EFE5] border-b border-[#DCC7A5]/35 overflow-hidden transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Magazine Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#B99A55] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A55]" />
            <span>EDITORIAL LOOKBOOK • ATELIER VOL. 01</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A55]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#173F35] font-normal tracking-tight">
            THE SHIVOHAM EDIT
          </h2>

          <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-[#B99A55] font-normal">
            A Celebration of Timeless Indian Elegance.
          </p>

          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="w-10 h-[1px] bg-[#B99A55]/40" />
            <span className="text-[#B99A55] text-xs">◆</span>
            <span className="w-10 h-[1px] bg-[#B99A55]/40" />
          </div>

          <p className="text-xs sm:text-sm text-[#343434]/75 max-w-lg mx-auto leading-relaxed pt-1 font-normal">
            Where ancient handloom heritage converses with quiet luxury. Each drape is a study
            in delicate texture, poetic drape, and sublime breathable comfort.
          </p>
        </div>

        {/* Asymmetric Magazine-Style Composition: Large Left + 2 Vertically Arranged Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT: One Large Fashion Photograph (Editorial Anchor) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="group relative aspect-[3/4] sm:aspect-[4/5] w-full h-full min-h-[380px] sm:min-h-[520px] lg:min-h-[640px] bg-[#F9F6EF] overflow-hidden rounded-xs border border-[#DCC7A5]/50 shadow-2xs hover:shadow-xl transition-all duration-500">
              <Image
                src={encodeURI(mainLook.image)}
                alt={mainLook.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
              />

              {/* Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#173F35]/85 via-transparent to-black/10 opacity-75 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />

              {/* Top Corner Plate Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3 py-1 bg-[#F9F6EF]/90 backdrop-blur-xs text-[9px] uppercase tracking-[0.25em] text-[#173F35] font-semibold border border-[#B99A55]/40 rounded-2xs">
                  {mainLook.plate}
                </span>
              </div>

              {/* Bottom Editorial Caption Card */}
              <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 p-4 sm:p-5 bg-[#F9F6EF]/95 backdrop-blur-md border border-[#DCC7A5]/50 rounded-xs">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.24em] text-[#B99A55] font-semibold block">
                    {mainLook.category} Archive
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#173F35] font-medium leading-snug">
                    {mainLook.title}
                  </h3>
                  <p className="text-xs text-[#343434]/70 font-sans">
                    {mainLook.subtitle} • <span className="font-semibold text-[#173F35]">{formatPrice(mainLook.price)}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
                  <button
                    onClick={(e) => handleOpenProduct(e, mainLook.id)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#173F35] text-[#F9F6EF] hover:bg-[#112d26] text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#B99A55]" />
                    <span>Quick View</span>
                  </button>
                  <Link
                    href={mainLook.href}
                    className="inline-flex items-center justify-center p-2 bg-[#FFFFFF] hover:bg-[#F4EFE5] text-[#173F35] border border-[#DCC7A5]/50 rounded-xs transition-colors"
                    aria-label={`View full details for ${mainLook.title}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Two Smaller Photographs Arranged Vertically */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {secondaryLooks.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11] w-full bg-[#F9F6EF] overflow-hidden rounded-xs border border-[#DCC7A5]/50 shadow-2xs hover:shadow-xl transition-all duration-500 flex-1 flex flex-col justify-end"
              >
                <Image
                  src={encodeURI(item.image)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                />

                {/* Subtle Editorial Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#173F35]/85 via-black/20 to-transparent opacity-75 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />

                {/* Top Corner Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-block px-2.5 py-0.5 bg-[#F9F6EF]/90 backdrop-blur-xs text-[8.5px] uppercase tracking-[0.22em] text-[#173F35] font-semibold border border-[#B99A55]/40 rounded-2xs">
                    {item.plate}
                  </span>
                </div>

                {/* Bottom Overlaid Label & Quick Action */}
                <div className="relative z-10 p-3.5 sm:p-4 flex items-end justify-between gap-3 text-[#F9F6EF]">
                  <div className="space-y-0.5">
                    <span className="text-[8.5px] uppercase tracking-[0.2em] text-[#DCC7A5] font-semibold block">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base font-medium leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[10.5px] sm:text-xs text-[#F9F6EF]/80 font-sans line-clamp-1">
                      {item.subtitle} • <span className="font-semibold text-[#DCC7A5]">{formatPrice(item.price)}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => handleOpenProduct(e, item.id)}
                      className="p-1.5 bg-[#F9F6EF]/90 hover:bg-[#F9F6EF] text-[#173F35] rounded-xs transition-colors cursor-pointer"
                      title="Quick View"
                      aria-label={`Quick View for ${item.title}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      href={item.href}
                      className="p-1.5 bg-[#173F35] hover:bg-[#112d26] text-[#F9F6EF] border border-[#B99A55]/40 rounded-xs transition-colors"
                      title="View Details"
                      aria-label={`View details for ${item.title}`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Minimal Explore Collection Button */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#DCC7A5]/40 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B99A55] font-semibold block">
              ATELIER ARCHIVE
            </span>
            <p className="font-serif text-base sm:text-lg text-[#173F35] font-normal">
              Experience the full anthology of handwoven sarees, artisanal kurtis, and royal suits.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#173F35] text-[#F9F6EF] hover:bg-[#112d26] text-xs sm:text-sm uppercase tracking-[0.22em] font-semibold transition-all duration-300 rounded-xs shadow-md hover:shadow-xl cursor-pointer border border-[#B99A55]/40 group"
          >
            <span>EXPLORE THE COLLECTION</span>
            <ArrowRight className="w-4 h-4 text-[#B99A55] group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
