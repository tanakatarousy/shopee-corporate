export const DOCK_VISITOR_ID_KEY = "dock_public_visitor";

export function getOrCreateVisitorId() {
  if (typeof window === "undefined") return "";
  try {
    const current = window.localStorage.getItem(DOCK_VISITOR_ID_KEY);
    if (current) return current;
    const created = crypto.randomUUID();
    window.localStorage.setItem(DOCK_VISITOR_ID_KEY, created);
    return created;
  } catch {
    return crypto.randomUUID();
  }
}
