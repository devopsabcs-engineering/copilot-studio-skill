---
title: "Contributing to the Copilot Studio Skill Workshop"
description: "Translation policy, screenshot harness, and one-time repo settings for contributors."
nav_exclude: true
---

Thanks for helping evolve the workshop. This guide covers the three things contributors most often get wrong: keeping French in sync with English, capturing screenshots consistently, and the one-time settings that have to land in the GitHub repo before the first Pages deploy works.

## Translation policy

The site is bilingual by hard rule, not by aspiration.

* Every PR that adds, removes, or modifies a page under `labs/`, `index.md`, or any other EN-facing content MUST update the matching `fr/` page in the same PR. There is no "translate later" lane.
* Both pages cross-link to each other via a blockquote at the very top of the body: EN pages link to the FR sibling, FR pages link to the EN sibling. The link uses the full `permalink` URL so it works in preview and on the deployed site.
* When a stale FR page ships by mistake, add a single-line banner at the top of the FR page until the translation catches up:

  ```markdown
  > 🇬🇧 *Cette page peut être en retard sur la [version anglaise](...). Dernière mise à jour FR : YYYY-MM-DD.*
  ```

* Use the glossary in `.copilot-tracking/research/subagents/2026-05-25/bilingual-content-strategy-research.md` to keep terminology consistent. When you introduce a new English technical term, add the agreed French rendering to the glossary in the same PR.

## Screenshot harness

Screenshots live in `images/lab-NN/`. Sources for the capture harness live in `screenshots/` and are gitignored (only `screenshots/scripts/` ships).

### Per-surface capture policy

Different surfaces need different capture strategies. Decide which bucket the surface falls into before opening a screenshot PR.

* **EN-only screenshots, shared with FR pages** for Labs 01, 02, 04, 05, 07, 08. These labs are entirely VS Code, the GitHub Copilot CLI, git, and PowerShell — surfaces that are English-only on Windows by default. The FR prose adds a one-line callout above each shared screenshot acknowledging the English-locale capture; the FR page reuses the same EN image file.
* **EN + FR parallel screenshots** for Labs 03, 06, 09, 10. These labs cover the Copilot Studio portal, which exposes a language picker in the top-right profile menu. Capture both: switch the portal to English, run `npm run screenshots:portal`, then switch to French and re-run. The Playwright projects `en-copilotstudio` and `fr-copilotstudio` route each capture into the right subdirectory.

### Capture commands

Run these from the repo root after seeding the storage state:

```powershell
npm run screenshots:seed     # one-time per environment — opens a headed browser to capture sign-in
npm run screenshots:web      # public web pages (EN + FR)
npm run screenshots:portal   # Copilot Studio portal (EN + FR)
npm run screenshots:terminal # PowerShell terminals via charmbracelet/freeze
npm run screenshots:promote  # move screenshots/final/ → images/lab-NN/
```

The `screenshots:seed` step writes a cookie jar to `screenshots/.auth/` so subsequent runs are headless. The `.auth/` directory is gitignored. Do not commit the cookie jar.

### Tooling prerequisites

* [Playwright](https://playwright.dev/) installs automatically via `npm install`.
* [charmbracelet/freeze](https://github.com/charmbracelet/freeze) renders terminal transcripts to PNGs. Install once on Windows with `winget install charmbracelet.freeze`.

## One-time repo settings

These settings have to land in the GitHub repo UI before the first Pages deploy works. They cannot be expressed in `_config.yml` or a workflow file.

1. **Settings → Pages → Source** must be set to **GitHub Actions** (not the legacy "Deploy from a branch" option). The `.github/workflows/pages.yml` workflow won't deploy until this is flipped. Document the date and operator in the PR that flips it.
2. **Settings → Environments → `github-pages`** is created automatically the first time the deploy job runs. Confirm it exists and that branch restrictions allow `main`.
3. **Playwright storage state seed.** Each contributor runs `npm run screenshots:seed` once locally to capture sign-in cookies for their workstation. The seeded `screenshots/.auth/` directory never lands in commits.

## Local preview

```powershell
gem install bundler
bundle install
bundle exec jekyll serve --baseurl ""
```

The `--baseurl ""` override is mandatory locally — `_config.yml` pins `/copilot-studio-skill` for production, and Jekyll's local server will 404 every asset without the override.

## Submitting a PR

* Run `bundle exec jekyll build` to confirm the site builds cleanly.
* Run `markdownlint-cli2 "**/*.md" "!_site/**"` if you changed any markdown.
* Confirm both EN and FR pages render and that the language switcher round-trips between them.
* Confirm new screenshots land under `images/lab-NN/` and are referenced from both EN and FR pages where applicable.
