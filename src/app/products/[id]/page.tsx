"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Scissors,
  Check,
  Star,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { ShopProvider, useShop } from "@/context/ShopContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import WhatsAppBanner from "@/components/WhatsAppBanner";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Product } from "@/types";

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    generateProductWhatsAppLink,
  } = useShop();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>("");
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (res.ok && data.success && data.product) {
          setProduct(data.product);
          setActiveImage(data.product.image);
          setSelectedSize(data.product.sizes?.[0] || "Standard");

          // Fetch related products
          const relRes = await fetch("/api/products");
          const relData = await relRes.json();
          if (relRes.ok && relData.products) {
            const sameCat = relData.products
              .filter(
                (p: Product) =>
                  p.category === data.product.category && p.id !== data.product.id
              )
              .slice(0, 4);
            setRelatedProducts(sameCat);
          }
        }
      } catch (err) {
        console.error("Failed to load product detail:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <Sparkles className="w-8 h-8 text-[#B89A5A] animate-pulse mx-auto" />
          <p className="font-serif text-lg text-[#173D2B]">Loading Design Details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <h2 className="font-serif text-2xl text-[#173D2B]">Product Not Found</h2>
        <p className="text-xs text-[#242424]/70 max-w-sm">
          The requested product may have been moved or unpublished from the catalog.
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 bg-[#173D2B] text-[#FAF7F0] text-xs uppercase tracking-wider font-semibold"
        >
          Return to Collections
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;
  const inStock = product.inStock !== false;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#242424]/60">
        <Link href="/" className="hover:text-[#173D2B] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-[#B89A5A]" />
        <Link href={`/#catalog-section`} className="hover:text-[#173D2B] transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-[#B89A5A]" />
        <span className="text-[#173D2B] font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left: Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[3/4] w-full bg-[#F3EBDD] border border-[#F3EBDD] overflow-hidden shadow-md rounded-xs">
            <Image
              src={encodeURI(activeImage || product.image)}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition-all duration-300"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
              {product.badge && (
                <span className="text-[9px] uppercase tracking-wider font-semibold px-2.5 py-0.5 bg-[#173D2B] text-[#FAF7F0] shadow-sm">
                  {product.badge}
                </span>
              )}
              {discountPercent && (
                <span className="text-[9px] uppercase tracking-wider font-bold px-2.5 py-0.5 bg-[#801426] text-[#FAF7F0] shadow-sm">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Secondary Thumbnail switchers */}
          {product.secondaryImage && (
            <div className="flex gap-3">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`relative w-20 h-26 bg-[#F3EBDD] border-2 overflow-hidden rounded-xs cursor-pointer ${
                  activeImage === product.image ? "border-[#173D2B]" : "border-[#F3EBDD] opacity-75"
                }`}
              >
                <Image
                  src={encodeURI(product.image)}
                  alt="Front Angle"
                  fill
                  className="object-cover"
                />
              </button>

              <button
                onClick={() => setActiveImage(product.secondaryImage!)}
                className={`relative w-20 h-26 bg-[#F3EBDD] border-2 overflow-hidden rounded-xs cursor-pointer ${
                  activeImage === product.secondaryImage
                    ? "border-[#173D2B]"
                    : "border-[#F3EBDD] opacity-75"
                }`}
              >
                <Image
                  src={encodeURI(product.secondaryImage)}
                  alt="Detail Angle"
                  fill
                  className="object-cover"
                />
              </button>
            </div>
          )}
        </div>

        {/* Right: Product Meta & Purchase Options (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2 border-b border-[#F3EBDD] pb-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B89A5A] block">
                {product.category} • {product.fabric}
              </span>
              <span className="text-[#F3EBDD]">•</span>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 border ${
                  inStock
                    ? "text-emerald-800 bg-emerald-50 border-emerald-200"
                    : "text-amber-800 bg-amber-50 border-amber-200"
                }`}
              >
                {inStock ? "In Stock" : "Made to Order"}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#173D2B] font-normal leading-tight">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl sm:text-3xl font-semibold text-[#173D2B]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[#242424]/50 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discountPercent && (
                <span className="text-xs text-[#801426] font-bold">
                  (Save {discountPercent}%)
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#242424]/60">
              Inclusive of all taxes • Complimentary express delivery on prepaid orders above ₹1,999
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#173D2B]">
              Craft &amp; Silhouette Details
            </h3>
            <p className="text-xs sm:text-sm text-[#242424]/80 leading-relaxed font-normal">
              {product.description}
            </p>
          </div>

          {/* Size Selection */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#173D2B]">
                Select Size:
              </span>
              <span className="text-[11px] text-[#B89A5A] font-medium">Standard Indian Fit</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-xs border rounded-xs transition-all cursor-pointer font-medium ${
                    selectedSize === size
                      ? "border-[#173D2B] bg-[#173D2B] text-[#FAF7F0] shadow-xs"
                      : "border-[#F3EBDD] bg-[#FFFFFF] text-[#242424] hover:border-[#173D2B]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2 pt-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#173D2B]">
              Quantity:
            </span>
            <div className="flex items-center border border-[#F3EBDD] bg-[#FFFFFF] w-32">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-xs text-[#242424] hover:bg-[#FAF7F0] cursor-pointer"
              >
                -
              </button>
              <span className="flex-1 text-center text-xs font-semibold text-[#173D2B]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-xs text-[#242424] hover:bg-[#FAF7F0] cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#F3EBDD]">
            {/* Row 1: Add to Bag + Wishlist */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Added to Shopping Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#B89A5A]" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 border rounded-xs transition-colors cursor-pointer ${
                  inWishlist
                    ? "border-[#801426] bg-[#801426]/10 text-[#801426]"
                    : "border-[#F3EBDD] bg-[#FFFFFF] text-[#242424]/70 hover:border-[#173D2B]"
                }`}
                aria-label={inWishlist ? "In Wishlist" : "Add to Wishlist"}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? "fill-[#801426]" : ""}`} />
              </button>
            </div>

            {/* Row 2: Buy Now Instant Checkout */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 bg-[#B89A5A] hover:bg-[#a6894c] text-[#FAF7F0] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-[#FAF7F0]" />
              <span>Buy Now (Express Checkout)</span>
            </button>

            {/* Row 3: Order / Inquire on WhatsApp */}
            <a
              href={generateProductWhatsAppLink(product, quantity, selectedSize)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 border border-[#25D366] bg-[#FFFFFF] hover:bg-[#25D366]/5 text-[#173D2B] text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Order on WhatsApp (Prefilled Inquiry)</span>
            </a>
          </div>

          {/* Boutique Pillars */}
          <div className="pt-4 border-t border-[#F3EBDD] grid grid-cols-3 gap-3 text-left">
            <div className="space-y-1">
              <ShieldCheck className="w-4 h-4 text-[#B89A5A]" />
              <span className="text-[11px] font-semibold text-[#173D2B] block">Authentic</span>
              <span className="text-[10px] text-[#242424]/60 block">Pure mastercraft</span>
            </div>
            <div className="space-y-1">
              <Truck className="w-4 h-4 text-[#B89A5A]" />
              <span className="text-[11px] font-semibold text-[#173D2B] block">Express</span>
              <span className="text-[10px] text-[#242424]/60 block">24-hr dispatch</span>
            </div>
            <div className="space-y-1">
              <Scissors className="w-4 h-4 text-[#B89A5A]" />
              <span className="text-[11px] font-semibold text-[#173D2B] block">Bespoke</span>
              <span className="text-[10px] text-[#242424]/60 block">Stylist guidance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#F3EBDD] space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89A5A] font-semibold block">
              COMPLETE YOUR TROUSSEAU
            </span>
            <h2 className="font-serif text-2xl text-[#173D2B]">You May Also Adore</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.id}`}
                className="group flex flex-col bg-[#FFFFFF] border border-[#F3EBDD] hover:border-[#173D2B] transition-all duration-300 shadow-2xs hover:shadow-lg rounded-xs overflow-hidden"
              >
                <div className="relative aspect-[3/4] w-full bg-[#F3EBDD] overflow-hidden">
                  <Image
                    src={encodeURI(rel.image)}
                    alt={rel.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3.5 space-y-1">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-[#B89A5A] block truncate">
                    {rel.fabric}
                  </span>
                  <h4 className="font-serif text-sm text-[#242424] group-hover:text-[#173D2B] line-clamp-1">
                    {rel.name}
                  </h4>
                  <span className="text-sm font-semibold text-[#173D2B] block pt-1">
                    {formatPrice(rel.price)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#242424]">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">
          <ProductDetailContent />
          <WhatsAppBanner />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <SearchModal />
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
      </div>
    </ShopProvider>
  );
}
