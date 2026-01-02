import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyOrgMembership, isCorporateAdmin } from "@/lib/auth/roles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Map,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, roles } = await getMyOrgMembership();
  if (!user) {
    redirect("/login?next=/admin");
  }
  if (!isCorporateAdmin(roles)) {
    redirect("/portal");
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 py-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 text-primary" />
              Corporate Admin
            </div>
            <div className="mt-1 truncate text-sm font-medium">{user.email}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary" size="sm">
              <Link href="/admin">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href="/admin/licensees">
                <Building2 className="mr-2 h-4 w-4" />
                Licensees
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href="/admin/territories">
                <Map className="mr-2 h-4 w-4" />
                Territories
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href="/admin/orders">
                <ClipboardList className="mr-2 h-4 w-4" />
                Orders
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href="/admin/audit">
                <FileText className="mr-2 h-4 w-4" />
                Audit
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


