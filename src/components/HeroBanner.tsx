"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Scissors, Play, X } from "lucide-react";
import { BUSINESS_CONTACT } from "@/data/sampleProducts";

export default function HeroBanner() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="relative bg-[#FAF7F0] border-b border-[#F3EBDD] overflow-hidden">
        {/* Background delicate watermark pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#173D2B_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Editorial Campaign Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0] border border-[#B89A5A]/50 text-[#173D2B] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold">
                <Sparkles className="w-3 h-3 text-[#B89A5A]" />
                <span>THE ROYAL FESTIVE EDIT &apos;26</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#173D2B] font-normal leading-[1.12] tracking-tight">
                Timeless Heritage. <br />
                <span className="italic font-light text-[#B89A5A]">
                  Woven into Modern Grace.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#242424]/80 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Discover our signature collection of handcrafted sarees, festive dresses, and artisanal kurtis. Hand-selected weaves celebrating the living textile crafts of India.
              </p>

              {/* CTAs (Libas + Surekhi Style) */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
                <a
                  href="#catalog-section"
                  className="w-full sm:w-auto px-8 py-4 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>EXPLORE ALL 78 DESIGNS</span>
                  <ArrowRight className="w-4 h-4 text-[#B89A5A] group-hover:translate-x-1.5 transition-transform" />
                </a>

                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="w-full sm:w-auto px-6 py-4 bg-[#FFFFFF] border border-[#173D2B] text-[#173D2B] hover:bg-[#173D2B] hover:text-[#FAF7F0] text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs group"
                >
                  <Play className="w-3.5 h-3.5 fill-[#B89A5A] text-[#B89A5A] group-hover:fill-[#FAF7F0] group-hover:text-[#FAF7F0]" />
                  <span>WATCH MODEL DRAPE</span>
                </button>
              </div>

              {/* Luxury Trust Pillars (Surekhi Style) */}
              <div className="pt-4 border-t border-[#F3EBDD] grid grid-cols-3 gap-3 text-left max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B89A5A] shrink-0" />
                  <span className="text-[11px] text-[#242424]/75 font-medium leading-tight">
                    100% Authentic Handcraft
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-[#B89A5A] shrink-0" />
                  <span className="text-[11px] text-[#242424]/75 font-medium leading-tight">
                    Bespoke Tailoring &amp; Sizing
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#B89A5A] shrink-0" />
                  <span className="text-[11px] text-[#242424]/75 font-medium leading-tight">
                    Pan-India Express Dispatch
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Campaign Photograph (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] max-h-[560px] bg-[#F3EBDD] shadow-2xl border-4 border-[#FAF7F0] outline outline-1 outline-[#B89A5A]/40 group overflow-hidden">
                <Image
                  src={encodeURI("/images/saree/saree 3.png")}
                  alt="SHIVOHAM Handcrafted Heritage Saree"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Luxury Tag Badge */}
                <div className="absolute top-4 right-4 bg-[#173D2B]/90 backdrop-blur-md border border-[#B89A5A]/50 text-[#FAF7F0] px-3.5 py-1.5 shadow-md">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#E5D2A5] block">
                    VIRASAT EDITION
                  </span>
                  <span className="text-[11px] font-serif font-light text-[#FAF7F0]">
                    Master Weaver Crafted
                  </span>
                </div>

                {/* Bottom Video Trigger Tag */}
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="absolute bottom-4 left-4 right-4 p-3 bg-[#FAF7F0]/95 backdrop-blur-sm text-center border border-[#F3EBDD] shadow-sm cursor-pointer hover:bg-[#FFFFFF] transition-colors flex items-center justify-between text-[11px]"
                >
                  <span className="font-serif text-[#173D2B] font-medium text-xs flex items-center gap-1.5">
                    <Play className="w-3 h-3 fill-[#B89A5A] text-[#B89A5A]" />
                    View Model Saree Walk
                  </span>
                  <span className="text-[#801426] font-semibold uppercase tracking-wider text-[10px]">
                    13 Sarees Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Video Showcase Modal */}
      {isVideoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#143426]/70 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            className="fixed inset-0"
            onClick={() => setIsVideoOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[#FAF7F0] border border-[#F3EBDD] shadow-2xl overflow-hidden z-10 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-[#F3EBDD] bg-[#FFFFFF]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B89A5A]" />
                <span className="font-serif text-sm font-medium text-[#173D2B]">
                  SHIVOHAM Model Saree Showcase
                </span>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-1 text-[#242424]/70 hover:text-[#173D2B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[9/16] max-h-[70vh] bg-black">
              <video
                src={encodeURI("/images/saree/Model_walking_in_saree_video_20261021110204.mp4")}
                controls
                autoPlay
                loop
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
