"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Copy, Check } from "lucide-react";

const ANNOUNCEMENTS = [
  {
    text: "FESTIVE EDIT '26: FLAT 15% OFF WITH CODE",
    code: "SHIVOHAM15",
  },
  {
    text: "COMPLIMENTARY EXPRESS SHIPPING PAN-INDIA ON ORDERS ABOVE ₹1,999",
    code: null,
  },
  {
    text: "CELEBRATE TRADITION: 100% AUTHENTIC HANDLOOM & PURE SILK",
    code: null,
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <aside
      aria-label="Announcement"
      className="bg-[#143426] text-[#FAF7F0] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase py-2 px-4 border-b border-[#B89A5A]/30 relative z-50 transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 text-center">
        <Sparkles className="w-3 h-3 text-[#B89A5A] shrink-0 animate-pulse hidden xs:inline-block" />

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="font-medium tracking-[0.16em] sm:tracking-[0.2em]">
            {current.text}
          </span>

          {current.code && (
            <button
              onClick={() => handleCopy(current.code!)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FAF7F0]/15 hover:bg-[#FAF7F0]/25 text-[#FAF7F0] border border-[#B89A5A]/40 text-[9px] font-mono tracking-normal cursor-pointer transition-colors"
              title="Click to copy coupon code"
            >
              <span className="font-bold text-[#E5D2A5]">{current.code}</span>
              {copied ? (
                <Check className="w-2.5 h-2.5 text-emerald-300" />
              ) : (
                <Copy className="w-2.5 h-2.5 text-[#E5D2A5]/80" />
              )}
            </button>
          )}
        </div>

        <Sparkles className="w-3 h-3 text-[#B89A5A] shrink-0 animate-pulse hidden xs:inline-block" />
      </div>
    </aside>
  );
}
