import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        Reserve Memorials MVP
      </h1>
      <p className="max-w-2xl text-zinc-700">
        Start a design, capture a lead by ZIP (territory routing), take a deposit
        or sell merchandise, and give licensees/corporate a simple portal for
        leads and orders.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
          href="/design"
        >
          Start Design
        </Link>
        <Link
          className="rounded-md border border-black/15 px-4 py-2 text-sm font-medium"
          href="/shop"
        >
          Shop Merch
        </Link>
        <Link
          className="rounded-md border border-black/15 px-4 py-2 text-sm font-medium"
          href="/login"
        >
          Login
        </Link>
      </div>
      <div className="rounded-lg border border-black/10 p-4 text-sm text-zinc-700">
        Setup docs are in <code className="font-mono">docs/PRD.md</code>. Copy{" "}
        <code className="font-mono">env.example</code> to{" "}
        <code className="font-mono">.env.local</code> and fill in Supabase +
        Stripe keys.
      </div>
    </div>
  );
}
