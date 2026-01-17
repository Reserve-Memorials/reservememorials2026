import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";

const PORTAL_URL = "https://portal.reservememorials.com";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/50 backdrop-blur">
      <div className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-muted/30 ring-1 ring-border/50">
                <Image
                  src="/reservelogoblack.png"
                  alt={`${MARKETING_CONTACT.company} logo`}
                  fill
                  sizes="40px"
                  className="object-contain p-1.5 dark:hidden"
                />
                <Image
                  src="/reservelogowhite.png"
                  alt={`${MARKETING_CONTACT.company} logo`}
                  fill
                  sizes="40px"
                  className="hidden object-contain p-1.5 dark:block"
                />
              </div>
              <div className="text-lg font-semibold tracking-tight">
                {MARKETING_CONTACT.company}
              </div>
            </div>
            <p className="max-w-xl text-sm text-muted-foreground">
              A modern memorial company built for families, churches, and
              communities—pairing timeless craftsmanship with clear, guided
              design and ordering.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" className="group">
                <Link href="/contact-us">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Explore</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  className="hover:text-foreground transition"
                  href="/services"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition" href="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition" href="/faqs">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Contact</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  {MARKETING_CONTACT.address}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  className="hover:text-foreground transition"
                  href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}
                >
                  {MARKETING_CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  className="hover:text-foreground transition"
                  href={`mailto:${MARKETING_CONTACT.email}`}
                >
                  {MARKETING_CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} Reserve Memorials. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link className="hover:text-foreground transition" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-foreground transition" href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
