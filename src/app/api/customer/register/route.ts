import { NextRequest, NextResponse } from "next/server";
import {
  getCustomerByEmail,
  getCustomerByPhone,
  createCustomer,
} from "@/lib/db";
import { hashPassword, createCustomerToken, CUSTOMER_CONFIG } from "@/lib/customerAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name (minimum 2 characters)" },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid 10-digit mobile number" },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if already registered
    const existingEmail = getCustomerByEmail(email);
    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists. Please sign in." },
        { status: 409 }
      );
    }

    const existingPhone = getCustomerByPhone(cleanPhone);
    if (existingPhone) {
      return NextResponse.json(
        { success: false, error: "An account with this mobile number already exists." },
        { status: 409 }
      );
    }

    // Create Customer
    const passwordHash = hashPassword(password);
    const customer = createCustomer({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      passwordHash,
      addresses: [],
      wishlist: [],
    });

    const token = createCustomerToken({
      id: customer.id,
      email: customer.email,
      name: customer.name,
    });

    const res = NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          addresses: customer.addresses,
          wishlist: customer.wishlist,
        },
      },
      { status: 201 }
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
    console.error("Customer register error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to register account" },
      { status: 500 }
    );
  }
}
