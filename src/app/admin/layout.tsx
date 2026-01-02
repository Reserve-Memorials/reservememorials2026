import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyOrgMembership, isCorporateAdmin } from "@/lib/auth/roles";

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
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-black/10 p-4">
        <div className="text-sm">
          <div className="font-medium">Corporate Admin</div>
          <div className="text-zinc-600">{user.email}</div>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/admin">
            Dashboard
          </Link>
          <Link className="underline" href="/admin/licensees">
            Licensees
          </Link>
          <Link className="underline" href="/admin/territories">
            Territories
          </Link>
          <Link className="underline" href="/admin/orders">
            Orders
          </Link>
          <Link className="underline" href="/admin/audit">
            Audit
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


