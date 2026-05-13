import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ExternalLink,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { ReviewCard } from "../components/ReviewCard";
import { ReviewForm } from "../components/ReviewForm";
import { ReviewStars } from "../components/ReviewStars";
import {
  ALL_PRODUCTS,
  getProductById,
  getProductsByCategory,
} from "../data/products";
import { useCart } from "../hooks/useCart";
import { useProductReviews } from "../hooks/useQueries";
import { useWishlist } from "../hooks/useWishlist";

function HeartBullet() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M8 13.5C8 13.5 1.5 9.5 1.5 5.5A3.5 3.5 0 0 1 8 3.09 3.5 3.5 0 0 1 14.5 5.5C14.5 9.5 8 13.5 8 13.5Z" />
    </svg>
  );
}

function RatingsSummary({ reviews }: { reviews: { rating: number }[] }) {
  if (reviews.length === 0) return null;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const rounded = Math.round(avg * 10) / 10;
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <ReviewStars rating={Math.round(avg)} size="sm" />
      <span className="font-display text-lg font-semibold text-foreground">
        {rounded.toFixed(1)}
      </span>
      <span className="font-body text-sm text-muted-foreground">
        · {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
      </span>
    </div>
  );
}

function DeliveryBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-body"
      style={{ backgroundColor: "#A8B5A2", color: "#fff" }}
      data-ocid="product.delivery_badge"
    >
      <Truck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>Delivered in 5–7 days · ₹49 delivery (Free above ₹999)</span>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ProductPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const addItem = useCart((s) => s.addItem);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const product = getProductById(id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const { data: reviews = [], isLoading: reviewsLoading } =
    useProductReviews(id);

  if (!product) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center gap-6 p-8"
        data-ocid="product.error_state"
      >
        <div className="text-center space-y-2">
          <p className="font-display text-3xl text-foreground">
            Oops, page not found
          </p>
          <p className="font-body text-sm text-muted-foreground">
            This product doesn't exist or may have been removed.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="rounded-2xl font-body gap-2"
          onClick={() => navigate({ to: "/collection" })}
          data-ocid="product.back_to_collection_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Button>
      </div>
    );
  }

  const p = product;

  // Related products: same category, excluding current product, max 3
  const relatedProducts = getProductsByCategory(p.category)
    .filter((item) => item.id !== p.id)
    .slice(0, 3);

  // Bundle suggestions: pick from different categories
  const bundleSuggestions = ALL_PRODUCTS.filter(
    (item) => item.id !== p.id && item.category !== p.category,
  )
    .reduce((acc: typeof ALL_PRODUCTS, item) => {
      if (!acc.some((a) => a.category === item.category)) acc.push(item);
      return acc;
    }, [])
    .slice(0, 3);

  const bundleTotal = bundleSuggestions.reduce((s, i) => s + i.price, p.price);

  const wishlisted = isInWishlist(p.id);

  function handleAddToCart() {
    addItem(p, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleWhatsApp() {
    const msg = `Hi! I'd like to order:\n• ${p.name} × ${qty} — ₹${p.price * qty}\n\nPlease confirm availability and delivery details. Thank you! 🌸`;
    window.open(
      `https://wa.me/918660099085?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  }

  function handleStickyWhatsApp() {
    const msg = `Hi! I'd like to order: ${p.name} 🌸`;
    window.open(
      `https://wa.me/918660099085?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  }

  return (
    <>
      {/* ── Sticky mobile WhatsApp bar ── */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 border-t border-border/50 bg-card/95 backdrop-blur-sm shadow-boutique-lg"
        data-ocid="product.sticky_whatsapp_bar"
      >
        <button
          type="button"
          onClick={handleStickyWhatsApp}
          className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl font-body text-sm font-medium transition-smooth border border-[#25D366]/40 hover:border-[#25D366] text-foreground hover:text-[#25D366] bg-transparent"
          data-ocid="product.sticky_whatsapp_button"
        >
          <WhatsAppIcon />
          Order via WhatsApp
        </button>
      </div>

      {/* ── Main page content ── */}
      <div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 md:pb-10"
        data-ocid="product.page"
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-body text-muted-foreground mb-8 flex-wrap"
          data-ocid="product.breadcrumb"
        >
          <Link
            to="/"
            className="hover:text-foreground transition-smooth"
            data-ocid="product.breadcrumb_home_link"
          >
            Home
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link
            to="/collection"
            className="hover:text-foreground transition-smooth"
            data-ocid="product.breadcrumb_collection_link"
          >
            Collection
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-foreground font-medium truncate max-w-[160px]">
            {p.name}
          </span>
        </nav>

        {/* Back link */}
        <button
          type="button"
          onClick={() => navigate({ to: "/collection" })}
          className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth mb-8"
          data-ocid="product.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </button>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — View Picture */}
          <motion.a
            href={
              p.pictureUrl && p.pictureUrl !== "#" ? p.pictureUrl : undefined
            }
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full aspect-square rounded-3xl border-2 flex flex-col items-center justify-center gap-4 cursor-pointer transition-smooth shadow-boutique-lg"
            style={{
              borderColor: "#D8A7B1",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "#D8A7B1";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "";
            }}
            data-ocid="product.view_picture_button"
            aria-label={`View picture of ${p.name}`}
            onClick={
              !p.pictureUrl || p.pictureUrl === "#"
                ? (e) => e.preventDefault()
                : undefined
            }
          >
            <div
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "#D8A7B1" }}
            >
              <ExternalLink className="w-7 h-7" style={{ color: "#D8A7B1" }} />
            </div>
            <div className="text-center px-6 space-y-1">
              <p
                className="font-display text-xl font-semibold"
                style={{ color: "#D8A7B1" }}
              >
                View Picture
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Click to see the full product photo
              </p>
            </div>
          </motion.a>

          {/* Right — Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Category + Name */}
            <div>
              <p className="text-xs font-body font-semibold tracking-widest text-primary uppercase mb-2">
                {p.category}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
                {p.name}
              </h1>
              {/* Price in dusty rose */}
              <p
                className="mt-3 font-body font-semibold text-2xl"
                style={{ color: "#D8A7B1" }}
                data-ocid="product.price"
              >
                ₹{p.price}
              </p>
              {/* Delivery estimate badge */}
              <div className="mt-3">
                <DeliveryBadge />
              </div>
            </div>

            {/* Inline rating summary */}
            {reviews.length > 0 && <RatingsSummary reviews={reviews} />}

            {/* Description */}
            <p className="font-body text-muted-foreground leading-relaxed text-sm">
              {p.description}
            </p>

            {/* Features with heart bullets */}
            {p.features.length > 0 && (
              <div className="space-y-2 bg-accent/30 rounded-2xl p-4">
                <h3 className="font-display text-sm font-semibold text-foreground mb-2">
                  What's included
                </h3>
                <ul className="space-y-2">
                  {p.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm font-body text-muted-foreground"
                    >
                      <HeartBullet />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="font-body text-sm font-medium text-foreground w-8">
                Qty
              </span>
              <div
                className="flex items-center border border-input rounded-2xl overflow-hidden bg-card"
                data-ocid="product.qty_selector"
              >
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  aria-label="Decrease quantity"
                  data-ocid="product.qty_minus"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span
                  className="px-3 font-body font-semibold text-sm min-w-[2.5rem] text-center text-foreground"
                  data-ocid="product.qty_value"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  aria-label="Increase quantity"
                  data-ocid="product.qty_plus"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                size="lg"
                className="flex-1 rounded-2xl font-body gap-2 h-12"
                variant={added ? "secondary" : "default"}
                onClick={handleAddToCart}
                data-ocid="product.add_to_cart_button"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </Button>

              <Button
                type="button"
                size="lg"
                variant="outline"
                className="flex-1 rounded-2xl font-body gap-2 h-12 border-[#25D366]/40 hover:border-[#25D366] hover:text-[#25D366] transition-smooth"
                onClick={handleWhatsApp}
                data-ocid="product.whatsapp_button"
              >
                <WhatsAppIcon />
                Order via WhatsApp
              </Button>

              {/* Wishlist button */}
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="rounded-2xl font-body gap-2 h-12 border-border/50 hover:border-primary/50 transition-smooth px-4"
                onClick={() => {
                  if (wishlisted) removeFromWishlist(p.id);
                  else addToWishlist(p);
                }}
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Save to wishlist"
                }
                data-ocid="product.wishlist_button"
              >
                <Heart
                  className="w-4 h-4"
                  style={{ color: "#D8A7B1" }}
                  fill={wishlisted ? "#D8A7B1" : "none"}
                />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* ── Bundle & Save ── */}
        {bundleSuggestions.length > 0 && (
          <section className="mt-16" data-ocid="product.bundle_section">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-border" />
              <h2 className="font-display text-2xl font-semibold text-foreground whitespace-nowrap">
                Complete the Look
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div
              className="rounded-3xl border border-border/40 p-6"
              style={{ background: "oklch(0.88 0.05 5 / 0.1)" }}
            >
              <p className="font-body text-xs text-muted-foreground mb-5">
                pair with these handmade pieces for a perfect gift set or
                collection starter:
              </p>
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
                {/* Current product */}
                <div className="flex-shrink-0 snap-start w-36 rounded-2xl bg-card border border-primary/30 overflow-hidden shadow-soft">
                  <div className="aspect-square bg-muted">
                    <img
                      src="/assets/generated/hero-crochet.dim_1600x900.jpg"
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="font-display text-xs font-semibold text-foreground line-clamp-1">
                      {p.name}
                    </p>
                    <p
                      className="font-body text-xs font-bold mt-0.5"
                      style={{ color: "#D8A7B1" }}
                    >
                      ₹{p.price}
                    </p>
                    <span className="text-[10px] font-body text-primary">
                      this item
                    </span>
                  </div>
                </div>

                {/* Plus icon */}
                <div className="flex-shrink-0 flex items-center">
                  <span className="font-body text-xl text-muted-foreground">
                    +
                  </span>
                </div>

                {bundleSuggestions.map((item, bi) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex-shrink-0 snap-start w-36 rounded-2xl bg-card border border-border/40 overflow-hidden shadow-soft hover:shadow-boutique hover:-translate-y-1 transition-smooth text-left"
                      onClick={() =>
                        navigate({
                          to: "/product/$id",
                          params: { id: item.id },
                        })
                      }
                      data-ocid={`product.bundle_item.${bi + 1}`}
                    >
                      <div className="aspect-square bg-muted">
                        <img
                          src="/assets/generated/hero-crochet.dim_1600x900.jpg"
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2.5">
                        <p className="font-display text-xs font-semibold text-foreground line-clamp-1">
                          {item.name}
                        </p>
                        <p
                          className="font-body text-xs font-bold mt-0.5"
                          style={{ color: "#D8A7B1" }}
                        >
                          ₹{item.price}
                        </p>
                        <p className="text-[10px] font-body text-muted-foreground capitalize">
                          {item.category}
                        </p>
                      </div>
                    </button>
                    {bi < bundleSuggestions.length - 1 && (
                      <span className="font-body text-xl text-muted-foreground flex-shrink-0">
                        +
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between flex-wrap gap-3">
                <p className="font-body text-sm text-muted-foreground">
                  bundle total:{" "}
                  <span className="font-semibold text-foreground text-base">
                    ₹{bundleTotal}
                  </span>
                </p>
                <a
                  href={`https://wa.me/918660099085?text=${encodeURIComponent(`Hi! I'd like to order a bundle:\n• ${p.name} (₹${p.price})\n${bundleSuggestions.map((b) => `• ${b.name} (₹${b.price})`).join("\n")}\n\nTotal: ₹${bundleTotal} 🌸`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-body text-sm font-medium transition-smooth"
                  style={{ background: "#D8A7B1", color: "#fff" }}
                  data-ocid="product.bundle_whatsapp_button"
                >
                  order bundle via whatsapp
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ── You May Also Like ── */}
        {relatedProducts.length > 0 && (
          <section className="mt-16" data-ocid="product.related_section">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-border" />
              <h2 className="font-display text-2xl font-semibold text-foreground whitespace-nowrap">
                You May Also Like
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              data-ocid="product.related_list"
            >
              {relatedProducts.map((related, idx) => (
                <ProductCard
                  key={related.id}
                  product={related}
                  index={idx}
                  onClick={() =>
                    navigate({ to: "/product/$id", params: { id: related.id } })
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Customer Reviews ── */}
        <section className="mt-16 mb-6" data-ocid="product.reviews_section">
          {/* Divider + heading */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <h2 className="font-display text-2xl font-semibold text-foreground whitespace-nowrap">
              Customer Reviews
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Loading skeleton */}
          {reviewsLoading && (
            <div
              className="space-y-4 mb-10"
              data-ocid="product.reviews_loading_state"
            >
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-background rounded-2xl p-5 border border-border/50 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-28 rounded-full" />
                    <Skeleton className="h-4 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-full rounded-full" />
                  <Skeleton className="h-3 w-3/4 rounded-full" />
                </div>
              ))}
            </div>
          )}

          {/* Average rating summary (above list) */}
          {!reviewsLoading && reviews.length > 0 && (
            <div className="mb-6 p-5 bg-muted/40 rounded-2xl flex items-center gap-4 flex-wrap">
              <RatingsSummary reviews={reviews} />
            </div>
          )}

          {/* Review list */}
          {!reviewsLoading && reviews.length > 0 && (
            <div
              className="grid gap-4 sm:grid-cols-2 mb-10"
              data-ocid="product.reviews_list"
            >
              {reviews.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  data-ocid={`product.reviews.item.${idx + 1}`}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!reviewsLoading && reviews.length === 0 && (
            <div
              className="text-center py-10 mb-10"
              data-ocid="product.reviews_empty_state"
            >
              <p
                className="font-body text-base italic"
                style={{ color: "#A8B5A2" }}
              >
                Be the first to share your thoughts! 🌿
              </p>
            </div>
          )}

          {/* Review form — extra bottom padding on mobile for sticky bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="pb-2"
          >
            <ReviewForm productId={id} />
          </motion.div>
        </section>
      </div>
    </>
  );
}
