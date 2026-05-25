<!-- markdownlint-disable-file -->
# Implementation Details: Bilingual Copilot Studio Workshop Site

## Context Reference

Sources:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md — primary research with selected approach, file tree, configs, lab IA, glossary highlights.
* .copilot-tracking/research/2026-05-25/copilot-studio-skill-hello-world-research.md — source content for all 10 labs.
* .copilot-tracking/research/subagents/2026-05-25/sibling-workshop-repo-research.md — sibling repo deep-dive (verbatim configs).
* .copilot-tracking/research/subagents/2026-05-25/playwright-screenshot-strategy-research.md — Playwright multi-project config + storageState pattern.
* .copilot-tracking/research/subagents/2026-05-25/bilingual-content-strategy-research.md — glossary, translation workflow, FR tone calibration.

## Implementation Phase 1: Jekyll site scaffold and theme wiring

<!-- parallelizable: false -->

### Step 1.1: Create `_config.yml` with `remote_theme: just-the-docs/just-the-docs`

Build the Jekyll configuration file at the repo root. Use the exact snippet from the research doc "Minimal `_config.yml`" section. The `baseurl: "/copilot-studio-skill"` matches the sibling pattern and is overridden during local preview with `--baseurl ""`.

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/_config.yml - Jekyll site config; declares `remote_theme`, search, defaults, exclude list.

Discrepancy references:
* Addresses no DR/DD items; sourced verbatim from research doc snippet.

Success criteria:
* File contains `remote_theme: just-the-docs/just-the-docs` (no version pin).
* `baseurl: "/copilot-studio-skill"` is set.
* `exclude:` includes `Gemfile`, `Gemfile.lock`, `README.md`, `.copilot-tracking`, `screenshots`, `node_modules`, `package.json`, `package-lock.json`.
* `defaults:` block sets `layout: default` site-wide and `nav_exclude: true` for `images`.
* `search_enabled: true` and `heading_anchors: true` are present.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 184-210) - Minimal `_config.yml` snippet.

Dependencies:
* Empty repo root — no prior steps required.

### Step 1.2: Create `Gemfile` for local preview

Local development convenience only. CI uses `actions/jekyll-build-pages@v1` which carries its own pre-built Jekyll runtime.

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/Gemfile - declares `gem "github-pages", group: :jekyll_plugins`.

Discrepancy references:
* None.

Success criteria:
* `source "https://rubygems.org"` is the first line.
* Pins `gem "github-pages"` only — no `jekyll-multiple-languages-plugin` or other unsupported plugins (would break CI).
* No `Gemfile.lock` is committed (gitignored in Step 1.7).

Context references:
* .copilot-tracking/research/subagents/2026-05-25/sibling-workshop-repo-research.md - sibling Gemfile pattern.

Dependencies:
* Step 1.1 (Gemfile and `_config.yml` must agree on plugin allowlist).

### Step 1.3: Create `_includes/head_custom.html`

Add favicons, Mermaid ESM import + DOM transform, and title-wrap CSS. Use the snippet verbatim from the research doc.

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/_includes/head_custom.html - favicons + Mermaid CDN + `.site-title { white-space: normal; }` CSS.

Discrepancy references:
* None.

Success criteria:
* Three `<link rel="icon">` lines referencing `/assets/branding/favicon.ico`, `/assets/branding/favicon-32x32.png`, `/assets/branding/apple-touch-icon.png` via `relative_url`.
* `<script type="module">` block imports Mermaid from `https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs` and transforms `pre > code.language-mermaid` into `<div class="mermaid">` nodes.
* `<style>` block contains `.site-title { white-space: normal; }`.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 233-255) - `_includes/head_custom.html` snippet.

Dependencies:
* Step 1.1 (theme remote must be wired so just-the-docs picks up the custom include).

### Step 1.4: Create `_includes/components/sidebar.html` with FR branch

Override the just-the-docs sidebar include with a `{% if page.lang == 'fr' %}` branch that hand-builds the FR nav from `site.pages | where: "lang", "fr" | sort: "permalink"`. Fallback to `{% include_cached components/site_nav.html %}` for EN.

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/_includes/components/sidebar.html - Liquid sidebar override.

Discrepancy references:
* Addresses DR-01 partially: research recommends a byte-for-byte inspection of the sibling's file; this step uses the captured snippet which is the best-known approximation. DR-01 remains open as a verification follow-up.

Success criteria:
* File contains `{% if page.lang == 'fr' %}` ... `{% else %}` ... `{% endif %}`.
* FR branch iterates `site.pages | where: "lang", "fr" | sort: "permalink"`.
* EN branch calls `{% include_cached components/site_nav.html %}`.
* Sort key is `permalink` (string sort — load-bearing for zero-padded `lab-NN` ordering).

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 212-231) - sidebar override snippet.
* .copilot-tracking/research/subagents/2026-05-25/sibling-workshop-repo-research.md - sibling sidebar pattern.

Dependencies:
* Step 1.1 (`_config.yml` must declare the theme so the override file's include path resolves).

### Step 1.5: Create `assets/branding/` with placeholder branding

Add placeholder PNG/ICO files so the favicon links in `head_custom.html` resolve without 404s during preview. Final branding assets are tracked in WI-07.

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/assets/branding/favicon.ico - placeholder favicon (any valid ICO; can copy sibling's).
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/assets/branding/favicon-32x32.png - 32x32 PNG placeholder.
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/assets/branding/apple-touch-icon.png - 180x180 PNG placeholder.
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/assets/branding/logo-128.png - 128x128 PNG used by `index.md` hero.

Discrepancy references:
* DR-07 (placeholder branding): final assets are out of scope for this plan; tracked as WI-07 follow-up.

Success criteria:
* All four files exist and are valid binary images.
* `head_custom.html` favicon links resolve without HTTP 404 in local preview.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (File tree changes) - `assets/branding/` directory listing.

Dependencies:
* Step 1.3 (head_custom references these paths).

### Step 1.6: Create `.github/workflows/pages.yml`

GitHub Pages deploy workflow. Use the snippet verbatim from the research doc.

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/.github/workflows/pages.yml - build + deploy jobs.

Discrepancy references:
* DR-05 partial: research notes that `Settings → Pages → Source = GitHub Actions` is a manual one-time setting; the workflow assumes this is configured. Tracked as WI-06.

Success criteria:
* `on:` includes `push: branches: [main]` and `workflow_dispatch`.
* `permissions:` declares `contents: read`, `pages: write`, `id-token: write`.
* `concurrency.group: pages`, `cancel-in-progress: false`.
* `build` job runs `actions/checkout@v4`, `actions/configure-pages@v5`, `actions/jekyll-build-pages@v1` (with `source: ./` and `destination: ./_site`), `actions/upload-pages-artifact@v3`.
* `deploy` job runs `actions/deploy-pages@v4` in `environment: github-pages` with `url:` output.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 257-300) - `pages.yml` snippet.

Dependencies:
* Steps 1.1–1.5 must exist so the build has files to operate on.

### Step 1.7: Create `.gitignore`

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/.gitignore - excludes secrets, build artifacts, npm/Jekyll caches.

Discrepancy references:
* None.

Success criteria:
* `screenshots/.auth/`, `screenshots/raw/`, `screenshots/final/` are present (secret/intermediate paths).
* `node_modules/`, `_site/`, `.jekyll-cache/`, `.jekyll-metadata`, `Gemfile.lock` are present.
* `*.png.backup`, `.DS_Store`, `Thumbs.db` for hygiene.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (File tree changes annotations) - GITIGNORED markers throughout the tree.

Dependencies:
* None (can be created any time before first commit).

### Step 1.8: Create repo-meta files (`LICENSE`, `CODE_OF_CONDUCT.md`, `README.md`, `CONTRIBUTING.md`)

`LICENSE` — MIT, copied from sibling.
`CODE_OF_CONDUCT.md` — Microsoft OSS CoC, copied from sibling.
`README.md` — `nav_exclude: true` frontmatter so Jekyll skips it; brief project description + links to live site EN/FR + 1-paragraph quickstart.
`CONTRIBUTING.md` — original; documents (a) the translation policy (every PR adding/modifying an EN lab MUST add/modify the FR counterpart in the same PR), (b) the three-tool screenshot harness (which tool per surface, when to capture EN+FR vs share), (c) manual one-time repo settings (Pages → Source = GitHub Actions; storageState seed for portal screenshots).

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/LICENSE - MIT license.
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/CODE_OF_CONDUCT.md - Microsoft OSS CoC.
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/README.md - project README with `nav_exclude: true`.
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/CONTRIBUTING.md - contributor handbook.

Discrepancy references:
* Addresses DR-04 (VS Code screenshot 80% rule policy) by codifying it in CONTRIBUTING.md.
* Addresses DR-05 (manual Pages source setting) by documenting it in CONTRIBUTING.md.
* Addresses DR-08 (EN-only vs EN+FR parallel screenshot policy) by codifying the per-surface decision in CONTRIBUTING.md.

Success criteria:
* `README.md` frontmatter declares `nav_exclude: true` (else Jekyll renders it in the sidebar).
* `CONTRIBUTING.md` has explicit sections: "Translation policy", "Screenshot harness", "One-time repo settings".

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 469-477) - scaffold step order + CONTRIBUTING content list.
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 546-549) - Bilingual screenshot decision per lab.

Dependencies:
* None (parallelizable with other Phase 1 steps in practice; ordered last because they reference the rest of the scaffold).

## Implementation Phase 2: EN content authoring

<!-- parallelizable: true -->

### Step 2.1: Author `index.md` (EN homepage)

Mirror the sibling homepage shape: H1 title, FR-link blockquote at top, centered logo, intro paragraph, lab IA table from the research doc, time estimate (~110 min), 30-screenshot badge.

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/index.md - EN homepage.

Discrepancy references:
* None.

Success criteria:
* Frontmatter declares `title`, `description`, `nav_order: 1`, `permalink: /`.
* First content line after frontmatter is `> 🇫🇷 **[Version française](fr/)**`.
* Contains the lab IA table from the research doc with all 11 labs + 3 reference pages, each row linking to the lab file.
* Centered `<img src="{{ '/assets/branding/logo-128.png' | relative_url }}" />` or equivalent Markdown.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lab Information Architecture table, Lines 147-167) - lab table source.
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 469-477) - homepage shape (scaffold step order item 3).

Dependencies:
* Phase 1 complete (theme + sidebar + branding must exist).

### Step 2.2: Author `labs/lab-00`..`labs/lab-09` using the lab-page template

For each lab, follow the template documented in the research doc: frontmatter (title, description, `permalink: /labs/<filename>`) → FR-link blockquote → H1 → Duration/Level/Prerequisites table → Overview → Learning objectives → numbered Exercises (with code fences and `![alt](../images/lab-NN/lab-NN-...png)` image refs that may point to placeholder PNGs initially) → Verification Checkpoint (checkbox list) → Next Steps link to the next lab.

Lab content map (derived from `Lab Information Architecture` table in research):

| File | EN Title |
|---|---|
| `labs/lab-00-prerequisites.md` | Lab 00 — Prerequisites |
| `labs/lab-01-install-windows-tooling.md` | Lab 01 — Install Windows tooling |
| `labs/lab-02-install-copilot-studio-extension.md` | Lab 02 — Install the Copilot Studio VS Code extension |
| `labs/lab-03-create-blank-agent.md` | Lab 03 — Create your first blank agent in the portal |
| `labs/lab-04-setup-workspace-and-cli.md` | Lab 04 — Set up local workspace and launch Copilot CLI |
| `labs/lab-05-install-skills-plugin.md` | Lab 05 — Install the `skills-for-copilot-studio` plugin |
| `labs/lab-06-clone-agent.md` | Lab 06 — Clone the agent into your workspace |
| `labs/lab-07-author-hello-world-topic.md` | Lab 07 — Author the Hello World topic |
| `labs/lab-08-push-and-publish.md` | Lab 08 — Push and publish |
| `labs/lab-09-test-in-portal.md` | Lab 09 — Test in the portal |

Each lab body is sourced from the hello-world research doc — DO NOT introduce new technical content. Where the hello-world research provides a step, transcribe it into the Exercise narrative.

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/labs/lab-00-prerequisites.md - through lab-09 (10 files).

Discrepancy references:
* None (in-scope content from the hello-world research).

Success criteria:
* All 10 lab files exist with the prescribed frontmatter and structure.
* Every lab's FR-link blockquote uses the path `/copilot-studio-skill/fr/labs/<same-filename>` (absolute under `baseurl`).
* Every image reference uses `../images/lab-NN/lab-NN-<descriptor>.png` so the same image file serves EN and FR (matching sibling pattern).
* Every lab ends with a "Next Steps" section linking to the next lab.

Context references:
* .copilot-tracking/research/2026-05-25/copilot-studio-skill-hello-world-research.md - canonical source for lab body content.
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 478-523) - Lab page template (EN), structural template.
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lab Information Architecture, Lines 147-167) - lab titles, durations, levels, screenshot counts.

Dependencies:
* Step 2.1 complete (homepage exists to link from).

### Step 2.3: Author `labs/lab-10-advanced-add-knowledge-source.md`

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/labs/lab-10-advanced-add-knowledge-source.md

Discrepancy references:
* None.

Success criteria:
* Same template as Step 2.2.
* Frontmatter `nav_order: 11`, body declares Level: Intermediate.
* Marked as optional in the homepage table and at the top of the file.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lab IA table, Lines 147-167, row `lab-10-advanced-add-knowledge-source.md`).

Dependencies:
* Step 2.2 complete.

### Step 2.4: Author reference pages

Three thin pages:
* `labs/troubleshooting.md` — table of (Symptom → Likely cause → Fix) rows aggregated from any troubleshooting callouts in the hello-world research.
* `labs/glossary.md` — EN-only glossary of the workshop's domain terms (Copilot Studio, topic, skill, etc.). The EN↔FR glossary table from the bilingual-content-strategy research belongs in the FR-side glossary, not here.
* `labs/references.md` — bullet list of links: Microsoft Learn Copilot Studio, just-the-docs theme, GitHub Copilot CLI docs, sibling workshop, source repos (`skills-for-copilot-studio`).

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/labs/troubleshooting.md
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/labs/glossary.md
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/labs/references.md

Discrepancy references:
* None.

Success criteria:
* Each file has the standard EN frontmatter with `nav_order` placing them after lab-10.
* Each file has the FR-link blockquote at top.
* `references.md` includes the live sibling site URL.

Context references:
* .copilot-tracking/research/2026-05-25/copilot-studio-skill-hello-world-research.md - source for troubleshooting items.

Dependencies:
* Step 2.3 complete.

### Step 2.5: Create `images/lab-NN/` subdirectories and architecture diagram

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/images/lab-00/.gitkeep through lab-10/.gitkeep (11 dirs).
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/images/architecture-diagram.mmd - mermaid source.
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/images/architecture-diagram.png - placeholder PNG (regenerable from .mmd).

Discrepancy references:
* None.

Success criteria:
* 11 lab subdirectories exist (each with `.gitkeep`).
* `images/architecture-diagram.mmd` contains a valid Mermaid flowchart showing: maker (VS Code + Copilot CLI) → skills plugin → Copilot Studio portal → tested agent.
* `images/architecture-diagram.png` exists (placeholder rendered from .mmd or hand-exported; final regeneration is a CONTRIBUTING.md note).

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 390-465) - `images/` directory layout within the file-tree-changes block.

Dependencies:
* Step 2.1 (homepage references the diagram).

### Step 2.6: Validate phase changes

Mandatory validation gate. Phase 2 cannot be marked complete until both commands succeed. Phase 3 may run in parallel, but Phase 2 validation is not deferred to Phase 5 — localized failure attribution is the whole point of per-phase gates.

Validation commands:
* `bundle exec jekyll build --baseurl ""` - confirms Jekyll renders the EN tree cleanly.
* `npx markdownlint-cli2 "**/*.md" "!.copilot-tracking/**" "!node_modules/**"` - lints all EN markdown (CONTRIBUTING.md, README.md, labs, index).

## Implementation Phase 3: Screenshot harness

<!-- parallelizable: true -->

### Step 3.1: Create `package.json` with `@playwright/test` and npm scripts

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/package.json - npm manifest.

Discrepancy references:
* None.

Success criteria:
* `devDependencies` includes `@playwright/test` (pin to `^1.49.0` or current latest at implementation time).
* `scripts` block declares `screenshots:seed`, `screenshots:web`, `screenshots:portal`, `screenshots:terminal`, `screenshots:promote`, `screenshots` (combined) — exactly as documented in the research doc.
* No `dependencies` block (this is a tooling-only manifest; no runtime deps).
* `private: true` to avoid accidental publish.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 528-543) - `package.json` scripts block.

Dependencies:
* Step 1.7 (`.gitignore` excludes `node_modules/`).

### Step 3.2: Create `playwright.config.ts` with five projects

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/playwright.config.ts - Playwright config.

Discrepancy references:
* None.

Success criteria:
* `testDir: 'screenshots/playwright'`.
* `fullyParallel: false`, `workers: 1` (avoid race conditions with shared storageState).
* `use:` block sets `viewport: { width: 1440, height: 900 }`, `deviceScaleFactor: 2`, `colorScheme: 'light'`, `timezoneId: 'America/Los_Angeles'`.
* Five projects defined exactly as in the research snippet: `seed-copilotstudio`, `en-public`, `fr-public`, `en-copilotstudio`, `fr-copilotstudio`, each with the correct `locale`, `extraHTTPHeaders` Accept-Language, and (for portal projects) `storageState: 'screenshots/.auth/copilotstudio.json'`.
* `testMatch` patterns correctly route specs: `seed.copilotstudio.ts` → seed, `public.*.ts` → public projects, `copilotstudio.*.ts` → portal projects.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 301-353) - `playwright.config.ts` snippet.

Dependencies:
* Step 3.1 (package.json declares `@playwright/test`).

### Step 3.3: Create `screenshots/playwright/seed.copilotstudio.ts`

Interactive headed Playwright script. Opens the Copilot Studio portal, pauses for the maker to complete Entra ID + MFA + conditional access prompts, then writes `screenshots/.auth/copilotstudio.json` via `context.storageState({ path })`. Tagged `@seed` so it only runs under `--project=seed-copilotstudio`.

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/screenshots/playwright/seed.copilotstudio.ts

Discrepancy references:
* None.

Success criteria:
* Test is tagged `@seed`.
* Navigates to `https://copilotstudio.microsoft.com` (or the canonical entry URL).
* Uses `await page.pause()` to suspend until the maker presses Resume.
* Writes storage state to `screenshots/.auth/copilotstudio.json` (parent dir created if missing).
* File-header comment instructs the user to run `npm run screenshots:seed` exactly once and to re-seed when cookies expire.

Context references:
* .copilot-tracking/research/subagents/2026-05-25/playwright-screenshot-strategy-research.md - storageState seed pattern with MFA.
* https://playwright.dev/docs/auth - Playwright auth/storageState docs.

Dependencies:
* Step 3.2 (`playwright.config.ts` declares the `seed-copilotstudio` project).

### Step 3.4: Create public-web capture specs

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/screenshots/playwright/public.workshop-site.ts - captures the workshop's own pages (after deploy or local preview).
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/screenshots/playwright/public.ms-learn.ts - captures referenced Microsoft Learn pages for embedding into labs.

Discrepancy references:
* DD-03 resolution (shared image-path scheme): EN captures write to `screenshots/final/lab-NN/lab-NN-<descriptor>.png`; FR captures write to `screenshots/final/lab-NN/lab-NN-<descriptor>-fr.png`. Derive lang suffix from project name (`fr-public` → `-fr`).

Success criteria:
* `public.workshop-site.ts` runs under both `en-public` and `fr-public` projects (auto-language-routed via the projects' locale and Accept-Language).
* Each capture writes to `screenshots/final/lab-NN/lab-NN-<descriptor>.png` (EN) or `screenshots/final/lab-NN/lab-NN-<descriptor>-fr.png` (FR), to be promoted later by `promote.ps1`.
* `public.ms-learn.ts` captures with `locale: en-US` only for EN runs and `locale: fr-FR` only for FR runs (verifies MS Learn auto-redirects to localized variant).

Context references:
* .copilot-tracking/research/subagents/2026-05-25/playwright-screenshot-strategy-research.md - public-web capture patterns.

Dependencies:
* Step 3.2.

### Step 3.5: Create Copilot Studio portal capture specs

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/screenshots/playwright/copilotstudio.create-agent.ts - captures the create-agent flow (Lab 03 + Lab 10).
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/screenshots/playwright/copilotstudio.test-pane.ts - captures the test pane (Lab 09).

Discrepancy references:
* DR-02 (data-testid/ARIA mask selector drift): document candidate selectors in a top-of-file comment; expect to refine on first capture pass.
* DD-03 resolution (shared image-path scheme): EN captures write to `screenshots/final/lab-NN/lab-NN-<descriptor>.png`; FR captures write to `screenshots/final/lab-NN/lab-NN-<descriptor>-fr.png`. No language subfolder. `promote.ps1` flat-copies into `images/lab-NN/`.

Success criteria:
* Both specs run under both `en-copilotstudio` and `fr-copilotstudio` projects (parallel EN + FR capture for portal surfaces).
* Use Playwright `mask:` option with a documented selector list to redact tenant identifiers, user avatar, user name, environment name.
* EN output path: `screenshots/final/lab-NN/lab-NN-<descriptor>.png`. FR output path: `screenshots/final/lab-NN/lab-NN-<descriptor>-fr.png`. Derive lang suffix from the project name (`fr-copilotstudio` → `-fr`).

Context references:
* .copilot-tracking/research/subagents/2026-05-25/playwright-screenshot-strategy-research.md - portal redaction selectors + mask pattern.
* https://playwright.dev/docs/screenshots - Playwright screenshot/mask reference.

Dependencies:
* Step 3.2.
* Step 3.3 (storageState file must exist before these specs run successfully — maker runs `npm run screenshots:seed` first).

### Step 3.6: Create PowerShell harness scripts

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/screenshots/scripts/capture-terminal.ps1 - loops over `screenshots/transcripts/*.txt`, derives target path from filename pattern (`lab-NN-<descriptor>.txt` → `images/lab-NN/lab-NN-<descriptor>.png`), invokes `freeze` with consistent flags (`--theme dracula --window --border.radius 8 --shadow.blur 20 --shadow.y 10 --padding 20,40 --font.family "Cascadia Code" --font.size 14`).
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/screenshots/scripts/capture-web.ps1 - thin wrapper for `npx playwright test --project=en-public --project=fr-public`.
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/screenshots/scripts/capture-portal.ps1 - thin wrapper for `npx playwright test --project=en-copilotstudio --project=fr-copilotstudio`.
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/screenshots/scripts/promote.ps1 - flat-copies `screenshots/final/lab-NN/*.png` into `images/lab-NN/`, preserving filenames (including the `-fr` suffix for FR portal variants). No rename, no language subfolder removal — the source layout from Steps 3.4 and 3.5 already matches the final layout.

Discrepancy references:
* DD-03 resolution: `promote.ps1` is a flat 1:1 copy because Steps 3.4 and 3.5 write to the same `screenshots/final/lab-NN/<filename>.png` shape that `images/lab-NN/` expects. No rename or restructure needed.

Success criteria:
* All four scripts start with `Set-StrictMode -Version Latest` and `$ErrorActionPreference = 'Stop'`.
* `capture-terminal.ps1` skips files whose freeze output is newer than the source `.txt` (idempotent re-runs).
* `promote.ps1` is the only script allowed to write into `images/lab-NN/` (clear separation: Playwright + freeze write to `screenshots/final/`, only promote copies into `images/`).
* `promote.ps1` enumerates `screenshots/final/lab-*/` directories and for each one runs `Copy-Item screenshots/final/lab-NN/*.png images/lab-NN/ -Force`; creates `images/lab-NN/` if it does not exist; logs each copied file.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 355-369) - `freeze` invocation snippet.

Dependencies:
* Steps 3.4 and 3.5 (specs the wrappers run).

### Step 3.7: Seed `screenshots/transcripts/` with PII-scrubbed text fixtures

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/screenshots/transcripts/lab-01-pwsh-version.txt - PowerShell `$PSVersionTable` output.
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/screenshots/transcripts/lab-01-copilot-version.txt - `copilot --version` output.
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/screenshots/transcripts/lab-05-plugin-install.txt - skills plugin install output.

Discrepancy references:
* None.

Success criteria:
* No real tenant IDs, account names, machine names, or file paths under a real `C:\Users\<name>\`.
* Each transcript begins with a `PS C:\workshop>` prompt to standardize the `freeze` output.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 390-465) - file-tree-changes block; `screenshots/transcripts/` subtree.

Dependencies:
* None (independent of other Step 3 work; ordered last for clarity).

### Step 3.8: Validate phase changes

Mandatory validation gate. Phase 3 cannot be marked complete until all four commands succeed. Phase 2 may run in parallel, but Phase 3 validation is not deferred to Phase 5.

Validation commands:
* `npm install` - resolves Playwright.
* `npx playwright install chromium` - downloads Chromium for Playwright.
* `npx playwright test --list` - confirms `playwright.config.ts` parses and discovers the seed + 4 capture specs.
* `freeze --version` - confirms `freeze` is on PATH.

## Implementation Phase 4: FR content mirror

<!-- parallelizable: false -->

### Step 4.1: Author `fr/index.md` (FR homepage)

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/fr/index.md

Discrepancy references:
* None.

Success criteria:
* Frontmatter: `lang: fr`, `nav_exclude: true`, `permalink: /fr/`, `title`, `description` in French.
* First content line: `> 🇬🇧 **[English version](../)**`.
* Translated homepage body honoring the glossary (rubrique, not sujet; tenant kept; etc.).
* Same lab IA table as EN homepage, with table headers and link text in French.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Bilingual Mechanism, Lines 91-119) - FR homepage pattern.
* .copilot-tracking/research/subagents/2026-05-25/bilingual-content-strategy-research.md - glossary + tone calibration.

Dependencies:
* Step 2.1 (EN homepage is the translation source).

### Step 4.2: Author `fr/labs/lab-00`..`fr/labs/lab-09` mirrors

Filenames stay English; titles inside are French. Translate every section per the glossary. Workflow: machine-translate via Azure AI Translator with a custom glossary seeded from the bilingual-content-strategy research, then human-review each FR page before considering it complete.

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/fr/labs/lab-00-prerequisites.md through fr/labs/lab-09-test-in-portal.md (10 files).

Discrepancy references:
* DD-03 resolution: FR pages reference `../images/lab-NN/lab-NN-<descriptor>-fr.png` for portal screenshots that genuinely localize. For Windows-English-only surfaces, FR pages reference the same `../images/lab-NN/lab-NN-<descriptor>.png` as EN pages (shared image).

Success criteria:
* Each file's frontmatter declares `lang: fr`, `nav_exclude: true`, `permalink: /fr/labs/<filename>`.
* Each file's first content line is the EN-link blockquote pointing to `../../labs/<same-filename>` (or absolute `/copilot-studio-skill/labs/<same-filename>`).
* Image references reuse the same `../images/lab-NN/lab-NN-<descriptor>.png` paths where the surface is Windows-English-only (VS Code/CLI/PowerShell/git).
* For Copilot Studio portal screenshots, FR pages reference parallel `../images/lab-NN/lab-NN-<descriptor>-fr.png` files (which Phase 3 portal-capture specs produce per DD-03 resolution).
* Glossary compliance: `rubrique` not `sujet`, `tenant` kept English, `plug-in` hyphenated, `compte professionnel ou scolaire`, French NBSP before `:`, French guillemets for direct quotes.

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 525-525) - Lab page template (FR — parity), structural template.
* .copilot-tracking/research/subagents/2026-05-25/bilingual-content-strategy-research.md - glossary + FR tone calibration with examples.
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 546-549) - Bilingual screenshot decision per lab; which labs need parallel FR portal screenshots.

Dependencies:
* Step 2.2 (EN labs are the translation source).

### Step 4.3: Author `fr/labs/lab-10-advanced-add-knowledge-source.md` mirror

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/fr/labs/lab-10-advanced-add-knowledge-source.md

Discrepancy references:
* None.

Success criteria:
* Same template as Step 4.2.
* FR title declares "Niveau intermédiaire" and "facultatif".

Context references:
* .copilot-tracking/research/subagents/2026-05-25/bilingual-content-strategy-research.md.

Dependencies:
* Step 2.3.

### Step 4.4: Author FR reference page mirrors

Files:
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/fr/labs/troubleshooting.md - FR title: "Dépannage".
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/fr/labs/glossary.md - FR title: "Glossaire". This is where the full EN↔FR glossary table from bilingual-content-strategy-research.md belongs.
* c:/src/GitHub/devopsabcs-engineering/copilot-studio-skill/fr/labs/references.md - FR title: "Références".

Discrepancy references:
* None.

Success criteria:
* `fr/labs/glossary.md` contains the full EN↔FR glossary table from the bilingual-content-strategy research.
* `fr/labs/references.md` link list prefers `learn.microsoft.com/fr-fr/` URLs over `learn.microsoft.com/en-us/` where available.

Context references:
* .copilot-tracking/research/subagents/2026-05-25/bilingual-content-strategy-research.md - glossary table.

Dependencies:
* Step 2.4.

### Step 4.5: Verify reciprocal language-switcher links

Walk the EN and FR file trees pairwise. For every EN file at `labs/<file>.md` confirm there is a `fr/labs/<file>.md`. For every page, confirm the language-switcher link at the top points to the correct counterpart.

Files:
* No new files. Pure verification step.

Discrepancy references:
* None.

Success criteria:
* `Get-ChildItem labs/*.md` and `Get-ChildItem fr/labs/*.md` produce parallel lists.
* No 404s when clicking the language-switcher links in local preview.
* The single-line "stale-page" banner (`🇬🇧 *Cette page peut être en retard ...*`) is NOT present on any FR page initially (would only appear if a future PR ships a stale FR).

Context references:
* .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Lines 553-555) - Partial-translation policy, banner format.

Dependencies:
* Steps 4.1–4.4.

## Implementation Phase 5: Final validation and handoff

<!-- parallelizable: false -->

### Step 5.1: Run full project validation

Execute, in order:

* `bundle exec jekyll build --baseurl ""` — confirm Jekyll renders with no Liquid errors. If Ruby/Bundler unavailable, install via `gem install bundler jekyll` first; failing that, fall back to verifying the workflow with `act` or skipping and relying on the GitHub Pages CI deploy as the validation.
* `npx markdownlint-cli2 "**/*.md" "!.copilot-tracking/**" "!node_modules/**" "!_site/**"` — lint all authored markdown.
* `npx playwright test --list` — confirm Playwright config + specs parse.
* `Get-ChildItem labs/*.md, fr/labs/*.md | Group-Object Name | Where-Object { $_.Count -ne 2 }` — must be empty (every EN file has a FR pair and vice versa).
* `Test-Path index.md, fr/index.md | Where-Object { $_ -eq $false }` — must be empty (homepage pair exists).
* `git status` — confirm `screenshots/.auth/`, `screenshots/raw/`, `screenshots/final/`, `node_modules/`, `_site/`, `.jekyll-cache/`, `Gemfile.lock` are NOT in the working tree (all gitignored).

### Step 5.2: Fix minor validation issues

Iterate on lint errors and trivial Liquid bugs:
* Frontmatter typos.
* MD-* line-length / heading-style fixes.
* Missing reciprocal links.
* Stray smart quotes from copy-paste.
* Mermaid block fences accidentally not transformed (verify via local preview).

### Step 5.3: Report blocking issues

Anything requiring additional research is reported to the user with recommended next steps, not fixed inline:

* `actions/jekyll-build-pages@v1` rejects a plugin (would require switching to a custom workflow with `setup-ruby` + `bundle exec jekyll build`).
* Sibling sidebar override produces wrong order in actual deploy (would require WI-01 byte-for-byte inspection).
* Theme version pin needed because just-the-docs ships a breaking change to `components/site_nav.html` (would require pinning `remote_theme: just-the-docs/just-the-docs@vX.Y.Z`).
* Storage state cookies expire mid-portal-capture batch (would require splitting capture into shorter runs or WI-03).

## Dependencies

* Ruby + Bundler + Jekyll (local preview only).
* Node 22+, npm, `@playwright/test`, Chromium for Playwright (`npx playwright install chromium`).
* `charmbracelet/freeze` on PATH (`winget install charmbracelet.freeze`).
* GitHub Pages source set to "GitHub Actions" (manual; WI-06).
* M365 demo tenant for portal capture (interactive seed).

## Success Criteria

* All Phase 1–4 files exist with the prescribed shape.
* Phase 5 validation passes with zero markdownlint errors and zero Jekyll build errors.
* Pushing to `main` triggers `pages.yml` and deploys to `https://devopsabcs-engineering.github.io/copilot-studio-skill/`.
* The deployed site shows the EN homepage with `🇫🇷 Version française` linking to `/copilot-studio-skill/fr/` and vice versa.
* The FR sidebar is hand-built (not auto-generated by just-the-docs) and lists only `lang: fr` pages in zero-padded permalink order.
