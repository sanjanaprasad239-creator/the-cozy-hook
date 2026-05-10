import { Button } from "@/components/ui/button";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCartTotals } from "../hooks/useCart";
import { CustomOrderModal } from "./CustomOrderModal";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Collection", to: "/collection" },
  { label: "Our Story", to: "/our-story" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [customOrderOpen, setCustomOrderOpen] = useState(false);
  const { itemCount } = useCartTotals();
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
                The Cozy Hook
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
                ✨ Custom Orders
              </Button>

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
                  ✨ Custom Orders
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
