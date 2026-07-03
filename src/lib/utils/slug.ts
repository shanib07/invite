import { randomBytes } from "node:crypto";

export function generateInvitationSlug() {
  return randomBytes(9).toString("base64url");
}
