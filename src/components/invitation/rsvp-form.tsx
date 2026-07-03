"use client";

import { Check, X } from "lucide-react";
import { useActionState } from "react";

import {
  submitRsvp,
  type RsvpState,
} from "@/app/(public)/invite/[slug]/actions";
import type { RsvpStatus } from "@/types/domain";

const initial: RsvpState = { status: "idle", message: "" };

export function RsvpForm({
  guestName,
  current,
}: {
  guestName: string;
  current: RsvpStatus;
}) {
  const [state, action, pending] = useActionState(submitRsvp, initial);
  const response =
    state.response ?? (current === "pending" ? undefined : current);
  if (response)
    return (
      <div
        className="rounded-2xl border border-current/10 bg-[var(--invite-card)] p-5 text-center"
        role="status"
      >
        <span className="mx-auto grid size-10 place-items-center rounded-full bg-[var(--invite-accent)] text-white">
          {response === "accepted" ? (
            <Check aria-hidden className="size-5" />
          ) : (
            <X aria-hidden className="size-5" />
          )}
        </span>
        <p className="mt-3 font-display text-2xl font-semibold">
          {response === "accepted"
            ? "We’ll see you there"
            : "Thank you for letting us know"}
        </p>
        <p className="mt-1 text-sm text-[var(--invite-muted)]">
          {state.message || "Your response has been recorded."}
        </p>
      </div>
    );
  return (
    <form action={action} className="grid gap-3">
      <input name="guestName" type="hidden" value={guestName} />
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          className="min-h-12 rounded-xl bg-[var(--invite-accent)] px-5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
          disabled={pending}
          name="response"
          value="accepted"
        >
          Accept invitation
        </button>
        <button
          className="min-h-12 rounded-xl border border-current/20 bg-transparent px-5 text-sm font-bold transition hover:bg-current/5 disabled:opacity-50"
          disabled={pending}
          name="response"
          value="declined"
        >
          Decline
        </button>
      </div>
      {state.status === "error" && (
        <p className="text-center text-sm text-red-700" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
