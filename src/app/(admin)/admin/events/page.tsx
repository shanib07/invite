import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

import { removeEvent } from "@/app/(admin)/admin/actions";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { Notice } from "@/components/admin/notice";
import { PageHeader } from "@/components/admin/page-header";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/field";
import { listEvents } from "@/lib/repositories/events";
import { formatEventDate, formatEventTime } from "@/lib/utils/date";

export const dynamic = "force-dynamic";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
    success?: string;
    error?: string;
  }>;
}) {
  const params = await searchParams;
  const search = params.search?.slice(0, 80) ?? "";
  const page = Math.max(1, Number(params.page) || 1);
  const result = await listEvents(search, page);
  const pages = Math.ceil(result.total / result.pageSize);
  return (
    <>
      <PageHeader
        title="Events"
        description="Event details are shared by every linked invitation."
        action={
          <Link className={buttonStyles()} href="/admin/events/new">
            <Plus aria-hidden className="size-4" />
            New event
          </Link>
        }
      />
      <Notice error={params.error} success={params.success} />
      <form className="mb-5 flex gap-2">
        <Input
          aria-label="Search events"
          defaultValue={search}
          name="search"
          placeholder="Search title or venue"
        />
        <button className={buttonStyles("secondary")} type="submit">
          Search
        </button>
      </form>
      {result.items.length === 0 ? (
        <EmptyState
          title="No events yet"
          description="Create your first event before preparing guest invitations."
          action={
            <Link className={buttonStyles()} href="/admin/events/new">
              Create event
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4">
          {result.items.map((event) => (
            <Card
              className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"
              key={event.id}
            >
              <div>
                <p className="text-xs font-bold tracking-widest text-accent uppercase">
                  {event.theme}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold">
                  {event.title}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {formatEventDate(event.event_date)} ·{" "}
                  {formatEventTime(event.event_date)} · {event.venue}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  aria-label={`Edit ${event.title}`}
                  className={buttonStyles("secondary")}
                  href={`/admin/events/${event.id}/edit`}
                >
                  <Pencil aria-hidden className="size-4" />
                  Edit
                </Link>
                <form action={removeEvent}>
                  <input name="id" type="hidden" value={event.id} />
                  <ConfirmSubmit
                    aria-label={`Delete ${event.title}`}
                    className={buttonStyles("danger")}
                    message={`Delete ${event.title}? This cannot be undone.`}
                  >
                    <Trash2 aria-hidden className="size-4" />
                    Delete
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
              href={`/admin/events?search=${encodeURIComponent(search)}&page=${page - 1}`}
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
              href={`/admin/events?search=${encodeURIComponent(search)}&page=${page + 1}`}
            >
              Next
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
