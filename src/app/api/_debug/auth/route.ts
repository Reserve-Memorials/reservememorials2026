import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const all = cookieStore.getAll();

  const sbCookies = all
    .map((c) => c.name)
    .filter((n) => n.startsWith("sb-"))
    .sort();

  let userEmail: string | null = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    userEmail = data.user?.email ?? null;
  } catch {
    // ignore
  }

  const url = new URL(request.url);
  return NextResponse.json({
    host: url.host,
    hasSupabaseAuthCookies: sbCookies.length > 0,
    supabaseCookieNames: sbCookies,
    userEmail,
  });
}


