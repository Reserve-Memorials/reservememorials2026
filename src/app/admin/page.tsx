import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const supabase = await createSupabaseServerClient();

  let depositsPaid: number | null = null;
  let merchPaid: number | null = null;

  try {
    const deposits = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("type", "deposit")
      .eq("status", "paid");
    depositsPaid = deposits.count ?? null;

    const merch = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("type", "merch")
      .eq("status", "paid");
    merchPaid = merch.count ?? null;
  } catch {
    // ignore when schema not applied yet
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Admin dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-black/10 p-4">
          <div className="text-sm text-zinc-600">Paid deposits</div>
          <div className="mt-2 text-2xl font-semibold">{depositsPaid ?? "—"}</div>
        </div>
        <div className="rounded-lg border border-black/10 p-4">
          <div className="text-sm text-zinc-600">Paid merch orders</div>
          <div className="mt-2 text-2xl font-semibold">{merchPaid ?? "—"}</div>
        </div>
        <div className="rounded-lg border border-black/10 p-4">
          <div className="text-sm text-zinc-600">Webhooks</div>
          <div className="mt-2 text-sm text-zinc-700">
            Configure Stripe to POST to <span className="font-mono">/api/stripe/webhook</span>.
          </div>
        </div>
      </div>
    </div>
  );
}


