import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bird,
  Building2,
  Cross,
  Gem,
  Heart,
  MessageCircleHeart,
  Palette,
  Phone,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";

const SERVICES = [
  {
    href: "/traditional-headstones",
    title: "Traditional headstones and cemetery monuments",
    description: "Classic upright monuments, flat markers, companion and family memorials in premium stone with custom inscriptions and artwork.",
    icon: <Gem className="h-5 w-5" />,
    imageSrc: "/traditional-headstone.png",
  },
  {
    href: "/columbariums",
    title: "Columbariums and cremation memorials",
    description: "Custom-designed memorial spaces for families, cemeteries, and churches. Indoor and outdoor niche options with personalization.",
    icon: <Building2 className="h-5 w-5" />,
    imageSrc: "/columbariums.png",
  },
  {
    href: "/veteran-memorials",
    title: "Veteran memorials",
    description: "Honor those who served with dignified designs, military emblems, proper insignia, and respectful attention to detail.",
    icon: <Shield className="h-5 w-5" />,
    imageSrc: "/veteran-memorials.png",
  },
  {
    href: "/design-consultation",
    title: "Design consultation",
    description: "Guided help with materials, layout, inscriptions, cemetery rules, timeline, and budget. A conversation, not a sales pitch.",
    icon: <Palette className="h-5 w-5" />,
    imageSrc: "/design-consultation.png",
  },
  {
    href: "/dove-release",
    title: "Dove release services",
    description: "Professional dove releases for memorial and graveside ceremonies. Single or multiple-dove tributes coordinated with care.",
    icon: <Bird className="h-5 w-5" />,
    imageSrc: "/dove-release.png",
  },
  {
    href: "/statues",
    title: "Statues and statuary",
    description: "Garden, indoor, and desktop stone and bronze pieces. Concrete outdoor statues and meaningful memorial sculptures.",
    icon: <Cross className="h-5 w-5" />,
    imageSrc: "/statues.png",
  },
  {
    href: "/grief-coaching",
    title: "Grief coaching resources",
    description: "Supportive resources and guidance for families navigating loss. Compassionate, practical help during difficult times.",
    icon: <MessageCircleHeart className="h-5 w-5" />,
    imageSrc: "/grief-coaching.png",
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
            Memorial Services
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every life is unique, and every memorial should be too. Explore our services below, or schedule a design
            consultation for guided help selecting the right memorial and meeting cemetery requirements.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/design-consultation">
                Schedule a design consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact-us">Request a quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Memorial Options */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Memorial options</h2>
          <p className="max-w-2xl text-muted-foreground">
            From traditional headstones to custom columbariums, we create lasting tributes with care and precision.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 3).map((service) => (
            <ServiceCard
              key={service.href}
              href={service.href}
              title={service.title}
              description={service.description}
              icon={service.icon}
              imageSrc={service.imageSrc}
            />
          ))}
        </div>
      </section>

      {/* Ceremony and Support */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ceremony and support
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Guidance and meaningful additions to help honor your loved one with dignity and respect.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(3, 7).map((service) => (
            <ServiceCard
              key={service.href}
              href={service.href}
              title={service.title}
              description={service.description}
              icon={service.icon}
              imageSrc={service.imageSrc}
            />
          ))}
        </div>
      </section>

      {/* Materials and Craftsmanship */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155_/_0.12),transparent)] blur-3xl animate-gentle-float" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6">
          <div className="space-y-3 text-center">
            <Badge variant="secondary" className="bg-evergreen/10 text-evergreen border-evergreen/20">
              Craftsmanship
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Materials and craftsmanship
            </h2>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground text-center">
            We work with durable natural stone and trusted fabrication methods. During consultation, we review color
            options, finishes, inscriptions, and artwork, then confirm cemetery rules and the installation plan.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Button asChild size="lg">
              <Link href="/design-consultation">
                Schedule consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact-us">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl">
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Each service page has detailed information and clear next steps. Or contact us directly to discuss your
              specific needs and timeline.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact-us">
                  Contact us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/blog">Read the blog</Link>
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
  imageSrc,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full border-border/60 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
        <div className="relative overflow-hidden rounded-t-xl border-b border-border/50 bg-muted/20">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.45),transparent_65%)]" />
          </div>
        </div>
        <CardHeader className="space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 transition-all group-hover:scale-105">
            {icon}
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">{title}</CardTitle>
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
