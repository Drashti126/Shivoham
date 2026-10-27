import { NextRequest, NextResponse } from "next/server";
import { getCustomerById, getOrdersByCustomer } from "@/lib/db";
import { getCustomerSessionFromRequest } from "@/lib/customerAuth";

export async function GET(req: NextRequest) {
  try {
    const session = getCustomerSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const customer = getCustomerById(session.id);
    if (!customer) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const orders = getOrdersByCustomer(customer.id, customer.email, customer.phone);

    return NextResponse.json(
      {
        authenticated: true,
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          addresses: customer.addresses || [],
          wishlist: customer.wishlist || [],
        },
        orders,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Customer me error:", error);
    return NextResponse.json(
      { authenticated: false, error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
