import { CalendarDays, LayoutDashboard, Mail } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/invitations", label: "Invitations", icon: Mail },
] as const;

export function AdminNav() {
  return (
    <aside className="border-b bg-[#20251f] text-white lg:fixed lg:inset-y-0 lg:w-64 lg:border-r lg:border-b-0">
      <div className="flex h-full flex-col px-5 py-5">
        <Link className="font-display text-3xl font-semibold" href="/admin">
          Invite
        </Link>
        <p className="mt-1 text-xs text-white/55">Invitation studio</p>
        <nav
          aria-label="Admin"
          className="mt-5 flex gap-2 overflow-x-auto lg:mt-10 lg:grid"
        >
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
              href={href}
              key={href}
            >
              <Icon aria-hidden className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
        <p className="mt-auto hidden rounded-xl border border-amber-300/20 bg-amber-200/10 p-3 text-xs leading-5 text-amber-100/75 lg:block">
          This dashboard is public. Add authentication before sharing broadly.
        </p>
      </div>
    </aside>
  );
}
