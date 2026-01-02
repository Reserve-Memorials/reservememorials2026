"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  currency: string;
};

export default function ShopClient({ products }: { products: Product[] }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [checkingOut, setCheckingOut] = useState(false);

  const items = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([productId, qty]) => ({ productId, qty })),
    [cart]
  );

  const total = useMemo(() => {
    const map = new Map(products.map((p) => [p.id, p]));
    return items.reduce((sum, i) => sum + (map.get(i.productId)?.price_cents ?? 0) * i.qty, 0);
  }, [items, products]);

  async function checkout() {
    setCheckingOut(true);
    try {
      const res = await fetch("/api/stripe/checkout/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { url } = (await res.json()) as { url: string };
      toast.message("Redirecting to checkout…", {
        description: "Stripe Checkout will open in a moment.",
      });
      window.location.href = url;
    } catch (err) {
      toast.error("Checkout failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setCheckingOut(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {products.map((p) => {
          const qty = cart[p.id] ?? 0;
          return (
            <Card
              key={p.id}
              className="group relative overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <Badge variant="secondary">
                    ${(p.price_cents / 100).toFixed(2)}
                  </Badge>
                </div>
                {p.description ? (
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                ) : null}
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {p.currency.toUpperCase()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        setCart((c) => ({
                          ...c,
                          [p.id]: Math.max(0, (c[p.id] ?? 0) - 1),
                        }))
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="w-10 text-center text-sm font-medium tabular-nums">
                      {qty}
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }))
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_60%)]" />
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
          <div className="text-sm">
            <div className="text-muted-foreground">Cart total</div>
            <div className="text-2xl font-semibold tabular-nums">
              ${(total / 100).toFixed(2)}
            </div>
          </div>
          <Button
            disabled={!items.length || checkingOut}
            onClick={checkout}
            size="lg"
            className="group"
          >
            {checkingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting…
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Checkout
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


