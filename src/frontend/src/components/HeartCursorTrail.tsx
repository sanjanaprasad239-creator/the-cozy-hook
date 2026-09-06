import { useEffect, useRef } from "react";

const HEART_GLYPHS = ["♥", "♡"];
const TRAIL_COLORS = [
  "oklch(0.72 0.09 5 / 0.85)", // dusty rose
  "oklch(0.82 0.06 5 / 0.85)", // rose soft
  "oklch(0.72 0.05 145 / 0.85)", // sage
  "oklch(0.82 0.05 145 / 0.85)", // sage soft
];

/**
 * A small heart cursor trail that follows the mouse across the site.
 * Desktop only — hidden on touch / mobile devices and when the user prefers
 * reduced motion. Hearts alternate between the brand's dusty rose and sage
 * palette and drift upward before fading out.
 */
export function HeartCursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    // Desktop only: require a fine pointer with hover capability.
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!hoverQuery.matches) return;

    // Respect reduced-motion preferences.
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedQuery.matches) return;

    function spawn(x: number, y: number) {
      const container = containerRef.current;
      if (!container) return;
      const el = document.createElement("span");
      el.className = "heart-trail-particle";
      el.textContent =
        HEART_GLYPHS[Math.floor(Math.random() * HEART_GLYPHS.length)];
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.color =
        TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
      el.style.fontSize = `${12 + Math.random() * 10}px`;
      container.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }

    function onMouseMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastSpawnRef.current < 60) return;
      lastSpawnRef.current = now;
      spawn(e.clientX, e.clientY);
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[60]"
      aria-hidden="true"
    />
  );
}
