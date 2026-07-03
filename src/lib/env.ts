import "server-only";

import { z } from "zod";

const envSchema = z.object({
  SUPABASE_URL: z.url(),
  SUPABASE_SECRET_KEY: z.string().min(20),
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
});

export function getServerEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    throw new Error("Server environment is not configured.");
  }

  return result.data;
}
