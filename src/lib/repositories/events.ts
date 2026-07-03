import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import type { Event } from "@/types/domain";

const PAGE_SIZE = 12;

export interface EventInput {
  title: string;
  subtitle: string | null;
  event_date: string;
  venue: string;
  address: string;
  google_maps_url: string | null;
  theme: Event["theme"];
}

export async function listEvents(search = "", page = 1) {
  const client = createAdminClient();
  const safeSearch = search.replace(/[%_,().]/g, "").trim();
  const start = (Math.max(1, page) - 1) * PAGE_SIZE;
  let query = client
    .from("events")
    .select("*", { count: "exact" })
    .order("event_date", { ascending: true })
    .range(start, start + PAGE_SIZE - 1);
  if (safeSearch)
    query = query.or(`title.ilike.%${safeSearch}%,venue.ilike.%${safeSearch}%`);
  const { data, error, count } = await query;
  if (error) throw new Error("Unable to load events", { cause: error });
  return { items: data, total: count ?? 0, pageSize: PAGE_SIZE };
}

export async function getAllEvents() {
  const { data, error } = await createAdminClient()
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });
  if (error) throw new Error("Unable to load events", { cause: error });
  return data;
}

export async function getEvent(id: string) {
  const { data, error } = await createAdminClient()
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Unable to load event", { cause: error });
  return data;
}

export async function createEvent(input: EventInput) {
  const { data, error } = await createAdminClient()
    .from("events")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error("Unable to create event", { cause: error });
  return data;
}

export async function updateEvent(id: string, input: EventInput) {
  const { data, error } = await createAdminClient()
    .from("events")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error("Unable to update event", { cause: error });
  return data;
}

export async function deleteEvent(id: string) {
  const { count, error: countError } = await createAdminClient()
    .from("invitations")
    .select("id", { count: "exact", head: true })
    .eq("event_id", id);
  if (countError)
    throw new Error("Unable to check event", { cause: countError });
  if ((count ?? 0) > 0)
    return { deleted: false, reason: "has-invitations" as const };
  const { error } = await createAdminClient()
    .from("events")
    .delete()
    .eq("id", id);
  if (error) throw new Error("Unable to delete event", { cause: error });
  return { deleted: true };
}

export async function countEvents() {
  const { count, error } = await createAdminClient()
    .from("events")
    .select("id", { count: "exact", head: true });
  if (error) throw new Error("Unable to count events", { cause: error });
  return count ?? 0;
}
