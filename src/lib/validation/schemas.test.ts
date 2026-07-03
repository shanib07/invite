import { describe, expect, it } from "vitest";

import { eventSchema } from "@/lib/validation/event";
import { invitationSchema } from "@/lib/validation/invitation";

describe("domain validation", () => {
  it("accepts an event with a supported Google Maps URL", () => {
    expect(
      eventSchema.safeParse({
        title: "A Celebration",
        subtitle: "Together",
        eventDate: "2026-12-20T18:30",
        venue: "The Garden",
        address: "Bengaluru",
        googleMapsUrl: "https://maps.app.goo.gl/abcdefgh",
        theme: "botanical",
      }).success,
    ).toBe(true);
  });

  it("rejects non-Google map links", () => {
    expect(
      eventSchema.safeParse({
        title: "A Celebration",
        subtitle: "",
        eventDate: "2026-12-20T18:30",
        venue: "The Garden",
        address: "Bengaluru",
        googleMapsUrl: "https://example.com/map",
        theme: "ivory",
      }).success,
    ).toBe(false);
  });

  it("requires a real event id for invitations", () => {
    expect(
      invitationSchema.safeParse({
        eventId: "not-an-id",
        guestName: "Asha",
        customMessage: "",
      }).success,
    ).toBe(false);
  });
});
