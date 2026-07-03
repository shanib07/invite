"use server";

import { revalidatePath } from "next/cache";
import type { Route } from "next";
import { redirect } from "next/navigation";

import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "@/lib/repositories/events";
import {
  createInvitation,
  deleteInvitation,
  updateInvitation,
} from "@/lib/repositories/invitations";
import { indiaDateTimeToUtc } from "@/lib/utils/date";
import { eventSchema } from "@/lib/validation/event";
import { invitationSchema } from "@/lib/validation/invitation";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

export async function saveEvent(formData: FormData) {
  const id = value(formData, "id");
  const parsed = eventSchema.safeParse({
    title: value(formData, "title"),
    subtitle: value(formData, "subtitle"),
    eventDate: value(formData, "eventDate"),
    venue: value(formData, "venue"),
    address: value(formData, "address"),
    googleMapsUrl: value(formData, "googleMapsUrl"),
    theme: value(formData, "theme"),
  });
  if (!parsed.success)
    redirect(
      `${id ? `/admin/events/${id}/edit` : "/admin/events/new"}?error=Please+check+the+highlighted+details` as Route,
    );
  const data = parsed.data;
  const input = {
    title: data.title,
    subtitle: data.subtitle || null,
    event_date: indiaDateTimeToUtc(data.eventDate),
    venue: data.venue,
    address: data.address,
    google_maps_url: data.googleMapsUrl || null,
    theme: data.theme,
  };
  if (id) await updateEvent(id, input);
  else await createEvent(input);
  revalidatePath("/admin");
  revalidatePath("/admin/events");
  redirect("/admin/events?success=Event+saved");
}

export async function removeEvent(formData: FormData) {
  const result = await deleteEvent(value(formData, "id"));
  revalidatePath("/admin");
  revalidatePath("/admin/events");
  redirect(
    result.deleted
      ? "/admin/events?success=Event+deleted"
      : "/admin/events?error=Delete+its+invitations+first",
  );
}

export async function saveInvitation(formData: FormData) {
  const id = value(formData, "id");
  const parsed = invitationSchema.safeParse({
    eventId: value(formData, "eventId"),
    guestName: value(formData, "guestName"),
    customMessage: value(formData, "customMessage"),
  });
  if (!parsed.success)
    redirect(
      `${id ? `/admin/invitations/${id}/edit` : "/admin/invitations/new"}?error=Please+check+the+invitation+details` as Route,
    );
  const input = {
    event_id: parsed.data.eventId,
    guest_name: parsed.data.guestName,
    custom_message: parsed.data.customMessage || null,
  };
  const invitation = id
    ? await updateInvitation(id, input)
    : await createInvitation(input);
  revalidatePath("/admin");
  revalidatePath("/admin/invitations");
  revalidatePath(`/invite/${invitation.slug}`);
  redirect(
    `/admin/invitations?success=${id ? "Invitation+saved" : "Invitation+created"}`,
  );
}

export async function removeInvitation(formData: FormData) {
  await deleteInvitation(value(formData, "id"));
  revalidatePath("/admin");
  revalidatePath("/admin/invitations");
  redirect("/admin/invitations?success=Invitation+deleted");
}
