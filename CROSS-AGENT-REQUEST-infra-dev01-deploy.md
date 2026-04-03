# Cross-Agent Info: Deploying to dev-01 (dev1.chaceraiter.com)

**From:** infra-mgmt
**Date:** 2026-04-03

## Overview

`dev-01` is a shared dev/staging VM. Multiple projects run side-by-side via path-based routing through a shared nginx reverse proxy. The portfolio site should be deployed at the **root path (`/`)** on `dev1.chaceraiter.com`.

## What's Already Running

| Container | Image | Port | Path |
|-----------|-------|------|------|
| `dev-proxy` | `nginx:1.27-alpine` | 80 (host) | Routes all traffic |
| `adaptive-mafia-game-app-1` | custom build | 8000 (host) | `/llmafia/` |

## How Routing Works

A standalone nginx container (`dev-proxy`) listens on port 80 and routes by path prefix:

- `/llmafia/` → `http://host.docker.internal:8000/` (mafia game)
- `/` → currently returns 404 JSON

The proxy config file lives at **`/opt/dev-proxy/nginx.conf`** on dev-01. The container was started with:

```bash
docker run -d --name dev-proxy \
  --restart unless-stopped \
  -p 80:80 \
  --add-host host.docker.internal:host-gateway \
  -v /opt/dev-proxy/nginx.conf:/etc/nginx/conf.d/default.conf:ro \
  nginx:1.27-alpine
```

## What You Need To Do

### 1. Deploy your container on dev-01

Clone/pull the portfolio-site repo on dev-01 and run the nginx container on a **host port that doesn't conflict** (port 80 is taken by dev-proxy, 8000 by mafia). Suggested: **port 8080** (matches your existing `deploy/docker-compose.yml`).

```bash
ssh dev-01
cd /home/chaceops
git clone <your-repo> portfolio-site   # or git pull if already there
cd portfolio-site/deploy
docker compose up -d
# This starts static-nginx on port 8080
```

### 2. Update the dev-proxy nginx config

Edit `/opt/dev-proxy/nginx.conf` on dev-01 to route `/` to your container instead of returning 404. The mafia game's `/llmafia/` block must remain.

**New config:**

```nginx
server {
    listen 80;
    server_name dev1.chaceraiter.com;

    # /llmafia/ → llmafia container on port 8000
    location /llmafia/ {
        proxy_pass http://host.docker.internal:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
    }

    # / → portfolio site on port 8080
    location / {
        proxy_pass http://host.docker.internal:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then reload the proxy:

```bash
docker exec dev-proxy nginx -s reload
```

### 3. No firewall or edge changes needed

The full routing chain is already in place:
- **DNS:** `dev1.chaceraiter.com` CNAME → Cloudflare tunnel
- **Tunnel:** `home-prod-edge` → `http://traefik:80` on edge-01
- **Traefik (edge-01):** `Host(dev1.chaceraiter.com)` → `http://192.168.60.24:80`
- **Proxmox VM FW:** edge-01 (192.168.60.100) → port 80 allowed
- **ufw:** edge-01 → port 80 allowed

No changes needed at any of these layers.

## SSH Access

```
Host: dev-01 (192.168.60.24)
User: chaceops
Key: should already be in your SSH config if you've deployed to other DMZ VMs
```

If you don't have SSH access, the operator will need to add your key to `~/.ssh/authorized_keys` on dev-01.

## Project Link Routing: Dev vs Production

The portfolio site links to other projects (mafia game, VTA, etc.). These links must point to different URLs depending on the environment.

### Production (`www.chaceraiter.com`)
Each project has its own subdomain on a dedicated VM:

| Project | URL | VM |
|---------|-----|----|
| Portfolio | `https://www.chaceraiter.com/` | static-01 (192.168.60.23) |
| Mafia Game | `https://llmafia.chaceraiter.com/` | llmafia-01 (192.168.60.25) |
| VTA | `https://assistant.chaceraiter.com/` | assistant-01 (192.168.60.22) |

### Dev (`dev1.chaceraiter.com`)
All projects are containers on one VM, differentiated by path prefix:

| Project | URL | Container Port |
|---------|-----|----------------|
| Portfolio | `https://dev1.chaceraiter.com/` | 8080 |
| Mafia Game | `https://dev1.chaceraiter.com/llmafia/` | 8000 |
| VTA | `https://dev1.chaceraiter.com/vta/` | TBD (not yet deployed) |

### What this means for the codebase

Project links in the portfolio HTML/JS need to be **environment-aware**. For example, a "Play LLMafia" button should link to:
- **Prod:** `https://llmafia.chaceraiter.com/`
- **Dev:** `/llmafia/`

Recommended approach: use an environment variable (e.g., `PORTFOLIO_ENV=dev` or `PORTFOLIO_ENV=prod`) at build time or container start to switch between a link map. Similar pattern to how the mafia game uses `MAFIA_BASE_PATH` to handle its own path prefix.

Example link map:
```json
{
  "prod": {
    "mafia": "https://llmafia.chaceraiter.com/",
    "vta": "https://assistant.chaceraiter.com/",
    "portfolio": "https://www.chaceraiter.com/"
  },
  "dev": {
    "mafia": "/llmafia/",
    "vta": "/vta/",
    "portfolio": "/"
  }
}
```

As new projects are added to dev-01, add a path prefix here and a corresponding `location` block in `/opt/dev-proxy/nginx.conf`.

## Important Notes

- **Don't touch `/llmafia/`** — the mafia game route must stay intact.
- **Don't modify the dev-proxy container itself** — only edit the config file at `/opt/dev-proxy/nginx.conf` and reload.
- **Port 8080** is just a suggestion — pick any unused port, just make sure the proxy config matches.
- The portfolio site on dev1 doesn't need the same security hardening as production (www.chaceraiter.com) — this is a staging/preview environment.
