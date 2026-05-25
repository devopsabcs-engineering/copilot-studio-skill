---
title: "Copilot Studio Skill Workshop"
description: "Bilingual (EN/FR) hands-on workshop that builds, pushes, and publishes a Copilot Studio agent from VS Code using GitHub Copilot CLI."
nav_exclude: true
---

## Live site

* English: [https://devopsabcs-engineering.github.io/copilot-studio-skill/](https://devopsabcs-engineering.github.io/copilot-studio-skill/)
* Français: [https://devopsabcs-engineering.github.io/copilot-studio-skill/fr/](https://devopsabcs-engineering.github.io/copilot-studio-skill/fr/)

## What this is

Ten short labs that walk through installing the GitHub Copilot CLI, wiring the Copilot Studio MCP server, cloning an agent locally, authoring and editing a topic, then pushing and publishing the agent — all from a VS Code terminal. Every page ships in English and French side-by-side.

## Repo layout

The repository root **is** the Jekyll site. Source files render directly to the published site under [https://devopsabcs-engineering.github.io/copilot-studio-skill/](https://devopsabcs-engineering.github.io/copilot-studio-skill/).

| Path                              | Purpose                                                         |
|-----------------------------------|-----------------------------------------------------------------|
| `_config.yml`                     | Jekyll + `just-the-docs` site configuration                     |
| `_includes/components/sidebar.html` | Liquid override that branches French nav on `page.lang == 'fr'` |
| `_includes/head_custom.html`      | Favicon, Mermaid CDN, and title-wrap CSS                        |
| `index.md`, `labs/`               | English homepage and lab pages                                  |
| `fr/index.md`, `fr/labs/`         | French parallel tree                                            |
| `assets/branding/`                | Favicon, touch icon, and workshop logo (WI-07 placeholder)      |
| `images/lab-NN/`                  | Committed lab screenshots                                       |
| `screenshots/`                    | Playwright + freeze capture harness (sources gitignored)        |
| `.github/workflows/pages.yml`     | GitHub Pages build and deploy                                   |

## Quickstart

Preview the site locally before pushing changes:

```powershell
gem install bundler
bundle install
bundle exec jekyll serve --baseurl ""
```

Open [http://localhost:4000/](http://localhost:4000/) for the English root and [http://localhost:4000/fr/](http://localhost:4000/fr/) for the French root. The `--baseurl ""` override is required locally because `_config.yml` hard-codes `/copilot-studio-skill` for production.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for translation policy (every EN change needs the FR counterpart in the same PR), the screenshot harness workflow, and the one-time repo settings needed before the first Pages deploy.
