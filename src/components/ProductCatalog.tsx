"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Eye,
  ShoppingBag,
  MessageCircle,
  ArrowUpDown,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
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
  } = useShop();

  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">(
    initialCategory
  );
  const [priceFilter, setPriceFilter] = useState<
    "all" | "under-3000" | "3000-7000" | "7000-12000" | "above-12000"
  >("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<"all" | "in-stock">("all");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [sortBy, setSortBy] = useState<
    "featured" | "newest" | "price-asc" | "price-desc" | "discount"
  >("featured");

  // Load from persistent DB
  useEffect(() => {
    async function loadDbProducts() {
      try {
        const res = await fetch("/api/products");
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

  const publicProducts = useMemo(() => {
    return products.filter((p) => p.isPublished !== false);
  }, [products]);

  const categoryTabs = useMemo(() => {
    const total = publicProducts.length;
    const sarees = publicProducts.filter((p) => p.category === "Sarees").length;
    const dresses = publicProducts.filter((p) => p.category === "Dresses").length;
    const kurtis = publicProducts.filter((p) => p.category === "Kurtis").length;

    return [
      { label: "All Styles", value: "All" as const, count: total },
      { label: "Sarees", value: "Sarees" as const, count: sarees },
      { label: "Dresses", value: "Dresses" as const, count: dresses },
      { label: "Kurtis", value: "Kurtis" as const, count: kurtis },
    ];
  }, [publicProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...publicProducts];

    // Category filter
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Availability filter
    if (availabilityFilter === "in-stock") {
      list = list.filter((p) => p.inStock !== false);
    }

    // Price range filter
    if (priceFilter === "under-3000") {
      list = list.filter((p) => p.price < 3000);
    } else if (priceFilter === "3000-7000") {
      list = list.filter((p) => p.price >= 3000 && p.price <= 7000);
    } else if (priceFilter === "7000-12000") {
      list = list.filter((p) => p.price > 7000 && p.price <= 12000);
    } else if (priceFilter === "above-12000") {
      list = list.filter((p) => p.price > 12000);
    }

    // Keyword search filter
    if (catalogSearch.trim()) {
      const q = catalogSearch.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "newest") {
      list.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });
    } else if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "discount") {
      list.sort((a, b) => {
        const discA = a.originalPrice
          ? (a.originalPrice - a.price) / a.originalPrice
          : 0;
        const discB = b.originalPrice
          ? (b.originalPrice - b.price) / b.originalPrice
          : 0;
        return discB - discA;
      });
    }

    return list;
  }, [publicProducts, selectedCategory, availabilityFilter, priceFilter, catalogSearch, sortBy]);

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

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categoryTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedCategory(tab.value)}
                className={`px-4 sm:px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-medium transition-all whitespace-nowrap cursor-pointer rounded-xs border ${
                  selectedCategory === tab.value
                    ? "bg-[#173D2B] text-[#FAF7F0] border-[#173D2B] shadow-sm"
                    : "bg-[#FFFFFF] text-[#242424]/80 border-[#F3EBDD] hover:border-[#173D2B] hover:text-[#173D2B]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`ml-1.5 text-[10px] ${
                    selectedCategory === tab.value
                      ? "text-[#B89A5A] font-bold"
                      : "text-[#242424]/40"
                  }`}
                >
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>

          {/* Sub-Filters: Search, Price, Availability, Sort */}
          <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-3.5 sm:p-4 rounded-xs shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input within catalog */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter catalog by name or fabric..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
              />
              {catalogSearch && (
                <button
                  onClick={() => setCatalogSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#242424]/40 hover:text-[#242424]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Price Filter */}
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as any)}
                className="px-2.5 py-1.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs text-[#242424] font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All Price Ranges</option>
                <option value="under-3000">Under ₹3,000</option>
                <option value="3000-7000">₹3,000 – ₹7,000</option>
                <option value="7000-12000">₹7,000 – ₹12,000</option>
                <option value="above-12000">Above ₹12,000</option>
              </select>

              {/* Availability Filter */}
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value as any)}
                className="px-2.5 py-1.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs text-[#242424] font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All Availability</option>
                <option value="in-stock">In Stock Only</option>
              </select>

              {/* Sort By */}
              <div className="flex items-center gap-1.5 pl-1 border-l border-[#F3EBDD]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#B89A5A]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2.5 py-1.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs text-[#242424] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter & Active Filter Pills */}
        <div className="flex items-center justify-between text-xs text-[#242424]/70 mb-6">
          <span>
            Showing <strong>{filteredAndSortedProducts.length}</strong> styles
          </span>
          {(priceFilter !== "all" || availabilityFilter !== "all" || catalogSearch || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setPriceFilter("all");
                setAvailabilityFilter("all");
                setCatalogSearch("");
              }}
              className="text-[#801426] hover:underline font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Empty Search Results */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] border border-[#F3EBDD] rounded-xs space-y-3">
            <Sparkles className="w-8 h-8 text-[#B89A5A] mx-auto opacity-70" />
            <h3 className="font-serif text-xl text-[#173D2B]">No Styles Match Your Filters</h3>
            <p className="text-xs text-[#242424]/60 max-w-sm mx-auto">
              Try adjusting your price range or search terms to explore our other handcrafted pieces.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setPriceFilter("all");
                setAvailabilityFilter("all");
                setCatalogSearch("");
              }}
              className="px-5 py-2 bg-[#173D2B] text-[#FAF7F0] text-xs uppercase tracking-wider font-semibold rounded-xs"
            >
              Clear All Filters
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
