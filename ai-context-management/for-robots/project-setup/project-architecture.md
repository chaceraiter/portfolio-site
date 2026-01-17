<!-- TEMPLATE FILE - Fill this out with your project's architecture and technical decisions. -->

# Project Architecture

This project is being rebuilt from scratch (legacy scaffold is referenced in `legacy/` but not used as the base). The goal is a simple, fast portfolio with optional “real” demo deployments that can also showcase DevOps practices.

## System Overview
- **Portfolio site (primary):** content-forward, fast static site.
- **Demo apps (optional):** separate deployables (some may have their own backend/DB depending on the demo).
- **Content sources (initially):** static data files for projects/links/metadata; optional markdown for posts.
- **Contact handling (optional):** no-DB default; add serverless/email workflow only if needed.

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
