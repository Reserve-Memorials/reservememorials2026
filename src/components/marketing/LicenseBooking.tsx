"use client";

import { Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/marketing/FadeIn";
import {
  MARKETING_BOOKING_EMBED_URL,
  MARKETING_BOOKING_URL,
} from "@/lib/marketing/contact";

export function LicenseBooking() {
  return (
    <section id="license-booking" className="mx-auto max-w-5xl space-y-8">
      <FadeIn>
        <div className="space-y-3 text-center">
          <Badge
            variant="secondary"
            className="bg-accent/10 text-accent border-accent/20"
          >
            <Calendar className="mr-1.5 h-3.5 w-3.5" />
            Book a Call
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Schedule a Confidential Conversation
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Pick a time that works for you. We&apos;ll walk you through the
            opportunity, your territory, and answer any questions about whether
            this fits your goals.
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
              <a
                href={MARKETING_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in New Tab
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border/60 bg-background/50 shadow-sm">
          <iframe
            src={MARKETING_BOOKING_EMBED_URL}
            title="Schedule a call with Reserve Memorials"
            loading="lazy"
            className="h-[760px] w-full border-0"
            allow="fullscreen"
          />
        </div>
      </FadeIn>
    </section>
  );
}
