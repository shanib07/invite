import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { guestKey } from "@/lib/utils/guest-name";
import type { InvitationWithEvent, RsvpStatus } from "@/types/domain";

const PAGE_SIZE = 25;
const WEDDING_ID = "00000000-0000-4000-8000-000000000717";

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

export async function getInvitationForGuest(
  guestName: string,
): Promise<InvitationWithEvent> {
  const client = createAdminClient();
  const [
    { data: event, error: eventError },
    { data: invitation, error: invitationError },
  ] = await Promise.all([
    client.from("events").select("*").eq("id", WEDDING_ID).single(),
    client
      .from("invitations")
      .select("*")
      .eq("slug", guestKey(guestName))
      .maybeSingle(),
  ]);
  if (eventError || !event)
    throw new Error("Unable to load wedding", { cause: eventError });
  if (invitationError)
    throw new Error("Unable to load RSVP", { cause: invitationError });
  const now = new Date().toISOString();
  return invitation
    ? { ...invitation, event }
    : {
        id: "",
        event_id: event.id,
        slug: guestKey(guestName),
        guest_name: guestName,
        custom_message:
          "We would be delighted to celebrate this special day with you.",
        rsvp_status: "pending",
        created_at: now,
        updated_at: now,
        event,
      };
}

export async function respondForGuest(
  guestName: string,
  status: Exclude<RsvpStatus, "pending">,
) {
  const client = createAdminClient();
  const key = guestKey(guestName);
  const { error: insertError } = await client.from("invitations").upsert(
    {
      event_id: WEDDING_ID,
      slug: key,
      guest_name: guestName,
      custom_message: null,
      rsvp_status: "pending",
    },
    { onConflict: "slug", ignoreDuplicates: true },
  );
  if (insertError)
    throw new Error("Unable to create RSVP", { cause: insertError });
  const { data, error } = await client
    .from("invitations")
    .update({ rsvp_status: status })
    .eq("slug", key)
    .eq("rsvp_status", "pending")
    .select("rsvp_status")
    .maybeSingle();
  if (error) throw new Error("Unable to save RSVP", { cause: error });
  if (data) return data.rsvp_status;
  const { data: current, error: currentError } = await client
    .from("invitations")
    .select("rsvp_status")
    .eq("slug", key)
    .single();
  if (currentError)
    throw new Error("Unable to load RSVP", { cause: currentError });
  return current.rsvp_status;
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
