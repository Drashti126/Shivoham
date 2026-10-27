import { NextRequest, NextResponse } from "next/server";
import { getOrders, createOrder, getOrdersByCustomer } from "@/lib/db";
import { checkAdminSessionFromRequest } from "@/lib/auth";
import { getCustomerSessionFromRequest } from "@/lib/customerAuth";

export async function GET(req: NextRequest) {
  try {
    const isAdmin = checkAdminSessionFromRequest(req);
    const customerSession = getCustomerSessionFromRequest(req);

    if (isAdmin) {
      const orders = getOrders();
      return NextResponse.json({ success: true, orders }, { status: 200 });
    }

    if (customerSession) {
      const orders = getOrdersByCustomer(customerSession.id, customerSession.email);
      return NextResponse.json({ success: true, orders }, { status: 200 });
    }

    return NextResponse.json(
      { success: false, error: "Unauthorized access" },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    // Check optional customer session
    const customerSession = getCustomerSessionFromRequest(req);
    const customerId = customerSession?.id || body.customerId || undefined;

    const newOrder = createOrder({
      customerName: (body.customerName || "Boutique Guest").trim(),
      customerEmail: body.customerEmail ? body.customerEmail.trim().toLowerCase() : undefined,
      customerPhone: (body.customerPhone || "N/A").trim(),
      customerCity: body.customerCity || "Pan-India",
      customerState: body.customerState || "",
      customerPincode: body.customerPincode || "",
      customerAddress: body.customerAddress || "",
      items: body.items,
      totalAmount: Number(body.totalAmount) || 0,
      currency: body.currency || "INR",
      couponCode: body.couponCode || undefined,
      discountAmount: body.discountAmount ? Number(body.discountAmount) : 0,
      deliveryCharge: body.deliveryCharge !== undefined ? Number(body.deliveryCharge) : 0,
      paymentMethod: body.paymentMethod || "COD",
      paymentStatus: body.paymentStatus || (body.paymentMethod === "COD" ? "Pending" : "Paid"),
      paymentId: body.paymentId || undefined,
      status: body.status || "Pending",
      notes: body.notes || "",
      customerId,
    });

    return NextResponse.json(
      {
        success: true,
        order: newOrder,
        message: "Order placed successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to place order" },
      { status: 500 }
    );
  }
}
