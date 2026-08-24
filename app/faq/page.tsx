import type { Metadata } from "next";
import Link from "next/link";
import MarketingShell from "../components/MarketingShell";
import PageHero from "../components/PageHero";
import { faqItems, solutionCoverage } from "../../lib/marketing-content";
import { jsonLd,marketingMetadata } from "../seo";

export const metadata: Metadata = marketingMetadata({path:"/faq",title:"よくある質問",description:"DOCKの機能、Shopee出品、料金、APIキー・OAuthトークンの保存、限定βについてのよくある質問です。"});

export default function FaqPage() {
  const categories = [...new Set(faqItems.map((item) => item.category))];
  const faqJsonLd={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqItems.map(item=>({"@type":"Question",name:item.question,acceptedAnswer:{"@type":"Answer",text:item.answer}}))};
  const coverageGroups = [
    { status: "supported", label: "DOCKで対応", note: "現在の画面内で完結または確認できます。" },
    { status: "partial", label: "一部支援", note: "確認までは支援し、最終操作の一部はSeller Centreで行います。" },
    { status: "seller", label: "Seller Centreで操作", note: "期限・購入者対応・広告に関わるためShopee公式画面を使います。" },
  ] as const;
  return (
    <MarketingShell>
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(faqJsonLd)}}/>
        <PageHero eyebrow="FAQ" title="よくある質問" description="サービスの範囲、出品時のエラー、認証情報の扱い、β版について回答します。" />
        <section className="marketing-subpage-section">
          <section id="scope" className="marketing-container marketing-scope" aria-labelledby="scope-title">
            <div className="marketing-scope__heading"><span className="marketing-eyebrow">CURRENT COVERAGE</span><h2 id="scope-title">現在の対応範囲</h2><p>「できる」「一部だけ支援」「Shopee側で行う」を分けています。機能追加中のため、限定βの接続前にも対象範囲を確認します。</p></div>
            <div className="marketing-scope__grid">
              {coverageGroups.map((group) => {
                const items = solutionCoverage.filter((item) => item.status === group.status);
                return <article className={group.status} key={group.status}><header><span>{group.label}</span><strong>{items.length}項目</strong></header><p>{group.note}</p><ul>{items.map((item) => <li key={item.id}><Link href={`/guides/shopee-listing-problems#${item.id}`}>{item.title}</Link></li>)}</ul></article>;
              })}
            </div>
            <p className="marketing-scope__note">各項目の詳しい条件と未対応範囲は、<Link href="/guides/shopee-listing-problems">Shopee出品・操作のよくある悩みと対応範囲</Link>で確認できます。</p>
          </section>
          <div className="marketing-container marketing-faq-layout">
            <aside><strong>カテゴリー</strong><a href="#scope">現在の対応範囲</a>{categories.map((category) => <a key={category} href={`#${encodeURIComponent(category)}`}>{category}</a>)}</aside>
            <div className="marketing-faq-groups">
              {categories.map((category) => <section key={category} id={category}><span className="marketing-eyebrow">{category}</span>{faqItems.filter((item) => item.category === category).map((item) => <details key={item.question}><summary>{item.question}<span>＋</span></summary><p>{item.answer}</p></details>)}</section>)}
            </div>
          </div>
        </section>
        <section className="marketing-mini-cta"><div className="marketing-container"><div><h2>解決しない疑問がありますか？</h2><p>現在の店舗数や運用方法を含めて、限定βの相談フォームからお送りください。</p></div><Link className="marketing-button" href="/inquiry">問い合わせる</Link></div></section>
      </main>
    </MarketingShell>
  );
}
