import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Map } from "lucide-react";

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
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Map className="h-4 w-4 text-primary" />
            Territories
          </div>
          <CardTitle className="text-xl">Territories</CardTitle>
          <p className="text-sm text-muted-foreground">
            MVP viewer. CRUD + bulk upload comes next.
          </p>
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
                  <TableHead>ZIP</TableHead>
                  <TableHead>Org</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data ?? []).map((t) => (
                  <TableRow key={t.id} className="hover:bg-muted/40">
                    <TableCell className="font-mono">{t.zip}</TableCell>
                    <TableCell className="font-mono">{t.org_id}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {t.active_from} → {t.active_to ?? "∞"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono">
                        {t.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {!data?.length ? (
                  <TableRow>
                    <TableCell className="py-6 text-muted-foreground" colSpan={4}>
                      No territories found.
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


