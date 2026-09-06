import { a as createLucideIcon, j as jsxRuntimeExports, m as motion, L as Link } from "./index-BoTxUwZ-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$1);
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
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function loadAllReviews() {
  try {
    const raw = localStorage.getItem("cozy-hook-reviews");
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}
function StarRow({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      size: 11,
      className: s <= rating ? "fill-current" : "opacity-30",
      style: { color: "#D8A7B1" }
    },
    s
  )) });
}
function CustomerGalleryPage() {
  const reviews = loadAllReviews();
  const photos = reviews.flatMap(
    (r) => (r.imageUrls ?? []).map((url) => ({
      url,
      authorName: r.authorName,
      productId: r.productId,
      rating: r.rating
    }))
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14",
      "data-ocid": "customer_gallery.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "text-center mb-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-body tracking-[0.2em] uppercase mb-3",
                  style: { color: "#D8A7B1" },
                  children: "made with love, shared with joy"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl font-semibold text-foreground", children: "customer gallery" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "mt-4 mx-auto w-14 h-0.5 rounded-full",
                  style: { background: "#D8A7B1", opacity: 0.5 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed", children: "real love from our customers" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.15 },
            className: "rounded-2xl border border-border/40 p-5 mb-10 flex items-center gap-4",
            style: { background: "oklch(0.94 0.02 5 / 0.35)" },
            "data-ocid": "customer_gallery.share_cta",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl flex-shrink-0", children: "📸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-medium text-foreground", children: "ordered something from us?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: [
                  "share your photo when leaving a review on any",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/collection",
                      className: "underline underline-offset-2 hover:text-foreground transition-colors",
                      children: "product page"
                    }
                  ),
                  " ",
                  "— your pic could appear right here!"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Camera,
                {
                  size: 20,
                  className: "flex-shrink-0 text-muted-foreground ml-auto hidden sm:block"
                }
              )
            ]
          }
        ),
        photos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.2 },
            className: "flex flex-col items-center justify-center py-24 text-center",
            "data-ocid": "customer_gallery.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl mb-5", children: "🌸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "no customer photos yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground max-w-xs mb-6", children: "be the first to share your order! leave a review with a photo on any product page." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/collection",
                  className: "font-body text-sm px-6 py-2.5 rounded-full transition-smooth",
                  style: { background: "#D8A7B1", color: "#fff" },
                  "data-ocid": "customer_gallery.browse_link",
                  children: "browse the collection"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "columns-1 sm:columns-2 lg:columns-3 gap-5",
            "data-ocid": "customer_gallery.grid",
            children: photos.map((photo, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.35, delay: Math.min(i * 0.07, 0.4) },
                className: "break-inside-avoid mb-5 rounded-2xl overflow-hidden border border-border/30 bg-card shadow-soft",
                "data-ocid": `customer_gallery.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: photo.url,
                      alt: `by ${photo.authorName}`,
                      className: "w-full object-cover hover:scale-105 transition-transform duration-500",
                      loading: "lazy"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { rating: photo.rating }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs font-semibold text-foreground mt-1.5 truncate", children: photo.authorName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground truncate", children: photo.productId.replace(/-/g, " ") })
                  ] })
                ]
              },
              `${photo.url}-${i}`
            ))
          }
        )
      ]
    }
  );
}
export {
  CustomerGalleryPage
};
