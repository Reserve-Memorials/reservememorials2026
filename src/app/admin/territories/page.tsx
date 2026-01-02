import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function TerritoriesAdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("territories")
    .select("id,zip,org_id,active_from,active_to,priority")
    .order("zip", { ascending: true })
    .limit(200);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold tracking-tight">Territories</h1>
      <p className="text-sm text-zinc-600">
        MVP viewer. CRUD + bulk upload comes next.
      </p>
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error.message}
        </div>
      ) : null}
      <div className="rounded-lg border border-black/10">
        <table className="w-full text-sm">
          <thead className="border-b border-black/10 text-left text-zinc-600">
            <tr>
              <th className="p-3">ZIP</th>
              <th className="p-3">Org</th>
              <th className="p-3">Active</th>
              <th className="p-3">Priority</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((t) => (
              <tr key={t.id} className="border-b border-black/5">
                <td className="p-3 font-mono">{t.zip}</td>
                <td className="p-3 font-mono">{t.org_id}</td>
                <td className="p-3 font-mono">
                  {t.active_from} → {t.active_to ?? "∞"}
                </td>
                <td className="p-3 font-mono">{t.priority}</td>
              </tr>
            ))}
            {!data?.length ? (
              <tr>
                <td className="p-3 text-zinc-600" colSpan={4}>
                  No territories found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}


