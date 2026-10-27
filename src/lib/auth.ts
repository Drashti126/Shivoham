import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const ADMIN_CONFIG = {
  email: process.env.ADMIN_EMAIL || "admin@shivoham.com",
  password: process.env.ADMIN_PASSWORD || "shivoham@admin2026",
  cookieName: "shivoham_admin_session",
  secret: process.env.ADMIN_JWT_SECRET || "shivoham_secure_boutique_token_secret_2026",
};

export function createToken(email: string): string {
  const payload = {
    email,
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", ADMIN_CONFIG.secret)
    .update(data)
    .digest("base64url");
  return `${data}.${signature}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [data, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", ADMIN_CONFIG.secret)
    .update(data)
    .digest("base64url");

  if (signature !== expectedSignature) return false;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
    if (payload.exp && Date.now() > payload.exp) {
      return false;
    }
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_CONFIG.cookieName)?.value;
  return verifyToken(token);
}

export function checkAdminSessionFromRequest(req: NextRequest | Request): boolean {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return false;
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_CONFIG.cookieName}=`));

  if (!match) return false;
  const token = match.substring(`${ADMIN_CONFIG.cookieName}=`.length);
  return verifyToken(token);
}
