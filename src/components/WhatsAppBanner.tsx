"use client";

import React from "react";
import { MessageCircle, Sparkles, Video, Ruler, HeartHandshake } from "lucide-react";
import { BUSINESS_CONTACT } from "@/data/sampleProducts";

export default function WhatsAppBanner() {
  const customQuery = (topic: string) => {
    return `${BUSINESS_CONTACT.whatsappUrl}?text=${encodeURIComponent(
      `Hi SHIVOHAM, I would like to consult about ${topic}.`
    )}`;
  };

  return (
    <section className="bg-[#FAF7F0] border-b border-[#F3EBDD] py-16 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#B89A5A]" />
            <span>BESPOKE STYLING &amp; CONCIERGE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#173D2B] font-normal tracking-tight">
            Need Personal Guidance on Draping or Sizing?
          </h2>

          <p className="text-xs sm:text-sm text-[#242424]/75 max-w-xl mx-auto leading-relaxed">
            Connect directly with our master boutique stylists on WhatsApp. We provide complimentary blouse measurement assistance, real-time fabric closeups, and bridal curations.
          </p>

          {/* 3 Concierge Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-2xl mx-auto">
            <a
              href={customQuery("Custom Blouse Stitching & Sizing")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#FFFFFF] border border-[#F3EBDD] hover:border-[#173D2B] rounded-xs flex items-center justify-center gap-2 text-xs font-medium text-[#242424] hover:text-[#173D2B] transition-colors shadow-2xs"
            >
              <Ruler className="w-3.5 h-3.5 text-[#B89A5A]" />
              <span>Blouse Sizing Help</span>
            </a>

            <a
              href={customQuery("Live WhatsApp Video Call Showcase")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#FFFFFF] border border-[#F3EBDD] hover:border-[#173D2B] rounded-xs flex items-center justify-center gap-2 text-xs font-medium text-[#242424] hover:text-[#173D2B] transition-colors shadow-2xs"
            >
              <Video className="w-3.5 h-3.5 text-[#B89A5A]" />
              <span>Video Call Drape View</span>
            </a>

            <a
              href={customQuery("Bridal & Festive Trousseau Consultation")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#FFFFFF] border border-[#F3EBDD] hover:border-[#173D2B] rounded-xs flex items-center justify-center gap-2 text-xs font-medium text-[#242424] hover:text-[#173D2B] transition-colors shadow-2xs"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-[#B89A5A]" />
              <span>Bridal Consultation</span>
            </a>
          </div>

          <div className="pt-2">
            <a
              href={BUSINESS_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#B89A5A]" />
              <span>CHAT WITH OUR STYLIST (+91 {BUSINESS_CONTACT.phone})</span>
            </a>
          </div>
        </div>
      </section>
    );
}
