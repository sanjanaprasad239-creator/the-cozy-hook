import { j as jsxRuntimeExports, m as motion, E as ExternalLink } from "./index-BoTxUwZ-.js";
import { u as useAdmin } from "./useAdmin-B3vJ_ioq.js";
function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch {
    return dateStr;
  }
}
function PressPage() {
  const { settings } = useAdmin();
  const entries = settings.pressEntries ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14",
      "data-ocid": "press.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-body tracking-[0.2em] uppercase mb-3",
                  style: { color: "#D8A7B1" },
                  children: "in the spotlight"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl font-semibold text-foreground", children: "as seen in" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "mt-4 mx-auto w-14 h-0.5 rounded-full",
                  style: { background: "#D8A7B1", opacity: 0.5 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed", children: "features, mentions, and love from around the web" })
            ]
          }
        ),
        entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.15 },
            className: "flex flex-col items-center justify-center py-24 text-center",
            "data-ocid": "press.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl mb-5", children: "✨" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "no press mentions yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground max-w-xs", children: "we're just getting started — watch this space!" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "press.list", children: entries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.a,
          {
            href: entry.link,
            target: "_blank",
            rel: "noopener noreferrer",
            initial: { opacity: 0, y: 14 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.3, delay: i * 0.07 },
            className: "flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-card px-6 py-5 shadow-soft hover:shadow-boutique transition-smooth group",
            "data-ocid": `press.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-semibold text-foreground group-hover:underline underline-offset-2 truncate", children: entry.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-1", children: formatDate(entry.date) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ExternalLink,
                {
                  size: 16,
                  className: "flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"
                }
              )
            ]
          },
          entry.id
        )) })
      ]
    }
  );
}
export {
  PressPage
};
