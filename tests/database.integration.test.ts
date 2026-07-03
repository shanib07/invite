import { createClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";

const run = process.env.RUN_INTEGRATION === "1" ? describe : describe.skip;

run("Supabase invitation constraints", () => {
  it("enforces a single RSVP transition", async () => {
    const client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!,
    );
    const { data: event, error: eventError } = await client
      .from("events")
      .insert({
        title: "Integration event",
        event_date: "2030-12-20T13:00:00.000Z",
        venue: "Test venue",
        address: "Test address",
        theme: "ivory",
      })
      .select()
      .single();
    expect(eventError).toBeNull();
    const slug = `T${Date.now().toString(36)}`.padEnd(12, "x").slice(0, 12);
    const { error: inviteError } = await client.from("invitations").insert({
      event_id: event.id,
      slug,
      guest_name: "Integration guest",
      rsvp_status: "pending",
    });
    expect(inviteError).toBeNull();
    const first = await client
      .from("invitations")
      .update({ rsvp_status: "accepted" })
      .eq("slug", slug)
      .eq("rsvp_status", "pending")
      .select();
    const second = await client
      .from("invitations")
      .update({ rsvp_status: "declined" })
      .eq("slug", slug)
      .eq("rsvp_status", "pending")
      .select();
    expect(first.data).toHaveLength(1);
    expect(second.data).toHaveLength(0);
    await client.from("invitations").delete().eq("slug", slug);
    await client.from("events").delete().eq("id", event.id);
  });
});
