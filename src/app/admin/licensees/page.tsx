import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LicenseesAdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("organizations")
    .select("id,name,type,status,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold tracking-tight">Organizations</h1>
      <p className="text-sm text-zinc-600">MVP viewer. Invites/CRUD comes next.</p>
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error.message}
        </div>
      ) : null}
      <div className="rounded-lg border border-black/10">
        <table className="w-full text-sm">
          <thead className="border-b border-black/10 text-left text-zinc-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((o) => (
              <tr key={o.id} className="border-b border-black/5">
                <td className="p-3 font-medium">{o.name}</td>
                <td className="p-3 font-mono">{o.type}</td>
                <td className="p-3 font-mono">{o.status}</td>
                <td className="p-3 text-zinc-600">
                  {new Date(o.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {!data?.length ? (
              <tr>
                <td className="p-3 text-zinc-600" colSpan={4}>
                  No organizations found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}


