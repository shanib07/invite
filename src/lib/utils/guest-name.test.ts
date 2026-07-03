import { describe, expect, it } from "vitest";

import { guestKey, guestNameFromPath } from "@/lib/utils/guest-name";

describe("editable guest invitation names", () => {
  it("turns a link segment into a display name", () => {
    expect(guestNameFromPath("mohammed-shanib")).toBe("Mohammed Shanib");
  });

  it("uses a stable case-insensitive database key", () => {
    expect(guestKey("Mikku")).toBe("mikku");
  });

  it("rejects unsafe path content", () => {
    expect(guestNameFromPath("<script>bad</script>")).toBeNull();
  });
});
