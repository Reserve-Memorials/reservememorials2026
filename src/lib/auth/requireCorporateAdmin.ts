import { NextResponse } from "next/server";
import { getMyOrgMembership, isCorporateAdmin } from "@/lib/auth/roles";

export async function requireCorporateAdmin() {
  const { user, roles } = await getMyOrgMembership();
  if (!user) {
    return { ok: false as const, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  if (!isCorporateAdmin(roles)) {
    return { ok: false as const, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { ok: true as const, user };
}


