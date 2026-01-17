import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Palette,
  Phone,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";

export default function TraditionalHeadstonesPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.68_0.085_85_/_0.15),transparent)] blur-3xl animate-gentle-float" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Link
                href="/services"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to services
              </Link>
            </div>

            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Service
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Traditional Headstones and Cemetery Monuments
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Custom-designed upright monuments, flat markers, companion memorials, and family estates crafted in
              premium granite and marble. Personalized inscriptions, meaningful artwork, and expert guidance from design
              through installation.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/design-consultation">
                  Schedule consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact-us">Request a quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {MARKETING_CONTACT.phone}
                </a>
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-sm">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/traditional-headstone.png"
                alt="Traditional headstones and cemetery monuments"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent_65%)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Monument Types */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Monument options
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            From classic upright monuments to flat markers and custom family estates, each memorial is crafted with
            precision and care.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Shield className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Upright monuments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Classic standing monuments with custom shapes, polished finishes, and engraved inscriptions. Available
                in single, companion, and family sizes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Heart className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Flat markers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ground-level granite markers ideal for cemetery regulations requiring flush installations. Custom
                lettering, borders, and decorative elements.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Companion memorials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Double monuments for couples or family members. Balanced layouts with space for two or more names,
                dates, and personalized inscriptions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Palette className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Family estates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Large monuments for multiple family members. Custom designs with family names, individual markers, and
                meaningful symbols.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <Shield className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Slant markers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Angled face markers offering more engraving space than flat markers while maintaining a lower profile
                than upright monuments.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                <Heart className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Bevel markers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ground-level markers with a beveled edge, offering additional depth and visual interest while meeting
                cemetery requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Design Process */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155_/_0.12),transparent)] blur-3xl animate-gentle-float" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          <div className="space-y-3 text-center">
            <Badge variant="secondary" className="bg-evergreen/10 text-evergreen border-evergreen/20">
              Process
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              How the design process works
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold">
                1
              </div>
              <h3 className="text-lg font-semibold text-foreground">Consultation</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We discuss your vision, cemetery requirements, budget, and timeline. Bring photos, meaningful symbols,
                or ideas—we'll help refine them into a cohesive design.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold">
                2
              </div>
              <h3 className="text-lg font-semibold text-foreground">Design proof</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We create a detailed proof showing layout, lettering style, artwork, and finishes. Review at your own
                pace and request revisions as needed.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold">
                3
              </div>
              <h3 className="text-lg font-semibold text-foreground">Cemetery approval</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We handle cemetery paperwork, foundation requirements, and installation coordination. You'll know
                exactly what to expect and when.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold">
                4
              </div>
              <h3 className="text-lg font-semibold text-foreground">Installation</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Professional installation with proper foundation work, leveling, and cleanup. We coordinate timing and
                notify you when complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Common questions
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Answers to frequently asked questions about traditional headstones and cemetery monuments.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="timing" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              How long does it take to complete a headstone?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Most headstones take 8-12 weeks from design approval to installation. This includes fabrication time,
              cemetery approval, foundation work, and scheduling. Rush services may be available—contact us to discuss
              your timeline.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cemetery" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              What if my cemetery has specific requirements?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We're familiar with regulations at most Northeast Ohio cemeteries. During consultation, we review their
              rules for size, style, color, and foundation requirements, then design within those parameters. We handle
              all approval paperwork.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="materials" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              What materials and colors are available?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We work primarily with granite (gray, black, pink, red, blue varieties) and marble. During consultation,
              we show samples and discuss durability, appearance, and how different stones weather in Ohio's climate.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="personalization" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              Can I add photos, symbols, or custom artwork?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes. We offer ceramic photo portraits, laser-etched images, hand-carved symbols, religious emblems, and
              custom artwork. During design consultation, we'll show examples and discuss options that fit your vision
              and budget.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="existing" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              Can you add a name to an existing monument?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes. We provide engraving services for existing headstones, matching the original lettering style and
              ensuring proper placement. Contact us with details about the monument and what you'd like added.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl">
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ready to begin your design?
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Schedule a consultation to discuss your vision, review material samples, and create a memorial that
              honors your loved one with dignity and craftsmanship.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/design-consultation">
                  Schedule consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/gallery">View gallery</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

