import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { buildWhatsAppMessage, useCart, useCartTotals } from "../hooks/useCart";
import { ProductPlaceholder } from "./ProductPlaceholder";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCart();
  const { subtotal, delivery, total, itemCount } = useCartTotals();
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  function handleCheckout() {
    const url = buildWhatsAppMessage(items, total);
    window.open(url, "_blank");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
            onClick={closeCart}
            data-ocid="cart.backdrop"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-card shadow-boutique-lg z-50 flex flex-col"
            data-ocid="cart.drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Your Cart
                </h2>
                {itemCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-body font-medium rounded-full px-2 py-0.5">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
                aria-label="Close cart"
                data-ocid="cart.close_button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-5 space-y-4">
              {items.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-full gap-4 text-center"
                  data-ocid="cart.empty_state"
                >
                  <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-foreground">
                      Your cart is empty
                    </p>
                    <p className="text-muted-foreground text-sm font-body mt-1">
                      Explore the collection to find something you love
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={closeCart}
                    className="rounded-xl"
                    data-ocid="cart.continue_shopping_button"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                items.map((item, i) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-3"
                    data-ocid={`cart.item.${i + 1}`}
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
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

                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-semibold text-foreground truncate">
                        {item.product.name}
                      </p>
                      <p className="text-muted-foreground text-xs font-body">
                        ₹{item.product.price} each
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Qty controls */}
                        <div className="flex items-center gap-1 bg-muted rounded-lg">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1.5 hover:bg-border rounded-lg transition-smooth"
                            aria-label="Decrease quantity"
                            data-ocid={`cart.qty_minus.${i + 1}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-body font-medium w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1.5 hover:bg-border rounded-lg transition-smooth"
                            aria-label="Increase quantity"
                            data-ocid={`cart.qty_plus.${i + 1}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-body font-semibold">
                            ₹{item.product.price * item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-smooth"
                            aria-label="Remove item"
                            data-ocid={`cart.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer summary */}
            {items.length > 0 && (
              <div className="border-t border-border px-5 py-4 space-y-3 bg-muted/40">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm font-body text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body text-muted-foreground">
                    <span>Delivery</span>
                    <span
                      className={
                        delivery === 0 ? "text-secondary font-medium" : ""
                      }
                    >
                      {delivery === 0 ? "FREE 🎉" : `₹${delivery}`}
                    </span>
                  </div>
                  {delivery > 0 && (
                    <p className="text-xs text-muted-foreground font-body">
                      Add ₹{999 - subtotal} more for free delivery
                    </p>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between font-display font-semibold text-foreground">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <Button
                  className="w-full rounded-xl gap-2 font-body"
                  onClick={handleCheckout}
                  data-ocid="cart.checkout_button"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order via WhatsApp
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
