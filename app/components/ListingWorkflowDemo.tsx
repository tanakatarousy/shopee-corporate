"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const demoRows = [
  { number: "01", name: "アニメフィギュア／テスト商品 A", detail: "利益率と配送方法を確認します" },
  { number: "02", name: "トレーディングカード BOX／テスト商品 B", detail: "販売価格とカテゴリを確認します" },
  { number: "03", name: "キャラクターぬいぐるみ／テスト商品 C", detail: "配送方法の候補を照合します" },
] as const;

const stages = [
  { count: "0 / 12件", message: "デモCSVを選択してください", badge: "待機中", file: "デモCSVを選択", footer: "自動でデモを開始します", action: "確認した商品を登録", progress: 0 },
  { count: "4 / 12件", message: "の商品情報を読み込み中", badge: "CSV読込中", file: "dock_demo_12items.csv", footer: "商品名・価格・画像を読み込んでいます", action: "読込中…", progress: 34 },
  { count: "9 / 12件", message: "の必須項目を確認中", badge: "内容確認中", file: "dock_demo_12items.csv", footer: "価格・カテゴリ・配送方法を照合しています", action: "確認中…", progress: 74 },
  { count: "12 / 12件", message: "の確認が完了", badge: "登録前プレビュー", file: "dock_demo_12items.csv", footer: "内容を修正して再確認できます", action: "確認した商品を登録", progress: 100 },
  { count: "8 / 12件", message: "をShopeeへ登録中", badge: "登録処理中", file: "dock_demo_12items.csv", footer: "登録結果を1件ずつ確認しています", action: "登録中…", progress: 67 },
  { count: "12 / 12件", message: "の登録が完了", badge: "処理完了", file: "dock_demo_12items.csv", footer: "成功12件・要確認0件・失敗0件", action: "登録完了", progress: 100 },
] as const;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function rowStatus(stage: number, index: number) {
  if (stage === 0) return { label: "待機中", tone: "idle", active: false };
  if (stage === 1) return index === 0 ? { label: "読込中", tone: "working", active: true } : { label: "待機中", tone: "idle", active: false };
  if (stage === 2) return index < 2 ? { label: index === 1 ? "確認中" : "確認済み", tone: index === 1 ? "working" : "ok", active: index === 1 } : { label: "待機中", tone: "idle", active: false };
  if (stage === 3) return index === 2 ? { label: "要確認", tone: "check", active: true } : { label: "登録可能", tone: "ok", active: false };
  if (stage === 4) return index === 2 ? { label: "登録中", tone: "working", active: true } : { label: "登録済み", tone: "done", active: false };
  return { label: "登録済み", tone: "done", active: false };
}

export default function ListingWorkflowDemo() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false);
  const visibleStage = reducedMotion ? 3 : stage;
  const isPlaying = playing && !reducedMotion;
  const current = stages[visibleStage];

  useEffect(() => {
    if (!isPlaying) return;
    const delay = stage === 5 ? 2600 : stage === 0 ? 1500 : 1900;
    const timer = window.setTimeout(() => setStage((value) => (value + 1) % stages.length), delay);
    return () => window.clearTimeout(timer);
  }, [isPlaying, stage]);

  const restart = () => {
    setStage(1);
    setPlaying(true);
  };

  return (
    <div className={`marketing-screen-frame marketing-listing-demo demo-stage-${visibleStage}`} aria-label="テストデータで動くDOCK自動出品デモ">
      <header>
        <span>D</span>
        <div><strong>商品を出品</strong><small>URL・CSV一括登録</small></div>
        <div className="marketing-demo-controls">
          <em>デモデータ</em>
          <button type="button" onClick={() => setPlaying((value) => !value)} aria-label={isPlaying ? "デモを一時停止" : "デモを再生"}>{isPlaying ? "Ⅱ 一時停止" : "▶ 再生"}</button>
        </div>
      </header>
      <nav><b>1件ずつ</b><b className="active">URL・CSV一括登録</b></nav>
      <div className="marketing-screen-import">
        <label><small>出品先店舗</small><strong>SG・シンガポール店（SGD）</strong></label>
        <label><small>CSVを読み込む</small><button type="button" className={visibleStage === 0 ? "is-pulsing" : ""} onClick={restart}>{current.file}</button></label>
      </div>
      <div className="marketing-screen-progress is-animated" aria-live="polite">
        <span><strong>{current.count}</strong>{current.message}</span><em>{current.badge}</em>
        <div className="marketing-demo-progress-track" aria-hidden="true"><i style={{ width: `${current.progress}%` }} /></div>
      </div>
      <div className="marketing-screen-rows">
        {demoRows.map((row, index) => {
          const status = rowStatus(visibleStage, index);
          return <p key={row.number} className={status.active ? "is-active" : ""}><i>{row.number}</i><span><strong>{row.name}</strong><small>{visibleStage >= 5 ? "Shopee商品IDの確認が完了しました" : row.detail}</small></span><b className={status.tone}>{status.label}</b></p>;
        })}
      </div>
      <footer><span>{current.footer}</span><button type="button" className={visibleStage === 3 ? "is-ready" : visibleStage === 5 ? "is-complete" : ""} onClick={visibleStage === 3 ? () => { setStage(4); setPlaying(true); } : restart}>{current.action}</button></footer>
      <div className="marketing-demo-stage-dots" aria-label={`デモ工程 ${visibleStage + 1} / ${stages.length}`}>{stages.map((_, index) => <i key={index} className={index === visibleStage ? "active" : index < visibleStage ? "done" : ""} />)}</div>
      <b className="marketing-screen-pin pin-one">1</b><b className="marketing-screen-pin pin-two">2</b><b className="marketing-screen-pin pin-three">3</b>
    </div>
  );
}
