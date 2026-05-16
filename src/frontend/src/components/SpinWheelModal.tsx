import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useSpinWheel } from "../hooks/useSpinWheel";

const SEGMENTS = [
  { label: "5% off", discount: 5, color: "oklch(0.72 0.09 5 / 0.25)" },
  { label: "10% off", discount: 10, color: "oklch(0.72 0.05 145 / 0.22)" },
  { label: "15% off", discount: 15, color: "oklch(0.88 0.04 75 / 0.35)" },
  { label: "20% off", discount: 20, color: "oklch(0.86 0.06 25 / 0.28)" },
];

const SPIN_DURATION_MS = 2800;

export function SpinWheelModal() {
  const { shouldShowPopup, hasSpun, markSpun, getDiscountCode } =
    useSpinWheel();
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonDiscount, setWonDiscount] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [claimed, setClaimed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const hasShownRef = useRef(false);

  // Auto-show after 5 seconds if eligible
  useEffect(() => {
    if (hasShownRef.current) return;
    const timer = setTimeout(() => {
      if (shouldShowPopup()) {
        setOpen(true);
        hasShownRef.current = true;
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [shouldShowPopup]);

  function spinWheel() {
    if (spinning || wonDiscount !== null) return;
    setSpinning(true);

    const idx = Math.floor(Math.random() * SEGMENTS.length);
    const picked = SEGMENTS[idx];
    // Spin 5 full rotations + land on chosen segment
    const segmentDeg = 360 / SEGMENTS.length;
    const targetAngle = 360 * 5 + (360 - idx * segmentDeg - segmentDeg / 2);
    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setWonDiscount(picked.discount);
    }, SPIN_DURATION_MS);
  }

  function claimDiscount() {
    if (!email.trim() || !email.includes("@")) {
      setEmailError("please enter a valid email to claim your discount!");
      return;
    }
    if (wonDiscount === null) return;
    setEmailError("");
    markSpun(email.trim(), wonDiscount);
    setClaimed(true);
  }

  // If already spun in a previous session, don't show
  if (hasSpun()) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            onKeyUp={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            tabIndex={0}
            role="button"
            aria-label="close"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative z-10 w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-border/40"
            style={{ background: "oklch(0.97 0.012 75)" }}
            data-ocid="spin_wheel.dialog"
            aria-modal="true"
            aria-label="spin the wheel for a discount!"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="close discount wheel"
              data-ocid="spin_wheel.close_button"
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-card/80 border border-border/40 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="px-6 pt-8 pb-6 flex flex-col items-center gap-5 text-center">
              <div>
                <p className="font-body text-xs text-primary tracking-[0.18em] uppercase mb-1">
                  exclusive offer
                </p>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  🎡 spin & save!
                </h2>
                <p className="mt-2 font-body text-sm text-muted-foreground">
                  spin the wheel to unlock a special discount just for you 🌸
                </p>
              </div>

              {/* Wheel */}
              <div className="relative w-48 h-48 flex-shrink-0">
                {/* Pointer triangle */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderTop: "18px solid oklch(0.72 0.09 5)",
                  }}
                />

                <motion.div
                  className="w-full h-full rounded-full border-4 border-border/30 shadow-soft overflow-hidden"
                  style={{
                    background: `conic-gradient(
                      ${SEGMENTS[0].color} 0deg 90deg,
                      ${SEGMENTS[1].color} 90deg 180deg,
                      ${SEGMENTS[2].color} 180deg 270deg,
                      ${SEGMENTS[3].color} 270deg 360deg
                    )`,
                    rotate: rotation,
                    transition: spinning
                      ? `rotate ${SPIN_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
                      : "none",
                  }}
                  aria-hidden="true"
                >
                  {/* Segment labels */}
                  {SEGMENTS.map((seg, i) => {
                    const angle = i * 90 + 45; // centre of each 90deg segment
                    const rad = (angle * Math.PI) / 180;
                    const r = 56; // px from centre
                    const cx = 96 + r * Math.sin(rad);
                    const cy = 96 - r * Math.cos(rad);
                    return (
                      <span
                        key={seg.discount}
                        className="absolute font-body text-[11px] font-bold text-foreground/80 select-none"
                        style={{
                          left: cx,
                          top: cy,
                          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {seg.label}
                      </span>
                    );
                  })}

                  {/* Divider lines */}
                  {[0, 90, 180, 270].map((deg) => (
                    <div
                      key={deg}
                      aria-hidden="true"
                      className="absolute top-0 left-1/2 w-px h-1/2 bg-border/50 origin-bottom"
                      style={{
                        transform: `translateX(-50%) rotate(${deg}deg)`,
                      }}
                    />
                  ))}

                  {/* Centre dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-card border-2 border-border/40 z-10" />
                </motion.div>
              </div>

              {/* State: not yet spun */}
              {wonDiscount === null && (
                <button
                  type="button"
                  onClick={spinWheel}
                  disabled={spinning}
                  data-ocid="spin_wheel.spin_button"
                  className="w-full py-3 rounded-full font-body text-sm font-semibold transition-smooth disabled:opacity-60"
                  style={{
                    background: spinning
                      ? "oklch(0.88 0.04 75 / 0.5)"
                      : "oklch(0.72 0.09 5)",
                    color: spinning ? "oklch(0.40 0.04 5)" : "#fff",
                  }}
                >
                  {spinning ? "spinning..." : "spin the wheel! 🎡"}
                </button>
              )}

              {/* State: won, enter email */}
              {wonDiscount !== null && !claimed && (
                <div className="w-full flex flex-col gap-3">
                  <div
                    className="rounded-xl py-3 px-4 text-center"
                    style={{ background: "oklch(0.72 0.09 5 / 0.10)" }}
                    data-ocid="spin_wheel.success_state"
                  >
                    <p className="font-body text-sm text-muted-foreground">
                      you won!
                    </p>
                    <p className="font-display text-2xl font-semibold text-foreground">
                      {wonDiscount}% off 🎉
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      enter your email to claim your code
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      data-ocid="spin_wheel.email_input"
                      className="w-full px-4 py-2.5 rounded-full border border-border/60 bg-card text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                    />
                    {emailError && (
                      <p
                        className="text-xs font-body px-1"
                        style={{ color: "oklch(0.72 0.09 5)" }}
                      >
                        {emailError}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={claimDiscount}
                    data-ocid="spin_wheel.claim_button"
                    className="w-full py-3 rounded-full font-body text-sm font-semibold text-white transition-smooth hover:opacity-90"
                    style={{ background: "oklch(0.72 0.09 5)" }}
                  >
                    claim my discount!
                  </button>
                </div>
              )}

              {/* State: claimed */}
              {claimed && wonDiscount !== null && (
                <div
                  className="w-full rounded-xl py-4 px-4 flex flex-col items-center gap-2"
                  style={{ background: "oklch(0.72 0.05 145 / 0.14)" }}
                  data-ocid="spin_wheel.code_reveal"
                >
                  <p className="font-body text-sm text-muted-foreground">
                    your discount code:
                  </p>
                  <p
                    className="font-display text-2xl font-bold tracking-widest"
                    style={{ color: "oklch(0.45 0.09 145)" }}
                  >
                    {getDiscountCode(wonDiscount)}
                  </p>
                  <p className="font-body text-xs text-muted-foreground text-center">
                    mention this code when placing your order via WhatsApp 🌸
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    data-ocid="spin_wheel.done_button"
                    className="mt-1 px-6 py-2 rounded-full text-xs font-body font-semibold border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    start shopping →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
