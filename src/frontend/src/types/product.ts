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
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AdminSettings {
  heroTitle: string;
  heroTagline: string;
  featuredProductIds: string[];
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
