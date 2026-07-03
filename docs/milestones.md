# Milestones

## Delivery protocol

Only one milestone is implemented at a time. For each milestone:

1. Implement only its stated scope.
2. Run its acceptance checks.
3. Explain material decisions and known limitations.
4. Commit and push to `main` so Vercel deploys it.
5. Verify the deployment when runtime behavior changed.
6. Stop for review before beginning the next milestone.

## 1. Documentation first

Deliver the project overview, architecture, folder structure, database schema,
roadmap, and milestone documents before feature work.

Acceptance:

- All six requested files exist in `/docs` and agree on the chosen decisions.
- The public-admin security tradeoff is explicit.
- Schema, route, timezone, theme, and RSVP behavior are unambiguous.
- Markdown passes the repository's formatting check.

## 2. Supabase and project infrastructure

Pause `Adverce` without deleting it, create the dedicated `invite` project in
`ap-south-1`, link it, and establish the server data layer.

Acceptance:

- Versioned migrations apply successfully and RLS is enabled.
- Generated database types match the remote schema.
- Environment validation fails safely when secrets are absent.
- Local and Vercel environments contain secrets without Git tracking them.
- Repository interfaces compile and project quality checks pass.

## 3. Design system and application shells

Build shared visual primitives, typography, responsive layouts, three theme
presets, and polished generic states without implementing domain CRUD.

Acceptance:

- Admin and public shells are visually isolated.
- Components work at 320px and desktop widths.
- Keyboard focus, contrast, reduced motion, loading, empty, and error states are
  verified.
- Client boundaries are intentional and bundle impact is reviewed.

## 4. Event administration

Implement searchable, paginated event list and create/edit/delete workflows.

Acceptance:

- Valid event data persists with correct India-to-UTC conversion.
- Invalid values produce accessible field feedback.
- Events with invitations cannot be deleted.
- Empty, loading, success, database-error, and pagination states work.

## 5. Invitation administration

Implement event filtering, search, pagination, RSVP status, create/edit/delete,
secure slug generation, and copy-link behavior.

Acceptance:

- Administrators never enter or edit slugs.
- Generated slugs are 12-character base64url values and database-unique.
- Copied links use the configured production origin.
- Deletion requires confirmation and all list states remain accurate.

## 6. Public invitation experience

Render personalized invitation data at `/invite/[slug]` with theme styling,
countdown, details, directions, and polished route states.

Acceptance:

- Valid links render all required information on mobile and desktop.
- Invalid links show the branded invitation-not-found page.
- Provider failures show a safe database/network error state.
- Countdown is accurate for `Asia/Kolkata` and reaches the event-started state.

## 7. RSVP

Add accessible accept/decline actions and persistent confirmation.

Acceptance:

- Only `pending` invitations can transition.
- Concurrent or repeated submissions do not overwrite the first response.
- Refreshing shows the saved status.
- Pending, success, stale, and failure UI is understandable and keyboard usable.

## 8. Hardening and release

Complete automated coverage, dependency review, migration checks, accessibility
verification, and production release validation.

Acceptance:

- Unit tests cover validators, slugs, themes, dates, and RSVP transitions.
- Integration tests cover repositories and constraints.
- Playwright covers admin CRUD, invitation rendering, not-found, and RSVP.
- Lint, type-check, format, tests, build, audit, and migrations pass.
- The Vercel production deployment is healthy and uses the intended environment.
