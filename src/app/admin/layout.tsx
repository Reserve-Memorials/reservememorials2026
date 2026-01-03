import { redirect } from "next/navigation";
import { getMyOrgMembership, isCorporateAdmin } from "@/lib/auth/roles";
import {
  Building2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Map,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

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
    <DashboardShell
      variant="admin"
      title="Corporate Admin"
      userEmail={user.email ?? "—"}
      sections={[
        {
          items: [
            {
              href: "/admin",
              label: "Dashboard",
              icon: <LayoutDashboard className="h-4 w-4" />,
            },
          ],
        },
        {
          title: "Operations",
          items: [
            {
              href: "/admin/licensees",
              label: "Licensees",
              icon: <Building2 className="h-4 w-4" />,
            },
            {
              href: "/admin/territories",
              label: "Territories",
              icon: <Map className="h-4 w-4" />,
            },
          ],
        },
        {
          title: "Revenue",
          items: [
            {
              href: "/admin/orders",
              label: "Orders",
              icon: <ClipboardList className="h-4 w-4" />,
            },
          ],
        },
        {
          title: "Security",
          items: [
            {
              href: "/admin/audit",
              label: "Audit log",
              icon: <FileText className="h-4 w-4" />,
            },
          ],
        },
      ]}
    >
      {children}
    </DashboardShell>
  );
}


