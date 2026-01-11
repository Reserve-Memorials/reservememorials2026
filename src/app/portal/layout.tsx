import { redirect } from "next/navigation";
import { getMyOrgMembership, isCorporateAdmin } from "@/lib/auth/roles";
import { LayoutDashboard, Sparkles, Ticket, ShoppingBag } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

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
    <DashboardShell
      variant="portal"
      title="Licensee Portal"
      userEmail={user.email ?? "—"}
      sections={[
        {
          items: [
            {
              href: "/portal",
              label: "Overview",
              icon: <LayoutDashboard className="h-4 w-4" />,
            },
          ],
        },
        {
          title: "Pipeline",
          items: [
            {
              href: "/portal/leads",
              label: "Leads",
              icon: <Ticket className="h-4 w-4" />,
            },
            {
              href: "/portal/sessions",
              label: "Sessions",
              icon: <LayoutDashboard className="h-4 w-4" />,
            },
          ],
        },
        {
          title: "Tools",
          items: [
            {
              href: "/portal/design",
              label: "Design",
              icon: <Sparkles className="h-4 w-4" />,
            },
            {
              href: "/portal/shop",
              label: "Shop",
              icon: <ShoppingBag className="h-4 w-4" />,
            },
          ],
        },
        {
          title: "Commerce",
          items: [
            {
              href: "/portal/orders",
              label: "Orders",
              icon: <ShoppingBag className="h-4 w-4" />,
            },
          ],
        },
      ]}
    >
      {children}
    </DashboardShell>
  );
}


