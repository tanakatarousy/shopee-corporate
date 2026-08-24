import type { Metadata } from "next";
import {CANONICAL_ORIGIN,SEO_INDEXABLE,SITE_ORIGIN,canonicalUrl,jsonLd,siteUrl} from "./seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "DOCK | Shopee販売運用",
    template: "%s | DOCK",
  },
  description: "商品URL・CSVからShopeeの出品準備、利益価格の確認、商品登録、在庫・価格同期までを支援する販売運用サービスです。",
  alternates:{canonical:canonicalUrl("/")},
  robots:{index:SEO_INDEXABLE,follow:SEO_INDEXABLE},
  openGraph:{title:"DOCK | Shopee出品・価格・在庫管理をひとつに",description:"URL・CSV一括登録、国別利益計算、商品選定、在庫・価格同期まで。Shopee販売運用を一つの画面へ。",type:"website",locale:"ja_JP",siteName:"DOCK",url:CANONICAL_ORIGIN,images:[{url:siteUrl("/og.png"),width:1200,height:630,alt:"DOCK｜Shopee出品・価格・在庫管理をひとつに"}]},
  twitter:{card:"summary_large_image",title:"DOCK | Shopee出品・価格・在庫管理をひとつに",description:"URL・CSV一括登録、国別利益計算、商品選定、在庫・価格同期まで。Shopee販売運用を一つの画面へ。",images:[siteUrl("/og.png")]},
  icons: {
    icon: [
      { url: "/dock-c-favicon-exact-32.png", sizes: "32x32", type: "image/png" },
      { url: "/dock-c-favicon-exact-16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/dock-c-favicon-exact-32.png",
  },
  category: "business",
  creator: "DOCK",
  publisher: "DOCK",
  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData={"@context":"https://schema.org","@graph":[{"@type":"WebSite",name:"DOCK",url:CANONICAL_ORIGIN,inLanguage:"ja-JP"},{"@type":"Organization",name:"DOCK",url:CANONICAL_ORIGIN,logo:siteUrl("/dock-logo-c.png"),description:"Shopeeへの出品準備、価格計算、商品登録、在庫・価格管理を支援する販売運用サービス。"}]};
  return (
    <html lang="ja">
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(structuredData)}}/>{children}</body>
    </html>
  );
}
