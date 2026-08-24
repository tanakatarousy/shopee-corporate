"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getOrCreateVisitorId } from "../../lib/visitor-id";

const SESSION_KEY = "dock_public_session";

function sessionId() {
  const current = window.sessionStorage.getItem(SESSION_KEY);
  if (current) return current;
  const created = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_KEY, created);
  return created;
}

export default function MarketingAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/manager")) return;
    let referrerHost = "";
    try {
      referrerHost = document.referrer ? new URL(document.referrer).hostname : "";
    } catch {
      referrerHost = "";
    }
    void fetch("/api/analytics/visits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: pathname, referrerHost, sessionId: sessionId(), visitorId: getOrCreateVisitorId() }),
      keepalive: true,
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
