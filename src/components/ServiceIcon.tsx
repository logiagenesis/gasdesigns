import type { IconKey } from "@/data/services";

/**
 * Service icon set — nine marks drawn to one shared spec:
 *   24x24 box, 1.6 stroke, round caps and joins, cyan primary (currentColor),
 *   exactly one copper accent per icon, all built from pipe / valve / vessel
 *   geometry so they sit in the same family as the logo.
 *
 * Deliberately hand-drawn rather than pulled from an icon library — a generic
 * icon set is the fastest way to make a brand look like every other dark
 * template.
 */

const COPPER = "#FF6B35";

const PATHS: Record<IconKey, React.ReactNode> = {
  /* House shell with a gas riser climbing to an appliance point. */
  residential: (
    <>
      <path d="M3.4 10.8 12 4.2l8.6 6.6" />
      <path d="M5.7 9.2V20h12.6V9.2" />
      <path d="M12 20v-5.4" stroke={COPPER} />
      <circle cx="12" cy="12.8" r="1.8" stroke={COPPER} />
    </>
  ),

  /* Hob top: four burners, one alight. */
  kitchen: (
    <>
      <rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2.2" />
      <circle cx="15.8" cy="9.4" r="2.2" />
      <circle cx="8.2" cy="15" r="2.2" />
      <circle cx="15.8" cy="15" r="2.2" />
      <circle cx="8.2" cy="9.4" r="2.2" stroke={COPPER} />
      <circle cx="8.2" cy="9.4" r="0.7" fill={COPPER} stroke={COPPER} />
    </>
  ),

  /* Distribution header with three risers on flanged feet. */
  industrial: (
    <>
      <path d="M3 7.2h18" />
      <path d="M7 7.2v10M12 7.2v10M17 7.2v10" />
      <path d="M5.2 17.2h3.6M10.2 17.2h3.6M15.2 17.2h3.6" />
      <circle cx="12" cy="11.9" r="1.9" stroke={COPPER} />
    </>
  ),

  /* Horizontal bulk vessel on saddles, with a contents gauge. */
  bulk: (
    <>
      <rect x="2.6" y="7.8" width="18.8" height="7.6" rx="3.8" />
      <path d="M7.6 15.4v3.2M16.4 15.4v3.2" />
      <path d="M4.6 18.6h14.8" />
      <path d="M6.2 13.2h11.6" stroke={COPPER} />
    </>
  ),

  /* Drawing sheet with a routed run and two set-out nodes. */
  projects: (
    <>
      <rect x="3.2" y="4.2" width="17.6" height="15.6" rx="2" />
      <path d="M6.9 16.3h4.2v-6h4.2" stroke={COPPER} />
      <circle cx="6.9" cy="16.3" r="1.4" stroke={COPPER} />
      <circle cx="17.1" cy="10.3" r="1.4" stroke={COPPER} />
    </>
  ),

  /* Certificate sheet carrying a seal. */
  compliance: (
    <>
      <rect x="4.6" y="3" width="14.8" height="18" rx="2" />
      <path d="M8 8h8M8 11.6h8M8 15.2h3.6" />
      <circle cx="15.6" cy="16.8" r="2.7" stroke={COPPER} />
      <path d="m14.4 16.8 0.9 0.9 1.9-1.9" stroke={COPPER} />
    </>
  ),

  /* Pressure gauge with the needle off zero. */
  maintenance: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 3.8v1.9M20.2 12h-1.9M12 20.2v-1.9M3.8 12h1.9" />
      <path d="m12 12 3.7-3.3" stroke={COPPER} />
      <circle cx="12" cy="12" r="1.3" fill={COPPER} stroke={COPPER} />
    </>
  ),

  /* Broken run, flanged either side, escaping gas detected. */
  leak: (
    <>
      <path d="M2.8 15.4h5.8M15.4 15.4h5.8" />
      <path d="M8.6 13.2v4.4M15.4 13.2v4.4" />
      <path d="m10.5 12.3-1.3-2.7M12 11.5V8.4m1.5 3.9 1.3-2.7" stroke={COPPER} />
    </>
  ),

  /* Local isolator fed off a gas line. */
  electrical: (
    <>
      <path d="M4.2 20v-9.6a2 2 0 0 1 2-2h3.4" />
      <rect x="9.6" y="4.2" width="10.2" height="9.2" rx="1.8" />
      <path d="m15.6 6-2.6 3.4h2.3l-1.9 3.2" stroke={COPPER} />
    </>
  ),
};

export function ServiceIcon({
  name,
  size = 26,
  className,
}: {
  name: IconKey;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
