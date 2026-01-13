import { ServiceDetailPage } from "@/components/marketing/ServiceDetailPage";

export default function DoveReleasePage() {
  return (
    <ServiceDetailPage
      eyebrow="Service"
      title="Dove release"
      description="A meaningful, peaceful moment to honor a life—handled professionally and respectfully for memorials and services."
      highlights={[
        {
          title: "Handled with care",
          desc: "We coordinate timing and logistics so the moment feels calm and intentional.",
        },
        {
          title: "Appropriate guidance",
          desc: "We’ll help confirm what’s allowed and what’s best for your setting.",
        },
        {
          title: "Simple planning",
          desc: "A clear plan so families can focus on what matters.",
        },
      ]}
    />
  );
}

