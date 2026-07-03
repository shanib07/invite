import Link from "next/link";

import { InvitationForm } from "@/components/admin/invitation-form";
import { Notice } from "@/components/admin/notice";
import { PageHeader } from "@/components/admin/page-header";
import { buttonStyles } from "@/components/ui/button";
import { getAllEvents } from "@/lib/repositories/events";

export const dynamic = "force-dynamic";

export default async function NewInvitationPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [events, query] = await Promise.all([getAllEvents(), searchParams]);
  return (
    <>
      <PageHeader
        title="New invitation"
        description="A secure guest link will be generated automatically."
      />
      <Notice error={query.error} />
      {events.length ? (
        <InvitationForm events={events} />
      ) : (
        <p className="rounded-2xl border bg-card p-8 text-sm">
          Create an event first.{" "}
          <Link className={buttonStyles("secondary")} href="/admin/events/new">
            New event
          </Link>
        </p>
      )}
    </>
  );
}
