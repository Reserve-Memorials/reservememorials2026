import { NextResponse } from "next/server";
import { z } from "zod";
import { requireCorporateAdmin } from "@/lib/auth/requireCorporateAdmin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const UpsertSchema = z.object({
  orgId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(["corporate_admin", "licensee_owner", "licensee_sales"]),
});

const RemoveSchema = z.object({
  orgId: z.string().uuid(),
  userId: z.string().uuid(),
});

export async function PATCH(req: Request) {
  const guard = await requireCorporateAdmin();
  if (!guard.ok) return guard.response;

  const json = await req.json().catch(() => null);
  const parsed = UpsertSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const admin = createSupabaseAdminClient();
  const { orgId, userId, role } = parsed.data;

  const { error } = await admin.from("org_members").upsert(
    {
      org_id: orgId,
      user_id: userId,
      role,
    },
    { onConflict: "org_id,user_id" }
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await admin.from("audit_events").insert({
    actor_user_id: guard.user.id,
    org_id: orgId,
    event_type: "admin.update_role",
    entity_type: "org_members",
    entity_id: null,
    metadata: { user_id: userId, role },
    seed_tag: null,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const guard = await requireCorporateAdmin();
  if (!guard.ok) return guard.response;

  const json = await req.json().catch(() => null);
  const parsed = RemoveSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const admin = createSupabaseAdminClient();
  const { orgId, userId } = parsed.data;

  const { error } = await admin.from("org_members").delete().eq("org_id", orgId).eq("user_id", userId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await admin.from("audit_events").insert({
    actor_user_id: guard.user.id,
    org_id: orgId,
    event_type: "admin.remove_member",
    entity_type: "org_members",
    entity_id: null,
    metadata: { user_id: userId },
    seed_tag: null,
  });

  return NextResponse.json({ ok: true });
}


