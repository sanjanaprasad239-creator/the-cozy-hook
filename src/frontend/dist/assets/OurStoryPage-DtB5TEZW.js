import { j as jsxRuntimeExports, m as motion } from "./index-D7DGx8fp.js";
const timelineEvents = [
  {
    year: "2021",
    title: "The First Stitch",
    description: "It all began on a quiet winter evening with a single crochet hook and a ball of soft cream yarn. What started as stress relief quickly became a deep, meditative love."
  },
  {
    year: "2022",
    title: "Gifting with Heart",
    description: "Friends and family started asking for handmade pieces. Each gifted plushie, keychain, and wearable carried a little note — 'made with love'. The joy on their faces was unforgettable."
  },
  {
    year: "2023",
    title: "The Cozy Hook is Born",
    description: "What was once a hobby became a small, passionate studio. The Cozy Hook launched with a simple mission: to bring warmth, softness, and care into everyday life through handmade crochet."
  },
  {
    year: "Today",
    title: "Every Piece, Made for You",
    description: "Every item in The Cozy Hook is still crocheted by hand, with the same love as that very first stitch. We pour care into every loop, every knot, every finished edge — because you deserve nothing less."
  }
];
const values = [
  {
    icon: "🧶",
    title: "Handmade Always",
    description: "No machines, no shortcuts. Every piece is crocheted by hand from start to finish."
  },
  {
    icon: "🌿",
    title: "Premium Materials",
    description: "We use only soft, high-quality yarn that feels as good as it looks."
  },
  {
    icon: "💌",
    title: "Made with Love",
    description: "Each order is packed with care and a little handwritten touch of warmth."
  }
];
function CrochetDivider() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-2", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        className: "text-primary/50 flex-shrink-0",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "3", fill: "currentColor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M12 5 C8 5 5 8 5 12 C5 16 8 19 12 19",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M12 5 C16 5 19 8 19 12 C19 16 16 19 12 19",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M8 8 Q6 10 6 12",
              stroke: "currentColor",
              strokeWidth: "1",
              strokeLinecap: "round",
              fill: "none",
              opacity: "0.4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M16 8 Q18 10 18 12",
              stroke: "currentColor",
              strokeWidth: "1",
              strokeLinecap: "round",
              fill: "none",
              opacity: "0.4"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
  ] });
}
function OurStoryPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "our_story.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-20 sm:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7 },
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs tracking-[0.25em] text-primary uppercase font-medium", children: "About Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl sm:text-6xl font-semibold text-foreground leading-tight", children: "Our Story" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CrochetDivider, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto", children: "A passion for crochet, a love for handmade warmth, and a dream to share it with the world — one stitch at a time." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden h-8 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        viewBox: "0 0 1200 32",
        preserveAspectRatio: "none",
        className: "absolute inset-0 w-full h-full text-muted/40",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M0 16 Q150 0 300 16 Q450 32 600 16 Q750 0 900 16 Q1050 32 1200 16",
            stroke: "currentColor",
            strokeWidth: "2",
            fill: "none"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "grid sm:grid-cols-5 gap-10 items-start",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/5] rounded-3xl bg-accent/30 flex flex-col items-center justify-center shadow-boutique overflow-hidden relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                width: "80",
                height: "80",
                viewBox: "0 0 80 80",
                fill: "none",
                className: "text-primary/30",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "40", cy: "28", r: "16", fill: "currentColor" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M10 72 C10 54 20 46 40 46 C60 46 70 54 70 72",
                      fill: "currentColor"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-body text-sm text-primary/60 font-medium", children: "Sanjana Prasad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-1", children: "Founder & maker" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3 space-y-5 font-body text-muted-foreground leading-loose text-[0.94rem]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Hi, I'm",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Sanjana" }),
              " — the hands and heart behind The Cozy Hook. What started as a quiet evening hobby quickly became a creative obsession. There's something deeply satisfying about turning a humble ball of yarn into something someone cherishes."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Every plushie, keychain, and wearable is crocheted by hand in my little home studio. I pour care into every stitch — from selecting soft, premium yarn to making sure each piece passes my very particular quality eye before it goes out the door." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The Cozy Hook is for anyone who appreciates the warmth of handmade things. Whether you're treating yourself or gifting someone dear, you're receiving something made with real love and zero shortcuts." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "Thank you for being here. It truly means the world. 🌷" })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 sm:gap-6", children: [
      { value: "39+", label: "Unique Products" },
      { value: "100%", label: "Handmade" },
      { value: "∞", label: "Love Stitched In" }
    ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: i * 0.1 },
        className: "bg-card rounded-2xl p-5 sm:p-6 text-center shadow-soft",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl sm:text-4xl font-semibold text-primary", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-body text-xs sm:text-sm text-muted-foreground", children: stat.label })
        ]
      },
      stat.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl text-foreground font-semibold", children: "How it all began" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-0.5 bg-primary mx-auto mt-4 rounded-full" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[1.85rem] top-0 bottom-0 w-px bg-border sm:left-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: timelineEvents.map((event, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: i % 2 === 0 ? -20 : 20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.55, delay: i * 0.1 },
            className: `relative flex gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[1.35rem] sm:left-1/2 top-2 w-2.5 h-2.5 rounded-full bg-primary border-2 border-card shadow-soft -translate-x-1/2 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `ml-12 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-10" : "sm:pl-10"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-5 shadow-boutique hover:shadow-boutique-lg transition-smooth", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block font-body text-xs font-semibold tracking-widest text-primary uppercase mb-2", children: event.year }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: event.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-body text-sm text-muted-foreground leading-relaxed", children: event.description })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block sm:w-1/2" })
            ]
          },
          event.year
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16 sm:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl text-foreground font-semibold", children: "What we stand for" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-0.5 bg-primary mx-auto mt-4 rounded-full" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-5", children: values.map((val, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.12 },
          className: "bg-card rounded-3xl p-6 text-center shadow-soft hover:shadow-boutique transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl block mb-4", children: val.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: val.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed", children: val.description })
          ]
        },
        val.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "🧶" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl sm:text-3xl text-foreground font-semibold leading-snug", children: '"Every stitch is a little act of love."' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: "— Sanjana, The Cozy Hook" })
        ]
      }
    ) }) })
  ] });
}
export {
  OurStoryPage
};
