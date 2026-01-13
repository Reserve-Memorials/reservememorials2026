import { ServiceDetailPage } from "@/components/marketing/ServiceDetailPage";

export default function TraditionalHeadstonesPage() {
  return (
    <ServiceDetailPage
      eyebrow="Service"
      title="Traditional headstones"
      description="Classic upright and flat markers with premium stone, engraving, and a design process that makes decisions feel clear—not overwhelming."
      highlights={[
        {
          title: "Design guidance",
          desc: "We help you choose style, layout, and personalization that feels right.",
        },
        {
          title: "Quality engraving",
          desc: "Clean lettering, meaningful symbols, and balanced spacing—crafted to last.",
        },
        {
          title: "Coordination support",
          desc: "We coordinate requirements and details so there are no surprises later.",
        },
      ]}
    />
  );
}

