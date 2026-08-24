import {CANONICAL_ORIGIN,SEO_INDEXABLE} from "../seo";
export function GET() {
  const body = SEO_INDEXABLE?[
    "User-agent: *","Allow: /","Disallow: /manager","Disallow: /admin","Disallow: /api/","Disallow: /login","Disallow: /register","Disallow: /forgot-password","Disallow: /reset-password","Disallow: /logout",`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`,"",
  ].join("\n"):["User-agent: *","Disallow: /",""].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
