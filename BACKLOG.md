# Portfolio Site Backlog

Tracked work for chaceraiter.com. Items are grouped by category with rough priority.

---

## Visual / Layout

- [ ] **Remove design hint text** — "What this page should answer" (hero card), "Each tile: thumbnail + Live, Video, GitHub, Docs" (projects section head), "Link out or mirror later" (blog section head). These are internal notes, not visitor-facing.
- [ ] **Header "empty middle" decision** — The "Viewing: ..." indicator works but doesn't feel intentional. Options: compact nav bar on scroll, remove indicator, or keep as-is.
- [ ] **Favicon** — No favicon set. Browsers show default icon.
- [ ] **Contact form** — Button says "Send (mock)". Either wire up to a backend (email service, Formspree, etc.) or replace with a message explaining contact options.
- [ ] **Footer** — Minimal (just copyright). Consider adding social links or back-to-top. Fine for v1.

## Content

- [ ] **Real project tiles** — All 4 tiles are placeholder. Need: project names, descriptions, stacks, links (Live/Video/GitHub/Docs), thumbnails.
- [ ] **Test subdomain project tile** — Add `test.chaceraiter.com` as a live infrastructure demo tile. Mockup ready (proposed in groupchat 001.md).
- [ ] **Hero card bio/tagline** — Replace "What this page should answer" with real bio text.
- [ ] **Email address** — `emailUser` / `emailDomain` in main.js are "(set)". Set real values.
- [ ] **Calendar link** — Currently `href="#"`. Add Calendly/cal.com link or remove.
- [ ] **Availability / timezone** — Both say "(set later)". Fill in.
- [ ] **YouTube link** — Disabled with "(soon)". Add real link when ready or remove.
- [ ] **Blog posts** — 3 placeholder posts. Add real content or remove section until ready.

## X / Twitter Feed

- [ ] **v1: Manual curated** — Pick 2-3 real tweets, paste text + date + URL into sidebar. Update "Latest" timestamp.
- [ ] **v2: Automated feed** — Cron-based fetch via X API or RSSHub → static HTML snippet → git commit → deploy. See research notes below.

### X API Research Notes

**X API v2 free tier cannot read user timelines.** Free tier only supports POST tweets and GET /2/users/me. Timeline read access requires Basic tier ($200/mo) — too expensive for a portfolio sidebar.

**Alternatives:**
- **RSSHub (self-hosted)**: Open-source RSS generator, can create feeds from public X profiles. Requires Docker hosting. Most viable automated option.
- **Manual curated (recommended for v1)**: Zero dependencies, full design control. Update by hand when desired.
- **Third-party RSS services** (RSS.app, TwitRSS.me): Fragile, may break when X changes policies.
- **Nitter**: Discontinued Feb 2024, not viable.

**Minimal automated pipeline (v2):**
1. Self-host RSSHub on existing infra (static-01 or edge-01)
2. Cron script fetches RSS feed, extracts latest 3 tweets
3. Renders to a static HTML snippet (or JSON) in the repo
4. Git commit + push → deploy via `git pull` on static-01
5. Runs daily or on schedule

## Mobile

- [ ] **Real device testing** — Test on iPhone SE (320px), standard phone (375px), tablet. Main risk: header crowding on very narrow screens (brand text + buttons).
- [ ] **Fix any header overflow** — Brand subtitle may clip on small screens.

## Security (coordinate with infra-mgmt)

- [ ] **Content-Security-Policy header** — See detailed analysis below.
- [ ] **HSTS** — Coordinate with infra-mgmt on whether to add at Traefik middleware or nginx level.

### Content-Security-Policy — Detailed Analysis

**Why wait:** CSP blocks resources that don't match the policy. If we set it now and later add Google Fonts, an analytics script, or a third-party embed, the browser will silently block them. Best to stabilize content first, then lock down.

**Current resource audit (as of index.html):**
- **Scripts:** `main.js` (same-origin only). No external scripts.
- **Styles:** `style.css` (same-origin). Plus 4 inline `style=""` attributes on HTML elements (margin-top, margin overrides). No external fonts or stylesheets.
- **Images:** `assets/headshot.jpg`, `assets/headshot-placeholder.svg` (same-origin only).
- **Frames:** `resume/resume.pdf` embedded via `<iframe>` (same-origin).
- **Inline JS:** 3 `onerror` handlers on `<img>` tags for headshot fallback. These are inline event handlers, which require `'unsafe-inline'` in `script-src` (or a nonce/hash).
- **External links:** GitHub, LinkedIn, X — these are navigation links (`<a>` tags), not resource loads. CSP doesn't restrict `<a href>` navigation.
- **Fonts:** System font stack only (`ui-sans-serif, system-ui, ...`). No external font loads.

**Draft CSP policy (starting point):**
```
Content-Security-Policy:
  default-src 'none';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self';
  frame-src 'self';
  font-src 'self';
  connect-src 'self';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
```

**Notes on the draft:**
- `style-src 'unsafe-inline'` is needed for the 4 inline style attributes. To remove this, refactor inline styles into CSS classes.
- `script-src 'self'` (no `'unsafe-inline'`) will **break the 3 onerror handlers** on img tags. To fix: either (a) add `'unsafe-inline'` to script-src (weakens CSP), (b) use nonces (requires server-side injection — not viable for static hosting), or (c) **refactor the onerror fallback into main.js** using JS event listeners instead of inline handlers. Option (c) is recommended.
- `frame-ancestors 'none'` prevents the site from being embedded in iframes on other sites (clickjacking protection). This duplicates X-Frame-Options but is the modern standard.

**Implementation steps:**
1. Refactor inline `onerror` handlers → JS event listeners in `main.js`
2. Optionally refactor inline `style=""` attributes → CSS classes (to drop `'unsafe-inline'` from style-src)
3. Apply the CSP header at nginx level (static-01) or Traefik middleware (edge-01)
4. Test thoroughly — check browser console for CSP violation reports
5. Consider adding `report-uri` or `report-to` for monitoring violations in production

**When to implement:** After content stabilizes (real projects, blog, X feed). If external resources are added later (Google Fonts, analytics, embeds), the policy must be updated to allow them.

---

## Health Check Endpoint

- [ ] **healthz file** — See detailed analysis below.

### healthz — Detailed Analysis

**Current situation:** The `healthz` file exists at `/home/chaceops/repo/healthz` on static-01 but is NOT tracked in git. It was manually created (`echo 'ok' > healthz`). If the repo is freshly cloned, this file disappears, and Docker/Traefik health checks will fail (503 or timeout).

**Options:**

**Option A: Add `healthz` to the git repo (RECOMMENDED)**
- Create `healthz` at repo root with contents `ok`
- Commit and push — it deploys automatically via `git pull`
- Pros: Survives re-clones, version-controlled, zero maintenance
- Cons: Visible at `chaceraiter.com/healthz` (minor — it's just "ok", no sensitive info). Already blocked from search engines by being a plain text file with no links.
- **This is the simplest and most reliable option.**

**Option B: Docker HEALTHCHECK directive**
- Add `HEALTHCHECK CMD curl -f http://localhost/index.html || exit 1` to docker-compose.yml
- Pros: Doesn't need a separate file, checks actual page rendering
- Cons: Requires `curl` in the nginx:alpine image (it's there by default), doesn't help Traefik health checks if Traefik is configured to check a specific path
- Note: This only covers Docker's internal health state. If Traefik or Cloudflare checks `/healthz`, the file is still needed.

**Option C: Separate Docker volume for healthz**
- Mount a separate volume just for the healthz file
- Pros: Decoupled from git
- Cons: Over-engineered for a single file

**Recommendation:** Option A. Add `healthz` to the repo. It's one file, one line, zero maintenance. If the plain-text endpoint at `/healthz` is a concern, nginx can be configured to only respond to it from internal IPs, but that's unnecessary for a portfolio site.

**Implementation:**
```bash
echo 'ok' > /Users/chace/projects/portfolio-site/healthz
git add healthz && git commit -m "Add healthz endpoint" && git push
ssh static-01 "cd /home/chaceops/repo && git pull"
```

## Infra (owned by infra-mgmt, tracked here for reference)

- [ ] **Apex → www 301 redirect** — Both currently serve identical content. Should redirect apex to www (canonical).
- [ ] **Kernel update on static-01** — Running 6.8.0-101, 6.8.0-106 available. Needs reboot.
- [ ] **DHCP reservation** — Belt-and-suspenders for static IP.
