import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("prospects")
    .select("id,name,email,phone,zip,status,created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold tracking-tight">Leads</h1>
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
              <th className="p-3">ZIP</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((p) => (
              <tr key={p.id} className="border-b border-black/5">
                <td className="p-3">
                  <Link className="underline" href={`/portal/leads/${p.id}`}>
                    {p.name}
                  </Link>
                  <div className="text-xs text-zinc-500">{p.email}</div>
                </td>
                <td className="p-3 font-mono">{p.zip}</td>
                <td className="p-3 font-mono">{p.status}</td>
                <td className="p-3 text-zinc-600">
                  {new Date(p.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {!data?.length ? (
              <tr>
                <td className="p-3 text-zinc-600" colSpan={4}>
                  No leads yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}


