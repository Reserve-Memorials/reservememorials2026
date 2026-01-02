import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AppRole = "corporate_admin" | "licensee_owner" | "licensee_sales";

export async function getMyOrgMembership() {
  const supabase = await createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) return { user: null, roles: [] as AppRole[], orgIds: [] as string[] };

  const { data, error } = await supabase
    .from("org_members")
    .select("org_id, role")
    .eq("user_id", user.id);

  if (error) {
    return { user, roles: [] as AppRole[], orgIds: [] as string[], error };
  }

  const roles = (data ?? []).map((r) => r.role as AppRole);
  const orgIds = (data ?? []).map((r) => r.org_id as string);
  return { user, roles, orgIds };
}

export function isCorporateAdmin(roles: AppRole[]) {
  return roles.includes("corporate_admin");
}


