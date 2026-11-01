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
  const logoSrc = "/images/logo/shivoham-logo-clean.png";

  if (variant === "footer") {
    return (
      <Link
        href="/"
        aria-label="SHIVOHAM Home"
        className={`inline-flex items-center gap-3 group ${className}`}
      >
        <div className="relative w-16 h-16 sm:w-18 sm:h-18 shrink-0 drop-shadow-sm">
          <Image
            src={logoSrc}
            alt="SHIVOHAM Brand Logo"
            width={72}
            height={72}
            priority
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <span className="font-serif text-xl sm:text-2xl tracking-[0.22em] text-[#173D2B] font-semibold uppercase block leading-none">
            SHIVOHAM
          </span>
          <span className="text-[10px] sm:text-[11px] tracking-widest text-[#B89A5A] uppercase block mt-1.5 font-sans">
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
      className={`inline-flex items-center gap-2 sm:gap-3 group transition-opacity hover:opacity-95 ${className}`}
    >
      <div className="relative w-11 h-11 sm:w-14 sm:h-14 lg:w-[68px] lg:h-[68px] shrink-0 drop-shadow-xs">
        <Image
          src={logoSrc}
          alt="SHIVOHAM Official Brand Logo"
          width={68}
          height={68}
          priority
          className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
        />
      </div>
      <div className="text-left">
        <span className="font-serif text-base sm:text-xl lg:text-2xl tracking-[0.18em] sm:tracking-[0.22em] text-[#173D2B] font-semibold uppercase block leading-tight">
          SHIVOHAM
        </span>
        <span className="text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#B89A5A] uppercase block font-sans font-medium mt-0.5">
          Ethnic Wear
        </span>
      </div>
    </Link>
  );
}
