# Font & Context Hierarchy Design Guideline

*Canonical typography reference for Rena.edu — premium, high-conversion web design.*

---

## 1. Design Principles

- **Modern editorial** — Sophisticated, magazine-quality layouts. Typography should feel curated, not templated.
- **Premium but restrained** — Luxury through subtlety. Avoid excess weight, size, or decoration.
- **Clear hierarchy supports conversion** — Primary CTA > section value proposition > supporting detail. The eye should flow naturally to the next action.
- **Calm, warm, professional** — No harsh contrasts or playful elements. Typography reinforces trust and credibility.

---

## 2. Type Scale (Tailwind-based)

Use this strict scale. Do not deviate without design approval.

| Level | Use Case | Tailwind Classes | Responsive |
|-------|----------|------------------|------------|
| **Display** | Hero headline, full-bleed statements | `text-5xl md:text-6xl lg:text-7xl` | Mobile → Desktop |
| **H1** | Page hero title | `text-5xl md:text-6xl` | — |
| **H2** | Section title | `text-3xl md:text-4xl` | — |
| **H2 Compact** | Section title (narrow layouts) | `text-2xl md:text-3xl` | — |
| **H3** | Card title, subsection | `text-xl md:text-2xl` | — |
| **Quote** | Blockquote, editorial pullquote | `text-2xl md:text-3xl lg:text-4xl` or `text-3xl md:text-4xl lg:text-5xl` | Scale with viewport |
| **Lead** | Intro paragraph, hero subtitle | `text-lg md:text-xl` | — |
| **Body** | Default body copy | `text-base` | — |
| **Body Large** | Emphasized body (editorial) | `text-base md:text-lg` | — |
| **Small** | Supporting text, captions, list items | `text-sm` | — |
| **Micro** | Labels, nav, metadata | `text-xs` | — |

**Rule:** Use only these sizes. No `text-[11px]`, `text-7xl` (except Display), or arbitrary values.

---

## 3. Font Assignment Rules

### Playfair Display (serif) — `font-serif`

| Use | Examples |
|-----|----------|
| Hero headline (H1) | "Teach. Build. Belong." |
| Section titles (H2) | "The Renaissance Spirit", "Access Options" |
| Card titles in editorial sections | "Run a Weekly Class", "Flexible Access" |
| Quotes and pullquotes | Blockquotes, mission statements |
| Large editorial statements | Mission, vision lines |
| Brand / logo text | Nav brand "RENAISSANCE" |

**Italic rule:** Use `italic` for quotes, editorial statements, and emotional copy. Use `font-normal` (no italic) for structural headings (section titles, card titles that are functional).

### Open Sans (sans) — `font-sans`

| Use | Examples |
|-----|----------|
| Body copy | Paragraphs, list items |
| Section labels (pills) | "WHO IT'S FOR", "ACCESS OPTIONS" |
| Navigation links | Header nav, footer links |
| Buttons | All CTA buttons |
| Form labels and inputs | Booking flow, inputs |
| Supporting / caption text | "Typical users: ...", helper text |
| Footer slogan | Can use sans at large size for structural contrast |

**Rule:** When in doubt, body and UI = sans. Editorial and emotional = serif.

---

## 4. Weight Rules

| Weight | Tailwind | Use |
|--------|----------|-----|
| **Normal (400)** | `font-normal` | Default for editorial. Headings, quotes, body. Breathable, premium. |
| **Medium (500)** | `font-medium` | Structural headings that need emphasis. Form labels. Card titles in functional contexts. |
| **Semibold (600)** | `font-semibold` | Hero H1 only, or primary conversion moment (e.g. confirmation title). Use sparingly. |

**Rule:** Avoid `font-bold` (700). Semibold is the ceiling for marketing pages.

---

## 5. Context Hierarchy (by Section Type)

### Hero
```
[Label — optional]     → Micro, sans, uppercase
H1                    → Display or H1, serif, normal or italic
Subtitle / description → Lead, sans
CTA button(s)         → Small, sans, uppercase
```

### Editorial Section (e.g. Renaissance Spirit, Our Vision)
```
Label                 → Micro, sans, pill style
H2                    → H2 or H2 Compact, serif, normal
Quote or lead         → Quote or Lead, serif italic
Body                  → Body or Body Large, sans
Link                  → Small, sans
```

### Card Grid (e.g. Access Options, Use Cases)
```
Label                 → Micro, sans, pill style
H2                    → H2, serif, normal
Card H3               → H3, serif, normal or italic (editorial vs functional)
Card body             → Body or Small, sans
Card link             → Small, sans
```

### Form / Booking
```
H2                    → H2 Compact, serif, medium
Label                 → Small, sans, medium
Input                 → Base, sans
Helper text           → Small, sans, tertiary opacity
```

### CTA Section
```
Label                 → Micro, sans, pill style
H2                    → H2 Compact, serif, medium
Buttons               → Small, sans, medium, uppercase
```

---

## 6. Color & Opacity Rules

### Text Color Tokens

| Context | Token | Usage |
|---------|-------|-------|
| Light background | `text-base-dark` | Primary text. **Never** use `#2B2B2B` — use the design token. |
| Dark background | `text-base-light` | Primary text on dark sections |
| Secondary | `text-base-dark/80` or `text-base-light/80` | Supporting text |
| Tertiary | `text-base-dark/60` or `text-base-light/70` | Captions, metadata, "Typical users" notes |

### Hierarchy via Opacity

- **Primary:** 100% (no opacity modifier)
- **Secondary:** 80–90% (`/80`, `/90`)
- **Tertiary:** 60–70% (`/60`, `/70`)

**Rule:** Use design tokens. No hardcoded hex for text (e.g. `text-[#2B2B2B]`).

---

## 7. Line Height & Letter Spacing

### Line Height (Leading)

| Element | Tailwind | Computed | Use |
|---------|----------|----------|-----|
| Headings (H1, H2, H3) | `leading-tight` | 1.25 | Tight for impact; prevents large type from feeling loose |
| Quotes | `leading-tight` | 1.25 | Same as headings |
| Body | `leading-relaxed` | 1.625 | Comfortable reading; default for paragraphs |
| Lead | `leading-relaxed` | 1.625 | Same as body |
| Small / Micro | Default | 1.5 | `leading-normal`; adequate for short text |
| Lists | `leading-relaxed` | 1.625 | Match body for list items |

**Rule:** Use only `leading-tight` or `leading-relaxed`. No `leading-none`, `leading-snug`, or `leading-loose` without approval.

### Letter Spacing (Tracking)

| Element | Tailwind | Use |
|---------|----------|-----|
| Section labels (pills) | `tracking-widest` | 0.1em; uppercase labels |
| Uppercase buttons | `tracking-[0.2em]` | Primary CTAs |
| Nav links (uppercase) | `tracking-[0.2em]` | Header, footer nav |
| Small uppercase links | `tracking-[0.15em]` | Secondary links (e.g. "EXPLORE THE SPACE") |
| Default text | (none) | Body, headings — no letter-spacing |

**Rule:** Apply tracking only to uppercase or all-caps text.

---

## 8. Vertical Rhythm & Element Spacing

Use this spacing scale consistently. Base unit: 4px (Tailwind `1` = 4px).

### Typography Stack Spacing (margin-bottom)

| Relationship | Tailwind | Pixels | Use |
|--------------|----------|--------|-----|
| Label → Heading | `mb-6` | 24px | Section label to H2; **always** `mb-6` |
| H1 → Subtitle | `mb-6` | 24px | Hero title to description |
| H2 → Lead/Quote | `mb-6` or `mb-8` | 24–32px | Section title to first content |
| H2 → Body (no lead) | `mb-4` | 16px | Compact sections |
| H3 → Body | `mb-2` or `mb-3` | 8–12px | Card title to description |
| Quote → Body | `mb-6` or `mb-8` | 24–32px | Blockquote to following text |
| Body → Body (paragraphs) | `mb-4` | 16px | Between paragraphs |
| Body → Link | `mt-4` or `mt-6` | 16–24px | Content to CTA link |
| Body → CTA button | `mb-8` or `mt-8` | 32px | Section content to primary button |

### Paragraph & List Spacing

| Context | Tailwind | Use |
|---------|----------|-----|
| Paragraph stack | `space-y-4` or `gap-4` | Multiple body paragraphs |
| List items | `space-y-2` or `space-y-3` | Bullet lists, feature lists |
| Card grid items | `gap-6` or `gap-8` | Between cards |
| Form fields | `space-y-4` or `gap-4` | Label + input groups |

### Section-Level Spacing

| Context | Tailwind | Use |
|---------|----------|-----|
| Section padding (vertical) | `py-20 md:py-28` | Standard section |
| Section padding (horizontal) | `px-12 md:px-20 lg:px-28` | Content inset (from DESIGN.md) |
| Between major blocks | `gap-12 lg:gap-16` | Two-column layouts |

### Standard Values (Do Not Deviate)

| Token | Value | Use |
|-------|-------|-----|
| `mb-2` | 8px | H3 to body, tight inline |
| `mb-3` | 12px | Card title to body |
| `mb-4` | 16px | H2 compact, paragraphs, form groups |
| `mb-6` | 24px | **Label to heading** (standard), H1 to subtitle |
| `mb-8` | 32px | H2 to lead, body to CTA |
| `mb-10` | 40px | Quote to body |
| `mb-12` | 48px | Section header to content (centered) |
| `mb-16` | 64px | Large section breaks |

**Rule:** Label below section title always uses `mb-6`. Fix any `mb-4` on labels.

---

## 9. Implementation Reference Table

| Element | Font | Size | Weight | Leading | Spacing | Use Case |
|---------|------|------|--------|---------|---------|----------|
| Hero H1 | serif | Display / H1 | normal | tight | mb-6 to subtitle | Page hero |
| Section H2 | serif | H2 or H2 Compact | normal | tight | mb-4 to mb-8 | Section title |
| Card H3 | serif | H3 | normal | tight | mb-2 or mb-3 | Card title |
| Quote | serif | Quote | normal | tight | mb-6 to mb-10 | Blockquote |
| Lead | sans | Lead | normal | relaxed | mb-4 to mb-8 | Hero subtitle, intro |
| Body | sans | Body | normal | relaxed | mb-4 between | Paragraphs |
| Body Large | sans | Body Large | normal | relaxed | mb-4 between | Emphasized body |
| Small | sans | Small | normal | relaxed | — | Supporting text |
| Label (pill) | sans | Micro | medium | normal | **mb-6** to heading | Section label |
| Button | sans | Small | medium | normal | — | CTA |
| Nav link | sans | Micro | normal | normal | — | Navigation |
| Form label | sans | Small | medium | normal | mb-2 to input | Input label |

---

## 10. Migration Notes

### Files / Components to Update (Future Pass)

Apply this guideline to correct deviations:

| File | Current Issue | Target |
|------|---------------|--------|
| `space/page.tsx` | H1 `font-semibold`, `text-[#2B2B2B]` | H1 `font-normal`, `text-base-dark` |
| `space/page.tsx` | Closing note `text-[#2B2B2B]/80` | `text-base-dark/80` |
| `HeroSection.tsx` | H1 `font-normal italic` — OK | Align with Space hero choice (pick one) |
| `UseCasesAccordion.tsx` | H2 `font-medium`, `text-4xl` | H2 `font-normal`, `text-3xl md:text-4xl` |
| `page.tsx` (CTA) | H2 `font-medium` | H2 `font-normal` or keep medium per CTA rule |
| `Header.tsx` | Nav `text-[11px]` | `text-xs` |
| `Footer.tsx` | Slogan `font-sans` at large size | Consider `font-serif` for premium; or keep sans per guideline |
| `booking/*` | `text-[#2B2B2B]` throughout | `text-base-dark` |
| `not-found.tsx`, `error.tsx` | `text-[#2B2B2B]` | `text-base-dark` |
| `RenaissanceSpirit.tsx` | Label `mb-4` | Standardize to `mb-6` for labels |
| `space/page.tsx` (Location) | Label `mb-4` | `mb-6` |

### Recommendation: Typography Utilities

Add Tailwind `@layer components` utilities in `globals.css` for consistency:

```css
@layer components {
  .text-display { @apply text-5xl md:text-6xl lg:text-7xl font-serif font-normal italic leading-tight; }
  .text-h1 { @apply text-5xl md:text-6xl font-serif font-normal leading-tight; }
  .text-h2 { @apply text-3xl md:text-4xl font-serif font-normal leading-tight; }
  .text-h2-compact { @apply text-2xl md:text-3xl font-serif font-normal leading-tight; }
  .text-h3 { @apply text-xl md:text-2xl font-serif font-normal leading-tight; }
  .text-quote { @apply text-2xl md:text-3xl lg:text-4xl font-serif font-normal italic leading-tight; }
  .text-lead { @apply text-lg md:text-xl font-sans leading-relaxed; }
  .text-body { @apply text-base font-sans leading-relaxed; }
  .text-body-lg { @apply text-base md:text-lg font-sans leading-relaxed; }
  .text-small { @apply text-sm font-sans leading-relaxed; }
  .text-label { @apply text-xs font-sans font-medium tracking-widest; }
}
```

Use these classes instead of ad-hoc combinations to enforce the system.

---

## 11. Consistency Checklist (Production)

Before shipping, verify:

### Typography
- [ ] No hardcoded `#2B2B2B` — use `text-base-dark`
- [ ] No `text-[11px]` — use `text-xs`
- [ ] All section labels use `mb-6` (not `mb-4`)
- [ ] Headings use `leading-tight`; body uses `leading-relaxed`
- [ ] H2 weights: `font-normal` for editorial, `font-medium` only for CTA/form sections

### Spacing
- [ ] Label → H2: `mb-6`
- [ ] Section padding: `py-20 md:py-28` and `px-12 md:px-20 lg:px-28`
- [ ] Paragraph stacks: `space-y-4` or `gap-4`
- [ ] Card grids: `gap-6` or `gap-8`

### Font Assignment
- [ ] Serif for: hero, section titles, quotes, card titles (editorial)
- [ ] Sans for: body, labels, buttons, nav, forms

### Audit Command
Run a codebase search for these anti-patterns and fix:
- `text-[#2B2B2B]` → `text-base-dark`
- `mb-4` on label spans → `mb-6`
- `text-[11px]` → `text-xs`

---

## Quick Reference Card

```
DISPLAY   → text-5xl md:text-6xl lg:text-7xl | serif | normal | italic | leading-tight
H1        → text-5xl md:text-6xl | serif | normal | leading-tight
H2        → text-3xl md:text-4xl | serif | normal | leading-tight
H2 compact→ text-2xl md:text-3xl | serif | normal | leading-tight
H3        → text-xl md:text-2xl | serif | normal | leading-tight
QUOTE     → text-2xl–5xl | serif | normal | italic | leading-tight
LEAD      → text-lg md:text-xl | sans | normal | leading-relaxed
BODY      → text-base | sans | normal | leading-relaxed
SMALL     → text-sm | sans | normal | leading-relaxed
LABEL     → text-xs | sans | medium | tracking-widest | mb-6
BUTTON    → text-sm | sans | medium | tracking-[0.2em]

SPACING   → Label→H2: mb-6 | H2→content: mb-4–mb-8 | Paragraphs: space-y-4
```

---

*This guideline complements [DESIGN.md](DESIGN.md). Update both when the design system evolves. Version: 1.0*
