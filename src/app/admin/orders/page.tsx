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
import { ClipboardList } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OrdersAdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("orders")
    .select("id,org_id,type,status,total_cents,currency,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ClipboardList className="h-4 w-4 text-primary" />
            Orders
          </div>
          <CardTitle className="text-xl">Orders</CardTitle>
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
                  <TableHead>Org</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data ?? []).map((o) => (
                  <TableRow key={o.id} className="hover:bg-muted/40">
                    <TableCell className="font-mono">{o.org_id}</TableCell>
                    <TableCell className="font-mono">{o.type}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono">
                        {o.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">
                      ${(o.total_cents / 100).toFixed(2)} {o.currency.toUpperCase()}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {new Date(o.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                {!data?.length ? (
                  <TableRow>
                    <TableCell className="py-6 text-muted-foreground" colSpan={5}>
                      No orders found.
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


