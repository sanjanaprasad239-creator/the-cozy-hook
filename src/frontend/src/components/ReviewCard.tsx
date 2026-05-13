import { useState } from "react";
import type { Review } from "../types/product";
import { ReviewStars } from "./ReviewStars";

interface Props {
  review: Review;
}

function relativeDate(timestamp: number): string {
  // timestamp from canister is in nanoseconds
  const ms = timestamp > 1e15 ? timestamp / 1_000_000 : timestamp;
  const diff = Date.now() - ms;
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (minutes < 2) return "just now";
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

function ReviewPhotoGallery({ images }: { images: string[] }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div
        className="flex flex-wrap gap-2 mt-1"
        data-ocid="review.photo_gallery"
      >
        {images.slice(0, 3).map((src, idx) => (
          <button
            key={src.slice(-32)}
            type="button"
            aria-label={`view item ${idx + 1} full size`}
            onClick={() => setLightbox(src)}
            className="w-16 h-16 rounded-xl overflow-hidden border border-border/40 shadow-soft hover:shadow-boutique hover:scale-105 transition-smooth focus-visible:ring-2 focus-visible:ring-primary flex-shrink-0"
            data-ocid={`review.photo.${idx + 1}`}
          >
            <img
              src={src}
              alt={`uploaded item ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <dialog
          aria-modal="true"
          aria-label="photo viewer"
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent border-none m-0 max-w-none max-h-none w-full h-full"
          style={{ background: "oklch(0.1 0 0 / 0.8)" }}
          data-ocid="review.photo_lightbox"
        >
          <button
            type="button"
            aria-label="close photo viewer"
            onClick={() => setLightbox(null)}
            className="absolute inset-0 w-full h-full cursor-default"
            onKeyDown={(e) => e.key === "Escape" && setLightbox(null)}
          >
            <span className="sr-only">close</span>
          </button>
          <div className="relative z-10 max-w-sm w-full mx-auto">
            <img
              src={lightbox}
              alt="full size view"
              className="w-full rounded-2xl shadow-boutique-lg object-contain max-h-[80vh]"
            />
            <button
              type="button"
              aria-label="close photo viewer"
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-foreground/80 text-background flex items-center justify-center text-lg font-bold hover:bg-foreground transition-colors shadow-boutique"
              data-ocid="review.photo_lightbox.close_button"
            >
              ×
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}

export function ReviewCard({ review }: Props) {
  return (
    <article
      className="bg-background rounded-2xl p-5 shadow-boutique border border-border/50 flex flex-col gap-3"
      data-ocid="review.card"
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex flex-col gap-1 min-w-0">
          <p className="font-display font-semibold text-foreground text-base truncate">
            {review.authorName}
          </p>
          <ReviewStars rating={review.rating} size="sm" />
          {/* Verified purchase badge */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-body font-medium w-fit mt-0.5"
            style={{
              background: "oklch(0.85 0.04 145 / 0.35)",
              color: "oklch(0.42 0.07 145)",
            }}
            data-ocid="review.verified_badge"
          >
            <svg
              viewBox="0 0 12 12"
              fill="none"
              className="w-3 h-3"
              aria-hidden="true"
            >
              <circle cx="6" cy="6" r="5.5" fill="oklch(0.85 0.04 145 / 0.6)" />
              <polyline
                points="3.5 6 5 7.5 8.5 4"
                stroke="oklch(0.42 0.07 145)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            verified purchase
          </span>
        </div>
        <time
          className="text-xs font-body text-muted-foreground shrink-0 mt-0.5"
          dateTime={new Date(
            review.timestamp > 1e15
              ? review.timestamp / 1_000_000
              : review.timestamp,
          ).toISOString()}
        >
          {relativeDate(review.timestamp)}
        </time>
      </div>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {review.reviewText}
      </p>
      {review.imageUrls && review.imageUrls.length > 0 && (
        <ReviewPhotoGallery images={review.imageUrls} />
      )}
    </article>
  );
}
