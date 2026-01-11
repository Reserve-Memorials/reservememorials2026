import { redirect } from "next/navigation";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
  redirect(
    sessionId
      ? `/portal/payment/success?session_id=${encodeURIComponent(sessionId)}`
      : "/portal/payment/success"
  );
}


