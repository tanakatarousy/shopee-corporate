import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "../../components/GuideArticle";
import { solutionCoverage } from "../../../lib/marketing-content";
import { marketingMetadata } from "../../seo";

export const metadata: Metadata = marketingMetadata({path:"/guides/shopee-listing-problems",title:"Shopee出品・操作のよくある悩み｜一括登録・カテゴリ・在庫・配送",description:"Shopeeの一括出品、カテゴリ、バリエーション、在庫、SLS配送、注文、翻訳、APIエラーの悩みと、DOCKで対応できる範囲を整理します。",keywords:["Shopee 出品 わからない","Shopee 一括出品 エラー","Shopee カテゴリ 選び方","Shopee 在庫管理","Shopee SLS 使い方","Shopee セラーセンター 操作"],image:false,type:"article"});

const faq = [
  ["DOCKを使えばShopeeのExcelテンプレートは不要ですか？", "商品URLまたはURLをまとめたCSVから出品準備を始められます。ただし、Shopee公式Mass Uploadの任意のExcelファイルをそのまま取り込む機能ではありません。"],
  ["カテゴリや配送方法は自動で決まりますか？", "Shopee公式候補から自動判定しますが、確定できない商品は候補選択で止めます。商品内容と異なるカテゴリを勝手に確定しません。"],
  ["バリエーション商品も新規出品できますか？", "現在の新規出品は単一商品が対象です。既存バリエーションの確認はできますが、サイズ・カラーの新規作成はSeller Centreで行います。"],
  ["SLSの配送ラベルをDOCKで印刷できますか？", "現在は対応していません。Arrange Shipment、ラベル発行・印刷、発送処理はSeller Centreで行います。"],
  ["在庫はリアルタイムで連動しますか？", "登録元ページを定期確認する方式です。受注と同時に全店舗の共有在庫を引き当てるリアルタイム在庫管理ではありません。"],
  ["Shopeeのすべてのエラーを日本語で説明できますか？", "既知の主要エラーは原因と対処へ変換します。未知のエラーは元のエラーコードを残して表示し、内容を追加調査できるようにします。"],
] as const;

export default function ListingProblemsGuide() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  };
  return <>
    <GuideArticle path="/guides/shopee-listing-problems" category="悩み・操作" title="Shopee出品・操作のよくある悩みと、DOCKの対応範囲" lead="一括登録、カテゴリ、在庫、配送、注文。検索される悩みを、DOCKで解決できること、一部だけ支援すること、Seller Centreで行うことに分けました。" minutes="9分">
      <p>Shopeeの操作でつまずきやすいのは、出品画面だけではありません。商品登録後の在庫、発送期限、注文、規制、手数料までが連続しています。DOCKはこのすべてを置き換えるものではなく、商品情報の取り込み、出品前確認、Shopee登録、公開後の商品同期を中心に支援します。</p>
      <div className="marketing-guide__legend" aria-label="対応状況の見方"><span className="supported">DOCKで対応</span><span className="partial">一部支援</span><span className="seller">Seller Centreで操作</span></div>
      <div className="marketing-solution-matrix">
        {solutionCoverage.map((concern) => <article id={concern.id} className={concern.status} key={concern.title}><span>{concern.label}</span><h3>{concern.title}</h3><p>{concern.body}</p></article>)}
      </div>

      <h2>DOCKが特に解決しやすい範囲</h2>
      <p>件数が増えるほど負担になる「URLからの商品情報取得」「販売先言語への変換」「カテゴリ・属性・配送の確認」「利益計算」「API送信」「欠品・価格変更の再確認」は、一つの操作の流れへまとめられます。成功・要確認・失敗も商品ごとに分けるため、一括処理の途中で一部だけ失敗しても原因を追えます。</p>
      <h2>Seller Centreを残す理由</h2>
      <p>発送、キャンセル、返品、購入者チャット、広告、Account Healthは、回答期限やペナルティ、購入者への直接連絡に関わります。現段階では無理に自動化せず、Shopee公式画面を正として利用します。DOCK上でも、対応していない操作を「できる」と表現しません。</p>
      <h2>よくある質問</h2>
      {faq.map(([question, answer]) => <section key={question}><h3>{question}</h3><p>{answer}</p></section>)}

      <div className="marketing-guide__sources">
        <h2>公式情報の確認先</h2>
        <p>市場や時期によって条件が変わる項目は、Shopee公式の最新案内を優先してください。</p>
        <ul>
          <li><a href="https://shopee.jp/edu/article/11899" target="_blank" rel="noreferrer">商品アップロード・一括登録</a></li>
          <li><a href="https://shopee.jp/edu/article/11293" target="_blank" rel="noreferrer">商品バリエーション</a></li>
          <li><a href="https://shopee.jp/edu/article/23344" target="_blank" rel="noreferrer">商品タイトル・説明の最適化</a></li>
          <li><a href="https://shopee.jp/edu/article/8518" target="_blank" rel="noreferrer">リスティング禁止・物流規制品目</a></li>
          <li><a href="https://shopee.jp/edu/article/12750" target="_blank" rel="noreferrer">SLSの発送手続き</a></li>
          <li><a href="https://shopee.jp/edu/article/13048" target="_blank" rel="noreferrer">発送期限（Days To Ship）</a></li>
          <li><a href="https://shopee.jp/edu/article/19173" target="_blank" rel="noreferrer">Account Healthとペナルティ</a></li>
          <li><a href="https://shopee.jp/edu/article/11750" target="_blank" rel="noreferrer">販売手数料</a></li>
        </ul>
      </div>
      <div className="marketing-guide__summary"><strong>対応範囲の結論</strong><p>DOCKは「出品と商品同期の複雑さ」を減らすWebアプリです。Seller Centre全体の代替ではありません。現在の悩みがどちらの範囲か分からない場合は、画面やエラー内容を確認したうえで案内します。</p><p><Link href="/guides/shopee-bulk-listing">一括出品前の7項目を見る →</Link></p></div>
    </GuideArticle>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
  </>;
}
