"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";

interface EditorialPiece {
  id: string;
  plate: string;
  title: string;
  subtitle: string;
  category: string;
  price: number;
  image: string;
  href: string;
}

export default function ShivohamEdit() {
  const { openQuickView, allCatalogProducts, formatPrice } = useShop();

  // Curated actual SHIVOHAM boutique pieces featured in the editorial spread
  const mainLook: EditorialPiece = {
    id: "sh-sar-01",
    plate: "LOOKBOOK I",
    title: "Turquoise Blue Handloom Saree",
    subtitle: "Pure Cotton • Intricate Gold Zari Pallu",
    category: "Sarees",
    price: 550,
    image: "/images/saree/saree 10.png",
    href: "/products/sh-sar-01",
  };

  const secondaryLooks: EditorialPiece[] = [
    {
      id: "sh-sar-02",
      plate: "DETAIL II",
      title: "Peacock Teal Zari Booti Saree",
      subtitle: "Handcrafted Cotton Weave • Golden Borders",
      category: "Sarees",
      price: 550,
      image: "/images/saree/saree 11.png",
      href: "/products/sh-sar-02",
    },
    {
      id: "sh-prod-1793103042622",
      plate: "ENSEMBLE III",
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
      className="py-14 sm:py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#F3EBDD] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Magazine Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#B89A5A] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
            <span>EDITORIAL LOOKBOOK • VOL. 01</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
          </div>

          {/* Section Main Title */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#173D2B] font-normal tracking-tight">
            THE SHIVOHAM EDIT
          </h2>

          {/* Italic Serif Subtitle */}
          <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-[#B89A5A] font-normal">
            A Celebration of Timeless Indian Elegance.
          </p>

          {/* Delicate Divider */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="w-10 h-[1px] bg-[#B89A5A]/40" />
            <span className="text-[#B89A5A] text-xs">◆</span>
            <span className="w-10 h-[1px] bg-[#B89A5A]/40" />
          </div>

          {/* Editorial Note */}
          <p className="text-xs sm:text-sm text-[#242424]/75 max-w-lg mx-auto leading-relaxed pt-1 font-normal">
            A curated dialogue between pure handloom drapes and regal silhouettes.
            Handcrafted with soul, sculpted for celebratory grace.
          </p>
        </div>

        {/* Asymmetric Magazine-Style Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT: Large Editorial Fashion Photograph (Anchor) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="group relative aspect-[3/4] sm:aspect-[4/5] w-full h-full min-h-[380px] sm:min-h-[520px] lg:min-h-[620px] bg-[#F3EBDD] overflow-hidden rounded-xs border border-[#F3EBDD]">
              <Image
                src={encodeURI(mainLook.image)}
                alt={mainLook.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
              />

              {/* Subtle Editorial Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#143426]/80 via-transparent to-black/10 opacity-70 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

              {/* Top Corner Editorial Watermark / Stamp */}
              <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-10">
                <span className="inline-block px-2.5 py-1 bg-[#FAF7F0]/90 backdrop-blur-xs text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#173D2B] font-semibold border border-[#B89A5A]/30">
                  {mainLook.plate}
                </span>
              </div>

              {/* Bottom Editorial Caption Card */}
              <div className="absolute inset-x-3.5 bottom-3.5 sm:inset-x-5 sm:bottom-5 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 p-3.5 sm:p-5 bg-[#FAF7F0]/95 backdrop-blur-md border border-[#F3EBDD] rounded-xs">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#B89A5A] font-semibold block">
                    {mainLook.category} Atelier
                  </span>
                  <h3 className="font-serif text-base sm:text-xl text-[#173D2B] font-medium leading-snug">
                    {mainLook.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#242424]/70 font-sans">
                    {mainLook.subtitle} • <span className="font-semibold text-[#173D2B]">{formatPrice(mainLook.price)}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
                  <button
                    onClick={(e) => handleOpenProduct(e, mainLook.id)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#173D2B] text-[#FAF7F0] hover:bg-[#123022] text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#B89A5A]" />
                    <span>Quick View</span>
                  </button>
                  <Link
                    href={mainLook.href}
                    className="inline-flex items-center justify-center p-2 bg-[#FFFFFF] hover:bg-[#F3EBDD] text-[#173D2B] border border-[#F3EBDD] rounded-xs transition-colors"
                    aria-label={`View full details for ${mainLook.title}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Two Complementary Editorial Fashion Photographs */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5 sm:gap-6">
            {secondaryLooks.map((item, idx) => (
              <div
                key={item.id}
                className="group relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11] w-full bg-[#F3EBDD] overflow-hidden rounded-xs border border-[#F3EBDD] flex-1 flex flex-col justify-end"
              >
                <Image
                  src={encodeURI(item.image)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                />

                {/* Subtle Editorial Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#143426]/85 via-black/20 to-transparent opacity-75 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />

                {/* Top Corner Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <span className="inline-block px-2 py-0.5 bg-[#FAF7F0]/90 backdrop-blur-xs text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-[#173D2B] font-semibold border border-[#B89A5A]/30">
                    {item.plate}
                  </span>
                </div>

                {/* Bottom Overlaid Label & Quick Action */}
                <div className="relative z-10 p-3 sm:p-4 flex items-end justify-between gap-3 text-[#FAF7F0]">
                  <div className="space-y-0.5">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#E5D2A5] font-semibold block">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base font-medium leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-[#FAF7F0]/80 font-sans line-clamp-1">
                      {item.subtitle} • <span className="font-semibold text-[#E5D2A5]">{formatPrice(item.price)}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => handleOpenProduct(e, item.id)}
                      className="p-1.5 bg-[#FAF7F0]/90 hover:bg-[#FAF7F0] text-[#173D2B] rounded-xs transition-colors cursor-pointer"
                      title="Quick View"
                      aria-label={`Quick View for ${item.title}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      href={item.href}
                      className="p-1.5 bg-[#173D2B] hover:bg-[#123022] text-[#FAF7F0] border border-[#B89A5A]/40 rounded-xs transition-colors"
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

        {/* Editorial Action Bar: EXPLORE THE COLLECTION */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-[#F3EBDD] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold block">
              ATELIER ARCHIVE
            </span>
            <p className="font-serif text-base sm:text-lg text-[#173D2B] font-normal">
              Experience the full anthology of handwoven sarees, artisanal kurtis, and royal suits.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#173D2B] text-[#FAF7F0] hover:bg-[#123022] text-xs sm:text-sm uppercase tracking-[0.22em] font-semibold transition-all duration-300 rounded-xs shadow-md hover:shadow-xl cursor-pointer border border-[#B89A5A]/40 group"
          >
            <span>EXPLORE THE COLLECTION</span>
            <ArrowRight className="w-4 h-4 text-[#B89A5A] group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
