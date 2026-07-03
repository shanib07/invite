import { CalendarDays, CheckCircle2, Clock3, Mail } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/admin/page-header";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { countEvents } from "@/lib/repositories/events";
import { countInvitations } from "@/lib/repositories/invitations";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [events, invitations, accepted, pending] = await Promise.all([
    countEvents(),
    countInvitations(),
    countInvitations("accepted"),
    countInvitations("pending"),
  ]);
  const cards = [
    { label: "Events", value: events, icon: CalendarDays },
    { label: "Invitations", value: invitations, icon: Mail },
    { label: "Accepted", value: accepted, icon: CheckCircle2 },
    { label: "Awaiting RSVP", value: pending, icon: Clock3 },
  ];
  return (
    <>
      <PageHeader
        title="Overview"
        description="Create events, prepare personal invitation links, and follow every response."
        action={
          <Link className={buttonStyles()} href="/admin/invitations/new">
            Create invitation
          </Link>
        }
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <Icon aria-hidden className="size-5 text-accent" />
            <p className="mt-8 text-sm text-muted">{label}</p>
            <p className="mt-1 font-display text-4xl font-semibold">{value}</p>
          </Card>
        ))}
      </section>
      <Card className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold">
            Ready for a new celebration?
          </h2>
          <p className="mt-1 text-sm text-muted">
            Start with the event details, then create a link for every guest.
          </p>
        </div>
        <Link className={buttonStyles("secondary")} href="/admin/events/new">
          Create event
        </Link>
      </Card>
    </>
  );
}
