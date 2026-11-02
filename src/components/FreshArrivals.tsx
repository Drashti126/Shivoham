"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Eye,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { FRESH_ARRIVALS_PRODUCTS } from "@/data/sampleProducts";
import { Product } from "@/types";

export default function FreshArrivals() {
  const {
    toggleWishlist,
    isInWishlist,
    openQuickView,
    addToCart,
    formatPrice,
    allCatalogProducts,
  } = useShop();

  const scrollRef = useRef<HTMLDivElement>(null);

  // Exactly 4 products displayed initially as requested
  const productsToDisplay = useMemo(() => {
    const published = allCatalogProducts.filter((p) => p.isPublished !== false);
    const newItems = published
      .filter((p) => p.badge?.toLowerCase().includes("new"))
      .slice(0, 4);

    if (newItems.length === 4) return newItems;
    if (published.length >= 4) return published.slice(0, 4);
    if (FRESH_ARRIVALS_PRODUCTS.length >= 4) return FRESH_ARRIVALS_PRODUCTS.slice(0, 4);
    return [];
  }, [allCatalogProducts]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (productsToDisplay.length < 4) {
    return null;
  }

  return (
    <section
      id="fresh-arrivals"
      aria-label="New Arrivals Editorial"
      className="py-14 sm:py-20 lg:py-24 bg-[#F9F6EF] border-b border-[#DCC7A5]/35 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Left-Aligned Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          {/* Left Aligned Heading & Description */}
          <div className="space-y-2.5 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#B99A55] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B99A55]" />
              <span>SEASONAL UNVEILINGS</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#173F35] font-normal tracking-tight">
              New Arrivals
            </h2>

            <p className="text-xs sm:text-sm text-[#343434]/75 font-normal leading-relaxed pt-1">
              Masterfully woven from breathable pure cottons with delicate Indian needlecraft.
              Each design is tailored for timeless occasion wear and effortless daily grace.
            </p>
          </div>

          {/* Right Action: Minimal View All Button + Smooth Scroll Controls */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 justify-between md:justify-end">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#173F35] hover:text-[#B99A55] transition-colors pb-1 border-b border-[#173F35]/40 hover:border-[#B99A55] group"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B99A55] group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Smooth Scroll Navigation Arrows */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-[#DCC7A5]/50">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll New Arrivals Left"
                className="w-8 h-8 rounded-full bg-[#F4EFE5] hover:bg-[#173F35] text-[#173F35] hover:text-[#F9F6EF] border border-[#DCC7A5]/50 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll New Arrivals Right"
                className="w-8 h-8 rounded-full bg-[#F4EFE5] hover:bg-[#173F35] text-[#173F35] hover:text-[#F9F6EF] border border-[#DCC7A5]/50 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Editorial Product Track with Smooth Scrolling */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {productsToDisplay.map((product) => {
            const inWishlist = isInWishlist(product.id);
            const discountPercent =
              product.originalPrice && product.originalPrice > product.price
                ? Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )
                : null;

            return (
              <div
                key={product.id}
                className="group flex flex-col w-[260px] xs:w-[280px] sm:w-[300px] shrink-0 snap-start bg-[#FFFFFF] border border-[#DCC7A5]/45 hover:border-[#173F35] transition-all duration-300 shadow-2xs hover:shadow-xl rounded-xs overflow-hidden"
              >
                {/* Image Frame - Consistent 3:4 Aspect Ratio */}
                <div
                  onClick={() => openQuickView(product)}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4EFE5] cursor-pointer"
                >
                  <Image
                    src={encodeURI(product.image)}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 260px, 300px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                  />

                  {/* Badges - Top Left */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
                    {product.badge && (
                      <span className="text-[8.5px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#173F35] text-[#F9F6EF] rounded-2xs">
                        {product.badge}
                      </span>
                    )}
                    {discountPercent && discountPercent > 0 && (
                      <span className="text-[8.5px] uppercase tracking-wider font-bold px-2 py-0.5 bg-[#801426] text-[#F9F6EF] rounded-2xs">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button - Top Right */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full transition-colors cursor-pointer shadow-2xs ${
                      inWishlist
                        ? "text-[#801426] bg-[#F9F6EF]"
                        : "text-[#343434]/70 hover:text-[#801426] bg-[#F9F6EF]/90 hover:bg-[#F9F6EF]"
                    }`}
                    aria-label={
                      inWishlist ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    <Heart
                      className={`w-4 h-4 ${inWishlist ? "fill-[#801426]" : ""}`}
                    />
                  </button>

                  {/* Quick View Overlay on Hover for Desktop */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuickView(product);
                    }}
                    className="absolute bottom-2.5 left-2.5 right-2.5 py-2 px-3 bg-[#F9F6EF]/95 hover:bg-[#F9F6EF] text-[#173F35] text-[11px] uppercase tracking-wider font-medium hidden sm:flex items-center justify-center gap-1.5 shadow-md border border-[#DCC7A5]/50 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Metadata & Actions */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-[#FFFFFF] space-y-2.5">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#B99A55] font-semibold block mb-0.5">
                      {product.category}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="font-serif text-sm text-[#343434] font-medium leading-snug hover:text-[#173F35] transition-colors line-clamp-2 min-h-[2.5rem] block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[11px] text-[#343434]/65 mt-0.5 line-clamp-1 font-sans">
                      {product.fabric}
                    </p>

                    {/* Available Sizes Pills */}
                    {Array.isArray(product.sizes) && product.sizes.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap mt-2">
                        <span className="text-[9px] text-[#343434]/50 mr-0.5">Sizes:</span>
                        {product.sizes.slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className="text-[9px] px-1 py-0.2 bg-[#F4EFE5] border border-[#DCC7A5]/40 text-[#173F35] font-medium rounded-2xs"
                          >
                            {s}
                          </span>
                        ))}
                        {product.sizes.length > 4 && (
                          <span className="text-[8px] text-[#343434]/40 font-medium">
                            +{product.sizes.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="pt-2 border-t border-[#DCC7A5]/40 flex items-baseline gap-2 mt-auto">
                    <span className="font-semibold text-base text-[#173F35]">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-xs text-[#343434]/40 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <div className="pt-1">
                    <button
                      onClick={() => addToCart(product, product.sizes?.[0] || "Free Size", 1)}
                      className="w-full py-2 bg-[#173F35] hover:bg-[#112d26] text-[#F9F6EF] text-[11px] uppercase tracking-wider font-semibold rounded-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-2xs cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#B99A55]" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
