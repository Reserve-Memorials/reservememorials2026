# PRD: License Opportunity Page Content Update

**Page:** `/license-opportunity`
**Type:** Content update only. No new components, no backend changes, no Supabase work, no HubSpot changes.
**Status:** Existing page is built and live. Only copy and a few new content sections are required.
**Source of truth:** `blueprint.md` for conventions and patterns. Mirror the existing page structure.
**Origin:** All copy below is taken from Mark Loboda's email titled "License Page" sent May 1, 2026.

---

## Context

Mark has approved publishing full license sales copy and is making the $25,000 license fee public for the first time. Until now the page showed "Contact for Details" for every financial number. The other three financial fields (Estimated Total Startup, Ongoing Royalty, Marketing Contribution) stay as "Contact for Details" because Mark did not provide those numbers.

Six new prose sections need to be added. The existing hero, value cards copy, investment block, and FAQ accordion all need to be updated. Section ordering and visual structure of the existing page should be preserved as much as possible.

---

## Existing page sections (do not rebuild, only update)

1. Hero with `license-hype.mp4` background video
2. Value props grid (6 cards)
3. Industry Opportunity stats block ($0.0B placeholders)
4. Process (4 steps)
5. Investment block
6. Territories
7. Founder quote
8. FAQs accordion (titles only, no answers)
9. CTA + inquiry form

---

## Required updates

### 1. Hero copy

Replace the existing hero copy with:

- **Eyebrow (top of hero, above H1):** `130,000+ deaths annually in Ohio. Less than 100 monument companies. Hmmm?`
- **H1:** `Become a Reserve Memorials License Owner`
- **Subhead:** `A meaningful business opportunity in a timeless industry.`
- **Lede line (one line below subhead):** `Start a compassionate, community-based memorial business with Reserve Memorials.`
- **Buttons:** Keep existing "Request Information" and "Watch Our Story"
- **Trust strip:** Keep existing "Proven brand / Meaningful work / Exclusive territories"

Style note for the eyebrow: render this prominently, not as small label text. It is the page hook. Larger weight, slightly muted color so it sits visually above the H1 without overpowering it.

---

### 2. Value props grid (6 cards)

Replace the existing 6 cards (Proven Brand, Low Overhead, Turnkey Support, Growing Market, Exclusive Territory, Training and Mentorship) with these 6 exactly as Mark wrote them. Keep them as label-only cards. Do not add body descriptions.

Section heading: `A smarter path to business ownership`

The six cards (in this order):

1. Training included.
2. No heavy lifting. Ever.
3. Substantial opportunity.
4. Vetted engravers and installers ready to work for you.
5. Sales driven to you through this website.
6. Your hometown territory.

Reuse existing card image assets (`license-value-*.jpg`). Reassign images to whichever card fits visually. No new images required.

---

### 3. NEW SECTION: About Reserve Memorials

Insert a short prose section directly after the value cards and before the Industry Opportunity stats block.

Heading: `About Reserve Memorials`

Body (single paragraph, exact copy):

> Reserve Memorials is a modern memorial company built to help families plan headstones, monuments, columbariums, veteran memorials, statues, and design consultations with clarity and care. Based in Hudson, Ohio, our model combines personal service, premium craftsmanship, cemetery coordination, and guided design support.

Layout: centered prose, max-width container, padding consistent with other prose blocks on the site.

---

### 4. Investment block (publish actual numbers)

Update the existing Investment section.

- **License Fee:** `$25,000` (replace "Contact for Details")
- **Estimated Total Startup:** `Contact for Details` (unchanged)
- **Ongoing Royalty:** `Contact for Details` (unchanged)
- **Marketing Contribution:** `Contact for Details` (unchanged)

Replace the supporting paragraph below the figures with this exact copy:

> This license gives the right person an opportunity to enter a respected, need-based industry with a trusted brand, proven presentation approach, and support system designed around service, dignity, and family guidance.

Keep the existing four "Why licensees choose us" bullets unchanged.

Keep the existing legal disclaimer unchanged: "This is not an offer to sell a franchise. A license offering can only be made through proper legal documentation. Individual results vary. Reserve Memorials LLC reserves the right to modify terms, availability, and program details at any time."

---

### 5. NEW SECTION: Why This Is a Viable Business

Add a new prose section after the Investment block and before Territories.

Heading: `Why This Is a Viable Business`

Body (two paragraphs, exact copy):

> Every year, thousands of Ohio families face the responsibility of choosing a permanent memorial. Many are overwhelmed by cemetery rules, design choices, timelines, and pricing. Reserve Memorials gives licensees a clear way to serve those families with compassion and professionalism.

> Unlike many businesses that depend on trends, the memorial industry serves a permanent human need: honoring life, preserving legacy, and helping families make lasting decisions.

Layout: centered prose block, consistent with the About Reserve Memorials section.

---

### 6. NEW SECTION: What Makes Reserve Memorials Unique

Add directly after "Why This Is a Viable Business."

Heading: `What Makes Reserve Memorials Unique`
Subhead (italic or muted): `Reserve Memorials is not built around pressure selling. It is built around conversation.`

Render four feature blocks (icon + title + description). Mirror the visual pattern of the existing 6 value cards but use a 4-column grid (or 2x2 on smaller breakpoints).

1. **Guidance, not pressure**
   Families are helped through a thoughtful process, not pushed into a decision.

2. **The "Rocking Chair Remedy" experience**
   Reserve Memorials uses a warm consultation setting designed for comfort and conversation instead of a cold sales desk.

3. **Full-service support**
   Families receive help with design, cemetery approval, foundation planning, and installation coordination.

4. **Multiple product categories**
   Traditional headstones, columbariums, veteran memorials, statues, dove release, grief coaching, and accessories create multiple ways to serve families.

Use Lucide React icons that fit each item (e.g. `HandHeart`, `Sofa`/`Armchair`, `Wrench`, `LayoutGrid`).

---

### 7. NEW SECTION: Income Potential and Business Model

Add directly after "What Makes Reserve Memorials Unique."

Heading: `Income Potential and Business Model`
Lead-in line: `A Reserve Memorials licensee can generate revenue through:`

Render the following 10 revenue streams as a clean grid (3 columns on desktop, 2 on tablet, 1 on mobile). Use a checkmark icon or pill style consistent with the rest of the site.

- Single monuments
- Companion monuments
- Flat markers
- Slant markers
- Benches
- Cremation memorials and columbariums
- Veteran memorials
- Custom statues
- Design consultation services
- Accessories and add-on memorial products

Closing line below the grid (exact copy):

> With many monument purchases ranging from several thousand dollars to $10,000+ for custom work, the business model allows for meaningful revenue per family served.

---

### 8. NEW SECTION: Why Choose Reserve Memorials Over Other Opportunities

Add directly after "Income Potential and Business Model."

Heading: `Why Choose Reserve Memorials Over Other Opportunities`

Body (exact copy):

> This is not a fad business. It is a relationship business.

> Reserve Memorials offers a chance to build a respected local company around trust, service, craftsmanship, and legacy. The industry is fragmented, which gives a thoughtful operator room to stand out with better communication, stronger presentation, and a more compassionate customer experience.

Layout: centered prose block.

---

### 9. NEW SECTION: The Uniqueness of the Memorial Industry

Add directly after "Why Choose Reserve Memorials Over Other Opportunities."

Heading: `The Uniqueness of the Memorial Industry`

Body (exact copy):

> Few businesses matter at such an important moment in a family's life.

> A memorial is not simply a product. It is a permanent tribute. Families need someone who can listen, guide, simplify the process, and help them make a decision they will feel good about for generations.

Layout: centered prose block.

---

### 10. CTA section update

Replace the existing "Ready to Build Your Memorial Business?" heading and copy directly above the inquiry form with:

- **H2:** `Interested in owning a Reserve Memorials license?`
- **Subhead:** `Schedule a confidential conversation to learn whether this opportunity is the right fit for your market.`

Keep the form, the phone CTA, and the "Your Territory is Waiting" closing card unchanged.

---

### 11. FAQ accordion (populate answers)

Update the FAQ accordion with the following question-answer pairs. Answers are derived directly from Mark's email content. Keep the existing question order and accordion component.

- **What is a Reserve Memorials license?**
  A Reserve Memorials license gives you the right to operate a memorial business in a protected territory under the Reserve Memorials brand, with full access to our supplier network, training, and inbound leads from reservememorials.com.

- **Do I need experience in the memorial industry?**
  No. Comprehensive training is included. We cover memorial design, cemetery regulations, sales, and customer service so you can serve families with confidence from day one.

- **Do I need a storefront or showroom?**
  No. The license is built to operate without retail space. No heavy lifting, no inventory.

- **How much does it cost?**
  The license fee is $25,000. Additional startup, royalty, and marketing details are shared during your discovery call.

- **What territory sizes are available?**
  Each licensee receives a protected geographic territory defined by ZIP codes. Specific size and boundaries are confirmed during the discovery call.

- **How does the business model work?**
  You serve families in your hometown territory. We coordinate vetted engravers and installers, supplier relationships, and lead generation through reservememorials.com. You focus on guidance and family service.

- **What technology do I get?**
  Full access to the Reserve Memorials platform, brand assets, and the lead capture and management tools used at HQ.

- **Is this a franchise or a license?**
  This is a license, not a franchise. A license offering can only be made through proper legal documentation, which is shared during the review and agreement step.

- **What states are available?**
  Ohio territories are available now. We are expanding nationwide.

- **Can I own multiple territories?**
  Multiple-territory ownership is discussed case by case during the discovery process.

- **What products can I sell?**
  Single monuments, companion monuments, flat markers, slant markers, benches, cremation memorials and columbariums, veteran memorials, custom statues, design consultation services, and accessories.

---

### 12. Asset placement

Mark attached an image: `Dio Ad Barnabas 2025.png`.

- Save to `/public/license/dio-ad-barnabas-2025.png`
- Use it as a supporting visual inside the "About Reserve Memorials" section, treated as a styled image card with caption "From Reserve Memorials"
- If it does not fit visually in About Reserve Memorials, place it inside "What Makes Reserve Memorials Unique" instead
- Use Next.js `<Image>` component with appropriate `width`, `height`, and `alt` attributes per blueprint conventions

---

## Final page section ordering

After all updates, the page should flow in this order:

1. Hero (updated copy)
2. Value props grid (6 cards, updated copy)
3. About Reserve Memorials (NEW)
4. Industry Opportunity stats block (unchanged)
5. Process (unchanged)
6. Investment block (numbers published)
7. Why This Is a Viable Business (NEW)
8. What Makes Reserve Memorials Unique (NEW)
9. Income Potential and Business Model (NEW)
10. Why Choose Reserve Memorials Over Other Opportunities (NEW)
11. The Uniqueness of the Memorial Industry (NEW)
12. Territories (unchanged)
13. Founder quote (unchanged)
14. FAQs (answers populated)
15. CTA + inquiry form (heading and subhead updated)

---

## Implementation notes

- Read `blueprint.md` first to confirm conventions before writing any code
- The page lives in the existing Next.js App Router structure; edit the existing page file rather than creating new routes
- Mirror existing component primitives (cards, prose blocks, stat callouts, accordion). Do not introduce new component patterns if existing ones cover the use case
- Follow existing Framer Motion animation patterns for all new sections (fade-up on scroll, stagger children where appropriate)
- Use Tailwind CSS v4 utility classes consistent with the rest of the site
- All new images use Next.js `<Image>` component, no `<img>` tags
- No backend, Supabase, or HubSpot changes
- Keep the existing inquiry form and HubSpot embed exactly as is
- Verify dark mode styling on every new section
- Run `pnpm build` (or whichever script is in `package.json`) to confirm no type errors before finishing

---

## Acceptance criteria

- All copy on the page matches this PRD verbatim where exact copy is given
- License fee `$25,000` is visible publicly on the Investment block
- All six new prose sections are present and in the correct order
- FAQ accordion shows answers, not just questions
- No console errors, no build errors
- Dark mode works on all new sections
- Page passes Lighthouse accessibility audit at the same level as the rest of the site
