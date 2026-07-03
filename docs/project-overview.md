# Project Overview

## Purpose

Invite is a premium digital invitation platform for creating events and sending
each guest a private, personalized link. Guests open a URL such as
`/invite/JF82KxP1` to view event details and submit one RSVP response.

The product has two experiences:

- A mobile-first public invitation designed for guests.
- A practical admin dashboard for managing events and invitations.

## Product goals

- Make an invitation feel personal, polished, and effortless on a phone.
- Keep event information in one place so edits apply to every invitation.
- Give administrators a fast workflow for creating guests and copying links.
- Make RSVP state clear to guests and easy to review in the dashboard.
- Keep the codebase understandable and safe to extend with authentication later.

## Users and primary journeys

### Guest

1. Receives a unique invitation URL.
2. Opens a personalized invitation without creating an account.
3. Reviews the date, venue, directions, message, and countdown.
4. Accepts or declines once and receives clear confirmation.

### Administrator

1. Creates and maintains one or more events.
2. Creates an invitation by selecting an event and entering a guest name.
3. Copies the generated public link and sends it outside the platform.
4. Searches invitations and reviews RSVP status.

## Experience principles

- **Mobile first:** guest content and actions must work comfortably at 320px.
- **Premium restraint:** strong typography, whitespace, subtle motion, and no
  decorative clutter.
- **Clear feedback:** every load, empty state, error, and mutation has a polished
  result.
- **Accessible by default:** semantic HTML, keyboard access, visible focus,
  sufficient contrast, and reduced-motion support.
- **Fast by default:** Server Components render content; client JavaScript is
  reserved for countdown, RSVP, forms, and copy interactions.

## Visual direction

Version one provides three event-selectable presets:

- **Ivory:** warm ivory, charcoal, and restrained champagne accents.
- **Midnight:** deep ink, muted gold, and soft cream typography.
- **Botanical:** parchment, forest green, and subtle sage ornamentation.

Themes change presentation only. They do not change the invitation data model or
behavior.

## Version-one boundaries

Included:

- Event and invitation administration.
- Secure random invitation links.
- Personalized public invitations and one-time RSVP.
- Search, pagination, filtering, copy-link actions, and polished states.
- Deployment through the existing GitHub and Vercel integration.

Not included:

- Sending email, SMS, or WhatsApp messages.
- Guest accounts, plus-ones, meal choices, or attendee counts.
- Payments, custom domains, analytics, or file uploads.
- Arbitrary theme builders or user-supplied HTML.

## Deliberate security tradeoff

The version-one `/admin` dashboard is intentionally public and has no login. Any
person who discovers the route can create, edit, or delete production data. This
is an accepted product decision, not a secure long-term default.

Database credentials remain server-only, Row Level Security blocks direct
browser access, and inputs are validated. Those controls protect credentials and
the database API, but they do not authorize dashboard users. Authentication is
the first recommended post-v1 improvement.

## Success criteria

- A valid invitation renders correctly on common mobile and desktop sizes.
- An unknown slug produces a branded not-found experience without leaking data.
- An RSVP can move from pending exactly once.
- Administrators can complete event and invitation CRUD without manual slugs.
- Checks, tests, production builds, migrations, and Vercel deployment succeed.
