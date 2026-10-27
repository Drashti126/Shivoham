import { NextResponse } from "next/server";
import { CUSTOMER_CONFIG } from "@/lib/customerAuth";

export async function POST() {
  const res = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );

  res.cookies.set(CUSTOMER_CONFIG.cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return res;
}
