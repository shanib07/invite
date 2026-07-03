# Architecture

## System

```text
Guest browser ─────┐
                   ├── Next.js on Vercel ── repositories ── Supabase
Family dashboard ──┘
```

Next.js Server Components render invitation and dashboard data. Browsers never
query Supabase directly. A server-only client and repository own all database
access.

## Routes

- `/` redirects to `/admin`.
- `/admin` is a read-only RSVP dashboard.
- `/invite/[slug]` is a personalized botanical invitation.

## Boundaries

- Route components compose UI and call repositories.
- The invitation repository owns guest reads and atomic RSVP updates.
- Client Components are limited to the countdown and RSVP interaction.
- Zod validates RSVP input at the Server Action boundary.
- Environment parsing prevents accidental execution without server credentials.

## RSVP consistency

The only guest transitions are `pending → accepted` and `pending → declined`.
The update includes `rsvp_status = 'pending'`, so concurrent or repeated replies
cannot overwrite the first response.

## Security and performance

RLS is enabled with no public table policies. The Supabase secret key exists only
in local and Vercel server environments. Invitation slugs are random capability
tokens. Invitation data is server-rendered, while only interactive controls
hydrate in the browser. Fonts are self-hosted and decoration uses CSS.
