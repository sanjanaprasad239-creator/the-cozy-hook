import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ALL_PRODUCTS,
  getProductById,
  getProductsByCategory,
} from "../data/products";
import type {
  AdminSettings,
  Product,
  Review,
  ReviewInput,
} from "../types/product";

// These hooks wrap local data but are shaped to match the backend interface.
// Reviews are persisted in localStorage until the canister is live.

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => ALL_PRODUCTS,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useProductsByCategory(category: string) {
  return useQuery<Product[]>({
    queryKey: ["products", "category", category],
    queryFn: async () => getProductsByCategory(category),
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !!category,
  });
}

export function useProduct(id: string) {
  return useQuery<Product | undefined>({
    queryKey: ["product", id],
    queryFn: async () => getProductById(id),
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !!id,
  });
}

export function useAdminSettings() {
  return useQuery<AdminSettings>({
    queryKey: ["adminSettings"],
    queryFn: async () => {
      const defaults: AdminSettings = {
        heroTitle: "The Cozy Hook",
        heroTagline: "Handmade Crochet with Love",
        featuredProductIds: [
          "plush-001",
          "plush-007",
          "key-007",
          "acc-009",
          "decor-004",
        ],
        soldOutProductIds: [],
        bundles: [],
        pressEntries: [],
        currentlyCrafting: "",
        productTimers: {},
      };
      try {
        const raw = localStorage.getItem("cozy-hook-admin");
        if (raw)
          return {
            ...defaults,
            ...(JSON.parse(raw) as Partial<AdminSettings>),
          };
      } catch {
        // ignore
      }
      return defaults;
    },
    staleTime: 30_000,
  });
}

// ── Review helpers (localStorage-backed) ────────────────────────────────────

const REVIEWS_KEY = "cozy-hook-reviews";

export function loadAllReviews(): Review[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

function saveAllReviews(reviews: Review[]) {
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  } catch {
    // ignore
  }
}

export function useProductReviews(productId: string) {
  return useQuery<Review[]>({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const all = loadAllReviews();
      return all.filter((r) => r.productId === productId);
    },
    enabled: !!productId,
    staleTime: 0,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation<number, Error, ReviewInput>({
    mutationFn: async (input: ReviewInput) => {
      const all = loadAllReviews();
      const nextId = all.length > 0 ? Math.max(...all.map((r) => r.id)) + 1 : 1;
      const review: Review = {
        id: nextId,
        productId: input.productId,
        rating: input.rating,
        reviewText: input.reviewText,
        authorName: input.authorName,
        timestamp: Date.now(),
        ...(input.imageUrls && input.imageUrls.length > 0
          ? { imageUrls: input.imageUrls }
          : {}),
      };
      saveAllReviews([...all, review]);
      return nextId;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.productId],
      });
    },
  });
}
