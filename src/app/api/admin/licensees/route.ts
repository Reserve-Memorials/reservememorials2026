import { NextResponse } from "next/server";
import { z } from "zod";
import { requireCorporateAdmin } from "@/lib/auth/requireCorporateAdmin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const CreateSchema = z.object({
  name: z.string().min(2).max(120),
});

export async function GET() {
  const guard = await requireCorporateAdmin();
  if (!guard.ok) return guard.response;

  const admin = createSupabaseAdminClient();

  const { data: orgs, error: orgErr } = await admin
    .from("organizations")
    .select("id,name,type,status,created_at")
    .in("type", ["corporate", "licensee"])
    .order("created_at", { ascending: true });

  if (orgErr) return NextResponse.json({ error: orgErr.message }, { status: 500 });

  const orgIds = (orgs ?? []).map((o) => o.id);
  const { data: members, error: memErr } = await admin
    .from("org_members")
    .select("org_id,user_id,role,created_at")
    .in("org_id", orgIds);

  if (memErr) return NextResponse.json({ error: memErr.message }, { status: 500 });

  const uniqueUserIds = Array.from(new Set((members ?? []).map((m) => m.user_id)));
  const usersById = new Map<string, { id: string; email: string | null }>();

  // Resolve emails via Auth Admin API (service role).
  await Promise.all(
    uniqueUserIds.map(async (id) => {
      const { data } = await admin.auth.admin.getUserById(id);
      usersById.set(id, { id, email: data.user?.email ?? null });
    })
  );

  const membersWithEmail = (members ?? []).map((m) => ({
    ...m,
    email: usersById.get(m.user_id)?.email ?? null,
  }));

  return NextResponse.json({
    organizations: orgs ?? [],
    members: membersWithEmail,
  });
}

export async function POST(req: Request) {
  const guard = await requireCorporateAdmin();
  if (!guard.ok) return guard.response;

  const json = await req.json().catch(() => null);
  const parsed = CreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  const { data, error } = await admin
    .from("organizations")
    .insert({
      name: parsed.data.name,
      type: "licensee",
      status: "active",
      seed_tag: null,
    })
    .select("id,name,type,status,created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await admin.from("audit_events").insert({
    actor_user_id: guard.user.id,
    org_id: null,
    event_type: "admin.create_licensee",
    entity_type: "organizations",
    entity_id: data.id,
    metadata: { name: data.name },
    seed_tag: null,
  });

  return NextResponse.json({ organization: data });
}


