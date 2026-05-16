import { Link } from "@tanstack/react-router";
import { AlertCircle, RotateCcw, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useOrderHistory } from "../hooks/useOrderHistory";
import type { OrderHistoryEntry } from "../types/product";

const WA_NUMBER = "918660099085";

function buildReorderWa(order: OrderHistoryEntry): string {
  const lines = [
    `hi! i'd like to reorder the following items 🛍️`,
    "",
    ...order.items.map(
      (ci) =>
        `• ${ci.product.name} × ${ci.quantity} — ₹${ci.product.price * ci.quantity}`,
    ),
    "",
    `subtotal: ₹${order.subtotal}`,
    `delivery: ₹${order.deliveryCharge}`,
    ...(order.giftWrapping ? ["gift wrapping: yes (+₹50)"] : []),
    `total: ₹${order.total}`,
    "",
    "please confirm availability and share payment/delivery details!",
  ];
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function OrderHistoryPage() {
  const { orders, clearHistory } = useOrderHistory();
  const [confirmClear, setConfirmClear] = useState(false);

  function handleClear() {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearHistory();
    setConfirmClear(false);
  }

  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      data-ocid="order_history.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <p
          className="text-xs font-body tracking-[0.2em] uppercase mb-3"
          style={{ color: "#D8A7B1" }}
        >
          orders placed on this device
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
          your order history
        </h1>
        <div
          className="mt-4 mx-auto w-14 h-0.5 rounded-full"
          style={{ background: "#D8A7B1", opacity: 0.5 }}
        />
        <p className="mt-5 font-body text-sm text-muted-foreground max-w-md mx-auto">
          past orders saved on this device
        </p>
      </motion.div>

      {/* Clear history */}
      {orders.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex justify-end mb-6 gap-3"
        >
          <AnimatePresence mode="wait">
            {confirmClear && (
              <motion.button
                key="cancel"
                type="button"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                onClick={() => setConfirmClear(false)}
                className="font-body text-xs px-4 py-2 rounded-full border border-border hover:bg-muted transition-smooth"
                data-ocid="order_history.cancel_button"
              >
                cancel
              </motion.button>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={handleClear}
            className={`flex items-center gap-1.5 font-body text-xs px-4 py-2 rounded-full transition-smooth ${
              confirmClear
                ? "bg-red-100 text-red-600 border border-red-200 hover:bg-red-200"
                : "border border-border hover:bg-muted text-muted-foreground"
            }`}
            data-ocid="order_history.delete_button"
          >
            <Trash2 size={13} />
            {confirmClear ? "yes, clear all history" : "clear history"}
          </button>
        </motion.div>
      )}

      {/* Orders list or empty */}
      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col items-center justify-center py-24 text-center"
          data-ocid="order_history.empty_state"
        >
          <span className="text-6xl mb-5">🛍️</span>
          <p className="font-display text-xl font-semibold text-foreground mb-2">
            no orders found on this device
          </p>
          <p className="font-body text-sm text-muted-foreground max-w-xs mb-6">
            place your first order and it'll show up right here!
          </p>
          <Link
            to="/collection"
            className="font-body text-sm px-6 py-2.5 rounded-full transition-smooth"
            style={{ background: "#D8A7B1", color: "#fff" }}
            data-ocid="order_history.browse_link"
          >
            browse the collection
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-5" data-ocid="order_history.list">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.07, 0.35) }}
              className="rounded-2xl border border-border/40 bg-card p-6 shadow-soft"
              data-ocid={`order_history.item.${i + 1}`}
            >
              {/* Order header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="font-display text-base font-semibold text-foreground">
                    {order.customerName
                      ? `${order.customerName}'s order`
                      : "your order"}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">
                    {formatDate(order.date)}
                  </p>
                </div>
                <span
                  className="flex-shrink-0 rounded-full px-3 py-1 font-body text-xs font-semibold"
                  style={{ background: "#D8A7B1", color: "#fff" }}
                >
                  ₹{order.total}
                </span>
              </div>

              {/* Items */}
              <ul className="space-y-1.5 mb-4">
                {order.items.map((ci) => (
                  <li
                    key={`${ci.product.id}-${ci.product.name}`}
                    className="flex items-center gap-2 font-body text-sm text-foreground"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#D8A7B1" }}
                      aria-hidden="true"
                    />
                    <span className="flex-1 min-w-0 truncate">
                      {ci.product.name}
                    </span>
                    <span className="text-muted-foreground">
                      ×{ci.quantity}
                    </span>
                    <span className="font-medium">
                      ₹{ci.product.price * ci.quantity}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div
                className="rounded-xl p-3.5 space-y-1 mb-4"
                style={{ background: "oklch(0.94 0.02 5 / 0.35)" }}
              >
                <div className="flex justify-between font-body text-xs text-muted-foreground">
                  <span>subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between font-body text-xs text-muted-foreground">
                  <span>delivery</span>
                  <span>
                    {order.deliveryCharge === 0
                      ? "free"
                      : `₹${order.deliveryCharge}`}
                  </span>
                </div>
                {order.giftWrapping && (
                  <div className="flex justify-between font-body text-xs text-muted-foreground">
                    <span>gift wrapping 🎁</span>
                    <span>₹50</span>
                  </div>
                )}
                <div className="flex justify-between font-body text-sm font-semibold text-foreground pt-1 border-t border-border/40">
                  <span>total</span>
                  <span>₹{order.total}</span>
                </div>
              </div>

              {/* Reorder */}
              <a
                href={buildReorderWa(order)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full font-body text-sm font-semibold transition-smooth hover:opacity-90"
                style={{ background: "#D8A7B1", color: "#fff" }}
                data-ocid={`order_history.reorder_button.${i + 1}`}
              >
                <RotateCcw size={14} />
                reorder via whatsapp
              </a>
            </motion.div>
          ))}
        </div>
      )}

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-10 flex items-start gap-2 rounded-2xl border border-border/30 bg-muted/40 px-5 py-4"
      >
        <AlertCircle
          size={15}
          className="flex-shrink-0 mt-0.5 text-muted-foreground"
        />
        <p className="font-body text-xs text-muted-foreground leading-relaxed">
          orders are saved locally on your device and cleared if you clear
          browser data.
        </p>
      </motion.div>
    </div>
  );
}
