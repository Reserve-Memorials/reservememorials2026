import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return NextResponse.json({
    cwd: process.cwd(),
    hasNextPublicSupabaseUrl: Boolean(url),
    hasNextPublicSupabaseAnonKey: Boolean(anon),
    supabaseUrlHost: url ? safeHost(url) : null,
    anonKeyLength: anon ? anon.length : 0,
  });
}

function safeHost(raw: string) {
  try {
    return new URL(raw).host;
  } catch {
    return null;
  }
}


