import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Heart,
  MapPin,
  Palette,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutUsPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.68_0.085_85_/_0.15),transparent)] blur-3xl animate-gentle-float" />
        <div className="pointer-events-none absolute -right-6 bottom-4 hidden h-40 w-40 sm:block">
          <Image
            src="/reserve-duck-black.jpg"
            alt=""
            fill
            sizes="160px"
            className="object-contain opacity-90 dark:hidden"
            priority
          />
          <Image
            src="/reserve-duck-white.jpg"
            alt=""
            fill
            sizes="160px"
            className="hidden object-contain opacity-90 dark:block"
            priority
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            <Heart className="mr-1.5 h-3.5 w-3.5" />
            About Us
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            A modern memorial company, built on service and craft
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We believe creating a memorial should be a thoughtful, personal
            experience—not overwhelming. Our mission is to guide families
            through every step with clarity, compassion, and expertise.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/contact-us">
                Contact us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">View services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Craftsmanship with compassion
          </h2>
        </div>

        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            What started as a passion for craftsmanship and design has grown
            into a full-service memorial company dedicated to honoring lives and
            preserving legacies. We've learned that the most meaningful
            memorials come from truly understanding the person they commemorate.
          </p>
          <p>
            We believe the memorial process should be personal—not
            transactional. That's why we created the "Rocking Chair Remedy," a
            consultation space designed for comfort and conversation, not
            pressure. Our showroom is half monument samples and half
            consultation room—complete with rocking chairs and a coffee table
            instead of a traditional conference room. This intentional design
            helps families feel at ease during what can be an emotionally
            difficult time.
          </p>
          <p>
            Every memorial we create is custom-designed to reflect the unique
            story of the person it honors. Whether it's incorporating meaningful
            symbols, choosing the perfect stone, or crafting custom lettering,
            we ensure every detail has purpose and meaning.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl space-y-10">
        <div className="text-center space-y-3">
          <Badge
            variant="secondary"
            className="bg-evergreen/10 text-evergreen border-evergreen/20"
          >
            Our Values
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What guides our work
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ValueCard
            icon={<Heart className="h-5 w-5" />}
            title="Dignity & reverence"
            description="We believe human life is sacred. Every interaction is handled with empathy and respect."
          />
          <ValueCard
            icon={<Award className="h-5 w-5" />}
            title="Quality craftsmanship"
            description="Premium materials and skilled artisans ensure every memorial stands the test of time."
          />
          <ValueCard
            icon={<Users className="h-5 w-5" />}
            title="Guidance, not pressure"
            description="A conversation—never a sales pitch. We're here to help you move forward with confidence."
          />
          <ValueCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="Trust & transparency"
            description="Clear timelines, regular updates, and honest communication throughout your experience."
          />
          <ValueCard
            icon={<Shield className="h-5 w-5" />}
            title="Faith-forward"
            description="Respectful incorporation of faith elements where meaningful, never preachy."
          />
          <ValueCard
            icon={<Palette className="h-5 w-5" />}
            title="Service mindset"
            description="From cemetery approval to foundation work, we handle everything with a concierge approach."
          />
        </div>
      </section>

      {/* Service Area */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div
          className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155_/_0.12),transparent)] blur-3xl animate-gentle-float"
          style={{ animationDelay: "4s" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-3">
            <Badge
              variant="secondary"
              className="bg-evergreen/10 text-evergreen border-evergreen/20"
            >
              <MapPin className="mr-1.5 h-3.5 w-3.5" />
              Service Area
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Serving Northeast Ohio and beyond
            </h2>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Based in Hudson, Ohio, we proudly serve families throughout
              Summit, Portage, Cuyahoga, and surrounding counties. Our local
              presence means we understand regional cemetery requirements and
              can coordinate seamlessly with local services.
            </p>
            <p>
              From design consultation and planning to monument manufacturing,
              installation, and maintenance, we handle every aspect of your
              memorial. We coordinate with cemeteries on regulations and
              foundations, removing complexity from your experience.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-4">
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

      {/* CTA */}
      <section className="mx-auto max-w-4xl">
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ready to start the conversation?
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Whether you're planning ahead or need immediate assistance, we're
              here to help. Schedule a consultation to visit our showroom and
              experience the "Rocking Chair Remedy" for yourself.
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
                  Call us today
                </Link>
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
