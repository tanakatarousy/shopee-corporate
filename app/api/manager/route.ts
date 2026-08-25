import { getEnv } from "../../../lib/runtime";
import { requireManagerRequest } from "../../../lib/admin-auth";

const VISITOR_ID = /^[a-zA-Z0-9-]{8,80}$/;
const INQUIRY_STATUSES = new Set(["new", "contacted", "closed"]);

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireManagerRequest(request);
  if (denied) return denied;
  try {
    const db = getEnv().DB;
    const [summary, visitors, paths, sources, inquiries, excluded] = await Promise.all([
      db.prepare(`SELECT
        (SELECT COUNT(*) FROM marketing_page_views p WHERE date(p.created_at,'+9 hours')=date('now','+9 hours') AND NOT EXISTS (SELECT 1 FROM marketing_excluded_visitors x WHERE x.visitor_id=p.visitor_id)) AS todayViews,
        (SELECT COUNT(*) FROM marketing_page_views p WHERE p.created_at>=datetime('now','-7 days') AND NOT EXISTS (SELECT 1 FROM marketing_excluded_visitors x WHERE x.visitor_id=p.visitor_id)) AS weekViews,
        (SELECT COUNT(DISTINCT NULLIF(p.visitor_id,'')) FROM marketing_page_views p WHERE p.created_at>=datetime('now','-7 days') AND NOT EXISTS (SELECT 1 FROM marketing_excluded_visitors x WHERE x.visitor_id=p.visitor_id)) AS weekVisitors,
        (SELECT COUNT(*) FROM marketing_page_views p WHERE NOT EXISTS (SELECT 1 FROM marketing_excluded_visitors x WHERE x.visitor_id=p.visitor_id)) AS totalViews,
        (SELECT COUNT(DISTINCT NULLIF(p.visitor_id,'')) FROM marketing_page_views p WHERE NOT EXISTS (SELECT 1 FROM marketing_excluded_visitors x WHERE x.visitor_id=p.visitor_id)) AS totalVisitors,
        (SELECT COUNT(*) FROM beta_inquiries) AS inquiryCount,
        (SELECT COUNT(*) FROM beta_inquiries WHERE status='new') AS newInquiryCount`).first(),
      db.prepare(`SELECT p.visitor_id AS visitorId,MIN(p.created_at) AS firstSeenAt,MAX(p.created_at) AS lastSeenAt,COUNT(*) AS pageViews,
        (SELECT i.name FROM beta_inquiries i WHERE i.visitor_id=p.visitor_id ORDER BY i.updated_at DESC LIMIT 1) AS name,
        (SELECT i.company FROM beta_inquiries i WHERE i.visitor_id=p.visitor_id ORDER BY i.updated_at DESC LIMIT 1) AS company,
        (SELECT i.email FROM beta_inquiries i WHERE i.visitor_id=p.visitor_id ORDER BY i.updated_at DESC LIMIT 1) AS email
        FROM marketing_page_views p WHERE p.visitor_id<>'' AND NOT EXISTS (SELECT 1 FROM marketing_excluded_visitors x WHERE x.visitor_id=p.visitor_id)
        GROUP BY p.visitor_id ORDER BY lastSeenAt DESC LIMIT 80`).all(),
      db.prepare(`SELECT p.path,COUNT(*) AS views,COUNT(DISTINCT NULLIF(p.visitor_id,'')) AS visitors
        FROM marketing_page_views p WHERE p.created_at>=datetime('now','-7 days') AND NOT EXISTS (SELECT 1 FROM marketing_excluded_visitors x WHERE x.visitor_id=p.visitor_id)
        GROUP BY p.path ORDER BY visitors DESC,views DESC LIMIT 20`).all(),
      db.prepare(`SELECT CASE WHEN p.referrer_host='' THEN 'direct' ELSE p.referrer_host END AS source,COUNT(*) AS views,COUNT(DISTINCT NULLIF(p.visitor_id,'')) AS visitors
        FROM marketing_page_views p WHERE p.created_at>=datetime('now','-7 days') AND NOT EXISTS (SELECT 1 FROM marketing_excluded_visitors x WHERE x.visitor_id=p.visitor_id)
        GROUP BY source ORDER BY visitors DESC,views DESC LIMIT 20`).all(),
      db.prepare(`SELECT id,visitor_id AS visitorId,name,company,email,markets_json AS marketsJson,active_listings AS activeListings,
        monthly_listings AS monthlyListings,monthly_hours AS monthlyHours,challenge,pilot_ready AS pilotReady,price_intent AS priceIntent,status,
        created_at AS createdAt,updated_at AS updatedAt FROM beta_inquiries ORDER BY updated_at DESC LIMIT 100`).all(),
      db.prepare("SELECT visitor_id AS visitorId,created_at AS createdAt FROM marketing_excluded_visitors ORDER BY created_at DESC").all(),
    ]);
    return Response.json({
      summary,
      visitors: visitors.results,
      paths: paths.results,
      sources: sources.results,
      inquiries: inquiries.results,
      excluded: excluded.results,
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return Response.json({ error: "管理データを読み込めませんでした。" }, { status: 503, headers: { "Cache-Control": "private, no-store" } });
  }
}

export async function PATCH(request: Request) {
  const denied = await requireManagerRequest(request);
  if (denied) return denied;
  if (!(request.headers.get("content-type") ?? "").includes("application/json") || Number(request.headers.get("content-length") ?? 0) > 8192) {
    return Response.json({ error: "更新内容を確認してください。" }, { status: 415 });
  }
  try {
    const body = await request.json() as { action?: string; id?: string; status?: string; visitorId?: string; excluded?: boolean };
    const db = getEnv().DB;
    if (body.action === "update_inquiry") {
      if (!body.id || !body.status || !INQUIRY_STATUSES.has(body.status)) return Response.json({ error: "更新内容を確認してください。" }, { status: 400 });
      await db.prepare("UPDATE beta_inquiries SET status=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(body.status, body.id).run();
      return Response.json({ ok: true });
    }
    if (body.action === "set_excluded") {
      if (!body.visitorId || !VISITOR_ID.test(body.visitorId) || typeof body.excluded !== "boolean") return Response.json({ error: "訪問者IDを確認してください。" }, { status: 400 });
      if (body.excluded) await db.prepare("INSERT OR IGNORE INTO marketing_excluded_visitors (visitor_id,created_at) VALUES (?,CURRENT_TIMESTAMP)").bind(body.visitorId).run();
      else await db.prepare("DELETE FROM marketing_excluded_visitors WHERE visitor_id=?").bind(body.visitorId).run();
      return Response.json({ ok: true });
    }
    return Response.json({ error: "操作を確認してください。" }, { status: 400 });
  } catch {
    return Response.json({ error: "更新できませんでした。" }, { status: 500 });
  }
}
