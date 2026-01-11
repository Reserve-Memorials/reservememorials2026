import { redirect } from "next/navigation";

export default async function DesignSessionPage({
  params,
}: {
  params: { id: string };
}) {
  redirect(`/portal/design/session/${params.id}`);
}


