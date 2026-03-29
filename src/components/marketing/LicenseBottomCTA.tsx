import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";
import { FadeIn } from "@/components/marketing/FadeIn";

export function LicenseBottomCTA() {
  return (
    <section className="mx-auto max-w-5xl">
      <FadeIn>
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 shadow-lg">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/license/license-value-territory.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
            <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-transparent to-accent/20 mix-blend-overlay" />
          </div>

          <div className="relative space-y-6 p-10 text-center sm:p-16">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Your Territory is Waiting
            </h2>
            <p className="mx-auto max-w-xl text-white/80">
              Join the Reserve Memorials network and start building a meaningful
              business helping families in your community.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="shadow-lg" asChild>
                <a href="#license-inquiry-form">
                  Request Information
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                asChild
              >
                <a href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call {MARKETING_CONTACT.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
