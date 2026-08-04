# YourUniverse — Educational Decision Intelligence Platform

South Africa's first AI-powered educational decision intelligence platform. Built by [Lynxio Tech](https://lynxio.tech).

**youruniverse.co.za**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + CSS Custom Properties |
| Animation | Framer Motion 12 |
| Email | Resend (via fetch) |
| Analytics | Google Analytics 4 |
| Deployment | Vercel |

## Design System

### Brand Palette

```
#0F172A  Deep navy    — primary background, trust
#774DFF  Purple       — innovation, primary accent
#FE4A23  Orange       — focus, secondary accent
#F3F4F6  Light grey   — surfaces, light text
```

### Typography

- **Display / Headlines:** Instrument Serif
- **Body / UI:** Inter
- **Labels / Monospace UI:** Space Grotesk

### Logo

> **Important:** The official logo SVG must be sourced from the Figma file:
> `https://www.figma.com/design/uIGAl89Y407AcdLnlKNrVp/Your-Universe-Logo-concepts`
>
> The current `components/shared/ui/Logo.tsx` uses a constellation placeholder.
> Replace the SVG mark inside the `<svg>` element to deploy the official mark.
> The logo is used exclusively in **black and white**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file:

```env
# Required — Google Sheet webhook (see scripts/google-apps-script-waitlist.gs)
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/xxxxx/exec

# Optional shared secret between Vercel and Apps Script
GOOGLE_SHEETS_WEBHOOK_SECRET=your_random_secret

# Optional — waitlist email notifications (https://resend.com)
RESEND_API_KEY=re_your_key_here

# Team notification email (default: hello@youruniversehub.com)
NOTIFY_EMAIL=hello@youruniversehub.com

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Canonical base URL (default: https://www.youruniversehub.com)
NEXT_PUBLIC_BASE_URL=https://www.youruniversehub.com
```

## Project Structure

```
app/
  page.tsx              Home page
  platform/page.tsx     Platform intelligence page
  for-schools/page.tsx  Schools & institutions page
  early-access/page.tsx Waitlist / early access page
  privacy/page.tsx      Privacy Policy
  terms/page.tsx        Terms of Service
  api/waitlist/         POST endpoint for waitlist sign-ups
  globals.css           Design system (Tailwind v4 @theme + CSS tokens)

components/
  shared/
    ui/
      Logo.tsx          Brand mark + wordmark — replace SVG with official Figma asset
      Button.tsx        Shared button primitive
      SectionHeader.tsx Reusable section heading block
  Navbar.tsx            Top navigation (fixed, scroll-aware)
  Footer.tsx            Site footer
  Hero.tsx              Home page hero
  HeroMockup.tsx        Animated dashboard preview
  Problem.tsx           Problem statement section
  Stats.tsx             Reach statistics + SA map
  Platform.tsx          Intelligence systems overview
  Features.tsx          Features grid
  Journey.tsx           6-phase interactive timeline
  Ecosystem.tsx         Stakeholder cards (students, schools, parents, institutions)
  WhoItsFor.tsx         Persona cards
  Competitive.tsx       Comparison table
  Waitlist.tsx          Multi-step waitlist form
  LoadingScreen.tsx     Initial loading overlay
  LanguageContext.tsx   i18n context (EN/AF) + localStorage persistence
  ElectricBeams.tsx     Decorative animated SVG background
  SectionGraphics.tsx   Section illustration graphics
```

## Internationalisation

The site supports English and Afrikaans. Language preference is persisted to `localStorage` (key: `yu_lang`) and the `<html lang>` attribute is updated dynamically.

All copy lives in `components/LanguageContext.tsx`.

## Waitlist API

`POST /api/waitlist` accepts JSON `{ name, email, org, type }`.

- Validates inputs server-side
- Rate-limits to 3 requests per IP per 60s
- Attempts to write to `data/waitlist.json` (local dev only; read-only FS on Vercel)
- Sends notification email to team via Resend
- Sends confirmation email to registrant

For production persistence, integrate Vercel KV or a Postgres database.

## Deployment

Push to `main` → Vercel auto-deploys.

Set environment variables in the Vercel project dashboard.
