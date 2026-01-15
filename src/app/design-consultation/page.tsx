import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Heart,
  MapPin,
  Palette,
  Phone,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CONTACT_PHONE = "(234) 269-5432";
const CONTACT_ADDRESS = "30 Ravenna Street, Hudson, Ohio 44236";

export default function DesignConsultationPage() {
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
            Memorial and Headstone Design Consultation in Hudson, Ohio
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Personalized guidance through materials, layout, inscriptions, cemetery rules, timeline, and budget. Schedule
            a consultation at our Hudson showroom or request a phone or video call to get started.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/contact-us">
                Schedule consultation
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

      {/* What We Cover */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What we cover during consultation
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A guided conversation to help you make informed decisions with clarity and confidence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Palette className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Style and design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Review monument styles, stone colors, finishes, and personalization options. We'll help narrow choices
                based on your vision and cemetery setting.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <FileText className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Inscriptions and artwork</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Discuss lettering styles, epitaphs, religious symbols, custom artwork, and ceramic photo portraits. We'll
                ensure balanced, meaningful layouts.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <MapPin className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Cemetery requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Review your cemetery's rules for size, style, color, and foundation requirements. We handle approvals and
                coordinate with cemetery staff.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <Clock className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Timeline and process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Understand fabrication time, cemetery approval windows, installation scheduling, and what happens at each
                step. No surprises.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Budget and pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Transparent pricing for monuments, engraving, foundations, and installation. We'll help you understand
                options within your budget.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Heart className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Personalization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Explore ways to honor your loved one's story—military service, faith, hobbies, quotes, or meaningful
                symbols that reflect their life.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What to Bring */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155_/_0.12),transparent)] blur-3xl animate-gentle-float" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          <div className="space-y-3 text-center">
            <Badge variant="secondary" className="bg-evergreen/10 text-evergreen border-evergreen/20">
              Preparation
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What to bring to your consultation
            </h2>
            <p className="text-muted-foreground">
              These items help us provide accurate guidance, but don't worry if you don't have everything.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Cemetery information</h3>
                <p className="text-sm text-muted-foreground">
                  Name and location of the cemetery, plot number if available, and any paperwork you received about
                  monument rules or restrictions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Design ideas</h3>
                <p className="text-sm text-muted-foreground">
                  Photos of monuments you like, meaningful symbols, quotes or verses you're considering, and any artwork
                  or lettering styles that resonate with you.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Personal details</h3>
                <p className="text-sm text-muted-foreground">
                  Full name, birth and death dates, military service details (if applicable), and any other information
                  you'd like included on the memorial.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Budget range</h3>
                <p className="text-sm text-muted-foreground">
                  Having a general budget in mind helps us focus on options that fit your needs. We offer monuments at
                  various price points with transparent pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Formats */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Consultation formats
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Choose the format that works best for you and your family.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <MapPin className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">In-person at our showroom</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Visit our Hudson showroom to see stone samples, monument styles, and lettering options in person. Meet in
                our comfortable consultation space designed for ease and clarity.
              </p>
              <div className="space-y-1 text-sm">
                <p className="font-medium text-foreground">Location:</p>
                <p className="text-muted-foreground">{CONTACT_ADDRESS}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <Phone className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Phone consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Discuss your needs, timeline, and budget over the phone. We'll follow up with photos, samples by mail,
                and design proofs via email to keep the process moving.
              </p>
              <div className="space-y-1 text-sm">
                <p className="font-medium text-foreground">Call us:</p>
                <a href={`tel:${CONTACT_PHONE.replace(/[^0-9]/g, "")}`} className="text-primary hover:underline">
                  {CONTACT_PHONE}
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                <Users className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Video consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Connect via video call to review designs, samples, and options together. Ideal for families coordinating
                from different locations or with limited travel availability.
              </p>
              <div className="space-y-1 text-sm">
                <p className="font-medium text-foreground">Schedule a video call</p>
                <Link href="/contact-us" className="text-primary hover:underline">
                  Request via contact form
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl">
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ready to schedule your consultation?
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Contact us to set up an in-person, phone, or video consultation at a time that works for you. No pressure,
              just clear guidance and compassionate support.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact-us">
                  Schedule now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">View all services</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

