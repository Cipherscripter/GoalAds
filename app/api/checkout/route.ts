import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const PRICE_MAP: Record<string, Record<string, string>> = {
  pro: {
    monthly: process.env.STRIPE_PRO_PRICE_ID || "",
    annual: process.env.STRIPE_PRO_ANNUAL_PRICE_ID || process.env.STRIPE_PRO_PRICE_ID || "",
  },
  agency: {
    monthly: process.env.STRIPE_AGENCY_PRICE_ID || "",
    annual: process.env.STRIPE_AGENCY_ANNUAL_PRICE_ID || process.env.STRIPE_AGENCY_PRICE_ID || "",
  },
  enterprise: {
    monthly: process.env.STRIPE_ENTERPRISE_PRICE_ID || "",
    annual: process.env.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID || process.env.STRIPE_ENTERPRISE_PRICE_ID || "",
  },
};

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    const { searchParams } = new URL(req.url);
    const plan = searchParams.get("plan") || "pro";
    const isAnnual = searchParams.get("annual") === "true";

    const priceId = PRICE_MAP[plan]?.[isAnnual ? "annual" : "monthly"];

    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan or price not configured" }, { status: 400 });
    }

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress || "";

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      metadata: { userId, plan },
      success_url: `${appUrl}/dashboard?checkout=success`,
      cancel_url: `${appUrl}/#pricing`,
    });

    return NextResponse.redirect(session.url!);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
