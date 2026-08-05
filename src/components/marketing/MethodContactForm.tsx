"use client";

import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";

const METHOD_FORM_URL =
  "https://reservememorials.method.ws/apps/Public.aspx#/628471c8-4121-4d85-85d8-5594f814ee31/Z0xaYWUxQlp3M3B5NF9NUmxoczJ1QS0t";

/**
 * KNOWN BROKEN: this URL no longer serves the form.
 *
 * Confirmed by following it in a real browser — it redirects to Method's own
 * marketing site:
 *
 *   https://www.method.me/blog/lead-gen-form/?account=reservememorials#/628471c8-...
 *
 * The fragment survives the redirect (fragments are client-side and are
 * reapplied to the redirect target), which is why the URL still *looks* right
 * while landing somewhere else entirely. So the embed is not being blocked by
 * X-Frame-Options as first suspected — the endpoint is simply gone, and the
 * form GUID now points at a marketing page.
 *
 * There is deliberately NO user-facing link to METHOD_FORM_URL. Offering one
 * sent visitors on the contact page to Method's blog, which is worse than
 * showing them nothing. Do not reintroduce a link, an "open in new tab"
 * affordance, or a redirect to this URL until Method supplies a working
 * replacement and it has been verified end to end in a browser.
 *
 * The iframe below loads the same dead URL and therefore cannot render a form
 * either. It is retained only so the fix is a one-line URL swap once Method
 * provides the correct embed; the phone and email fallbacks above it are what
 * actually carry leads in the meantime.
 */
const LOAD_TIMEOUT_MS = 8000;

export function MethodContactForm() {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  const unavailable = timedOut && !loaded;

  return (
    <div className="w-full">
      <FormFallback />

      {unavailable ? (
        <FormUnavailable />
      ) : (
        <div className="relative w-full">
          {!loaded ? <FormSkeleton /> : null}
          <iframe
            src={METHOD_FORM_URL}
            title="Reserve Memorials contact form"
            onLoad={() => setLoaded(true)}
            referrerPolicy="strict-origin-when-cross-origin"
            // Height is deliberately generous: Method does not post its content
            // height to us, so we cannot size the frame to fit. Erring tall
            // keeps the submit button reachable rather than clipped.
            className={`block h-[1800px] w-full border-0 transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ border: 0 }}
          />
        </div>
      )}
    </div>
  );
}

function FormSkeleton() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 space-y-5 p-6 sm:p-8"
    >
      <div className="h-3 w-32 animate-pulse rounded bg-muted" />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-24 animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
        </div>
      ))}
      <div className="h-28 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
    </div>
  );
}

function FormUnavailable() {
  return (
    <div className="space-y-3 px-6 py-12 text-center sm:px-10">
      <h3 className="text-lg font-semibold text-foreground">
        The form didn’t load
      </h3>
      <p className="mx-auto max-w-md text-sm text-muted-foreground">
        Something is preventing it from appearing here. Reach us by phone or
        email and we’ll take it from there.
      </p>
    </div>
  );
}

function FormFallback() {
  return (
    <div className="flex flex-col gap-3 border-b border-border/60 bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        Prefer to talk to someone? Call or email us directly.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button asChild size="sm" variant="outline">
          <a href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}>
            <Phone className="mr-1.5 h-3.5 w-3.5" />
            {MARKETING_CONTACT.phone}
          </a>
        </Button>
        <Button asChild size="sm" variant="ghost">
          <a href={`mailto:${MARKETING_CONTACT.email}`}>
            <Mail className="mr-1.5 h-3.5 w-3.5" />
            Email us
          </a>
        </Button>
      </div>
    </div>
  );
}
