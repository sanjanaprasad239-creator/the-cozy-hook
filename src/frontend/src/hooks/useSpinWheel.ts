import { create } from "zustand";
import { persist } from "zustand/middleware";

const FIRST_VISIT_KEY = "cozy-hook-first-visit";
const POPUP_DELAY_MS = 5000;

function recordFirstVisit() {
  try {
    if (!localStorage.getItem(FIRST_VISIT_KEY)) {
      localStorage.setItem(FIRST_VISIT_KEY, String(Date.now()));
    }
  } catch {
    // ignore
  }
}

function getFirstVisitTimestamp(): number {
  try {
    const raw = localStorage.getItem(FIRST_VISIT_KEY);
    return raw ? Number(raw) : Date.now();
  } catch {
    return Date.now();
  }
}

// Record first visit immediately on module load
recordFirstVisit();

interface SpinWheelState {
  spunEmail: string | null;
  discount: number | null;
  /** Internal: check whether user has already spun */
  hasSpun: () => boolean;
  /** Save the result of a spin */
  markSpun: (email: string, discount: number) => void;
  /** Return the saved result with generated code, or null */
  getSpinResult: () => { email: string; discount: number; code: string } | null;
  /** Generate a discount code for a given percentage */
  getDiscountCode: (discount: number) => string;
  /** Returns true only if the user hasn't spun and has been on the site 5+ seconds */
  shouldShowPopup: () => boolean;
}

export const useSpinWheel = create<SpinWheelState>()(
  persist(
    (set, get) => ({
      spunEmail: null,
      discount: null,

      hasSpun: () => get().spunEmail !== null,

      markSpun: (email, discount) => set({ spunEmail: email, discount }),

      getSpinResult: () => {
        const { spunEmail, discount } = get();
        if (!spunEmail || discount === null) return null;
        return {
          email: spunEmail,
          discount,
          code: get().getDiscountCode(discount),
        };
      },

      getDiscountCode: (discount) => `COZY${discount}`,

      shouldShowPopup: () => {
        if (get().hasSpun()) return false;
        const elapsed = Date.now() - getFirstVisitTimestamp();
        return elapsed >= POPUP_DELAY_MS;
      },
    }),
    { name: "cozy-hook-spin-wheel" },
  ),
);
