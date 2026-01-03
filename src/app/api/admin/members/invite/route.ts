import { NextResponse } from "next/server";
import { z } from "zod";
import { requireCorporateAdmin } from "@/lib/auth/requireCorporateAdmin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getEnv } from "@/lib/env";

const Schema = z.object({
  email: z.string().email(),
  orgId: z.string().uuid(),
  role: z.enum(["corporate_admin", "licensee_owner", "licensee_sales"]),
});

export async function POST(req: Request) {
  const guard = await requireCorporateAdmin();
  if (!guard.ok) return guard.response;

  const json = await req.json().catch(() => null);
  const parsed = Schema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { email, orgId, role } = parsed.data;
  const admin = createSupabaseAdminClient();
  const env = getEnv();

  // Try to find existing user by email (simple scan; fine for MVP).
  let userId: string | null = null;
  try {
    const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const match = (data.users ?? []).find((u) => (u.email ?? "").toLowerCase() === email.toLowerCase());
    userId = match?.id ?? null;
  } catch {
    // ignore and fall back to invite
  }

  let invited = false;
  let actionLink: string | null = null;
  if (!userId) {
    const redirectTo = env.NEXT_PUBLIC_APP_URL
      ? `${env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/portal`
      : undefined;

    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    userId = data.user?.id ?? null;
    invited = true;

    // Email delivery can be delayed/blocked in some inboxes. Generate a shareable link as fallback.
    try {
      const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
        type: "invite",
        email,
        options: redirectTo ? { redirectTo } : undefined,
      });
      if (!linkErr) actionLink = linkData.properties?.action_link ?? null;
    } catch {
      // ignore
    }
  }

  if (!userId) return NextResponse.json({ error: "Could not resolve user id" }, { status: 500 });

  const { error: upsertErr } = await admin.from("org_members").upsert(
    {
      org_id: orgId,
      user_id: userId,
      role,
    },
    { onConflict: "org_id,user_id" }
  );

  if (upsertErr) return NextResponse.json({ error: upsertErr.message }, { status: 500 });

  await admin.from("audit_events").insert({
    actor_user_id: guard.user.id,
    org_id: orgId,
    event_type: invited ? "admin.invite_user" : "admin.add_existing_user",
    entity_type: "org_members",
    entity_id: null,
    metadata: { email, user_id: userId, role },
    seed_tag: null,
  });

  return NextResponse.json({ ok: true, userId, invited, actionLink });
}


