import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import type { InvitationWithEvent, RsvpStatus } from "@/types/domain";

const PAGE_SIZE = 25;

export async function listInvitations(search = "", page = 1) {
  const start = (Math.max(1, page) - 1) * PAGE_SIZE;
  let query = createAdminClient()
    .from("invitations")
    .select("*", { count: "exact" })
    .order("guest_name", { ascending: true })
    .range(start, start + PAGE_SIZE - 1);
  const safeSearch = search.replace(/[%_,().]/g, "").trim();
  if (safeSearch) query = query.ilike("guest_name", `%${safeSearch}%`);
  const { data, error, count } = await query;
  if (error) throw new Error("Unable to load guests", { cause: error });
  return { items: data, total: count ?? 0, pageSize: PAGE_SIZE };
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
    throw new Error("Unable to load wedding", { cause: eventError });
  return { ...data, event };
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
  if (error) throw new Error("Unable to count guests", { cause: error });
  return count ?? 0;
}
