import { createClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";

const run = process.env.RUN_INTEGRATION === "1" ? describe : describe.skip;

run("Supabase invitation constraints", () => {
  it("enforces a single RSVP transition", async () => {
    const client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!,
    );
    const { data: wedding, error: weddingError } = await client
      .from("events")
      .select("id")
      .eq("id", "00000000-0000-4000-8000-000000000717")
      .single();
    expect(weddingError).toBeNull();
    if (!wedding) throw new Error("Fixed wedding record is missing");
    const slug = `T${Date.now().toString(36)}`.padEnd(12, "x").slice(0, 12);
    const { error: inviteError } = await client.from("invitations").insert({
      event_id: wedding.id,
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
  });
});
