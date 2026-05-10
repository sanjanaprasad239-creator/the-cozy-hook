import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AdminSettings {
    featuredProductIds: Array<string>;
    heroTitle: string;
    heroTagline: string;
}
export interface Review {
    id: bigint;
    authorName: string;
    reviewText: string;
    productId: string;
    timestamp: bigint;
    rating: bigint;
}
export interface Product {
    id: string;
    features: Array<string>;
    imagePath: string;
    name: string;
    description: string;
    category: string;
    price: bigint;
}
export interface backendInterface {
    addReview(productId: string, rating: bigint, reviewText: string, authorName: string): Promise<bigint>;
    adminLogin(password: string): Promise<boolean>;
    deleteReview(reviewId: bigint, adminPassword: string): Promise<boolean>;
    getAdminSettings(): Promise<AdminSettings>;
    getAllReviews(): Promise<Array<Review>>;
    getProductById(id: string): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getReviewsByProduct(productId: string): Promise<Array<Review>>;
    setFeaturedProducts(ids: Array<string>): Promise<void>;
    updateHeroText(title: string, tagline: string): Promise<void>;
}
