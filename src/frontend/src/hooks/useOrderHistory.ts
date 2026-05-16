import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrderHistoryEntry } from "../types/product";

interface OrderHistoryState {
  orders: OrderHistoryEntry[];
  saveOrder: (entry: OrderHistoryEntry) => void;
  getOrders: () => OrderHistoryEntry[];
  clearHistory: () => void;
}

export const useOrderHistory = create<OrderHistoryState>()(
  persist(
    (set, get) => ({
      orders: [],

      saveOrder: (entry) =>
        set((state) => ({
          orders: [entry, ...state.orders],
        })),

      getOrders: () => get().orders,

      clearHistory: () => set({ orders: [] }),
    }),
    { name: "cozy-hook-order-history" },
  ),
);
