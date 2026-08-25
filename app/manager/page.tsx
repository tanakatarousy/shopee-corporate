import type { Metadata } from "next";
import { cookies } from "next/headers";
import { MANAGER_SESSION_COOKIE, managerIdentityFromToken } from "../../lib/admin-auth";
import { ManagerDashboard } from "./manager-dashboard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "管理画面 | DOCK", robots: { index: false, follow: false } };

type Props = { searchParams: Promise<{ error?: string }> };

export default async function ManagerPage({ searchParams }: Props) {
  const cookieStore = await cookies();
  const identity = await managerIdentityFromToken(cookieStore.get(MANAGER_SESSION_COOKIE)?.value);
  if (!identity) {
    const { error } = await searchParams;
    return (
      <main className="manager-login-shell">
        <section className="manager-login-card">
          <small>DOCK ADMIN</small>
          <h1>管理者ログイン</h1>
          <p>問い合わせとコーポレートサイトのアクセス状況を確認します。ログインは8時間有効です。</p>
          <form action="/api/manager/session" method="post">
            <label htmlFor="manager-password">管理用パスワード</label>
            <input id="manager-password" name="password" type="password" minLength={16} maxLength={256} autoComplete="current-password" required autoFocus />
            <button type="submit">ログイン</button>
          </form>
          {error === "invalid" && <p className="manager-login-error">パスワードが正しくありません。</p>}
          {error === "setup" && <p className="manager-login-error">管理者認証のSecret設定を確認してください。</p>}
          <a href="/">公開サイトへ戻る</a>
        </section>
      </main>
    );
  }
  return <ManagerDashboard displayName={identity} />;
}
