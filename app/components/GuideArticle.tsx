import Link from "next/link";
import type { ReactNode } from "react";
import MarketingShell from "./MarketingShell";
import {canonicalUrl,jsonLd} from "../seo";

type Props = { path:string; category: string; title: string; lead: string; minutes: string; children: ReactNode };

export default function GuideArticle({ path,category, title, lead, minutes, children }: Props) {
  const pageJsonLd={"@context":"https://schema.org","@graph":[{"@type":"Article",headline:title,description:lead,url:canonicalUrl(path),dateModified:"2026-08-24",inLanguage:"ja-JP",publisher:{"@type":"Organization",name:"DOCK",url:canonicalUrl("/")}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"ホーム",item:canonicalUrl("/")},{"@type":"ListItem",position:2,name:"運用ガイド",item:canonicalUrl("/guides")},{"@type":"ListItem",position:3,name:title,item:canonicalUrl(path)}]}]};
  return <MarketingShell><main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(pageJsonLd)}}/><article className="marketing-guide"><header><div className="marketing-container"><Link href="/guides">← 運用ガイド</Link><span className="marketing-eyebrow">{category}</span><h1>{title}</h1><p>{lead}</p><small>読了目安 {minutes}・最終更新 2026年8月24日</small></div></header><div className="marketing-container marketing-guide__body">{children}<aside><h2>現在の運用に当てはめて相談する</h2><p>店舗数、商品数、毎月の作業時間を確認し、限定βで検証できるかをご案内します。</p><Link className="marketing-button" href="/inquiry">限定βについて相談する</Link></aside></div></article></main></MarketingShell>;
}
