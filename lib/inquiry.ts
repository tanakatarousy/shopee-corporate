export const inquiryMarkets = ["台湾", "シンガポール", "マレーシア", "フィリピン", "タイ", "ブラジル", "その他"] as const;
export const inquiryListingVolumes = ["1〜50件", "51〜200件", "201〜500件", "501〜2,000件", "2,001件以上"] as const;
export const inquiryMonthlyVolumes = ["1〜50件", "51〜200件", "201〜500件", "501件以上"] as const;
export const inquiryHours = ["5時間未満", "5〜20時間", "21〜50時間", "51時間以上", "分からない"] as const;
export const inquiryPriceIntents = ["スターターβ（仮・月額2,500円）を検討", "グロースβ（仮・月額5,000円）を検討", "機能を相談して決めたい", "情報収集段階"] as const;

export type InquiryInput = {
  visitorId: string;
  name: string;
  company: string;
  email: string;
  markets: string[];
  activeListings: string;
  monthlyListings: string;
  monthlyHours: string;
  challenge: string;
  pilotReady: boolean;
  priceIntent: string;
  consent: boolean;
  website?: string;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function allowed(value: string, choices: readonly string[]) {
  return choices.includes(value);
}

export function validateInquiry(value: unknown): { ok: true; data: InquiryInput } | { ok: false; error: string } {
  if (!value || typeof value !== "object") return { ok: false, error: "入力内容を確認してください。" };
  const input = value as Record<string, unknown>;
  const visitorId = clean(input.visitorId, 80);
  const name = clean(input.name, 80);
  const company = clean(input.company, 120);
  const email = clean(input.email, 200).toLowerCase();
  const challenge = clean(input.challenge, 1000);
  const website = clean(input.website, 200);
  const markets = Array.isArray(input.markets)
    ? [...new Set(input.markets.map((item) => clean(item, 30)).filter((item) => allowed(item, inquiryMarkets)))].slice(0, inquiryMarkets.length)
    : [];
  const activeListings = clean(input.activeListings, 30);
  const monthlyListings = clean(input.monthlyListings, 30);
  const monthlyHours = clean(input.monthlyHours, 30);
  const priceIntent = clean(input.priceIntent, 80);
  const pilotReady = input.pilotReady === true;
  const consent = input.consent === true;

  if (visitorId && !/^[a-zA-Z0-9-]{8,80}$/.test(visitorId)) return { ok: false, error: "閲覧識別情報を確認できませんでした。ページを再読み込みしてお試しください。" };

  if (!name) return { ok: false, error: "お名前を入力してください。" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "連絡可能なメールアドレスを入力してください。" };
  if (markets.length === 0) return { ok: false, error: "販売中または検討中の国を1つ以上選択してください。" };
  if (!allowed(activeListings, inquiryListingVolumes)) return { ok: false, error: "現在の商品数を選択してください。" };
  if (!allowed(monthlyListings, inquiryMonthlyVolumes)) return { ok: false, error: "1か月の追加商品数を選択してください。" };
  if (!allowed(monthlyHours, inquiryHours)) return { ok: false, error: "毎月の作業時間を選択してください。" };
  if (!challenge) return { ok: false, error: "現在困っていることを入力してください。" };
  if (!allowed(priceIntent, inquiryPriceIntents)) return { ok: false, error: "料金について最も近いものを選択してください。" };
  if (!consent) return { ok: false, error: "プライバシーポリシーへの同意が必要です。" };

  return { ok: true, data: { visitorId, name, company, email, markets, activeListings, monthlyListings, monthlyHours, challenge, pilotReady, priceIntent, consent, website } };
}
