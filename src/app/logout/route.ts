import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  // IMPORTANT:
  // Never sign out on GET. Next.js may prefetch links, which would log users out unexpectedly.
  return NextResponse.redirect(new URL("/login", req.url), { status: 303 });
}

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    // If env isn't configured yet, still allow redirect.
  }
  return NextResponse.redirect(new URL("/login", req.url), { status: 303 });
}


