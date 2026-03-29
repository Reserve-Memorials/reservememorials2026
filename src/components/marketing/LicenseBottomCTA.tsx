import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MARKETING_CONTACT, phoneToTel } from "@/lib/marketing/contact";
import { FadeIn } from "@/components/marketing/FadeIn";

export function LicenseBottomCTA() {
  return (
    <section className="mx-auto max-w-4xl">
      <FadeIn>
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="space-y-6 p-10 text-center sm:p-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Your Territory is Waiting
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Join the Reserve Memorials network and start building a meaningful
              business helping families in your community.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#license-inquiry-form">
                  Request Information
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${phoneToTel(MARKETING_CONTACT.phone)}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call {MARKETING_CONTACT.phone}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </section>
  );
}
