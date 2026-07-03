# Architecture

## System context

The application is a Next.js App Router project deployed on Vercel. Supabase
provides PostgreSQL storage. GitHub `main` is connected to Vercel for automatic
production deployments.

```text
Guest browser ─────┐
                   ├──> Next.js on Vercel ──> server repositories ──> Supabase
Admin browser ─────┘
```

Browsers never query Supabase directly. They communicate with Server Components
and Server Actions, which call typed repositories using a server-only Supabase
secret key.

## Application boundaries

### Presentation

- Route files compose pages and metadata.
- Server Components are the default.
- Client Components are limited to countdown, RSVP controls, form feedback,
  confirmation interactions, and clipboard access.
- Shared UI components contain no database queries.

### Application logic

- Server Actions validate untrusted form input and orchestrate mutations.
- Domain utilities own slug generation, India-time conversion, URL validation,
  theme lookup, and error mapping.
- Application errors use stable, user-safe categories; raw provider errors are
  logged server-side and never rendered.

### Data access

- Event and invitation repositories are the only modules allowed to query
  application tables.
- Repositories return domain types rather than provider response objects.
- Pages depend on repository interfaces, not Supabase query syntax.
- Mutations revalidate only affected routes.

### Infrastructure

- One server-only Supabase client uses `SUPABASE_SECRET_KEY`.
- Environment values are parsed once at the server boundary.
- SQL migrations are the source of truth for tables, constraints, triggers,
  indexes, enums, and RLS.
- Generated database types are committed and regenerated after schema changes.

## Route organization

```text
/
└── redirects to /admin

/admin
├── events
│   ├── new
│   └── [id]/edit
└── invitations
    ├── new
    └── [id]/edit

/invite/[slug]
```

The admin and public routes use separate route groups and layouts so visual and
navigation concerns do not leak between them.

## Data flows

### Read an invitation

1. The `[slug]` Server Component validates the route value.
2. The invitation repository performs one invitation-to-event query.
3. Missing data calls `notFound()`; provider failures reach a branded error
   boundary.
4. The server renders personalized content. Only countdown and RSVP controls
   hydrate in the browser.

### Submit an RSVP

1. The client submits `slug` and the selected status to a Server Action.
2. The action validates the allowed values.
3. The repository executes one conditional update where status is `pending`.
4. Exactly one concurrent request can succeed. Later attempts receive the
   already-recorded state without overwriting it.
5. The action returns a serializable success or safe error result.

### Admin mutation

1. A form posts to a route-local Server Action.
2. Zod validates and normalizes the payload.
3. The action calls a repository mutation.
4. Expected constraint errors become field or form feedback.
5. Successful mutations revalidate list/detail routes and redirect when useful.

## Security model

- Supabase RLS is enabled with no `anon` or `authenticated` table policies.
- The Supabase secret key is never exposed through `NEXT_PUBLIC_*`, props, logs,
  or client bundles.
- Only HTTPS Google Maps URLs from approved Google hosts are stored.
- Text lengths and enum values are constrained in both Zod and PostgreSQL.
- Next.js Server Actions provide same-origin mutation endpoints; destructive UI
  actions require confirmation.
- Invitation slugs are cryptographically random capabilities and never contain a
  guest name.

The public admin dashboard has no identity or authorization check by explicit
product decision. RLS and server-only credentials do not mitigate that exposure.

## Performance and resilience

- Invitation pages are dynamic so current RSVP and edited event data are shown.
- Lists use server-side filtering and bounded pagination.
- Tables have indexes for slugs, foreign keys, RSVP filtering, and common sort
  orders.
- Fonts are self-hosted; decorative visuals use CSS and small SVG assets.
- Motion respects `prefers-reduced-motion` and is loaded only where used.
- Route-level loading, not-found, and error files provide stable fallbacks.

## Observability

Version one uses structured server logging with operation names and opaque
record identifiers. Logs exclude guest messages, credentials, and complete
provider errors. Vercel runtime and build logs provide initial operational
visibility; external error tracking is deferred.
