import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyOrgMembership, isCorporateAdmin } from "@/lib/auth/roles";

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
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-black/10 p-4">
        <div className="text-sm">
          <div className="font-medium">Licensee Portal</div>
          <div className="text-zinc-600">{user.email}</div>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/portal/leads">
            Leads
          </Link>
          <Link className="underline" href="/portal/sessions">
            Sessions
          </Link>
          <Link className="underline" href="/portal/orders">
            Orders
          </Link>
          <Link className="underline" href="/logout">
            Logout
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}


