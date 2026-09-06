import { Printer } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CARE_GUIDE } from "../data/careGuide";

const SIZE_GUIDE = [
  {
    name: "hairband",
    emoji: "🎀",
    rows: [
      { label: "one size fits most", detail: "head circumference 52–58 cm" },
      { label: "material", detail: "stretchy crochet — comfortable all day" },
    ],
    tip: "the stretchy cotton blend adjusts naturally to your head size.",
  },
  {
    name: "bucket hat",
    emoji: "🪣",
    rows: [
      { label: "S/M", detail: "head circumference 55–57 cm" },
      { label: "L/XL", detail: "head circumference 58–60 cm" },
    ],
    tip: "to measure: wrap a soft tape around your head 2 cm above your ears. if you're between sizes, order one size up.",
  },
  {
    name: "fingerless gloves",
    emoji: "🧤",
    rows: [
      { label: "S/M", detail: "hand width 7–8 cm across the palm" },
      { label: "L/XL", detail: "hand width 9–10 cm across the palm" },
    ],
    tip: "measure across the widest part of your palm (exclude the thumb). crochet has natural stretch.",
  },
  {
    name: "bandana",
    emoji: "🧣",
    rows: [
      { label: "one size", detail: "adjustable tie at back" },
      { label: "fits neck", detail: "30–40 cm circumference" },
    ],
    tip: "ties at the back for a custom fit — wear it as a neck scarf, head wrap, or hair tie.",
  },
  {
    name: "daisy headband",
    emoji: "🌸",
    rows: [
      { label: "one size fits most", detail: "stretchy & comfortable" },
      { label: "suitable for", detail: "all-day wear, adults & teens" },
    ],
    tip: "the stretchy daisy headband fits comfortably without pressure.",
  },
];

export function CareGuidePage() {
  const [activeTab, setActiveTab] = useState<string>(CARE_GUIDE[0].key);
  const isSize = activeTab === "size-fit";

  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      data-ocid="care_guide.page"
    >
      {/* ── Printable sheet (only visible when printing) ─────────────── */}
      <div className="hidden print:block" data-ocid="care_guide.print_sheet">
        <PrintableSheet />
      </div>

      {/* ── Interactive page (hidden when printing) ──────────────────── */}
      <div className="print:hidden">
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
          {[
            ...CARE_GUIDE,
            { key: "size-fit", label: "size & fit", emoji: "📏" },
          ].map((cat, i) => (
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

        {/* Print button */}
        <div className="flex justify-end mb-6 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border font-body text-xs text-muted-foreground hover:bg-muted transition-smooth"
            data-ocid="care_guide.print_button"
          >
            <Printer size={13} />
            print care guide
          </button>
        </div>

        {/* Tab panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            role="tabpanel"
            data-ocid="care_guide.panel"
          >
            {isSize ? (
              /* ── Size & Fit tab ─────────────────────────────────────── */
              <>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-4xl" aria-hidden="true">
                    📏
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-foreground">
                      size &amp; fit
                    </h2>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">
                      wearables sizing guide
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {SIZE_GUIDE.map((item, si) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: si * 0.07 }}
                      className="rounded-3xl border border-border/40 bg-card p-6 shadow-soft"
                      data-ocid={`care_guide.size_card.${si + 1}`}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl" aria-hidden="true">
                          {item.emoji}
                        </span>
                        <h3 className="font-display text-base font-semibold text-foreground capitalize">
                          {item.name}
                        </h3>
                      </div>
                      <table className="w-full mb-3">
                        <tbody>
                          {item.rows.map((row) => (
                            <tr
                              key={row.label}
                              className="border-b border-border/30 last:border-0"
                            >
                              <td className="py-1.5 pr-4 font-body text-xs font-semibold text-foreground capitalize w-1/3">
                                {row.label}
                              </td>
                              <td className="py-1.5 font-body text-xs text-muted-foreground">
                                {row.detail}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="font-body text-xs text-muted-foreground italic leading-relaxed">
                        💡 {item.tip}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="mt-5 rounded-3xl border border-border/40 p-6 shadow-soft"
                  style={{ background: "oklch(0.88 0.05 5 / 0.12)" }}
                  data-ocid="care_guide.custom_size_note"
                >
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">
                    need a custom size?
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    all wearables can be made in a custom size on request — just
                    add your measurements in the checkout form or message us on{" "}
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
              </>
            ) : (
              /* ── Regular care guide tabs ────────────────────────────── */
              (() => {
                const active =
                  CARE_GUIDE.find((c) => c.key === activeTab) ?? CARE_GUIDE[0];
                return (
                  <>
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
                          all wearables can be made in a custom size on request
                          — just add your measurements in the checkout form or
                          message us on{" "}
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
                  </>
                );
              })()
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Printable care guide + product card ─────────────────────────────── */

function PrintableSheet() {
  return (
    <div className="printable-sheet">
      {/* Sheet header */}
      <div className="printable-sheet-head">
        <div>
          <p className="printable-eyebrow">cozy hook</p>
          <h1 className="printable-title">care guide &amp; product card</h1>
        </div>
        <p className="printable-tagline">
          handmade with love — a little care keeps every piece beautiful for
          years.
        </p>
      </div>

      {/* Care guide — all categories */}
      <div className="printable-section">
        <h2 className="printable-section-title">care &amp; handling</h2>
        <div className="printable-grid">
          {CARE_GUIDE.map((cat) => (
            <div key={cat.key} className="printable-card">
              <h3>
                {cat.emoji} {cat.label}
              </h3>
              {cat.care.map((section) => (
                <div key={section.title} className="printable-block">
                  <p className="printable-block-title">{section.title}</p>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Size & fit */}
      <div className="printable-section">
        <h2 className="printable-section-title">size &amp; fit</h2>
        <div className="printable-grid">
          {SIZE_GUIDE.map((item) => (
            <div key={item.name} className="printable-card">
              <h3>
                {item.emoji} {item.name}
              </h3>
              <table>
                <thead>
                  <tr>
                    <th>size</th>
                    <th>detail</th>
                  </tr>
                </thead>
                <tbody>
                  {item.rows.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      <td>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="printable-tip">💡 {item.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product card */}
      <div className="printable-section">
        <h2 className="printable-section-title">product card</h2>
        <div className="printable-card printable-product-card">
          <div className="printable-product-head">
            <div>
              <h3>cozy hook</h3>
              <p className="printable-product-sub">handmade crochet pieces</p>
            </div>
            <p className="printable-product-note">
              keep this card with your purchase for easy reference.
            </p>
          </div>
          <table>
            <tbody>
              <tr>
                <td>material</td>
                <td>soft cotton &amp; wool blend yarns</td>
              </tr>
              <tr>
                <td>care</td>
                <td>hand wash cold, air dry flat, no tumble dry</td>
              </tr>
              <tr>
                <td>made by</td>
                <td>handmade with love, small-batch</td>
              </tr>
              <tr>
                <td>custom sizes</td>
                <td>available on request via whatsapp</td>
              </tr>
            </tbody>
          </table>
          <p className="printable-product-foot">
            questions? message us on whatsapp — we're happy to help.
          </p>
        </div>
      </div>
    </div>
  );
}
