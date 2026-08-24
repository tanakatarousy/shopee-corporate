import type { Metadata } from "next";
import Link from "next/link";
import MarketingShell from "../components/MarketingShell";
import PageHero from "../components/PageHero";
import { guideCards } from "../../lib/marketing-content";
import { canonicalUrl,jsonLd,marketingMetadata } from "../seo";

export const metadata: Metadata = marketingMetadata({path:"/guides",title:"Shopee出品・操作・在庫管理の運用ガイド",description:"Shopee出品のよくある悩み、一括登録、カテゴリ・配送設定、在庫・価格同期、APIエラー対応を実務の流れに沿って説明します。"});

export default function GuidesPage() {
  const listJsonLd={"@context":"https://schema.org","@type":"ItemList",name:"Shopee出品・操作・在庫管理の運用ガイド",itemListElement:guideCards.map((guide,index)=>({"@type":"ListItem",position:index+1,name:guide.title,url:canonicalUrl(guide.href)}))};
  return <MarketingShell><main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(listJsonLd)}}/><PageHero eyebrow="OPERATIONS GUIDE" title="Shopee販売を、仕組みで整える。" description="出品時につまずきやすい操作から、在庫・価格同期、APIエラー対応まで、DOCKで扱える範囲とSeller Centreで行う範囲を整理しています。" /><section className="marketing-subpage-section"><div className="marketing-container marketing-guide-grid">{guideCards.map((guide, index) => <Link href={guide.href} key={guide.href}><span>0{index + 1}</span><small>{guide.category}・{guide.minutes}</small><h2>{guide.title}</h2><p>{guide.description}</p><b>読む →</b></Link>)}</div></section></main></MarketingShell>;
}
