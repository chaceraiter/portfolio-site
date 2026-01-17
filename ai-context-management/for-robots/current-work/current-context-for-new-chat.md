<!-- TEMPLATE FILE - Fill this out and update it regularly with the current state of your project. -->

# Current Context for New Chat

## Status
- `legacy/` contains an older React/FastAPI/Docker scaffold plus a detailed planning doc, but the frontend UI was not implemented (no `src/` in `legacy/frontend/`).
- A new static homepage mockup exists at `mockups/homepage.html` for quick layout critique (no build tooling required).
- Resume page stub exists at `resume/index.html` with a placeholder PDF at `resume/resume.pdf`.
- Headshot placeholder exists at `assets/headshot-placeholder.svg`; drop a real photo at `assets/headshot.jpg`.

## Current Decisions
- Homepage project tiles should include: thumbnail + Live instance + Video demo + GitHub repo actions.
- Default to light theme; keep a theme toggle.
- Side rail on desktop is acceptable, but must remain secondary to projects and align cleanly with the project tile grid.
- Resume UX target: `/resume` page + “Download PDF” (avoid surprise auto-download).
- Demos strategy: start with path-based demos; promote select demos to subdomains to showcase DevOps patterns and isolate stacks.
- Final framework/stack is intentionally undecided until the mockup + content model are approved.

## Next Questions
- What should the homepage prioritize: projects-first, writing-first, or narrative-first?
- Do we want a single-page scroll, or separate pages for Projects / Writing / About?
- Where should domain/infra documentation live: this repo (`docs/ops`, optional `infra/`) vs a separate infra repo?

## Active UI Issues (Mockup)
- Desktop alignment: “On X” panel top/thumbnail area should align with the top of project tile thumbnail area (or move project tiles up under the hero).
- Tightness/padding: continue tuning spacing, radii (less rounded), and button prominence.

## Backlog (Near-Term)
- Layout polish:
  - Decide whether projects start immediately under hero (and where the rail begins).
  - Make “Live / Video / GitHub” actions more prominent (size/weight/placement).
  - Reduce border radius (more restrained corners).
  - Revisit top header + “Let’s Talk” CTA sizing/visual weight.
- Projects content model:
  - Add “Work in progress” markers per project (badge/label + brief note).
  - Ensure tiles support missing links gracefully (e.g., no live demo yet).
- Resume:
  - Add `/resume` page concept (HTML view) and linkable PDF, with last-updated date.
- Contact:
  - Decide form vs direct email.
  - If form: add spam protection plan (honeypot/rate limit/CAPTCHA alternative) and avoid storing secrets in repo.
  - Email protection: avoid putting a raw address everywhere; consider “copy email” UX or form-first.
- Social:
  - X: show short excerpts without third-party embed; emphasize “active daily” with timestamps.
  - YouTube: include as a primary link and optionally per-project video links.
- DevOps showcase:
  - Identify one flagship demo to deploy on a subdomain with documented CI/CD + observability.
  - Document domain setup + redirects + TLS in-repo (location/structure is a pending decision).
