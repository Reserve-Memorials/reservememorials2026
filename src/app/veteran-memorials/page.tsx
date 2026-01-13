import { ServiceDetailPage } from "@/components/marketing/ServiceDetailPage";

export default function VeteranMemorialsPage() {
  return (
    <ServiceDetailPage
      eyebrow="Service"
      title="Veteran memorials"
      description="Honor service with respectful, precise design—emblems, inscriptions, and details handled with care and clarity."
      highlights={[
        {
          title: "Respectful design",
          desc: "Balanced layouts with the right level of detail—never busy, always dignified.",
        },
        {
          title: "Emblems & personalization",
          desc: "Support for symbols, inscriptions, and optional elements that matter to families.",
        },
        {
          title: "Clear approvals",
          desc: "Simple review steps so you can move forward with confidence.",
        },
      ]}
    />
  );
}

