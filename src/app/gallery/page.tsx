import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CATEGORIES = [
  "All",
  "Headstones",
  "Columbariums",
  "Veterans",
  "Lettering",
  "Custom features",
];

const GALLERY_ITEMS = [
  { title: "Traditional Upright Monument", category: "Headstones", location: "Hudson, OH" },
  { title: "Custom Columbarium Design", category: "Columbariums", location: "Cleveland, OH" },
  { title: "Veteran Memorial with Eagle", category: "Veterans", location: "Akron, OH" },
  { title: "Elegant Flat Marker", category: "Headstones", location: "Cuyahoga Falls, OH" },
  { title: "Church Columbarium", category: "Columbariums", location: "Medina, OH" },
  { title: "Military Bronze Marker", category: "Veterans", location: "Kent, OH" },
  { title: "Custom Hand Lettering", category: "Lettering", location: "Hudson, OH" },
  { title: "Angel Sculpture Detail", category: "Custom features", location: "Cleveland, OH" },
  { title: "Double Monument", category: "Headstones", location: "Stow, OH" },
  { title: "Outdoor Niche Wall", category: "Columbariums", location: "Aurora, OH" },
  { title: "Ceramic Photo Portrait", category: "Custom features", location: "Hudson, OH" },
  { title: "Gold Leaf Inscription", category: "Lettering", location: "Peninsula, OH" },
];

export default function GalleryPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="stone-texture relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-16">
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.68_0.085_85_/_0.15),transparent)] blur-3xl animate-gentle-float" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <Heart className="mr-1.5 h-3.5 w-3.5" />
            Gallery
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Crafted work, curated with intention
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Explore our collection of memorials—each one thoughtfully designed and expertly crafted to honor a unique
            life. From traditional headstones to custom columbariums, every piece tells a story.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/contact-us">
                Request examples
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">View services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className="rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, idx) => (
            <Card
              key={idx}
              className="group overflow-hidden border-border/60 shadow-sm transition-all hover:shadow-md hover:border-primary/30 cursor-pointer"
            >
              {/* Image Placeholder - Stone-inspired gradient */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-background overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.68_0.085_85_/_0.08),transparent)] animate-soft-glow" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.32_0.048_155_/_0.05),transparent)] animate-soft-glow" style={{ animationDelay: '3s' }} />

                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-5">
                  <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`pattern-${idx}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="1" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-${idx})`} />
                  </svg>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="space-y-2">
                <CardTitle className="text-base group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Heart className="h-3 w-3" />
                  {item.location}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl">
        <Card className="stone-texture border-primary/20 shadow-sm">
          <CardContent className="p-10 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ready to create your memorial?
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Let's discuss your vision and create something meaningful together. Our team is here to guide you through
              every step.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact-us">
                  Get started
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
