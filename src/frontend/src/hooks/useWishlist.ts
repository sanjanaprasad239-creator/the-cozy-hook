import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

interface WishlistState {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistItems: [],
      addToWishlist: (product) =>
        set((s) => ({
          wishlistItems: s.wishlistItems.some((p) => p.id === product.id)
            ? s.wishlistItems
            : [...s.wishlistItems, product],
        })),
      removeFromWishlist: (productId) =>
        set((s) => ({
          wishlistItems: s.wishlistItems.filter((p) => p.id !== productId),
        })),
      isInWishlist: (productId) =>
        get().wishlistItems.some((p) => p.id === productId),
      clearWishlist: () => set({ wishlistItems: [] }),
    }),
    { name: "cozy-hook-wishlist" },
  ),
);
