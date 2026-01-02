"use client";

import { useMemo, useState } from "react";

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
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
    setCheckingOut(true);
    try {
      const res = await fetch("/api/stripe/checkout/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { url } = (await res.json()) as { url: string };
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
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
            <div key={p.id} className="rounded-lg border border-black/10 p-4">
              <div className="font-medium">{p.name}</div>
              {p.description ? (
                <div className="mt-1 text-sm text-zinc-600">{p.description}</div>
              ) : null}
              <div className="mt-3 text-sm font-medium">
                ${(p.price_cents / 100).toFixed(2)} {p.currency.toUpperCase()}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md border border-black/15 px-2 py-1 text-sm"
                  onClick={() =>
                    setCart((c) => ({ ...c, [p.id]: Math.max(0, (c[p.id] ?? 0) - 1) }))
                  }
                >
                  -
                </button>
                <div className="w-10 text-center text-sm">{qty}</div>
                <button
                  type="button"
                  className="rounded-md border border-black/15 px-2 py-1 text-sm"
                  onClick={() => setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }))}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-black/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm">
            <span className="font-medium">Cart total:</span>{" "}
            <span className="font-mono">${(total / 100).toFixed(2)}</span>
          </div>
          <button
            disabled={!items.length || checkingOut}
            onClick={checkout}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {checkingOut ? "Redirecting..." : "Checkout"}
          </button>
        </div>
        {error ? (
          <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
}


