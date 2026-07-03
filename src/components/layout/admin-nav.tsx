import { Flower2 } from "lucide-react";
import Link from "next/link";

export function AdminNav() {
  return (
    <aside className="border-b bg-[#203126] text-white lg:fixed lg:inset-y-0 lg:w-64 lg:border-r lg:border-b-0">
      <div className="flex h-full items-center justify-between px-5 py-4 lg:block lg:py-7">
        <Link className="flex items-center gap-3" href="/admin">
          <span className="grid size-9 place-items-center rounded-full bg-white/10">
            <Flower2 aria-hidden className="size-4" />
          </span>
          <span>
            <strong className="block font-display text-2xl leading-none">
              Shazin & Safa
            </strong>
            <span className="text-[10px] tracking-widest text-white/55 uppercase">
              Wedding RSVP
            </span>
          </span>
        </Link>
        <p className="hidden text-sm leading-6 text-white/60 lg:mt-12 lg:block">
          17 July 2026
          <br />
          5:00 PM
          <br />
          Sardar Villa
        </p>
        <p className="mt-auto hidden text-xs leading-5 text-white/45 lg:absolute lg:bottom-7 lg:block">
          Private family dashboard
        </p>
      </div>
    </aside>
  );
}
