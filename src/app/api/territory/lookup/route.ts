import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getEnv } from "@/lib/env";

const BodySchema = z.object({
  zip: z.string().min(3).max(10),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { zip } = parsed.data;
  const env = getEnv();
  const supabase = createSupabaseAdminClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("territories")
    .select("org_id, priority")
    .eq("zip", zip)
    .lte("active_from", today)
    .or(`active_to.is.null,active_to.gte.${today}`)
    .order("priority", { ascending: false })
    .limit(1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const matched = data && data.length ? data[0] : null;
  const assignedOrgId = matched?.org_id ?? env.CORPORATE_ORG_ID ?? null;

  return NextResponse.json({
    assignedOrgId,
    assignmentType: matched ? "matched" : "unassigned",
  });
}


