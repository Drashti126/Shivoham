"use client";

import React from "react";
import Link from "next/link";
import LogoPlaceholder from "./LogoPlaceholder";
import { BUSINESS_CONTACT } from "@/data/sampleProducts";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#F4EFE5] text-[#343434] border-t border-[#DCC7A5]/35 pt-12 sm:pt-16 pb-8 sm:pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 pb-8 sm:pb-12 border-b border-[#DCC7A5]/40">
          
          {/* Column 1: SHIVOHAM Logo & About Us */}
          <div className="space-y-3.5">
            <LogoPlaceholder variant="footer" />
            <p className="font-serif italic text-sm text-[#173F35]">
              Elegance in Every Thread
            </p>
            <p className="text-xs text-[#343434]/75 leading-relaxed max-w-xs font-normal">
              SHIVOHAM is a luxury Indian ethnic wear boutique celebrating pure handloom cotton sarees, graceful handcrafted kurtis, and regal suit sets.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#173F35] font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#343434]/75 font-normal">
              <li>
                <Link href="/" className="hover:text-[#173F35] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/sarees" className="hover:text-[#173F35] transition-colors">
                  Sarees (Cotton Drapes)
                </Link>
              </li>
              <li>
                <Link href="/category/kurtis" className="hover:text-[#173F35] transition-colors">
                  Kurtis &amp; Co-ord Sets
                </Link>
              </li>
              <li>
                <Link href="/category/suits" className="hover:text-[#173F35] transition-colors">
                  Suits (2 &amp; 3-Piece Sets)
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#173F35] transition-colors">
                  All 78 Boutique Styles
                </Link>
              </li>
              <li>
                <Link href="/#why-choose" className="hover:text-[#173F35] transition-colors">
                  Why Choose SHIVOHAM
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#173F35] font-semibold">
              Contact Information
            </h4>
            <ul className="space-y-2 text-xs text-[#343434]/75 font-normal">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B99A55]" />
                <a
                  href={`tel:+91${BUSINESS_CONTACT.phone}`}
                  className="hover:text-[#173F35] transition-colors font-medium"
                >
                  +91 {BUSINESS_CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B99A55]" />
                <a
                  href={`mailto:${BUSINESS_CONTACT.email}`}
                  className="text-[#343434]/80 hover:text-[#173F35] transition-colors"
                >
                  {BUSINESS_CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#B99A55] shrink-0 mt-0.5" />
                <span className="text-[#343434]/80 leading-relaxed">
                  {BUSINESS_CONTACT.address}
                </span>
              </li>
              <li className="pt-2 text-[11px] text-[#343434]/55">
                Stylist Consultations: Mon – Sat (10 AM – 8 PM)
              </li>
            </ul>
          </div>

          {/* Column 4: WhatsApp Concierge & Official Socials */}
          <div className="space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#173F35] font-semibold">
              Connect With Us
            </h4>
            <p className="text-xs text-[#343434]/70">
              Need personal styling guidance or bespoke inquiries? Connect directly with our atelier.
            </p>
            <div className="space-y-2 pt-1">
              <a
                href={BUSINESS_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#173F35] text-[#F9F6EF] hover:bg-[#112d26] rounded-xs text-xs font-semibold tracking-wider transition-colors w-full justify-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +91 {BUSINESS_CONTACT.phone}</span>
              </a>

              <a
                href={BUSINESS_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#DCC7A5] hover:border-[#173F35] text-[#173F35] hover:text-[#B99A55] rounded-xs text-xs font-medium tracking-wider transition-colors w-full justify-center bg-[#FFFFFF]"
              >
                <InstagramIcon className="w-4 h-4 text-[#B99A55]" />
                <span>Instagram: {BUSINESS_CONTACT.instagramHandle}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#343434]/60 gap-4">
          <p>© {new Date().getFullYear()} SHIVOHAM Ethnic Wear. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Cotton Sarees</span>
            <span>•</span>
            <span>Handcrafted Kurtis</span>
            <span>•</span>
            <span>Designer Suit Sets</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
