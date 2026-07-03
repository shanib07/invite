import { z } from "zod";

import { eventThemes } from "@/types/domain";

const mapsUrl = z
  .url("Enter a valid URL")
  .max(2048)
  .refine((value) => {
    const host = new URL(value).hostname;
    return host === "maps.app.goo.gl" || host.includes("google.");
  }, "Enter a Google Maps URL");

export const eventSchema = z.object({
  title: z.string().trim().min(1).max(120),
  subtitle: z.string().trim().max(180).optional().or(z.literal("")),
  eventDate: z.string().min(16).max(16),
  venue: z.string().trim().min(1).max(160),
  address: z.string().trim().min(1).max(500),
  googleMapsUrl: mapsUrl.optional().or(z.literal("")),
  theme: z.enum(eventThemes),
});
