"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ImageIcon,
  Info,
  Menu,
  Phone,
  Sparkles,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const PORTAL_URL = "https://portal.reservememorials.com";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <MobileNavLink
                  href="/services"
                  icon={<Sparkles className="h-5 w-5" />}
                >
                  Services
                </MobileNavLink>
                <MobileNavLink
                  href="/gallery"
                  icon={<ImageIcon className="h-5 w-5" />}
                >
                  Gallery
                </MobileNavLink>
                <MobileNavLink
                  href="/blog"
                  icon={<BookOpen className="h-5 w-5" />}
                >
                  Blog
                </MobileNavLink>
                <MobileNavLink
                  href="/about-us"
                  icon={<Info className="h-5 w-5" />}
                >
                  About
                </MobileNavLink>
                <MobileNavLink
                  href="/contact-us"
                  icon={<Phone className="h-5 w-5" />}
                >
                  Contact
                </MobileNavLink>
                <div className="mt-4 pt-4 border-t border-border">
                  <Button asChild variant="outline" className="w-full mb-3">
                    <Link href="/login">Portal login</Link>
                  </Button>
                  <Button asChild className="w-full group">
                    <Link href="/contact-us">
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="group flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-primary/95 via-chart-4/70 to-primary/95 text-primary-foreground shadow-sm ring-1 ring-border/50 transition-transform group-hover:-translate-y-0.5">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">
                Reserve Memorials
              </div>
              <div className="text-xs text-muted-foreground">
                Premium memorials • Crafted with care
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="/services" icon={<Sparkles className="h-4 w-4" />}>
            Services
          </NavLink>
          <NavLink href="/gallery" icon={<ImageIcon className="h-4 w-4" />}>
            Gallery
          </NavLink>
          <NavLink href="/blog" icon={<BookOpen className="h-4 w-4" />}>
            Blog
          </NavLink>
          <NavLink href="/about-us" icon={<Info className="h-4 w-4" />}>
            About
          </NavLink>
          <NavLink href="/contact-us" icon={<Phone className="h-4 w-4" />}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/login">Portal login</Link>
          </Button>
          <Button asChild size="sm" className="group hidden md:inline-flex">
            <Link href="/contact-us">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition",
        "hover:bg-accent hover:text-foreground hover:shadow-sm"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function MobileNavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-foreground transition",
        "hover:bg-accent hover:text-foreground"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
