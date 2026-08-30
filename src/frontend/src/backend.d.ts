import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Review {
    id: bigint;
    authorName: string;
    reviewText: string;
    productId: string;
    timestamp: bigint;
    rating: bigint;
}
export interface ProductTimer {
    productId: string;
    caption: string;
    endTimestamp: bigint;
}
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export interface PressEntry {
    id: string;
    url: string;
    outlet: string;
    title: string;
    date: string;
}
export interface ProductImage {
    productId: string;
    imageUrl: string;
}
export interface Cell {
    value: Value;
    name: string;
}
export interface Bundle {
    id: string;
    productIds: Array<string>;
    name: string;
    description: string;
    imageUrl: string;
    badge: string;
    price: bigint;
}
export interface AdminSettings {
    currentlyCrafting: string;
    whatsappSubscribers: Array<WhatsappSubscriber>;
    soldOutProductIds: Array<string>;
    bundles: Array<Bundle>;
    featuredProductIds: Array<string>;
    productTimers: Array<ProductTimer>;
    pressEntries: Array<PressEntry>;
    heroTitle: string;
    heroTagline: string;
}
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export interface Product {
    id: string;
    features: Array<string>;
    imagePath: string;
    name: string;
    description: string;
    category: string;
    price: bigint;
}
export interface WhatsappSubscriber {
    id: string;
    subscribedAt: bigint;
    name: string;
    phone: string;
}
export interface backendInterface {
    addReview(productId: string, rating: bigint, reviewText: string, authorName: string): Promise<bigint>;
    adminLogin(password: string): Promise<boolean>;
    deleteReview(reviewId: bigint, adminPassword: string): Promise<boolean>;
    execute(qJson: string): Promise<Result>;
    getAdminSettings(): Promise<AdminSettings>;
    getAllReviews(): Promise<Array<Review>>;
    getApiDoc(): Promise<string>;
    getProductById(id: string): Promise<Product | null>;
    getProductImage(productId: string): Promise<string | null>;
    getProductImages(): Promise<Array<ProductImage>>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getReviewsByProduct(productId: string): Promise<Array<Review>>;
    schema(): Promise<string>;
    setBundles(bundles: Array<Bundle>): Promise<void>;
    setCurrentlyCrafting(text: string): Promise<void>;
    setFeaturedProducts(ids: Array<string>): Promise<void>;
    setPressEntries(entries: Array<PressEntry>): Promise<void>;
    setProductImage(productId: string, imageUrl: string): Promise<void>;
    setProductTimers(timers: Array<ProductTimer>): Promise<void>;
    setSoldOutProducts(ids: Array<string>): Promise<void>;
    setWhatsappSubscribers(subscribers: Array<WhatsappSubscriber>): Promise<void>;
    updateHeroText(title: string, tagline: string): Promise<void>;
}
