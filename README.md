# Anant Family Dhaba — Website Frontend

A production-ready marketing website for **Anant Family Dhaba** (अनंत फॅमिली ढाबा) — Home, full Menu (transcribed from the physical menu cards), About, Gallery, Contact, and Reservation, built as a modular React + TypeScript single-page app.

## Tech Stack

| Concern         | Choice                                                                 |
| --------------- | ---------------------------------------------------------------------- |
| Framework       | React 19 + TypeScript, Vite                                            |
| Routing         | React Router v7 (route-based code splitting)                           |
| Data fetching   | TanStack Query                                                         |
| HTTP client     | Axios (with interceptors, env-configurable base URL)                   |
| State           | Zustand (UI-only state, e.g. mobile nav)                               |
| Forms           | React Hook Form + Zod                                                  |
| Styling         | CSS Modules + CSS variables (no global component CSS)                  |
| Testing         | Vitest + React Testing Library                                         |
| Tooling         | ESLint (flat config, strict TypeScript), Prettier, Husky + lint-staged |
| Package manager | pnpm                                                                   |

### Why not Module Federation?

The original brief asked for a micro-frontend architecture. True Module Federation (independently _deployed_ remotes) adds real infrastructure overhead — separate build/deploy pipelines, remote hosting, runtime version skew — with no payoff for a single-team, single-deploy marketing site. Instead, this app is a **modular monolith**: every feature lives in its own self-contained module (`components/`, `hooks/`, `services/`, `types/`, `routes/`) with no cross-module imports, loaded via route-based lazy loading. Any module could be extracted into a real remote later without restructuring — the seams are already there.

### Scope

This build covers the **marketing site**: Home, Menu, About, Gallery, Contact, Reservation. Auth, Cart, and Checkout were intentionally left out — the physical menu shown has no online ordering, so there's nothing for a cart/checkout flow to operate on yet. If online ordering becomes a real requirement, `modules/cart` and `modules/checkout` can be added following the same module pattern.

## Getting Started

```bash
pnpm install
pnpm dev          # start the dev server
```

### Scripts

| Command                             | Purpose                                        |
| ----------------------------------- | ---------------------------------------------- |
| `pnpm dev`                          | Start the Vite dev server                      |
| `pnpm build`                        | Type-check (`tsc -b`) and build for production |
| `pnpm preview`                      | Preview the production build locally           |
| `pnpm lint` / `pnpm lint:fix`       | Lint (and autofix) with ESLint                 |
| `pnpm format` / `pnpm format:check` | Format (or check formatting) with Prettier     |
| `pnpm typecheck`                    | Type-check without emitting                    |
| `pnpm test` / `pnpm test:watch`     | Run the Vitest suite (once / watch mode)       |

A pre-commit hook (Husky + lint-staged) runs ESLint and Prettier on staged files automatically.

## Folder Structure

```
src/
  app/            App.tsx — top-level composition
  components/      Shared, reusable UI (Button, Card, Container, Badge, SectionHeading, LoadingSpinner, PageMeta)
  layouts/         Header, Footer, MainLayout
  modules/
    home/          Hero, USP strip, featured menu, about teaser, reserve CTA
    menu/          Full menu: category nav, diet filter, item rows, transcribed data
    about/         Story + values
    contact/       Contact form (RHF + Zod) + info
    reservation/   Reservation form (RHF + Zod) + WhatsApp confirmation fallback
    gallery/       Branded placeholder gallery (see note below)
    notFound/      404 page
  shared/
    api/           Axios instance + interceptors
    hooks/         useMediaQuery, useScrolled, useScrollToTop, useLockBodyScroll
    services/      Cross-module services (e.g. newsletter)
    utils/         formatPrice, etc.
    constants/     Site info, nav links (siteInfo — see "Placeholders" below)
    types/         Shared types
    assets/        Logo, icons
  styles/          reset.css, variables.css (design tokens), typography.css
  routes/          Route definitions + lazy imports
  providers/       QueryProvider, AppProviders
  store/           Zustand stores (uiStore)
  config/          env.ts (typed import.meta.env wrapper)
  lib/             Small framework-agnostic helpers (cn)
```

Every component that has meaningful props/behavior follows:

```
ComponentName/
  ComponentName.tsx
  ComponentName.module.css
  ComponentName.types.ts   (when it takes props)
  ComponentName.test.tsx   (when it has meaningful logic to verify)
  index.ts
```

## Styling

- No global component styling — every component owns its CSS Module.
- `src/styles/variables.css` defines the brand palette and design tokens as CSS variables: Fire Orange `#FF5722`, Saffron Gold `#FFB300`, Mahogany Maroon `#3B0000`, Warm Cream `#F5EBE0`, Charcoal Black `#1C1917`, Dhaba Brown `#2A1A17`, plus spacing/radius/shadow/typography scales.
- `src/styles/reset.css` and `typography.css` are the only global stylesheets (reset + base type + the `.sr-only` a11y utility).
- Breakpoints: mobile (default), tablet 600px, laptop 960px, desktop 1280px, large 1600px.

## Environment Variables

See `.env.example`. `.env.development` / `.env.production` hold non-secret defaults and are committed; anything sensitive belongs in `.env.local` (gitignored).

| Variable                                                              | Purpose                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL`                                                   | Backend base URL. **Left empty by default** — the Contact and Reservation forms and the newsletter signup then simulate a successful submission locally instead of calling a real endpoint. Set this once a backend exists and the same forms will start hitting real endpoints (`/contact`, `/reservations`, `/newsletter`, `/menu`) with no code changes. |
| `VITE_SITE_NAME`                                                      | Display name used in headings and meta tags.                                                                                                                                                                                                                                                                                                                |
| `VITE_CONTACT_PHONE` / `VITE_CONTACT_WHATSAPP` / `VITE_CONTACT_EMAIL` | Contact details shown in the header, footer, and reservation confirmation.                                                                                                                                                                                                                                                                                  |

## Known Placeholders

A few things use clearly-marked placeholder data because the real values weren't available at build time — search for `TODO` in `src/shared/constants/site.ts`:

- **Address** — shows "Address coming soon" until a real address is set.
- **Phone / WhatsApp / email** — default to placeholder numbers via env vars; set real values in `.env.local` or your Netlify env config.
- **Social links** — Instagram/Facebook currently point at the bare domains.
- **Gallery** — there's no standalone food photography yet (only the menu card scans and logo were provided), so the Gallery page uses branded icon tiles instead of pretending stock imagery is real food. Swap in real photos in `src/modules/gallery/routes/GalleryPage.tsx` when available.
- **Canonical/OG URLs** in `index.html` and `public/sitemap.xml` use a placeholder domain (`anantfamilydhaba.com`) — update once the real domain is known.

## Deployment (Netlify)

`netlify.toml` is already configured:

- Build command installs pnpm via Corepack, then runs `pnpm build`.
- Publish directory: `dist`.
- SPA redirect (`/* → /index.html`) so client-side routes work on refresh/deep-link.
- Long-term caching for hashed assets; basic security headers for all routes.

To deploy:

1. Push this repo to GitHub (already done for this branch).
2. In Netlify: **Add new site → Import an existing project**, pick this repo.
3. Netlify will read `netlify.toml` automatically — no manual build settings needed.
4. Set any real values for the environment variables above under **Site settings → Environment variables** (only needed once you have a real backend/contact details — the site works out of the box without them).
5. Every push to `main` triggers a new production build.

## Testing

`pnpm test` runs the Vitest + React Testing Library suite — component smoke tests, form validation/submission flows, and route-level rendering checks, colocated with the code they cover.

## Coding Standards

- Strict TypeScript, no `any`.
- Functional components only.
- Each module is self-contained (own components/hooks/services/types) — no reaching into another module's internals.
- CSS Modules only; shared visual language lives in CSS variables, not duplicated literals.
