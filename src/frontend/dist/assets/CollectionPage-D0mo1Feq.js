import { a as createLucideIcon, u as useNavigate, b as useSearch, r as reactExports, j as jsxRuntimeExports, m as motion, X, A as AnimatePresence } from "./index-DyHb857Q.js";
import { P as ProductCard } from "./ProductCard-C4y1rsHU.js";
import { A as ALL_PRODUCTS, C as CATEGORIES } from "./useAdmin-BbfrO95Z.js";
import "./plus-DT5yqPje.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
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
const PackageOpen = createLucideIcon("package-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const TABS = ["All", ...CATEGORIES];
const PRICE_MIN = 79;
const PRICE_MAX = 499;
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
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [minPrice, setMinPrice] = reactExports.useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = reactExports.useState(PRICE_MAX);
  const isPriceFiltered = minPrice !== PRICE_MIN || maxPrice !== PRICE_MAX;
  function selectTab(tab) {
    setSearchQuery("");
    navigate({
      to: "/collection",
      search: tab !== "All" ? { category: tab } : {}
    });
  }
  function clearPriceFilter() {
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
  }
  function handleMinChange(val) {
    setMinPrice(Math.min(val, maxPrice - 10));
  }
  function handleMaxChange(val) {
    setMaxPrice(Math.max(val, minPrice + 10));
  }
  const searchResults = reactExports.useMemo(() => {
    if (!searchQuery.trim()) return [];
    return ALL_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) && p.price >= minPrice && p.price <= maxPrice
    );
  }, [searchQuery, minPrice, maxPrice]);
  const filteredSingle = reactExports.useMemo(
    () => ALL_PRODUCTS.filter(
      (p) => p.category === active && p.price >= minPrice && p.price <= maxPrice
    ),
    [active, minPrice, maxPrice]
  );
  const filteredGrouped = reactExports.useMemo(
    () => GROUPED.map((g) => ({
      ...g,
      products: g.products.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
      )
    })).filter((g) => g.products.length > 0),
    [minPrice, maxPrice]
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative max-w-lg mx-auto",
          "data-ocid": "collection.search_input",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "search",
                placeholder: "search products...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "w-full pl-11 pr-5 py-3 rounded-full border border-primary/30 bg-card text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200",
                "aria-label": "search products"
              }
            )
          ]
        }
      ),
      searchQuery.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.p,
        {
          initial: { opacity: 0, y: -4 },
          animate: { opacity: 1, y: 0 },
          className: "mt-3 text-center font-body text-sm text-muted-foreground",
          children: [
            searchResults.length,
            " result",
            searchResults.length !== 1 ? "s" : "",
            " ",
            "for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
              "'",
              searchQuery.trim(),
              "'"
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border/40 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-1 overflow-x-auto pt-3 pb-2 scrollbar-none",
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
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-3 pt-1", "data-ocid": "collection.price_filter", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground font-medium tracking-wide", children: "price range" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body text-xs font-semibold text-foreground", children: [
            "₹",
            minPrice,
            " – ₹",
            maxPrice
          ] }),
          isPriceFiltered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: clearPriceFilter,
              className: "flex items-center gap-0.5 font-body text-xs text-primary hover:text-primary/70 transition-colors duration-150 ml-auto",
              "aria-label": "clear price filter",
              "data-ocid": "collection.price_filter.clear_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                "clear"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PriceRangeSlider,
          {
            min: PRICE_MIN,
            max: PRICE_MAX,
            minValue: minPrice,
            maxValue: maxPrice,
            onMinChange: handleMinChange,
            onMaxChange: handleMaxChange
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: searchQuery.trim() ? (
      // ── Search results view ─────────────────────────────────────────
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0 },
          transition: { duration: 0.25 },
          "data-ocid": "collection.search_results",
          children: searchResults.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: searchResults.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              className: "flex flex-col items-center justify-center py-24 text-center gap-5",
              "data-ocid": "collection.search_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-8 h-8 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-foreground font-semibold", children: "no results found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-body text-sm text-muted-foreground max-w-xs", children: isPriceFiltered ? "try adjusting the price range or search term." : "try a different search term or browse all our handmade pieces below." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2 flex-wrap justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSearchQuery(""),
                      className: "px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-body font-medium transition-smooth hover:opacity-90",
                      "data-ocid": "collection.search_empty_state.clear_button",
                      children: "clear search"
                    }
                  ),
                  isPriceFiltered && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: clearPriceFilter,
                      className: "px-6 py-2.5 rounded-full border border-primary/40 text-primary text-sm font-body font-medium transition-smooth hover:bg-primary/10",
                      "data-ocid": "collection.search_empty_state.clear_price_button",
                      children: "reset price"
                    }
                  )
                ] })
              ]
            }
          )
        },
        "search"
      )
    ) : active === "All" ? (
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
          children: filteredGrouped.length > 0 ? filteredGrouped.map(({ category, products, startIndex }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
          )) : /* @__PURE__ */ jsxRuntimeExports.jsx(PriceEmptyState, { onReset: clearPriceFilter })
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
            )) }) : isPriceFiltered ? /* @__PURE__ */ jsxRuntimeExports.jsx(PriceEmptyState, { onReset: clearPriceFilter }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
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
function PriceRangeSlider({
  min,
  max,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange
}) {
  const rangeRef = reactExports.useRef(null);
  const range = max - min;
  const leftPct = (minValue - min) / range * 100;
  const rightPct = 100 - (maxValue - min) / range * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: rangeRef,
      className: "relative h-5 flex items-center",
      "aria-label": "price range slider",
      "data-ocid": "collection.price_filter.slider",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 h-1.5 rounded-full bg-muted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute h-1.5 rounded-full bg-secondary",
            style: { left: `${leftPct}%`, right: `${rightPct}%` }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min,
            max,
            step: 10,
            value: minValue,
            onChange: (e) => onMinChange(Number(e.target.value)),
            className: "price-range-input absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer",
            "aria-label": "minimum price",
            "data-ocid": "collection.price_filter.min_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min,
            max,
            step: 10,
            value: maxValue,
            onChange: (e) => onMaxChange(Number(e.target.value)),
            className: "price-range-input absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer",
            "aria-label": "maximum price",
            "data-ocid": "collection.price_filter.max_input"
          }
        )
      ]
    }
  );
}
function PriceEmptyState({ onReset }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3 },
      className: "flex flex-col items-center justify-center py-24 text-center gap-5",
      "data-ocid": "collection.price_empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageOpen, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-foreground font-semibold", children: "no products in this range" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-body text-sm text-muted-foreground max-w-xs", children: "none of our handmade pieces fall in the selected price range. try widening the filter." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onReset,
            className: "mt-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-body font-medium transition-smooth hover:opacity-90",
            "data-ocid": "collection.price_empty_state.reset_button",
            children: "reset price filter"
          }
        )
      ]
    }
  );
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-foreground font-semibold", children: "nothing here yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 font-body text-sm text-muted-foreground max-w-xs", children: [
            "we're still adding products to ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: category }),
            ". check back soon or browse all our handmade pieces."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onReset,
            className: "mt-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-body font-medium transition-smooth hover:opacity-90",
            "data-ocid": "collection.empty_state.browse_all_button",
            children: "browse all"
          }
        )
      ]
    }
  );
}
export {
  CollectionPage
};
