import { Notice } from "@/components/admin/notice";
import { PageHeader } from "@/components/admin/page-header";
import { EventForm } from "@/components/admin/event-form";

export default async function NewEventPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <PageHeader
        title="New event"
        description="Set the shared details guests will see on every invitation."
      />
      <Notice error={params.error} />
      <EventForm />
    </>
  );
}
