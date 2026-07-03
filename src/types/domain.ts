export const eventThemes = ["ivory", "midnight", "botanical"] as const;
export const rsvpStatuses = ["pending", "accepted", "declined"] as const;

export type EventTheme = (typeof eventThemes)[number];
export type RsvpStatus = (typeof rsvpStatuses)[number];

export interface Event {
  id: string;
  title: string;
  subtitle: string | null;
  event_date: string;
  venue: string;
  address: string;
  google_maps_url: string | null;
  theme: EventTheme;
  created_at: string;
  updated_at: string;
}

export interface Invitation {
  id: string;
  event_id: string;
  slug: string;
  guest_name: string;
  custom_message: string | null;
  rsvp_status: RsvpStatus;
  created_at: string;
  updated_at: string;
}

export interface InvitationWithEvent extends Invitation {
  event: Event;
}
