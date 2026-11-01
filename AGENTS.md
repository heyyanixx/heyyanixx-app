# AGENTS.md — HEYYANIXX app

Instructions for AI coding agents (Codex, OpenCode, Cursor, Claude Code, Copilot, etc.) working in this repo.
Owner: Anish (HEYYANIXX) · github.com/heyyanixx. Talk to him in simple English or Hinglish.

## What this repo is

HEYYANIXX — Anish's creator app: a **PWA wrapped with Capacitor 6** into an Android APK (`appId com.heyyanixx.app`).
- Plain HTML/CSS/vanilla JS, **no bundler, no framework**. Main app = one big `index.html`; offline hub pages under `offline/` (learn, arcade, …).
- Capacitor `webDir` is **`www/`**. The root files (`index.html`, `sw.js`, `manifest.webmanifest`, `offline/`, icons, `assets/`) are **byte-identical copies** of `www/`. When you change one, make the same change in the other and keep them identical.
- `resources/android/` holds native bits (MainActivity, splash images) that CI copies in. `android/` and `ios/` are generated and git-ignored; never commit them.

## Build, test, release

- Local preview: `python3 -m http.server 8000` in the repo root (or `www/`), open in Chrome with mobile view. There are no automated tests, so click through what you changed, check the console for errors, and test offline mode if you touched `sw.js`.
- **Every push to `main` runs `.github/workflows/android.yml`**: `npx cap sync`, Gradle `assembleDebug`, signs with the keystore from Actions secrets, and **publishes a public GitHub Release marked latest** (the APK download link people use).
  - So a push to `main` = a new public APK. Only push to `main` when the app is ready to ship.
  - For docs-only commits, put `[skip ci]` in the commit message so no empty release is made.
  - When shipping: bump `version` in `package.json` and `APP_VERSION_NAME` / `APP_VERSION_CODE` in the workflow (versionCode must always go up).
- Service worker: when you change any cached file, bump the cache name in `sw.js` (`const CACHE = 'heyyanixx-vNN'`) in both copies, or users keep the old version.
- Don't edit `.github/workflows/` or `capacitor.config.json` unless the task is specifically about the build.

## Project rules

- Look: matte black `#060608` + gold `#e3b65a`, dark only, mobile first. Copy is English/Hinglish, short.
- Honest content only: no fake stats, follower counts, or claims; no official game or brand logos (Free Fire, Garena, etc.).
- The admin passcode in `index.html` is visible to anyone who opens the source. It only hides a UI panel and is **not** security. Never protect anything real with it and never put real keys next to it.
- Ads: `offline/learn/js/ads-config.js` stays `enabled: false` until Anish has real AdSense IDs. Never invent publisher or slot IDs.
- Signing: the release keystore exists only in GitHub Actions secrets. Never commit a keystore, never echo secrets in the workflow.

## Security (always)

Adapted from ECC `rules/common/security.md` + `rules/web/security.md`.

Before every commit, check:
- No secrets in the repo: no API keys, passwords, tokens, keystores (`*.jks`, `*.keystore`), `.env` files, or private URLs with tokens in them. If one slipped in, stop, remove it, and tell the owner to **rotate** it (deleting the commit is not enough; Git history keeps it).
- Secrets live only in GitHub Actions secrets or a local `.env` that is git-ignored. Never print a secret in logs, code comments, README, or screenshots.
- This is a **static / client-side** project: everything shipped to the browser is public. Never put a real API key in client JS. Any paid API (AI, payments) must go through a server or proxy you control.
- Never add the owner's phone number, home address, or other private details anywhere in the repo.
- Escape user input before putting it in HTML. Avoid `innerHTML` / `dangerouslySetInnerHTML` with user data; prefer `textContent`.
- External links use `rel="noopener"`. Third-party scripts only when really needed; pin the version.
- Error messages shown to users must not leak internal details.
- Add a dependency only if it is needed, maintained, and MIT/Apache/BSD-style licensed; note it in the README or notices.

## How to work (ECC workflow, short version)

Adapted from ECC `rules/common/development-workflow.md`, `coding-style.md`, `git-workflow.md`.

1. **Read first.** Read the files you will touch and the README before changing anything. Reuse what exists before writing new code.
2. **Plan small.** For anything bigger than a one-line fix, write a short plan (files to change, risks) and wait for the owner's OK.
3. **Keep it simple** (KISS, DRY, YAGNI). Small functions (< ~50 lines), small focused files, early returns instead of deep nesting, named constants instead of magic numbers, handle errors explicitly (never swallow them silently).
4. **Validate input** at the edges (forms, URL params, files the user drops in).
5. **Test before you say "done"** (commands below). If you could not test something, say so plainly.
6. **Review your own diff** before committing: only the files the task needs, nothing generated, no secrets, no debug logs.
7. **Commit message** in conventional format: `feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`, `refactor: ...`, `test: ...`, `ci: ...`.
8. Don't rewrite or reformat code that the task doesn't need. Don't add features that weren't asked for.
---

Rules adapted from [ECC (Everything Claude Code)](https://github.com/affaan-m/ECC) by Affaan Mustafa, MIT License (commit `b38be6a`). Only a small subset is used here; for the full skill/agent pack install ECC into your own coding tool (see ECC's README).
