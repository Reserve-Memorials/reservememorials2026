import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SessionsPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("design_sessions")
    .select("id,status,export_count,created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold tracking-tight">Design sessions</h1>
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error.message}
        </div>
      ) : null}
      <div className="rounded-lg border border-black/10">
        <table className="w-full text-sm">
          <thead className="border-b border-black/10 text-left text-zinc-600">
            <tr>
              <th className="p-3">Session</th>
              <th className="p-3">Status</th>
              <th className="p-3">Exports</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((s) => (
              <tr key={s.id} className="border-b border-black/5">
                <td className="p-3 font-mono">
                  <Link className="underline" href={`/design/session/${s.id}`}>
                    {s.id.slice(0, 8)}…
                  </Link>
                </td>
                <td className="p-3 font-mono">{s.status}</td>
                <td className="p-3 font-mono">{s.export_count ?? 0}</td>
                <td className="p-3 text-zinc-600">
                  {new Date(s.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {!data?.length ? (
              <tr>
                <td className="p-3 text-zinc-600" colSpan={4}>
                  No sessions yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}


