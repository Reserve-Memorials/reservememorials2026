import {
  DollarSign,
  Home,
  Laptop,
  TrendingDown,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/marketing/FadeIn";

const INVESTMENT_ITEMS = [
  { label: "License Fee", icon: DollarSign },
  { label: "Estimated Total Startup", icon: TrendingDown },
  { label: "Ongoing Royalty", icon: Users },
  { label: "Marketing Contribution", icon: Laptop },
];

const ADVANTAGES = [
  { icon: Home, text: "No storefront or showroom required" },
  { icon: Laptop, text: "Work from home with our technology platform" },
  { icon: TrendingDown, text: "Lower investment than traditional franchises" },
  { icon: Users, text: "Manufacturing and fulfillment handled by HQ" },
];

export function LicenseInvestment() {
  return (
    <section className="mx-auto max-w-5xl">
      <FadeIn>
        <Card className="border-primary/20 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="space-y-8 p-10 sm:p-16">
              <div className="space-y-3 text-center">
                <Badge
                  variant="secondary"
                  className="bg-accent/10 text-accent border-accent/20"
                >
                  <DollarSign className="mr-1.5 h-3.5 w-3.5" />
                  Investment
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Your Investment
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {INVESTMENT_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="group rounded-xl border border-border/60 bg-muted/20 p-5 text-center transition-all duration-300 hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-foreground">
                      Contact for Details
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
                <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Why licensees choose us
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ADVANTAGES.map((adv) => (
                    <div
                      key={adv.text}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-evergreen/10 text-evergreen">
                        <adv.icon className="h-4 w-4" />
                      </div>
                      {adv.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-muted/20 px-10 py-5 sm:px-16">
              <p className="text-xs leading-relaxed text-muted-foreground text-center">
                This is not an offer to sell a franchise. A license offering can
                only be made through proper legal documentation. Individual
                results vary. Reserve Memorials LLC reserves the right to modify
                terms, availability, and program details at any time.
              </p>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </section>
  );
}
