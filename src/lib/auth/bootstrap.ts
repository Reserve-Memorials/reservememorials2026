import { getEnv } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Bootstrap RBAC: if no corporate admin exists yet, make the first logged-in user
 * a corporate admin for the configured CORPORATE_ORG_ID.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY (server-only).
 *
 * This is intended for initial setup / dev; once at least one corporate admin exists,
 * this becomes a no-op.
 */
export async function bootstrapFirstCorporateAdmin(userId: string) {
  const env = getEnv();
  if (!env.CORPORATE_ORG_ID) return { ok: false as const, reason: "missing_corporate_org_id" };

  let admin: ReturnType<typeof createSupabaseAdminClient>;
  try {
    admin = createSupabaseAdminClient();
  } catch {
    return { ok: false as const, reason: "missing_service_role_key" };
  }

  const { data: existingAdmins, error: existingErr } = await admin
    .from("org_members")
    .select("id")
    .eq("role", "corporate_admin")
    .limit(1);

  if (existingErr) return { ok: false as const, reason: "query_failed", error: existingErr };
  if (existingAdmins && existingAdmins.length > 0) return { ok: true as const, action: "noop" as const };

  const { error: insertErr } = await admin.from("org_members").insert({
    org_id: env.CORPORATE_ORG_ID,
    user_id: userId,
    role: "corporate_admin",
  });

  if (insertErr) return { ok: false as const, reason: "insert_failed", error: insertErr };

  // Best-effort audit log
  await admin.from("audit_events").insert({
    actor_user_id: userId,
    org_id: env.CORPORATE_ORG_ID,
    event_type: "bootstrap.corporate_admin",
    entity_type: "org_members",
    entity_id: null,
    metadata: { note: "Auto-assigned first corporate admin on first login." },
    seed_tag: null,
  });

  return { ok: true as const, action: "inserted" as const };
}


