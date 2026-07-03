import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

import { removeInvitation } from "@/app/(admin)/admin/actions";
import { CopyLink } from "@/components/admin/copy-link";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { Notice } from "@/components/admin/notice";
import { PageHeader } from "@/components/admin/page-header";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Select } from "@/components/ui/field";
import { getServerEnv } from "@/lib/env";
import { getAllEvents } from "@/lib/repositories/events";
import { listInvitations } from "@/lib/repositories/invitations";

export const dynamic = "force-dynamic";

export default async function InvitationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    event?: string;
    page?: string;
    success?: string;
    error?: string;
  }>;
}) {
  const params = await searchParams;
  const search = params.search?.slice(0, 80) ?? "";
  const eventId = params.event ?? "";
  const page = Math.max(1, Number(params.page) || 1);
  const [result, events] = await Promise.all([
    listInvitations(search, eventId, page),
    getAllEvents(),
  ]);
  const pages = Math.ceil(result.total / result.pageSize);
  const site = getServerEnv().NEXT_PUBLIC_SITE_URL;
  return (
    <>
      <PageHeader
        title="Invitations"
        description="Every guest receives a private, randomly generated invitation link."
        action={
          <Link className={buttonStyles()} href="/admin/invitations/new">
            <Plus aria-hidden className="size-4" />
            Create invitation
          </Link>
        }
      />
      <Notice error={params.error} success={params.success} />
      <form className="mb-5 grid gap-2 sm:grid-cols-[1fr_16rem_auto]">
        <Input
          aria-label="Search guests"
          defaultValue={search}
          name="search"
          placeholder="Search guest name"
        />
        <Select
          aria-label="Filter by event"
          defaultValue={eventId}
          name="event"
        >
          <option value="">All events</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </Select>
        <button className={buttonStyles("secondary")} type="submit">
          Filter
        </button>
      </form>
      {result.items.length === 0 ? (
        <EmptyState
          title="No invitations found"
          description={
            events.length
              ? "Create a personal link for your first guest."
              : "Create an event before adding invitations."
          }
          action={
            <Link
              className={buttonStyles()}
              href={
                events.length ? "/admin/invitations/new" : "/admin/events/new"
              }
            >
              {events.length ? "Create invitation" : "Create event"}
            </Link>
          }
        />
      ) : (
        <div className="grid gap-3">
          {result.items.map((invitation) => (
            <Card
              className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
              key={invitation.id}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-2xl font-semibold">
                    {invitation.guest_name}
                  </h2>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${invitation.rsvp_status === "accepted" ? "bg-green-100 text-green-800" : invitation.rsvp_status === "declined" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}
                  >
                    {invitation.rsvp_status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {invitation.event_title}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <CopyLink url={`${site}/invite/${invitation.slug}`} />
                <Link
                  className={buttonStyles("secondary")}
                  href={`/admin/invitations/${invitation.id}/edit`}
                >
                  <Pencil aria-hidden className="size-4" />
                  <span className="sr-only">Edit {invitation.guest_name}</span>
                </Link>
                <form action={removeInvitation}>
                  <input name="id" type="hidden" value={invitation.id} />
                  <ConfirmSubmit
                    className={buttonStyles("danger")}
                    message={`Delete ${invitation.guest_name}'s invitation?`}
                  >
                    <Trash2 aria-hidden className="size-4" />
                    <span className="sr-only">
                      Delete {invitation.guest_name}
                    </span>
                  </ConfirmSubmit>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-6 flex gap-3">
          {page > 1 && (
            <Link
              className={buttonStyles("secondary")}
              href={`/admin/invitations?page=${page - 1}`}
            >
              Previous
            </Link>
          )}
          <span className="self-center text-sm text-muted">
            Page {page} of {pages}
          </span>
          {page < pages && (
            <Link
              className={buttonStyles("secondary")}
              href={`/admin/invitations?page=${page + 1}`}
            >
              Next
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
