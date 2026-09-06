import { r as reactExports, f as useCart, g as useWishlist, j as jsxRuntimeExports, m as motion, H as Heart, B as Button, S as ShoppingBag } from "./index-6i6bSDXp.js";
import { u as useAdmin } from "./useAdmin-DBC0Pr5K.js";
import { P as Plus } from "./plus-lvyiJ6rC.js";
const STORAGE_KEY = "cozy-hook-product-images";
function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return /* @__PURE__ */ new Map();
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return /* @__PURE__ */ new Map();
    return new Map(Object.entries(parsed));
  } catch {
    return /* @__PURE__ */ new Map();
  }
}
function useProductImages() {
  const [images, setImages] = reactExports.useState(
    () => readFromStorage()
  );
  reactExports.useEffect(() => {
    function handleStorage(e) {
      if (e.key === STORAGE_KEY || e.key === null) {
        setImages(readFromStorage());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  return images;
}
const CARD_IMAGE = "/assets/generated/hero-crochet.dim_1600x900.jpg";
const FAN_FAVOURITE_IDS = /* @__PURE__ */ new Set([
  "plush-008",
  "wear-005",
  "decor-006",
  "decor-003"
]);
function ProductCard({ product, onClick, index = 0 }) {
  const addItem = useCart((s) => s.addItem);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [added, setAdded] = reactExports.useState(false);
  const { settings } = useAdmin();
  const productImages = useProductImages();
  const isFanFavourite = FAN_FAVOURITE_IDS.has(product.id);
  const wishlisted = isInWishlist(product.id);
  const isSoldOut = (settings.soldOutProductIds ?? []).includes(product.id);
  const imageSrc = productImages.get(product.id) ?? CARD_IMAGE;
  function handleAddToCart(e) {
    e.stopPropagation();
    if (isSoldOut) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }
  function handleWishlist(e) {
    e.stopPropagation();
    if (wishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.08, ease: "easeOut" },
      className: "group cursor-pointer relative",
      onClick,
      "data-ocid": `product.card.${index + 1}`,
      children: [
        product.isNew && !isSoldOut && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "ribbon-new",
            "data-ocid": `product.new_ribbon.${index + 1}`,
            children: "new arrivals"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                    src: imageSrc,
                    alt: product.name,
                    className: `w-full h-full object-cover group-hover:scale-105 transition-smooth ${isSoldOut ? "opacity-60 grayscale-[30%]" : ""}`
                  }
                ),
                isSoldOut && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-semibold leading-none select-none pointer-events-none z-10",
                    style: {
                      background: "oklch(0.72 0.09 5)",
                      color: "#fff"
                    },
                    children: "sold out"
                  }
                ),
                isFanFavourite && !isSoldOut && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-medium leading-none select-none pointer-events-none",
                    style: {
                      background: "oklch(0.97 0.015 5 / 0.92)",
                      color: "oklch(0.56 0.12 5)",
                      border: "1px solid oklch(0.82 0.07 5 / 0.5)",
                      backdropFilter: "blur(4px)",
                      WebkitBackdropFilter: "blur(4px)"
                    },
                    children: "✨ fan favourite"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleWishlist,
                    "aria-label": wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`,
                    className: "absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center bg-card/90 backdrop-blur-sm border border-border/40 transition-smooth opacity-0 group-hover:opacity-100 hover:scale-110 focus:opacity-100",
                    "data-ocid": `product.wishlist_button.${index + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Heart,
                      {
                        className: "w-4 h-4 transition-colors",
                        style: { color: "#D8A7B1" },
                        fill: wishlisted ? "#D8A7B1" : "none"
                      }
                    )
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
                      variant: isSoldOut ? "outline" : added ? "secondary" : "default",
                      disabled: isSoldOut,
                      className: `rounded-xl text-xs h-8 px-3 gap-1 transition-smooth ${isSoldOut ? "opacity-60 cursor-not-allowed" : ""}`,
                      onClick: handleAddToCart,
                      "data-ocid": `product.add_button.${index + 1}`,
                      children: isSoldOut ? "sold out" : added ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                        "added!"
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
      ]
    }
  );
}
export {
  ProductCard as P,
  useProductImages as u
};
