"use client";

import { useEffect, useState } from "react";

function remaining(target: string) {
  const total = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    total,
    days: Math.floor(total / 86400000),
    hours: Math.floor((total / 3600000) % 24),
    minutes: Math.floor((total / 60000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState(() => remaining(target));
  useEffect(() => {
    const timer = window.setInterval(() => setTime(remaining(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);
  if (time.total === 0)
    return (
      <p className="font-display text-2xl font-semibold">
        The event has started.
      </p>
    );
  return (
    <div
      aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds remaining`}
      className="grid grid-cols-4 gap-2"
      role="timer"
    >
      {(
        [
          ["Days", time.days],
          ["Hours", time.hours],
          ["Minutes", time.minutes],
          ["Seconds", time.seconds],
        ] as const
      ).map(([label, value]) => (
        <div
          className="rounded-xl border border-current/10 bg-[var(--invite-card)] px-2 py-3 text-center"
          key={label}
        >
          <span className="font-display text-2xl font-semibold tabular-nums sm:text-3xl">
            {String(value).padStart(2, "0")}
          </span>
          <span className="mt-1 block text-[9px] font-bold tracking-widest text-[var(--invite-muted)] uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
