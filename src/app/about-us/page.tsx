import Link from "next/link";
import {
  ArrowRight,
  Award,
  Clock,
  Heart,
  Lightbulb,
  MapPin,
  Palette,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutUsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-chart-3/5 to-chart-4/5 p-8 shadow-xl backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-chart-3),transparent_50%)]/[18] animate-pulse-glow" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_50%)]/[16] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,var(--color-primary),transparent_50%)]/[24] blur-3xl animate-float" />

        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <Badge className="w-fit bg-gradient-to-r from-chart-3 to-chart-4 text-primary-foreground shadow-lg" variant="secondary">
            <Heart className="mr-1 h-3 w-3" />
            About Us
          </Badge>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-chart-3 via-primary to-chart-4 bg-clip-text text-transparent animate-gradient">
              A modern memorial company
            </span>
            , built on service and craft.
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg leading-relaxed">
            We believe creating a memorial should be a thoughtful, personal experience—not overwhelming.
            Our mission is to guide families through every step with clarity, compassion, and expertise,
            ensuring each memorial becomes a lasting tribute that tells a meaningful story.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="group bg-gradient-to-r from-chart-3 to-primary hover:shadow-xl transition-all">
              <Link href="/contact-us">
                Contact us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 hover:border-primary/60 hover:bg-primary/5">
              <Link href="/services">View services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-sm font-medium text-chart-3">Our Story</div>
          <h2 className="text-3xl font-bold tracking-tight">Getting to know families, one story at a time</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="relative overflow-hidden border-chart-3/20 bg-gradient-to-br from-card to-chart-3/5 backdrop-blur-sm shadow-lg">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-chart-3),transparent_60%)]/[12]" />
            <CardContent className="space-y-4 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-chart-3/20 to-chart-3/10 text-chart-3 ring-1 ring-border/50 shadow-md">
                  <Heart className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Our Beginning</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    What started as a passion for craftsmanship and design has grown into a full-service
                    memorial company dedicated to honoring lives and preserving legacies. We've learned that
                    the most meaningful memorials come from truly understanding the person they commemorate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-card to-primary/5 backdrop-blur-sm shadow-lg">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-primary),transparent_60%)]/[12]" />
            <CardContent className="space-y-4 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary ring-1 ring-border/50 shadow-md">
                  <Users className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Our Approach</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We invest time in learning about families and their loved ones. Our consultation process—
                    which we call the "Rocking Chair Remedy"—is designed to be comfortable and conversational,
                    not transactional. We believe great memorials are born from great conversations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="relative overflow-hidden border-chart-4/20 bg-gradient-to-br from-card to-chart-4/5 backdrop-blur-sm shadow-lg">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-chart-4),transparent_60%)]/[12]" />
          <CardContent className="p-6 sm:p-8">
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Unlike traditional monument companies, we've reimagined the entire experience. Our showroom
                is half monument samples and half consultation space—complete with rocking chairs and a
                coffee table instead of a traditional conference room. This intentional design helps families
                feel at ease during what can be an emotionally difficult time.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Every memorial we create is custom-designed to reflect the unique story of the person it honors.
                Whether it's incorporating meaningful symbols, choosing the perfect stone, or crafting custom
                lettering, we ensure every detail has purpose and meaning.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Our Values */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-sm font-medium text-primary">Our Values</div>
          <h2 className="text-3xl font-bold tracking-tight">What guides our work</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ValueCard
            icon={<Heart className="h-5 w-5" />}
            title="Compassion First"
            description="We understand you're going through a difficult time. Every interaction is handled with empathy and care."
            color="chart-5"
          />
          <ValueCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Quality Craftsmanship"
            description="We use only premium materials and work with skilled artisans to ensure every memorial stands the test of time."
            color="primary"
          />
          <ValueCard
            icon={<Lightbulb className="h-5 w-5" />}
            title="Creative Design"
            description="Your memorial should be as unique as your loved one. We bring creativity and artistry to every project."
            color="chart-4"
          />
          <ValueCard
            icon={<Clock className="h-5 w-5" />}
            title="Transparent Process"
            description="Clear timelines, regular updates, and honest communication throughout your entire experience with us."
            color="chart-2"
          />
          <ValueCard
            icon={<Users className="h-5 w-5" />}
            title="Family-Centered"
            description="We take time to know your family and understand your loved one's story—it's what makes our work meaningful."
            color="chart-3"
          />
          <ValueCard
            icon={<Award className="h-5 w-5" />}
            title="Excellence Always"
            description="From consultation to installation, we maintain the highest standards in every aspect of our service."
            color="chart-5"
          />
        </div>
      </section>

      {/* Service Areas */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-sm font-medium text-chart-2">Service Areas</div>
          <h2 className="text-3xl font-bold tracking-tight">Serving Northeast Ohio and beyond</h2>
        </div>

        <Card className="relative overflow-hidden border-chart-2/20 bg-gradient-to-br from-card to-chart-2/5 backdrop-blur-sm shadow-lg">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-chart-2),transparent_60%)]/[12]" />
          <CardContent className="p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-chart-2" />
                  <h3 className="text-xl font-semibold">Primary Service Area</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Based in Hudson, Ohio, we proudly serve families throughout Summit, Portage, Cuyahoga,
                  and surrounding counties. Our local presence means we understand regional cemetery
                  requirements and can coordinate seamlessly with local services.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Hudson",
                    "Akron",
                    "Cleveland",
                    "Cuyahoga Falls",
                    "Stow",
                    "Kent",
                    "Medina",
                    "Aurora",
                  ].map((city) => (
                    <Badge key={city} variant="secondary" className="bg-chart-2/10 text-chart-2 border-chart-2/30">
                      {city}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Palette className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Custom Services Available</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Design consultation and planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Monument design and manufacturing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Installation and foundation work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Monument cleaning and maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Columbarium and mausoleum consultation</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-chart-3/5 p-8 shadow-xl backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-primary),transparent_50%)]/[18] animate-pulse-glow" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-chart-3),transparent_50%)]/[18] animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-4">
            <div className="text-sm font-medium text-primary">Let's Talk</div>
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to start the conversation?
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
              Whether you're planning ahead or need immediate assistance, we're here to help.
              Schedule a consultation to visit our showroom and experience the "Rocking Chair Remedy"
              for yourself. We'll take the time to understand your needs and guide you through the entire process.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:shrink-0">
            <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-chart-3 hover:shadow-xl w-full">
              <Link href="/contact-us">
                Schedule consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 w-full">
              <Link href="/services">
                <Phone className="mr-2 h-4 w-4" />
                Call us today
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({
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
    <Card className={`group relative overflow-hidden border-${color}/20 bg-gradient-to-br from-card to-${color}/5 backdrop-blur-sm shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:border-${color}/40`}>
      <div className={`pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,var(--color-${color}),transparent_50%)]/[18]`} />
      <CardHeader className="space-y-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-${color}/15 to-${color}/5 text-${color} ring-1 ring-border/50 transition-all group-hover:scale-110 shadow-md`}>
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
