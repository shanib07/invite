import { z } from "zod";

export const invitationSchema = z.object({
  eventId: z.uuid(),
  guestName: z.string().trim().min(1).max(120),
  customMessage: z.string().trim().max(1000).optional().or(z.literal("")),
});
