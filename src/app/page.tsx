"use client";

import React from "react";
import { ShopProvider } from "@/context/ShopContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryShowcase from "@/components/CategoryShowcase";
import FreshArrivals from "@/components/FreshArrivals";
import TrendingCollection from "@/components/TrendingCollection";
import ProductCatalog from "@/components/ProductCatalog";
import HeritageCrafts from "@/components/HeritageCrafts";
import VoucherSection from "@/components/VoucherSection";
import PromotionalBanner from "@/components/PromotionalBanner";
import CustomerReviews from "@/components/CustomerReviews";
import BrandStory from "@/components/BrandStory";
import WhatsAppBanner from "@/components/WhatsAppBanner";
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

        {/* Luxury Header with Mega-Menu & Currency Switcher */}
        <Header />

        <main className="flex-1">
          {/* 1. Lookbook Hero Banner */}
          <HeroBanner />

          {/* 2. Shop By Category: Sarees, Dresses, Kurtis */}
          <CategoryShowcase />

          {/* 3. New Arrivals Section */}
          <FreshArrivals />

          {/* 4. Best Sellers Section */}
          <TrendingCollection />

          {/* 5. Featured Products & Atelier (Category, Price & Availability Filters) */}
          <ProductCatalog />

          {/* 6. Heirloom Crafts of India */}
          <HeritageCrafts />

          {/* 7. Clickable Voucher Codes */}
          <VoucherSection />

          {/* 8. Promotional Editorial Campaign */}
          <PromotionalBanner />

          {/* 9. Verified Client Love & Trust Badges */}
          <CustomerReviews />

          {/* 10. The Shivoham Philosophy & Heritage Story */}
          <BrandStory />

          {/* 11. WhatsApp Concierge Touchpoint */}
          <WhatsAppBanner />
        </main>

        {/* Boutique Footer */}
        <Footer />

        {/* Floating WhatsApp Contact Button on all public views */}
        <FloatingWhatsApp />

        {/* Interactive Drawers & Modals */}
        <SearchModal />
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
      </div>
    </ShopProvider>
  );
}
