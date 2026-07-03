"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { updateRsvpIfPending } from "@/lib/repositories/invitations";

export interface RsvpState {
  status: "idle" | "success" | "error";
  message: string;
  response?: "accepted" | "declined";
}

const schema = z.object({
  slug: z.string().regex(/^[A-Za-z0-9_-]{12}$/),
  response: z.enum(["accepted", "declined"]),
});

export async function submitRsvp(
  _state: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const parsed = schema.safeParse({
    slug: formData.get("slug"),
    response: formData.get("response"),
  });
  if (!parsed.success)
    return {
      status: "error",
      message: "We couldn’t understand that response.",
    };
  try {
    const saved = await updateRsvpIfPending(
      parsed.data.slug,
      parsed.data.response,
    );
    if (!saved)
      return {
        status: "error",
        message: "This invitation could not be found.",
      };
    revalidatePath(`/invite/${parsed.data.slug}`);
    return {
      status: "success",
      response: saved === "pending" ? parsed.data.response : saved,
      message:
        saved === parsed.data.response
          ? "Your response has been saved."
          : "A response was already recorded for this invitation.",
    };
  } catch {
    return {
      status: "error",
      message: "We couldn’t save your response. Please try again.",
    };
  }
}
