import { expect, test } from "@playwright/test";

test("creates an event and invitation, records RSVP, and cleans up", async ({
  page,
  context,
}) => {
  const marker = Date.now();
  const eventTitle = `E2E Celebration ${marker}`;
  const guestName = `E2E Guest ${marker}`;

  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/admin/events/new");
  await page.getByLabel("Event title").fill(eventTitle);
  await page.getByLabel("Date and time").fill("2030-12-20T18:30");
  await page.getByLabel("Theme").selectOption("botanical");
  await page.getByLabel("Venue").fill("The Garden");
  await page.getByLabel("Address").fill("Bengaluru, Karnataka");
  await page.getByRole("button", { name: "Save event" }).click();
  await expect(page.getByText("Event saved")).toBeVisible();

  await page.goto("/admin/invitations/new");
  await page.getByLabel("Event").selectOption({ label: eventTitle });
  await page.getByLabel("Guest name").fill(guestName);
  await page.getByRole("button", { name: "Save invitation" }).click();
  await expect(page.getByText("Invitation created")).toBeVisible();
  await page.getByRole("button", { name: "Copy invitation link" }).click();
  const invitationUrl = await page.evaluate(() =>
    navigator.clipboard.readText(),
  );

  await page.goto(invitationUrl);
  await expect(page.getByRole("heading", { name: eventTitle })).toBeVisible();
  await expect(page.getByRole("heading", { name: guestName })).toBeVisible();
  await page.getByRole("button", { name: "Accept invitation" }).click();
  await expect(page.getByText("We’ll see you there")).toBeVisible();

  await page.goto(`/admin/invitations?search=${encodeURIComponent(guestName)}`);
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: `Delete ${guestName}` }).click();
  await expect(page.getByText("Invitation deleted")).toBeVisible();

  await page.goto(`/admin/events?search=${encodeURIComponent(eventTitle)}`);
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: `Delete ${eventTitle}` }).click();
  await expect(page.getByText("Event deleted")).toBeVisible();
});
