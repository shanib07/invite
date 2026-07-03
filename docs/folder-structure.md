# Folder Structure

## Target structure

```text
docs/
├── architecture.md
├── database-schema.md
├── folder-structure.md
├── milestones.md
├── project-overview.md
└── roadmap.md

public/
└── ornaments/                  # Optimized, decorative SVG assets

supabase/
├── config.toml
├── migrations/                # Ordered SQL schema migrations
└── seed.sql                    # Local/test fixtures only

src/
├── app/
│   ├── (admin)/
│   │   └── admin/              # Dashboard routes and route-local actions
│   ├── (public)/
│   │   └── invite/[slug]/      # Personalized invitation route and states
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── admin/                  # Shared dashboard composition
│   ├── countdown/              # Isolated countdown client component
│   ├── invitation/             # Theme-aware invitation presentation
│   ├── layout/                 # Shared shells and navigation
│   └── ui/                     # Reusable primitives and feedback states
├── hooks/                      # Reusable browser-only behavior
├── lib/
│   ├── repositories/           # Event and invitation data access
│   ├── supabase/               # Server client and generated DB types
│   ├── utils/                  # Slug, date, URL, and presentation helpers
│   ├── env.ts                  # Server environment validation
│   └── validation/             # Zod input schemas
└── types/                      # Provider-independent domain and action types
```

## Placement rules

### Routes

Route-only components, schemas, and actions stay next to the route that owns
them. A route becomes public only through a `page.tsx` or `route.ts` convention.
Route groups isolate layouts without changing URLs.

### Components

Move a component to `src/components` only when it is shared, represents a stable
design-system primitive, or forms a meaningful product concept. Components do
not import repositories.

### Repositories

Repositories contain Supabase queries and persistence error translation. They
do not render UI, redirect, revalidate paths, or read form data. This keeps data
access testable and replaceable.

### Utilities and hooks

- Utilities are deterministic and framework-independent where practical.
- Hooks are only for reusable client-side state or browser APIs.
- A helper used by one route remains colocated until reuse is real.

### Types

- Generated Supabase types describe storage.
- Domain types describe application concepts.
- Action-result types describe the serializable server/client boundary.
- Avoid broad barrel exports that hide dependency direction or increase client
  bundles.

## Naming conventions

- Files and folders use kebab-case, except required Next.js conventions.
- React components and domain types use PascalCase.
- Functions and values use camelCase.
- Server Actions use verb-first names such as `createInvitation`.
- Repository methods use persistence language such as `findBySlug` and
  `updateRsvpIfPending`.
- Boolean names start with `is`, `has`, or `can`.

## Dependency direction

```text
routes -> components + application logic -> repositories -> Supabase
                  \-> domain types + utilities
```

Lower layers never import route modules. Server-only modules must use the
`server-only` guard so accidental client imports fail during development.
