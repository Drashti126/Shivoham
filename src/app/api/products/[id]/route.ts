import { NextRequest, NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "@/lib/db";
import { checkAdminSessionFromRequest } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const { id } = await params;
    const body = await req.json();

    const patch: any = {};
    if (body.name !== undefined) patch.name = body.name.trim();
    if (body.category !== undefined) patch.category = body.category;
    if (body.fabric !== undefined) patch.fabric = body.fabric;
    if (body.price !== undefined) patch.price = Number(body.price);
    if (body.originalPrice !== undefined) {
      patch.originalPrice = body.originalPrice ? Number(body.originalPrice) : undefined;
    }
    if (body.image !== undefined) patch.image = body.image;
    if (body.secondaryImage !== undefined) patch.secondaryImage = body.secondaryImage || undefined;
    if (body.badge !== undefined) patch.badge = body.badge || undefined;
    if (body.description !== undefined) patch.description = body.description;
    if (body.sizes !== undefined) patch.sizes = body.sizes;
    if (body.isPublished !== undefined) patch.isPublished = Boolean(body.isPublished);
    if (body.inStock !== undefined) patch.inStock = Boolean(body.inStock);

    const updated = updateProduct(id, patch);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product: updated }, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const { id } = await params;
    const success = deleteProduct(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Product not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
