import Link from "next/link";

import { saveInvitation } from "@/app/(admin)/admin/actions";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import type { Event, Invitation } from "@/types/domain";

export function InvitationForm({
  events,
  invitation,
}: {
  events: Event[];
  invitation?: Invitation;
}) {
  return (
    <form action={saveInvitation}>
      <Card className="grid gap-5">
        <input name="id" type="hidden" value={invitation?.id ?? ""} />
        <Field label="Event">
          <Select
            defaultValue={invitation?.event_id ?? ""}
            name="eventId"
            required
          >
            <option disabled value="">
              Select an event
            </option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Guest name">
          <Input
            autoComplete="off"
            defaultValue={invitation?.guest_name}
            maxLength={120}
            name="guestName"
            required
          />
        </Field>
        <Field hint="Optional; shown after the greeting" label="Custom message">
          <Textarea
            defaultValue={invitation?.custom_message ?? ""}
            maxLength={1000}
            name="customMessage"
          />
        </Field>
        <div className="flex flex-wrap gap-3">
          <button className={buttonStyles()} type="submit">
            Save invitation
          </button>
          <Link className={buttonStyles("secondary")} href="/admin/invitations">
            Cancel
          </Link>
        </div>
      </Card>
    </form>
  );
}
