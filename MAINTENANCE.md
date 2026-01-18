# Maintenance

This repo is intentionally “content-forward”. To keep it feeling real and current, we track routine updates with lightweight `REFRESH:` tags in the code.

## How To Find What Needs Updating
- Search: `rg -n "REFRESH:" .`
- Each `REFRESH:` tag marks content that should be periodically reviewed (resume date, resume PDF, projects list, etc.).

## Suggested Cadence
- Monthly: project list order, “On X” excerpts, broken links
- Quarterly: resume PDF + resume last-updated date, About/summary copy
- As-needed: new projects, new demos, new videos, new docs/photos

## Current Tagged Items
- `REFRESH: resume-last-updated` (resume page date)
- `REFRESH: resume-pdf` (resume PDF content)
- `REFRESH: contact-email` (email copy button in contact view)

## Optional (Later)
- Add a single `site.json` / `site.ts` content file with `lastUpdated` fields and generate pages from it.
- Add a small script/CI check that fails if `lastUpdated` is older than a threshold.
