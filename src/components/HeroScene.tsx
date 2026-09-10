/**
 * The hero scene.
 *
 * A drawn manifold: regulator ring with an open burner port, a riser that
 * elbows into a floor run, a tee'd pressure gauge and a flanged foot, standing
 * on a reflective floor.
 *
 * Built from inline SVG, layered gradients and CSS only — no WebGL, no video,
 * no photography, no third-party 3D library. The ring is the logo mark's
 * geometry at scene scale, so the hero and the brand mark are the same object.
 */

const FLAME =
  "M3 -20.5C2.6 -15 6.6 -12.4 7.2 -8 7.8 -3.2 4.4 0.4 0 0.4 -4.4 0.4 -7.4 -3.2 -7 -7.8 -6.6 -12.4 -2 -14.2 -0.6 -19 0 -21.2 3.2 -22.4 3 -20.5Z";
const CORE =
  "M0.6 -10.6C2.4 -7.8 3.4 -6 3.4 -4.2 3.4 -1.6 1.9 0.2 0 0.2 -1.9 0.2 -3.4 -1.6 -3.4 -4.2 -3.4 -6.4 -1.6 -8 0.6 -10.6Z";

/** Regulator ring: open-port circle, r=70 about (168,158). */
const RING = "M236.44 143.14A70 70 0 1 1 161.78 88.55";

/** Riser out of the ring, elbowing into the floor run and down to the foot. */
const RUN = "M168 245V274Q168 292 186 292H312Q330 292 330 310V320";

function Assembly({ live }: { live: boolean }) {
  return (
    <>
      {/* Floor run and riser. */}
      <path
        d={RUN}
        fill="none"
        stroke="url(#sceneSteel)"
        strokeWidth="15"
        strokeLinecap="round"
      />
      {/* Flanged foot. */}
      <path
        d="M310 322h40"
        fill="none"
        stroke="url(#sceneSteel)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Gauge tee off the floor run. */}
      <path
        d="M288 292v-34"
        fill="none"
        stroke="url(#sceneSteel)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Regulator ring. */}
      <path
        d={RING}
        fill="none"
        stroke="url(#sceneChrome)"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Gas travelling the ring — the only looping animation in the scene. */}
      {live && (
        <path
          d={RING}
          fill="none"
          stroke="#6EE7F9"
          strokeWidth="3"
          strokeLinecap="round"
          className="flow-line"
          opacity="0.6"
        />
      )}

      {/* Take-off line: the crossbar that closes the G. */}
      <path
        d="M230 158H182"
        fill="none"
        stroke="#00AEEF"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Pressure gauge, needle off zero. */}
      <circle
        cx="288"
        cy="232"
        r="26"
        fill="rgba(5,7,10,0.78)"
        stroke="url(#sceneChrome)"
        strokeWidth="7"
      />
      <path
        d="M288 214v5M306 232h-5M288 250v-5M270 232h5"
        stroke="#B8C7D9"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="m288 232 11-9"
        stroke="#FF6B35"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="288" cy="232" r="3.6" fill="#FF6B35" />

      {/* Burner flame at the open port. */}
      <g transform="translate(209 106) scale(2.7)">
        <g className={live ? "flame-live" : undefined}>
          <path d={FLAME} fill="url(#sceneFlame)" />
          <path d={CORE} fill="#6EE7F9" />
        </g>
      </g>
    </>
  );
}

export function HeroScene() {
  return (
    <div className="hero-scene">
      <div className="hero-scene-glow" aria-hidden="true" />
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label="Diagram of a gas regulator ring feeding a burner, with a riser elbowing into a floor run, a pressure gauge and a flanged foot"
      >
        <defs>
          <linearGradient
            id="sceneChrome"
            x1="100"
            y1="80"
            x2="260"
            y2="250"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.42" stopColor="#C3D1E1" />
            <stop offset="1" stopColor="#6E7F94" />
          </linearGradient>
          <linearGradient
            id="sceneSteel"
            x1="150"
            y1="240"
            x2="340"
            y2="330"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#AEBFD2" />
            <stop offset="1" stopColor="#54657A" />
          </linearGradient>
          <linearGradient
            id="sceneFlame"
            x1="0"
            y1="-21"
            x2="0"
            y2="1"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#FF6B35" />
          </linearGradient>
          {/* Reflection fade: strongest at the floor line, gone before the edge. */}
          <linearGradient
            id="sceneFade"
            x1="0"
            y1="332"
            x2="0"
            y2="410"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" stopOpacity="0.24" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0.08" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask
            id="sceneReflectionMask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="332"
            width="400"
            height="78"
          >
            <rect x="0" y="332" width="400" height="78" fill="url(#sceneFade)" />
          </mask>
        </defs>

        {/* Mirrored assembly beneath the floor line (y -> 662 - y).
            The mask sits on an outer group so its userSpaceOnUse coordinates
            are not flipped along with the content by the inner transform. */}
        <g mask="url(#sceneReflectionMask)" aria-hidden="true">
          <g transform="matrix(1 0 0 -1 0 662)">
            <Assembly live={false} />
          </g>
        </g>

        {/* Floor line. */}
        <path
          d="M24 331h352"
          stroke="#B8C7D9"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.45"
        />

        <Assembly live />
      </svg>
    </div>
  );
}
