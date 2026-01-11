import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import SessionActions from "@/app/design/session/[id]/SessionActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function PortalDesignSessionPage({
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
      <Card className="overflow-hidden">
        <CardHeader className="space-y-3">
          <div className="text-sm text-muted-foreground">
            <Link className="underline" href="/portal/design">
              ← Back
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-2xl">Design session</CardTitle>
              <div className="text-sm text-muted-foreground">
                Session: <span className="font-mono">{id}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono">
                {session?.status ?? "unknown"}
              </Badge>
              <Badge variant="outline" className="font-mono">
                exports: {session?.export_count ?? 0}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? (
            <div className="rounded-md border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
              <div className="mt-2 text-muted-foreground">
                This usually means env vars aren’t configured yet, or DB migrations haven’t been applied.
              </div>
            </div>
          ) : null}

          <SessionActions designSessionId={id} />
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Exports</h2>
        <Card>
          <CardContent className="pt-6">
            {assets && assets.length ? (
              <ul className="space-y-2 text-sm">
                {assets.map((a) => (
                  <li
                    key={a.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="font-mono">
                          {a.type}
                        </Badge>
                        <span className="truncate font-mono text-xs text-muted-foreground">
                          {a.path}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(a.created_at).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-muted-foreground">No exports yet.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

