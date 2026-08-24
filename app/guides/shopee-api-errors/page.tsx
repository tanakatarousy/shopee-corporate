import type { Metadata } from "next";
import GuideArticle from "../../components/GuideArticle";
import { marketingMetadata } from "../../seo";

export const metadata: Metadata = marketingMetadata({path:"/guides/shopee-api-errors",title:"Shopee APIエラーを原因別に読み分ける",description:"Shopee APIの商品登録エラーを、出品上限、配送制限、必須情報、認証、通信の原因別に判断する方法です。",image:false,type:"article"});

export default function ApiErrorGuide() {
  return <GuideArticle path="/guides/shopee-api-errors" category="エラー対応" title="Shopee APIエラーを原因別に読み分ける" lead="英語のエラー文をそのまま表示しても、利用者は次に何をすればよいか判断できません。工程、原因、登録結果、対応方法に分けて読み取ります。" minutes="8分">
    <p>最初に確認するのは、エラーが発生した工程です。商品情報の取得、翻訳、価格計算、画像登録、商品登録、公開後の更新では、失敗している対象が異なります。Shopeeの商品登録APIで失敗した場合、商品は原則として新規登録されていないことを明示します。</p>
    <h2>1. 店舗の出品上限</h2><p><code>product.error_reach_shop_item_limit</code> は、店舗が登録できる商品数の上限へ達している状態です。商品内容を修正しても解消しません。既存商品を非公開にする、不要商品を整理する、Shopee側の枠を確認するなど、店舗側の対応が必要です。</p>
    <h2>2. カテゴリと配送方法の禁止</h2><p>「Product category is prohibited for the channel」のような内容は、選んだカテゴリと配送方法の組み合わせが利用できない状態です。別の配送方法を店舗で有効にするか、商品内容に合う範囲でカテゴリを見直します。</p>
    <h2>3. 必須属性・ブランド・画像の不足</h2><p>カテゴリ自体は正しくても、必須属性が未選択、ブランドIDが無効、画像IDが期限切れなどで拒否されます。エラーが示す項目だけを再取得・再選択し、最初から商品取得をやり直さない方が効率的です。</p>
    <h2>4. OAuth認証と権限</h2><p>アクセストークンの期限、更新トークンの失効、店舗認可の解除、権限不足では、商品内容に関係なくAPIが拒否されます。トークンを画面へ表示せず、再認証が必要であることだけを利用者へ案内します。</p>
    <h2>5. レート制限・一時障害</h2><p>短時間の呼び出し上限、タイムアウト、5xx応答は、同じ内容を即座に繰り返すと悪化します。待機時間を延ばしながら再試行し、上限回数を超えたら確認待ちにします。</p>
    <h2>利用者向け表示に必要な4点</h2><ol><li><strong>どこで失敗したか</strong>：例「出品工程2/2・商品登録」</li><li><strong>原因</strong>：例「店舗の商品数が上限に達しています」</li><li><strong>登録結果</strong>：例「今回の商品は登録されていません」</li><li><strong>次の対応</strong>：例「既存商品を整理後、再実行してください」</li></ol><p>技術コードはサポート用として末尾に残し、最初に日本語の結論を表示します。</p>
    <div className="marketing-guide__summary"><strong>エラー表示の結論</strong><p>APIメッセージの翻訳だけでは足りません。原因を分類し、利用者が変更できる項目と、Shopeeまたは店舗側でしか解消できない項目を分けて案内します。</p></div>
  </GuideArticle>;
}
