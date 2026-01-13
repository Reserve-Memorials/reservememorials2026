"use client";

import { usePathname } from "next/navigation";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

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

export function AppFooter() {
  const pathname = usePathname() ?? "/";
  if (isPortalPath(pathname)) return null;
  return <MarketingFooter />;
}

