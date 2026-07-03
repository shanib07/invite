import { describe, expect, it } from "vitest";

import { generateInvitationSlug } from "@/lib/utils/slug";

describe("generateInvitationSlug", () => {
  it("creates 12-character base64url capability tokens", () => {
    expect(generateInvitationSlug()).toMatch(/^[A-Za-z0-9_-]{12}$/);
  });

  it("does not repeat across a representative batch", () => {
    const slugs = new Set(Array.from({ length: 1000 }, generateInvitationSlug));
    expect(slugs.size).toBe(1000);
  });
});
