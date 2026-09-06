import { Printer, Ruler } from "lucide-react";
import { motion } from "motion/react";
import { MEASURE_STEPS, SIZE_GUIDE } from "../data/sizeGuide";

export function SizeGuidePage() {
  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      data-ocid="size_guide.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="text-xs font-body text-primary tracking-[0.2em] uppercase mb-3">
          find your perfect fit
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
          size &amp; fit guide
        </h1>
        <div className="mt-4 mx-auto w-14 h-0.5 rounded-full bg-primary/40" />
        <p className="mt-5 font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          every wearable is lovingly handmade with natural stretch — here's how
          to find the size that feels just right.
        </p>
      </motion.div>

      {/* Print button */}
      <div className="flex justify-end mb-8 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border font-body text-xs text-muted-foreground hover:bg-muted transition-smooth"
          data-ocid="size_guide.print_button"
        >
          <Printer size={13} />
          print size guide
        </button>
      </div>

      {/* How to measure */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-12"
        data-ocid="size_guide.measure_section"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-10 h-10 rounded-2xl flex items-center justify-center bg-primary/10 text-primary">
            <Ruler size={18} />
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              how to measure
            </h2>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              four easy steps to your perfect fit
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MEASURE_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="rounded-3xl border border-border/40 bg-card p-5 shadow-soft"
              data-ocid={`size_guide.measure_step.${i + 1}`}
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-display text-sm font-semibold mb-3">
                {i + 1}
              </span>
              <h3 className="font-display text-base font-semibold text-foreground mb-1.5 capitalize">
                {step.title}
              </h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Size chart */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        data-ocid="size_guide.chart_section"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl" aria-hidden="true">
            📏
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              wearables size chart
            </h2>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              measurements &amp; fit notes for every wearable
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
              data-ocid={`size_guide.card.${si + 1}`}
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
              <p
                className="font-body text-xs text-muted-foreground italic leading-relaxed rounded-2xl px-3 py-2.5"
                style={{ background: item.accent }}
              >
                💡 {item.tip}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Custom size note */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mt-8 rounded-3xl border border-border/40 p-6 shadow-soft"
        style={{ background: "oklch(0.88 0.05 5 / 0.12)" }}
        data-ocid="size_guide.custom_size_note"
      >
        <h3 className="font-display text-base font-semibold text-foreground mb-2">
          need a custom size?
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          all wearables can be made in a custom size on request — just add your
          measurements in the checkout form or message us on{" "}
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
    </div>
  );
}
