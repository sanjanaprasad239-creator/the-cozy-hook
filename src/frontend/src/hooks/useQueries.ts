import { createActor } from "@/backend";
import type {
  AdminSettings as BackendAdminSettings,
  Bundle as BackendBundle,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ALL_PRODUCTS,
  SAMPLE_BUNDLES,
  getProductById,
  getProductsByCategory,
} from "../data/products";
import type {
  AdminSettings,
  Product,
  ProductImage,
  Review,
  ReviewInput,
} from "../types/product";

// ── Admin settings (backend-backed) ─────────────────────────────────────────

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  heroTitle: "The Cozy Hook",
  heroTagline: "Handmade Crochet with Love",
  featuredProductIds: [
    "plush-001",
    "plush-007",
    "key-007",
    "acc-001",
    "decor-006",
  ],
  soldOutProductIds: [],
  bundles: SAMPLE_BUNDLES,
  pressEntries: [],
  currentlyCrafting:
    "currently crafting: strawberry costumed bunny plushies this week! 🌸",
  productTimers: {},
  whatsappSubscribers: [],
};

// Backend timestamps are nanosecond bigints — convert through one shared helper.
function timestampToDateString(timestamp: bigint): string {
  const date = new Date(Number(timestamp / 1_000_000n));
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function computeBundleSavings(bundle: BackendBundle): number {
  const total = bundle.productIds.reduce(
    (sum, pid) => sum + (getProductById(pid)?.price ?? 0),
    0,
  );
  return Math.max(0, total - Number(bundle.price));
}

// Map the backend AdminSettings record to the page-facing shape consumed by
// pages: productTimers keyed by product id, bundles with savings/isActive.
function toPageSettings(backend: BackendAdminSettings): AdminSettings {
  const productTimers: Record<string, { label: string; endDate: string }> = {};
  for (const timer of backend.productTimers ?? []) {
    productTimers[timer.productId] = {
      label: timer.caption,
      endDate: timestampToDateString(timer.endTimestamp),
    };
  }
  return {
    heroTitle: backend.heroTitle,
    heroTagline: backend.heroTagline,
    featuredProductIds: backend.featuredProductIds ?? [],
    soldOutProductIds: backend.soldOutProductIds ?? [],
    bundles: (backend.bundles ?? []).map((b) => ({
      id: b.id,
      name: b.name,
      description: b.description,
      price: Number(b.price),
      productIds: b.productIds,
      savings: computeBundleSavings(b),
      isActive: true,
      imageUrl: b.imageUrl,
      badge: b.badge,
    })),
    pressEntries: (backend.pressEntries ?? []).map((e) => ({
      id: e.id,
      title: e.title,
      link: e.url,
      date: e.date,
      url: e.url,
      outlet: e.outlet,
    })),
    currentlyCrafting: backend.currentlyCrafting ?? "",
    productTimers,
    whatsappSubscribers: backend.whatsappSubscribers ?? [],
  };
}

export function useAdminSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AdminSettings>({
    queryKey: ["adminSettings"],
    queryFn: async () => {
      if (!actor) return DEFAULT_ADMIN_SETTINGS;
      return toPageSettings(await actor.getAdminSettings());
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ── Product images (backend-backed) ─────────────────────────────────────────
// The backend is the source of truth for product images. localStorage is kept
// only as a fallback cache so the admin dashboard still shows saved images
// while the actor is initializing.

const PRODUCT_IMAGES_KEY = "cozy-hook-product-images";

function loadLocalProductImages(): Record<string, string> {
  try {
    const raw = localStorage.getItem(PRODUCT_IMAGES_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function saveLocalProductImages(map: Record<string, string>) {
  try {
    localStorage.setItem(PRODUCT_IMAGES_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

// Read all product images from the backend, falling back to the local cache
// while the actor is unavailable so the dashboard never renders blank.
export function useProductImages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Record<string, string>>({
    queryKey: ["productImages"],
    queryFn: async () => {
      if (!actor) return loadLocalProductImages();
      const images = await actor.getProductImages();
      const map: Record<string, string> = {};
      for (const img of images) {
        if (img.imageUrl) map[img.productId] = img.imageUrl;
      }
      return map;
    },
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

// Persist a product image to the backend. On success the local cache is updated
// and the shared query is invalidated so the dashboard reflects the change.
export function useSetProductImage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, ProductImage>({
    mutationFn: async ({ productId, imageUrl }) => {
      if (!actor) throw new Error("Backend is not ready");
      await actor.setProductImage(productId, imageUrl);
    },
    onSuccess: (_data, { productId, imageUrl }) => {
      const cache = loadLocalProductImages();
      if (imageUrl) {
        cache[productId] = imageUrl;
      } else {
        delete cache[productId];
      }
      saveLocalProductImages(cache);
      void queryClient.invalidateQueries({ queryKey: ["productImages"] });
    },
  });
}

// ── Products (source catalog) ───────────────────────────────────────────────

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

// ── Back-in-stock notifications (backend-backed) ────────────────────────────

export function useSubscribeBackInStock() {
  const { actor } = useActor(createActor);
  return useMutation<void, Error, { productId: string; email: string }>({
    mutationFn: async ({ productId, email }) => {
      if (!actor) throw new Error("Backend is not ready");
      await actor.subscribeBackInStock(productId, email);
    },
  });
}
