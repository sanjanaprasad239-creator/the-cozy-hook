import { c as create, p as persist } from "./index-DLT9PHCj.js";
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
