import { DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/marketing/FadeIn";

export function LicenseInvestment() {
  return (
    <section className="mx-auto max-w-4xl">
      <FadeIn>
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="space-y-8 p-10 sm:p-16">
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
              <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-center">
                <div className="text-sm text-muted-foreground">License Fee</div>
                <div className="mt-1 text-lg font-semibold text-foreground">
                  Contact for Details
                </div>
              </div>
              <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-center">
                <div className="text-sm text-muted-foreground">
                  Estimated Total Startup
                </div>
                <div className="mt-1 text-lg font-semibold text-foreground">
                  Contact for Details
                </div>
              </div>
              <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-center">
                <div className="text-sm text-muted-foreground">
                  Ongoing Royalty
                </div>
                <div className="mt-1 text-lg font-semibold text-foreground">
                  Contact for Details
                </div>
              </div>
              <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-center">
                <div className="text-sm text-muted-foreground">
                  Marketing Contribution
                </div>
                <div className="mt-1 text-lg font-semibold text-foreground">
                  Contact for Details
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-accent/20 bg-accent/5 p-6 text-center">
              <p className="text-sm leading-relaxed text-foreground">
                Many traditional franchise models require a physical storefront
                and significant capital. A Reserve Memorials license is designed
                to let you operate from a home office with a lower barrier to
                entry.
              </p>
            </div>

            <Separator />

            <p className="text-xs leading-relaxed text-muted-foreground text-center">
              This is not an offer to sell a franchise. A license offering can
              only be made through proper legal documentation. Individual results
              vary. Reserve Memorials LLC reserves the right to modify terms,
              availability, and program details at any time.
            </p>
          </CardContent>
        </Card>
      </FadeIn>
    </section>
  );
}
