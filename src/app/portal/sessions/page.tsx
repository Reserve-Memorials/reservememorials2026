import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutDashboard } from "lucide-react";

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
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LayoutDashboard className="h-4 w-4 text-primary" />
            Sessions
          </div>
          <CardTitle className="text-xl">Design sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {error ? (
            <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
              {error.message}
            </div>
          ) : null}
          <div className="rounded-lg border border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Exports</TableHead>
                  <TableHead className="text-right">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data ?? []).map((s) => (
                  <TableRow key={s.id} className="hover:bg-muted/40">
                    <TableCell className="font-mono">
                      <Link className="underline underline-offset-4" href={`/design/session/${s.id}`}>
                        {s.id.slice(0, 8)}…
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono">
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{s.export_count ?? 0}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {new Date(s.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                {!data?.length ? (
                  <TableRow>
                    <TableCell className="py-6 text-muted-foreground" colSpan={4}>
                      No sessions yet.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


