import { c as createLucideIcon, j as jsxRuntimeExports, e as useCart, N as useCartTotals, u as useNavigate, r as reactExports, S as ShoppingBag, B as Button, L as Link, m as motion, A as AnimatePresence, O as FREE_DELIVERY_THRESHOLD } from "./index-D7DGx8fp.js";
import { L as Label, I as Input } from "./label-D9swpilo.js";
import { S as Separator } from "./separator-BvSeI6U7.js";
import { M as Minus, T as Textarea } from "./textarea-Cq3Ji8iF.js";
import { P as Plus } from "./plus-DQPHOrTQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function ProductPlaceholder({ name }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center bg-muted rounded-2xl gap-3 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: "64",
        height: "64",
        viewBox: "0 0 64 64",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "32",
              cy: "36",
              r: "18",
              fill: "hsl(var(--primary)/0.15)",
              stroke: "hsl(var(--primary)/0.4)",
              strokeWidth: "1.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M16 30 Q32 20 48 30",
              stroke: "hsl(var(--primary)/0.5)",
              strokeWidth: "1.5",
              fill: "none",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M14 38 Q32 28 50 38",
              stroke: "hsl(var(--primary)/0.4)",
              strokeWidth: "1.5",
              fill: "none",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M16 46 Q32 36 48 46",
              stroke: "hsl(var(--primary)/0.3)",
              strokeWidth: "1.5",
              fill: "none",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M32 18 L32 8 Q32 4 36 4 Q40 4 40 8 Q40 12 36 12",
              stroke: "hsl(var(--secondary)/0.7)",
              strokeWidth: "2",
              fill: "none",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "20", r: "1.5", fill: "hsl(var(--primary)/0.4)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "44", cy: "16", r: "1", fill: "hsl(var(--secondary)/0.5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "28", r: "1.5", fill: "hsl(var(--primary)/0.3)" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-semibold text-muted-foreground opacity-60 tracking-wide", children: initials })
  ] });
}
function buildFullWhatsAppMessage(items, subtotal, delivery, total, form) {
  const itemLines = items.map(
    (item) => `  • ${item.product.name} × ${item.quantity} = ₹${item.product.price * item.quantity}`
  );
  const lines = [
    "Hello! I'd like to place an order from The Cozy Hook 🧶",
    "",
    "👤 *Customer Details*",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Address: ${form.address}`,
    ...form.notes ? [`Notes: ${form.notes}`] : [],
    "",
    "🛍️ *Order Summary*",
    ...itemLines,
    "",
    `Subtotal: ₹${subtotal}`,
    delivery === 0 ? "Delivery: FREE 🎉" : `Delivery: ₹${delivery}`,
    `*Total: ₹${total}*`,
    "",
    "Please confirm availability. Thank you! 🌸"
  ];
  const msg = lines.join("\n");
  return `https://wa.me/918660099085?text=${encodeURIComponent(msg)}`;
}
function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const { subtotal, delivery, total, itemCount } = useCartTotals();
  const navigate = useNavigate();
  const [imgErrors, setImgErrors] = reactExports.useState({});
  const [form, setForm] = reactExports.useState({
    name: "",
    address: "",
    phone: "",
    notes: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [ordered, setOrdered] = reactExports.useState(false);
  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.address.trim())
      newErrors.address = "Delivery address is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9+\s\-()]{7,15}$/.test(form.phone.trim()))
      newErrors.phone = "Enter a valid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  function handleOrder() {
    if (!validate()) return;
    const url = buildFullWhatsAppMessage(
      items,
      subtotal,
      delivery,
      total,
      form
    );
    window.open(url, "_blank");
    setOrdered(true);
    clearCart();
    setTimeout(() => navigate({ to: "/" }), 3e3);
  }
  if (ordered) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4",
        "data-ocid": "cart.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              viewBox: "0 0 24 24",
              fill: "currentColor",
              className: "w-10 h-10 text-primary",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Order sent! 🌸" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-sm", children: "Your order details have been sent to WhatsApp. We'll confirm your order shortly. Redirecting you home…" })
          ] })
        ]
      }
    );
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4",
        "data-ocid": "cart.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-3xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Your cart is empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "Explore our handmade collection and find something you'll love" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "rounded-xl font-body px-8",
              "data-ocid": "cart.shop_now_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", children: "Shop Now" })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10",
      "data-ocid": "cart.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground", children: "Your Cart" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-body mt-1", children: [
                itemCount,
                " ",
                itemCount === 1 ? "item" : "items",
                " ready for order"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-card rounded-2xl border border-border overflow-hidden",
                "data-ocid": "cart.items_list",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    layout: true,
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, x: -20 },
                    transition: { delay: i * 0.05 },
                    className: `flex gap-4 p-4 ${i < items.length - 1 ? "border-b border-border" : ""}`,
                    "data-ocid": `cart.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0", children: imgErrors[item.product.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductPlaceholder, { name: item.product.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: item.product.imagePath,
                          alt: item.product.name,
                          onError: () => setImgErrors((prev) => ({
                            ...prev,
                            [item.product.id]: true
                          })),
                          className: "w-full h-full object-cover"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-foreground truncate", children: item.product.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs font-body mt-0.5", children: [
                              "₹",
                              item.product.price,
                              " each"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => removeItem(item.product.id),
                              className: "p-1 text-muted-foreground hover:text-destructive transition-smooth shrink-0",
                              "aria-label": "Remove item",
                              "data-ocid": `cart.delete_button.${i + 1}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-muted rounded-xl", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => updateQuantity(item.product.id, item.quantity - 1),
                                className: "p-2 hover:bg-border rounded-xl transition-smooth",
                                "aria-label": "Decrease quantity",
                                "data-ocid": `cart.qty_minus.${i + 1}`,
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-medium w-6 text-center", children: item.quantity }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => updateQuantity(item.product.id, item.quantity + 1),
                                className: "p-2 hover:bg-border rounded-xl transition-smooth",
                                "aria-label": "Increase quantity",
                                "data-ocid": `cart.qty_plus.${i + 1}`,
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-body font-semibold text-foreground", children: [
                            "₹",
                            item.product.price * item.quantity
                          ] })
                        ] })
                      ] })
                    ]
                  },
                  item.product.id
                )) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.15, duration: 0.4 },
                className: "bg-card rounded-2xl border border-border p-6 space-y-5",
                "data-ocid": "cart.order_form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Delivery Details" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body mt-0.5", children: "Fill in your details and we'll confirm via WhatsApp" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "cart-name", className: "font-body text-sm", children: [
                      "Full Name ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "cart-name",
                        placeholder: "e.g. Anjali Sharma",
                        value: form.name,
                        onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                        onBlur: validate,
                        className: `rounded-xl font-body ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`,
                        "data-ocid": "cart.name_input"
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-destructive text-xs font-body",
                        "data-ocid": "cart.name_field_error",
                        children: errors.name
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "cart-address", className: "font-body text-sm", children: [
                      "Delivery Address ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "cart-address",
                        placeholder: "House/flat no., street, area, city, pincode",
                        value: form.address,
                        onChange: (e) => setForm((f) => ({ ...f, address: e.target.value })),
                        onBlur: validate,
                        rows: 3,
                        className: `rounded-xl font-body resize-none ${errors.address ? "border-destructive focus-visible:ring-destructive" : ""}`,
                        "data-ocid": "cart.address_input"
                      }
                    ),
                    errors.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-destructive text-xs font-body",
                        "data-ocid": "cart.address_field_error",
                        children: errors.address
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "cart-phone", className: "font-body text-sm", children: [
                      "Phone Number ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "cart-phone",
                        type: "tel",
                        placeholder: "e.g. +91 98765 43210",
                        value: form.phone,
                        onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                        onBlur: validate,
                        className: `rounded-xl font-body ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`,
                        "data-ocid": "cart.phone_input"
                      }
                    ),
                    errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-destructive text-xs font-body",
                        "data-ocid": "cart.phone_field_error",
                        children: errors.phone
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "cart-notes", className: "font-body text-sm", children: [
                      "Order Specifications / Notes",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "cart-notes",
                        placeholder: "Color preferences, size, special requests…",
                        value: form.notes,
                        onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })),
                        rows: 3,
                        className: "rounded-xl font-body resize-none",
                        "data-ocid": "cart.notes_input"
                      }
                    )
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.2, duration: 0.4 },
              className: "lg:col-span-2 bg-card rounded-2xl border border-border p-6 space-y-4 sticky top-24",
              "data-ocid": "cart.summary_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Order Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-body text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Subtotal (",
                      itemCount,
                      " items)"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "₹",
                      subtotal
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-body text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: delivery === 0 ? "text-secondary font-medium" : "",
                        children: delivery === 0 ? "FREE 🎉" : `₹${delivery}`
                      }
                    )
                  ] }),
                  delivery > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body bg-muted/60 rounded-xl px-3 py-2", children: [
                    "Add ₹",
                    FREE_DELIVERY_THRESHOLD - subtotal,
                    " more for free delivery"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-semibold text-foreground text-lg", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "₹",
                    total
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "w-full rounded-xl gap-2 font-body text-sm py-5",
                    onClick: handleOrder,
                    "data-ocid": "cart.order_now_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "svg",
                        {
                          viewBox: "0 0 24 24",
                          className: "w-4 h-4",
                          fill: "currentColor",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
                        }
                      ),
                      "Order Now via WhatsApp"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs font-body text-muted-foreground", children: "You'll be redirected to WhatsApp with your order details pre-filled" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    asChild: true,
                    className: "w-full rounded-xl font-body text-xs text-muted-foreground",
                    "data-ocid": "cart.continue_shopping_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", children: "← Continue Shopping" })
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  CartPage
};
