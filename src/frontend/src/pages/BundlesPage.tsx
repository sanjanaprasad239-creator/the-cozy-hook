import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ALL_PRODUCTS } from "../data/products";
import { useAdmin } from "../hooks/useAdmin";

const WA_NUMBER = "918660099085";

function buildWaLink(bundleName: string, items: string[]): string {
  const msg = [
    `hi! i'd like to order the "${bundleName}" bundle 🎀`,
    "",
    "items included:",
    ...items.map((item) => `• ${item}`),
    "",
    "please let me know the availability and delivery details!",
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function BundlesPage() {
  const { settings } = useAdmin();
  const bundles = (settings.bundles ?? []).filter((b) => b.isActive);

  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      data-ocid="bundles.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p
          className="text-xs font-body tracking-[0.2em] uppercase mb-3"
          style={{ color: "#D8A7B1" }}
        >
          handpicked combinations
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
          bundle &amp; save
        </h1>
        <div
          className="mt-4 mx-auto w-14 h-0.5 rounded-full"
          style={{ background: "#D8A7B1", opacity: 0.5 }}
        />
        <p className="mt-5 font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          curated sets, better together
        </p>
      </motion.div>

      {/* Bundles or empty state */}
      {bundles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col items-center justify-center py-24 text-center"
          data-ocid="bundles.empty_state"
        >
          <span className="text-6xl mb-5">🎀</span>
          <p className="font-display text-xl font-semibold text-foreground mb-2">
            no bundles available right now
          </p>
          <p className="font-body text-sm text-muted-foreground max-w-xs mb-6">
            check back soon — new curated sets coming your way!
          </p>
          <Link
            to="/collection"
            className="font-body text-sm px-6 py-2.5 rounded-full transition-smooth"
            style={{ background: "#D8A7B1", color: "#fff" }}
            data-ocid="bundles.browse_link"
          >
            browse the collection
          </Link>
        </motion.div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          data-ocid="bundles.list"
        >
          {bundles.map((bundle, i) => {
            const items = bundle.productIds.map((pid) =>
              ALL_PRODUCTS.find((p) => p.id === pid),
            );
            const originalPrice = items.reduce(
              (sum, p) => sum + (p?.price ?? 0),
              0,
            );
            const waLink = buildWaLink(
              bundle.name,
              bundle.productIds.map(
                (pid) => ALL_PRODUCTS.find((p) => p.id === pid)?.name ?? pid,
              ),
            );

            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="rounded-2xl border border-border/40 bg-card p-6 shadow-soft flex flex-col gap-4"
                data-ocid={`bundles.item.${i + 1}`}
              >
                {/* Savings badge */}
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-display text-xl font-semibold text-foreground leading-tight">
                    {bundle.name}
                  </h2>
                  <span
                    className="flex-shrink-0 rounded-full px-3 py-1 font-body text-xs font-semibold"
                    style={{ background: "#A8B5A2", color: "#fff" }}
                  >
                    save ₹{bundle.savings}
                  </span>
                </div>

                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {bundle.description}
                </p>

                {/* Included items */}
                <ul className="space-y-1.5">
                  {items.map((p, idx) => (
                    <li
                      key={p?.id ?? `unknown-${idx}`}
                      className="flex items-center gap-2 font-body text-sm text-foreground"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#D8A7B1" }}
                        aria-hidden="true"
                      />
                      {p ? (
                        <>
                          <span>{p.name}</span>
                          <span className="ml-auto text-muted-foreground">
                            ₹{p.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">
                          unknown item
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div
                  className="rounded-xl p-4 flex items-center justify-between"
                  style={{ background: "oklch(0.94 0.02 5 / 0.35)" }}
                >
                  <div>
                    <p className="font-body text-xs text-muted-foreground line-through">
                      ₹{originalPrice}
                    </p>
                    <p className="font-display text-2xl font-bold text-foreground">
                      ₹{bundle.price}
                    </p>
                  </div>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-smooth hover:opacity-90"
                    style={{ background: "#D8A7B1", color: "#fff" }}
                    data-ocid={`bundles.order_button.${i + 1}`}
                  >
                    order via whatsapp
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Note */}
      {bundles.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center font-body text-xs text-muted-foreground mt-10"
        >
          all bundles are handmade to order — delivery in 5–7 business days.
        </motion.p>
      )}
    </div>
  );
}
