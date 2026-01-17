import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Flag,
  Heart,
  Phone,
  Shield,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";

export default function VeteranMemorialsPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155_/_0.15),transparent)] blur-3xl animate-gentle-float" />

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

            <Badge variant="secondary" className="bg-evergreen/10 text-evergreen border-evergreen/20">
              Service
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Veteran Memorials
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Honor military service with precision-engraved emblems, rank insignia, and meaningful inscriptions. We handle
              VA paperwork, bronze plaques, and cemetery coordination with respect and attention to detail.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-evergreen hover:bg-evergreen/90">
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
                src="/veteran-memorials.png"
                alt="Veteran memorials"
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

      {/* Memorial Options */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Veteran memorial options
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Custom monuments with military emblems, government-issued markers, and bronze plaques to honor service.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-evergreen/20 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <Shield className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Custom veteran monuments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Upright or flat monuments with engraved branch emblems, rank insignia, service dates, and unit details.
                Available in granite with polished or natural finishes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-evergreen/20 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <Flag className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">VA-issued markers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Government-furnished headstones and markers provided at no cost to eligible veterans. We handle VA
                paperwork, ordering, and installation coordination.
              </p>
            </CardContent>
          </Card>

          <Card className="border-evergreen/20 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <Award className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Bronze plaques</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Durable cast bronze plaques with raised lettering, emblems, and military details. Ideal for flat markers,
                columbarium niches, or memorial benches.
              </p>
            </CardContent>
          </Card>

          <Card className="border-evergreen/20 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <Star className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Branch emblems</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Army, Navy, Air Force, Marines, Coast Guard, and Space Force emblems engraved with precision. Available in
                various sizes and finishes to match your design.
              </p>
            </CardContent>
          </Card>

          <Card className="border-evergreen/20 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Companion monuments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Double monuments for veteran and spouse with space for both names, dates, and optional military details.
                Balanced layouts that honor service and partnership.
              </p>
            </CardContent>
          </Card>

          <Card className="border-evergreen/20 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <Heart className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Personalized inscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Add rank, unit, service dates, medals, Purple Heart, Bronze Star, or other honors. We ensure accurate
                engraving of military details with respect and precision.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What We Handle */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.68_0.085_85_/_0.12),transparent)] blur-3xl animate-gentle-float" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          <div className="space-y-3 text-center">
            <Badge variant="secondary" className="bg-evergreen/10 text-evergreen border-evergreen/20">
              Support
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What we handle for you
            </h2>
            <p className="text-muted-foreground">
              We coordinate paperwork, approvals, and installation so you can focus on honoring your veteran's service.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-evergreen/10 text-evergreen border border-evergreen/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">VA paperwork and ordering</h3>
                <p className="text-sm text-muted-foreground">
                  We complete and submit VA Form 40-1330 for government-furnished markers, track approval status, and
                  coordinate delivery and installation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-evergreen/10 text-evergreen border border-evergreen/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Cemetery coordination</h3>
                <p className="text-sm text-muted-foreground">
                  We work with cemetery staff to verify plot location, foundation requirements, and installation schedules,
                  ensuring all regulations are met.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-evergreen/10 text-evergreen border border-evergreen/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Emblem accuracy</h3>
                <p className="text-sm text-muted-foreground">
                  We reference official military specifications for branch emblems, rank insignia, and unit symbols to
                  ensure accurate, respectful representation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-evergreen/10 text-evergreen border border-evergreen/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Foundation and installation</h3>
                <p className="text-sm text-muted-foreground">
                  Professional foundation work, leveling, and installation with cleanup. We notify you when complete and
                  provide final photos if requested.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            VA marker eligibility
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            The VA provides headstones and markers at no cost to eligible veterans and their families.
          </p>
        </div>

        <Card className="border-evergreen/20 shadow-sm">
          <CardContent className="p-8 sm:p-12 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-evergreen mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Veterans who served in the Armed Forces and were discharged under conditions other than dishonorable
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-evergreen mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Service members who died on active duty, active duty for training, or inactive duty training
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-evergreen mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Spouses and eligible dependents buried in national cemeteries or state veterans cemeteries
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-muted/40 p-6 border border-border/60">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> We help determine eligibility, gather required
                documentation (DD-214 or discharge papers), and submit applications on your behalf. Contact us to discuss
                your veteran's service and memorial options.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl">
        <Card className="border-evergreen/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Honor their service with dignity
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Schedule a consultation to discuss memorial options, VA benefits, and design details. We'll guide you
              through the process with respect and clarity.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-evergreen hover:bg-evergreen/90">
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

