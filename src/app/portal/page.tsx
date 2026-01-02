import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function PortalHomePage() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  // Metrics are wired in once the DB is live; keep MVP portal usable without relying on time math in render.
  const leadCount7d: number | null = null;
  const paidOrders7d: number | null = null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-black/10 p-4">
          <div className="text-sm text-zinc-600">New leads (7d)</div>
          <div className="mt-2 text-2xl font-semibold">
            {leadCount7d ?? "—"}
          </div>
        </div>
        <div className="rounded-lg border border-black/10 p-4">
          <div className="text-sm text-zinc-600">Paid orders (7d)</div>
          <div className="mt-2 text-2xl font-semibold">
            {paidOrders7d ?? "—"}
          </div>
        </div>
        <div className="rounded-lg border border-black/10 p-4">
          <div className="text-sm text-zinc-600">Signed in as</div>
          <div className="mt-2 text-sm font-medium">{user?.email ?? "—"}</div>
        </div>
      </div>

      <div className="rounded-lg border border-black/10 p-4 text-sm text-zinc-700">
        Quick links:{" "}
        <Link className="underline" href="/portal/leads">
          Leads
        </Link>
        ,{" "}
        <Link className="underline" href="/portal/sessions">
          Sessions
        </Link>
        ,{" "}
        <Link className="underline" href="/portal/orders">
          Orders
        </Link>
        .
      </div>
    </div>
  );
}


