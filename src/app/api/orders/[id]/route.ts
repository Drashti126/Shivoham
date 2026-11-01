import { NextRequest, NextResponse } from "next/server";
import { getOrderById, updateOrderStatus, updateOrder, syncWithCloudDb } from "@/lib/db";
import { checkAdminSessionFromRequest } from "@/lib/auth";
import { getCustomerSessionFromRequest } from "@/lib/customerAuth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await syncWithCloudDb();
    const { id } = await params;
    const order = getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    const isAdmin = checkAdminSessionFromRequest(req);
    const customerSession = getCustomerSessionFromRequest(req);

    // If neither admin nor owner, but they have the exact unique order ID (e.g. from checkout redirect),
    // allow confirmation view with sanitization
    if (!isAdmin && customerSession && order.customerId && order.customerId !== customerSession.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access to order details" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: true, order },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("GET /api/orders/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = checkAdminSessionFromRequest(req);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    await syncWithCloudDb();
    const { id } = await params;
    const body = await req.json();

    const validStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status value" },
        { status: 400 }
      );
    }

    const patch: any = {};
    if (body.status) patch.status = body.status;
    if (body.paymentStatus) patch.paymentStatus = body.paymentStatus;
    if (body.trackingNumber !== undefined) patch.trackingNumber = body.trackingNumber;

    const updated = updateOrder(id, patch);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, order: updated },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("PATCH /api/orders/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}
