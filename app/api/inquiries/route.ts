import { betaInquiries } from "../../../db/schema";
import { getDb } from "../../../db";
import { validateInquiry } from "../../../lib/inquiry";

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return Response.json({ error: "入力内容を読み取れませんでした。" }, { status: 415 });
  const body = await request.json().catch(() => null);
  const parsed = validateInquiry(body);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 });
  if (parsed.data.website) return Response.json({ message: "お問い合わせを受け付けました。" }, { status: 202 });
  const now = new Date().toISOString();
  await getDb().insert(betaInquiries).values({
    id: crypto.randomUUID(), visitorId: parsed.data.visitorId, name: parsed.data.name, company: parsed.data.company,
    email: parsed.data.email, marketsJson: JSON.stringify(parsed.data.markets), activeListings: parsed.data.activeListings,
    monthlyListings: parsed.data.monthlyListings, monthlyHours: parsed.data.monthlyHours, challenge: parsed.data.challenge,
    pilotReady: parsed.data.pilotReady, priceIntent: parsed.data.priceIntent, status: "new", createdAt: now, updatedAt: now,
  }).onConflictDoUpdate({ target: betaInquiries.email, set: {
    ...(parsed.data.visitorId ? { visitorId: parsed.data.visitorId } : {}), name: parsed.data.name, company: parsed.data.company,
    marketsJson: JSON.stringify(parsed.data.markets), activeListings: parsed.data.activeListings, monthlyListings: parsed.data.monthlyListings,
    monthlyHours: parsed.data.monthlyHours, challenge: parsed.data.challenge, pilotReady: parsed.data.pilotReady,
    priceIntent: parsed.data.priceIntent, status: "new", updatedAt: now,
  }});
  return Response.json({ message: "お問い合わせを受け付けました。内容を確認してご連絡します。" }, { status: 201 });
}
