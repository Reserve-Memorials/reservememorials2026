"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setMessage(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setStatus("sent");
      setMessage("Password reset email sent (if the account exists).");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to send reset email");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full rounded-md border border-black/15 px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {message ? (
        <div
          className={`rounded-md border p-3 text-sm ${
            status === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          {message}
        </div>
      ) : null}
      <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white" type="submit">
        Send reset email
      </button>
    </form>
  );
}


