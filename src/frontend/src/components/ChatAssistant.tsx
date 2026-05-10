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
  delivery: { charge: 49, freeAbove: 999, days: "5–7 business days" },
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
        `• ${p.name} — ₹${p.price}${p.highlight ? " ✨" : ""}${p.custom ? " (Custom)" : ""}`,
    )
    .join("\n");
}

/** Normalize: lowercase, trim, collapse spaces, remove most punctuation */
function norm(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9₹\s]/g, " ")
    .replace(/\s+/g, " ");
}

/** Fuzzy word overlap: does query share ≥1 word token with product name? */
function fuzzyMatch(query: string, productName: string): boolean {
  const qTokens = norm(query)
    .split(" ")
    .filter((t) => t.length > 2);
  const pNorm = norm(productName);
  return qTokens.some((t) => pNorm.includes(t));
}

function findProductsByQuery(query: string) {
  const q = norm(query);
  // Exact substring match first
  const exact = allProducts().filter((p) => q.includes(norm(p.name)));
  if (exact.length > 0) return exact;
  // Fuzzy token match
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

// ─── Intent Detectors ──────────────────────────────────────────────────────
const IS_GREETING =
  /^(hi+|hello+|hey+|hiya|howdy|sup|what'?s? ?up|wassup|whatsup|yo+|gm|gn|good (morning|afternoon|evening|night)|namaste|hola|how are (you|u|r you|r u)|how'?s? ?it going|whats good|start|begin|hii+|helo|hai|heyy+|helloo+)/;

const IS_FAREWELL =
  /\b(bye+|goodbye|good ?bye|see (you|ya|u)|cya|later|take care|ttyl|gtg|gotta go|(ok|okay|alright|thanks|thank you|ty) bye)\b/;

const IS_THANKS =
  /\b(thank(s| you| u)?|thx|ty|thnx+|tysm|thank you so much|thanks a (lot|bunch|ton)|many thanks|appreciate it|cheers)\b/;

const IS_ABOUT =
  /\b(about|who are (you|u)|who r (you|u)|what is (this|the cozy hook)|tell me about|your (brand|story)|brand story|who (made|runs|started|created) this|founder|owner|origin|sanjana|handmade|what do you do|cozy hook|your mission|about you)\b/;

const IS_ALL_PRODUCTS =
  /\b(what do you (sell|have|offer|make|carry)|all products|everything|full (list|collection|catalog|catalogue)|show (me )?all|what'?s? ?(available|in stock)|what can i buy|show me your products|what kind of (stuff|things|items)|what items|product list|all items|everything you have|your products|full range|whole collection|catalog|show catalog)\b/;

const IS_PLUSHIES =
  /\b(plush(ie)?s?|soft toys?|stuffed (animals?|toys?)|cuddly toys?|teddy|plush|fluffy toys?|cute toys?|toy animals?|kids? toys?|baby toys?|show plushies|all plushies|plushie list)\b/;

const IS_KEYCHAINS =
  /\b(keychains?|key chains?|key rings?|keyring|bag tag|hanging charms?|all keychains|show keychains|keychain list|what keychains?)\b/;

const IS_WEARABLES =
  /\b(wearables?|clothes|clothing|wear|fashion|things to wear|clothing accessories|hairbands?|hats?|headbands?|headwear|gloves?|bandanas?|wearable items?|wearable list|show wearables?)\b/;

const IS_HOME_DECOR =
  /\b(home ?decor?|home decoration|home accessories|decoration|house decor|interior|for home|room decor|home stuff|room accessories|home items?|room items?|wall hanging|coasters?|table items?|hanging plant|home list|show decor)\b/;

const IS_ACCESSORIES =
  /\b(accessories|accessory|fashion accessories|style|extras|add-ons|beauty|hair accessories|phone accessories|bag accessories|pouches?|bookmarks?|scrunchies|show accessories|accessories list)\b/;

const IS_FAN_FAVES =
  /\b(fan fav(ou?rite)?s?|fan fav|most loved|popular products?|best sell(ing|er)s?|trending|what people love|top (picks|products?)|loved by all|most popular|bestseller|recommended|bestsellers?)\b/;

const IS_DELIVERY =
  /\b(deliver(y|ies)?|shipping|ship|courier|dispatch|freight|how much (for )?deliver(y|ing)?|deliver(y|ing)? (charges?|fees?|cost)|shipping (charges?|fees?|cost)|free deliver(y|ing)?|free shipping|deliver(y|ing)? limit|above what amount|pan ?india|nationwide|all india|where do you deliver|deliver in india|do you deliver|will you deliver)\b/;

const IS_DELIVERY_TIME =
  /\b(how (long|many days)|when (will it|does it|do i) (arrive?|get|come|reach)|deliver(y|ing)? time|shipping time|eta|delivery days?|how long (to|for) (ship|deliver)|standard deliver(y|ing)?|express deliver(y|ing)?|estimated? time|estimated? deliver(y|ing)?)\b/;

const IS_ORDERING =
  /\b(how (to|do i|can i) (order|buy|purchase|get|shop)|place (an? )?order|ordering process|order process|steps? (to order|to buy)|buying process|checkout|how does it work|order now|add to cart|how to shop|shopping process|can i order|want to order|ordering steps?|i want to (buy|order|get))\b/;

const IS_PAYMENT =
  /\b(pay(ment)?|how to pay|payment method|payment options?|accepted payments?|cash|upi|gpay|phonepe|paytm|card|debit card|credit card|net banking|online payment|cash on deliver(y|ing)?|cod|pay on deliver(y|ing)?|razorpay|stripe|wallet|mode of payment|payment gateway|do you accept|transaction|pay online|any payment|how do i pay)\b/;

const IS_WHATSAPP =
  /\b(whatsapp|wa\.me|whatsapp (number|contact)|wa number|order on whatsapp|message on whatsapp|send on whatsapp|chat on whatsapp|reach on whatsapp|your (number|whatsapp)|wp( number)?|contact number|contact whatsapp)\b/;

const IS_CUSTOM =
  /\b(custom(is|iz|)?e?|custom (order|colour|color|size|plushie|keychain|design|made)|customis|customiz|personaliz|personalise|personalised|personalized|bespoke|special order|made to order|specific (color|colour|design)|your choice|make (for|it) me|can you make|special request|tailor(ed| made)?|name (on it|keychain)|initials?|initial letter|letter keychain|name keychain|personalised gift|can i choose|my own design|own design|custom request)\b/;

const IS_RETURNS =
  /\b(return|refund|exchange|replac(e|ement)|damaged?|defect(ive)?|broken|wrong (item|order)|return policy|refund policy|can i return|what if damaged|if i don'?t like|change my mind|cancel(lation)?|can i cancel|money back|guarantee)\b/;

const IS_PACKAGING =
  /\b(packag(ing|e)|packed?|gift ?wrap(ping)?|present(ation)?|unboxing|how is it packed|will it be safe|safely packed|secure packaging|gift packaging|is it gift wrapped|can you gift wrap|box(ing)?|packing)\b/;

const IS_CARE =
  /\b(care( instructions)?|how to (wash|clean)|wash(ing)?( instructions)?|cleaning|dry(ing)?|maintain|maintenance|hand ?wash|machine wash|how to care|handle|take care of|care guide|product care|delicate|gentle wash)\b/;

const IS_MATERIALS =
  /\b(material|yarn|thread|fabric|what is it made of|made of|what (material|yarn)|quality|cotton|wool|acrylic|crochet yarn|fi?ber?|is it soft|is it safe|baby safe|child safe|hypoallergen(ic)?|non.?toxic|safe for (kids?|babies?|children?)|allerg(y|ic)|pet safe)\b/;

const IS_SIZE =
  /\b(size?|dimension|how (big|small|large|long|tall)|measure(ment)?|cm|inch(es)?|mm|millim(eter|etre)|height|width|length|scale|actual size|fits?|size chart)\b/;

const IS_GIFTS =
  /\b(gift|present|gifting|what to gift|birthday gift|anniversary (gift)?|valentine'?s?|christmas|diwali|festive|special occasion|for (her|him|kids?|baby|friend|boyfriend|girlfriend|mom|dad|sister|brother)|best gift|good gift|recommend (a )?gift|gift suggestion|surprise gift|gift ideas?)\b/;

const IS_RECOMMEND =
  /\b(recommend(ation)?|suggest(ion)?|what should i (buy|get)|which is (best|good)|what (is|are) (popular|trending)|top picks?|top products?|what (is|are) your fav(ou?rite)?|what do people buy|most (bought|ordered)|worth (buying|it)|value for money|what to buy)\b/;

const IS_BULK =
  /\b(bulk( order)?|wholesale|large quantity|multiple|many pieces|event|wedding|party|corporate|gifting event|birthday party|bulk discount|group order|multiple orders|order (many|10|20|50|100)|big order|want (10|20|50|100)|lots? of orders?)\b/;

const IS_DISCOUNT =
  /\b(discount|offer|coupon|sale|promo( code)?|deal|code|voucher|cashback|any (offer|discount)|special offer|seasonal offer|festive offer)\b/;

const IS_AVAILABILITY =
  /\b(available|availability|in stock|out of stock|stock|when back|when available|when restocked|restock(ed)?|not available|sold out|do you have|can i get)\b/;

const IS_GALLERY =
  /\b(picture|photo|image|gallery|can i see|see|view|show me|what does it look like|see pictures?|photo gallery|product photo)\b/;

const IS_PRICING_GENERAL =
  /\b(price|pricing|cost|rate|fee|how much|rupee|₹|rates?|prices?|price list|price range|all prices|show prices|how much (does each|do)|quote)\b/;

const IS_TRACKING =
  /\b(track(ing)?|order status|where is (my|the) (order|parcel|package)|when will i get|dispatched|shipped|out for delivery|track (my )?order|parcel|delivery update|order update|when does it come|track package)\b/;

const IS_HOW_IT_WORKS =
  /\b(how does it work|how do you work|explain|tell me how|steps?|process|walk me through|how does (ordering|the shop) work|how (is|are) (this|they) made|handmade process|how do i use this|how does (buying|shopping) work)\b/;

const IS_CONTACT =
  /\b(contact( us)?|reach (you|us)|how to (reach|contact)|email( address)?|phone( number)?|call|your (email|phone|contact)|contact details?|reach out|get in touch|connect)\b/;

const IS_PRICE_CHEAP =
  /\b(cheapest|most affordable|lowest price|budget friendly|pocket friendly|inexpensive|minimum price|bargain)\b/;

const IS_PRICE_EXPENSIVE =
  /\b(expensive|priciest|premium|highest price|most costly|top priced)\b/;

// ─── Price range extractor ─────────────────────────────────────────────────
function extractUnder(q: string): number | null {
  const m = q.match(
    /(?:under|below|less than|within|upto?|up to|max(?:imum)?)\s*[₹rups.]*\s*(\d+)/,
  );
  return m ? Number.parseInt(m[1]) : null;
}

function extractAbove(q: string): number | null {
  const m = q.match(
    /(?:above|over|more than|atleast|at least|min(?:imum)?)\s*[₹rups.]*\s*(\d+)/,
  );
  return m ? Number.parseInt(m[1]) : null;
}

// ─── Category detector ─────────────────────────────────────────────────────
function detectCategory(q: string): string | null {
  if (IS_PLUSHIES.test(q)) return "Plushies";
  if (IS_KEYCHAINS.test(q)) return "Keychains";
  if (IS_WEARABLES.test(q)) return "Wearables";
  if (IS_HOME_DECOR.test(q)) return "Home Decor";
  if (IS_ACCESSORIES.test(q)) return "Accessories";
  // Also detect from product keywords in context
  if (/\b(whale|octopus|bear|frog|duck|strawberry|costumed bunny)\b/.test(q))
    return "Plushies";
  if (
    /\b(bouquet|gradient flower|cake roll|bow|cherry|starfish|heart key|bunny key|sunflower|initial letter)\b/.test(
      q,
    )
  )
    return "Keychains";
  if (/\b(hairband|gloves|bucket|bandana|daisy)\b/.test(q)) return "Wearables";
  if (/\b(hanging plant|heart pillow|coaster|table mat|wall)\b/.test(q))
    return "Home Decor";
  if (/\b(tulip|scrunch|bookmark|phone charm|pouch|bag charm)\b/.test(q))
    return "Accessories";
  return null;
}

// ─── Intent Engine ─────────────────────────────────────────────────────────
function getResponse(raw: string, ctx: ConversationContext): ResponseResult {
  const q = norm(raw);
  const newCtx: Partial<ConversationContext> = {};

  // ── 1. Greetings ──────────────────────────────────────────────────────────
  if (IS_GREETING.test(q))
    return {
      text: "Hi there! 👋 Welcome to The Cozy Hook — your favourite handmade crochet boutique. 🧶\n\nI can help you with products, prices, delivery, custom orders, and more. What would you like to know?",
      newCtx: { lastIntent: "greeting" },
    };

  // ── 2. Farewells ─────────────────────────────────────────────────────────
  if (IS_FAREWELL.test(q))
    return {
      text: "Goodbye! 🌸 Thank you for visiting The Cozy Hook. Come back anytime — we'd love to see you again! 💕",
      newCtx: { lastIntent: "farewell" },
    };

  // ── 3. Thank you ─────────────────────────────────────────────────────────
  if (IS_THANKS.test(q))
    return {
      text: "You're so welcome! 🥰 It's our pleasure. Is there anything else I can help you with?",
      newCtx: { lastIntent: "thanks" },
    };

  // ── 4. About / Brand ─────────────────────────────────────────────────────
  if (IS_ABOUT.test(q))
    return {
      text: "The Cozy Hook is a handmade crochet boutique founded by Sanjana Prasad. 🧶\n\nEvery single piece is hand-crafted with love and care — from tiny keychains to cozy plushies and beautiful home decor. What started as a passion project has grown into a curated collection of 34 unique crochet creations.\n\nEach item is made to order, so you're getting something truly special! 💕",
      newCtx: { lastIntent: "brand" },
    };

  // ── 5. All products / categories overview ────────────────────────────────
  if (IS_ALL_PRODUCTS.test(q))
    return {
      text: "Here's our full collection at The Cozy Hook! 🧶\n\n🧸 Plushies (7 items) — from ₹249\n🔑 Keychains (11 items) — from ₹99\n👗 Wearables (5 items) — from ₹149\n🏡 Home Decor (5 items) — from ₹299\n🎀 Accessories (6 items) — from ₹79\n\nAsk me about any category for the full list and prices! ✨",
      newCtx: { lastIntent: "all_products" },
    };

  // ── 6. Fan Favourites ────────────────────────────────────────────────────
  if (IS_FAN_FAVES.test(q)) {
    const faves = allProducts().filter((p) => p.highlight);
    return {
      text: `Our fan favourites right now ✨\n\n${fmt(faves)}\n\nThese sell out the fastest — grab yours before they're gone! 💕`,
      newCtx: { lastIntent: "favourites" },
    };
  }

  // ── 7. Category listings ──────────────────────────────────────────────────
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

  // ── 8. Price filter: under / below ───────────────────────────────────────
  const underLimit = extractUnder(q);
  if (underLimit !== null) {
    const pool = resolvedCat
      ? (categoryProducts(resolvedCat)?.items ?? allProducts())
      : allProducts();
    const filtered = pool.filter((p) => p.price < underLimit);
    newCtx.lastIntent = "price_filter";
    if (filtered.length === 0)
      return {
        text: `Hmm, nothing under ₹${underLimit}${resolvedCat ? ` in ${resolvedCat}` : ""}. Our most affordable item is Bookmarks at ₹79! 🎀`,
        newCtx,
      };
    return {
      text: `Items under ₹${underLimit}${resolvedCat ? ` in ${resolvedCat}` : ""} 🏷️\n\n${fmt(filtered)}`,
      newCtx,
    };
  }

  // ── 9. Price filter: above / over ────────────────────────────────────────
  const aboveLimit = extractAbove(q);
  if (aboveLimit !== null) {
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

  // ── 10. Cheapest / most affordable ───────────────────────────────────────
  if (IS_PRICE_CHEAP.test(q)) {
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

  // ── 11. Most expensive / premium ─────────────────────────────────────────
  if (IS_PRICE_EXPENSIVE.test(q)) {
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

  // ── 12. Specific product lookup (phrase patterns) ────────────────────────
  const productPhraseMatch =
    q.match(/how much (?:is|does|for|costs?) (?:the )?(\w[\w\s()]*?)\s*\??$/) ??
    q.match(/(?:price|cost|rate) (?:of|for) (?:the )?(\w[\w\s()]*?)\s*\??$/) ??
    q.match(
      /(?:tell me about|info (?:on|about)|what(?:'s| is) the?) (?:the )?(\w[\w\s()]*?)\s*\??$/,
    ) ??
    q.match(
      /(?:is|how much is) (?:the )?(\w[\w\s()]*?) (?:available|in stock)/,
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

  // ── 13. Direct product name mention (fuzzy) ───────────────────────────────
  const directMatches = findProductsByQuery(q);
  if (directMatches.length === 1) {
    const found = directMatches[0];
    newCtx.lastProduct = found.name;
    newCtx.lastCategory = getCategory(found.name);
    return {
      text: `${found.name} is one of our lovely pieces! 🧶\n\nPrice: ₹${found.price}${found.highlight ? " ✨ (Fan Favourite)" : ""}${found.custom ? " — and it can be personalised with your initial! ✏️" : ""}\n\nTo place an order or see the picture, message us on WhatsApp!`,
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

  // ── 14. Context follow-up: "that one" / "same" ────────────────────────────
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

  // ── 15. How it works / ordering process ──────────────────────────────────
  if (IS_HOW_IT_WORKS.test(q) || IS_ORDERING.test(q))
    return {
      text: "Ordering from The Cozy Hook is super easy! 🛍️\n\n1️⃣ Browse the collection and add items to your cart\n2️⃣ Fill in your name, address, and phone number on the cart page\n3️⃣ Tap 'Order Now' — WhatsApp opens with everything pre-filled\n4️⃣ We confirm your order and share payment details\n5️⃣ Your handmade piece is crafted and delivered in 5–7 days! 📦\n\nNo advance payment needed before confirmation! 💕",
      newCtx: { lastIntent: "ordering" },
    };

  // ── 16. Payment ───────────────────────────────────────────────────────────
  if (IS_PAYMENT.test(q))
    return {
      text: "We accept all major payment modes! 💳\n\n• UPI (GPay, PhonePe, Paytm)\n• Debit / Credit cards\n• Net banking\n• Cash on Delivery (COD) — available for most locations\n\nPayment details are shared on WhatsApp after order confirmation. No advance payment needed before we confirm! 🌸",
      newCtx: { lastIntent: "payment" },
    };

  // ── 17. WhatsApp ──────────────────────────────────────────────────────────
  if (IS_WHATSAPP.test(q))
    return {
      text: `You can reach us directly on WhatsApp! 💬\n\n📱 ${KB.contact.whatsappUrl}\n\nWe typically reply within a few hours. You can place orders, ask questions, or request custom pieces!`,
      link: { label: "Open WhatsApp", url: KB.contact.whatsappUrl },
      newCtx: { lastIntent: "whatsapp" },
    };

  // ── 18. Contact ───────────────────────────────────────────────────────────
  if (IS_CONTACT.test(q))
    return {
      text: `You can reach The Cozy Hook here 🌸\n\n💬 WhatsApp: ${KB.contact.whatsappUrl}\n📧 Email: ${KB.contact.email}\n\nWe typically respond within a few hours!`,
      link: { label: "Message us on WhatsApp", url: KB.contact.whatsappUrl },
      newCtx: { lastIntent: "contact" },
    };

  // ── 19. Delivery ─────────────────────────────────────────────────────────
  if (IS_DELIVERY.test(q))
    return {
      text: `We deliver across India! 🇮🇳\n\n📦 Delivery charge: ₹${KB.delivery.charge}\n🎉 FREE delivery on orders above ₹${KB.delivery.freeAbove}\n⏱️ Standard delivery time: ${KB.delivery.days}\n\nYou'll receive tracking details on WhatsApp once dispatched!`,
      newCtx: { lastIntent: "delivery" },
    };

  // ── 20. Delivery time ─────────────────────────────────────────────────────
  if (IS_DELIVERY_TIME.test(q))
    return {
      text: `Standard delivery takes ${KB.delivery.days} after dispatch. 📦\n\nCustom orders (like Initial Letter Keychains or personalised pieces) may take 10–15 days as they're made to order.\n\nYou'll receive tracking details on WhatsApp once your order ships! 🌸`,
      newCtx: { lastIntent: "delivery_time" },
    };

  // ── 21. Custom orders ─────────────────────────────────────────────────────
  if (IS_CUSTOM.test(q))
    return {
      text: "We love making custom pieces! 🎨\n\nYou can request:\n• Custom colours on most items\n• Personalised keychains (your initial or name)\n• Special sizes or unique designs\n• Bulk orders for events & gifting\n• Custom plushies or specific colour combos\n\nFill in our Custom Orders form and we'll get back to you on WhatsApp! 💕",
      link: { label: "Fill Custom Order Form", url: KB.customOrdersUrl },
      newCtx: { lastIntent: "custom" },
    };

  // ── 22. Returns / refunds ─────────────────────────────────────────────────
  if (IS_RETURNS.test(q))
    return {
      text: "We want you to love every piece! 💛\n\nOur policy:\n• Exchanges accepted within 7 days — item must be unused and in original packaging\n• Damaged or defective items — contact us immediately and we'll make it right\n• Returns considered case-by-case\n• Order cancellations accepted before dispatch\n\nJust reach out on WhatsApp or email and we'll sort it out! 🌸",
      newCtx: { lastIntent: "returns" },
    };

  // ── 23. Packaging ─────────────────────────────────────────────────────────
  if (IS_PACKAGING.test(q))
    return {
      text: "Every order is carefully packaged to keep your items safe during transit! 🎁\n\nMost orders come in gift-ready packaging too. If you'd like special gift wrapping or a personal note, just mention it in your order notes on WhatsApp and we'll take care of it 💕",
      newCtx: { lastIntent: "packaging" },
    };

  // ── 24. Care instructions ─────────────────────────────────────────────────
  if (IS_CARE.test(q))
    return {
      text: "Crochet care tips for your Cozy Hook pieces 🌊\n\n• Hand wash gently in cold water with mild soap\n• Lay flat to dry — never hang wet (it stretches the yarn)\n• Do not machine wash or tumble dry\n• Store in a cool, dry place away from direct sunlight\n\nWith proper care, your pieces will stay beautiful for years! 🧶",
      newCtx: { lastIntent: "care" },
    };

  // ── 25. Materials / safety ────────────────────────────────────────────────
  if (IS_MATERIALS.test(q))
    return {
      text: "All Cozy Hook pieces are handcrafted using high-quality yarn — mostly premium cotton and wool blends. 🧶\n\n• Plushies use hypoallergenic polyester fill (safe for all ages)\n• Wearables use soft, skin-friendly cotton or wool-blend yarn\n• Keychains & accessories use durable cotton thread\n• All materials are non-toxic and safe for kids & babies\n\nEvery piece is made with love and attention to detail! 💕",
      newCtx: { lastIntent: "materials" },
    };

  // ── 26. Size / dimensions ─────────────────────────────────────────────────
  if (IS_SIZE.test(q))
    return {
      text: "Sizes vary by product! Here are some examples 📏\n\n🧸 Plushies: ~17–22 cm tall\n🔑 Keychains: ~5–9 cm\n🧢 Bucket Hat: adjustable inner tie\n❤️ Heart Pillow: ~30 cm wide\n🪴 Hanging Plant: ~40 cm drop\n🖼️ Wall Hanging: ~30–40 cm wide\n\nNeed exact measurements for a specific item? Ask me by name or WhatsApp us!",
      newCtx: { lastIntent: "sizing" },
    };

  // ── 27. Gift ideas ────────────────────────────────────────────────────────
  if (IS_GIFTS.test(q))
    return {
      text: "We make the most heartfelt gifts! 🎁 Popular choices:\n\n💝 For her: Strawberry Costumed Bunny (₹399), Bucket Hat (₹399), Heart Pillow (₹399)\n🎂 Birthday: Frog Plushie (₹249), Cherry Keychain (₹129), Mini Pouches (₹199)\n🏠 Housewarming: Wall Hanging (₹499), Coaster Set (₹299), Hanging Plant (₹349)\n👶 For kids/babies: Any Plushie (₹249–₹399)\n💑 Valentine: Heart Keychain (₹109), Heart Pillow (₹399)\n\nGift wrapping available — just ask! 💕",
      newCtx: { lastIntent: "gifts" },
    };

  // ── 28. Recommendations ───────────────────────────────────────────────────
  if (IS_RECOMMEND.test(q)) {
    const faves = allProducts().filter((p) => p.highlight);
    return {
      text: `Here are our most recommended pieces 🌟\n\n${fmt(faves)}\n\nAll four are fan favourites and sell out quickly! If you tell me who you're buying for, I can suggest something more specific 💕`,
      newCtx: { lastIntent: "recommend" },
    };
  }

  // ── 29. Bulk orders ───────────────────────────────────────────────────────
  if (IS_BULK.test(q))
    return {
      text: "We love fulfilling bulk orders for events, gifting, and special occasions! 🎉\n\nFor bulk orders (10+ pieces), please WhatsApp us directly so we can discuss quantities, timelines, and special pricing. Discounts available for larger quantities! 🛍️",
      link: { label: "Contact for Bulk Order", url: KB.contact.whatsappUrl },
      newCtx: { lastIntent: "bulk" },
    };

  // ── 30. Discounts ─────────────────────────────────────────────────────────
  if (IS_DISCOUNT.test(q))
    return {
      text: "We don't run discount codes currently, but you get FREE delivery on orders above ₹999! 🎉\n\nFor bulk orders or special events, custom pricing is available — just WhatsApp us to discuss. 💕\n\nFollow our updates for seasonal offers!",
      newCtx: { lastIntent: "discount" },
    };

  // ── 31. Stock availability ────────────────────────────────────────────────
  if (IS_AVAILABILITY.test(q))
    return {
      text: "Most items are made to order, so availability depends on current workload! 🧶\n\nFor the quickest updates, WhatsApp us directly — we'll let you know the status and can reserve your item too! 💕",
      link: { label: "Check Stock on WhatsApp", url: KB.contact.whatsappUrl },
      newCtx: { lastIntent: "availability" },
    };

  // ── 32. Gallery / pictures ────────────────────────────────────────────────
  if (IS_GALLERY.test(q))
    return {
      text: "You can browse all our product pictures in our image gallery! 📸\n\nScroll through to find your favourite pieces. Each product page on our website also has a 'View Picture' button linking directly to the gallery.",
      link: { label: "Open Product Gallery", url: KB.imageGallery },
      newCtx: { lastIntent: "gallery" },
    };

  // ── 33. Order tracking ────────────────────────────────────────────────────
  if (IS_TRACKING.test(q))
    return {
      text: "Order tracking details are shared on WhatsApp after your order is dispatched! 📦\n\nYou'll receive a tracking number via WhatsApp message. If you haven't received it yet or need an update, just message us directly!\n\n💬 wa.me/918660099085",
      link: { label: "Track via WhatsApp", url: KB.contact.whatsappUrl },
      newCtx: { lastIntent: "tracking" },
    };

  // ── 34. General pricing ───────────────────────────────────────────────────
  if (IS_PRICING_GENERAL.test(q)) {
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
    // Context: last product
    if (ctx.lastProduct) {
      const p = allProducts().find((x) => x.name === ctx.lastProduct);
      if (p)
        return {
          text: `${p.name} is priced at ₹${p.price}${p.highlight ? " ✨" : ""}. 🏷️`,
          newCtx,
        };
    }
    return {
      text: "Our prices range from ₹79 to ₹499 🏷️\n\n• Accessories: ₹79–₹199\n• Keychains: ₹99–₹159\n• Wearables: ₹149–₹399\n• Home Decor: ₹299–₹499\n• Plushies: ₹249–₹399\n\nAsk me about any category or specific item for exact prices!",
      newCtx: { lastIntent: "pricing" },
    };
  }

  // ── 35. Comparison ────────────────────────────────────────────────────────
  if (
    /\b(compare|difference|vs\.?|versus|which is better|should i (get|buy)|between)\b/.test(
      q,
    )
  )
    return {
      text: "I'd love to help you choose! 🤔\n\nTell me which two items you're deciding between and I'll share more details. Or describe who it's for (e.g. 'gift for my friend') and I'll suggest the best option! 💕",
      newCtx: { lastIntent: "comparison" },
    };

  // ── 36. Follow-ups: "tell me more", "what else", "more info" ──────────────
  if (
    /\b(tell me more|what else|more info|more details|anything else|elaborate|explain more|go on)\b/.test(
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

  // ── 37. Affirmations / acknowledgments ───────────────────────────────────
  if (
    /^(ok|okay|sure|got it|alright|noted|understood|nice|great|cool|awesome|perfect|sounds good|yep|yup|yes|k|sounds good)\s*\.?\!?$/.test(
      q,
    )
  )
    return {
      text: "Great! 😊 Is there anything else I can help you with? Feel free to ask about products, pricing, custom orders, delivery, or anything else! 🧶",
      newCtx,
    };

  // ── 38. Negative / no ────────────────────────────────────────────────────
  if (
    /^(no|nope|nah|not really|nothing|i'?m? good|all good|that'?s? all)\s*\.?\!?$/.test(
      q,
    )
  )
    return {
      text: "No worries! 🌸 Feel free to come back anytime you have a question. Happy shopping at The Cozy Hook! 💕",
      newCtx,
    };

  // ── 39. Help / what can you do ────────────────────────────────────────────
  if (
    /\b(help|what can you (do|help with|answer)|what do you know|your capabilities|what questions|what can i ask)\b/.test(
      q,
    )
  )
    return {
      text: "I'm here to help with everything about The Cozy Hook! 🧶\n\nYou can ask me about:\n• 🧸 Products & prices (all 34 items!)\n• 🚚 Delivery & shipping\n• 🎨 Custom & personalised orders\n• 💳 Payment methods\n• 🔄 Returns & exchanges\n• 📦 Packaging\n• 🎁 Gift ideas & recommendations\n• 📸 Product pictures & gallery\n• 🏷️ Price ranges & filters\n• 📍 Order tracking\n\nJust type your question naturally! 💕",
      newCtx: { lastIntent: "help" },
    };

  // ── 40. Fallback ──────────────────────────────────────────────────────────
  return {
    text: `I'm not quite sure about that — but I don't want to leave you without an answer! 🌸\n\nHere's how to get help:\n💬 WhatsApp: ${KB.contact.whatsappUrl}\n📧 Email: ${KB.contact.email}\n\nOr try asking me about products, prices, delivery, custom orders, or gift ideas!`,
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
