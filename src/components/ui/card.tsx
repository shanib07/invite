import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 shadow-[0_12px_40px_rgba(28,32,24,0.05)]",
        className,
      )}
      {...props}
    />
  );
}
