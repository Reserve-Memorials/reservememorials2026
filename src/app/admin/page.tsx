import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ShoppingBag, Sparkles, Webhook } from "lucide-react";
import { Sparkline } from "@/components/charts/Sparkline";
import { BarMiniChart } from "@/components/charts/BarMiniChart";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const supabase = await createSupabaseServerClient();

  const days = 30;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  let depositsPaid: number | null = null;
  let merchPaid: number | null = null;
  let revenueCents30d: number | null = null;
  let ordersPaid30d: number | null = null;
  let leads30d: number | null = null;
  let sessions30d: number | null = null;

  let revenueByDay: number[] = new Array(days).fill(0);
  let leadsByDay: number[] = new Array(days).fill(0);
  let sessionsByDay: number[] = new Array(days).fill(0);

  try {
    const orders = await supabase
      .from("orders")
      .select("created_at,total_cents,type,status")
      .gte("created_at", since)
      .eq("status", "paid");

    const prospects = await supabase
      .from("prospects")
      .select("created_at")
      .gte("created_at", since);

    const sessions = await supabase
      .from("design_sessions")
      .select("created_at")
      .gte("created_at", since);

    if (orders.data) {
      const paid = orders.data;
      ordersPaid30d = paid.length;
      revenueCents30d = paid.reduce((sum, o) => sum + (o.total_cents ?? 0), 0);

      for (const o of paid) {
        const idx = dayIndex(o.created_at, days);
        if (idx !== null) revenueByDay[idx] += o.total_cents ?? 0;
      }
    }

    if (prospects.data) {
      leads30d = prospects.data.length;
      for (const p of prospects.data) {
        const idx = dayIndex(p.created_at, days);
        if (idx !== null) leadsByDay[idx] += 1;
      }
    }

    if (sessions.data) {
      sessions30d = sessions.data.length;
      for (const s of sessions.data) {
        const idx = dayIndex(s.created_at, days);
        if (idx !== null) sessionsByDay[idx] += 1;
      }
    }

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

  const revenueDollars = revenueCents30d != null ? (revenueCents30d / 100).toFixed(0) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold tracking-tight">Admin dashboard</h1>
        <Badge variant="secondary" className="font-mono">
          corporate
        </Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="group overflow-hidden">
          <CardHeader className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-border/50">
              <CreditCard className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm text-muted-foreground">Revenue (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-3xl font-semibold tabular-nums">
                  {revenueDollars != null ? `$${revenueDollars}` : "—"}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {ordersPaid30d != null ? `${ordersPaid30d} paid orders` : "—"}
                </div>
              </div>
              <div className="w-40">
                <Sparkline values={revenueByDay} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden">
          <CardHeader className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 ring-1 ring-border/50">
              <Sparkles className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm text-muted-foreground">Leads (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-3xl font-semibold tabular-nums">{leads30d ?? "—"}</div>
                <div className="mt-1 text-xs text-muted-foreground">New prospects created</div>
              </div>
              <div className="w-40">
                <BarMiniChart values={leadsByDay} barClassName="fill-emerald-500/45" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden">
          <CardHeader className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-fuchsia-500/10 text-fuchsia-500 ring-1 ring-border/50">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm text-muted-foreground">Paid deposits / merch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/60 bg-muted/30 p-3">
                <div className="text-xs text-muted-foreground">Deposits</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums">{depositsPaid ?? "—"}</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/30 p-3">
                <div className="text-xs text-muted-foreground">Merch</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums">{merchPaid ?? "—"}</div>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Webhook className="h-3.5 w-3.5" />
                Stripe webhook endpoint
              </div>
              <code className="mt-2 block w-fit rounded-md border border-border/60 bg-background/60 px-2 py-1 font-mono text-xs">
                /api/stripe/webhook
              </code>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="space-y-2">
          <CardTitle className="text-base">Activity (30 days)</CardTitle>
          <div className="text-sm text-muted-foreground">
            Sessions and pipeline volume at a glance.
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Design sessions</div>
                <div className="text-xs text-muted-foreground">Created in the last 30 days</div>
              </div>
              <div className="text-2xl font-semibold tabular-nums">{sessions30d ?? "—"}</div>
            </div>
            <div className="mt-3">
              <BarMiniChart values={sessionsByDay} barClassName="fill-primary/35" />
            </div>
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
            <div className="text-sm font-semibold">What to do next</div>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>• Review Ohio territory assignments (demo) under Territories.</li>
              <li>• Validate lead routing by ZIP using the Design flow + checkout.</li>
              <li>• Add more licensees and map additional ZIPs when ready.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function dayIndex(iso: string, days: number): number | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  start.setHours(0, 0, 0, 0);
  const cur = new Date(d);
  cur.setHours(0, 0, 0, 0);
  const diff = Math.floor((cur.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  if (diff < 0 || diff >= days) return null;
  return diff;
}


