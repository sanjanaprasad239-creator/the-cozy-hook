export function ProductPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-muted rounded-2xl gap-3 p-4">
      {/* Crochet loop SVG motif */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Yarn ball */}
        <circle
          cx="32"
          cy="36"
          r="18"
          fill="hsl(var(--primary)/0.15)"
          stroke="hsl(var(--primary)/0.4)"
          strokeWidth="1.5"
        />
        <path
          d="M16 30 Q32 20 48 30"
          stroke="hsl(var(--primary)/0.5)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M14 38 Q32 28 50 38"
          stroke="hsl(var(--primary)/0.4)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M16 46 Q32 36 48 46"
          stroke="hsl(var(--primary)/0.3)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Crochet hook */}
        <path
          d="M32 18 L32 8 Q32 4 36 4 Q40 4 40 8 Q40 12 36 12"
          stroke="hsl(var(--secondary)/0.7)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Stars / sparkles */}
        <circle cx="20" cy="20" r="1.5" fill="hsl(var(--primary)/0.4)" />
        <circle cx="44" cy="16" r="1" fill="hsl(var(--secondary)/0.5)" />
        <circle cx="50" cy="28" r="1.5" fill="hsl(var(--primary)/0.3)" />
      </svg>

      <span className="font-display text-xl font-semibold text-muted-foreground opacity-60 tracking-wide">
        {initials}
      </span>
    </div>
  );
}
