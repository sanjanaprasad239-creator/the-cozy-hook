import { g as useWishlist, u as useNavigate, j as jsxRuntimeExports, m as motion, H as Heart, B as Button, L as Link, A as AnimatePresence } from "./index-DLT9PHCj.js";
import { P as ProductCard } from "./ProductCard-DVlu0rYU.js";
import { T as Trash2 } from "./trash-2-DWIccA65.js";
import "./useAdmin-CB8D1pSa.js";
import "./plus-ktS6b2MN.js";
function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();
  if (wishlistItems.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4",
        "data-ocid": "wishlist.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { type: "spring", stiffness: 200, delay: 0.1 },
              className: "w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-10 h-10", style: { color: "#D8A7B1" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "your wishlist is empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm max-w-xs mx-auto leading-relaxed", children: "save your favourite handmade pieces here — tap the heart on any product to add it." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "rounded-xl font-body px-8",
              "data-ocid": "wishlist.shop_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", children: "browse the collection" })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10",
      "data-ocid": "wishlist.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "flex items-start justify-between gap-4 mb-10 flex-wrap",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-semibold text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-7 h-7", style: { color: "#D8A7B1" } }),
                  "your wishlist"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-body mt-1 text-sm", children: [
                  wishlistItems.length,
                  " ",
                  wishlistItems.length === 1 ? "saved item" : "saved items"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: clearWishlist,
                  className: "flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-destructive transition-colors",
                  "data-ocid": "wishlist.clear_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                    "clear all"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5", children: wishlistItems.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative",
            "data-ocid": `wishlist.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProductCard,
                {
                  product,
                  index: i,
                  onClick: () => navigate({ to: "/product/$id", params: { id: product.id } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeFromWishlist(product.id),
                  className: "absolute top-2 right-2 p-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border/40 text-destructive hover:bg-destructive/10 transition-smooth z-10",
                  "aria-label": `Remove ${product.name} from wishlist`,
                  "data-ocid": `wishlist.remove_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          },
          product.id
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.3 },
            className: "mt-10 text-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                asChild: true,
                className: "rounded-xl font-body px-8 border-border/60 hover:bg-muted",
                "data-ocid": "wishlist.continue_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", children: "continue browsing" })
              }
            )
          }
        )
      ]
    }
  );
}
export {
  WishlistPage
};
