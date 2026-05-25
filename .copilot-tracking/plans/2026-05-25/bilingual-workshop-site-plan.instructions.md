---
applyTo: '.copilot-tracking/changes/2026-05-25/bilingual-workshop-site-changes.md'
---
<!-- markdownlint-disable-file -->
# Implementation Plan: Bilingual Copilot Studio Workshop Site

## Overview

Stand up a Jekyll + `just-the-docs` workshop site at the repo root that mirrors the sibling `agentic-accelerator-workshop` 1:1 — parallel EN/FR file tree, Liquid sidebar override, zero-padded 10-lab IA derived from the hello-world walkthrough, a three-tool screenshot harness (Playwright + `freeze` + manual snipping) under `screenshots/`, and `actions/jekyll-build-pages@v1` deploy via GitHub Pages.

## Objectives

### User Requirements

* Build a published workshop website "modeled on `agentic-accelerator-workshop`" that converts the prior hello-world walkthrough into a bilingual lab series. — Source: conversation request + .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Task Implementation Requests)
* Adopt the sibling's stack 1:1: Jekyll + `just-the-docs` remote theme, served from GitHub Pages via `actions/jekyll-build-pages@v1`. — Source: research doc, "Sibling Stack Identity" section.
* Mirror the sibling's bilingual mechanism: parallel `fr/` tree + per-page `lang: fr` + `nav_exclude: true` + Liquid sidebar override + manual language-switcher blockquote. — Source: research doc, "Bilingual Mechanism (zero-plugin design)" section.
* Use a three-tool screenshot harness with the correct tool per surface (Playwright headless for public web, Playwright headed + storageState for Copilot Studio portal, `freeze` for terminal stills, manual `Win+Shift+S` for VS Code). — Source: research doc, "Three-Surface Screenshot Strategy" section.
* Convert the hello-world content into a flat 10-lab IA (`lab-00`..`lab-09`) plus one advanced lab and three reference pages, with zero-padded filenames. — Source: research doc, "Lab Information Architecture" table.
* Add no NEW technical content beyond what the hello-world research already covers. — Source: research doc, "Out of scope".

### Derived Objectives

* Author EN labs first then FR mirrors, never merging an EN change without its FR counterpart in the same PR. — Derived from: research doc, "Partial-translation policy" hard rule.
* Pre-commit screenshots into `images/lab-NN/` (not regenerated in CI) so every Pages deploy is deterministic and CI-only. — Derived from: research doc, "Three-Surface Screenshot Strategy → Key constraints" + "Selected Approach → Preferred approach because (4)".
* Gitignore `screenshots/.auth/`, `screenshots/raw/`, `screenshots/final/`, and `node_modules/`; commit only `screenshots/transcripts/`, `screenshots/playwright/`, and `screenshots/scripts/`. — Derived from: research doc, "File tree changes" annotations.
* Configure Jekyll `exclude:` to keep `screenshots/`, `.copilot-tracking/`, `node_modules/`, `Gemfile*`, `package*.json`, and `README.md` out of the published site. — Derived from: research doc, `_config.yml` snippet.
* Set `baseurl: "/copilot-studio-skill"` to match the sibling pattern; document the `--baseurl ""` override for local preview. — Derived from: research doc, "Local dev preview" snippet.
* Adopt the EN-only vs EN+FR parallel screenshot policy: shared screenshots for Windows-English-only surfaces (VS Code, CLI, PowerShell, git), parallel capture for Copilot Studio portal screens. — Derived from: research doc, "Bilingual screenshot decision per lab".

## Context Summary

### Project Files

* .copilot-tracking/ - Only existing content in the repo; planning artifacts live here. All other files are new in this plan.

### References

* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md - Primary research; selected approach + file tree + configs + lab IA + glossary highlights.
* .copilot-tracking/research/2026-05-25/copilot-studio-skill-hello-world-research.md - Source content for all 10 labs (no new content needed beyond this).
* .copilot-tracking/research/subagents/2026-05-25/sibling-workshop-repo-research.md - Sibling repo deep-dive (verbatim `_config.yml`, `Gemfile`, `pages.yml`, `fr/index.md` frontmatter, sidebar override pattern, image conventions, lab IA).
* .copilot-tracking/research/subagents/2026-05-25/playwright-screenshot-strategy-research.md - Surface map, Playwright multi-project config (EN/FR + storageState), MFA rationale, `freeze` patterns, manual VS Code preflight.
* .copilot-tracking/research/subagents/2026-05-25/bilingual-content-strategy-research.md - Language-pair correction (FR not ES), parallel file layout, glossary table, translation workflow, partial-translation policy, FR tone calibration.
* https://github.com/devopsabcs-engineering/agentic-accelerator-workshop - Sibling repo to mirror.
* https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/ - Live sibling site for visual parity reference.
* https://github.com/just-the-docs/just-the-docs - Remote theme.
* https://playwright.dev/docs/auth - storageState pattern for portal screenshots.
* https://github.com/charmbracelet/freeze - Terminal-still tool.

### Standards References

* C:/Users/emknafo/.vscode/extensions/ise-hve-essentials.hve-core-3.2.2/.github/instructions/hve-core/markdown.instructions.md — Required for all `.md` edits outside `.copilot-tracking/`.
* C:/Users/emknafo/.vscode/extensions/ise-hve-essentials.hve-core-3.2.2/.github/instructions/hve-core/writing-style.instructions.md — Voice/tone for all markdown content.

## Implementation Checklist

### [x] Implementation Phase 1: Jekyll site scaffold and theme wiring

<!-- parallelizable: false -->

Foundation phase. Creates the Jekyll root, theme wiring, navigation overrides, branding assets, repo-meta files, GitHub Pages workflow, and `.gitignore`. All later phases depend on these files.

* [x] Step 1.1: Create `_config.yml` with `remote_theme: just-the-docs/just-the-docs`, `baseurl: "/copilot-studio-skill"`, `search_enabled`, defaults, and `exclude:` list.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 17-39)
* [x] Step 1.2: Create `Gemfile` for local `bundle exec jekyll serve` preview only (CI ignores it).
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 40-60)
* [x] Step 1.3: Create `_includes/head_custom.html` with favicons, Mermaid CDN module-import block, and title-wrap CSS.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 61-81)
* [x] Step 1.4: Create `_includes/components/sidebar.html` with `{% if page.lang == 'fr' %}` branch and EN fallback to `components/site_nav.html`.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 82-104)
* [x] Step 1.5: Create `assets/branding/` with placeholder favicon set + `logo-128.png` (committed binaries; replace later per WI-07).
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 105-127)
* [x] Step 1.6: Create `.github/workflows/pages.yml` using `actions/checkout@v4`, `configure-pages@v5`, `jekyll-build-pages@v1`, `upload-pages-artifact@v3`, `deploy-pages@v4` with the documented permissions/concurrency blocks.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 128-150)
* [x] Step 1.7: Create `.gitignore` with `screenshots/.auth/`, `screenshots/raw/`, `screenshots/final/`, `node_modules/`, `_site/`, `.jekyll-cache/`, `.jekyll-metadata`, `Gemfile.lock`.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 151-169)
* [x] Step 1.8: Create `LICENSE` (MIT, copying sibling), `CODE_OF_CONDUCT.md` (Microsoft OSS CoC, copying sibling), `README.md` (with `nav_exclude: true` frontmatter so Jekyll skips it on nav), `CONTRIBUTING.md` documenting translation policy + screenshot harness + manual repo settings.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 170-198)

### [x] Implementation Phase 2: EN content authoring

<!-- parallelizable: true -->

Authors the English homepage, all 11 labs, and the 3 reference pages. Runs in parallel with Phase 3 (screenshot harness) because the two phases touch disjoint directories.

* [x] Step 2.1: Author `index.md` (EN homepage) with FR-link blockquote at top, hero, centered logo, intro paragraph, lab table, time-estimate badge.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 203-225)
* [x] Step 2.2: Author `labs/lab-00-prerequisites.md` through `labs/lab-09-test-in-portal.md` using the lab-page template (frontmatter → FR-link blockquote → H1 → Duration/Level/Prereqs table → Overview → Learning objectives → numbered Exercises → Verification Checkpoint → Next Steps).
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 226-266)
* [x] Step 2.3: Author `labs/lab-10-advanced-add-knowledge-source.md` as the Intermediate-level optional lab.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 267-285)
* [x] Step 2.4: Author `labs/troubleshooting.md`, `labs/glossary.md`, `labs/references.md` reference pages.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 286-311)
* [x] Step 2.5: Create `images/lab-00/`..`images/lab-10/` empty subdirectories with `.gitkeep` markers, plus `images/architecture-diagram.mmd` source and a placeholder `images/architecture-diagram.png`.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 312-332)
* [x] Step 2.6: Validate phase changes (mandatory; do not skip even when Phase 3 runs in parallel) — run `bundle exec jekyll build --baseurl ""` locally (if Ruby available) and `npx markdownlint-cli2 "**/*.md" "!.copilot-tracking/**" "!node_modules/**"` to lint the EN content. Phase 2 cannot be marked complete until both pass.

### [x] Implementation Phase 3: Screenshot harness

<!-- parallelizable: true -->

Builds the Playwright + `freeze` + scripts toolkit under `screenshots/`. Runs in parallel with Phase 2 because it touches `package.json`, `playwright.config.ts`, and `screenshots/**` — disjoint from EN content directories.

* [x] Step 3.1: Create `package.json` with `@playwright/test` devDependency and `screenshots:*` npm scripts.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 345-364)
* [x] Step 3.2: Create `playwright.config.ts` with five projects: `seed-copilotstudio`, `en-public`, `fr-public`, `en-copilotstudio`, `fr-copilotstudio`.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 365-385)
* [x] Step 3.3: Create `screenshots/playwright/seed.copilotstudio.ts` — interactive headed seed that writes `screenshots/.auth/copilotstudio.json`.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 386-409)
* [x] Step 3.4: Create `screenshots/playwright/public.workshop-site.ts` and `screenshots/playwright/public.ms-learn.ts` capture specs.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 410-429)
* [x] Step 3.5: Create `screenshots/playwright/copilotstudio.create-agent.ts` and `screenshots/playwright/copilotstudio.test-pane.ts` capture specs with documented `mask:` selectors for PII redaction.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 430-452)
* [x] Step 3.6: Create `screenshots/scripts/capture-terminal.ps1`, `capture-web.ps1`, `capture-portal.ps1`, `promote.ps1`.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 453-475)
* [x] Step 3.7: Seed `screenshots/transcripts/` with PII-scrubbed text fixtures for at least one lab (`lab-01-pwsh-version.txt`, `lab-01-copilot-version.txt`, `lab-05-plugin-install.txt`) as harness examples.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 476-495)
* [x] Step 3.8: Validate phase changes (mandatory; do not skip even when Phase 2 runs in parallel) — run `npm install` then `npx playwright install chromium` then `npx playwright test --list` to confirm config loads. Phase 3 cannot be marked complete until all three commands succeed.

### [x] Implementation Phase 4: FR content mirror

<!-- parallelizable: false -->

Mirrors every EN page authored in Phase 2 into the `fr/` tree. Sequentially follows Phase 2 because the FR text is translated from the canonical EN source and the language-switcher links are reciprocal.

* [x] Step 4.1: Author `fr/index.md` with `lang: fr`, `nav_exclude: true`, `permalink: /fr/`, EN-link blockquote at top, full FR translation of the EN homepage.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 510-530)
* [x] Step 4.2: Author `fr/labs/lab-00-prerequisites.md`..`fr/labs/lab-09-test-in-portal.md` mirrors (English filenames, French titles inside, `lang: fr`, reciprocal language-switcher).
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 531-555)
* [x] Step 4.3: Author `fr/labs/lab-10-advanced-add-knowledge-source.md` mirror.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 556-573)
* [x] Step 4.4: Author `fr/labs/troubleshooting.md`, `fr/labs/glossary.md`, `fr/labs/references.md` mirrors.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 574-593)
* [x] Step 4.5: Verify reciprocal language-switcher links (every EN page links to its FR counterpart and vice versa, including the `index.md` ↔ `fr/index.md` homepage pair) by walking the EN/FR file pairs.
  * Details: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Lines 594-614)

### [x] Implementation Phase 5: Final validation and handoff

<!-- parallelizable: false -->

Full project validation. Runs after Phases 1–4 complete.

* [x] Step 5.1: Run full project validation.
  * `bundle exec jekyll build --baseurl ""` to confirm Jekyll renders cleanly with no broken Liquid.
  * `npx markdownlint-cli2 "**/*.md" "!.copilot-tracking/**" "!node_modules/**"` (or honor `.mega-linter.yml` if present at validation time) to lint all authored markdown.
  * `npx playwright test --list` to confirm Playwright config parses and discovers specs.
  * Verify the EN/FR file-pair manifest: every EN file under `labs/` has a corresponding `fr/labs/` file AND `index.md` has a corresponding `fr/index.md` (homepage pair).
  * Verify `screenshots/.auth/`, `screenshots/raw/`, `screenshots/final/`, `node_modules/`, `_site/` are gitignored (no accidental commits).
* [x] Step 5.2: Fix minor validation issues — broken Liquid tags, frontmatter typos, missing reciprocal links, markdownlint MD-* line fixes, stray smart quotes.
* [x] Step 5.3: Report blocking issues — anything that requires additional research (e.g., theme-version pin needed because `actions/jekyll-build-pages` rejected an unsupported plugin, or sidebar override misfires for a real edge case). Provide user with next-step recommendations rather than inline large-scale rewrites.

## Planning Log

See .copilot-tracking/plans/logs/2026-05-25/bilingual-workshop-site-log.md for discrepancy tracking, implementation paths considered, and suggested follow-on work.

## Dependencies

* Ruby + Bundler + Jekyll (local preview only; CI does not need it).
* Node 22+ and npm (for the Playwright harness).
* `charmbracelet/freeze` installed via `winget install charmbracelet.freeze` (for terminal stills).
* A Microsoft 365 demo tenant with a Copilot Studio entitlement (for portal screenshots) — interactive seed only, never in CI.
* GitHub repo Settings → Pages → Source set to **GitHub Actions** (manual one-time setting; see WI-06 in the planning log).
* `just-the-docs` remote theme — no version pin (tracks GitHub Pages whitelist).

## Success Criteria

* `actions/jekyll-build-pages@v1` builds the site and `actions/deploy-pages@v4` publishes to `https://devopsabcs-engineering.github.io/copilot-studio-skill/` on every push to `main`. — Traces to: research doc "Sibling Stack Identity" + user requirement "served from GitHub Pages".
* Every EN lab page has a FR counterpart at the parallel `fr/labs/` path with reciprocal language-switcher links at the top. — Traces to: research doc "Bilingual Mechanism" + user requirement "bilingual, published workshop website".
* The site renders the FR sidebar from the Liquid override (visible by browsing to `/fr/` and seeing only FR pages listed in the nav). — Traces to: research doc `_includes/components/sidebar.html` snippet.
* `npm run screenshots:web` and `npm run screenshots:portal` (latter after one `npm run screenshots:seed` interactive bootstrap) regenerate the EN and FR screenshots deterministically into `screenshots/final/`, and `npm run screenshots:promote` copies them into `images/lab-NN/`. — Traces to: research doc "Three-Surface Screenshot Strategy" + selected approach implementation details.
* `npm run screenshots:terminal` renders all `screenshots/transcripts/*.txt` into PNG stills under `images/lab-NN/` via `freeze`. — Traces to: research doc `freeze` invocation snippet.
* `.gitignore` keeps `screenshots/.auth/`, `screenshots/raw/`, `screenshots/final/`, `node_modules/`, `_site/` out of the repo. — Traces to: research doc "File tree changes" gitignore annotations.
* Visual + navigational parity check against the live sibling site passes (homepage layout, sidebar shape, language switcher position, lab-page table-of-contents). — Traces to: research doc "Success Criteria".
