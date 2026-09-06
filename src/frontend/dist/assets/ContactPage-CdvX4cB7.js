import { r as reactExports, j as jsxRuntimeExports, m as motion, M as Mail, l as MessageCircle, B as Button, C as CustomOrderModal } from "./index-6i6bSDXp.js";
function ContactPage() {
  const [orderModalOpen, setOrderModalOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "contact.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-20 sm:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7 },
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs tracking-[0.25em] text-primary uppercase font-medium", children: "Say Hello" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl sm:text-6xl font-semibold text-foreground leading-tight", children: "Get in Touch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-0.5 bg-primary mx-auto rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto", children: "We'd love to hear from you. Whether it's a question, feedback, or a custom order idea — reach out anytime." })
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.a,
          {
            href: "mailto:sanjana.prasad@thecozyhook.in",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.55, delay: 0.1 },
            className: "group bg-card rounded-3xl p-8 flex flex-col items-center gap-5 shadow-soft hover:shadow-boutique transition-smooth text-center",
            "data-ocid": "contact.email_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/18 transition-smooth group-hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-7 h-7 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed break-all", children: "sanjana.prasad@thecozyhook.in" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 font-body text-xs font-semibold text-primary border border-primary/25 rounded-full px-4 py-1.5 group-hover:bg-primary/8 transition-smooth", children: "Send a message →" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.a,
          {
            href: "https://wa.me/918660099085",
            target: "_blank",
            rel: "noopener noreferrer",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.55, delay: 0.2 },
            className: "group bg-card rounded-3xl p-8 flex flex-col items-center gap-5 shadow-soft hover:shadow-boutique transition-smooth text-center",
            "data-ocid": "contact.whatsapp_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary/20 transition-smooth group-hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  viewBox: "0 0 24 24",
                  className: "w-7 h-7 text-secondary",
                  fill: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground", children: "WhatsApp" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: "+91 86600 99085" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground/70", children: "Fastest way to reach us" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 font-body text-xs font-semibold text-secondary border border-secondary/30 rounded-full px-4 py-1.5 group-hover:bg-secondary/8 transition-smooth", children: "Chat with us →" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay: 0.35 },
          className: "mt-6 bg-muted/40 rounded-2xl px-6 py-4 flex items-center gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground", children: [
              "We typically reply within",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "24 hours" }),
              ". For urgent queries, WhatsApp is the fastest way to reach us."
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl block", "aria-hidden": "true", children: "🧶" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-semibold text-foreground", children: "Have a Custom Idea?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm mx-auto", children: "From personalized plushies to custom colour wearables — I love bringing unique ideas to life. Let's create something special together." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "rounded-full font-body px-8 shadow-boutique hover:shadow-boutique-lg transition-smooth",
              onClick: () => setOrderModalOpen(true),
              "data-ocid": "contact.custom_order_button",
              children: "Start a Custom Order"
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CustomOrderModal,
      {
        open: orderModalOpen,
        onClose: () => setOrderModalOpen(false)
      }
    )
  ] });
}
export {
  ContactPage
};
