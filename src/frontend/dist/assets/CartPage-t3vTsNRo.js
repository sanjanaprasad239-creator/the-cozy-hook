import { c as createLucideIcon, j as jsxRuntimeExports, e as useCart, P as useCartTotals, u as useNavigate, r as reactExports, S as ShoppingBag, B as Button, L as Link, m as motion, A as AnimatePresence, Q as FREE_DELIVERY_THRESHOLD, R as DELIVERY_CHARGE } from "./index-B6J4yjYJ.js";
import { L as Label, I as Input } from "./label-DMhXSekG.js";
import { S as Separator } from "./separator-CEUCrHxw.js";
import { M as Minus, T as Textarea } from "./textarea-Bjsn-tyx.js";
import { T as Trash2 } from "./trash-2-ARn9qJdz.js";
import { P as Plus } from "./plus-BNj9e0ie.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
];
const Gift = createLucideIcon("gift", __iconNode);
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
const GIFT_WRAP_CHARGE = 49;
const HEARD_ABOUT_OPTIONS = [
  { value: "", label: "select an option" },
  { value: "instagram", label: "instagram" },
  { value: "whatsapp", label: "whatsapp" },
  { value: "a friend recommended", label: "a friend recommended" },
  { value: "google search", label: "google search" },
  { value: "other", label: "other" }
];
function buildFullWhatsAppMessage(items, subtotal, delivery, total, form, giftWrapping) {
  const itemLines = items.map(
    (item) => `  • ${item.product.name} × ${item.quantity} = ₹${item.product.price * item.quantity}`
  );
  const lines = [
    "🎀 new order from the cozy hook",
    "",
    "👤 *customer details*",
    `name: ${form.name}`,
    `phone: ${form.phone}`,
    `address: ${form.address}`,
    "",
    "📦 *order items*",
    ...itemLines,
    "",
    "💰 *order summary*",
    `subtotal: ₹${subtotal}`,
    delivery === 0 ? "delivery: free 🎉" : `delivery: ₹${delivery}`,
    ...giftWrapping ? [`gift wrapping: ₹${GIFT_WRAP_CHARGE} 🎁`] : [],
    `*total: ₹${total}*`,
    "",
    ...form.deliveryDate ? [`📅 preferred delivery date: ${form.deliveryDate}`] : [],
    ...form.giftMessage ? [`🎁 gift message: ${form.giftMessage}`] : [],
    ...form.colourSizePrefs ? [`🎨 colour/size preferences: ${form.colourSizePrefs}`] : [],
    ...form.heardAbout ? [`📣 how they heard about us: ${form.heardAbout}`] : [],
    ...form.notes ? [`📝 special instructions: ${form.notes}`] : [],
    "",
    "please confirm availability. thank you! 🌸"
  ];
  const msg = lines.join("\n");
  return `https://wa.me/918660099085?text=${encodeURIComponent(msg)}`;
}
function SectionHeader({
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        className: "font-display text-base font-semibold tracking-wide",
        style: { color: "#D8A7B1" },
        children: title
      }
    ),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-body mt-0.5", children: subtitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mt-2 h-px w-10 rounded-full",
        style: {
          background: "linear-gradient(90deg, #D8A7B1 0%, #E8DED3 100%)"
        }
      }
    )
  ] });
}
function FieldHint({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body italic mt-1", style: { color: "#B0A09A" }, children });
}
const inputClass = "rounded-xl font-body bg-background border-border focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-muted-foreground/60 transition-all duration-200";
const labelClass = "font-body text-xs font-medium tracking-wide text-foreground/70 mb-1";
function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const { subtotal, delivery, itemCount } = useCartTotals();
  const navigate = useNavigate();
  const [imgErrors, setImgErrors] = reactExports.useState({});
  const [saveDetails, setSaveDetails] = reactExports.useState(false);
  const [hasSaved, setHasSaved] = reactExports.useState(false);
  const [giftWrapping, setGiftWrapping] = reactExports.useState(false);
  const giftWrapCharge = giftWrapping ? GIFT_WRAP_CHARGE : 0;
  const total = subtotal + delivery + giftWrapCharge;
  const [form, setForm] = reactExports.useState({
    name: "",
    address: "",
    phone: "",
    deliveryDate: "",
    giftMessage: "",
    colourSizePrefs: "",
    heardAbout: "",
    notes: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [ordered, setOrdered] = reactExports.useState(false);
  reactExports.useEffect(() => {
    try {
      const saved = localStorage.getItem("cozyhook_saved_details");
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm((f) => ({
          ...f,
          name: parsed.name ?? "",
          phone: parsed.phone ?? "",
          address: parsed.address ?? ""
        }));
        setHasSaved(true);
      }
    } catch {
    }
  }, []);
  function clearSavedDetails() {
    localStorage.removeItem("cozyhook_saved_details");
    setHasSaved(false);
    setForm((f) => ({ ...f, name: "", phone: "", address: "" }));
  }
  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "full name is required";
    if (!form.address.trim())
      newErrors.address = "delivery address is required";
    if (!form.phone.trim()) newErrors.phone = "phone number is required";
    else if (!/^[0-9+\s\-()]{7,15}$/.test(form.phone.trim()))
      newErrors.phone = "enter a valid phone number";
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
      form,
      giftWrapping
    );
    window.open(url, "_blank");
    if (saveDetails) {
      localStorage.setItem(
        "cozyhook_saved_details",
        JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address
        })
      );
    }
    setOrdered(true);
    clearCart();
    navigate({
      to: "/order-confirmed",
      search: {
        name: form.name,
        total,
        itemCount
      }
    });
  }
  if (ordered) return null;
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4",
        "data-ocid": "cart.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-3xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "your cart is empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "explore our handmade collection and find something you'll love" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "rounded-xl font-body px-8",
              "data-ocid": "cart.shop_now_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", children: "shop now" })
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
      "data-ocid": "cart.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "mb-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold text-foreground", children: "your cart" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-body mt-1 text-sm", children: [
                itemCount,
                " ",
                itemCount === 1 ? "item" : "items",
                " ready to order"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.35 },
                className: "rounded-2xl border border-border overflow-hidden",
                style: { background: "#FDFBF8" },
                "data-ocid": "cart.items_list",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pt-5 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      title: "order items",
                      subtitle: `${itemCount} handmade ${itemCount === 1 ? "piece" : "pieces"} selected`
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      layout: true,
                      initial: { opacity: 0, y: 12 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, x: -20 },
                      transition: { delay: i * 0.05 },
                      className: `flex gap-4 px-5 py-4 ${i < items.length - 1 ? "border-b border-border" : ""}`,
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
                                className: "p-1.5 text-muted-foreground hover:text-destructive transition-smooth shrink-0 rounded-lg hover:bg-destructive/10",
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
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.1, duration: 0.4 },
                className: "rounded-2xl border border-border p-6",
                style: { background: "#FDFBF8" },
                "data-ocid": "cart.order_form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      title: "your details",
                      subtitle: "fill in your details and we'll confirm via whatsapp"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "cart-name", className: labelClass, children: [
                        "full name ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "cart-name",
                          placeholder: "e.g. anjali sharma",
                          value: form.name,
                          onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                          onBlur: validate,
                          className: `${inputClass} ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`,
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
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "cart-address", className: labelClass, children: [
                        "delivery address ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          id: "cart-address",
                          placeholder: "house/flat no., street, area, city, pincode",
                          value: form.address,
                          onChange: (e) => setForm((f) => ({ ...f, address: e.target.value })),
                          onBlur: validate,
                          rows: 3,
                          className: `${inputClass} resize-none ${errors.address ? "border-destructive focus-visible:ring-destructive" : ""}`,
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
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "cart-phone", className: labelClass, children: [
                        "phone number ",
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
                          className: `${inputClass} ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`,
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
                    hasSaved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-xs font-body italic leading-relaxed",
                        style: { color: "#B0A09A" },
                        children: [
                          "your details were saved from last time.",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: clearSavedDetails,
                              className: "underline underline-offset-2 hover:text-foreground transition-colors",
                              "data-ocid": "cart.clear_saved_button",
                              children: "want to clear them?"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: "flex items-center gap-3 cursor-pointer group",
                        htmlFor: "cart-save-details",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                id: "cart-save-details",
                                type: "checkbox",
                                checked: saveDetails,
                                onChange: (e) => setSaveDetails(e.target.checked),
                                className: "peer sr-only",
                                "data-ocid": "cart.save_details_checkbox"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 peer-checked:border-transparent",
                                style: {
                                  borderColor: saveDetails ? "#D8A7B1" : "#D1C4BC",
                                  background: saveDetails ? "#D8A7B1" : "transparent"
                                },
                                children: saveDetails && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "svg",
                                  {
                                    viewBox: "0 0 12 12",
                                    fill: "none",
                                    stroke: "#fff",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    className: "w-3 h-3",
                                    "aria-hidden": "true",
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "2 6 5 9 10 3" })
                                  }
                                )
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors", children: "save my details for next time" })
                        ]
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.18, duration: 0.4 },
                className: "rounded-2xl border border-border p-6",
                style: { background: "#FDFBF8" },
                "data-ocid": "cart.extra_details_form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      title: "delivery & gift details",
                      subtitle: "optional — help us make your order extra special"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cart-delivery-date", className: labelClass, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5" }),
                        "preferred delivery date"
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "cart-delivery-date",
                          type: "date",
                          value: form.deliveryDate,
                          onChange: (e) => setForm((f) => ({ ...f, deliveryDate: e.target.value })),
                          className: `${inputClass} [color-scheme:light]`,
                          "data-ocid": "cart.delivery_date_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldHint, { children: "we'll do our best to deliver by this date" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cart-gift-message", className: labelClass, children: "gift message (optional)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          id: "cart-gift-message",
                          placeholder: "add a personal note for the recipient…",
                          value: form.giftMessage,
                          onChange: (e) => setForm((f) => ({ ...f, giftMessage: e.target.value })),
                          rows: 3,
                          className: `${inputClass} resize-none`,
                          "data-ocid": "cart.gift_message_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldHint, { children: "we'll include it with your order — perfect for gifts! 🎁" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cart-colour-prefs", className: labelClass, children: "colour or size preferences (optional)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "cart-colour-prefs",
                          placeholder: "e.g. pastel pink bunny, medium size…",
                          value: form.colourSizePrefs,
                          onChange: (e) => setForm((f) => ({ ...f, colourSizePrefs: e.target.value })),
                          className: inputClass,
                          "data-ocid": "cart.colour_prefs_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldHint, { children: "any specific colour requests or size preferences for your items" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cart-heard-about", className: labelClass, children: "how did you hear about us?" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "select",
                          {
                            id: "cart-heard-about",
                            value: form.heardAbout,
                            onChange: (e) => setForm((f) => ({ ...f, heardAbout: e.target.value })),
                            className: "w-full rounded-xl font-body text-sm bg-background border border-input px-3 py-2.5 pr-9 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground transition-all duration-200 cursor-pointer",
                            "data-ocid": "cart.heard_about_select",
                            children: HEARD_ABOUT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 right-3 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "svg",
                          {
                            "aria-hidden": "true",
                            className: "w-4 h-4 text-muted-foreground",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            strokeWidth: 2,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M19 9l-7 7-7-7"
                              }
                            )
                          }
                        ) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cart-notes", className: labelClass, children: "special instructions (optional)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          id: "cart-notes",
                          placeholder: "any other instructions for your order…",
                          value: form.notes,
                          onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })),
                          rows: 3,
                          className: `${inputClass} resize-none`,
                          "data-ocid": "cart.notes_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldHint, { children: "any other instructions for your order" })
                    ] })
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
              transition: { delay: 0.22, duration: 0.4 },
              className: "lg:col-span-2 rounded-2xl border border-border p-6 space-y-5 sticky top-24",
              style: { background: "#FDFBF8" },
              "data-ocid": "cart.summary_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "order summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-body text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "subtotal (",
                      itemCount,
                      " items)"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "₹",
                      subtotal
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-body text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "delivery" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: delivery === 0 ? "text-secondary font-semibold" : "",
                        children: delivery === 0 ? "free 🎉" : `₹${delivery}`
                      }
                    )
                  ] }),
                  delivery > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body bg-muted/60 rounded-xl px-3 py-2 leading-relaxed", children: [
                    "add ₹",
                    FREE_DELIVERY_THRESHOLD - subtotal,
                    " more for free delivery"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "gift-wrap-checkbox",
                      className: "flex items-center justify-between w-full rounded-xl px-3 py-2.5 border border-border/50 cursor-pointer select-none",
                      style: {
                        background: giftWrapping ? "oklch(0.88 0.05 5 / 0.18)" : "transparent"
                      },
                      "data-ocid": "cart.gift_wrap_toggle",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "gift-wrap-checkbox",
                            type: "checkbox",
                            className: "sr-only",
                            checked: giftWrapping,
                            onChange: (e) => setGiftWrapping(e.target.checked),
                            "data-ocid": "cart.gift_wrap_checkbox"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "rounded flex items-center justify-center border-2 transition-all duration-200",
                              style: {
                                width: 18,
                                height: 18,
                                borderColor: giftWrapping ? "#D8A7B1" : "#D1C4BC",
                                background: giftWrapping ? "#D8A7B1" : "transparent"
                              },
                              children: giftWrapping && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "svg",
                                {
                                  viewBox: "0 0 12 12",
                                  fill: "none",
                                  stroke: "#fff",
                                  strokeWidth: "2",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  className: "w-2.5 h-2.5",
                                  "aria-hidden": "true",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "2 6 5 9 10 3" })
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-body text-xs text-foreground/80", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-3.5 h-3.5", style: { color: "#D8A7B1" } }),
                            "add gift wrapping"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "font-body text-xs font-semibold",
                            style: { color: "#D8A7B1" },
                            children: [
                              "+₹",
                              GIFT_WRAP_CHARGE
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  giftWrapping && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-body text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "gift wrapping" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "₹",
                      GIFT_WRAP_CHARGE
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-semibold text-foreground text-lg", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "₹",
                    total
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleOrder,
                    className: "w-full flex items-center justify-center gap-2.5 rounded-2xl py-4 px-6 font-body text-sm font-semibold transition-all duration-200 active:scale-[0.98]",
                    style: {
                      background: "#D8A7B1",
                      color: "#fff"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "#C9929F";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = "#D8A7B1";
                    },
                    "data-ocid": "cart.order_now_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "svg",
                        {
                          viewBox: "0 0 24 24",
                          className: "w-4 h-4 shrink-0",
                          fill: "currentColor",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
                        }
                      ),
                      "order now via whatsapp"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs font-body text-muted-foreground leading-relaxed", children: "you'll be redirected to whatsapp with your order details pre-filled 💬" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    asChild: true,
                    className: "w-full rounded-xl font-body text-xs text-muted-foreground hover:text-foreground",
                    "data-ocid": "cart.continue_shopping_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", children: "← continue shopping" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl px-4 py-3 text-xs font-body leading-relaxed text-center",
                    style: { background: "#F0EBE6", color: "#8A7A74" },
                    children: [
                      "🚚 delivery: ₹",
                      DELIVERY_CHARGE,
                      " · free above ₹",
                      FREE_DELIVERY_THRESHOLD,
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "estimated: 5–7 working days"
                    ]
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
