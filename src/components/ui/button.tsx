import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function buttonStyles(
  variant: "primary" | "secondary" | "danger" = "primary",
) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50",
    variant === "primary" &&
      "bg-accent text-accent-foreground hover:opacity-90",
    variant === "secondary" && "border bg-card hover:bg-black/5",
    variant === "danger" && "bg-danger text-white hover:opacity-90",
  );
}

export function Button({
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(buttonStyles(), className)} type={type} {...props} />
  );
}
