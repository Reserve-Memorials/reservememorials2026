"use client";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/marketing/FadeIn";
import { LICENSE_FAQS } from "@/lib/marketing/license-faqs";

export function LicenseFAQ() {
  return (
    <section className="mx-auto max-w-4xl space-y-10">
      <FadeIn>
        <div className="space-y-3 text-center">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            FAQs
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Common questions
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Everything you need to know about the Reserve Memorials license
            opportunity.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Accordion type="single" collapsible className="space-y-4">
          {LICENSE_FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border/60 rounded-lg px-6 shadow-sm transition-all duration-200 hover:border-primary/20 hover:shadow-md"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
    </section>
  );
}
