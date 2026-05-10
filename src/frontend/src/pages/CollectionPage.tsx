import { useNavigate, useSearch } from "@tanstack/react-router";
import { PackageOpen } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { ProductCard } from "../components/ProductCard";
import { ALL_PRODUCTS, CATEGORIES } from "../data/products";
import type { ProductCategory } from "../types/product";

type FilterCategory = "All" | ProductCategory;

const TABS: FilterCategory[] = ["All", ...CATEGORIES];

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

  function selectTab(tab: FilterCategory) {
    navigate({
      to: "/collection",
      search: tab !== "All" ? { category: tab } : {},
    });
  }

  const filteredSingle = useMemo(
    () => ALL_PRODUCTS.filter((p) => p.category === active),
    [active],
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

      {/* Category filter tabs */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex gap-1 overflow-x-auto py-3 scrollbar-none"
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
        </div>
      </div>

      {/* Product content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {active === "All" ? (
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
              {GROUPED.map(({ category, products, startIndex }) => {
                return (
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
                );
              })}
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
          Nothing here yet
        </p>
        <p className="mt-2 font-body text-sm text-muted-foreground max-w-xs">
          We're still adding products to <em>{category}</em>. Check back soon or
          browse all our handmade pieces.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-body font-medium transition-smooth hover:opacity-90"
        data-ocid="collection.empty_state.browse_all_button"
      >
        Browse All
      </button>
    </motion.div>
  );
}
