import { ExternalLink, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Product Knowledge Base ────────────────────────────────────────────────
const KB = {
  products: {
    Plushies: [
      { name: "Whale Plushie", price: 299 },
      { name: "Octopus Plushie", price: 249 },
      { name: "Bear Plushie", price: 349 },
      { name: "Frog Plushie", price: 249 },
      { name: "Cowboy Duck Plushie", price: 299 },
      { name: "Bunny Plushie", price: 299 },
      { name: "Strawberry Costumed Bunny", price: 399, highlight: true },
    ],
    Keychains: [
      { name: "Mini Bouquet Keychain", price: 149 },
      { name: "Gradient Flower Keychain", price: 129 },
      { name: "Cake Roll Keychain", price: 149 },
      { name: "Bow Keychain", price: 119 },
      { name: "Bow Keychain (Thin)", price: 99 },
      { name: "Cherry Keychain", price: 129 },
      { name: "Starfish Keychain", price: 119 },
      { name: "Heart Keychain", price: 109 },
      { name: "Bunny Keychain", price: 129 },
      { name: "Sunflower Keychain", price: 149 },
      { name: "Initial Letter Keychain (Custom)", price: 159, custom: true },
    ],
    Wearables: [
      { name: "Hairband", price: 149 },
      { name: "Fingerless Gloves", price: 299 },
      { name: "Bucket Hat", price: 399, highlight: true },
      { name: "Bandana", price: 249 },
      { name: "Daisy Headband", price: 299 },
    ],
    "Home Decor": [
      { name: "Hanging Plant", price: 349 },
      { name: "Heart Pillow", price: 399, highlight: true },
      { name: "Coaster Set", price: 299 },
      { name: "Table Mat", price: 399 },
      { name: "Wall Hanging", price: 499, highlight: true },
    ],
    Accessories: [
      { name: "Tulip Hair Accessory", price: 129 },
      { name: "Scrunchies", price: 99 },
      { name: "Bookmarks", price: 79 },
      { name: "Phone Charms", price: 119 },
      { name: "Mini Pouches", price: 199 },
      { name: "Bag Charms", price: 149 },
    ],
  } as Record<
    string,
    { name: string; price: number; highlight?: boolean; custom?: boolean }[]
  >,
  delivery: { charge: 49, freeAbove: 999, days: "5\u20137 business days" },
  contact: {
    whatsapp: "918660099085",
    email: "sanjanaprasad239@gmail.com",
    whatsappUrl: "https://wa.me/918660099085",
  },
  customOrdersUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSe0BlM1VYW-igf5GLSDMpDddolGnPASMygeFOfyRiTfdiGfPQ/viewform",
  imageGallery: "https://the-cozy-hook.my.canva.site/product-images",
};

// ─── Types ─────────────────────────────────────────────────────────────────
interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  link?: { label: string; url: string };
}

interface ConversationContext {
  lastCategory: string | null;
  lastProduct: string | null;
  lastIntent: string | null;
}

type ResponseResult = {
  text: string;
  link?: { label: string; url: string };
  newCtx: Partial<ConversationContext>;
};

// ─── Helpers ───────────────────────────────────────────────────────────────
function allProducts() {
  return Object.values(KB.products).flat();
}

function fmt(
  items: {
    name: string;
    price: number;
    highlight?: boolean;
    custom?: boolean;
  }[],
): string {
  return items
    .map(
      (p) =>
        `\u2022 ${p.name} \u2014 \u20b9${p.price}${p.highlight ? " \u2728" : ""}${p.custom ? " (Custom)" : ""}`,
    )
    .join("\n");
}

/** Normalize: lowercase, trim, collapse spaces, remove most punctuation */
function norm(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u20b9\s]/g, " ")
    .replace(/\s+/g, " ");
}

/** Expand common contractions and shorthand */
function expand(s: string): string {
  return s
    .replace(/what'?s/g, "what is")
    .replace(/how'?s/g, "how is")
    .replace(/it'?s/g, "it is")
    .replace(/i'?m/g, "i am")
    .replace(/don'?t/g, "do not")
    .replace(/can'?t/g, "cannot")
    .replace(/won'?t/g, "will not")
    .replace(/isn'?t/g, "is not")
    .replace(/aren'?t/g, "are not")
    .replace(/\bwatsapp\b/g, "whatsapp")
    .replace(/\bwapp\b/g, "whatsapp")
    .replace(/\bwhats app\b/g, "whatsapp")
    .replace(/\bgpay\b/g, "google pay")
    .replace(/\bphnpe\b/g, "phonepe")
    .replace(/\bptm\b/g, "paytm")
    .replace(/\bbtao\b/g, "bata")
    .replace(/\bkitna\b/g, "how much")
    .replace(/\bkya price\b/g, "what is the price")
    .replace(/\bkitna hai\b/g, "how much is it")
    .replace(/\bkya rate\b/g, "what is the rate")
    .replace(/\biska rate\b/g, "what is its price")
    .replace(/\bbhai\b/g, "")
    .replace(/\byaar\b/g, "")
    .replace(/\bboss\b/g, "")
    .replace(/\bji\b/g, "")
    .replace(/\bna\b/g, "")
    .replace(/\bplz\b/g, "please")
    .replace(/\bpls\b/g, "please")
    .replace(/\bu\b/g, "you")
    .replace(/\bur\b/g, "your")
    .replace(/\br\b/g, "are")
    .replace(/\bwanna\b/g, "want to")
    .replace(/\bgonna\b/g, "going to")
    .replace(/\bgimme\b/g, "give me")
    .replace(/\blemme\b/g, "let me")
    .replace(/\baight\b/g, "alright")
    .replace(/\bw8\b/g, "wait")
    .replace(/\bwts\b/g, "what is")
    .replace(/\bbtw\b/g, "by the way")
    .replace(/\bidk\b/g, "i do not know")
    .replace(/\bimo\b/g, "in my opinion")
    .replace(/\bfyi\b/g, "for your information")
    .replace(/\basap\b/g, "as soon as possible")
    .replace(/\bprice bata\b/g, "tell me the price")
    .replace(/\bprice btao\b/g, "tell me the price")
    .replace(/\bcost kitna\b/g, "how much does it cost")
    .replace(/\bkab milega\b/g, "when will i get it")
    .replace(/\bkaise order\b/g, "how to order");
}

/** Fuzzy word overlap: does query share >=1 word token with product name? */
function fuzzyMatch(query: string, productName: string): boolean {
  const qTokens = norm(query)
    .split(" ")
    .filter((t) => t.length > 2);
  const pNorm = norm(productName);
  return qTokens.some((t) => pNorm.includes(t));
}

function findProductsByQuery(query: string) {
  const q = norm(query);
  const exact = allProducts().filter((p) => q.includes(norm(p.name)));
  if (exact.length > 0) return exact;
  return allProducts().filter((p) => fuzzyMatch(q, p.name));
}

function getCategory(productName: string): string | null {
  for (const [cat, items] of Object.entries(KB.products)) {
    if (items.some((i) => i.name === productName)) return cat;
  }
  return null;
}

function categoryProducts(cat: string) {
  const key = Object.keys(KB.products).find((k) => norm(k).includes(norm(cat)));
  return key ? { key, items: KB.products[key] } : null;
}

// ─── Random response picker ────────────────────────────────────────────────
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Price range extractor ─────────────────────────────────────────────────
function extractUnder(q: string): number | null {
  const m = q.match(
    /(?:under|below|less than|within|upto?|up to|max(?:imum)?|not more than|no more than)\s*[\u20b9rups.]*\s*(\d+)/,
  );
  return m ? Number.parseInt(m[1]) : null;
}

function extractAbove(q: string): number | null {
  const m = q.match(
    /(?:above|over|more than|atleast|at least|min(?:imum)?|starting from|from)\s*[\u20b9rups.]*\s*(\d+)/,
  );
  return m ? Number.parseInt(m[1]) : null;
}

function extractBetween(q: string): [number, number] | null {
  const m = q.match(
    /(?:between|from|ranging from)?\s*[\u20b9rups.]*\s*(\d+)\s*(?:to|and|-)\s*[\u20b9rups.]*\s*(\d+)/,
  );
  if (m) {
    const lo = Number.parseInt(m[1]);
    const hi = Number.parseInt(m[2]);
    return lo < hi ? [lo, hi] : [hi, lo];
  }
  return null;
}

// ─── Intent scoring system ─────────────────────────────────────────────────
// Each intent has a list of keyword tokens. The engine scores each intent
// by counting how many tokens from the query match the keyword list.
// The highest-scoring intent above a threshold wins.
// This approach covers thousands of phrasings via keyword combination.

const INTENT_KEYWORDS: Record<string, string[]> = {
  GREETING: [
    "hi",
    "hii",
    "hiii",
    "hiiii",
    "hello",
    "helloo",
    "helo",
    "heloo",
    "hey",
    "heyy",
    "heyyy",
    "hiya",
    "howdy",
    "sup",
    "wassup",
    "whatsup",
    "yo",
    "gm",
    "gn",
    "hai",
    "helo",
    "namaste",
    "namaskar",
    "vanakkam",
    "salam",
    "assalamu",
    "bonjour",
    "hola",
    "ciao",
    "aloha",
    "good morning",
    "good afternoon",
    "good evening",
    "good night",
    "good day",
    "how are you",
    "how are u",
    "how r you",
    "how r u",
    "how is it going",
    "how it going",
    "whats good",
    "what good",
    "how do you do",
    "how are things",
    "what is up",
    "start",
    "begin",
    "open",
    "wake up",
    "anyone there",
    "hello there",
    "hi there",
    "hey there",
    "good to see",
    "nice to meet",
    "pleased to meet",
    "greetings",
    "salutations",
    "ahoy",
    "yooo",
    "supp",
    "watsup",
    "wasssup",
    "hwdy",
    "heyyo",
    "heya",
    "morning",
    "afternoon",
    "evening",
    "night",
    "hi assistant",
    "hello assistant",
    "hey assistant",
    "hi bot",
    "hello bot",
    "hey bot",
    "hi there cozy",
    "hello cozy",
    "test",
    "testing",
    "is this working",
    "are you there",
    "you there",
    "anybody there",
  ],

  FAREWELL: [
    "bye",
    "byee",
    "byeee",
    "goodbye",
    "good bye",
    "goodnight",
    "see you",
    "see ya",
    "see u",
    "cya",
    "later",
    "laters",
    "take care",
    "ttyl",
    "gtg",
    "gotta go",
    "got to go",
    "have to go",
    "need to go",
    "leaving",
    "closing",
    "done",
    "finish",
    "finished",
    "all done",
    "signing off",
    "log off",
    "exit",
    "quit",
    "i am done",
    "i am leaving",
    "talk later",
    "chat later",
    "see you later",
    "see you soon",
    "until next time",
    "adieu",
    "au revoir",
    "cheerio",
    "toodles",
    "peace out",
    "ok bye",
    "okay bye",
    "alright bye",
    "thanks bye",
    "thank you bye",
    "bye bye",
    "byebye",
    "ciao",
    "hasta la vista",
    "farewell",
    "so long",
    "ta ta",
    "tata",
  ],

  THANKS: [
    "thank",
    "thanks",
    "thankyou",
    "thank you",
    "thx",
    "ty",
    "thnx",
    "thnks",
    "thnkz",
    "tysm",
    "tyvm",
    "ty so much",
    "thank you so much",
    "thanks a lot",
    "thanks a bunch",
    "thanks a ton",
    "many thanks",
    "much appreciated",
    "appreciate it",
    "appreciate that",
    "grateful",
    "gratitude",
    "cheers",
    "you are awesome",
    "you are helpful",
    "so helpful",
    "very helpful",
    "great help",
    "good help",
    "nice help",
    "helpful response",
    "you are the best",
    "you are amazing",
    "wonderful",
    "fantastic response",
    "brilliant",
    "super helpful",
    "really helpful",
    "this helped",
    "that helped",
    "thats helpful",
    "that was helpful",
    "you helped me",
    "helped a lot",
    "big thanks",
    "huge thanks",
    "thousand thanks",
    "million thanks",
    "shukriya",
    "dhanyawad",
    "shukriya bhai",
    "bahut shukriya",
    "abhar",
    "bahut achha",
  ],

  ABOUT: [
    "about",
    "who are you",
    "who r you",
    "what is this",
    "what is the cozy hook",
    "tell me about",
    "brand story",
    "your story",
    "our story",
    "who made this",
    "who runs this",
    "who started this",
    "who created this",
    "founder",
    "owner",
    "origin story",
    "sanjana",
    "sanjana prasad",
    "handmade",
    "what do you do",
    "cozy hook",
    "your mission",
    "about you",
    "about the shop",
    "about the brand",
    "about this store",
    "about your store",
    "what is your brand",
    "who is behind",
    "who is the maker",
    "artisan",
    "maker",
    "creator",
    "your background",
    "company info",
    "company details",
    "store info",
    "shop info",
    "business info",
    "your company",
    "your shop",
    "your business",
    "where are you from",
    "based in",
    "located in",
    "india",
    "history",
    "how long have you",
    "when did you start",
    "when was this started",
    "what do you make",
    "what do you sell here",
    "is this a small business",
    "small business",
    "home business",
    "cottage",
    "passion project",
  ],

  ALL_PRODUCTS: [
    "all products",
    "everything",
    "full list",
    "complete list",
    "product list",
    "full collection",
    "entire collection",
    "whole collection",
    "all collection",
    "show all",
    "show everything",
    "what do you sell",
    "what do you have",
    "what do you offer",
    "what do you make",
    "what can i buy",
    "show me all",
    "what is available",
    "what items",
    "catalog",
    "catalogue",
    "all items",
    "everything you have",
    "your products",
    "full range",
    "complete range",
    "all your products",
    "what kinds",
    "what types",
    "list all",
    "show catalog",
    "what stuff",
    "your stuff",
    "ur stuff",
    "what things",
    "what items do you have",
    "what do you carry",
    "all of it",
    "the whole lot",
    "complete catalog",
    "browse all",
    "see all",
    "view all",
    "explore",
    "full menu",
    "all menu",
    "what are you selling",
    "item list",
    "product range",
    "everything available",
    "tell me what you have",
    "list everything",
    "show products",
    "your range",
  ],

  PLUSHIES: [
    "plushie",
    "plushies",
    "plush",
    "soft toy",
    "soft toys",
    "stuffed animal",
    "stuffed toy",
    "stuffed animals",
    "stuffed toys",
    "cuddly toy",
    "cuddly toys",
    "cuddly",
    "squishy",
    "squishies",
    "fluffy toy",
    "fluffy toys",
    "cute toy",
    "cute toys",
    "toy animal",
    "kids toy",
    "baby toy",
    "huggable",
    "squeezable",
    "big plush",
    "small plush",
    "crochet plush",
    "crochet toy",
    "amigurumi",
    "whale plushie",
    "whale toy",
    "whale plush",
    "whale stuffed",
    "the whale",
    "that whale",
    "octopus plushie",
    "octopus toy",
    "octopus plush",
    "the octopus",
    "that octopus",
    "bear plushie",
    "bear toy",
    "bear plush",
    "teddy bear",
    "teddy",
    "the bear",
    "that bear",
    "frog plushie",
    "frog toy",
    "frog plush",
    "the frog",
    "that frog",
    "froggy",
    "frog stuffed",
    "duck plushie",
    "duck toy",
    "duck plush",
    "cowboy duck",
    "the duck",
    "that duck",
    "ducky",
    "bunny plushie",
    "bunny toy",
    "bunny plush",
    "rabbit plushie",
    "rabbit toy",
    "the bunny",
    "that bunny",
    "bunny stuffed",
    "rabbit stuffed",
    "rabbit plush",
    "strawberry bunny",
    "strawberry costumed",
    "strawberry plushie",
    "the strawberry",
    "that strawberry",
    "costumed bunny",
    "fancy bunny",
    "dressed bunny",
    "whale",
    "octopus",
    "bear",
    "frog",
    "duck",
    "bunny",
    "strawberry",
    "show plushies",
    "all plushies",
    "list plushies",
    "plushie list",
    "plushie prices",
    "plushie collection",
    "plushie range",
    "what plushies",
    "which plushies",
  ],

  KEYCHAINS: [
    "keychain",
    "keychains",
    "key chain",
    "key chains",
    "keyring",
    "key ring",
    "keyrings",
    "key rings",
    "fob",
    "key fob",
    "bag tag",
    "bag tags",
    "hanging charm",
    "mini charm",
    "crochet keychain",
    "crochet key",
    "mini bouquet",
    "bouquet keychain",
    "flower bouquet keychain",
    "the bouquet",
    "gradient flower",
    "gradient flower keychain",
    "flower keychain",
    "the gradient",
    "cake roll",
    "cake roll keychain",
    "roll keychain",
    "the cake roll",
    "bow keychain",
    "bow key",
    "the bow",
    "thin bow",
    "bow thin",
    "slim bow",
    "cherry keychain",
    "cherry key",
    "the cherry",
    "starfish keychain",
    "starfish key",
    "star fish",
    "the starfish",
    "heart keychain",
    "heart key",
    "the heart keychain",
    "bunny keychain",
    "bunny key",
    "rabbit keychain",
    "rabbit key",
    "sunflower keychain",
    "sunflower key",
    "the sunflower",
    "initial letter",
    "letter keychain",
    "initial keychain",
    "personalised keychain",
    "name keychain",
    "custom keychain",
    "initials keychain",
    "alphabet keychain",
    "show keychains",
    "all keychains",
    "list keychains",
    "keychain list",
    "keychain prices",
    "keychain collection",
    "what keychains",
    "which keychains",
  ],

  WEARABLES: [
    "wearable",
    "wearables",
    "wear",
    "clothing",
    "clothes",
    "fashion",
    "things to wear",
    "items to wear",
    "apparel",
    "garment",
    "outfit",
    "hairband",
    "hair band",
    "head band",
    "headband",
    "hair accessory band",
    "the hairband",
    "hair tie",
    "hair ribbon",
    "fingerless gloves",
    "gloves",
    "fingerless",
    "the gloves",
    "crochet gloves",
    "hand warmers",
    "wrist warmers",
    "half gloves",
    "bucket hat",
    "hat",
    "cap",
    "crochet hat",
    "the hat",
    "the bucket hat",
    "sun hat",
    "beach hat",
    "slouchy hat",
    "beret",
    "bandana",
    "the bandana",
    "crochet bandana",
    "headscarf",
    "neckerchief",
    "daisy headband",
    "daisy hair band",
    "the daisy",
    "daisy band",
    "flower headband",
    "flower band",
    "daisy head",
    "show wearables",
    "all wearables",
    "list wearables",
    "wearable list",
    "wearable prices",
    "what wearables",
    "which wearables",
    "wearable collection",
  ],

  HOME_DECOR: [
    "home decor",
    "home decoration",
    "home accessories",
    "home items",
    "house decor",
    "house decoration",
    "interior",
    "for home",
    "for the house",
    "room decor",
    "room decoration",
    "home stuff",
    "room stuff",
    "room items",
    "hanging plant",
    "plant hanging",
    "crochet plant",
    "the plant",
    "that plant",
    "wall plant",
    "potted plant",
    "plant decor",
    "boho plant",
    "heart pillow",
    "pillow",
    "cushion",
    "the pillow",
    "heart cushion",
    "crochet pillow",
    "the heart pillow",
    "decorative pillow",
    "sofa pillow",
    "coaster set",
    "coasters",
    "coaster",
    "the coasters",
    "crochet coaster",
    "drink coaster",
    "cup coaster",
    "table coaster",
    "table mat",
    "table mats",
    "placemat",
    "placemats",
    "the table mat",
    "crochet mat",
    "dining mat",
    "kitchen mat",
    "wall hanging",
    "wall art",
    "the wall hanging",
    "crochet wall",
    "wall decor",
    "wall decoration",
    "boho wall",
    "macrame",
    "tapestry",
    "show decor",
    "all decor",
    "list decor",
    "home decor list",
    "decor prices",
    "what decor",
    "which decor",
    "decor collection",
  ],

  ACCESSORIES: [
    "accessories",
    "accessory",
    "fashion accessories",
    "style accessories",
    "extras",
    "add ons",
    "beauty accessories",
    "hair accessories",
    "phone accessories",
    "bag accessories",
    "small accessories",
    "tulip hair",
    "tulip accessory",
    "tulip",
    "the tulip",
    "flower hair clip",
    "hair clip",
    "floral clip",
    "flower clip",
    "scrunchie",
    "scrunchies",
    "hair scrunchie",
    "hair tie scrunchie",
    "the scrunchies",
    "elastic hair",
    "ponytail tie",
    "hair elastic",
    "bookmark",
    "bookmarks",
    "book mark",
    "book marks",
    "the bookmark",
    "reading marker",
    "page marker",
    "page holder",
    "book accessory",
    "phone charm",
    "phone charms",
    "the phone charm",
    "mobile charm",
    "phone decoration",
    "phone accessory",
    "phone tag",
    "mobile tag",
    "mini pouch",
    "mini pouches",
    "pouch",
    "pouches",
    "the pouch",
    "small bag",
    "little bag",
    "coin pouch",
    "crochet pouch",
    "crochet bag",
    "bag charm",
    "bag charms",
    "the bag charm",
    "handbag charm",
    "purse charm",
    "bag pendant",
    "bag decoration",
    "bag tag charm",
    "show accessories",
    "all accessories",
    "list accessories",
    "accessories list",
    "accessories prices",
    "what accessories",
    "which accessories",
  ],

  FAN_FAVES: [
    "fan favourite",
    "fan fav",
    "fan favorites",
    "fan favs",
    "most loved",
    "popular",
    "best seller",
    "bestseller",
    "bestsellers",
    "best sellers",
    "trending",
    "top picks",
    "top products",
    "top items",
    "what people love",
    "loved by all",
    "most popular",
    "recommended",
    "highly recommended",
    "what is popular",
    "most ordered",
    "most bought",
    "most sold",
    "top rated",
    "customer favourite",
    "customer favorites",
    "crowd favourite",
    "crowd pleaser",
    "fan pick",
    "fan picks",
    "staff pick",
    "staff picks",
    "editors pick",
    "highlight",
    "highlights",
    "featured",
    "best",
    "greatest",
    "star product",
    "star items",
    "special items",
    "special products",
    "love",
    "adore",
  ],

  DELIVERY: [
    "delivery",
    "deliver",
    "delivering",
    "deliveries",
    "shipping",
    "ship",
    "shipping charge",
    "delivery charge",
    "shipping cost",
    "delivery cost",
    "shipping fee",
    "delivery fee",
    "shipping rate",
    "delivery rate",
    "courier",
    "dispatch",
    "freight",
    "send",
    "sent",
    "postal",
    "post",
    "free delivery",
    "free shipping",
    "free ship",
    "zero delivery",
    "pan india",
    "all india",
    "nationwide",
    "india delivery",
    "deliver in india",
    "where do you deliver",
    "do you deliver",
    "will you deliver",
    "delivery available",
    "delivery area",
    "delivery location",
    "how much for delivery",
    "how much to deliver",
    "delivery charge how much",
    "shipping charge how much",
    "delivery above",
    "free above",
    "minimum free",
    "order above",
    "above 999",
    "above 1000",
    "minimum order",
    "how much does shipping cost",
    "is delivery free",
    "is shipping free",
    "delivery price",
    "shipping price",
    "how much extra",
    "extra charge",
    "extra cost",
    "additional charge",
    "delivery charges apply",
    "charges for delivery",
  ],

  DELIVERY_TIME: [
    "how long",
    "how many days",
    "when will i get",
    "when does it arrive",
    "when does it come",
    "when will it reach",
    "delivery time",
    "shipping time",
    "eta",
    "estimated time",
    "estimated delivery",
    "delivery days",
    "how long to ship",
    "how long to deliver",
    "how long does delivery take",
    "standard delivery time",
    "express delivery",
    "express ship",
    "fast delivery",
    "quick delivery",
    "time to receive",
    "days to receive",
    "days to deliver",
    "arrival time",
    "when delivered",
    "when dispatched",
    "how long does it take",
    "when will it come",
    "when will it arrive",
    "how soon can i get",
    "will it come soon",
    "fast ship",
    "quick ship",
    "how fast",
    "turnaround",
    "processing time",
    "dispatch time",
    "when will you send",
    "time frame",
    "kab milega",
    "kab ayega",
    "kab aayega",
  ],

  ORDERING: [
    "how to order",
    "how do i order",
    "how can i order",
    "how to buy",
    "how do i buy",
    "how can i buy",
    "how to purchase",
    "how to get",
    "place order",
    "placing order",
    "order process",
    "ordering process",
    "steps to order",
    "steps to buy",
    "buying process",
    "purchasing process",
    "checkout",
    "how does it work",
    "order now",
    "add to cart",
    "how to shop",
    "shopping process",
    "can i order",
    "want to order",
    "ordering steps",
    "i want to buy",
    "i want to order",
    "i want to get",
    "i wish to buy",
    "how do i get",
    "how do i proceed",
    "purchase process",
    "buy process",
    "place an order",
    "make an order",
    "submit an order",
    "order form",
    "how does buying work",
    "buying steps",
    "to buy",
    "to order",
    "next steps",
    "what do i do to order",
    "how do i place",
    "process of buying",
    "kaise order",
    "order kaise",
    "kaise buy",
    "buy kaise",
  ],

  PAYMENT: [
    "payment",
    "pay",
    "paying",
    "paid",
    "how to pay",
    "payment method",
    "payment methods",
    "payment options",
    "accepted payments",
    "payment modes",
    "mode of payment",
    "payment gateway",
    "payment process",
    "upi",
    "gpay",
    "google pay",
    "phonepe",
    "phone pe",
    "paytm",
    "bhim",
    "razorpay",
    "stripe",
    "instamojo",
    "cashfree",
    "card",
    "debit card",
    "credit card",
    "net banking",
    "netbanking",
    "online payment",
    "online pay",
    "pay online",
    "digital payment",
    "cash",
    "cash on delivery",
    "cod",
    "pay on delivery",
    "pay on arrival",
    "cash at delivery",
    "cash payment",
    "no cod",
    "is cod available",
    "wallet",
    "prepaid",
    "advance payment",
    "any payment",
    "how do i pay",
    "payment link",
    "pay via",
    "transaction",
    "payment transfer",
    "bank transfer",
    "neft",
    "imps",
    "rtgs",
    "account transfer",
    "do you accept",
    "accepted modes",
    "what do you accept",
    "payment details",
    "how much to pay",
    "payment information",
    "paise kaise",
    "payment kaise",
  ],

  WHATSAPP: [
    "whatsapp",
    "wa",
    "watsapp",
    "wapp",
    "whats app",
    "whatsapp number",
    "whatsapp contact",
    "wa number",
    "order on whatsapp",
    "message on whatsapp",
    "send on whatsapp",
    "chat on whatsapp",
    "reach on whatsapp",
    "your number",
    "your whatsapp",
    "wp number",
    "contact number",
    "contact whatsapp",
    "whatsapp link",
    "wa link",
    "whatsapp me",
    "message me",
    "dm",
    "direct message",
    "message us",
    "text us",
    "text you",
    "send message",
    "send a message",
    "whatsapp chat",
    "chat with you",
    "chat with us",
    "talk on whatsapp",
    "call on whatsapp",
    "whatsapp call",
    "voice call",
    "video call",
    "your mobile",
    "your phone number",
    "phone no",
    "mobile number",
    "mob no",
  ],

  CONTACT: [
    "contact",
    "contact us",
    "reach you",
    "reach us",
    "how to reach",
    "how to contact",
    "email",
    "email address",
    "mail",
    "your email",
    "your contact",
    "contact details",
    "reach out",
    "get in touch",
    "connect",
    "customer care",
    "customer service",
    "support",
    "help desk",
    "helpline",
    "service center",
    "how to get support",
    "i need help",
    "assistance",
    "contact info",
    "contact information",
    "how to find you",
    "find you",
    "talk to someone",
    "speak to someone",
    "person to talk",
    "human agent",
    "real person",
    "not a bot",
    "speak to human",
    "talk to human",
    "your address",
    "where are you",
    "office address",
    "shop address",
  ],

  RETURNS: [
    "return",
    "returns",
    "refund",
    "refunds",
    "exchange",
    "exchanges",
    "replace",
    "replacement",
    "damaged",
    "damage",
    "defective",
    "defect",
    "broken",
    "wrong item",
    "wrong order",
    "incorrect item",
    "incorrect order",
    "return policy",
    "refund policy",
    "exchange policy",
    "replacement policy",
    "can i return",
    "what if damaged",
    "if i do not like",
    "change my mind",
    "cancel",
    "cancellation",
    "can i cancel",
    "money back",
    "guarantee",
    "warranty",
    "dispute",
    "complaint",
    "complain",
    "issue with order",
    "problem with order",
    "not satisfied",
    "unhappy",
    "dissatisfied",
    "wrong product",
    "bad product",
    "damaged product",
    "quality issue",
    "not as expected",
    "not as described",
    "item not received",
    "missing item",
    "lost package",
    "lost parcel",
    "never arrived",
    "not delivered",
  ],

  PACKAGING: [
    "packaging",
    "package",
    "packed",
    "packing",
    "gift wrap",
    "gift wrapping",
    "gift packed",
    "gift box",
    "present wrapping",
    "presentation",
    "unboxing",
    "how is it packed",
    "will it be safe",
    "safely packed",
    "secure packaging",
    "gift packaging",
    "is it gift wrapped",
    "can you gift wrap",
    "boxing",
    "box",
    "wrap",
    "wrapped",
    "bubble wrap",
    "protective packaging",
    "safe packing",
    "nice packaging",
    "pretty packaging",
    "attractive packing",
    "packaging material",
    "how well packed",
    "packing quality",
    "note in package",
    "personal note",
    "gift note",
    "message in box",
    "custom message",
    "add a note",
    "include a note",
    "gift ready",
    "ready to gift",
  ],

  CARE: [
    "care",
    "care instructions",
    "how to wash",
    "how to clean",
    "washing",
    "cleaning",
    "washing instructions",
    "cleaning instructions",
    "drying",
    "dry",
    "maintain",
    "maintenance",
    "hand wash",
    "machine wash",
    "how to care",
    "how to handle",
    "take care of",
    "care guide",
    "product care",
    "delicate wash",
    "gentle wash",
    "gentle clean",
    "wool wash",
    "yarn care",
    "crochet care",
    "preserve",
    "preservation",
    "store",
    "storage",
    "how to store",
    "storing",
    "shelf life",
    "how long does it last",
    "durability",
    "durable",
    "long lasting",
    "will it fade",
    "colour fade",
    "color fade",
    "will it shrink",
    "shrink",
    "can i wash it",
    "safe to wash",
    "washable",
    "is it washable",
  ],

  MATERIALS: [
    "material",
    "materials",
    "yarn",
    "thread",
    "fabric",
    "what is it made of",
    "made of",
    "made from",
    "what material",
    "what yarn",
    "quality",
    "cotton",
    "wool",
    "acrylic",
    "crochet yarn",
    "fiber",
    "fibre",
    "is it soft",
    "is it safe",
    "baby safe",
    "child safe",
    "hypoallergenic",
    "non toxic",
    "safe for kids",
    "safe for babies",
    "safe for children",
    "allergy",
    "allergic",
    "pet safe",
    "skin safe",
    "skin friendly",
    "composition",
    "texture",
    "soft",
    "fluffy material",
    "handmade material",
    "what is used",
    "what are they made with",
    "what goes into",
    "stuffing",
    "filling",
    "fill material",
    "polyester fill",
    "natural material",
    "synthetic",
    "eco friendly",
    "sustainable",
    "premium quality",
    "high quality",
    "good quality",
    "quality material",
  ],

  SIZE: [
    "size",
    "sizes",
    "dimension",
    "dimensions",
    "how big",
    "how small",
    "how large",
    "how long",
    "how tall",
    "measurement",
    "measurements",
    "cm",
    "inch",
    "inches",
    "mm",
    "millimeter",
    "centimeter",
    "height",
    "width",
    "length",
    "depth",
    "scale",
    "actual size",
    "fits",
    "size chart",
    "what size",
    "which size",
    "big",
    "small",
    "medium",
    "large",
    "extra large",
    "tiny",
    "miniature",
    "mini",
    "compact",
    "how many cm",
    "how many inches",
    "measurements for",
    "size for",
    "how thick",
    "thickness",
    "weight",
    "how heavy",
    "grams",
    "light",
    "heavy",
  ],

  GIFTS: [
    "gift",
    "gifts",
    "present",
    "presents",
    "gifting",
    "what to gift",
    "birthday gift",
    "birthday present",
    "anniversary gift",
    "anniversary present",
    "valentine gift",
    "valentines",
    "valentines day",
    "christmas gift",
    "christmas present",
    "diwali gift",
    "diwali present",
    "holi gift",
    "eid gift",
    "new year gift",
    "new year present",
    "festive gift",
    "rakhi gift",
    "raksha bandhan",
    "mothers day gift",
    "mother day gift",
    "fathers day gift",
    "father day gift",
    "teachers day gift",
    "friendship day gift",
    "special occasion",
    "for her",
    "for him",
    "for kids",
    "for baby",
    "for friend",
    "for boyfriend",
    "for girlfriend",
    "for mom",
    "for mum",
    "for dad",
    "for sister",
    "for brother",
    "for sister in law",
    "for someone special",
    "best gift",
    "good gift",
    "recommend gift",
    "gift suggestion",
    "surprise gift",
    "gift ideas",
    "gift idea",
    "gifting option",
    "gift for",
    "what should i gift",
    "what can i gift",
    "unique gift",
    "thoughtful gift",
    "handmade gift",
    "crochet gift",
    "gift under 200",
    "gift under 500",
    "budget gift",
    "affordable gift",
    "housewarming gift",
    "baby shower gift",
    "wedding gift",
    "graduation gift",
    "farewell gift",
    "get well gift",
    "congratulations gift",
  ],

  RECOMMEND: [
    "recommend",
    "recommendation",
    "suggest",
    "suggestion",
    "what should i buy",
    "what should i get",
    "which is best",
    "which is good",
    "what is popular",
    "what is trending",
    "top pick",
    "top picks",
    "what do people buy",
    "most bought",
    "most ordered",
    "worth buying",
    "worth it",
    "value for money",
    "what to buy",
    "help me choose",
    "not sure what to get",
    "undecided",
    "help me decide",
    "assist me choose",
    "guide me",
    "need guidance",
    "which one should i",
    "which is better",
    "any suggestions",
    "any recommendations",
    "what would you suggest",
    "what do you recommend",
    "what is your pick",
    "what are your favourites",
    "what is a good choice",
    "what is a safe choice",
    "safe option",
    "popular option",
    "best option",
    "best choice",
    "good choice",
  ],

  BULK: [
    "bulk",
    "bulk order",
    "wholesale",
    "large quantity",
    "large order",
    "multiple",
    "many pieces",
    "lots of",
    "lot of",
    "event",
    "wedding",
    "party",
    "corporate",
    "gifting event",
    "birthday party",
    "bulk discount",
    "group order",
    "multiple orders",
    "big order",
    "want 10",
    "want 20",
    "want 50",
    "want 100",
    "order 10",
    "order 20",
    "order 50",
    "10 pieces",
    "20 pieces",
    "50 pieces",
    "wholesale price",
    "resell",
    "reselling",
    "bulk pricing",
    "quantity discount",
    "volume discount",
    "corporate order",
    "office order",
    "team order",
    "business order",
    "institutional order",
    "school order",
    "college order",
    "giveaway",
    "goody bag",
    "favour bag",
    "return gift",
    "return gifts",
    "party favour",
    "party favors",
  ],

  DISCOUNT: [
    "discount",
    "discounts",
    "offer",
    "offers",
    "coupon",
    "coupons",
    "sale",
    "sales",
    "promo",
    "promo code",
    "promotion",
    "promotional",
    "deal",
    "deals",
    "code",
    "voucher",
    "vouchers",
    "cashback",
    "rebate",
    "any offer",
    "any discount",
    "special offer",
    "seasonal offer",
    "festive offer",
    "festive discount",
    "diwali offer",
    "christmas sale",
    "summer sale",
    "winter sale",
    "flash sale",
    "clearance",
    "reduced price",
    "cheaper",
    "reduced",
    "marked down",
    "price cut",
    "off",
    "percent off",
    "50 percent off",
    "half price",
    "buy one get one",
    "bogo",
    "free gift",
    "loyalty discount",
    "first order discount",
    "new customer",
    "returning customer",
    "referral",
    "referral code",
    "affiliate",
    "membership discount",
  ],

  AVAILABILITY: [
    "available",
    "availability",
    "in stock",
    "out of stock",
    "stock",
    "when back",
    "when available",
    "when restocked",
    "restocked",
    "restock",
    "not available",
    "sold out",
    "do you have",
    "can i get",
    "is it available",
    "do you have it",
    "still available",
    "currently available",
    "stock status",
    "how many left",
    "limited stock",
    "last few",
    "last piece",
    "only one left",
    "when will it come back",
    "how soon available",
    "pre order",
    "waitlist",
    "notify me",
    "back in stock notification",
    "reservation",
    "reserve",
    "hold for me",
    "can you hold",
    "set aside",
    "put on hold",
  ],

  GALLERY: [
    "picture",
    "pictures",
    "photo",
    "photos",
    "image",
    "images",
    "gallery",
    "product gallery",
    "image gallery",
    "photo gallery",
    "can i see",
    "let me see",
    "show me",
    "see pictures",
    "view pictures",
    "what does it look like",
    "how does it look",
    "see it",
    "view it",
    "see the product",
    "view the product",
    "product photo",
    "product image",
    "canva",
    "canva link",
    "canva gallery",
    "product photos",
    "can i view",
    "where to see",
    "where can i see",
    "see all photos",
    "browse photos",
    "look at",
    "visual",
    "visuals",
    "looks",
    "appearance",
    "what does it look",
    "how does the product look",
    "see the design",
    "see the colour",
    "see the color",
    "see the pattern",
    "preview",
  ],

  TRACKING: [
    "track",
    "tracking",
    "order status",
    "where is my order",
    "where is my parcel",
    "where is my package",
    "when will i get",
    "dispatched",
    "shipped",
    "out for delivery",
    "track my order",
    "parcel status",
    "delivery update",
    "order update",
    "when does it come",
    "track package",
    "shipment status",
    "shipment tracking",
    "courier tracking",
    "tracking number",
    "tracking id",
    "track id",
    "tracking link",
    "where did my order go",
    "how to track",
    "how can i track",
    "order reached",
    "parcel reached",
    "delivery reached",
    "has it been sent",
    "has it shipped",
    "when shipped",
    "dispatch update",
    "delivery status",
    "order movement",
    "package location",
  ],

  HOW_IT_WORKS: [
    "how does it work",
    "how do you work",
    "explain",
    "tell me how",
    "steps",
    "process",
    "walk me through",
    "how does ordering work",
    "how does the shop work",
    "how does buying work",
    "how does shopping work",
    "how are they made",
    "handmade process",
    "making process",
    "how do you make",
    "what is the process",
    "what is the procedure",
    "step by step",
    "procedure",
    "workflow",
    "sequence",
    "method",
    "approach",
  ],

  CUSTOM: [
    "custom",
    "customise",
    "customize",
    "customization",
    "customisation",
    "personalise",
    "personalize",
    "personalization",
    "personalisation",
    "personalised",
    "personalized",
    "bespoke",
    "special order",
    "made to order",
    "specific color",
    "specific colour",
    "my color",
    "my colour",
    "my design",
    "own design",
    "can you make",
    "make for me",
    "special request",
    "tailored",
    "tailor made",
    "name on it",
    "name keychain",
    "initials",
    "initial letter",
    "letter keychain",
    "alphabet keychain",
    "personalised gift",
    "can i choose",
    "my own design",
    "custom request",
    "custom colour",
    "custom color",
    "custom size",
    "custom plushie",
    "custom keychain",
    "custom hat",
    "custom design",
    "custom made",
    "unique design",
    "one of a kind",
    "exclusive",
    "unique piece",
    "handmade to order",
    "made especially",
    "made specially",
    "special colour",
  ],

  PRICING_GENERAL: [
    "price",
    "prices",
    "pricing",
    "cost",
    "costs",
    "rate",
    "rates",
    "fee",
    "fees",
    "how much",
    "how much does",
    "how much is",
    "how much for",
    "rupee",
    "rupees",
    "rs",
    "inr",
    "paisa",
    "money",
    "amount",
    "tariff",
    "quote",
    "estimate",
    "worth",
    "value",
    "affordable",
    "expensive",
    "price list",
    "price range",
    "all prices",
    "show prices",
    "price chart",
    "price table",
    "price sheet",
    "cost list",
    "rate card",
    "rate list",
    "how much does each",
    "what does it cost",
    "what is the price",
    "what is the cost",
    "what is the rate",
    "total cost",
    "price for",
    "cost for",
    "rate for",
    "charge for",
    "charges",
    "pricing info",
  ],

  PRICE_CHEAP: [
    "cheapest",
    "most affordable",
    "lowest price",
    "lowest cost",
    "budget friendly",
    "pocket friendly",
    "inexpensive",
    "minimum price",
    "bargain",
    "cheap",
    "least expensive",
    "economy",
    "economical",
    "low budget",
    "tight budget",
    "small budget",
    "under 100",
    "under 150",
    "under 200",
    "under 300",
    "not expensive",
    "not costly",
    "reasonable",
    "reasonably priced",
    "entry level",
    "starter",
    "basic",
    "simple",
    "modest",
    "frugal",
    "save money",
    "value pick",
    "value option",
    "best value",
    "cheap option",
    "affordable option",
    "affordable range",
    "budget range",
    "budget options",
    "budget items",
    "cheap items",
    "low price items",
    "items on a budget",
  ],

  PRICE_EXPENSIVE: [
    "expensive",
    "priciest",
    "most expensive",
    "premium",
    "highest price",
    "most costly",
    "top priced",
    "luxury",
    "high end",
    "upscale",
    "exclusive",
    "splurge",
    "treat yourself",
    "worth splurging",
    "special",
    "finest",
    "best quality",
    "top quality",
    "premium quality",
    "deluxe",
    "elite",
    "costly",
    "high price",
    "high cost",
    "most valuable",
    "prized",
    "prestige",
  ],

  SOCIAL_MEDIA: [
    "instagram",
    "facebook",
    "twitter",
    "tiktok",
    "youtube",
    "social media",
    "social",
    "follow",
    "follow you",
    "your page",
    "your profile",
    "your account",
    "on instagram",
    "on facebook",
    "on twitter",
    "on tiktok",
    "on youtube",
    "your instagram",
    "your facebook",
    "ig",
    "fb",
    "insta",
    "snap",
    "snapchat",
    "pinterest",
    "linkedin",
    "threads",
    "social presence",
    "online presence",
  ],

  ADMIN: [
    "admin",
    "login",
    "password",
    "admin page",
    "manage",
    "edit products",
    "backend",
    "dashboard",
    "admin panel",
    "admin access",
    "staff login",
    "how to manage",
    "manage store",
    "update products",
    "add products",
    "change price",
    "update price",
    "edit price",
    "admin credentials",
  ],

  URGENCY: [
    "urgent",
    "urgently",
    "asap",
    "as soon as possible",
    "fast",
    "quick",
    "rush order",
    "need today",
    "need tomorrow",
    "same day",
    "express order",
    "need it soon",
    "need it fast",
    "need it quickly",
    "right away",
    "immediately",
    "instant",
    "emergency",
    "hurry",
    "hurry up",
    "can you make it faster",
    "faster delivery",
    "priority",
    "priority order",
    "special rush",
    "time sensitive",
    "deadline",
    "by this weekend",
    "by tomorrow",
    "by today",
    "within 2 days",
    "within 3 days",
  ],

  COMPLAINT: [
    "issue",
    "problem",
    "bad",
    "terrible",
    "not good",
    "awful",
    "horrible",
    "not happy",
    "unhappy",
    "dissatisfied",
    "angry",
    "frustrated",
    "disappointed",
    "complain",
    "complaint",
    "escalate",
    "not satisfied",
    "very bad",
    "very unhappy",
    "so bad",
    "worst",
    "pathetic",
    "useless",
    "failure",
    "failed",
    "did not work",
    "broken product",
    "bad quality",
    "poor quality",
    "not as expected",
    "misleading",
    "false advertising",
    "cheat",
    "scam",
    "fraud",
    "fake",
    "not original",
    "not genuine",
    "report",
    "reporting",
  ],

  COMPLIMENT: [
    "love it",
    "love this",
    "love the",
    "love your",
    "amazing",
    "beautiful",
    "gorgeous",
    "cute",
    "adorable",
    "excellent",
    "wonderful",
    "great",
    "brilliant",
    "perfect",
    "fabulous",
    "superb",
    "outstanding",
    "exceptional",
    "lovely",
    "so nice",
    "very nice",
    "really nice",
    "so pretty",
    "very pretty",
    "impressed",
    "impressive",
    "fantastic",
    "terrific",
    "awesome",
    "wow",
    "oh wow",
    "oh my",
    "stunning",
    "mind blowing",
    "top notch",
    "5 stars",
    "five stars",
    "10 out of 10",
    "100 out of 100",
    "highly recommend",
    "will recommend",
    "must buy",
    "must get",
    "please make more",
    "keep it up",
    "well done",
    "bravo",
    "kudos",
    "hats off",
    "great work",
    "nice work",
  ],

  COMPARISON: [
    "compare",
    "comparison",
    "vs",
    "versus",
    "difference",
    "differences",
    "better",
    "which one",
    "which is best",
    "similar",
    "between",
    "choose between",
    "should i get",
    "should i buy",
    "which is better",
    "what is the difference",
    "how are they different",
    "differentiate",
    "distinguish",
    "which would you suggest",
    "which would you recommend",
    "more popular",
    "which sells more",
    "contrast",
    "pros and cons",
  ],

  HELP: [
    "help",
    "what can you do",
    "what can you help with",
    "what do you know",
    "your capabilities",
    "what questions",
    "what can i ask",
    "how can you help",
    "what do you answer",
    "what topics",
    "what areas",
    "capabilities",
    "features",
    "what are you able to",
    "what do you cover",
    "menu",
    "options",
    "assistant help",
    "bot help",
    "chatbot help",
    "what is this chat",
    "what does this chat do",
    "chat capabilities",
    "what can i ask you",
    "guide me",
    "help guide",
    "user guide",
    "faq",
    "frequently asked",
    "common questions",
    "quick questions",
    "questions and answers",
  ],

  ORDER_CONFIRM: [
    "my order confirmed",
    "order confirmed",
    "order placed",
    "i ordered",
    "i sent whatsapp",
    "i messaged on whatsapp",
    "i filled the form",
    "i submitted the form",
    "order submitted",
    "i placed my order",
    "i have ordered",
    "already ordered",
    "just ordered",
    "done ordering",
    "order done",
    "payment done",
    "paid already",
    "already paid",
    "i paid",
    "i have paid",
    "payment sent",
    "upi sent",
    "gpay sent",
    "transfer done",
    "transaction done",
    "what happens next",
    "next steps after",
    "after ordering what",
    "order next",
    "after payment",
    "confirmation received",
  ],

  FESTIVAL: [
    "diwali",
    "christmas",
    "new year",
    "holi",
    "eid",
    "valentine",
    "valentines",
    "rakhi",
    "raksha bandhan",
    "mothers day",
    "fathers day",
    "teachers day",
    "friendship day",
    "navratri",
    "pongal",
    "onam",
    "ugadi",
    "baisakhi",
    "durga puja",
    "ganesh chaturthi",
    "janmashtami",
    "independence day",
    "republic day",
    "festive season",
    "holiday season",
    "festive collection",
    "holiday collection",
    "seasonal",
    "seasonal offer",
    "festival gift",
    "festive gift",
    "holiday gift",
    "celebration",
    "occasion",
    "special day",
  ],
};

// ─── Intent scoring engine ─────────────────────────────────────────────────
function scoreIntents(q: string): Record<string, number> {
  const scores: Record<string, number> = {};
  const qWords = q.split(" ").filter((w) => w.length > 0);

  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (kw.includes(" ")) {
        // multi-word: check substring
        if (q.includes(kw)) score += 2;
      } else {
        // single word: check word boundary via includes on tokenized array
        if (qWords.includes(kw)) score += 1;
        else if (q.includes(kw)) score += 0.5; // partial substring match
      }
    }
    scores[intent] = score;
  }
  return scores;
}

function topIntent(scores: Record<string, number>): string | null {
  let best: string | null = null;
  let bestScore = 0.8; // minimum threshold
  for (const [intent, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return best;
}

// ─── Category detector ─────────────────────────────────────────────────────
function detectCategory(q: string): string | null {
  const catScores: Record<string, number> = {};
  const catIntents: Record<string, string> = {
    PLUSHIES: "Plushies",
    KEYCHAINS: "Keychains",
    WEARABLES: "Wearables",
    HOME_DECOR: "Home Decor",
    ACCESSORIES: "Accessories",
  };
  const all = scoreIntents(q);
  let best: string | null = null;
  let bestScore = 0.5;
  for (const [intentKey, catName] of Object.entries(catIntents)) {
    const s = all[intentKey] ?? 0;
    catScores[catName] = s;
    if (s > bestScore) {
      bestScore = s;
      best = catName;
    }
  }
  return best;
}

// ─── Intent Engine / getResponse ──────────────────────────────────────────
function getResponse(raw: string, ctx: ConversationContext): ResponseResult {
  const expanded = expand(raw);
  const q = norm(expanded);
  const newCtx: Partial<ConversationContext> = {};

  // Score all intents
  const scores = scoreIntents(q);
  const intent = topIntent(scores);

  // ── Price range: between X and Y ─────────────────────────────────────────
  const between = extractBetween(q);
  if (between) {
    const catFromQ = detectCategory(q);
    const resolvedCat = catFromQ ?? ctx.lastCategory;
    const pool = resolvedCat
      ? (categoryProducts(resolvedCat)?.items ?? allProducts())
      : allProducts();
    const filtered = pool.filter(
      (p) => p.price >= between[0] && p.price <= between[1],
    );
    newCtx.lastIntent = "price_filter";
    if (filtered.length === 0)
      return {
        text: `Hmm, nothing between ₹${between[0]} and ₹${between[1]}${resolvedCat ? ` in ${resolvedCat}` : ""}. Try widening your range! Our prices go from ₹79 to ₹499 🏷️`,
        newCtx,
      };
    return {
      text: `Items between ₹${between[0]} and ₹${between[1]}${resolvedCat ? ` in ${resolvedCat}` : ""} 🏷️\n\n${fmt(filtered)}`,
      newCtx,
    };
  }

  // ── Price range: under / below ───────────────────────────────────────────
  const underLimit = extractUnder(q);
  if (underLimit !== null) {
    const catFromQ = detectCategory(q);
    const resolvedCat = catFromQ ?? ctx.lastCategory;
    const pool = resolvedCat
      ? (categoryProducts(resolvedCat)?.items ?? allProducts())
      : allProducts();
    const filtered = pool.filter((p) => p.price < underLimit);
    newCtx.lastIntent = "price_filter";
    if (filtered.length === 0)
      return {
        text: `Nothing under ₹${underLimit}${resolvedCat ? ` in ${resolvedCat}` : ""}. Our most affordable item is Bookmarks at ₹79! 🎀`,
        newCtx,
      };
    return {
      text: `Items under ₹${underLimit}${resolvedCat ? ` in ${resolvedCat}` : ""} 🏷️\n\n${fmt(filtered)}`,
      newCtx,
    };
  }

  // ── Price range: above / over ────────────────────────────────────────────
  const aboveLimit = extractAbove(q);
  if (aboveLimit !== null) {
    const catFromQ = detectCategory(q);
    const resolvedCat = catFromQ ?? ctx.lastCategory;
    const pool = resolvedCat
      ? (categoryProducts(resolvedCat)?.items ?? allProducts())
      : allProducts();
    const filtered = pool.filter((p) => p.price > aboveLimit);
    newCtx.lastIntent = "price_filter";
    return {
      text:
        filtered.length > 0
          ? `Items above ₹${aboveLimit}${resolvedCat ? ` in ${resolvedCat}` : ""} 🏷️\n\n${fmt(filtered.slice(0, 12))}`
          : `Nothing above ₹${aboveLimit}${resolvedCat ? ` in ${resolvedCat}` : ""} — our priciest item is the Wall Hanging at ₹499. 🏡`,
      newCtx,
    };
  }

  // ── Specific product lookup ───────────────────────────────────────────────
  const productPhraseMatch =
    q.match(
      /how much (?:is|does|for|costs?) (?:the )?([\w][\w\s()]*?)\s*\??$/,
    ) ??
    q.match(
      /(?:price|cost|rate) (?:of|for) (?:the )?([\w][\w\s()]*?)\s*\??$/,
    ) ??
    q.match(
      /(?:tell me about|info (?:on|about)|what(?:'s| is) the?) (?:the )?([\w][\w\s()]*?)\s*\??$/,
    ) ??
    q.match(
      /(?:is|how much is) (?:the )?([\w][\w\s()]*?) (?:available|in stock)/,
    ) ??
    null;

  if (productPhraseMatch) {
    const guess = productPhraseMatch[1].trim();
    const matches = findProductsByQuery(guess);
    if (matches.length === 1) {
      const found = matches[0];
      newCtx.lastProduct = found.name;
      newCtx.lastCategory = getCategory(found.name);
      return {
        text: `**${found.name}** — ₹${found.price}${found.highlight ? " ✨ (Fan Favourite)" : ""}${found.custom ? " (Customisable)" : ""}\n\nYou can view its picture in our gallery, then place your order via WhatsApp! 🛍️`,
        link: { label: "View in Gallery", url: KB.imageGallery },
        newCtx,
      };
    }
    if (matches.length > 1) {
      newCtx.lastIntent = "ambiguous_product";
      return {
        text: `I found a few items matching "${guess}" 🧶\n\n${fmt(matches)}\n\nWhich one would you like to know more about?`,
        newCtx,
      };
    }
  }

  // ── Direct product name mention ───────────────────────────────────────────
  const directMatches = findProductsByQuery(q);
  if (directMatches.length === 1) {
    const found = directMatches[0];
    newCtx.lastProduct = found.name;
    newCtx.lastCategory = getCategory(found.name);
    return {
      text: pick([
        `${found.name} is one of our most-loved pieces! 🧶\n\nPrice: ₹${found.price}${found.highlight ? " ✨ (Fan Favourite)" : ""}${found.custom ? " — fully customisable with your initial! ✏️" : ""}\n\nSee pictures in our gallery or place your order via WhatsApp! 💕`,
        `Great choice! ${found.name} — ₹${found.price}${found.highlight ? " ✨" : ""}${found.custom ? " (Custom available)" : ""}\n\nHandcrafted with love, ships in 5–7 business days. View it in our gallery! 🛍️`,
        `${found.name} is ₹${found.price}${found.highlight ? " ✨ (Fan Favourite — sells out fast!" : ""}${found.custom ? " — personalise it with your initial!" : ""}\n\nMessage us on WhatsApp to place an order! 💬`,
      ]),
      link: { label: "View in Gallery", url: KB.imageGallery },
      newCtx,
    };
  }
  if (directMatches.length > 1) {
    return {
      text: `I found a few matching items 🧶\n\n${fmt(directMatches)}\n\nWhich one would you like to know more about?`,
      newCtx,
    };
  }

  // ── Context follow-up: "that one" / "same" ───────────────────────────────
  if (
    ctx.lastCategory &&
    /\b(that one|this one|the other|another one|similar|same category|those)\b/.test(
      q,
    )
  ) {
    const cat = categoryProducts(ctx.lastCategory);
    if (cat)
      return {
        text: `Here are all ${cat.key} again 🧶\n\n${fmt(cat.items)}`,
        newCtx,
      };
  }

  // ── Follow-ups: "tell me more", "what else", etc. ─────────────────────────
  if (
    /\b(tell me more|what else|more info|more details|anything else|elaborate|explain more|go on|continue|and then|more about|keep going)\b/.test(
      q,
    )
  ) {
    if (ctx.lastProduct) {
      const p = allProducts().find((x) => x.name === ctx.lastProduct);
      if (p)
        return {
          text: `More about ${p.name} 🧶\n\nPrice: ₹${p.price}${p.highlight ? " ✨ Fan Favourite" : ""}\nCategory: ${getCategory(p.name) ?? ""}\n${(p as { custom?: boolean }).custom ? "• Fully customisable with your initial or name\n" : ""}• Handcrafted with premium yarn\n• Made to order\n• Ships in ${KB.delivery.days}\n\nView pictures in our gallery or order via WhatsApp! 💕`,
          link: { label: "View in Gallery", url: KB.imageGallery },
          newCtx,
        };
    }
    if (ctx.lastCategory) {
      const cat = categoryProducts(ctx.lastCategory);
      if (cat)
        return {
          text: `Here are all ${cat.key} with prices 🧶\n\n${fmt(cat.items)}\n\nAsk about any specific item for more details!`,
          newCtx,
        };
    }
  }

  // ── Affirmations ─────────────────────────────────────────────────────────
  if (
    /^(ok|okay|sure|got it|alright|noted|understood|nice|great|cool|awesome|perfect|sounds good|yep|yup|yes|k|sounds good|right|ok cool|ok great|ok sure)\s*\.?\!?$/.test(
      q,
    )
  )
    return {
      text: pick([
        "Great! 😊 Is there anything else I can help you with? Feel free to ask about products, pricing, custom orders, delivery, or gift ideas! 🧶",
        "Wonderful! 🌸 Anything else you'd like to know about The Cozy Hook?",
        "Perfect! 💕 What else can I help you with today?",
      ]),
      newCtx,
    };

  // ── Negative / no ────────────────────────────────────────────────────────
  if (
    /^(no|nope|nah|not really|nothing|i am good|all good|that is all|that will be all|no thanks|no thank you)\s*\.?\!?$/.test(
      q,
    )
  )
    return {
      text: pick([
        "No worries! 🌸 Feel free to come back anytime. Happy shopping at The Cozy Hook! 💕",
        "All good! 😊 Come back whenever you need anything. The Cozy Hook is always here! 🧶",
        "Sure thing! 🌷 See you around — and enjoy your Cozy Hook pieces! ✨",
      ]),
      newCtx,
    };

  // ── Intent-based routing ──────────────────────────────────────────────────
  if (intent === "GREETING")
    return {
      text: pick([
        "Hi there! 👋 Welcome to The Cozy Hook — your favourite handmade crochet boutique. 🧶\n\nI can help you with products, prices, delivery, custom orders, and more. What would you like to know?",
        "Hello! 🌸 I'm the Cozy Hook Assistant! Ask me anything about our 34 handmade crochet pieces — from plushies to keychains to home decor! 💕",
        "Hey there! ✨ Welcome to The Cozy Hook! 🧶 How can I help you today? Ask me about products, pricing, gifting, delivery, or anything else!",
      ]),
      newCtx: { lastIntent: "greeting" },
    };

  if (intent === "FAREWELL")
    return {
      text: pick([
        "Goodbye! 🌸 Thank you for visiting The Cozy Hook. Come back anytime — we'd love to see you again! 💕",
        "See you soon! ✨ Hope to craft something special for you next time! 🧶",
        "Take care! 💕 The Cozy Hook will be right here whenever you need us. Bye for now! 🌷",
      ]),
      newCtx: { lastIntent: "farewell" },
    };

  if (intent === "THANKS")
    return {
      text: pick([
        "You're so welcome! 🥰 It's our pleasure. Is there anything else I can help you with?",
        "Happy to help! 💕 That's what I'm here for! Any other questions?",
        "Anytime! 🌸 Don't hesitate to ask if you need anything else. 😊",
      ]),
      newCtx: { lastIntent: "thanks" },
    };

  if (intent === "ABOUT")
    return {
      text: pick([
        "The Cozy Hook is a handmade crochet boutique founded by Sanjana Prasad. 🧶\n\nEvery single piece is hand-crafted with love — from tiny keychains to cozy plushies and beautiful home decor. What started as a passion project has grown into a curated collection of 34 unique crochet creations.\n\nEach item is made to order, so you're getting something truly special! 💕",
        "We're a small, passionate crochet brand run by Sanjana Prasad! 🌸\n\nEvery piece you see is hand-stitched with care and high-quality yarn. Our 34 products span Plushies, Keychains, Wearables, Home Decor, and Accessories — all handmade with love and shipped across India! 🇮🇳",
      ]),
      newCtx: { lastIntent: "brand" },
    };

  if (intent === "ALL_PRODUCTS")
    return {
      text: "Here's our full collection at The Cozy Hook! 🧶\n\n🧸 Plushies (7 items) — from ₹249\n🔑 Keychains (11 items) — from ₹99\n👗 Wearables (5 items) — from ₹149\n🏡 Home Decor (5 items) — from ₹299\n🎀 Accessories (6 items) — from ₹79\n\nAsk me about any category for the full list and prices! ✨",
      newCtx: { lastIntent: "all_products" },
    };

  if (intent === "FAN_FAVES") {
    const faves = allProducts().filter((p) => p.highlight);
    return {
      text: pick([
        `Our fan favourites right now ✨\n\n${fmt(faves)}\n\nThese sell out the fastest — grab yours before they're gone! 💕`,
        `The most-loved pieces at The Cozy Hook 🌟\n\n${fmt(faves)}\n\nAll four are best-sellers and come beautifully packaged! 🎁`,
      ]),
      newCtx: { lastIntent: "favourites" },
    };
  }

  if (intent === "PLUSHIES") {
    const cat = categoryProducts("Plushies");
    if (cat) {
      newCtx.lastCategory = "Plushies";
      newCtx.lastIntent = "category_list";
      return {
        text: pick([
          `Here are our adorable Plushies! 🧸\n\n${fmt(cat.items)}\n\n✨ = Fan Favourite. Ask me about any specific plushie for more details!`,
          `Our Plushie collection 🧸\n\n${fmt(cat.items)}\n\nAll handcrafted with hypoallergenic fill — safe for all ages! 💕`,
        ]),
        newCtx,
      };
    }
  }

  if (intent === "KEYCHAINS") {
    const cat = categoryProducts("Keychains");
    if (cat) {
      newCtx.lastCategory = "Keychains";
      newCtx.lastIntent = "category_list";
      return {
        text: pick([
          `Here are our Keychains! 🔑\n\n${fmt(cat.items)}\n\n✨ = Fan Favourite. (Custom) = can be personalised with your initial!`,
          `Our Keychain collection 🔑\n\n${fmt(cat.items)}\n\nThe Initial Letter Keychain can be personalised with your name initial! ✏️`,
        ]),
        newCtx,
      };
    }
  }

  if (intent === "WEARABLES") {
    const cat = categoryProducts("Wearables");
    if (cat) {
      newCtx.lastCategory = "Wearables";
      newCtx.lastIntent = "category_list";
      return {
        text: pick([
          `Here are our Wearables! 👗\n\n${fmt(cat.items)}\n\n✨ = Fan Favourite. All made with soft, skin-friendly yarn!`,
          `Our Wearable collection 👗\n\n${fmt(cat.items)}\n\nAll crochet wearables are handmade with premium yarn and lots of love! 💕`,
        ]),
        newCtx,
      };
    }
  }

  if (intent === "HOME_DECOR") {
    const cat = categoryProducts("Home Decor");
    if (cat) {
      newCtx.lastCategory = "Home Decor";
      newCtx.lastIntent = "category_list";
      return {
        text: pick([
          `Here are our Home Decor pieces! 🏡\n\n${fmt(cat.items)}\n\n✨ = Fan Favourite. Perfect for gifting or decorating your space!`,
          `Our Home Decor collection 🏡\n\n${fmt(cat.items)}\n\nAll pieces add a cozy, handmade charm to any room! 🌸`,
        ]),
        newCtx,
      };
    }
  }

  if (intent === "ACCESSORIES") {
    const cat = categoryProducts("Accessories");
    if (cat) {
      newCtx.lastCategory = "Accessories";
      newCtx.lastIntent = "category_list";
      return {
        text: pick([
          `Here are our Accessories! 🎀\n\n${fmt(cat.items)}\n\nCute, affordable, and perfect as gifts or personal treats!`,
          `Our Accessories collection 🎀\n\n${fmt(cat.items)}\n\nFrom bookmarks to bag charms — all handcrafted with care! 💕`,
        ]),
        newCtx,
      };
    }
  }

  // Category detection fallback using score engine
  const catFromQ = detectCategory(q);
  const resolvedCat =
    catFromQ ??
    (ctx.lastCategory &&
    /\b(more|those|all of them|list|show|see|any|give me|cheapest|expensive|cheap|price|cost|how much|under|below|above|over|budget|affordable)\b/.test(
      q,
    )
      ? ctx.lastCategory
      : null);

  if (catFromQ) {
    const cat = categoryProducts(catFromQ);
    if (cat) {
      newCtx.lastCategory = cat.key;
      newCtx.lastIntent = "category_list";
      return {
        text: `Here are our ${cat.key}! 🧶\n\n${fmt(cat.items)}\n\n✨ = Fan Favourite. Ask me about any specific item for more details!`,
        newCtx,
      };
    }
  }

  if (intent === "PRICE_CHEAP") {
    const pool = resolvedCat
      ? (categoryProducts(resolvedCat)?.items ?? allProducts())
      : allProducts();
    const sorted = [...pool].sort((a, b) => a.price - b.price).slice(0, 5);
    newCtx.lastIntent = "cheapest";
    return {
      text: `Our most affordable${resolvedCat ? ` ${resolvedCat}` : ""} options 🏷️\n\n${fmt(sorted)}`,
      newCtx,
    };
  }

  if (intent === "PRICE_EXPENSIVE") {
    const pool = resolvedCat
      ? (categoryProducts(resolvedCat)?.items ?? allProducts())
      : allProducts();
    const sorted = [...pool].sort((a, b) => b.price - a.price).slice(0, 5);
    newCtx.lastIntent = "expensive";
    return {
      text: `Our premium picks${resolvedCat ? ` in ${resolvedCat}` : ""} ✨\n\n${fmt(sorted)}`,
      newCtx,
    };
  }

  if (intent === "HOW_IT_WORKS" || intent === "ORDERING")
    return {
      text: pick([
        "Ordering from The Cozy Hook is super easy! 🛍️\n\n1️⃣ Browse the collection and add items to your cart\n2️⃣ Fill in your name, address, and phone number on the cart page\n3️⃣ Tap 'Order Now' — WhatsApp opens with everything pre-filled\n4️⃣ We confirm your order and share payment details\n5️⃣ Your handmade piece is crafted and delivered in 5–7 days! 📦\n\nNo advance payment needed before confirmation! 💕",
        "Here's how to order from us 🛍️\n\n1. Pick your items from our Collection page\n2. Add to cart and fill in your details\n3. Click 'Order Now' to open WhatsApp with your order pre-filled\n4. We confirm and you pay via UPI/GPay\n5. Dispatched in 5–7 business days! 🚀\n\nSo simple and hassle-free! 💕",
      ]),
      newCtx: { lastIntent: "ordering" },
    };

  if (intent === "PAYMENT")
    return {
      text: pick([
        "We accept all major digital payment modes! 💳\n\n• UPI (GPay, PhonePe, Paytm)\n• Debit / Credit cards\n• Net banking\n• Bank transfer (NEFT/IMPS)\n\n⚠️ Note: COD (Cash on Delivery) is not available currently.\n\nPayment details are shared on WhatsApp after order confirmation! 🌸",
        "Payment at The Cozy Hook 💳\n\n✅ UPI — GPay, PhonePe, Paytm, BHIM\n✅ Debit/Credit cards\n✅ Net banking\n✅ Bank transfer\n❌ COD not available\n\nAll payments are made after order confirmation via WhatsApp! 💕",
      ]),
      newCtx: { lastIntent: "payment" },
    };

  if (intent === "WHATSAPP")
    return {
      text: pick([
        `You can reach us directly on WhatsApp! 💬\n\n📱 ${KB.contact.whatsappUrl}\n\nWe typically reply within a few hours. You can place orders, ask questions, or request custom pieces!`,
        "Our WhatsApp is always open! 💬\n\n📱 +91 86600 99085\n\nSend us a message to place an order, ask about products, or request something custom! 🌸",
      ]),
      link: { label: "Open WhatsApp", url: KB.contact.whatsappUrl },
      newCtx: { lastIntent: "whatsapp" },
    };

  if (intent === "CONTACT")
    return {
      text: pick([
        `You can reach The Cozy Hook here 🌸\n\n💬 WhatsApp: ${KB.contact.whatsappUrl}\n📧 Email: ${KB.contact.email}\n\nWe typically respond within a few hours!`,
        `Here's how to get in touch 🌸\n\n💬 WhatsApp: +91 86600 99085\n📧 Email: sanjanaprasad239@gmail.com\n\nWhatsApp is the fastest way to reach us! 💕`,
      ]),
      link: { label: "Message us on WhatsApp", url: KB.contact.whatsappUrl },
      newCtx: { lastIntent: "contact" },
    };

  if (intent === "DELIVERY")
    return {
      text: pick([
        `We deliver across India! 🇮🇳\n\n📦 Delivery charge: ₹${KB.delivery.charge}\n🎉 FREE delivery on orders above ₹${KB.delivery.freeAbove}\n⏱️ Standard delivery time: ${KB.delivery.days}\n\nYou'll receive tracking details on WhatsApp once dispatched!`,
        "Shipping info for The Cozy Hook 🚚\n\n• We ship pan-India! 🇮🇳\n• Delivery fee: ₹49\n• FREE above ₹999 🎉\n• Estimated time: 5–7 business days\n\nTracking details sent on WhatsApp after dispatch! 📦",
      ]),
      newCtx: { lastIntent: "delivery" },
    };

  if (intent === "DELIVERY_TIME")
    return {
      text: pick([
        `Standard delivery takes ${KB.delivery.days} after dispatch. 📦\n\nCustom orders (like Initial Letter Keychains or personalised pieces) may take 10–15 days as they're made to order.\n\nYou'll receive tracking details on WhatsApp once your order ships! 🌸`,
        "Delivery time at The Cozy Hook ⏱️\n\n• Standard items: 5–7 business days\n• Custom/personalised items: 10–15 days\n• Tracking sent via WhatsApp after dispatch!\n\nWe do our best to dispatch as quickly as possible! 💕",
      ]),
      newCtx: { lastIntent: "delivery_time" },
    };

  if (intent === "CUSTOM")
    return {
      text: pick([
        "We love making custom pieces! 🎨\n\nYou can request:\n• Custom colours on most items\n• Personalised keychains (your initial or name)\n• Special sizes or unique designs\n• Bulk orders for events & gifting\n• Custom plushies or specific colour combos\n\nFill in our Custom Orders form and we'll get back to you on WhatsApp! 💕",
        "Custom orders are our speciality! 🎨\n\n✏️ Personalised keychains with your initial\n🎨 Custom colour choices on most items\n🧸 Special designs on request\n🎉 Bulk custom orders for events\n\nJust fill the form below and we'll make it happen! 💕",
      ]),
      link: { label: "Fill Custom Order Form", url: KB.customOrdersUrl },
      newCtx: { lastIntent: "custom" },
    };

  if (intent === "RETURNS")
    return {
      text: pick([
        "We want you to love every piece! 💛\n\nOur policy:\n• Exchanges accepted within 7 days — item must be unused and in original packaging\n• Damaged or defective items — contact us immediately and we'll make it right\n• Custom items are non-returnable (as they're made specifically for you)\n• Order cancellations accepted before dispatch\n\nJust reach out on WhatsApp and we'll sort it out! 🌸",
        "Returns & refunds policy 🔄\n\n✅ Exchanges within 7 days (unused items)\n✅ Damaged/wrong items — we'll replace or refund\n❌ Custom/personalised items cannot be returned\n✅ Cancel anytime before dispatch\n\nContact us on WhatsApp with your order details! 💕",
      ]),
      newCtx: { lastIntent: "returns" },
    };

  if (intent === "PACKAGING")
    return {
      text: pick([
        "Every order is carefully packaged to keep your items safe during transit! 🎁\n\nMost orders come in gift-ready packaging too. If you'd like special gift wrapping or a personal note, just mention it in your order on WhatsApp and we'll take care of it 💕",
        "Packaging at The Cozy Hook 🎁\n\n• All items safely packed for transit\n• Gift-ready packaging available\n• Personal notes or gift messages can be added\n• Just mention it when placing your WhatsApp order!\n\nWe love making unboxing feel magical! ✨",
      ]),
      newCtx: { lastIntent: "packaging" },
    };

  if (intent === "CARE")
    return {
      text: pick([
        "Crochet care tips for your Cozy Hook pieces 🌊\n\n• Hand wash gently in cold water with mild soap\n• Lay flat to dry — never hang wet (it stretches the yarn)\n• Do not machine wash or tumble dry\n• Store in a cool, dry place away from direct sunlight\n\nWith proper care, your pieces will stay beautiful for years! 🧶",
        "How to care for your Cozy Hook items 🧶\n\n🚿 Gentle hand wash in cold water\n🧴 Use mild, gentle soap or wool wash\n📐 Lay flat to air dry\n❌ No machine wash / tumble dry\n🌙 Store in a cool, dry, dark place\n\nTreat them with love and they'll last forever! 💕",
      ]),
      newCtx: { lastIntent: "care" },
    };

  if (intent === "MATERIALS")
    return {
      text: pick([
        "All Cozy Hook pieces are handcrafted using high-quality yarn — mostly premium cotton and wool blends. 🧶\n\n• Plushies use hypoallergenic polyester fill (safe for all ages)\n• Wearables use soft, skin-friendly cotton or wool-blend yarn\n• Keychains & accessories use durable cotton thread\n• All materials are non-toxic and safe for kids & babies\n\nEvery piece is made with love and attention to detail! 💕",
        "Materials used at The Cozy Hook 🧶\n\n✅ Premium acrylic and cotton yarn\n✅ Hypoallergenic polyester fill (plushies)\n✅ Non-toxic — safe for babies and children\n✅ Skin-friendly for wearables\n✅ Durable thread for keychains & accessories\n\nAll materials are carefully selected for quality and safety! 💕",
      ]),
      newCtx: { lastIntent: "materials" },
    };

  if (intent === "SIZE")
    return {
      text: pick([
        "Sizes vary by product! Here are some examples 📏\n\n🧸 Plushies: ~17–22 cm tall\n🔑 Keychains: ~5–9 cm\n🧢 Bucket Hat: adjustable inner tie\n❤️ Heart Pillow: ~30 cm wide\n🪴 Hanging Plant: ~40 cm drop\n🖼️ Wall Hanging: ~30–40 cm wide\n\nNeed exact measurements for a specific item? Ask me by name or WhatsApp us!",
        "Approximate sizes at The Cozy Hook 📏\n\n• Plushies: 17–22 cm tall\n• Keychains: 5–9 cm\n• Hairband / Headband: adjustable\n• Heart Pillow: ~30 cm\n• Wall Hanging: 30–40 cm\n\nFor exact measurements, message us on WhatsApp! 💕",
      ]),
      newCtx: { lastIntent: "sizing" },
    };

  if (intent === "GIFTS")
    return {
      text: pick([
        "We make the most heartfelt gifts! 🎁 Popular choices:\n\n💝 For her: Strawberry Costumed Bunny (₹399), Bucket Hat (₹399), Heart Pillow (₹399)\n🎂 Birthday: Frog Plushie (₹249), Cherry Keychain (₹129), Mini Pouches (₹199)\n🏠 Housewarming: Wall Hanging (₹499), Coaster Set (₹299), Hanging Plant (₹349)\n👶 For kids/babies: Any Plushie (₹249–₹399)\n💑 Valentine: Heart Keychain (₹109), Heart Pillow (₹399)\n\nGift wrapping available — just ask! 💕",
        "The Cozy Hook makes perfect gifts! 🎁\n\n💫 Diwali / Festive: Wall Hanging (₹499), Coaster Set (₹299)\n🎂 Birthdays: Any Plushie (₹249–₹399)\n💝 Valentine's Day: Heart Keychain (₹109), Heart Pillow (₹399)\n👩‍👧 Moms: Hairband (₹149), Tulip Hair Accessory (₹129)\n🏠 Housewarming: Wall Hanging (₹499), Hanging Plant (₹349)\n\nAll items come gift-ready — add a personal note too! 💕",
      ]),
      newCtx: { lastIntent: "gifts" },
    };

  if (intent === "RECOMMEND") {
    const faves = allProducts().filter((p) => p.highlight);
    return {
      text: pick([
        `Here are our most recommended pieces 🌟\n\n${fmt(faves)}\n\nAll four are fan favourites and sell out quickly! If you tell me who you're buying for, I can suggest something more specific 💕`,
        `Not sure what to get? Here are our top picks! ⭐\n\n${fmt(faves)}\n\nShare who it's for and your budget and I'll personalise the suggestion! 🌸`,
      ]),
      newCtx: { lastIntent: "recommend" },
    };
  }

  if (intent === "BULK")
    return {
      text: pick([
        "We love fulfilling bulk orders for events, gifting, and special occasions! 🎉\n\nFor bulk orders (10+ pieces), please WhatsApp us directly so we can discuss quantities, timelines, and special pricing. Discounts available for larger quantities! 🛍️",
        "Bulk & wholesale orders welcome! 🎉\n\n• 10+ pieces — special pricing available\n• Corporate gifting, weddings, events, return gifts\n• Custom designs for large orders\n\nWhatsApp us with your requirements and we'll work something out! 💕",
      ]),
      link: { label: "Contact for Bulk Order", url: KB.contact.whatsappUrl },
      newCtx: { lastIntent: "bulk" },
    };

  if (intent === "DISCOUNT")
    return {
      text: pick([
        "We don't run discount codes currently, but you get FREE delivery on orders above ₹999! 🎉\n\nFor bulk orders or special events, custom pricing is available — just WhatsApp us to discuss. 💕\n\nWatch this space for seasonal offers!",
        "No coupon codes right now, but here's the deal 🎁\n\n🎉 FREE delivery above ₹999\n🎉 Bulk order discounts (10+ pieces)\n🎉 Seasonal offers announced on WhatsApp\n\nContact us to stay updated! 💕",
      ]),
      newCtx: { lastIntent: "discount" },
    };

  if (intent === "AVAILABILITY")
    return {
      text: pick([
        "Most items are made to order, so availability depends on current workload! 🧶\n\nFor the quickest updates, WhatsApp us directly — we'll let you know the status and can reserve your item too! 💕",
        "All our pieces are handmade to order! 🧶\n\nThis means most items are available but take time to craft. For urgent orders or specific availability, message us on WhatsApp and we'll confirm ASAP! 💕",
      ]),
      link: { label: "Check Stock on WhatsApp", url: KB.contact.whatsappUrl },
      newCtx: { lastIntent: "availability" },
    };

  if (intent === "GALLERY")
    return {
      text: pick([
        "You can browse all our product pictures in our image gallery! 📸\n\nScroll through to find your favourite pieces. Each product page on our website also has a 'View Picture' button linking directly to the gallery.",
        "Our product gallery is on Canva! 📸\n\nClick the link below to see photos of all 34 products — plushies, keychains, wearables, home decor, and accessories! 🌸",
      ]),
      link: { label: "Open Product Gallery", url: KB.imageGallery },
      newCtx: { lastIntent: "gallery" },
    };

  if (intent === "TRACKING")
    return {
      text: pick([
        "Order tracking details are shared on WhatsApp after your order is dispatched! 📦\n\nYou'll receive a tracking number via WhatsApp message. If you haven't received it yet or need an update, just message us directly!\n\n💬 wa.me/918660099085",
        "Tracking your order 📦\n\nOnce dispatched, your tracking number is sent via WhatsApp. For real-time updates, you can message us anytime!\n\nStandard delivery takes 5–7 business days after dispatch. 🚚",
      ]),
      link: { label: "Track via WhatsApp", url: KB.contact.whatsappUrl },
      newCtx: { lastIntent: "tracking" },
    };

  if (intent === "PRICING_GENERAL") {
    if (resolvedCat) {
      const cat = categoryProducts(resolvedCat);
      if (cat) {
        newCtx.lastCategory = cat.key;
        return {
          text: `Here are the ${cat.key} prices 🏷️\n\n${fmt(cat.items)}`,
          newCtx,
        };
      }
    }
    if (ctx.lastProduct) {
      const p = allProducts().find((x) => x.name === ctx.lastProduct);
      if (p)
        return {
          text: `${p.name} is priced at ₹${p.price}${p.highlight ? " ✨" : ""}. 🏷️`,
          newCtx,
        };
    }
    return {
      text: pick([
        "Our prices range from ₹79 to ₹499 🏷️\n\n• Accessories: ₹79–₹199\n• Keychains: ₹99–₹159\n• Wearables: ₹149–₹399\n• Home Decor: ₹299–₹499\n• Plushies: ₹249–₹399\n\nAsk me about any category or specific item for exact prices!",
        "Here's our price overview 🏷️\n\n🎀 Accessories: ₹79 – ₹199\n🔑 Keychains: ₹99 – ₹159\n👗 Wearables: ₹149 – ₹399\n🏡 Home Decor: ₹299 – ₹499\n🧸 Plushies: ₹249 – ₹399\n\nTell me a category and I'll list every price! 💕",
      ]),
      newCtx: { lastIntent: "pricing" },
    };
  }

  if (intent === "COMPARISON")
    return {
      text: pick([
        "I'd love to help you choose! 🤔\n\nTell me which two items you're deciding between and I'll share more details. Or describe who it's for (e.g. 'gift for my friend') and I'll suggest the best option! 💕",
        "Happy to help you decide! 😊\n\nShare the two items you're comparing and I'll break down the differences — price, size, who it's best for, and more! 🧶",
      ]),
      newCtx: { lastIntent: "comparison" },
    };

  if (intent === "SOCIAL_MEDIA")
    return {
      text: "We're not on social media yet, but we're working on it! 🌸\n\nFor now, the best way to stay connected is via WhatsApp or email. We'll let you know when we're active on Instagram! 💕",
      newCtx: { lastIntent: "social" },
    };

  if (intent === "ADMIN")
    return {
      text: "The admin panel is available at /admin on this website. 🔐\n\nOnly authorised users can access it. If you need help, please contact us via WhatsApp! 💕",
      newCtx: { lastIntent: "admin" },
    };

  if (intent === "URGENCY")
    return {
      text: pick([
        "We understand you need it fast! ⚡\n\nStandard delivery is 5–7 business days. For urgent or rush orders, please WhatsApp us directly and we'll do our best to prioritise your order!\n\n📱 wa.me/918660099085 💕",
        "Rush order? We've got you! 🚀\n\nMessage us on WhatsApp with your deadline and we'll see what we can arrange. We always try to accommodate urgent requests! 💕",
      ]),
      link: { label: "WhatsApp for Rush Order", url: KB.contact.whatsappUrl },
      newCtx: { lastIntent: "urgency" },
    };

  if (intent === "COMPLAINT")
    return {
      text: pick([
        "I'm so sorry to hear that! 😔 We genuinely want every customer to be happy.\n\nPlease reach out to us on WhatsApp or email with your order details and we'll make it right as quickly as possible! 💕",
        "We're really sorry you had a bad experience! 💔\n\nPlease message us on WhatsApp with your order number and the issue. We'll resolve it promptly — your satisfaction means everything to us! 🌸",
      ]),
      link: { label: "Contact Us on WhatsApp", url: KB.contact.whatsappUrl },
      newCtx: { lastIntent: "complaint" },
    };

  if (intent === "COMPLIMENT")
    return {
      text: pick([
        "Aww, that absolutely made our day! 🥰 Thank you so much!\n\nEvery kind word motivates us to keep crafting with love. We can't wait for you to get your piece! 💕🧶",
        "Thank you so much! That means the world to us! 🌸\n\nWe pour our hearts into every stitch — hearing this makes it all worth it! 💕",
        "You're too sweet! 🥹✨ We're so glad you love it! Don't forget to spread the word — every review and share helps our small business grow! 💕",
      ]),
      newCtx: { lastIntent: "compliment" },
    };

  if (intent === "ORDER_CONFIRM")
    return {
      text: pick([
        "Wonderful! 🎉 Once we receive your WhatsApp message, we'll confirm your order and send payment details within a few hours.\n\nYour handmade piece will then be crafted and dispatched within 5–7 business days. You'll get a tracking update on WhatsApp! 📦💕",
        "Great, thank you for ordering! 🌸\n\nWe'll send a confirmation and payment link on WhatsApp shortly. Your item will be crafted with love and shipped within 5–7 business days!\n\nExcited for you to receive it! 💕🧶",
      ]),
      newCtx: { lastIntent: "order_confirm" },
    };

  if (intent === "FESTIVAL")
    return {
      text: pick([
        "The Cozy Hook is perfect for festive gifting! 🎊\n\n🪔 Diwali: Wall Hanging (₹499), Coaster Set (₹299)\n💝 Valentine's Day: Heart Keychain (₹109), Heart Pillow (₹399)\n🎂 Birthdays: Any Plushie or Keychain\n🤝 Friendship Day: Mini Pouches (₹199), Bookmarks (₹79)\n🏠 Housewarming: Hanging Plant (₹349), Table Mat (₹399)\n\nGift wrapping and personal notes available! 💕",
        "Festive gifting sorted! 🎊\n\nWe have something for every occasion and every budget — from ₹79 bookmarks to ₹499 wall hangings. All items are gift-ready with beautiful packaging!\n\nTell me the occasion and budget and I'll suggest the perfect pick! 💕",
      ]),
      newCtx: { lastIntent: "festival" },
    };

  if (intent === "HELP")
    return {
      text: pick([
        "I'm here to help with everything about The Cozy Hook! 🧶\n\nYou can ask me about:\n• 🧸 Products & prices (all 34 items!)\n• 🚚 Delivery & shipping\n• 🎨 Custom & personalised orders\n• 💳 Payment methods\n• 🔄 Returns & exchanges\n• 📦 Packaging\n• 🎁 Gift ideas & recommendations\n• 📸 Product pictures & gallery\n• 🏷️ Price ranges & filters\n• 📍 Order tracking\n\nJust type your question naturally! 💕",
        "Ask me anything! 🌸 Here's what I can help with:\n\n🛍️ Products, prices, availability\n🚚 Delivery info and timelines\n🎨 Custom and personalised orders\n💳 Payment options\n🎁 Gift suggestions\n📸 Product gallery\n🔄 Returns and refunds\n📍 Order tracking\n\nNo question is too small — I'm here to help! 💕",
      ]),
      newCtx: { lastIntent: "help" },
    };

  // ── Fallback ───────────────────────────────────────────────────────────────
  return {
    text: pick([
      `I'm not quite sure about that — but I don't want to leave you without an answer! 🌸\n\nHere's how to get help:\n💬 WhatsApp: ${KB.contact.whatsappUrl}\n📧 Email: ${KB.contact.email}\n\nOr try asking me about products, prices, delivery, custom orders, or gift ideas!`,
      "Hmm, I didn't quite catch that! 🤔 Could you rephrase it?\n\nYou can ask me about:\n• Products and prices\n• Delivery and shipping\n• Custom orders\n• Gift suggestions\n• Payment methods\n\nOr WhatsApp us directly for anything else! 💕",
      `Not sure I understood that fully! 🌸 Try asking me something like:\n• 'Show me plushies'\n• 'How much is the bucket hat?'\n• 'How do I order?'\n• 'Is delivery free?'\n\nOr reach us on WhatsApp: ${KB.contact.whatsappUrl} 💬`,
    ]),
    link: { label: "Ask on WhatsApp", url: KB.contact.whatsappUrl },
    newCtx: { lastIntent: "fallback" },
  };
}

// ─── Quick Replies ─────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  { label: "🧸 Plushies", query: "Show me all plushies" },
  { label: "🔑 Keychains", query: "Show me all keychains" },
  { label: "✨ Fan Favourites", query: "What are your fan favourites?" },
  { label: "🚚 Delivery", query: "Tell me about delivery" },
  { label: "🎨 Custom Order", query: "I want a custom order" },
  { label: "🎁 Gift Ideas", query: "I need a gift idea" },
  { label: "💳 Payment", query: "What payment methods do you accept?" },
  { label: "📸 See Pictures", query: "Can I see product pictures?" },
];

// ─── Message counter ──────────────────────────────────────────────────────
let msgCounter = 0;
const nextId = () => ++msgCounter;

const WELCOME: Message = {
  id: nextId(),
  role: "bot",
  text: "Hi! I'm the Cozy Hook assistant 🧶\n\nI know every product, price, and policy! Ask me anything about our collection, delivery, custom orders, gift ideas, and more. 💕",
};

// ─── Component ─────────────────────────────────────────────────────────────
export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const [ctx, setCtx] = useState<ConversationContext>({
    lastCategory: null,
    lastProduct: null,
    lastIntent: null,
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show welcome on first open
  useEffect(() => {
    if (open && !welcomed) {
      setWelcomed(true);
      setMessages([WELCOME]);
    }
  }, [open, welcomed]);

  // Auto-scroll on every render
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || typing) return;
      const userMsg: Message = {
        id: nextId(),
        role: "user",
        text: text.trim(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setTyping(true);

      const delay = 700 + Math.random() * 500;
      setTimeout(() => {
        const result = getResponse(text, ctx);
        setCtx((prev) => ({ ...prev, ...result.newCtx }));
        const botMsg: Message = {
          id: nextId(),
          role: "bot",
          text: result.text,
          link: result.link,
        };
        setMessages((prev) => [...prev, botMsg]);
        setTyping(false);
      }, delay);
    },
    [ctx, typing],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  const showQuickReplies = messages.length === 1 && !typing;

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        data-ocid="chat.open_modal_button"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-boutique-lg transition-smooth hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        whileTap={{ scale: 0.93 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat box */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-ocid="chat.dialog"
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 24 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-3xl shadow-boutique-lg overflow-hidden"
            style={{ maxHeight: 520 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-primary text-primary-foreground shrink-0">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center text-lg select-none shrink-0">
                🧶
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold leading-tight">
                  The Cozy Hook Assistant
                </p>
                <p className="font-body text-xs opacity-75 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
                  Always here to help ✨
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="ml-auto p-1 rounded-full hover:bg-primary-foreground/20 transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background min-h-0">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl text-sm font-body leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.link && (
                    <a
                      href={msg.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-body font-medium text-primary underline-offset-2 hover:underline transition-smooth"
                    >
                      <ExternalLink size={11} />
                      {msg.link.label}
                    </a>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground inline-block"
                        style={{
                          animation: "typing-dot 1.2s ease-in-out infinite",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {showQuickReplies && (
              <div className="px-4 pb-3 pt-1 bg-background shrink-0 border-t border-border/50">
                <p className="text-xs text-muted-foreground font-body mb-2">
                  Quick questions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr.label}
                      type="button"
                      data-ocid={`chat.quick_reply.${qr.label.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}`}
                      onClick={() => sendMessage(qr.query)}
                      className="text-xs font-body px-3 py-1.5 rounded-full border border-primary/30 bg-accent/60 text-foreground hover:bg-primary hover:text-primary-foreground transition-smooth"
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 bg-card border-t border-border shrink-0"
            >
              <input
                ref={inputRef}
                data-ocid="chat.input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                disabled={typing}
                className="flex-1 min-w-0 bg-muted rounded-full px-4 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-2 focus:ring-primary/30 transition-smooth disabled:opacity-50"
              />
              <button
                type="submit"
                data-ocid="chat.submit_button"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:opacity-90 disabled:opacity-40 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typing dot keyframes */}
      <style>{`
        @keyframes typing-dot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
