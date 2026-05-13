import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion, L as Link, X, B as Button, C as CustomOrderModal } from "./index-CjLMAHmo.js";
import { P as ProductCard } from "./ProductCard-BP5rtQsQ.js";
import { g as getFeaturedProducts, F as FEATURED_PRODUCT_IDS } from "./products-C6QqLREO.js";
import { u as useAdmin } from "./useAdmin-BrCw6xJR.js";
import { l as loadAllReviews } from "./useQueries-Dqypv5H1.js";
import "./plus-COJ9U2Vt.js";
const CATEGORY_CARDS = [
  {
    name: "Plushies",
    desc: "Soft friends for every shelf",
    color: "text-primary",
    bg: "bg-primary/8",
    svgPath: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 80 80",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        className: "w-16 h-16",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "28",
              cy: "22",
              rx: "7",
              ry: "13",
              fill: "currentColor",
              opacity: "0.28"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "52",
              cy: "22",
              rx: "7",
              ry: "13",
              fill: "currentColor",
              opacity: "0.28"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "40", cy: "48", r: "20", fill: "currentColor", opacity: "0.18" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "40", cy: "48", r: "14", fill: "currentColor", opacity: "0.2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "35", cy: "45", r: "2.5", fill: "currentColor", opacity: "0.65" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "45", cy: "45", r: "2.5", fill: "currentColor", opacity: "0.65" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M37 52 Q40 55 43 52",
              stroke: "currentColor",
              strokeWidth: "1.8",
              strokeLinecap: "round",
              opacity: "0.55"
            }
          )
        ]
      }
    )
  },
  {
    name: "Keychains",
    desc: "Tiny charms, big personality",
    color: "text-secondary",
    bg: "bg-secondary/10",
    svgPath: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 80 80",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        className: "w-16 h-16",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "32",
              cy: "36",
              r: "14",
              stroke: "currentColor",
              strokeWidth: "3",
              opacity: "0.38"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "36", r: "8", fill: "currentColor", opacity: "0.2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "44",
              y: "34",
              width: "18",
              height: "5",
              rx: "2.5",
              fill: "currentColor",
              opacity: "0.32"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "54",
              y: "34",
              width: "6",
              height: "11",
              rx: "2.5",
              fill: "currentColor",
              opacity: "0.26"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "36", r: "3", fill: "currentColor", opacity: "0.5" })
        ]
      }
    )
  },
  {
    name: "Wearables",
    desc: "Cozy knits to wear with love",
    color: "text-foreground",
    bg: "bg-accent/30",
    svgPath: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 80 80",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        className: "w-16 h-16",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M20 30 Q26 18 40 18 Q54 18 60 30 L64 62 H50 L40 52 L30 62 H16 Z",
              fill: "currentColor",
              opacity: "0.16"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M30 18 Q35 27 40 27 Q45 27 50 18",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round",
              opacity: "0.38"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M22 36 Q26 34 30 36",
              stroke: "currentColor",
              strokeWidth: "1.6",
              strokeLinecap: "round",
              opacity: "0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M50 36 Q54 34 58 36",
              stroke: "currentColor",
              strokeWidth: "1.6",
              strokeLinecap: "round",
              opacity: "0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M26 48 Q31 46 36 48",
              stroke: "currentColor",
              strokeWidth: "1.6",
              strokeLinecap: "round",
              opacity: "0.4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M44 48 Q49 46 54 48",
              stroke: "currentColor",
              strokeWidth: "1.6",
              strokeLinecap: "round",
              opacity: "0.4"
            }
          )
        ]
      }
    )
  },
  {
    name: "Home Decor",
    desc: "Handmade touches for your home",
    color: "text-secondary",
    bg: "bg-secondary/8",
    svgPath: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 80 80",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        className: "w-16 h-16",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "18",
              y: "42",
              width: "44",
              height: "24",
              rx: "4",
              fill: "currentColor",
              opacity: "0.16"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M12 44 L40 20 L68 44",
              stroke: "currentColor",
              strokeWidth: "3",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              opacity: "0.36"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "31",
              y: "52",
              width: "18",
              height: "14",
              rx: "3",
              fill: "currentColor",
              opacity: "0.26"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "40", cy: "36", r: "4", fill: "currentColor", opacity: "0.4" })
        ]
      }
    )
  },
  {
    name: "Accessories",
    desc: "Cute add-ons for everyday style",
    color: "text-primary",
    bg: "bg-primary/6",
    svgPath: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 80 80",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        className: "w-16 h-16",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "40", cy: "40", r: "8", fill: "currentColor", opacity: "0.48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "40",
              cy: "20",
              rx: "7",
              ry: "5",
              fill: "currentColor",
              opacity: "0.2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "40",
              cy: "60",
              rx: "7",
              ry: "5",
              fill: "currentColor",
              opacity: "0.2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "20",
              cy: "40",
              rx: "5",
              ry: "7",
              fill: "currentColor",
              opacity: "0.2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "60",
              cy: "40",
              rx: "5",
              ry: "7",
              fill: "currentColor",
              opacity: "0.2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "26",
              cy: "26",
              rx: "5",
              ry: "4",
              fill: "currentColor",
              opacity: "0.16",
              transform: "rotate(-45 26 26)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "54",
              cy: "26",
              rx: "5",
              ry: "4",
              fill: "currentColor",
              opacity: "0.16",
              transform: "rotate(45 54 26)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "26",
              cy: "54",
              rx: "5",
              ry: "4",
              fill: "currentColor",
              opacity: "0.16",
              transform: "rotate(45 26 54)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "54",
              cy: "54",
              rx: "5",
              ry: "4",
              fill: "currentColor",
              opacity: "0.16",
              transform: "rotate(-45 54 54)"
            }
          )
        ]
      }
    )
  }
];
const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "🛍️",
    title: "Browse & Pick",
    desc: "Explore our handmade collection and add your favourites to cart."
  },
  {
    step: "02",
    icon: "💬",
    title: "Order via WhatsApp",
    desc: "Submit your cart and we confirm your order personally via WhatsApp."
  },
  {
    step: "03",
    icon: "🧶",
    title: "Handmade with Love",
    desc: "Your item is carefully crafted by hand, just for you."
  },
  {
    step: "04",
    icon: "📦",
    title: "Delivered to You",
    desc: "Packaged with care and delivered to your door in 5–7 days."
  }
];
const SAMPLE_REVIEWS = [
  {
    id: -1,
    reviewer: "Priya S.",
    rating: 5,
    text: "The Heart Pillow is absolutely adorable! Packaging was so cute — came in a little pastel bag with a ribbon.",
    product: "Heart Pillow"
  },
  {
    id: -2,
    reviewer: "Meera K.",
    rating: 5,
    text: "My strawberry bunny arrived so quickly and is even cuter in person! Sanjana's work is so detailed.",
    product: "Strawberry Costumed Bunny"
  },
  {
    id: -3,
    reviewer: "Ananya R.",
    rating: 5,
    text: "Ordered a custom initial keychain — turned out absolutely perfect. Highly recommend The Cozy Hook!",
    product: "Initial Letter Keychain"
  }
];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" }
  })
};
function StarRating({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", "aria-label": `${rating} out of 5 stars`, children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 20 18",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "w-4 h-4",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M10 16.5C10 16.5 2 11.5 2 6C2 3.8 3.8 2 6 2C7.7 2 9.1 3 10 4.4C10.9 3 12.3 2 14 2C16.2 2 18 3.8 18 6C18 11.5 10 16.5 10 16.5Z",
          fill: n <= rating ? "oklch(0.72 0.09 5)" : "none",
          stroke: n <= rating ? "oklch(0.72 0.09 5)" : "oklch(0.72 0.09 5 / 0.3)",
          strokeWidth: "1.5",
          strokeLinejoin: "round"
        }
      )
    },
    `star-${n}`
  )) });
}
function HomePage() {
  const navigate = useNavigate();
  const [customOrderOpen, setCustomOrderOpen] = reactExports.useState(false);
  const [bannerDismissed, setBannerDismissed] = reactExports.useState(false);
  const { settings } = useAdmin();
  const featuredProducts = getFeaturedProducts(
    settings.featuredProductIds.length ? settings.featuredProductIds : FEATURED_PRODUCT_IDS
  );
  const allStoredReviews = loadAllReviews();
  const highlightReviews = allStoredReviews.length >= 2 ? allStoredReviews.slice(-3).map((r) => ({
    id: r.id,
    reviewer: r.authorName,
    rating: r.rating,
    text: r.reviewText,
    product: r.productId
  })) : SAMPLE_REVIEWS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: !bannerDismissed && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        "data-ocid": "seasonal_banner.section",
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.35, ease: "easeInOut" },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex items-center justify-center gap-3 px-6 py-3 text-center",
            style: {
              background: "linear-gradient(90deg, oklch(0.72 0.05 145 / 0.18) 0%, oklch(0.72 0.09 5 / 0.14) 50%, oklch(0.72 0.05 145 / 0.18) 100%)",
              borderBottom: "1px solid oklch(0.72 0.09 5 / 0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", "aria-hidden": "true", children: "✿" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-foreground/80", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Spring Collection is here ✿" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline text-muted-foreground", children: [
                  " ",
                  "— Handcrafted with love, delivered to your door."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/collection",
                  className: "hidden sm:inline-flex font-body text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80 transition-colors",
                  "data-ocid": "seasonal_banner.link",
                  children: "Shop Now →"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Dismiss banner",
                  onClick: () => setBannerDismissed(true),
                  "data-ocid": "seasonal_banner.close_button",
                  className: "absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "hero.section",
        className: "relative min-h-screen flex items-center justify-center overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "absolute inset-0",
              style: {
                background: "linear-gradient(135deg, oklch(0.88 0.05 5 / 0.45) 0%, oklch(0.97 0.012 75) 50%, oklch(0.85 0.04 145 / 0.28) 100%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute inset-0 overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-primary/10 blur-3xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-secondary/10 blur-3xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-accent/15 blur-2xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 bg-cover bg-center opacity-20",
                    style: {
                      backgroundImage: "url('/assets/generated/hero-crochet.dim_1600x900.jpg')"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute inset-0 overflow-hidden select-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    animate: { y: [0, -16, 0], rotate: [0, 8, 0] },
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 5.5,
                      ease: "easeInOut"
                    },
                    className: "absolute top-[12%] right-[14%] text-5xl opacity-35",
                    children: "🧶"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    animate: { y: [0, 12, 0], rotate: [0, -10, 0] },
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 7,
                      ease: "easeInOut",
                      delay: 1
                    },
                    className: "absolute bottom-[20%] left-[10%] text-4xl opacity-25",
                    children: "🧵"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    animate: { y: [0, -8, 0] },
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 4.5,
                      ease: "easeInOut",
                      delay: 2
                    },
                    className: "absolute top-[40%] right-[6%] text-3xl opacity-20",
                    children: "✂️"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    animate: { y: [0, 10, 0], rotate: [0, 5, 0] },
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 6,
                      ease: "easeInOut",
                      delay: 0.5
                    },
                    className: "absolute top-[20%] left-[8%] text-4xl opacity-20",
                    children: "🌸"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center px-6 max-w-2xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.7 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.65, ease: "easeOut" },
                className: "flex justify-center mb-7",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl drop-shadow-sm", "aria-hidden": "true", children: "🧶" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.1 },
                className: "font-body text-xs font-medium tracking-[0.22em] text-primary uppercase mb-4",
                children: "Handmade with love ✦"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h1,
              {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.2, ease: "easeOut" },
                className: "font-display text-6xl sm:text-7xl md:text-8xl font-bold text-foreground tracking-tight leading-none",
                "data-ocid": "hero.title",
                children: settings.heroTitle
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.35, ease: "easeOut" },
                className: "mt-5 text-lg md:text-xl font-body italic text-muted-foreground tracking-wide",
                "data-ocid": "hero.tagline",
                children: settings.heroTagline
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.5, ease: "easeOut" },
                className: "mt-10 flex flex-col sm:flex-row gap-4 justify-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", "data-ocid": "hero.explore_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      className: "rounded-full px-10 py-6 font-body text-base shadow-boutique hover:shadow-boutique-lg transition-smooth w-full sm:w-auto",
                      children: "Explore Collection"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "lg",
                      variant: "outline",
                      className: "rounded-full px-10 py-6 font-body text-base border-border/60 hover:bg-muted/70 transition-smooth",
                      onClick: () => setCustomOrderOpen(true),
                      "data-ocid": "hero.custom_orders_button",
                      children: "Custom Orders"
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1.4, duration: 0.8 },
              "aria-hidden": "true",
              className: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { y: [0, 8, 0] },
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeInOut"
                  },
                  className: "w-5 h-9 rounded-full border-2 border-foreground/20 flex items-start justify-center pt-1.5",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-2 rounded-full bg-foreground/30" })
                }
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "categories.section",
        className: "bg-muted/30 py-24 px-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true },
              className: "text-center mb-14",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    custom: 0,
                    variants: fadeUp,
                    className: "text-xs font-body text-muted-foreground tracking-[0.2em] uppercase mb-3",
                    children: "Browse by type"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.h2,
                  {
                    custom: 1,
                    variants: fadeUp,
                    className: "font-display text-4xl md:text-5xl font-semibold text-foreground",
                    children: "Shop by Category"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5", children: CATEGORY_CARDS.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              custom: i,
              initial: "hidden",
              whileInView: "show",
              variants: fadeUp,
              viewport: { once: true },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/collection",
                  search: { category: cat.name },
                  "data-ocid": `categories.item.${i + 1}`,
                  className: "block group",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `${cat.bg} ${cat.color} rounded-3xl p-6 flex flex-col items-center gap-4 text-center border border-border/30 shadow-soft hover:shadow-boutique hover:-translate-y-2 transition-smooth cursor-pointer`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transition-smooth group-hover:scale-110", children: cat.svgPath }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground leading-tight", children: cat.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs font-body text-muted-foreground leading-snug", children: cat.desc })
                        ] })
                      ]
                    }
                  )
                }
              )
            },
            cat.name
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "how_it_works.section",
        className: "bg-background py-24 px-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true },
              className: "text-center mb-14",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    custom: 0,
                    variants: fadeUp,
                    className: "text-xs font-body text-primary tracking-[0.2em] uppercase mb-3",
                    children: "Simple & personal"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.h2,
                  {
                    custom: 1,
                    variants: fadeUp,
                    className: "font-display text-4xl md:text-5xl font-semibold text-foreground",
                    children: "How It Works"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    custom: 2,
                    variants: fadeUp,
                    className: "mt-4 mx-auto w-14 h-0.5 rounded-full bg-primary/40"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "aria-hidden": "true",
                className: "hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent"
              }
            ),
            HOW_IT_WORKS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                custom: i,
                initial: "hidden",
                whileInView: "show",
                variants: fadeUp,
                viewport: { once: true },
                className: "flex flex-col items-center text-center gap-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-soft border border-border/40",
                        style: { background: "oklch(0.97 0.012 75)" },
                        children: step.icon
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-body font-bold text-primary-foreground",
                        style: { background: "oklch(0.72 0.09 5)" },
                        children: i + 1
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground leading-tight", children: step.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-body text-muted-foreground leading-relaxed max-w-[180px] mx-auto", children: step.desc })
                  ] })
                ]
              },
              step.step
            ))
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "featured.section", className: "bg-muted/20 py-24 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true },
          className: "text-center mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                custom: 0,
                variants: fadeUp,
                className: "text-xs font-body text-primary tracking-[0.2em] uppercase mb-3",
                children: "Handpicked for you"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h2,
              {
                custom: 1,
                variants: fadeUp,
                className: "font-display text-4xl md:text-5xl font-semibold text-foreground",
                children: "Featured Creations"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                custom: 2,
                variants: fadeUp,
                className: "mt-4 mx-auto w-14 h-0.5 rounded-full bg-primary/40"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5", children: featuredProducts.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductCard,
        {
          product,
          index: i,
          onClick: () => navigate({ to: "/product/$id", params: { id: product.id } })
        },
        product.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: 0.25 },
          className: "mt-12 text-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "lg",
              className: "rounded-full px-10 font-body border-border/60 hover:bg-muted transition-smooth",
              onClick: () => navigate({ to: "/collection" }),
              "data-ocid": "featured.view_all_button",
              children: "View All Products"
            }
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "reviews.section", className: "bg-background py-24 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true },
          className: "text-center mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                custom: 0,
                variants: fadeUp,
                className: "text-xs font-body text-primary tracking-[0.2em] uppercase mb-3",
                children: "What our customers say"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h2,
              {
                custom: 1,
                variants: fadeUp,
                className: "font-display text-4xl md:text-5xl font-semibold text-foreground",
                children: "Made with love, felt in every stitch"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                custom: 2,
                variants: fadeUp,
                className: "mt-4 mx-auto w-14 h-0.5 rounded-full bg-primary/40"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: highlightReviews.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          custom: i,
          initial: "hidden",
          whileInView: "show",
          variants: fadeUp,
          viewport: { once: true },
          "data-ocid": `reviews.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full rounded-3xl border border-border/40 bg-card p-7 shadow-soft flex flex-col gap-4 hover:shadow-boutique transition-smooth", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: review.rating }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-foreground/80 leading-relaxed flex-1 italic", children: [
              '"',
              review.text,
              '"'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2 border-t border-border/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-body text-primary-foreground flex-shrink-0",
                  style: { background: "oklch(0.72 0.09 5 / 0.7)" },
                  children: review.reviewer.charAt(0)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-semibold text-foreground leading-tight", children: review.reviewer }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground", children: review.product })
              ] })
            ] })
          ] })
        },
        review.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "custom_orders_cta.section",
        className: "bg-primary/8 py-20 px-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.65 },
            className: "max-w-2xl mx-auto text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 mb-6", "aria-hidden": "true", children: ["bg-primary/40", "bg-secondary/50", "bg-primary/30"].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-2 rounded-full ${c}`,
                  style: { height: 28, marginTop: i === 1 ? 0 : 8 }
                },
                c
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-semibold text-foreground", children: "Something special in mind?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-body text-muted-foreground text-base md:text-lg leading-relaxed", children: "I take custom orders for plushies, keychains, wearables, and more. Share your idea and I'll bring it to life — in your chosen colours, sizes, and characters." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-4 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "lg",
                    className: "rounded-full px-10 py-6 font-body text-base shadow-boutique hover:shadow-boutique-lg transition-smooth",
                    onClick: () => setCustomOrderOpen(true),
                    "data-ocid": "custom_orders_cta.open_modal_button",
                    children: "Request a Custom Order"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", "data-ocid": "custom_orders_cta.contact_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "lg",
                    className: "rounded-full px-10 py-6 font-body text-base border-border/60 hover:bg-muted transition-smooth w-full sm:w-auto",
                    children: "Get in Touch"
                  }
                ) })
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CustomOrderModal,
      {
        open: customOrderOpen,
        onClose: () => setCustomOrderOpen(false)
      }
    )
  ] });
}
export {
  HomePage
};
