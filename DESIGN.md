# Design Brief: The Cozy Hook

## Purpose
Premium handmade crochet e-commerce boutique — intimate, crafted, uncluttered. Customers discover handmade products in a space that feels as thoughtfully made as the items themselves.

## Aesthetic
Pinterest-inspired editorial minimalism: abundant white space, generous rounded corners, soft shadows, warm tactile energy. Refined without formality. Every UI element whispers intentionality.

## Palette

| Token | OKLCH | Role | Emotion |
|-------|-------|------|---------|
| Cream | 0.98 0.02 87 | Background, primary surface | Warm welcome, luxury |
| Dusty Rose | 0.65 0.16 344 | Primary CTA, highlights, accents | Handmade warmth, emotion |
| Sage Green | 0.60 0.12 126 | Secondary accent, category tags | Natural, calming |
| Warm Beige | 0.92 0.02 87 | Cards, elevated surfaces | Soft depth |
| Dark Grey | 0.25 0.04 256 | Text, foreground | High contrast, readability |

## Typography

| Layer | Font | Role | Scale |
|-------|------|------|-------|
| Display | Fraunces (serif) | H1–H3, brand identity | 48–64px (mobile: 32–40px) |
| Body | Nunito (sans-serif) | P, labels, buttons, nav | 14–18px |
| Mono | System | Code only | 12–14px |

## Structural Zones

| Zone | Background | Border | Shadow | Purpose |
|------|------------|--------|--------|---------|
| Header | Cream (--background) | Bottom 1px soft border | None | Navigation, logo, minimal visual weight |
| Hero | Cream with soft overlay | None | None | Full-screen focal point, centered brand |
| Cards | Warm Beige (--card) | None | boutique-lg | Product showcase, elevated surface |
| Section | Cream | None | None | Clean content separation via spacing |
| Footer | Muted (0.92) | Top soft border | None | Minimal brand presence |

## Component Patterns

- **Buttons**: Rounded 24px, dusty rose background on cream. Hover: scale 1.02, shadow-boutique. Focus: ring offset 2px.
- **Product Cards**: Rounded 20px, warm beige, boutique-lg shadow. Image top (300px height), content below. Hover: shadow-boutique-lg, scale 1.01.
- **Input Fields**: Rounded 16px, soft border, focus ring dusty rose. Padding 12px.
- **Category Tags**: Rounded 32px, muted background, dark text. Hover: dusty rose background.
- **Links**: Underline on hover, dusty rose color. No underline default.

## Motion & Interaction

- **Transition Standard**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Page Enter**: fade-in 0.4s + slide-up 0.3s stagger on cards
- **Hover**: scale 1.01–1.02, shadow escalation, no bounce
- **Loading**: Soft pulse on product cards, never harsh spinner

## Spacing & Rhythm

- **Outer**: 2rem mobile, 3rem tablet, 4rem desktop
- **Inner Card**: 1.5rem padding
- **Gap (grid)**: 1.5rem
- **Vertical Section**: 4rem between major sections
- **Line Height**: 1.6 body, 1.2 display

## Constraints

- **Never**: Instagram branding, cluttered layouts, harsh black/white contrast, generic shadows
- **Always**: White space breathing room, soft rounded radii, smooth transitions, emotional warmth

## Signature Detail

Soft shadow hierarchy — boutique-soft (micro), boutique (default cards), boutique-lg (elevated interactive elements) — creates depth without visual noise. Each shadow's dark grey opacity is calibrated to feel handmade, never mechanical.
