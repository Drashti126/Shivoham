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
} from "lucide-react";
import LogoPlaceholder from "@/components/LogoPlaceholder";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@shivoham.com");
  const [password, setPassword] = useState("shivoham@admin2026");
  const [showPassword, setShowPassword] = useState(false);
  const [showCredsHint, setShowCredsHint] = useState(false);
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

  return (
    <div className="min-h-screen bg-[#F9F6EF] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#343434] relative selection:bg-[#173F35] selection:text-[#F9F6EF]">
      {/* Subtle Luxury Ambient Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#DCC7A5]/15 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B99A55]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* SHIVOHAM Official Brand Logo */}
        <div className="flex justify-center mb-5">
          <div className="relative p-1.5 rounded-full border border-[#B99A55]/40 bg-[#FFFFFF] shadow-sm">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16">
              <Image
                src="/images/logo/shivoham-logo-clean.png"
                alt="SHIVOHAM Logo"
                width={64}
                height={64}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/5 border border-[#B99A55]/30 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A55]" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#173F35] font-semibold">
              Shivoham Ethnic Wear
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A55]" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl text-[#173F35] font-medium tracking-tight">
            Boutique Administration
          </h1>
          <p className="text-xs sm:text-sm text-[#343434]/70 max-w-sm mx-auto leading-relaxed">
            Authorized management portal for catalog curation, order fulfillment, and boutique controls.
          </p>
        </div>
      </div>

      {/* Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#FFFFFF] py-8 sm:py-10 px-6 sm:px-10 border border-[#DCC7A5]/60 shadow-xl shadow-[#173F35]/5 rounded-sm relative">
          {/* Subtle Top Gold Highlight Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DCC7A5] via-[#B99A55] to-[#DCC7A5] rounded-t-sm" />

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 rounded-xs animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#173F35]"
              >
                Admin Email
              </label>
              <div className="mt-1.5 relative">
                <Mail className="w-4 h-4 text-[#B99A55] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@shivoham.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#F9F6EF]/60 border border-[#DCC7A5]/60 rounded-xs focus:outline-none focus:border-[#B99A55] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#B99A55] text-[#343434] transition-all"
                />
              </div>
            </div>

            {/* Password Field with Show/Hide Toggle */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#173F35]"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[#B99A55] hover:text-[#173F35] transition-colors flex items-center gap-1 cursor-pointer"
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
              <div className="mt-1.5 relative">
                <Lock className="w-4 h-4 text-[#B99A55] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#F9F6EF]/60 border border-[#DCC7A5]/60 rounded-xs focus:outline-none focus:border-[#B99A55] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#B99A55] text-[#343434] transition-all"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-5 bg-[#173F35] hover:bg-[#0f291d] text-[#F9F6EF] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer rounded-xs disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-[#F9F6EF] border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </span>
                ) : (
                  <>
                    <span>Enter Admin Portal</span>
                    <ArrowRight className="w-4 h-4 text-[#B99A55]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security & Credentials Assistance */}
          <div className="mt-7 pt-5 border-t border-[#DCC7A5]/40 space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-[#343434]/70">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>256-Bit SSL Encrypted • Private Boutique Session</span>
            </div>

            {/* Discreet Helper for Quick Login */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowCredsHint(!showCredsHint)}
                className="text-[10px] text-[#B99A55] hover:text-[#173F35] hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <KeyRound className="w-3 h-3" />
                <span>{showCredsHint ? "Hide login hint" : "View authorized credentials hint"}</span>
              </button>

              {showCredsHint && (
                <div className="mt-2.5 p-2.5 rounded-xs bg-[#F9F6EF] border border-[#DCC7A5]/50 text-[10px] text-[#343434]/80 space-y-1 animate-in fade-in duration-150">
                  <div className="font-mono text-[#173F35] font-semibold">
                    admin@shivoham.com
                  </div>
                  <div className="font-mono text-[#343434]/70">
                    shivoham@admin2026
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
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
