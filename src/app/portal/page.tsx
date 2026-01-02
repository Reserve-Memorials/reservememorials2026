import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ShoppingBag, Ticket, User as UserIcon } from "lucide-react";

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold tracking-tight">Portal</h1>
        <Badge variant="secondary" className="font-mono">
          licensee
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-border/50">
              <Ticket className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm text-muted-foreground">New leads (7d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tabular-nums">{leadCount7d ?? "—"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-border/50">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm text-muted-foreground">Paid orders (7d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tabular-nums">{paidOrders7d ?? "—"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-border/50">
              <UserIcon className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm text-muted-foreground">Signed in as</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="truncate text-sm font-medium">{user?.email ?? "—"}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 py-5">
          <div className="text-sm text-muted-foreground">
            Quick links
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary" size="sm">
              <Link href="/portal/leads">
                <Ticket className="mr-2 h-4 w-4" />
                Leads
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href="/portal/sessions">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Sessions
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href="/portal/orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Orders
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


