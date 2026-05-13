import { r as reactExports, j as jsxRuntimeExports, m as motion, A as AnimatePresence } from "./index-B6J4yjYJ.js";
const CARE_GUIDE = [
  {
    key: "plushies",
    label: "plushies",
    emoji: "🧸",
    care: [
      {
        title: "washing tips",
        items: [
          "hand wash in cold water with mild detergent only",
          "do not machine wash — it can distort the shape",
          "gently squeeze out excess water, never wring or twist",
          "keep away from bleach or harsh chemicals"
        ]
      },
      {
        title: "drying & care",
        items: [
          "air dry flat on a clean towel away from direct sunlight",
          "do not tumble dry — heat can damage cotton yarn",
          "reshape gently while damp if needed",
          "once dry, fluff gently to restore the original shape"
        ]
      },
      {
        title: "storage tips",
        items: [
          "store in a cool, dry place away from moisture",
          "keep in a breathable cotton bag if storing long-term",
          "avoid plastic bags which can trap moisture",
          "keep away from direct sunlight to prevent fading"
        ]
      },
      {
        title: "lifespan & handling",
        items: [
          "with proper care, plushies can last several years",
          "not suitable for children under 3 (small parts)",
          "check and re-tighten safety eyes periodically",
          "spot clean minor stains with a damp cloth promptly"
        ]
      }
    ]
  },
  {
    key: "keychains",
    label: "keychains",
    emoji: "🔑",
    care: [
      {
        title: "cleaning tips",
        items: [
          "wipe with a slightly damp cloth to remove surface dirt",
          "avoid soaking in water — the metal ring can rust",
          "use a soft toothbrush for textured areas",
          "allow to air dry completely before attaching to keys"
        ]
      },
      {
        title: "daily use",
        items: [
          "keep away from sharp objects that can snag the yarn",
          "avoid exposure to excessive moisture or rain",
          "do not machine wash — always hand clean gently",
          "the charm is decorative; avoid heavy friction"
        ]
      },
      {
        title: "storage tips",
        items: [
          "store separately to prevent tangling with other items",
          "hang or lay flat — do not compress under heavy objects",
          "keep in a pouch when not in use for extra protection"
        ]
      },
      {
        title: "lifespan",
        items: [
          "with gentle use, keychains last 1–2 years+",
          "re-secure any loose yarn ends with a drop of fabric glue",
          "the metal ring can be replaced if it wears out"
        ]
      }
    ]
  },
  {
    key: "wearables",
    label: "wearables",
    emoji: "👗",
    care: [
      {
        title: "washing tips",
        items: [
          "hand wash in cool water with a gentle wool wash",
          "machine wash only on a delicate/wool cycle in a laundry bag",
          "use pH-neutral detergent — avoid fabric softener on wool blends",
          "wash dark and light colours separately"
        ]
      },
      {
        title: "drying & ironing",
        items: [
          "always air dry flat to maintain shape",
          "do not hang wearables — they can stretch under their own weight",
          "never tumble dry hats, gloves, or headbands",
          "if ironing is needed, use a pressing cloth on low steam"
        ]
      },
      {
        title: "sizing guide",
        items: [
          "hairband: one size — stretches to fit most head sizes (52–58 cm)",
          "bucket hat: one size — inner tie adjusts fit from 54–60 cm circumference",
          "fingerless gloves: one size fits most — adjustable ribbed cuffs accommodate most hand sizes",
          "bandana / daisy headband: one size fits all — flexible cotton blend",
          "all items can be made to a custom size on request — contact us via whatsapp"
        ]
      },
      {
        title: "lifespan & storage",
        items: [
          "store folded flat in a drawer or on a shelf",
          "cedar balls deter moths if storing wool-blend items long-term",
          "avoid hanging for long periods — can stretch the stitch",
          "with proper care, wearables remain in excellent condition for 2+ years"
        ]
      }
    ]
  },
  {
    key: "home-decor",
    label: "home decor",
    emoji: "🏡",
    care: [
      {
        title: "cleaning tips",
        items: [
          "dust lightly with a soft dry brush or lint roller",
          "spot clean with a barely damp cloth for marks",
          "coaster sets can be hand washed in cold water",
          "wall hangings should only be spot cleaned — do not submerge"
        ]
      },
      {
        title: "display & placement",
        items: [
          "keep away from direct sunlight to prevent colour fading",
          "wall hangings look best in low-humidity rooms",
          "the hanging plant holder should be checked monthly for wear",
          "heart pillow covers can be spot cleaned or hand washed gently"
        ]
      },
      {
        title: "storage tips",
        items: [
          "roll wall hangings gently for storage — never fold sharply",
          "store coaster sets stacked flat in a dry place",
          "wrap in tissue paper if storing items long-term"
        ]
      },
      {
        title: "lifespan",
        items: [
          "home decor items with gentle care last many years",
          "re-secure fringe or loose threads with a dab of fabric glue",
          "the driftwood dowel on the wall hanging can be wiped with a dry cloth"
        ]
      }
    ]
  },
  {
    key: "accessories",
    label: "accessories",
    emoji: "🎀",
    care: [
      {
        title: "cleaning tips",
        items: [
          "hand wash scrunchies in cool water with mild shampoo",
          "wipe phone charms and bag charms gently with a damp cloth",
          "bookmarks can be spot cleaned with a barely damp cloth",
          "allow all items to air dry fully before use"
        ]
      },
      {
        title: "daily use",
        items: [
          "scrunchies are gentle on hair — avoid excessive stretching",
          "keep phone charms away from water and heavy friction",
          "bookmarks are best kept inside books — not folded or bent",
          "pouches can be wiped inside and out with a dry cloth"
        ]
      },
      {
        title: "storage tips",
        items: [
          "store scrunchies on a scrunchie holder or in a pouch",
          "keep bag charms unclipped and hung when not in use",
          "store bookmarks flat between book pages or in a flat envelope",
          "keep mini pouches in a cool, dry place"
        ]
      },
      {
        title: "lifespan",
        items: [
          "most accessories last 1–3 years with everyday use",
          "the elastic in scrunchies can be replaced if it loses stretch",
          "lobster clasps on bag charms can be replaced by a jeweller",
          "cotton thread bookmarks are quite durable with gentle handling"
        ]
      }
    ]
  }
];
function CareGuidePage() {
  const [activeTab, setActiveTab] = reactExports.useState(CARE_GUIDE[0].key);
  const active = CARE_GUIDE.find((c) => c.key === activeTab) ?? CARE_GUIDE[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14",
      "data-ocid": "care_guide.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-primary tracking-[0.2em] uppercase mb-3", children: "keep your handmade pieces beautiful" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl font-semibold text-foreground", children: "care guide" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 mx-auto w-14 h-0.5 rounded-full bg-primary/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed", children: "each item is lovingly handmade — a little care goes a long way in keeping it beautiful for years." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-2 flex-wrap justify-center mb-10",
            role: "tablist",
            "aria-label": "Category care guides",
            "data-ocid": "care_guide.tabs",
            children: CARE_GUIDE.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": activeTab === cat.key,
                onClick: () => setActiveTab(cat.key),
                className: `flex items-center gap-1.5 px-4 py-2 rounded-2xl font-body text-sm font-medium transition-smooth ${activeTab === cat.key ? "text-primary-foreground shadow-boutique" : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"}`,
                style: activeTab === cat.key ? { background: "#D8A7B1" } : {},
                "data-ocid": `care_guide.tab.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: cat.emoji }),
                  cat.label
                ]
              },
              cat.key
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.28 },
            role: "tabpanel",
            "data-ocid": "care_guide.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", "aria-hidden": "true", children: active.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: active.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: "care & handling guide" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: active.care.map((section, si) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.3, delay: si * 0.07 },
                  className: "rounded-3xl border border-border/40 bg-card p-6 shadow-soft",
                  "data-ocid": `care_guide.card.${si + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-4 capitalize", children: section.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: section.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex items-start gap-2 font-body text-sm text-muted-foreground leading-relaxed",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "mt-1.5 w-1.5 h-1.5 rounded-full shrink-0",
                              style: { background: "#D8A7B1" },
                              "aria-hidden": "true"
                            }
                          ),
                          item
                        ]
                      },
                      item
                    )) })
                  ]
                },
                section.title
              )) }),
              active.key === "wearables" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.3, delay: 0.25 },
                  className: "mt-5 rounded-3xl border border-border/40 p-6 shadow-soft",
                  style: { background: "oklch(0.88 0.05 5 / 0.12)" },
                  "data-ocid": "care_guide.sizing_note",
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
          },
          active.key
        ) })
      ]
    }
  );
}
export {
  CareGuidePage
};
