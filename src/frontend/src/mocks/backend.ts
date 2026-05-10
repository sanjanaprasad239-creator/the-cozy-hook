import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  adminLogin: async (_password: string) => false,
  getAdminSettings: async () => ({
    heroTitle: "The Cozy Hook",
    heroTagline: "Handmade Crochet with Love",
    featuredProductIds: [
      "plushie-strawberry-bunny",
      "plushie-cowboy-duck",
      "keychain-initial-letter",
      "wearable-cat-ear-beanie",
      "decor-flower-bouquets",
    ],
  }),
  getProductById: async (id: string) => ({
    id,
    name: "Strawberry Bunny Plushie",
    category: "Plushies",
    price: BigInt(650),
    description:
      "An irresistibly sweet bunny dressed as a strawberry. A fan-favourite and the perfect kawaii gift.",
    features: [
      "100% handmade",
      "Red and green yarn combo",
      "Child-safe stuffing",
      "Approx 19 cm tall",
      "Detachable strawberry cap",
    ],
    imagePath: "/assets/products/strawberry-bunny-plushie.jpg",
  }),
  getProducts: async () => [
    {
      id: "plushie-strawberry-bunny",
      name: "Strawberry Bunny Plushie",
      category: "Plushies",
      price: BigInt(650),
      description:
        "An irresistibly sweet bunny dressed as a strawberry. A fan-favourite and the perfect kawaii gift.",
      features: [
        "100% handmade",
        "Red and green yarn combo",
        "Child-safe stuffing",
        "Approx 19 cm tall",
        "Detachable strawberry cap",
      ],
      imagePath: "/assets/products/strawberry-bunny-plushie.jpg",
    },
    {
      id: "plushie-cowboy-duck",
      name: "Cowboy Duck Plushie",
      category: "Plushies",
      price: BigInt(620),
      description:
        "A sassy duck wearing a tiny crocheted cowboy hat. Because every duck deserves to be a cowboy.",
      features: [
        "100% handmade",
        "Removable cowboy hat",
        "Child-safe stuffing",
        "Approx 16 cm tall",
        "Hand-stitched details",
      ],
      imagePath: "/assets/products/cowboy-duck-plushie.jpg",
    },
    {
      id: "keychain-initial-letter",
      name: "Initial Letter Keychain",
      category: "Keychains",
      price: BigInt(199),
      description:
        "A personalised crocheted letter keychain — customise with any letter of the alphabet.",
      features: [
        "100% handmade",
        "Custom letter on request",
        "Durable metal keyring",
        "Approx 5 cm",
        "Perfect personalised gift",
      ],
      imagePath: "/assets/products/initial-letter-keychain.jpg",
    },
    {
      id: "wearable-cat-ear-beanie",
      name: "Cat Ear Beanie",
      category: "Wearables",
      price: BigInt(579),
      description:
        "A playful crocheted beanie with built-in cat ears. Cute, cozy, and totally unique.",
      features: [
        "100% handmade",
        "Built-in cat ears",
        "Soft acrylic yarn",
        "One size fits most",
        "Great gift for cat lovers",
      ],
      imagePath: "/assets/products/cat-ear-beanie.jpg",
    },
    {
      id: "decor-flower-bouquets",
      name: "Crochet Flower Bouquets",
      category: "HomeDecor",
      price: BigInt(599),
      description:
        "A stunning arrangement of crocheted flowers that never wilt. A forever bouquet for those who love lasting beauty.",
      features: [
        "100% handmade",
        "Bouquet of 7-10 flowers",
        "Mixed pastel colors",
        "Wire stems for posing",
        "No watering needed",
      ],
      imagePath: "/assets/products/flower-bouquets.jpg",
    },
    {
      id: "plushie-bunny",
      name: "Bunny Plushie",
      category: "Plushies",
      price: BigInt(550),
      description:
        "An adorable hand-crocheted bunny plushie made with premium soft yarn.",
      features: ["100% handmade", "Soft premium yarn", "Child-safe stuffing"],
      imagePath: "/assets/products/bunny-plushie.jpg",
    },
    {
      id: "acc-scrunchies",
      name: "Scrunchies",
      category: "Accessories",
      price: BigInt(99),
      description:
        "Soft crocheted scrunchies that are gentle on your hair and look adorable on your wrist too.",
      features: ["100% handmade", "Set of 3 scrunchies", "Mixed pastel colors"],
      imagePath: "/assets/products/scrunchies.jpg",
    },
  ],
  getProductsByCategory: async (category: string) => [
    {
      id: "plushie-strawberry-bunny",
      name: "Strawberry Bunny Plushie",
      category,
      price: BigInt(650),
      description: "An irresistibly sweet bunny dressed as a strawberry.",
      features: ["100% handmade", "Red and green yarn combo"],
      imagePath: "/assets/products/strawberry-bunny-plushie.jpg",
    },
    {
      id: "plushie-cowboy-duck",
      name: "Cowboy Duck Plushie",
      category,
      price: BigInt(620),
      description: "A sassy duck wearing a tiny crocheted cowboy hat.",
      features: ["100% handmade", "Removable cowboy hat"],
      imagePath: "/assets/products/cowboy-duck-plushie.jpg",
    },
  ],
  setFeaturedProducts: async (_ids: Array<string>) => undefined,
  updateHeroText: async (_title: string, _tagline: string) => undefined,
  addReview: async (_productId: string, _rating: bigint, _reviewText: string, _authorName: string): Promise<bigint> => BigInt(1),
  deleteReview: async (_reviewId: bigint, _adminPassword: string): Promise<boolean> => false,
  getAllReviews: async () => [],
  getReviewsByProduct: async (_productId: string) => [],
};
