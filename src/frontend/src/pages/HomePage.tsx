import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CustomOrderModal } from "../components/CustomOrderModal";
import { ProductCard } from "../components/ProductCard";
import { SpinWheelModal } from "../components/SpinWheelModal";
import {
  ALL_PRODUCTS,
  FEATURED_PRODUCT_IDS,
  getFeaturedProducts,
  getProductById,
} from "../data/products";
import { useAdmin } from "../hooks/useAdmin";
import { loadAllReviews } from "../hooks/useQueries";

// ── Category card data ──────────────────────────────────────────────────────
const CATEGORY_CARDS = [
  {
    name: "Plushies",
    desc: "Soft friends for every shelf",
    color: "text-primary",
    bg: "bg-primary/8",
    svgPath: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-16 h-16"
      >
        <ellipse
          cx="28"
          cy="22"
          rx="7"
          ry="13"
          fill="currentColor"
          opacity="0.28"
        />
        <ellipse
          cx="52"
          cy="22"
          rx="7"
          ry="13"
          fill="currentColor"
          opacity="0.28"
        />
        <circle cx="40" cy="48" r="20" fill="currentColor" opacity="0.18" />
        <circle cx="40" cy="48" r="14" fill="currentColor" opacity="0.2" />
        <circle cx="35" cy="45" r="2.5" fill="currentColor" opacity="0.65" />
        <circle cx="45" cy="45" r="2.5" fill="currentColor" opacity="0.65" />
        <path
          d="M37 52 Q40 55 43 52"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    ),
  },
  {
    name: "Keychains",
    desc: "Tiny charms, big personality",
    color: "text-secondary",
    bg: "bg-secondary/10",
    svgPath: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-16 h-16"
      >
        <circle
          cx="32"
          cy="36"
          r="14"
          stroke="currentColor"
          strokeWidth="3"
          opacity="0.38"
        />
        <circle cx="32" cy="36" r="8" fill="currentColor" opacity="0.2" />
        <rect
          x="44"
          y="34"
          width="18"
          height="5"
          rx="2.5"
          fill="currentColor"
          opacity="0.32"
        />
        <rect
          x="54"
          y="34"
          width="6"
          height="11"
          rx="2.5"
          fill="currentColor"
          opacity="0.26"
        />
        <circle cx="32" cy="36" r="3" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Wearables",
    desc: "Cozy knits to wear with love",
    color: "text-foreground",
    bg: "bg-accent/30",
    svgPath: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-16 h-16"
      >
        <path
          d="M20 30 Q26 18 40 18 Q54 18 60 30 L64 62 H50 L40 52 L30 62 H16 Z"
          fill="currentColor"
          opacity="0.16"
        />
        <path
          d="M30 18 Q35 27 40 27 Q45 27 50 18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.38"
        />
        <path
          d="M22 36 Q26 34 30 36"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M50 36 Q54 34 58 36"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M26 48 Q31 46 36 48"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M44 48 Q49 46 54 48"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    ),
  },
  {
    name: "Home Decor",
    desc: "Handmade touches for your home",
    color: "text-secondary",
    bg: "bg-secondary/8",
    svgPath: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-16 h-16"
      >
        <rect
          x="18"
          y="42"
          width="44"
          height="24"
          rx="4"
          fill="currentColor"
          opacity="0.16"
        />
        <path
          d="M12 44 L40 20 L68 44"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.36"
        />
        <rect
          x="31"
          y="52"
          width="18"
          height="14"
          rx="3"
          fill="currentColor"
          opacity="0.26"
        />
        <circle cx="40" cy="36" r="4" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: "Accessories",
    desc: "Cute add-ons for everyday style",
    color: "text-primary",
    bg: "bg-primary/6",
    svgPath: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-16 h-16"
      >
        <circle cx="40" cy="40" r="8" fill="currentColor" opacity="0.48" />
        <ellipse
          cx="40"
          cy="20"
          rx="7"
          ry="5"
          fill="currentColor"
          opacity="0.2"
        />
        <ellipse
          cx="40"
          cy="60"
          rx="7"
          ry="5"
          fill="currentColor"
          opacity="0.2"
        />
        <ellipse
          cx="20"
          cy="40"
          rx="5"
          ry="7"
          fill="currentColor"
          opacity="0.2"
        />
        <ellipse
          cx="60"
          cy="40"
          rx="5"
          ry="7"
          fill="currentColor"
          opacity="0.2"
        />
        <ellipse
          cx="26"
          cy="26"
          rx="5"
          ry="4"
          fill="currentColor"
          opacity="0.16"
          transform="rotate(-45 26 26)"
        />
        <ellipse
          cx="54"
          cy="26"
          rx="5"
          ry="4"
          fill="currentColor"
          opacity="0.16"
          transform="rotate(45 54 26)"
        />
        <ellipse
          cx="26"
          cy="54"
          rx="5"
          ry="4"
          fill="currentColor"
          opacity="0.16"
          transform="rotate(45 26 54)"
        />
        <ellipse
          cx="54"
          cy="54"
          rx="5"
          ry="4"
          fill="currentColor"
          opacity="0.16"
          transform="rotate(-45 54 54)"
        />
      </svg>
    ),
  },
];

// ── How It Works steps ────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "🛍️",
    title: "Browse & Pick",
    desc: "Explore our handmade collection and add your favourites to cart.",
  },
  {
    step: "02",
    icon: "💬",
    title: "Order via WhatsApp",
    desc: "Submit your cart and we confirm your order personally via WhatsApp.",
  },
  {
    step: "03",
    icon: "🧶",
    title: "Handmade with Love",
    desc: "Your item is carefully crafted by hand, just for you.",
  },
  {
    step: "04",
    icon: "📦",
    title: "Delivered to You",
    desc: "Packaged with care and delivered to your door in 5–7 days.",
  },
];

// ── Fallback sample reviews ───────────────────────────────────────────────────
const SAMPLE_REVIEWS = [
  {
    id: -1,
    reviewer: "Priya S.",
    rating: 5,
    text: "The Heart Pillow is absolutely adorable! Packaging was so cute — came in a little pastel bag with a ribbon.",
    product: "Heart Pillow",
  },
  {
    id: -2,
    reviewer: "Meera K.",
    rating: 5,
    text: "My strawberry bunny arrived so quickly and is even cuter in person! Sanjana's work is so detailed.",
    product: "Strawberry Costumed Bunny",
  },
  {
    id: -3,
    reviewer: "Nishitha",
    rating: 5,
    text: "hello sanjana, i'm so glad i had the opportunity to order these beautiful handmade plushies for my daughters. they are truly special—crafted with so much love and care. it's not just a toy, but a wonderful piece of art that reflects your talent so beautifully. thank you once again—it was a pleasure doing business with you! 😄",
    product: "Plushie",
  },
];

// ── Animation helpers ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

// ── Star display (heart-shaped dusty rose) ─────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={`star-${n}`}
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path
            d="M10 16.5C10 16.5 2 11.5 2 6C2 3.8 3.8 2 6 2C7.7 2 9.1 3 10 4.4C10.9 3 12.3 2 14 2C16.2 2 18 3.8 18 6C18 11.5 10 16.5 10 16.5Z"
            fill={n <= rating ? "oklch(0.72 0.09 5)" : "none"}
            stroke={
              n <= rating ? "oklch(0.72 0.09 5)" : "oklch(0.72 0.09 5 / 0.3)"
            }
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export function HomePage() {
  const navigate = useNavigate();
  const [customOrderOpen, setCustomOrderOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { settings } = useAdmin();
  const activeBundles = (settings?.bundles ?? [])
    .filter((b: { isActive: boolean }) => b.isActive)
    .slice(0, 3);
  const pressEntries = settings?.pressEntries ?? [];
  const currentlyCrafting = settings?.currentlyCrafting ?? "";

  const featuredProducts = getFeaturedProducts(
    settings.featuredProductIds.length
      ? settings.featuredProductIds
      : FEATURED_PRODUCT_IDS,
  );

  const newArrivals = ALL_PRODUCTS.filter((p) => p.isNew);

  // Load reviews from localStorage, fall back to sample reviews
  const allStoredReviews = loadAllReviews();
  const highlightReviews =
    allStoredReviews.length >= 2
      ? allStoredReviews.slice(-3).map((r) => ({
          id: r.id,
          reviewer: r.authorName,
          rating: r.rating,
          text: r.reviewText,
          product: r.productId,
        }))
      : SAMPLE_REVIEWS;

  return (
    <>
      {/* ── SEASONAL BANNER ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {!bannerDismissed && (
          <motion.div
            data-ocid="seasonal_banner.section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="relative flex items-center justify-center gap-3 px-6 py-3 text-center"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.72 0.05 145 / 0.18) 0%, oklch(0.72 0.09 5 / 0.14) 50%, oklch(0.72 0.05 145 / 0.18) 100%)",
                borderBottom: "1px solid oklch(0.72 0.09 5 / 0.15)",
              }}
            >
              <span className="text-base" aria-hidden="true">
                ✿
              </span>
              <p className="font-body text-sm text-foreground/80">
                <span className="font-semibold text-foreground">
                  Spring Collection is here ✿
                </span>
                <span className="hidden sm:inline text-muted-foreground">
                  {" "}
                  — Handcrafted with love, delivered to your door.
                </span>
              </p>
              <Link
                to="/collection"
                className="hidden sm:inline-flex font-body text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                data-ocid="seasonal_banner.link"
              >
                Shop Now →
              </Link>
              <button
                type="button"
                aria-label="Dismiss banner"
                onClick={() => setBannerDismissed(true)}
                data-ocid="seasonal_banner.close_button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        data-ocid="hero.section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.88 0.05 5 / 0.45) 0%, oklch(0.97 0.012 75) 50%, oklch(0.85 0.04 145 / 0.28) 100%)",
          }}
        />

        {/* Soft background blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-accent/15 blur-2xl" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('/assets/generated/hero-crochet.dim_1600x900.jpg')",
            }}
          />
        </div>

        {/* Floating decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden select-none"
        >
          <motion.span
            animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5.5,
              ease: "easeInOut",
            }}
            className="absolute top-[12%] right-[14%] text-5xl opacity-35"
          >
            🧶
          </motion.span>
          <motion.span
            animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 7,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-[20%] left-[10%] text-4xl opacity-25"
          >
            🧵
          </motion.span>
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4.5,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-[40%] right-[6%] text-3xl opacity-20"
          >
            ✂️
          </motion.span>
          <motion.span
            animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 6,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-[20%] left-[8%] text-4xl opacity-20"
          >
            🌸
          </motion.span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex justify-center mb-7"
          >
            <span className="text-6xl drop-shadow-sm" aria-hidden="true">
              🧶
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-xs font-medium tracking-[0.22em] text-primary uppercase mb-4"
          >
            Handmade with love ✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-foreground tracking-tight leading-none"
            data-ocid="hero.title"
          >
            {settings.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="mt-5 text-lg md:text-xl font-body italic text-muted-foreground tracking-wide"
            data-ocid="hero.tagline"
          >
            {settings.heroTagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/collection" data-ocid="hero.explore_button">
              <Button
                size="lg"
                className="rounded-full px-10 py-6 font-body text-base shadow-boutique hover:shadow-boutique-lg transition-smooth w-full sm:w-auto"
              >
                Explore Collection
              </Button>
            </Link>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="rounded-full px-10 py-6 font-body text-base border-border/60 hover:bg-muted/70 transition-smooth"
              onClick={() => setCustomOrderOpen(true)}
              data-ocid="hero.custom_orders_button"
            >
              Custom Orders
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
            className="w-5 h-9 rounded-full border-2 border-foreground/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-foreground/30" />
          </motion.div>
        </motion.div>
      </section>

      {currentlyCrafting && (
        <section className="py-6 px-4">
          <div className="max-w-2xl mx-auto bg-[#F7F3EE] border border-[#A8B5A2]/30 rounded-xl p-6 text-center">
            <p className="text-2xl mb-2">🧶</p>
            <h3 className="font-display text-lg text-[#3A3A3A] mb-1">
              currently crafting ✨
            </h3>
            <p className="text-sm text-[#3A3A3A]/70">{currentlyCrafting}</p>
          </div>
        </section>
      )}

      {/* ── NEW ARRIVALS ───────────────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section
          data-ocid="new_arrivals.section"
          className="bg-background py-24 px-6"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <motion.p
                custom={0}
                variants={fadeUp}
                className="text-xs font-body text-primary tracking-[0.2em] uppercase mb-3"
              >
                just dropped
              </motion.p>
              <motion.h2
                custom={1}
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl font-semibold text-foreground"
              >
                new arrivals ✨
              </motion.h2>
              <motion.div
                custom={2}
                variants={fadeUp}
                className="mt-4 mx-auto w-14 h-0.5 rounded-full bg-primary/40"
              />
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {newArrivals.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onClick={() =>
                    navigate({ to: "/product/$id", params: { id: product.id } })
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CATEGORY CARDS ────────────────────────────────────────────────── */}
      <section
        data-ocid="categories.section"
        className="bg-muted/30 py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs font-body text-muted-foreground tracking-[0.2em] uppercase mb-3"
            >
              Browse by type
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-semibold text-foreground"
            >
              Shop by Category
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {CATEGORY_CARDS.map((cat, i) => (
              <motion.div
                key={cat.name}
                custom={i}
                initial="hidden"
                whileInView="show"
                variants={fadeUp}
                viewport={{ once: true }}
              >
                <Link
                  to="/collection"
                  search={{ category: cat.name }}
                  data-ocid={`categories.item.${i + 1}`}
                  className="block group"
                >
                  <div
                    className={`${cat.bg} ${cat.color} rounded-3xl p-6 flex flex-col items-center gap-4 text-center border border-border/30 shadow-soft hover:shadow-boutique hover:-translate-y-2 transition-smooth cursor-pointer`}
                  >
                    <div className="transition-smooth group-hover:scale-110">
                      {cat.svgPath}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
                        {cat.name}
                      </h3>
                      <p className="mt-1 text-xs font-body text-muted-foreground leading-snug">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {activeBundles.length > 0 && (
        <section className="py-12 px-4 bg-[#F7F3EE]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl text-[#3A3A3A] text-center mb-2">
              bundle & save
            </h2>
            <p className="text-center text-[#3A3A3A]/60 mb-8">
              better together, better value
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeBundles.map(
                (bundle: {
                  id: string;
                  name: string;
                  savings: number;
                  description: string;
                  productIds?: string[];
                  price: number;
                }) => (
                  <div
                    key={bundle.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8DED3]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display text-lg text-[#3A3A3A]">
                        {bundle.name}
                      </h3>
                      <span className="bg-[#D8A7B1] text-white text-xs px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                        save ₹{bundle.savings}
                      </span>
                    </div>
                    <p className="text-sm text-[#3A3A3A]/60 mb-3">
                      {bundle.description}
                    </p>
                    <div className="mb-4">
                      {bundle.productIds?.map((pid: string) => {
                        const p = getProductById(pid);
                        return p ? (
                          <p key={pid} className="text-xs text-[#3A3A3A]/70">
                            • {p.name}
                          </p>
                        ) : null;
                      })}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-semibold text-[#D8A7B1]">
                        ₹{bundle.price}
                      </span>
                    </div>
                    <a
                      href={`https://wa.me/918660099085?text=${encodeURIComponent(`hi! i'd like to order the ${bundle.name} bundle`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-[#25D366] text-white py-2 rounded-full text-sm hover:bg-[#20BA5A] transition-colors"
                    >
                      order via whatsapp
                    </a>
                  </div>
                ),
              )}
            </div>
            <div className="text-center mt-6">
              <Link
                to="/bundles"
                className="text-[#D8A7B1] hover:underline text-sm"
              >
                see all bundles →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section
        data-ocid="how_it_works.section"
        className="bg-background py-24 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs font-body text-primary tracking-[0.2em] uppercase mb-3"
            >
              Simple & personal
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-semibold text-foreground"
            >
              How It Works
            </motion.h2>
            <motion.div
              custom={2}
              variants={fadeUp}
              className="mt-4 mx-auto w-14 h-0.5 rounded-full bg-primary/40"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line — desktop only */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />

            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                initial="hidden"
                whileInView="show"
                variants={fadeUp}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-4"
              >
                {/* Step circle */}
                <div className="relative flex items-center justify-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-soft border border-border/40"
                    style={{ background: "oklch(0.97 0.012 75)" }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-body font-bold text-primary-foreground"
                    style={{ background: "oklch(0.72 0.09 5)" }}
                  >
                    {i + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm font-body text-muted-foreground leading-relaxed max-w-[180px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────────────── */}
      <section data-ocid="featured.section" className="bg-muted/20 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs font-body text-primary tracking-[0.2em] uppercase mb-3"
            >
              Handpicked for you
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-semibold text-foreground"
            >
              Featured Creations
            </motion.h2>
            <motion.div
              custom={2}
              variants={fadeUp}
              className="mt-4 mx-auto w-14 h-0.5 rounded-full bg-primary/40"
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {featuredProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onClick={() =>
                  navigate({ to: "/product/$id", params: { id: product.id } })
                }
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-12 text-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-10 font-body border-border/60 hover:bg-muted transition-smooth"
              onClick={() => navigate({ to: "/collection" })}
              data-ocid="featured.view_all_button"
            >
              View All Products
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xs uppercase tracking-widest text-[#3A3A3A]/40 mb-4">
            as seen in
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {(pressEntries.length > 0
              ? pressEntries
              : [
                  {
                    id: "1",
                    title: "handmade india weekly, may 2025",
                    link: "#",
                    date: "2025-05-01",
                  },
                  {
                    id: "2",
                    title: "top crochet shops on instagram, april 2025",
                    link: "#",
                    date: "2025-04-01",
                  },
                ]
            ).map(
              (entry: {
                id: string;
                title: string;
                link: string;
                date: string;
              }) => (
                <a
                  key={entry.id}
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#E8DED3] text-[#3A3A3A]/70 text-sm px-4 py-2 rounded-full hover:bg-[#D8A7B1] hover:text-white transition-colors"
                >
                  {entry.title}
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ──────────────────────────────────────────────── */}
      <section data-ocid="reviews.section" className="bg-background py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs font-body text-primary tracking-[0.2em] uppercase mb-3"
            >
              What our customers say
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-semibold text-foreground"
            >
              Made with love, felt in every stitch
            </motion.h2>
            <motion.div
              custom={2}
              variants={fadeUp}
              className="mt-4 mx-auto w-14 h-0.5 rounded-full bg-primary/40"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlightReviews.map((review, i) => (
              <motion.div
                key={review.id}
                custom={i}
                initial="hidden"
                whileInView="show"
                variants={fadeUp}
                viewport={{ once: true }}
                data-ocid={`reviews.item.${i + 1}`}
              >
                <div className="h-full rounded-3xl border border-border/40 bg-card p-7 shadow-soft flex flex-col gap-4 hover:shadow-boutique transition-smooth">
                  {/* Stars */}
                  <StarRating rating={review.rating} />

                  {/* Review text */}
                  <p className="font-body text-sm text-foreground/80 leading-relaxed flex-1 italic">
                    "{review.text}"
                  </p>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border/30">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-body text-primary-foreground flex-shrink-0"
                      style={{ background: "oklch(0.72 0.09 5 / 0.7)" }}
                    >
                      {review.reviewer.charAt(0)}
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-foreground leading-tight">
                        {review.reviewer}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {review.product}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOM ORDERS CTA ─────────────────────────────────────────────── */}
      <section
        data-ocid="custom_orders_cta.section"
        className="bg-primary/8 py-20 px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Decorative dots */}
          <div className="flex justify-center gap-2 mb-6" aria-hidden="true">
            {(
              ["bg-primary/40", "bg-secondary/50", "bg-primary/30"] as const
            ).map((c, i) => (
              <div
                key={c}
                className={`w-2 rounded-full ${c}`}
                style={{ height: 28, marginTop: i === 1 ? 0 : 8 }}
              />
            ))}
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            Something special in mind?
          </h2>
          <p className="mt-4 font-body text-muted-foreground text-base md:text-lg leading-relaxed">
            I take custom orders for plushies, keychains, wearables, and more.
            Share your idea and I'll bring it to life — in your chosen colours,
            sizes, and characters.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              type="button"
              size="lg"
              className="rounded-full px-10 py-6 font-body text-base shadow-boutique hover:shadow-boutique-lg transition-smooth"
              onClick={() => setCustomOrderOpen(true)}
              data-ocid="custom_orders_cta.open_modal_button"
            >
              Request a Custom Order
            </Button>
            <Link to="/contact" data-ocid="custom_orders_cta.contact_link">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-10 py-6 font-body text-base border-border/60 hover:bg-muted transition-smooth w-full sm:w-auto"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── CUSTOM ORDER MODAL ────────────────────────────────────────────── */}
      <CustomOrderModal
        open={customOrderOpen}
        onClose={() => setCustomOrderOpen(false)}
      />
      <SpinWheelModal />
    </>
  );
}
