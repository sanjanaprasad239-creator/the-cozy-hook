import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CARE_GUIDE } from "../data/careGuide";

export function CareGuidePage() {
  const [activeTab, setActiveTab] = useState(CARE_GUIDE[0].key);

  const active = CARE_GUIDE.find((c) => c.key === activeTab) ?? CARE_GUIDE[0];

  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      data-ocid="care_guide.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="text-xs font-body text-primary tracking-[0.2em] uppercase mb-3">
          keep your handmade pieces beautiful
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
          care guide
        </h1>
        <div className="mt-4 mx-auto w-14 h-0.5 rounded-full bg-primary/40" />
        <p className="mt-5 font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          each item is lovingly handmade — a little care goes a long way in
          keeping it beautiful for years.
        </p>
      </motion.div>

      {/* Tab bar */}
      <div
        className="flex gap-2 flex-wrap justify-center mb-10"
        role="tablist"
        aria-label="Category care guides"
        data-ocid="care_guide.tabs"
      >
        {CARE_GUIDE.map((cat, i) => (
          <button
            key={cat.key}
            type="button"
            role="tab"
            aria-selected={activeTab === cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-body text-sm font-medium transition-smooth ${
              activeTab === cat.key
                ? "text-primary-foreground shadow-boutique"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            style={activeTab === cat.key ? { background: "#D8A7B1" } : {}}
            data-ocid={`care_guide.tab.${i + 1}`}
          >
            <span aria-hidden="true">{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tab panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          role="tabpanel"
          data-ocid="care_guide.panel"
        >
          {/* Section heading */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl" aria-hidden="true">
              {active.emoji}
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                {active.label}
              </h2>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                care & handling guide
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {active.care.map((section, si) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: si * 0.07 }}
                className="rounded-3xl border border-border/40 bg-card p-6 shadow-soft"
                data-ocid={`care_guide.card.${si + 1}`}
              >
                <h3 className="font-display text-base font-semibold text-foreground mb-4 capitalize">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body text-sm text-muted-foreground leading-relaxed"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "#D8A7B1" }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Extra note for wearables sizing */}
          {active.key === "wearables" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="mt-5 rounded-3xl border border-border/40 p-6 shadow-soft"
              style={{ background: "oklch(0.88 0.05 5 / 0.12)" }}
              data-ocid="care_guide.sizing_note"
            >
              <h3 className="font-display text-base font-semibold text-foreground mb-2">
                need a custom size?
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                all wearables can be made in a custom size on request — just add
                your measurements in the checkout form or message us on{" "}
                <a
                  href="https://wa.me/918660099085"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  whatsapp
                </a>{" "}
                before ordering.
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
