import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  Gift,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ProductPlaceholder } from "../components/ProductPlaceholder";
import {
  DELIVERY_CHARGE,
  FREE_DELIVERY_THRESHOLD,
  useCart,
  useCartTotals,
} from "../hooks/useCart";
import type { CartItem } from "../types/product";

interface OrderForm {
  name: string;
  address: string;
  phone: string;
  deliveryDate: string;
  giftMessage: string;
  colourSizePrefs: string;
  heardAbout: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  address?: string;
  phone?: string;
}

const GIFT_WRAP_CHARGE = 49;

const HEARD_ABOUT_OPTIONS = [
  { value: "", label: "select an option" },
  { value: "instagram", label: "instagram" },
  { value: "whatsapp", label: "whatsapp" },
  { value: "a friend recommended", label: "a friend recommended" },
  { value: "google search", label: "google search" },
  { value: "other", label: "other" },
];

function buildFullWhatsAppMessage(
  items: CartItem[],
  subtotal: number,
  delivery: number,
  total: number,
  form: OrderForm,
  giftWrapping: boolean,
): string {
  const itemLines = items.map(
    (item) =>
      `  • ${item.product.name} × ${item.quantity} = ₹${item.product.price * item.quantity}`,
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
    ...(giftWrapping ? [`gift wrapping: ₹${GIFT_WRAP_CHARGE} 🎁`] : []),
    `*total: ₹${total}*`,
    "",
    ...(form.deliveryDate
      ? [`📅 preferred delivery date: ${form.deliveryDate}`]
      : []),
    ...(form.giftMessage ? [`🎁 gift message: ${form.giftMessage}`] : []),
    ...(form.colourSizePrefs
      ? [`🎨 colour/size preferences: ${form.colourSizePrefs}`]
      : []),
    ...(form.heardAbout
      ? [`📣 how they heard about us: ${form.heardAbout}`]
      : []),
    ...(form.notes ? [`📝 special instructions: ${form.notes}`] : []),
    "",
    "please confirm availability. thank you! 🌸",
  ];

  const msg = lines.join("\n");
  return `https://wa.me/918660099085?text=${encodeURIComponent(msg)}`;
}

// ── Reusable styled sub-components ──────────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
}: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2
        className="font-display text-base font-semibold tracking-wide"
        style={{ color: "#D8A7B1" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-xs font-body mt-0.5">
          {subtitle}
        </p>
      )}
      <div
        className="mt-2 h-px w-10 rounded-full"
        style={{
          background: "linear-gradient(90deg, #D8A7B1 0%, #E8DED3 100%)",
        }}
      />
    </div>
  );
}

function FieldHint({ children }: { children: string }) {
  return (
    <p className="text-xs font-body italic mt-1" style={{ color: "#B0A09A" }}>
      {children}
    </p>
  );
}

const inputClass =
  "rounded-xl font-body bg-background border-border focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-muted-foreground/60 transition-all duration-200";

const labelClass =
  "font-body text-xs font-medium tracking-wide text-foreground/70 mb-1";

// ── CartPage ─────────────────────────────────────────────────────────────────

export function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const { subtotal, delivery, itemCount } = useCartTotals();
  const navigate = useNavigate();
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [saveDetails, setSaveDetails] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [giftWrapping, setGiftWrapping] = useState(false);
  const giftWrapCharge = giftWrapping ? GIFT_WRAP_CHARGE : 0;
  const total = subtotal + delivery + giftWrapCharge;
  const [form, setForm] = useState<OrderForm>({
    name: "",
    address: "",
    phone: "",
    deliveryDate: "",
    giftMessage: "",
    colourSizePrefs: "",
    heardAbout: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [ordered, setOrdered] = useState(false);

  // Pre-fill saved details on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cozyhook_saved_details");
      if (saved) {
        const parsed = JSON.parse(saved) as {
          name?: string;
          phone?: string;
          address?: string;
        };
        setForm((f) => ({
          ...f,
          name: parsed.name ?? "",
          phone: parsed.phone ?? "",
          address: parsed.address ?? "",
        }));
        setHasSaved(true);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  function clearSavedDetails() {
    localStorage.removeItem("cozyhook_saved_details");
    setHasSaved(false);
    setForm((f) => ({ ...f, name: "", phone: "", address: "" }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
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
      giftWrapping,
    );
    window.open(url, "_blank");
    if (saveDetails) {
      localStorage.setItem(
        "cozyhook_saved_details",
        JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
        }),
      );
    }
    setOrdered(true);
    clearCart();
    navigate({
      to: "/order-confirmed",
      search: {
        name: form.name,
        total,
        itemCount,
      },
    });
  }

  // Navigation happens immediately in handleOrder; this block is a fallback
  if (ordered) return null;

  if (items.length === 0) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4"
        data-ocid="cart.empty_state"
      >
        <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
            your cart is empty
          </h2>
          <p className="text-muted-foreground font-body">
            explore our handmade collection and find something you'll love
          </p>
        </div>
        <Button
          asChild
          className="rounded-xl font-body px-8"
          data-ocid="cart.shop_now_button"
        >
          <Link to="/collection">shop now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      data-ocid="cart.page"
    >
      {/* Page heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="font-display text-3xl font-semibold text-foreground">
          your cart
        </h1>
        <p className="text-muted-foreground font-body mt-1 text-sm">
          {itemCount} {itemCount === 1 ? "item" : "items"} ready to order
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* ── LEFT: Form ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-6">
          {/* Cart items */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-border overflow-hidden"
            style={{ background: "#FDFBF8" }}
            data-ocid="cart.items_list"
          >
            <div className="px-5 pt-5 pb-3">
              <SectionHeader
                title="order items"
                subtitle={`${itemCount} handmade ${itemCount === 1 ? "piece" : "pieces"} selected`}
              />
            </div>
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex gap-4 px-5 py-4 ${
                    i < items.length - 1 ? "border-b border-border" : ""
                  }`}
                  data-ocid={`cart.item.${i + 1}`}
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                    {imgErrors[item.product.id] ? (
                      <ProductPlaceholder name={item.product.name} />
                    ) : (
                      <img
                        src={item.product.imagePath}
                        alt={item.product.name}
                        onError={() =>
                          setImgErrors((prev) => ({
                            ...prev,
                            [item.product.id]: true,
                          }))
                        }
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-display text-sm font-semibold text-foreground truncate">
                          {item.product.name}
                        </p>
                        <p className="text-muted-foreground text-xs font-body mt-0.5">
                          ₹{item.product.price} each
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-smooth shrink-0 rounded-lg hover:bg-destructive/10"
                        aria-label="Remove item"
                        data-ocid={`cart.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 bg-muted rounded-xl">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-border rounded-xl transition-smooth"
                          aria-label="Decrease quantity"
                          data-ocid={`cart.qty_minus.${i + 1}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-body font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-border rounded-xl transition-smooth"
                          aria-label="Increase quantity"
                          data-ocid={`cart.qty_plus.${i + 1}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-body font-semibold text-foreground">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── Customer Details Section ─── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="rounded-2xl border border-border p-6"
            style={{ background: "#FDFBF8" }}
            data-ocid="cart.order_form"
          >
            <SectionHeader
              title="your details"
              subtitle="fill in your details and we'll confirm via whatsapp"
            />

            <div className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="cart-name" className={labelClass}>
                  full name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cart-name"
                  placeholder="e.g. anjali sharma"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  onBlur={validate}
                  className={`${inputClass} ${
                    errors.name
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  data-ocid="cart.name_input"
                />
                {errors.name && (
                  <p
                    className="text-destructive text-xs font-body"
                    data-ocid="cart.name_field_error"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <Label htmlFor="cart-address" className={labelClass}>
                  delivery address <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="cart-address"
                  placeholder="house/flat no., street, area, city, pincode"
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  onBlur={validate}
                  rows={3}
                  className={`${inputClass} resize-none ${
                    errors.address
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  data-ocid="cart.address_input"
                />
                {errors.address && (
                  <p
                    className="text-destructive text-xs font-body"
                    data-ocid="cart.address_field_error"
                  >
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="cart-phone" className={labelClass}>
                  phone number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cart-phone"
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  onBlur={validate}
                  className={`${inputClass} ${
                    errors.phone
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  data-ocid="cart.phone_input"
                />
                {errors.phone && (
                  <p
                    className="text-destructive text-xs font-body"
                    data-ocid="cart.phone_field_error"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Saved details notice */}
              {hasSaved && (
                <p
                  className="text-xs font-body italic leading-relaxed"
                  style={{ color: "#B0A09A" }}
                >
                  your details were saved from last time.{" "}
                  <button
                    type="button"
                    onClick={clearSavedDetails}
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                    data-ocid="cart.clear_saved_button"
                  >
                    want to clear them?
                  </button>
                </p>
              )}

              {/* Save my details checkbox */}
              <label
                className="flex items-center gap-3 cursor-pointer group"
                htmlFor="cart-save-details"
              >
                <div className="relative flex items-center">
                  <input
                    id="cart-save-details"
                    type="checkbox"
                    checked={saveDetails}
                    onChange={(e) => setSaveDetails(e.target.checked)}
                    className="peer sr-only"
                    data-ocid="cart.save_details_checkbox"
                  />
                  <div
                    className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 peer-checked:border-transparent"
                    style={{
                      borderColor: saveDetails ? "#D8A7B1" : "#D1C4BC",
                      background: saveDetails ? "#D8A7B1" : "transparent",
                    }}
                  >
                    {saveDetails && (
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                        aria-hidden="true"
                      >
                        <polyline points="2 6 5 9 10 3" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  save my details for next time
                </span>
              </label>
            </div>
          </motion.div>

          {/* ── Delivery & Gift Details Section ─── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.4 }}
            className="rounded-2xl border border-border p-6"
            style={{ background: "#FDFBF8" }}
            data-ocid="cart.extra_details_form"
          >
            <SectionHeader
              title="delivery & gift details"
              subtitle="optional — help us make your order extra special"
            />

            <div className="space-y-5">
              {/* Preferred delivery date */}
              <div className="space-y-1.5">
                <Label htmlFor="cart-delivery-date" className={labelClass}>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    preferred delivery date
                  </span>
                </Label>
                <Input
                  id="cart-delivery-date"
                  type="date"
                  value={form.deliveryDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, deliveryDate: e.target.value }))
                  }
                  className={`${inputClass} [color-scheme:light]`}
                  data-ocid="cart.delivery_date_input"
                />
                <FieldHint>we'll do our best to deliver by this date</FieldHint>
              </div>

              {/* Gift message */}
              <div className="space-y-1.5">
                <Label htmlFor="cart-gift-message" className={labelClass}>
                  gift message (optional)
                </Label>
                <Textarea
                  id="cart-gift-message"
                  placeholder="add a personal note for the recipient…"
                  value={form.giftMessage}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, giftMessage: e.target.value }))
                  }
                  rows={3}
                  className={`${inputClass} resize-none`}
                  data-ocid="cart.gift_message_input"
                />
                <FieldHint>
                  we'll include it with your order — perfect for gifts! 🎁
                </FieldHint>
              </div>

              {/* Colour / size preferences */}
              <div className="space-y-1.5">
                <Label htmlFor="cart-colour-prefs" className={labelClass}>
                  colour or size preferences (optional)
                </Label>
                <Input
                  id="cart-colour-prefs"
                  placeholder="e.g. pastel pink bunny, medium size…"
                  value={form.colourSizePrefs}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, colourSizePrefs: e.target.value }))
                  }
                  className={inputClass}
                  data-ocid="cart.colour_prefs_input"
                />
                <FieldHint>
                  any specific colour requests or size preferences for your
                  items
                </FieldHint>
              </div>

              {/* How did you hear about us */}
              <div className="space-y-1.5">
                <Label htmlFor="cart-heard-about" className={labelClass}>
                  how did you hear about us?
                </Label>
                <div className="relative">
                  <select
                    id="cart-heard-about"
                    value={form.heardAbout}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, heardAbout: e.target.value }))
                    }
                    className="w-full rounded-xl font-body text-sm bg-background border border-input px-3 py-2.5 pr-9 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground transition-all duration-200 cursor-pointer"
                    data-ocid="cart.heard_about_select"
                  >
                    {HEARD_ABOUT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Special instructions */}
              <div className="space-y-1.5">
                <Label htmlFor="cart-notes" className={labelClass}>
                  special instructions (optional)
                </Label>
                <Textarea
                  id="cart-notes"
                  placeholder="any other instructions for your order…"
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  rows={3}
                  className={`${inputClass} resize-none`}
                  data-ocid="cart.notes_input"
                />
                <FieldHint>any other instructions for your order</FieldHint>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Order Summary ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.22, duration: 0.4 }}
          className="lg:col-span-2 rounded-2xl border border-border p-6 space-y-5 sticky top-24"
          style={{ background: "#FDFBF8" }}
          data-ocid="cart.summary_panel"
        >
          <SectionHeader title="order summary" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-body text-muted-foreground">
              <span>subtotal ({itemCount} items)</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm font-body text-muted-foreground">
              <span>delivery</span>
              <span
                className={delivery === 0 ? "text-secondary font-semibold" : ""}
              >
                {delivery === 0 ? "free 🎉" : `₹${delivery}`}
              </span>
            </div>
            {delivery > 0 && (
              <p className="text-xs text-muted-foreground font-body bg-muted/60 rounded-xl px-3 py-2 leading-relaxed">
                add ₹{FREE_DELIVERY_THRESHOLD - subtotal} more for free delivery
              </p>
            )}

            {/* Gift wrapping toggle */}
            <button
              type="button"
              className="flex items-center justify-between w-full rounded-xl px-3 py-2.5 border border-border/50 cursor-pointer select-none text-left"
              style={{
                background: giftWrapping
                  ? "oklch(0.88 0.05 5 / 0.18)"
                  : "transparent",
              }}
              onClick={() => setGiftWrapping((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setGiftWrapping((v) => !v);
                }
              }}
              data-ocid="cart.gift_wrap_toggle"
            >
              <label
                className="flex items-center gap-2.5 cursor-pointer"
                htmlFor="gift-wrap-checkbox"
              >
                <div
                  className="w-4.5 h-4.5 rounded flex items-center justify-center border-2 transition-all duration-200"
                  style={{
                    width: 18,
                    height: 18,
                    borderColor: giftWrapping ? "#D8A7B1" : "#D1C4BC",
                    background: giftWrapping ? "#D8A7B1" : "transparent",
                  }}
                >
                  {giftWrapping && (
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                    >
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  )}
                </div>
                <input
                  id="gift-wrap-checkbox"
                  type="checkbox"
                  className="sr-only"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                  data-ocid="cart.gift_wrap_checkbox"
                />
                <span className="flex items-center gap-1.5 font-body text-xs text-foreground/80">
                  <Gift className="w-3.5 h-3.5" style={{ color: "#D8A7B1" }} />
                  add gift wrapping
                </span>
              </label>
              <span
                className="font-body text-xs font-semibold"
                style={{ color: "#D8A7B1" }}
              >
                +₹{GIFT_WRAP_CHARGE}
              </span>
            </button>

            {giftWrapping && (
              <div className="flex justify-between text-xs font-body text-muted-foreground">
                <span>gift wrapping</span>
                <span>₹{GIFT_WRAP_CHARGE}</span>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex justify-between font-display font-semibold text-foreground text-lg">
            <span>total</span>
            <span>₹{total}</span>
          </div>

          {/* WhatsApp CTA */}
          <button
            type="button"
            onClick={handleOrder}
            className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-4 px-6 font-body text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
            style={{
              background: "#D8A7B1",
              color: "#fff",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#C9929F";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#D8A7B1";
            }}
            data-ocid="cart.order_now_button"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 shrink-0"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            order now via whatsapp
          </button>

          <p className="text-center text-xs font-body text-muted-foreground leading-relaxed">
            you'll be redirected to whatsapp with your order details pre-filled
            💬
          </p>

          <Separator />

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="w-full rounded-xl font-body text-xs text-muted-foreground hover:text-foreground"
            data-ocid="cart.continue_shopping_button"
          >
            <Link to="/collection">← continue shopping</Link>
          </Button>

          {/* Delivery info pill */}
          <div
            className="rounded-xl px-4 py-3 text-xs font-body leading-relaxed text-center"
            style={{ background: "#F0EBE6", color: "#8A7A74" }}
          >
            🚚 delivery: ₹{DELIVERY_CHARGE} · free above ₹
            {FREE_DELIVERY_THRESHOLD}
            <br />
            estimated: 5–7 working days
          </div>
        </motion.div>
      </div>
    </div>
  );
}
