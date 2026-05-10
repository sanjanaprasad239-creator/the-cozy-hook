interface ReviewStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive?: false;
}

interface ReviewStarsInteractiveProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive: true;
  onRate: (rating: number) => void;
}

type Props = ReviewStarsProps | ReviewStarsInteractiveProps;

const SIZES = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

function HeartIcon({
  filled,
  className,
}: { filled: boolean; className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill={filled ? "#D8A7B1" : "none"}
      stroke="#D8A7B1"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}

export function ReviewStars(props: Props) {
  const { rating, max = 5, size = "md" } = props;
  const isInteractive = "interactive" in props && props.interactive;
  const sizeClass = SIZES[size];

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of ${max} hearts`}
    >
      {Array.from({ length: max }, (_, i) => {
        const idx = i + 1;
        const filled = idx <= rating;
        if (isInteractive) {
          const { onRate } = props as ReviewStarsInteractiveProps;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onRate(idx)}
              className="cursor-pointer hover:scale-110 transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              aria-label={`Rate ${idx} out of ${max}`}
            >
              <HeartIcon filled={filled} className={sizeClass} />
            </button>
          );
        }
        return <HeartIcon key={idx} filled={filled} className={sizeClass} />;
      })}
    </div>
  );
}
