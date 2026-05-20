type Variant = "leaf" | "diamond" | "ampersand";

const ICONS: Record<Variant, React.ReactNode> = {
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C8 6 6 11 6 15a6 6 0 0 0 12 0c0-4-2-9-6-13Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M12 7v15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  diamond: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l4 9-4 9-4-9 4-9Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ampersand: (
    <span className="font-script text-2xl leading-none text-gold" aria-hidden="true">
      &amp;
    </span>
  ),
};

export function SectionDivider({
  variant = "leaf",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <div className={`section-divider ${className}`} aria-hidden="true">
      {ICONS[variant]}
    </div>
  );
}
