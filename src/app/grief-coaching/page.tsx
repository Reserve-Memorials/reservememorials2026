import { ServiceDetailPage } from "@/components/marketing/ServiceDetailPage";

export default function GriefCoachingPage() {
  return (
    <ServiceDetailPage
      eyebrow="Service"
      title="Grief coaching"
      description="Support resources for families navigating loss—compassionate, practical guidance that meets people where they are."
      highlights={[
        {
          title: "Compassionate approach",
          desc: "A calm, human-first experience focused on support and clarity.",
        },
        {
          title: "Practical resources",
          desc: "Guidance and tools families can use immediately—at their own pace.",
        },
        {
          title: "Flexible scheduling",
          desc: "We’ll work around what’s realistic for you and your family.",
        },
      ]}
    />
  );
}

