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
import { Ticket } from "lucide-react";

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
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Ticket className="h-4 w-4 text-primary" />
            Leads
          </div>
          <CardTitle className="text-xl">Leads</CardTitle>
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
                  <TableHead>Name</TableHead>
                  <TableHead>ZIP</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data ?? []).map((p) => (
                  <TableRow key={p.id} className="hover:bg-muted/40">
                    <TableCell className="py-3">
                      <Link className="font-medium underline underline-offset-4" href={`/portal/leads/${p.id}`}>
                        {p.name}
                      </Link>
                      <div className="text-xs text-muted-foreground">{p.email}</div>
                    </TableCell>
                    <TableCell className="font-mono">{p.zip}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono">
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {new Date(p.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                {!data?.length ? (
                  <TableRow>
                    <TableCell className="py-6 text-muted-foreground" colSpan={4}>
                      No leads yet.
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


