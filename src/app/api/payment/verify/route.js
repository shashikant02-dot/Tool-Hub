import { NextResponse } from "next/server";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// Keep this in sync with the plans shown on PricingCard.jsx
const VALID_PLANS = {
  120: 460,
  250: 899,
  500: 1499,
};

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      credits,
    } = await req.json();

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !credits
    ) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    if (!VALID_PLANS[credits]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // ✅ Verify the payment is genuine using Razorpay's HMAC signature check
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Extend existing pro time if still active, else start fresh 30 days
    const now = new Date();
    const currentExpiry =
      user.proExpiry && new Date(user.proExpiry) > now
        ? new Date(user.proExpiry)
        : now;

    const newExpiry = new Date(currentExpiry);
    newExpiry.setDate(newExpiry.getDate() + 30);

    user.isPro = true;
    user.credits = (user.credits || 0) + Number(credits);
    user.proExpiry = newExpiry;
    await user.save();

    return NextResponse.json({
      success: true,
      isPro: true,
      credits: user.credits,
      proExpiry: user.proExpiry,
    });
  } catch (error) {
    console.error("Payment Verify Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}