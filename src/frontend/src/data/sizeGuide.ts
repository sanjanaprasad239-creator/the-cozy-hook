export interface SizeRow {
  label: string;
  detail: string;
}

export interface SizeGuideItem {
  name: string;
  emoji: string;
  rows: SizeRow[];
  tip: string;
  accent: string;
}

export interface SizeGuideStep {
  title: string;
  detail: string;
}

export const SIZE_GUIDE: SizeGuideItem[] = [
  {
    name: "hairband",
    emoji: "🎀",
    accent: "oklch(0.82 0.06 5 / 0.14)",
    rows: [
      { label: "one size fits most", detail: "head circumference 52–58 cm" },
      { label: "material", detail: "stretchy crochet — comfortable all day" },
      { label: "best for", detail: "adults & teens, all-day wear" },
    ],
    tip: "the stretchy cotton blend adjusts naturally to your head size — no pinching, no slipping.",
  },
  {
    name: "bucket hat",
    emoji: "🪣",
    accent: "oklch(0.82 0.05 145 / 0.14)",
    rows: [
      { label: "S/M", detail: "head circumference 55–57 cm" },
      { label: "L/XL", detail: "head circumference 58–60 cm" },
      { label: "brim width", detail: "approx. 6 cm all around" },
    ],
    tip: "to measure: wrap a soft tape around your head 2 cm above your ears. if you're between sizes, order one size up.",
  },
  {
    name: "fingerless gloves",
    emoji: "🧤",
    accent: "oklch(0.9 0.04 5 / 0.18)",
    rows: [
      { label: "S/M", detail: "hand width 7–8 cm across the palm" },
      { label: "L/XL", detail: "hand width 9–10 cm across the palm" },
      { label: "cuff", detail: "adjustable ribbed — snug but flexible" },
    ],
    tip: "measure across the widest part of your palm (exclude the thumb). crochet has natural stretch.",
  },
  {
    name: "bandana",
    emoji: "🧣",
    accent: "oklch(0.82 0.05 145 / 0.14)",
    rows: [
      { label: "one size", detail: "adjustable tie at back" },
      { label: "fits neck", detail: "30–40 cm circumference" },
      { label: "wear it as", detail: "neck scarf, head wrap, or hair tie" },
    ],
    tip: "ties at the back for a custom fit — one size truly fits everyone.",
  },
];

export const MEASURE_STEPS: SizeGuideStep[] = [
  {
    title: "use a soft tape",
    detail:
      "a flexible measuring tape gives the most accurate read — a piece of string and a ruler works too.",
  },
  {
    title: "measure the right spot",
    detail:
      "for hats, wrap around your head 2 cm above the ears. for gloves, measure across the widest part of your palm.",
  },
  {
    title: "keep it snug",
    detail:
      "hold the tape comfortably snug — not tight. crochet has natural stretch, so a little room is perfect.",
  },
  {
    title: "compare & choose",
    detail:
      "match your number to the size chart below. between sizes? order one size up for a comfier fit.",
  },
];
