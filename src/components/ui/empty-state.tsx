import { Inbox } from "lucide-react";

import { Card } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <Card className="grid place-items-center gap-3 py-14 text-center">
      <span className="rounded-full bg-black/5 p-3">
        <Inbox aria-hidden className="size-5" />
      </span>
      <div>
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
        <p className="mt-1 max-w-md text-sm text-muted">{description}</p>
      </div>
      {action}
    </Card>
  );
}
