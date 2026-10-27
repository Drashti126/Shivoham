import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoPlaceholderProps {
  className?: string;
  variant?: "header" | "footer";
}

/**
 * SHIVOHAM Official Brand Logo Component
 * -------------------------------------------------------------
 * Rule: Uses the original logo provided by the brand owner.
 * Preserves exact aspect ratio (1:1), colors, and proportions without distortion.
 */
export default function LogoPlaceholder({
  className = "",
  variant = "header",
}: LogoPlaceholderProps) {
  const logoSrc = "/images/logo/shivoham-logo.jpeg";

  if (variant === "footer") {
    return (
      <Link
        href="/"
        aria-label="SHIVOHAM Home"
        className={`inline-flex items-center gap-3 group ${className}`}
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden rounded-full shadow-2xs border border-[#F3EBDD]">
          <Image
            src={logoSrc}
            alt="SHIVOHAM Brand Logo"
            width={64}
            height={64}
            priority
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <span className="font-serif text-xl tracking-[0.22em] text-[#173D2B] font-semibold uppercase block leading-none">
            SHIVOHAM
          </span>
          <span className="text-[10px] tracking-widest text-[#B89A5A] uppercase block mt-1 font-sans">
            Sarees • Suits • Ethnic Wear
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="SHIVOHAM Home"
      className={`inline-flex items-center gap-2.5 sm:gap-3 group transition-opacity hover:opacity-95 ${className}`}
    >
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 overflow-hidden rounded-full shadow-2xs border border-[#F3EBDD]">
        <Image
          src={logoSrc}
          alt="SHIVOHAM Official Logo"
          width={56}
          height={56}
          priority
          className="w-full h-full object-contain group-hover:scale-102 transition-transform"
        />
      </div>
      <div className="hidden sm:block text-left">
        <span className="font-serif text-lg sm:text-xl tracking-[0.24em] text-[#173D2B] font-semibold uppercase block leading-tight">
          SHIVOHAM
        </span>
        <span className="text-[9px] tracking-widest text-[#B89A5A] uppercase block font-sans font-medium">
          Ethnic Wear
        </span>
      </div>
    </Link>
  );
}
