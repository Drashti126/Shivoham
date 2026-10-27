"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Phone, User, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";
import LogoPlaceholder from "@/components/LogoPlaceholder";
import { ShopProvider, useShop } from "@/context/ShopContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function CustomerRegisterForm() {
  const router = useRouter();
  const { refreshCustomer } = useShop();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/customer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        await refreshCustomer();
        router.push("/account");
      } else {
        setError(data.error || "Registration failed. Please check your details.");
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
            Optional Registration
          </span>
          <h1 className="font-serif text-2xl text-[#173D2B] font-normal">
            Create Your SHIVOHAM Account
          </h1>
          <p className="text-xs text-[#242424]/65">
            Save delivery addresses, view order updates, and manage your wishlist.
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
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Priyadarshini Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
              10-Digit Mobile Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
              Password (min. 6 characters) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
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
            <span>{loading ? "Creating Account..." : "Create Account"}</span>
            <ArrowRight className="w-4 h-4 text-[#B89A5A]" />
          </button>
        </form>

        {/* Links */}
        <div className="pt-4 border-t border-[#F3EBDD] space-y-3 text-center text-xs">
          <p className="text-[#242424]/70">
            Already registered?{" "}
            <Link
              href="/account/login"
              className="text-[#173D2B] font-semibold underline hover:text-[#B89A5A]"
            >
              Sign In to Account
            </Link>
          </p>

          <div className="bg-[#FAF7F0] p-3 border border-[#F3EBDD] rounded-xs text-[11px] text-[#242424]/70 leading-relaxed">
            Previous orders placed as a guest using your email or phone will automatically be linked to your account.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomerRegisterPage() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#242424]">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">
          <CustomerRegisterForm />
        </main>
        <Footer />
      </div>
    </ShopProvider>
  );
}
