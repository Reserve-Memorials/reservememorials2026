import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";
import { HubSpotContactForm } from "@/components/marketing/HubSpotContactForm";
import { FadeIn } from "@/components/marketing/FadeIn";

/**
 * Inline quote request form for service pages.
 * Wraps the HubSpot contact form with a heading and phone fallback.
 * Anchor id="quote-form" lets hero CTAs scroll directly here.
 */
export function ServiceQuoteForm() {
  return (
    <section id="quote-form" className="mx-auto max-w-4xl scroll-mt-24 space-y-8">
      <FadeIn>
        <div className="space-y-3 text-center">
          <Badge
            variant="secondary"
            className="bg-accent/10 text-accent border-accent/20"
          >
            Free Quote
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Request a Quote
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Tell us what you&apos;re looking for and we&apos;ll get back to you
            with guidance and pricing. Or call us directly at{" "}
            <a
              href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <Phone className="h-3.5 w-3.5" />
              {MARKETING_CONTACT.phone}
            </a>
            .
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="rounded-xl border border-border/60 bg-background/50 p-4 sm:p-6">
          <HubSpotContactForm />
        </div>
      </FadeIn>
    </section>
  );
}
