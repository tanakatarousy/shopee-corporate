import assert from "node:assert/strict";
import test from "node:test";

test("renders production SEO metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html=await response.text();
  assert.match(html, /<title>Shopee出品・価格・在庫管理をひとつに \| DOCK<\/title>/i);
  assert.match(html, /rel="canonical" href="https:\/\/shopee-sync-manager\.jtpgjmdaj587456325\.chatgpt\.site\/"/i);
  assert.match(html, /property="og:image" content="https:\/\/shopee-sync-manager\.jtpgjmdaj587456325\.chatgpt\.site\/og\.png"/i);
  assert.match(html, /type="application\/ld\+json"/i);
  assert.doesNotMatch(html, /codex-preview/i);
});

test("renders all public marketing pages", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("marketing", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const routes = [
    ["/", /いま困っていることから/],
    ["/setup", /通常のDOCK利用で、利用者自身のPartner Key/],
    ["/pricing", /プラン共通の対象範囲/],
    ["/security", /情報ごとの扱い/],
    ["/faq", /現在の対応範囲/],
    ["/inquiry", /現在の運用を/],
    ["/privacy", /利用目的/],
    ["/terms", /売上等の非保証/],
    ["/legal", /オンライン販売・決済は行っていません/],
    ["/guides", /Shopee販売を、仕組みで整える/],
    ["/guides/shopee-listing-problems", /よくある悩みと、DOCKの対応範囲/],
    ["/guides/shopee-bulk-listing", /公開前に確認する7項目/],
    ["/guides/shopee-inventory-sync", /販売事故を防ぐ設計/],
    ["/guides/shopee-api-errors", /原因別に読み分ける/],
  ];
  for (const [path, expected] of routes) {
    const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), expected, path);
  }
});

test("publishes crawl rules and a sitemap without exposing manager routes", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("seo", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };
  const robots = await worker.fetch(new Request("https://dock.example/robots.txt"), env, ctx);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Disallow: \/manager/);
  const sitemap = await worker.fetch(new Request("https://dock.example/sitemap.xml"), env, ctx);
  const xml = await sitemap.text();
  assert.equal(sitemap.status, 200);
  assert.match(xml, /https:\/\/shopee-sync-manager\.jtpgjmdaj587456325\.chatgpt\.site\/inquiry/);
  assert.match(xml, /https:\/\/shopee-sync-manager\.jtpgjmdaj587456325\.chatgpt\.site\/setup/);
  assert.match(xml, /https:\/\/shopee-sync-manager\.jtpgjmdaj587456325\.chatgpt\.site\/guides\/shopee-listing-problems/);
  assert.doesNotMatch(xml, /\/manager(?:\/|<)/);
});
