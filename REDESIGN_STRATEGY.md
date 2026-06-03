# Your Uni-Verse Website — Redesign Strategy & Implementation Plan

> **Status:** strategy document, not implementation. **No code has been changed.**  
> **Companion:** read [`AUDIT.md`](AUDIT.md) first.  
> **Gating:** Sections 3 and 5 of this document are **placeholders pending the Your Uni-Verse Figma file URL**. Once you paste it, they will be filled with concrete design-token values, component mappings, and per-page Figma -> Code references.

---

## 1. Goal of the redesign

Lift the existing marketing site from "polished but hand-rolled" to "production-grade, design-system-driven, and Figma-faithful" without losing the visual identity that already works (dark-galactic palette, Instrument Serif display type, blue/gold accent system, motion-heavy storytelling).

Three measurable outcomes:

1. **Visual parity with the Figma file** at the page level — every page in the Figma file has a matching `app/.../page.tsx` route, and every component in the file is bound 1:1 to a code component built from the same tokens.
2. **One source of truth for design tokens** — colors, type, spacing, radii, shadows, motion live in a single tokens file (CSS custom properties + Tailwind v4 theme block, depending on the decision in §6) and every component reads from it. Zero hardcoded hex/px in `style={{}}`.
3. **Production-ready infrastructure** — real waitlist persistence, working canonical domain, full sitemap, focus states, persisted i18n, env-var docs, basic CI.

---

## 2. Guardrails (your explicit instructions, restated)

For the duration of this engagement I will NOT, without explicit go-ahead per phase:

- Push to remote
- Open pull requests
- Change repo settings
- Trigger Vercel deploys
- Modify production env vars
- Modify any source file before the per-phase approval

`AUDIT.md` and `REDESIGN_STRATEGY.md` are local-only documents at the repo root; they sit alongside `node_modules`-style untracked artifacts and will not be committed unless you tell me to.

---

## 3. Figma source-of-truth (PENDING — needs the file URL)

When you paste the Figma file URL I will run, in this order:

1. **`get_metadata`** on the file -> enumerate pages, top-level frames, file size, last-edited timestamp.
2. **`search_design_system`** + **`get_libraries`** -> identify the design system / variables / styles to map code to.
3. **`get_design_context`** on each top-level page frame -> structured layout + components + design-token bindings, plus screenshots for visual diffing.
4. **`get_code_connect_map`** -> any existing Figma -> code component mappings already declared.

The output of those calls will populate this section with:

- **Figma file metadata:** `<fileKey>`, `<page list>`, `<frame list>`, `<lastModified>`
- **Design tokens extracted from Figma:**
  - Color variables (mode: light / dark)
  - Type ramp (family, size, weight, line-height, letter-spacing per variant)
  - Spacing scale
  - Radius scale
  - Shadow / elevation scale
  - Motion (durations + easings if Figma has them)
- **Component inventory (Figma side):** every component + variant set, with prop names and default values.
- **Page-level frame inventory:** every page/screen, with its component composition.
- **Figma -> Code mapping (initial proposal):** bullet list, one row per Figma component, with the proposed code-side counterpart (update existing OR create new) and the design tokens it should bind to.

> **Action required from you:** paste the Figma file URL. Until then this section stays as a placeholder.

---

## 4. Token & system architecture decisions

These are the architectural calls the redesign hinges on. **You decide between A/B/C per item; I will not pick for you.**

### 4.1 Styling layer

- **Option A — Adopt Tailwind v4 properly (recommended).** Tailwind v4's CSS-first config (`@theme {}` inside `globals.css`) maps cleanly onto the existing CSS-variable approach. Keep the `:root` vars as the canonical source of truth, expose them as Tailwind theme tokens, replace inline `style={{}}` with Tailwind utilities (`text-text-1 bg-surface rounded-radius-lg`). Pros: brings the existing dead Tailwind dep to life, removes inline-style sprawl, gives engineers an opinionated API. Cons: ~1-day component migration cost.
- **Option B — Strip Tailwind, double down on CSS Modules.** Move per-component styles into `Component.module.css` files that read from the `:root` vars. Pros: smaller bundle, no Tailwind learning curve. Cons: more boilerplate per component.
- **Option C — Strip Tailwind, keep `globals.css` + utility classes.** Cheapest, smallest delta. Cons: doesn't fix the inline-style sprawl on its own.

### 4.2 Component library boundary

- **Option A — Promote `components/` into `components/ui/` (primitives) + `components/sections/` (page sections) + `components/marketing/` (one-off compositions).** Cleanest, sets up reuse for future "app" surface.
- **Option B — Keep flat `components/` for now**, just add `components/ui/` for the primitives (Button, Pill, Card, Input, IconBox, SectionHeader, StatCard).

### 4.3 i18n strategy

- **Option A — URL-routed locales (`/`, `/af`)** with `next-intl` or `next-international`. Pros: shareable, SEO-friendly, `<html lang>` set per route automatically. Cons: needs route-folder reshuffle.
- **Option B — Keep React Context, add `localStorage` persistence + set `<html lang>` via effect.** Cheapest fix for the immediate bugs (§7 of audit) without restructuring routing.
- **Option C — Drop AF for this iteration**, keep English only. Easiest, but loses the Afrikaans market signal.

### 4.4 Waitlist persistence

Choose one:

- **Vercel KV** (simplest, low-write workload, $0 free tier)
- **Vercel Postgres** (relational, queryable, future-proof for a real "app")
- **Supabase** (Postgres + auth + storage, free tier generous)
- **Resend Audiences** (no database — push contacts straight into Resend, query via their API)
- **Airtable** (no-code-friendly back office, good for non-engineering team to read)
- **Notion DB** (similar to Airtable, easier sharing)

### 4.5 Brand canonicalisation

- **Option A — "Your Uni-Verse"** (current dominant spelling; matches metadata, hero, footer, emails).
- **Option B — "Your Universe"** (used in some translations and dead components).

### 4.6 LoadingScreen

- **Option A — Remove entirely.** Best for SEO and TTI.
- **Option B — Gate behind `sessionStorage`** (one-shot per session). Keeps brand theatre on first visit only.
- **Option C — Keep as is** (current behaviour).

---

## 5. Gap analysis — current vs Figma target (PENDING)

This section depends on §3. Once the Figma file is loaded I will populate one bullet per discrepancy in this format:

- **{Page or component}** — Figma intent vs current code, severity (low/med/high), and the smallest code change that closes the gap.

Pre-Figma, the **stack-side gaps** (things that need fixing regardless of design) are already enumerated in `AUDIT.md` §15 (Risk Register).

---

## 6. Phased implementation plan

Each phase is a discrete approval gate. **I will not start phase N+1 until you approve phase N's diff.**

### Phase 0 — Foundations (no visible change)
**Goal:** unblock everything else without touching design.

- Add `.env.example` with `RESEND_API_KEY`, `NOTIFY_EMAIL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_SITE_URL`.
- Replace [`README.md`](README.md) with a real project doc (scripts, env, deploy notes, how to add a page).
- Add `eslint-config-next` + `prettier` + `lint`/`format`/`typecheck` scripts.
- Optional: minimal GitHub Actions workflow that runs `lint` + `typecheck` + `next build` on PR (you said no PRs/deploys unless approved — this workflow is just guard-rails on future work, will not run on its own).
- Decision applied: §4.5 (brand spelling) — one-time sweep of all strings.
- Decision applied: §4.6 (LoadingScreen) — keep / gate / remove.
- Move root `write-*.mjs` to `tools/legacy/` (or delete).
- Delete dead [`components/HowItWorks.tsx`](components/HowItWorks.tsx).

**Exit criteria:** `npm run lint && npm run typecheck && npm run build` all pass; README is meaningful; brand name is consistent; dead code removed.

### Phase 1 — Token & styling system
**Goal:** one source of truth for design tokens, bound to Figma.

- Apply decision §4.1.
- Add missing tokens: `--violet-text`, full spacing scale, motion durations + easings, shadow scale, z-index scale.
- Migrate every hardcoded hex / px / rgba in component `style={{}}` blocks to token references.
- If Tailwind v4 adopted: add `@theme {}` block; replace inline styles with utilities in 2-3 representative components as a pattern reference.
- Document the token mapping in `docs/tokens.md` (Figma variable name -> CSS var -> Tailwind utility).

**Exit criteria:** zero `#[0-9a-fA-F]{3,8}` hex literals in `components/*.tsx` and `app/**/*.tsx` outside `globals.css`. `rg "#[0-9a-fA-F]{6}" components/ app/` returns nothing.

### Phase 2 — Shared primitives
**Goal:** the 10 building blocks the rest of the site composes from.

Build (or refactor existing) under `components/ui/`:
- `Button` (variants: primary / ghost / outline-blue, sizes: sm/md/lg) — replaces every `<button className="btn ...">` + inline `<a className="btn ...">` pattern.
- `Pill` (blue / gold) — replaces the current `.pill` spans.
- `Card` + `CardPadded`
- `IconBox` (blue / gold)
- `SectionHeader` (eyebrow label + headline + sub) — currently re-implemented inside every section (`Platform`, `Features`, `Problem`, `Stats`, `Ecosystem`, `WhoItsFor`, `Competitive`, `Journey` all have a near-identical "sg-row + label + display-2 + body-lg" block).
- `Container` (max-width 1180, responsive padding)
- `Input` + `TextareaInput`
- `StatCard` + `CountUpStat`
- `LangToggle` — extract from `Navbar`.
- `Logo` / `Wordmark` — used in Navbar, Footer, LoadingScreen, email templates.

Each primitive ships with a Code Connect (`*.figma.ts`) file mapping it to its Figma component **once §3 is populated**.

**Exit criteria:** the 22 existing components rebuilt as compositions of `ui/*` primitives + section-specific JSX. Line count in `components/` drops materially.

### Phase 3 — Layout shell (Navbar, Footer, page chrome)
- Refactor `Navbar` and `Footer` against the new primitives and Figma layout.
- Apply decision §4.3 (i18n strategy).
- Add real focus rings (`:focus-visible`) site-wide.
- Wire `<html lang>` to the active locale.
- Fix the legal pages (`privacy`, `terms`) to use the same Navbar + Footer instead of standing alone.

**Exit criteria:** Lighthouse a11y score ≥ 95 on `/`. Keyboard tab-walk across the homepage is fully visible. `lang` persists across refresh and page navigation.

### Phase 4 — Page-by-page redesign (Figma-driven)
Order:
1. `/` (Home) — Hero, Problem, Stats, Waitlist section
2. `/early-access` — page hero + Waitlist
3. `/platform` — PlatformHero, Platform, Journey, Competitive, Features
4. `/for-schools` — SchoolsHero, Ecosystem, WhoItsFor, Stats
5. `/privacy`, `/terms` — bring under the standard layout shell

Each page is a separate diff, reviewed against:
- The matching Figma frame (screenshot diff)
- The Figma -> Code mapping table from §3
- Accessibility checklist (focus, landmarks, contrast)
- Performance budget (no new render-blocking resources)

### Phase 5 — Waitlist persistence + infrastructure
- Apply decision §4.4 (persistence layer).
- Add Zod validation to `/api/waitlist`.
- Add Upstash / Vercel rate-limiter middleware (5 requests / minute / IP).
- Escape user input before interpolation into Resend HTML.
- Add a privacy-consent checkbox to the form review step, linking to `/privacy`.
- Replace `BASE_URL` hardcode in [`app/layout.tsx`](app/layout.tsx), [`app/sitemap.ts`](app/sitemap.ts), [`app/robots.ts`](app/robots.ts) with `process.env.NEXT_PUBLIC_SITE_URL`.
- Add missing routes to `sitemap.ts`.
- Generate real `og-image.png`, `favicon-32.png`, `apple-touch-icon.png`.

### Phase 6 — Polish, perf, SEO
- Move Google Fonts from CSS `@import` to `next/font` (self-hosted, automatic preload, swap behaviour).
- Audit and trim `framer-motion` usage — replace decorative motion with CSS where it matches.
- Add `not-found.tsx` and `error.tsx` in `app/`.
- Verify all OG / Apple icon assets exist.
- Run Lighthouse on all 5 routes, target ≥ 95/95/95/95 (perf/a11y/best-practices/SEO).
- Optional: structured data (Organization + WebSite JSON-LD) in `app/layout.tsx`.

### Phase 7 — Optional / stretch
- Storybook for `components/ui/*` (Code Connect-friendly).
- Visual-regression CI (Chromatic / Percy / Playwright snapshots) gated on PR.
- CMS extraction for marketing copy (Sanity / Contentful / Notion / MDX) if you want non-engineers to edit copy.
- Light-mode variant if the Figma file has one.

---

## 7. Rough effort estimate (engineering hours, before Figma is loaded)

These are placeholders; they will sharpen once §3 is populated.

- Phase 0 — 4-6h
- Phase 1 — 8-12h (highly dependent on §4.1)
- Phase 2 — 12-16h
- Phase 3 — 8-12h
- Phase 4 — 16-32h (depends on how many Figma frames diverge from current code)
- Phase 5 — 6-10h
- Phase 6 — 6-10h
- Phase 7 — variable

Sequential total: ~60-100h. Most of this risk is in Phase 4 and resolves once the Figma file is mapped.

---

## 8. Decisions I need from you to start Phase 0

The smaller list, ordered by blocking impact:

1. **Figma file URL.** (Required for Phase 1+.)
2. **Brand spelling**: "Your Uni-Verse" or "Your Universe". (§4.5)
3. **Production canonical domain**: confirm `https://youruniverse.co.za`. (Phase 5 / Phase 0.)
4. **Styling layer**: adopt Tailwind v4, or strip it? (§4.1)
5. **i18n approach**: URL-routed locales, Context+localStorage, or drop AF? (§4.3)
6. **Waitlist persistence**: which backend? (§4.4)
7. **LoadingScreen**: remove / gate / keep? (§4.6)
8. **Component boundary**: nested `ui/sections/marketing` or flat with `ui/`? (§4.2)
9. **Go / no-go on Phase 0** as scoped above.

Once 1-9 are answered, I'll execute Phase 0 against the diff you approve.

---

## 9. What this document is not

- A spec. It's a strategy + sequencing plan. The spec emerges per-phase from the Figma file + your answers above.
- A commitment to merge anything. Every phase is a separate review gate.
- A pricing/scoping doc. Hours estimates are eyeball numbers, not quotes.
