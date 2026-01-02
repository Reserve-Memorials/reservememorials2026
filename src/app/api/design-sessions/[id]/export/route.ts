import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createSupabaseAdminClient();

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const { data: session, error: sessionErr } = await supabase
    .from("design_sessions")
    .select("id, org_id, prospect_id, export_count")
    .eq("id", id)
    .single();
  if (sessionErr) {
    return NextResponse.json({ error: sessionErr.message }, { status: 500 });
  }

  const bucket = "design-exports";
  const safeName = file.name.replace(/[^\w.\-]+/g, "_");
  const path = `${session.org_id}/${session.id}/${Date.now()}-${safeName}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadErr } = await supabase.storage
    .from(bucket)
    .upload(path, arrayBuffer, { contentType: file.type, upsert: false });

  if (uploadErr) {
    return NextResponse.json({ error: uploadErr.message }, { status: 500 });
  }

  const type =
    file.type === "application/pdf"
      ? "pdf"
      : file.type.startsWith("image/")
        ? "image"
        : "other";

  const { error: assetErr } = await supabase.from("design_assets").insert({
    org_id: session.org_id,
    design_session_id: session.id,
    bucket,
    path,
    type,
  });
  if (assetErr) {
    return NextResponse.json({ error: assetErr.message }, { status: 500 });
  }

  const nextCount = (session.export_count ?? 0) + 1;
  const { error: sessionUpdateErr } = await supabase
    .from("design_sessions")
    .update({ status: "exported", export_count: nextCount })
    .eq("id", session.id);
  if (sessionUpdateErr) {
    return NextResponse.json({ error: sessionUpdateErr.message }, { status: 500 });
  }

  await supabase.from("audit_events").insert({
    actor_user_id: null,
    org_id: session.org_id,
    event_type: "DESIGN_EXPORTED",
    entity_type: "design_session",
    entity_id: session.id,
    metadata: { bucket, path, type },
  });

  return NextResponse.json({ ok: true });
}


