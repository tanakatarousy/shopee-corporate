import Link from "next/link";
import type { ReactNode } from "react";
import DockLogo from "./DockLogo";
import MarketingAnalytics from "./MarketingAnalytics";
import { publicNavigation } from "../../lib/marketing-content";

export function MarketingHeader() {
  return (
    <header className="marketing-header">
      <div className="marketing-container marketing-header__inner">
        <Link href="/" className="marketing-brand" aria-label="DOCK トップページ">
          <DockLogo />
          <span>Shopee販売運用</span>
        </Link>
        <nav className="marketing-nav" aria-label="メインナビゲーション">
          {publicNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="marketing-header__actions"><Link className="marketing-button marketing-button--small" href="/inquiry">導入を相談する</Link></div>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="marketing-footer">
      <div className="marketing-container marketing-footer__main">
        <div>
          <Link href="/" className="marketing-brand marketing-brand--footer"><DockLogo /></Link>
          <p>国内ECから海外Shopeeへ。出品準備と販売管理を、落ち着いて進めるための運用拠点。</p>
        </div>
        <div className="marketing-footer__links">
          <div><strong>サービス</strong><Link href="/#about">サービスについて</Link><Link href="/#screens">機能・操作画面</Link><Link href="/setup">導入準備</Link><Link href="/pricing">料金</Link><Link href="/guides">運用ガイド</Link><Link href="/faq">よくある質問</Link></div>
          <div><strong>信頼・規約</strong><Link href="/security">セキュリティ</Link><Link href="/privacy">プライバシー</Link><Link href="/terms">利用条件</Link><Link href="/legal">特商法表記</Link></div>
          <div><strong>お問い合わせ</strong><Link href="/inquiry">限定βへ相談</Link><Link href="/faq">導入前の質問</Link></div>
        </div>
      </div>
      <div className="marketing-container marketing-footer__bottom">
        <span>© {new Date().getFullYear()} DOCK</span>
        <span>DOCKはShopee Pte. Ltd.の公式サービスではありません。</span>
      </div>
    </footer>
  );
}

export default function MarketingShell({ children }: { children: ReactNode }) {
  return <div className="marketing-site"><MarketingAnalytics /><MarketingHeader />{children}<MarketingFooter /></div>;
}
