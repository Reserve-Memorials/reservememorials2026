import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import SessionActions from "./SessionActions";

export const dynamic = "force-dynamic";

export default async function DesignSessionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  let session:
    | { id: string; status: string | null; export_count: number | null }
    | null = null;
  let assets: { id: string; type: string; path: string; bucket: string; created_at: string }[] =
    [];
  let error: string | null = null;

  try {
    const supabase = createSupabaseAdminClient();
    const { data: sessionRow, error: sessionErr } = await supabase
      .from("design_sessions")
      .select("id,status,export_count")
      .eq("id", id)
      .maybeSingle();
    if (sessionErr) throw sessionErr;
    session = sessionRow;

    const { data: assetRows, error: assetErr } = await supabase
      .from("design_assets")
      .select("id,type,path,bucket,created_at")
      .eq("design_session_id", id)
      .order("created_at", { ascending: false });
    if (assetErr) throw assetErr;
    assets = assetRows ?? [];
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load design session";
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2">
        <div className="text-sm text-zinc-600">
          <Link className="underline" href="/design">
            ← Back
          </Link>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Design session</h1>
        <p className="text-sm text-zinc-600">
          Session ID: <span className="font-mono">{id}</span>
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
          <div className="mt-2 text-zinc-700">
            This typically means Supabase env vars aren’t configured yet, or the
            database migrations haven’t been applied.
          </div>
        </div>
      ) : null}

      <div className="rounded-lg border border-black/10 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm">
            <span className="font-medium">Status:</span>{" "}
            <span className="font-mono">{session?.status ?? "unknown"}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Exports:</span>{" "}
            <span className="font-mono">{session?.export_count ?? 0}</span>
          </div>
        </div>
        <SessionActions designSessionId={id} />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Exports</h2>
        <div className="rounded-lg border border-black/10 p-4">
          {assets && assets.length ? (
            <ul className="space-y-2 text-sm">
              {assets.map((a) =>
                !a ? null : (
                  <li key={a.id} className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-medium">{a.type}</span>{" "}
                      <span className="font-mono text-zinc-600">{a.path}</span>
                    </div>
                    <span className="text-zinc-500">{new Date(a.created_at).toLocaleString()}</span>
                  </li>
                )
              )}
            </ul>
          ) : (
            <div className="text-sm text-zinc-600">No exports yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}


