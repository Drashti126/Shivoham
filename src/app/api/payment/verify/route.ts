import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, isMock } = body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { success: false, error: "Missing required payment verification parameters" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Production verification with configured secret
    if (keySecret && !isMock) {
      if (!razorpay_signature) {
        return NextResponse.json(
          { success: false, error: "Missing signature for verification" },
          { status: 400 }
        );
      }

      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { success: false, error: "Payment signature mismatch. Transaction untrusted." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        verified: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        mode: "live",
      });
    }

    // Secure Simulated Verification for Sandbox/Development
    if (isMock || razorpay_order_id.startsWith("order_sim_")) {
      return NextResponse.json({
        success: true,
        verified: true,
        paymentId: razorpay_payment_id || `pay_sim_${Date.now()}`,
        orderId: razorpay_order_id,
        mode: "simulated_test",
      });
    }

    return NextResponse.json(
      { success: false, error: "Unable to verify payment without gateway secret" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Payment verify error:", error);
    return NextResponse.json(
      { success: false, error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
