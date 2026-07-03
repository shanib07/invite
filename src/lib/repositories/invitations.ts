import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { generateInvitationSlug } from "@/lib/utils/slug";
import type {
  Invitation,
  InvitationWithEvent,
  RsvpStatus,
} from "@/types/domain";

const PAGE_SIZE = 15;

export interface InvitationInput {
  event_id: string;
  guest_name: string;
  custom_message: string | null;
}

export interface InvitationListItem extends Invitation {
  event_title: string;
}

export async function listInvitations(search = "", eventId = "", page = 1) {
  const client = createAdminClient();
  const start = (Math.max(1, page) - 1) * PAGE_SIZE;
  let query = client
    .from("invitations")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(start, start + PAGE_SIZE - 1);
  if (search) query = query.ilike("guest_name", `%${search}%`);
  if (eventId) query = query.eq("event_id", eventId);
  const { data, error, count } = await query;
  if (error) throw new Error("Unable to load invitations", { cause: error });
  const eventIds = [...new Set(data.map((item) => item.event_id))];
  const { data: events, error: eventsError } = eventIds.length
    ? await client.from("events").select("id,title").in("id", eventIds)
    : { data: [], error: null };
  if (eventsError)
    throw new Error("Unable to load invitation events", { cause: eventsError });
  const titles = new Map(events.map((event) => [event.id, event.title]));
  return {
    items: data.map((item) => ({
      ...item,
      event_title: titles.get(item.event_id) ?? "Unknown event",
    })),
    total: count ?? 0,
    pageSize: PAGE_SIZE,
  };
}

export async function getInvitation(id: string) {
  const { data, error } = await createAdminClient()
    .from("invitations")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Unable to load invitation", { cause: error });
  return data;
}

export async function getInvitationBySlug(
  slug: string,
): Promise<InvitationWithEvent | null> {
  const client = createAdminClient();
  const { data, error } = await client
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error("Unable to load invitation", { cause: error });
  if (!data) return null;
  const { data: event, error: eventError } = await client
    .from("events")
    .select("*")
    .eq("id", data.event_id)
    .single();
  if (eventError)
    throw new Error("Unable to load invitation event", { cause: eventError });
  return { ...data, event };
}

export async function createInvitation(input: InvitationInput) {
  const client = createAdminClient();
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const { data, error } = await client
      .from("invitations")
      .insert({
        ...input,
        slug: generateInvitationSlug(),
        rsvp_status: "pending",
      })
      .select()
      .single();
    if (!error) return data;
    if (error.code !== "23505")
      throw new Error("Unable to create invitation", { cause: error });
  }
  throw new Error("Unable to generate a unique invitation link");
}

export async function updateInvitation(id: string, input: InvitationInput) {
  const { data, error } = await createAdminClient()
    .from("invitations")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error("Unable to update invitation", { cause: error });
  return data;
}

export async function deleteInvitation(id: string) {
  const { error } = await createAdminClient()
    .from("invitations")
    .delete()
    .eq("id", id);
  if (error) throw new Error("Unable to delete invitation", { cause: error });
}

export async function updateRsvpIfPending(
  slug: string,
  status: Exclude<RsvpStatus, "pending">,
) {
  const client = createAdminClient();
  const { data, error } = await client
    .from("invitations")
    .update({ rsvp_status: status })
    .eq("slug", slug)
    .eq("rsvp_status", "pending")
    .select("rsvp_status")
    .maybeSingle();
  if (error) throw new Error("Unable to save RSVP", { cause: error });
  if (data) return data.rsvp_status;
  const current = await getInvitationBySlug(slug);
  return current?.rsvp_status ?? null;
}

export async function countInvitations(status?: RsvpStatus) {
  let query = createAdminClient()
    .from("invitations")
    .select("id", { count: "exact", head: true });
  if (status) query = query.eq("rsvp_status", status);
  const { count, error } = await query;
  if (error) throw new Error("Unable to count invitations", { cause: error });
  return count ?? 0;
}
