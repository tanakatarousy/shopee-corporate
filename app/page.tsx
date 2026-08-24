import type { Metadata } from "next";
import Link from "next/link";
import MarketingShell from "./components/MarketingShell";
import ListingWorkflowDemo from "./components/ListingWorkflowDemo";
import { faqItems, featureCards, pricingPlans } from "../lib/marketing-content";
import {canonicalUrl,marketingMetadata,siteUrl} from "./seo";

export const metadata: Metadata = marketingMetadata({path:"/",title:"Shopee出品・価格・在庫管理をひとつに",description:"商品URL・CSVからShopee一括出品、国別利益計算、商品選定、在庫・価格同期まで。越境EC運用サービスDOCKの限定βをご案内します。",keywords:["Shopee 一括出品","Shopee 在庫管理","Shopee 価格同期","Shopee API 連携","越境EC ツール","Shopee 出品ツール","Shopee 商品選定"]});

const workflow = [
  ["1", "店舗を接続", "Shopeeの認可画面から、利用する店舗を安全に接続します。"],
  ["2", "商品を取り込む", "商品ページURLまたはCSVを読み込み、販売国ごとの内容を準備します。"],
  ["3", "確認して運用", "価格・カテゴリ・在庫を確認して登録。以後の変化も同じ画面で追跡します。"],
] as const;

const problemRoutes = [
  { number: "01", title: "一括登録の準備が複雑", description: "URL・CSVでできることと、公式Mass Uploadとの違いを確認します。", href: "/guides/shopee-listing-problems#bulk-upload" },
  { number: "02", title: "カテゴリ・配送エラーで止まる", description: "自動判定できる範囲と、登録を止めて確認する条件を整理します。", href: "/guides/shopee-listing-problems#shipping-error" },
  { number: "03", title: "欠品・値上がりの見落としが不安", description: "定期確認、安全停止、確認待ちの仕組みを説明します。", href: "/guides/shopee-listing-problems#inventory-sync" },
  { number: "04", title: "どこまで自動化できるか知りたい", description: "DOCK・一部支援・Seller Centreの境界を一覧で確認できます。", href: "/faq#scope" },
] as const;

export default function LandingPage() {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DOCK",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "Shopeeへの出品準備、商品登録、在庫・価格管理を支援する販売運用サービス",
    url:canonicalUrl("/"),
    image:siteUrl("/og.png"),
    offers: { "@type": "AggregateOffer", lowPrice: "2500", highPrice: "5000", offerCount: "2", priceCurrency: "JPY", availability: "https://schema.org/LimitedAvailability" },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.slice(0, 5).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <MarketingShell>
      <main>
        <section className="marketing-hero">
          <div className="marketing-container marketing-hero__grid">
            <div className="marketing-hero__copy">
              <span className="marketing-eyebrow"><i /> 限定β — 先行利用者を受付中</span>
              <h1>Shopee出品・価格・在庫管理を、<br /><em>ひとつの画面</em>で。</h1>
              <p>商品URLやCSVを取り込み、国別の利益価格を確認してShopeeへ登録。公開後の在庫・価格同期、商品候補の比較、APIエラー対応までまとめます。</p>
              <div className="marketing-hero__actions">
                <Link className="marketing-button" href="/inquiry">限定βについて相談する <span>→</span></Link>
                <Link className="marketing-text-link" href="/faq#scope">自分の課題に対応できるか見る</Link>
              </div>
              <div className="marketing-hero__notes"><span>月額2,500円から（仮）</span><span>初期費用0円予定</span><span>契約前の相談のみ</span></div>
            </div>
            <div className="marketing-product" aria-label="DOCK管理画面のイメージ">
              <div className="marketing-product__top"><span className="marketing-product__logo">D</span><strong>DOCK</strong><i /><i /><i /></div>
              <div className="marketing-product__body">
                <aside><b /><b /><b /><b /></aside>
                <div>
                  <div className="marketing-product__heading"><span><small>販売状況</small><strong>今日の運用</strong></span><button>＋ 商品を出品</button></div>
                  <div className="marketing-product__stats"><span><small>公開中</small><strong>250</strong><i className="good">正常</i></span><span><small>確認が必要</small><strong>3</strong><i>対応待ち</i></span><span><small>同期予定</small><strong>48</strong><i className="good">自動</i></span></div>
                  <div className="marketing-product__list"><div><i>MY</i><span><strong>商品情報を確認</strong><small>価格変更を検知しました</small></span><b>確認する</b></div><div><i>SG</i><span><strong>在庫同期が完了</strong><small>46件を更新しました</small></span><b className="done">完了</b></div><div><i>TW</i><span><strong>新規出品の準備完了</strong><small>12件を確認できます</small></span><b>確認する</b></div></div>
                </div>
              </div>
              <span className="marketing-product__float">自動出品から同期設定まで<br /><b>迷わず進める画面設計</b></span>
            </div>
          </div>
        </section>

        <section className="marketing-proof">
          <div className="marketing-container"><p>ひとつの画面で対応</p><div><span>Amazon</span><span>楽天市場</span><span>Yahoo!ショッピング</span><span>Shopee Open Platform</span></div></div>
        </section>

        <section id="problems" className="marketing-section marketing-problem-routes">
          <div className="marketing-container">
            <div className="marketing-problem-routes__heading"><span className="marketing-eyebrow">START FROM YOUR ISSUE</span><h2>いま困っていることから、<br />必要な説明へ。</h2><p>機能一覧を最初から読む必要はありません。近い悩みを選ぶと、現在できること・できないこと・次の操作を確認できます。</p></div>
            <div className="marketing-problem-routes__grid">
              {problemRoutes.map((item) => <Link href={item.href} key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p><b>確認する →</b></Link>)}
            </div>
          </div>
        </section>

        <section id="about" className="marketing-section marketing-purpose">
          <div className="marketing-container marketing-purpose__grid">
            <div className="marketing-section__heading">
              <span className="marketing-eyebrow">WHY DOCK</span>
              <h2>商品を、ひとつの市場で<br />終わらせない。</h2>
            </div>
            <div className="marketing-purpose__copy">
              <p>DOCKは、自社在庫や取扱権限のある商品を、Shopeeの複数市場へ展開しやすくするサービスです。</p>
              <p>店舗ごとの再入力を減らし、販売先に応じた価格・カテゴリ・配送条件を確認してから登録。公開後の変化も同じ画面で管理できます。</p>
              <div className="marketing-purpose__route" aria-label="DOCKが支援する商品展開の流れ">
                <span><b>01</b>自社在庫・取扱商品</span>
                <i>→</i>
                <span><b>02</b>国別条件を確認</span>
                <i>→</i>
                <span><b>03</b>Shopee各国店舗へ</span>
              </div>
              <small>取り扱い権限があり、供給・発送の見込みを確認できる商品の登録を前提としています。</small>
            </div>
          </div>
        </section>

        <section id="screens" className="marketing-section marketing-screens-section">
          <div className="marketing-container">
            <div className="marketing-section__heading"><span className="marketing-eyebrow">REAL WORKFLOW</span><h2>実際の操作画面で、<br />できることを確認。</h2><p>機能名だけでなく、日々使う画面と操作の流れでご紹介します。</p></div>
            <div className="marketing-screen-stories">
              <article className="marketing-screen-story">
                <div className="marketing-screen-story__copy"><span>01 / 自動出品</span><h3>URL・CSVを取り込み、<br />確認してから出品。</h3><p>1件ずつの登録とCSV一括登録を同じ入口から開始。店舗、価格、カテゴリ、配送方法を確認してからShopeeへ送信します。</p><ol><li><b>1</b><span><strong>取り込み方法を選択</strong>URL・手入力・CSVに対応</span></li><li><b>2</b><span><strong>登録前に確認</strong>利益と必須項目を一覧化</span></li><li><b>3</b><span><strong>結果をその場で把握</strong>成功・要確認・失敗を分離</span></li></ol></div>
                <ListingWorkflowDemo />
              </article>

              <article className="marketing-screen-story reverse">
                <div className="marketing-screen-story__copy"><span>02 / 出品状況</span><h3>店舗ごとの状態を、<br />ひとつの一覧で確認。</h3><p>公開中、非公開、確認が必要な商品を店舗別に整理。個別更新と一括操作を、同じ一覧から行えます。</p><ol><li><b>1</b><span><strong>店舗単位で絞り込み</strong>国・公開状態・商品名で検索</span></li><li><b>2</b><span><strong>異常だけを確認</strong>要対応の商品を見落としにくく</span></li><li><b>3</b><span><strong>一括で操作</strong>公開停止・再公開・削除に対応</span></li></ol></div>
                <div className="marketing-screen-frame marketing-screen-catalog" aria-label="DOCKの出品状況画面をもとにした表示例">
                  <header><span>D</span><div><strong>Shopee出品管理</strong><small>店舗の商品を取得・編集</small></div><i>250件を取得</i></header>
                  <div className="marketing-screen-stats"><span><small>公開中</small><strong>250</strong></span><span><small>公開停止</small><strong>0</strong></span><span><small>確認中</small><strong>3</strong></span></div>
                  <div className="marketing-screen-filters"><b>すべての店舗⌄</b><b>公開状態⌄</b><span>商品名・商品ID・SKU</span><button>表示条件を確認</button></div>
                  <div className="marketing-screen-bulk"><span><strong>0件</strong>を選択中</span><button>一括非公開</button><button>再公開</button><button>選択商品を削除</button></div>
                  <div className="marketing-screen-shop"><span>SG</span><div><strong>シンガポール店</strong><small>53 公開中・0 停止中</small></div><button>商品を表示</button></div>
                  <b className="marketing-screen-pin pin-one">1</b><b className="marketing-screen-pin pin-two">2</b><b className="marketing-screen-pin pin-three">3</b>
                </div>
              </article>

              <article className="marketing-screen-story">
                <div className="marketing-screen-story__copy"><span>03 / 同期設定</span><h3>在庫と価格の同期範囲を、<br />商品ごとに選べる。</h3><p>登録元ページの変化を検知したとき、どの商品を自動更新し、どこで確認を挟むかを設定できます。</p><ol><li><b>1</b><span><strong>同期対象を選択</strong>店舗・商品単位でON／OFF</span></li><li><b>2</b><span><strong>安全停止を設定</strong>値上がり・欠品時の動作を指定</span></li><li><b>3</b><span><strong>履歴を確認</strong>更新件数と要対応を記録</span></li></ol></div>
                <div className="marketing-screen-frame marketing-screen-sync" aria-label="DOCKの同期設定画面をもとにした表示例">
                  <header><span>D</span><div><strong>価格・在庫同期</strong><small>変更内容と反映結果を確認</small></div><i>最終同期 04:54</i></header>
                  <div className="marketing-sync-status"><span><small>同期対象</small><strong>48商品</strong></span><span><small>前回の更新</small><strong>12件</strong></span><span><small>要確認</small><strong>2件</strong></span></div>
                  <div className="marketing-sync-settings"><h4>自動同期の設定</h4><label><span><strong>在庫切れ時に公開を停止</strong><small>登録元ページで欠品した商品を安全停止</small></span><i className="on">ON</i></label><label><span><strong>元価格の変化を反映</strong><small>利益率を再計算して価格を更新</small></span><i className="on">ON</i></label><label><span><strong>大幅な値上がりは確認する</strong><small>設定幅を超えた場合は自動更新しない</small></span><i>確認</i></label></div>
                  <div className="marketing-sync-footer"><span>次回の確認対象：48商品</span><button>設定を保存</button></div>
                  <b className="marketing-screen-pin pin-one">1</b><b className="marketing-screen-pin pin-two">2</b><b className="marketing-screen-pin pin-three">3</b>
                </div>
              </article>
            </div>
            <div className="marketing-video-note"><span>▶</span><div><strong>テストデータで、処理の流れをその場で確認できます。</strong><p>上の自動出品画面は、CSV読込から登録完了までを自動再生します。デモは操作の流れを示すもので、実際の処理時間は商品件数・登録元ページ・Shopee APIの応答状況によって変わります。</p></div></div>
            <p className="marketing-screen-disclaimer">※ 掲載画面は開発中の実画面をもとに、店舗名・商品情報などを公開用データへ置き換えて再構成しています。</p>
          </div>
        </section>

        <section id="features" className="marketing-section">
          <div className="marketing-container">
            <div className="marketing-section__heading"><span className="marketing-eyebrow">CAPABILITIES</span><h2>操作画面だけでは伝わらない、<br />判断と安全確認。</h2><p>市場をまたぐ運用で必要になる、価格判断・商品選定・エラー対応を補助します。</p></div>
            <div className="marketing-feature-grid">
              {featureCards.map((feature) => <article key={feature.number}><span>{feature.number}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}
            </div>
          </div>
        </section>

        <section id="pricing" className="marketing-section marketing-section--tint marketing-price-preview">
          <div className="marketing-container">
            <div className="marketing-section__heading"><span className="marketing-eyebrow">BETA PRICING</span><h2>月額2,500円から（仮）、<br />必要な範囲で始める。</h2><p>1店舗向けと複数店舗向けの2プランです。表示価格・利用範囲はβ版の仮設定で、初期費用0円を予定しています。</p></div>
            <div className="marketing-price-preview__grid">
              {pricingPlans.map((plan) => <article key={plan.name} className={plan.featured ? "featured" : ""}><span>{plan.badge}</span><div><h3>{plan.name}</h3><p>{plan.description}</p></div><strong><small>月額</small>{plan.price}<small>円</small></strong><ul>{plan.features.slice(0, 4).map((feature) => <li key={feature}>{feature}</li>)}</ul><Link href="/pricing">詳しい利用範囲を見る →</Link></article>)}
            </div>
          </div>
        </section>

        <section id="workflow" className="marketing-section marketing-section--tint">
          <div className="marketing-container marketing-workflow">
            <div className="marketing-section__heading"><span className="marketing-eyebrow">HOW IT WORKS</span><h2>接続して、取り込み、<br />確認して進める。</h2><p>DOCKはインストール不要で、ブラウザから利用するWebアプリです。勝手に公開されない、途中で確認できる運用を基本にしています。</p><Link className="marketing-text-link marketing-workflow__link" href="/setup">必要な準備と店舗接続を見る →</Link></div>
            <ol>{workflow.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
          </div>
        </section>

        <section className="marketing-section marketing-security-band">
          <div className="marketing-container"><div><span className="marketing-eyebrow">SECURITY BY DESIGN</span><h2>認証情報を、画面に残さない。</h2><p>OAuthトークンはサーバー側で暗号化して保存し、画面へ再表示しません。店舗・商品・同期履歴は利用者ごとの専用領域に分けて扱います。</p></div><Link className="marketing-button marketing-button--light" href="/security">保存する情報を確認する</Link></div>
        </section>

        <section className="marketing-section marketing-beta">
          <div className="marketing-container marketing-beta__inner"><span className="marketing-eyebrow">FOUNDING BETA</span><h2>まず、あなたの現在の運用を<br />教えてください。</h2><p>現在は正式販売前の限定βを募集しています。問い合わせだけで契約にはなりません。店舗数や作業量を確認し、対象となる方へ個別にご案内します。</p><div><Link className="marketing-button" href="/inquiry">限定βについて相談する <span>→</span></Link><Link className="marketing-text-link" href="/pricing">料金の考え方を見る</Link></div></div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </MarketingShell>
  );
}
