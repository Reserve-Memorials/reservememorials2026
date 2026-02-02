"use client";

import Script from "next/script";
import { useEffect, useId, useMemo, useRef, useState } from "react";

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
const HUBSPOT_FORM_ID = "1dc783e1-6731-4469-8121-acc1649cb4e4";

export function HubSpotContactForm() {
  const reactId = useId();
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const targetId = useMemo(() => {
    // React IDs can include ":" which isn't ideal for CSS selectors.
    const safe = reactId.replace(/[^a-zA-Z0-9_-]/g, "");
    return `hs-form-${safe}`;
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
      formId: HUBSPOT_FORM_ID,
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
    <>
      <Script
        src={HUBSPOT_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />

      {/* Kept per provided embed code, plus an id target for reliable rendering. */}
      <div
        id={targetId}
        ref={containerRef}
        className="hs-form-frame"
        data-region={HUBSPOT_REGION}
        data-form-id={HUBSPOT_FORM_ID}
        data-portal-id={HUBSPOT_PORTAL_ID}
      />
    </>
  );
}
