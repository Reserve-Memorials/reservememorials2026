import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";

export const metadata: Metadata = {
  title: "Thank You | Reserve Memorials",
  description:
    "Thank you for reaching out to Reserve Memorials. We will get back to you as soon as possible.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-10 py-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_60%)]/[14]" />

        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <Badge className="mx-auto w-fit" variant="secondary">
            Form submitted
          </Badge>

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Thank you for reaching out.
          </h1>

          <p className="mx-auto max-w-lg text-pretty text-base text-muted-foreground sm:text-lg">
            We've received your submission and will get back to you as soon as
            possible. A member of our team will follow up shortly.
          </p>
        </div>
      </section>

      <Card className="border-primary/20 shadow-sm">
        <CardContent className="space-y-6 p-8 text-center sm:p-10">
          <p className="text-muted-foreground">
            In the meantime, feel free to explore our services or give us a
            call.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/services">
                Explore services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}>
                <Phone className="mr-2 h-4 w-4" />
                {MARKETING_CONTACT.phone}
              </a>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Or head back to the{" "}
            <Link href="/" className="text-primary hover:underline">
              homepage
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
