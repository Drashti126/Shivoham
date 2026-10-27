import { NextRequest, NextResponse } from "next/server";
import { ADMIN_CONFIG, createToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (
      email.trim().toLowerCase() !== ADMIN_CONFIG.email.toLowerCase() ||
      password !== ADMIN_CONFIG.password
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid admin email or password" },
        { status: 401 }
      );
    }

    const token = createToken(email.trim());

    const response = NextResponse.json(
      {
        success: true,
        message: "Admin login successful",
        user: { email: ADMIN_CONFIG.email },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: ADMIN_CONFIG.cookieName,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
