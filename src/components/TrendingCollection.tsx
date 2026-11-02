"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { TRENDING_PRODUCTS } from "@/data/sampleProducts";
import { Product } from "@/types";

type CategoryFilter = "All" | "Sarees" | "Kurtis" | "Suits";

export default function TrendingCollection() {
  const {
    toggleWishlist,
    isInWishlist,
    openQuickView,
    addToCart,
    formatPrice,
    allCatalogProducts,
  } = useShop();

  // Category filter tabs: All | Sarees | Kurtis | Suits
  const [activeTab, setActiveTab] = useState<CategoryFilter>("All");

  const filterTabs: { label: string; value: CategoryFilter }[] = [
    { label: "All", value: "All" },
    { label: "Sarees", value: "Sarees" },
    { label: "Kurtis", value: "Kurtis" },
    { label: "Suits", value: "Suits" },
  ];

  // Actual product filtering based on active tab
  const productsToDisplay = useMemo(() => {
    const published = allCatalogProducts.filter((p) => p.isPublished !== false);

    if (activeTab === "All") {
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
    }

    if (activeTab === "Suits") {
      return published
        .filter(
          (p) => p.category === "Suits" || (p.category as string) === "Dresses"
        )
        .slice(0, 4);
    }

    return published.filter((p) => p.category === activeTab).slice(0, 4);
  }, [allCatalogProducts, activeTab]);

  const getViewAllLink = () => {
    switch (activeTab) {
      case "Sarees":
        return { href: "/category/sarees", label: "View All Sarees" };
      case "Kurtis":
        return { href: "/category/kurtis", label: "View All Kurtis" };
      case "Suits":
        return { href: "/category/suits", label: "View All Suits" };
      default:
        return { href: "/products", label: "View All Best Sellers" };
    }
  };

  const viewAll = getViewAllLink();

  return (
    <section
      id="trending-styles"
      aria-label="Best Sellers Collection"
      className="py-14 sm:py-20 lg:py-24 bg-[#F9F6EF] border-b border-[#DCC7A5]/35 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#B99A55] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A55]" />
            <span>MOST ADORED SILHOUETTES</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A55]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#173F35] font-normal tracking-tight">
            Best Sellers
          </h2>

          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="w-8 h-[1px] bg-[#B99A55]/40" />
            <span className="text-[#B99A55] text-xs">◆</span>
            <span className="w-8 h-[1px] bg-[#B99A55]/40" />
          </div>

          <p className="text-xs sm:text-sm text-[#343434]/75 font-normal leading-relaxed pt-1">
            Cherished festive and everyday drapes loved by patrons across India for their timeless grace and breathable comfort.
          </p>
        </div>

        {/* Category Filter Tabs: All | Sarees | Kurtis | Suits */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 sm:mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-xs cursor-pointer border ${
                  isActive
                    ? "bg-[#173F35] text-[#F9F6EF] border-[#173F35] shadow-xs"
                    : "bg-[#FFFFFF] text-[#343434]/80 border-[#DCC7A5]/50 hover:border-[#173F35] hover:text-[#173F35]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid: 4 Products Initially */}
        {productsToDisplay.length === 0 ? (
          <div className="text-center py-12 bg-[#F4EFE5] border border-[#DCC7A5]/40 rounded-xs">
            <p className="text-xs text-[#343434]/70">No styles currently found in {activeTab}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
                  className="group flex flex-col h-full bg-[#FFFFFF] border border-[#DCC7A5]/45 hover:border-[#173F35] transition-all duration-300 shadow-2xs hover:shadow-xl rounded-xs overflow-hidden"
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
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
                      <span className="text-[8.5px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#B99A55] text-[#F9F6EF] rounded-2xs">
                        {product.badge || "Best Seller"}
                      </span>
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
        )}

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-14">
          <Link
            href={viewAll.href}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#FFFFFF] hover:bg-[#F4EFE5] text-[#173F35] hover:text-[#B99A55] border border-[#DCC7A5] hover:border-[#173F35] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-xs shadow-2xs group"
          >
            <span>{viewAll.label}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B99A55] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
