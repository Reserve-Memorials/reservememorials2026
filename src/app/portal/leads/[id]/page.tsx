import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const supabase = await createSupabaseServerClient();
  const { data: lead, error } = await supabase
    .from("prospects")
    .select("id,name,email,phone,zip,status,created_at,updated_at")
    .eq("id", id)
    .single();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold tracking-tight">Lead</h1>
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error.message}
        </div>
      ) : null}

      {lead ? (
        <div className="rounded-lg border border-black/10 p-4 text-sm">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <div className="text-zinc-600">Name</div>
              <div className="font-medium">{lead.name}</div>
            </div>
            <div>
              <div className="text-zinc-600">Status</div>
              <div className="font-mono">{lead.status}</div>
            </div>
            <div>
              <div className="text-zinc-600">Email</div>
              <div className="font-mono">{lead.email}</div>
            </div>
            <div>
              <div className="text-zinc-600">Phone</div>
              <div className="font-mono">{lead.phone}</div>
            </div>
            <div>
              <div className="text-zinc-600">ZIP</div>
              <div className="font-mono">{lead.zip}</div>
            </div>
            <div>
              <div className="text-zinc-600">Created</div>
              <div>{new Date(lead.created_at).toLocaleString()}</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}


