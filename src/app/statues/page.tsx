import { ServiceDetailPage } from "@/components/marketing/ServiceDetailPage";

export default function StatuesPage() {
  return (
    <ServiceDetailPage
      eyebrow="Service"
      title="Statues"
      description="Custom features and sculptures that capture a story with craftsmanship, balance, and restraint—designed to complement the space."
      highlights={[
        {
          title: "Tasteful detail",
          desc: "We guide choices so the result feels timeless and grounded.",
        },
        {
          title: "Material selection",
          desc: "Durable materials and finishes suited to your environment and goals.",
        },
        {
          title: "Collaborative approvals",
          desc: "Clear review steps so you feel confident before fabrication begins.",
        },
      ]}
    />
  );
}

