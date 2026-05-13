import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Save,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ALL_PRODUCTS } from "../data/products";
import { useAdmin } from "../hooks/useAdmin";
import type { ProductCategory } from "../types/product";

const CATEGORY_ORDER: ProductCategory[] = [
  "plushies",
  "keychains",
  "wearables",
  "home decor",
  "accessories",
];

const CATEGORY_COLORS: Record<ProductCategory, string> = {
  plushies: "bg-primary/10 text-primary",
  keychains: "bg-secondary/20 text-secondary-foreground",
  wearables: "bg-accent text-accent-foreground",
  "home decor": "bg-muted text-muted-foreground",
  accessories: "bg-primary/5 text-primary",
};

export function AdminPage() {
  const {
    settings,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateHero,
    updateFeaturedProducts,
  } = useAdmin();

  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [heroTitle, setHeroTitle] = useState(settings.heroTitle);
  const [heroTagline, setHeroTagline] = useState(settings.heroTagline);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    settings.featuredProductIds,
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await login(password);
  }

  function handleSave() {
    updateHero(heroTitle, heroTagline);
    updateFeaturedProducts(selectedIds);
    toast.success("Changes saved successfully", {
      description: "Your homepage has been updated.",
      duration: 4000,
    });
  }

  function toggleProduct(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= 5
          ? prev
          : [...prev, id],
    );
  }

  // ─── Login Screen ─────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-[85vh] flex items-center justify-center px-4 bg-background"
        data-ocid="admin.login_page"
      >
        {/* Decorative background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="relative bg-card border border-border rounded-3xl shadow-boutique-lg p-10 w-full max-w-sm"
        >
          {/* Logo area */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-foreground leading-tight">
              Admin Dashboard
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-2">
              The Cozy Hook — Content Manager
            </p>
          </div>

          <Separator className="mb-6" />

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="admin-password"
                className="font-body text-sm font-medium"
              >
                Admin Password
              </Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="rounded-xl font-body pr-10 h-11"
                  autoComplete="current-password"
                  autoFocus
                  data-ocid="admin.password_input"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-body text-destructive bg-destructive/8 px-3 py-2 rounded-lg"
                  data-ocid="admin.login_error_state"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              className="w-full rounded-xl font-body h-11"
              disabled={isLoading || !password}
              data-ocid="admin.login_submit_button"
            >
              {isLoading ? "Verifying…" : "Login"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6 font-body">
            This area is restricted to the shop owner.
          </p>
        </motion.div>
      </div>
    );
  }

  // ─── Dashboard ────────────────────────────────────────────────────────────
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    products: ALL_PRODUCTS.filter((p) => p.category === cat),
  }));

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="admin.dashboard_page"
    >
      {/* Dashboard Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-foreground leading-tight">
                Admin Dashboard
              </h1>
              <p className="font-body text-xs text-muted-foreground">
                The Cozy Hook
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-xl font-body gap-2"
            onClick={logout}
            data-ocid="admin.logout_button"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Section 1 — Hero Text Editor */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-soft"
          data-ocid="admin.hero_section"
        >
          <div className="px-7 py-5 border-b border-border bg-muted/30">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Hero Section
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-0.5">
              Customize the headline and tagline shown on your homepage.
            </p>
          </div>
          <div className="px-7 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="font-body text-sm font-medium">
                  Brand Heading
                </Label>
                <Input
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="rounded-xl font-body h-11"
                  placeholder="The Cozy Hook"
                  data-ocid="admin.hero_title_input"
                />
                <p className="text-xs text-muted-foreground font-body">
                  Shown as the large display text in the hero.
                </p>
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm font-medium">Tagline</Label>
                <Input
                  value={heroTagline}
                  onChange={(e) => setHeroTagline(e.target.value)}
                  className="rounded-xl font-body h-11"
                  placeholder="Handmade Crochet with Love"
                  data-ocid="admin.hero_tagline_input"
                />
                <p className="text-xs text-muted-foreground font-body">
                  Subtitle shown below the heading.
                </p>
              </div>
            </div>

            {/* Live preview pill */}
            <div className="mt-5 p-4 rounded-2xl bg-muted/40 border border-border text-center">
              <p className="font-display text-xl text-foreground leading-tight">
                {heroTitle || "The Cozy Hook"}
              </p>
              <p className="font-body text-sm text-muted-foreground mt-1">
                {heroTagline || "Handmade Crochet with Love"}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 2 — Featured Products Editor */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-soft"
          data-ocid="admin.featured_section"
        >
          <div className="px-7 py-5 border-b border-border bg-muted/30 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Featured Products
              </h2>
              <p className="font-body text-sm text-muted-foreground mt-0.5">
                Select up to 5 products to highlight on the homepage.
              </p>
            </div>
            <div
              className={`font-body text-sm font-medium px-3 py-1 rounded-full border ${
                selectedIds.length >= 5
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-muted text-muted-foreground border-border"
              }`}
            >
              {selectedIds.length} / 5
            </div>
          </div>

          <div className="px-7 py-6 space-y-6">
            {grouped.map(({ category, products }) => (
              <div
                key={category}
                data-ocid={`admin.category.${category.toLowerCase().replace(" ", "_")}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`font-body text-xs font-semibold px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[category]}`}
                  >
                    {category}
                  </span>
                  <Separator className="flex-1" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {products.map((p, i) => {
                    const isSelected = selectedIds.includes(p.id);
                    const isDisabled = !isSelected && selectedIds.length >= 5;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => !isDisabled && toggleProduct(p.id)}
                        disabled={isDisabled}
                        className={`text-left p-3 rounded-2xl border transition-smooth relative group ${
                          isSelected
                            ? "border-primary bg-primary/8 shadow-soft"
                            : isDisabled
                              ? "border-border bg-background opacity-40 cursor-not-allowed"
                              : "border-border bg-background hover:border-primary/50 hover:bg-accent/30 cursor-pointer"
                        }`}
                        data-ocid={`admin.product_toggle.${i + 1}`}
                      >
                        {isSelected && (
                          <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                          </span>
                        )}
                        <span className="font-body text-xs line-clamp-1 font-medium text-foreground pr-4">
                          {p.name}
                        </span>
                        <span className="font-body text-xs text-primary font-semibold mt-0.5 block">
                          ₹{p.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Selected summary */}
          {selectedIds.length > 0 && (
            <div className="px-7 pb-6">
              <div className="bg-muted/40 rounded-2xl p-4 border border-border">
                <p className="font-body text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">
                  Selected for homepage
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedIds.map((id) => {
                    const product = ALL_PRODUCTS.find((p) => p.id === id);
                    if (!product) return null;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleProduct(id)}
                        className="font-body text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-smooth"
                        aria-label={`Remove ${product.name} from featured`}
                      >
                        {product.name} ×
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.section>

        {/* Save Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="flex items-center justify-between bg-card border border-border rounded-2xl px-6 py-4 shadow-soft"
        >
          <div>
            <p className="font-body text-sm font-medium text-foreground">
              Ready to publish?
            </p>
            <p className="font-body text-xs text-muted-foreground">
              Changes will update your homepage immediately.
            </p>
          </div>
          <Button
            type="button"
            size="lg"
            className="rounded-2xl font-body gap-2 px-6"
            onClick={handleSave}
            data-ocid="admin.save_button"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export { FEATURED_PRODUCT_IDS } from "../data/products";
