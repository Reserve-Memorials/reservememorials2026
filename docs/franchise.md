# Product Requirements Document (PRD)

# Reserve Memorials - Licensee Opportunity Page

---

## Document Info

| Field         | Value                                       |
| ------------- | ------------------------------------------- |
| **Project**   | Reserve Memorials Licensee Opportunity Page |
| **Client**    | Mark Loboda, Reserve Memorials LLC          |
| **Developer** | Anand Iyer                                  |
| **Date**      | March 29, 2026                              |
| **Version**   | 3.0 (Final - No Supabase Backend)           |
| **Status**    | Ready for Development                       |

---

## 1. Executive Summary

Reserve Memorials (reservememorials.com) needs a **public marketing page** to attract new licensees. This is a frontend-only page with a HubSpot embedded form for lead capture. No new backend, no new database tables, no new API routes.

The page lives at `/license-opportunity` and follows the exact same patterns as every other marketing page on the site (`/about-us`, `/contact-us`, `/traditional-headstones`, etc.).

### What Mark Asked For

**March 29, 2026 - "Pages" email:**

> "I would like to add a page to promote the license sales of Reserve Memorials."

**March 29, 2026 - "Websites with franchises" email:**
Mark shared 5 reference franchise sites:

1. The UPS Store - theupsstorefranchise.com/ups-store-for-sale
2. Anytime Fitness - franchise.anytimefitness.com
3. Culver's - culvers.com/franchise
4. SERVPRO - servpro.com/franchise-ownership
5. Great Clips - franchise.greatclips.com

He said: _"I liked the sites with an intro/hype video. I will make one and send."_

**February 14, 2026 - "Marketing" email:**
Mark was looking for marketing help to "enhance my Reserve Memorial License opportunity."

**March 19, 2026 - "Design Program" email:**
Mark wants to _"get the franchisees off the ground"_ before investing in other features.

---

## 2. Architecture Summary

### What This Page Is

- A **public marketing page** -- same as `/about-us` or `/traditional-headstones`
- Uses MarketingNav + MarketingFooter (handled automatically by existing `AppHeader.tsx` and `AppFooter.tsx`)
- All content is static / hardcoded in components
- Lead capture via **HubSpot embedded form** (same pattern as `/contact-us`)
- No auth required, no portal integration, no database reads/writes

### What This Page Is NOT

- NOT a portal/admin feature
- NOT connected to the `territories`, `prospects`, or any Supabase table
- NOT adding any new API routes or migrations
- NOT introducing any new npm dependencies

### Tech Used (all already in the project)

| What                                                                | From                                        |
| ------------------------------------------------------------------- | ------------------------------------------- |
| Next.js App Router (Server + Client Components)                     | Existing                                    |
| TypeScript strict mode                                              | Existing                                    |
| Tailwind CSS v4                                                     | Existing                                    |
| Framer Motion (FadeIn animations)                                   | Existing                                    |
| shadcn/ui components (Card, Accordion, Button, Badge, Dialog, etc.) | Existing                                    |
| Lucide React icons                                                  | Existing                                    |
| HubSpot Embedded Forms                                              | Existing (`HubSpotContactForm.tsx` pattern) |
| OKLch color tokens + Cormorant Garamond / Inter fonts               | Existing                                    |
| next-themes (dark mode)                                             | Existing                                    |
| Vercel Analytics + GTM                                              | Existing                                    |

---

## 3. File Structure

```
src/app/
  license-opportunity/
    page.tsx                          # Server Component -- main page, metadata export

src/components/marketing/
  LicenseHero.tsx                     # Client Component -- video hero + CTAs + Dialog modal
  LicenseValueProps.tsx               # Server Component -- 6-card grid
  LicenseIndustryStats.tsx            # Client Component -- animated number counters
  LicensePackage.tsx                  # Server Component -- what you get (alternating blocks)
  LicenseProcess.tsx                  # Server Component -- 4-step numbered timeline
  LicenseInvestment.tsx               # Server Component -- cost overview card
  LicenseTerritory.tsx                # Server Component -- territory availability (static)
  LicenseTestimonials.tsx             # Server Component -- social proof (placeholder)
  LicenseFAQ.tsx                      # Client Component -- Accordion
  LicenseInquiryForm.tsx              # Client Component -- HubSpot form embed
  LicenseBottomCTA.tsx                # Server Component -- final CTA section
```

That's it. No API routes. No migrations. No lib files. Just page + components.

---

## 4. Page Route and Metadata

**Route:** `/license-opportunity`

```typescript
// src/app/license-opportunity/page.tsx
import type { Metadata } from "next";

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
```

Add JSON-LD structured data inline for SEO:

```typescript
const jsonLd = {
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
```

Also add **FAQPage** schema markup from the FAQ section content for rich results.

---

## 5. Section-by-Section Specs

### 5.1 Hero Section (`LicenseHero.tsx` -- Client Component)

**Why client:** Video interaction, scroll-to-form click handler, Dialog modal for full video.

**Follow the existing homepage hero pattern.** The site already uses a `<video>` element in `public/Reserve Memorials.mp4`. This section does the same thing with Mark's new hype video.

**Content:**

```
Badge: "License Opportunity"
Headline: "Own a Reserve Memorials License"
Subheadline: "Join a growing memorial brand helping families honor loved ones across America"
CTA 1: "Request Information" -- smooth scrolls to the HubSpot form section
CTA 2: "Watch Our Story" -- opens Dialog modal with the full video (controls enabled)
```

**Video file:** Mark is creating this. It goes in `public/license-hype.mp4` (or whatever he names it). Fallback to a static image (`public/license-hero.jpg`) on mobile or if video hasn't loaded.

**Behavior:**

- Desktop: `<video autoPlay muted loop playsInline>` with dark gradient overlay
- Mobile: Static image background with a centered play button that opens the Dialog
- "Request Information" button calls `document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })`

### 5.2 Value Proposition Grid (`LicenseValueProps.tsx` -- Server Component)

**Follow the existing service page "Options Grid" pattern** -- 6 cards in a responsive grid using the `Card` component.

| #   | Lucide Icon     | Title                   | Description                                                                                                            |
| --- | --------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1   | `Shield`        | Proven Brand            | Join an established Ohio-based memorial company with a reputation for quality craftsmanship and compassionate service. |
| 2   | `Home`          | Low Overhead            | No storefront required. Operate from a home office with minimal startup costs compared to traditional franchises.      |
| 3   | `Wrench`        | Turnkey Support         | We handle manufacturing, fulfillment, and supplier relationships. You focus on families in your community.             |
| 4   | `TrendingUp`    | Growing Market          | The memorial industry is valued at $1.6B and growing at 6.4% CAGR. Demand is steady and recession-resistant.           |
| 5   | `MapPin`        | Exclusive Territory     | Secure your market. Each licensee gets a protected geographic territory to build their business.                       |
| 6   | `GraduationCap` | Training and Mentorship | Comprehensive onboarding covers memorial design, cemetery regulations, sales, and customer service.                    |

Wrap each card with `FadeIn` for scroll-triggered entrance animations.

### 5.3 Industry Opportunity (`LicenseIndustryStats.tsx` -- Client Component)

**Why client:** Animated number counters using Framer Motion's `useInView` + `animate`.

**Layout:** A `ParallaxSection` (or muted background section) with 4 stat cards in a row.

**Stats:**

| Value | Label              |
| ----- | ------------------ |
| $1.6B | Market Size (2023) |
| $2.6B | Projected by 2030  |
| 6.4%  | Annual Growth Rate |
| ~60%  | Profit Margins     |

Each stat uses `--accent` (Heritage Gold) for the number and `--foreground` for the label. Numbers animate from 0 to target value when scrolled into view.

**Supporting narrative** (below the stats, in prose):

- Memorial industry is recession-resistant (death rate is constant)
- Personalization trend driving premium pricing
- Cremation growth creating new product categories (columbariums, cremation memorials)
- Technology gap in the industry that Reserve Memorials fills
- Aging baby boomer population increasing demand

### 5.4 What You Get (`LicensePackage.tsx` -- Server Component)

**Layout:** Alternating left-right content blocks OR a grid of Cards. Each block has an icon, title, and description with relevant internal links.

**Package Items:**

**1. Brand License and Identity**

- Reserve Memorials name, logo, brand materials
- Territory presence on reservememorials.com
- Marketing collateral templates

**2. Product Access and Supplier Network**

- Established granite and material suppliers at wholesale pricing
- Full catalog: [headstones](/traditional-headstones), [columbariums](/columbariums), [veteran memorials](/veteran-memorials), [statues](/statues)
- [Design consultation](/design-consultation) tools and resources

**3. Training Program**

- Memorial industry fundamentals and product knowledge
- Cemetery regulations and approval processes
- Sales techniques and [grief sensitivity](/grief-coaching) training
- Installation coordination

**4. Marketing and Lead Generation**

- Local SEO support and Google Business Profile setup
- Google Ads templates and guidance
- Automatic lead routing from reservememorials.com for your territory
- Access to the [blog](/blog) content library

**5. Technology Platform**

- Full licensee portal with lead management, design sessions, and order tracking
- Stripe-powered payment processing for deposits and merchandise
- Modern, mobile-responsive website backed by your territory

**6. Operational Support**

- Dedicated point of contact at Reserve Memorials HQ (Hudson, Ohio)
- Manufacturing and fulfillment handled by HQ
- Ongoing mentorship and community of licensees

### 5.5 How It Works (`LicenseProcess.tsx` -- Server Component)

**Follow the existing 4-step numbered process pattern** from service pages like `/traditional-headstones`.

| Step | Icon       | Title                 | Description                                                                                                                    |
| ---- | ---------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 1    | `Mail`     | Express Your Interest | Fill out our inquiry form. We'll send you a detailed information packet about the Reserve Memorials license opportunity.       |
| 2    | `Phone`    | Discovery Call        | Schedule a one-on-one call with our team to discuss your goals, territory preferences, and answer your questions.              |
| 3    | `FileText` | Review and Agreement  | Review the complete opportunity details. Once approved, sign your license agreement and secure your exclusive territory.       |
| 4    | `Rocket`   | Training and Launch   | Complete our training program and launch your business with full access to the Reserve Memorials platform, brand, and support. |

Each step gets a numbered `Badge` (1, 2, 3, 4) matching the existing pattern.

### 5.6 Investment Overview (`LicenseInvestment.tsx` -- Server Component)

**Layout:** A single prominent `Card` with investment details inside.

**Content (placeholder until Mark confirms numbers):**

```
Headline: "Your Investment"

License Fee:              [TBD -- Mark to confirm]
Estimated Total Startup:  [TBD -- Mark to confirm]
Ongoing Royalty:          [TBD -- Mark to confirm]
Marketing Contribution:   [TBD -- Mark to confirm]

Comparison callout:
"Unlike traditional franchises requiring $100K-$5M+ and a physical storefront,
a Reserve Memorials license lets you operate from a home office with a fraction of the investment."
```

**Reference comparison data** (from research):

- UPS Store: $100K-$400K+ investment, $29,950 franchise fee
- Anytime Fitness: $78K-$521K investment, $21K-$42.5K franchise fee
- Culver's: $2M-$5.8M investment, $55K-$65K franchise fee
- Great Clips: $187K-$419K investment
- SERVPRO: $159K-$213K investment, $49K franchise fee

Use this to highlight how much more accessible Reserve Memorials is.

**Legal disclaimer at bottom of this section:**

```
"This is not an offer to sell a franchise. A license offering can only be made through
proper legal documentation. Individual results vary. Reserve Memorials LLC reserves the
right to modify terms, availability, and program details at any time."
```

### 5.7 Territory Availability (`LicenseTerritory.tsx` -- Server Component)

**Pure static content.** No database queries, no interactive map.

**Layout:** A section with a heading, brief paragraph, and a simple visual (SVG US map with Ohio highlighted, or a styled card).

**Content:**

```
Headline: "Territories Available Nationwide"
Body: "We're actively growing our licensee network. Territories are currently available
in Ohio and expanding across the United States. Each licensee receives a protected
geographic territory defined by ZIP codes -- no one else in the Reserve Memorials
network can operate in your area."

CTA: "Check Territory Availability" -- scrolls to the HubSpot form
```

### 5.8 Social Proof (`LicenseTestimonials.tsx` -- Server Component)

**Placeholder section.** Reserve Memorials doesn't have licensees yet.

**Initial content:**

- A quote from Mark about his vision for the license program
- Customer testimonials about product quality (if available)
- The company's years in the memorial industry
- "Family-owned and operated" trust signal

**Layout:** 1-3 `Card` components with quote and attribution.

### 5.9 FAQ Section (`LicenseFAQ.tsx` -- Client Component)

**Why client:** Uses the existing shadcn/ui `Accordion` component.

**Questions:**

```
Q: What is a Reserve Memorials license?
A: A Reserve Memorials license gives you the right to operate a memorial services
   business under the Reserve Memorials brand in your exclusive territory. You sell
   custom headstones, monuments, and memorial products to families, while we handle
   manufacturing and fulfillment.

Q: Do I need experience in the memorial industry?
A: No prior experience is required. We provide comprehensive training covering
   product knowledge, sales techniques, cemetery regulations, and customer service.

Q: Do I need a storefront or showroom?
A: No. You can operate from a home office and meet clients at cemeteries, funeral
   homes, or in their homes. A showroom is optional but not required.

Q: How much does it cost?
A: [TBD -- to be filled with Mark's confirmed numbers]. Our license model has a
   significantly lower investment than traditional franchises.

Q: What territory sizes are available?
A: Territories are defined by ZIP codes and geographic regions. We work with you
   to identify the right territory based on population and market opportunity.

Q: How do I make money?
A: You earn revenue from the sale of memorial products and services to families
   in your territory. You purchase products at wholesale pricing and sell at
   retail markup.

Q: What technology do I get?
A: Full access to the Reserve Memorials platform -- a licensee portal for managing
   leads, running design consultations, processing payments, and tracking orders.

Q: Is this a franchise or a license?
A: Reserve Memorials offers a license opportunity, not a franchise. A license
   typically has fewer regulatory requirements and gives you more operational flexibility.

Q: What states are available?
A: We currently have territories available in Ohio and are expanding nationwide.
   Fill out the inquiry form to check availability in your area.

Q: Can I own multiple territories?
A: Yes. Successful licensees may expand into additional territories as they grow.

Q: What products can I sell?
A: The full Reserve Memorials catalog: traditional headstones, columbariums,
   veteran memorials, statues, and services like dove releases and
   design consultations.
```

### 5.10 Lead Capture Form (`LicenseInquiryForm.tsx` -- Client Component)

**Use the exact same HubSpot embed pattern as the existing `/contact-us` page.**

The existing `HubSpotContactForm.tsx` component dynamically loads the HubSpot forms SDK and renders a form. Create a similar component (or reuse the existing one) with a **new HubSpot form ID** specifically for license inquiries.

**Mark needs to create this form in HubSpot** with these fields:

- First Name
- Last Name
- Email
- Phone
- State of Interest
- City / Region of Interest
- Available Investment Capital (dropdown range)
- Timeline to Start (dropdown)
- How did you hear about us? (dropdown)
- Message / Questions (textarea)

**Implementation:**

```tsx
"use client";

// Same pattern as existing HubSpotContactForm.tsx
// portalId: "245064716" (existing portal)
// formId: "[NEW-FORM-ID]" -- Mark creates this in HubSpot
// region: "na2"
```

**Section wrapper:**

```
id="inquiry-form" (for scroll-to targeting from CTAs)

Headline: "Ready to Build Your Memorial Business?"
Subheadline: "Fill out the form below and we'll send you everything you need
to make an informed decision. Or call us directly at (234) 269-5432."
```

**Action item for Mark:** Create the license inquiry form in HubSpot and share the form ID.

### 5.11 Bottom CTA (`LicenseBottomCTA.tsx` -- Server Component)

**Follow the existing Bottom CTA pattern from service pages.**

```
Background: muted (--muted token)
Headline: "Your Territory is Waiting"
Description: "Join the Reserve Memorials network and start building a meaningful
business helping families in your community."
CTA 1: "Request Information" -- scrolls to form
CTA 2: "Call (234) 269-5432" -- tel: link
```

---

## 6. Navigation Updates

### MarketingNav (`src/components/marketing/MarketingNav.tsx`)

Add to the main nav as a highlighted button (recommended):

```
Services (dropdown) | Blog | About | Contact (dropdown) | [Own a License] (accent button)
```

### MarketingFooter (`src/components/marketing/MarketingFooter.tsx`)

Add under "Explore" column:

```
Explore:
  Services
  Cemeteries we serve
  Blog
  FAQs
  License Opportunity   <-- NEW
```

### No Other Changes Needed

- `AppHeader.tsx` -- already renders MarketingNav for non-portal/admin routes
- `AppFooter.tsx` -- already visible for marketing routes
- `middleware.ts` -- no changes
- No layout.tsx changes

---

## 7. Components to Reuse (DO NOT Recreate)

| Component               | Location                                      | Use For                               |
| ----------------------- | --------------------------------------------- | ------------------------------------- |
| `FadeIn`                | `components/marketing/FadeIn.tsx`             | Scroll animations on every section    |
| `ParallaxSection`       | `components/marketing/ParallaxSection.tsx`    | Stats section background              |
| `HubSpotContactForm`    | `components/marketing/HubSpotContactForm.tsx` | Pattern for license form              |
| `Accordion`             | `components/ui/accordion.tsx`                 | FAQ section                           |
| `Card` + sub-components | `components/ui/card.tsx`                      | Value props, investment, testimonials |
| `Button`                | `components/ui/button.tsx`                    | All CTAs                              |
| `Badge`                 | `components/ui/badge.tsx`                     | Hero badge, step numbers              |
| `Dialog`                | `components/ui/dialog.tsx`                    | Video modal                           |
| `Separator`             | `components/ui/separator.tsx`                 | Section dividers                      |

### Styling Tokens (use existing, do not add new)

| Token                          | Use                                |
| ------------------------------ | ---------------------------------- |
| `--primary` (Deep Navy)        | Headings, primary CTAs             |
| `--accent` (Heritage Gold)     | Stat numbers, highlights           |
| `--evergreen` (Veterans Green) | Growth indicators                  |
| `--secondary` (Warm Sand)      | Card backgrounds                   |
| `--muted` (Soft Stone)         | Bottom CTA, FAQ section background |

### Fonts

- Headings: `var(--font-heading)` -- Cormorant Garamond
- Body: `var(--font-body)` -- Inter

---

## 8. SEO

### Internal Links (weave throughout content naturally)

| Anchor Text         | Link                      |
| ------------------- | ------------------------- |
| headstones          | `/traditional-headstones` |
| columbariums        | `/columbariums`           |
| veteran memorials   | `/veteran-memorials`      |
| statues             | `/statues`                |
| design consultation | `/design-consultation`    |
| dove release        | `/dove-release`           |
| grief coaching      | `/grief-coaching`         |
| services            | `/services`               |
| blog                | `/blog`                   |
| contact us          | `/contact-us`             |
| cemeteries we serve | `/cemeteries-we-serve`    |

### Schema Markup

Add **WebPage** + **FAQPage** JSON-LD for rich search results.

### Target Keywords

- Primary: "memorial business opportunity", "headstone business license", "monument business franchise"
- Secondary: "start a headstone business", "memorial franchise opportunity", "memorial company license"
- Long-tail: "how to start a memorial business", "low cost memorial franchise"
- Local: "memorial business opportunity Ohio"

---

## 9. Legal Considerations

### Franchise vs. License

Mark **MUST** consult a franchise attorney before launching. If the business model meets the FTC's franchise definition (brand + fee + significant control), it legally requires an FDD.

### Required Disclaimer

```
"This is not an offer to sell a franchise. A license offering can only be made through
proper legal documentation. Individual results vary. Reserve Memorials LLC reserves the
right to modify terms, availability, and program details at any time."
```

### Earnings Claims

- NO specific income claims
- Use "revenue potential" not guarantees

---

## 10. Content Needs from Mark

| Item                                  | Priority | Notes                                  |
| ------------------------------------- | -------- | -------------------------------------- |
| Hype/intro video                      | P0       | Mark is creating -- goes in `public/`  |
| License fee and investment details    | P0       | Investment section content             |
| Ongoing royalty/fee structure         | P0       | Investment section content             |
| HubSpot form ID for license inquiries | P0       | Mark creates new form in HubSpot       |
| Legal review (license vs franchise)   | P0       | Consult franchise attorney             |
| Promotional images (from emails)      | P1       | 1.png, 2.png, Dio Ad Barnabas 2025.png |
| Static fallback hero image            | P1       | For mobile / pre-video-load            |
| Mark's quote for testimonials         | P2       | Vision statement placeholder           |
| List of available states/territories  | P1       | Territory section content              |

---

## 11. Development Timeline

| Phase      | Tasks                                                                 | Duration |
| ---------- | --------------------------------------------------------------------- | -------- |
| **Week 1** | Page route + metadata, hero section, value prop grid                  | 3-4 days |
| **Week 2** | Industry stats (animated counters), license package, process timeline | 3-4 days |
| **Week 3** | Investment, territory, FAQ, testimonials, HubSpot form, nav updates   | 3-4 days |
| **Week 4** | Bottom CTA, SEO/schema, dark mode QA, responsive QA, client review    | 2-3 days |

**Total: 3-4 weeks**

---

## 12. QA Checklist

- [ ] Renders on desktop (1920, 1440, 1280px)
- [ ] Renders on tablet (768, 1024px)
- [ ] Renders on mobile (375, 390, 414px)
- [ ] Dark mode works on every section
- [ ] Video autoplays on desktop (muted, loop)
- [ ] Mobile shows static fallback image
- [ ] Dialog video modal opens and plays with controls
- [ ] All "Request Information" CTAs scroll to form
- [ ] HubSpot form loads and submits successfully
- [ ] All internal links work
- [ ] FAQ Accordion opens/closes
- [ ] FadeIn animations trigger on scroll
- [ ] Stat counters animate on scroll
- [ ] MarketingNav updated with new link
- [ ] MarketingFooter updated with new link
- [ ] Page metadata and OG tags correct
- [ ] JSON-LD validates in Rich Results Test
- [ ] LCP under 3 seconds
- [ ] No console errors
- [ ] Heading hierarchy correct (single h1)
- [ ] Alt text on all images
- [ ] Keyboard navigation works
- [ ] Legal disclaimers present
- [ ] Phone links work (`tel:+12342695432`)

---

## 13. Key Selling Points to Emphasize

| Factor         | Traditional Franchises     | Reserve Memorials License                            |
| -------------- | -------------------------- | ---------------------------------------------------- |
| Investment     | $100K - $5M+               | Fraction of the cost                                 |
| Storefront     | Required                   | Not required -- home office                          |
| Industry       | Food, fitness, retail      | Memorial services -- meaningful, recession-resistant |
| Technology     | Legacy systems             | Modern platform (portal, Stripe, lead routing)       |
| Overhead       | Rent, inventory, employees | Minimal -- HQ handles manufacturing                  |
| Demand         | Cyclical                   | Constant (steady death rate, aging population)       |
| Profit margins | 5-20% (food)               | ~60% (memorial industry)                             |

Three things to put front and center:

1. **Low barrier to entry** -- affordable, no storefront
2. **Modern technology** -- the existing platform is a real differentiator
3. **Meaningful work** -- helping families, not flipping burgers

---

## Appendix A: Reference Sites Mark Liked

1. https://www.theupsstorefranchise.com/ups-store-for-sale
2. https://franchise.anytimefitness.com/
3. https://www.culvers.com/franchise
4. https://www.servpro.com/franchise-ownership
5. https://franchise.greatclips.com/

## Appendix B: Email References

- "Websites with franchises" (Mar 29, 2026) -- 5 reference sites, wants hype video
- "Pages" (Mar 29, 2026) -- License page request, attachments
- "Marketing" (Feb 14, 2026) -- Marketing help for license opportunity
- "Design Program" (Mar 19, 2026) -- Prioritizing franchisees first

---

_Ready for Cursor / Claude Code. Pure frontend -- no backend changes. Build section by section._
