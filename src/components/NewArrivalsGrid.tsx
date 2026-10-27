"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { SAMPLE_PRODUCTS } from "@/data/sampleProducts";
import { Product } from "@/types";

export default function NewArrivalsGrid() {
  const { toggleWishlist, isInWishlist, openQuickView } = useShop();

  // Show 4 refined products in one clean row
  const displayProducts = SAMPLE_PRODUCTS.slice(0, 4);

  return (
    <section id="new-arrivals" className="py-14 sm:py-20 bg-[#FAF8F3] border-b border-[#EDE6DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#173D2B] font-normal tracking-tight">
            New Arrivals
          </h2>
        </div>

        {/* 4 Products in one row on desktop, 2 per row on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 lg:gap-10">
          {displayProducts.map((product) => {
            const inWishlist = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="group flex flex-col"
              >
                {/* Image Frame with Minimal Wishlist Icon */}
                <div
                  onClick={() => openQuickView(product)}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDE6DA] cursor-pointer"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                  />

                  {/* Small, Unobtrusive Wishlist Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-full transition-colors ${
                      inWishlist
                        ? "text-[#173D2B] bg-[#FAF8F3]/90"
                        : "text-[#292929]/70 hover:text-[#173D2B] bg-[#FAF8F3]/80 hover:bg-[#FAF8F3]"
                    }`}
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={inWishlist ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                {/* Minimal Product Information */}
                <div
                  onClick={() => openQuickView(product)}
                  className="mt-3 cursor-pointer"
                >
                  <h3 className="font-serif text-sm sm:text-base text-[#292929] font-medium leading-snug group-hover:text-[#173D2B] transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-xs sm:text-sm font-medium text-[#173D2B]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] sm:text-xs text-[#292929]/40 line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
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
