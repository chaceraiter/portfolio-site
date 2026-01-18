<!-- TEMPLATE FILE - Fill this out and update it regularly with the current state of your project. -->

# Current Context for New Chat

## Status
- `legacy/` contains an older React/FastAPI/Docker scaffold plus a detailed planning doc, but the frontend UI was not implemented (no `src/` in `legacy/frontend/`).
- A new static homepage mockup exists at `mockups/homepage.html` with hash-based “views” (Projects/Resume/Blog/Contact) and a consistent right rail.
- `mockups/homepage.html` top bar now shows the active view label (“Viewing: …”); hash-based views are still deep-linkable (`#projects`, `#resume`, `#blog`, `#contact`) without snapping scroll on every click (initial load only).
- Resume PDF exists at `resume/resume.pdf` and is embedded directly in the mockup’s Resume view.
- Headshot exists at `assets/headshot.jpg` (fallback placeholder at `assets/headshot-placeholder.svg`).
- Local preview server is used for reliable testing (Safari can be odd with `file://`); last known good port was `8001`.

## Current Decisions
- Persistent shell: keep the header + right rail stable; switch the main view with URL hash (`#projects`, `#resume`, `#blog`, `#contact`).
- Homepage project tiles should include: thumbnail + clear actions (Live, Video, GitHub, Docs) and a visible status marker (WIP / Under construction).
- Default to light theme; keep a theme toggle.
- Side rail on desktop is acceptable, but must remain secondary to the main content.
- Resume UX target: resume view inside the site + open/download PDF options (avoid surprise auto-download).
- Demos strategy: start with path-based demos; promote select demos to subdomains to showcase DevOps patterns and isolate stacks.
- Final framework/stack is intentionally undecided until the mockup + content model are approved.
- Contact approach: prefer spam-resistant contact (copy-email button + LinkedIn messaging link; optional form later).

## Next Questions
- Does the top bar “Viewing: …” label solve the “empty middle” feeling, or should it be a compact view nav (Projects/Resume/Blog/Contact) that only appears after scroll?
- Should the header remain sticky everywhere (current mockup uses a sticky header + “Back to top”)?
- Where should domain/infra documentation live: this repo (`docs/ops`, optional `infra/`) vs a separate infra repo?

## Active UI Issues (Mockup)
- Continue tuning header density, “empty middle” feel, and overall spacing/horizontal rules.
- Decide where to add additional horizontal separators (user will specify).

## Backlog (Near-Term)
- Layout polish (persistent shell):
  - Make the sticky top bar thinner and intentional (avoid “empty middle” feeling).
  - Consider a centered “Back to top” / status line only after scroll.
  - Add horizontal rules where they increase clarity (not decoration).
- Projects content model:
  - Add “Work in progress” markers per project (badge/label + brief note).
  - Ensure tiles support missing links gracefully (e.g., no live demo yet).
- Resume:
  - Keep `Last updated` current and ensure PDF preview + download work consistently.
- Contact:
  - Decide form vs direct email.
  - If form: add spam protection plan (honeypot/rate limit/CAPTCHA alternative) and avoid storing secrets in repo.
  - Email protection: avoid putting a raw address everywhere; keep copy-to-clipboard (`REFRESH: contact-email`) and consider a form-first flow later.
- Social:
  - X: show short excerpts without third-party embed; emphasize “active daily” with timestamps.
  - YouTube: include as a primary link and optionally per-project video links.
- DevOps showcase:
  - Identify one flagship demo to deploy on a subdomain with documented CI/CD + observability.
  - Document domain setup + redirects + TLS in-repo (location/structure is a pending decision).
