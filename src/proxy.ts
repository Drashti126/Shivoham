import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_CONFIG, verifyToken } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(ADMIN_CONFIG.cookieName)?.value;
    const isValid = verifyToken(token);

    if (!isValid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in as admin, redirect away from /admin/login to /admin dashboard
  if (pathname === "/admin/login") {
    const token = request.cookies.get(ADMIN_CONFIG.cookieName)?.value;
    if (verifyToken(token)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
