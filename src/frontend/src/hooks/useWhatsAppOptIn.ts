import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WhatsAppOptIn } from "../types/product";

interface WhatsAppOptInState {
  subscribers: WhatsAppOptIn[];
  subscribe: (name: string, phone: string) => void;
  isSubscribed: (phone: string) => boolean;
  getSubscribers: () => WhatsAppOptIn[];
}

export const useWhatsAppOptIn = create<WhatsAppOptInState>()(
  persist(
    (set, get) => ({
      subscribers: [],

      subscribe: (name, phone) => {
        const already = get().subscribers.some((s) => s.phone === phone);
        if (already) return;
        set((state) => ({
          subscribers: [
            ...state.subscribers,
            { name, phone, subscribedAt: new Date().toISOString() },
          ],
        }));
      },

      isSubscribed: (phone) => get().subscribers.some((s) => s.phone === phone),

      getSubscribers: () => get().subscribers,
    }),
    { name: "cozy-hook-whatsapp-optins" },
  ),
);
