import type { Metadata } from "next";
import MarketingShell from "../components/MarketingShell";
import PageHero from "../components/PageHero";
import { marketingMetadata } from "../seo";

export const metadata: Metadata = marketingMetadata({path:"/terms",title:"限定β利用条件",description:"DOCKの問い合わせおよび限定βに関する利用条件です。"});

export default function TermsPage() {
  return <MarketingShell><main><PageHero eyebrow="TERMS" title="限定β利用条件" description="最終更新日：2026年8月14日" /><section className="marketing-subpage-section"><article className="marketing-container marketing-prose">
    <div className="marketing-notice"><strong>現在は問い合わせ受付段階です。</strong><p>本ページから有料契約や決済は成立しません。限定βを案内する場合は、接続前に料金、利用期間、解約、サポート範囲、データ削除を含む個別条件を提示します。</p></div>
    <h2>1. サービスの位置づけ</h2><p>DOCKは、利用者が管理する商品情報の取得、価格計算、Shopeeへの登録、在庫・価格確認などの販売運用を支援するサービスです。Shopee Pte. Ltd.または参照する各EC事業者の公式サービスではありません。</p>
    <h2>2. 利用者の確認事項</h2><p>利用者は、商品情報、カテゴリ、価格、在庫、知的財産権、各国の法令、Shopeeの規約および配送条件を確認し、自らの責任で公開・販売を判断します。</p>
    <h2>3. 禁止事項</h2><ul><li>法令、プラットフォーム規約または第三者の権利に反する利用</li><li>不正なアクセス、認証情報の共有、サービスへの過度な負荷</li><li>虚偽情報による申込み、他者になりすました店舗接続</li><li>運営者が安全な提供を妨げると判断する行為</li></ul>
    <h2>4. 売上等の非保証</h2><p>DOCKは売上、利益、出品審査の通過、常時稼働、データの完全性を保証しません。Shopeeまたは参照するECサイトの仕様変更、停止、出品上限、カテゴリ制限により利用できない場合があります。</p>
    <h2>5. β版の変更・停止</h2><p>安全性の確保、障害対応、外部サービスの変更などのため、β機能を変更または停止する場合があります。重要な影響がある場合は可能な範囲で事前に連絡します。</p>
    <h2>6. 正式契約</h2><p>有料提供を開始する場合は、運営者情報、料金、支払方法、提供時期、解約条件、責任範囲を記載した正式な利用規約と申込確認画面を用意します。</p>
  </article></section></main></MarketingShell>;
}
