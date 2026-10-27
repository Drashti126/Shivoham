"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle, Sparkles, User, ShoppingBag } from "lucide-react";
import LogoPlaceholder from "@/components/LogoPlaceholder";
import { ShopProvider, useShop } from "@/context/ShopContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function CustomerLoginForm() {
  const router = useRouter();
  const { refreshCustomer } = useShop();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        await refreshCustomer();
        router.push("/account");
      } else {
        setError(data.error || "Login failed. Please verify your credentials.");
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16">
      <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-6 sm:p-8 shadow-xl rounded-xs space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <LogoPlaceholder variant="header" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#B89A5A] font-semibold block">
            Customer Portal
          </span>
          <h1 className="font-serif text-2xl text-[#173D2B] font-normal">
            Sign In to Your Account
          </h1>
          <p className="text-xs text-[#242424]/65">
            Access your order history, saved addresses, and trousseau favorites.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
              Email or 10-Digit Mobile Number
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="name@example.com or 9876543210"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <span>{loading ? "Signing In..." : "Sign In to Account"}</span>
            <ArrowRight className="w-4 h-4 text-[#B89A5A]" />
          </button>
        </form>

        {/* Links */}
        <div className="pt-4 border-t border-[#F3EBDD] space-y-3 text-center text-xs">
          <p className="text-[#242424]/70">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/account/register"
              className="text-[#173D2B] font-semibold underline hover:text-[#B89A5A]"
            >
              Create Account (Optional)
            </Link>
          </p>

          {/* Guest Checkout Callout */}
          <div className="bg-[#FAF7F0] p-3 border border-[#F3EBDD] rounded-xs space-y-1">
            <span className="text-[11px] font-semibold text-[#173D2B] block">
              Shopping as a Guest?
            </span>
            <p className="text-[10px] text-[#242424]/60">
              Registration is never mandatory. You can browse all designs and check out directly.
            </p>
            <Link
              href="/"
              className="text-[11px] text-[#801426] hover:underline font-semibold block pt-1"
            >
              ← Continue Browsing Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomerLoginPage() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#242424]">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">
          <CustomerLoginForm />
        </main>
        <Footer />
      </div>
    </ShopProvider>
  );
}
