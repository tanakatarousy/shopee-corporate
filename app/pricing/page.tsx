import type { Metadata } from "next";
import Link from "next/link";
import MarketingShell from "../components/MarketingShell";
import PageHero from "../components/PageHero";
import { pricingPlans } from "../../lib/marketing-content";
import { marketingMetadata } from "../seo";

export const metadata: Metadata = marketingMetadata({path:"/pricing",title:"料金・限定β",description:"DOCK限定βは月額2,500円と5,000円の仮価格2プラン。Shopee店舗数、管理商品数、出品・在庫価格管理の利用範囲をご案内します。"});

export default function PricingPage() {
  return (
    <MarketingShell>
      <main>
        <PageHero eyebrow="PRICING" title="必要な範囲から、無理なく始める。" description="1店舗向けのスターターβと、複数店舗向けのグロースβをご用意しました。表示価格と利用範囲は限定βの仮設定で、接続前に条件をご案内します。" />
        <section className="marketing-subpage-section">
          <div className="marketing-container marketing-pricing-grid">
            {pricingPlans.map((plan) => <article key={plan.name} className={plan.featured ? "featured" : ""}><span className={`marketing-plan-badge${plan.featured ? "" : " subtle"}`}>{plan.badge}</span><h2>{plan.name}</h2><p>{plan.description}</p><div className="marketing-plan-price"><strong>{plan.price}</strong><span>{plan.unit}</span></div><ul>{plan.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul><Link className={plan.featured ? "marketing-button" : "marketing-plan-note"} href="/inquiry">このプランについて相談する</Link></article>)}
          </div>
          <div className="marketing-container marketing-pricing-note"><h2>料金について</h2><div><p><strong>仮価格です</strong>限定βでの検証結果を踏まえ、正式価格と商品上限を決定します。</p><p><strong>初期費用0円予定</strong>β版は月額料金のみで開始できる条件を予定しています。</p><p><strong>登録前に確認</strong>出品準備、利益計算、同期など、対象機能を接続前に案内します。</p></div></div>
          <div className="marketing-container marketing-pricing-scope"><div><strong>プラン共通の対象範囲</strong><p>商品情報の取り込み、出品前確認、Shopee登録、利益計算、在庫・価格の定期確認が中心です。発送ラベル、返品・返金、購入者チャット、広告は現在の対象外です。</p></div><Link href="/faq#scope">現在の対応範囲を一覧で見る →</Link></div>
        </section>
      </main>
    </MarketingShell>
  );
}
