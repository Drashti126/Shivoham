"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  Globe,
  Sparkles,
  User,
} from "lucide-react";
import LogoPlaceholder from "./LogoPlaceholder";
import { useShop } from "@/context/ShopContext";
import { BUSINESS_CONTACT, CURRENCIES, Currency } from "@/data/sampleProducts";

export default function Header() {
  const {
    wishlist,
    cartCount,
    openCart,
    openWishlist,
    openSearch,
    currency,
    setCurrency,
    customer,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const megaMenuItems = [
    {
      label: "Sarees",
      href: "#categories",
      featuredImage: encodeURI("/images/saree/saree 10.png"),
      featuredTag: "13 Pure Silk Drapes",
      categories: [
        { name: "Pure Banarasi Katan Silk", href: "#catalog-section" },
        { name: "Tussar & Temple Border Silks", href: "#catalog-section" },
        { name: "Lightweight Organza Drapes", href: "#catalog-section" },
        { name: "Festive Brocade Heritage Silks", href: "#catalog-section" },
        { name: "View All 13 Sarees", href: "#catalog-section", isHighlight: true },
      ],
    },
    {
      label: "Dresses",
      href: "#categories",
      featuredImage: encodeURI("/images/dress/file_0000000006b0821191833494d124292f.png"),
      featuredTag: "28 Designer Silhouettes",
      categories: [
        { name: "Flared Anarkali Gowns", href: "#catalog-section" },
        { name: "Chanderi Layered Indo-Western", href: "#catalog-section" },
        { name: "Georgette Tiered Maxi Dresses", href: "#catalog-section" },
        { name: "Embroidered Yoke Ensembles", href: "#catalog-section" },
        { name: "View All 28 Dresses", href: "#catalog-section", isHighlight: true },
      ],
    },
    {
      label: "Kurtis",
      href: "#categories",
      featuredImage: encodeURI("/images/kurtis/file_0000000005188210b4f6324c92ec78a3.png"),
      featuredTag: "37 Handcrafted Tunics",
      categories: [
        { name: "Lucknowi Shadow Chikankari", href: "#catalog-section" },
        { name: "Handloom Chanderi Kalidar", href: "#catalog-section" },
        { name: "Pure Cotton Handblock Prints", href: "#catalog-section" },
        { name: "Zari Selvedge Straight Kurtas", href: "#catalog-section" },
        { name: "View All 37 Kurtis", href: "#catalog-section", isHighlight: true },
      ],
    },
    {
      label: "Heritage Weaves",
      href: "#heritage-crafts",
      featuredImage: encodeURI("/images/saree/saree 2.png"),
      featuredTag: "Surekhi Artisanal Touch",
      categories: [
        { name: "Varanasi Zari Brocade", href: "#heritage-crafts" },
        { name: "Awadh Shadow Needlework", href: "#heritage-crafts" },
        { name: "Bundelkhand Chanderi", href: "#heritage-crafts" },
        { name: "Gujarat Tie & Dye Heritage", href: "#heritage-crafts" },
        { name: "Explore Craft Stories", href: "#heritage-crafts", isHighlight: true },
      ],
    },
    {
      label: "All 78 Styles",
      href: "#catalog-section",
    },
    {
      label: "Vouchers",
      href: "#voucher-offers",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#F3EBDD] transition-all">
      {/* Top Utility Bar (Libas + Surekhi Style: Currency Switcher & Stylist Contact) */}
      <div className="bg-[#FAF7F0] border-b border-[#F3EBDD]/60 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-[11px] text-[#242424]/75">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-[#173D2B]">
              <Sparkles className="w-3 h-3 text-[#B89A5A]" />
              Haute Couture & Handcrafted Silks
            </span>
            <span className="text-[#F3EBDD]">|</span>
            <span>Pan-India Dispatch within 24 Hours</span>
          </div>

          <div className="flex items-center gap-5">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="inline-flex items-center gap-1.5 hover:text-[#173D2B] font-medium tracking-wide"
              >
                <Globe className="w-3 h-3 text-[#B89A5A]" />
                <span>{currency.code} ({currency.symbol})</span>
                <ChevronDown className="w-2.5 h-2.5 opacity-60" />
              </button>

              {isCurrencyDropdownOpen && (
                <div
                  onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
                  className="absolute right-0 mt-1 w-28 bg-[#FFFFFF] border border-[#F3EBDD] shadow-lg py-1 rounded-xs z-50 animate-in fade-in duration-150"
                >
                  {CURRENCIES.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#FAF7F0] transition-colors ${
                        currency.code === curr.code
                          ? "text-[#173D2B] font-bold"
                          : "text-[#242424]"
                      }`}
                    >
                      <span>{curr.code}</span>
                      <span className="text-[#B89A5A]">{curr.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-[#F3EBDD]">|</span>

            {/* Bespoke Styling Contact */}
            <a
              href={BUSINESS_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#173D2B] transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-[#173D2B]" />
              <span>Personal Stylist: +91 {BUSINESS_CONTACT.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-[#242424] hover:text-[#173D2B] transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo with Subtitle (Surekhi Luxury Aesthetic) */}
          <div className="flex-1 lg:flex-initial flex justify-center lg:justify-start">
            <LogoPlaceholder variant="header" />
          </div>

          {/* Desktop Navigation Links with Mega-Menu dropdowns (Libas Style) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center space-x-6 xl:space-x-8 h-full"
          >
            {megaMenuItems.map((item) => (
              <div
                key={item.label}
                className="relative h-full flex items-center"
                onMouseEnter={() => item.categories && setActiveMegaMenu(item.label)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <a
                  href={item.href}
                  className="text-xs uppercase tracking-[0.18em] text-[#242424] hover:text-[#173D2B] transition-colors font-medium py-7 flex items-center gap-1 group"
                >
                  <span>{item.label}</span>
                  {item.categories && (
                    <ChevronDown className="w-3 h-3 text-[#B89A5A] group-hover:rotate-180 transition-transform" />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#173D2B] transition-all duration-300 group-hover:w-full" />
                </a>

                {/* Mega Menu Dropdown */}
                {item.categories && activeMegaMenu === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[460px] bg-[#FFFFFF] border border-[#F3EBDD] shadow-2xl p-6 grid grid-cols-12 gap-6 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="col-span-7 space-y-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#B89A5A] font-semibold block border-b border-[#F3EBDD] pb-1.5">
                        {item.label} Collections
                      </span>
                      <div className="space-y-2">
                        {item.categories.map((cat) => (
                          <a
                            key={cat.name}
                            href={cat.href}
                            onClick={() => setActiveMegaMenu(null)}
                            className={`block text-xs transition-colors py-1 ${
                              cat.isHighlight
                                ? "text-[#173D2B] font-semibold hover:text-[#B89A5A] border-t border-[#F3EBDD] pt-2"
                                : "text-[#242424]/80 hover:text-[#173D2B] hover:translate-x-1 transition-transform"
                            }`}
                          >
                            {cat.name}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Featured Image inside Mega Menu */}
                    <div className="col-span-5 relative aspect-[3/4] bg-[#F3EBDD] overflow-hidden group">
                      <Image
                        src={item.featuredImage}
                        alt={item.label}
                        fill
                        sizes="180px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#173D2B]/80 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-[10px] text-[#FAF7F0] font-serif tracking-wider">
                          {item.featuredTag}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Search */}
            <button
              onClick={openSearch}
              className="p-2 text-[#242424] hover:text-[#173D2B] hover:bg-[#F3EBDD]/60 rounded-full transition-colors cursor-pointer"
              aria-label="Search collection"
              title="Search collection"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Drawer trigger */}
            <button
              onClick={openWishlist}
              className="p-2 text-[#242424] hover:text-[#173D2B] hover:bg-[#F3EBDD]/60 rounded-full transition-colors relative inline-flex items-center justify-center cursor-pointer"
              aria-label={`Saved Wishlist (${wishlist.length} items)`}
              title="View Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#801426] text-[#FAF7F0] text-[9px] font-semibold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Customer Account */}
            {customer ? (
              <Link
                href="/account"
                className="p-2 text-[#173D2B] hover:bg-[#F3EBDD]/60 rounded-full transition-colors relative inline-flex items-center justify-center"
                aria-label={`Account of ${customer.name}`}
                title={`Account: ${customer.name}`}
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#173D2B]" />
                <span className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#173D2B]" />
              </Link>
            ) : (
              <Link
                href="/account/login"
                className="p-2 text-[#242424] hover:text-[#173D2B] hover:bg-[#F3EBDD]/60 rounded-full transition-colors relative inline-flex items-center justify-center"
                aria-label="Sign In / Account"
                title="Sign In (Optional)"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            )}

            {/* Shopping Bag with Badge */}
            <button
              onClick={openCart}
              className="p-2 text-[#242424] hover:text-[#173D2B] hover:bg-[#F3EBDD]/60 rounded-full transition-colors relative inline-flex items-center justify-center cursor-pointer"
              aria-label={`Shopping bag (${cartCount} items)`}
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#173D2B] text-[#FAF7F0] text-[9px] font-semibold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp Contact Icon */}
            <a
              href={BUSINESS_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#173D2B] hover:bg-[#F3EBDD]/60 rounded-full transition-colors hidden sm:inline-flex items-center justify-center"
              aria-label="Chat with Stylist on WhatsApp"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#173D2B]" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#F3EBDD] bg-[#FAF7F0] px-6 py-5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="space-y-3 pb-4 border-b border-[#F3EBDD]">
            {megaMenuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xs uppercase tracking-widest text-[#242424] hover:text-[#173D2B] py-2 font-medium border-b border-[#F3EBDD]/40 last:border-b-0"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Account & Wishlist on mobile */}
          <div className="pt-3 pb-3 border-b border-[#F3EBDD] flex items-center justify-between text-xs">
            {customer ? (
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold text-[#173D2B] flex items-center gap-1.5"
              >
                <User className="w-4 h-4" />
                <span>Namaste, {customer.name}</span>
              </Link>
            ) : (
              <Link
                href="/account/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#242424] hover:text-[#173D2B] font-medium flex items-center gap-1.5"
              >
                <User className="w-4 h-4" />
                <span>Customer Sign In (Optional)</span>
              </Link>
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openWishlist();
              }}
              className="text-[#801426] font-semibold flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5 fill-[#801426]" />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>

          {/* Currency selection on mobile */}
          <div className="pt-3 pb-3 border-b border-[#F3EBDD] flex items-center justify-between">
            <span className="text-xs text-[#242424]/70 font-medium">Select Currency:</span>
            <div className="flex items-center gap-2">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 text-xs border rounded-xs ${
                    currency.code === c.code
                      ? "bg-[#173D2B] text-[#FAF7F0] border-[#173D2B]"
                      : "bg-[#FFFFFF] text-[#242424] border-[#F3EBDD]"
                  }`}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-[#242424]/80">
            <span>Stylist Consultation:</span>
            <a
              href={BUSINESS_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#173D2B] font-semibold flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>+91 {BUSINESS_CONTACT.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
