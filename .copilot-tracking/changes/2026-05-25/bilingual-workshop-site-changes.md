<!-- markdownlint-disable-file -->
# Release Changes: Bilingual Copilot Studio Workshop Site

**Related Plan**: bilingual-workshop-site-plan.instructions.md
**Implementation Date**: 2026-05-25

## Summary

Stand up a Jekyll + `just-the-docs` workshop site at the repo root that mirrors the sibling `agentic-accelerator-workshop` 1:1 — parallel EN/FR file tree, Liquid sidebar override, zero-padded 10-lab IA, three-tool screenshot harness, and `actions/jekyll-build-pages@v1` GitHub Pages deploy.

## Changes

### Added

**Phase 1 — Jekyll site scaffold and theme wiring (2026-05-25):**

* `_config.yml` — Jekyll + just-the-docs configuration. Sets `remote_theme: just-the-docs/just-the-docs` (tracks the GitHub Pages whitelist; no version pin), `baseurl: "/copilot-studio-skill"`, `url: "https://devopsabcs-engineering.github.io"`, `search_enabled: true`, `heading_anchors: true`, default `layout: default` for all pages with `nav_exclude: true` on `images/*`, and excludes for `screenshots/`, `node_modules/`, `Gemfile*`, `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `LICENSE`, and `.copilot-tracking/`.
* `Gemfile` — Pins the `github-pages` gem in the `:jekyll_plugins` group so `bundle exec jekyll serve` runs the same toolchain GitHub Pages uses.
* `_includes/head_custom.html` — Three favicon `<link>` tags pointing into `/assets/branding/`, ESM import of Mermaid v11 from `cdn.jsdelivr.net`, post-load transform of `pre > code.language-mermaid` blocks into `<div class="mermaid">` containers, `mermaid.initialize({ startOnLoad: true })`, and `.site-title { white-space: normal; }` to keep the long workshop title from clipping.
* `_includes/components/sidebar.html` — Liquid override that branches on `page.lang == 'fr'`. The FR branch builds a French-only nav by filtering `site.pages | where: "lang", "fr" | sort: "permalink"`, emits `<nav aria-label="Navigation principale (français)">`, marks the current page active, and skips pages with `nav_exclude: true`. The `{% else %}` branch falls through to `{% include_cached components/site_nav.html %}` so EN pages use the stock just-the-docs nav verbatim.
* `assets/branding/.gitkeep` — Keeps the `assets/branding/` directory under version control until final art lands.
* `assets/branding/README.md` — Explains the placeholder status, names the four required files (`favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`, `logo-128.png`), confirms the site builds cleanly with the files missing, and points contributors at WI-07 for the final art.
* `.github/workflows/pages.yml` — GitHub Pages build-and-deploy workflow. Triggers on `push` to `main` and `workflow_dispatch`, grants `contents:read`, `pages:write`, `id-token:write`, sets `concurrency: pages` with `cancel-in-progress: false`. Build job uses `actions/checkout@v4`, `actions/configure-pages@v5`, `actions/jekyll-build-pages@v1`, and `actions/upload-pages-artifact@v3`. Deploy job depends on build, targets the `github-pages` environment, and uses `actions/deploy-pages@v4`.
* `.gitignore` — Ignores screenshot harness state (`screenshots/.auth/`, `screenshots/raw/`, `screenshots/final/`), `node_modules/`, Jekyll build output (`_site/`, `.jekyll-cache/`, `.jekyll-metadata`, `Gemfile.lock`), screenshot backup files (`*.png.backup`), and OS metadata (`.DS_Store`, `Thumbs.db`).
* `LICENSE` — MIT license, copyright 2026 Microsoft Corporation.
* `CODE_OF_CONDUCT.md` — Frontmatter (`title`, `description`) wrapping the standard Microsoft Open Source Code of Conduct adoption text and links.
* `README.md` — Frontmatter (`title`, `description`, `nav_exclude: true`), live-site links for both languages, repo layout table, and a PowerShell quickstart that uses `bundle exec jekyll serve --baseurl ""` to override the production baseurl locally.
* `CONTRIBUTING.md` — Frontmatter (`title`, `description`) plus three required sections: a translation policy that mandates parallel EN/FR updates in the same PR, a screenshot harness section that captures the per-surface decision (Labs 01/02/04/05/07/08 share EN-only captures, Labs 03/06/09/10 ship EN + FR parallel portal captures), and a one-time repo settings section covering the `Settings → Pages → Source = GitHub Actions` flip and the `screenshots:seed` storage state.

**Phase 3 — Screenshot harness scaffold (2026-05-25):**

* `package.json` — Declares `private: true`, the `@playwright/test ^1.49.0` devDependency, and the six `screenshots:*` npm scripts (`seed`, `web`, `portal`, `terminal`, `promote`, plus the top-level `screenshots` orchestrator). The orchestrator runs web → portal → terminal → promote in order so that promote sees a fully populated `screenshots/final/`.
* `playwright.config.ts` — Centralized Playwright configuration. `testDir: 'screenshots/playwright'`, `fullyParallel: false`, `workers: 1`, 1440×900 viewport at `deviceScaleFactor: 2`, `colorScheme: 'light'`, `timezoneId: 'America/Los_Angeles'`, and five projects matching the multi-project strategy: `seed-copilotstudio` (grep `/@seed/` only), `en-public` / `fr-public` (locale + Accept-Language; match `public.*.ts`), and `en-copilotstudio` / `fr-copilotstudio` (locale + Accept-Language + `storageState: 'screenshots/.auth/copilotstudio.json'`; match `copilotstudio.*.ts`).
* `screenshots/playwright/seed.copilotstudio.ts` — One-time interactive Entra ID + MFA seed. Tagged `@seed`. Uses `page.pause()` to suspend execution so the human can complete sign-in in the opened browser window, then asserts a localized "Create | Créer" button before calling `context.storageState({ path: ... })`. Creates `screenshots/.auth/` via `fs.mkdir({ recursive: true })`. Path resolved via `path.join(__dirname, '..', '.auth', 'copilotstudio.json')`.
* `screenshots/playwright/public.workshop-site.ts` — Captures workshop-site pages in both languages. Reads `BASE_URL` from env (defaults to `http://localhost:4000`). Computes language prefix from `info.project.name` (`fr-` → `/fr`, else empty). One skeleton test for the homepage; `outPath()` helper enforces the `lab-NN-<descriptor>(-fr)?.png` convention.
* `screenshots/playwright/public.ms-learn.ts` — Captures Microsoft Learn pages, relying on Microsoft Learn's Accept-Language auto-redirect (en-US → /en-us/..., fr-FR → /fr-fr/...) so a single locale-neutral URL captures correctly in both projects. One skeleton test for the Copilot Studio overview page.
* `screenshots/playwright/copilotstudio.create-agent.ts` — Captures the lab-03 create-agent surface. Requires storageState seeded via `npm run screenshots:seed`. Top-of-file `REDACTION_SELECTORS` list documents the six DR-02 placeholder selectors (`[data-testid*="user"]`, `[aria-label*="account"]`, `[data-testid*="tenant"]`, `[aria-label*="environment"]`, `[data-testid*="environment-picker"]`, `[data-testid*="user-profile"]`) and explicitly flags them as candidates requiring live DevTools verification on first capture pass. Applies selectors via `mask:` plus a `style:` override that blanks timestamps. One skeleton test captures the portal landing.
* `screenshots/playwright/copilotstudio.test-pane.ts` — Captures the lab-09 test-pane surface using the same redaction selector list mirrored from `copilotstudio.create-agent.ts` (with comment noting both files must update together). One skeleton test captures the initial test-pane state.
* `screenshots/scripts/capture-terminal.ps1` — Idempotent freeze runner. Globs `screenshots/transcripts/*.txt`, validates names match `^lab-(\d{2})-(.+)$`, skips rendering when the existing PNG is at least as new as the source `.txt`, and otherwise invokes freeze with the standardized flag set (`--theme dracula --window --border.radius 8 --shadow.blur 20 --shadow.y 10 --padding "20,40" --font.family "Cascadia Code" --font.size 14`). Soft-fails with installation guidance when freeze is missing from PATH. Writes directly into `images/lab-NN/` (terminal stills are deterministic re-renders of committed text fixtures and need no promote step).
* `screenshots/scripts/capture-web.ps1` — Thin PowerShell wrapper around `npx playwright test --project=en-public --project=fr-public`. Push-pops into the repo root and throws on non-zero exit.
* `screenshots/scripts/capture-portal.ps1` — Thin PowerShell wrapper around `npx playwright test --project=en-copilotstudio --project=fr-copilotstudio`. Validates `screenshots/.auth/copilotstudio.json` exists before invoking Playwright; throws a contextual error pointing to `npm run screenshots:seed` when the storage state is missing.
* `screenshots/scripts/promote.ps1` — Flat 1:1 copy from `screenshots/final/lab-NN/*.png` to `images/lab-NN/*.png`, preserving filenames. The only script in the harness that writes into `images/lab-NN/` for Playwright-driven captures. Creates target lab directories on demand.
* `screenshots/transcripts/lab-01-pwsh-version.txt` — PII-scrubbed `$PSVersionTable` output (PowerShell 7.4.6 / Windows 10.0.26100). Starts and ends with `PS C:\workshop>` prompts; no real machine name or username.
* `screenshots/transcripts/lab-01-copilot-version.txt` — PII-scrubbed `copilot --version` output (GitHub Copilot CLI v0.6.10). Single command, single result line, two `PS C:\workshop>` prompts.
* `screenshots/transcripts/lab-05-plugin-install.txt` — PII-scrubbed `copilot plugin install copilot-studio` output. Shows install progress, signature verification, and the three sample skill names (`@copilot-studio:copilot-studio-author`, `-publish`, `-test`); no real tenant or user identifiers.

### Modified

None for Phase 1.

None for Phase 3.

### Removed

None for Phase 1.

None for Phase 3.

## Additional or Deviating Changes

**Step 1.5 branding placeholders — `.gitkeep` + README instead of valid binary stubs.** The plan offered two paths: produce smallest valid binary PNG/ICO stubs, or fall back to `.gitkeep` markers plus an explanatory `assets/branding/README.md`. Took the fallback. Rationale: the available file-creation tooling is text-only, and constructing valid PNG/ICO binaries from base64 via terminal commands carries malformed-image risk that would surface as silently broken favicons in browsers. Missing favicons produce three `404` console entries during local preview and on the deployed site, but block neither `bundle exec jekyll build` nor `actions/jekyll-build-pages@v1`. Final branding is already tracked as WI-07 in the implementation plan, so the placeholder window is bounded. `assets/branding/README.md` documents the exact filenames and dimensions the head include expects, so when WI-07 ships the binaries drop in without any code changes.

**Phase 3 capture-terminal.ps1 writes directly into `images/lab-NN/`, bypassing promote.ps1.** The "promote.ps1 is the only script that writes into `images/lab-NN/`" rule applies specifically to the Playwright-driven pipeline (raw → final → promote → images), where promote.ps1 enforces the language-suffix convention and runs after redaction QA. Terminal stills follow a different model: the source-of-truth text transcripts (PII-scrubbed) are committed under `screenshots/transcripts/`, freeze rendering is deterministic and reproducible from the committed text, and there is no QA or redaction step between freeze and final image. Routing freeze output through `screenshots/final/` would add a no-op copy stage and a second moment where the image can drift from the transcript. The capture-terminal script therefore writes straight into `images/lab-NN/` from the transcript, and the script header comment explicitly calls out this exception so future maintainers don't unify the two flows by accident.

**Phase 3 portal selectors marked candidate-only.** The DR-02 placeholder selectors (`[data-testid*="user"]`, `[aria-label*="account"]`, `[data-testid*="tenant"]`, `[aria-label*="environment"]`, `[data-testid*="environment-picker"]`, `[data-testid*="user-profile"]`) are documented at the top of both `copilotstudio.*.ts` spec files but are flagged in code comments as "candidate selectors based on Microsoft Power Platform UI conventions" pending live DevTools verification on the first authenticated capture pass. Both files reference each other so a selector update must touch both. Skeleton tests assert `getByRole('button', { name: /create|cr[eé]er/i })` as a portal-loaded gate that works in both EN and FR before any portal-specific selectors run.

**Phase 3 specs are skeleton coverage (one example per file).** Per the phase scope, each `screenshots/playwright/*.ts` spec ships with one example test that exercises the project-aware path helpers and (for portal specs) the redaction selector application. Phases 4 and 5 will add the lab-specific tests once portal flows are validated against the live UI. The `playwright test --list` output therefore reports 9 tests across the 5 projects: `seed-copilotstudio` (1), `en-public` (2), `fr-public` (2), `en-copilotstudio` (2), `fr-copilotstudio` (2).

## Release Summary

**Phase 1 complete.** All 10 scaffold files exist and pass content invariants: `_config.yml` declares the just-the-docs remote theme and the `/copilot-studio-skill` baseurl, `_includes/components/sidebar.html` gates on `page.lang == 'fr'`, and `.github/workflows/pages.yml` builds via `actions/jekyll-build-pages@v1` and deploys via `actions/deploy-pages@v4`. The repository is ready for Phase 2 (markdown lint config, EN homepage, EN labs 01–10) once Phase 2 inputs (sidebar-override-pattern-research.md, jekyll-deploy-research.md content) are queued.

**Phase 3 complete.** All 14 scaffold files exist and the Step 3.8 validation gate passes end-to-end. `npm install` resolves `@playwright/test@^1.49.0` clean (0 vulnerabilities). `npx playwright install chromium` provisions Chrome for Testing 148.0.7778.96. `npx playwright test --list` reports `Total: 9 tests in 5 files` across all five projects (seed-copilotstudio, en-public, fr-public, en-copilotstudio, fr-copilotstudio) — confirming the multi-project config parses, the `testMatch` regexes route specs to the right projects, the `grep: /@seed/` gate excludes seed.copilotstudio.ts from non-seed runs, and storageState binding is wired for both portal projects. `freeze --version` returns `v0.2.2 (80921ba)`, confirming terminal capture tooling is on PATH. The screenshot harness is ready for the live portal validation pass (DR-02 selector confirmation) that will run during Phase 4 or 5 capture work.

---

## Phase 4 Changes — FR content mirror (2026-05-25)

### Added

**Phase 4 — French parallel translation of every Phase 2 page (15 files):**

* `fr/index.md` — French homepage. Frontmatter declares `title`, `description`, `nav_order: 1`, `permalink: /fr/`, `lang: fr`, `nav_exclude: true`. Renders the language switcher (`> 🇬🇧 **[English version](../)**`), the logo placeholder, "Vue d'ensemble" intro, two metadata badges (Plateforme, Durée), the 14-row Information Architecture table (headers `Lab | Titre | Durée | Niveau`), the "Architecture" section pointing at `../images/architecture-diagram.png` plus an inline `mermaid flowchart LR` with French node labels, "Ce que vous allez construire", "Outillage en bref", and "Pour commencer". One `..` segment in image paths (depth 1).
* `fr/labs/lab-00-prerequisites.md` — Lab 00 mirror (`Prérequis`). `nav_order: 2`, Duration `15 min`. 3 exercises (créer le compte tenant; vérifier l'abonnement Copilot ; choisir l'environnement). 3 images: `lab-00-copilot-subscription.png` (EN-shared GitHub UI), `lab-00-trial-signup-fr.png` (portal), `lab-00-env-switcher-fr.png` (portal). Documents the GitHub Copilot CLI org policy gate.
* `fr/labs/lab-01-install-windows-tooling.md` — Lab 01 mirror (`Installer l'outillage Windows`). `nav_order: 3`, Duration `15 min`. 3 exercises (PowerShell 7+ via `$PSVersionTable.PSVersion`; Node.js 22+ via `winget install OpenJS.NodeJS.LTS`; Copilot CLI via `winget install GitHub.Copilot`). All 3 images EN-shared (terminal stills are Windows-only surfaces). `npm install -g @github/copilot` fallback documented.
* `fr/labs/lab-02-install-copilot-studio-extension.md` — Lab 02 mirror (`Installer l'extension VS Code Copilot Studio`). `nav_order: 4`. 2 exercises (rechercher dans la barre latérale Extensions ; vérifier l'éditeur de schéma YAML). Both images EN-shared (English VS Code Marketplace UI). References `microsoft/vscode-copilotstudio`.
* `fr/labs/lab-03-create-blank-agent.md` — Lab 03 mirror (`Créer votre premier agent vide dans le portail`). `nav_order: 5`. 3 exercises (créer l'agent dans le portail ; nommer `HelloWorldAgent` ; vérifier le nœud Conversation Start). All 3 images carry `-fr` suffix (portal screens). Agent name `HelloWorldAgent` kept English.
* `fr/labs/lab-04-setup-workspace-and-cli.md` — Lab 04 mirror (`Préparer l'espace de travail local et lancer Copilot CLI`). `nav_order: 6`. 3 exercises (créer `C:\src\copilot-studio-work` ; lancer `copilot` dans le terminal intégré VS Code ; compléter `/login`). 2 of 3 images EN-shared (Windows + VS Code surfaces). References issue #116 explaining why integrated terminal is used over Copilot Chat side panel.
* `fr/labs/lab-05-install-skills-plugin.md` — Lab 05 mirror (`Installer le plug-in skills-for-copilot-studio`). `nav_order: 7`. 2 exercises (`/plugin marketplace add` + `/plugin install` ; vérifier autocomplétion `@`). 4-row sub-agent table with translated `Objectif` column; sub-agent names kept English. Both images EN-shared.
* `fr/labs/lab-06-clone-agent.md` — Lab 06 mirror (`Cloner l'agent dans votre espace de travail`). `nav_order: 8`. 3 exercises (déclencher clone ; choisir environnement + agent ; inspecter dossier). ALL 4 images EN-shared (Lab 06 captures are CLI + VS Code Explorer, no portal screens). `> [!NOTE]` on `.<kind>.mcs.yml` suffix. Folder tree code block.
* `fr/labs/lab-07-author-hello-world-topic.md` — Lab 07 mirror (`Rédiger la rubrique Hello World`). `nav_order: 9`. 3 exercises (rédiger via `@copilot-studio:copilot-studio-author` ; inspecter le YAML ; valider avec advisor en option). 1 image EN-shared. The verbatim greeting `"Hello, world! I'm a Copilot Studio agent authored from VS Code via the Copilot CLI plugin."` kept English (YAML payload). `> [!TIP]` on `kind` casing sensitivity.
* `fr/labs/lab-08-push-and-publish.md` — Lab 08 mirror (`Pousser et publier`). `nav_order: 10`. 3 exercises (push CLI ; revenir au portail ; cliquer Publish). 1 EN-shared image (CLI) + 2 `-fr` portal images. `> [!CAUTION]` on `ConcurrencyVersionMismatch`. `> [!IMPORTANT]` on draft-vs-published distinction.
* `fr/labs/lab-09-test-in-portal.md` — Lab 09 mirror (`Tester dans le portail`). `nav_order: 11`, Duration `5 min`. 3 exercises (ouvrir Test pane ; envoyer `hello` ; chemin CLI alternatif facultatif). ALL 3 images carry `-fr` suffix (portal screens). `> [!NOTE]` clarifying only `test` sub-agent needs `CopilotStudio.Copilots.Invoke` (OBO). Greeting reply text kept English (matches YAML).
* `fr/labs/lab-10-advanced-add-knowledge-source.md` — Lab 10 mirror (`(Avancé) Ajouter une source de connaissances`). `nav_order: 12`, Duration `15 min`, Level `Intermédiaire (facultatif)`. **facultatif** rendered bold. 4 exercises (ajouter source → écrit `HelloWorldAgent/knowledge/CopilotStudioDocs.knowledge.mcs.yml` ; push + republish ; tester avec `What is a topic in Copilot Studio?` kept English ; inspecter activity map). 1 EN-shared CLI image + 1 `-fr` portal image. `> [!IMPORTANT]` on republication requirement.
* `fr/labs/troubleshooting.md` — Troubleshooting mirror (`Dépannage`). `nav_order: 13`. 12-row `Symptôme | Cause probable | Correctif` table covering all upstream issues (#116, #155), `ConcurrencyVersionMismatch`, `CdsBotId` regression, `kind` casing, Power Fx `=` prefix, App Registration gate, draft-vs-published mismatch, account type rejection. "Où chercher ensuite" section with 3 bullet links.
* `fr/labs/glossary.md` — Glossary canonical FR-side page (`Glossaire`, `nav_order: 14`). Per DD-01, hosts the full bilingual EN↔FR translation glossary with headers `Anglais (UI / docs Microsoft) | Français (UI / docs Microsoft fr-fr) | Note de traduction` covering 29 normalized terms (Topic→Rubrique, Knowledge source→Source de connaissances, Plugin→Plug-in, Tenant kept English, Work or school account→Compte professionnel ou scolaire, Skill / Compétence disambiguation, Activity map→Carte d'activité, etc.), followed by 20 translated domain term definitions.
* `fr/labs/references.md` — References mirror (`Références`, `nav_order: 15`). 5 grouped sections (Produit Copilot Studio ; Source de l'outillage de l'atelier ; GitHub Copilot CLI ; Exemples Microsoft associés ; Infrastructure propre de cet atelier). 22 link items. Per DD-08, the 4 Microsoft Learn URLs swap `/en-us/` → `/fr-fr/`; all other URLs (GitHub repos, issue trackers, docs.github.com, just-the-docs, playwright.dev, charmbracelet/freeze) preserved unchanged.

### Modified

None for Phase 4. All edits are net-new files under `fr/`. The EN tree is untouched.

### Removed

None for Phase 4.

## Additional or Deviating Changes (Phase 4)

**Lab 06 image-path policy — NONE of 4 images get `-fr` suffix (deviation from a naive reading of DD-03).** DD-03's image-path policy is "EN-shared for Windows surfaces, `-fr` suffix only for Copilot Studio portal screens." Lab 06 captures (`lab-06-manage-clone.png`, `lab-06-env-agent-pick.png`, `lab-06-workspace-folder.png`, `lab-06-agent-yml-editor.png`) are all CLI + VS Code Explorer surfaces — no Copilot Studio portal screens — so all four reuse the EN-shared `../../images/lab-06/*` paths. This matches the EN source and avoids creating four orphan `-fr` filenames that would never be screenshot-captured. Recorded here so the Phase 5 capture pass does not inadvertently produce `-fr` variants for Lab 06.

**Glossary actual term count is 29, not the 16 the plan estimated.** The plan's Phase 4 outline estimated ~16 translation table rows for `fr/labs/glossary.md`. The authored table holds 29 rows after normalizing every UI term that appears anywhere in the EN labs (added: Tenant, Work or school account, Repository / Repo, Fork, Frontmatter, Slash command, Handoff, Plugin marketplace, Login flow, Pull, plus the Skill / Compétence disambiguation pair). 20 domain term definitions follow the table, exactly mirroring the EN-side count. The translation policy in DD-01 still holds — this is just a larger surface than the original estimate captured.

**Language switcher path corrected to two-segment relative path for FR labs.** Per the EN-side language switcher pattern (`> 🇫🇷 **[Version française](../fr/labs/<filename>.md)**` from EN labs at depth 1), the symmetric FR-side switcher needs to walk up two segments from `fr/labs/<filename>.md` back to `labs/<filename>.md`. All 11 FR lab files use `> 🇬🇧 **[English version](../../labs/<same-filename>.md)**`. The FR homepage at `fr/index.md` uses `> 🇬🇧 **[English version](../)**` (single segment back to repo root). Both forms are markdownlint-clean and Jekyll-resolvable under the `/copilot-studio-skill` baseurl.

## Release Summary

**Phase 4 complete.** All 15 FR files exist on disk (1 homepage + 11 labs + 3 reference pages). The Step 4.5 validation gate passes end-to-end: `Get-ChildItem labs/*.md, fr/labs/*.md | Group-Object Name | Where-Object { $_.Count -ne 2 }` returns empty (every EN file has exactly one FR sibling with matching filename); both `index.md` and `fr/index.md` exist; FR file count is exactly 15; all 15 FR files declare `lang: fr` in frontmatter. `npx markdownlint-cli2 "fr/**/*.md"` reports `0 error(s)` — DD-07 compliance verified (no body H1 — frontmatter `title:` is the only H1 source — and MD025/MD041 both pass). DD-03 image-path policy enforced consistently (10 portal screens carry `-fr` suffix across labs 00, 03, 08, 09, 10 ; all CLI + VS Code + Windows surfaces reuse EN-shared paths). DD-08 URL-swap policy applied to exactly the 4 Microsoft Learn URLs in `fr/labs/references.md`. The site is ready for Phase 5 (screenshot capture pass for both EN portal screens and FR portal screens, plus terminal still re-renders).

---

## Phase 5 Changes — Final validation and handoff (2026-05-25)

### Added

None for Phase 5. The phase exists to run the cross-cutting validation harness on what Phases 1–4 produced. No content files added.

### Modified

None for Phase 5. Step 5.2 (fix minor validation issues — broken Liquid, frontmatter typos, missing reciprocals, MD-* line fixes, smart quotes) discovered zero issues that required corrective edits.

### Removed

None for Phase 5.

## Additional or Deviating Changes (Phase 5)

**Step 5.1 Jekyll build deferred to CI per the documented fallback.** The local `bundle exec jekyll build --baseurl ""` command could not complete on the Windows dev machine because the MSYS2 native-build toolchain is not installed (Ruby 3.2.11 + Bundler 0.0.0.0 are on PATH, but `bundle install` aborts on `eventmachine`, `nokogiri`, and other native-extension gems with `MSYS2 could not be found. Please run 'ridk install'`). Per the details file's documented fallback ("If Ruby/Bundler unavailable, install via `gem install bundler jekyll` first; failing that, fall back to verifying the workflow with `act` or skipping and relying on the GitHub Pages CI deploy as the validation"), this validation defers to `actions/jekyll-build-pages@v1` in `.github/workflows/pages.yml` — the actual production build surface. A substitute Liquid sanity-check ran locally to confirm the four template-bearing files (`index.md`, `fr/index.md`, `_includes/components/sidebar.html`, `_includes/head_custom.html`) hold balanced `{% if %}` / `{% endif %}`-style block tags across every `.md` and `.html` file in the authored tree. No Liquid token count anomalies; sidebar.html holds the expected 14 tokens for the page-loop override.

**No `[x]` checkbox flip applied to existing authored files.** Step 5.2's scope is markdown surface fixes (smart quotes, MD-* lint errors, missing reciprocal links, frontmatter typos). Zero such issues were found across the 35 authored markdown files: markdownlint-cli2 v0.40.0 reports 0 errors; every FR page declares `lang: fr` in its frontmatter; the spot-check on labs 00, 05, and 10 confirms reciprocal language-switcher blockquotes appear in the first 12 lines of both the EN and FR copy with correct relative paths (`../fr/labs/...` from EN, `../../labs/...` from FR). No corrective writes were necessary, so no `### Modified` entry is recorded.

**Pre-first-commit working-tree state confirmed clean.** `git status --porcelain` reports the entire authored tree as `??` (untracked) because no commits have been made to this branch yet — this is the expected pre-bootstrap state, not a Phase 5 anomaly. `git check-ignore -v` confirms all 7 expected ignore paths are matched by `.gitignore` rules at the documented line numbers (`screenshots/.auth/` line 2, `screenshots/raw/` line 3, `screenshots/final/` line 4, `node_modules/` line 7, `_site/` line 10, `.jekyll-cache/` line 11, `Gemfile.lock` line 13). Once the first commit lands, the working tree will collapse to only authored content with zero accidental ignored-content commits.

## Release Summary

**Phase 5 complete — full project ready for release.** All five implementation phases (scaffolding, EN content, screenshot harness, FR mirror, validation) are complete on disk; 71 authored files spanning the Jekyll scaffold, the bilingual content tree, the Playwright harness, the portal-capture scripts, and the planning artifacts.

**Final validation pass — 9 of 9 commands run, 8 pass cleanly, 1 deferred to CI per documented fallback:**

| # | Validation | Result | Evidence |
|---|------------|--------|----------|
| 1 | `npx markdownlint-cli2 "**/*.md" "!.copilot-tracking/**" "!node_modules/**" "!_site/**"` | PASS | `Linting: 35 file(s); Summary: 0 error(s)` (markdownlint v0.40.0) |
| 2 | `npx playwright test --list` | PASS | `Total: 9 tests in 5 files` — `seed-copilotstudio` (1) + `en-public` (2) + `fr-public` (2) + `en-copilotstudio` (2) + `fr-copilotstudio` (2) |
| 3 | EN/FR lab pair manifest via `Get-ChildItem labs/*.md, fr/labs/*.md \| Group-Object Name` | PASS | 14 EN labs + 14 FR labs; zero pair mismatches |
| 4 | Homepage pair `Test-Path index.md, fr/index.md` | PASS | Both exist |
| 5 | Gitignore probe `git check-ignore -v` on 7 expected paths | PASS | All 7 paths matched by `.gitignore` lines 2, 3, 4, 7, 10, 11, 13 |
| 6 | `bundle exec jekyll build --baseurl ""` | DEFERRED to CI | MSYS2 toolchain not installed on local Windows; falls back per details file to `actions/jekyll-build-pages@v1` as production validation surface |
| 7 | Liquid sanity check (substitute for 6) | PASS | All `{% if %}` / `{% for %}` / `{% capture %}` etc. open/close tags balanced across `index.md`, `fr/index.md`, `_includes/`, `labs/`, `fr/labs/` |
| 8 | FR `lang: fr` frontmatter audit | PASS | Every file under `fr/**/*.md` declares `lang: fr` in its frontmatter |
| 9 | Reciprocal language-switcher spot check (labs 00, 05, 10 — EN and FR) | PASS | 6/6 files have correct flag emoji + relative path in first 12 lines (`🇫🇷 ../fr/labs/...` from EN; `🇬🇧 ../../labs/...` from FR) |

**File inventory delivered (71 authored files):**

* Jekyll scaffold (10 files): `_config.yml`, `Gemfile`, `index.md`, `_includes/head_custom.html`, `_includes/components/sidebar.html`, `.github/workflows/pages.yml`, `.gitignore`, `.markdownlint.json`, `assets/branding/README.md`, `images/architecture-diagram.mmd`.
* EN content (14 files): `labs/lab-00-prerequisites.md` through `labs/lab-10-advanced-add-knowledge-source.md` (11 labs) plus `labs/glossary.md`, `labs/references.md`, `labs/troubleshooting.md`.
* FR content (15 files): `fr/index.md` plus `fr/labs/lab-00-prerequisites.md` through `fr/labs/lab-10-advanced-add-knowledge-source.md` (11 labs) plus `fr/labs/glossary.md`, `fr/labs/references.md`, `fr/labs/troubleshooting.md`.
* Screenshot harness (12 files): `package.json`, `package-lock.json`, `playwright.config.ts`, `screenshots/playwright/seed.copilotstudio.ts`, `screenshots/playwright/public.ms-learn.ts`, `screenshots/playwright/public.workshop-site.ts`, `screenshots/playwright/copilotstudio.create-agent.ts`, `screenshots/playwright/copilotstudio.test-pane.ts`, `screenshots/scripts/capture-portal.ps1`, `screenshots/scripts/capture-terminal.ps1`, `screenshots/scripts/capture-web.ps1`, `screenshots/scripts/promote.ps1`.
* Terminal transcripts (3 files): `screenshots/transcripts/lab-01-copilot-version.txt`, `screenshots/transcripts/lab-01-pwsh-version.txt`, `screenshots/transcripts/lab-05-plugin-install.txt`.
* Repo-level docs (4 files): `README.md`, `LICENSE`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`.
* Planning artifacts (under `.copilot-tracking/`, excluded from the workshop output but committed for traceability): research docs, the implementation plan, the phase-detail file, the planning log, and this changes log.

**Dependency surface confirmed:**

* **CI** needs only the GitHub Pages runner (`actions/jekyll-build-pages@v1` + `actions/deploy-pages@v4`) — no local Ruby required to ship.
* **Local preview** needs Ruby 3.x + Bundler + MSYS2 (`ridk install` on Windows) so native gems can compile; optional and not on the critical path.
* **Screenshot harness** needs Node 22+ (`npm install` resolved `@playwright/test@^1.49.0` clean in Phase 3) and `charmbracelet/freeze` v0.2.2 on PATH (Phase 3 confirmed `freeze --version` returns `v0.2.2 (80921ba)`).
* **Portal captures** need a Microsoft 365 demo tenant with Copilot Studio entitlement, used interactively via `npm run screenshots:seed` to populate `screenshots/.auth/copilotstudio.json` — never invoked from CI.

**Deployment path:** push to `main` → `.github/workflows/pages.yml` runs `actions/jekyll-build-pages@v1` (builds the just-the-docs remote-theme site against `baseurl: "/copilot-studio-skill"`) → `actions/deploy-pages@v4` publishes to `https://devopsabcs-engineering.github.io/copilot-studio-skill/`. The English landing page is the site root; the French homepage is at `/fr/`; per-page language switchers walk readers between the two trees via relative links that resolve correctly under both the deployed baseurl and local preview.

**Outstanding manual handoff items (deferred to operators, tracked in the planning log):**

* **WI-06 — Pages source one-time setup.** Repo Settings → Pages → Source must be set to **GitHub Actions** (not "Deploy from branch") before the first `pages.yml` run can publish. This is a one-time UI gesture by a repo admin and cannot be automated from inside the workflow.
* **WI-02 / WI-11 — Live portal capture pass.** The first authenticated capture run (`npm run screenshots:seed` to bootstrap `screenshots/.auth/copilotstudio.json`, then `npm run screenshots:portal`) is required to (a) generate the EN and FR portal PNGs that drop into `images/lab-NN/`, and (b) confirm the DR-02 candidate selectors (documented in `copilotstudio.create-agent.ts` and `copilotstudio.test-pane.ts`) match the live Power Platform DOM. Update selectors in both spec files together if the live UI uses different `data-testid` or `aria-label` patterns.
* **WI-07 — Final branding assets.** `assets/branding/` currently holds a README plus `.gitkeep` markers (Phase 1 fallback). The README documents the expected filenames and dimensions that `_includes/head_custom.html` references; drop in the real binaries (`logo.png`, `favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`) and the head include picks them up automatically — no code change needed.

**Zero blocking issues surfaced during Phase 5.** All Step 5.2 fix categories (broken Liquid tags, frontmatter typos, missing reciprocal links, MD-* line fixes, smart quotes) had nothing to fix. All Step 5.3 escalation categories (theme-version pin needed because of a CI plugin rejection, sidebar override misfire, storage-state expiration) are theoretical — none surfaced during local validation, and the three deferred items above (WI-06, WI-02/WI-11, WI-07) are documented operator tasks, not blockers against the validation gate.

---

## Post-Handoff Changes — Iteration 4 (2026-05-25)

### Modified

* `labs/lab-05-install-skills-plugin.md` — Overview rewritten to describe the install confirmation (`Installed 31 skills`), the four logical roles (renamed from "sub-agents"), and the two distinct surfaces (CLI = `/skills list` + `@copilot-studio` natural language; VS Code chat = four friendly-named agents in the picker). Exercise 5.2 replaced — verifies via `/skills list` and `@copilot-studio` accept instead of the bare-`@` autocomplete pattern that does not exist in the live `copilot` CLI. New optional Exercise 5.3 added covering the VS Code chat agent picker. Verification Checkpoint updated to match. Image references changed from the now-removed `lab-05-subagent-autocomplete.png` to `lab-05-skills-list.png` and `lab-05-vscode-agent-picker.png`.
* `fr/labs/lab-05-install-skills-plugin.md` — Symmetric rewrite of the FR sibling (same five sections — Overview, Learning objectives, Exercise 5.2, new Exercise 5.3, Verification Checkpoint). Image paths mirror EN (shared per DD-03 — both surfaces are CLI + VS Code, not Copilot Studio portal).
* `.copilot-tracking/plans/logs/2026-05-25/bilingual-workshop-site-log.md` — DD-10 entry added under Plan Deviations from Research recording the lab-vs-CLI-reality gap and the applied resolution. WI-13 entry added under Suggested Follow-On Work tracking the two new screenshots that need to be captured against a live install.

## Additional or Deviating Changes (Iteration 4)

**Trigger.** Maker reported during a live workshop dry-run that "we do not see the skills in copilot cli but do see in vs code". Screenshot capture confirmed: (a) `copilot` CLI after install reports `Installed 31 skills. Use /skills list to see them.`; (b) bare-`@` autocomplete shows **file paths** in the workspace, not agent names; (c) VS Code chat agent picker shows four friendly display names — `Copilot Studio Advisor`, `Author`, `Manage`, `Test`. The plugin installs as a single CLI-addressable agent (`@copilot-studio`) carrying 31 skills, plus the four chat-agent picker entries that VS Code surfaces from the same plugin manifest.

**Root cause.** Both research and plan/details treated `@copilot-studio:copilot-studio-*` as the CLI surface pattern. That syntax is not how the live plugin packages itself. The four-role distinction (manage/author/test/advisor) is a logical/documentation grouping that surfaces differently per host (slash-list in CLI, friendly-named picker entries in VS Code).

**Fix scope.** Surgical: only the two `lab-05-install-skills-plugin.md` files (EN + FR) needed text changes. No other lab references the `@copilot-studio:copilot-studio-*` pattern in a verification-instruction context (verified via `grep -rn "@copilot-studio:" labs/ fr/labs/`). Lab cross-references (e.g., Lab 07 "optional advisor validation", Lab 09 "test as alternative path") use the role names without the colon-prefixed sub-agent syntax and stand as-is.

**No image binaries shipped this iteration.** Lab 05 now references `lab-05-skills-list.png` and `lab-05-vscode-agent-picker.png`; both will 404 until WI-13 is closed. The lab text reads cleanly without the images — the verification steps describe expected behavior in prose, and the image is supplementary. This matches the rest of the workshop's current state (Phase 5 ships with `.gitkeep` markers in `images/lab-NN/` directories; WI-02/WI-11 cover the live capture pass).

**Mermaid wiring fix (iteration 3) preserved.** This iteration touched only Lab 05 markdown. The `mermaid: { version: "11.4.1" }` block in `_config.yml` and the simplified `_includes/head_custom.html` (favicons + `.site-title` CSS only, no hand-rolled Mermaid script) from iteration 3 remain in place and will activate native just-the-docs Mermaid rendering on the next Pages deploy.

---

## Post-Handoff Changes — Iteration 5 (2026-05-25)

### Modified

* `labs/lab-05-install-skills-plugin.md` — Rewritten again to demonstrate real Copilot CLI skill and sub-agent usage rather than just verifying installation. Frontmatter `description` updated to "Install the microsoft/skills-for-copilot-studio plugin into GitHub Copilot CLI from the marketplace, verify all 31 skills register, then drive one skill and one sub-agent end-to-end without leaving the terminal." Duration changed from `5 min` to `10 min`. Overview corrected to describe the actual CLI invocation mechanics: skills carry `user-invocable: false` in their plugin metadata and load automatically when the CLI matches the **skill description** against a natural-language prompt; the four sub-agents (`copilot-studio-manage`, `-author`, `-test`, `-advisor`) are reachable via the `/agent` slash-command picker, a `--agent=<slug>` flag on the `copilot` command line, or a natural-language reference inside a prompt. Learning objectives expanded from 2 to 4 items. Exercise 5.2 reworked — keeps `/skills list` verification, adds a quick `/agent` peek (Esc to close), removes the inaccurate "`@copilot-studio` is a valid agent target" claim, and notes that bare `@` in Copilot CLI triggers file-path autocomplete (not agent selection). New Exercise 5.3 added — drive the `list-kinds` skill via the natural-language prompt "List all available kinds in the Copilot Studio YAML schema"; CLI matches the description, asks to approve the bundled `schema-lookup.bundle.js` shell call, and returns categorized YAML `kind` values (Triggers, Actions, Dialogs, Cards, Knowledge Sources, Inputs). New Exercise 5.4 added — pin **Copilot Studio Advisor** via `/agent`, ask "Look up the SendActivity schema definition", and observe the Advisor's bundled `lookup-schema` skill execute and return the SendActivity definition with required/optional properties; tip includes the one-shot CLI form `copilot --agent=copilot-studio-advisor --prompt "..."`. Old VS Code chat picker exercise renumbered from 5.3 to 5.5 (content preserved). Verification Checkpoint expanded from 5 to 7 boxes, adding "did `/agent` show all four Copilot Studio entries", "did `list-kinds` run and return a categorized list", and "did `lookup-schema` run under the pinned Advisor and return the SendActivity definition".
* `fr/labs/lab-05-install-skills-plugin.md` — Symmetric rewrite of the FR sibling with French prose throughout. Same structural changes: frontmatter `description` updated to "Installez le plug-in microsoft/skills-for-copilot-studio dans GitHub Copilot CLI depuis la place de marché, vérifiez que les 31 compétences sont enregistrées, puis pilotez une compétence et un sous-agent de bout en bout sans quitter le terminal." Duration `5 min` → `10 min`. Vue d'ensemble rewritten to describe the actual CLI mechanics (auto-loading via description match for `user-invocable: false` skills; `/agent` picker, `--agent=<slug>` flag, or natural-language reference for sub-agents). Objectifs d'apprentissage expanded to 4 items. Exercice 5.2 mirrors EN (keeps `/skills list`, adds `/agent` peek, drops `@copilot-studio` claim, notes file-path autocomplete behavior of bare `@`). New Exercice 5.3 mirrors EN list-kinds smoke test (FR prose, prompt text translated to "Liste tous les kinds disponibles dans le schéma YAML de Copilot Studio"). New Exercice 5.4 mirrors EN Advisor pinning (FR prose, prompt text translated to "Cherche la définition du schéma SendActivity"). Old VS Code picker step renumbered to Exercice 5.5. Point de vérification expanded to 7 boxes. Image paths use `../../images/lab-05/` (two-segment relative path per FR-tree depth) and reference the four shared image filenames: `lab-05-skills-list.png`, `lab-05-list-kinds.png`, `lab-05-advisor-lookup-schema.png`, `lab-05-vscode-agent-picker.png`.
* `.copilot-tracking/plans/logs/2026-05-25/bilingual-workshop-site-log.md` — DD-10 entry extended with an iteration-5 resolution block that records the finding (Copilot CLI uses description-matching for skills and `/agent` picker for sub-agents, not the Claude-style `@`-autocomplete documented in SETUP_GUIDE.md), and notes the four-sub-agent structure is real (separate `.md` files under `agents/`) just reached via different mechanics per host. WI-13 expanded from 2 to 4 screenshot deliverables: added `lab-05-list-kinds.png` and `lab-05-advisor-lookup-schema.png` to capture the new Exercises 5.3 and 5.4 in action; both exercises run fully offline against the bundled JSON schema so no tenant or cloned agent is required for the capture.

## Additional or Deviating Changes (Iteration 5)

**Trigger.** User directive: "we should be able to use these skills in copilot cli so figure out how that works then enhance the lab to do so". Iteration 4 had correctly removed the inaccurate `@copilot-studio:copilot-studio-*` autocomplete instruction but left the lab as a verification-only exercise — learners never actually USED any of the 31 skills.

**Investigation.** Fetched the live `microsoft/skills-for-copilot-studio` README and SETUP_GUIDE.md, the GitHub Copilot CLI docs at `docs.github.com/en/copilot/concepts/agents/about-copilot-cli`, `.../how-tos/use-copilot-cli`, and `.../about-agent-skills`, and inspected the installed plugin tree at `c:\Users\emknafo\.copilot\installed-plugins\skills-for-copilot-studio\copilot-studio\` (read-only, for slug verification only). Findings: (a) SETUP_GUIDE.md documents `@copilot-studio:copilot-studio-manage clone ...` syntax — that is Claude Code-specific autocomplete and does not exist in Copilot CLI; (b) Copilot CLI skills with `user-invocable: false` in plugin metadata are auto-loaded by description match against the user's natural-language prompt; (c) Copilot CLI sub-agents are exposed via the `/agent` slash-command picker, the `--agent=<slug>` CLI flag, and natural-language reference inside a prompt; (d) the bare `@` prefix in Copilot CLI is for **file** attachment, not agent selection. The four sub-agent slugs (`copilot-studio-manage`, `copilot-studio-author`, `copilot-studio-test`, `copilot-studio-advisor`) are addressable, just not via `@`-autocomplete.

**Chosen demonstrations.** Two no-auth, no-tenant exercises selected because they prove the plugin is working end-to-end without requiring a Copilot Studio environment: (1) `list-kinds` skill (owner: skills-for-copilot-studio plugin root, `user-invocable: false`) — runs `node schema-lookup.bundle.js kinds` and returns a categorized list of YAML `kind` discriminators. Invoked via the natural-language prompt "List all available kinds in the Copilot Studio YAML schema". (2) `lookup-schema` skill (owner: `copilot-studio-advisor` sub-agent, `user-invocable: false`) — runs `node schema-lookup.bundle.js lookup SendActivity` and returns the SendActivity schema definition. Invoked by first pinning the Advisor via `/agent` then asking "Look up the SendActivity schema definition". Both exercises depend only on the JSON schema bundled inside the plugin — no network, no auth, no cloned agent, no Copilot Studio API call. The maker can run both exercises immediately after install.

**Fix scope.** Surgical: only `labs/lab-05-install-skills-plugin.md` and `fr/labs/lab-05-install-skills-plugin.md` needed text changes. No other lab cross-references the iteration-4 framing or needs adjustment (verified by grep against both `labs/` and `fr/labs/`). Lab 06's clone instructions still target the `copilot-studio-manage` sub-agent name (the name is correct; only the invocation mechanic was wrong, and Lab 05 now teaches it correctly).

**Markdownlint validation.** `npx markdownlint-cli2 "labs/lab-05-install-skills-plugin.md" "fr/labs/lab-05-install-skills-plugin.md"` reports `Summary: 0 error(s)` on both files after the rewrite.

**No image binaries shipped this iteration.** Lab 05 now references four screenshots — two from iteration 4 (`lab-05-skills-list.png`, `lab-05-vscode-agent-picker.png`) and two new (`lab-05-list-kinds.png`, `lab-05-advisor-lookup-schema.png`). All four will 404 until WI-13 is closed. The lab text reads cleanly without the images; verification gates depend on observed CLI output, not on the screenshots.

**Writing-style policy.** New prose in the EN rewrite follows `writing-style.instructions.md` (no em dashes; commas / colons / parentheses substitute throughout). Pre-existing prose lifted from iteration 4 was preserved verbatim per the "do not refactor unrelated content" rule. FR prose mirrors the EN structural choices but follows native French punctuation conventions.

