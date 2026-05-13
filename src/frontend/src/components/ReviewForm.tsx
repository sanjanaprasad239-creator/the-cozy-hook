import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateReview } from "../hooks/useQueries";
import { ReviewStars } from "./ReviewStars";

interface Props {
  productId: string;
  onSuccess?: () => void;
}

interface FormState {
  authorName: string;
  rating: number;
  reviewText: string;
}

const INITIAL: FormState = { authorName: "", rating: 0, reviewText: "" };
const MAX_PHOTOS = 3;

export function ReviewForm({ productId, onSuccess }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const createReview = useCreateReview();

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.authorName.trim()) next.authorName = "Please enter your name";
    if (form.rating < 1) next.rating = 1; // use rating=1 as sentinel for error
    if (!form.reviewText.trim()) next.reviewText = "Please share your thoughts";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createReview.mutateAsync({
        productId,
        rating: form.rating,
        reviewText: form.reviewText.trim(),
        authorName: form.authorName.trim(),
        imageUrls: photoUrls,
      });
      setForm(INITIAL);
      setErrors({});
      setPhotoUrls([]);
      toast.success("Thank you for your review! 🌸", {
        description: "Your thoughts help other customers find what they love.",
        duration: 5000,
      });
      onSuccess?.();
    } catch {
      toast.error("Couldn't submit your review", {
        description: "Please try again in a moment.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card rounded-2xl p-6 shadow-boutique border border-border/50 flex flex-col gap-5"
      data-ocid="review.form"
      noValidate
    >
      <h3 className="font-display text-lg font-semibold text-foreground">
        Share Your Experience
      </h3>
      <p className="text-xs font-body text-muted-foreground -mt-2">
        your review will be marked as a{" "}
        <span
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full align-middle"
          style={{
            background: "oklch(0.85 0.04 145 / 0.3)",
            color: "oklch(0.42 0.07 145)",
          }}
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
      </p>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="review-name"
          className="font-body text-sm font-medium text-foreground"
        >
          Your Name
        </Label>
        <Input
          id="review-name"
          type="text"
          placeholder="e.g. Priya S."
          value={form.authorName}
          onChange={(e) =>
            setForm((f) => ({ ...f, authorName: e.target.value }))
          }
          onBlur={() => {
            if (!form.authorName.trim())
              setErrors((e) => ({
                ...e,
                authorName: "Please enter your name",
              }));
            else setErrors((e) => ({ ...e, authorName: undefined }));
          }}
          className="rounded-xl font-body text-sm border-input focus-visible:ring-primary"
          data-ocid="review.name_input"
        />
        {errors.authorName && (
          <p
            className="text-xs font-body text-destructive"
            data-ocid="review.name_field_error"
          >
            {errors.authorName}
          </p>
        )}
      </div>

      {/* Rating */}
      <div className="flex flex-col gap-1.5">
        <Label className="font-body text-sm font-medium text-foreground">
          Your Rating
        </Label>
        <div className="flex items-center gap-2">
          <ReviewStars
            rating={form.rating}
            size="lg"
            interactive
            onRate={(r) => {
              setForm((f) => ({ ...f, rating: r }));
              setErrors((e) => ({ ...e, rating: undefined }));
            }}
          />
          {form.rating > 0 && (
            <span className="text-xs font-body text-muted-foreground">
              {["", "Poor", "Fair", "Good", "Great", "Loved it!"][form.rating]}
            </span>
          )}
        </div>
        {errors.rating !== undefined && form.rating < 1 && (
          <p
            className="text-xs font-body text-destructive"
            data-ocid="review.rating_field_error"
          >
            Please select a rating
          </p>
        )}
      </div>

      {/* Review text */}
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="review-text"
          className="font-body text-sm font-medium text-foreground"
        >
          Your Review
        </Label>
        <Textarea
          id="review-text"
          placeholder="What did you love about this item? How does it look or feel in person?"
          value={form.reviewText}
          onChange={(e) =>
            setForm((f) => ({ ...f, reviewText: e.target.value }))
          }
          onBlur={() => {
            if (!form.reviewText.trim())
              setErrors((e) => ({
                ...e,
                reviewText: "Please share your thoughts",
              }));
            else setErrors((e) => ({ ...e, reviewText: undefined }));
          }}
          rows={3}
          className="rounded-xl font-body text-sm border-input focus-visible:ring-primary resize-none"
          data-ocid="review.text_textarea"
        />
        {errors.reviewText && (
          <p
            className="text-xs font-body text-destructive"
            data-ocid="review.text_field_error"
          >
            {errors.reviewText}
          </p>
        )}
      </div>

      {/* Photo upload */}
      <div className="flex flex-col gap-2">
        <span className="font-body text-sm font-medium text-foreground">
          add photos{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </span>
        <div className="flex flex-wrap gap-2 items-center">
          {photoUrls.map((url, idx) => (
            <div
              key={url.slice(-32)}
              className="relative w-16 h-16 rounded-xl overflow-hidden border border-border/50 shadow-soft flex-shrink-0"
            >
              <img
                src={url}
                alt={`uploaded item ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                aria-label={`remove photo ${idx + 1}`}
                onClick={() =>
                  setPhotoUrls((prev) => prev.filter((_, i) => i !== idx))
                }
                className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-foreground/70 text-background flex items-center justify-center text-xs font-bold leading-none hover:bg-foreground transition-colors"
                data-ocid="review.remove_photo_button"
              >
                ×
              </button>
            </div>
          ))}
          {photoUrls.length < MAX_PHOTOS && (
            <label
              htmlFor="review-photos"
              className="w-16 h-16 rounded-xl border-2 border-dashed border-primary/40 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary/70 hover:bg-primary/5 transition-colors group flex-shrink-0"
              data-ocid="review.upload_button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-primary/60 group-hover:text-primary/90 transition-colors"
                aria-hidden="true"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="sr-only">add a photo</span>
              <span className="text-[9px] font-body text-primary/50 group-hover:text-primary/80 transition-colors leading-none">
                add photo
              </span>
              <input
                id="review-photos"
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => {
                  setPhotoError(null);
                  const files = Array.from(e.target.files ?? []);
                  const remaining = MAX_PHOTOS - photoUrls.length;
                  const toRead = files.slice(0, remaining);
                  for (const file of toRead) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const result = ev.target?.result;
                      if (typeof result === "string") {
                        setPhotoUrls((prev) =>
                          prev.length < MAX_PHOTOS ? [...prev, result] : prev,
                        );
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                  if (files.length > remaining) {
                    setPhotoError(`you can add up to ${MAX_PHOTOS} photos`);
                  }
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>
        {photoError && (
          <p
            className="text-xs font-body text-muted-foreground"
            data-ocid="review.photo_error_state"
          >
            {photoError}
          </p>
        )}
        <p className="text-xs font-body text-muted-foreground/70">
          up to {MAX_PHOTOS} photos of your product
        </p>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={createReview.isPending}
        className="rounded-2xl font-body h-12 w-full sm:w-auto"
        data-ocid="review.submit_button"
      >
        {createReview.isPending ? "Submitting…" : "Submit Review"}
      </Button>
    </form>
  );
}
