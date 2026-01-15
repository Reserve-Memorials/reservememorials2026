import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bird,
  Building2,
  Cross,
  Feather,
  Gem,
  Heart,
  MessageCircleHeart,
  Palette,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SERVICES = [
  {
    href: "/columbariums",
    title: "Columbariums",
    description:
      "Custom-designed columbariums for churches and cemeteries—beautiful, durable, and scalable. Perfect for communities seeking elegant memorial spaces.",
    icon: <Building2 className="h-5 w-5" />,
    color: "chart-2",
  },
  {
    href: "/traditional-headstones",
    title: "Traditional headstones",
    description:
      "Classic upright and flat markers with premium stone, engraving, and thoughtful layout guidance. Timeless tributes crafted with care.",
    icon: <Gem className="h-5 w-5" />,
    color: "primary",
  },
  {
    href: "/veteran-memorials",
    title: "Veteran memorials",
    description:
      "Honor service with respectful designs, emblems, and clear guidance on details and options. Every detail honors their sacrifice.",
    icon: <ShieldCheck className="h-5 w-5" />,
    color: "chart-5",
  },
  {
    href: "/design-consultation",
    title: "Design consultation",
    description:
      "A guided session to choose style, layout, materials, and timeline confidently. We make the process clear and comfortable.",
    icon: <Palette className="h-5 w-5" />,
    color: "chart-4",
  },
  {
    href: "/dove-release",
    title: "Dove release",
    description:
      "A meaningful addition to memorial and graveside services—handled professionally with care. Beautiful symbolism for your ceremony.",
    icon: <Feather className="h-5 w-5" />,
    color: "chart-3",
  },
  {
    href: "/statues",
    title: "Statues",
    description:
      "Custom features and sculptures that capture a story with craftsmanship and restraint. Artistic memorials that stand the test of time.",
    icon: <Cross className="h-5 w-5" />,
    color: "primary",
  },
  {
    href: "/grief-coaching",
    title: "Grief coaching",
    description:
      "Support resources for families navigating loss—compassionate, practical, and human. You don't have to go through this alone.",
    icon: <MessageCircleHeart className="h-5 w-5" />,
    color: "chart-5",
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-primary/5 to-chart-4/5 p-8 shadow-xl backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_50%)]/[18] animate-pulse-glow" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_50%)]/[16] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,var(--color-chart-3),transparent_50%)]/[24] blur-3xl animate-float" />

        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <Badge
            className="w-fit bg-gradient-to-r from-primary to-chart-4 text-primary-foreground shadow-lg"
            variant="secondary"
          >
            <Sparkles className="mr-1 h-3 w-3" />
            Services
          </Badge>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-primary via-chart-3 to-chart-4 bg-clip-text text-transparent animate-gradient">
              Memorial services
            </span>{" "}
            designed for clarity and care.
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg leading-relaxed">
            From traditional headstones to columbariums and custom memorials, our process is guided, transparent, and
            built for quality. Every service is delivered with compassion and attention to detail.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-primary to-chart-4 hover:shadow-xl transition-all"
            >
              <Link href="/contact-us">
                Request a consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/30 hover:border-primary/60 hover:bg-primary/5"
            >
              <Link href="/gallery">See examples</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <ServiceCard
            key={s.href}
            href={s.href}
            title={s.title}
            description={s.description}
            icon={s.icon}
            color={s.color}
          />
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-sm font-medium text-primary">Why Choose Us</div>
          <h2 className="text-3xl font-bold tracking-tight">What makes us different</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            We've reimagined the memorial experience to be more personal, transparent, and supportive.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <BenefitCard
            icon={<Heart className="h-5 w-5" />}
            title="Personal Connection"
            description="We take time to learn your loved one's story"
            color="chart-5"
          />
          <BenefitCard
            icon={<Palette className="h-5 w-5" />}
            title="Custom Design"
            description="Every memorial is uniquely crafted for you"
            color="chart-4"
          />
          <BenefitCard
            icon={<BadgeCheck className="h-5 w-5" />}
            title="Premium Quality"
            description="Only the finest materials and craftsmanship"
            color="primary"
          />
          <BenefitCard
            icon={<User className="h-5 w-5" />}
            title="Local Service"
            description="We coordinate everything with your local team"
            color="chart-2"
          />
        </div>
      </section>

      {/* Process Overview */}
      <section className="relative overflow-hidden rounded-3xl border border-chart-3/20 bg-gradient-to-br from-card to-chart-3/5 p-8 shadow-xl backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-chart-3),transparent_50%)]/[18] animate-pulse-glow" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_50%)]/[16] animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-chart-3">Our Process</div>
            <h2 className="text-3xl font-bold tracking-tight">How we work together</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              A clear, step-by-step journey from first conversation to final installation.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <ProcessStep
              number="1"
              title="Consultation"
              description="Share your vision in our comfortable 'Rocking Chair Remedy' room"
              color="primary"
            />
            <ProcessStep
              number="2"
              title="Design"
              description="Collaborate on materials, style, and custom details"
              color="chart-3"
            />
            <ProcessStep
              number="3"
              title="Creation"
              description="Expert artisans bring your memorial to life"
              color="chart-4"
            />
            <ProcessStep
              number="4"
              title="Installation"
              description="Professional placement and final details handled with care"
              color="chart-2"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-chart-4/5 p-8 shadow-xl backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-primary),transparent_50%)]/[18] animate-pulse-glow" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-chart-4),transparent_50%)]/[18] animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <div className="text-center space-y-5">
          <h2 className="text-3xl font-bold tracking-tight">Ready to get started?</h2>
          <p className="max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed">
            Each service page has a full detail overview with clear next steps. Or contact us directly to discuss your
            specific needs.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-chart-4 hover:shadow-xl">
              <Link href="/contact-us">
                Contact us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30">
              <Link href="/gallery">View gallery</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({
  href,
  title,
  description,
  icon,
  color = "primary",
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <Link href={href} className="group h-full">
      <Card
        className={`relative h-full overflow-hidden border-${color}/20 bg-gradient-to-br from-card to-${color}/5 backdrop-blur-sm shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-${color}/40`}
      >
        <div
          className={`pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,var(--color-${color}),transparent_50%)]/[18]`}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_50%)]/[12]" />

        <CardHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-${color}/15 to-${color}/5 text-${color} ring-1 ring-border/50 transition-all group-hover:scale-110 shadow-lg`}
            >
              {icon}
            </div>
            <Badge variant="secondary" className={`bg-${color}/10 text-${color} border-${color}/30`}>
              Service
            </Badge>
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          <div className={`inline-flex items-center text-sm font-medium text-${color} transition-all group-hover:gap-2`}>
            Learn more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function BenefitCard({
  icon,
  title,
  description,
  color = "primary",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
}) {
  return (
    <Card
      className={`group relative overflow-hidden border-${color}/20 bg-gradient-to-br from-card to-${color}/5 backdrop-blur-sm shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl`}
    >
      <div
        className={`pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,var(--color-${color}),transparent_50%)]/[18]`}
      />
      <CardContent className="flex flex-col items-center text-center space-y-3 p-6">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-${color}/15 to-${color}/5 text-${color} ring-1 ring-border/50 transition-all group-hover:scale-110 shadow-lg`}
        >
          {icon}
        </div>
        <div className="space-y-1">
          <div className="text-base font-semibold">{title}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProcessStep({
  number,
  title,
  description,
  color = "primary",
}: {
  number: string;
  title: string;
  description: string;
  color?: string;
}) {
  return (
    <Card
      className={`relative overflow-hidden border-${color}/20 bg-gradient-to-br from-card to-${color}/5 backdrop-blur-sm shadow-lg`}
    >
      <div
        className={`pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-${color}),transparent_50%)]/[12]`}
      />
      <CardContent className="space-y-3 p-6">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-${color}/20 to-${color}/10 text-${color} font-bold text-2xl ring-1 ring-${color}/30 shadow-lg`}
        >
          {number}
        </div>
        <div className="space-y-1">
          <div className="text-base font-semibold">{title}</div>
          <div className="text-xs text-muted-foreground leading-relaxed">{description}</div>
        </div>
      </CardContent>
    </Card>
  );
}
