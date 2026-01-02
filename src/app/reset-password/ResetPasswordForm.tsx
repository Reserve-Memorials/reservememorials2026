"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Schema = z.object({
  email: z.string().email(),
});
type Values = z.infer<typeof Schema>;

export default function ResetPasswordForm() {
  const form = useForm<Values>({
    resolver: zodResolver(Schema),
    defaultValues: { email: "" },
  });
  const [sending, setSending] = useState(false);

  async function onSubmit(values: Values) {
    setSending(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(values.email);
      if (error) throw error;
      toast.success("Reset email sent", {
        description: "If the account exists, you’ll receive a reset link.",
      });
    } catch (err) {
      toast.error("Failed to send reset email", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email</Label>
        <Input
          id="reset-email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          {...form.register("email")}
        />
        {form.formState.errors.email?.message ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        ) : null}
      </div>
      <Button className="w-full" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send reset email"}
      </Button>
    </form>
  );
}


