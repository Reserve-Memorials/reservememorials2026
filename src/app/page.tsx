import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Heart,
  MapPin,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PORTAL_URL = "https://portal.reservememorials.com";

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section - Dignified, Calm */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.68_0.085_85_/_0.15),transparent)] blur-3xl animate-gentle-float" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 shadow-sm">
            <Heart className="mr-1.5 h-3.5 w-3.5" />
            Loboda Monuments
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Built to honor every life.
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Custom memorials crafted with compassion, faith, and enduring workmanship. Family-owned and guided by
            the belief that every life is sacred.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="shadow-sm">
              <Link href="/contact-us">
                Schedule a consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">View services</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground pt-6">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>BBB Accredited</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Family-owned</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Hudson, Ohio</span>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Process Overview */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A guided, peaceful process
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            From first conversation to installation, we handle every detail with care and transparency.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ProcessCard
            number="1"
            title="Design consultation"
            description="Share your vision in a comfortable setting. We listen, guide, and help you choose materials, style, and layout with confidence."
            icon={<Heart className="h-5 w-5" />}
          />
          <ProcessCard
            number="2"
            title="Cemetery approval & foundation"
            description="We coordinate with your cemetery, handle regulations, and prepare the foundation—removing complexity from your experience."
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <ProcessCard
            number="3"
            title="Craftsmanship & installation"
            description="Expert artisans create your memorial with premium materials. We install it with precision and care, ensuring lasting beauty."
            icon={<Award className="h-5 w-5" />}
          />
        </div>
      </section>

      {/* Services Preview */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Memorials that endure
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Traditional headstones, custom columbariums, veteran memorials, and more—all crafted to honor a life
              well lived.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/services">
              All services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ServicePreviewCard
            title="Traditional headstones"
            description="Classic upright and flat markers in premium granite, thoughtfully engraved and built to last generations."
            href="/traditional-headstones"
          />
          <ServicePreviewCard
            title="Columbariums"
            description="Custom-designed memorial spaces for churches and cemeteries—beautiful, durable, and scalable."
            href="/columbariums"
          />
          <ServicePreviewCard
            title="Veteran memorials"
            description="Honor those who served with dignified designs, proper emblems, and respectful attention to detail."
            href="/veteran-memorials"
          />
        </div>
      </section>

      {/* Our Story - Brand Values */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -left-32 -bottom-32 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155_/_0.12),transparent)] blur-3xl animate-gentle-float" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 mx-auto max-w-3xl space-y-8">
          <div className="space-y-3 text-center">
            <Badge variant="secondary" className="bg-evergreen/10 text-evergreen border-evergreen/20">
              Our Story
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Craftsmanship with compassion
            </h2>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              What started as a passion for craftsmanship and design has grown into a full-service memorial company
              dedicated to honoring lives and preserving legacies.
            </p>
            <p>
              We believe the memorial process should be personal—not transactional. That's why we created the
              "Rocking Chair Remedy," a consultation space designed for comfort and conversation, not pressure. We take
              time to know families and learn their loved one's story, because that's what transforms stone into
              meaning.
            </p>
            <p>
              Every memorial we create is custom-designed to reflect the unique story of the person it honors. From
              material selection to final installation, we guide you with clarity, compassion, and respect.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button asChild variant="outline">
              <Link href="/about-us">
                Our story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/gallery">
                View gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials - Social Proof */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Trusted by families across Northeast Ohio
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We're honored to serve families during life's most difficult moments.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <TestimonialCard
            quote="They made a very difficult time easier. The memorial for my father is absolutely beautiful, and they were so patient with our family throughout the process."
            author="Sarah M."
            location="Hudson, OH"
          />
          <TestimonialCard
            quote="Professional, compassionate, and incredibly skilled. The columbarium they designed for our church is stunning and exactly what we hoped for."
            author="Pastor James R."
            location="Cleveland, OH"
          />
          <TestimonialCard
            quote="From consultation to installation, everything was handled with care. The Rocking Chair Remedy truly made us feel at ease."
            author="Margaret K."
            location="Akron, OH"
          />
        </div>
      </section>

      {/* CTA - Gentle, No Pressure */}
      <section className="mx-auto max-w-4xl">
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ready when you are
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Whether you're planning ahead or need immediate assistance, we're here to help. Schedule a consultation
              to discuss your vision, or call us directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact-us">
                  Schedule consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="tel:+1234567890">
                  <Phone className="mr-2 h-4 w-4" />
                  Call us
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ProcessCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            {icon}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-semibold border border-accent/20">
            {number}
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function ServicePreviewCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full border-border/60 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
        <CardHeader className="space-y-3">
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
    <Card className="border-border/60 shadow-sm">
      <CardContent className="p-6 space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground italic">
          "{quote}"
        </p>
        <div className="space-y-0.5 pt-2 border-t border-border">
          <div className="text-sm font-medium text-foreground">{author}</div>
          <div className="text-xs text-muted-foreground">{location}</div>
        </div>
      </CardContent>
    </Card>
  );
}
