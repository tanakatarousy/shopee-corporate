import type { Metadata } from "next";
import MarketingShell from "../components/MarketingShell";
import PageHero from "../components/PageHero";

export const metadata: Metadata = { title: "特定商取引法に基づく表記", description: "DOCKの販売開始前の特定商取引法に基づく表示方針です。", robots: { index: false, follow: true } };

export default function LegalPage() {
  return <MarketingShell><main><PageHero eyebrow="LEGAL" title="特定商取引法に基づく表記" description="正式販売開始前に、必要事項を確定して掲載します。" /><section className="marketing-subpage-section"><div className="marketing-container marketing-legal">
    <div className="marketing-notice"><strong>現在、オンライン販売・決済は行っていません。</strong><p>限定βへの問い合わせ受付のみです。問い合わせを送信しても契約や料金は発生しません。</p></div>
    <dl><div><dt>販売事業者</dt><dd>正式販売開始前に掲載</dd></div><div><dt>運営責任者</dt><dd>正式販売開始前に掲載</dd></div><div><dt>所在地・電話番号</dt><dd>正式販売開始前に、法令に沿った方法で掲載</dd></div><div><dt>連絡先</dt><dd><a href="/inquiry">お問い合わせフォーム</a></dd></div><div><dt>販売価格</dt><dd>各申込画面に税込価格を表示</dd></div><div><dt>販売価格以外の費用</dt><dd>発生する場合は申込前に表示</dd></div><div><dt>支払方法・支払時期</dt><dd>正式販売開始前に掲載</dd></div><div><dt>サービス提供時期</dt><dd>申込条件および確認画面に表示</dd></div><div><dt>解約・返金</dt><dd>正式販売開始前に、申込条件と確認画面へ明示</dd></div></dl>
  </div></section></main></MarketingShell>;
}
