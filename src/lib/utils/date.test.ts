import { describe, expect, it } from "vitest";

import { indiaDateTimeToUtc, toIndiaDateTimeInput } from "@/lib/utils/date";

describe("India event date conversion", () => {
  it("stores India time as UTC", () => {
    expect(indiaDateTimeToUtc("2026-12-20T18:30")).toBe(
      "2026-12-20T13:00:00.000Z",
    );
  });

  it("round-trips a UTC value for admin editing", () => {
    expect(toIndiaDateTimeInput("2026-12-20T13:00:00.000Z")).toBe(
      "2026-12-20T18:30",
    );
  });
});
