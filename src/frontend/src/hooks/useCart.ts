import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "../types/product";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const DELIVERY_CHARGE = 49;
const FREE_DELIVERY_THRESHOLD = 999;

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.id === product.id,
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + qty }
                  : item,
              ),
            };
          }
          return {
            items: [...state.items, { product, quantity: qty }],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => item.product.id !== productId,
              ),
            };
          }
          return {
            items: state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item,
            ),
          };
        }),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "cozy-hook-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function useCartTotals() {
  const items = useCart((s) => s.items);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const total = subtotal + delivery;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, delivery, total, itemCount };
}

export function buildWhatsAppMessage(items: CartItem[], total: number): string {
  const lines = items.map(
    (item) =>
      `• ${item.product.name} × ${item.quantity} — ₹${item.product.price * item.quantity}`,
  );
  const delivery =
    total - items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const msg = [
    "Hello! I'd like to place an order from The Cozy Hook 🧶",
    "",
    ...lines,
    "",
    delivery > 0 ? `Delivery: ₹${delivery}` : "Delivery: FREE 🎉",
    `Total: ₹${total}`,
    "",
    "Please confirm availability and share payment details. Thank you!",
  ].join("\n");
  return `https://wa.me/918660099085?text=${encodeURIComponent(msg)}`;
}

export { DELIVERY_CHARGE, FREE_DELIVERY_THRESHOLD };
