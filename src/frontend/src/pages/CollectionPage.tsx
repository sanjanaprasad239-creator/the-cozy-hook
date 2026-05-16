import { useNavigate, useSearch } from "@tanstack/react-router";
import { PackageOpen, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { ALL_PRODUCTS, CATEGORIES } from "../data/products";
import type { ProductCategory } from "../types/product";

type FilterCategory = "All" | ProductCategory;

const TABS: FilterCategory[] = ["All", ...CATEGORIES];

const PRICE_MIN = 79;
const PRICE_MAX = 499;

// Products grouped by category for "All" view, with pre-computed global indices
const GROUPED = (() => {
  let offset = 0;
  return CATEGORIES.map((cat) => {
    const products = ALL_PRODUCTS.filter((p) => p.category === cat);
    const startIndex = offset;
    offset += products.length;
    return { category: cat, products, startIndex };
  });
})();

export function CollectionPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { category?: string };

  // URL is the single source of truth
  const active: FilterCategory = (search.category as FilterCategory) ?? "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const isPriceFiltered = minPrice !== PRICE_MIN || maxPrice !== PRICE_MAX;

  function selectTab(tab: FilterCategory) {
    setSearchQuery("");
    navigate({
      to: "/collection",
      search: tab !== "All" ? { category: tab } : {},
    });
  }

  function clearPriceFilter() {
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
  }

  function handleMinChange(val: number) {
    setMinPrice(Math.min(val, maxPrice - 10));
  }

  function handleMaxChange(val: number) {
    setMaxPrice(Math.max(val, minPrice + 10));
  }

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
        p.price >= minPrice &&
        p.price <= maxPrice,
    );
  }, [searchQuery, minPrice, maxPrice]);

  const filteredSingle = useMemo(
    () =>
      ALL_PRODUCTS.filter(
        (p) =>
          p.category === active && p.price >= minPrice && p.price <= maxPrice,
      ),
    [active, minPrice, maxPrice],
  );

  // price-filtered grouped sections for "All" view
  const filteredGrouped = useMemo(
    () =>
      GROUPED.map((g) => ({
        ...g,
        products: g.products.filter(
          (p) => p.price >= minPrice && p.price <= maxPrice,
        ),
      })).filter((g) => g.products.length > 0),
    [minPrice, maxPrice],
  );

  return (
    <div className="min-h-screen bg-background" data-ocid="collection.page">
      {/* Page header */}
      <div className="bg-card border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl font-semibold text-foreground"
          >
            The Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-3 font-body text-muted-foreground text-base"
          >
            {ALL_PRODUCTS.length} handmade pieces, crafted with care and love
          </motion.p>
        </div>
      </div>

      {/* Search bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div
          className="relative max-w-lg mx-auto"
          data-ocid="collection.search_input"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-5 py-3 rounded-full border border-primary/30 bg-card text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
            aria-label="search products"
          />
        </div>
        {searchQuery.trim() && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-center font-body text-sm text-muted-foreground"
          >
            {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}{" "}
            for{" "}
            <span className="font-semibold text-foreground">
              '{searchQuery.trim()}'
            </span>
          </motion.p>
        )}
      </div>

      {/* Category filter tabs + price range */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category tabs */}
          <div
            className="flex gap-1 overflow-x-auto pt-3 pb-2 scrollbar-none"
            role="tablist"
            aria-label="Filter by category"
            data-ocid="collection.filter.tabs"
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active === tab}
                onClick={() => selectTab(tab)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 whitespace-nowrap ${
                  active === tab
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-ocid="collection.filter.tab"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Price range filter */}
          <div className="pb-3 pt-1" data-ocid="collection.price_filter">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-body text-xs text-muted-foreground font-medium tracking-wide">
                price range
              </span>
              <span className="font-body text-xs font-semibold text-foreground">
                ₹{minPrice} – ₹{maxPrice}
              </span>
              {isPriceFiltered && (
                <button
                  type="button"
                  onClick={clearPriceFilter}
                  className="flex items-center gap-0.5 font-body text-xs text-primary hover:text-primary/70 transition-colors duration-150 ml-auto"
                  aria-label="clear price filter"
                  data-ocid="collection.price_filter.clear_button"
                >
                  <X className="w-3 h-3" />
                  clear
                </button>
              )}
            </div>
            <PriceRangeSlider
              min={PRICE_MIN}
              max={PRICE_MAX}
              minValue={minPrice}
              maxValue={maxPrice}
              onMinChange={handleMinChange}
              onMaxChange={handleMaxChange}
            />
          </div>
        </div>
      </div>

      {/* Product content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {searchQuery.trim() ? (
            // ── Search results view ─────────────────────────────────────────
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              data-ocid="collection.search_results"
            >
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {searchResults.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={i}
                      onClick={() =>
                        navigate({
                          to: "/product/$id",
                          params: { id: product.id },
                        })
                      }
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center gap-5"
                  data-ocid="collection.search_empty_state"
                >
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-display text-xl text-foreground font-semibold">
                      no results found
                    </p>
                    <p className="mt-2 font-body text-sm text-muted-foreground max-w-xs">
                      {isPriceFiltered
                        ? "try adjusting the price range or search term."
                        : "try a different search term or browse all our handmade pieces below."}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-2 flex-wrap justify-center">
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-body font-medium transition-smooth hover:opacity-90"
                      data-ocid="collection.search_empty_state.clear_button"
                    >
                      clear search
                    </button>
                    {isPriceFiltered && (
                      <button
                        type="button"
                        onClick={clearPriceFilter}
                        className="px-6 py-2.5 rounded-full border border-primary/40 text-primary text-sm font-body font-medium transition-smooth hover:bg-primary/10"
                        data-ocid="collection.search_empty_state.clear_price_button"
                      >
                        reset price
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : active === "All" ? (
            // ── All categories view with section headers ───────────────────
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-16"
              data-ocid="collection.all_sections"
            >
              {filteredGrouped.length > 0 ? (
                filteredGrouped.map(({ category, products, startIndex }) => (
                  <section
                    key={category}
                    data-ocid={`collection.section.${category.toLowerCase().replace(" ", "_")}`}
                  >
                    {/* Section header */}
                    <div className="flex items-baseline gap-4 mb-6">
                      <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                        {category}
                      </h2>
                      <span className="font-body text-sm text-muted-foreground">
                        {products.length} items
                      </span>
                    </div>
                    <div className="w-12 h-0.5 bg-primary rounded-full mb-8" />

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {products.map((product, i) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          index={startIndex + i}
                          onClick={() =>
                            navigate({
                              to: "/product/$id",
                              params: { id: product.id },
                            })
                          }
                        />
                      ))}
                    </div>
                  </section>
                ))
              ) : (
                <PriceEmptyState onReset={clearPriceFilter} />
              )}
            </motion.div>
          ) : (
            // ── Single category filtered view ─────────────────────────────
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              data-ocid="collection.filtered_grid"
            >
              {/* Category heading for filtered view */}
              <div className="mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  {active}
                </h2>
                <div className="w-12 h-0.5 bg-primary rounded-full mt-3" />
              </div>

              {filteredSingle.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredSingle.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={i}
                      onClick={() =>
                        navigate({
                          to: "/product/$id",
                          params: { id: product.id },
                        })
                      }
                    />
                  ))}
                </div>
              ) : isPriceFiltered ? (
                <PriceEmptyState onReset={clearPriceFilter} />
              ) : (
                <EmptyState
                  category={active}
                  onReset={() => selectTab("All")}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Price range slider ─────────────────────────────────────────────────────────
interface PriceRangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onMinChange: (v: number) => void;
  onMaxChange: (v: number) => void;
}

function PriceRangeSlider({
  min,
  max,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: PriceRangeSliderProps) {
  const rangeRef = useRef<HTMLDivElement>(null);
  const range = max - min;
  const leftPct = ((minValue - min) / range) * 100;
  const rightPct = 100 - ((maxValue - min) / range) * 100;

  return (
    <div
      ref={rangeRef}
      className="relative h-5 flex items-center"
      aria-label="price range slider"
      data-ocid="collection.price_filter.slider"
    >
      {/* Track background */}
      <div className="absolute inset-x-0 h-1.5 rounded-full bg-muted" />
      {/* Active track fill */}
      <div
        className="absolute h-1.5 rounded-full bg-secondary"
        style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
      />
      {/* Min handle */}
      <input
        type="range"
        min={min}
        max={max}
        step={10}
        value={minValue}
        onChange={(e) => onMinChange(Number(e.target.value))}
        className="price-range-input absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer"
        aria-label="minimum price"
        data-ocid="collection.price_filter.min_input"
      />
      {/* Max handle */}
      <input
        type="range"
        min={min}
        max={max}
        step={10}
        value={maxValue}
        onChange={(e) => onMaxChange(Number(e.target.value))}
        className="price-range-input absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer"
        aria-label="maximum price"
        data-ocid="collection.price_filter.max_input"
      />
    </div>
  );
}

// ── Price empty state ──────────────────────────────────────────────────────────
function PriceEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-24 text-center gap-5"
      data-ocid="collection.price_empty_state"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <PackageOpen className="w-8 h-8 text-muted-foreground" />
      </div>
      <div>
        <p className="font-display text-xl text-foreground font-semibold">
          no products in this range
        </p>
        <p className="mt-2 font-body text-sm text-muted-foreground max-w-xs">
          none of our handmade pieces fall in the selected price range. try
          widening the filter.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-body font-medium transition-smooth hover:opacity-90"
        data-ocid="collection.price_empty_state.reset_button"
      >
        reset price filter
      </button>
    </motion.div>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────────
interface EmptyStateProps {
  category: string;
  onReset: () => void;
}

function EmptyState({ category, onReset }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-24 text-center gap-5"
      data-ocid="collection.empty_state"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <PackageOpen className="w-8 h-8 text-muted-foreground" />
      </div>
      <div>
        <p className="font-display text-xl text-foreground font-semibold">
          nothing here yet
        </p>
        <p className="mt-2 font-body text-sm text-muted-foreground max-w-xs">
          we're still adding products to <em>{category}</em>. check back soon or
          browse all our handmade pieces.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-body font-medium transition-smooth hover:opacity-90"
        data-ocid="collection.empty_state.browse_all_button"
      >
        browse all
      </button>
    </motion.div>
  );
}
