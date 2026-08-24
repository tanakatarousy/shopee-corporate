import type { ReactNode } from "react";

type NavIconProps = { name: string };

export default function NavIcon({ name }: NavIconProps) {
  const paths: Record<string, ReactNode> = {
    overview: <><path d="M4 10.5 12 4l8 6.5" /><path d="M6.5 9.5V20h11V9.5M10 20v-6h4v6" /></>,
    import: <><path d="M5 5h8v8H5z" /><path d="M11 13h8v6h-8zM13 11l6-6M15 5h4v4" /></>,
    "auto-listing": <><path d="m13 2-7 11h6l-1 9 7-12h-6z" /></>,
    products: <><path d="M4 6.5 12 3l8 3.5-8 3.5z" /><path d="M4 6.5V17l8 4 8-4V6.5M12 10v11" /></>,
    orders: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></>,
    analytics: <><path d="M4 20V10M10 20V4M16 20v-7M3 20h18" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
    live: <><path d="m4 12 5 5L20 6" /></>,
    sync: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M18.2 9A7 7 0 0 0 6 6.5L4 9M5.8 15A7 7 0 0 0 18 17.5l2-2.5" /></>,
    usage: <><path d="M4 19V5h16v14z" /><path d="M8 15V9M12 15V6M16 15v-3" /></>,
  };

  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" aria-hidden="true">
      {paths[name] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
