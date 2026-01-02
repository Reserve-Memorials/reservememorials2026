import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getEnv } from "@/lib/env";

const BodySchema = z.object({
  zip: z.string().min(3).max(10),
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().min(6).max(40),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const env = getEnv();
  const supabase = createSupabaseAdminClient();
  const today = new Date().toISOString().slice(0, 10);

  const { zip, name, email, phone } = parsed.data;

  const { data: territoryRows } = await supabase
    .from("territories")
    .select("org_id, priority")
    .eq("zip", zip)
    .lte("active_from", today)
    .or(`active_to.is.null,active_to.gte.${today}`)
    .order("priority", { ascending: false })
    .limit(1);

  const matched = territoryRows && territoryRows.length ? territoryRows[0] : null;
  const assignedOrgId = matched?.org_id ?? env.CORPORATE_ORG_ID ?? null;

  if (!assignedOrgId) {
    return NextResponse.json(
      { error: "No corporate org configured. Set CORPORATE_ORG_ID." },
      { status: 500 }
    );
  }

  const { data: prospect, error: prospectErr } = await supabase
    .from("prospects")
    .insert({
      org_id: assignedOrgId,
      zip,
      name,
      email,
      phone,
      status: "new",
      source: "design",
    })
    .select("id, org_id")
    .single();

  if (prospectErr) {
    return NextResponse.json({ error: prospectErr.message }, { status: 500 });
  }

  const { data: session, error: sessionErr } = await supabase
    .from("design_sessions")
    .insert({
      org_id: assignedOrgId,
      prospect_id: prospect.id,
      status: "started",
      metadata: {},
      export_count: 0,
    })
    .select("id")
    .single();

  if (sessionErr) {
    return NextResponse.json({ error: sessionErr.message }, { status: 500 });
  }

  await supabase.from("audit_events").insert({
    actor_user_id: null,
    org_id: assignedOrgId,
    event_type: "PROSPECT_CREATED",
    entity_type: "prospect",
    entity_id: prospect.id,
    metadata: { assignmentType: matched ? "matched" : "unassigned" },
  });

  return NextResponse.json({
    prospectId: prospect.id,
    designSessionId: session.id,
    assignedOrgId,
  });
}


