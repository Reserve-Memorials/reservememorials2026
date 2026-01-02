import Link from "next/link";
import LoginForm from "./LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-zinc-600">
          Licensee & corporate users sign in here.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="rounded-md border border-black/10 p-4 text-sm text-zinc-600">
            Loading…
          </div>
        }
      >
        <LoginForm />
      </Suspense>
      <div className="text-sm text-zinc-600">
        Forgot password?{" "}
        <Link className="underline" href="/reset-password">
          Reset it
        </Link>
      </div>
    </div>
  );
}


