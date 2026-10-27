import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/db";
import { checkAdminSessionFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeUnpublished = searchParams.get("includeUnpublished") === "true";

    const isAdmin = checkAdminSessionFromRequest(req);
    const products = getProducts({
      includeUnpublished: includeUnpublished && isAdmin,
    });

    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAdmin = checkAdminSessionFromRequest(req);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body.name || !body.category || !body.price || !body.image) {
      return NextResponse.json(
        { success: false, error: "Name, category, price, and image are required" },
        { status: 400 }
      );
    }

    const newProduct = createProduct({
      name: body.name.trim(),
      category: body.category,
      fabric: body.fabric || "Handloom Blend",
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      image: body.image,
      secondaryImage: body.secondaryImage || undefined,
      badge: body.badge || undefined,
      description: body.description || "",
      sizes: Array.isArray(body.sizes) && body.sizes.length > 0 ? body.sizes : ["Free Size"],
      isSample: false,
      isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
      inStock: body.inStock !== undefined ? Boolean(body.inStock) : true,
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
