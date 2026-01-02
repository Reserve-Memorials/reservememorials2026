import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyOrgMembership, isCorporateAdmin } from "@/lib/auth/roles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Ticket, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, roles } = await getMyOrgMembership();
  if (!user) {
    redirect("/login?next=/portal");
  }
  if (isCorporateAdmin(roles)) {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 py-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <LayoutDashboard className="h-4 w-4 text-primary" />
              Licensee Portal
            </div>
            <div className="mt-1 truncate text-sm font-medium">{user.email}</div>
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
            <Button asChild variant="outline" size="sm">
              <Link href="/logout">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      {children}
    </div>
  );
}


