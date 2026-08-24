import {CANONICAL_ORIGIN} from "../seo";
const pages = ["", "/setup", "/pricing", "/security", "/faq", "/inquiry", "/privacy", "/terms", "/guides", "/guides/shopee-listing-problems", "/guides/shopee-bulk-listing", "/guides/shopee-inventory-sync", "/guides/shopee-api-errors"];

export function GET() {
  const lastmod = "2026-08-24";
  const urls = pages.map((path) => `<url><loc>${CANONICAL_ORIGIN}${path}</loc><lastmod>${lastmod}</lastmod><changefreq>${path === "" ? "weekly" : "monthly"}</changefreq><priority>${path === "" ? "1.0" : path === "/inquiry" ? "0.9" : "0.7"}</priority></url>`).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
