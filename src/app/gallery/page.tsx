import Link from "next/link";
import { ArrowRight, Heart, ImageIcon, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CATEGORIES = [
  { name: "All", color: "primary" },
  { name: "Headstones", color: "chart-3" },
  { name: "Columbariums", color: "chart-2" },
  { name: "Veterans", color: "chart-5" },
  { name: "Lettering", color: "chart-4" },
  { name: "Custom features", color: "primary" },
];

const GALLERY_ITEMS = [
  { title: "Traditional Upright Monument", category: "Headstones", location: "Hudson, OH", color: "chart-3" },
  { title: "Custom Columbarium Design", category: "Columbariums", location: "Cleveland, OH", color: "chart-2" },
  { title: "Veteran Memorial with Eagle", category: "Veterans", location: "Akron, OH", color: "chart-5" },
  { title: "Elegant Flat Marker", category: "Headstones", location: "Cuyahoga Falls, OH", color: "chart-3" },
  { title: "Church Columbarium", category: "Columbariums", location: "Medina, OH", color: "chart-2" },
  { title: "Military Bronze Marker", category: "Veterans", location: "Kent, OH", color: "chart-5" },
  { title: "Custom Hand Lettering", category: "Lettering", location: "Hudson, OH", color: "chart-4" },
  { title: "Angel Sculpture Detail", category: "Custom features", location: "Cleveland, OH", color: "primary" },
  { title: "Double Monument", category: "Headstones", location: "Stow, OH", color: "chart-3" },
  { title: "Outdoor Niche Wall", category: "Columbariums", location: "Aurora, OH", color: "chart-2" },
  { title: "Ceramic Photo Portrait", category: "Custom features", location: "Hudson, OH", color: "primary" },
  { title: "Gold Leaf Inscription", category: "Lettering", location: "Peninsula, OH", color: "chart-4" },
];

export default function GalleryPage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-primary/5 to-chart-2/5 p-8 shadow-xl backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_50%)]/[18] animate-pulse-glow" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-2),transparent_50%)]/[16] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,var(--color-chart-3),transparent_50%)]/[24] blur-3xl animate-float" />

        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <Badge className="w-fit bg-gradient-to-r from-chart-2 to-primary text-primary-foreground shadow-lg" variant="secondary">
            <Sparkles className="mr-1 h-3 w-3" />
            Gallery
          </Badge>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-chart-2 via-primary to-chart-3 bg-clip-text text-transparent animate-gradient">
              Crafted work
            </span>
            , curated with intention.
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg leading-relaxed">
            Explore our collection of beautiful memorials — each one thoughtfully designed and expertly crafted.
            From traditional headstones to custom columbariums, every piece tells a unique story of remembrance and love.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="group bg-gradient-to-r from-chart-2 to-primary hover:shadow-xl transition-all">
              <Link href="/contact-us">
                Request examples
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 hover:border-primary/60 hover:bg-primary/5">
              <Link href="/services">View services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.name}
              className={`group inline-flex items-center gap-1.5 rounded-full border border-${c.color}/30 bg-gradient-to-r from-background/80 to-${c.color}/5 px-4 py-2 text-sm font-medium transition-all hover:border-${c.color}/60 hover:bg-${c.color}/10 hover:shadow-md hover:-translate-y-0.5`}
            >
              <span className={`h-2 w-2 rounded-full bg-${c.color} animate-pulse-glow`} />
              {c.name}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, idx) => (
            <Card
              key={idx}
              className="group relative overflow-hidden border-primary/20 bg-gradient-to-br from-card to-transparent backdrop-blur transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-primary/40 cursor-pointer"
            >
              <div className={`pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,var(--color-${item.color}),transparent_50%)]/[18]`} />
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_50%)]/[12]" />

              <div className={`relative aspect-[4/3] bg-gradient-to-br from-${item.color}/20 via-background to-${item.color}/10 overflow-hidden`}>
                <div className={`pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-${item.color}),transparent_55%)]/[22] animate-pulse-glow`} />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-chart-4),transparent_60%)]/[18] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`pattern-${idx}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="1.5" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-${idx})`} />
                  </svg>
                </div>

                <div className="absolute inset-0 grid place-items-center">
                  <div className={`flex flex-col items-center gap-3 text-${item.color} transition-all group-hover:scale-110`}>
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-${item.color}/20 to-${item.color}/10 backdrop-blur-sm ring-1 ring-${item.color}/30 shadow-xl`}>
                      <ImageIcon className="h-8 w-8" />
                    </div>
                    <div className="text-xs font-medium opacity-70 transition-opacity group-hover:opacity-100">
                      View Image
                    </div>
                  </div>
                </div>

                {/* Category badge overlay */}
                <div className="absolute top-3 right-3">
                  <Badge className={`bg-${item.color}/90 text-${item.color === "chart-4" || item.color === "chart-2" ? "foreground" : "primary-foreground"} border-${item.color}/30 backdrop-blur-sm shadow-lg`}>
                    {item.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="space-y-1.5 pb-3">
                <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Heart className={`h-3 w-3 text-${item.color}`} />
                  {item.location}
                </div>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 fill-${item.color} text-${item.color}`} />
                    ))}
                  </div>
                  <div className={`text-xs font-medium text-${item.color} opacity-0 transition-opacity group-hover:opacity-100`}>
                    View Details →
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-chart-2/5 p-8 shadow-xl backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-primary),transparent_50%)]/[18] animate-pulse-glow" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-chart-2),transparent_50%)]/[18] animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <div className="text-center space-y-5">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to create your memorial?
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed">
            Let's discuss your vision and create something meaningful together. Our team is here to guide you through every step.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-chart-2 hover:shadow-xl">
              <Link href="/contact-us">
                Get started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30">
              <Link href="/services">Explore services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
