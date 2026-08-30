export type ProductCategory =
  | "plushies"
  | "keychains"
  | "wearables"
  | "home decor"
  | "accessories";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  features: string[];
  imagePath: string;
  pictureUrl?: string;
  isNew?: boolean;
  isSoldOut?: boolean;
  countdownTimer?: { label: string; endDate: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  productIds: string[];
  savings: number;
  isActive: boolean;
  imageUrl?: string;
  badge?: string;
}

export interface PressEntry {
  id: string;
  title: string;
  link: string;
  date: string;
  url?: string;
  outlet?: string;
}

export interface WhatsAppOptIn {
  name: string;
  phone: string;
  subscribedAt: string;
}

export interface OrderHistoryEntry {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  giftWrapping: boolean;
  total: number;
  customerName: string;
  date: string;
  notes?: string;
}

// Backend-aligned product timer — matches the canister's ProductTimer record
// (caption + nanosecond endTimestamp). useAdmin maps these to the page-facing
// { label, endDate } record keyed by product id.
export interface ProductTimer {
  productId: string;
  caption: string;
  endTimestamp: bigint;
}

// Backend-aligned WhatsApp subscriber — matches the canister's
// WhatsappSubscriber record (subscribedAt is a nanosecond bigint).
export interface WhatsappSubscriber {
  id: string;
  subscribedAt: bigint;
  name: string;
  phone: string;
}

// Page-facing admin settings — the shape useAdmin() exposes to pages.
// productTimers is keyed by product id with { label, endDate }, and bundles
// carry savings/isActive on top of the backend fields.
export interface AdminSettings {
  heroTitle: string;
  heroTagline: string;
  featuredProductIds: string[];
  soldOutProductIds: string[];
  bundles: Bundle[];
  pressEntries: PressEntry[];
  currentlyCrafting: string;
  productTimers: Record<string, { label: string; endDate: string }>;
  whatsappSubscribers: WhatsappSubscriber[];
}

export interface Review {
  id: number;
  productId: string;
  rating: number;
  reviewText: string;
  authorName: string;
  timestamp: number;
  imageUrls?: string[];
}

export interface ReviewInput {
  productId: string;
  rating: number;
  reviewText: string;
  authorName: string;
  imageUrls?: string[];
}
