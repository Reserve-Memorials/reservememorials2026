import { NextResponse } from "next/server";
import { z } from "zod";
import { getEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const BodySchema = z.object({
  designSessionId: z.string().uuid(),
});

export async function POST(req: Request) {
  // Require auth (checkout is part of logged-in portal now).
  const authed = await createSupabaseServerClient();
  const { data: userData } = await authed.auth.getUser();
  if (!userData.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const env = getEnv();
  const stripe = getStripe();
  const supabase = createSupabaseAdminClient();

  const { designSessionId } = parsed.data;
  const { data: session, error: sessionErr } = await supabase
    .from("design_sessions")
    .select("id, org_id, prospect_id")
    .eq("id", designSessionId)
    .single();
  if (sessionErr) {
    return NextResponse.json({ error: sessionErr.message }, { status: 500 });
  }

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      org_id: session.org_id,
      prospect_id: session.prospect_id,
      type: "deposit",
      status: "pending",
      total_cents: env.DEPOSIT_AMOUNT_CENTS,
      currency: env.DEPOSIT_CURRENCY,
      stripe_checkout_session_id: "",
    })
    .select("id")
    .single();

  if (orderErr) {
    return NextResponse.json({ error: orderErr.message }, { status: 500 });
  }

  const appUrl = env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${appUrl}/portal/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/portal/payment/cancel`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: env.DEPOSIT_CURRENCY,
          unit_amount: env.DEPOSIT_AMOUNT_CENTS,
          product_data: { name: "Design Deposit" },
        },
      },
    ],
    metadata: {
      order_id: order.id,
      org_id: session.org_id,
      prospect_id: session.prospect_id ?? "",
      design_session_id: session.id,
      type: "deposit",
    },
  });

  await supabase
    .from("orders")
    .update({ stripe_checkout_session_id: checkoutSession.id })
    .eq("id", order.id);

  await supabase.from("audit_events").insert({
    actor_user_id: userData.user.id,
    org_id: session.org_id,
    event_type: "CHECKOUT_SESSION_CREATED",
    entity_type: "order",
    entity_id: order.id,
    metadata: { stripe_checkout_session_id: checkoutSession.id, type: "deposit" },
  });

  return NextResponse.json({ url: checkoutSession.url });
}


