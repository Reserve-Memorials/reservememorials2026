import Link from "next/link";
import {
  ArrowRight,
  Book,
  CheckCircle2,
  Heart,
  Phone,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CONTACT_PHONE = "(234) 269-5432";

export default function GriefCoachingPage() {
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
            Support
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Grief Support and Resources
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Compassionate support for families navigating loss. Practical resources, guidance, and connection to help
            you process grief at your own pace with dignity and care.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/contact-us">
                Request support
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

      {/* Support Options */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            How we support you
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Gentle guidance and practical resources to help you navigate grief with support and clarity.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Heart className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Compassionate listening</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A safe space to talk about your loss, share memories, and process emotions without judgment or pressure.
                We meet you where you are.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Book className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Practical resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Guidance on navigating practical matters after loss—paperwork, memorial planning, and support options
                available in our community.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Users className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Connection to support groups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We can connect you with local grief support groups, counselors, and community resources if you'd like
                additional support.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Memorial planning support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Help thinking through how you'd like to honor your loved one—whether through a headstone, memorial
                service, or other meaningful tribute.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen border border-evergreen/20">
                <Heart className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Flexible, at your pace</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Grief doesn't follow a timeline. We're available when you're ready—whether that's immediately or months
                later. No pressure, just support.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Phone className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Phone and in-person options</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Connect by phone, video call, or meet in person at our Hudson office. Choose the format that feels most
                comfortable for you.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Note */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155_/_0.12),transparent)] blur-3xl animate-gentle-float" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6">
          <div className="space-y-3 text-center">
            <Badge variant="secondary" className="bg-evergreen/10 text-evergreen border-evergreen/20">
              Important
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Our approach to grief support
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground text-center max-w-2xl mx-auto">
              We offer compassionate listening, practical guidance, and connections to community resources. While we're
              here to support you through the memorial planning process and beyond, we are not licensed therapists or
              clinical counselors.
            </p>

            <Card className="border-border/60 shadow-sm bg-muted/20">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">What we provide</p>
                    <p className="text-sm text-muted-foreground">
                      Supportive conversations, memorial planning guidance, practical resources for navigating loss, and
                      connections to local grief support groups and professional counselors in our community.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 shrink-0 text-evergreen mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Professional counseling referrals</p>
                    <p className="text-sm text-muted-foreground">
                      For clinical grief therapy or professional mental health support, we can connect you with licensed
                      counselors, therapists, and support groups in Northeast Ohio who specialize in grief and loss.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Crisis support</p>
                    <p className="text-sm text-muted-foreground">
                      If you or someone you know is in crisis, please call the 988 Suicide & Crisis Lifeline (available
                      24/7) by dialing <strong className="text-foreground">988</strong>, or text "HELLO" to{" "}
                      <strong className="text-foreground">741741</strong> for the Crisis Text Line.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Families Say */}
      <section className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            How we help families
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Real stories from families we've supported through loss and memorial planning.
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="border-border/60 shadow-sm">
            <CardContent className="p-8">
              <p className="text-sm leading-relaxed text-muted-foreground italic">
                "After losing my husband, I felt overwhelmed by all the decisions. Mike and his team helped me think
                through what would honor him best, and they never rushed me. I appreciated having someone who listened
                and understood."
              </p>
              <p className="mt-4 text-xs font-medium text-foreground">— Sarah M., Hudson</p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm">
            <CardContent className="p-8">
              <p className="text-sm leading-relaxed text-muted-foreground italic">
                "We didn't know where to start with memorial planning. They walked us through everything with patience
                and compassion, and connected us with a grief support group that really helped our family."
              </p>
              <p className="mt-4 text-xs font-medium text-foreground">— The Johnson Family, Akron</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl">
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              We're here when you're ready
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Reach out for support, memorial planning guidance, or just to talk. We'll meet you where you are with
              compassion and care.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact-us">
                  Contact us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${CONTACT_PHONE.replace(/[^0-9]/g, "")}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call now
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

