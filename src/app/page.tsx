"use client";

import React from "react";
import { ShopProvider } from "@/context/ShopContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryShowcase from "@/components/CategoryShowcase";
import FreshArrivals from "@/components/FreshArrivals";
import ShivohamEdit from "@/components/ShivohamEdit";
import TrendingCollection from "@/components/TrendingCollection";
import WhyChooseShivoham from "@/components/WhyChooseShivoham";
import InstagramCollection from "@/components/InstagramCollection";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#F9F6EF] text-[#343434]">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* 1. Elegant Header */}
        <Header />

        <main className="flex-1">
          {/* Section 1: Hero Banner (5-image horizontal slider) */}
          <HeroBanner />

          {/* Section 2: Curated Collections (3 category cards) */}
          <CategoryShowcase />

          {/* Section 3: New Arrivals (Editorial horizontal scrolling layout) */}
          <FreshArrivals />

          {/* Section 4: The Shivoham Edit (Luxury fashion magazine editorial) */}
          <ShivohamEdit />

          {/* Section 5: Best Sellers (With category filter tabs: All | Sarees | Kurtis | Suits) */}
          <TrendingCollection />

          {/* Brand Pillars: Why Choose SHIVOHAM */}
          <WhyChooseShivoham />

          {/* Section 6: Instagram Collection (4 square gallery layout) */}
          <InstagramCollection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Contact Button */}
        <FloatingWhatsApp />

        {/* Drawers & Modals */}
        <SearchModal />
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
      </div>
    </ShopProvider>
  );
}
