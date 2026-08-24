/** Cloudflare Worker entry point for the public DOCK corporate site. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { installRuntimeEnv, type AppEnv } from "../lib/runtime";

interface Env { ASSETS: Fetcher; DB: D1Database; IMAGES: { input(stream: ReadableStream): { transform(options: Record<string, unknown>): { output(options: { format: string; quality: number }): Promise<{ response(): Response }> } } } }
interface ExecutionContext { waitUntil(promise: Promise<unknown>): void; passThroughOnException(): void; }

const worker = { async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  installRuntimeEnv(env as unknown as AppEnv);
  const url = new URL(request.url);
  if (url.pathname === "/_vinext/image") {
    const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
    return handleImageOptimization(request, { fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))), transformImage: async (body, { width, format, quality }) => {
      const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
      return result.response();
    }}, allowedWidths);
  }
  if (url.pathname.startsWith("/api/") && !(request.method === "POST" && (url.pathname === "/api/inquiries" || url.pathname === "/api/analytics/visits"))) return Response.json({ error: "Not found" }, { status: 404 });
  return handler.fetch(request, env, ctx);
}};
export default worker;
