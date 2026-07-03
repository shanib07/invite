# Roadmap

## Version 1: Core invitation platform

The first release establishes the complete event-to-RSVP workflow:

- Supabase project, schema, repositories, and server-only configuration.
- Three-theme design system and isolated application shells.
- Event and invitation management.
- Cryptographically random public links.
- Personalized invitation, countdown, directions, and one-time RSVP.
- Automated quality checks and production deployment verification.

Delivery is milestone-based. A milestone is committed and deployed only after
its acceptance checks pass, and work stops for review before the next milestone.

## Version 1.1: Security and operations

Highest-priority follow-up work:

- Add Supabase Auth and restrict admin routes and mutations.
- Introduce an administrator allowlist or role table.
- Add rate limiting for public RSVP submissions.
- Add structured error monitoring and alerting.
- Define backup restore checks and data retention procedures.
- Add an audit trail for administrative mutations.

## Version 1.2: Guest and event capabilities

Potential product extensions:

- RSVP changes with explicit event-level policy.
- Plus-ones, party size, meal selection, and guest notes.
- Scheduled reminders and delivery integrations.
- Event cover images using Supabase Storage.
- CSV import/export for guest lists.
- Additional curated themes and event preview mode.

## Later opportunities

- Multiple organizations and role-based access.
- Custom domains and branded sender identities.
- Delivery and conversion analytics.
- Localization and per-event timezones.
- Template marketplace and reusable event defaults.

These items are intentionally excluded from the initial architecture unless a
v1 decision would otherwise make them prohibitively difficult. The codebase
favors clear boundaries over speculative abstractions.

## Prioritization principles

1. Protect guest and event data.
2. Preserve invitation reliability and mobile performance.
3. Reduce administrator effort.
4. Add complexity only when a measured use case justifies it.
