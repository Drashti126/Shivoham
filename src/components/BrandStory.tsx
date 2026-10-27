"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function BrandStory() {
  return (
    <section id="about-us" className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#F3EBDD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Fashion Imagery with Decorative Frame (Surekhi Style) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg aspect-[4/5] bg-[#F3EBDD] shadow-2xl border-4 border-[#FAF7F0] outline outline-1 outline-[#B89A5A]/50 group overflow-hidden">
              <Image
                src={encodeURI("/images/saree/saree 12.png")}
                alt="SHIVOHAM - Tradition, Styled for Today"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top group-hover:scale-104 transition-transform duration-700"
              />

              <div className="absolute bottom-4 left-4 right-4 bg-[#143426]/90 backdrop-blur-xs p-4 text-center border border-[#B89A5A]/40 text-[#FAF7F0]">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#E5D2A5] block">
                  CRAFTED WITH SOUL
                </span>
                <span className="font-serif text-sm italic">
                  &ldquo;A celebration of authentic Indian craftsmanship.&rdquo;
                </span>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A5A] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#B89A5A]" />
              <span>THE SHIVOHAM PHILOSOPHY</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173D2B] font-normal tracking-tight leading-tight">
              Tradition, Styled for the Modern Woman
            </h2>

            <p className="text-sm sm:text-base text-[#242424]/80 leading-relaxed font-normal">
              At <strong>SHIVOHAM</strong>, we believe that an authentic Indian drape is not merely attire — it is an emotion, an heirloom, and a tribute to millennia of artistic mastery.
            </p>

            <p className="text-sm text-[#242424]/75 leading-relaxed font-light">
              By working closely with master artisans across Varanasi, Lucknow, and Chanderi, we ensure that every thread, needle-knot, and zari motif embodies purity, elegance, and timeless grace.
            </p>

            {/* Value checklist */}
            <div className="space-y-3 pt-2 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#173D2B] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#242424]/85">
                  <strong>Direct Weaver Alliances:</strong> Fair wages, ethical looms, and uncompromised yarn quality.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#173D2B] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#242424]/85">
                  <strong>Bespoke Tailoring:</strong> Custom blouse stitching and personal drape styling guidance.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#173D2B] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#242424]/85">
                  <strong>Global Doorstep Delivery:</strong> Fast express shipping across India, USA, UK, UAE &amp; worldwide.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
