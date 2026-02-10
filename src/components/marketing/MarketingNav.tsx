"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Gem,
  Info,
  MapPin,
  Menu,
  Phone,
  Sparkles,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MARKETING_CONTACT } from "@/lib/marketing/contact";

const PORTAL_URL = "https://portal.reservememorials.com";

const OFFER_SESSION_KEY = "reserve_offer_modal_seen_2026_02_01";
const OFFER_CONTACT_HREF = "/contact-us";

const SERVICES = [
  { href: "/traditional-headstones", label: "Traditional headstones" },
  { href: "/columbariums", label: "Columbariums" },
  { href: "/veteran-memorials", label: "Veteran memorials" },
  { href: "/design-consultation", label: "Design consultation" },
  { href: "/dove-release", label: "Dove release" },
  { href: "/statues", label: "Statues" },
  { href: "/grief-coaching", label: "Grief coaching" },
];

export function MarketingNav() {
  const [offerOpen, setOfferOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(OFFER_SESSION_KEY) === "1") return;
      sessionStorage.setItem(OFFER_SESSION_KEY, "1");
      const t = window.setTimeout(() => setOfferOpen(true), 450);
      return () => window.clearTimeout(t);
    } catch {
      // If storage is blocked, just don't show repeatedly.
      const t = window.setTimeout(() => setOfferOpen(true), 450);
      return () => window.clearTimeout(t);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="border-b border-amber-500/25 bg-amber-50/90 text-amber-950 backdrop-blur dark:border-amber-400/20 dark:bg-amber-950/30 dark:text-amber-50">
        <div className="mx-auto flex w-full flex-col gap-2 px-4 py-2 text-center text-xs sm:flex-row sm:items-center sm:justify-between sm:text-left sm:px-6 lg:px-10 data-[state=open]:animate-in data-[state=open]:slide-in-from-top-2 data-[state=open]:fade-in duration-500">
          <div className="text-amber-950/90 dark:text-amber-50/90">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/70 px-2 py-0.5 font-semibold text-amber-950 dark:bg-amber-400/15 dark:text-amber-100">
              <Sparkles className="h-3.5 w-3.5" />
              Limited-time offer
            </span>{" "}
            <span className="font-semibold">Free Installation</span>{" "}
            <span className="text-amber-900/80 dark:text-amber-100/80">
              (Up to $1,000)
            </span>{" "}
            <span className="text-amber-900/70 dark:text-amber-100/70">
              • Valid for monument orders placed now through Feb 28, 2026 • Ohio
              only.
            </span>
          </div>
          <Link
            href={OFFER_CONTACT_HREF}
            onClick={() => setOfferOpen(false)}
            className={cn(
              "inline-flex h-8 items-center justify-center gap-2 rounded-full px-3 text-xs font-semibold transition",
              "border border-amber-500/35 bg-amber-100/70 text-amber-950 hover:bg-amber-100",
              "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]",
              "dark:border-amber-300/25 dark:bg-amber-400/10 dark:text-amber-50 dark:hover:bg-amber-400/15",
              "focus:outline-hidden focus:ring-2 focus:ring-amber-400/60 focus:ring-offset-2 focus:ring-offset-background",
            )}
          >
            Claim Offer
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <Dialog open={offerOpen} onOpenChange={setOfferOpen}>
        <DialogContent className="overflow-hidden border-amber-500/25 p-0 sm:max-w-lg">
          <div className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.35),transparent_55%)]" />
            <div className="relative space-y-4 p-6">
              <DialogHeader>
                <DialogTitle className="text-balance text-2xl">
                  Free Installation (Up to $1,000)
                </DialogTitle>
                <DialogDescription className="text-base">
                  Valid for monument orders placed now through{" "}
                  <span className="font-semibold text-foreground">
                    February 28, 2026
                  </span>
                  . Ohio only.
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-lg border border-amber-500/20 bg-amber-50/70 p-4 text-sm text-amber-950 dark:border-amber-300/15 dark:bg-amber-950/25 dark:text-amber-50">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-300" />
                  <div>
                    Click “Claim Offer” and we’ll help you confirm eligibility
                    and next steps.
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-1">
                <Button variant="outline" onClick={() => setOfferOpen(false)}>
                  Not now
                </Button>
                <Button
                  asChild
                  className="bg-amber-600 text-white hover:bg-amber-600/90"
                >
                  <Link
                    href={OFFER_CONTACT_HREF}
                    onClick={() => setOfferOpen(false)}
                  >
                    Claim Offer
                  </Link>
                </Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
                  icon={<Gem className="h-5 w-5" />}
                >
                  Services
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
                <MobileNavLink
                  href="/cemeteries-we-serve"
                  icon={<MapPin className="h-5 w-5" />}
                >
                  Cemeteries we serve
                </MobileNavLink>
                <div className="mt-4 pt-4 border-t border-border">
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
            <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-muted/30 shadow-sm ring-1 ring-border/50 transition-transform group-hover:-translate-y-0.5">
              <Image
                src="/reservelogoblack.png"
                alt={`${MARKETING_CONTACT.company} logo`}
                fill
                sizes="40px"
                className="object-contain p-1.5 dark:hidden"
                priority
              />
              <Image
                src="/reservelogowhite.png"
                alt={`${MARKETING_CONTACT.company} logo`}
                fill
                sizes="40px"
                className="hidden object-contain p-1.5 dark:block"
                priority
              />
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
          <ServicesDropdown />
          <NavLink href="/blog" icon={<BookOpen className="h-4 w-4" />}>
            Blog
          </NavLink>
          <NavLink href="/about-us" icon={<Info className="h-4 w-4" />}>
            About
          </NavLink>
          <ContactDropdown />
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
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

function ServicesDropdown() {
  return (
    <div className="relative group">
      <Link
        href="/services"
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition",
          "hover:bg-accent hover:text-foreground hover:shadow-sm",
          "focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        )}
      >
        <Gem className="h-4 w-4" />
        <span>Services</span>
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </Link>

      {/* Hover buffer: prevents flicker when moving from trigger to menu */}
      <div className="absolute left-0 top-full h-3 w-full" />

      <div className="absolute left-0 top-full z-50 mt-2 hidden min-w-64 group-hover:block group-focus-within:block">
        <div className="max-h-[70vh] overflow-auto rounded-2xl border border-border/60 bg-popover/95 p-2 shadow-lg backdrop-blur">
          <Link
            href="/services"
            className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-accent transition"
          >
            All services
          </Link>
          <div className="my-2 h-px bg-border/60" />
          <div className="grid">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="block rounded-xl px-3 py-2 text-sm text-foreground/85 hover:bg-accent hover:text-foreground transition"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactDropdown() {
  return (
    <div className="relative group">
      <Link
        href="/contact-us"
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition",
          "hover:bg-accent hover:text-foreground hover:shadow-sm",
          "focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        )}
      >
        <Phone className="h-4 w-4" />
        <span>Contact</span>
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </Link>

      {/* Hover buffer: prevents flicker when moving from trigger to menu */}
      <div className="absolute left-0 top-full h-3 w-full" />

      <div className="absolute left-0 top-full z-50 mt-2 hidden min-w-64 group-hover:block group-focus-within:block">
        <div className="rounded-2xl border border-border/60 bg-popover/95 p-2 shadow-lg backdrop-blur">
          <Link
            href="/contact-us"
            className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-accent transition"
          >
            Contact us
          </Link>
          <Link
            href="/cemeteries-we-serve"
            className="block rounded-xl px-3 py-2 text-sm text-foreground/85 hover:bg-accent hover:text-foreground transition"
          >
            Cemeteries we serve
          </Link>
        </div>
      </div>
    </div>
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
        "hover:bg-accent hover:text-foreground hover:shadow-sm",
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
        "hover:bg-accent hover:text-foreground",
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
