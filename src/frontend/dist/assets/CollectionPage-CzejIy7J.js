import { c as createLucideIcon, u as useNavigate, a as useSearch, r as reactExports, j as jsxRuntimeExports, m as motion, A as AnimatePresence } from "./index-B6J4yjYJ.js";
import { P as ProductCard } from "./ProductCard-FfZs1i9a.js";
import { A as ALL_PRODUCTS, C as CATEGORIES } from "./products-DV9WP4M5.js";
import "./plus-BNj9e0ie.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 22v-9", key: "x3hkom" }],
  [
    "path",
    {
      d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
      key: "2ntwy6"
    }
  ],
  [
    "path",
    {
      d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
      key: "1pmm1c"
    }
  ],
  [
    "path",
    {
      d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
      key: "12ttoo"
    }
  ]
];
const PackageOpen = createLucideIcon("package-open", __iconNode);
const TABS = ["All", ...CATEGORIES];
const GROUPED = (() => {
  let offset = 0;
  return CATEGORIES.map((cat) => {
    const products = ALL_PRODUCTS.filter((p) => p.category === cat);
    const startIndex = offset;
    offset += products.length;
    return { category: cat, products, startIndex };
  });
})();
function CollectionPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const active = search.category ?? "All";
  function selectTab(tab) {
    navigate({
      to: "/collection",
      search: tab !== "All" ? { category: tab } : {}
    });
  }
  const filteredSingle = reactExports.useMemo(
    () => ALL_PRODUCTS.filter((p) => p.category === active),
    [active]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "collection.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: "easeOut" },
          className: "font-display text-4xl md:text-5xl font-semibold text-foreground",
          children: "The Collection"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.15, duration: 0.4 },
          className: "mt-3 font-body text-muted-foreground text-base",
          children: [
            ALL_PRODUCTS.length,
            " handmade pieces, crafted with care and love"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border/40 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 overflow-x-auto py-3 scrollbar-none",
        role: "tablist",
        "aria-label": "Filter by category",
        "data-ocid": "collection.filter.tabs",
        children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": active === tab,
            onClick: () => selectTab(tab),
            className: `shrink-0 px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 whitespace-nowrap ${active === tab ? "bg-primary text-primary-foreground shadow-soft" : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"}`,
            "data-ocid": "collection.filter.tab",
            children: tab
          },
          tab
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: active === "All" ? (
      // ── All categories view with section headers ───────────────────
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.25 },
          className: "space-y-16",
          "data-ocid": "collection.all_sections",
          children: GROUPED.map(({ category, products, startIndex }) => {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "section",
              {
                "data-ocid": `collection.section.${category.toLowerCase().replace(" ", "_")}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-4 mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground", children: category }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body text-sm text-muted-foreground", children: [
                      products.length,
                      " items"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-0.5 bg-primary rounded-full mb-8" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProductCard,
                    {
                      product,
                      index: startIndex + i,
                      onClick: () => navigate({
                        to: "/product/$id",
                        params: { id: product.id }
                      })
                    },
                    product.id
                  )) })
                ]
              },
              category
            );
          })
        },
        "all"
      )
    ) : (
      // ── Single category filtered view ─────────────────────────────
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -8 },
          transition: { duration: 0.3, ease: "easeOut" },
          "data-ocid": "collection.filtered_grid",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground", children: active }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-0.5 bg-primary rounded-full mt-3" })
            ] }),
            filteredSingle.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: filteredSingle.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProductCard,
              {
                product,
                index: i,
                onClick: () => navigate({
                  to: "/product/$id",
                  params: { id: product.id }
                })
              },
              product.id
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                category: active,
                onReset: () => selectTab("All")
              }
            )
          ]
        },
        active
      )
    ) }) })
  ] });
}
function EmptyState({ category, onReset }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3 },
      className: "flex flex-col items-center justify-center py-24 text-center gap-5",
      "data-ocid": "collection.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageOpen, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-foreground font-semibold", children: "Nothing here yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 font-body text-sm text-muted-foreground max-w-xs", children: [
            "We're still adding products to ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: category }),
            ". Check back soon or browse all our handmade pieces."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onReset,
            className: "mt-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-body font-medium transition-smooth hover:opacity-90",
            "data-ocid": "collection.empty_state.browse_all_button",
            children: "Browse All"
          }
        )
      ]
    }
  );
}
export {
  CollectionPage
};
