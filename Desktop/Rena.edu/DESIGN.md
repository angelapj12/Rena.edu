# Global Design System & Guidelines

*For Cursor fine-tuning and Rena.edu revamp — high-end, premium feel.*

---

## Visual Tone

- **Modern editorial** — sophisticated, magazine-quality layouts
- **Calm, warm, professional** — no harsh contrasts or playful elements
- **Premium but restrained** — luxury through subtlety, not excess

---

## Color Palette

| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| **Base Dark** | `#0A2229` | Deep Obsidian Teal | Immersive, focused sections; massive footer; high-contrast text areas |
| **Base Light** | `#F2F0ED` | Warm Alabaster | Breathable, editorial, daylight sections; primary background |
| **Secondary Light** | `#E5E0DE` | Stone Grey | Subtle section transitions, borders, card backgrounds |
| **Accent** | `#CBA365` | Muted Brass / Champagne Gold | Use **very sparingly** — hover states, thin divider lines, micro-interaction highlights. Elevates teal/cream into luxury territory. |

**Tailwind / CSS variables:**
```css
--color-base-dark: #0A2229;
--color-base-light: #F2F0ED;
--color-secondary-light: #E5E0DE;
--color-accent: #CBA365;
```

---

## Typography Strategy

### Typography — Open Sans Throughout
- **Font:** Open Sans (single font for consistency)
- **Use:** Headings, body copy, quotes, UI text
- **Legibility:** Highly legible; keep line-height relaxed
- **Weight:** Regular (400) for editorial; Medium (500) for structural headings where needed

### Small Labels, Tags, Secondary Nav
- **Font:** Open Sans
- **Style:** All-caps with wide letter-spacing (`tracking-widest` in Tailwind)

### Quotes — Site-Wide Standard
- **Class:** `text-quote-lg` for large quotes; `text-quote` for smaller
- **Container:** Single `<blockquote>` element; no split spans or line-by-line wrappers
- **Line height:** `leading-loose` (EN) / `line-height: 1.65` (zh-TW — locale-specific for hierarchy and readability)
- **Multi-line:** Use `whitespace-pre-line` when quote content has `\n` line breaks
- **Example:** `<blockquote className="text-quote-lg text-base-dark w-full whitespace-pre-line">{t("quote")}</blockquote>`

### Typography Tokens Reference
| Class | Usage |
|-------|-------|
| `text-display` | Hero titles (homepage, mobile nav overlay) |
| `text-display-sm` | Sub-hero titles (Space page hero) |
| `text-h1` | Page titles |
| `text-h2` | Section titles |
| `text-h2-compact` | Form step titles, compact sections |
| `text-h3` | Subsection titles, accordion items |
| `text-quote-lg` | Large blockquotes |
| `text-quote` | Smaller blockquotes (footer slogan) |
| `text-body-lg` | Body copy, intro paragraphs |
| `text-body` | Standard body text |
| `text-lead` | Lead / intro paragraphs |
| `text-small` | Small UI text |

---

## Corners & Spacing

- **Cards:** `rounded-2xl`
- **Buttons:** `rounded-xl`
- **Inputs:** `rounded-lg`

---

## Layout (Full-Width Immersive)

- Content spans full viewport width
- Side margins: 24px (mobile) → 32px (tablet) → 48px (desktop) — minimal, MyHealthPrac-style
- Use `px-6 md:px-8 lg:px-12` for consistent content inset

### MyHealthPrac-Inspired Principles

- **Full-width sections with minimal margins** — Sections span the viewport; horizontal padding is minimal (`px-6 md:px-8 lg:px-12`) for an edge-to-edge feel
- **Larger typography** — Headlines are large for impact; body text is comfortably above standard web size (`text-body-lg`, `text-h2` scale)
- **Generous vertical spacing** — Substantial gaps between label, title, and body; line-height is relaxed; use `mb-16 md:mb-20` for title-to-content, `gap-8` for paragraph stacks
- **Intentional alignment variation** — Left for hero and main content; center for CTAs and feature blocks; right for secondary actions (e.g. Footer "For Students" / "For Instructors" columns)
- **Content-heavy sections** — Clear hierarchy, grids, dashed dividers between accordion items; avoid visual overwhelm

---

## GSAP Micro-Interactions & "Anti-Gravity" Rules

### Parallax / Anti-Gravity (Images)
- Wrap images in **overflow-hidden** containers
- Inner `<img>` should have `scale: 1.15` (slightly larger than container)
- Use **GSAP ScrollTrigger** to subtly translate image up/down on scroll
- **Feel:** Floating, weightless, "anti-gravity"

### Text Reveals
- Use **GSAP SplitText** (or equivalent) for line-by-line reveals
- **Animation:** Mask-reveal from bottom up
  - Start: `y: 50`, `opacity: 0`
  - Stagger: `0.1` between lines
  - Ease: `"power3.out"`
  - Duration: `1.2s`
- **Rule:** No fast, snappy animations — slow, buttery motion only

### Hover States — "Magnetic" Buttons
- When hovering over a button, the **text** and **button boundary** subtly pull toward the cursor
- Implement via GSAP or custom JS for magnetic attraction effect
- Keep movement subtle; avoid jarring jumps

---

## Motion Principles

- **Subtle fades and transitions** — no playful or bouncy animations
- **Slow, buttery ease** — prefer `power3.out`, `power2.out` over linear or snappy
- **Restraint** — luxury is in what you don’t animate, not in over-animation

---

## Implementation Checklist

- [x] Open Sans used throughout for consistency
- [ ] Apply new color palette (Base Dark, Base Light, Secondary Light, Accent)
- [ ] Add GSAP + ScrollTrigger + SplitText
- [ ] Implement anti-gravity image parallax
- [ ] Implement text mask-reveals
- [ ] Implement magnetic button hover states
- [ ] Use accent (#CBA365) sparingly for micro-interactions
