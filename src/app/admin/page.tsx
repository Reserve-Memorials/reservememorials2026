import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ShoppingBag, Webhook } from "lucide-react";

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold tracking-tight">Admin dashboard</h1>
        <Badge variant="secondary" className="font-mono">
          corporate
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="group">
          <CardHeader className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-border/50">
              <CreditCard className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm text-muted-foreground">Paid deposits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tabular-nums">{depositsPaid ?? "—"}</div>
          </CardContent>
        </Card>

        <Card className="group">
          <CardHeader className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-border/50">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm text-muted-foreground">Paid merch orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tabular-nums">{merchPaid ?? "—"}</div>
          </CardContent>
        </Card>

        <Card className="group">
          <CardHeader className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-border/50">
              <Webhook className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm text-muted-foreground">Stripe webhooks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Point Stripe to:
            </div>
            <code className="block w-fit rounded-md border border-border/60 bg-muted px-2 py-1 font-mono text-xs">
              /api/stripe/webhook
            </code>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


