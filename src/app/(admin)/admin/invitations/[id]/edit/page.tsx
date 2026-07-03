import { notFound } from "next/navigation";

import { InvitationForm } from "@/components/admin/invitation-form";
import { Notice } from "@/components/admin/notice";
import { PageHeader } from "@/components/admin/page-header";
import { getAllEvents } from "@/lib/repositories/events";
import { getInvitation } from "@/lib/repositories/invitations";

export const dynamic = "force-dynamic";

export default async function EditInvitationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ id }, query, events] = await Promise.all([
    params,
    searchParams,
    getAllEvents(),
  ]);
  const invitation = await getInvitation(id);
  if (!invitation) notFound();
  return (
    <>
      <PageHeader
        title="Edit invitation"
        description="The existing guest link remains unchanged."
      />
      <Notice error={query.error} />
      <InvitationForm events={events} invitation={invitation} />
    </>
  );
}
