import { getDb } from "../../../../db";
import { marketingPageViews } from "../../../../db/schema";

type VisitInput = { path?: unknown; referrerHost?: unknown; sessionId?: unknown; visitorId?: unknown };
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
function classifyUserAgent(value: string) {
  const device = /iPad|Tablet/i.test(value) ? "タブレット" : /Mobile|Android|iPhone/i.test(value) ? "モバイル" : "PC";
  const browser = /Edg\//.test(value) ? "Edge" : /OPR\//.test(value) ? "Opera" : /Chrome\//.test(value) ? "Chrome" : /Safari\//.test(value) ? "Safari" : /Firefox\//.test(value) ? "Firefox" : "その他";
  return { device, browser };
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return Response.json({ accepted: false }, { status: 415 });
  const body = await request.json().catch(() => ({})) as VisitInput;
  const path = clean(body.path, 240), sessionId = clean(body.sessionId, 80), visitorId = clean(body.visitorId, 80);
  if (!path.startsWith("/") || path.startsWith("//") || !/^[a-zA-Z0-9-]{8,80}$/.test(sessionId)) return Response.json({ accepted: false }, { status: 400 });
  if (visitorId && !/^[a-zA-Z0-9-]{8,80}$/.test(visitorId)) return Response.json({ accepted: false }, { status: 400 });
  const referrerHost = clean(body.referrerHost, 180).replace(/[^a-zA-Z0-9.-]/g, "");
  const country = clean(request.headers.get("cf-ipcountry"), 3).toUpperCase();
  const { device, browser } = classifyUserAgent(request.headers.get("user-agent") ?? "");
  await getDb().insert(marketingPageViews).values({ id: crypto.randomUUID(), sessionId, visitorId, path, referrerHost, country, device, browser, createdAt: new Date().toISOString() });
  return Response.json({ accepted: true }, { status: 202 });
}
