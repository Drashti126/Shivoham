"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { FRESH_ARRIVALS_PRODUCTS } from "@/data/sampleProducts";

export default function FreshArrivals() {
  const { toggleWishlist, isInWishlist, openQuickView, addToCart, formatPrice, allCatalogProducts } = useShop();

  const productsToDisplay = useMemo(() => {
    const published = allCatalogProducts.filter((p) => p.isPublished !== false);
    // Prefer products with "New" or sorted by createdAt, fallback to FRESH_ARRIVALS_PRODUCTS
    const newItems = published
      .filter((p) => p.badge?.toLowerCase().includes("new") || p.createdAt)
      .slice(0, 4);

    return newItems.length >= 4 ? newItems : published.slice(0, 4).length > 0 ? published.slice(0, 4) : FRESH_ARRIVALS_PRODUCTS;
  }, [allCatalogProducts]);

  return (
    <section id="fresh-arrivals" className="py-12 sm:py-16 bg-[#FAF7F0] border-b border-[#F3EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-2">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold block">
            Seasonal Unveilings
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#173D2B] font-normal tracking-tight">
            New Arrivals
          </h2>
          <div className="w-12 h-0.5 bg-[#B89A5A] mx-auto" />
          <p className="text-xs sm:text-sm text-[#242424]/75">
            Discover the latest seasonal weaves and designs crafted for everyday refinement.
          </p>
        </div>

        {/* 4 Products in a Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {productsToDisplay.map((product) => {
            const inWishlist = isInWishlist(product.id);
            const discountPercent = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )
              : null;
            const inStock = product.inStock !== false;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#FFFFFF] border border-[#F3EBDD] hover:border-[#173D2B] transition-all duration-300 shadow-2xs hover:shadow-lg rounded-xs overflow-hidden"
              >
                {/* Image Frame */}
                <div
                  onClick={() => openQuickView(product)}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-[#F3EBDD] cursor-pointer"
                >
                  <Image
                    src={encodeURI(product.image)}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Top Left Badges */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
                    <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#173D2B] text-[#FAF7F0]">
                      {product.badge || "New Arrival"}
                    </span>
                    {discountPercent && (
                      <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 bg-[#801426] text-[#FAF7F0]">
                        {discountPercent}% OFF
                      </span>
                    )}
                    <span
                      className={`text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 text-white ${
                        inStock ? "bg-emerald-800" : "bg-amber-800"
                      }`}
                    >
                      {inStock ? "In Stock" : "Made to Order"}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full transition-colors cursor-pointer ${
                      inWishlist
                        ? "text-[#801426] bg-[#FAF7F0] shadow-sm"
                        : "text-[#242424]/70 hover:text-[#801426] bg-[#FAF7F0]/80 hover:bg-[#FAF7F0]"
                    }`}
                    aria-label={
                      inWishlist ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    <Heart
                      className={`w-4 h-4 ${inWishlist ? "fill-[#801426]" : ""}`}
                    />
                  </button>

                  {/* Desktop Hover Action Overlay */}
                  <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(product);
                      }}
                      className="flex-1 py-2 px-3 bg-[#FAF7F0]/95 hover:bg-[#FAF7F0] text-[#173D2B] text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 shadow-md border border-[#F3EBDD] cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="p-2 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] shadow-md cursor-pointer"
                      title="Add to Shopping Bag"
                      aria-label="Add to bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-[#FFFFFF]">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#B89A5A] font-semibold block mb-1">
                      {product.category}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="font-serif text-sm sm:text-base text-[#242424] font-medium leading-snug hover:text-[#173D2B] transition-colors line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[11px] text-[#242424]/65 mt-0.5 line-clamp-1 font-sans">
                      {product.fabric}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#F3EBDD] flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-sm sm:text-base text-[#173D2B]">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#242424]/40 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="p-1 text-[#173D2B] hover:text-[#B89A5A] transition-colors"
                      title="View Details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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
