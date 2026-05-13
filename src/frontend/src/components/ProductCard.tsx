import { Button } from "@/components/ui/button";
import { Heart, Plus, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import type { Product } from "../types/product";

const CARD_IMAGE = "/assets/generated/hero-crochet.dim_1600x900.jpg";

const FAN_FAVOURITE_IDS = new Set([
  "plush-008",
  "wear-005",
  "decor-006",
  "decor-003",
]);

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  index?: number;
}

export function ProductCard({ product, onClick, index = 0 }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const isFanFavourite = FAN_FAVOURITE_IDS.has(product.id);
  const wishlisted = isInWishlist(product.id);

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    if (wishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="group cursor-pointer"
      onClick={onClick}
      data-ocid={`product.card.${index + 1}`}
    >
      <div
        className="bg-card rounded-2xl overflow-hidden border border-border/50 flex flex-col shadow-soft"
        style={{
          transition: "transform 220ms ease, box-shadow 220ms ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(-4px) scale(1.015)";
          el.style.boxShadow = "0 12px 32px rgba(58, 58, 58, 0.13)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "";
          el.style.boxShadow = "";
        }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={CARD_IMAGE}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />

          {/* Fan Favourite badge */}
          {isFanFavourite && (
            <span
              className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-medium leading-none select-none pointer-events-none"
              style={{
                background: "oklch(0.97 0.015 5 / 0.92)",
                color: "oklch(0.56 0.12 5)",
                border: "1px solid oklch(0.82 0.07 5 / 0.5)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              ✨ fan favourite
            </span>
          )}

          {/* New badge */}
          {product.isNew && (
            <span
              className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-body font-semibold leading-none select-none pointer-events-none"
              style={{
                background: "#D8A7B1",
                color: "#fff",
              }}
            >
              new
            </span>
          )}

          {/* Wishlist button */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={
              wishlisted
                ? `Remove ${product.name} from wishlist`
                : `Save ${product.name} to wishlist`
            }
            className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center bg-card/90 backdrop-blur-sm border border-border/40 transition-smooth opacity-0 group-hover:opacity-100 hover:scale-110 focus:opacity-100"
            data-ocid={`product.wishlist_button.${index + 1}`}
          >
            <Heart
              className="w-4 h-4 transition-colors"
              style={{ color: "#D8A7B1" }}
              fill={wishlisted ? "#D8A7B1" : "none"}
            />
          </button>

          {/* Quick add overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-smooth" />
        </div>

        {/* Details */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="font-display text-base font-semibold text-foreground line-clamp-1 leading-snug">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-xs line-clamp-2 font-body leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-2 gap-2">
            <span className="font-body font-semibold text-foreground text-sm">
              ₹{product.price}
            </span>
            <Button
              size="sm"
              variant={added ? "secondary" : "default"}
              className="rounded-xl text-xs h-8 px-3 gap-1 transition-smooth"
              onClick={handleAddToCart}
              data-ocid={`product.add_button.${index + 1}`}
            >
              {added ? (
                <>
                  <Plus className="w-3 h-3" />
                  added!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
