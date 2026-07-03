import { CheckCircle2, Clock3, Search, Users, XCircle } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  countInvitations,
  listInvitations,
} from "@/lib/repositories/invitations";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = params.search?.slice(0, 80) ?? "";
  const page = Math.max(1, Number(params.page) || 1);
  const [result, total, accepted, declined, pending] = await Promise.all([
    listInvitations(search, page),
    countInvitations(),
    countInvitations("accepted"),
    countInvitations("declined"),
    countInvitations("pending"),
  ]);
  const pages = Math.ceil(result.total / result.pageSize);
  const stats = [
    { label: "All guests", value: total, icon: Users },
    { label: "Accepted", value: accepted, icon: CheckCircle2 },
    { label: "Declined", value: declined, icon: XCircle },
    { label: "Awaiting reply", value: pending, icon: Clock3 },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Shazin & Safa · 17 July 2026"
        title="Wedding RSVP"
        description="A simple view of who has accepted, declined, or has not responded yet."
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <Icon aria-hidden className="size-5 text-accent" />
            <p className="mt-7 text-sm text-muted">{label}</p>
            <p className="mt-1 font-display text-4xl font-semibold">{value}</p>
          </Card>
        ))}
      </section>
      <section className="mt-8">
        <form className="mb-4 flex max-w-xl gap-2">
          <label className="relative flex-1">
            <span className="sr-only">Search guests</span>
            <Search
              aria-hidden
              className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            />
            <Input
              className="pl-10"
              defaultValue={search}
              name="search"
              placeholder="Search guest name"
            />
          </label>
          <button
            className="min-h-11 rounded-xl bg-accent px-5 text-sm font-semibold text-white"
            type="submit"
          >
            Search
          </button>
        </form>
        {result.items.length === 0 ? (
          <Card className="py-14 text-center">
            <h2 className="font-display text-3xl font-semibold">
              {search ? "No guest found" : "No guests added yet"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              {search
                ? "Try a different name."
                : "The RSVP list will appear here after guest invitations are imported."}
            </p>
          </Card>
        ) : (
          <Card className="overflow-hidden p-0">
            <div className="hidden grid-cols-[1fr_1fr_auto] gap-4 border-b bg-black/[0.025] px-5 py-3 text-xs font-bold tracking-wider text-muted uppercase sm:grid">
              <span>Guest</span>
              <span>Wedding</span>
              <span>Status</span>
            </div>
            <div className="divide-y">
              {result.items.map((invitation) => (
                <article
                  className="grid gap-2 px-5 py-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center sm:gap-4"
                  key={invitation.id}
                >
                  <div>
                    <h2 className="font-semibold">{invitation.guest_name}</h2>
                    <p className="text-xs text-muted">Personal invitation</p>
                  </div>
                  <p className="text-sm text-muted">Shazin & Safa</p>
                  <Status value={invitation.rsvp_status} />
                </article>
              ))}
            </div>
          </Card>
        )}
        {pages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-5 flex items-center gap-4 text-sm"
          >
            <Link
              className={`rounded-lg border px-3 py-2 ${page <= 1 ? "pointer-events-none opacity-40" : ""}`}
              href={`/admin?search=${encodeURIComponent(search)}&page=${Math.max(1, page - 1)}`}
            >
              Previous
            </Link>
            <span className="text-muted">
              Page {page} of {pages}
            </span>
            <Link
              className={`rounded-lg border px-3 py-2 ${page >= pages ? "pointer-events-none opacity-40" : ""}`}
              href={`/admin?search=${encodeURIComponent(search)}&page=${Math.min(pages, page + 1)}`}
            >
              Next
            </Link>
          </nav>
        )}
      </section>
    </>
  );
}

function Status({ value }: { value: "pending" | "accepted" | "declined" }) {
  const styles =
    value === "accepted"
      ? "bg-green-100 text-green-800"
      : value === "declined"
        ? "bg-red-100 text-red-800"
        : "bg-amber-100 text-amber-800";
  const label = value === "pending" ? "Awaiting reply" : value;
  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${styles}`}
    >
      {label}
    </span>
  );
}
