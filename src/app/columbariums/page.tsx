import { ServiceDetailPage } from "@/components/marketing/ServiceDetailPage";

export default function ColumbariumsPage() {
  return (
    <ServiceDetailPage
      eyebrow="Service"
      title="Columbariums"
      description="We design and build custom columbariums that feel timeless, dignified, and built for decades of use—ideal for churches, cemeteries, and community spaces."
      highlights={[
        {
          title: "Custom design",
          desc: "Layouts, niches, and finishes tailored to your space and community needs.",
        },
        {
          title: "Durable materials",
          desc: "Stone and construction choices designed for longevity and minimal maintenance.",
        },
        {
          title: "Guided process",
          desc: "Clear steps from concept → approval → fabrication → coordination.",
        },
      ]}
    />
  );
}

