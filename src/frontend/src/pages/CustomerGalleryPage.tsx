import { Link } from "@tanstack/react-router";
import { Camera, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Review } from "../types/product";

function loadAllReviews(): Review[] {
  try {
    const raw = localStorage.getItem("cozy-hook-reviews");
    if (raw) return JSON.parse(raw) as Review[];
  } catch {
    // ignore
  }
  return [];
}

interface PhotoEntry {
  url: string;
  authorName: string;
  productId: string;
  rating: number;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          className={s <= rating ? "fill-current" : "opacity-30"}
          style={{ color: "#D8A7B1" }}
        />
      ))}
    </div>
  );
}

export function CustomerGalleryPage() {
  const reviews = loadAllReviews();

  const photos: PhotoEntry[] = reviews.flatMap((r) =>
    (r.imageUrls ?? []).map((url) => ({
      url,
      authorName: r.authorName,
      productId: r.productId,
      rating: r.rating,
    })),
  );

  return (
    <div
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      data-ocid="customer_gallery.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <p
          className="text-xs font-body tracking-[0.2em] uppercase mb-3"
          style={{ color: "#D8A7B1" }}
        >
          made with love, shared with joy
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
          customer gallery
        </h1>
        <div
          className="mt-4 mx-auto w-14 h-0.5 rounded-full"
          style={{ background: "#D8A7B1", opacity: 0.5 }}
        />
        <p className="mt-5 font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          real love from our customers
        </p>
      </motion.div>

      {/* CTA banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-2xl border border-border/40 p-5 mb-10 flex items-center gap-4"
        style={{ background: "oklch(0.94 0.02 5 / 0.35)" }}
        data-ocid="customer_gallery.share_cta"
      >
        <span className="text-3xl flex-shrink-0">📸</span>
        <div className="min-w-0">
          <p className="font-body text-sm font-medium text-foreground">
            ordered something from us?
          </p>
          <p className="font-body text-xs text-muted-foreground mt-0.5">
            share your photo when leaving a review on any{" "}
            <Link
              to="/collection"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              product page
            </Link>{" "}
            — your pic could appear right here!
          </p>
        </div>
        <Camera
          size={20}
          className="flex-shrink-0 text-muted-foreground ml-auto hidden sm:block"
        />
      </motion.div>

      {/* Grid or empty state */}
      {photos.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col items-center justify-center py-24 text-center"
          data-ocid="customer_gallery.empty_state"
        >
          <span className="text-6xl mb-5">🌸</span>
          <p className="font-display text-xl font-semibold text-foreground mb-2">
            no customer photos yet
          </p>
          <p className="font-body text-sm text-muted-foreground max-w-xs mb-6">
            be the first to share your order! leave a review with a photo on any
            product page.
          </p>
          <Link
            to="/collection"
            className="font-body text-sm px-6 py-2.5 rounded-full transition-smooth"
            style={{ background: "#D8A7B1", color: "#fff" }}
            data-ocid="customer_gallery.browse_link"
          >
            browse the collection
          </Link>
        </motion.div>
      ) : (
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-5"
          data-ocid="customer_gallery.grid"
        >
          {photos.map((photo, i) => (
            <motion.div
              key={`${photo.url}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.07, 0.4) }}
              className="break-inside-avoid mb-5 rounded-2xl overflow-hidden border border-border/30 bg-card shadow-soft"
              data-ocid={`customer_gallery.item.${i + 1}`}
            >
              <div className="overflow-hidden">
                <img
                  src={photo.url}
                  alt={`by ${photo.authorName}`}
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3.5">
                <StarRow rating={photo.rating} />
                <p className="font-body text-xs font-semibold text-foreground mt-1.5 truncate">
                  {photo.authorName}
                </p>
                <p className="font-body text-xs text-muted-foreground truncate">
                  {photo.productId.replace(/-/g, " ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
