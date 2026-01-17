<!-- TEMPLATE FILE - Fill this out with your project's architecture and technical decisions. -->

# Project Architecture

This project is being rebuilt from scratch (legacy scaffold is referenced in `legacy/` but not used as the base). The goal is a simple, fast portfolio with optional “real” demo deployments that can also showcase DevOps practices.

## System Overview
- **Portfolio site (primary):** content-forward, fast static site.
- **Demo apps (optional):** separate deployables (some may have their own backend/DB depending on the demo).
- **Content sources (initially):** static data files for projects/links/metadata; optional markdown for posts.
- **Contact handling (optional):** no-DB default; add serverless/email workflow only if needed.
- **Hosting strategy:** hybrid by design — some components self-hosted (to demonstrate ops) and some cloud-hosted (for practicality and comparison).

## Technology Stack
- **Current state:** static HTML mockup (`mockups/homepage.html`) used to iterate on layout.
- **Target state (recommended):**
  - Static site framework (TBD) that can build from data files + markdown.
  - Hosting that supports custom domains + previews (provider TBD).
  - Optional serverless function for contact form submission (spam-protected) if a form is desired.

## Data & Content Strategy
- **Simple static data** (name, location, links, project metadata) should live in a single structured source (e.g., `site.json` / `site.ts`) rather than scattered across components.
- **Projects** should be represented as structured entries with:
  - `title`, `summary`, `stack`, `thumbnail`, and **links**: `live`, `video`, `github`
  - optional **docs/media links**: `docs` and/or `photos`
  - optional flags like `status: "wip" | "active" | "archived"` and `wipNote`
- **Writing** can start as:
  - link-out to a blog, or
  - local markdown posts for a `/writing` section
- **“On X” excerpts** should be treated as secondary content (right rail on desktop) and ideally loaded without heavy third-party embeds.

## Key Design Patterns
- **No database by default:** only introduce a DB for features that truly need persistence/query (e.g., admin UI, stored contact submissions, user accounts, demo backends).
- **Build-time rendering:** generate pages from data files/markdown for speed and simplicity.
- **Progressive enhancement:** keep core content accessible without JavaScript; JS only for small UX wins (theme toggle, etc.).

## Technical Decisions
### Resume Accessibility
- Prefer `/resume` (HTML) for quick skim + ATS friendliness, with a clear “Download PDF” action.
- Avoid surprising auto-download behaviors.

### Demos: Subdomains vs Paths
- **Default:** `chaceraiter.com/demos/<name>` for simple/static demos.
- **Promote to subdomain:** `<name>.chaceraiter.com` when a demo needs isolation, a different stack, a backend, or when we want to showcase DevOps patterns (separate deployments, CI/CD, observability).
- **DevOps showcase path:** start with one “flagship” demo on a subdomain + documented pipeline/infra; expand as needed.

### Security & Privacy Defaults
- Avoid third-party “timeline embeds” for X that add tracking/heavy scripts; prefer static excerpts with link-out or build-time fetched content with caching.
- Email exposure: prefer a contact form workflow; if direct email is shown, consider basic address obfuscation and/or “copy” UX rather than raw `mailto:` everywhere.

## Deployment Notes (Aspirational)
- **Self-hosted components** are a feature, not an accident: prefer containerized demos, reproducible deploys, and documented ops (health checks, logging, backups where needed).
- **Cloud components** can remain when they’re the best tool (e.g., simple static hosting/CDN), but the portfolio should clearly communicate what is self-hosted vs hosted elsewhere.

## Repo & Infra Documentation Strategy (Decision Pending)
- **Goal:** domain setup (primary domain + redirects), DNS/TLS, hosting, and redirect rules should be documented as part of the DevOps showcase.
- **Option A (single repo):** keep ops docs (and optionally IaC) in this repo (e.g., `docs/ops/`, `infra/`) alongside the portfolio code.
- **Option B (split repos):** keep this repo focused on the portfolio, and maintain a separate infra repo for reusable/self-hosted/cloud configuration (useful if infra spans multiple projects or if we want private IaC).
- **Current status:** choose later once the hosting provider/DNS strategy and desired privacy level for infra code are clear.
