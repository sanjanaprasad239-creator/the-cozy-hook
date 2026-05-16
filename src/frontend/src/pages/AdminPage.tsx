import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  ImageIcon,
  Lock,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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

// ── Product Images Storage (localStorage-backed) ────────────────────────────
const PRODUCT_IMAGES_KEY = "cozy-hook-product-images";

function loadProductImages(): Record<string, string> {
  try {
    const raw = localStorage.getItem(PRODUCT_IMAGES_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function saveProductImages(map: Record<string, string>) {
  try {
    localStorage.setItem(PRODUCT_IMAGES_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

const HEART_PLACEHOLDER = "/assets/images/heart-placeholder.jpg";

function ProductImagesSection() {
  const [imageMap, setImageMap] =
    useState<Record<string, string>>(loadProductImages);
  const [uploading, setUploading] = useState<string | null>(null);
  const [justUploaded, setJustUploaded] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function handleUploadClick(productId: string) {
    fileInputRefs.current[productId]?.click();
  }

  async function handleFileChange(
    productId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size (max 5 MB)
    if (!file.type.startsWith("image/")) {
      toast.error("please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("image must be under 5 mb.");
      return;
    }

    setUploading(productId);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("read failed"));
        reader.readAsDataURL(file);
      });

      const updated = { ...imageMap, [productId]: dataUrl };
      setImageMap(updated);
      saveProductImages(updated);
      window.dispatchEvent(
        new StorageEvent("storage", { key: "cozy-hook-product-images" }),
      );

      setJustUploaded(productId);
      setTimeout(
        () => setJustUploaded((prev) => (prev === productId ? null : prev)),
        3000,
      );
      toast.success("image saved!");
    } catch {
      toast.error("upload failed — please try again.");
    } finally {
      setUploading(null);
      // Reset input so the same file can be re-selected
      if (fileInputRefs.current[productId]) {
        fileInputRefs.current[productId]!.value = "";
      }
    }
  }

  function handleRemove(productId: string) {
    const updated = { ...imageMap };
    delete updated[productId];
    setImageMap(updated);
    saveProductImages(updated);
    window.dispatchEvent(
      new StorageEvent("storage", { key: "cozy-hook-product-images" }),
    );
    toast.success("image removed — placeholder restored.");
  }

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    products: ALL_PRODUCTS.filter((p) => p.category === cat),
  }));

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.09 }}
      className="bg-card border border-border rounded-3xl overflow-hidden shadow-soft"
      data-ocid="admin.product_images_section"
    >
      <div className="px-7 py-5 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">
            product images
          </h2>
        </div>
        <p className="font-body text-sm text-muted-foreground mt-0.5">
          upload a real photo for each product — replaces the heart placeholder
          sitewide.
        </p>
      </div>

      <div className="px-7 py-6 space-y-7">
        {grouped.map(({ category, products }) => (
          <div key={category}>
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`font-body text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  CATEGORY_COLORS[category]
                }`}
              >
                {category}
              </span>
              <Separator className="flex-1" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {products.map((p) => {
                const customUrl = imageMap[p.id];
                const isUploading = uploading === p.id;
                const wasJustUploaded = justUploaded === p.id;

                return (
                  <div
                    key={p.id}
                    className="flex flex-col gap-2 p-2.5 rounded-2xl border border-border bg-background hover:border-primary/30 transition-smooth group"
                    data-ocid={`admin.product_image_card.${p.id}`}
                  >
                    {/* Hidden file input */}
                    <input
                      ref={(el) => {
                        fileInputRefs.current[p.id] = el;
                      }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(p.id, e)}
                      data-ocid={`admin.product_image_input.${p.id}`}
                    />

                    {/* Image preview */}
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted/40">
                      <img
                        src={customUrl ?? HEART_PLACEHOLDER}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            HEART_PLACEHOLDER;
                        }}
                      />
                      {wasJustUploaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/20 rounded-xl">
                          <CheckCircle2 className="w-7 h-7 text-primary drop-shadow" />
                        </div>
                      )}
                      {customUrl && (
                        <div className="absolute top-1.5 right-1.5">
                          <span className="bg-primary text-primary-foreground font-body text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                            custom
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product name */}
                    <p className="font-body text-xs font-medium text-foreground line-clamp-1 px-0.5">
                      {p.name}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-1.5">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-xl h-7 text-[11px] font-body gap-1 px-2"
                        onClick={() => handleUploadClick(p.id)}
                        disabled={isUploading}
                        data-ocid={`admin.product_image_upload_button.${p.id}`}
                      >
                        {isUploading ? (
                          <span className="animate-pulse">saving…</span>
                        ) : (
                          <>
                            <Upload className="w-3 h-3" />
                            upload
                          </>
                        )}
                      </Button>
                      {customUrl && (
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                          onClick={() => handleRemove(p.id)}
                          aria-label={`remove image for ${p.name}`}
                          data-ocid={`admin.product_image_remove_button.${p.id}`}
                        >
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <p className="font-body text-xs text-muted-foreground bg-muted/30 rounded-xl px-4 py-3">
          💡 images are stored locally on this device. supported formats: jpg,
          png, webp, gif — max 5 mb each.
        </p>
      </div>
    </motion.section>
  );
}

function WhatsAppSubscribersSection() {
  const [subscribers, setSubscribers] = useState<
    { name: string; phone: string; subscribedAt: string }[]
  >([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cozy-hook-whatsapp-optins");
      if (raw) {
        const parsed = JSON.parse(raw);
        const list = parsed?.state?.subscribers ?? [];
        setSubscribers(list);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  function handleCopyNumbers() {
    const numbers = subscribers.map((s) => s.phone).join(", ");
    navigator.clipboard.writeText(numbers).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28 }}
      className="bg-card border border-border rounded-3xl overflow-hidden shadow-soft"
      data-ocid="admin.whatsapp_subscribers_section"
    >
      <div className="px-7 py-5 border-b border-border bg-muted/30 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">
            whatsapp subscribers
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-0.5">
            {subscribers.length}{" "}
            {subscribers.length === 1 ? "person" : "people"} subscribed
          </p>
        </div>
        {subscribers.length > 0 && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-xl font-body gap-1.5 text-xs"
            onClick={handleCopyNumbers}
            data-ocid="admin.whatsapp_copy_numbers_button"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> copied!
              </>
            ) : (
              "copy all numbers"
            )}
          </Button>
        )}
      </div>

      <div className="px-7 py-6">
        {subscribers.length === 0 ? (
          <p
            className="font-body text-sm text-muted-foreground py-4 text-center"
            data-ocid="admin.whatsapp_subscribers_empty_state"
          >
            no subscribers yet — the opt-in form is live on the site.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm font-body"
              data-ocid="admin.whatsapp_subscribers_table"
            >
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2 pr-4">
                    name
                  </th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2 pr-4">
                    phone
                  </th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2">
                    subscribed on
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {subscribers.map((s, i) => (
                  <tr
                    key={s.phone}
                    className="hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.whatsapp_subscriber.item.${i + 1}`}
                  >
                    <td className="py-2.5 pr-4 text-foreground font-medium">
                      {s.name || (
                        <span className="text-muted-foreground italic">—</span>
                      )}
                    </td>
                    <td className="py-2.5 pr-4 text-foreground">{s.phone}</td>
                    <td className="py-2.5 text-muted-foreground text-xs">
                      {s.subscribedAt
                        ? new Date(s.subscribedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.section>
  );
}

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
    toggleSoldOut,
    addBundle,
    removeBundle,
    addPressEntry,
    removePressEntry,
    updateCurrentlyCrafting,
    setProductTimer,
    removeProductTimer,
  } = useAdmin();

  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [heroTitle, setHeroTitle] = useState(settings.heroTitle);
  const [heroTagline, setHeroTagline] = useState(settings.heroTagline);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    settings.featuredProductIds,
  );

  // Sold out
  const soldOutIds = settings.soldOutProductIds ?? [];

  // Bundles
  const [newBundle, setNewBundle] = useState({
    name: "",
    description: "",
    price: "",
    savings: "",
    productIds: "",
  });

  // Press
  const [newPress, setNewPress] = useState({ title: "", link: "", date: "" });

  // Currently crafting
  const [craftingText, setCraftingText] = useState(settings.currentlyCrafting);

  // Timer
  const [newTimer, setNewTimer] = useState({
    productId: "",
    label: "",
    endDate: "",
  });

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

  function handleAddBundle(e: React.FormEvent) {
    e.preventDefault();
    if (!newBundle.name.trim()) return;
    addBundle({
      id: Date.now().toString(),
      name: newBundle.name.trim(),
      description: newBundle.description.trim(),
      price: Number(newBundle.price) || 0,
      savings: Number(newBundle.savings) || 0,
      productIds: newBundle.productIds
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      isActive: true,
    });
    setNewBundle({
      name: "",
      description: "",
      price: "",
      savings: "",
      productIds: "",
    });
    toast.success("Bundle added!");
  }

  function handleAddPress(e: React.FormEvent) {
    e.preventDefault();
    if (!newPress.title.trim()) return;
    addPressEntry({
      id: Date.now().toString(),
      title: newPress.title.trim(),
      link: newPress.link.trim(),
      date: newPress.date,
    });
    setNewPress({ title: "", link: "", date: "" });
    toast.success("Press entry added!");
  }

  function handleSaveCrafting() {
    updateCurrentlyCrafting(craftingText);
    toast.success("Currently crafting updated!");
  }

  function handleAddTimer(e: React.FormEvent) {
    e.preventDefault();
    if (!newTimer.productId || !newTimer.label || !newTimer.endDate) return;
    setProductTimer(newTimer.productId, {
      label: newTimer.label,
      endDate: newTimer.endDate,
    });
    setNewTimer({ productId: "", label: "", endDate: "" });
    toast.success("Timer set!");
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

        {/* Section 2 — Product Images */}
        <ProductImagesSection />

        {/* Section 3 — Featured Products Editor */}
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

        {/* Section 4 — Sold Out Management */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-soft"
          data-ocid="admin.soldout_section"
        >
          <div className="px-7 py-5 border-b border-border bg-muted/30">
            <h2 className="font-display text-lg font-semibold text-foreground">
              manage sold out products
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-0.5">
              check a product to mark it as sold out.
            </p>
          </div>
          <div className="px-7 py-6 space-y-6">
            {grouped.map(({ category, products }) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`font-body text-xs font-semibold px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[category]}`}
                  >
                    {category}
                  </span>
                  <Separator className="flex-1" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {products.map((p) => {
                    const isSoldOut = soldOutIds.includes(p.id);
                    return (
                      <label
                        key={p.id}
                        className={`flex items-start gap-2 p-3 rounded-2xl border cursor-pointer transition-smooth ${
                          isSoldOut
                            ? "border-destructive/40 bg-destructive/5"
                            : "border-border bg-background hover:bg-accent/20"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSoldOut}
                          onChange={() => toggleSoldOut(p.id)}
                          className="mt-0.5 accent-pink-400"
                          data-ocid={`admin.soldout_checkbox.${p.id}`}
                        />
                        <div>
                          <p className="font-body text-xs font-medium text-foreground line-clamp-1">
                            {p.name}
                          </p>
                          <p className="font-body text-xs text-primary font-semibold">
                            ₹{p.price}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 5 — Countdown Timers */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-soft"
          data-ocid="admin.timers_section"
        >
          <div className="px-7 py-5 border-b border-border bg-muted/30">
            <h2 className="font-display text-lg font-semibold text-foreground">
              countdown timers
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-0.5">
              add urgency labels to specific products.
            </p>
          </div>
          <div className="px-7 py-6 space-y-5">
            {/* Existing timers */}
            {Object.entries(settings.productTimers ?? {}).length > 0 && (
              <div className="space-y-2 mb-4">
                {Object.entries(settings.productTimers ?? {}).map(
                  ([pid, timer]) => {
                    const prod = ALL_PRODUCTS.find((p) => p.id === pid);
                    return (
                      <div
                        key={pid}
                        className="flex items-center justify-between bg-muted/40 rounded-xl px-4 py-2.5"
                      >
                        <div>
                          <p className="font-body text-xs font-semibold text-foreground">
                            {prod?.name ?? pid}
                          </p>
                          <p className="font-body text-xs text-muted-foreground">
                            {timer.label} — ends {timer.endDate}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeProductTimer(pid)}
                          className="p-1.5 text-muted-foreground hover:text-destructive transition-smooth"
                          aria-label="Remove timer"
                          data-ocid={`admin.timer_remove.${pid}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  },
                )}
              </div>
            )}
            {/* Add timer form */}
            <form
              onSubmit={handleAddTimer}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="space-y-1">
                <Label className="font-body text-xs text-muted-foreground">
                  product
                </Label>
                <select
                  value={newTimer.productId}
                  onChange={(e) =>
                    setNewTimer((t) => ({ ...t, productId: e.target.value }))
                  }
                  className="w-full rounded-xl font-body text-sm bg-background border border-input px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  data-ocid="admin.timer_product_select"
                >
                  <option value="">select product…</option>
                  {ALL_PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label className="font-body text-xs text-muted-foreground">
                  label (e.g. limited edition)
                </Label>
                <Input
                  value={newTimer.label}
                  onChange={(e) =>
                    setNewTimer((t) => ({ ...t, label: e.target.value }))
                  }
                  placeholder="limited edition"
                  className="rounded-xl font-body h-9 text-sm"
                  data-ocid="admin.timer_label_input"
                />
              </div>
              <div className="space-y-1">
                <Label className="font-body text-xs text-muted-foreground">
                  end date
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={newTimer.endDate}
                    onChange={(e) =>
                      setNewTimer((t) => ({ ...t, endDate: e.target.value }))
                    }
                    className="rounded-xl font-body h-9 text-sm flex-1 [color-scheme:light]"
                    data-ocid="admin.timer_enddate_input"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="rounded-xl gap-1 h-9 px-3"
                    data-ocid="admin.timer_add_button"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </motion.section>

        {/* Section 6 — Bundles Management */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-soft"
          data-ocid="admin.bundles_section"
        >
          <div className="px-7 py-5 border-b border-border bg-muted/30">
            <h2 className="font-display text-lg font-semibold text-foreground">
              manage bundles
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-0.5">
              create curated product bundles to show on the site.
            </p>
          </div>
          <div className="px-7 py-6 space-y-5">
            {/* Existing bundles */}
            {(settings.bundles ?? []).length > 0 && (
              <div className="space-y-2 mb-4">
                {(settings.bundles ?? []).map((bundle) => (
                  <div
                    key={bundle.id}
                    className="flex items-center justify-between bg-muted/40 rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="font-body text-sm font-semibold text-foreground">
                        {bundle.name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        ₹{bundle.price} · saves ₹{bundle.savings}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBundle(bundle.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive transition-smooth"
                      aria-label="Remove bundle"
                      data-ocid={`admin.bundle_remove.${bundle.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* Add bundle form */}
            <form onSubmit={handleAddBundle} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="font-body text-xs text-muted-foreground">
                    bundle name
                  </Label>
                  <Input
                    value={newBundle.name}
                    onChange={(e) =>
                      setNewBundle((b) => ({ ...b, name: e.target.value }))
                    }
                    placeholder="e.g. gift starter set"
                    className="rounded-xl font-body h-9 text-sm"
                    data-ocid="admin.bundle_name_input"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="font-body text-xs text-muted-foreground">
                    description
                  </Label>
                  <Input
                    value={newBundle.description}
                    onChange={(e) =>
                      setNewBundle((b) => ({
                        ...b,
                        description: e.target.value,
                      }))
                    }
                    placeholder="short description"
                    className="rounded-xl font-body h-9 text-sm"
                    data-ocid="admin.bundle_desc_input"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="font-body text-xs text-muted-foreground">
                    price (₹)
                  </Label>
                  <Input
                    type="number"
                    value={newBundle.price}
                    onChange={(e) =>
                      setNewBundle((b) => ({ ...b, price: e.target.value }))
                    }
                    placeholder="e.g. 449"
                    className="rounded-xl font-body h-9 text-sm"
                    data-ocid="admin.bundle_price_input"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="font-body text-xs text-muted-foreground">
                    savings (₹)
                  </Label>
                  <Input
                    type="number"
                    value={newBundle.savings}
                    onChange={(e) =>
                      setNewBundle((b) => ({ ...b, savings: e.target.value }))
                    }
                    placeholder="e.g. 50"
                    className="rounded-xl font-body h-9 text-sm"
                    data-ocid="admin.bundle_savings_input"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="font-body text-xs text-muted-foreground">
                  product IDs (comma-separated)
                </Label>
                <Input
                  value={newBundle.productIds}
                  onChange={(e) =>
                    setNewBundle((b) => ({ ...b, productIds: e.target.value }))
                  }
                  placeholder="plush-002, key-001, acc-009"
                  className="rounded-xl font-body h-9 text-sm"
                  data-ocid="admin.bundle_productids_input"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="rounded-xl font-body gap-1.5"
                data-ocid="admin.bundle_add_button"
              >
                <Plus className="w-3.5 h-3.5" /> add bundle
              </Button>
            </form>
          </div>
        </motion.section>

        {/* Section 7 — Press & Media */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-soft"
          data-ocid="admin.press_section"
        >
          <div className="px-7 py-5 border-b border-border bg-muted/30">
            <h2 className="font-display text-lg font-semibold text-foreground">
              press &amp; media mentions
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-0.5">
              add links to any press or media features.
            </p>
          </div>
          <div className="px-7 py-6 space-y-5">
            {/* Existing entries */}
            {(settings.pressEntries ?? []).length > 0 && (
              <div className="space-y-2 mb-4">
                {(settings.pressEntries ?? []).map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between bg-muted/40 rounded-xl px-4 py-2.5"
                  >
                    <div>
                      <p className="font-body text-sm font-semibold text-foreground">
                        {entry.title}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {entry.link} · {entry.date}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePressEntry(entry.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive transition-smooth"
                      aria-label="Remove press entry"
                      data-ocid={`admin.press_remove.${entry.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* Add press form */}
            <form
              onSubmit={handleAddPress}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="space-y-1">
                <Label className="font-body text-xs text-muted-foreground">
                  title
                </Label>
                <Input
                  value={newPress.title}
                  onChange={(e) =>
                    setNewPress((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="e.g. featured in vogue india"
                  className="rounded-xl font-body h-9 text-sm"
                  data-ocid="admin.press_title_input"
                />
              </div>
              <div className="space-y-1">
                <Label className="font-body text-xs text-muted-foreground">
                  link URL
                </Label>
                <Input
                  value={newPress.link}
                  onChange={(e) =>
                    setNewPress((p) => ({ ...p, link: e.target.value }))
                  }
                  placeholder="https://..."
                  className="rounded-xl font-body h-9 text-sm"
                  data-ocid="admin.press_link_input"
                />
              </div>
              <div className="space-y-1">
                <Label className="font-body text-xs text-muted-foreground">
                  date
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={newPress.date}
                    onChange={(e) =>
                      setNewPress((p) => ({ ...p, date: e.target.value }))
                    }
                    className="rounded-xl font-body h-9 text-sm flex-1 [color-scheme:light]"
                    data-ocid="admin.press_date_input"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="rounded-xl gap-1 h-9 px-3"
                    data-ocid="admin.press_add_button"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </motion.section>

        {/* Section 8 — Currently Crafting */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-soft"
          data-ocid="admin.crafting_section"
        >
          <div className="px-7 py-5 border-b border-border bg-muted/30">
            <h2 className="font-display text-lg font-semibold text-foreground">
              currently crafting
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-0.5">
              update what's being handmade right now — shown on the homepage.
            </p>
          </div>
          <div className="px-7 py-6 space-y-4">
            <Textarea
              value={craftingText}
              onChange={(e) => setCraftingText(e.target.value)}
              rows={3}
              className="rounded-xl font-body resize-none"
              placeholder="e.g. currently crafting: strawberry costumed bunny plushies this week! 🌸"
              data-ocid="admin.crafting_textarea"
            />
            <Button
              type="button"
              size="sm"
              className="rounded-xl font-body gap-1.5"
              onClick={handleSaveCrafting}
              data-ocid="admin.crafting_save_button"
            >
              <Save className="w-3.5 h-3.5" /> save
            </Button>
          </div>
        </motion.section>

        {/* Section 9 — WhatsApp Subscribers */}
        <WhatsAppSubscribersSection />

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
