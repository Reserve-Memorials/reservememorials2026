import Link from "next/link";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Reset password</h1>
        <p className="text-sm text-zinc-600">
          We’ll email you a link to reset your password.
        </p>
      </div>
      <ResetPasswordForm />
      <div className="text-sm text-zinc-600">
        Back to{" "}
        <Link className="underline" href="/login">
          login
        </Link>
        .
      </div>
    </div>
  );
}


