"use client";

import React from "react";
import Link from "next/link";
import LogoPlaceholder from "./LogoPlaceholder";
import { BUSINESS_CONTACT } from "@/data/sampleProducts";

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F0] text-[#242424] border-t border-[#F3EBDD] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-[#F3EBDD]">
          {/* Column 1: Brand */}
          <div className="space-y-3.5">
            <LogoPlaceholder variant="footer" />
            <p className="font-serif italic text-sm text-[#173D2B]">
              Timeless Style. Beautifully Indian.
            </p>
            <p className="text-xs text-[#242424]/70 leading-relaxed max-w-xs font-normal">
              An elegant collection of Indian ethnic wear, sarees and suits designed
              to bring timeless grace into your wardrobe.
            </p>
          </div>

          {/* Column 2: Shopping Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#173D2B] font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#242424]/75 font-normal">
              <li>
                <a href="#categories" className="hover:text-[#173D2B] transition-colors">
                  Sarees
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#173D2B] transition-colors">
                  Suits
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#173D2B] transition-colors">
                  Kurtis
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#173D2B] transition-colors">
                  Dresses
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#173D2B] transition-colors">
                  Co-ord Sets
                </a>
              </li>
              <li>
                <a href="#fresh-arrivals" className="hover:text-[#173D2B] transition-colors">
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#173D2B] font-semibold">
              Customer Contact
            </h4>
            <ul className="space-y-2 text-xs text-[#242424]/75 font-normal">
              <li>
                <a
                  href={`tel:+91${BUSINESS_CONTACT.phone}`}
                  className="hover:text-[#173D2B] transition-colors font-medium"
                >
                  Phone: {BUSINESS_CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#173D2B] transition-colors"
                >
                  WhatsApp: +91 {BUSINESS_CONTACT.phone}
                </a>
              </li>
              <li>
                <span className="text-[#242424]/60">
                  Instagram: @shivoham (Placeholder)
                </span>
              </li>
              <li className="pt-1 text-[11px] text-[#242424]/55">
                Support Hours: 10:00 AM – 8:00 PM IST
              </li>
            </ul>
          </div>

          {/* Column 4: Policies */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#173D2B] font-semibold">
              Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#242424]/75 font-normal">
              <li>
                <span className="hover:text-[#173D2B] cursor-pointer">
                  Shipping Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#173D2B] cursor-pointer">
                  Return Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#173D2B] cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#173D2B] cursor-pointer">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#242424]/60 gap-3">
          <p>© {new Date().getFullYear()} SHIVOHAM. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[11px] text-[#173D2B] hover:text-[#B89A5A] font-medium transition-colors inline-flex items-center gap-1 group"
            >
              <span>Admin Portal</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <span className="text-[#F3EBDD]">|</span>
            <p className="text-[11px] text-[#242424]/45">
              Ethnic wear storefront &amp; boutique.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
