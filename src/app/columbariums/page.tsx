import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Layers,
  Phone,
  Ruler,
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

const CONTACT_PHONE = "(234) 269-5432";

export default function ColumbariumsPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.68_0.085_85_/_0.15),transparent)] blur-3xl animate-gentle-float" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6">
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
            Custom Columbariums and Cremation Memorials
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Design and construction of custom columbarium structures for churches, cemeteries, and memorial gardens.
            Timeless stone craftsmanship with niche personalization, engraving, and compassionate guidance through the
            planning process.
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
              <a href={`tel:${CONTACT_PHONE.replace(/[^0-9]/g, "")}`}>
                <Phone className="mr-2 h-4 w-4" />
                {CONTACT_PHONE}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Columbarium Types */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Columbarium options
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            From individual niche memorials to full columbarium structures for churches and cemeteries.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Building2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Freestanding columbariums</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Custom structures designed for outdoor memorial gardens or cemetery settings. Available in granite with
                multiple niche configurations and personalized engraving.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Layers className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Indoor columbarium walls</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Wall-mounted niche systems for churches, chapels, and indoor memorial spaces. Elegant designs with glass
                fronts, granite facings, and custom lighting options.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Shield className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Individual niches</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Single or companion niches for families seeking a dignified cremation memorial. Engraved granite fronts
                with custom inscriptions, artwork, and personalization.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                <Ruler className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Custom memorial gardens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Complete memorial garden design with columbarium structures, benches, pathways, and landscaping. Ideal for
                churches and cemeteries expanding cremation options.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Niche personalization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Add names, dates, inscriptions, religious symbols, and ceramic photos to individual niches. Options for
                glass, granite, or bronze fronts with various finishes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <Building2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Church columbariums</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Indoor columbarium systems designed for congregational use. We guide planning, fundraising considerations,
                and installation coordination with sensitivity and care.
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
              Planning your columbarium project
            </h2>
            <p className="text-muted-foreground">
              From concept to installation, we guide you through each step with clarity and care.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold">
                1
              </div>
              <h3 className="text-lg font-semibold text-foreground">Consultation and site review</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We discuss your vision, capacity needs, budget, and site requirements. For churches and cemeteries, we
                review space, zoning, and community considerations.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold">
                2
              </div>
              <h3 className="text-lg font-semibold text-foreground">Custom design and layout</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We create detailed drawings showing niche configuration, materials, engraving options, and overall design.
                Review and request changes as needed.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold">
                3
              </div>
              <h3 className="text-lg font-semibold text-foreground">Approval and fabrication</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Once approved, we begin fabrication using premium granite and durable construction methods. We keep you
                updated on progress and timeline.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold">
                4
              </div>
              <h3 className="text-lg font-semibold text-foreground">Installation and dedication</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Professional installation with proper foundations, leveling, and finishing. We coordinate timing for
                dedication services if desired.
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
            Answers to frequently asked questions about columbarium planning and niche options.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="timing" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              How long does a columbarium project take?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Small projects (individual niches or small walls) typically take 8-12 weeks from design approval to
              installation. Larger freestanding structures or memorial gardens may take 3-6 months depending on size,
              complexity, and site preparation requirements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="capacity" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              How many niches should we plan for?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              For churches, we typically recommend planning for 10-20% of your congregation size, with room for future
              expansion. For cemeteries, capacity depends on available space and projected cremation trends. We'll help
              you analyze your needs during consultation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="indoor-outdoor" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              What's the difference between indoor and outdoor columbariums?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Indoor columbariums are typically wall-mounted with glass fronts and can include lighting and climate
              control. Outdoor structures are freestanding with weatherproof granite construction and sealed niches.
              Both offer personalization options—the choice depends on your space and preferences.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="personalization" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              Can niches be personalized later?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes. Niche fronts can be engraved with names, dates, inscriptions, and artwork when purchased or at a
              later date. We can also add ceramic photo portraits, religious symbols, or custom designs to personalize
              individual niches.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cost" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              What affects columbarium pricing?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Size (number of niches), materials (granite type and finish), location (indoor vs. outdoor), site
              preparation, foundation requirements, and customization level. We provide transparent pricing and help you
              find options within your budget during consultation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl">
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Start planning your columbarium project
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Schedule a consultation to discuss capacity needs, design options, site requirements, and timeline. We'll
              guide you through the process with clarity and care.
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

