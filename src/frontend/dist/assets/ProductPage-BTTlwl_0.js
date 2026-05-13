import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, r as reactExports, B as Button, d as useParams, u as useNavigate, e as useCart, f as useWishlist, L as Link, m as motion, E as ExternalLink, S as ShoppingBag, H as Heart } from "./index-CCptdxtl.js";
import { P as ProductCard } from "./ProductCard-Ch4wDp_U.js";
import { L as Label, I as Input } from "./label-6EfFtY2J.js";
import { T as Textarea, M as Minus } from "./textarea-n2nGX6el.js";
import { u as ue } from "./index-a_5Q2cI2.js";
import { u as useCreateReview, a as useProductReviews } from "./useQueries-BlU6qg4w.js";
import { a as getProductById, b as getProductsByCategory, A as ALL_PRODUCTS } from "./products-DV9WP4M5.js";
import { P as Plus } from "./plus-FpMpL_UQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
const SIZES = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6"
};
function HeartIcon({
  filled,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      className,
      "aria-hidden": "true",
      fill: filled ? "#D8A7B1" : "none",
      stroke: "#D8A7B1",
      strokeWidth: 1.8,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        }
      )
    }
  );
}
function ReviewStars(props) {
  const { rating, max = 5, size = "md" } = props;
  const isInteractive = "interactive" in props && props.interactive;
  const sizeClass = SIZES[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-0.5",
      "aria-label": `${rating} out of ${max} hearts`,
      children: Array.from({ length: max }, (_, i) => {
        const idx = i + 1;
        const filled = idx <= rating;
        if (isInteractive) {
          const { onRate } = props;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onRate(idx),
              className: "cursor-pointer hover:scale-110 transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded",
              "aria-label": `Rate ${idx} out of ${max}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeartIcon, { filled, className: sizeClass })
            },
            idx
          );
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HeartIcon, { filled, className: sizeClass }, idx);
      })
    }
  );
}
function relativeDate(timestamp) {
  const ms = timestamp > 1e15 ? timestamp / 1e6 : timestamp;
  const diff = Date.now() - ms;
  const minutes = Math.floor(diff / 6e4);
  const hours = Math.floor(diff / 36e5);
  const days = Math.floor(diff / 864e5);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  if (minutes < 2) return "just now";
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  return `${months} month${months > 1 ? "s" : ""} ago`;
}
function ReviewCard({ review }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "bg-background rounded-2xl p-5 shadow-boutique border border-border/50 flex flex-col gap-3",
      "data-ocid": "review.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base truncate", children: review.authorName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewStars, { rating: review.rating, size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-body font-medium w-fit mt-0.5",
                style: {
                  background: "oklch(0.85 0.04 145 / 0.35)",
                  color: "oklch(0.42 0.07 145)"
                },
                "data-ocid": "review.verified_badge",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      viewBox: "0 0 12 12",
                      fill: "none",
                      className: "w-3 h-3",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "6", cy: "6", r: "5.5", fill: "oklch(0.85 0.04 145 / 0.6)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "polyline",
                          {
                            points: "3.5 6 5 7.5 8.5 4",
                            stroke: "oklch(0.42 0.07 145)",
                            strokeWidth: "1.4",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          }
                        )
                      ]
                    }
                  ),
                  "verified purchase"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "time",
            {
              className: "text-xs font-body text-muted-foreground shrink-0 mt-0.5",
              dateTime: new Date(
                review.timestamp > 1e15 ? review.timestamp / 1e6 : review.timestamp
              ).toISOString(),
              children: relativeDate(review.timestamp)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed", children: review.reviewText })
      ]
    }
  );
}
const INITIAL = { authorName: "", rating: 0, reviewText: "" };
function ReviewForm({ productId, onSuccess }) {
  const [form, setForm] = reactExports.useState(INITIAL);
  const [errors, setErrors] = reactExports.useState({});
  const createReview = useCreateReview();
  function validate() {
    const next = {};
    if (!form.authorName.trim()) next.authorName = "Please enter your name";
    if (form.rating < 1) next.rating = 1;
    if (!form.reviewText.trim()) next.reviewText = "Please share your thoughts";
    setErrors(next);
    return Object.keys(next).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createReview.mutateAsync({
        productId,
        rating: form.rating,
        reviewText: form.reviewText.trim(),
        authorName: form.authorName.trim()
      });
      setForm(INITIAL);
      setErrors({});
      ue.success("Thank you for your review! 🌸", {
        description: "Your thoughts help other customers find what they love.",
        duration: 5e3
      });
      onSuccess == null ? void 0 : onSuccess();
    } catch {
      ue.error("Couldn't submit your review", {
        description: "Please try again in a moment."
      });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "bg-card rounded-2xl p-6 shadow-boutique border border-border/50 flex flex-col gap-5",
      "data-ocid": "review.form",
      noValidate: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: "Share Your Experience" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-body text-muted-foreground -mt-2", children: [
          "your review will be marked as a",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full align-middle",
              style: {
                background: "oklch(0.85 0.04 145 / 0.3)",
                color: "oklch(0.42 0.07 145)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    viewBox: "0 0 12 12",
                    fill: "none",
                    className: "w-3 h-3",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "6", cy: "6", r: "5.5", fill: "oklch(0.85 0.04 145 / 0.6)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "polyline",
                        {
                          points: "3.5 6 5 7.5 8.5 4",
                          stroke: "oklch(0.42 0.07 145)",
                          strokeWidth: "1.4",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    ]
                  }
                ),
                "verified purchase"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "review-name",
              className: "font-body text-sm font-medium text-foreground",
              children: "Your Name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "review-name",
              type: "text",
              placeholder: "e.g. Priya S.",
              value: form.authorName,
              onChange: (e) => setForm((f) => ({ ...f, authorName: e.target.value })),
              onBlur: () => {
                if (!form.authorName.trim())
                  setErrors((e) => ({
                    ...e,
                    authorName: "Please enter your name"
                  }));
                else setErrors((e) => ({ ...e, authorName: void 0 }));
              },
              className: "rounded-xl font-body text-sm border-input focus-visible:ring-primary",
              "data-ocid": "review.name_input"
            }
          ),
          errors.authorName && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-body text-destructive",
              "data-ocid": "review.name_field_error",
              children: errors.authorName
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-sm font-medium text-foreground", children: "Your Rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReviewStars,
              {
                rating: form.rating,
                size: "lg",
                interactive: true,
                onRate: (r) => {
                  setForm((f) => ({ ...f, rating: r }));
                  setErrors((e) => ({ ...e, rating: void 0 }));
                }
              }
            ),
            form.rating > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body text-muted-foreground", children: ["", "Poor", "Fair", "Good", "Great", "Loved it!"][form.rating] })
          ] }),
          errors.rating !== void 0 && form.rating < 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-body text-destructive",
              "data-ocid": "review.rating_field_error",
              children: "Please select a rating"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "review-text",
              className: "font-body text-sm font-medium text-foreground",
              children: "Your Review"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "review-text",
              placeholder: "What did you love about this item? How does it look or feel in person?",
              value: form.reviewText,
              onChange: (e) => setForm((f) => ({ ...f, reviewText: e.target.value })),
              onBlur: () => {
                if (!form.reviewText.trim())
                  setErrors((e) => ({
                    ...e,
                    reviewText: "Please share your thoughts"
                  }));
                else setErrors((e) => ({ ...e, reviewText: void 0 }));
              },
              rows: 3,
              className: "rounded-xl font-body text-sm border-input focus-visible:ring-primary resize-none",
              "data-ocid": "review.text_textarea"
            }
          ),
          errors.reviewText && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-body text-destructive",
              "data-ocid": "review.text_field_error",
              children: errors.reviewText
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            size: "lg",
            disabled: createReview.isPending,
            className: "rounded-2xl font-body h-12 w-full sm:w-auto",
            "data-ocid": "review.submit_button",
            children: createReview.isPending ? "Submitting…" : "Submit Review"
          }
        )
      ]
    }
  );
}
function HeartBullet() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 16 16",
      fill: "currentColor",
      className: "w-3.5 h-3.5 text-primary mt-0.5 shrink-0",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 13.5C8 13.5 1.5 9.5 1.5 5.5A3.5 3.5 0 0 1 8 3.09 3.5 3.5 0 0 1 14.5 5.5C14.5 9.5 8 13.5 8 13.5Z" })
    }
  );
}
function RatingsSummary({ reviews }) {
  if (reviews.length === 0) return null;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const rounded = Math.round(avg * 10) / 10;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewStars, { rating: Math.round(avg), size: "sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold text-foreground", children: rounded.toFixed(1) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body text-sm text-muted-foreground", children: [
      "· ",
      reviews.length,
      " ",
      reviews.length === 1 ? "review" : "reviews"
    ] })
  ] });
}
function DeliveryBadge() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-body",
      style: { backgroundColor: "#A8B5A2", color: "#fff" },
      "data-ocid": "product.delivery_badge",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5 shrink-0", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivered in 5–7 days · ₹49 delivery (Free above ₹999)" })
      ]
    }
  );
}
function WhatsAppIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: "w-4 h-4",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
    }
  );
}
function ProductPage() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const addItem = useCart((s) => s.addItem);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const product = getProductById(id);
  const [qty, setQty] = reactExports.useState(1);
  const [added, setAdded] = reactExports.useState(false);
  const { data: reviews = [], isLoading: reviewsLoading } = useProductReviews(id);
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[60vh] flex flex-col items-center justify-center gap-6 p-8",
        "data-ocid": "product.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl text-foreground", children: "Oops, page not found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: "This product doesn't exist or may have been removed." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "rounded-2xl font-body gap-2",
              onClick: () => navigate({ to: "/collection" }),
              "data-ocid": "product.back_to_collection_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back to Collection"
              ]
            }
          )
        ]
      }
    );
  }
  const p = product;
  const relatedProducts = getProductsByCategory(p.category).filter((item) => item.id !== p.id).slice(0, 3);
  const bundleSuggestions = ALL_PRODUCTS.filter(
    (item) => item.id !== p.id && item.category !== p.category
  ).reduce((acc, item) => {
    if (!acc.some((a) => a.category === item.category)) acc.push(item);
    return acc;
  }, []).slice(0, 3);
  const bundleTotal = bundleSuggestions.reduce((s, i) => s + i.price, p.price);
  const wishlisted = isInWishlist(p.id);
  function handleAddToCart() {
    addItem(p, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2e3);
  }
  function handleWhatsApp() {
    const msg = `Hi! I'd like to order:
• ${p.name} × ${qty} — ₹${p.price * qty}

Please confirm availability and delivery details. Thank you! 🌸`;
    window.open(
      `https://wa.me/918660099085?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }
  function handleStickyWhatsApp() {
    const msg = `Hi! I'd like to order: ${p.name} 🌸`;
    window.open(
      `https://wa.me/918660099085?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 border-t border-border/50 bg-card/95 backdrop-blur-sm shadow-boutique-lg",
        "data-ocid": "product.sticky_whatsapp_bar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleStickyWhatsApp,
            className: "w-full flex items-center justify-center gap-2 h-12 rounded-2xl font-body text-sm font-medium transition-smooth border border-[#25D366]/40 hover:border-[#25D366] text-foreground hover:text-[#25D366] bg-transparent",
            "data-ocid": "product.sticky_whatsapp_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppIcon, {}),
              "Order via WhatsApp"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 md:pb-10",
        "data-ocid": "product.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              "aria-label": "Breadcrumb",
              className: "flex items-center gap-1.5 text-xs font-body text-muted-foreground mb-8 flex-wrap",
              "data-ocid": "product.breadcrumb",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/",
                    className: "hover:text-foreground transition-smooth",
                    "data-ocid": "product.breadcrumb_home_link",
                    children: "Home"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/collection",
                    className: "hover:text-foreground transition-smooth",
                    "data-ocid": "product.breadcrumb_collection_link",
                    children: "Collection"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[160px]", children: p.name })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/collection" }),
              className: "flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth mb-8",
              "data-ocid": "product.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back to Collection"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.a,
              {
                href: p.pictureUrl && p.pictureUrl !== "#" ? p.pictureUrl : void 0,
                target: "_blank",
                rel: "noopener noreferrer",
                initial: { opacity: 0, x: -24 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.5, ease: "easeOut" },
                className: "w-full aspect-square rounded-3xl border-2 flex flex-col items-center justify-center gap-4 cursor-pointer transition-smooth shadow-boutique-lg",
                style: {
                  borderColor: "#D8A7B1",
                  backgroundColor: "transparent"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.backgroundColor = "#D8A7B1";
                  e.currentTarget.style.color = "#fff";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "";
                },
                "data-ocid": "product.view_picture_button",
                "aria-label": `View picture of ${p.name}`,
                onClick: !p.pictureUrl || p.pictureUrl === "#" ? (e) => e.preventDefault() : void 0,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-16 h-16 rounded-full border-2 flex items-center justify-center",
                      style: { borderColor: "#D8A7B1" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-7 h-7", style: { color: "#D8A7B1" } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-6 space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-display text-xl font-semibold",
                        style: { color: "#D8A7B1" },
                        children: "View Picture"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: "Click to see the full product photo" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 24 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.5, ease: "easeOut" },
                className: "flex flex-col gap-6",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body font-semibold tracking-widest text-primary uppercase mb-2", children: p.category }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-semibold text-foreground leading-tight", children: p.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "mt-3 font-body font-semibold text-2xl",
                        style: { color: "#D8A7B1" },
                        "data-ocid": "product.price",
                        children: [
                          "₹",
                          p.price
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeliveryBadge, {}) })
                  ] }),
                  reviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(RatingsSummary, { reviews }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground leading-relaxed text-sm", children: p.description }),
                  p.features.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 bg-accent/30 rounded-2xl p-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-foreground mb-2", children: "What's included" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: p.features.map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex items-start gap-2 text-sm font-body text-muted-foreground",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(HeartBullet, {}),
                          feat
                        ]
                      },
                      feat
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm font-medium text-foreground w-8", children: "Qty" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center border border-input rounded-2xl overflow-hidden bg-card",
                        "data-ocid": "product.qty_selector",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setQty((q) => Math.max(1, q - 1)),
                              className: "flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
                              "aria-label": "Decrease quantity",
                              "data-ocid": "product.qty_minus",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "px-3 font-body font-semibold text-sm min-w-[2.5rem] text-center text-foreground",
                              "data-ocid": "product.qty_value",
                              children: qty
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setQty((q) => q + 1),
                              className: "flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
                              "aria-label": "Increase quantity",
                              "data-ocid": "product.qty_plus",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
                            }
                          )
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "lg",
                        className: "flex-1 rounded-2xl font-body gap-2 h-12",
                        variant: added ? "secondary" : "default",
                        onClick: handleAddToCart,
                        "data-ocid": "product.add_to_cart_button",
                        children: added ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                          " Added to Cart!"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                          " Add to Cart"
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "lg",
                        variant: "outline",
                        className: "flex-1 rounded-2xl font-body gap-2 h-12 border-[#25D366]/40 hover:border-[#25D366] hover:text-[#25D366] transition-smooth",
                        onClick: handleWhatsApp,
                        "data-ocid": "product.whatsapp_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppIcon, {}),
                          "Order via WhatsApp"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "lg",
                        variant: "outline",
                        className: "rounded-2xl font-body gap-2 h-12 border-border/50 hover:border-primary/50 transition-smooth px-4",
                        onClick: () => {
                          if (wishlisted) removeFromWishlist(p.id);
                          else addToWishlist(p);
                        },
                        "aria-label": wishlisted ? "Remove from wishlist" : "Save to wishlist",
                        "data-ocid": "product.wishlist_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Heart,
                          {
                            className: "w-4 h-4",
                            style: { color: "#D8A7B1" },
                            fill: wishlisted ? "#D8A7B1" : "none"
                          }
                        )
                      }
                    )
                  ] })
                ]
              }
            )
          ] }),
          bundleSuggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-16", "data-ocid": "product.bundle_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground whitespace-nowrap", children: "Complete the Look" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-3xl border border-border/40 p-6",
                style: { background: "oklch(0.88 0.05 5 / 0.1)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mb-5", children: "pair with these handmade pieces for a perfect gift set or collection starter:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 snap-start w-36 rounded-2xl bg-card border border-primary/30 overflow-hidden shadow-soft", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: "/assets/generated/hero-crochet.dim_1600x900.jpg",
                          alt: p.name,
                          className: "w-full h-full object-cover"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs font-semibold text-foreground line-clamp-1", children: p.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "p",
                          {
                            className: "font-body text-xs font-bold mt-0.5",
                            style: { color: "#D8A7B1" },
                            children: [
                              "₹",
                              p.price
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-body text-primary", children: "this item" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xl text-muted-foreground", children: "+" }) }),
                    bundleSuggestions.map((item, bi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          className: "flex-shrink-0 snap-start w-36 rounded-2xl bg-card border border-border/40 overflow-hidden shadow-soft hover:shadow-boutique hover:-translate-y-1 transition-smooth text-left",
                          onClick: () => navigate({
                            to: "/product/$id",
                            params: { id: item.id }
                          }),
                          "data-ocid": `product.bundle_item.${bi + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: "/assets/generated/hero-crochet.dim_1600x900.jpg",
                                alt: item.name,
                                className: "w-full h-full object-cover"
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs font-semibold text-foreground line-clamp-1", children: item.name }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "p",
                                {
                                  className: "font-body text-xs font-bold mt-0.5",
                                  style: { color: "#D8A7B1" },
                                  children: [
                                    "₹",
                                    item.price
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-body text-muted-foreground capitalize", children: item.category })
                            ] })
                          ]
                        }
                      ),
                      bi < bundleSuggestions.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xl text-muted-foreground flex-shrink-0", children: "+" })
                    ] }, item.id))
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-border/40 flex items-center justify-between flex-wrap gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground", children: [
                      "bundle total:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground text-base", children: [
                        "₹",
                        bundleTotal
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: `https://wa.me/918660099085?text=${encodeURIComponent(`Hi! I'd like to order a bundle:
• ${p.name} (₹${p.price})
${bundleSuggestions.map((b) => `• ${b.name} (₹${b.price})`).join("\n")}

Total: ₹${bundleTotal} 🌸`)}`,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-body text-sm font-medium transition-smooth",
                        style: { background: "#D8A7B1", color: "#fff" },
                        "data-ocid": "product.bundle_whatsapp_button",
                        children: "order bundle via whatsapp"
                      }
                    )
                  ] })
                ]
              }
            )
          ] }),
          relatedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-16", "data-ocid": "product.related_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground whitespace-nowrap", children: "You May Also Like" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid grid-cols-2 sm:grid-cols-3 gap-4",
                "data-ocid": "product.related_list",
                children: relatedProducts.map((related, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ProductCard,
                  {
                    product: related,
                    index: idx,
                    onClick: () => navigate({ to: "/product/$id", params: { id: related.id } })
                  },
                  related.id
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-16 mb-6", "data-ocid": "product.reviews_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground whitespace-nowrap", children: "Customer Reviews" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
            ] }),
            reviewsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "space-y-4 mb-10",
                "data-ocid": "product.reviews_loading_state",
                children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-background rounded-2xl p-5 border border-border/50 space-y-3",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28 rounded-full" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 rounded-full" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full rounded-full" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4 rounded-full" })
                    ]
                  },
                  i
                ))
              }
            ),
            !reviewsLoading && reviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 p-5 bg-muted/40 rounded-2xl flex items-center gap-4 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RatingsSummary, { reviews }) }),
            !reviewsLoading && reviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid gap-4 sm:grid-cols-2 mb-10",
                "data-ocid": "product.reviews_list",
                children: reviews.map((review, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 16 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.35, delay: idx * 0.08 },
                    "data-ocid": `product.reviews.item.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review })
                  },
                  review.id
                ))
              }
            ),
            !reviewsLoading && reviews.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-center py-10 mb-10",
                "data-ocid": "product.reviews_empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-body text-base italic",
                    style: { color: "#A8B5A2" },
                    children: "Be the first to share your thoughts! 🌿"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.4 },
                className: "pb-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewForm, { productId: id })
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  ProductPage
};
