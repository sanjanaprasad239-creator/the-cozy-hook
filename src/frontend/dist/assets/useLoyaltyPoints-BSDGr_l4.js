import { c as create, p as persist } from "./index-6i6bSDXp.js";
const LOYALTY_REDEEM_POINTS = 100;
const LOYALTY_REDEEM_VALUE = 50;
const POINTS_PER_RUPEE = 0.1;
const useLoyaltyPointsStore = create()(
  persist(
    (set) => ({
      points: 0,
      award: (points) => set((s) => ({ points: s.points + Math.max(0, points) })),
      redeem: (points) => set((s) => ({ points: Math.max(0, s.points - points) })),
      reset: () => set({ points: 0 })
    }),
    { name: "cozy-hook-loyalty" }
  )
);
function pointsForOrder(spend) {
  return Math.floor(spend * POINTS_PER_RUPEE);
}
function discountForPoints(points) {
  return Math.floor(points / LOYALTY_REDEEM_POINTS * LOYALTY_REDEEM_VALUE);
}
export {
  LOYALTY_REDEEM_POINTS as L,
  LOYALTY_REDEEM_VALUE as a,
  discountForPoints as d,
  pointsForOrder as p,
  useLoyaltyPointsStore as u
};
