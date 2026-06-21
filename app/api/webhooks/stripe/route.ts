import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;
        const customerId = session.customer as string;

        if (userId && plan) {
          const client = await clerkClient();
          // Get subscription expiry
          const subscriptions = await getStripe().subscriptions.list({
            customer: customerId,
            limit: 1,
          });
          const sub = subscriptions.data[0];
          // current_period_end available on subscription items
          const subAny = sub as unknown as { current_period_end?: number };
          const expiresAt = subAny?.current_period_end
            ? new Date(subAny.current_period_end * 1000).toISOString()
            : null;

          await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              plan,
              stripeCustomerId: customerId,
              expiresAt,
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find user by Stripe customer ID and downgrade
        // In production, store userId in subscription metadata
        // For now, iterate via metadata
        const sessionList = await getStripe().checkout.sessions.list({
          customer: customerId,
          limit: 5,
        });

        const userId = sessionList.data.find((s) => s.metadata?.userId)?.metadata?.userId;

        if (userId) {
          const client = await clerkClient();
          await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              plan: "free",
              stripeCustomerId: customerId,
              expiresAt: null,
            },
          });
        }
        break;
      }

      case "invoice.payment_failed": {
        // Could notify user or mark account as past due
        console.log("Payment failed:", event.data.object);
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
