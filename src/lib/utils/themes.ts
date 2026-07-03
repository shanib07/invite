import type { EventTheme } from "@/types/domain";

export const themeMeta: Record<
  EventTheme,
  { label: string; description: string }
> = {
  ivory: { label: "Ivory", description: "Warm, timeless and refined" },
  midnight: { label: "Midnight", description: "Dramatic ink with muted gold" },
  botanical: {
    label: "Botanical",
    description: "Soft sage and forest details",
  },
};
