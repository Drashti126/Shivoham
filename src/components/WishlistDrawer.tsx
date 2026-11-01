"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { BUSINESS_CONTACT } from "@/data/sampleProducts";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    closeWishlist,
    toggleWishlist,
    addToCart,
    formatPrice,
    allCatalogProducts,
  } = useShop();

  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isWishlistOpen]);

  const wishlistedItems = useMemo(() => {
    return allCatalogProducts.filter((p) => wishlist.includes(p.id));
  }, [allCatalogProducts, wishlist]);

  if (!isWishlistOpen) return null;

  const handleShareWishlistWhatsApp = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://shivoham.com";
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || BUSINESS_CONTACT.phone;
    const summary = wishlistedItems
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name} (₹${item.price.toLocaleString("en-IN")})\n   ${origin}/products/${item.id}`
      )
      .join("\n\n");

    const message = `Namaste SHIVOHAM,\n\nHere are the designs I have saved in my wishlist:\n\n${summary}\n\nPlease let me know about styling advice and stock status. Thank you!`;

    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist Drawer"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#173D2B]/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeWishlist}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F0] border-l border-[#F3EBDD] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3EBDD] bg-[#FFFFFF]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 fill-[#801426] text-[#801426]" />
              <h2 className="font-serif text-lg font-medium text-[#173D2B]">
                Saved Favorites
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#173D2B]/10 text-[#173D2B] font-bold">
                {wishlistedItems.length}
              </span>
            </div>
            <button
              onClick={closeWishlist}
              className="p-1.5 text-[#242424]/60 hover:text-[#173D2B] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {wishlistedItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#F3EBDD] flex items-center justify-center shadow-xs">
                  <Heart className="w-8 h-8 text-[#B89A5A]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-[#173D2B]">Your Wishlist is Empty</h3>
                  <p className="text-xs text-[#242424]/60 max-w-xs">
                    Save your favorite Sarees, Anarkalis, and Kurtis to revisit or share with your stylist.
                  </p>
                </div>
                <button
                  onClick={closeWishlist}
                  className="px-6 py-2.5 bg-[#173D2B] text-[#FAF7F0] text-xs uppercase tracking-widest font-semibold hover:bg-[#0f291d] transition-all cursor-pointer shadow-sm"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistedItems.map((product) => {
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
                      className="flex gap-4 p-3 bg-[#FFFFFF] border border-[#F3EBDD] rounded-xs shadow-2xs hover:border-[#173D2B]/40 transition-all"
                    >
                      {/* Product Thumbnail */}
                      <Link
                        href={`/products/${product.id}`}
                        onClick={closeWishlist}
                        className="relative w-20 h-26 bg-[#F3EBDD] shrink-0 overflow-hidden rounded-xs"
                      >
                        <Image
                          src={encodeURI(product.image)}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover object-top"
                        />
                        {discountPercent && (
                          <span className="absolute top-1 left-1 text-[8px] bg-[#801426] text-[#FAF7F0] font-bold px-1 py-0.5">
                            {discountPercent}% OFF
                          </span>
                        )}
                      </Link>

                      {/* Meta & Actions */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-[9px] uppercase tracking-wider text-[#B89A5A] font-semibold">
                              {product.category}
                            </span>
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="text-[#242424]/40 hover:text-[#801426] transition-colors cursor-pointer"
                              title="Remove from wishlist"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <Link
                            href={`/products/${product.id}`}
                            onClick={closeWishlist}
                            className="font-serif text-xs sm:text-sm text-[#173D2B] font-medium line-clamp-1 hover:underline block mt-0.5"
                          >
                            {product.name}
                          </Link>

                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="font-semibold text-xs text-[#173D2B]">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[10px] text-[#242424]/50 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Move to bag button */}
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              addToCart(product);
                              toggleWishlist(product.id);
                            }}
                            className="w-full py-1.5 px-3 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 rounded-xs cursor-pointer shadow-xs transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3 text-[#B89A5A]" />
                            <span>Move to Bag</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {wishlistedItems.length > 0 && (
            <div className="p-5 border-t border-[#F3EBDD] bg-[#FFFFFF] space-y-2.5">
              <button
                onClick={handleShareWishlistWhatsApp}
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1ebc59] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 rounded-xs cursor-pointer shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Share Wishlist on WhatsApp</span>
              </button>

              <button
                onClick={closeWishlist}
                className="w-full py-2 px-4 border border-[#F3EBDD] hover:bg-[#FAF7F0] text-xs text-[#242424] font-medium tracking-wider uppercase flex items-center justify-center gap-1 rounded-xs cursor-pointer transition-colors"
              >
                <span>Continue Shopping</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
