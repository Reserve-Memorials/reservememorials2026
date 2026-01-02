import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Payment cancelled</h1>
      <p className="text-sm text-zinc-700">
        No charge was made. You can try again anytime.
      </p>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link className="underline" href="/design">
          Back to design
        </Link>
        <Link className="underline" href="/shop">
          Back to shop
        </Link>
      </div>
    </div>
  );
}


