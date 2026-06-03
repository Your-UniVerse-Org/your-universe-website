# Your Uni-Verse Website — Technical & UX Audit

> **Status:** read-only audit, no code changes made.  
> **Repo:** `lynxio-tech/your-universe-website` @ commit `e46dffb` (branch `main`).  
> **Generated:** Phase A-C of the agreed plan (Phase D, the Figma-driven redesign strategy, is staged separately in `REDESIGN_STRATEGY.md` and gated on the Figma file URL).

---

## 1. TL;DR — what this site is and what it is not

**What it is:** A polished pre-launch marketing site for **Your Uni-Verse**, a South African Grade 9-to-graduation decision-intelligence / career-guidance platform built by **Lynxio Tech (Pty) Ltd**. Five public pages, a multi-step waitlist form, EN + AF translations, and a heavy custom animation/visual layer (SVG beams, particle field, framer-motion micro-interactions). Hosted on Vercel under a preview slug.

**What it is not:** A production-grade, design-system-driven codebase. Styling is hand-rolled CSS variables + per-element inline `style={{}}` objects, with Tailwind installed but never wired in. There are no tests, no lint config, no CI, no `.env.example`, no real persistence behind the waitlist API, and the canonical URL is a Vercel preview domain. Several CSS variables are referenced but never defined.

The bones (typography, color tokens in `:root`, IA, copywriting) are strong. The execution layer (consistency, accessibility, persistence, deployment hygiene) is incomplete. The redesign opportunity is to lift the existing design language into a real, token-driven component system bound to the Your Uni-Verse Figma file.

---

## 2. Stack & build

- **Framework:** Next.js **16.2.6** (App Router) with React **19.2.4** and TypeScript 5. Bleeding-edge majors — pin and verify before any new dep is added.
- **Styling:** Hand-rolled CSS in [`app/globals.css`](app/globals.css) (745 lines), built on CSS custom properties defined in `:root`. Three Google fonts loaded via `@import url(...)` at the top of `globals.css`: **Instrument Serif** (display), **Inter** (body), **Space Grotesk** (UI/labels).
- **Tailwind CSS v4 + `@tailwindcss/postcss`** are declared in [`package.json`](package.json) and [`postcss.config.mjs`](postcss.config.mjs), but `globals.css` contains **no `@tailwind` / `@import "tailwindcss"` directive and there is no `tailwind.config.*`**. Tailwind is effectively dead weight in the bundle. Either adopt it or remove it.
- **Animation:** `framer-motion` 12.38.0 — used on essentially every component (Hero, Problem, Stats, Platform, Features, Journey, Ecosystem, Competitive, WhoItsFor, Waitlist, Navbar, PageTransition, LoadingScreen, HeroMockup).
- **Scripts:** `next dev` / `next build` / `next start` only. No lint, no test, no typecheck script.
- **TS config:** strict on, no `noUnusedLocals`/`noUnusedParameters`. Path alias `@/*` -> root.
- **Linter / formatter:** None configured (no `.eslintrc*`, no `eslint.config.*`, no `.prettierrc*`).
- **Tests:** None.
- **CI / hooks:** None (`.github/` absent, no `husky`).
- **Deploy config:** No `vercel.json`. `.gitignore` ignores `.vercel`, so Vercel is the implied host. No `.env.example`.

---

## 3. Routes & site map

App Router pages in [`app/`](app/):

- `/` — [`app/page.tsx`](app/page.tsx): `Navbar` + `Hero` + `Problem` + `Stats` + `Waitlist` + `Footer`
- `/platform` — [`app/platform/page.tsx`](app/platform/page.tsx): `PlatformHero` + `Platform` + `Journey` (`#how-it-works` anchor) + `Competitive` + `Features`
- `/for-schools` — [`app/for-schools/page.tsx`](app/for-schools/page.tsx): `SchoolsHero` + `Ecosystem` + `WhoItsFor` + `Stats`
- `/early-access` — [`app/early-access/page.tsx`](app/early-access/page.tsx): custom hero + `Waitlist`
- `/privacy` — [`app/privacy/page.tsx`](app/privacy/page.tsx) (standalone, no Navbar/Footer)
- `/terms` — [`app/terms/page.tsx`](app/terms/page.tsx) (standalone, no Navbar/Footer)
- `/api/waitlist` (POST) — [`app/api/waitlist/route.ts`](app/api/waitlist/route.ts)
- `sitemap.ts`, `robots.ts` — SEO infra.

Top-nav links: Home, Platform, For Schools, How It Works (`/platform#how-it-works`). CTA: Request Access -> `/early-access`. Footer also links to `#` (placeholder) for About / Lynxio Tech / Careers / Data Protection.

---

## 4. Components (22)

Located in [`components/`](components/). Grouping by role:

- **Shell / chrome:** `ClientShell`, `LanguageContext`, `LoadingScreen`, `PageTransition`, `Navbar`, `Footer`, `ElectricBeams`
- **Hero variants:** `Hero` (home), `HeroMockup` (dashboard mockup card used in Hero), `PlatformHero`, `SchoolsHero`
- **Section cards (used by routes):** `Problem`, `Stats`, `Platform`, `Journey`, `Competitive`, `Features`, `Ecosystem`, `WhoItsFor`
- **Forms:** `Waitlist` (multi-step, EN/AF aware)
- **Decoration:** `SectionGraphics` (collection of per-section SVG illustrations; imported by most section components)
- **Dead code:** `HowItWorks` — defined but **not imported by any route**; superseded by `Journey`. Recommend deleting.

Every component except `LoadingScreen`, `PageTransition`, `ElectricBeams`, `HeroMockup`, `Footer`, and the legal pages renders through the `useLang()` hook for i18n.

---

## 5. Design tokens (current source of truth)

Defined inline in [`app/globals.css`](app/globals.css) under `:root`. Key tokens:

- **Background tiers:** `--bg #03050E`, `--surface #070B18`, `--surface-2 #0C1124`, `--surface-3 #111930`
- **Primary accent (blue):** `--blue #3D7FFF`, `--blue-dark #2563EB`, plus `--blue-dim`/`--blue-border`/`--blue-glow` rgba variants
- **Secondary accent (gold):** `--gold #F0A500`, `--gold-text #FBC94A`, `--gold-dim`
- **Tertiary accents used in code but NOT in tokens:** purple `#A78BFA`, success green `#22C55E`, error red `#F87171`, mid-blue `#6EADFF`. These are hardcoded inline across `HeroMockup`, `Hero`, `Waitlist`, `LoadingScreen`, `Problem`, etc.
- **Text tiers:** `--text-1 #EDF2FF`, `--text-2 #8899BB`, `--text-3 #46557A`, `--white #FFFFFF`
- **Borders:** `--border rgba(255,255,255,0.06)`, `--border-blue rgba(61,127,255,0.18)`
- **Radii:** `--radius-sm 6px`, `--radius-md 12px`, `--radius-lg 20px`, `--radius-xl 32px`
- **Typography utility classes:** `.display-1` / `.display-2` / `.display-3` (Instrument Serif clamps), `.h3` (Space Grotesk), `.body-lg` / `.body` / `.small` (Inter), `.label` / `.label-gold` (Space Grotesk, uppercase). All hardcoded as plain CSS classes — no token variables for type ramp, weight, line-height, or letter-spacing.

**Missing tokens that the code keeps reaching for:**

- `--violet-text` — referenced in [`components/Features.tsx`](components/Features.tsx) (icon color), [`components/WhoItsFor.tsx`](components/WhoItsFor.tsx) (persona quote color), [`components/HowItWorks.tsx`](components/HowItWorks.tsx). **Variable is never defined in `:root`** -> resolves to `unset` and inherits the parent color. Visible bug.
- No spacing scale tokens (`--space-1 .. --space-12`). Every margin/padding is a magic px or `clamp()`.
- No motion tokens (durations, easings). Easings like `[0.22, 1, 0.36, 1]` are repeated as inline literals in ~10 components.
- No shadow tokens.
- No z-index tokens (nav 100, loader 9999, drawer inherits — all magic numbers).

---

## 6. Inline-style sprawl

Every section component uses heavy `style={{ ... }}` blocks with hardcoded values (hex, px, rgba). Examples:

- [`components/HeroMockup.tsx`](components/HeroMockup.tsx): ~200 lines of inline styles, ~30 hardcoded hex colors (`#3D7FFF`, `#A78BFA`, `#22C55E`, `#F0A500`, `#FBC94A`, `#6EADFF`, `#EDF2FF`).
- [`components/Footer.tsx`](components/Footer.tsx): every element uses inline styles; the `foot_col_*` map is built from translation calls each render.
- [`app/privacy/page.tsx`](app/privacy/page.tsx) and [`app/terms/page.tsx`](app/terms/page.tsx): legal pages are 100% inline-styled JSX with per-`h2`/`section` repeated style blobs.

The token system exists; it is just not being used consistently. The redesign should bind every color/spacing/radius to a variable so swapping the Figma palette is a single-file change.

---

## 7. Internationalisation

[`components/LanguageContext.tsx`](components/LanguageContext.tsx) defines a React Context with EN + AF translations as a single in-file map (~80 keys per locale, hand-translated).

**Issues:**

- **No persistence.** `setLang` lives in component state — refreshing the page reverts to English.
- **`<html lang>` is hardcoded to `"en"`** in [`app/layout.tsx`](app/layout.tsx) and does not update when the user toggles to AF. Bad for screen readers and search engines.
- **No URL routing for locale** (`/`, `/af`, etc.). AF version is unshareable and invisible to search engines.
- **Strings co-located with code**, not extracted to JSON catalogues. Translators must edit React/TS source.
- **`HowItWorks.tsx` is hardcoded English** (English-only strings, no `useLang()` call) — but it's also dead code, so the impact is zero.
- [`components/Competitive.tsx`](components/Competitive.tsx) line 41 uses `dangerouslySetInnerHTML={{ __html: t("comp_sub") }}` for a translation string. Current value is plain text but the pattern enables XSS if a translator later embeds markup.

---

## 8. Waitlist API & data persistence

[`app/api/waitlist/route.ts`](app/api/waitlist/route.ts):

- POST handler validates name + email regex + type, then:
  1. **Writes to local `data/waitlist.json` via `fs.writeFileSync`.** Comment acknowledges "no-op on Vercel read-only fs" — meaning **submissions are silently lost in production**.
  2. Sends a notification email via Resend to `NOTIFY_EMAIL` (default `hello@youruniverse.co.za`).
  3. Sends a confirmation email to the registrant.
- **No rate limiting.** Endpoint is trivially spammable; each call triggers two Resend API hits.
- **No CSRF protection.** Acceptable for a public form, but no honeypot, no captcha, no proof-of-work.
- **No persistence layer.** Pick one: Vercel KV, Vercel Postgres, Supabase, Airtable, Notion DB, or Resend Audiences.
- **No env-var documentation.** `RESEND_API_KEY` and `NOTIFY_EMAIL` are referenced but no `.env.example` exists.
- The email HTML is built via string interpolation of unsanitised form input (name/email/org go straight into the `<table>` body). Real risk if Resend renders these in any context that re-parses HTML; sanitise/escape before interpolation.

---

## 9. Accessibility (static review)

- **Focus styles:** `globals.css` does `button { ... border: none; background: none; }` (line 34) — strips the default focus ring with no replacement. Keyboard users get zero focus indication site-wide. **Critical**.
- **Color contrast:** `--text-3 #46557A` on `--bg #03050E` is ~4.4:1 — just over AA for normal text but fails AA Large. Used pervasively for labels and helper text.
- **`<html lang>`** does not change with the language toggle (see §7).
- **Headings:** `<h1>` per page is OK (Hero uses `display-1` div with span children — should be a real `<h1>`; `Hero` renders the headline inside `<div className="display-1">`, not an `<h1>`). Page semantics rely entirely on the `display-*` classes.
- **Decorative SVGs:** `ElectricBeams` is correctly `aria-hidden`. Most other inline SVGs in buttons/cards lack `aria-hidden` or `<title>`.
- **`LoadingScreen`:** blocks every page for ~1.2s and renders a `<canvas>` particle field + 100+ animated nodes. **It also blocks SEO and a11y tools' first read of content** because the page body is hidden behind `opacity: 0` until `loaded` flips. Re-evaluate whether this should run at all, or at minimum once-per-session via `sessionStorage`.
- **Motion:** `@media (prefers-reduced-motion: reduce)` block exists in `globals.css` (lines 501-509) and globally squashes animation duration. Good — keep it. `Hero` also wires `useReducedMotion()` correctly.
- **Mobile drawer (`Navbar`):** good aria — `aria-expanded`, `aria-controls`, `aria-label`. ✓
- **Form (`Waitlist`):** uses `<input>` with `placeholder` but **no associated `<label>`** for any field. Question text is in an `<h2>` above the input; screen readers don't bind them. Add `<label htmlFor>` or `aria-labelledby`.

---

## 10. Performance (static review, no runtime audit)

Bigger concerns:

- **`LoadingScreen`** spins up a 120-particle `<canvas>` with `O(n²)` distance-checking nearest-neighbour line draws every frame for ~1.2s on every page load. Pure cost, no perceived value. **Remove or gate behind a single first-session flag.**
- **`ElectricBeams`** runs full-page-fixed SVG with ~10 continuous animations + 3 Gaussian blur filters at all times on desktop. Already hidden on mobile (`@media (max-width: 767px) { .electric-beams { display: none } }`) — good. Consider gating on `prefers-reduced-motion` too.
- **Every section has** `::before` (grid lines) + `::after` (radial glow) compositing layers (`globals.css` lines 89-95). Mobile correctly disables `::after`. Still expensive on desktop.
- **Hero** renders 3 additional `radial-gradient` orbs on desktop only — fine.
- **`framer-motion`** is imported in 13 components. Tree-shaking is OK but the runtime is non-trivial. Consider whether `<motion.div>` wrappers are needed everywhere or whether intersection-driven CSS animations would do.
- **Google Fonts** loaded via `@import url(...)` in `globals.css` — this is **render-blocking** because the import is in CSS, not the document. The `<head>` also has a `preload` for `instrumentserif/v1` (which is the LCP element on hero). Move to `next/font` for self-hosting + automatic display-swap + preloading and drop the `@import`.
- **Images:** there are essentially **no raster images** in `public/` — only SVGs. Good for performance. But the OG image (`/og-image.png`), `favicon-32.png`, `apple-touch-icon.png` are referenced in [`app/layout.tsx`](app/layout.tsx) and **don't exist in `public/`** -> social cards and iOS install icon will 404.
- `next.config.ts` is empty — no `images`, no `experimental`, no compression tweaks.

---

## 11. SEO & deployment hygiene

- [`app/layout.tsx`](app/layout.tsx) line 7: `BASE_URL = "https://your-universe-five.vercel.app"` — the **Vercel preview slug** is used as the canonical URL in `metadataBase`, OpenGraph `url`, and `alternates.canonical`. Also used in [`app/sitemap.ts`](app/sitemap.ts) and [`app/robots.ts`](app/robots.ts). Should be `https://youruniverse.co.za` (the domain used by every email address in the codebase).
- Missing OG image asset (see §10).
- `robots.ts` allows everything except `/api/`. Fine.
- `sitemap.ts` only lists `/`, `/privacy`, `/terms`. **Missing `/platform`, `/for-schools`, `/early-access`** — those pages will not be indexed by sitemap-driven crawlers.
- No `manifest.json` content review — `site.webmanifest` exists but is unread.
- No `next/script` strategies beyond GA4 — that one is `afterInteractive`, good.

---

## 12. Repository hygiene

- **Root-level mass-script clutter:** [`write-all.mjs`](write-all.mjs) (60 KB), [`write-fixes.mjs`](write-fixes.mjs) (23 KB), [`write-production.mjs`](write-production.mjs) (32 KB), [`write-responsive.mjs`](write-responsive.mjs) (21 KB) sit at the repo root. They look like one-shot content-generation scripts (likely LLM-emitted). Move to `scripts/` or `tools/` or delete.
- [`scripts/`](scripts/) holds `update_translations.mjs`, `update_pages.mjs`, `update_infra.mjs`, `patch_placeholders.mjs`, `fix_remaining.mjs`, `fix_all.mjs`. Same pattern — not part of the runtime, almost certainly stale.
- [`README.md`](README.md) is the **unedited `create-next-app` template** — no project description, no architecture notes, no env-var list, no deploy instructions.
- No `LICENSE` file.
- Brand-name inconsistency in copy: **"Your Uni-Verse"** (metadata, hero, footer, copyright, navbar, emails) vs **"Your Universe"** ([`components/HowItWorks.tsx`](components/HowItWorks.tsx), some translations in [`components/LanguageContext.tsx`](components/LanguageContext.tsx) like `who_p1_body`, `wait_success_end`). Pick one canonical brand spelling.

---

## 13. Security (static review)

- **Email HTML built from user input** without escaping in the Resend payload (see §8). Low risk in Resend's renderer but bad practice.
- **No rate-limiting** on the public POST API.
- **No request validation library** (Zod, Valibot) — handler is hand-validated. Easy to forget edge cases on next feature.
- **`dangerouslySetInnerHTML`** in `Competitive.tsx` on a translated string (see §7).
- **`process.env.NEXT_PUBLIC_GA_ID`** is shipped to the browser as designed. Just confirm there are no other `NEXT_PUBLIC_*` envs that leak server-only data.
- **No `.env.example`**, no documentation on which envs are required.

---

## 14. UX audit — page-by-page

### `/` (Home)
- **Hero**: strong typographic concept (Instrument Serif headline with gold-italic accent on "everything"), pill badge, two CTAs, mockup dashboard on the right, trust bar at the bottom. Works.
- **Problem**: four stat cards (`80%`, `Grade 12`, `Severe`, `R0`) with a decorative SVG character ("problem-char") parked bottom-right that does a complex floating animation. The character is *cute* but visually competes with the stats; on tablet it can overlap unless the section's bottom padding is generous (mitigations exist in CSS). Consider removing or relocating.
- **Stats**: three count-up cards on a national map graphic. The third card displays `R0` as currency — visually unusual.
- **Waitlist**: multi-step Typeform-style flow. Excellent UX pattern: progress bar, slide-in transitions, keyboard `Enter` to advance, "Nice to meet you, {firstName}" personalisation. Best UX moment in the site. But missing labels (a11y) and no consent checkbox / Privacy link before submit.

### `/platform`
- 5 stacked sections (Hero, Platform, Journey, Competitive, Features). **Long page; no in-page TOC or sticky sub-nav.** Consider adding a sub-nav anchored to `#platform`, `#how-it-works`, `#features`.
- Journey section is the strongest narrative element — 6-phase timeline with a scroll-driven progress line.
- Competitive table has horizontal scroll on mobile and a separate stacked-card layout below 540px. Two code paths to keep in sync.

### `/for-schools`
- 4 sections (SchoolsHero, Ecosystem, WhoItsFor, Stats). The `Stats` section is **re-used from the homepage** (same component, same data) — same count-up numbers. May or may not be intentional; if it is, fine; if not, parameterise.
- `SchoolsHero` uses gold accent (`pill-gold`, `text-gradient-gold`) where the rest of the site uses blue. Good signalling that this page targets institutions.

### `/early-access`
- Single-purpose page wrapping the `Waitlist` component with a slightly different hero. Clean.

### `/privacy`, `/terms`
- Two standalone pages with **no `Navbar` / `Footer`** — only a "Back to home" link. **Jarring** UX break compared to the rest of the site. Add at least a slimmed-down nav.
- Hand-rolled inline `<h2>` / `<section>` styling — should bind to the same display tokens used elsewhere.
- Privacy contact email: `privacy@youruniverse.co.za`. Footer & layout use `hello@youruniverse.co.za`. Different envelope — fine.

### Cross-cutting UX issues
1. **`LoadingScreen` runs on every page load.** Beautiful but unjustified for a marketing site. First-time impression -> OK. Tenth page-load impression -> friction. Recommend `sessionStorage`-gated single-shot.
2. **Language toggle does not persist.** Toggling to AF on `/platform` then clicking Footer link to `/for-schools` reverts to EN.
3. **CTA destination ambiguity:** "How It Works" links to `/platform#how-it-works` which is mid-page; the user lands on a section that needs scrolling context above it to understand.
4. **Footer links to `#`** for About / Lynxio Tech / Careers. Dead links. Either build the pages or hide the links until they exist.
5. **No 404 page.** Default Next.js fallback only.
6. **No `not-found.tsx` or `error.tsx`** in `app/`.

---

## 15. Risk register (priority-ordered)

1. **Waitlist submissions are silently lost in production** (`fs.writeFileSync` on Vercel). Highest priority.
2. **Canonical URL is a Vercel preview slug** (SEO + share-card damage).
3. **Default README; no `.env.example`; no docs** -> onboarding any new dev requires reverse-engineering.
4. **No focus styles** -> WCAG 2.1.1 / 2.4.7 fail.
5. **`<html lang>` doesn't update with toggle** -> WCAG 3.1.2 fail in AF mode.
6. **Missing OG / Apple icons** -> 404s in social share + iOS install.
7. **Sitemap missing 3 of 5 public pages** -> SEO leak.
8. **Tailwind installed but unused** -> dead bundle weight, confusing onboarding.
9. **Undefined `--violet-text` CSS variable** referenced in 3 components -> visible visual bug.
10. **`dangerouslySetInnerHTML` on translation string** -> latent XSS.
11. **No rate-limiting on `/api/waitlist`** -> abuse + Resend cost risk.
12. **`HowItWorks` dead code + write-*.mjs root scripts** -> maintenance debt and grep noise.
13. **Brand-name inconsistency** ("Your Uni-Verse" vs "Your Universe").
14. **No tests, no linter, no CI** -> regressions go uncaught.

---

## 16. Quick wins (each <1 hour, no design dependency)

These are listed here for reference only. **Nothing is implemented in this pass.**

- Set `BASE_URL` from `process.env.NEXT_PUBLIC_SITE_URL` with a sane default; document in `.env.example`.
- Add missing sitemap entries (`/platform`, `/for-schools`, `/early-access`).
- Define `--violet-text` in `:root` and stop the silent fallback bug.
- Add a `:focus-visible` ring in `globals.css` for `button, a, input, [role="button"]`.
- Wrap `<html lang={lang}>` via a client-side effect on toggle (or move locale into the URL).
- Persist `lang` in `localStorage`.
- Gate `LoadingScreen` behind `sessionStorage`.
- Move root `write-*.mjs` into `tools/legacy/` or delete; same for `scripts/`.
- Replace `dangerouslySetInnerHTML` in `Competitive.tsx` with normal text rendering.
- Replace default README with a real one (env vars, scripts, deploy notes).
- Delete `components/HowItWorks.tsx` (dead).
- Add `eslint-config-next` + `prettier` + a `lint` script.

---

## 17. What the redesign needs from you

To move past audit and into the Figma-driven redesign:

1. **Figma file URL** for the Your Uni-Verse design (the one connected to this account). Without it, no design tokens / component mappings can be extracted.
2. **Canonical brand spelling**: "Your Uni-Verse" or "Your Universe" — pick one.
3. **Production canonical domain**: assumed `youruniverse.co.za` based on email addresses — confirm.
4. **Persistence preference for waitlist data**: Vercel KV / Vercel Postgres / Supabase / Resend Audiences / Airtable / other.
5. **Whether the `LoadingScreen` is intentional brand theatre or removable**.
6. **Whether to adopt Tailwind v4 (CSS-first config) or strip it out** and stay on hand-rolled CSS with proper tokenisation.
7. **Whether to keep AF i18n in this iteration** (and if so, move to URL-routed locales + JSON catalogues).

These map to decisions in `REDESIGN_STRATEGY.md`.
