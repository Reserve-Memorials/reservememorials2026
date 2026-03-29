import type { Metadata } from "next";
import { LicenseHero } from "@/components/marketing/LicenseHero";
import { LicenseValueProps } from "@/components/marketing/LicenseValueProps";
import { LicenseIndustryStats } from "@/components/marketing/LicenseIndustryStats";

import { LicenseProcess } from "@/components/marketing/LicenseProcess";
import { LicenseInvestment } from "@/components/marketing/LicenseInvestment";
import { LicenseTerritory } from "@/components/marketing/LicenseTerritory";
import { LicenseTestimonials } from "@/components/marketing/LicenseTestimonials";
import { LicenseFAQ } from "@/components/marketing/LicenseFAQ";
import { LicenseInquiryForm } from "@/components/marketing/LicenseInquiryForm";
import { LicenseBottomCTA } from "@/components/marketing/LicenseBottomCTA";
import { LICENSE_FAQS } from "@/lib/marketing/license-faqs";

export const metadata: Metadata = {
  title: "Own a Reserve Memorials License | Memorial Business Opportunity",
  description:
    "Start your own memorial business with a Reserve Memorials license. Low overhead, exclusive territories, comprehensive training, and a growing $1.6B industry. No storefront required.",
  openGraph: {
    title: "Own a Reserve Memorials License",
    description:
      "Join a growing memorial brand. Low investment, exclusive territories, full support.",
    url: "https://www.reservememorials.com/license-opportunity",
    siteName: "Reserve Memorials",
    type: "website",
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Reserve Memorials License Opportunity",
  description:
    "License opportunity to operate a memorial services business under the Reserve Memorials brand",
  provider: {
    "@type": "Organization",
    name: "Reserve Memorials LLC",
    url: "https://www.reservememorials.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "30 Ravenna Street",
      addressLocality: "Hudson",
      addressRegion: "OH",
      postalCode: "44236",
    },
    telephone: "+12342695432",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: LICENSE_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function LicenseOpportunityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Full-bleed hero (cancels layout padding) */}
      <div className="-mx-4 -mt-8 sm:-mx-6 lg:-mx-10 lg:-mt-10">
        <LicenseHero />
      </div>

      {/* Remaining sections with standard spacing */}
      <div className="space-y-16 pt-16">
        <LicenseValueProps />
        <LicenseIndustryStats />
        <LicenseProcess />
        <LicenseInvestment />
        <LicenseTerritory />
        <LicenseTestimonials />
        <LicenseFAQ />
        <LicenseInquiryForm />
        <LicenseBottomCTA />
      </div>
    </>
  );
}
