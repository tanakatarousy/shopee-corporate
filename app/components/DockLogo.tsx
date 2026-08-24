type DockLogoProps = {
  compact?: boolean;
  className?: string;
};

export default function DockLogo({ compact = false, className = "" }: DockLogoProps) {
  return (
    <span className={`dock-logo${compact ? " dock-logo--compact" : ""} ${className}`.trim()} aria-label="DOCK">
      <img className="dock-logo__mark" src="/dock-logo-c.png" alt="" aria-hidden="true" />
      {!compact && <span className="dock-logo__wordmark">DOCK</span>}
    </span>
  );
}
