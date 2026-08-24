export const publicNavigation = [
  { href: "/#about", label: "サービスについて" },
  { href: "/#screens", label: "機能・操作画面" },
  { href: "/setup", label: "導入準備" },
  { href: "/pricing", label: "料金" },
  { href: "/security", label: "セキュリティ" },
  { href: "/guides", label: "運用ガイド" },
  { href: "/faq", label: "よくある質問" },
] as const;

export const guideCards = [
  { href: "/guides/shopee-listing-problems", category: "悩み・操作", title: "Shopee出品・操作のよくある悩みと対応範囲", description: "一括登録、カテゴリ、在庫、配送、注文など、よくある困りごとをDOCKで対応できる範囲とともに整理します。", minutes: "9分" },
  { href: "/guides/shopee-bulk-listing", category: "出品準備", title: "Shopee一括出品で、公開前に確認する7項目", description: "件数を増やす前に揃えるべき商品情報、価格、カテゴリ、配送方法を整理します。", minutes: "6分" },
  { href: "/guides/shopee-inventory-sync", category: "在庫管理", title: "在庫・価格同期で販売事故を防ぐ設計", description: "欠品、元価格上昇、取得失敗を同じ扱いにしないための安全停止の考え方です。", minutes: "7分" },
  { href: "/guides/shopee-api-errors", category: "エラー対応", title: "Shopee APIエラーを原因別に読み分ける", description: "出品上限、配送禁止、必須情報不足、認証切れを、次の対応につなげる方法です。", minutes: "8分" },
] as const;

export const solutionCoverage = [
  { id: "bulk-upload", status: "supported", label: "DOCKで対応", title: "Excelの一括アップロードが複雑", body: "商品URLを1件ずつ、またはURLをまとめたCSVで最大50件まで取り込み、商品ごとに準備結果を分けて確認できます。Shopee公式のMass Uploadテンプレートをそのまま読み込む機能ではありません。" },
  { id: "category-logistics", status: "supported", label: "DOCKで対応", title: "海外向けカテゴリ・必須属性・ブランドを選べない", body: "接続店舗のShopee公式カテゴリ、属性、ブランド候補を取得し、商品内容との一致を検証します。自動確定できない場合は、候補を表示して確認待ちで止めます。" },
  { id: "shipping-error", status: "supported", label: "DOCKで対応", title: "カテゴリと配送方法の組み合わせで登録に失敗する", body: "店舗で有効な配送方法を取得し、Shopeeが拒否した配送方法を特定します。代替可能な配送方法があれば除外して再検証し、解消できない場合は原因と対処を日本語で表示します。" },
  { id: "translation", status: "supported", label: "DOCKで対応", title: "商品名・説明文の現地語対応に時間がかかる", body: "商品名と説明文を販売先の掲載言語へ変換し、元の商品情報と並べて確認できます。購入者チャットの翻訳は現在の対象外です。" },
  { id: "profit", status: "supported", label: "DOCKで対応", title: "手数料・送料・為替を含めると利益が分からない", body: "元価格、国内送料、国際送料、梱包費、手数料率、目標利益率、為替を使って販売価格を計算します。Shopeeの手数料改定を自動取得する機能ではないため、設定値の定期確認は必要です。" },
  { id: "inventory-sync", status: "supported", label: "DOCKで対応", title: "登録元ページの欠品や値上がりを見落とす", body: "登録元の商品ページを定期確認し、在庫、価格、商品名、説明、画像の変化を記録します。欠品や安全基準を超える値上がりでは、在庫0や公開停止へつなげられます。" },
  { id: "api-errors", status: "supported", label: "DOCKで対応", title: "Shopee APIの英語エラーだけでは対処できない", body: "出品上限、認証切れ、必須項目不足、カテゴリと配送方法の不一致などを、原因・登録状況・次の操作が分かる日本語へ変換します。未知のエラーは技術情報も残して確認できるようにします。" },
  { id: "variations", status: "partial", label: "一部支援", title: "サイズ・カラーなどのバリエーション設定が難しい", body: "既存商品のバリエーション名、価格、在庫は取得して確認できますが、新規出品時に複数バリエーションを作成・更新する機能は未対応です。現在はSeller Centreで設定します。" },
  { id: "preorder", status: "partial", label: "一部支援", title: "プレオーダーの設定と上限が分からない", body: "出品データへプレオーダー日数を設定できますが、国別ポリシーや店舗全体のプレオーダー比率・数量上限は自動確認の対象外です。最新条件はShopee公式情報で確認します。" },
  { id: "compliance", status: "partial", label: "一部支援", title: "禁止商品・知的財産・重複出品が不安", body: "規制が疑われる商品、カテゴリ不一致、同一店舗への重複登録を出品前に止める確認があります。ただし、法令適合性、輸入可否、画像・説明の利用権限を保証するものではなく、利用者の最終確認が必要です。" },
  { id: "orders", status: "partial", label: "一部支援", title: "注文状況を店舗ごとに確認するのが面倒", body: "接続店舗の注文番号、状態、商品、数量、金額を取得し、新着を管理画面へ通知します。発送確定、配送ラベル発行、キャンセル・返品処理は現在の対象外です。" },
  { id: "listing-seo", status: "partial", label: "一部支援", title: "検索される商品名や売れる価格を決められない", body: "登録元ページ固有の販促文を除き、商品名を販売先言語へ整形し、価格と想定利益を比較できます。Shopee内の検索順位、広告キーワード、売上を保証するSEO自動最適化ではありません。" },
  { id: "sls", status: "seller", label: "Seller Centre", title: "SLSのラベル印刷・発送処理・追跡を行いたい", body: "発送確定、ラストマイルラベルの発行・印刷、集荷や搬入、追跡番号の登録はSeller Centreで行います。DOCKは現在、出品と公開後の商品・注文状況の確認を中心にしています。" },
  { id: "returns", status: "seller", label: "Seller Centre", title: "キャンセル・返品・返金へ対応したい", body: "回答期限やペナルティへ影響する操作のため、現在はSeller Centreの注文画面とShopee公式手順を使用します。DOCKからキャンセル承認や返金操作は行いません。" },
  { id: "promotion", status: "seller", label: "Seller Centre", title: "購入者チャット・広告・キャンペーンを管理したい", body: "購入者チャット、クーポン、広告、フラッシュセール、キャンペーン参加、ショップ装飾は現在のDOCKでは扱いません。各市場のSeller Centreで設定します。" },
  { id: "account-health", status: "seller", label: "Seller Centre", title: "ペナルティポイントやAccount Healthを確認したい", body: "DOCKの事前確認は一部の出品ミス防止を支援しますが、遅延発送率、キャンセル率、違反記録、ペナルティポイントはShopeeのAccount Healthが正式な確認先です。" },
] as const;

export const featureCards = [
  {
    number: "01",
    title: "複数国・複数店舗を一元管理",
    description: "台湾、シンガポール、マレーシアなど、接続したShopee店舗を切り替えながら同じ操作で出品・管理できます。",
  },
  {
    number: "02",
    title: "国別の価格と利益を確認",
    description: "為替、手数料、国際送料、目標利益率を店舗ごとに反映。販売価格の計算根拠を公開前に確認できます。",
  },
  {
    number: "03",
    title: "売れ筋候補を比較・選定",
    description: "競合数、価格帯、想定利益などを市場別に比較し、出品候補・保留・除外を判断しやすくします。",
  },
  {
    number: "04",
    title: "Shopeeエラーを日本語で説明",
    description: "出品上限、カテゴリと配送方法の不一致、必須属性不足などを、原因と次の対応が分かる文章に変換します。",
  },
] as const;

export const pricingPlans = [
  {
    name: "スターター β（仮）",
    price: "2,500",
    unit: "円／月（税込予定）",
    description: "まず1店舗から、出品準備と日々の確認作業をまとめたい方向けです。",
    features: ["Shopee 1店舗", "管理商品 最大150件（仮）", "URL・CSV一括登録", "利益計算・出品前確認", "在庫・価格の定期確認", "日本語の結果・エラー案内", "初期費用 0円予定"],
    featured: false,
    badge: "小さく開始",
  },
  {
    name: "グロース β（仮）",
    price: "5,000",
    unit: "円／月（税込予定）",
    description: "複数国への出品と商品選定・同期まで、まとめて運用したい方向けです。",
    features: ["Shopee 最大3店舗", "管理商品 最大500件（仮）", "URL・CSV一括登録", "国・店舗別の利益計算", "在庫・価格同期と安全停止", "商品選定・需要分析", "優先サポート", "初期費用 0円予定"],
    featured: true,
    badge: "おすすめ",
  },
] as const;

export const faqItems = [
  {
    category: "サービス",
    question: "DOCKは何をするサービスですか？",
    answer: "日本国内の商品情報をURLまたはCSVから取り込み、Shopeeへの出品準備、価格計算、商品登録、在庫・価格の確認を一つの画面で行うための販売運用サービスです。",
  },
  {
    category: "サービス",
    question: "利用すれば必ず売上や利益が出ますか？",
    answer: "いいえ。DOCKは出品と管理作業を支援するサービスで、売上や利益を保証するものではありません。商品選定、販売価格、原価判断は利用者が最終確認します。",
  },
  {
    category: "サービス",
    question: "DOCKでできることと、Seller Centreで行うことの境界は？",
    answer: "DOCKは商品情報の取り込み、出品前確認、商品登録、利益計算、公開後の商品・注文状況の確認、在庫・価格の定期確認を中心に支援します。発送確定・配送ラベル、キャンセル・返品・返金、購入者チャット、広告、Account Healthは現在Seller Centreで操作します。ページ上部の対応範囲一覧で、機能ごとの現在地を確認できます。",
  },
  {
    category: "出品",
    question: "確認せずに商品が公開されることはありますか？",
    answer: "初期設定では、取得した商品情報と価格を確認してから登録します。自動同期の対象と内容も商品ごとに停止・変更できる設計です。",
  },
  {
    category: "出品",
    question: "Shopeeの出品上限に達した場合はどうなりますか？",
    answer: "Shopee APIの上限エラーを検知し、上限到達として日本語で表示します。上限が解消するまで新規登録は行われません。既存商品を非公開にするなど、Shopee側で空きを作った後に再実行できます。",
  },
  {
    category: "出品",
    question: "カテゴリや配送方法が禁止されている場合は？",
    answer: "商品カテゴリと配送方法の組み合わせがShopeeで認められない場合、商品は登録されません。該当する配送方法と、カテゴリまたは店舗設定の確認が必要であることを表示します。",
  },
  {
    category: "連携・安全性",
    question: "ShopeeのAPIキーを利用者が入力しますか？",
    answer: "正式サービスでは運営側のShopeeアプリ情報をサーバーで管理し、利用者はOAuth認証で自分の店舗を接続する方式を予定しています。利用者ごとにPartner Keyを入力させない構成を前提に準備しています。",
  },
  {
    category: "連携・安全性",
    question: "アクセストークンは保存されますか？",
    answer: "自動同期に必要なアクセストークンと更新用トークンは、サーバーのデータベースへ暗号化して保存します。画面へ再表示せず、連携解除・退会時には削除できる仕組みを正式公開前に提供します。",
  },
  {
    category: "連携・安全性",
    question: "注文者の情報も保存しますか？",
    answer: "注文状況の確認に必要な注文番号、状態、商品、数量、金額などをサーバーに保存します。限定βではAPI応答の保存範囲を確認し、正式公開前に不要な購入者情報を保存しない処理、保存期間、削除方法を明確にします。",
  },
  {
    category: "料金・β版",
    question: "限定βの料金はいくらですか？",
    answer: "仮価格は、1店舗向けのスターターβが月額2,500円、複数店舗向けのグロースβが月額5,000円です。いずれも初期費用0円を予定しています。β版での検証結果を踏まえて正式価格と利用範囲を決定し、接続前にご案内します。",
  },
  {
    category: "料金・β版",
    question: "問い合わせをすると契約になりますか？",
    answer: "なりません。現在は限定βの参加希望と課題を確認するための受付です。内容を確認した後、対象となる方へ個別にご案内します。",
  },
  {
    category: "料金・β版",
    question: "β版の途中でやめられますか？",
    answer: "はい。正式なβ利用条件、請求日、解約方法、データ削除については、接続前に書面で案内します。",
  },
] as const;
