import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InvitationView } from "@/components/invitation/invitation-view";
import { getInvitationForGuest } from "@/lib/repositories/invitations";
import { guestNameFromPath } from "@/lib/utils/guest-name";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const guestName = guestNameFromPath((await params).slug);
  return {
    title: guestName ? `${guestName} — Shazin & Safa` : "Invitation not found",
    robots: { index: false, follow: false },
  };
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const guestName = guestNameFromPath((await params).slug);
  if (!guestName) notFound();
  const invitation = await getInvitationForGuest(guestName);
  return <InvitationView invitation={invitation} />;
}
