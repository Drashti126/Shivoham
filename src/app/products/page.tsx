"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Heart,
  Eye,
  ShoppingBag,
  Zap,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ArrowUpDown,
  Search,
  X,
} from "lucide-react";
import { ShopProvider, useShop } from "@/context/ShopContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Product, ProductCategory } from "@/types";
import { ALL_PRODUCTS } from "@/data/sampleProducts";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryCat = searchParams.get("category");
  const querySearch = searchParams.get("q") || "";

  const {
    toggleWishlist,
    isInWishlist,
    openQuickView,
    addToCart,
    formatPrice,
    generateProductWhatsAppLink,
    allCatalogProducts,
  } = useShop();

  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);
  const effectiveCatalog =
    allCatalogProducts && allCatalogProducts.length > 0 ? allCatalogProducts : products;

  const [activeCategory, setActiveCategory] = useState<string>(
    queryCat && ["Sarees", "Kurtis", "Suits"].includes(queryCat) ? queryCat : "All"
  );
  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [selectedSize, setSelectedSize] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "discount" | "newest">("featured");

  // Load from DB
  useEffect(() => {
    async function loadDb() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }
    loadDb();
  }, []);

  // Sync category if URL parameter changes
  useEffect(() => {
    if (queryCat && ["Sarees", "Kurtis", "Suits"].includes(queryCat)) {
      setActiveCategory(queryCat);
    }
    if (querySearch) {
      setSearchTerm(querySearch);
    }
  }, [queryCat, querySearch]);

  const publicProducts = useMemo(() => {
    return effectiveCatalog.filter((p) => p.isPublished !== false);
  }, [effectiveCatalog]);

  // Counts for each of the 3 primary categories
  const categoryCounts = useMemo(() => {
    const sarees = publicProducts.filter((p) => p.category === "Sarees").length;
    const kurtis = publicProducts.filter((p) => p.category === "Kurtis").length;
    const suits = publicProducts.filter(
      (p) => p.category === "Suits" || (p.category as string) === "Dresses"
    ).length;
    return {
      all: publicProducts.length,
      sarees,
      kurtis,
      suits,
    };
  }, [publicProducts]);

  // Filtered & sorted products
  const displayedProducts = useMemo(() => {
    let list = [...publicProducts];

    // Category filter
    if (activeCategory !== "All") {
      if (activeCategory === "Suits") {
        list = list.filter(
          (p) => p.category === "Suits" || (p.category as string) === "Dresses"
        );
      } else {
        list = list.filter((p) => p.category === activeCategory);
      }
    }

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Size filter
    if (selectedSize !== "All") {
      list = list.filter((p) => Array.isArray(p.sizes) && p.sizes.includes(selectedSize));
    }

    // In-stock
    if (inStockOnly) {
      list = list.filter((p) => p.inStock !== false);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        list.sort((a, b) => {
          const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discB - discA;
        });
        break;
      case "newest":
        list.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      default:
        break;
    }

    return list;
  }, [publicProducts, activeCategory, searchTerm, selectedSize, inStockOnly, sortBy]);

  const handleBuyNow = (product: Product) => {
    addToCart(product, product.sizes?.[0] || "Free Size", 1);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#242424]">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Header */}
      <Header />

      <main className="flex-1 pb-16">
        {/* Page Hero */}
        <section className="bg-[#FAF7F0] border-b border-[#F3EBDD] py-8 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#242424]/60 mb-3 sm:mb-4">
              <Link href="/" className="hover:text-[#173D2B] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-[#B89A5A]" />
              <span className="font-semibold text-[#173D2B]">All Products</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#B89A5A] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89A5A]" />
                  <span>The Grand Atelier</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-5xl text-[#173D2B] font-normal tracking-tight">
                  All Ethnic Wear Collections
                </h1>
                <p className="text-xs sm:text-sm text-[#242424]/75 leading-relaxed pt-0.5 sm:pt-1">
                  Explore our entire boutique catalog of {categoryCounts.all} handcrafted designs across Sarees, Kurtis, and Suits.
                </p>
              </div>

              {/* 3 Main Category Tabs (Horizontally scrollable on mobile) */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider font-semibold rounded-xs border transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === "All"
                      ? "bg-[#173D2B] text-[#FAF7F0] border-[#173D2B] shadow-xs"
                      : "bg-[#FFFFFF] text-[#242424]/80 border-[#F3EBDD] hover:border-[#173D2B]"
                  }`}
                >
                  All ({categoryCounts.all})
                </button>
                <button
                  onClick={() => setActiveCategory("Sarees")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider font-semibold rounded-xs border transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === "Sarees"
                      ? "bg-[#173D2B] text-[#FAF7F0] border-[#173D2B] shadow-xs"
                      : "bg-[#FFFFFF] text-[#242424]/80 border-[#F3EBDD] hover:border-[#173D2B]"
                  }`}
                >
                  Sarees ({categoryCounts.sarees})
                </button>
                <button
                  onClick={() => setActiveCategory("Kurtis")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider font-semibold rounded-xs border transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === "Kurtis"
                      ? "bg-[#173D2B] text-[#FAF7F0] border-[#173D2B] shadow-xs"
                      : "bg-[#FFFFFF] text-[#242424]/80 border-[#F3EBDD] hover:border-[#173D2B]"
                  }`}
                >
                  Kurtis ({categoryCounts.kurtis})
                </button>
                <button
                  onClick={() => setActiveCategory("Suits")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider font-semibold rounded-xs border transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === "Suits"
                      ? "bg-[#173D2B] text-[#FAF7F0] border-[#173D2B] shadow-xs"
                      : "bg-[#FFFFFF] text-[#242424]/80 border-[#F3EBDD] hover:border-[#173D2B]"
                  }`}
                >
                  Suits ({categoryCounts.suits})
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Sorting Controls */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-3.5 sm:p-4 rounded-xs shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-full md:max-w-md">
              <Search className="w-4 h-4 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search across all 78 styles..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs text-[#242424] focus:outline-none focus:border-[#173D2B]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#242424]/40 hover:text-[#801426] p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-between sm:justify-end">
              {/* Size Filter */}
              <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full sm:w-auto px-2.5 py-1.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs text-[#242424] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="All">All Sizes</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="3XL">3XL</option>
                  <option value="Free Size">Free Size</option>
                </select>
              </div>

              {/* In Stock Only Checkbox */}
              <label className="flex items-center gap-1.5 text-xs text-[#242424]/80 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded-xs text-[#173D2B] focus:ring-[#173D2B]"
                />
                <span className="text-[11px] sm:text-xs">In Stock</span>
              </label>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 pl-1.5 sm:pl-2 border-l border-[#F3EBDD] flex-1 sm:flex-initial">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#B89A5A] shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full sm:w-auto px-2.5 py-1.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs text-[#242424] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low-High</option>
                  <option value="price-desc">Price: High-Low</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

          </div>

          {/* Results Status Line */}
          <div className="flex items-center justify-between text-xs text-[#242424]/70 mt-3 sm:mt-4 px-1">
            <span>
              Showing <strong>{displayedProducts.length}</strong> styles
              {activeCategory !== "All" && ` in ${activeCategory}`}
            </span>
            {(searchTerm || selectedSize !== "All" || inStockOnly || sortBy !== "featured" || activeCategory !== "All") && (
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchTerm("");
                  setSelectedSize("All");
                  setInStockOnly(false);
                  setSortBy("featured");
                }}
                className="text-[#801426] hover:underline font-semibold cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayedProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-[#FFFFFF] border border-[#F3EBDD] rounded-xs space-y-3">
              <Sparkles className="w-8 h-8 text-[#B89A5A] mx-auto opacity-70" />
              <h3 className="font-serif text-lg sm:text-xl text-[#173D2B]">No Styles Match Your Filters</h3>
              <p className="text-xs text-[#242424]/60 max-w-sm mx-auto">
                Try clearing your search query or selecting &ldquo;All&rdquo; categories.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchTerm("");
                  setSelectedSize("All");
                  setInStockOnly(false);
                  setSortBy("featured");
                }}
                className="px-6 py-2 bg-[#173D2B] text-[#FAF7F0] text-xs uppercase tracking-wider font-semibold rounded-xs cursor-pointer hover:bg-[#123022]"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {displayedProducts.map((product) => {
                const inWishlist = isInWishlist(product.id);
                const discountPercent =
                  product.originalPrice && product.originalPrice > product.price
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
                    className="group flex flex-col h-full bg-[#FFFFFF] border border-[#F3EBDD] hover:border-[#173D2B] transition-all duration-300 shadow-2xs hover:shadow-xl rounded-xs overflow-hidden"
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
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-104"
                      />

                      {/* Badges */}
                      <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 flex flex-col gap-1 items-start">
                        {product.badge && (
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold px-1.5 sm:px-2 py-0.5 bg-[#173D2B] text-[#FAF7F0] rounded-2xs">
                            {product.badge}
                          </span>
                        )}
                        {discountPercent && discountPercent > 0 && (
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 bg-[#801426] text-[#FAF7F0] rounded-2xs">
                            {discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
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

                      {/* Quick View Overlay on Hover for Desktop */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuickView(product);
                        }}
                        className="absolute bottom-2.5 left-2.5 right-2.5 py-2 px-3 bg-[#FAF7F0]/95 hover:bg-[#FAF7F0] text-[#173D2B] text-[11px] uppercase tracking-wider font-medium hidden sm:flex items-center justify-center gap-1.5 shadow-md border border-[#F3EBDD] opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="p-2.5 sm:p-4 flex flex-col justify-between flex-1 bg-[#FFFFFF] space-y-2.5 sm:space-y-3">
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

                        {/* Available Sizes Pills */}
                        {Array.isArray(product.sizes) && product.sizes.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap mt-1.5 sm:mt-2">
                            <span className="text-[9px] text-[#242424]/50 mr-0.5">Sizes:</span>
                            {product.sizes.slice(0, 4).map((s) => (
                              <span
                                key={s}
                                className="text-[9px] px-1 py-0.2 bg-[#FAF7F0] border border-[#F3EBDD] text-[#173D2B] font-medium rounded-2xs"
                              >
                                {s}
                              </span>
                            ))}
                            {product.sizes.length > 4 && (
                              <span className="text-[8px] text-[#242424]/40 font-medium">
                                +{product.sizes.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Price Section */}
                      <div className="pt-2 border-t border-[#F3EBDD] flex items-baseline gap-1.5 sm:gap-2 mt-auto">
                        <span className="font-semibold text-sm sm:text-base text-[#173D2B]">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-[10px] sm:text-xs text-[#242424]/40 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Mobile Single Full-width Add to Cart Button */}
                      <div className="sm:hidden pt-0.5">
                        <button
                          onClick={() => addToCart(product, product.sizes?.[0] || "Free Size", 1)}
                          className="w-full py-2 bg-[#173D2B] text-[#FAF7F0] text-[11px] uppercase tracking-wider font-semibold rounded-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-2xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#B89A5A]" />
                          <span>Add to Cart</span>
                        </button>
                      </div>

                      {/* Desktop/Tablet 2 Side-by-side buttons */}
                      <div className="hidden sm:grid sm:grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => addToCart(product, product.sizes?.[0] || "Free Size", 1)}
                          className="py-2 px-2 bg-[#FAF7F0] hover:bg-[#F3EBDD] text-[#173D2B] border border-[#173D2B]/30 hover:border-[#173D2B] text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#173D2B]" />
                          <span>Add to Cart</span>
                        </button>

                        <button
                          onClick={() => handleBuyNow(product)}
                          className="py-2 px-2 bg-[#173D2B] hover:bg-[#123022] text-[#FAF7F0] text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                        >
                          <Zap className="w-3.5 h-3.5 text-[#B89A5A]" />
                          <span>Buy Now</span>
                        </button>
                      </div>

                      {/* WhatsApp Inquiry */}
                      <a
                        href={generateProductWhatsAppLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 text-[10px] text-emerald-800 hover:text-emerald-900 pt-0.5 font-medium hover:underline"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>Inquire on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Drawers & Modals */}
      <SearchModal />
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <ShopProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-[#173D2B]">
            <div className="text-center space-y-2">
              <Sparkles className="w-8 h-8 text-[#B89A5A] animate-pulse mx-auto" />
              <p className="font-serif text-lg">Loading Collections...</p>
            </div>
          </div>
        }
      >
        <ProductsPageContent />
      </Suspense>
    </ShopProvider>
  );
}
