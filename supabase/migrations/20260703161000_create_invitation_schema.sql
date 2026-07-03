create type public.event_theme as enum ('ivory', 'midnight', 'botanical');
create type public.rsvp_status as enum ('pending', 'accepted', 'declined');

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  subtitle text check (subtitle is null or char_length(subtitle) <= 180),
  event_date timestamptz not null,
  venue text not null check (char_length(venue) between 1 and 160),
  address text not null check (char_length(address) between 1 and 500),
  google_maps_url text check (
    google_maps_url is null or (
      char_length(google_maps_url) <= 2048 and
      google_maps_url ~ '^https://(www\.)?(google\.[a-z.]+/maps|maps\.app\.goo\.gl)/'
    )
  ),
  theme public.event_theme not null default 'ivory',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.invitations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete restrict,
  slug varchar(12) not null unique check (slug ~ '^[A-Za-z0-9_-]{12}$'),
  guest_name text not null check (char_length(guest_name) between 1 and 120),
  custom_message text check (custom_message is null or char_length(custom_message) <= 1000),
  rsvp_status public.rsvp_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index events_event_date_idx on public.events(event_date);
create index invitations_event_id_idx on public.invitations(event_id);
create index invitations_event_rsvp_idx on public.invitations(event_id, rsvp_status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create trigger invitations_set_updated_at
before update on public.invitations
for each row execute function public.set_updated_at();

alter table public.events enable row level security;
alter table public.invitations enable row level security;

revoke all on table public.events from anon, authenticated;
revoke all on table public.invitations from anon, authenticated;
