import type { Metadata } from "next";
import Link from "next/link";
import MarketingShell from "../components/MarketingShell";
import PageHero from "../components/PageHero";
import { marketingMetadata } from "../seo";

export const metadata: Metadata = marketingMetadata({path:"/setup",title:"導入準備とShopee店舗連携",description:"DOCKの利用前に用意するShopee店舗、商品情報、配送設定と、OAuth店舗連携・Open Platform API情報の取得方法を画面イメージで説明します。",keywords:["Shopee APIキー 取得","Shopee Open Platform 登録","Shopee OAuth 店舗連携","Shopee 出品ツール 導入"]});

const requirements = [
  ["01", "Shopeeの販売店舗", "Seller Centreへログインでき、DOCKで利用する店舗が開設されていること。"],
  ["02", "配送方法の設定", "販売国の店舗で、利用する配送チャネルが有効になっていること。"],
  ["03", "登録する商品情報", "取扱権限のある商品のURLまたはCSV。原価・重量・在庫など不足情報も確認します。"],
  ["04", "ブラウザとメール", "DOCKはブラウザから使うWebアプリです。インストールは不要です。"],
] as const;

export default function SetupPage() {
  return (
    <MarketingShell>
      <main>
        <PageHero eyebrow="GETTING STARTED" title="何を用意し、どう接続するか。" description="利用開始前に必要なものと、Shopee店舗をDOCKへ接続する流れを、実際の画面に近いイメージで順番に説明します。" />

        <section className="marketing-subpage-section setup-page">
          <div className="marketing-container">
            <section className="setup-intro" aria-labelledby="setup-requirements-title">
              <div className="setup-section-heading"><span className="marketing-eyebrow">BEFORE YOU START</span><h2 id="setup-requirements-title">利用者が用意するもの</h2><p>APIの技術情報より先に、店舗と商品を販売できる状態かを確認します。</p></div>
              <div className="setup-requirements">{requirements.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
              <div className="setup-key-note"><span>大切な確認</span><div><strong>通常のDOCK利用で、利用者自身のPartner Keyを問い合わせフォームへ送る必要はありません。</strong><p>正式サービスではDOCK側のOpen Platformアプリを使用し、利用者はShopeeの認可画面で店舗接続を許可する方式を予定しています。限定βでは、接続方法を参加者ごとにご案内します。</p></div></div>
            </section>

            <section className="setup-flow" aria-labelledby="setup-flow-title">
              <div className="setup-section-heading"><span className="marketing-eyebrow">CONNECT YOUR SHOP</span><h2 id="setup-flow-title">店舗接続を、画面で確認</h2><p>パスワードをDOCKへ入力するのではなく、Shopee側の認可画面を経由して接続します。</p></div>

              <article className="setup-step">
                <div className="setup-step__copy"><span>STEP 1</span><h3>Seller Centreで、店舗と配送設定を確認</h3><p>利用する国・地域の店舗へログインし、店舗名と販売状態を確認します。配送方法が無効だと、カテゴリによって商品登録が拒否されるため、先に配送設定も確認します。</p><ul><li>DOCKで接続する店舗名</li><li>店舗の販売国・通貨</li><li>利用できる配送チャネル</li></ul><small>配送チャネルの有効化、発送確定、SLSラベルの発行・印刷はSeller Centreで行います。</small></div>
                <figure className="setup-screen setup-screen--seller" aria-label="Shopee Seller Centreの店舗設定画面イメージ">
                  <div className="setup-browser"><i /><i /><i /><span>seller.shopee.example</span></div>
                  <div className="setup-seller-body"><aside><b>店舗</b><span>商品</span><span>配送</span><span>設定</span></aside><div><small>店舗設定</small><h4>シンガポール店舗</h4><p><b>販売状態</b><em>有効</em></p><p><b>Standard International</b><em>有効</em></p><p><b>受取先住所</b><em>設定済み</em></p></div></div>
                  <b className="setup-pin pin-a">1</b><b className="setup-pin pin-b">2</b><figcaption>① 店舗名　② 配送チャネル</figcaption>
                </figure>
              </article>

              <article className="setup-step reverse">
                <div className="setup-step__copy"><span>STEP 2</span><h3>DOCKから「Shopee店舗を接続」へ進む</h3><p>DOCKの接続画面で販売国を選び、認可を開始します。ここでShopeeのログインパスワードやPartner Keyを入力することはありません。</p><ul><li>販売国を選択</li><li>接続する店舗を確認</li><li>Shopeeの認可画面へ移動</li></ul></div>
                <figure className="setup-screen setup-screen--dock" aria-label="DOCKのShopee店舗接続画面イメージ">
                  <div className="setup-appbar"><span>D</span><div><strong>店舗連携</strong><small>Shopee Open Platform</small></div><i>接続設定</i></div>
                  <div className="setup-connect-card"><small>販売先</small><strong>SG・シンガポール</strong><p>接続するShopee店舗を認可してください。</p><button>Shopee店舗を接続 →</button><em>パスワードはDOCKへ保存されません</em></div>
                  <b className="setup-pin pin-a">1</b><b className="setup-pin pin-b">2</b><figcaption>① 販売国を選択　② Shopee認可へ</figcaption>
                </figure>
              </article>

              <article className="setup-step">
                <div className="setup-step__copy"><span>STEP 3</span><h3>Shopeeで、接続する店舗を許可</h3><p>Shopeeへログインし、DOCKと接続する店舗を選びます。認可後はアクセストークンをサーバー側で暗号化して扱い、画面へ再表示しません。</p><ul><li>画面の接続先がShopeeであることを確認</li><li>対象店舗だけを選択</li><li>内容を確認して認可</li></ul></div>
                <figure className="setup-screen setup-screen--oauth" aria-label="Shopee OAuth店舗認可画面イメージ">
                  <div className="setup-browser"><i /><i /><i /><span>open.shopee.example</span></div>
                  <div className="setup-oauth-card"><span className="setup-shopee-mark">S</span><h4>店舗へのアクセスを許可</h4><p>DOCKが次の店舗と連携します</p><label><i>✓</i><span><strong>tanaka_ryota.sg</strong><small>Singapore</small></span></label><button>認可して接続</button></div>
                  <b className="setup-pin pin-a">1</b><b className="setup-pin pin-b">2</b><figcaption>① 対象店舗を確認　② 認可してDOCKへ戻る</figcaption>
                </figure>
              </article>

              <article className="setup-step reverse">
                <div className="setup-step__copy"><span>STEP 4</span><h3>接続完了後、商品を取り込む</h3><p>店舗名・販売国・API接続状態が表示されたら準備完了です。商品URLまたはCSVを取り込み、価格や配送条件を確認して出品へ進みます。</p><ul><li>店舗の接続状態を確認</li><li>URLまたはCSVを用意</li><li>登録前プレビューで最終確認</li></ul></div>
                <figure className="setup-screen setup-screen--complete" aria-label="DOCKの店舗接続完了画面イメージ">
                  <div className="setup-appbar"><span>D</span><div><strong>店舗連携</strong><small>接続状況</small></div><i>更新済み</i></div>
                  <div className="setup-complete-card"><span>SG</span><div><small>接続済み</small><h4>tanaka_ryota.sg</h4><p>API接続 <b>正常</b>・トークン <b>有効</b></p></div></div><div className="setup-next-action"><span>次の操作</span><strong>商品URL・CSVを取り込む</strong><button>商品を出品 →</button></div>
                  <b className="setup-pin pin-a">1</b><b className="setup-pin pin-b">2</b><figcaption>① 接続状態を確認　② 商品の取り込みへ</figcaption>
                </figure>
              </article>
            </section>

            <details className="setup-advanced">
              <summary><b>上級者向け</b><span><strong>自社のOpen Platformアプリを使う場合</strong><small>通常のDOCK利用では、この設定は不要です。</small></span><i aria-hidden="true">＋</i></summary>
            <section className="setup-api" aria-labelledby="setup-api-title">
              <div className="setup-api__copy"><span className="marketing-eyebrow">FOR OWN APP USERS</span><h2 id="setup-api-title">自社のOpen Platformアプリを使う場合</h2><p>この手順は、限定βで「自社アプリ接続」を個別に案内された方、または自社でShopee APIアプリを開発・管理する方だけが対象です。通常のDOCK利用者には不要です。</p><ol><li><b>1</b><span><strong>Open Platformアカウントを登録</strong>メールアドレスで開発者アカウントを作成します。</span></li><li><b>2</b><span><strong>プロフィール承認を申請</strong>事業内容に合うアカウント種別で審査を受けます。</span></li><li><b>3</b><span><strong>Appを作成</strong>App ManagementのApp Listからアプリを作成します。</span></li><li><b>4</b><span><strong>テスト情報を確認</strong>Sandbox用のTest Partner IDとTest Keyで接続を検証します。</span></li></ol></div>
              <figure className="setup-console" aria-label="Shopee Open Platform App Listの画面イメージ">
                <div className="setup-console__bar"><span>Shopee Open Platform</span><i>Console</i></div><div className="setup-console__body"><aside><strong>App Management</strong><b>App List</b><span>Profile</span><span>Authorization</span></aside><div><small>APP LIST / TEST</small><h3>DOCK Integration Test</h3><label><span>Test Partner ID</span><code>1234567</code></label><label><span>Test Key</span><code>••••••••••••••••</code></label><button>Copy Test Partner ID</button><p>Partner Keyはパスワード同様の機密情報です。問い合わせフォームやメールへ記載しないでください。</p></div></div><b className="setup-pin pin-a">1</b><b className="setup-pin pin-b">2</b><figcaption>① App Management → App List　② TestとLiveを取り違えない</figcaption>
              </figure>
              <div className="setup-official-links"><strong>公式手順を確認</strong><a href="https://shopee.jp/edu/article/17135" target="_blank" rel="noreferrer">Open Platformアカウント登録 ↗</a><a href="https://shopee.jp/edu/article/17136" target="_blank" rel="noreferrer">プロフィール承認リクエスト ↗</a><a href="https://open.shopee.com/developer-guide/14" target="_blank" rel="noreferrer">App Management ↗</a><a href="https://open.shopee.com/developer-guide/20" target="_blank" rel="noreferrer">店舗認可の仕組み ↗</a></div>
            </section>
            </details>
          </div>
        </section>

        <section className="marketing-mini-cta"><div className="marketing-container"><div><h2>接続方法が自分の環境に合うか確認する</h2><p>店舗数、販売国、現在のShopee運用を伺い、限定βでの接続方法をご案内します。</p></div><Link className="marketing-button" href="/inquiry">限定βについて相談する</Link></div></section>
      </main>
    </MarketingShell>
  );
}
