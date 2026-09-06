# Design Brief: The Cozy Hook

## Purpose
Premium handmade crochet e-commerce boutique — intimate, crafted, uncluttered. Customers discover handmade products in a space that feels as thoughtfully made as the items themselves.

## Aesthetic
Pinterest-inspired editorial minimalism: abundant white space, generous rounded corners, soft shadows, warm tactile energy. Refined without formality. Every UI element whispers intentionality.

## Differentiation
Playful pastel micro-interactions (heart cursor trail, petal burst) layered onto a calm editorial boutique — craft warmth meets delightful surprise without ever feeling gimmicky.

## Palette

| Token | OKLCH | Role | Emotion |
|-------|-------|------|---------|
| Cream | 0.98 0.02 87 | Background, primary surface | Warm welcome, luxury |
| Dusty Rose | 0.65 0.16 344 | Primary CTA, highlights, accents | Handmade warmth, emotion |
| Sage Green | 0.60 0.12 126 | Secondary accent, category tags | Natural, calming |
| Warm Beige | 0.92 0.02 87 | Cards, elevated surfaces | Soft depth |
| Dark Grey | 0.25 0.04 256 | Text, foreground | High contrast, readability |
| Rose Soft | 0.82 0.06 5 | Heart trail, petals, ribbons | Playful pastel |
| Sage Soft | 0.82 0.05 145 | Heart trail alt, banners, care guide | Calm pastel |
| Success | 0.62 0.09 145 | Loyalty points, confirmations | Reassuring |
| Warning | 0.78 0.08 75 | Live "viewing" indicator | Gentle attention |

## Typography

| Layer | Font | Role | Scale |
|-------|------|------|-------|
| Display | Playfair Display (serif) | H1–H3, brand identity | 48–64px (mobile: 32–40px) |
| Body | Poppins (sans-serif) | P, labels, buttons, nav | 14–18px |
| Mono | System | Code only | 12–14px |

## Elevation & Depth
Soft shadow hierarchy — boutique-soft (micro), boutique (default cards), boutique-lg (elevated interactive), plus ribbon & loyalty-soft for feature chips — creates depth without visual noise.

## Structural Zones

| Zone | Background | Border | Shadow | Purpose |
|------|------------|--------|--------|---------|
| Header | Cream (--background) | Bottom 1px soft border | None | Navigation, logo, minimal visual weight |
| Hero | Cream with soft overlay | None | None | Full-screen focal point, centered brand |
| Cards | Warm Beige (--card) | None | boutique-lg | Product showcase, elevated surface |
| Section | Cream | None | None | Clean content separation via spacing |
| Footer | Muted (0.92) | Top soft border | None | Minimal brand presence |

## Spacing & Rhythm
- **Outer**: 2rem mobile, 3rem tablet, 4rem desktop
- **Inner Card**: 1.5rem padding
- **Gap (grid)**: 1.5rem
- **Vertical Section**: 4rem between major sections
- **Line Height**: 1.6 body, 1.2 display

## Component Patterns

- **Buttons**: Rounded 24px, dusty rose background on cream. Hover: scale 1.02, shadow-boutique. Focus: ring offset 2px.
- **Product Cards**: Rounded 20px, warm beige, boutique-lg shadow. Image top (300px height), content below. Hover: shadow-boutique-lg, scale 1.01.
- **Input Fields**: Rounded 16px, soft border, focus ring dusty rose. Padding 12px.
- **Category Tags**: Rounded 32px, muted background, dark text. Hover: dusty rose background.
- **Links**: Underline on hover, dusty rose color. No underline default.
- **Heart Trail**: Fixed particle, dusty rose/sage pastel, floats up 46px fading out over 1.1s. pointer-events none, z-index 60.
- **Petal Burst**: Absolute pastel circles/petals bursting outward on add-to-cart, 1s ease-out, per-particle --tx/--ty/--tr.
- **New Arrivals Ribbon**: Rotated -45deg pastel rose ribbon, top-left, shimmer shadow 3s.
- **Live Viewing**: Inline pill with pulsing sage dot (live-pulse 1.6s), muted text.
- **Loyalty Chip**: Sage pill with white shimmer sweep (loyalty-shimmer 3.5s).
- **Printable Card**: White surface, 1px border, display headings, bordered table for care/size guide.

## Motion & Interaction

- **Transition Standard**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Page Enter**: fade-in 0.4s + slide-up 0.3s stagger on cards
- **Hover**: scale 1.01–1.02, shadow escalation, no bounce
- **Loading**: Soft pulse on product cards, never harsh spinner
- **Decorative**: heart-trail (cursor), petal-burst (add-to-cart), ribbon-shimmer, live-pulse, loyalty-shimmer — all pastel, gentle, non-intrusive

## Constraints

- **Never**: Instagram branding, cluttered layouts, harsh black/white contrast, generic shadows
- **Always**: White space breathing room, soft rounded radii, smooth transitions, emotional warmth
- **Keep existing palette, fonts, animations, pages, cart, WhatsApp checkout, chatbot, responsive behavior exactly as-is** — only extend with new tokens/animations.

## Signature Detail

Soft shadow hierarchy plus a family of pastel micro-animations (heart trail, petal burst, shimmer ribbons) that make the boutique feel alive and handmade — delight without breaking the calm editorial calm.

## New Feature Zones

| Feature | Surface | Accent | Motion |
|---------|---------|--------|--------|
| Cursor heart trail | Fixed overlay | Rose/sage pastel | heart-trail 1.1s |
| Add-to-cart confetti | Absolute burst | Rose/sage pastel | petal-burst 1s |
| Category banners | Soft pastel fill | Rose/sage/beige | fade-in |
| New arrivals ribbon | Rotated rose ribbon | Rose pastel | ribbon-shimmer 3s |
| Size/fit guide | Printable card + table | Beige borders | — |
| Care guide / product card | Printable card | Beige borders | print rules |
| Loyalty points | Sage chip | Sage pastel | loyalty-shimmer 3.5s |
| Live viewing | Inline pill | Sage dot | live-pulse 1.6s |
