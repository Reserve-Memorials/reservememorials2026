import { z } from "zod";

const EnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  CORPORATE_ORG_ID: z.string().uuid().optional(),

  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),

  DEPOSIT_CURRENCY: z.string().default("usd"),
  DEPOSIT_AMOUNT_CENTS: z.coerce.number().int().positive().default(5000),
});

export type Env = z.infer<typeof EnvSchema>;

export function getEnv(): Env {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    // Keep it readable in logs.
    const message = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${message}`);
  }
  return parsed.data;
}


