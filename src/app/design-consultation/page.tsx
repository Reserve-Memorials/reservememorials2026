import { ServiceDetailPage } from "@/components/marketing/ServiceDetailPage";

export default function DesignConsultationPage() {
  return (
    <ServiceDetailPage
      eyebrow="Service"
      title="Design consultation"
      description="A guided session to choose style, layout, materials, and timeline confidently—perfect if you’re not sure where to start."
      highlights={[
        {
          title: "Quick clarity",
          desc: "We narrow options quickly based on style, setting, and your priorities.",
        },
        {
          title: "Visual direction",
          desc: "You’ll leave with a clear design direction and the next steps.",
        },
        {
          title: "Transparent timeline",
          desc: "We outline milestones so you know what happens when.",
        },
      ]}
    />
  );
}

