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
}

export interface PressEntry {
  id: string;
  title: string;
  link: string;
  date: string;
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

export interface AdminSettings {
  heroTitle: string;
  heroTagline: string;
  featuredProductIds: string[];
  soldOutProductIds: string[];
  bundles: Bundle[];
  pressEntries: PressEntry[];
  currentlyCrafting: string;
  productTimers: Record<string, { label: string; endDate: string }>;
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
