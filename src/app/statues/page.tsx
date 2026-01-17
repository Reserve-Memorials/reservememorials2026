import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Church,
  Heart,
  Phone,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";

export default function StatuesPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.68_0.085_85/0.15),transparent)] blur-3xl animate-gentle-float" />

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
              Religious Statues and Memorial Sculptures
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Handcrafted religious statues, angels, and memorial sculptures for cemeteries, churches, and memorial
              gardens. Premium bronze and stone pieces from Timothy Schmalz and Abundant Blessings Statuary with expert
              installation and guidance.
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
            <div className="relative aspect-4/3 w-full">
              <Image
                src="/statues.png"
                alt="Religious statues and memorial sculptures"
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

      {/* Statue Types */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Statue and sculpture options
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            From guardian angels to sacred heart sculptures, we offer meaningful pieces that honor faith and memory.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Star className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Guardian angels</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Bronze and stone angel sculptures in various sizes for graveside placement. From small memorial angels
                to large guardian figures, crafted with dignity and grace.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Church className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Religious figures</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Mary, Jesus, Saints, and sacred figures for cemetery monuments, memorial gardens, and church grounds.
                Available in bronze with natural or applied patina finishes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Heart className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Sacred Heart sculptures</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Devotional sculptures depicting the Sacred Heart of Jesus, available in various sizes for cemetery
                placement or memorial chapels. Cast bronze with lasting durability.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                <Users className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Timothy Schmalz pieces</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Recognized contemporary Christian sculptures by renowned artist Timothy Schmalz. Powerful narrative
                pieces that invite contemplation and honor faith.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <Shield className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Memorial benches with statues</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Granite or bronze benches paired with angel or religious figures. A peaceful place for reflection while
                honoring your loved one with meaningful symbolism.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Custom installation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Professional foundation work, placement, and securing for long-term stability. We coordinate cemetery
                approvals and ensure proper installation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155/0.12),transparent)] blur-3xl animate-gentle-float" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          <div className="space-y-3 text-center">
            <Badge variant="secondary" className="bg-evergreen/10 text-evergreen border-evergreen/20">
              Featured
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Featured artists and collections
            </h2>
            <p className="text-muted-foreground">
              We work with renowned artists and statuary collections to bring meaningful, lasting pieces to your
              memorial.
            </p>
          </div>

          <div className="grid gap-8">
            <Card className="border-border/60 shadow-sm">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <Star className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">Timothy Schmalz</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Award-winning Canadian sculptor known for powerful contemporary Christian artwork. His pieces
                        include "Homeless Jesus," "Angels Unaware," and other narrative sculptures that invite
                        contemplation. We source and install Timothy Schmalz pieces for cemeteries, churches, and
                        memorial gardens.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-sm">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                      <Church className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">Abundant Blessings Statuary</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Premium religious statuary including angels, Mary, Jesus, and saints in bronze and stone. Hand-
                        finished pieces with attention to detail and lasting durability. We help you select appropriate
                        sizes and styles for cemetery placement and coordinate installation.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing and Guidance */}
      <section className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Pricing and selection guidance
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Transparent pricing and expert guidance to help you choose a piece that fits your vision and budget.
          </p>
        </div>

        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-8 sm:p-12 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Small memorial angels (12-18 inches)</p>
                  <p className="text-sm text-muted-foreground">
                    Starting at $800-$1,500 depending on material and detail. Ideal for headstone placement or small
                    memorial gardens.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Medium statues (24-36 inches)</p>
                  <p className="text-sm text-muted-foreground">
                    Typically $2,500-$5,000 for bronze or premium stone pieces. Suitable for family plots or memorial
                    benches.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Large guardian figures (4-6 feet)</p>
                  <p className="text-sm text-muted-foreground">
                    Range from $8,000-$20,000+ depending on size, artist, and complexity. Statement pieces for family
                    estates or memorial gardens.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Timothy Schmalz sculptures</p>
                  <p className="text-sm text-muted-foreground">
                    Pricing varies by piece and size. Contact us for availability and detailed quotes on specific works.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted/40 p-6 border border-border/60">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> All prices include professional consultation, cemetery
                coordination, foundation work, and installation. We'll help you select a piece that fits your budget,
                honors your vision, and meets cemetery regulations.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl">
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Find the right statue for your memorial
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Schedule a consultation to discuss statue options, review available pieces, and plan installation. We'll
              guide you through selection with care and clarity.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/design-consultation">
                  Schedule consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">All services</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

