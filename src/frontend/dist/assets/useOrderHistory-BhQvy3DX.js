import { c as create, p as persist } from "./index-6i6bSDXp.js";
const useOrderHistory = create()(
  persist(
    (set, get) => ({
      orders: [],
      saveOrder: (entry) => set((state) => ({
        orders: [entry, ...state.orders]
      })),
      getOrders: () => get().orders,
      clearHistory: () => set({ orders: [] })
    }),
    { name: "cozy-hook-order-history" }
  )
);
export {
  useOrderHistory as u
};
