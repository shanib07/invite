insert into public.events (
  id,
  title,
  subtitle,
  event_date,
  venue,
  address,
  google_maps_url,
  theme
)
values (
  '00000000-0000-4000-8000-000000000717',
  'Shazin Sardar & Safa Gazzali',
  'Together with their families, invite you to celebrate their wedding',
  '2026-07-17 09:30:00+00',
  'Sardar Villa',
  'Sardar Villa',
  null,
  'botanical'
)
on conflict (id) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  event_date = excluded.event_date,
  venue = excluded.venue,
  address = excluded.address,
  google_maps_url = excluded.google_maps_url,
  theme = excluded.theme;
