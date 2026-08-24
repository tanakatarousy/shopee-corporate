import type { Metadata } from "next";
import MarketingShell from "../components/MarketingShell";
import PageHero from "../components/PageHero";
import BetaInquiryForm from "../components/BetaInquiryForm";
import { marketingMetadata } from "../seo";

export const metadata: Metadata = marketingMetadata({path:"/inquiry",title:"限定βへのお問い合わせ",description:"Shopee販売運用サービスDOCKの限定β参加・導入相談フォームです。問い合わせだけで契約にはなりません。"});

export default function InquiryPage() {
  return (
    <MarketingShell>
      <main>
        <PageHero eyebrow="FOUNDING BETA" title="現在の運用を、教えてください。" description="機能を一方的に販売するのではなく、実際の作業量と困りごとを確認したうえで、限定βをご案内します。" />
        <section className="marketing-subpage-section"><div className="marketing-container marketing-inquiry-layout"><aside><h2>限定βについて</h2><ul><li>問い合わせだけでは契約になりません</li><li>対象となる方へ個別にご連絡します</li><li>接続前に料金と利用条件を案内します</li><li>最初の5社を予定しています</li></ul><p>入力時間の目安<br /><strong>約3分</strong></p></aside><BetaInquiryForm /></div></section>
      </main>
    </MarketingShell>
  );
}
