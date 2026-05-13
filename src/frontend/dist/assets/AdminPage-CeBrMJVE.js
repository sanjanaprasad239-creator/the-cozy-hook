import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, A as AnimatePresence, B as Button, K as CircleCheck } from "./index-B6J4yjYJ.js";
import { L as Label, I as Input } from "./label-DMhXSekG.js";
import { S as Separator } from "./separator-CEUCrHxw.js";
import { u as ue } from "./index-DU0MGq6i.js";
import { A as ALL_PRODUCTS } from "./products-DV9WP4M5.js";
import { F } from "./products-DV9WP4M5.js";
import { u as useAdmin } from "./useAdmin-BAUvgEtC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const CATEGORY_ORDER = [
  "plushies",
  "keychains",
  "wearables",
  "home decor",
  "accessories"
];
const CATEGORY_COLORS = {
  plushies: "bg-primary/10 text-primary",
  keychains: "bg-secondary/20 text-secondary-foreground",
  wearables: "bg-accent text-accent-foreground",
  "home decor": "bg-muted text-muted-foreground",
  accessories: "bg-primary/5 text-primary"
};
function AdminPage() {
  const {
    settings,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateHero,
    updateFeaturedProducts
  } = useAdmin();
  const [password, setPassword] = reactExports.useState("");
  const [showPass, setShowPass] = reactExports.useState(false);
  const [heroTitle, setHeroTitle] = reactExports.useState(settings.heroTitle);
  const [heroTagline, setHeroTagline] = reactExports.useState(settings.heroTagline);
  const [selectedIds, setSelectedIds] = reactExports.useState(
    settings.featuredProductIds
  );
  async function handleLogin(e) {
    e.preventDefault();
    await login(password);
  }
  function handleSave() {
    updateHero(heroTitle, heroTagline);
    updateFeaturedProducts(selectedIds);
    ue.success("Changes saved successfully", {
      description: "Your homepage has been updated.",
      duration: 4e3
    });
  }
  function toggleProduct(id) {
    setSelectedIds(
      (prev) => prev.includes(id) ? prev.filter((x) => x !== id) : prev.length >= 5 ? prev : [...prev, id]
    );
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[85vh] flex items-center justify-center px-4 bg-background",
        "data-ocid": "admin.login_page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/6 blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
              className: "relative bg-card border border-border rounded-3xl shadow-boutique-lg p-10 w-full max-w-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-7 h-7 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground leading-tight", children: "Admin Dashboard" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mt-2", children: "The Cozy Hook — Content Manager" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-6" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "admin-password",
                        className: "font-body text-sm font-medium",
                        children: "Admin Password"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "admin-password",
                          type: showPass ? "text" : "password",
                          value: password,
                          onChange: (e) => setPassword(e.target.value),
                          placeholder: "Enter your password",
                          className: "rounded-xl font-body pr-10 h-11",
                          autoComplete: "current-password",
                          autoFocus: true,
                          "data-ocid": "admin.password_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowPass((v) => !v),
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                          "aria-label": showPass ? "Hide password" : "Show password",
                          children: showPass ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.p,
                    {
                      initial: { opacity: 0, y: -4 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0 },
                      className: "text-sm font-body text-destructive bg-destructive/8 px-3 py-2 rounded-lg",
                      "data-ocid": "admin.login_error_state",
                      children: error
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "w-full rounded-xl font-body h-11",
                      disabled: isLoading || !password,
                      "data-ocid": "admin.login_submit_button",
                      children: isLoading ? "Verifying…" : "Login"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-6 font-body", children: "This area is restricted to the shop owner." })
              ]
            }
          )
        ]
      }
    );
  }
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    products: ALL_PRODUCTS.filter((p) => p.category === cat)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background",
      "data-ocid": "admin.dashboard_page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-semibold text-foreground leading-tight", children: "Admin Dashboard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground", children: "The Cozy Hook" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "rounded-xl font-body gap-2",
              onClick: logout,
              "data-ocid": "admin.logout_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
                "Logout"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.section,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.05 },
              className: "bg-card border border-border rounded-3xl overflow-hidden shadow-soft",
              "data-ocid": "admin.hero_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-7 py-5 border-b border-border bg-muted/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Hero Section" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mt-0.5", children: "Customize the headline and tagline shown on your homepage." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-7 py-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-sm font-medium", children: "Brand Heading" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: heroTitle,
                          onChange: (e) => setHeroTitle(e.target.value),
                          className: "rounded-xl font-body h-11",
                          placeholder: "The Cozy Hook",
                          "data-ocid": "admin.hero_title_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Shown as the large display text in the hero." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-sm font-medium", children: "Tagline" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: heroTagline,
                          onChange: (e) => setHeroTagline(e.target.value),
                          className: "rounded-xl font-body h-11",
                          placeholder: "Handmade Crochet with Love",
                          "data-ocid": "admin.hero_tagline_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Subtitle shown below the heading." })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 p-4 rounded-2xl bg-muted/40 border border-border text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-foreground leading-tight", children: heroTitle || "The Cozy Hook" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mt-1", children: heroTagline || "Handmade Crochet with Love" })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.section,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.12 },
              className: "bg-card border border-border rounded-3xl overflow-hidden shadow-soft",
              "data-ocid": "admin.featured_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-7 py-5 border-b border-border bg-muted/30 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Featured Products" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mt-0.5", children: "Select up to 5 products to highlight on the homepage." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `font-body text-sm font-medium px-3 py-1 rounded-full border ${selectedIds.length >= 5 ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground border-border"}`,
                      children: [
                        selectedIds.length,
                        " / 5"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-7 py-6 space-y-6", children: grouped.map(({ category, products }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `admin.category.${category.toLowerCase().replace(" ", "_")}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `font-body text-xs font-semibold px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[category]}`,
                            children: category
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "flex-1" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5", children: products.map((p, i) => {
                        const isSelected = selectedIds.includes(p.id);
                        const isDisabled = !isSelected && selectedIds.length >= 5;
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => !isDisabled && toggleProduct(p.id),
                            disabled: isDisabled,
                            className: `text-left p-3 rounded-2xl border transition-smooth relative group ${isSelected ? "border-primary bg-primary/8 shadow-soft" : isDisabled ? "border-border bg-background opacity-40 cursor-not-allowed" : "border-border bg-background hover:border-primary/50 hover:bg-accent/30 cursor-pointer"}`,
                            "data-ocid": `admin.product_toggle.${i + 1}`,
                            children: [
                              isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-primary-foreground" }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs line-clamp-1 font-medium text-foreground pr-4", children: p.name }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body text-xs text-primary font-semibold mt-0.5 block", children: [
                                "₹",
                                p.price
                              ] })
                            ]
                          },
                          p.id
                        );
                      }) })
                    ]
                  },
                  category
                )) }),
                selectedIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-7 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-2xl p-4 border border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2", children: "Selected for homepage" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: selectedIds.map((id) => {
                    const product = ALL_PRODUCTS.find((p) => p.id === id);
                    if (!product) return null;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => toggleProduct(id),
                        className: "font-body text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-smooth",
                        "aria-label": `Remove ${product.name} from featured`,
                        children: [
                          product.name,
                          " ×"
                        ]
                      },
                      id
                    );
                  }) })
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.18 },
              className: "flex items-center justify-between bg-card border border-border rounded-2xl px-6 py-4 shadow-soft",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-medium text-foreground", children: "Ready to publish?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground", children: "Changes will update your homepage immediately." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "lg",
                    className: "rounded-2xl font-body gap-2 px-6",
                    onClick: handleSave,
                    "data-ocid": "admin.save_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                      "Save Changes"
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  AdminPage,
  F as FEATURED_PRODUCT_IDS
};
