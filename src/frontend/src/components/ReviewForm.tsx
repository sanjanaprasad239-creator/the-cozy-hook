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

export function ReviewForm({ productId, onSuccess }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
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
      });
      setForm(INITIAL);
      setErrors({});
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
