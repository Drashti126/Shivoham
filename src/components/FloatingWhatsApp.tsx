"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { BUSINESS_CONTACT } from "@/data/sampleProducts";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || BUSINESS_CONTACT.phone;
  const whatsappUrl = `https://wa.me/91${whatsappPhone}?text=${encodeURIComponent(
    "Namaste SHIVOHAM, I am browsing your ethnic wear collection and would like personal styling assistance."
  )}`;

  return (
    <aside
      aria-label="WhatsApp Stylist Concierge"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end group"
    >
      {/* Tooltip Pill */}
      {showTooltip && (
        <div className="relative mb-2 hidden sm:flex items-center gap-2 bg-[#FFFFFF] border border-[#F3EBDD] py-1.5 px-3 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-medium text-[#173D2B]">
            Need styling help? Chat with us
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-[#242424]/40 hover:text-[#242424] cursor-pointer ml-1"
            aria-label="Dismiss chat tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SHIVOHAM Personal Stylist on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#173D2B] text-[8px] font-bold text-white items-center justify-center">
            1
          </span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </aside>
  );
}
