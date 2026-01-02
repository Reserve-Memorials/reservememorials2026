import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import ShopClient from "./ShopClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  type ProductRow = {
    id: string;
    name: string;
    description: string | null;
    price_cents: number;
    currency: string | null;
    active: boolean;
  };

  let products: ProductRow[] = [];
  let error: string | null = null;

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error: err } = await supabase
      .from("products")
      .select("id,name,description,price_cents,currency,active")
      .eq("active", true)
      .order("name", { ascending: true });
    if (err) throw err;
    products = (data ?? []) as ProductRow[];
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load products";
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShoppingBag className="h-4 w-4 text-primary" />
            Merchandise
          </div>
          <CardTitle className="text-2xl">Shop</CardTitle>
          <p className="text-sm text-muted-foreground">
            Simple catalog + cart checkout (MVP). Server validates totals before Stripe.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? (
            <div className="rounded-md border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <ShopClient
            products={products.map((p) => ({
              id: p.id,
              name: p.name,
              description: p.description,
              price_cents: p.price_cents,
              currency: p.currency ?? "usd",
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}


