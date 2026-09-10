import { BRAND_LOCKUP } from "@/lib/site-config";

/** Flame silhouette and its cyan combustion core. Shared with public/brand/*.svg. */
const FLAME =
  "M3 -20.5C2.6 -15 6.6 -12.4 7.2 -8 7.8 -3.2 4.4 0.4 0 0.4 -4.4 0.4 -7.4 -3.2 -7 -7.8 -6.6 -12.4 -2 -14.2 -0.6 -19 0 -21.2 3.2 -22.4 3 -20.5Z";
const CORE =
  "M0.6 -10.6C2.4 -7.8 3.4 -6 3.4 -4.2 3.4 -1.6 1.9 0.2 0 0.2 -1.9 0.2 -3.4 -1.6 -3.4 -4.2 -3.4 -6.4 -1.6 -8 0.6 -10.6Z";

/**
 * The mark on its own: a pipe ring with an open burner port, closed into a G
 * by the cyan take-off line. Gradients come from <BrandDefs />.
 */
export function LogoMark({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M49.6 32.9A18 18 0 1 1 30.4 18.86"
        fill="none"
        stroke="url(#gdChrome)"
        strokeWidth="9.5"
        strokeLinecap="round"
      />
      <path
        d="M46.2 36.72H34"
        fill="none"
        stroke="#00AEEF"
        strokeWidth="9.5"
        strokeLinecap="round"
      />
      <g transform="translate(40.5 21.5) scale(0.8)">
        <path d={FLAME} fill="url(#gdFlame)" />
        <path d={CORE} fill="#6EE7F9" />
      </g>
    </svg>
  );
}

/**
 * Full lockup. The wordmark is live text rather than an outlined path so it
 * stays selectable, scalable and readable to assistive technology. The files
 * in public/brand/ carry outlined versions for third-party use.
 */
export function Logo({
  size = 38,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
    >
      <LogoMark size={size} />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: size * 0.42,
          letterSpacing: "0.065em",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "var(--frost)" }}>{BRAND_LOCKUP.first}</span>
        <span style={{ color: "var(--chrome)" }}> {BRAND_LOCKUP.second}</span>
      </span>
    </span>
  );
}
