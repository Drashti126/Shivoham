import { NextRequest, NextResponse } from "next/server";
import { getCustomerByEmail, getCustomerByPhone } from "@/lib/db";
import { verifyPassword, createCustomerToken, CUSTOMER_CONFIG } from "@/lib/customerAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: "Email/Mobile and password are required" },
        { status: 400 }
      );
    }

    let customer = null;
    if (identifier.includes("@")) {
      customer = getCustomerByEmail(identifier);
    } else {
      customer = getCustomerByPhone(identifier);
    }

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials. Account not found." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, customer.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid password. Please check your credentials." },
        { status: 401 }
      );
    }

    const token = createCustomerToken({
      id: customer.id,
      email: customer.email,
      name: customer.name,
    });

    const res = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully",
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          addresses: customer.addresses,
          wishlist: customer.wishlist,
        },
      },
      { status: 200 }
    );

    res.cookies.set(CUSTOMER_CONFIG.cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: CUSTOMER_CONFIG.sessionDays * 24 * 60 * 60,
      path: "/",
    });

    return res;
  } catch (error: any) {
    console.error("Customer login error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to sign in" },
      { status: 500 }
    );
  }
}
