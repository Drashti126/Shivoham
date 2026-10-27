"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import LogoPlaceholder from "@/components/LogoPlaceholder";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@shivoham.com");
  const [password, setPassword] = useState("shivoham@admin2026");
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
        router.push("/admin");
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#242424]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* SHIVOHAM Logo */}
        <div className="flex justify-center mb-4">
          <LogoPlaceholder variant="header" />
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl text-[#173D2B] font-normal tracking-tight">
          Boutique Administration
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#242424]/70">
          Sign in to manage catalog, update prices, upload images &amp; track orders.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[#FFFFFF] py-8 px-6 sm:px-10 border border-[#F3EBDD] shadow-xl rounded-xs">
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B]"
              >
                Admin Email
              </label>
              <div className="mt-1.5 relative">
                <Mail className="w-4 h-4 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@shivoham.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B] text-[#242424]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B]"
              >
                Password
              </label>
              <div className="mt-1.5 relative">
                <Lock className="w-4 h-4 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B] text-[#242424]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Enter Admin Portal</span>
                    <ArrowRight className="w-4 h-4 text-[#B89A5A]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick credentials hint for owner */}
          <div className="mt-6 pt-5 border-t border-[#F3EBDD] text-center text-[11px] text-[#242424]/60 space-y-1">
            <div className="flex items-center justify-center gap-1 text-[#173D2B] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89A5A]" />
              <span>Default Credentials Configured:</span>
            </div>
            <p className="font-mono text-[10px]">
              admin@shivoham.com / shivoham@admin2026
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-[#173D2B] hover:text-[#B89A5A] font-medium transition-colors"
          >
            &larr; Return to Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
