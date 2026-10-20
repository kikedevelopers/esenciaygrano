---
name: Esencia & Grano
description: La Despensa de la 21. A bulk pantry in Ibagué, lit like a product launch.
colors:
  night: "oklch(0.14 0.035 315)"
  night-2: "oklch(0.18 0.055 312)"
  night-3: "oklch(0.23 0.075 308)"
  night-line: "oklch(0.96 0.012 70 / 0.12)"
  ivory: "oklch(0.965 0.012 70)"
  ivory-dim: "oklch(0.82 0.03 310)"
  ivory-mute: "oklch(0.7 0.04 310)"
  gold: "oklch(0.79 0.135 76)"
  gold-strong: "oklch(0.72 0.14 70)"
  gold-ink: "oklch(0.2 0.06 312)"
  magenta: "oklch(0.6 0.24 356)"
  violet: "oklch(0.52 0.2 302)"
  olive: "oklch(0.62 0.12 128)"
  paper: "oklch(0.975 0.01 310)"
  paper-2: "oklch(0.94 0.018 310)"
  ink: "oklch(0.21 0.055 312)"
  ink-dim: "oklch(0.43 0.05 310)"
typography:
  mega:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.4rem, 10.5vw, 10rem)"
    fontWeight: 620
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  display:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.4vw, 5.75rem)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.032em"
  lede:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)"
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "'ss01', 'cv11'"
  label:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.01em"
rounded:
  pill: "999px"
  control-group: "1rem"
  ticket: "1.75rem"
  chapter-card: "2rem"
spacing:
  gutter: "1.25rem"
  container: "72rem"
  chapter-y: "6rem"
  chapter-y-sm: "8rem"
components:
  pill-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.pill}"
    height: "3.25rem"
    padding: "0 1.625rem"
  pill-ghost:
    textColor: "{colors.ivory}"
    rounded: "{rounded.pill}"
    height: "3.25rem"
    padding: "0 1.375rem"
  chip-product-night:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.pill}"
    height: "2.5rem"
    padding: "0 1rem 0 0.75rem"
  chip-product-paper:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "2.75rem"
    padding: "0 1rem 0 0.75rem"
  chip-product-selected:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.pill}"
  input-paper:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "3rem"
    padding: "0 1.25rem"
  ticket-card:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.ticket}"
    padding: "1.75rem"
  family-card:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.chapter-card}"
    padding: "3.5rem"
  nav-bar:
    textColor: "{colors.ivory}"
    rounded: "{rounded.pill}"
    height: "4rem"
---

# Design System: Esencia & Grano

## Overview

**Creative North Star: "The Pantry at Night, Under One Light"**

The ingredient is the hero, lit like a product launch. The ground is an aubergine night; a single warm gold key light falls across it and is the only warm source on the page, which is why the same gold is also the primary action. The page moves as cinematic chapters: long dark chapters for showing (still lifes, the manifesto, the store) alternate with quiet lilac-white paper chapters for reading and doing (audiences, the order builder, the process). Every chapter ends in a path to WhatsApp.

Density is low and the scale is large: display type at 6 to 10vw, generous chapter padding, one idea per viewport. Photography is never boxed; it bleeds under text and dissolves into the night through masks. The current stills are illustrative AI imagery standing in for the owner's real photographs; real photos replace them under the same treatment, and none may be presented as the store itself. Motion is scroll-linked and calm (scale, opacity, word-by-word light, parallax), with strong ease-out curves and no bounce. The rejected world, confirmed in the direction contract, is the cream-and-kraft organic grocery and the row of equal category cards.

**Key Characteristics:**
- Aubergine night ground, one gold key light, ivory text in three tiers.
- Night chapters for showing, paper chapters for reading and ordering.
- Geist at display scale with negative tracking that tightens as size grows, floored at -0.04em.
- Pill-shaped controls everywhere; hairline rules instead of boxes.
- Images dissolve into the dark; they never sit in a framed rectangle.
- Scroll-linked chapters with reduced-motion equivalents for every effect.

## Colors

A dark, warm-violet palette derived from the logo: one light, one live state, one process accent, and two neutral families (night and paper).

### Primary
- **Key-Light Gold** (`gold`): the only warm light in the world and the primary action. Fills the WhatsApp pills (`pill-gold`, nav order pill, mobile order bar), colours the golden words in headlines ("A granel.", "en la 21.", the lit words of the manifesto), the ampersand in the wordmark, contact icons, focus rings, caret and selection tint. Also appears at 12 to 14% alpha as the radial key-light glow behind dark chapters.
- **Deep Gold** (`gold-strong`): reserved darker step of the same light; defined but rarely needed.
- **Gold Ink** (`gold-ink`): the text colour on gold surfaces. Never put ivory on gold.

### Secondary
- **Live Magenta** (`magenta`): live or selected state only. A selected product chip turns magenta with ivory text and a check icon; the spice-dust canvas carries a 20% minority of magenta-hued motes. Nothing static or decorative is magenta.

### Tertiary
- **Process Olive** (`olive`): the process timeline only. The olive line that draws itself with scroll across "Así de simple" and the olive dots of each step.
- **Night Violet** (`violet`): atmosphere, never an element colour. It exists only as the cool counter-glow (18 to 20% alpha) in the hero and `key-light` radial gradients.

### Neutral
- **Aubergine Night** (`night`): page ground, hero, essence, FAQ, footer; the colour every chapter edge fades back into.
- **Night Raised** (`night-2`): family cards and unselected chips on night.
- **Night High** (`night-3`): hover on night chips; shadcn muted/secondary surfaces.
- **Night Hairline** (`night-line`): ivory at 12% alpha for every rule, divider and ghost outline on night. Raised to 30% under `prefers-contrast: more`.
- **Ivory** (`ivory`): headlines and primary text on night.
- **Ivory Dim** (`ivory-dim`): body copy, ledes, nav links on night.
- **Ivory Mute** (`ivory-mute`): the second, quieter clause of a headline ("Una sola obsesión por el sabor."), meta labels, icons at rest. Both dim and mute brighten under `prefers-contrast: more`.
- **Lilac Paper** (`paper`) and **Paper Shade** (`paper-2`): ground of paper chapters and the inset well of the grams segmented control / empty ticket.
- **Aubergine Ink** (`ink`) and **Ink Dim** (`ink-dim`): primary and secondary text on paper; the second-clause tone on paper headlines.

### Named Rules
**The One Light Rule.** Gold is the only warm colour and it means "light" or "act". If it is not lighting a word or inviting a WhatsApp order, it is not gold.

**The Live Magenta Rule.** Magenta marks something the visitor has just made true (a selected product). It never decorates.

**The Three Ivories Rule.** Text on night uses exactly three tiers: ivory for what you read first, ivory-dim for what you read next, ivory-mute for the aside. A headline's second clause drops a tier instead of changing colour.

## Typography

**Display Font:** Geist Variable (with ui-sans-serif, system-ui)
**Body Font:** Geist Variable, with stylistic set `ss01` and `cv11` enabled on body
**Label Font:** Geist Variable

**Character:** one engineered grotesque doing everything, the way a product launch does: heavy and tightly tracked at display scale, open and calm at reading size. Headings are balanced (`text-wrap: balance`), paragraphs pretty-wrapped.

### Hierarchy
- **Mega** (620, clamp 3.4rem to 10rem, 0.9): the closing statement ("Te esperamos en la 21."). The hero headline uses the same weight, leading and tracking at a slightly smaller clamp (3.75rem to 8.75rem).
- **Display** (600, clamp 2.6rem to 5.75rem, 0.96): every chapter heading. Usually two clauses, the second one a tier quieter.
- **Title** (600, clamp 1.9rem to 3.25rem, 1.02, -0.032em): family names inside pantry cards.
- **Manifesto / quote** (500 to 600, clamp 1.4rem to 4rem, 1.08 to 1.25, -0.03 to -0.035em): the word-lit manifesto and the essence quote.
- **Item heading** (600, 1.25 to 1.5rem, -0.025 to -0.03em): audience names, process steps, essence points, the ticket title.
- **Lede** (400, clamp 1.125rem to 1.375rem, 1.5): the paragraph under a chapter heading, capped around 34 to 36rem.
- **Body** (400, 1rem to 1.125rem, relaxed leading): supporting copy, max-w-xs to max-w-2xl.
- **Label** (500, 0.8125rem, +0.01em, sentence case): fieldset legends and form labels in the order builder. Not uppercase, not a kicker.

### Named Rules
**The Tracking Floor Rule.** Tracking tightens as size grows (-0.01em lede, -0.02em small headings, -0.03em titles, -0.04em display and mega) and never goes past -0.04em.

**The Two-Clause Headline Rule.** Chapter headings are a statement and a quieter second clause in the next text tier, not a headline plus a kicker.

## Layout

A single centred column with a 72rem (`max-w-6xl`) container and 1.25rem side gutters, inside full-bleed chapters. Chapters pad 6rem vertically, 8 to 9rem from `sm` up. Headings reveal first, then content arrives 3.5 to 5rem below.

Two chapter kinds alternate: **night** (plain `night`, or `key-light` with its gold and violet radial glows and top/bottom fades back to night so chapters meet without seams) and **paper** (`chapter-paper`: paper ground, ink text). Current rhythm: hero (night) → manifesto (key-light) → pantry (night) → audiences and order builder (paper) → essence (night) → process (paper) → FAQ (night) → visit (key-light) → footer (night).

Sticky chapters carry the cinematic moments: the hero is 170svh with a 100svh sticky stage; the manifesto is 200svh. The pantry family cards stack as sticky sheets on desktop, each offset 1.25rem below the previous (top 5.5rem + i × 1.25rem). Two-column splits appear at `lg` (1024px): heading column against content (FAQ 0.8fr/1.2fr, audiences 0.9fr/1.1fr, order builder 1fr/25rem with a sticky ticket). Three-up grids appear at `md` for essence points and process steps. On phones a fixed gold order bar sits at the bottom with safe-area padding.

## Elevation & Depth

Depth is light and atmosphere, not stacked shadow. On night, surfaces separate by tone (`night` → `night-2`) and a 1px hairline ring (`0 0 0 1px night-line`), with deep, soft, negative-spread shadows that read as darkness falling below an object rather than a lift. On paper, objects lift with a whisper shadow tinted with ink. Translucent materials carry the nav: `material-night` (night at 72% with 20px blur, 160% saturate) over dark chapters, `tone-paper` (paper at 82%, same blur, ink hairline) when the bar sits over a paper chapter. Under `prefers-reduced-transparency` both become opaque `night` / `paper`.

### Shadow Vocabulary
- **Hairline ring** (`box-shadow: 0 0 0 1px var(--night-line)`): ghost pill, night chips, card edges. On paper the same ring uses ink at 12 to 20%.
- **Night fall** (`0 0 0 1px var(--night-line), 0 16px 40px -20px oklch(0.05 0.02 310 / 0.9)`): the scrolled nav and open mobile menu.
- **Stack fall** (`0 0 0 1px var(--night-line), 0 -30px 60px -30px oklch(0.05 0.02 310 / 0.9)`): sticky pantry cards, darkening the card beneath.
- **Gold pill** (`0 1px 0 oklch(1 0 0 / 0.35) inset, 0 10px 24px -10px oklch(0.08 0.03 310 / 0.9)`): the lit top edge and soft drop of the primary action.
- **Paper lift** (`0 1px 2px oklch(0.21 0.055 312 / 0.06), 0 24px 60px -28px oklch(0.21 0.055 312 / 0.35)`): the order ticket.

### Named Rules
**The Light Is the Depth Rule.** A dark chapter gets depth from the key-light glow and from images dissolving into night, not from more shadows.

## Shapes

Controls are full pills (999px): CTAs, chips, inputs, the nav bar itself, the grams segmented control and its sliding thumb. Large containers use generous continuous radii: the ticket at 1.75rem, the mobile menu at 1.75rem, pantry family cards at 2rem, inset wells at 1rem. Lists and grids are divided by hairline top rules (`border-t night-line` or `ink/12`), never by boxes. The logo always sits in an ivory circle.

Images obey their own form language: they have no frame. `dissolve-top` fades the hero still in from transparent over its top 40%; `fade-into-card` dissolves pantry photos downward on mobile and leftward into the text on desktop (with a vertical fade intersected); `fade-vertical` dissolves the essence photograph at top and bottom. The essence image opens from a rounded 2rem inset frame to full bleed as you scroll through it (clip-path driven by progress), so even its one frame melts away.

## Components

### Buttons (pills)
Lit, tactile, unmistakable. There is one primary action and it is gold.
- **Shape:** full pill (999px), 3.25rem tall.
- **Primary (`pill-gold`):** gold fill, gold-ink text, 600 weight, 1rem, -0.01em, 1.625rem inline padding, WhatsApp glyph (inline SVG) leading. Hover (fine pointers only) lightens to `oklch(0.83 0.13 78)`; active scales to 0.97 on 160ms strong ease-out.
- **Ghost (`pill-ghost`):** transparent, ivory text, 500 weight, inset hairline ring. Hover adds ivory at 6%; same press scale. Used for the secondary path ("Recorre la despensa", "Cómo llegar").
- **On paper:** the dark-ink pill (ink fill, paper text, 3rem) is the "Añadir" submit; the ink-ring pill is the "O escríbenos sin lista" fallback.
- **Nav order pill:** a compact gold pill (2.5 to 2.75rem) permanently in the bar.
- The stock shadcn `Button` is present in `ui/` but not used by the site; the pills are the button system.

### Chips (product selection)
- **Style:** pill, 2.5rem on night (night-2 at 70% with backdrop blur, hairline ring, plus icon in ivory-mute) and 2.75rem on paper (white fill, ink ring at 12%, darkening to 35% on hover).
- **State:** selected chips become magenta with a check icon; press scales to 0.96. Selection is shared between the pantry chips and the order builder.

### Cards / Containers
- **Family card:** night-2, 2rem radius, hairline ring plus stack-fall shadow, sticky stacking on desktop, photo bleeding under the right 66% and dissolving into the text side; 1.75 to 3.5rem internal padding.
- **Order ticket:** white on paper, 1.75rem radius, paper-lift shadow, 1.5 to 1.75rem padding; rows divided by ink/8 hairlines; items enter with a 12px fly and reorder with FLIP (300ms cubic-out); the total tweens over 500ms.

### Inputs / Fields
- **Style:** white pill, 3rem tall, 1.25rem padding, ink text, ink ring at 15%.
- **Focus:** the ring thickens to 2px solid ink. Disabled submit drops to 35% opacity.
- **Grams control:** a four-step segmented pill (100 g to 1 kg) in a paper-2 well with a white sliding thumb that translates 300ms on strong ease-out.

### Navigation
- A floating pill bar, 3.5rem (4rem from `sm`), inset from the viewport edges, inside the 72rem container. Transparent at the top of the page; `material-night` with night-fall shadow once scrolled; `tone-paper` with ink text whenever a paper chapter is under it. Links are ivory-dim, 0.875rem, brightening to ivory. On mobile a menu button opens a `material-night` sheet (1.75rem radius) whose links fly in staggered by 40ms.

### Accordion (FAQ)
- Hairline top and bottom rules on night, 1.125 to 1.25rem medium questions at -0.02em, ivory-dim answers capped at 42rem, chevron rotating 180deg over 300ms strong ease-out.

### Motion system (signature)
- **Engine:** one passive scroll listener and one rAF per frame shared by every subscriber. `scroll_progress` writes 0→1 to `--progress` in `through` mode (enter bottom to leave top) or `sticky` mode (pinned stage of a tall section). `parallax` translates by speed × offset from viewport centre (pantry photos -0.12, essence -0.18).
- **Hero load:** staggered `hero-in` (28px rise, 10px blur to sharp, 1200ms, 110ms steps after 150ms) and `hero-in-image` (1.08 scale, 14px blur, 0.6 brightness, 1800ms). On scroll, the headline lifts, shrinks 8% and fades; the still life rises 9% and grows 12%.
- **Reveal on enter:** 24px rise, 6px blur to sharp, opacity, 900ms strong ease-out, once, staggered 60 to 120ms.
- **Word light:** manifesto words light from 14% opacity to full as the sticky chapter progresses; two words light in gold.
- **Spice dust:** a canvas of 22 (mobile) or 44 motes drifting upward, 80% gold hue and 20% magenta, DPR capped at 1.5, paused off-screen.
- **Curves:** strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for almost everything; strong in-out `cubic-bezier(0.77, 0, 0.175, 1)` for the scroll nudge; drawer `cubic-bezier(0.32, 0.72, 0, 1)` defined.
- **Reduced motion:** progress pins at 1, parallax is off, reveals and hero entrance become plain fades (300 to 500ms), every manifesto word is lit, the dust draws one still frame, the nudge stops, smooth scrolling turns off.

## Do's and Don'ts

### Do:
- **Do** make gold the only warm colour and the only primary-action fill; put gold-ink text on it.
- **Do** reserve magenta for selected or live state, olive for the process timeline, violet for atmospheric glow.
- **Do** alternate night chapters (showing) and paper chapters (reading, ordering), and fade night chapter edges back to night.
- **Do** set display type in Geist at 600 to 620 with tracking tightening by size, never past -0.04em.
- **Do** dissolve every photograph into the night with a mask (`dissolve-top`, `fade-into-card`, `fade-vertical`).
- **Do** use full pills for controls and hairline rules for division.
- **Do** drive cinematic motion from the shared scroll engine with strong ease-out, and ship a reduced-motion equivalent for each effect.
- **Do** give every translucent material an opaque fallback under `prefers-reduced-transparency`.

### Don't:
- **Don't** use gold for decoration, borders or secondary buttons; the ghost pill carries the secondary path.
- **Don't** put a photograph in a hard-edged box or frame on night.
- **Don't** build rows of equal category cards or a cream-and-kraft grocery palette.
- **Don't** add a kicker or uppercase eyebrow above a heading; drop the second clause a text tier instead.
- **Don't** introduce bounce or overshoot easing; motion settles, it does not spring past.
- **Don't** add new hues; the palette is night, paper, ivory/ink tiers, gold, magenta, olive and atmospheric violet.
