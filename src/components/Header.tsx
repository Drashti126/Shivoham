"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  User,
  Heart,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import LogoPlaceholder from "./LogoPlaceholder";
import { useShop } from "@/context/ShopContext";
import { BUSINESS_CONTACT } from "@/data/sampleProducts";

export default function Header() {
  const {
    cartCount,
    openCart,
    wishlist,
    openWishlist,
    openQuickView,
    customer,
    searchQuery,
    setSearchQuery,
    allCatalogProducts,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter products for instant live search dropdown
  const matchingProducts = useMemo(() => {
    if (!searchQuery || !searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allCatalogProducts
      .filter((p) => p.isPublished !== false)
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
  }, [allCatalogProducts, searchQuery]);

  const navMenuItems = [
    { label: "Home", href: "/" },
    { label: "Sarees", href: "/category/sarees" },
    { label: "Kurtis", href: "/category/kurtis" },
    { label: "Suits", href: "/category/suits" },
    { label: "About Us", href: "/#why-choose" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#F3EBDD] transition-all">
      <div className="w-full px-3 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-22">
          
          {/* Left: Mobile Hamburger & SHIVOHAM Logo */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-[#242424] hover:text-[#173D2B] transition-colors lg:hidden cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Preserved Official SHIVOHAM Logo */}
            <LogoPlaceholder variant="header" />
          </div>

          {/* Center: Clean & Elegant Desktop Navigation Menu */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center justify-center flex-1 h-full gap-8 xl:gap-10 px-6"
          >
            {navMenuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-xs uppercase tracking-[0.2em] text-[#242424] hover:text-[#173D2B] transition-colors font-medium py-3 group whitespace-nowrap"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#173D2B] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right: Search Icon, Account Icon, Shopping Cart Icon */}
          <div className="flex items-center shrink-0 gap-1.5 sm:gap-4 lg:gap-5">
            {/* Desktop Search Bar (Expandable) */}
            <div ref={searchContainerRef} className="relative hidden sm:block">
              {isSearchOpen ? (
                <div className="flex items-center bg-[#FFFFFF] border border-[#B89A5A] rounded-full px-3 py-1 shadow-sm transition-all w-52 sm:w-64">
                  <Search className="w-4 h-4 text-[#B89A5A] shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sarees, kurtis, suits..."
                    className="w-full text-xs pl-2 pr-1 py-1 bg-transparent text-[#242424] focus:outline-none placeholder:text-[#242424]/40"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                    className="p-0.5 text-[#242424]/50 hover:text-[#173D2B] cursor-pointer"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-[#242424] hover:text-[#173D2B] transition-colors rounded-full hover:bg-[#FAF7F0] cursor-pointer"
                  aria-label="Search"
                  title="Search collections"
                >
                  <Search className="w-5 h-5 text-[#173D2B]" />
                </button>
              )}

              {/* Instant Search Results Dropdown for Desktop */}
              {isSearchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-[#FFFFFF] border border-[#F3EBDD] shadow-2xl rounded-xs p-3.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F3EBDD] text-[11px] text-[#242424]/60">
                    <span className="font-medium text-[#173D2B]">
                      {matchingProducts.length}{" "}
                      {matchingProducts.length === 1 ? "design" : "designs"} found
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="hover:text-[#173D2B] p-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {matchingProducts.length > 0 ? (
                    <div className="divide-y divide-[#F3EBDD]/60 max-h-72 overflow-y-auto">
                      {matchingProducts.slice(0, 5).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            openQuickView(p);
                          }}
                          className="py-2 px-1 flex items-center gap-3 hover:bg-[#FAF7F0] cursor-pointer transition-colors group"
                        >
                          <div className="relative w-10 h-12 bg-[#F3EBDD] shrink-0 overflow-hidden rounded-2xs">
                            <Image
                              src={encodeURI(p.image)}
                              alt={p.name}
                              fill
                              sizes="40px"
                              className="object-cover object-top"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
                              {p.category}
                            </span>
                            <h4 className="text-xs text-[#242424] font-medium truncate group-hover:text-[#173D2B]">
                              {p.name}
                            </h4>
                            <span className="text-xs font-semibold text-[#173D2B]">
                              ₹{p.price}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="pt-2 text-center">
                        <Link
                          href={`/products?q=${encodeURIComponent(searchQuery)}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="text-xs text-[#173D2B] font-semibold hover:text-[#B89A5A] uppercase tracking-wider inline-flex items-center gap-1"
                        >
                          <span>View All Results</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 text-center text-xs text-[#242424]/60">
                      No products found matching &ldquo;{searchQuery}&rdquo;.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Search Toggle Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="sm:hidden p-2 text-[#242424] hover:text-[#173D2B] transition-colors rounded-full cursor-pointer"
              aria-label="Toggle mobile search"
            >
              <Search className="w-5 h-5 text-[#173D2B]" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={openWishlist}
              className="relative p-2 text-[#242424] hover:text-[#173D2B] transition-colors rounded-full hover:bg-[#FAF7F0] cursor-pointer"
              aria-label={`Wishlist containing ${wishlist.length} saved items`}
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5 text-[#173D2B]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#801426] text-[#FAF7F0] text-[10px] font-bold flex items-center justify-center shadow-xs border border-[#FAF7F0]">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account Icon */}
            <Link
              href="/account"
              className="p-2 text-[#242424] hover:text-[#173D2B] transition-colors rounded-full hover:bg-[#FAF7F0] cursor-pointer"
              aria-label="Customer Account"
              title={customer ? `Signed in as ${customer.name}` : "Account Login / Profile"}
            >
              <User className="w-5 h-5 text-[#173D2B]" />
            </Link>

            {/* Shopping Cart Icon */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#242424] hover:text-[#173D2B] transition-colors rounded-full hover:bg-[#FAF7F0] cursor-pointer"
              aria-label={`Shopping bag containing ${cartCount} items`}
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 text-[#173D2B]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#173D2B] text-[#FAF7F0] text-[10px] font-bold flex items-center justify-center shadow-xs border border-[#FAF7F0]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Strip (Appears gracefully below header row) */}
      {isSearchOpen && (
        <div className="sm:hidden px-3 py-2 bg-[#FFFFFF] border-t border-b border-[#F3EBDD] flex items-center gap-2 animate-in slide-in-from-top-1 duration-150 shadow-sm">
          <Search className="w-4 h-4 text-[#B89A5A] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sarees, kurtis, suits..."
            className="w-full text-xs py-1 text-[#242424] focus:outline-none placeholder:text-[#242424]/40"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 text-[#242424]/40 hover:text-[#173D2B]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs text-[#801426] font-medium px-1 cursor-pointer shrink-0"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Mobile Search Live Results Dropdown */}
      {isSearchOpen && searchQuery.trim().length > 0 && (
        <div className="sm:hidden bg-[#FFFFFF] border-b border-[#F3EBDD] px-4 py-3 max-h-72 overflow-y-auto shadow-xl">
          {matchingProducts.length > 0 ? (
            <div className="divide-y divide-[#F3EBDD]/60">
              {matchingProducts.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    openQuickView(p);
                  }}
                  className="py-2 flex items-center gap-3 cursor-pointer"
                >
                  <div className="relative w-9 h-11 bg-[#F3EBDD] shrink-0 overflow-hidden rounded-2xs">
                    <Image
                      src={encodeURI(p.image)}
                      alt={p.name}
                      fill
                      sizes="36px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
                      {p.category}
                    </span>
                    <h4 className="text-xs text-[#242424] font-medium truncate">
                      {p.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#173D2B]">
                      ₹{p.price}
                    </span>
                  </div>
                </div>
              ))}
              <div className="pt-2 text-center">
                <Link
                  href={`/products?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="text-xs text-[#173D2B] font-semibold hover:text-[#B89A5A] uppercase tracking-wider inline-flex items-center gap-1"
                >
                  <span>View All Results</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-2 text-center text-xs text-[#242424]/60">
              No products found matching &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </div>
      )}

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/40 z-30 lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden relative z-40 border-t border-[#F3EBDD] bg-[#FAF7F0] px-5 py-5 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navMenuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.2em] font-medium text-[#173D2B] hover:text-[#B89A5A] py-2.5 border-b border-[#F3EBDD]/60 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-[#B89A5A]" />
              </Link>
            ))}

            {/* Mobile Wishlist Link */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openWishlist();
              }}
              className="text-sm uppercase tracking-[0.2em] font-medium text-[#173D2B] hover:text-[#B89A5A] py-2.5 border-b border-[#F3EBDD]/60 flex items-center justify-between text-left w-full cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#801426]" />
                <span>Wishlist ({wishlist.length})</span>
              </span>
              <ArrowRight className="w-4 h-4 text-[#B89A5A]" />
            </button>
          </nav>

          <div className="pt-2 flex flex-col gap-2 text-xs text-[#242424]/75">
            <a
              href={`tel:+91${BUSINESS_CONTACT.phone}`}
              className="flex items-center gap-2 py-1.5 hover:text-[#173D2B]"
            >
              <Phone className="w-4 h-4 text-[#B89A5A]" />
              <span>Call: +91 {BUSINESS_CONTACT.phone}</span>
            </a>
            <a
              href={BUSINESS_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-1.5 text-emerald-800 font-semibold"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
