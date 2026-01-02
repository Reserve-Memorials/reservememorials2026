import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import ShopClient from "./ShopClient";

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
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Shop</h1>
        <p className="text-sm text-zinc-600">Simple merch catalog (MVP).</p>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
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
    </div>
  );
}


