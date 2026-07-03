# Project Overview

## Purpose

This application exists for one wedding: Shazin Sardar and Safa Gazzali on
17 July 2026 at 5:00 PM IST, at Sardar Villa.

It is not a reusable invitation platform. Wedding details and the botanical
visual direction are fixed. A guest name is appended directly to the invitation
link, such as `/invite/Mikku`, and the guest records one RSVP response.

## Experiences

### Guest invitation

- Opens at `/invite/[guest-name]` without an account.
- Shows the guest name, couple, countdown, date, time, and venue.
- Uses one responsive botanical design.
- Allows one final Accept or Decline response.
- Shows polished loading, missing-link, and connection-error states.

### Family RSVP dashboard

- Opens at `/admin`.
- Shows total, accepted, declined, and awaiting-reply counts.
- Lists and searches guests by name.
- Does not create events, edit wedding details, or manage themes.

The guest is added to the dashboard when they first accept or decline.

## Accepted security tradeoff

The dashboard has no login by explicit decision. Anyone with its URL can view
guest names and RSVP statuses. Supabase credentials remain server-only and RLS
blocks direct browser access, but those measures do not protect the dashboard
itself. Authentication remains the highest-priority future improvement.
