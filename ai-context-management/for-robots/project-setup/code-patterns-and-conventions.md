<!-- TEMPLATE FILE - Fill this out with your project's code patterns and conventions. -->

# Code Patterns and Conventions

## Content & Data
- Prefer a single canonical content source for “site metadata” (name, location, links, projects).
- Project entries should support:
  - `thumbnail`
  - primary links: `live`, `video`, `github`
  - `status` (`wip` / `active` / `archived`) and optional “work in progress” marker text
- Use lightweight maintenance tags in code for items that should be periodically reviewed (search for `REFRESH:`); see `MAINTENANCE.md`.

## UI Conventions
- Default to **light theme**, keep a theme toggle.
- Avoid common “vibe-coded” tropes: glassmorphism, glow blobs, neon gradients, generic hype copy, excessive micro-animations.
- Prefer **content-forward hierarchy**:
  - Projects are primary.
  - Side rail content is secondary and should not dominate the page.
- Use **smaller or less-rounded radii** than typical templates (lean toward restrained corners).
- Make project actions easy to scan/click:
  - “Live / Video / GitHub” should be visually prominent and consistent across tiles.
  - Prefer clear text labels over ambiguous icons.
- **Persistent shell UX:** keep the header + right rail stable while switching the main “view” (Projects / Resume / Blog / Contact).
- **Deep-linkable views:** use URL state (`#projects`, `#resume`, `#blog`, `#contact`) so each view is directly linkable and works with back/forward.
- **Social links:** keep them visually separate from the site “view” controls; it’s OK to be lightly playful (“real person” tone), but keep it clean.

## Accessibility
- Maintain visible focus states.
- Use semantic headings and landmarks (`header`, `main`, `nav`, etc.).
- Ensure buttons/links have descriptive labels (no “click here”).

## Security & Privacy
- Prefer link-outs / lightweight excerpts over third-party social embeds.
- If showing an email address, prefer a contact form workflow or a copy-to-clipboard button; avoid spraying raw `mailto:` links everywhere.
