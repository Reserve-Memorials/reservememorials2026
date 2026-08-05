"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";

export const METHOD_FORM_URL =
  "https://reservememorials.method.ws/apps/Public.aspx#/628471c8-4121-4d85-85d8-5594f814ee31/Z0xaYWUxQlp3M3B5NF9NUmxoczJ1QS0t";

/**
 * Method serves this form from a third-party origin, which leaves the browser
 * giving us almost nothing to work with:
 *
 * - `error` does not fire when a frame is refused by X-Frame-Options or a CSP
 *   `frame-ancestors` directive.
 * - `load` DOES fire for that refusal page, and (verified against a blocked
 *   host) for Chrome's network-error page too. A fired `load` is therefore not
 *   proof the form is visible, and the absence of `error` proves nothing.
 * - Same-origin policy stops us inspecting the frame's contents to check.
 *
 * Detecting a failed cross-origin embed is simply not possible from here, so
 * this component does not pretend otherwise. It degrades instead:
 *
 * 1. The direct link to the form, plus phone and email, sit ABOVE the frame.
 *    They are always rendered, server-side, before hydration. A frame that
 *    comes up blank therefore cannot strand a visitor behind 1800px of empty
 *    space with no way to reach us — the escape hatch is the first thing under
 *    the heading.
 * 2. If `load` never fires within LOAD_TIMEOUT_MS the embed is additionally
 *    swapped for contact details. This only catches the subset of failures
 *    where the frame hangs rather than erroring, but it is cheap to keep.
 *
 * Opening the form via that direct link is unaffected by framing restrictions,
 * so it works even when the embed cannot.
 *
 * To confirm which failure mode is in play:
 *   curl -sSI "https://reservememorials.method.ws/apps/Public.aspx" \
 *     | grep -iE "x-frame-options|content-security-policy|set-cookie"
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
        Something is preventing it from appearing here. You can open the form
        directly, or reach us by phone or email and we’ll take it from there.
      </p>
    </div>
  );
}

function FormFallback() {
  return (
    <div className="flex flex-col gap-3 border-b border-border/60 bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        Trouble with the form below? Open it in a new tab, or contact us
        directly.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button asChild size="sm" variant="outline">
          <a href={METHOD_FORM_URL} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
            Open form
          </a>
        </Button>
        <Button asChild size="sm" variant="ghost">
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
