import { CalendarDays, Clock3, MapPin } from "lucide-react";
import * as motion from "motion/react-client";

import { Countdown } from "@/components/countdown/countdown";
import { RsvpForm } from "@/components/invitation/rsvp-form";
import { formatEventDate, formatEventTime } from "@/lib/utils/date";
import type { InvitationWithEvent } from "@/types/domain";

export function InvitationView({
  invitation,
}: {
  invitation: InvitationWithEvent;
}) {
  const { event } = invitation;
  return (
    <main
      className={`invitation-${event.theme} min-h-screen bg-[var(--invite-bg)] px-4 py-5 text-[var(--invite-fg)] sm:py-10`}
    >
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-current/10 bg-[var(--invite-card)] shadow-[0_30px_90px_rgba(20,25,18,0.14)]"
      >
        <header className="relative overflow-hidden px-6 pt-14 pb-11 text-center sm:px-12">
          <div
            aria-hidden
            className="absolute top-0 left-1/2 h-px w-32 -translate-x-1/2 bg-[var(--invite-accent)]"
          />
          <p className="text-[10px] font-bold tracking-[0.34em] text-[var(--invite-accent)] uppercase">
            You are warmly invited
          </p>
          <h1 className="mt-7 font-display text-5xl leading-[0.9] font-semibold sm:text-6xl">
            {event.title}
          </h1>
          {event.subtitle && (
            <p className="mt-4 text-sm leading-6 text-[var(--invite-muted)]">
              {event.subtitle}
            </p>
          )}
          <div className="mx-auto my-8 h-px w-14 bg-[var(--invite-accent)]" />
          <p className="text-xs tracking-widest text-[var(--invite-muted)] uppercase">
            Especially for
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold italic">
            {invitation.guest_name}
          </h2>
          {invitation.custom_message && (
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[var(--invite-muted)]">
              {invitation.custom_message}
            </p>
          )}
        </header>
        <section className="border-y border-current/10 px-6 py-8 sm:px-12">
          <Countdown target={event.event_date} />
        </section>
        <section className="grid gap-5 px-6 py-9 sm:px-12">
          <Detail
            icon={CalendarDays}
            label="Date"
            value={formatEventDate(event.event_date)}
          />
          <Detail
            icon={Clock3}
            label="Time"
            value={`${formatEventTime(event.event_date)} IST`}
          />
          <Detail
            icon={MapPin}
            label="Venue"
            value={`${event.venue} · ${event.address}`}
          />
          {event.google_maps_url && (
            <a
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--invite-accent)] px-5 text-sm font-bold text-white transition hover:opacity-90"
              href={event.google_maps_url}
              rel="noreferrer"
              target="_blank"
            >
              Open in Google Maps
            </a>
          )}
        </section>
        <section className="border-t border-current/10 px-6 py-9 sm:px-12">
          <p className="mb-5 text-center text-[10px] font-bold tracking-[0.28em] text-[var(--invite-accent)] uppercase">
            Kindly respond
          </p>
          <RsvpForm current={invitation.rsvp_status} slug={invitation.slug} />
        </section>
      </motion.article>
      <p className="mx-auto mt-5 text-center text-[10px] tracking-widest text-[var(--invite-muted)] uppercase">
        Made with Invite
      </p>
    </main>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--invite-bg)] text-[var(--invite-accent)]">
        <Icon aria-hidden className="size-4" />
      </span>
      <div>
        <p className="text-[9px] font-bold tracking-widest text-[var(--invite-muted)] uppercase">
          {label}
        </p>
        <p className="mt-1 text-sm leading-6 font-semibold">{value}</p>
      </div>
    </div>
  );
}
