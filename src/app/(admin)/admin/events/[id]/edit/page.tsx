import { notFound } from "next/navigation";

import { EventForm } from "@/components/admin/event-form";
import { Notice } from "@/components/admin/notice";
import { PageHeader } from "@/components/admin/page-header";
import { getEvent } from "@/lib/repositories/events";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const event = await getEvent(id);
  if (!event) notFound();
  return (
    <>
      <PageHeader
        title="Edit event"
        description="Changes update every invitation connected to this event."
      />
      <Notice error={query.error} />
      <EventForm event={event} />
    </>
  );
}
