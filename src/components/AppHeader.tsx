"use client";

import { usePathname } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { MarketingNav } from "@/components/marketing/MarketingNav";

function isPortalPath(pathname: string) {
  return (
    pathname.startsWith("/portal") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/logout") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/auth")
  );
}

export function AppHeader() {
  const pathname = usePathname() ?? "/";
  return isPortalPath(pathname) ? <SiteNav /> : <MarketingNav />;
}

