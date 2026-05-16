import type { Bundle, Product } from "../types/product";

export const ALL_PRODUCTS: Product[] = [
  // ── Plushies ──────────────────────────────────────────────────────────────
  {
    id: "plush-002",
    name: "whale plushie",
    category: "plushies",
    price: 299,
    description:
      "A chubby little whale that fits perfectly in your palm. Deep ocean blue yarn with a soft cream belly and tiny sprouting water droplets on top — utterly adorable.",
    features: [
      "Soft merino-blend yarn",
      "Satin ribbon accent",
      "Approx. 18 cm long",
      "Hypoallergenic stuffing",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "plush-003",
    name: "octopus plushie",
    category: "plushies",
    price: 249,
    description:
      "Eight wriggly arms and a round squishy body — this crochet octopus is both a toy and a mood booster. Flip the head to reveal a second hidden expression.",
    features: [
      "Reversible happy/grumpy face",
      "8 flexible tentacles",
      "Durable cotton yarn",
      "Approx. 22 cm",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "plush-004",
    name: "bear plushie",
    category: "plushies",
    price: 349,
    description:
      "A classic teddy silhouette reimagined in crochet. This warm honey-toned bear has a small heart stitched on its chest — a thoughtful handmade gift for any occasion.",
    features: [
      "Warm honey cotton yarn",
      "Heart chest embroidery",
      "Approx. 19 cm tall",
      "Safe wire-free construction",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "plush-006",
    name: "frog plushie",
    category: "plushies",
    price: 249,
    description:
      "Ribbit! This sage-green crochet frog with its signature wide eyes and tiny smile is perpetually mid-jump and permanently cheerful.",
    features: [
      "Sage green yarn",
      "Wide safety-grade button eyes",
      "Approx. 17 cm",
      "Hypoallergenic fill",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "plush-007",
    name: "cowboy duck plushie",
    category: "plushies",
    price: 299,
    description:
      "Yeehaw! Your favourite duck now in a tiny crocheted cowboy hat and boots. A collector's piece that makes everyone smile.",
    features: [
      "Removable cowboy hat",
      "Hand-stitched boots detail",
      "Approx. 20 cm tall",
      "Collector's edition colourway",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "plush-001",
    name: "bunny plushie",
    category: "plushies",
    price: 299,
    description:
      "Meet your new soft companion — this hand-crocheted bunny is stuffed with premium hypoallergenic filling and finished with embroidered features that give her the most endearing expression.",
    features: [
      "100% cotton yarn",
      "Hypoallergenic polyester fill",
      "Embroidered nose & eyes",
      "Approx. 20 cm tall",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "plush-008",
    name: "strawberry costumed bunny",
    category: "plushies",
    price: 399,
    description:
      "A bunny dressed in a strawberry costume — red body with white seed dots, green leaf ears, and the most innocent face. A seasonal favourite that sells out fast.",
    features: [
      "Red & white cotton yarn",
      "Leaf-shaped ears",
      "Approx. 21 cm",
      "Extra huggable design",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
    isNew: true,
  },

  // ── Keychains ─────────────────────────────────────────────────────────────
  {
    id: "key-003",
    name: "mini bouquet keychain",
    category: "keychains",
    price: 149,
    description:
      "A tiny hand-crocheted flower bouquet keychain — delicate blooms in soft pastels that bring a garden touch to your keys or bag.",
    features: [
      "Mini bouquet design",
      "Pastel yarn blooms",
      "Gold-tone ring",
      "Approx. 7 cm with ring",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "gradient-flower-keychain",
    name: "gradient flower keychain",
    category: "keychains",
    price: 129,
    description:
      "A gorgeous hand-crocheted flower keychain worked in a gentle colour gradient — each petal blends seamlessly into the next for a truly unique finish.",
    features: [
      "Gradient colour yarn",
      "Full bloom flower shape",
      "Stainless steel ring",
      "Approx. 7 cm with ring",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "cake-roll-keychain",
    name: "cake roll keychain",
    category: "keychains",
    price: 149,
    description:
      "An irresistibly cute crochet cake roll keychain that looks good enough to eat. A miniature Swiss roll complete with cream filling detail.",
    features: [
      "Cake roll swirl design",
      "Cream fill detailing",
      "Cotton yarn",
      "Approx. 6 cm long",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
    isNew: true,
  },
  {
    id: "key-006",
    name: "bow keychain",
    category: "keychains",
    price: 119,
    description:
      "A sweet oversized bow that makes your keys look like a gift. Available in a range of pastel shades.",
    features: [
      "Oversized bow shape",
      "Pastel colour options",
      "Lightweight cotton",
      "Approx. 8 cm wide",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "bow-keychain-thin",
    name: "bow keychain (thin)",
    category: "keychains",
    price: 99,
    description:
      "A slender, delicate bow keychain for those who love a subtler look. Dainty proportions, maximum charm.",
    features: [
      "Thin bow silhouette",
      "Fine cotton yarn",
      "Lightweight",
      "Approx. 6 cm wide",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "key-007",
    name: "cherry keychain",
    category: "keychains",
    price: 129,
    description:
      "Twin cherries on a shared stem — the cutest keychain in the collection. Always sold in pairs.",
    features: [
      "Twin cherry design",
      "Red & green yarn",
      "Shared gold stem",
      "Approx. 9 cm total",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "key-001",
    name: "starfish keychain",
    category: "keychains",
    price: 119,
    description:
      "A tiny hand-crocheted starfish in warm sandy tones — bring a little beach wherever you go.",
    features: [
      "5-arm starfish shape",
      "Stainless steel ring",
      "Approx. 6 cm",
      "Cotton yarn",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "key-002",
    name: "heart keychain",
    category: "keychains",
    price: 109,
    description:
      "A plump crochet heart in dusty rose — the most effortless way to carry a little love.",
    features: [
      "Plump heart shape",
      "Dusty rose yarn",
      "Stainless steel clasp",
      "Approx. 5 cm",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "key-004",
    name: "bunny keychain",
    category: "keychains",
    price: 129,
    description:
      "A miniature bunny with floppy ears. Pick your colour — white, grey, pastel pink, or sage.",
    features: [
      "Floppy ears design",
      "4 colour options",
      "Safety eyes",
      "Approx. 8 cm",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "sunflower-keychain",
    name: "sunflower keychain",
    category: "keychains",
    price: 149,
    description:
      "A cheerful hand-crocheted sunflower keychain in bright yellow and warm brown — a little ray of sunshine wherever you go.",
    features: [
      "Sunflower bloom shape",
      "Bright yellow & brown yarn",
      "Gold-tone ring",
      "Approx. 7 cm with ring",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "key-005",
    name: "initial letter keychain (custom)",
    category: "keychains",
    price: 159,
    description:
      "Your initial, hand-crocheted in 3D block lettering. Personalised, practical, and proud.",
    features: [
      "Any letter A–Z",
      "3D block letter",
      "Custom colour on request",
      "Approx. 5 cm",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },

  // ── Wearables ─────────────────────────────────────────────────────────────
  {
    id: "hairband",
    name: "hairband",
    category: "wearables",
    price: 149,
    description:
      "A wide crocheted hairband worked in a delicate shell stitch — elegant enough for date night, cozy enough for every day.",
    features: [
      "Wide shell-stitch design",
      "Stretch fit",
      "Soft cotton yarn",
      "Pastel shades available",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "wear-004",
    name: "fingerless gloves",
    category: "wearables",
    price: 299,
    description:
      "Stay warm while keeping your fingertips free — perfect for typing, scrolling, and everything in between.",
    features: [
      "Fingerless design",
      "Ribbed cuffs",
      "One size (adjustable)",
      "Wool-blend yarn",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "wear-005",
    name: "bucket hat",
    category: "wearables",
    price: 399,
    description:
      "A wide-brimmed crochet bucket hat in open-weave cotton — perfect for sunny days and festival looks.",
    features: [
      "Wide brim",
      "Open-weave cotton",
      "Adjustable inner tie",
      "Summer colourways",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "bandana",
    name: "bandana",
    category: "wearables",
    price: 249,
    description:
      "A hand-crocheted bandana in lightweight cotton — wear it as a neck scarf, head wrap, or hair tie for a boho touch.",
    features: [
      "Versatile styling options",
      "Lightweight cotton yarn",
      "One size fits all",
      "Multiple colourways",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "daisy-headband",
    name: "daisy headband",
    category: "wearables",
    price: 299,
    description:
      "A charming crochet headband adorned with tiny daisy flowers — the perfect finishing touch for summer looks and everyday wear.",
    features: [
      "Daisy flower embellishments",
      "Stretchy & comfortable fit",
      "Cotton yarn",
      "One size fits most",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
    isNew: true,
  },

  // ── Home Decor ────────────────────────────────────────────────────────────
  {
    id: "hanging-plant",
    name: "hanging plant",
    category: "home decor",
    price: 349,
    description:
      "A beautiful macramé-style crochet hanging planter that adds a touch of boho green to any wall or window.",
    features: [
      "Fits pots up to 12 cm diameter",
      "Natural cotton cord",
      "Ready-to-hang loop",
      "Approx. 40 cm drop",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "decor-006",
    name: "heart pillow",
    category: "home decor",
    price: 399,
    description:
      "A giant crocheted heart pillow in dusty rose — the cosiest declaration of love for your living room or bedroom.",
    features: [
      "Heart shape",
      "30 cm width",
      "Dusty rose yarn",
      "Fiberfill stuffed",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "decor-001",
    name: "coaster set",
    category: "home decor",
    price: 299,
    description:
      "A set of 4 mandala-style coasters in coordinating pastel tones — protect your surfaces in style.",
    features: ["Set of 4", "Mandala pattern", "10 cm diameter", "100% cotton"],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "decor-002",
    name: "table mat",
    category: "home decor",
    price: 399,
    description:
      "Rectangular placemats in a classic stripe pattern — natural fibre colours that complement any table setting.",
    features: ["Set of 2", "33 × 45 cm", "Jute-cotton blend", "Heat resistant"],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "decor-003",
    name: "wall hanging",
    category: "home decor",
    price: 499,
    description:
      "A boho-chic wall hanging with layered fringe and woven rings — handcrafted to be the focal point of any room.",
    features: [
      "Driftwood dowel",
      "Layered fringe",
      "Approx. 60 cm tall",
      "Ready to hang",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },

  // ── Accessories ───────────────────────────────────────────────────────────
  {
    id: "tulip-hair-accessory",
    name: "tulip hair accessory",
    category: "accessories",
    price: 149,
    description:
      "A hand-crocheted tulip hair clip that adds a sweet floral accent to any hairstyle — delicate and perfectly spring-ready.",
    features: [
      "Tulip bloom design",
      "Secure clip backing",
      "Cotton yarn",
      "Approx. 5 cm bloom",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
    isNew: true,
  },
  {
    id: "acc-001",
    name: "scrunchies",
    category: "accessories",
    price: 99,
    description:
      "Chunky crochet scrunchies that are gentle on your hair and great as a wrist accessory too.",
    features: [
      "Soft elastic inside",
      "Cotton yarn",
      "One size",
      "Multiple colours",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "acc-002",
    name: "bookmarks",
    category: "accessories",
    price: 79,
    description:
      "Slender crochet bookmarks with a tiny charm end — because even reading deserves a little handmade love.",
    features: [
      "15 cm length",
      "Charm end (heart/flower/star)",
      "Cotton thread",
      "Customisable",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "acc-003",
    name: "phone charms",
    category: "accessories",
    price: 119,
    description:
      "Clip a tiny crochet charm to your phone loop — pastel animals, fruits, and shapes to choose from.",
    features: [
      "Universal phone loop clip",
      "Choose from 12 designs",
      "Approx. 6 cm",
      "Cotton yarn",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
    isNew: true,
  },
  {
    id: "acc-004",
    name: "mini pouches",
    category: "accessories",
    price: 199,
    description:
      "A small crochet pouch with a zip closure — use it for coins, earbuds, or tiny treasures.",
    features: ["Zip closure", "10 × 8 cm", "Cotton yarn", "Inner lining"],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
  {
    id: "acc-005",
    name: "bag charms",
    category: "accessories",
    price: 149,
    description:
      "Upgrade any tote or backpack with a statement crochet charm. Mix and match shapes and colours.",
    features: [
      "Lobster clasp",
      "Multiple shapes",
      "Approx. 12 cm with chain",
      "Cotton yarn",
    ],
    imagePath: "/assets/generated/hero-crochet.dim_1600x900.jpg",
    pictureUrl: "https://the-cozy-hook.my.canva.site/product-images",
  },
];

export const SAMPLE_BUNDLES: Bundle[] = [
  {
    id: "bundle-001",
    name: "plushie + keychain duo",
    description:
      "a chubby whale plushie paired with a sweet heart keychain — perfect for gifting or treating yourself to a matching set.",
    price: 369,
    productIds: ["plush-002", "key-002"],
    savings: 39,
    isActive: true,
  },
  {
    id: "bundle-002",
    name: "gifting set",
    description:
      "the ultimate handmade gift: a cuddly bunny plushie, a cute bow keychain, and a soft scrunchie — all wrapped up with love.",
    price: 479,
    productIds: ["plush-001", "key-006", "acc-001"],
    savings: 48,
    isActive: true,
  },
  {
    id: "bundle-003",
    name: "wearables bundle",
    description:
      "a charming trio for the crochet lover — a shell-stitch hairband, a cozy scrunchie, and a sweet bow keychain to complete any look.",
    price: 299,
    productIds: ["hairband", "acc-001", "key-006"],
    savings: 68,
    isActive: true,
  },
];

export const FEATURED_PRODUCT_IDS = [
  "plush-001",
  "plush-007",
  "key-007",
  "decor-006",
];

export const CATEGORIES = [
  "plushies",
  "keychains",
  "wearables",
  "home decor",
  "accessories",
] as const;

export function getProductsByCategory(category: string): Product[] {
  return ALL_PRODUCTS.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export function getFeaturedProducts(ids: string[]): Product[] {
  return ids
    .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];
}
