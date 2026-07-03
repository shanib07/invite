import { expect, test } from "@playwright/test";

test("shows the single-wedding RSVP dashboard", async ({ page }) => {
  await page.goto("/admin");
  await expect(
    page.getByRole("heading", { name: "Wedding RSVP" }),
  ).toBeVisible();
  await expect(page.getByText("Shazin & Safa").first()).toBeVisible();
  await expect(page.getByText("17 July 2026").first()).toBeVisible();
});

test("shows a polished missing invitation state", async ({ page }) => {
  await page.goto("/invite/NotARealLink");
  await expect(
    page.getByRole("heading", { name: "Invitation not found" }),
  ).toBeVisible();
});
