"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { respondForGuest } from "@/lib/repositories/invitations";
import { guestNameFromPath } from "@/lib/utils/guest-name";

export interface RsvpState {
  status: "idle" | "success" | "error";
  message: string;
  response?: "accepted" | "declined";
}

const schema = z.object({
  guestName: z.string().min(1).max(120),
  response: z.enum(["accepted", "declined"]),
});

export async function submitRsvp(
  _state: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const parsed = schema.safeParse({
    guestName: formData.get("guestName"),
    response: formData.get("response"),
  });
  const guestName = parsed.success
    ? guestNameFromPath(parsed.data.guestName)
    : null;
  if (!parsed.success || !guestName)
    return {
      status: "error",
      message: "We couldn’t understand that response.",
    };
  try {
    const saved = await respondForGuest(guestName, parsed.data.response);
    revalidatePath(
      `/invite/${encodeURIComponent(guestName.replaceAll(" ", "-"))}`,
    );
    return {
      status: "success",
      response: saved === "pending" ? parsed.data.response : saved,
      message:
        saved === parsed.data.response
          ? "Your response has been saved."
          : "A response was already recorded for this name.",
    };
  } catch {
    return {
      status: "error",
      message: "We couldn’t save your response. Please try again.",
    };
  }
}
