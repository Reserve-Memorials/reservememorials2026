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
import { Building2 } from "lucide-react";

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
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 text-primary" />
            Licensees
          </div>
          <CardTitle className="text-xl">Organizations</CardTitle>
          <p className="text-sm text-muted-foreground">MVP viewer. Invites/CRUD comes next.</p>
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
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data ?? []).map((o) => (
                  <TableRow key={o.id} className="hover:bg-muted/40">
                    <TableCell className="font-medium">{o.name}</TableCell>
                    <TableCell className="font-mono">{o.type}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono">
                        {o.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {new Date(o.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                {!data?.length ? (
                  <TableRow>
                    <TableCell className="py-6 text-muted-foreground" colSpan={4}>
                      No organizations found.
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


