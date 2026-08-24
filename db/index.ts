import { drizzle } from "drizzle-orm/d1";
import { getEnv } from "../lib/runtime.ts";
import * as schema from "./schema.ts";

export function getDb() {
  const runtimeEnv = getEnv();
  if (!runtimeEnv.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(runtimeEnv.DB, { schema });
}
