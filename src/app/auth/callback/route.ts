import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { bootstrapFirstCorporateAdmin } from "@/lib/auth/bootstrap";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/portal";

  if (!code) {
    return NextResponse.redirect(new URL(`/login?error=missing_code&next=${encodeURIComponent(next)}`, url));
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`, url)
      );
    }

    // Best-effort RBAC bootstrap for a brand-new project.
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      await bootstrapFirstCorporateAdmin(userData.user.id);
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Auth callback failed";
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(msg)}&next=${encodeURIComponent(next)}`, url)
    );
  }

  return NextResponse.redirect(new URL(next, url));
}


