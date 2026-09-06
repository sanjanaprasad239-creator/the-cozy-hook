import { create } from "zustand";
import { persist } from "zustand/middleware";

// Loyalty redemption: LOYALTY_REDEEM_POINTS points = LOYALTY_REDEEM_VALUE rupees
// off the order total. Customers earn points per order and redeem them for a
// discount at checkout.
export const LOYALTY_REDEEM_POINTS = 100;
export const LOYALTY_REDEEM_VALUE = 50;

// Earn 1 point per ₹10 spent (rounded down).
const POINTS_PER_RUPEE = 0.1;

interface LoyaltyState {
  points: number;
  award: (points: number) => void;
  redeem: (points: number) => void;
  reset: () => void;
}

export const useLoyaltyPointsStore = create<LoyaltyState>()(
  persist(
    (set) => ({
      points: 0,

      award: (points) =>
        set((s) => ({ points: s.points + Math.max(0, points) })),

      redeem: (points) =>
        set((s) => ({ points: Math.max(0, s.points - points) })),

      reset: () => set({ points: 0 }),
    }),
    { name: "cozy-hook-loyalty" },
  ),
);

/** Points earned for a given order spend amount (₹). */
export function pointsForOrder(spend: number): number {
  return Math.floor(spend * POINTS_PER_RUPEE);
}

/** Rupee discount value for a given number of points. */
export function discountForPoints(points: number): number {
  return Math.floor((points / LOYALTY_REDEEM_POINTS) * LOYALTY_REDEEM_VALUE);
}
