# DOCK Corporate Site

ChatGPT SitesのDOCKから、公開コーポレートページだけを分離したCloudflare Workers移行用リポジトリです。Shopee管理画面、店舗連携、認証、同期処理、API Secretは含みません。元のChatGPT Siteはそのまま残ります。

## 収録範囲

- 公開マーケティングページと運用ガイド
- SEO metadata、robots.txt、sitemap.xml
- 問い合わせPOST API
- 匿名の最小限アクセス計測POST API
- D1 migrations

## Build / Deploy

1. `.env.example`を参考にCloudflareのD1 IDと新URLを設定する
2. `npm ci`
3. `npm run build`
4. `npm run db:migrate:remote`
5. `npm run deploy:cloudflare`

初回公開前は`NEXT_PUBLIC_SEO_INDEXABLE=false`、検収後に新URLをcanonicalへ設定して`true`へ切り替えます。
