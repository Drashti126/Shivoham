"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@shivoham.com");
  const [password, setPassword] = useState("shivoham@admin2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Full hard navigation ensures session cookie is committed and fresh state loads
        window.location.href = "/admin";
      } else {
        setError(data.error || "Login failed. Please verify your credentials.");
      }
    } catch {
      setError("A network error occurred. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@shivoham.com");
    setPassword("shivoham@admin2026");
    setError(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F9F6EF] text-[#343434] selection:bg-[#173F35] selection:text-[#F9F6EF]">
      {/* ─────────────────────────────────────────────────────────────
          LEFT PANEL: HIGH-FASHION EDITORIAL ATELIER SHOWCASE (DESKTOP)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full lg:w-1/2 min-h-[320px] lg:min-h-screen bg-[#173F35] text-[#F9F6EF] flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 overflow-hidden select-none">
        {/* Background Editorial Photograph from Brand Collection */}
        <Image
          src="/images/banners/ChatGPT Image Nov 2, 2026, 10_46_24 AM.png"
          alt="SHIVOHAM Royal Heritage Ethnic Collection"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top scale-102 transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Gradient Overlays for High Luxury Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-[#173F35]/40 mix-blend-multiply pointer-events-none" />

        {/* Top Header Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#B99A55] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#F9F6EF] font-semibold">
              Shivoham Atelier &bull; Est. 2026
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#DCC7A5] font-serif">
            <span>Private Portal</span>
          </div>
        </div>

        {/* Center / Bottom Editorial Brand Quote */}
        <div className="relative z-10 max-w-lg my-auto pt-10 sm:pt-16 lg:pt-24 space-y-4">
          <div className="w-10 h-0.5 bg-[#B99A55]" />
          
          <h2 className="font-serif text-2xl sm:text-3xl xl:text-4xl text-[#F9F6EF] font-normal leading-snug tracking-tight">
            Where Regal Indian Heritage Meets Mastercraft Elegance.
          </h2>

          <p className="text-xs sm:text-sm text-[#F9F6EF]/85 font-light leading-relaxed hidden sm:block">
            Curated sarees, handcrafted suits, and bespoke ethnic silhouettes. Authorized administration portal for catalog governance, order desk operations, and real-time boutique inventory.
          </p>

          {/* Quick Metrics Badge Strip */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/15">
            <div>
              <span className="block font-serif text-lg sm:text-2xl text-[#B99A55] font-medium">78+</span>
              <span className="block text-[10px] uppercase tracking-wider text-white/70">Curated Designs</span>
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-2xl text-[#B99A55] font-medium">3</span>
              <span className="block text-[10px] uppercase tracking-wider text-white/70">Royal Collections</span>
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-2xl text-[#B99A55] font-medium">24/7</span>
              <span className="block text-[10px] uppercase tracking-wider text-white/70">Atelier Desk</span>
            </div>
          </div>
        </div>

        {/* Bottom Security Assurance */}
        <div className="relative z-10 hidden sm:flex items-center gap-2 text-[11px] text-white/70 pt-4">
          <ShieldCheck className="w-4 h-4 text-[#B99A55] shrink-0" />
          <span>Restricted Executive Access &bull; Shivoham Brand Operations</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT PANEL: EXCLUSIVE EXECUTIVE ATELIER CONSOLE
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 md:p-14 xl:p-18 bg-[#F9F6EF] relative">
        {/* Subtle Ambient Gold Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#B99A55]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Section */}
        <div className="w-full max-w-md mx-auto">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3.5 mb-8">
            <div className="relative p-1 rounded-full border border-[#B99A55]/50 bg-[#FFFFFF] shadow-sm shrink-0">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo/shivoham-logo-clean.png"
                  alt="SHIVOHAM Logo"
                  width={48}
                  height={48}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-semibold tracking-[0.2em] text-[#173F35] uppercase block leading-none">
                SHIVOHAM
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#B99A55] uppercase block mt-1 font-sans font-medium">
                Atelier Administration
              </span>
            </div>
          </div>

          <div className="space-y-1 mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl text-[#173F35] font-medium tracking-tight">
              Executive Sign In
            </h1>
            <p className="text-xs text-[#343434]/70 leading-relaxed">
              Enter your authorized staff credentials to manage the boutique catalog, live orders, and pricing.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 rounded-xs animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#173F35] mb-1.5"
              >
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#B99A55] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@shivoham.com"
                  className="w-full pl-10 pr-3.5 py-3 text-xs bg-[#FFFFFF] border border-[#DCC7A5]/70 rounded-xs focus:outline-none focus:border-[#173F35] focus:ring-1 focus:ring-[#173F35] text-[#343434] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Password Field with Show/Hide Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#173F35]"
                >
                  Security Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[#B99A55] hover:text-[#173F35] transition-colors flex items-center gap-1 cursor-pointer font-medium"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-[#B99A55] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 text-xs bg-[#FFFFFF] border border-[#DCC7A5]/70 rounded-xs focus:outline-none focus:border-[#173F35] focus:ring-1 focus:ring-[#173F35] text-[#343434] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* One-Click Quick Fill Button for Owner Convenience */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[11px] text-[#343434]/60">Authorized Owner Account</span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-semibold text-[#B99A55] hover:text-[#173F35] transition-colors cursor-pointer flex items-center gap-1"
                title="Fill default authorized admin credentials"
              >
                <KeyRound className="w-3 h-3" />
                <span>Auto-Fill Credentials</span>
              </button>
            </div>

            {/* Submit CTA Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-[#173F35] hover:bg-[#0f291d] text-[#F9F6EF] text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer rounded-xs disabled:opacity-60 group"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#F9F6EF] border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Secure Session...</span>
                  </span>
                ) : (
                  <>
                    <span>Enter Atelier Portal</span>
                    <ArrowRight className="w-4 h-4 text-[#B99A55] group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Assurance */}
          <div className="mt-8 pt-6 border-t border-[#DCC7A5]/40 flex items-center justify-between text-[11px] text-[#343434]/70">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              256-Bit SSL Encrypted
            </span>
            <span className="text-[#343434]/40">&bull;</span>
            <span className="text-[#343434]/70">Private Staff Gateway</span>
          </div>
        </div>

        {/* Footer Navigation Back Link */}
        <div className="w-full max-w-md mx-auto pt-6 text-center lg:text-left">
          <Link
            href="/"
            className="text-xs text-[#173F35] hover:text-[#B99A55] font-medium tracking-wide transition-colors inline-flex items-center gap-1.5"
          >
            <span>&larr;</span>
            <span>Return to Shivoham Customer Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
