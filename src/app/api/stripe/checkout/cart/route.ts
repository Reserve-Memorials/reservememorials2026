import { NextResponse } from "next/server";
import { z } from "zod";
import { getEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const BodySchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        qty: z.coerce.number().int().positive().max(100),
      })
    )
    .min(1),
  prospectId: z.string().uuid().optional(),
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

  const { items, prospectId } = parsed.data;

  const productIds = items.map((i) => i.productId);
  const { data: products, error: prodErr } = await supabase
    .from("products")
    .select("id,name,price_cents,currency,active")
    .in("id", productIds);

  if (prodErr) {
    return NextResponse.json({ error: prodErr.message }, { status: 500 });
  }

  const productMap = new Map((products ?? []).map((p) => [p.id, p]));
  const invalid = items.find((i) => !productMap.get(i.productId)?.active);
  if (invalid) {
    return NextResponse.json({ error: "Invalid or inactive product" }, { status: 400 });
  }

  const currency = (products?.[0]?.currency ?? "usd") as string;
  const totalCents = items.reduce((sum, i) => {
    const p = productMap.get(i.productId)!;
    return sum + (p.price_cents as number) * i.qty;
  }, 0);

  // For merch orders without a design session, we attribute to corporate unless caller provides a prospect_id.
  let orgId = env.CORPORATE_ORG_ID ?? null;
  if (prospectId) {
    const { data: prospect, error: prospectErr } = await supabase
      .from("prospects")
      .select("org_id")
      .eq("id", prospectId)
      .single();
    if (prospectErr) {
      return NextResponse.json({ error: prospectErr.message }, { status: 500 });
    }
    orgId = prospect.org_id;
  }

  if (!orgId) {
    return NextResponse.json(
      { error: "No corporate org configured. Set CORPORATE_ORG_ID." },
      { status: 500 }
    );
  }

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      org_id: orgId,
      prospect_id: prospectId ?? null,
      type: "merch",
      status: "pending",
      total_cents: totalCents,
      currency,
      stripe_checkout_session_id: "",
    })
    .select("id")
    .single();

  if (orderErr) {
    return NextResponse.json({ error: orderErr.message }, { status: 500 });
  }

  const orderItems = items.map((i) => {
    const p = productMap.get(i.productId)!;
    return {
      order_id: order.id,
      product_id: p.id,
      name: p.name,
      quantity: i.qty,
      unit_price_cents: p.price_cents,
    };
  });
  await supabase.from("order_items").insert(orderItems);

  const appUrl = env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${appUrl}/portal/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/portal/payment/cancel`,
    line_items: orderItems.map((i) => ({
      quantity: i.quantity,
      price_data: {
        currency,
        unit_amount: i.unit_price_cents,
        product_data: { name: i.name },
      },
    })),
    metadata: {
      order_id: order.id,
      org_id: orgId,
      prospect_id: prospectId ?? "",
      type: "merch",
    },
  });

  await supabase
    .from("orders")
    .update({ stripe_checkout_session_id: checkoutSession.id })
    .eq("id", order.id);

  await supabase.from("audit_events").insert({
    actor_user_id: userData.user.id,
    org_id: orgId,
    event_type: "CHECKOUT_SESSION_CREATED",
    entity_type: "order",
    entity_id: order.id,
    metadata: { stripe_checkout_session_id: checkoutSession.id, type: "merch" },
  });

  return NextResponse.json({ url: checkoutSession.url });
}


