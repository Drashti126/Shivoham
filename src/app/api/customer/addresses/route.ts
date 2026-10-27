import { NextRequest, NextResponse } from "next/server";
import { addCustomerAddress, deleteCustomerAddress, getCustomerById } from "@/lib/db";
import { getCustomerSessionFromRequest } from "@/lib/customerAuth";

export async function POST(req: NextRequest) {
  try {
    const session = getCustomerSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, phone, street, city, state, pincode, isDefault } = body;

    if (!fullName || !phone || !street || !city || !state || !pincode) {
      return NextResponse.json(
        { success: false, error: "Please fill out all delivery address fields" },
        { status: 400 }
      );
    }

    const updated = addCustomerAddress(session.id, {
      fullName: fullName.trim(),
      phone: phone.trim(),
      street: street.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      isDefault: Boolean(isDefault),
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Customer record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, addresses: updated.addresses, message: "Address saved successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Save address error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save address" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = getCustomerSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const addressId = searchParams.get("id");

    if (!addressId) {
      return NextResponse.json(
        { success: false, error: "Address ID required" },
        { status: 400 }
      );
    }

    const updated = deleteCustomerAddress(session.id, addressId);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, addresses: updated.addresses, message: "Address deleted" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete address error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete address" },
      { status: 500 }
    );
  }
}
