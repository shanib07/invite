import { expect, test } from "@playwright/test";

test("shows the single-wedding RSVP dashboard", async ({ page }) => {
  await page.goto("/admin");
  await expect(
    page.getByRole("heading", { name: "Wedding RSVP" }),
  ).toBeVisible();
  await expect(page.getByText("Shazin & Safa").first()).toBeVisible();
  await expect(page.getByText("17 July 2026").first()).toBeVisible();
});

test("personalizes an editable name link", async ({ page }) => {
  await page.goto("/invite/Mikku");
  await expect(page.getByRole("heading", { name: "Mikku" })).toBeVisible();
});
