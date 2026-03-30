import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Flower2,
  Gift,
  Heart,
  Lamp,
  Music,
  Package,
  Phone,
  Shield,
  Star,
  Flag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";
import { FadeIn } from "@/components/marketing/FadeIn";
import { ServiceQuoteForm } from "@/components/marketing/ServiceQuoteForm";

export const metadata: Metadata = {
  title: "Memorial Wind Chimes & Cemetery Accessories | Reserve Memorials",
  description:
    "Personalized memorial wind chimes, cemetery flower vases, cremation urns, and memorial accessories. Official dealer for U.S. Metalcraft and The Wind Chime Co. Serving Hudson, Ohio and surrounding areas.",
  openGraph: {
    title: "Memorial Wind Chimes & Cemetery Accessories | Reserve Memorials",
    description:
      "Personalized memorial wind chimes, cemetery flower vases, cremation urns, and memorial accessories from trusted American manufacturers.",
    url: "https://www.reservememorials.com/wind-chimes-and-accessories",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Reserve Memorials",
  url: "https://www.reservememorials.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "30 Ravenna Street",
    addressLocality: "Hudson",
    addressRegion: "OH",
    postalCode: "44236",
  },
  telephone: "+1-234-269-5432",
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Memorial Wind Chimes",
        description:
          "Personalized memorial wind chimes with premium gift-box packaging from The Wind Chime Co",
        brand: { "@type": "Brand", name: "The Wind Chime Co" },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Memorial Flower Vases",
        description:
          "Die-cast aluminum cemetery vases from U.S. Metalcraft",
        brand: { "@type": "Brand", name: "U.S. Metalcraft" },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Cremation Urns",
        description:
          "Handcrafted cremation urns in various styles and materials from U.S. Metalcraft",
        brand: { "@type": "Brand", name: "U.S. Metalcraft" },
      },
    },
  ],
};

/* ────────── Data ────────── */

const WIND_CHIMES = [
  {
    name: "Whispering Hearts\u2122 \u2013 Platinum Rose",
    size: '30"',
    description:
      "Personalized memorial wind chime with premium gift-box packaging and velvet interior. Personalizable wind sail.",
    image: "/wind-chimes/whispering-hearts-platinum.jpg",
  },
  {
    name: "Whispering Hearts\u2122 \u2013 Rose Gold",
    size: '28"',
    description:
      "Memorial heart included with gift-ready packaging. Personalizable wind sail for a meaningful, lasting tribute.",
    image: "/wind-chimes/whispering-hearts-rosegold.jpg",
  },
  {
    name: "Serenity \u2013 Amazing Grace",
    size: '40"',
    description:
      "Features verses from \u201cAmazing Grace.\u201d Deep tone, musically tuned. Gift bundle with premium packaging.",
    image: "/wind-chimes/serenity-amazing-grace.jpg",
  },
  {
    name: "Serenity \u2013 Church Bells",
    size: '55"',
    description:
      "Large deep tone chime with a church bell-inspired sound. Gift bundle packaging included.",
    image: "/wind-chimes/serenity-church-bells.jpg",
  },
  {
    name: "Serenity \u2013 Antique Bronze Flower",
    size: '48"',
    description:
      "Antique bronze finish with deep, resonant tones. Gift bundle packaging with velvet interior.",
    image: "/wind-chimes/serenity-bronze-flower.jpg",
  },
  {
    name: "Serenity Family-Love",
    size: '34"',
    description:
      "Family-themed design with medium tone. Gift bundle packaging, greeting card, and love note included.",
    image: "/wind-chimes/serenity-family-love.jpg",
  },
];

const WIND_CHIME_FEATURES = [
  "Hand-tuned, musically precise tones",
  "Premium gift-box packaging with velvet interior",
  "Personalizable wind sails with custom messages",
  "Greeting card and love note included",
  "Fast shipping",
];

const VASE_CATEGORIES = [
  {
    name: "Upright Memorial Vases",
    description:
      "For mounting on upright headstones and monuments. Multiple fastener options available.",
    image: "/metalcraft/upright-vases.jpg",
  },
  {
    name: "Lawn / Flush Ground Vases",
    description:
      "Meet cemetery maintenance regulations with a convenient ground unit system.",
    image: "/metalcraft/ground-vases.jpg",
  },
  {
    name: "Wall Mount Vases",
    description:
      "For columbarium walls and mausoleum niches. Compact and elegant.",
    image: "/metalcraft/wall-mount-vases.jpg",
  },
  {
    name: "Bronze Replacement Vases",
    description:
      "Replace worn or damaged vases with quality replacements that match your memorial.",
    image: "/metalcraft/replacement-vases.jpg",
  },
];

const URN_CATEGORIES = [
  {
    name: "Aria Urns",
    description: "Innovative designs with coordinating keepsakes.",
    image: "/metalcraft/aria-urns.jpg",
  },
  {
    name: "Traditional Urns",
    description: "Classic brushed nickel and bronze finishes.",
    image: "/metalcraft/traditional-urns.jpg",
  },
  {
    name: "Cloisonn\u00e9 Urns",
    description: "Decorative enamel artistry in rich colors.",
    image: "/metalcraft/cloisonne-urns.jpg",
  },
  {
    name: "Flag Urns",
    description:
      "Patriotic tribute urns for veterans and service members.",
    image: "/metalcraft/flag-urns.jpg",
  },
  {
    name: "Wood / Box Urns",
    description: "Hand-finished hardwood with high-gloss finish.",
    image: "/metalcraft/wood-urns.jpg",
  },
  {
    name: "Keepsakes",
    description: "Small memorial keepsakes for sharing among family.",
    image: "/metalcraft/keepsakes.jpg",
  },
];

const ACCESSORIES = [
  {
    name: "Memorial Lights",
    description:
      "LED-powered, available in 3 lens colors and 5 designs.",
    image: "/metalcraft/memorial-lights.jpg",
    icon: Lamp,
  },
  {
    name: "Brass Emblems",
    description:
      "Made in the USA. Add a personal touch to vases, urns, or memorials.",
    image: "/metalcraft/emblems.jpg",
    icon: Star,
  },
  {
    name: "Flower Bouquets",
    description:
      "Artificial flower arrangements designed for memorial vases.",
    image: "/metalcraft/flower-bouquets.jpg",
    icon: Flower2,
  },
  {
    name: "Star Flag Holder",
    description:
      "Cemetery flag holders for veteran graves. Durable and dignified.",
    image: "/metalcraft/flag-holder.jpg",
    icon: Flag,
  },
];

/* ────────── Page ────────── */

export default function WindChimesAndAccessoriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-16">
        {/* ── Hero ── */}
        <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
          <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.68_0.085_85/0.15),transparent)] blur-3xl animate-gentle-float" />

          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  &larr; Back to services
                </Link>
              </div>

              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                Service
              </Badge>

              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Memorial Wind Chimes &amp; Accessories
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Personalized memorial wind chimes, cemetery flower vases,
                cremation urns, and memorial accessories. Reserve Memorials is
                an official dealer for U.S. Metalcraft and The Wind Chime Co,
                bringing you quality memorial products with local guidance and
                care.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button size="lg" asChild>
                  <a href="#quote-form">
                    Request a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    {MARKETING_CONTACT.phone}
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-sm">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src="/wind-chimes/hero.jpg"
                  alt="Personalized memorial wind chime from The Wind Chime Co"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent_65%)]" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Memorial Wind Chimes ── */}
        <section className="mx-auto max-w-6xl space-y-10">
          <FadeIn>
            <div className="space-y-3 text-center">
              <Badge
                variant="secondary"
                className="bg-accent/10 text-accent border-accent/20"
              >
                <Music className="mr-1.5 h-3.5 w-3.5" />
                The Wind Chime Co
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Memorial Wind Chimes
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Personalized wind chimes crafted to comfort and honor loved
                ones. Each chime arrives in premium gift-box packaging, ready
                to give.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WIND_CHIMES.map((chime, i) => (
              <FadeIn key={chime.name} delay={i * 0.08}>
                <Card className="group h-full overflow-hidden border-border/60 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative overflow-hidden border-b border-border/50 bg-muted/20">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={chime.image}
                        alt={chime.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.3),transparent_50%)]" />
                    </div>
                    <Badge className="absolute right-3 top-3 bg-background/80 backdrop-blur-sm text-foreground border-border/60">
                      {chime.size}
                    </Badge>
                  </div>
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-lg">{chime.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {chime.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                All wind chimes from The Wind Chime Co feature:
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {WIND_CHIME_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </section>

        {/* ── Memorial Vases ── */}
        <section className="mx-auto max-w-6xl space-y-10">
          <FadeIn>
            <div className="space-y-3 text-center">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                U.S. Metalcraft
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Memorial Flower Vases
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Die-cast aluminum vases with exclusive coating for lasting
                beauty. Available in a variety of designs and sizes for upright
                memorials and flush ground installations. Pair with your{" "}
                <Link
                  href="/traditional-headstones"
                  className="text-primary hover:underline"
                >
                  headstone
                </Link>{" "}
                or{" "}
                <Link
                  href="/columbariums"
                  className="text-primary hover:underline"
                >
                  columbarium
                </Link>
                .
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VASE_CATEGORIES.map((cat, i) => (
              <FadeIn key={cat.name} delay={i * 0.08}>
                <Card className="group h-full overflow-hidden border-border/60 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <div className="relative overflow-hidden border-b border-border/50 bg-muted/20">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-base">{cat.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Cremation Urns ── */}
        <section className="mx-auto max-w-6xl space-y-10">
          <FadeIn>
            <div className="space-y-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Cremation Urns
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Handcrafted urns in a broad range of styles and materials to
                meet the needs of any family. From precision die-cast aluminum
                to hand-finished hardwood.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {URN_CATEGORIES.map((cat, i) => (
              <FadeIn key={cat.name} delay={i * 0.08}>
                <Card className="group h-full overflow-hidden border-border/60 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <div className="relative overflow-hidden border-b border-border/50 bg-muted/20">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-base">{cat.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Cemetery Accessories ── */}
        <section className="mx-auto max-w-6xl space-y-10">
          <FadeIn>
            <div className="space-y-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Cemetery Accessories
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Quality add-on products for memorials, from memorial lights to
                emblems and{" "}
                <Link
                  href="/veteran-memorials"
                  className="text-primary hover:underline"
                >
                  veteran
                </Link>{" "}
                flag holders.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ACCESSORIES.map((acc, i) => (
              <FadeIn key={acc.name} delay={i * 0.08}>
                <Card className="group h-full overflow-hidden border-border/60 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <div className="relative overflow-hidden border-b border-border/50 bg-muted/20">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={acc.image}
                        alt={acc.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <CardHeader className="space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                      <acc.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{acc.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {acc.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Partners ── */}
        <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
          <div
            className="absolute -left-24 -bottom-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.32_0.048_155/0.12),transparent)] blur-3xl animate-gentle-float"
            style={{ animationDelay: "4s" }}
          />

          <div className="relative z-10 mx-auto max-w-4xl space-y-8">
            <FadeIn>
              <div className="space-y-3 text-center">
                <Badge
                  variant="secondary"
                  className="bg-evergreen/10 text-evergreen border-evergreen/20"
                >
                  Featured
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Our Partners
                </h2>
                <p className="text-muted-foreground">
                  We work with trusted American manufacturers to bring you
                  quality memorial products.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-8 md:grid-cols-2">
              <FadeIn delay={0}>
                <Card className="h-full border-border/60 shadow-sm">
                  <CardContent className="space-y-4 p-8">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-32 shrink-0">
                        <Image
                          src="/partners/metalcraft-logo.jpg"
                          alt="U.S. Metalcraft logo"
                          fill
                          className="object-contain"
                          sizes="128px"
                        />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-evergreen/10 text-evergreen border-evergreen/20 shrink-0"
                      >
                        <Shield className="mr-1 h-3 w-3" />
                        Made in USA
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      U.S. Metalcraft, Inc.
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Since 1967, U.S. Metalcraft has been serving the North
                      American memorial industry as a leading provider of
                      cemetery memorial flower vases, cremation urns, and
                      related memorial products. Based in Delphos, Ohio. All
                      products made in the USA.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.1}>
                <Card className="h-full border-border/60 shadow-sm">
                  <CardContent className="space-y-4 p-8">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-32 shrink-0">
                        <Image
                          src="/partners/windchime-co-logo.jpg"
                          alt="The Wind Chime Co logo"
                          fill
                          className="object-contain"
                          sizes="128px"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      The Wind Chime Co
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Family-owned and operated in Grand Blanc, Michigan. The
                      Wind Chime Co creates personalized memorial wind chimes
                      with premium gift-box packaging. Featured on ABC&apos;s
                      Good Morning America. Their mission is providing comfort
                      to families through meaningful, lasting gifts.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── How to Order ── */}
        <section className="mx-auto max-w-4xl space-y-8">
          <FadeIn>
            <div className="space-y-3 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                How to Order
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                We handle everything so you can focus on honoring your loved
                one.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: 1,
                icon: Gift,
                title: "Browse and choose",
                desc: "Explore the products above and note what interests you.",
              },
              {
                step: 2,
                icon: Phone,
                title: "Contact us",
                desc: "Call, email, or fill out our contact form with your selections and any personalization requests.",
              },
              {
                step: 3,
                icon: Package,
                title: "We handle the rest",
                desc: "We place the order with our partners, coordinate delivery, and follow up to make sure everything is perfect.",
              },
            ].map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.1}>
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary font-semibold">
                    {s.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <ServiceQuoteForm />
      </div>
    </>
  );
}
