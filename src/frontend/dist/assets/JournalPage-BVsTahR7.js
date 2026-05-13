import { j as jsxRuntimeExports, F as Slot, b as cn, G as cva, m as motion } from "./index-CjLMAHmo.js";
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const POSTS = [
  {
    id: 1,
    title: "The Art of Choosing the Right Yarn",
    excerpt: "Not all yarn is created equal. After years of crocheting, here's how I pick the softest, most durable yarn for every project — from plushies to wearables.",
    category: "Behind the Scenes",
    emoji: "🧶"
  },
  {
    id: 2,
    title: "Custom Orders: How It All Works",
    excerpt: "Ever wondered what happens after you send a custom order request? From concept to creation, I walk you through the entire process of bringing your idea to life.",
    category: "Process",
    emoji: "✨"
  },
  {
    id: 3,
    title: "Crochet as Self-Care: Why I Keep Going",
    excerpt: "In a world that moves too fast, crochet is my slow-down. Looping yarn is meditative, grounding, and deeply satisfying in a way that little else is.",
    category: "Musings",
    emoji: "🌿"
  }
];
function JournalPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "journal.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-20 sm:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7 },
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs tracking-[0.25em] text-primary uppercase font-medium", children: "Stories & Reflections" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl sm:text-6xl font-semibold text-foreground leading-tight", children: "Journal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-0.5 bg-primary mx-auto rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto", children: "Crafting stories, one stitch at a time." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-6 bg-background overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        viewBox: "0 0 1200 24",
        preserveAspectRatio: "none",
        className: "absolute inset-0 w-full h-full text-muted/40",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M0 12 Q150 0 300 12 Q450 24 600 12 Q750 0 900 12 Q1050 24 1200 12",
            stroke: "currentColor",
            strokeWidth: "1.5",
            fill: "none"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, delay: 0.3 },
        className: "bg-accent/30 border border-primary/20 rounded-2xl px-6 py-3 flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", "aria-hidden": "true", children: "🌸" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-foreground/80", children: [
            "The journal is being lovingly crafted —",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-primary", children: "coming soon!" })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-20 pt-6 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: POSTS.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.article,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.55, delay: i * 0.12 },
          "data-ocid": `journal.item.${post.id}`,
          className: "group bg-card rounded-3xl p-6 sm:p-8 shadow-soft hover:shadow-boutique transition-smooth",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 flex-shrink-0 rounded-2xl bg-muted/60 flex items-center justify-center text-2xl group-hover:scale-110 transition-smooth", children: post.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "font-body text-xs rounded-full",
                    children: post.category
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "font-body text-xs rounded-full border-primary/30 text-primary/80",
                    children: "Coming Soon"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl sm:text-2xl font-semibold text-foreground leading-snug group-hover:text-primary transition-smooth", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed line-clamp-2", children: post.excerpt })
            ] })
          ] })
        },
        post.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: 0.4 },
          className: "mt-12 text-center space-y-3",
          "data-ocid": "journal.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl block", "aria-hidden": "true", children: "🪡" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: "More stories are being woven. Check back soon!" })
          ]
        }
      )
    ] }) })
  ] });
}
export {
  JournalPage
};
