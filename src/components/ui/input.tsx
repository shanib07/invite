import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-xl border bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent",
        className,
      )}
      {...props}
    />
  );
}
