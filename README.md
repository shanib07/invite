# Shazin & Safa Wedding Invitation

A private digital invitation for the wedding of Shazin Sardar and Safa Gazzali.

- **Date:** 17 July 2026
- **Time:** 3:00 PM IST
- **Venue:** Sardar Villa
- **Theme:** Botanical

Add a guest name directly to the link, for example `/invite/Mikku` or
`/invite/Mohammed-Shanib`. A guest may accept or decline once. The read-only
`/admin` dashboard summarizes recorded responses.

## Development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and provide the Supabase URL, server-only
secret key, and public site URL. Never expose the secret key through a
`NEXT_PUBLIC_*` variable.

## Quality checks

```bash
npm run check
npm run build
npm run test:e2e
```

Architecture and operational notes are maintained in [`docs/`](./docs).

> `/admin` is intentionally unauthenticated. Add authentication before sharing
> the dashboard URL outside the family.
