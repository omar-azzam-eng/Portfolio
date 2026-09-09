# Omar Azzam — Backend Engine Portfolio

A React + TypeScript personal portfolio designed around Omar Azzam's backend engineering and AI profile.

## Design direction

- Premium backend-systems visual language
- Fixed, compact-on-scroll navigation with active-section feedback
- Case-study project storytelling with System Brief, Engineering Notes, and Stack hierarchy
- Backend Identity section built around Architecture, API Engineering, Data Layer, and Real-time systems
- Technology constellation grouped by engineering layer
- Responsive experience timeline, education, languages, and contact sections
- Custom pointer interactions on fine-pointer devices only
- Refined type scale and spacing for desktop, tablet, 430px mobile, and narrow 350px layouts

## UI/UX refinement

- Unified responsive section spacing through shared CSS tokens
- Reduced oversized typography in Backend Identity
- Improved readable line lengths and heading balance
- Removed misleading project-card link affordance from non-clickable projects
- Stronger project information hierarchy without inventing unsupported project claims
- More restrained motion and hover behavior
- Touch-device hover fallbacks
- Improved small-screen architecture and ML visual layouts

## Accessibility and bug fixes

- Strict section heading relationships with `aria-labelledby`
- Keyboard focus trap in the mobile navigation dialog
- Escape-key menu dismissal
- Focus restoration to the menu button after the dialog closes
- Body scroll locking without scrollbar-layout jump
- Fine-pointer-only custom cursor
- `prefers-reduced-motion` support
- Semantic image roles for system visualizations
- Visible focus states and skip navigation link

## Production polish

- SEO description and canonical URL
- Open Graph and Twitter metadata
- Theme/color-scheme metadata
- Inline OA favicon
- Google Fonts preconnect instead of CSS `@import`
- `.gitignore` for build output, dependencies, environment files, and TypeScript build info

## Engineering standards

- Strict TypeScript architecture
- Small, focused React components
- Reusable UI components and hooks
- Feature-oriented source structure
- No explicit `any` in application source
- Semantic HTML and visible focus states
- Cleanup for scroll/event effects
- Project follows the included `AGENTS.md` ruleset

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run build
npm run lint
npm run format
```

## Validation performed in this package

- TypeScript/TSX syntax pass across all source files
- Relative import resolution check
- Explicit `any` usage scan

A dependency-aware Vite/TypeScript production build still requires `npm install`. The packaging environment could not complete dependency downloads, so run the quality commands above after installing packages on a normal network connection.

## QA

See `QA_REPORT.md` for the latest responsive/browser QA pass and fixes.

## GitHub Pages deployment

This project is configured for Omar's GitHub Pages repository path:

```text
https://omar-azzam-eng.github.io/omar-azzam/
```

`vite.config.ts` sets `base: '/omar-azzam/'` so production assets resolve correctly from the repository subpath.

A GitHub Actions workflow is included at `.github/workflows/deploy-pages.yml`. After pushing to the `main` branch, enable **Settings → Pages → Source: GitHub Actions** in the repository if it is not already enabled.

The `public/` directory also includes `robots.txt` and `sitemap.xml` for the production URL.

## Release-candidate additions

- Correct GitHub Pages Vite base path for `/omar-azzam/`
- GitHub Pages deployment workflow
- Downloadable copy of Omar's provided CV
- `robots.txt` and `sitemap.xml`
- 1200×630 Open Graph/Twitter sharing image
- Production canonical URL normalized with trailing slash
- External portfolio link kept exactly to the URL supplied in the CV; no unsupported social profile URLs were invented
