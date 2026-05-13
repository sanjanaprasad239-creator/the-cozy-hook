import { e as useCart, r as reactExports, j as jsxRuntimeExports, m as motion, B as Button, S as ShoppingBag } from "./index-DU0cLvqb.js";
import { P as Plus } from "./plus-DmVQ5_Nq.js";
const CARD_IMAGE = "/assets/generated/hero-crochet.dim_1600x900.jpg";
const FAN_FAVOURITE_IDS = /* @__PURE__ */ new Set([
  "strawberry-costumed-bunny",
  "bucket-hat",
  "heart-pillow",
  "wall-hanging"
]);
function ProductCard({ product, onClick, index = 0 }) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = reactExports.useState(false);
  const isFanFavourite = FAN_FAVOURITE_IDS.has(product.id);
  function handleAddToCart(e) {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.article,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.08, ease: "easeOut" },
      className: "group cursor-pointer",
      onClick,
      "data-ocid": `product.card.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-2xl overflow-hidden border border-border/50 flex flex-col shadow-soft",
          style: {
            transition: "transform 220ms ease, box-shadow 220ms ease"
          },
          onMouseEnter: (e) => {
            const el = e.currentTarget;
            el.style.transform = "translateY(-4px) scale(1.015)";
            el.style.boxShadow = "0 12px 32px rgba(58, 58, 58, 0.13)";
          },
          onMouseLeave: (e) => {
            const el = e.currentTarget;
            el.style.transform = "";
            el.style.boxShadow = "";
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: CARD_IMAGE,
                  alt: product.name,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
                }
              ),
              isFanFavourite && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-medium leading-none select-none pointer-events-none",
                  style: {
                    background: "oklch(0.97 0.015 5 / 0.92)",
                    color: "oklch(0.56 0.12 5)",
                    border: "1px solid oklch(0.82 0.07 5 / 0.5)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)"
                  },
                  children: "✨ Fan Favourite"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-smooth" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground line-clamp-1 leading-snug", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs line-clamp-2 font-body leading-relaxed", children: product.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto pt-2 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body font-semibold text-foreground text-sm", children: [
                  "₹",
                  product.price
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: added ? "secondary" : "default",
                    className: "rounded-xl text-xs h-8 px-3 gap-1 transition-smooth",
                    onClick: handleAddToCart,
                    "data-ocid": `product.add_button.${index + 1}`,
                    children: added ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                      "Added!"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3 h-3" }),
                      "Add"
                    ] })
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
export {
  ProductCard as P
};
