import {
  GraduationCap,
  Home,
  MapPin,
  Shield,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/marketing/FadeIn";

const VALUE_PROPS = [
  {
    icon: Shield,
    title: "Proven Brand",
    description:
      "Join an established Ohio-based memorial company with a reputation for quality craftsmanship and compassionate service.",
  },
  {
    icon: Home,
    title: "Low Overhead",
    description:
      "No storefront required. Operate from a home office with minimal startup costs compared to traditional franchises.",
  },
  {
    icon: Wrench,
    title: "Turnkey Support",
    description:
      "We handle manufacturing, fulfillment, and supplier relationships. You focus on families in your community.",
  },
  {
    icon: TrendingUp,
    title: "Growing Market",
    description:
      "The memorial industry continues to grow, driven by demographic trends and steady long-term demand for personalized memorials.",
  },
  {
    icon: MapPin,
    title: "Exclusive Territory",
    description:
      "Secure your market. Each licensee gets a protected geographic territory to build their business.",
  },
  {
    icon: GraduationCap,
    title: "Training and Mentorship",
    description:
      "Comprehensive onboarding covers memorial design, cemetery regulations, sales, and customer service.",
  },
];

export function LicenseValueProps() {
  return (
    <section className="mx-auto max-w-6xl space-y-10">
      <FadeIn>
        <div className="space-y-3 text-center">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            Why Reserve Memorials
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A smarter path to business ownership
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Low overhead, exclusive territories, and a meaningful business
            helping families honor loved ones.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {VALUE_PROPS.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.1}>
            <Card className="h-full border-border/60 shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
