import Link from "next/link";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sp = searchParams;
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Payment success</h1>
      <p className="text-sm text-zinc-700">
        Thanks! Your payment is processing. We’ll finalize status via webhook.
      </p>
      {sp.session_id ? (
        <div className="rounded-md border border-black/10 p-3 text-sm">
          Checkout Session: <span className="font-mono">{sp.session_id}</span>
        </div>
      ) : null}
      <Link className="underline text-sm" href="/">
        Back to home
      </Link>
    </div>
  );
}


