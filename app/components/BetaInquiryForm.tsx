"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { inquiryHours, inquiryListingVolumes, inquiryMarkets, inquiryMonthlyVolumes, inquiryPriceIntents } from "../../lib/inquiry";
import { getOrCreateVisitorId } from "../../lib/visitor-id";

type Status = { kind: "idle" | "sending" | "success" | "error"; message: string };

export default function BetaInquiryForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });
  const [markets, setMarkets] = useState<string[]>([]);
  const emailRef = useRef<HTMLInputElement>(null);

  function focusEmail() {
    emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    emailRef.current?.focus({ preventScroll: true });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      const invalid = form.querySelector<HTMLElement>(":invalid");
      invalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      invalid?.focus({ preventScroll: true });
      setStatus({ kind: "error", message: "未入力または入力内容に誤りがある項目を確認してください。" });
      return;
    }
    setStatus({ kind: "sending", message: "送信しています…" });
    const data = new FormData(form);
    const payload = {
      name: data.get("name"), company: data.get("company"), email: data.get("email"), markets,
      activeListings: data.get("activeListings"), monthlyListings: data.get("monthlyListings"), monthlyHours: data.get("monthlyHours"),
      challenge: data.get("challenge"), pilotReady: data.get("pilotReady") === "yes", priceIntent: data.get("priceIntent"),
      consent: data.get("consent") === "yes", website: data.get("website"), visitorId: getOrCreateVisitorId(),
    };
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error || "送信できませんでした。時間をおいて再度お試しください。");
      form.reset();
      setMarkets([]);
      setStatus({ kind: "success", message: result.message || "お問い合わせを受け付けました。内容を確認してご連絡します。" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "送信できませんでした。";
      setStatus({ kind: "error", message });
      if (message.includes("メールアドレス")) requestAnimationFrame(focusEmail);
    }
  }

  function toggleMarket(market: string) {
    setMarkets((current) => current.includes(market) ? current.filter((item) => item !== market) : [...current, market]);
  }

  return (
    <form className="marketing-inquiry-form" onSubmit={submit} noValidate>
      <div className="marketing-form-section"><span>01</span><div><h2>ご連絡先</h2><p>問い合わせだけで契約にはなりません。</p></div></div>
      <div className="marketing-form-grid"><label><span>お名前 <b>必須</b></span><input name="name" autoComplete="name" required maxLength={80} /></label><label><span>会社名・屋号 <em>任意</em></span><input name="company" autoComplete="organization" maxLength={120} /></label><label className="wide"><span>メールアドレス <b>必須</b></span><input ref={emailRef} id="inquiry-email" name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} aria-describedby="inquiry-email-help" required maxLength={200} /><small id="inquiry-email-help" className="marketing-field-help">限定βのご案内・回答の送付にのみ使用します。</small></label><label className="marketing-honeypot" aria-hidden="true"><span>ウェブサイト</span><input name="website" tabIndex={-1} autoComplete="off" /></label></div>

      <div className="marketing-form-section"><span>02</span><div><h2>現在のShopee運用</h2><p>β版で解決できる課題かを確認します。</p></div></div>
      <fieldset><legend>販売中または検討中の国 <b>必須</b></legend><div className="marketing-choice-grid">{inquiryMarkets.map((market) => <label key={market} className={markets.includes(market) ? "selected" : ""}><input type="checkbox" checked={markets.includes(market)} onChange={() => toggleMarket(market)} /><span>{market}</span></label>)}</div></fieldset>
      <div className="marketing-form-grid"><label><span>現在の出品商品数 <b>必須</b></span><select name="activeListings" required defaultValue=""><option value="" disabled>選択してください</option>{inquiryListingVolumes.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>1か月に追加したい商品数 <b>必須</b></span><select name="monthlyListings" required defaultValue=""><option value="" disabled>選択してください</option>{inquiryMonthlyVolumes.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>出品・管理にかかる時間／月 <b>必須</b></span><select name="monthlyHours" required defaultValue=""><option value="" disabled>選択してください</option>{inquiryHours.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>実店舗を接続したβテスト</span><select name="pilotReady" defaultValue="no"><option value="yes">参加を検討できる</option><option value="no">まず説明を聞きたい</option></select></label><label className="wide"><span>現在いちばん困っていること <b>必須</b></span><textarea name="challenge" required maxLength={1000} rows={5} placeholder="例：50件の登録に毎回5時間以上かかる、配送方法のエラー原因が分からない" /></label></div>

      <div className="marketing-form-section"><span>03</span><div><h2>料金について</h2><p>正式版の価格を判断するために使用します。</p></div></div>
      <fieldset><legend>最も近いもの <b>必須</b></legend><div className="marketing-radio-list">{inquiryPriceIntents.map((item) => <label key={item}><input type="radio" name="priceIntent" value={item} required /><span>{item}</span></label>)}</div></fieldset>
      <label className="marketing-consent"><input type="checkbox" name="consent" value="yes" required /><span><Link href="/privacy" target="_blank">プライバシーポリシー</Link>を確認し、問い合わせ内容の取扱いに同意します。</span></label>
      {status.kind !== "idle" && <div className={`marketing-form-status ${status.kind}`} role="status">{status.message}</div>}
      <button className="marketing-button marketing-submit" type="submit" disabled={status.kind === "sending"}>{status.kind === "sending" ? "送信中…" : "限定βについて相談する"}<span>→</span></button>
      <p className="marketing-form-footnote">通常2～3営業日以内を目安にご連絡します。営業目的の送信はご遠慮ください。</p>
    </form>
  );
}
