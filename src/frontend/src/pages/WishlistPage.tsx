import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { useWishlist } from "../hooks/useWishlist";

export function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();

  if (wishlistItems.length === 0) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4"
        data-ocid="wishlist.empty_state"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center"
        >
          <Heart className="w-10 h-10" style={{ color: "#D8A7B1" }} />
        </motion.div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
            your wishlist is empty
          </h2>
          <p className="text-muted-foreground font-body text-sm max-w-xs mx-auto leading-relaxed">
            save your favourite handmade pieces here — tap the heart on any
            product to add it.
          </p>
        </div>
        <Button
          asChild
          className="rounded-xl font-body px-8"
          data-ocid="wishlist.shop_button"
        >
          <Link to="/collection">browse the collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      data-ocid="wishlist.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between gap-4 mb-10 flex-wrap"
      >
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground flex items-center gap-2">
            <Heart className="w-7 h-7" style={{ color: "#D8A7B1" }} />
            your wishlist
          </h1>
          <p className="text-muted-foreground font-body mt-1 text-sm">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "saved item" : "saved items"}
          </p>
        </div>
        <button
          type="button"
          onClick={clearWishlist}
          className="flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-destructive transition-colors"
          data-ocid="wishlist.clear_button"
        >
          <Trash2 className="w-3.5 h-3.5" />
          clear all
        </button>
      </motion.div>

      {/* Grid */}
      <AnimatePresence>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlistItems.map((product, i) => (
            <div
              key={product.id}
              className="relative"
              data-ocid={`wishlist.item.${i + 1}`}
            >
              <ProductCard
                product={product}
                index={i}
                onClick={() =>
                  navigate({ to: "/product/$id", params: { id: product.id } })
                }
              />
              <button
                type="button"
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border/40 text-destructive hover:bg-destructive/10 transition-smooth z-10"
                aria-label={`Remove ${product.name} from wishlist`}
                data-ocid={`wishlist.remove_button.${i + 1}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-10 text-center"
      >
        <Button
          variant="outline"
          asChild
          className="rounded-xl font-body px-8 border-border/60 hover:bg-muted"
          data-ocid="wishlist.continue_button"
        >
          <Link to="/collection">continue browsing</Link>
        </Button>
      </motion.div>
    </div>
  );
}
