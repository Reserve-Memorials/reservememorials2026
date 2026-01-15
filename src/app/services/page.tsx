import Link from "next/link";
import {
  ArrowRight,
  Bird,
  Building2,
  Cross,
  Gem,
  Heart,
  MessageCircleHeart,
  Palette,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SERVICES = [
  {
    href: "/columbariums",
    title: "Columbariums",
    description:
      "Custom-designed memorial spaces for churches and cemeteries. Beautiful, durable, and thoughtfully scaled for your community's needs.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    href: "/traditional-headstones",
    title: "Traditional headstones",
    description:
      "Classic upright and flat markers in premium granite. Thoughtfully engraved with attention to lasting craftsmanship.",
    icon: <Gem className="h-5 w-5" />,
  },
  {
    href: "/veteran-memorials",
    title: "Veteran memorials",
    description:
      "Honor those who served with respectful designs, proper emblems, and clear guidance on details and approval processes.",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    href: "/design-consultation",
    title: "Design consultation",
    description:
      "A guided session to choose style, materials, and timeline. We listen, we guide, and we help you move forward with confidence.",
    icon: <Palette className="h-5 w-5" />,
  },
  {
    href: "/dove-release",
    title: "Dove release",
    description:
      "A meaningful addition to memorial and graveside services. Handled professionally with care and reverence.",
    icon: <Bird className="h-5 w-5" />,
  },
  {
    href: "/statues",
    title: "Statues & custom features",
    description:
      "Custom sculptures and artistic details that capture a story. Crafted with restraint, built to endure.",
    icon: <Cross className="h-5 w-5" />,
  },
  {
    href: "/grief-coaching",
    title: "Grief support",
    description:
      "Compassionate resources for families navigating loss. Practical guidance delivered with understanding and respect.",
    icon: <MessageCircleHeart className="h-5 w-5" />,
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.68_0.085_85_/_0.15),transparent)] blur-3xl animate-gentle-float" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Services
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Memorial services designed for clarity and care
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            From traditional headstones to custom columbariums, our process is guided, transparent, and built for
            quality. Every service is delivered with compassion.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/contact-us">
                Request a consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/gallery">View gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.href}
              href={service.href}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </section>

      {/* Process Overview */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155_/_0.12),transparent)] blur-3xl animate-gentle-float" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 mx-auto max-w-4xl space-y-10">
          <div className="space-y-3 text-center">
            <Badge variant="secondary" className="bg-evergreen/10 text-evergreen border-evergreen/20">
              How we work
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              A guided, peaceful process
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From first conversation to final installation, we handle every detail with transparency and care.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <ProcessStep number="1" title="Consultation" description="Share your vision in a comfortable setting" />
            <ProcessStep number="2" title="Design" description="Collaborate on materials, style, and details" />
            <ProcessStep number="3" title="Creation" description="Expert artisans craft your memorial" />
            <ProcessStep number="4" title="Installation" description="Professional placement with precision" />
          </div>

          <div className="text-center pt-6">
            <Button asChild variant="outline">
              <Link href="/about-us">
                Learn more about our process
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What sets us apart
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We've reimagined the memorial experience to be more personal, transparent, and supportive.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <ValueCard
            icon={<Heart className="h-5 w-5" />}
            title="Personal connection"
            description="We take time to know families and learn their loved one's story"
          />
          <ValueCard
            icon={<Palette className="h-5 w-5" />}
            title="Custom design"
            description="Every memorial is uniquely crafted to reflect a life well lived"
          />
          <ValueCard
            icon={<Shield className="h-5 w-5" />}
            title="Premium quality"
            description="Only the finest materials and skilled craftsmanship"
          />
          <ValueCard
            icon={<Cross className="h-5 w-5" />}
            title="Guided support"
            description="Clear communication and compassionate care throughout"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl">
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ready to begin?
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Each service page has detailed information and clear next steps. Or contact us directly to discuss your
              specific needs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact-us">
                  Contact us
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

function ServiceCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full border-border/60 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
        <CardHeader className="space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 transition-all group-hover:scale-105">
            {icon}
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          <div className="inline-flex items-center text-sm font-medium text-primary">
            Learn more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ProcessStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-3 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent font-semibold text-xl border border-accent/20">
        {number}
      </div>
      <div className="space-y-1">
        <div className="text-base font-medium text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="flex flex-col items-center text-center space-y-3 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
          {icon}
        </div>
        <div className="space-y-1">
          <div className="text-base font-medium text-foreground">{title}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      </CardContent>
    </Card>
  );
}
