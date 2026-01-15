import Link from "next/link";
import {
  ArrowRight,
  Bird,
  Calendar,
  CheckCircle2,
  Cloud,
  Heart,
  MapPin,
  Phone,
  Users,
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

export default function DoveReleasePage() {
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
            White Dove Release for Memorial Services
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A peaceful, symbolic moment to honor life and mark a meaningful transition during funerals, memorial
            services, and celebrations of life. Professional care and coordination for a dignified, memorable tribute.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/contact-us">
                Book a dove release
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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

      {/* Release Options */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Dove release options
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Choose a release format that fits your service and honors your loved one with grace.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Bird className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Single dove release</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                One white dove released to symbolize the spirit's journey and peaceful transition. A simple, dignified
                moment appropriate for graveside services.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Users className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Pair release</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Two doves released together to honor lifelong partnerships, deep bonds, or companionship. Symbolizes
                unity and enduring connection.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Heart className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Flock release</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Multiple doves released simultaneously to represent family, community, or a larger gathering. Creates a
                striking visual moment of collective remembrance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                <Cloud className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Family participation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Family members hold and release individual doves together. A personal, hands-on moment that allows
                everyone to participate in the tribute.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <MapPin className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Graveside release</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Coordinated release at the cemetery during burial or interment services. We work with funeral directors
                and cemetery staff for seamless timing.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Calendar className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Memorial service release</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Release at church, funeral home, or outdoor memorial locations. We coordinate with your service provider
                to ensure proper timing and setting.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What We Handle */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155_/_0.12),transparent)] blur-3xl animate-gentle-float" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          <div className="space-y-3 text-center">
            <Badge variant="secondary" className="bg-evergreen/10 text-evergreen border-evergreen/20">
              Coordination
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What we handle for you
            </h2>
            <p className="text-muted-foreground">
              Professional care and coordination so your dove release moment feels calm and intentional.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Timing coordination</h3>
                <p className="text-sm text-muted-foreground">
                  We work with your funeral director, officiant, or service coordinator to schedule the release at the
                  right moment during your service.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Weather assessment</h3>
                <p className="text-sm text-muted-foreground">
                  We monitor weather conditions and advise on timing to ensure a safe, successful release. If conditions
                  aren't suitable, we'll discuss alternatives.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Professional presentation</h3>
                <p className="text-sm text-muted-foreground">
                  Doves arrive in clean, elegant carriers. We handle setup, positioning, and release execution with
                  respect and care for a dignified presentation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Family guidance</h3>
                <p className="text-sm text-muted-foreground">
                  If family members are participating in the release, we provide clear instructions and support to ensure
                  everyone feels comfortable and confident.
                </p>
              </div>
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
            Answers to frequently asked questions about dove releases for memorial services.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="care" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              How are the doves cared for?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Our doves are homing pigeons trained to return safely to their loft after release. They're well-cared for,
              healthy, and trained specifically for memorial services. After release, they fly home where they're fed,
              sheltered, and cared for professionally.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="weather" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              What happens if the weather is bad?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Dove releases require suitable weather for the birds' safety. If conditions (rain, high winds, extreme
              cold) aren't appropriate on your service date, we'll discuss rescheduling or alternative options. We
              monitor forecasts and communicate proactively.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="locations" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              Where can dove releases take place?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Releases work well at cemeteries, churches, funeral homes, outdoor memorial locations, and private
              residences with open space. We'll verify the location is suitable and coordinate with your service provider
              or cemetery staff.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="timing" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              How much advance notice do you need?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We recommend booking as soon as your service date is confirmed, ideally 1-2 weeks in advance. We
              understand memorial services sometimes require quick planning—contact us and we'll do our best to
              accommodate your timeline.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cost" className="border border-border/60 rounded-lg px-6 shadow-sm">
            <AccordionTrigger className="text-left hover:no-underline">
              What is included in the service?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Service includes dove transportation, professional handlers, setup, timing coordination with your service
              provider, release execution, and cleanup. Pricing varies based on release type (single, pair, or flock) and
              location. Contact us for a detailed quote.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl">
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Book a dove release for your service
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Contact us to schedule a dove release, discuss timing, and coordinate with your funeral director or service
              provider. We'll handle the details with care and respect.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact-us">
                  Book now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${CONTACT_PHONE.replace(/[^0-9]/g, "")}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call us
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

