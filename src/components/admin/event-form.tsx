import Link from "next/link";

import { saveEvent } from "@/app/(admin)/admin/actions";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { toIndiaDateTimeInput } from "@/lib/utils/date";
import { themeMeta } from "@/lib/utils/themes";
import type { Event } from "@/types/domain";

export function EventForm({ event }: { event?: Event }) {
  return (
    <form action={saveEvent}>
      <Card className="grid gap-5">
        <input name="id" type="hidden" value={event?.id ?? ""} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Event title">
            <Input
              defaultValue={event?.title}
              maxLength={120}
              name="title"
              required
            />
          </Field>
          <Field label="Subtitle">
            <Input
              defaultValue={event?.subtitle ?? ""}
              maxLength={180}
              name="subtitle"
            />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field hint="India Standard Time" label="Date and time">
            <Input
              defaultValue={event ? toIndiaDateTimeInput(event.event_date) : ""}
              name="eventDate"
              required
              type="datetime-local"
            />
          </Field>
          <Field label="Theme">
            <Select defaultValue={event?.theme ?? "ivory"} name="theme">
              {Object.entries(themeMeta).map(([key, meta]) => (
                <option key={key} value={key}>
                  {meta.label} — {meta.description}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Venue">
          <Input
            defaultValue={event?.venue}
            maxLength={160}
            name="venue"
            required
          />
        </Field>
        <Field label="Address">
          <Textarea
            defaultValue={event?.address}
            maxLength={500}
            name="address"
            required
          />
        </Field>
        <Field hint="Optional HTTPS Google Maps link" label="Google Maps URL">
          <Input
            defaultValue={event?.google_maps_url ?? ""}
            name="googleMapsUrl"
            type="url"
          />
        </Field>
        <div className="flex flex-wrap gap-3">
          <button className={buttonStyles()} type="submit">
            Save event
          </button>
          <Link className={buttonStyles("secondary")} href="/admin/events">
            Cancel
          </Link>
        </div>
      </Card>
    </form>
  );
}
