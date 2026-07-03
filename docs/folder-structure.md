# Folder Structure

```text
docs/                         # Product and engineering decisions
supabase/
├── migrations/               # Schema and fixed wedding record
└── seed.sql
src/
├── app/
│   ├── (admin)/admin/        # Read-only RSVP dashboard
│   └── (public)/invite/[guest-name]/
├── components/
│   ├── admin/                # Dashboard presentation
│   ├── countdown/            # Client-only countdown
│   ├── invitation/           # Botanical invitation and RSVP
│   ├── layout/
│   └── ui/
├── lib/
│   ├── repositories/         # Server-only guest data access
│   ├── supabase/             # Client and generated database types
│   └── utils/                # Date, guest-name, and class helpers
└── types/                    # Domain types
```

Database queries remain in repositories. Components do not import Supabase.
Route-only behavior stays colocated with its route. Client Components are used
only where browser state or APIs are required.
