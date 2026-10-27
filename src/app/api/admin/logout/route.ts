import { NextResponse } from "next/server";
import { ADMIN_CONFIG } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );

  response.cookies.set({
    name: ADMIN_CONFIG.cookieName,
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
