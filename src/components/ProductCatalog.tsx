"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Eye,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Search,
  X,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { ALL_PRODUCTS } from "@/data/sampleProducts";
import { ProductCategory, Product } from "@/types";

interface ProductCatalogProps {
  initialCategory?: ProductCategory | "All";
}

export default function ProductCatalog({
  initialCategory = "All",
}: ProductCatalogProps) {
  const {
    toggleWishlist,
    isInWishlist,
    openQuickView,
    addToCart,
    formatPrice,
    generateProductWhatsAppLink,
    allCatalogProducts,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);
  const effectiveCatalog =
    allCatalogProducts && allCatalogProducts.length > 0 ? allCatalogProducts : products;
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">(
    initialCategory
  );

  // Load from persistent DB
  useEffect(() => {
    async function loadDbProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to load products from DB:", err);
      }
    }
    loadDbProducts();
  }, []);

  // Listen for category selection events from HeroBanner and CategoryShowcase
  useEffect(() => {
    const handleCategoryEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ProductCategory | "All">;
      if (customEvent.detail) {
        setSelectedCategory(customEvent.detail);
      }
    };
    window.addEventListener("shivoham:select-category", handleCategoryEvent);
    return () => window.removeEventListener("shivoham:select-category", handleCategoryEvent);
  }, []);

  const publicProducts = useMemo(() => {
    return effectiveCatalog.filter((p) => p.isPublished !== false);
  }, [effectiveCatalog]);

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...publicProducts];

    // Category filter
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Keyword search filter (from header search bar)
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [publicProducts, selectedCategory, searchQuery]);

  return (
    <section id="catalog-section" className="py-14 sm:py-20 bg-[#FAF7F0] border-b border-[#F3EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Grand Product Atelier</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#173D2B] font-normal tracking-tight">
            Curated Ethnic Wardrobe
          </h2>
          <div className="w-16 h-0.5 bg-[#B89A5A] mx-auto" />
          <p className="text-xs sm:text-sm text-[#242424]/75">
            Every piece is masterfully woven, blending regal Indian craftsmanship with modern silhouettes.
          </p>
        </div>

        {/* Active Category or Search Pill */}
        {(searchQuery || selectedCategory !== "All") && (
          <div className="flex items-center justify-between bg-[#FFFFFF] border border-[#F3EBDD] px-4 py-3 mb-8 rounded-xs text-xs text-[#173D2B] shadow-2xs">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#B89A5A]" />
              <span>
                {selectedCategory !== "All" && (
                  <span className="font-semibold uppercase tracking-wider mr-2 text-[#173D2B]">
                    {selectedCategory}
                  </span>
                )}
                {searchQuery && (
                  <span>
                    Search: &ldquo;<strong>{searchQuery}</strong>&rdquo;
                  </span>
                )}
                <span className="text-[#242424]/60 ml-1">
                  ({filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? "style" : "styles"})
                </span>
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-[#801426] hover:underline font-semibold cursor-pointer text-xs"
            >
              View All Styles
            </button>
          </div>
        )}

        {/* Empty Search Results */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] border border-[#F3EBDD] rounded-xs space-y-3">
            <Sparkles className="w-8 h-8 text-[#B89A5A] mx-auto opacity-70" />
            <h3 className="font-serif text-xl text-[#173D2B]">No Styles Found</h3>
            <p className="text-xs text-[#242424]/60 max-w-sm mx-auto">
              We couldn&apos;t find any items matching your selection. Please clear your search or explore our full collection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2 bg-[#173D2B] text-[#FAF7F0] text-xs uppercase tracking-wider font-semibold rounded-xs cursor-pointer"
            >
              View All Styles
            </button>
          </div>
        ) : (
          /* Products Grid (2 on mobile, 3 on tablet, 4 on desktop) */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredAndSortedProducts.map((product) => {
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
                  className="group flex flex-col bg-[#FFFFFF] border border-[#F3EBDD] hover:border-[#173D2B] transition-all duration-300 shadow-2xs hover:shadow-xl rounded-xs overflow-hidden"
                >
                  {/* Image Frame with Dual Hover Flip */}
                  <div
                    onClick={() => openQuickView(product)}
                    className="relative aspect-[3/4] w-full overflow-hidden bg-[#F3EBDD] cursor-pointer"
                  >
                    {/* Primary Image */}
                    <Image
                      src={encodeURI(product.image)}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={`object-cover object-top transition-all duration-500 ${
                        product.secondaryImage
                          ? "group-hover:opacity-0 group-hover:scale-105"
                          : "group-hover:scale-105"
                      }`}
                    />

                    {/* Secondary Image for Hover Flip */}
                    {product.secondaryImage && (
                      <Image
                        src={encodeURI(product.secondaryImage)}
                        alt={`${product.name} detail view`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-top absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
                      {product.badge && (
                        <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#173D2B] text-[#FAF7F0] shadow-xs">
                          {product.badge}
                        </span>
                      )}
                      {discountPercent && (
                        <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 bg-[#801426] text-[#FAF7F0] shadow-xs">
                          {discountPercent}% OFF
                        </span>
                      )}
                      <span
                        className={`text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 shadow-xs ${
                          inStock
                            ? "bg-emerald-800 text-white"
                            : "bg-amber-800 text-white"
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
                      className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full transition-all cursor-pointer ${
                        inWishlist
                          ? "text-[#801426] bg-[#FAF7F0] shadow-sm scale-110"
                          : "text-[#242424]/70 hover:text-[#801426] bg-[#FAF7F0]/85 hover:bg-[#FAF7F0]"
                      }`}
                      aria-label={
                        inWishlist ? "Remove from wishlist" : "Add to wishlist"
                      }
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          inWishlist ? "fill-[#801426]" : ""
                        }`}
                      />
                    </button>

                    {/* Hover Quick Size Selector Bar */}
                    <div className="absolute bottom-0 inset-x-0 bg-[#FAF7F0]/95 backdrop-blur-xs border-t border-[#F3EBDD] p-2 flex flex-col items-center gap-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-[#173D2B]">
                        Quick Add Size:
                      </span>
                      <div className="flex items-center gap-1 flex-wrap justify-center">
                        {product.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, sz);
                            }}
                            className="px-2 py-0.5 text-[10px] font-medium bg-[#FFFFFF] hover:bg-[#173D2B] hover:text-[#FAF7F0] text-[#242424] border border-[#F3EBDD] rounded-xs transition-colors cursor-pointer"
                          >
                            {sz.length > 8 ? "Free Size" : sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Meta Content */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                    <div className="space-y-1">
                      {/* Fabric Highlight in Muted Gold */}
                      <span className="text-[10px] uppercase tracking-wider font-sans font-semibold text-[#B89A5A] block truncate">
                        {product.fabric}
                      </span>

                      {/* Product Name (Clickable link to Product Detail Page) */}
                      <Link
                        href={`/products/${product.id}`}
                        className="font-serif text-sm sm:text-base font-normal text-[#242424] hover:text-[#173D2B] transition-colors leading-snug block line-clamp-2"
                        title={`View ${product.name} details`}
                      >
                        {product.name}
                      </Link>
                    </div>

                    {/* Pricing Row */}
                    <div className="pt-2 border-t border-[#F3EBDD]/70 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-sm sm:text-base font-semibold text-[#173D2B]">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#242424]/50 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {/* View Detail link */}
                        <Link
                          href={`/products/${product.id}`}
                          className="p-1.5 text-[#242424]/60 hover:text-[#173D2B] hover:bg-[#F3EBDD]/60 rounded-full transition-colors"
                          title="View Product Page"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        {/* WhatsApp Quick Inquiry Icon */}
                        <a
                          href={generateProductWhatsAppLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-[#173D2B] hover:text-[#B89A5A] hover:bg-[#F3EBDD]/60 rounded-full transition-colors"
                          title="Inquire on WhatsApp"
                          aria-label="Inquire about this product on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
