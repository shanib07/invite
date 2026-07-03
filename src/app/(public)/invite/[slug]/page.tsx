import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InvitationView } from "@/components/invitation/invitation-view";
import { getInvitationBySlug } from "@/lib/repositories/invitations";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!/^[A-Za-z0-9_-]{12}$/.test(slug))
    return { title: "Invitation not found" };
  const invitation = await getInvitationBySlug(slug);
  return {
    title: invitation
      ? `${invitation.event.title} — ${invitation.guest_name}`
      : "Invitation not found",
    robots: { index: false, follow: false },
  };
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!/^[A-Za-z0-9_-]{12}$/.test(slug)) notFound();
  const invitation = await getInvitationBySlug(slug);
  if (!invitation) notFound();
  return <InvitationView invitation={invitation} />;
}
