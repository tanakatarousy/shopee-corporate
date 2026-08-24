import type { Metadata } from "next";
import MarketingShell from "../components/MarketingShell";
import PageHero from "../components/PageHero";
import { marketingMetadata } from "../seo";

export const metadata: Metadata = marketingMetadata({path:"/security",title:"セキュリティ",description:"DOCKにおけるShopee OAuthトークン、Partner Key、注文情報の保存方法と安全対策を説明します。"});

const storageRows = [
  ["ログイン用パスワード", "本人認証", "本文は保存せず、ソルト付き一方向ハッシュで照合します"],
  ["メールアドレス・認証情報", "アカウント識別・再設定", "認証専用基盤へ保存し、Shopeeの商品・注文データとは分離します"],
  ["Shopee認可コード", "認証処理中のみ使用", "データベースには保存しません"],
  ["アクセストークン", "自動同期のため保存", "サーバー側で暗号化し、画面へ返しません"],
  ["更新用トークン", "期限更新のため保存", "サーバー側で暗号化し、画面へ返しません"],
  ["Partner Key", "運営側の接続設定", "運営環境の機密情報として管理し、画面へ返しません"],
  ["商品・注文情報", "出品管理に必要な範囲", "公開ページには表示せず、利用者ごとの領域へ分離して保存します"],
] as const;

export default function SecurityPage() {
  return (
    <MarketingShell>
      <main>
        <PageHero eyebrow="SECURITY" title="便利さのために預かる情報を、明確にする。" description="自動同期には認証情報の保存が必要です。DOCKは「保存しない」と曖昧に説明せず、何を、なぜ、どのように保存するかを開示します。" />
        <section className="marketing-subpage-section">
          <div className="marketing-container marketing-security-content">
            <section><span className="marketing-eyebrow">DATA STORAGE</span><h2>情報ごとの扱い</h2><div className="marketing-security-table"><div className="head"><span>情報</span><span>利用目的</span><span>保存方法</span></div>{storageRows.map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div></section>
            <section><span className="marketing-eyebrow">CURRENT DESIGN</span><h2>現在実装している対策</h2><div className="marketing-security-grid"><article><b>01</b><h3>サーバー側で暗号化</h3><p>OAuthトークンなどの機密情報はAES-GCMで暗号化し、データベースへ平文保存しません。</p></article><article><b>02</b><h3>画面へ再表示しない</h3><p>保存済みのPartner Keyやアクセストークンをブラウザへ返さず、設定済みかどうかだけを表示します。</p></article><article><b>03</b><h3>パスワード本文を残さない</h3><p>管理者パスワードは復元できないソルト付き一方向ハッシュで照合します。招待利用者の認証情報は認証専用基盤へ分離します。</p></article><article><b>04</b><h3>利用者間を分離</h3><p>店舗・商品・注文・同期履歴は利用者IDで絞り込み、未認証のAPI要求と別利用者からの参照を拒否します。</p></article><article><b>05</b><h3>通信経路を暗号化</h3><p>公開環境ではHTTPSを使用し、入力・認証・API通信の途中で内容が読まれる危険を抑えます。</p></article><article><b>06</b><h3>技術ログから機密情報を除外</h3><p>トークン、認可コード、個人情報を通常のエラーログへ記録しない運用を前提に整備します。</p></article></div></section>
            <section className="marketing-roadmap"><span className="marketing-eyebrow">ACCESS CONTROL</span><h2>利用者ごとに分けて管理</h2><ul><li>管理者は専用ID、招待利用者は登録済みメールアドレスでログイン</li><li>店舗・商品・同期履歴を利用者専用の領域へ分離</li><li>Shopee OAuthの接続先をログイン利用者へ紐付け</li><li>管理者による利用開始・停止とプラン管理</li><li>外部APIの同時処理制限と再試行制御</li><li>退会時の連携解除・保存データ削除を個別受付</li></ul><p>正式提供では、対象者と接続店舗を確認してアカウントを発行します。</p></section>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
