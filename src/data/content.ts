/**
 * Supporting page content. All original copy.
 * Nothing here asserts a fact that is not confirmed in src/lib/site-config.ts.
 */

export type Sector = { name: string; note: string };

export const SECTORS: Sector[] = [
  { name: "Homes & Estates", note: "Single dwellings, retrofits, estate units" },
  { name: "Restaurants & Hotels", note: "Front and back of house cooking lines" },
  { name: "Factories & Plants", note: "Process heat and production equipment" },
  { name: "Warehousing", note: "Forklift refuelling and space heating" },
  { name: "Bakeries", note: "Deck, rack and tunnel oven supply" },
  { name: "Developers", note: "Multi-unit and phased residential builds" },
  { name: "Retail & Franchise", note: "Repeatable roll-out specifications" },
  { name: "Body Corporates", note: "Shared reticulation and common plant" },
];

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

export const PROCESS: ProcessStep[] = [
  {
    index: "01",
    title: "Site assessment",
    body: "We look at the actual site before quoting anything — appliance schedule, available routes, ventilation, access and where the supply can safely sit.",
  },
  {
    index: "02",
    title: "Design & sizing",
    body: "Line sizing, pressure staging and isolation points are settled on paper first. Getting this wrong is expensive to fix once pipe is in the wall.",
  },
  {
    index: "03",
    title: "Written quotation",
    body: "One scope, one price, and a plain statement of what is excluded. If something is likely to change on site, it is flagged before you sign.",
  },
  {
    index: "04",
    title: "Installation",
    body: "Work is sequenced against your programme — trading hours for kitchens, build phases for developments, production windows for industrial sites.",
  },
  {
    index: "05",
    title: "Test & commission",
    body: "Every installation is pressure tested and commissioned before handover. Readings are recorded, not just observed.",
  },
  {
    index: "06",
    title: "Handover & upkeep",
    body: "You get the documentation for the installed system and a maintenance interval based on how hard it is actually going to be used.",
  },
];

export type SafetyPoint = { title: string; body: string };

export const SAFETY_POINTS: SafetyPoint[] = [
  {
    title: "Sized for peak, not average",
    body: "Systems are sized against simultaneous demand. Undersized lines show up as pressure drop at the worst possible moment.",
  },
  {
    title: "Isolation where it is reachable",
    body: "Shut-off points are placed where a person can actually get to them under pressure, not where the pipework happened to end.",
  },
  {
    title: "Tested and recorded",
    body: "Soundness and pressure test results are written down. A number on a record is evidence; a memory is not.",
  },
  {
    title: "Scope stated honestly",
    body: "Where work falls outside our discipline — regulated electrical work in particular — we say so and bring in the right person.",
  },
];

/** Materials and build standards. Non-photographic; used for the visual section. */
export const BUILD_STANDARDS: { label: string; value: string }[] = [
  { label: "Distribution", value: "Copper & steel" },
  { label: "Staging", value: "Two-stage reduction" },
  { label: "Isolation", value: "Sectional" },
  { label: "Testing", value: "Soundness + pressure" },
  { label: "Marking", value: "Identified & labelled" },
  { label: "Handover", value: "Recorded readings" },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What does a gas installation actually cost?",
    a: "It is driven by the route and the load, not by the appliance count. A single hob on an external wall is a short job; the same hob on the far side of a finished house means chasing, making good and a longer run. We quote after seeing the site, and the quotation states what is excluded.",
  },
  {
    q: "Can you work on an installation someone else put in?",
    a: "Yes. We inspect and pressure test what is there first, then tell you what needs correcting and what is fine. We will not extend or sign off on a system we have not verified.",
  },
  {
    q: "How long does an installation take?",
    a: "A straightforward domestic installation is usually a day on site. Commercial kitchens and industrial distribution depend on access, isolation windows and how much of the work has to happen outside trading or production hours.",
  },
  {
    q: "Do you work around a trading kitchen or a live production floor?",
    a: "Yes, and it should be agreed at quoting stage rather than discovered on site. Out-of-hours and phased work changes both the programme and the price, so we would rather price it correctly than surprise you.",
  },
  {
    q: "What do I do if I smell gas?",
    a: "Close the supply at the cylinder or main valve, open windows and doors, do not operate light switches or anything that can spark, put out naked flames, and leave the area. Phone once you are outside and clear.",
  },
  {
    q: "Do I need a certificate of compliance?",
    a: "A gas certificate is commonly required for property transfer, for insurance, and by landlords and local authorities. What matters in practice is that the installation is in a condition to pass inspection, which is what we prepare it for.",
  },
  {
    q: "Do you supply appliances as well as install them?",
    a: "Confirm this with us directly when you enquire. Our published scope covers the gas installation and the connection to the appliance; appliance supply is arranged separately where agreed.",
  },
  {
    q: "Which areas do you cover?",
    a: "Ask us when you enquire — coverage depends on the size and type of the job. We would rather tell you plainly whether we can service your site than list an area we cannot honour.",
  },
];

export const SITE_TYPES = [
  "Residential",
  "Commercial",
  "Industrial",
  "Development",
  "Other",
] as const;

export const URGENCY_TYPES = [
  "Quote",
  "Inspection",
  "Maintenance",
  "Emergency",
] as const;

export type SiteType = (typeof SITE_TYPES)[number];
export type UrgencyType = (typeof URGENCY_TYPES)[number];
