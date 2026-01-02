import Stripe from "stripe";
import { getEnv } from "@/lib/env";

let stripeSingleton: Stripe | null = null;

export function getStripe() {
  if (stripeSingleton) return stripeSingleton;
  const env = getEnv();
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  stripeSingleton = new Stripe(env.STRIPE_SECRET_KEY, {
    typescript: true,
  });
  return stripeSingleton;
}


