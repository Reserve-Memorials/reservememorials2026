import Link from "next/link";
import Image from "next/image";
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
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";

const PORTAL_URL = "https://portal.reservememorials.com";

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-border p-10 shadow-sm sm:p-16">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/duck-video.mp4"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/55 dark:bg-black/65" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
          <Badge
            variant="secondary"
            className="bg-white/15 text-white border-white/25 shadow-sm backdrop-blur-sm"
          >
            <Heart className="mr-1.5 h-3.5 w-3.5" />
            Reserve Memorials
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Crafting Custom Headstones, Monuments, and Mausoleums in Ohio
          </h1>

          <div className="flex justify-center">
            <Image
              src="/reservelogowhite.png"
              alt="Reserve Memorials logo"
              width={220}
              height={64}
              className="h-auto w-36 sm:w-44"
              priority
            />
          </div>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80">
            At Reserve Memorials, we create personalized memorials that reflect
            the story and legacy of your loved one. Based in Hudson, Ohio, our
            family-owned team guides you from design through installation,
            including cemetery approval and foundation planning.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="shadow-sm">
              <Link href="/contact-us">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              <Link href="/design-consultation">Schedule consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              <a href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call now
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70 pt-6">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-white" />
              <span>Family-owned</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-white" />
              <span>Compassionate guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-white" />
              <span>Hudson, Ohio</span>
            </div>
          </div>

          {/* Visual previews */}
          <div className="pt-8">
            <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-3">
              <PreviewImage
                src="/traditional-headstone.png"
                alt="Traditional headstones"
              />
              <PreviewImage src="/columbariums.png" alt="Columbariums" />
              <PreviewImage
                src="/veteran-memorials.png"
                alt="Veteran memorials"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Families Choose Us */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Why families choose Reserve Memorials
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
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Services
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore our memorial options below. If you're unsure where to start,
            schedule a design consultation and we'll guide you through the
            process.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            icon={<Gem className="h-5 w-5" />}
            title="Traditional headstones"
            description="Upright monuments, flat markers, companion and family memorials"
            href="/traditional-headstones"
            imageSrc="/traditional-headstone.png"
          />
          <ServiceCard
            icon={<Building2 className="h-5 w-5" />}
            title="Columbariums"
            description="Custom-designed cremation memorials for families and institutions"
            href="/columbariums"
            imageSrc="/columbariums.png"
          />
          <ServiceCard
            icon={<Shield className="h-5 w-5" />}
            title="Veteran memorials"
            description="Markers, plaques, medallions, and custom designs to honor service"
            href="/veteran-memorials"
            imageSrc="/veteran-memorials.png"
          />
          <ServiceCard
            icon={<Palette className="h-5 w-5" />}
            title="Design consultation"
            description="Materials, layout, inscriptions, cemetery rules, timeline, and budget guidance"
            href="/design-consultation"
            imageSrc="/design-consultation.png"
          />
          <ServiceCard
            icon={<Bird className="h-5 w-5" />}
            title="Dove release"
            description="Meaningful ceremony additions handled professionally with care"
            href="/dove-release"
            imageSrc="/dove-release.png"
          />
          <ServiceCard
            icon={<Cross className="h-5 w-5" />}
            title="Statues"
            description="Garden, indoor, desktop stone and bronze statuary"
            href="/statues"
            imageSrc="/statues.png"
          />
          <ServiceCard
            icon={<MessageCircleHeart className="h-5 w-5" />}
            title="Grief support"
            description="Resources and guidance for families navigating loss"
            href="/grief-coaching"
            imageSrc="/grief-coaching.png"
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
        <div
          className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155/0.12),transparent)] blur-3xl animate-gentle-float"
          style={{ animationDelay: "4s" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
          <div className="space-y-3">
            <Badge
              variant="secondary"
              className="bg-evergreen/10 text-evergreen border-evergreen/20"
            >
              <MapPin className="mr-1.5 h-3.5 w-3.5" />
              Service Area
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Serving all of Ohio
            </h2>
          </div>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Based in Hudson, we proudly serve families across Ohio—including
            Hudson, Stow, Akron, Cleveland, and beyond.
          </p>

          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[
              "Hudson",
              "Stow",
              "Akron",
              "Cleveland",
              "Cuyahoga Falls",
              "Kent",
              "Medina",
              "Aurora",
            ].map((city) => (
              <Badge
                key={city}
                variant="secondary"
                className="bg-primary/5 text-primary border-primary/20"
              >
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
                <div className="text-sm text-muted-foreground">
                  {MARKETING_CONTACT.address}
                </div>
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Ohio Headquarters
                </div>
              </div>
              <div className="space-y-2">
                <Phone className="h-6 w-6 mx-auto text-primary" />
                <div className="text-sm font-medium">Phone</div>
                <a
                  href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}
                  className="text-sm text-primary hover:underline block"
                >
                  {MARKETING_CONTACT.phone}
                </a>
              </div>
              <div className="space-y-2">
                <Heart className="h-6 w-6 mx-auto text-primary" />
                <div className="text-sm font-medium">Email</div>
                <a
                  href={`mailto:${MARKETING_CONTACT.email}`}
                  className="text-sm text-primary hover:underline block"
                >
                  {MARKETING_CONTACT.email}
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
                <Link href="/services">Explore services</Link>
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
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  href,
  imageSrc,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full border-border/60 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
        {imageSrc ? (
          <div className="relative overflow-hidden rounded-t-xl border-b border-border/50 bg-muted/20">
            <div className="relative aspect-4/3 w-full">
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
        ) : null}
        <CardHeader className="space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 transition-all group-hover:scale-105">
            {icon}
          </div>
          <CardTitle className="text-base group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="inline-flex items-center text-sm font-medium text-primary">
            Learn more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function PreviewImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-sm">
      <div className="relative aspect-4/3 w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent_65%)]" />
      </div>
    </div>
  );
}
