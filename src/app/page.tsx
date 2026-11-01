"use client";

import React from "react";
import { ShopProvider } from "@/context/ShopContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryShowcase from "@/components/CategoryShowcase";
import FreshArrivals from "@/components/FreshArrivals";
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
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#242424]">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* 1. Elegant Header */}
        <Header />

        <main className="flex-1">
          {/* 2. One Large Hero Banner */}
          <HeroBanner />

          {/* 3. Three Category Cards: Sarees, Kurtis, Suits */}
          <CategoryShowcase />

          {/* 4. New Arrivals: Maximum 4 Products */}
          <FreshArrivals />

          {/* 5. Best Sellers: Maximum 4 Products */}
          <TrendingCollection />

          {/* 6. Why Choose SHIVOHAM */}
          <WhyChooseShivoham />

          {/* 7. Instagram Collection: Display only 4 selected images */}
          <InstagramCollection />
        </main>

        {/* 8. Elegant Footer */}
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
