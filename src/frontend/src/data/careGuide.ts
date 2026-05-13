export interface CareSection {
  title: string;
  items: string[];
}

export interface CareCategoryData {
  key: string;
  label: string;
  emoji: string;
  care: CareSection[];
}

export const CARE_GUIDE: CareCategoryData[] = [
  {
    key: "plushies",
    label: "plushies",
    emoji: "🧸",
    care: [
      {
        title: "washing tips",
        items: [
          "hand wash in cold water with mild detergent only",
          "do not machine wash — it can distort the shape",
          "gently squeeze out excess water, never wring or twist",
          "keep away from bleach or harsh chemicals",
        ],
      },
      {
        title: "drying & care",
        items: [
          "air dry flat on a clean towel away from direct sunlight",
          "do not tumble dry — heat can damage cotton yarn",
          "reshape gently while damp if needed",
          "once dry, fluff gently to restore the original shape",
        ],
      },
      {
        title: "storage tips",
        items: [
          "store in a cool, dry place away from moisture",
          "keep in a breathable cotton bag if storing long-term",
          "avoid plastic bags which can trap moisture",
          "keep away from direct sunlight to prevent fading",
        ],
      },
      {
        title: "lifespan & handling",
        items: [
          "with proper care, plushies can last several years",
          "not suitable for children under 3 (small parts)",
          "check and re-tighten safety eyes periodically",
          "spot clean minor stains with a damp cloth promptly",
        ],
      },
    ],
  },
  {
    key: "keychains",
    label: "keychains",
    emoji: "🔑",
    care: [
      {
        title: "cleaning tips",
        items: [
          "wipe with a slightly damp cloth to remove surface dirt",
          "avoid soaking in water — the metal ring can rust",
          "use a soft toothbrush for textured areas",
          "allow to air dry completely before attaching to keys",
        ],
      },
      {
        title: "daily use",
        items: [
          "keep away from sharp objects that can snag the yarn",
          "avoid exposure to excessive moisture or rain",
          "do not machine wash — always hand clean gently",
          "the charm is decorative; avoid heavy friction",
        ],
      },
      {
        title: "storage tips",
        items: [
          "store separately to prevent tangling with other items",
          "hang or lay flat — do not compress under heavy objects",
          "keep in a pouch when not in use for extra protection",
        ],
      },
      {
        title: "lifespan",
        items: [
          "with gentle use, keychains last 1–2 years+",
          "re-secure any loose yarn ends with a drop of fabric glue",
          "the metal ring can be replaced if it wears out",
        ],
      },
    ],
  },
  {
    key: "wearables",
    label: "wearables",
    emoji: "👗",
    care: [
      {
        title: "washing tips",
        items: [
          "hand wash in cool water with a gentle wool wash",
          "machine wash only on a delicate/wool cycle in a laundry bag",
          "use pH-neutral detergent — avoid fabric softener on wool blends",
          "wash dark and light colours separately",
        ],
      },
      {
        title: "drying & ironing",
        items: [
          "always air dry flat to maintain shape",
          "do not hang wearables — they can stretch under their own weight",
          "never tumble dry hats, gloves, or headbands",
          "if ironing is needed, use a pressing cloth on low steam",
        ],
      },
      {
        title: "sizing guide",
        items: [
          "hairband: one size — stretches to fit most head sizes (52–58 cm)",
          "bucket hat: one size — inner tie adjusts fit from 54–60 cm circumference",
          "fingerless gloves: one size fits most — adjustable ribbed cuffs accommodate most hand sizes",
          "bandana / daisy headband: one size fits all — flexible cotton blend",
          "all items can be made to a custom size on request — contact us via whatsapp",
        ],
      },
      {
        title: "lifespan & storage",
        items: [
          "store folded flat in a drawer or on a shelf",
          "cedar balls deter moths if storing wool-blend items long-term",
          "avoid hanging for long periods — can stretch the stitch",
          "with proper care, wearables remain in excellent condition for 2+ years",
        ],
      },
    ],
  },
  {
    key: "home-decor",
    label: "home decor",
    emoji: "🏡",
    care: [
      {
        title: "cleaning tips",
        items: [
          "dust lightly with a soft dry brush or lint roller",
          "spot clean with a barely damp cloth for marks",
          "coaster sets can be hand washed in cold water",
          "wall hangings should only be spot cleaned — do not submerge",
        ],
      },
      {
        title: "display & placement",
        items: [
          "keep away from direct sunlight to prevent colour fading",
          "wall hangings look best in low-humidity rooms",
          "the hanging plant holder should be checked monthly for wear",
          "heart pillow covers can be spot cleaned or hand washed gently",
        ],
      },
      {
        title: "storage tips",
        items: [
          "roll wall hangings gently for storage — never fold sharply",
          "store coaster sets stacked flat in a dry place",
          "wrap in tissue paper if storing items long-term",
        ],
      },
      {
        title: "lifespan",
        items: [
          "home decor items with gentle care last many years",
          "re-secure fringe or loose threads with a dab of fabric glue",
          "the driftwood dowel on the wall hanging can be wiped with a dry cloth",
        ],
      },
    ],
  },
  {
    key: "accessories",
    label: "accessories",
    emoji: "🎀",
    care: [
      {
        title: "cleaning tips",
        items: [
          "hand wash scrunchies in cool water with mild shampoo",
          "wipe phone charms and bag charms gently with a damp cloth",
          "bookmarks can be spot cleaned with a barely damp cloth",
          "allow all items to air dry fully before use",
        ],
      },
      {
        title: "daily use",
        items: [
          "scrunchies are gentle on hair — avoid excessive stretching",
          "keep phone charms away from water and heavy friction",
          "bookmarks are best kept inside books — not folded or bent",
          "pouches can be wiped inside and out with a dry cloth",
        ],
      },
      {
        title: "storage tips",
        items: [
          "store scrunchies on a scrunchie holder or in a pouch",
          "keep bag charms unclipped and hung when not in use",
          "store bookmarks flat between book pages or in a flat envelope",
          "keep mini pouches in a cool, dry place",
        ],
      },
      {
        title: "lifespan",
        items: [
          "most accessories last 1–3 years with everyday use",
          "the elastic in scrunchies can be replaced if it loses stretch",
          "lobster clasps on bag charms can be replaced by a jeweller",
          "cotton thread bookmarks are quite durable with gentle handling",
        ],
      },
    ],
  },
];
