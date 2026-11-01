"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Heart, ShoppingBag, MessageCircle, Check, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function QuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    generateProductWhatsAppLink,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState<string>("");
  const [addedNotice, setAddedNotice] = useState(false);

  const allImages = React.useMemo(() => {
    if (!quickViewProduct) return [];
    const list: string[] = [];
    if (quickViewProduct.image) list.push(quickViewProduct.image);
    if (quickViewProduct.secondaryImage && !list.includes(quickViewProduct.secondaryImage)) {
      list.push(quickViewProduct.secondaryImage);
    }
    if (Array.isArray(quickViewProduct.gallery)) {
      quickViewProduct.gallery.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list;
  }, [quickViewProduct]);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || "Standard");
      setActiveImage(quickViewProduct.image);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setAddedNotice(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const discountPercent = quickViewProduct.originalPrice
    ? Math.round(
        ((quickViewProduct.originalPrice - quickViewProduct.price) /
          quickViewProduct.originalPrice) *
          100
      )
    : null;

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick View"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#173D2B]/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0"
        onClick={closeQuickView}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl bg-[#FAF7F0] border border-[#F3EBDD] shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-3 right-3 z-30 p-2 text-[#242424]/70 hover:text-[#173D2B] bg-[#FAF7F0]/80 rounded-full transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Frame & Image Thumbnails */}
        <div className="relative md:w-1/2 aspect-[3/4] md:aspect-auto bg-[#F3EBDD] shrink-0 flex flex-col justify-between">
          <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px]">
            <Image
              src={encodeURI(activeImage || quickViewProduct.image)}
              alt={quickViewProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-all duration-300"
            />

            {/* Badges */}
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 flex flex-col gap-1">
              {quickViewProduct.badge && (
                <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#173D2B] text-[#FAF7F0] rounded-2xs">
                  {quickViewProduct.badge}
                </span>
              )}
              {discountPercent && (
                <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 bg-[#801426] text-[#FAF7F0] rounded-2xs">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail switcher for multiple images */}
          {allImages.length > 1 && (
            <div className="absolute bottom-2.5 left-2.5 flex gap-1.5 z-20 max-w-[85%] overflow-x-auto pb-1 scrollbar-thin">
              {allImages.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative w-10 h-12 sm:w-11 sm:h-14 shrink-0 border-2 overflow-hidden rounded-xs cursor-pointer transition-all ${
                    activeImage === img
                      ? "border-[#173D2B] ring-1 ring-[#173D2B]"
                      : "border-white/80 opacity-80 hover:opacity-100"
                  }`}
                  title={`View angle ${idx + 1}`}
                >
                  <Image
                    src={encodeURI(img)}
                    alt={`Thumb ${idx + 1}`}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 sm:p-7 flex-1 overflow-y-auto flex flex-col justify-between space-y-4 sm:space-y-5 bg-[#FFFFFF]">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#B89A5A] font-semibold">
              <Sparkles className="w-3 h-3 text-[#B89A5A]" />
              <span>{quickViewProduct.category} • {quickViewProduct.fabric}</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#173D2B] font-normal leading-snug">
              {quickViewProduct.name}
            </h3>

            {/* Price with active currency */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-xl font-semibold text-[#173D2B]">
                {formatPrice(quickViewProduct.price)}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-xs text-[#242424]/50 line-through">
                  {formatPrice(quickViewProduct.originalPrice)}
                </span>
              )}
              {discountPercent && (
                <span className="text-xs text-[#801426] font-bold">
                  ({discountPercent}% OFF)
                </span>
              )}
            </div>

            <p className="text-xs text-[#242424]/75 leading-relaxed font-normal">
              {quickViewProduct.description}
            </p>

            {/* Sizing Selection */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#242424]/80 font-medium block mb-2">
                Select Size:
              </span>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-1.5 text-xs border transition-all rounded-xs cursor-pointer ${
                      selectedSize === size
                        ? "border-[#173D2B] bg-[#173D2B] text-[#FAF7F0] font-semibold"
                        : "border-[#F3EBDD] bg-[#FAF7F0] text-[#242424] hover:border-[#173D2B]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-[#F3EBDD]">
            <div className="flex items-center gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 px-4 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#B89A5A]" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3.5 border transition-all rounded-xs cursor-pointer ${
                  inWishlist
                    ? "border-[#801426] bg-[#801426]/10 text-[#801426]"
                    : "border-[#F3EBDD] text-[#242424]/70 hover:border-[#173D2B]"
                }`}
                aria-label={inWishlist ? "In Wishlist" : "Add to Wishlist"}
              >
                <Heart
                  className={`w-4 h-4 ${inWishlist ? "fill-[#801426]" : ""}`}
                />
              </button>
            </div>

            <a
              href={generateProductWhatsAppLink(quickViewProduct)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 border border-[#F3EBDD] hover:border-[#173D2B] hover:bg-[#FAF7F0] text-[#173D2B] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inquire &amp; Order via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
