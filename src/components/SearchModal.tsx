"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Sparkles, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { ProductCategory, Product } from "@/types";

export default function SearchModal() {
  const {
    isSearchOpen,
    closeSearch,
    openQuickView,
    formatPrice,
    allCatalogProducts,
  } = useShop();

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">("All");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setSelectedCategory("All");
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeSearch]);

  const filteredResults = useMemo(() => {
    if (!query.trim() && selectedCategory === "All") return [];

    let list = allCatalogProducts.filter((p) => p.isPublished !== false);

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (query.trim()) {
      const lower = query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower) ||
          p.fabric.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.id.toLowerCase().includes(lower)
      );
    }

    return list;
  }, [allCatalogProducts, query, selectedCategory]);

  if (!isSearchOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Collection"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-[#173D2B]/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0"
        onClick={closeSearch}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl bg-[#FAF7F0] border border-[#F3EBDD] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-[#F3EBDD] bg-[#FFFFFF]">
          <Search className="w-4 h-4 text-[#B89A5A] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by design name, fabric, silk, anarkali, chikankari..."
            className="w-full text-sm sm:text-base bg-transparent text-[#242424] placeholder:text-[#242424]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#242424]/40 hover:text-[#242424] mr-1 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1.5 text-[#242424]/70 hover:text-[#173D2B] cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Quick Filter Pills */}
        <div className="px-5 py-2.5 bg-[#FAF7F0] border-b border-[#F3EBDD] flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold shrink-0">
            Category:
          </span>
          {(["All", "Sarees", "Dresses", "Kurtis"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#173D2B] text-[#FAF7F0] shadow-2xs"
                  : "bg-[#FFFFFF] border border-[#F3EBDD] text-[#242424] hover:border-[#173D2B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-2 bg-[#FAF7F0] flex-1">
          {!query.trim() && selectedCategory === "All" ? (
            <div className="text-center py-10 text-[#242424]/60 space-y-2">
              <Sparkles className="w-6 h-6 text-[#B89A5A] mx-auto opacity-70" />
              <p className="font-serif text-base text-[#173D2B]">
                Discover Handcrafted Indian Ethnic Wear
              </p>
              <p className="text-xs text-[#242424]/60 max-w-sm mx-auto">
                Type above or click a category pill to explore pure Banarasi Sarees, Chanderi Anarkalis, and Chikankari Kurtis.
              </p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-10 text-[#242424]/60 space-y-2">
              <p className="font-serif text-base text-[#173D2B]">No Matching Styles Found</p>
              <p className="text-xs max-w-sm mx-auto">
                We couldn&apos;t find any designs matching &ldquo;{query}&rdquo;. Try another fabric or category.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] text-[#242424]/60 px-1 font-medium">
                Found {filteredResults.length} design{filteredResults.length > 1 ? "s" : ""}
              </div>
              {filteredResults.map((product) => {
                const discountPercent = product.originalPrice
                  ? Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )
                  : null;

                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-3 p-3 bg-[#FFFFFF] hover:bg-[#F3EBDD]/40 transition-colors border border-[#F3EBDD] rounded-xs"
                  >
                    <div
                      onClick={() => {
                        closeSearch();
                        openQuickView(product);
                      }}
                      className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                    >
                      <div className="relative w-14 h-18 bg-[#F3EBDD] overflow-hidden shrink-0 rounded-xs">
                        <Image
                          src={encodeURI(product.image)}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] uppercase tracking-wider text-[#B89A5A] font-semibold">
                            {product.category}
                          </span>
                          <span className="text-[#F3EBDD]">•</span>
                          <span className="text-[9px] text-[#242424]/60 truncate font-mono">
                            {product.fabric}
                          </span>
                        </div>
                        <h4 className="font-serif text-xs sm:text-sm text-[#173D2B] font-medium truncate block">
                          {product.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="font-semibold text-xs text-[#173D2B]">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] text-[#242424]/50 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                          {discountPercent && (
                            <span className="text-[9px] font-bold text-[#801426]">
                              {discountPercent}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/products/${product.id}`}
                        onClick={closeSearch}
                        className="px-2.5 py-1.5 text-[10px] uppercase font-semibold text-[#173D2B] bg-[#FAF7F0] hover:bg-[#F3EBDD] border border-[#F3EBDD] rounded-xs transition-colors flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
