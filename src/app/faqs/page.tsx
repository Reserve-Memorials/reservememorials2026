import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQS = [
  {
    q: "How long does the process take?",
    a: "Timelines vary by material, engraving complexity, and scheduling. We’ll provide clear milestones and updates.",
  },
  {
    q: "Can you help with design if I’m not sure what I want?",
    a: "Yes — our guided design flow and advisor support help you choose style, layout, and details confidently.",
  },
  {
    q: "Do you handle installation?",
    a: "We coordinate installation with the appropriate local team and confirm requirements before finalizing.",
  },
];

export default function FaqsPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_60%)]/[14]" />
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Badge className="w-fit" variant="secondary">
            FAQs
          </Badge>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Answers, without the overwhelm.
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            We’ll expand this with your real policies and details. For now: a clean, working FAQ page that won’t 404.
          </p>
        </div>
      </section>

      <section className="grid gap-4">
        {FAQS.map((f) => (
          <Card key={f.q} className="overflow-hidden">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg">{f.q}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{f.a}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="overflow-hidden">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 py-6">
          <div className="text-sm text-muted-foreground">Have a specific question?</div>
          <Button asChild className="group">
            <Link href="/contact-us">
              Contact us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

