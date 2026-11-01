"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { TRENDING_PRODUCTS } from "@/data/sampleProducts";

export default function TrendingCollection() {
  const {
    toggleWishlist,
    isInWishlist,
    openQuickView,
    addToCart,
    formatPrice,
    allCatalogProducts,
  } = useShop();

  const productsToDisplay = useMemo(() => {
    const published = allCatalogProducts.filter((p) => p.isPublished !== false);
    const bestsellers = published
      .filter(
        (p) =>
          p.badge?.toLowerCase().includes("bestseller") ||
          p.badge?.toLowerCase().includes("trending")
      )
      .slice(0, 4);

    if (bestsellers.length === 4) return bestsellers;
    if (published.length >= 8) return published.slice(4, 8);
    if (published.length >= 4) return published.slice(0, 4);
    if (TRENDING_PRODUCTS.length >= 4) return TRENDING_PRODUCTS.slice(0, 4);
    return [];
  }, [allCatalogProducts]);

  // If there are not enough products for a section, hide it instead of duplicating
  if (productsToDisplay.length < 4) {
    return null;
  }

  return (
    <section id="trending-styles" className="py-10 sm:py-16 lg:py-20 bg-[#FAF7F0] border-b border-[#F3EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#B89A5A]" />
            <span>Most Adored Silhouettes</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#173D2B] font-normal tracking-tight">
            Best Sellers
          </h2>
          <div className="w-14 h-0.5 bg-[#B89A5A] mx-auto" />
          <p className="text-xs sm:text-sm text-[#242424]/75">
            Cherished festive and everyday drapes loved by patrons across India for their grace and pure comfort.
          </p>
        </div>

        {/* ONLY 4 products in a responsive grid (2-col on mobile, 4-col on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
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
                className="group flex flex-col h-full bg-[#FFFFFF] border border-[#F3EBDD] hover:border-[#173D2B] transition-all duration-300 shadow-2xs hover:shadow-lg rounded-xs overflow-hidden"
              >
                {/* Image Frame - Consistent 3:4 Aspect Ratio */}
                <div
                  onClick={() => openQuickView(product)}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-[#F3EBDD] cursor-pointer"
                >
                  <Image
                    src={encodeURI(product.image)}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-104"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 flex flex-col gap-1 items-start">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold px-1.5 sm:px-2 py-0.5 bg-[#B89A5A] text-[#FAF7F0] rounded-2xs">
                      {product.badge || "Best Seller"}
                    </span>
                    {discountPercent && discountPercent > 0 && (
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 bg-[#801426] text-[#FAF7F0] rounded-2xs">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button - Properly Positioned */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-20 p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer shadow-2xs ${
                      inWishlist
                        ? "text-[#801426] bg-[#FAF7F0]"
                        : "text-[#242424]/70 hover:text-[#801426] bg-[#FAF7F0]/85 hover:bg-[#FAF7F0]"
                    }`}
                    aria-label={
                      inWishlist ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? "fill-[#801426]" : ""}`}
                    />
                  </button>

                  {/* Desktop Hover Action Overlay */}
                  <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
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
                        addToCart(product, product.sizes?.[0] || "Free Size", 1);
                      }}
                      className="p-2 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] shadow-md cursor-pointer"
                      title="Add to Shopping Bag"
                      aria-label="Add to bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata - Full Name and Clear Pricing */}
                <div className="p-2.5 sm:p-4 flex flex-col justify-between flex-1 bg-[#FFFFFF] space-y-2">
                  <div>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#B89A5A] font-semibold block mb-0.5">
                      {product.category}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="font-serif text-xs sm:text-sm text-[#242424] font-medium leading-snug hover:text-[#173D2B] transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[10px] sm:text-[11px] text-[#242424]/65 mt-0.5 line-clamp-1 font-sans">
                      {product.fabric}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F3EBDD] flex items-center justify-between mt-auto">
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="font-semibold text-xs sm:text-base text-[#173D2B]">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-[10px] sm:text-xs text-[#242424]/40 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Mobile Quick Add Button */}
                    <button
                      onClick={() => addToCart(product, product.sizes?.[0] || "Free Size", 1)}
                      className="sm:hidden p-1.5 rounded-xs bg-[#173D2B] text-[#FAF7F0] flex items-center justify-center cursor-pointer shadow-xs active:scale-95 transition-transform"
                      title="Add to Cart"
                      aria-label="Add to Cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>

                    <Link
                      href={`/products/${product.id}`}
                      className="hidden sm:inline-block p-1 text-[#173D2B] hover:text-[#B89A5A] transition-colors"
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

        {/* View All Products CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#173D2B] text-[#FAF7F0] hover:bg-[#123022] text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-xs shadow-xs hover:shadow-md cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B89A5A]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
