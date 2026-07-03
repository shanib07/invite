alter table public.invitations
  drop constraint if exists invitations_slug_check;

alter table public.invitations
  alter column slug type varchar(160);

alter table public.invitations
  add constraint invitations_slug_length_check
  check (char_length(slug) between 1 and 160);
