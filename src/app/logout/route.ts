import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    // If env isn't configured yet, still allow redirect.
  }
  return NextResponse.redirect(new URL("/login", req.url));
}


