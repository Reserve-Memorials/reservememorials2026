import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { bootstrapFirstCorporateAdmin } from "@/lib/auth/bootstrap";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextRaw = url.searchParams.get("next");
  const next = safeInternalPath(nextRaw) ?? "/portal";

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

      // Role-aware redirect: corporate admins go to /admin, everyone else to /portal.
      // Still respect deep links via `next=` when provided.
      const { data: memberships } = await supabase
        .from("org_members")
        .select("role")
        .eq("user_id", userData.user.id);
      const isAdmin = Boolean(memberships?.some((m) => m.role === "corporate_admin"));

      let dest = nextRaw ? next : isAdmin ? "/admin" : "/portal";
      // If a corporate admin is heading to the licensee portal root, bounce them to /admin.
      if (isAdmin && (dest === "/portal" || dest.startsWith("/portal"))) dest = "/admin";
      dest = safeInternalPath(dest) ?? (isAdmin ? "/admin" : "/portal");

      return NextResponse.redirect(new URL(dest, url));
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Auth callback failed";
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(msg)}&next=${encodeURIComponent(next)}`, url)
    );
  }

  return NextResponse.redirect(new URL(next, url));
}

function safeInternalPath(input: string | null | undefined): string | null {
  if (!input) return null;
  // Only allow same-origin relative paths.
  if (!input.startsWith("/")) return null;
  if (input.startsWith("//")) return null;
  return input;
}


