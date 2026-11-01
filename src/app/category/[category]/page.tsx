"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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

interface CategoryMeta {
  name: ProductCategory;
  title: string;
  eyebrow: string;
  description: string;
  totalExpected: number;
}

const CATEGORY_MAP: Record<string, CategoryMeta> = {
  sarees: {
    name: "Sarees",
    title: "Pure Cotton Sarees",
    eyebrow: "100% PURE COTTON DRAPES",
    description:
      "All our sarees are authentic, breathable cotton drapes adorned with delicate zari borders, heritage pallus, and handcrafted weaves for timeless comfort.",
    totalExpected: 13,
  },
  kurtis: {
    name: "Kurtis",
    title: "Kurtis & Co-ord Sets",
    eyebrow: "EVERYDAY ELEGANCE & OCCASION WEAR",
    description:
      "Explore stylish short kurtas, graceful long kurtis, chikankari tunics, co-ord sets, and kurti sets with or without dupatta designed for effortless beauty.",
    totalExpected: 37,
  },
  suits: {
    name: "Suits",
    title: "Designer Suit Sets",
    eyebrow: "2-PIECE & 3-PIECE CELEBRATION ENSEMBLES",
    description:
      "Graceful 2-piece and 3-piece suit sets with coordinated dupattas, flared anarkalis, and salwar ensembles tailored for celebrations and special occasions.",
    totalExpected: 28,
  },
};

function CategoryProductListingContent() {
  const params = useParams();
  const router = useRouter();
  const slug = ((params?.category as string) || "sarees").toLowerCase();

  const meta = CATEGORY_MAP[slug] || {
    name: "Sarees" as ProductCategory,
    title: "Handcrafted Sarees",
    eyebrow: "HERITAGE ETHNIC DRAPES",
    description: "Discover our handcrafted collection tailored for life's celebrations.",
    totalExpected: 13,
  };

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

  // Filter states
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "discount" | "newest">("featured");

  // Load from database API
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

  // Filter products for this specific category
  const categoryProducts = useMemo(() => {
    return effectiveCatalog.filter((p) => {
      if (p.isPublished === false) return false;
      if (meta.name === "Suits") {
        return p.category === "Suits" || (p.category as string) === "Dresses";
      }
      return p.category === meta.name;
    });
  }, [effectiveCatalog, meta.name]);

  // Apply sorting and user filters
  const filteredProducts = useMemo(() => {
    let list = [...categoryProducts];

    // Search query
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Size filter
    if (selectedSize !== "All") {
      list = list.filter((p) => Array.isArray(p.sizes) && p.sizes.includes(selectedSize));
    }

    // In-stock filter
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
  }, [categoryProducts, searchFilter, selectedSize, inStockOnly, sortBy]);

  const handleBuyNow = (product: Product, size?: string) => {
    addToCart(product, size || product.sizes?.[0] || "Free Size", 1);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#242424]">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Header */}
      <Header />

      <main className="flex-1 pb-16">
        {/* Category Hero / Header */}
        <section className="bg-[#FAF7F0] border-b border-[#F3EBDD] py-8 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#242424]/60 mb-3 sm:mb-4">
              <Link href="/" className="hover:text-[#173D2B] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-[#B89A5A]" />
              <Link href="/#categories" className="hover:text-[#173D2B] transition-colors">
                Collections
              </Link>
              <ChevronRight className="w-3 h-3 text-[#B89A5A]" />
              <span className="font-semibold text-[#173D2B]">{meta.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#B89A5A] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89A5A]" />
                  <span>{meta.eyebrow}</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-5xl text-[#173D2B] font-normal tracking-tight">
                  {meta.title}
                </h1>
                <p className="text-xs sm:text-sm text-[#242424]/75 leading-relaxed pt-0.5 sm:pt-1">
                  {meta.description}
                </p>
              </div>

              {/* Style Count Badge */}
              <div className="shrink-0 flex items-center justify-between sm:justify-start gap-3 bg-[#FFFFFF] border border-[#F3EBDD] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xs shadow-2xs">
                <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#B89A5A] font-semibold">
                  Curated Catalog:
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-[#173D2B]">
                  {categoryProducts.length} Styles
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Sorting Controls */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-3.5 sm:p-4 rounded-xs shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
            
            {/* Search Input within Category */}
            <div className="relative flex-1 max-w-full md:max-w-md">
              <Search className="w-4 h-4 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={`Search in ${meta.name}...`}
                className="w-full pl-9 pr-8 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs text-[#242424] focus:outline-none focus:border-[#173D2B]"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter("")}
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
              Showing <strong>{filteredProducts.length}</strong> of {categoryProducts.length} styles
            </span>
            {(searchFilter || selectedSize !== "All" || inStockOnly || sortBy !== "featured") && (
              <button
                onClick={() => {
                  setSearchFilter("");
                  setSelectedSize("All");
                  setInStockOnly(false);
                  setSortBy("featured");
                }}
                className="text-[#801426] hover:underline font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-[#FFFFFF] border border-[#F3EBDD] rounded-xs space-y-3">
              <Sparkles className="w-8 h-8 text-[#B89A5A] mx-auto opacity-70" />
              <h3 className="font-serif text-lg sm:text-xl text-[#173D2B]">No Styles Match Your Filters</h3>
              <p className="text-xs text-[#242424]/60 max-w-sm mx-auto">
                Try clearing your search keyword or selected size to view all {categoryProducts.length} {meta.name}.
              </p>
              <button
                onClick={() => {
                  setSearchFilter("");
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
              {filteredProducts.map((product) => {
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

export default function CategoryProductListingPage() {
  return (
    <ShopProvider>
      <CategoryProductListingContent />
    </ShopProvider>
  );
}
