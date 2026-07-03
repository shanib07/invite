# Invite

A production-oriented Next.js application foundation using the App Router,
TypeScript, Tailwind CSS, ESLint, and Prettier.

## Requirements

- Node.js 20.9 or newer (Node.js 22 LTS recommended)
- npm

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and provide the linked Supabase project URL,
server-only secret key, and public site URL. Never expose the secret key through
a `NEXT_PUBLIC_*` variable.

## Quality checks

```bash
npm run check
npm run build
npm run test:e2e
```

Use `npm run format` to apply formatting.

The dashboard is intentionally unauthenticated in version one. Do not use it for
sensitive event data until access control is added.

## Documentation

The product and engineering decisions are maintained in [`docs/`](./docs):

- [Project overview](./docs/project-overview.md)
- [Architecture](./docs/architecture.md)
- [Folder structure](./docs/folder-structure.md)
- [Database schema](./docs/database-schema.md)
- [Roadmap](./docs/roadmap.md)
- [Milestones](./docs/milestones.md)

## Source structure

```text
src/
├── app/         # Routes, layouts, metadata, and global styles
├── components/  # Reusable application and UI components
├── hooks/       # Reusable client-side React hooks
├── lib/         # Framework-independent utilities and integrations
└── types/       # Shared TypeScript types
```

Keep route-specific components and utilities colocated with their route. Move
code into the shared folders only when it is reused across multiple routes or
features. Components are Server Components unless they explicitly require a
client boundary.
