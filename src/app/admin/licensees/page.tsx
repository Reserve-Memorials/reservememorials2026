import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import LicenseesAdminClient from "@/app/admin/licensees/LicenseesAdminClient";

export const dynamic = "force-dynamic";

export default async function LicenseesAdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login?next=/admin/licensees");

  return (
    <LicenseesAdminClient currentUserId={data.user.id} />
  );
}


