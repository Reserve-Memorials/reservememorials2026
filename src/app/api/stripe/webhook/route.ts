import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getEnv } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type Stripe from "stripe";
import type { PostgrestError } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const env = getEnv();
  if (!env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe-Signature header" }, { status: 400 });
  }

  const stripe = getStripe();
  const supabase = createSupabaseAdminClient();

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Idempotency: store event IDs and ignore repeats.
  const { error: insertEventErr } = await supabase.from("stripe_events").insert({
    event_id: event.id,
    type: event.type,
  });
  if (insertEventErr) {
    // If unique violation, treat as already processed.
    const code = (insertEventErr as PostgrestError).code;
    if (code === "23505") {
      return NextResponse.json({ received: true, deduped: true });
    }
    return NextResponse.json({ error: insertEventErr.message }, { status: 500 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id as string | undefined;
      const orgId = session.metadata?.org_id as string | undefined;
      const paymentIntentId =
        typeof session.payment_intent === "string" ? session.payment_intent : null;

      if (orderId) {
        await supabase
          .from("orders")
          .update({
            status: "paid",
            stripe_payment_intent_id: paymentIntentId,
          })
          .eq("id", orderId);

        await supabase.from("audit_events").insert({
          actor_user_id: null,
          org_id: orgId ?? null,
          event_type: "PAYMENT_SUCCEEDED",
          entity_type: "order",
          entity_id: orderId,
          metadata: { stripe_event_id: event.id },
        });
      }
    } else if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id as string | undefined;
      const orgId = session.metadata?.org_id as string | undefined;
      if (orderId) {
        await supabase.from("orders").update({ status: "cancelled" }).eq("id", orderId);
        await supabase.from("audit_events").insert({
          actor_user_id: null,
          org_id: orgId ?? null,
          event_type: "PAYMENT_FAILED",
          entity_type: "order",
          entity_id: orderId,
          metadata: { stripe_event_id: event.id, reason: "checkout.session.expired" },
        });
      }
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}


