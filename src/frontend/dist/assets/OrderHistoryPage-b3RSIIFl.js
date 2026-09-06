import { a as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, A as AnimatePresence, L as Link } from "./index-6i6bSDXp.js";
import { u as useOrderHistory } from "./useOrderHistory-BhQvy3DX.js";
import { T as Trash2 } from "./trash-2-B5xgHnJo.js";
import { R as RotateCcw } from "./rotate-ccw-HF-Ph8cH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
const WA_NUMBER = "918660099085";
function buildReorderWa(order) {
  const lines = [
    `hi! i'd like to reorder the following items 🛍️`,
    "",
    ...order.items.map(
      (ci) => `• ${ci.product.name} × ${ci.quantity} — ₹${ci.product.price * ci.quantity}`
    ),
    "",
    `subtotal: ₹${order.subtotal}`,
    `delivery: ₹${order.deliveryCharge}`,
    ...order.giftWrapping ? ["gift wrapping: yes (+₹50)"] : [],
    `total: ₹${order.total}`,
    "",
    "please confirm availability and share payment/delivery details!"
  ];
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch {
    return dateStr;
  }
}
function OrderHistoryPage() {
  const { orders, clearHistory } = useOrderHistory();
  const [confirmClear, setConfirmClear] = reactExports.useState(false);
  function handleClear() {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearHistory();
    setConfirmClear(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14",
      "data-ocid": "order_history.page",
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
                  children: "orders placed on this device"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl font-semibold text-foreground", children: "your order history" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "mt-4 mx-auto w-14 h-0.5 rounded-full",
                  style: { background: "#D8A7B1", opacity: 0.5 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-body text-sm text-muted-foreground max-w-md mx-auto", children: "past orders saved on this device" })
            ]
          }
        ),
        orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.3, delay: 0.15 },
            className: "flex justify-end mb-6 gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: confirmClear && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  initial: { opacity: 0, x: 8 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: 8 },
                  onClick: () => setConfirmClear(false),
                  className: "font-body text-xs px-4 py-2 rounded-full border border-border hover:bg-muted transition-smooth",
                  "data-ocid": "order_history.cancel_button",
                  children: "cancel"
                },
                "cancel"
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleClear,
                  className: `flex items-center gap-1.5 font-body text-xs px-4 py-2 rounded-full transition-smooth ${confirmClear ? "bg-red-100 text-red-600 border border-red-200 hover:bg-red-200" : "border border-border hover:bg-muted text-muted-foreground"}`,
                  "data-ocid": "order_history.delete_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 }),
                    confirmClear ? "yes, clear all history" : "clear history"
                  ]
                }
              )
            ]
          }
        ),
        orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.2 },
            className: "flex flex-col items-center justify-center py-24 text-center",
            "data-ocid": "order_history.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl mb-5", children: "🛍️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "no orders found on this device" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground max-w-xs mb-6", children: "place your first order and it'll show up right here!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/collection",
                  className: "font-body text-sm px-6 py-2.5 rounded-full transition-smooth",
                  style: { background: "#D8A7B1", color: "#fff" },
                  "data-ocid": "order_history.browse_link",
                  children: "browse the collection"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", "data-ocid": "order_history.list", children: orders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.35, delay: Math.min(i * 0.07, 0.35) },
            className: "rounded-2xl border border-border/40 bg-card p-6 shadow-soft",
            "data-ocid": `order_history.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-semibold text-foreground", children: order.customerName ? `${order.customerName}'s order` : "your order" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: formatDate(order.date) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex-shrink-0 rounded-full px-3 py-1 font-body text-xs font-semibold",
                    style: { background: "#D8A7B1", color: "#fff" },
                    children: [
                      "₹",
                      order.total
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 mb-4", children: order.items.map((ci) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 min-w-0 truncate", children: ci.product.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                      "×",
                      ci.quantity
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                      "₹",
                      ci.product.price * ci.quantity
                    ] })
                  ]
                },
                `${ci.product.id}-${ci.product.name}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl p-3.5 space-y-1 mb-4",
                  style: { background: "oklch(0.94 0.02 5 / 0.35)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-body text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "subtotal" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "₹",
                        order.subtotal
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-body text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "delivery" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: order.deliveryCharge === 0 ? "free" : `₹${order.deliveryCharge}` })
                    ] }),
                    order.giftWrapping && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-body text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "gift wrapping 🎁" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹50" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-body text-sm font-semibold text-foreground pt-1 border-t border-border/40", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "total" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "₹",
                        order.total
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: buildReorderWa(order),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center justify-center gap-2 w-full py-2.5 rounded-full font-body text-sm font-semibold transition-smooth hover:opacity-90",
                  style: { background: "#D8A7B1", color: "#fff" },
                  "data-ocid": `order_history.reorder_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 14 }),
                    "reorder via whatsapp"
                  ]
                }
              )
            ]
          },
          order.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.4, delay: 0.2 },
            className: "mt-10 flex items-start gap-2 rounded-2xl border border-border/30 bg-muted/40 px-5 py-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleAlert,
                {
                  size: 15,
                  className: "flex-shrink-0 mt-0.5 text-muted-foreground"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground leading-relaxed", children: "orders are saved locally on your device and cleared if you clear browser data." })
            ]
          }
        )
      ]
    }
  );
}
export {
  OrderHistoryPage
};
