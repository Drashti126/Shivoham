"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerSlide {
  id: string;
  image: string;
  alt: string;
  link: string;
  title: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: "banner-1",
    image: "/images/banners/ChatGPT Image Nov 2, 2026, 10_46_14 AM.png",
    alt: "SHIVOHAM The Festive Collection - Elegant, Timeless, Exquisite",
    link: "/category/suits",
    title: "The Festive Collection",
  },
  {
    id: "banner-2",
    image: "/images/banners/ChatGPT Image Nov 2, 2026, 10_46_24 AM.png",
    alt: "SHIVOHAM Royal Heritage Palace Collection - Handcrafted Indian Suits",
    link: "/category/suits",
    title: "Heritage Suit Sets",
  },
  {
    id: "banner-3",
    image: "/images/banners/ChatGPT Image Nov 2, 2026, 10_47_40 AM.png",
    alt: "SHIVOHAM New Collection - Handloom Cotton Sarees",
    link: "/category/sarees",
    title: "New Collection Sarees",
  },
  {
    id: "banner-4",
    image: "/images/banners/ChatGPT Image Nov 2, 2026, 10_49_56 AM.png",
    alt: "SHIVOHAM Grace in Simplicity - Timeless Charm Kurtis & Co-ord Sets",
    link: "/category/kurtis",
    title: "Grace in Simplicity",
  },
  {
    id: "banner-5",
    image: "/images/banners/ChatGPT Image Nov 2, 2026, 10_51_07 AM.png",
    alt: "SHIVOHAM 2026 Collection Inspired by India's Heritage - Sarees, Suits & Ethnic Wear",
    link: "/products",
    title: "Heritage Collection",
  },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const totalSlides = BANNER_SLIDES.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer: Automatically slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [goToNext, isPaused]);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      aria-label="SHIVOHAM Hero Fashion Slider"
      className="relative w-full bg-[#FAF7F0] border-b border-[#F3EBDD] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Viewport Container */}
      {/* Responsive Height: 450px - 550px on Desktop, proportional on Tablet & Mobile */}
      <div className="relative w-full h-[220px] xs:h-[260px] sm:h-[360px] md:h-[450px] lg:h-[500px] xl:h-[540px] overflow-hidden">
        
        {/* Slides Track with Smooth Hardware-Accelerated Sliding Animation */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {BANNER_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className="relative w-full h-full shrink-0 min-w-full overflow-hidden bg-[#FAF7F0]"
              aria-hidden={currentIndex !== index}
            >
              <Link
                href={slide.link}
                tabIndex={currentIndex === index ? 0 : -1}
                className="relative block w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173D2B]"
                aria-label={slide.alt}
              >
                <Image
                  src={encodeURI(slide.image)}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  quality={90}
                  className="w-full h-full object-cover sm:object-cover object-center transition-transform duration-1000 ease-out"
                />

                {/* Subtle Luxury Vignette Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none opacity-40 hover:opacity-20 transition-opacity" />
              </Link>
            </div>
          ))}
        </div>

        {/* Left Arrow Navigation Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToPrev();
          }}
          aria-label="Previous Slide"
          className="absolute left-2.5 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#FAF7F0]/85 hover:bg-[#FAF7F0] text-[#173D2B] border border-[#B89A5A]/50 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs group"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-[#173D2B] group-hover:text-[#B89A5A] transition-colors -translate-x-0.5" />
        </button>

        {/* Right Arrow Navigation Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToNext();
          }}
          aria-label="Next Slide"
          className="absolute right-2.5 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#FAF7F0]/85 hover:bg-[#FAF7F0] text-[#173D2B] border border-[#B89A5A]/50 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs group"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-[#173D2B] group-hover:text-[#B89A5A] transition-colors translate-x-0.5" />
        </button>

        {/* Small Indicator Dots at the bottom */}
        <div
          role="tablist"
          aria-label="Banner slide indicators"
          className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-xs border border-white/20"
        >
          {BANNER_SLIDES.map((slide, index) => {
            const isActive = currentIndex === index;
            return (
              <button
                key={slide.id}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-[#B89A5A] shadow-xs"
                    : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#FAF7F0]/70 hover:bg-[#FAF7F0]"
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
