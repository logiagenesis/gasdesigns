/**
 * Brand gradient definitions, rendered once per document.
 *
 * Every inline logo instance references these by id, so the gradient stops
 * are defined a single time no matter how many marks are on the page.
 */
export function BrandDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute" }}
    >
      <defs>
        <linearGradient
          id="gdChrome"
          x1="12"
          y1="14"
          x2="52"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.45" stopColor="#C3D1E1" />
          <stop offset="1" stopColor="#7C8DA1" />
        </linearGradient>
        <linearGradient
          id="gdFlame"
          x1="0"
          y1="-21"
          x2="0"
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#FF6B35" />
        </linearGradient>
      </defs>
    </svg>
  );
}
