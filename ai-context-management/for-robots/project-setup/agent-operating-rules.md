<!-- TEMPLATE FILE - Fill this out with your project-specific operating rules for AI agents. -->

# Agent Operating Rules

These rules apply to all work in this repo unless explicitly overridden in the prompt.

## General Principles
- **Work one step at a time:** prefer iterative UI changes and get explicit feedback before big refactors.
- **Be honest and opinionated:** call out “template-y” patterns, bloat, and tradeoffs directly.
- **Ask before irreversible actions:** especially force pushes, deleting folders, or rewriting history.
- **Prefer simple solutions:** avoid introducing a backend/DB unless there is a clear requirement.
- **Preserve the AI context system:** do not delete or rename `ai-context-management/` content without asking.

## Code Quality Standards
- **Accessibility baseline:** semantic HTML, keyboard focus states, readable contrast.
- **Performance baseline:** avoid heavy embeds and unnecessary client JS; keep payloads small.
- **Security baseline:** no secrets in repo; treat config as env vars; sanitize/validate any form inputs if a backend is introduced.
- **Documentation:** update the relevant `ai-context-management/for-robots/*` docs when decisions or scope changes.

## Workflow Guidelines
- **Mockups first:** use `mockups/` for visual iteration prior to selecting a framework.
- **Context updates:**
  - Update `ai-context-management/for-robots/current-work/current-work-focus.md` when focus changes.
  - Update `ai-context-management/for-robots/current-work/current-context-for-new-chat.md` with current status, decisions, and active issues.
- **Commits:** small, descriptive commits preferred; avoid bundling unrelated changes.

## Red Lines (Never Do This)
- Never commit `.env` files, private keys, tokens, credentials, or personal-only secrets.
- Never add third-party widgets/embeds (e.g., X timeline) without explicitly discussing privacy/perf tradeoffs.
- Never force-push or rewrite remote history unless the user explicitly asked for it.
