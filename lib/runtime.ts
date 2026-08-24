export type AppEnv = { DB: D1Database };

declare global { var __SHOPEE_CORPORATE_ENV__: AppEnv | undefined; }

export function installRuntimeEnv(value: AppEnv) { globalThis.__SHOPEE_CORPORATE_ENV__ = value; }
export function getEnv(): AppEnv {
  if (!globalThis.__SHOPEE_CORPORATE_ENV__) throw new Error("Runtime environment is unavailable");
  return globalThis.__SHOPEE_CORPORATE_ENV__;
}
