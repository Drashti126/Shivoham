import { NextRequest, NextResponse } from "next/server";
import { checkAdminSessionFromRequest, ADMIN_CONFIG } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const isAuthenticated = checkAdminSessionFromRequest(req);

  if (!isAuthenticated) {
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: { email: ADMIN_CONFIG.email, role: "admin" },
    },
    { status: 200 }
  );
}
