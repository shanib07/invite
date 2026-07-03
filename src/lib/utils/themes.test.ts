import { describe, expect, it } from "vitest";

import { themeMeta } from "@/lib/utils/themes";

describe("theme metadata", () => {
  it("defines all curated themes", () => {
    expect(Object.keys(themeMeta)).toEqual(["ivory", "midnight", "botanical"]);
  });
});
