"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Schema = z.object({
  email: z.string().email(),
});

type Values = z.infer<typeof Schema>;

export default function MagicLinkForm() {
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/portal";

  const redirectTo = useMemo(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/auth/callback?next=${encodeURIComponent(nextUrl)}`;
  }, [nextUrl]);

  const form = useForm<Values>({
    resolver: zodResolver(Schema),
    defaultValues: { email: "" },
  });

  const [sending, setSending] = useState(false);

  async function onSubmit(values: Values) {
    setSending(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) throw error;
      toast.success("Magic link sent", {
        description: "Check your email to finish signing in.",
      });
    } catch (e) {
      toast.error("Could not send magic link", {
        description: e instanceof Error ? e.message : "Unknown error",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="magic-email">Email</Label>
        <Input
          id="magic-email"
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

      <Button type="submit" className="w-full" disabled={sending}>
        <Mail className="mr-2 h-4 w-4" />
        {sending ? "Sending…" : "Send magic link"}
      </Button>

      <p className="text-xs text-muted-foreground">
        You’ll get a sign-in link. No password required.
      </p>
    </form>
  );
}


