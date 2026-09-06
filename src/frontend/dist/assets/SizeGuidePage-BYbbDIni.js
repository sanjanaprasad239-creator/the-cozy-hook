import { a as createLucideIcon, j as jsxRuntimeExports, m as motion } from "./index-6i6bSDXp.js";
import { P as Printer } from "./printer-BNS1SKoQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
];
const Ruler = createLucideIcon("ruler", __iconNode);
const SIZE_GUIDE = [
  {
    name: "hairband",
    emoji: "🎀",
    accent: "oklch(0.82 0.06 5 / 0.14)",
    rows: [
      { label: "one size fits most", detail: "head circumference 52–58 cm" },
      { label: "material", detail: "stretchy crochet — comfortable all day" },
      { label: "best for", detail: "adults & teens, all-day wear" }
    ],
    tip: "the stretchy cotton blend adjusts naturally to your head size — no pinching, no slipping."
  },
  {
    name: "bucket hat",
    emoji: "🪣",
    accent: "oklch(0.82 0.05 145 / 0.14)",
    rows: [
      { label: "S/M", detail: "head circumference 55–57 cm" },
      { label: "L/XL", detail: "head circumference 58–60 cm" },
      { label: "brim width", detail: "approx. 6 cm all around" }
    ],
    tip: "to measure: wrap a soft tape around your head 2 cm above your ears. if you're between sizes, order one size up."
  },
  {
    name: "fingerless gloves",
    emoji: "🧤",
    accent: "oklch(0.9 0.04 5 / 0.18)",
    rows: [
      { label: "S/M", detail: "hand width 7–8 cm across the palm" },
      { label: "L/XL", detail: "hand width 9–10 cm across the palm" },
      { label: "cuff", detail: "adjustable ribbed — snug but flexible" }
    ],
    tip: "measure across the widest part of your palm (exclude the thumb). crochet has natural stretch."
  },
  {
    name: "bandana",
    emoji: "🧣",
    accent: "oklch(0.82 0.05 145 / 0.14)",
    rows: [
      { label: "one size", detail: "adjustable tie at back" },
      { label: "fits neck", detail: "30–40 cm circumference" },
      { label: "wear it as", detail: "neck scarf, head wrap, or hair tie" }
    ],
    tip: "ties at the back for a custom fit — one size truly fits everyone."
  }
];
const MEASURE_STEPS = [
  {
    title: "use a soft tape",
    detail: "a flexible measuring tape gives the most accurate read — a piece of string and a ruler works too."
  },
  {
    title: "measure the right spot",
    detail: "for hats, wrap around your head 2 cm above the ears. for gloves, measure across the widest part of your palm."
  },
  {
    title: "keep it snug",
    detail: "hold the tape comfortably snug — not tight. crochet has natural stretch, so a little room is perfect."
  },
  {
    title: "compare & choose",
    detail: "match your number to the size chart below. between sizes? order one size up for a comfier fit."
  }
];
function SizeGuidePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14",
      "data-ocid": "size_guide.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-primary tracking-[0.2em] uppercase mb-3", children: "find your perfect fit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl font-semibold text-foreground", children: "size & fit guide" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 mx-auto w-14 h-0.5 rounded-full bg-primary/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed", children: "every wearable is lovingly handmade with natural stretch — here's how to find the size that feels just right." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mb-8 print:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => window.print(),
            className: "flex items-center gap-2 px-4 py-2 rounded-full border border-border font-body text-xs text-muted-foreground hover:bg-muted transition-smooth",
            "data-ocid": "size_guide.print_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 13 }),
              "print size guide"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: 0.1 },
            className: "mb-12",
            "data-ocid": "size_guide.measure_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-2xl flex items-center justify-center bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { size: 18 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: "how to measure" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: "four easy steps to your perfect fit" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: MEASURE_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.3, delay: i * 0.07 },
                  className: "rounded-3xl border border-border/40 bg-card p-5 shadow-soft",
                  "data-ocid": `size_guide.measure_step.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-display text-sm font-semibold mb-3", children: i + 1 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-1.5 capitalize", children: step.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground leading-relaxed", children: step.detail })
                  ]
                },
                step.title
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: 0.15 },
            "data-ocid": "size_guide.chart_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", "aria-hidden": "true", children: "📏" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: "wearables size chart" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: "measurements & fit notes for every wearable" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: SIZE_GUIDE.map((item, si) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.3, delay: si * 0.07 },
                  className: "rounded-3xl border border-border/40 bg-card p-6 shadow-soft",
                  "data-ocid": `size_guide.card.${si + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", "aria-hidden": "true", children: item.emoji }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground capitalize", children: item.name })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: item.rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        className: "border-b border-border/30 last:border-0",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-4 font-body text-xs font-semibold text-foreground capitalize w-1/3", children: row.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 font-body text-xs text-muted-foreground", children: row.detail })
                        ]
                      },
                      row.label
                    )) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "font-body text-xs text-muted-foreground italic leading-relaxed rounded-2xl px-3 py-2.5",
                        style: { background: item.accent },
                        children: [
                          "💡 ",
                          item.tip
                        ]
                      }
                    )
                  ]
                },
                item.name
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: 0.3 },
            className: "mt-8 rounded-3xl border border-border/40 p-6 shadow-soft",
            style: { background: "oklch(0.88 0.05 5 / 0.12)" },
            "data-ocid": "size_guide.custom_size_note",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-2", children: "need a custom size?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground leading-relaxed", children: [
                "all wearables can be made in a custom size on request — just add your measurements in the checkout form or message us on",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://wa.me/918660099085",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "underline underline-offset-2 hover:text-foreground transition-colors",
                    children: "whatsapp"
                  }
                ),
                " ",
                "before ordering."
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  SizeGuidePage
};
