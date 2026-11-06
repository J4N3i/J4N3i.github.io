# Janeesha Vishwaprabha | Full-Stack & DevOps Portfolio

[![CI](https://github.com/J4N3i/J4N3i.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/J4N3i/J4N3i.github.io/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/J4N3i/J4N3i.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/J4N3i/J4N3i.github.io/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A high-performance, accessible, and SEO-optimized personal portfolio showcasing full-stack engineering, distributed systems, and DevOps infrastructure projects. Built with React 18, TypeScript, and Vite, featuring custom GSAP ScrollTrigger animations, static prerendering for search engine crawlers, structured JSON-LD Person schema, and an interactive AI assistant chatbot.

**Live Site:** [https://janeeshagamage.com](https://janeeshagamage.com)

---

## Preview

```
+-----------------------------------------------------------------------+
|  [JG]   About   Experience   Education   Skills   Projects   Resume   |
+-----------------------------------------------------------------------+
|                                                                       |
|                     Janeesha Vishwaprabha                             |
|               Building the Digital Future                             |
|                                                                       |
|        CS Undergraduate at SLIIT | DevOps & Full-Stack Engineer       |
|                                                                       |
|            [ View My Work ]      [ Download CV ]                      |
|                                                                       |
+-----------------------------------------------------------------------+
```

---

## Tech Stack

- **Core:** React 18, TypeScript (Strict Mode), Vite 5
- **Styling:** Tailwind CSS, PostCSS, Lucide Icons, Phosphor Icons
- **Motion & Interactions:** GSAP 3 (GreenSock), ScrollTrigger
- **Prerendering:** Node.js native SSR (`react-dom/server`) build pipeline
- **Forms & Email:** EmailJS (`@emailjs/browser`) with honeypot & client rate limiting
- **Testing:** Vitest 2, React Testing Library, jsdom
- **Tooling & Quality:** ESLint 9, Prettier, Husky, lint-staged, Commitlint (Conventional Commits)
- **CI/CD:** GitHub Actions (Automated CI validation + GitHub Pages deployment)

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI workflow (lint, type-check, test, build)
│       └── deploy.yml          # GitHub Pages deployment pipeline
├── .husky/                     # Git hooks (pre-commit, commit-msg)
├── public/                     # Static assets, CVs, robots.txt, sitemap.xml
├── scripts/
│   └── prerender.mjs           # Static SSR injection script for crawler SEO
├── src/
│   ├── __tests__/              # Integration and smoke tests
│   ├── components/             # Modular React components (< 200 lines each)
│   │   ├── about/              # ProfileCard, SkillsGrid
│   │   ├── chatbot/            # ChatWindow, ChatMessage, ChatInput
│   │   ├── common/             # SectionHeader, reusable UI primitives
│   │   ├── contact/            # ContactForm
│   │   ├── hero/               # HeroBackground, HeroCTA, HeroScrollIndicator
│   │   ├── navigation/         # MobileMenu, ResumeDropdown
│   │   └── ui/                 # Accessible toast and tooltip primitives
│   ├── constants/              # Shared animation timings & scroll trigger points
│   ├── data/                   # Single source of truth for all content
│   │   ├── certifications.ts   # Certificates & credentials data
│   │   ├── education.ts        # Academic history
│   │   ├── experience.ts       # Work experience & leadership roles
│   │   ├── navigation.ts       # Navbar links & anchors
│   │   ├── profile.ts          # Contact details, bio, CV links, socials
│   │   ├── projects.ts         # Portfolio projects & featured tags
│   │   └── skills.ts           # Technical skills & stack groupings
│   ├── hooks/                  # Custom hooks (useActiveSection, useSectionReveal)
│   ├── lib/                    # Pure utility functions (chatbot, email, utils)
│   ├── pages/                  # Index and NotFound route components
│   ├── types/                  # Typed interfaces for all domain models
│   ├── entry-server.tsx        # SSR entry point for prerendering
│   └── main.tsx                # Client-side hydration entry point
├── .env.example                # Example environment variables template
├── commitlint.config.js        # Commitlint configuration
├── tsconfig.app.json           # Strict TypeScript configuration
└── vitest.config.ts            # Vitest unit test configuration
```

---

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
git clone https://github.com/J4N3i/J4N3i.github.io.git
cd J4N3i.github.io
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your EmailJS credentials:

```bash
cp .env.example .env
```

| Variable                   | Description         | Default / Example   |
| :------------------------- | :------------------ | :------------------ |
| `VITE_EMAILJS_SERVICE_ID`  | EmailJS service ID  | `service_portfolio` |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID | `template_contact`  |
| `VITE_EMAILJS_PUBLIC_KEY`  | EmailJS public key  | Public key token    |

### Development Server

```bash
npm run dev
```

Runs the Vite dev server at `http://localhost:5173`.

### Code Quality & Formatting

```bash
# Run ESLint
npm run lint

# Check formatting with Prettier
npm run format:check

# Auto-format all code
npm run format

# Run TypeScript strict type-checking
npx tsc --noEmit
```

### Running Tests

```bash
npm test
```

Executes the Vitest test suite (Chatbot intent logic, `useActiveSection` hook observer, and Index page smoke render).

### Production Build & Prerender

```bash
npm run build
```

This runs:

1. `vite build` (compiles client assets into `dist/`)
2. `vite build --ssr src/entry-server.tsx --outDir dist-ssr` (bundles the SSR renderer)
3. `node scripts/prerender.mjs` (renders the static HTML into `dist/index.html` with full semantic tags, noscript fallbacks, and meta tags)

To preview the production build locally:

```bash
npm run preview
```

---

## Architecture Decisions

### 1. Static Prerendering (SSR to Static HTML)

- **Why:** Pure client-side rendered Single Page Applications (SPAs) ship an empty `<div id="root"></div>`. Search engine crawlers (Googlebot, Bingbot) and social platform preview generators (LinkedIn Post Inspector, Twitter/X cards, OpenGraph) frequently struggle to execute heavy client-side JavaScript or penalize indexation speed.
- **Implementation:** We compile `src/entry-server.tsx` during build time, render the complete component hierarchy with `react-dom/server`, and inject the prerendered HTML into `dist/index.html`. This ensures immediate First Contentful Paint (FCP), zero crawl penalties, and full accessibility without requiring a Node.js server in production.

### 2. GSAP Context & Motion Safety

- **Why:** High-performance scroll-driven parallax and staggered reveals demand GPU-accelerated transforms without layout thrashing.
- **Implementation:** All animation logic is wrapped inside `src/hooks/useSectionReveal.ts` utilizing `gsap.context(..., scopeRef)`. This guarantees clean teardown (`ctx.revert()`) on component unmount and automatically respects the user's `prefers-reduced-motion: reduce` system preference by bypassing animations and displaying content statically. Furthermore, initial hidden states are set strictly via JavaScript so content remains fully visible if JavaScript is slow or fails.

### 3. Content Decoupling (`src/data/`)

- **Why:** Personal information, projects, resume URLs, and credentials should never be hard-coded across scattered JSX components.
- **Implementation:** All copy and structural data live inside strongly-typed TypeScript files in `src/data/` (typed against interfaces in `src/types/index.ts`). `src/data/profile.ts` serves as the single source of truth for names, URLs, email addresses, and CV links, allowing painless updates without touching presentation or styling code.

---

## Deployment

The project is continuously deployed to **GitHub Pages** via GitHub Actions:

- `.github/workflows/ci.yml`: Runs on every push and pull request, executing `npm ci`, linting, type checks (`tsc --noEmit`), Vitest suite, and the prerender build.
- `.github/workflows/deploy.yml`: Deploys the prerendered `dist/` directory to GitHub Pages upon every merge to `main`.
- Custom domain `janeeshagamage.com` is configured with `CNAME` and SSL termination through Cloudflare / GitHub Pages with automated 301 redirects from `www.janeeshagamage.com`.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
