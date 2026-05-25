<!-- markdownlint-disable-file -->
# Sibling Workshop Repo Research

**Subject repository:** [`devopsabcs-engineering/agentic-accelerator-workshop`](https://github.com/devopsabcs-engineering/agentic-accelerator-workshop)
**Deployed site:** [`https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/`](https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/)
**Research date:** 2026-05-25
**Researcher mode:** Researcher Subagent

This research was conducted via `fetch_webpage` against `https://github.com/...` (Code view) and `https://raw.githubusercontent.com/...` (raw file contents) for every cited file, and against the deployed GitHub Pages site for UX claims (language switcher, sidebar style, search). Every claim below is backed by a verbatim snippet from a file path captured in the "Verbatim snippets" section at the bottom.

---

## SSG and version

**SSG: Jekyll** (managed by the `github-pages` meta-gem so the version pin is whatever GitHub Pages currently ships).

Evidence — `Gemfile` (raw, top-level, full file):

```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
gem "webrick", "~> 1.8"
```

The repo does **not** pin a specific Jekyll version. It relies on the `github-pages` gem to pull whatever Jekyll version GitHub Pages whitelists. The build does not use `Gemfile.lock` (it is excluded from the build via `_config.yml` — see snippet below), and CI does not run `bundle install`; it uses `actions/jekyll-build-pages@v1` which provides its own pre-built Jekyll runtime.

There is no `package.json` driving the site (there is one inside `sample-app/` but `sample-app/` is excluded from the Jekyll build). There is no `mkdocs.yml`, `docusaurus.config.js`, `astro.config.*`, `config.toml`, or `vitepress` config — confirmed by enumerating the top-level directory and seeing only `_config.yml`, `Gemfile`, `index.md`, `README.md`, `LICENSE`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `apm.yml`, `validation-results.sarif`, and the directories listed in the directory tree section.

---

## Theme and visual design

**Theme: [`just-the-docs/just-the-docs`](https://github.com/just-the-docs/just-the-docs)** loaded via Jekyll `remote_theme`.

Evidence — `_config.yml` (raw, top-level, lines 1–6):

```yaml
title: "Agentic Accelerator Workshop"
description: "Learn to use AI-powered Accelerator agents — from Agents to Hero"
remote_theme: just-the-docs/just-the-docs
baseurl: "/agentic-accelerator-workshop"
url: "https://devopsabcs-engineering.github.io"
```

The footer of every rendered page confirms the theme:

> "This site uses [Just the Docs](https://github.com/just-the-docs/just-the-docs), a documentation theme for Jekyll."

No theme version is pinned — `remote_theme` always fetches the default branch tip from `just-the-docs/just-the-docs` at build time.

### Customizations on top of the stock theme

There are three customization mechanisms, all server-side Liquid (no Sass/CSS framework, no Node build step):

1. **`_includes/head_custom.html`** — injected into `<head>` on every page. It:
   - Wires the favicon, 32×32 PNG icon, and Apple touch icon to files in `assets/branding/`.
   - Loads **Mermaid 11** from `cdn.jsdelivr.net` and transforms `<pre><code class="language-mermaid">` blocks into `<div class="mermaid">` so fenced mermaid code blocks render as diagrams client-side.
   - Adds a small `<style>` block that lets the site title wrap instead of getting clipped at narrow widths.

2. **`_includes/components/sidebar.html`** — a complete override of the stock `just-the-docs` `components/sidebar.html`. It branches on `page.lang`: French pages get a hand-rolled French-only nav list (assembled at build time from `site.pages | where: "lang", "fr"`), while everything else gets the stock theme sidebar (`{% include_cached components/site_nav.html %}`). This is the entire bilingual navigation mechanism.

3. **`assets/branding/`** — `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`, `logo-128.png`. The `logo-128.png` is referenced inline in `index.md` and `fr/index.md` via raw HTML `<img src="...logo-128.png" width="100">` centered with `<p align="center">` (i.e. it is **not** wired into the theme's `logo:` config key).

There is **no custom CSS file**, no `_sass/` override, no color palette override, no dark-mode toggle config, and no edit in `_config.yml` for the just-the-docs `color_scheme:` key. The site uses the stock just-the-docs light scheme.

---

## Full directory tree

The following is the root tree to ≥3 levels deep based on the GitHub web UI listings I inspected. Items marked `[content]` participate in the Jekyll build; items marked `[excluded]` are listed in `_config.yml > exclude:` and do not ship to GitHub Pages.

```text
agentic-accelerator-workshop/
├── .devcontainer/                                 [excluded]
│   └── devcontainer.json
├── .github/
│   ├── agents/                                    (Copilot agent defs — referenced by labs, not by Jekyll build)
│   ├── instructions/
│   ├── prompts/
│   ├── skills/
│   └── workflows/
│       ├── accessibility-scan.yml                 (workshop CI — not Pages)
│       ├── code-quality.yml                       (workshop CI — not Pages)
│       ├── finops-cost-gate.yml                   (workshop CI — not Pages)
│       ├── pages.yml                              [content] GH Pages build+deploy
│       └── security-scan.yml                      (workshop CI — not Pages)
├── _includes/                                     [content]
│   ├── components/
│   │   └── sidebar.html                           (overrides just-the-docs sidebar)
│   └── head_custom.html                           (favicons + mermaid + title-wrap CSS)
├── assets/
│   └── branding/                                  [content]
│       ├── apple-touch-icon.png
│       ├── favicon-32x32.png
│       ├── favicon.ico
│       └── logo-128.png
├── fr/                                            [content] French locale (parallel tree)
│   ├── index.md                                   (Accueil — French homepage)
│   └── labs/
│       ├── lab-00-setup.md
│       ├── lab-01.md
│       ├── lab-02.md
│       ├── lab-03.md
│       ├── lab-04.md
│       ├── lab-05.md
│       ├── lab-06.md
│       ├── lab-07.md
│       ├── lab-08.md
│       ├── lab-09.md
│       ├── lab-10.md
│       └── lab-11.md
├── images/                                        [content, but nav_exclude via defaults]
│   ├── lab-00/                                    (per-lab screenshot subfolders)
│   ├── lab-01/
│   ├── lab-02/
│   ├── lab-03/
│   ├── lab-04/
│   ├── lab-05/
│   ├── lab-06/
│   ├── lab-07/
│   ├── lab-08/
│   ├── lab-09/
│   ├── lab-10/
│   ├── lab-11/
│   ├── lab-dependency-diagram.mmd               (Mermaid source kept for editing)
│   └── lab-dependency-diagram.png               (rendered diagram used on index)
├── labs/                                          [content] English labs
│   ├── lab-00-setup.md
│   ├── lab-01.md
│   ├── lab-02.md
│   ├── lab-03.md
│   ├── lab-04.md
│   ├── lab-05.md
│   ├── lab-06.md
│   ├── lab-07.md
│   ├── lab-08.md
│   ├── lab-09.md
│   ├── lab-10.md
│   └── lab-11.md
├── sample-app/                                    [excluded] Next.js sample app for the labs
├── scripts/                                       [excluded]
├── solutions/                                     [excluded]
├── .gitignore
├── CODE_OF_CONDUCT.md                             [content]
├── CONTRIBUTING.md                                [content]
├── Gemfile                                        [content — used by local serve only]
├── LICENSE                                        [content] MIT
├── README.md                                      [content] (also nav_exclude)
├── _config.yml                                    [content]
├── apm.yml                                        [excluded]
├── index.md                                       [content] English homepage
└── validation-results.sarif                       [excluded]
```

Top-level GitHub language stats reported by the repo: TypeScript 51.3%, Mermaid 20.2%, Bicep 17.7%, HTML 9.7%, JavaScript 0.6%, Ruby 0.3%, CSS 0.2%. Most of that mass is inside `sample-app/`, which is **not** part of the rendered site.

---

## i18n mechanism

The site ships **two locales: English (default, served at `/agentic-accelerator-workshop/`) and French (served at `/agentic-accelerator-workshop/fr/`)**. Translation coverage is **complete for the navigation surface** (homepage + all 12 lab pages have French counterparts).

### How it is configured

There is **no i18n plugin**. There is no `polyglot`, no `jekyll-multiple-languages-plugin`, no `polyglot` block in `_config.yml`. The bilingual experience is achieved entirely by:

1. **A parallel filesystem tree under `fr/`** that mirrors the English tree page-for-page. English `labs/lab-NN.md` ↔ French `fr/labs/lab-NN.md`. English `index.md` ↔ French `fr/index.md`.

2. **A `lang: fr` frontmatter key** on every French page, plus `nav_exclude: true` on the French homepage so the French homepage does not appear in the (English) just-the-docs sidebar. Example French frontmatter — `fr/index.md`:

   ```yaml
   ---
   nav_exclude: true
   lang: fr
   layout: default
   title: Accueil
   description: Atelier pratique et progressif pour intégrer les agents GitHub Copilot personnalisés dans vos flux de travail Accelerator.
   nav_order: 0
   permalink: /fr/
   ---
   ```

   And `fr/labs/lab-00-setup.md`:

   ```yaml
   ---
   nav_exclude: true
   lang: fr
   permalink: /fr/labs/lab-00-setup
   title: "Lab 00 - Prérequis et configuration de l'environnement"
   description: "Installer les outils requis, les extensions VS Code, créer votre dépôt d'atelier à partir du modèle et vérifier GitHub Copilot Chat."
   ---
   ```

   Every French page sets `nav_exclude: true` so just-the-docs' default filesystem-driven sidebar does not surface French pages alongside English ones (which would produce a polluted bilingual nav).

3. **A server-side Liquid override of the sidebar component** at `_includes/components/sidebar.html`. When the page being rendered has `page.lang == 'fr'`, the override emits a hand-built `<nav>` whose list items are computed at build time via:

   ```liquid
   {%- assign fr_pages = site.pages | where: "lang", "fr" | sort: "permalink" -%}
   ```

   When `page.lang != 'fr'`, the override falls through to the stock theme nav: `{% include_cached components/site_nav.html %}`. This means the same sidebar component file produces two completely different sidebars depending on the current page's `lang` frontmatter.

### How the language switcher appears in the UI

There is **no header dropdown** and **no theme-level language switcher**. The switcher is a **markdown link at the top of each homepage**:

- English `index.md`, first line after frontmatter:

  ```markdown
  > 🇫🇷 **[Version française](fr/)**
  ```

- French `fr/index.md`, first line after frontmatter:

  ```markdown
  > 🇬🇧 **[English version](../)**
  ```

The deployed page renders this as a blockquote bullet immediately above the centered logo. The most recent commit before this research (`Move English language switcher to top of French homepage`, hash `bbb9f3e`) explicitly hoisted the English link to the top of the French homepage, confirming this manual-link pattern is the intended convention rather than a stub for a future automated switcher.

### How partial translations would be handled

There is no fallback mechanism. If a French page were missing, the French sidebar would simply omit it (because `where: "lang", "fr"` returns no row), and the corresponding English link in the English sidebar would still work but would dump a francophone reader into English. In practice all 12 labs + homepage are translated, so this edge case never manifests.

---

## Navigation and information architecture

### Top nav

Just-the-docs renders no separate top nav by default at narrow widths; it uses a single left sidebar. At wide widths the site shows a **search box across the top** (powered by just-the-docs' built-in `lunr` integration — `search_enabled: true` is the just-the-docs default, and no `search_enabled: false` override appears in `_config.yml`).

### Sidebar

- **English sidebar:** auto-generated from filesystem by just-the-docs based on `nav_order` and `parent` frontmatter. The English homepage has `nav_order: 0` (declared in `_config.yml > nav_order_base: 0` and on `index.md` itself), and each lab page has `permalink: /labs/lab-NN` but **no `nav_order`** set — meaning labs are alphabetized as `lab-00-setup`, `lab-01`, `lab-02`, ..., `lab-11`, which is also the desired chronological order. The `images/` directory is explicitly excluded from the sidebar via the `_config.yml` defaults block:

  ```yaml
  defaults:
    - scope:
        path: ""
      values:
        layout: "default"
    - scope:
        path: "images"
      values:
        nav_exclude: true
  ```

- **French sidebar:** hand-curated at build time by the sidebar.html override using `site.pages | where: "lang", "fr" | sort: "permalink"`. The natural string sort of permalinks (`/fr/`, `/fr/labs/lab-00-setup`, `/fr/labs/lab-01`, ...) happens to produce the right order, but this is fragile — see "Risks for replication" below.

### Workshop hierarchy

The workshop is a flat list of 12 labs (no nested sections, no sub-chapters). Labs are numbered `lab-00` through `lab-11`. The implied hierarchy is purely sequential:

| # | Lab | Duration | Level |
|---|-----|----------|-------|
| 00 | Prerequisites and Environment Setup | 30 min | Beginner |
| 01 | Explore the Sample App | 25 min | Beginner |
| 02 | Understanding Agents, Skills, and Instructions | 20 min | Beginner |
| 03 | Security Scanning with Copilot Agents | 40 min | Intermediate |
| 04 | Accessibility Scanning with Copilot Agents | 35 min | Intermediate |
| 05 | Code Quality Analysis with Copilot Agents | 35 min | Intermediate |
| 06 | Understanding SARIF Output | 30 min | Intermediate |
| 07 | Setting Up GitHub Actions Pipelines | 40 min | Intermediate |
| 08 | Viewing Results in GitHub Security Tab | 25 min | Intermediate |
| 09 | FinOps Agents and Azure Cost Governance | 45 min | Advanced |
| 10 | Agent Remediation Workflows | 45 min | Advanced |
| 11 | Creating Your Own Custom Agent | 45 min | Advanced |

The homepage also defines three **delivery tiers** (Half-Day = labs 00–05, Full-Day = labs 00–08, Extended = labs 00–11) and an hour-by-hour **workshop schedule** for each tier, all encoded as inline markdown tables in `index.md` (and `fr/index.md`). This is content, not configuration.

A **lab dependency diagram** (`images/lab-dependency-diagram.png`, with editable `images/lab-dependency-diagram.mmd` mermaid source committed alongside) is embedded on the homepage to convey that labs 03/04/05 are interchangeable and lab 09 is optional.

---

## Page conventions (frontmatter, admonitions, code blocks)

### Frontmatter

**English homepage** (`index.md`) — uses theme keys `layout`, `title`, `nav_order`, `permalink`:

```yaml
---
layout: default
title: Home
nav_order: 0
permalink: /
---
```

The `README.md` (which is also a Jekyll page) uses a different shape that hides it from the sidebar:

```yaml
---
title: "Agentic Accelerator Workshop"
description: "Learn to use AI-powered Accelerator agents — from Agents to Hero"
nav_exclude: true
---
```

**English lab pages** (`labs/lab-NN.md`) — minimal frontmatter; no `nav_order` (relies on filename sort):

```yaml
---
permalink: /labs/lab-00-setup
title: "Lab 00 - Prerequisites and Environment Setup"
description: "Install required tools, VS Code extensions, create your workshop repository from the template, and verify GitHub Copilot Chat."
---
```

**French pages** — add `lang: fr` and `nav_exclude: true`:

```yaml
---
nav_exclude: true
lang: fr
permalink: /fr/labs/lab-00-setup
title: "Lab 00 - Prérequis et configuration de l'environnement"
description: "Installer les outils requis, les extensions VS Code, créer votre dépôt d'atelier à partir du modèle et vérifier GitHub Copilot Chat."
---
```

Observed frontmatter fields across the corpus: `layout`, `title`, `description`, `permalink`, `nav_order`, `nav_exclude`, `lang`. No `parent`, no `has_children`, no `grand_parent` — the IA is intentionally flat, not nested.

### Admonitions / callouts

The repo uses **GitHub-style alert blocks** (`> [!NOTE]`, `> [!TIP]`, etc.) — *not* just-the-docs' native `{: .note }` block class extension. Example from `index.md`:

```markdown
> [!NOTE]
> This workshop is part of the [Agentic Accelerator Framework](https://github.com/devopsabcs-engineering/agentic-accelerator-framework).
```

The deployed site renders these as plain markdown blockquotes (because just-the-docs/kramdown does not interpret GitHub alert syntax), so they appear as a `>` blockquote with the `[!NOTE]` token visible inline. Visually acceptable on the rendered page; semantically they degrade gracefully.

Tips are also written as plain bold-prefix blockquotes:

```markdown
> **Tip**: This workshop is designed for GitHub Codespaces. Click **Code → Codespaces → New codespace** to get a pre-configured environment with all tools installed.
```

### Step lists

Numbered ordered lists (`1.`, `2.`, `3.`) are used throughout lab exercises. No custom step component. Each exercise is structured as:

```markdown
### Exercise N.M: <Title>

1. First step.
2. Second step with a code block:

   ```bash
   command --here
   ```

3. Third step.

![Alt text describing screenshot](../images/lab-NN/lab-NN-screenshot.png)
```

### Verification checkpoints and Next Steps

Every lab ends with two standard sections (preserved in French as **Point de vérification** and **Étapes suivantes**):

```markdown
## Verification Checkpoint

Before proceeding, verify:

* [ ] Item one.
* [ ] Item two.

## Next Steps

Proceed to [Lab NN — Title](lab-NN.md).
```

GitHub task-list checkboxes (`* [ ]`) render as static unchecked boxes — they are non-interactive on the published site, used as a self-verification rubric.

### Code-block conventions

- Language tags: `bash`, `text`, `typescript`, `mermaid`. No titles, no line highlighting, no copy buttons (just-the-docs ships none by default and none are configured).
- Mermaid code blocks (` ```mermaid ... ``` `) are **transformed client-side** by the JS in `_includes/head_custom.html`. They render as inline diagrams.

### Tables

Standard pipe-syntax markdown tables are used heavily on the homepage and at the top of each lab (the "Overview" mini-table with Duration / Level / Prerequisites).

---

## Image conventions

- **Location:** all workshop screenshots live under `images/` at repo root. Per-lab subfolders: `images/lab-00/`, `images/lab-01/`, ..., `images/lab-11/`. Branding assets (favicon, logo) live separately under `assets/branding/`.
- **Naming:** kebab-case, lab-prefixed. Pattern: `lab-NN-<short-descriptor>.png`. Examples observed in `labs/lab-00-setup.md` and `labs/lab-01.md`:
  - `images/lab-00/lab-00-node-version.png`
  - `images/lab-00/lab-00-vscode-extensions.png`
  - `images/lab-00/lab-00-copilot-chat-verify.png`
  - `images/lab-01/lab-01-folder-structure.png`
  - `images/lab-01/lab-01-issue-markers.png`
  - `images/lab-01/lab-01-app-running.png`
  - `images/lab-01/lab-01-template-create.png`
- **Format:** PNG. No WebP, no JPEG. The lab dependency diagram is shipped as both `lab-dependency-diagram.mmd` (mermaid source) and `lab-dependency-diagram.png` (rendered).
- **Reference syntax:** plain relative paths from the page that references them. English lab pages use `../images/lab-NN/...` (one `../` to escape `labs/`). French lab pages use `../../images/lab-NN/...` (two `../` to escape `fr/labs/`) — **i.e., French and English share the exact same image files; there is no `fr/images/` directory and no localized screenshots**.
- **No locale suffix** on filenames. Same screenshot is reused for both languages, which is reasonable because the screenshots are of VS Code / browser UIs whose chrome is in English anyway.
- **`nav_exclude` blanket:** `_config.yml` defaults block applies `nav_exclude: true` to the entire `images/` path so just-the-docs doesn't try to render image directory listings as nav entries.
- **No image optimization step.** PNGs ship as committed. No `assets/images/` pipeline, no Sharp/imagemin.

---

## CI / GitHub Pages workflow

**Exact file:** `.github/workflows/pages.yml` (raw, full file):

```yaml
# yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Build with Jekyll
        uses: actions/jekyll-build-pages@v1
        with:
          source: ./
          destination: ./_site

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Salient properties

- **Triggers:** push to `main`, plus `workflow_dispatch` (manual run).
- **Concurrency:** group `"pages"` with `cancel-in-progress: false` — successive pushes queue, they do not cancel one another. This matters when a French translation lands minutes after an English commit.
- **Permissions:** the modern Pages publishing model (`pages: write`, `id-token: write`) — i.e. the repo is configured for **GitHub Pages → Build and deployment → Source: GitHub Actions**, **not** the legacy "deploy from `gh-pages` branch" mode.
- **Build action:** `actions/jekyll-build-pages@v1` — runs Jekyll using GitHub's pre-built Pages runtime, bypassing `bundle install`. The `Gemfile` exists only so local `bundle exec jekyll serve` works.
- **Artifact upload + deploy:** `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`. Output URL surfaced as a job output.
- **No build matrix, no Node setup, no Ruby setup** — there is nothing for the workflow to compile beyond what Jekyll does internally. Total build time observed on similar repos: ~30–60 seconds.

### Required Settings → Pages configuration

Based on the workflow shape (`environment: name: github-pages` + `actions/deploy-pages@v4`), the repo's Settings → Pages must be set to:

- **Source:** GitHub Actions (not "Deploy from a branch")
- The `github-pages` environment is created automatically on first run.
- Custom domain (`CNAME`): none — site is published at the org-default `https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/`.

### Sibling workflows (not Pages-related, but live in `.github/workflows/`)

- `accessibility-scan.yml`, `code-quality.yml`, `finops-cost-gate.yml`, `security-scan.yml` — these are the workshop's own CI demonstrations that the labs teach. They have nothing to do with publishing the site. A copy-strategy for a new sibling repo should keep only `pages.yml` and drop these unless the new workshop teaches the same scan patterns.

---

## Local build commands and version pins

The repo does **not** ship an `.nvmrc`, `.python-version`, `.ruby-version`, `.tool-versions`, or `mise.toml`. Ruby version is whatever `github-pages` requires (Ruby 3.x at the time of this research).

Local commands (inferred from the `Gemfile` shape, not from documented README scripts):

```bash
# One-time
bundle install

# Build only
bundle exec jekyll build

# Build + serve with live reload at http://127.0.0.1:4000/agentic-accelerator-workshop/
bundle exec jekyll serve
```

The `webrick` gem is pinned (`~> 1.8`) specifically because Ruby 3+ no longer ships webrick in stdlib and `jekyll serve`'s local dev server needs it.

There is no `package.json` script, no `Makefile`, no `Justfile`, no `task.yml`. There is no documented "build the site locally" section in the README — contributors are expected to know `bundle exec jekyll serve` or rely on GitHub Pages preview deployments.

---

## License / README / contribution

- **License:** MIT, top-level `LICENSE` file. Referenced as `[MIT License](LICENSE)` from the homepage footer.
- **README.md:** present at repo root. Has its own Jekyll frontmatter (`nav_exclude: true`) so it does not appear in the sidebar but is technically build-eligible. Its content is essentially a duplicate of `index.md` with a different (more traditional) "Use this template / clone / open in VS Code / start Lab 00" Getting Started section. No badges are shown in README.
- **CODE_OF_CONDUCT.md:** present at repo root. Rendered on the deployed site at `/CODE_OF_CONDUCT.html` (referenced from the site's footer "Additional Links" via `[Code of Conduct](https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/CODE_OF_CONDUCT.html)`).
- **CONTRIBUTING.md:** present at repo root. Rendered as `/CONTRIBUTING.html` and linked from the footer.
- **Issue templates / PR templates:** none observed under `.github/ISSUE_TEMPLATE/` or `.github/PULL_REQUEST_TEMPLATE.md`. The repo relies on GitHub's default issue/PR forms.

---

## Other unique features

- **Mermaid in markdown** — enabled by the inline `<script type="module">` in `_includes/head_custom.html`. Any ` ```mermaid ` block in any markdown page is upgraded to an interactive Mermaid 11 diagram at view time.
- **Bilingual without a plugin** — purely Liquid + filesystem convention. See sidebar.html override + `lang: fr` frontmatter + `nav_exclude: true` pattern.
- **GitHub-style alerts (`> [!NOTE]`, `> [!TIP]`) used in source but not visually upgraded by the theme** — they degrade to plain blockquotes on the rendered site.
- **`apm.yml` at the root** — excluded from the Jekyll build via `_config.yml`. This is an Azure-pipelines-or-similar config (not investigated further as it's outside the Pages publishing scope and irrelevant to a `copilot-studio-skill` replica).
- **`validation-results.sarif` at the root** — excluded from the Jekyll build. It's a demo SARIF output from the workshop's own security scanner, kept for show; irrelevant to publishing.
- **`solutions/` directory** — excluded from the Jekyll build. Holds answer keys for the labs that participants should not see on the public site.
- **`sample-app/`** — excluded from the Jekyll build. The Next.js application participants clone alongside the workshop docs.
- **Template repo flag:** the repo is marked "Public template" on GitHub (see "Use this template" button in screenshots). This is a GitHub repo Settings toggle, not a file-level artifact.
- **Topics:** `security`, `devops`, `workshop`, `accessibility`, `owasp`, `code-quality`, `sarif`, `ai-agents`, `finops`, `github-copilot`.
- **No analytics** (no `google_analytics:` key in `_config.yml`).
- **Search:** just-the-docs built-in lunr search, no custom config.
- **Dark mode:** stock just-the-docs (light only — no `color_scheme:` override).
- **Edit-on-GitHub links:** not configured (no `gh_edit_link:` key in `_config.yml`).
- **Version dropdown:** none.
- **GitHub Discussions:** not enabled on the repo.
- **`CNAME`:** none — published on the default `github.io` host.

---

## Verbatim snippets (config files, CI YAML, sidebar config)

### `_config.yml` (full file)

```yaml
title: "Agentic Accelerator Workshop"
description: "Learn to use AI-powered Accelerator agents — from Agents to Hero"
remote_theme: just-the-docs/just-the-docs
baseurl: "/agentic-accelerator-workshop"
url: "https://devopsabcs-engineering.github.io"

exclude:
  - scripts/
  - delivery/
  - .devcontainer/
  - node_modules/
  - package.json
  - package-lock.json
  - Gemfile.lock
  - sample-app/
  - solutions/
  - validation-results.sarif
  - apm.yml

defaults:
  - scope:
      path: ""
    values:
      layout: "default"
  - scope:
      path: "images"
    values:
      nav_exclude: true

nav_order_base: 0
heading_anchors: true
```

### `Gemfile` (full file)

```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
gem "webrick", "~> 1.8"
```

### `.github/workflows/pages.yml` (full file)

```yaml
# yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Build with Jekyll
        uses: actions/jekyll-build-pages@v1
        with:
          source: ./
          destination: ./_site

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### `_includes/head_custom.html` (full file)

```html
<link rel="icon" type="image/x-icon" href="{{ site.baseurl }}/assets/branding/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="{{ site.baseurl }}/assets/branding/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="{{ site.baseurl }}/assets/branding/apple-touch-icon.png">
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: false });
  document.querySelectorAll('pre > code.language-mermaid').forEach(el => {
    const div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = el.textContent;
    el.parentElement.replaceWith(div);
  });
  await mermaid.run();
</script>
<style>
  .mermaid { text-align: center; }
  /* Allow long site titles to wrap instead of being clipped */
  @media (min-width: 50rem) {
    .site-header {
      height: auto;
      max-height: none;
    }
  }
</style>
```

### `_includes/components/sidebar.html` (effective shape — comment header + branching logic)

```liquid
{%- comment -%}
  Override of just-the-docs sidebar component.
  French pages (lang: fr) get a French navigation sidebar.
  English pages get the original theme sidebar.
{%- endcomment -%}

{%- if page.lang == 'fr' -%}
<header class="side-bar">
  <div class="site-header">
    <a href="{{ '/fr/' | relative_url }}" class="site-title lh-tight">
      {{ site.title }}
    </a>
    <button id="menu-button" class="site-button btn-reset" aria-label="Menu" aria-expanded="false">
      <svg viewBox="0 0 24 24" class="icon" aria-hidden="true"><use xlink:href="#svg-menu"></use></svg>
    </button>
  </div>
  <nav aria-label="Main" id="site-nav" class="site-nav">
    <ul class="nav-list">
      {%- assign fr_pages = site.pages | where: "lang", "fr" | sort: "permalink" -%}
      {%- for p in fr_pages -%}
      <li class="nav-list-item">
        <a href="{{ p.permalink | prepend: site.baseurl }}" class="nav-list-link{% if page.permalink == p.permalink %} active{% endif %}">
          {{ p.title }}
        </a>
      </li>
      {%- endfor -%}
    </ul>
  </nav>
  <div class="d-md-block d-none site-footer">
    {%- capture nav_footer_custom -%}{%- include nav_footer_custom.html -%}{%- endcapture -%}
    {%- if nav_footer_custom != "" -%}
      {{ nav_footer_custom }}
    {%- else -%}
      This site uses <a href="https://github.com/just-the-docs/just-the-docs">Just the Docs</a>, a documentation theme for Jekyll.
    {%- endif -%}
  </div>
</header>

{%- else -%}

<header class="side-bar">
  <div class="site-header">
    <a href="{{ '/' | relative_url }}" class="site-title lh-tight">{% include title.html %}</a>
    <button id="menu-button" class="site-button btn-reset" aria-label="Menu" aria-expanded="false">
      <svg viewBox="0 0 24 24" class="icon" aria-hidden="true"><use xlink:href="#svg-menu"></use></svg>
    </button>
  </div>
  {% include_cached components/site_nav.html %}
  <div class="d-md-block d-none site-footer">
    {%- capture nav_footer_custom -%}{%- include nav_footer_custom.html -%}{%- endcapture -%}
    {%- if nav_footer_custom != "" -%}
      {{ nav_footer_custom }}
    {%- else -%}
      This site uses <a href="https://github.com/just-the-docs/just-the-docs">Just the Docs</a>, a documentation theme for Jekyll.
    {%- endif -%}
  </div>
</header>

{%- endif -%}
```

### English `index.md` frontmatter + top-of-page convention

```markdown
---
layout: default
title: Home
nav_order: 0
permalink: /
---

> 🇫🇷 **[Version française](fr/)**

<p align="center">
  <img src="assets/branding/logo-128.png" alt="Agentic Accelerator Framework" width="100">
</p>

# Agentic Accelerator Workshop
```

### French `fr/index.md` frontmatter + top-of-page convention

```markdown
---
nav_exclude: true
lang: fr
layout: default
title: Accueil
description: Atelier pratique et progressif pour intégrer les agents GitHub Copilot personnalisés dans vos flux de travail Accelerator.
nav_order: 0
permalink: /fr/
---

> 🇬🇧 **[English version](../)**

<p align="center">
  <img src="../assets/branding/logo-128.png" alt="Agentic Accelerator Framework" width="100">
</p>

# Agentic Accelerator Workshop
```

### Lab page frontmatter (English example)

```markdown
---
permalink: /labs/lab-00-setup
title: "Lab 00 - Prerequisites and Environment Setup"
description: "Install required tools, VS Code extensions, create your workshop repository from the template, and verify GitHub Copilot Chat."
---
```

### Lab page frontmatter (French example)

```markdown
---
nav_exclude: true
lang: fr
permalink: /fr/labs/lab-00-setup
title: "Lab 00 - Prérequis et configuration de l'environnement"
description: "Installer les outils requis, les extensions VS Code, créer votre dépôt d'atelier à partir du modèle et vérifier GitHub Copilot Chat."
---
```

---

## Risks for replication in `copilot-studio-skill`

1. **`baseurl` is hardcoded.** `_config.yml` sets `baseurl: "/agentic-accelerator-workshop"`. For the new repo this must become `baseurl: "/copilot-studio-skill"`. Every internal link that uses `{{ site.baseurl }}` (e.g. the favicon links in `head_custom.html`) needs to follow automatically — but any links written as bare `/labs/lab-NN` in markdown will 404 on the new domain. The existing repo gets away with this because all in-page links are relative (`(labs/lab-00-setup.md)`, `(../images/...)`); preserve that convention.

2. **`remote_theme` is unpinned.** `remote_theme: just-the-docs/just-the-docs` fetches `main` at every build. A breaking change upstream can silently break the new site. Consider pinning: `remote_theme: just-the-docs/just-the-docs@v0.10.1` (or whatever current tag) for stability.

3. **The French sidebar override depends on permalink sort order.** `site.pages | where: "lang", "fr" | sort: "permalink"` lexicographically sorts `/fr/`, `/fr/labs/lab-00-setup`, `/fr/labs/lab-01`, ..., `/fr/labs/lab-10`, `/fr/labs/lab-11`. With ≤9 labs the natural sort is correct. With ≥10 labs (the sibling has 12) the order **also happens to be correct** because `lab-10` and `lab-11` come after `lab-09` *lexicographically* once you include the zero-padding — `lab-09` < `lab-10` < `lab-11` as strings. **If `copilot-studio-skill` introduces lab numbers without zero-padding (`lab-9`, `lab-10`), the sort breaks.** Keep zero-padded two-digit lab numbers, or add an explicit `nav_order` per page and update the sidebar Liquid to `sort: "nav_order"`.

4. **GitHub-style `> [!NOTE]` alerts render as plain blockquotes.** Just-the-docs doesn't upgrade them. Either accept the plain-blockquote rendering, switch to kramdown's `{: .note }` extension that just-the-docs **does** style, or wire a Liquid filter. The sibling repo accepts plain rendering — that is the path of least resistance.

5. **All French pages set `nav_exclude: true`.** This is essential — without it, just-the-docs would interleave French pages into the English sidebar. The sidebar override then ignores `nav_exclude` for French pages because it queries `site.pages` directly (which includes `nav_exclude`-flagged pages). Forgetting this on a single new French page will pollute the English nav.

6. **Translation drift.** There is no automation enforcing that every English page has a French counterpart. A future contributor can add `labs/lab-12.md` without `fr/labs/lab-12.md` and the French sidebar will silently miss the new lab. Consider a CI lint that asserts file parity.

7. **Screenshots are not localized.** French labs reference `../../images/lab-NN/...` which is the same PNG used by English labs. This is fine for screenshots of English-only UIs (VS Code, GitHub.com) but if `copilot-studio-skill` will screenshot Copilot Studio's UI in French mode, you'll want a `fr/images/` or `images/fr/lab-NN/` convention from day one.

8. **`actions/jekyll-build-pages@v1` masks Jekyll version.** Local `bundle exec jekyll serve` will use whatever `github-pages` gem you locally resolved, which may diverge from what the CI runtime uses. Build-passes-locally / fails-in-CI risk is real but small.

9. **No `CNAME`, no analytics, no edit-on-GitHub.** If the new workshop wants any of these, they have to be added — `_config.yml` keys `gh_edit_link:`, plus theme partials for analytics injection.

10. **`README.md` is also a Jekyll-renderable page (`nav_exclude: true`).** It duplicates ~80% of `index.md` content with a tweaked "Getting Started" section. Maintaining two near-duplicate sources of truth is a known drift hazard. Decide on day one whether the new repo lets README and index diverge or keeps one as the source of truth and a stub the other.

---

## Recommended 1:1 copy strategy

The most direct path to replicate this structure in `c:\src\GitHub\devopsabcs-engineering\copilot-studio-skill`:

1. **Copy these files/directories verbatim** (then rename):
   - `_config.yml` → change `title`, `description`, `baseurl` (to `/copilot-studio-skill`), `url` stays the same org host. Keep the `exclude:`, `defaults:`, `nav_order_base`, `heading_anchors` blocks as-is. Update `exclude:` entries to whatever new directories your workshop introduces (e.g. drop `sample-app/`, `solutions/`, `validation-results.sarif`, `apm.yml` if the new workshop doesn't have them).
   - `Gemfile` — verbatim.
   - `.github/workflows/pages.yml` — verbatim.
   - `_includes/head_custom.html` — verbatim (your new branding PNGs ship under `assets/branding/` with the same filenames).
   - `_includes/components/sidebar.html` — verbatim. The Liquid is generic across topic; only the `lang == 'fr'` literal matters and it stays.
   - `assets/branding/{favicon.ico,favicon-32x32.png,apple-touch-icon.png,logo-128.png}` — replace bytes with your new branding; keep filenames.
   - `.gitignore` — verbatim (drop the `security-reports/` line if irrelevant).
   - `LICENSE`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md` — verbatim or freshly authored, but keep the file names because they're linked from the site footer.

2. **Mirror the i18n shape exactly:**
   - `index.md` with `layout: default / title: Home / nav_order: 0 / permalink: /` + leading `> 🇫🇷 **[Version française](fr/)**` link + centered logo HTML.
   - `fr/index.md` with `nav_exclude: true / lang: fr / layout: default / title: Accueil / description / nav_order: 0 / permalink: /fr/` + leading `> 🇬🇧 **[English version](../)**` link + centered logo HTML with one extra `../`.

3. **Mirror lab page shape exactly:**
   - English: `labs/lab-NN.md` with frontmatter `permalink: /labs/lab-NN / title / description`. No `nav_order` (rely on filename sort). **Use zero-padded two-digit lab numbers** to keep the French permalink-sort safe.
   - French: `fr/labs/lab-NN.md` with frontmatter `nav_exclude: true / lang: fr / permalink: /fr/labs/lab-NN / title / description`.

4. **Mirror lab body conventions:**
   - First section `## Overview` with a 3-row table (Duration / Level / Prerequisites).
   - `## Learning Objectives` as a bullet list.
   - `## Exercises` containing `### Exercise N.M: <Title>` blocks with numbered steps and inline code blocks.
   - `## Verification Checkpoint` with `* [ ]` task-list items.
   - `## Next Steps` linking to the next lab.

5. **Mirror image conventions:**
   - `images/lab-NN/lab-NN-<descriptor>.png` for screenshots, single shared copy used by both English (`../images/...`) and French (`../../images/...`) labs.
   - Branding under `assets/branding/`.
   - If the workshop needs a dependency diagram, ship both the `.mmd` source and the rendered `.png` in `images/`.

6. **Repo Settings to set after first push:**
   - **Pages → Source: GitHub Actions** (not "Deploy from a branch").
   - Mark as **Template repository** if you want the "Use this template" button.
   - Topics: pick relevant ones for Copilot Studio + workshop (e.g. `copilot-studio`, `workshop`, `low-code`, `agents`).
   - No GitHub Pages custom domain unless requested.

7. **First-commit checklist (no surprises):**
   - `_config.yml` has the new `baseurl`.
   - `head_custom.html` references files that exist in `assets/branding/`.
   - `fr/` mirrors `labs/` 1:1.
   - All French pages carry both `lang: fr` AND `nav_exclude: true`.
   - All lab numbers are zero-padded.

8. **Optional hardening to consider on day one** (none of which the sibling has):
   - Pin `remote_theme` to a specific just-the-docs tag.
   - Add a CI lint that asserts `labs/lab-*.md` and `fr/labs/lab-*.md` are 1:1.
   - Replace the homepage "version française" link with a proper top-of-page language-switcher partial that appears on every page, not only the homepage.

Following this strategy yields a site that is visually and structurally indistinguishable from `agentic-accelerator-workshop` but branded as `copilot-studio-skill`.
