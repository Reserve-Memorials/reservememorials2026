import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Gem,
  Heart,
  MapPin,
  MessageCircleHeart,
  Palette,
  Phone,
  Shield,
  Bird,
  Cross,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PORTAL_URL = "https://portal.reservememorials.com";
const CONTACT_INFO = {
  address: "30 Ravenna Street, Hudson, Ohio 44236",
  phone: "(234) 269-5432",
  email: "mcloboda@outlook.com",
};

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.68_0.085_85_/_0.15),transparent)] blur-3xl animate-gentle-float" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 shadow-sm">
            <Heart className="mr-1.5 h-3.5 w-3.5" />
            Loboda Monuments
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Crafting Custom Headstones, Monuments, and Mausoleums in Ohio
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            At Loboda Monuments, we create personalized memorials that reflect the story and legacy of your loved one.
            Based in Hudson, Ohio, our family-owned team guides you from design through installation, including cemetery
            approval and foundation planning.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="shadow-sm">
              <Link href="/design-consultation">
                Start your design
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact-us">Request a quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, "")}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call now
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground pt-6">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Family-owned</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <span>Compassionate guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Hudson, Ohio</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Families Choose Us */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Why families choose Loboda Monuments
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ValueCard
            icon={<Heart className="h-5 w-5" />}
            title="Family-owned and values-driven"
            description="Compassionate guidance through every step of the memorial planning process."
          />
          <ValueCard
            icon={<Palette className="h-5 w-5" />}
            title="Custom design support"
            description="Personalized headstones, monuments, and cremation memorials tailored to your loved one's story."
          />
          <ValueCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="We handle the details"
            description="Cemetery requirements, approvals, and installation coordination—all managed for you."
          />
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Services</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore our memorial options below. If you're unsure where to start, schedule a design consultation and we'll
            guide you through the process.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            icon={<Gem className="h-5 w-5" />}
            title="Traditional headstones"
            description="Upright monuments, flat markers, companion and family memorials"
            href="/traditional-headstones"
          />
          <ServiceCard
            icon={<Building2 className="h-5 w-5" />}
            title="Columbariums"
            description="Custom-designed cremation memorials for families and institutions"
            href="/columbariums"
          />
          <ServiceCard
            icon={<Shield className="h-5 w-5" />}
            title="Veteran memorials"
            description="Markers, plaques, medallions, and custom designs to honor service"
            href="/veteran-memorials"
          />
          <ServiceCard
            icon={<Palette className="h-5 w-5" />}
            title="Design consultation"
            description="Materials, layout, inscriptions, cemetery rules, timeline, and budget guidance"
            href="/design-consultation"
          />
          <ServiceCard
            icon={<Bird className="h-5 w-5" />}
            title="Dove release"
            description="Meaningful ceremony additions handled professionally with care"
            href="/dove-release"
          />
          <ServiceCard
            icon={<Cross className="h-5 w-5" />}
            title="Statues"
            description="Garden, indoor, desktop stone and bronze statuary"
            href="/statues"
          />
          <ServiceCard
            icon={<MessageCircleHeart className="h-5 w-5" />}
            title="Grief support"
            description="Resources and guidance for families navigating loss"
            href="/grief-coaching"
          />
        </div>

        <div className="text-center pt-6">
          <Button asChild variant="outline">
            <Link href="/services">
              View all services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Service Area */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155_/_0.12),transparent)] blur-3xl animate-gentle-float" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
          <div className="space-y-3">
            <Badge variant="secondary" className="bg-evergreen/10 text-evergreen border-evergreen/20">
              <MapPin className="mr-1.5 h-3.5 w-3.5" />
              Service Area
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Serving Northeast Ohio
            </h2>
          </div>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Proudly serving Hudson, Stow, Akron, Cleveland, and surrounding Northeast Ohio communities.
          </p>

          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {["Hudson", "Stow", "Akron", "Cleveland", "Cuyahoga Falls", "Kent", "Medina", "Aurora"].map((city) => (
              <Badge key={city} variant="secondary" className="bg-primary/5 text-primary border-primary/20">
                {city}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Visit or Contact */}
      <section className="mx-auto max-w-4xl">
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Visit or contact us
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3 text-center">
              <div className="space-y-2">
                <MapPin className="h-6 w-6 mx-auto text-primary" />
                <div className="text-sm font-medium">Address</div>
                <div className="text-sm text-muted-foreground">{CONTACT_INFO.address}</div>
              </div>
              <div className="space-y-2">
                <Phone className="h-6 w-6 mx-auto text-primary" />
                <div className="text-sm font-medium">Phone</div>
                <a href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, "")}`} className="text-sm text-primary hover:underline block">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="space-y-2">
                <Heart className="h-6 w-6 mx-auto text-primary" />
                <div className="text-sm font-medium">Email</div>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-primary hover:underline block">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Button asChild size="lg">
                <Link href="/design-consultation">
                  Schedule a consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/gallery">See recent memorial work</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
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
      <CardHeader className="space-y-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full border-border/60 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
        <CardHeader className="space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 transition-all group-hover:scale-105">
            {icon}
          </div>
          <CardTitle className="text-base group-hover:text-primary transition-colors">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
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
