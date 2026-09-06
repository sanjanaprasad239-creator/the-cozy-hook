import { j as jsxRuntimeExports, m as motion, L as Link } from "./index-DyHb857Q.js";
import { u as useAdmin, A as ALL_PRODUCTS } from "./useAdmin-BbfrO95Z.js";
const WA_NUMBER = "918660099085";
function buildWaLink(bundleName, items) {
  const msg = [
    `hi! i'd like to order the "${bundleName}" bundle 🎀`,
    "",
    "items included:",
    ...items.map((item) => `• ${item}`),
    "",
    "please let me know the availability and delivery details!"
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
function BundlesPage() {
  const { settings } = useAdmin();
  const bundles = (settings.bundles ?? []).filter((b) => b.isActive);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14",
      "data-ocid": "bundles.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-body tracking-[0.2em] uppercase mb-3",
                  style: { color: "#D8A7B1" },
                  children: "handpicked combinations"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl font-semibold text-foreground", children: "bundle & save" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "mt-4 mx-auto w-14 h-0.5 rounded-full",
                  style: { background: "#D8A7B1", opacity: 0.5 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed", children: "curated sets, better together" })
            ]
          }
        ),
        bundles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.15 },
            className: "flex flex-col items-center justify-center py-24 text-center",
            "data-ocid": "bundles.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl mb-5", children: "🎀" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "no bundles available right now" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground max-w-xs mb-6", children: "check back soon — new curated sets coming your way!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/collection",
                  className: "font-body text-sm px-6 py-2.5 rounded-full transition-smooth",
                  style: { background: "#D8A7B1", color: "#fff" },
                  "data-ocid": "bundles.browse_link",
                  children: "browse the collection"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
            "data-ocid": "bundles.list",
            children: bundles.map((bundle, i) => {
              const items = bundle.productIds.map(
                (pid) => ALL_PRODUCTS.find((p) => p.id === pid)
              );
              const originalPrice = items.reduce(
                (sum, p) => sum + ((p == null ? void 0 : p.price) ?? 0),
                0
              );
              const waLink = buildWaLink(
                bundle.name,
                bundle.productIds.map(
                  (pid) => {
                    var _a;
                    return ((_a = ALL_PRODUCTS.find((p) => p.id === pid)) == null ? void 0 : _a.name) ?? pid;
                  }
                )
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.35, delay: i * 0.08 },
                  className: "rounded-2xl border border-border/40 bg-card p-6 shadow-soft flex flex-col gap-4",
                  "data-ocid": `bundles.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground leading-tight", children: bundle.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "flex-shrink-0 rounded-full px-3 py-1 font-body text-xs font-semibold",
                          style: { background: "#A8B5A2", color: "#fff" },
                          children: [
                            "save ₹",
                            bundle.savings
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed", children: bundle.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: items.map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex items-center gap-2 font-body text-sm text-foreground",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
                              style: { background: "#D8A7B1" },
                              "aria-hidden": "true"
                            }
                          ),
                          p ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-muted-foreground", children: [
                              "₹",
                              p.price
                            ] })
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "unknown item" })
                        ]
                      },
                      (p == null ? void 0 : p.id) ?? `unknown-${idx}`
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl p-4 flex items-center justify-between",
                        style: { background: "oklch(0.94 0.02 5 / 0.35)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground line-through", children: [
                              "₹",
                              originalPrice
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-2xl font-bold text-foreground", children: [
                              "₹",
                              bundle.price
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "a",
                            {
                              href: waLink,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-smooth hover:opacity-90",
                              style: { background: "#D8A7B1", color: "#fff" },
                              "data-ocid": `bundles.order_button.${i + 1}`,
                              children: "order via whatsapp"
                            }
                          )
                        ]
                      }
                    )
                  ]
                },
                bundle.id
              );
            })
          }
        ),
        bundles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.4, delay: 0.3 },
            className: "text-center font-body text-xs text-muted-foreground mt-10",
            children: "all bundles are handmade to order — delivery in 5–7 business days."
          }
        )
      ]
    }
  );
}
export {
  BundlesPage
};
