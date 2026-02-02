import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";
import { HubSpotContactForm } from "@/components/marketing/HubSpotContactForm";

export default function ContactUsPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_60%)]/[14]" />
        <div className="pointer-events-none absolute -right-8 bottom-0 hidden h-44 w-44 sm:block">
          <Image
            src="/reserve-duck-black.jpg"
            alt=""
            fill
            sizes="176px"
            className="object-contain opacity-90 dark:hidden"
            priority
          />
          <Image
            src="/reserve-duck-white.jpg"
            alt=""
            fill
            sizes="176px"
            className="hidden object-contain opacity-90 dark:block"
            priority
          />
        </div>
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Badge className="w-fit" variant="secondary">
            Contact
          </Badge>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Talk to a memorial advisor.
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Send a note and we’ll follow up. Next step: we’ll wire this form to
            create a prospect in the portal.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/cemeteries-we-serve">Cemeteries we serve</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl">Request a consultation</CardTitle>
            <p className="text-sm text-muted-foreground">
              Fill out the form below and we’ll follow up shortly.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-border/60 bg-background/50 p-4 sm:p-6">
              <HubSpotContactForm />
            </div>
            <p className="text-xs text-muted-foreground">
              Prefer email? Reach us at{" "}
              <a
                className="text-primary hover:underline"
                href={`mailto:${MARKETING_CONTACT.email}`}
              >
                {MARKETING_CONTACT.email}
              </a>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl">Contact details</CardTitle>
            <p className="text-sm text-muted-foreground">
              Reach out and we’ll respond as soon as possible.
            </p>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <div>{MARKETING_CONTACT.address}</div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a
                className="text-primary hover:underline"
                href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}
              >
                {MARKETING_CONTACT.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a
                className="text-primary hover:underline"
                href={`mailto:${MARKETING_CONTACT.email}`}
              >
                {MARKETING_CONTACT.email}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
