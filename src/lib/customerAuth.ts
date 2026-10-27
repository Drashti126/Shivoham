import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const CUSTOMER_CONFIG = {
  cookieName: "shivoham_customer_session",
  secret: process.env.CUSTOMER_JWT_SECRET || "shivoham_customer_token_secret_boutique_2026",
  sessionDays: 30,
};

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !storedHash.includes(":")) return false;
  const [salt, key] = storedHash.split(":");
  const testHash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return key === testHash;
}

export function createCustomerToken(payload: {
  id: string;
  email: string;
  name: string;
}): string {
  const dataPayload = {
    ...payload,
    role: "customer",
    exp: Date.now() + CUSTOMER_CONFIG.sessionDays * 24 * 60 * 60 * 1000,
  };
  const data = Buffer.from(JSON.stringify(dataPayload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", CUSTOMER_CONFIG.secret)
    .update(data)
    .digest("base64url");
  return `${data}.${signature}`;
}

export function verifyCustomerToken(
  token: string | undefined
): { id: string; email: string; name: string } | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", CUSTOMER_CONFIG.secret)
    .update(data)
    .digest("base64url");

  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }
    if (payload.role !== "customer" && payload.role !== "admin") {
      return null;
    }
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
    };
  } catch {
    return null;
  }
}

export async function getCustomerSession(): Promise<{
  id: string;
  email: string;
  name: string;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_CONFIG.cookieName)?.value;
  return verifyCustomerToken(token);
}

export function getCustomerSessionFromRequest(
  req: NextRequest | Request
): { id: string; email: string; name: string } | null {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${CUSTOMER_CONFIG.cookieName}=`));

  if (!match) return null;
  const token = match.substring(`${CUSTOMER_CONFIG.cookieName}=`.length);
  return verifyCustomerToken(token);
}
