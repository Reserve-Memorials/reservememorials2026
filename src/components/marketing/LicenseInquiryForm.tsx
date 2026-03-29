"use client";

import Script from "next/script";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";

declare global {
  interface Window {
    hbspt?: {
      forms?: {
        create?: (opts: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
  }
}

const HUBSPOT_SCRIPT_SRC =
  "https://js-na2.hsforms.net/forms/embed/245064716.js";
const HUBSPOT_REGION = "na2";
const HUBSPOT_PORTAL_ID = "245064716";
const LICENSE_FORM_ID = "2bdf5307-0d45-40fe-b96f-ed35705ba91b";

export function LicenseInquiryForm() {
  const reactId = useId();
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const targetId = useMemo(() => {
    const safe = reactId.replace(/[^a-zA-Z0-9_-]/g, "");
    return `hs-license-form-${safe}`;
  }, [reactId]);

  const createForm = () => {
    if (!containerRef.current) return;
    const create = window.hbspt?.forms?.create;
    if (!create) return;

    // Prevent duplicate embeds when navigating back to this page.
    containerRef.current.innerHTML = "";

    create({
      region: HUBSPOT_REGION,
      portalId: HUBSPOT_PORTAL_ID,
      formId: LICENSE_FORM_ID,
      target: `#${targetId}`,
    });
  };

  useEffect(() => {
    // If script is already present (client-side navigation), create immediately.
    if (window.hbspt?.forms?.create) createForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId]);

  useEffect(() => {
    if (loaded) createForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

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
          Ready to Build Your Memorial Business?
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Fill out the form below and we&apos;ll send you everything you need to
          make an informed decision. Or call us directly at{" "}
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

      <div className="rounded-xl border border-border/60 bg-background/50 p-4 sm:p-6">
        <Script
          src={HUBSPOT_SCRIPT_SRC}
          strategy="afterInteractive"
          onLoad={() => setLoaded(true)}
        />

        <div
          id={targetId}
          ref={containerRef}
          className="hs-form-frame"
          data-region={HUBSPOT_REGION}
          data-form-id={LICENSE_FORM_ID}
          data-portal-id={HUBSPOT_PORTAL_ID}
        />
      </div>
    </section>
  );
}
