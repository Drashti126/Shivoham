import { NextRequest, NextResponse } from "next/server";
import { syncCustomerWishlist } from "@/lib/db";
import { getCustomerSessionFromRequest } from "@/lib/customerAuth";

export async function POST(req: NextRequest) {
  try {
    const session = getCustomerSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { wishlist } = body;

    if (!Array.isArray(wishlist)) {
      return NextResponse.json(
        { success: false, error: "Invalid wishlist array" },
        { status: 400 }
      );
    }

    const updated = syncCustomerWishlist(session.id, wishlist);
    return NextResponse.json(
      { success: true, wishlist: updated?.wishlist || [] },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Sync wishlist error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to sync wishlist" },
      { status: 500 }
    );
  }
}
