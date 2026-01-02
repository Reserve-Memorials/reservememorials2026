import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AuditAdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("audit_events")
    .select("id,event_type,entity_type,entity_id,org_id,actor_user_id,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold tracking-tight">Audit log</h1>
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error.message}
        </div>
      ) : null}
      <div className="rounded-lg border border-black/10">
        <table className="w-full text-sm">
          <thead className="border-b border-black/10 text-left text-zinc-600">
            <tr>
              <th className="p-3">When</th>
              <th className="p-3">Event</th>
              <th className="p-3">Entity</th>
              <th className="p-3">Org</th>
              <th className="p-3">Actor</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((e) => (
              <tr key={e.id} className="border-b border-black/5">
                <td className="p-3 text-zinc-600">
                  {new Date(e.created_at).toLocaleString()}
                </td>
                <td className="p-3 font-mono">{e.event_type}</td>
                <td className="p-3 font-mono">
                  {e.entity_type}:{e.entity_id ?? "—"}
                </td>
                <td className="p-3 font-mono">{e.org_id ?? "—"}</td>
                <td className="p-3 font-mono">{e.actor_user_id ?? "system"}</td>
              </tr>
            ))}
            {!data?.length ? (
              <tr>
                <td className="p-3 text-zinc-600" colSpan={5}>
                  No audit events found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}


