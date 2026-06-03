import { Calendar, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MARKETING_BOOKING_URL,
  MARKETING_CONTACT,
  phoneToTel,
} from "@/lib/marketing/contact";
import { MethodContactForm } from "@/components/marketing/MethodContactForm";

export function LicenseInquiryForm() {
  return (
    <section id="license-inquiry-form" className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-3 text-center">
        <Badge
          variant="secondary"
          className="bg-accent/10 text-accent border-accent/20"
        >
          Get Started
        </Badge>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Interested in owning a Reserve Memorials license?
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Schedule a confidential conversation to learn whether this
          opportunity is the right fit for your market. Or call us directly at{" "}
          <a
            href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <Phone className="h-3.5 w-3.5" />
            {MARKETING_CONTACT.phone}
          </a>
          .
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button size="lg" asChild>
            <a
              href={MARKETING_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book a Call
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#license-booking">View Calendar</a>
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60 bg-background/50">
        <MethodContactForm />
      </div>
    </section>
  );
}
