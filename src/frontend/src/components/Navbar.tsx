import { Button } from "@/components/ui/button";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCartTotals } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { CustomOrderModal } from "./CustomOrderModal";

const NAV_LINKS = [
  { label: "home", to: "/" },
  { label: "collection", to: "/collection" },
  { label: "our story", to: "/our-story" },
  { label: "journal", to: "/journal" },
  { label: "contact", to: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [customOrderOpen, setCustomOrderOpen] = useState(false);
  const { itemCount } = useCartTotals();
  const { wishlistItems } = useWishlist();
  const wishlistCount = wishlistItems.length;
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const navigate = useNavigate();

  return (
    <>
      <header
        className="sticky top-0 z-30 bg-card border-b border-border shadow-soft"
        data-ocid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 shrink-0"
              data-ocid="navbar.logo_link"
            >
              <img
                src="/assets/images/cozy-hook-logo.png"
                alt="The Cozy Hook Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="font-display text-lg font-semibold text-foreground hidden sm:block leading-tight">
                the cozy hook
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  currentPath === link.to ||
                  (link.to !== "/" && currentPath.startsWith(link.to));
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-3 py-2 text-sm font-body font-medium transition-smooth group ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-ocid={`navbar.${link.label.toLowerCase().replace(" ", "_")}_link`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-1 left-3 right-3 h-0.5 bg-primary rounded-full transition-smooth origin-left ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Custom Orders btn — desktop */}
              <Button
                variant="default"
                size="sm"
                className="hidden md:flex rounded-xl font-body text-xs gap-1.5 h-8"
                onClick={() => setCustomOrderOpen(true)}
                data-ocid="navbar.custom_orders_button"
              >
                ✨ custom orders
              </Button>

              {/* YouTube link — desktop */}
              <a
                href="https://www.youtube.com/@thecozyhookworld"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex p-2 rounded-full hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
                data-ocid="navbar.youtube_link"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="sr-only">The Cozy Hook YouTube channel</span>
              </a>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => navigate({ to: "/wishlist" })}
                className="relative p-2 rounded-full hover:bg-muted transition-smooth text-foreground"
                aria-label={`Wishlist, ${wishlistCount} items`}
                data-ocid="navbar.wishlist_button"
              >
                <Heart className="w-5 h-5" style={{ color: "#D8A7B1" }} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-body font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                type="button"
                onClick={() => navigate({ to: "/cart" })}
                className="relative p-2 rounded-full hover:bg-muted transition-smooth text-foreground"
                aria-label={`Cart, ${itemCount} items`}
                data-ocid="navbar.cart_button"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-body font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>

              {/* Hamburger */}
              <button
                type="button"
                className="md:hidden p-2 rounded-full hover:bg-muted transition-smooth"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle mobile menu"
                data-ocid="navbar.menu_toggle"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-border bg-card overflow-hidden"
              data-ocid="navbar.mobile_menu"
            >
              <nav className="px-4 py-3 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-3 py-2.5 text-sm font-body font-medium text-foreground hover:bg-muted rounded-xl transition-smooth"
                    onClick={() => setMobileOpen(false)}
                    data-ocid={`navbar.mobile_${link.label.toLowerCase().replace(" ", "_")}_link`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-body font-medium text-foreground hover:bg-muted rounded-xl transition-smooth"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="navbar.mobile_wishlist_link"
                >
                  <Heart className="w-4 h-4" style={{ color: "#D8A7B1" }} />
                  wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
                </Link>
                <a
                  href="https://www.youtube.com/@thecozyhookworld"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-body font-medium text-foreground hover:bg-muted rounded-xl transition-smooth"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="navbar.mobile_youtube_link"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  youtube
                </a>
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-xl font-body mt-2"
                  onClick={() => {
                    setMobileOpen(false);
                    setCustomOrderOpen(true);
                  }}
                  data-ocid="navbar.mobile_custom_orders_button"
                >
                  ✨ custom orders
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CustomOrderModal
        open={customOrderOpen}
        onClose={() => setCustomOrderOpen(false)}
      />
    </>
  );
}
