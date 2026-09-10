/**
 * The nine homepage service buckets.
 *
 * All copy here is original to Gas Designs. Nothing is reworded from
 * dp-energies.co.za — sentence shapes, headings and card structure are
 * deliberately different.
 *
 * `offered` gates what may appear on the site:
 *   "confirmed" — named by the client in their own brief. Safe to publish.
 *   "pending"   — inferred, not yet confirmed. Never rendered; tracked in
 *                 docs/missing-client-info.md instead.
 */

export type IconKey =
  | "residential"
  | "kitchen"
  | "industrial"
  | "bulk"
  | "projects"
  | "compliance"
  | "maintenance"
  | "leak"
  | "electrical";

export type Service = {
  slug: string;
  /** Card title. Kept to three words where the language allows. */
  title: string;
  /** Longer form used as the <h1> on the detail page. */
  longTitle: string;
  icon: IconKey;
  offered: "confirmed" | "pending";
  /** Exactly two lines on a card. Clamped in CSS as a backstop. */
  summary: string;
  /** Exactly three, six words maximum each. */
  bullets: [string, string, string];
  /** Detail page opener. Two short paragraphs. */
  intro: string[];
  /** Detail page scope list. */
  includes: string[];
  /** What the client needs to know or decide. Honest, non-salesy. */
  considerations: string[];
  /** Rendered as a caveat box where a claim needs bounding. */
  disclaimer?: string;
  metaTitle: string;
  metaDescription: string;
};

export const SERVICES: Service[] = [
  {
    slug: "residential-gas-installations",
    title: "Residential Gas Systems",
    longTitle: "Residential Gas Installations",
    icon: "residential",
    offered: "confirmed",
    summary:
      "Complete LPG and natural gas systems for houses, estates and developments.",
    bullets: [
      "Hob, geyser and fireplace lines",
      "Concealed and surface pipework",
      "Pressure tested before handover",
    ],
    intro: [
      "A domestic gas system is small enough to look simple and unforgiving enough to punish a shortcut. Line sizing, regulator selection, ventilation and joint access all have to be settled before the first length of pipe goes in — not corrected afterwards.",
      "We plan the route against the appliance schedule, install to that plan, and prove the system with a pressure test before anything is signed over to the homeowner.",
    ],
    includes: [
      "Appliance load assessment and line sizing",
      "Cylinder or vessel siting, restraint and ventilation",
      "Regulators, isolation valves and pressure reduction",
      "Concealed, chased or surface-run distribution pipework",
      "Connection points for hobs, ovens, geysers, fireplaces and braais",
      "Soundness and pressure testing, then commissioning",
    ],
    considerations: [
      "Retrofits into finished homes need a route decision early — concealed pipework means chasing and making good.",
      "Estate and body-corporate rules often govern cylinder placement and screening. Bring us in before the layout is fixed.",
      "Appliance supply is arranged separately unless agreed in writing up front.",
    ],
    metaTitle: "Residential Gas Installations",
    metaDescription:
      "LPG and natural gas installations for homes, estates and residential developments — line sizing, pipework, regulators, appliance connections and pressure testing.",
  },
  {
    slug: "commercial-kitchen-gas-systems",
    title: "Commercial Kitchen Systems",
    longTitle: "Commercial Kitchen Gas Systems",
    icon: "kitchen",
    offered: "confirmed",
    summary:
      "Gas supply and equipment connections for restaurants, hotels and bakeries.",
    bullets: [
      "Ranges, fryers and combi ovens",
      "Isolation points at every station",
      "Layouts built for service access",
    ],
    intro: [
      "A commercial kitchen draws hard and draws all at once. Sizing for the sum of the nameplate ratings — not the average — is what keeps burner pressure stable when every station fires at the same time.",
      "We design the supply around how the kitchen actually runs, put isolation where staff can reach it, and leave the pipework clear enough to clean around and service without dismantling a line.",
    ],
    includes: [
      "Diversified load calculation across the full equipment schedule",
      "Bulk or cylinder-bank supply into the building",
      "Distribution headers and drops to each cooking station",
      "Local isolation valves and emergency shut-off provision",
      "Flexible connections to movable equipment",
      "Soundness testing and commissioning of the installed system",
    ],
    considerations: [
      "Ventilation, extraction and interlock requirements sit with the kitchen designer and the fire consultant — we install to that spec, we do not set it.",
      "Trading kitchens usually need phased or out-of-hours work. Say so at quoting stage, not on site.",
      "Equipment schedules change late. Late changes to load mean the supply sizing is revisited.",
    ],
    metaTitle: "Commercial Kitchen Gas Installations",
    metaDescription:
      "Gas installations for restaurants, hotels, bakeries and catering kitchens — load sizing, distribution headers, station isolation, equipment connections and commissioning.",
  },
  {
    slug: "industrial-gas-installations",
    title: "Industrial Gas Installations",
    longTitle: "Industrial Gas Installations & Maintenance",
    icon: "industrial",
    offered: "confirmed",
    summary:
      "Distribution pipework and planned maintenance for factories and plants.",
    bullets: [
      "Headers, risers and takeoffs",
      "Planned inspection programmes",
      "Staged to protect production",
    ],
    intro: [
      "On an industrial site the gas system is production infrastructure. An unplanned isolation costs more than the repair, so the design has to allow sections to be dropped without stopping the whole floor.",
      "We build distribution that can be isolated in parts, labelled so the next person understands it, and maintained on a schedule instead of after a failure.",
    ],
    includes: [
      "Site survey and demand assessment across process equipment",
      "Main headers, risers and branch takeoffs",
      "Sectional isolation so areas can be worked on independently",
      "Pipe support, bracketing and identification marking",
      "Planned maintenance schedules with recorded results",
      "Fault investigation and remedial work on existing systems",
    ],
    considerations: [
      "Existing installations are often undocumented. Expect a survey pass before any quotable scope.",
      "Permit-to-work, hot-work and site induction requirements are set by the site, and they affect programme.",
      "Process gases other than LPG and natural gas are not in confirmed scope — ask us before assuming.",
    ],
    metaTitle: "Industrial Gas Installations & Maintenance",
    metaDescription:
      "Industrial gas distribution and maintenance for factories, workshops and production plants — headers, risers, sectional isolation and planned inspection programmes.",
  },
  {
    slug: "bulk-lpg-installations",
    title: "Bulk LPG Installations",
    longTitle: "Bulk LPG Installations",
    icon: "bulk",
    offered: "confirmed",
    summary:
      "Storage vessels, manifold banks and distribution sized to real draw-off.",
    bullets: [
      "Vessel siting and separation",
      "Manifold banks and changeover",
      "Distribution to point of use",
    ],
    intro: [
      "Bulk storage is decided by two numbers that people often confuse: how much gas the site holds, and how fast it can take it off. Vapour offtake is limited by vessel surface area, so a tank that holds enough can still starve a peak load.",
      "We size for peak draw-off, place the vessel against separation and access requirements, and run the distribution so that refilling and servicing never mean shutting the site down.",
    ],
    includes: [
      "Peak and average draw-off calculation",
      "Above-ground vessel siting, base and separation planning",
      "Cylinder manifold banks with automatic changeover",
      "First and second stage pressure reduction",
      "Buried or above-ground distribution to point of use",
      "Cages, bollards, screening and access provision",
    ],
    considerations: [
      "Vessel supply and ownership is usually a separate arrangement with the gas supplier — confirm who owns the tank before design.",
      "Separation distances constrain where a vessel can go. That decision is made on site, not from a drawing.",
      "Underground vessels carry different excavation, coating and inspection requirements — treat them as a distinct scope.",
    ],
    metaTitle: "Bulk LPG Installations",
    metaDescription:
      "Bulk LPG installations — storage vessel siting, manifold banks with automatic changeover, two-stage pressure reduction and distribution to point of use.",
  },
  {
    slug: "custom-projects-and-developments",
    title: "Custom Projects",
    longTitle: "Custom Projects & Developments",
    icon: "projects",
    offered: "confirmed",
    summary:
      "Gas infrastructure planned with architects, developers and contractors.",
    bullets: [
      "Coordination from drawing stage",
      "Phased rollout across units",
      "One accountable point of contact",
    ],
    intro: [
      "On a development the gas scope is only partly a gas problem. It is a sequencing problem: first fix has to land between the brickwork and the screed, and a missed window turns a cheap run into an expensive one.",
      "We work from the drawings, agree the sequence with the main contractor, and roll out unit by unit so that each phase is closed out and tested rather than left open until the end.",
    ],
    includes: [
      "Review of architectural and services drawings",
      "Reticulation strategy for multi-unit and estate developments",
      "Centralised bulk supply versus per-unit cylinder assessment",
      "First fix coordinated against the construction programme",
      "Second fix, appliance connection and unit-by-unit testing",
      "As-built marking and handover documentation per phase",
    ],
    considerations: [
      "The earlier we see drawings, the cheaper the installation is. Late involvement is the single biggest cost driver on a development.",
      "Phase boundaries need to be agreed in writing — partial handovers create partial responsibility.",
      "Programme slippage on preceding trades moves our windows. Build float into the sequence.",
    ],
    metaTitle: "Custom Gas Projects & Developments",
    metaDescription:
      "Gas infrastructure for developers, architects and main contractors — reticulation strategy, drawing-stage coordination, phased first and second fix, and per-phase handover.",
  },
  {
    slug: "certificates-of-compliance",
    title: "Certificates of Compliance",
    longTitle: "Certificate of Compliance Support",
    icon: "compliance",
    offered: "confirmed",
    summary:
      "Inspection, pressure testing and remedial work, ready for sign-off.",
    bullets: [
      "Pre-inspection fault finding",
      "Soundness and pressure testing",
      "Remedial work, then re-check",
    ],
    intro: [
      "A certificate is the end of a process, not a service on its own. What actually decides the outcome is the condition of the installation when it is inspected — the joints, the ventilation, the appliance clearances and whether the system holds pressure.",
      "We inspect against that, tell you plainly what will fail and why, carry out the remedial work, and re-test so the installation is in a defensible, documented state.",
    ],
    includes: [
      "Full visual inspection of the existing installation",
      "Soundness and pressure testing with recorded results",
      "Identification of non-conforming joints, routes and clearances",
      "Ventilation and appliance clearance assessment",
      "Remedial work on identified defects",
      "Re-test and documentation of the corrected installation",
    ],
    considerations: [
      "Property transfers run to a deadline. Book the inspection before the remedial window closes, not after.",
      "An inspection can find more than expected on an older installation. We quote remedial work separately once the scope is known.",
      "Electrical certification is a separate discipline with separate authorisation — see Electrical & Controls Support.",
    ],
    disclaimer:
      "Gas Designs' certification authority, registration numbers and the specific certificate types issued are still to be confirmed by the client and are therefore not published here. Ask us directly and we will confirm in writing before you commit.",
    metaTitle: "Gas Certificate of Compliance Support",
    metaDescription:
      "Gas COC support — inspection, soundness and pressure testing, identification of non-conforming work, remedial repairs and re-testing of the corrected installation.",
  },
  {
    slug: "gas-system-maintenance",
    title: "Gas System Maintenance",
    longTitle: "Gas System Maintenance",
    icon: "maintenance",
    offered: "confirmed",
    summary:
      "Planned upkeep that keeps regulators, valves and joints inside tolerance.",
    bullets: [
      "Regulator and valve checks",
      "Hose and seal replacement",
      "Recorded pressure logging",
    ],
    intro: [
      "Gas components fail predictably. Hoses perish, seals harden, regulators drift and joints work loose under vibration — all of it on a timescale you can plan for rather than react to.",
      "A maintenance visit replaces what is near end of life, records what is still in tolerance, and gives you a written baseline to compare against next time.",
    ],
    includes: [
      "Regulator performance and lock-up pressure checks",
      "Isolation and safety valve operation testing",
      "Flexible hose inspection and scheduled replacement",
      "Joint and connection leak testing",
      "Appliance connection and clearance checks",
      "Written record of readings and replaced components",
    ],
    considerations: [
      "Maintenance intervals depend on duty. A hard-run commercial kitchen is not on the same schedule as a domestic hob.",
      "Findings occasionally require immediate isolation. We will make the system safe first and discuss cost second.",
      "Keeping the written record matters — it is the evidence that the system has been looked after.",
    ],
    metaTitle: "Gas System Maintenance",
    metaDescription:
      "Planned gas maintenance — regulator and valve testing, hose and seal replacement, joint leak checks, appliance clearance inspection and a written record of every reading.",
  },
  {
    slug: "leak-detection-and-repairs",
    title: "Leak Detection & Repairs",
    longTitle: "Gas Leak Detection & Repairs",
    icon: "leak",
    offered: "confirmed",
    summary:
      "Fault tracing, isolation and repair when a system fails a pressure test.",
    bullets: [
      "Trace, isolate and make safe",
      "Joint and section repairs",
      "Recommissioned after every repair",
    ],
    intro: [
      "A suspected leak is a safety call before it is a repair job. The first action is always to isolate and make the area safe; diagnosis follows once nothing is at risk.",
      "We trace the fault by section rather than guesswork, repair or replace the failed run, and prove the whole system again before it is put back into service.",
    ],
    includes: [
      "Isolation of the affected section and making the area safe",
      "Sectional pressure testing to narrow the fault",
      "Leak tracing on joints, runs, regulators and appliance connections",
      "Repair or replacement of the failed section",
      "Full system re-test after the repair",
      "Recommissioning and handover of the working system",
    ],
    considerations: [
      "If you can smell gas, shut the supply off, ventilate, avoid switches and flames, and leave the area before phoning anyone.",
      "Buried and concealed runs take longer to trace and may require access work — that is quoted once located.",
      "Response availability is confirmed at booking, per job.",
    ],
    disclaimer:
      "Response times and after-hours availability are agreed per job and are not published as a blanket commitment. If you need a guaranteed response window, ask for it in writing when you book.",
    metaTitle: "Gas Leak Detection & Emergency Repairs",
    metaDescription:
      "Gas leak detection and repair — safe isolation, sectional pressure testing to locate the fault, repair or replacement of the failed run, and full system re-test.",
  },
  {
    slug: "electrical-and-controls-support",
    title: "Electrical & Controls",
    longTitle: "Basic Electrical & Gas System Support",
    icon: "electrical",
    offered: "confirmed",
    summary:
      "Ignition, isolator and control work that keeps a gas installation running.",
    bullets: [
      "Isolators and ignition circuits",
      "Control and interlock wiring",
      "Handed to qualified electricians",
    ],
    intro: [
      "Most gas installations have an electrical half — ignition, flame supervision, fans, interlocks and a local isolator. When the two trades are booked separately, that half is where jobs stall.",
      "We handle the basic electrical support attached to the gas installation, and we hand over anything that requires a qualified electrician rather than working outside our scope.",
    ],
    includes: [
      "Local isolators for gas appliances and plant",
      "Ignition and flame supervision circuit connection",
      "Control, sensor and interlock wiring to gas equipment",
      "Extraction and ventilation interlock connection",
      "Fault finding on controls attached to a gas system",
      "Coordination with the site's electrical contractor",
    ],
    considerations: [
      "Regulated electrical work — distribution boards, fixed wiring alterations and electrical certification — must be carried out and certified by suitably qualified electrical personnel.",
      "Where that applies we will say so up front and work alongside your electrician rather than around them.",
      "Interlock logic is set by the equipment manufacturer and the fire consultant. We wire to that specification.",
    ],
    disclaimer:
      "This service covers basic electrical support directly connected to a gas installation. Regulated electrical work and electrical certificates of compliance fall to suitably qualified and authorised electrical personnel.",
    metaTitle: "Electrical & Controls Support for Gas Systems",
    metaDescription:
      "Basic electrical support for gas installations — isolators, ignition and flame supervision circuits, interlock wiring and controls fault finding, alongside qualified electricians.",
  },
];

/** Build-time guard. The 3x3 grid contract depends on this being exactly 9. */
if (SERVICES.length !== 9) {
  throw new Error(
    `Service grid contract violated: expected exactly 9 services, found ${SERVICES.length}.`,
  );
}

/** Only confirmed services are ever rendered. */
export const PUBLISHED_SERVICES = SERVICES.filter(
  (s) => s.offered === "confirmed",
);

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);

/**
 * Capabilities visible on dp-energies.co.za that are NOT in the confirmed
 * Gas Designs scope. These must not appear anywhere on the site. They exist
 * here so the gap is tracked in code as well as in
 * docs/missing-client-info.md.
 */
export const PENDING_SCOPE: string[] = [
  "Industrial specialty gases (nitrogen, CO2, argon)",
  "Bulk tank revalidation",
  "Gas supply / reselling",
  "Bulk diesel supply",
  "Electrical certificates of compliance as a standalone product",
  "Appliance supply as distinct from appliance installation",
];
