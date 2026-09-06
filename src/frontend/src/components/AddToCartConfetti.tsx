import { useEffect, useRef, useState } from "react";
import { useCart } from "../hooks/useCart";

interface Particle {
  id: number;
  left: number;
  top: number;
  tx: number;
  ty: number;
  tr: number;
  color: string;
  petal: boolean;
}

const PETAL_COLORS = [
  "oklch(0.72 0.09 5 / 0.9)", // dusty rose
  "oklch(0.82 0.06 5 / 0.9)", // rose soft
  "oklch(0.9 0.04 5 / 0.9)", // rose pale
  "oklch(0.72 0.05 145 / 0.9)", // sage
  "oklch(0.82 0.05 145 / 0.9)", // sage soft
  "oklch(0.9 0.018 70 / 0.9)", // warm beige
];

const BURST_COUNT = 20;

/**
 * A soft pastel petal / confetti burst that plays whenever an item is added to
 * the cart. It subscribes to the cart store and fires from the centre of the
 * viewport whenever the total quantity increases, regardless of where the
 * "add to cart" action originated.
 */
export function AddToCartConfetti() {
  const itemCount = useCart((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const [particles, setParticles] = useState<Particle[]>([]);
  const prevCountRef = useRef(itemCount);
  const idRef = useRef(0);

  useEffect(() => {
    const prev = prevCountRef.current;
    prevCountRef.current = itemCount;
    if (itemCount <= prev) return;

    const originX = window.innerWidth / 2;
    const originY = window.innerHeight / 2;

    const burst: Particle[] = Array.from({ length: BURST_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 70 + Math.random() * 130;
      return {
        id: idRef.current++,
        left: originX,
        top: originY,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - 50,
        tr: (Math.random() - 0.5) * 360,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        petal: Math.random() > 0.35,
      };
    });

    setParticles((p) => [...p, ...burst]);
    const timer = setTimeout(() => {
      setParticles((p) => p.filter((pt) => !burst.some((b) => b.id === pt.id)));
    }, 1100);
    return () => clearTimeout(timer);
  }, [itemCount]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[70]"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={`petal-burst-particle ${p.petal ? "petal" : ""}`}
          style={{
            left: p.left,
            top: p.top,
            background: p.color,
            ["--tx" as string]: `${p.tx}px`,
            ["--ty" as string]: `${p.ty}px`,
            ["--tr" as string]: `${p.tr}deg`,
          }}
        />
      ))}
    </div>
  );
}
