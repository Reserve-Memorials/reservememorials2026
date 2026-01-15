import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  GalleryHorizontal,
  Gem,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Users,
  Award,
  Clock,
  Palette,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PORTAL_URL = "https://portal.reservememorials.com";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-xl backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-chart-3),transparent_50%)]/[20] animate-pulse-glow" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_45%)]/[18] animate-pulse-glow" />
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,var(--color-primary),transparent_50%)]/[28] blur-3xl animate-float" />
        <div className="absolute -left-32 -bottom-32 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,var(--color-chart-4),transparent_50%)]/[24] blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Badge className="w-fit bg-gradient-to-r from-primary to-chart-3 text-primary-foreground shadow-lg" variant="secondary">
              <Sparkles className="mr-1 h-3 w-3" />
              ReserveMemorials.com
            </Badge>
            <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-primary via-chart-3 to-chart-4 bg-clip-text text-transparent animate-gradient">
                Beautiful memorials
              </span>
              , designed with clarity — crafted with care.
            </h1>
            <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg leading-relaxed">
              We help families and communities create timeless memorials through a guided design
              experience, transparent timelines, and local service. Every memorial tells a story of love,
              remembrance, and lasting legacy.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-chart-3 hover:shadow-xl transition-all">
                <a href={`${PORTAL_URL}/design`}>
                  Start your design
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="group border-primary/30 hover:border-primary/60 hover:bg-primary/5">
                <Link href="/contact-us">
                  Talk to an advisor
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <Pill icon={<ShieldCheck className="h-3.5 w-3.5" />} text="Clear guidance" />
              <Pill icon={<Timer className="h-3.5 w-3.5" />} text="Fast turnaround" />
              <Pill icon={<Gem className="h-3.5 w-3.5" />} text="Premium materials" />
              <Pill icon={<Heart className="h-3.5 w-3.5" />} text="Compassionate service" />
            </div>
          </div>

          <Card className="relative overflow-hidden border-primary/20 bg-background/80 backdrop-blur-xl shadow-2xl">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-chart-3),transparent_50%)]/[18] animate-pulse-glow" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_50%)]/[15] animate-pulse-glow" style={{ animationDelay: '2s' }} />
            <CardHeader className="space-y-2">
              <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                <Sparkles className="h-4 w-4" />
                What you get
              </div>
              <CardTitle className="text-xl">A guided, modern experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FeatureRow
                icon={<Palette className="h-4 w-4 text-chart-3" />}
                title="Design review"
                desc="We help you choose style, materials, and layout with confidence."
              />
              <FeatureRow
                icon={<MapPin className="h-4 w-4 text-chart-2" />}
                title="Local coordination"
                desc="We coordinate with your local team for measurements and installation."
              />
              <FeatureRow
                icon={<Clock className="h-4 w-4 text-chart-4" />}
                title="Reliable updates"
                desc="Clear milestones so you always know what's next."
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Users className="h-5 w-5" />} value="1,200+" label="Families served" color="primary" />
        <StatCard icon={<Star className="h-5 w-5" />} value="4.9/5" label="Average rating" color="chart-4" />
        <StatCard icon={<Award className="h-5 w-5" />} value="15+ years" label="Experience" color="chart-3" />
        <StatCard icon={<Heart className="h-5 w-5" />} value="100%" label="Satisfaction" color="chart-5" />
      </section>

      {/* Services preview */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-2">
            <div className="text-sm font-medium text-primary">Services</div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Memorials made to last
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              From classic headstones to custom columbariums, we create lasting tributes with care and precision.
            </p>
          </div>
          <Button asChild variant="outline" className="group border-primary/30 hover:border-primary/60">
            <Link href="/services">
              View all services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <MarketingCard
            icon={<Gem className="h-5 w-5" />}
            title="Traditional headstones"
            description="Classic upright and flat markers in premium stone, beautifully engraved with lasting craftsmanship."
            href="/traditional-headstones"
            color="primary"
          />
          <MarketingCard
            icon={<Sparkles className="h-5 w-5" />}
            title="Columbariums"
            description="Elegant, durable spaces for remembrance and community. Custom-designed for churches and cemeteries."
            href="/columbariums"
            color="chart-3"
          />
          <MarketingCard
            icon={<BadgeCheck className="h-5 w-5" />}
            title="Veteran memorials"
            description="Honor service with respectful designs, military emblems, and precise attention to detail."
            href="/veteran-memorials"
            color="chart-4"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-sm font-medium text-primary">Testimonials</div>
          <h2 className="text-3xl font-bold tracking-tight">What families are saying</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            We're honored to help families create meaningful memorials during difficult times.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <TestimonialCard
            quote="The team made a difficult process so much easier. They listened to our story and created something truly beautiful for my father."
            author="Sarah M."
            location="Hudson, OH"
          />
          <TestimonialCard
            quote="Professional, compassionate, and incredibly skilled. The columbarium they designed for our church is stunning and exactly what we envisioned."
            author="Pastor James R."
            location="Cleveland, OH"
          />
          <TestimonialCard
            quote="From consultation to installation, everything was handled with care and precision. The memorial for my husband is perfect."
            author="Margaret K."
            location="Akron, OH"
          />
        </div>
      </section>

      {/* Gallery + Blog teaser */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="group relative overflow-hidden border-primary/20 bg-gradient-to-br from-card to-chart-2/5 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-2xl">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,var(--color-chart-2),transparent_50%)]/[20]" />
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_50%)]/[15]" />
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-chart-2 font-medium">
              <GalleryHorizontal className="h-4 w-4" />
              Gallery
            </div>
            <CardTitle className="text-xl">Explore recent work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A curated selection of styles, materials, and finishes — with real examples from families we've served.
            </p>
            <Button asChild variant="ghost" className="px-0 text-chart-2 hover:text-chart-2/80">
              <Link href="/gallery" className="group/link">
                Browse the gallery
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-primary/20 bg-gradient-to-br from-card to-chart-4/5 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-2xl">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,var(--color-chart-4),transparent_50%)]/[20]" />
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-primary),transparent_50%)]/[15]" />
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-chart-4 font-medium">
              <BookOpen className="h-4 w-4" />
              Blog
            </div>
            <CardTitle className="text-xl">Guides & planning tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Clear articles on design choices, memorial planning, timelines, and what to expect throughout the process.
            </p>
            <Button asChild variant="ghost" className="px-0 text-chart-4 hover:text-chart-4/80">
              <Link href="/blog" className="group/link">
                Read the blog
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-chart-3/5 p-8 shadow-xl backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-primary),transparent_50%)]/[18] animate-pulse-glow" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-chart-3),transparent_50%)]/[18] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="text-sm font-medium text-primary">Ready when you are</div>
            <h2 className="text-3xl font-bold tracking-tight">
              Start your design — we'll guide the rest.
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
              Begin with a few details. We'll route you to the right team and help you move forward confidently.
              Our consultation process is designed to be clear, compassionate, and comprehensive.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-chart-3 hover:shadow-xl">
              <a href={`${PORTAL_URL}/design`}>
                Start your design
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30">
              <Link href="/contact-us">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-background/80 to-primary/5 px-3 py-1.5 backdrop-blur-sm shadow-sm">
      <span className="text-primary">{icon}</span>
      <span className="text-foreground font-medium">{text}</span>
    </span>
  );
}

function FeatureRow({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-gradient-to-br from-muted/30 to-transparent p-3 transition-all hover:border-primary/30 hover:bg-muted/40">
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary ring-1 ring-border/50 shadow-sm">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

function MarketingCard({
  icon,
  title,
  description,
  href,
  color = "primary",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color?: string;
}) {
  return (
    <Link href={href}>
      <Card className="group relative h-full overflow-hidden border-primary/20 bg-gradient-to-br from-card to-transparent backdrop-blur transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-primary/40">
        <div className={`pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,var(--color-${color}),transparent_50%)]/[18]`} />
        <CardHeader className="space-y-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-${color}/15 to-${color}/5 text-${color} ring-1 ring-border/50 transition-all group-hover:scale-110 group-hover:from-${color}/20 group-hover:to-${color}/10 shadow-lg`}>
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          <div className={`inline-flex items-center text-sm font-medium text-${color}`}>
            Explore
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function StatCard({
  icon,
  value,
  label,
  color = "primary",
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color?: string;
}) {
  return (
    <Card className={`relative overflow-hidden border-${color}/20 bg-gradient-to-br from-card to-${color}/5 backdrop-blur-sm shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl`}>
      <div className={`pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-${color}),transparent_60%)]/[12]`} />
      <CardContent className="flex items-center gap-4 p-6">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-${color}/15 to-${color}/5 text-${color} ring-1 ring-border/50 shadow-md`}>
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-2xl font-bold tracking-tight">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({
  quote,
  author,
  location,
}: {
  quote: string;
  author: string;
  location: string;
}) {
  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-card to-chart-4/5 backdrop-blur-sm shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-chart-4),transparent_60%)]/[12]" />
      <CardContent className="space-y-4 p-6">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-chart-4 text-chart-4" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed italic">
          "{quote}"
        </p>
        <div className="space-y-0.5">
          <div className="text-sm font-semibold text-foreground">{author}</div>
          <div className="text-xs text-muted-foreground">{location}</div>
        </div>
      </CardContent>
    </Card>
  );
}
