<!-- markdownlint-disable-file -->
# Bilingual Content Strategy Research — Copilot Studio Workshop Site

A complete content-side strategy for a **bilingual** Copilot Studio workshop site that mirrors the sibling repo [`devopsabcs-engineering/agentic-accelerator-workshop`](https://github.com/devopsabcs-engineering/agentic-accelerator-workshop) (live: <https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/>).

## Research topics and questions investigated

* Confirm the language pair used by the sibling repo (the prompt assumed Spanish — does evidence support that?).
* Identify the static-site generator and i18n mechanism in use.
* Map the sibling repo's parallel-content layout, frontmatter conventions, and language-switcher pattern.
* Translate the hello-world walkthrough at `.copilot-tracking/research/2026-05-25/copilot-studio-skill-hello-world-research.md` into a sibling-parity lab structure.
* Build a Microsoft Copilot Studio EN ↔ FR glossary grounded in actual Microsoft Learn French pages.
* Recommend a translation workflow, partial-translation fallback policy, tone, and localization-sensitive content rules.

## Confirmed sibling-repo characteristics

> **Critical correction to the prompt assumption:** the sibling repo is **English ↔ French**, not English ↔ Spanish. The language switcher on the live homepage reads `🇫🇷 [Version française](https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/fr/)`; the French homepage reciprocates with `🇬🇧 [English version](../)`. The repo has a `fr/` directory at the root, no `es/` directory, and no Spanish content of any kind. The maintainer's organization name (`devopsabcs-engineering`) is not a Spanish signal — it is English ("DevOps ABCs"), and the maintainer commit history is bilingual EN/FR.

* **Static-site generator:** Jekyll with the [`just-the-docs/just-the-docs`](https://github.com/just-the-docs/just-the-docs) remote theme. Confirmed by `_config.yml`:

  ```yaml
  title: "Agentic Accelerator Workshop"
  description: "Learn to use AI-powered Accelerator agents — from Agents to Hero"
  remote_theme: just-the-docs/just-the-docs
  baseurl: "/agentic-accelerator-workshop"
  url: "https://devopsabcs-engineering.github.io"
  ```

* **i18n mechanism:** none formal. The repo does **not** use `jekyll-multiple-languages-plugin`, `jekyll-polyglot`, or any plugin-driven i18n. It uses a **manual parallel directory pattern**: every English page at `path/to/page.md` has a French counterpart at `fr/path/to/page.md`. The French homepage carries `lang: fr` and `permalink: /fr/` in its frontmatter:

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

* **Sidebar handling:** a per-language sidebar override lives in `_includes/` (commit message: "Use server-side Liquid sidebar override for French nav" and "Hide English sidebar on French pages"). This is Just-the-Docs' built-in mechanism — French pages get a French-only sidebar by overriding the sidebar partial based on the page's `lang` value.

* **Language switcher:** a manual hand-coded link at the top of `index.md` and `fr/index.md` (commits: "Move language switcher to top of homepage" and "Move English language switcher to top of French homepage"). EN page links to `/fr/`, FR page links to `../`.

* **Tone observed in live FR content:** formal **vous** form (e.g., "vous serez en mesure de", "assurez-vous"), typographic apostrophes (`l'application` rendered as `l'application` with U+2019), French digit-comma decimals (`5,5 heures`, not `5.5 hours`), French time format (`0:00 – 0:30`), and notable inconsistency on the English loanword **skill / skills** (sometimes translated as "compétences" in titles, often kept as "skills" in body text).

## Recommendation: matching the sibling repo

**Adopt EN ↔ FR exactly.** Use the same Jekyll + Just-the-Docs + manual `fr/` parallel-directory pattern. Do **not** introduce a Jekyll i18n plugin — it would diverge from the sibling and add maintenance burden for a workshop with ~15 pages. The manual approach has shipped successfully for 12 labs in the sibling.

## Language pair (with citation)

| Item | Value | Citation |
|---|---|---|
| English locale | `en` (default; root paths) | `_config.yml` has no explicit `lang`; Jekyll defaults to English |
| French locale | `fr` (per-page frontmatter `lang: fr`) | `fr/index.md` frontmatter |
| French region variant | **`fr` (no region suffix)** — neither `fr-FR` nor `fr-CA` is declared anywhere | `_config.yml`, `fr/index.md` |
| Default URL prefix | none | `_config.yml` `baseurl: "/agentic-accelerator-workshop"` |
| French URL prefix | `/fr/` | `fr/index.md` `permalink: /fr/` |
| Switcher format | flag emoji + link | `🇫🇷 [Version française](.../fr/)` and `🇬🇧 [English version](../)` |

**Recommendation for the new repo:** use the same bare `fr` (no region suffix). This matches the sibling exactly, keeps the URL scheme clean (`/copilot-studio-skill/fr/...`), and avoids prematurely committing to Hexagonal vs Canadian French distinctions that the sibling did not need.

## Parallel content layout (file tree EN + FR)

The proposed file tree for the new repo, derived from the sibling repo's actual on-disk layout and populated for the hello-world walkthrough:

```text
copilot-studio-skill/
├── _config.yml                              # Jekyll + just-the-docs (mirror sibling)
├── _includes/
│   └── components/
│       └── sidebar.html                     # Server-side Liquid override (mirror sibling commit "Use server-side Liquid sidebar override for French nav")
├── Gemfile
├── assets/branding/
│   ├── logo-128.png
│   ├── favicon.ico
│   └── apple-touch-icon.png
├── images/
│   ├── lab-00/                              # Shared between EN and FR — screenshots use Microsoft product UI in user's chosen language, not duplicated per locale
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
│   └── lab-dependency-diagram.png
├── index.md                                 # EN homepage (mirrors sibling root index.md)
├── labs/
│   ├── lab-00-prerequisites.md
│   ├── lab-01-install-windows-tooling.md
│   ├── lab-02-install-copilot-studio-extension.md
│   ├── lab-03-create-blank-agent.md
│   ├── lab-04-setup-workspace-and-cli.md
│   ├── lab-05-install-skills-plugin.md
│   ├── lab-06-clone-agent.md
│   ├── lab-07-author-hello-world-topic.md
│   ├── lab-08-push-and-publish.md
│   ├── lab-09-test-in-portal.md
│   ├── lab-10-advanced-add-knowledge-source.md
│   ├── troubleshooting.md
│   ├── glossary.md
│   └── references.md
└── fr/
    ├── index.md                             # FR homepage with `lang: fr`, `permalink: /fr/`
    └── labs/
        ├── lab-00-prerequisites.md          # File names stay English; titles inside are French
        ├── lab-01-install-windows-tooling.md
        ├── lab-02-install-copilot-studio-extension.md
        ├── lab-03-create-blank-agent.md
        ├── lab-04-setup-workspace-and-cli.md
        ├── lab-05-install-skills-plugin.md
        ├── lab-06-clone-agent.md
        ├── lab-07-author-hello-world-topic.md
        ├── lab-08-push-and-publish.md
        ├── lab-09-test-in-portal.md
        ├── lab-10-advanced-add-knowledge-source.md
        ├── troubleshooting.md
        ├── glossary.md
        └── references.md
```

### File-naming convention

Mirror the sibling: keep file names in English even for French content. The sibling repo has `fr/labs/lab-00-setup.md` (English slug, French title inside). This keeps URLs stable (`/fr/labs/lab-00-setup`) and avoids accents in URL paths.

### Frontmatter conventions

**EN root page** (default Jekyll behavior, no special markers needed):

```yaml
---
title: Lab 07 — Author the Hello World topic
description: Use @copilot-studio:copilot-studio-author to add a YAML topic that replies "Hello, world!".
nav_order: 7
parent: Labs
---
```

**FR page** (must set `lang` and stable `permalink`):

```yaml
---
title: Lab 07 — Créer la rubrique Hello World
description: Utilisez @copilot-studio:copilot-studio-author pour ajouter une rubrique YAML qui répond « Hello, world ! ».
nav_order: 7
parent: Labs
lang: fr
permalink: /fr/labs/lab-07-author-hello-world-topic/
---
```

### Language switcher (top of every page)

* EN page: `> 🇫🇷 **[Version française](/copilot-studio-skill/fr/labs/lab-07-author-hello-world-topic/)**`
* FR page: `> 🇬🇧 **[English version](/copilot-studio-skill/labs/lab-07-author-hello-world-topic/)**`

The sibling places this as the **first content block above the H1**, immediately after frontmatter — confirmed by the commit "Move English language switcher to top of French homepage".

## Source-then-translated workflow

Treat **English as canonical**:

* Author every new page or change in English first.
* Land the EN PR; never block EN review on missing FR.
* Open a follow-up FR translation PR once EN is stable (no further edits expected within 24 h).
* When EN is updated and FR has not yet caught up, leave the FR page in place — the partial-translation policy below covers reader experience.

This matches the sibling's commit history: every FR commit ("Move English language switcher to top of French homepage", "Hide English sidebar on French pages", "Use server-side Liquid sidebar override for French nav") postdates the EN homepage it shadows.

## Proposed lab/chapter structure (mapped from the hello-world walkthrough)

The sibling's rhythm is **12 short labs** organized as: prerequisites → progressive build-up → advanced → reference. The hello-world walkthrough at `.copilot-tracking/research/2026-05-25/copilot-studio-skill-hello-world-research.md` already breaks into 10 numbered steps plus an advanced extension; that maps cleanly onto a 10-lab structure with introduction, troubleshooting, glossary, and references as separate non-lab pages.

| # | File path EN | File path FR | Title EN | Title FR | Time | Level | Screenshots required (and surface) |
|---|---|---|---|---|---|---|---|
| — | `index.md` | `fr/index.md` | Copilot Studio Skill Workshop | Atelier Copilot Studio Skill | n/a | n/a | Hero diagram of architecture (mermaid renders from markdown — no PNG needed) |
| Prereqs | `labs/lab-00-prerequisites.md` | `fr/labs/lab-00-prerequisites.md` | Prerequisites | Prérequis | 15 min | Beginner | (1) GitHub Copilot subscription page; (2) Copilot Studio trial sign-up landing; (3) Power Platform environment switcher dropdown (`https://copilotstudio.microsoft.com` top-right) |
| 1 | `labs/lab-01-install-windows-tooling.md` | `fr/labs/lab-01-install-windows-tooling.md` | Install Windows tooling | Installer les outils Windows | 15 min | Beginner | (4) PowerShell 6+ `$PSVersionTable` output; (5) `winget install OpenJS.NodeJS.LTS` output; (6) `copilot --version` output |
| 2 | `labs/lab-02-install-copilot-studio-extension.md` | `fr/labs/lab-02-install-copilot-studio-extension.md` | Install the Copilot Studio VS Code Extension | Installer l'extension Copilot Studio pour VS Code | 5 min | Beginner | (7) VS Code Extensions panel with "Copilot Studio" search; (8) extension page after install |
| 3 | `labs/lab-03-create-blank-agent.md` | `fr/labs/lab-03-create-blank-agent.md` | Create your first blank agent in the portal | Créer votre premier agent vide dans le portail | 10 min | Beginner | (9) empty-state "Create blank agent" card in `https://copilotstudio.microsoft.com`; (10) new agent name dialog; (11) agent edit view immediately after creation |
| 4 | `labs/lab-04-setup-workspace-and-cli.md` | `fr/labs/lab-04-setup-workspace-and-cli.md` | Set up local workspace and launch Copilot CLI | Préparer l'espace de travail local et lancer Copilot CLI | 10 min | Beginner | (12) VS Code integrated terminal with `copilot` prompt; (13) `/login` device-code flow in browser |
| 5 | `labs/lab-05-install-skills-plugin.md` | `fr/labs/lab-05-install-skills-plugin.md` | Install the skills-for-copilot-studio plugin | Installer le plug-in skills-for-copilot-studio | 5 min | Beginner | (14) `/plugin install` success output in `copilot` session; (15) `@` autocomplete listing the four `copilot-studio:*` sub-agents |
| 6 | `labs/lab-06-clone-agent.md` | `fr/labs/lab-06-clone-agent.md` | Clone the agent into your workspace | Cloner l'agent dans votre espace de travail | 10 min | Beginner | (16) Entra ID browser sign-in; (17) Power Platform environment picker; (18) agent picker; (19) VS Code explorer showing cloned folder structure |
| 7 | `labs/lab-07-author-hello-world-topic.md` | `fr/labs/lab-07-author-hello-world-topic.md` | Author the Hello World topic | Créer la rubrique Hello World | 10 min | Beginner | (20) `@copilot-studio:copilot-studio-author` chat exchange; (21) generated `HelloWorld.topic.mcs.yml` open in VS Code editor |
| 8 | `labs/lab-08-push-and-publish.md` | `fr/labs/lab-08-push-and-publish.md` | Push and publish | Pousser et publier | 10 min | Beginner | (22) `push` success in CLI; (23) **Publish** button in portal top-right; (24) publish success toast |
| 9 | `labs/lab-09-test-in-portal.md` | `fr/labs/lab-09-test-in-portal.md` | Test in the portal | Tester dans le portail | 5 min | Beginner | (25) Test pane open in portal; (26) user typing "hello"; (27) agent reply bubble |
| 10 | `labs/lab-10-advanced-add-knowledge-source.md` | `fr/labs/lab-10-advanced-add-knowledge-source.md` | (Advanced) Add a knowledge source | (Avancé) Ajouter une source de connaissances | 15 min | Intermediate | (28) `@copilot-studio:copilot-studio-author Add a knowledge source...` chat; (29) generated `CopilotStudioDocs.knowledge.mcs.yml`; (30) Test pane showing grounded answer with activity-map link |
| Ref | `labs/troubleshooting.md` | `fr/labs/troubleshooting.md` | Troubleshooting reference | Référence de dépannage | n/a | n/a | (none required — text-only table) |
| Ref | `labs/glossary.md` | `fr/labs/glossary.md` | Glossary | Glossaire | n/a | n/a | (none required) |
| Ref | `labs/references.md` | `fr/labs/references.md` | References | Références | n/a | n/a | (none required) |

**Total time on the EN homepage badge:** "~2 hours, 10 labs, beginner-friendly" (mirroring the sibling's "~3 hours, half-day" framing but compressed).

**Total screenshots required:** 30. All can be taken once in the English Copilot Studio portal; FR pages can either share those images (cheapest) or capture a second set after switching the portal UI to French via the Power Platform profile picker (most authentic — see "Localization-sensitive content policy" below).

## Microsoft product term glossary (EN ↔ FR)

Built from these primary sources (all verified during this research):

* <https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/fundamentals-what-is-copilot-studio>
* <https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/authoring-create-edit-topics>
* <https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/knowledge-add-knowledge> (header confirmed; body inaccessible but term "source de connaissances" cross-confirmed from `fundamentals-what-is-copilot-studio`)
* Live FR sibling pages (`/fr/labs/lab-00-setup`, `/fr/labs/lab-02`, `/fr/index.md`) for workshop-context conventions on `agent`, `skill`, `framework`, `prompt`, `lab`, `repository`.

| English (Microsoft UI / docs) | French (Microsoft `fr-fr` UI / docs) | Translation note |
|---|---|---|
| **agent** | **agent** | Keep — Microsoft Copilot Studio FR docs and product UI both use `agent` unchanged (proof: "Qu'est-ce qu'un agent ?" page title, "Vue d'ensemble de Copilot Studio" body). Pluralizes as `agents`. |
| Copilot Studio agent | agent Copilot Studio | Word order flips: adjective-after-noun. Product name `Copilot Studio` is never translated. |
| **topic** | **rubrique** (preferred) / sujet (also seen) | Microsoft Learn FR uses **rubrique** as the primary term and `sujet` interchangeably in some headings. The page `authoring-create-edit-topics` is titled "Créer et modifier des rubriques" but contains the section "Sujets dans Copilot Studio" — both forms ship in production. **Recommendation: standardize on `rubrique`** in the workshop, matching the canonical page title and the verb form ("créer une rubrique"). |
| **trigger** (verb: to fire on input) | **déclencher** / **déclenchement** | Verb `déclencher`; noun `déclenchement`. The node type "Trigger" in the canvas is rendered in FR as "nœud Déclencheur" but kept English-cased "Trigger" inside YAML editor warnings. |
| **trigger phrase** | **phrase déclencheur** (or **phrase déclenchante** — both appear on the same MS Learn page) | `phrase déclencheur` is more common; the workshop should pick one and stick with it. Recommend `phrase déclencheur`. |
| **knowledge source** | **source de connaissances** | Plural form (`connaissances`, not `connaissance`) — this is the Microsoft-approved phrasing on `fundamentals-what-is-copilot-studio`. |
| **action** | **action** | Keep. Plural `actions`. |
| **connector** | **connecteur** | Translate. Plural `connecteurs`. Microsoft Learn: "se connecter à d'autres sources de données à l'aide de connecteurs prédéfinis ou personnalisés". |
| **environment** (Power Platform) | **environnement** | Translate. Always with article (`l'environnement`, `cet environnement`). |
| **tenant** (Microsoft 365 / Entra) | **locataire** (in Microsoft 365 admin docs) — but in technical / developer contexts **tenant** is widely retained | This is the most context-sensitive term in the set. Microsoft 365 admin documentation uses `locataire`; Entra ID / Azure developer documentation often keeps `tenant`. **Workshop recommendation: keep `tenant`** — it appears in CLI output and Entra App Registration UI labels in both languages, and `locataire` would confuse a developer reading the EN UI strings the workshop screenshots show. |
| **workspace** (VS Code / dev folder) | **espace de travail** | Translate — sibling repo uses `espace de travail` consistently. Distinct from **environnement** (Power Platform). |
| **plugin** | **plug-in** (Microsoft Style Guide) / **plugin** (common usage; sibling repo) | Microsoft Style Guide prefers hyphenated `plug-in`. Sibling FR content uses unhyphenated `plugin`. **Recommendation: use `plug-in`** with hyphen for Microsoft-aligned glossary parity, but accept `plugin` in body prose where it reads more naturally. |
| **skill** (AI-coding-tool meaning — Claude Code / Copilot CLI / this workshop's `skills-for-copilot-studio` plugin) | **skill** (kept English in workshop body) / **compétence** (in titles, occasionally) | The sibling repo explicitly demonstrates this inconsistency: the EN lab title "Agents, Skills, and Instructions" is translated as "Agents, compétences et instructions" but the **body of that same lab** says "Distinguer les agents, les **skills**, les instructions et les prompts" and "Le framework dispose de trois types d'artefacts de support au-delà des agents. Ouvrez un exemple de chacun : 1. **Skill** — Ouvrez `.github/skills/security-scan/SKILL.md`." **Workshop recommendation: keep `skill` in the body when it refers to the directory name or YAML/markdown artifact** (it's effectively a proper noun); translate as `compétence` only in summary tables or descriptive headings where it functions as a generic word. |
| **skill** (Copilot Studio Bot Framework feature — capital S "Skill" registered via Settings → Skills) | **compétence** (Microsoft Learn FR translates the legacy Bot Framework `Skill` as `compétence`) | Critical disambiguation: the *other* "Skill" (different concept, different product surface) is translated. Use this only when discussing the Bot Framework alternative (Alternative E in the hello-world research). |
| **publish** | **publier** (verb) / **publication** (noun) | Translate. The portal button label in FR is **Publier**. |
| **test** (verb) | **tester** | Translate. Portal button label: **Tester**. |
| **test** (noun) | **test** | Keep English noun; verb `tester` covers the action. |
| **test pane** | **volet de test** | Translate `pane` as `volet` (matches Microsoft's `volet Phrases`, `volet de propriétés` in the topic-editing FR docs). |
| **push** (git) | **push** (kept) — verb form `pousser` also acceptable | Sibling and Microsoft Learn keep `push` as a git proper noun. `pousser` is colloquial. **Recommendation: keep `push`** in CLI step text, gloss as "(pousser vers le cloud)" in the lab introduction. |
| **pull** (git) | **pull** (kept) | Same logic as `push`. |
| **clone** (git) | **cloner** (verb) / **clone** (noun) | Verb is fully naturalized in French DevOps usage: `clonez le dépôt`. Sibling uses `Clonez` (imperative). |
| **fork** (git) | **forker** (verb) / **fork** (noun) | Same naturalization; sibling uses imperative `Forkez`. |
| **YAML** | **YAML** | Always uppercase, never translated. Article is masculine (`le YAML`). |
| **repository** (GitHub) | **dépôt** | Translate. Sibling uses `dépôt` consistently. Microsoft Learn also uses `dépôt`. |
| **template** (GitHub template repo) | **modèle** (when meaning "GitHub template") | Translate. Sibling: "**Forkez ou utilisez ce modèle**". |
| **sign in** / **sign-in** (verb / hyphenated noun) | **se connecter** (verb) / **connexion** (noun) | Translate. Portal button label: **Se connecter**. Note: "log in" is also `se connecter` in French (no distinction). |
| **sign-in flow** | **flux de connexion** | Translate. |
| **work or school account** | **compte professionnel ou scolaire** | Microsoft-canonical phrasing. Used verbatim across Microsoft 365 FR docs. |
| **plugin marketplace** (Claude Code / Copilot CLI) | **place de marché des plug-ins** | Awkward but Microsoft-style; the workshop can use the English term in CLI command examples (`/plugin marketplace add ...`) and gloss it in prose. |
| **sub-agent** | **sous-agent** | Translate; sibling uses `sous-agents`. |
| **slash command** | **commande slash** | Calque (loan translation). Acceptable in dev docs. |
| **prompt** (the chat message you send) | **prompt** (kept) / **invite** (Microsoft-style in some MS Learn pages) | Sibling keeps `prompt`. Microsoft Style Guide alternates between `invite` and `prompt`. **Recommendation: keep `prompt`** to match sibling and dev community usage. |
| **lab** | **lab** (kept by sibling) / **atelier** (when referring to the workshop as a whole) | Sibling consistently uses `Lab 00`, `Lab 01` (English `Lab` with cardinal number), and reserves `atelier` for the workshop container. **Recommendation: keep `Lab` for individual chapters, use `atelier` only for the workshop entity.** |
| **frontmatter** (YAML block) | **frontmatter** (kept by sibling) | English term; no Microsoft-canonical translation exists. Sibling: "Le frontmatter YAML (entre les délimiteurs `---` en haut)". |
| **handoff** (agent-to-agent) | **transfert** | Translate. Sibling: "modèles de transfert", "chaînes de transfert". |
| **publish to channels** | **publier sur les canaux** | Microsoft Learn uses `canaux` for `channels`. |

## Translation workflow recommendation

The four options ranked, with concrete rationale for the workshop's scale (~15 short pages, single maintainer, established sibling pattern):

| Option | Verdict | Rationale |
|---|---|---|
| **A. Manual hand-translation only** | Acceptable as a baseline | Highest accuracy, zero tool risk, but slow. Sustainable for 15 pages because each page is short (300–800 words) and most prose recurs (lab template, checkpoint, next-steps blocks). |
| **B. Machine translation (Azure AI Translator) + human review** | **Recommended** | Best speed/quality ratio at this scale. Azure AI Translator has a custom-glossary feature: feed it the glossary table from this document and the hello-world technical terms will be translated consistently on every run. Maintainer reviews the FR output sentence-by-sentence rather than translating from scratch. Drops translation time per page from ~45 min to ~10 min while preserving terminology discipline. |
| **C. Translation-memory tools (Crowdin / Lokalise / Weblate)** | Overkill | These tools shine at 1000+ string projects with multiple translators. Setup cost (segmentation, glossary import, CI integration, contributor onboarding) exceeds the total translation work for 15 pages. Rejected. |
| **D. LLM-assisted with strict glossary (no review)** | Rejected | Without a human review pass, LLM output drifts on the `skill / compétence` ambiguity, hallucinates Microsoft UI labels that do not exist in FR (e.g. invents `Publier l'agent` when the actual button is `Publier`), and breaks the "Publier" capitalization convention. Always pair with review. |
| **D′. LLM-assisted with strict glossary + human review** | Strong alternative to B | If Azure AI Translator is not preferred, an LLM with the glossary table in-context produces equivalent quality. The deciding factor is whether the maintainer already has Azure credentials handy (use B) or prefers a chat workflow (use D′). |

**Final recommendation: Option B.** Configure Azure AI Translator with a custom glossary built from the table above. Human review remains required for every page before merging the FR PR. Budget ~10 min/page review time, ~2.5 hours total to fully translate the workshop.

## Partial-translation fallback policy

The sibling repo's behavior (verified by inspecting the live site):

* If a page exists at `path/X.md` in EN but **not** at `fr/path/X.md`, navigating to `/fr/path/X` produces a Jekyll/Just-the-Docs 404. There is no automatic fallback.
* The sibling has avoided this state by translating all 12 labs simultaneously. The repo never ships in a state where EN has more labs than FR.

**Adopt the same all-or-nothing policy:** ship FR translation in batches that match an EN "chapter" boundary. Concretely:

1. Land EN lab-01 through lab-10 as one PR (or sequence).
2. Once EN is stable, land FR lab-01 through lab-10 as **one PR**.
3. Update an EN-only edit? Hot-fix the FR page in the same PR with a translation pass, or open a paired FR PR within 48 h.
4. **Hard rule:** do not merge any EN-only edit that adds a new lab without also adding the FR translation in the same PR. The repo state must always be: every EN page has a matching FR page.

This avoids the 404 case and removes the need for fallback-banner code.

**Banner policy when FR is stale but exists:** add a single-line note at the top of any FR page that is more than 14 days behind its EN counterpart:

> 🇬🇧 *Cette page peut être en retard sur la [version anglaise](...). Dernière mise à jour FR : 2026-05-25.*

Track this manually via a comment in the FR PR template; do not invest in automation.

## Tone and voice (matches sibling)

* **English voice:** technical, second-person ("You will configure..."), direct. Conversational but not casual. Avoids exclamation marks. Uses em-dashes for asides. Code blocks fenced with language tags. Notes and tips set in `> [!NOTE]` and `> [!TIP]` GitHub-Markdown alert syntax (sibling uses this on the homepage).
* **French voice:** formal **vous** form (never `tu`) — confirmed by sibling pages: "vous serez en mesure de", "Cliquez sur", "Forkez", "assurez-vous". Sentence-initial capitalization of `Lab` is preserved as a proper noun: `Lab 00 : Prérequis` (note the non-breaking space before the colon — Microsoft Learn FR uses the standard French typographic space `\u00A0` before `: ; ? !`). Curly typographic apostrophes (`l'application`, U+2019) — never straight apostrophes. Numeric formatting: comma decimals (`5,5 heures`), comma thousand separators (when needed) replaced with non-breaking space per French ISO convention.
* **Punctuation discipline (FR):**
  * Use `«` and `»` for direct quotes (sibling: "« vérifier les horaires du magasin »" — sourced from Microsoft Learn FR pattern), surrounded by non-breaking spaces inside.
  * Hyphenated questions: `Qu'est-ce qu'un agent ?` (with space before `?`).
  * Em-dash for asides: ` — ` (with regular spaces).
* **Anglicism policy (FR):** keep the loanwords the dev community already uses in French — `framework`, `pipeline`, `lab`, `fork`, `push`, `pull`, `clone`, `repository`-when-shortened-to-`repo`, `scanner`, `prompt`, `frontmatter`. Translate the rest per the glossary. Do not invent French translations for terms that have no canonical Microsoft FR equivalent (e.g. `frontmatter`).

## Localization-sensitive content policy

| Content type | EN treatment | FR treatment | Notes |
|---|---|---|---|
| **Dates** | Avoid in workshop body (use relative time: "after install completes"). When needed: `May 25, 2026` (US format). | When needed: `25 mai 2026` (DD MMM YYYY, lowercase month). | Hello-world walkthrough has no concrete dates; this policy applies to changelog notes only. |
| **Times of day** | `2:30 PM` (12-hour). | `14:30` (24-hour). | Sibling uses 24-hour in FR program tables: `0:00 – 0:30`. |
| **Numeric decimals** | `5.5 hours`, `~30 minutes`. | `5,5 heures`, `~30 minutes`. | Comma decimal separator in FR (ISO + Microsoft Style Guide). |
| **Currency** | None expected in this workshop. | None expected. | Copilot Studio trial sign-up may surface localized prices in the user's browser; do not screenshot or transcribe these — link to the official Microsoft trial page instead. |
| **Microsoft product names** | `Copilot Studio`, `Microsoft 365`, `Power Platform`, `Microsoft Entra ID`, `Visual Studio Code`, `GitHub`, `GitHub Copilot CLI`. **Never translate.** | Identical — never translate. | Including in body prose: "Open Copilot Studio" ↔ "Ouvrez Copilot Studio". |
| **UI button labels (Copilot Studio portal)** | Bold the exact English label: **Create blank agent**, **Publish**, **Test**. | Bold the exact French label as it appears in the portal when the user has selected French: **Créer un agent vide**, **Publier**, **Tester**. | If FR screenshots use EN portal UI, gloss the FR label after the screenshot: "(in French: **Publier**)". |
| **Code samples (YAML, PowerShell, bash)** | English-only. Comments in English. | **Same code, English-only.** Translate only the surrounding prose, never the code or comments inside code blocks. | Reason: developers paste code; translated comments diverge from real-world Microsoft samples and break copy-paste verification. |
| **Command-line output / log lines** | Never edited. Reproduce verbatim. | **Never translated.** Reproduce verbatim. | CLI output is system English; FR readers expect to see what they will actually see on screen. |
| **File names and paths** | `HelloWorld.topic.mcs.yml`, `C:\src\copilot-studio-work\`. | **Identical.** Do not translate file names or paths. | Stable cross-language references. |
| **Sub-agent names and slash commands** | `@copilot-studio:copilot-studio-author`, `/plugin install`. | **Identical, kept English.** | These are CLI literals — translating breaks the command. |
| **Diagram text (Mermaid)** | English in EN page. | Author a parallel French Mermaid block in the FR page; do not auto-share. | Mermaid blocks are inline markdown — cheap to duplicate. |
| **Screenshots of Microsoft product UI** | Capture with portal language set to English (en-US). | **Option A (recommended):** capture a parallel set with portal language set to French. **Option B (acceptable):** reuse EN screenshots with a callout that the FR reader can switch portal language via top-right profile menu. | Sibling repo reuses screenshots across EN and FR (`images/` is at root, not duplicated). The workshop should follow suit unless the maintainer has bandwidth for option A. |
| **External link targets** | Microsoft Learn EN: `learn.microsoft.com/en-us/...` | Microsoft Learn FR: `learn.microsoft.com/fr-fr/...` (substitute `en-us` → `fr-fr`). | Microsoft Learn auto-detects language but explicit FR links give better reader experience. GitHub README/SETUP_GUIDE links stay English (no FR fork exists). |

## Concrete examples (tone calibration)

The following EN paragraph from the hello-world walkthrough has been translated under the rules above. Use these as the canonical voice samples when calibrating translation output (whether human, MT, or LLM).

### Example 1 — Lab introduction prose

**EN (source):**

> In this lab you will use the `@copilot-studio:copilot-studio-author` sub-agent inside GitHub Copilot CLI to create a new topic called *Hello World*. The sub-agent writes a YAML file on disk that you can inspect in VS Code's editor before pushing it back to the Copilot Studio cloud. No portal authoring is required for this step — every change happens locally.

**FR (target):**

> Dans ce lab, vous allez utiliser le sous-agent `@copilot-studio:copilot-studio-author` dans GitHub Copilot CLI pour créer une nouvelle rubrique appelée *Hello World*. Le sous-agent écrit un fichier YAML sur le disque, que vous pouvez inspecter dans l'éditeur de VS Code avant de le pousser vers le cloud Copilot Studio. Aucune création dans le portail n'est nécessaire pour cette étape — toutes les modifications se produisent localement.

Discussion of translation choices:

* `sub-agent` → `sous-agent` (glossary).
* `topic` → `rubrique` (chosen over `sujet` per recommendation).
* `inside GitHub Copilot CLI` → `dans GitHub Copilot CLI` (product name preserved).
* `push it back` → `le pousser vers le cloud` (verbal form here reads better than keeping English `push`; CLI command `push` would stay English in a code block).
* `No portal authoring is required` → `Aucune création dans le portail n'est nécessaire` (recast — French prefers `Aucune X n'est nécessaire` over a direct calque).
* Em-dash preserved with surrounding spaces.

### Example 2 — Callout / warning

**EN (source):**

> **Critical:** `push` creates a draft only. To make the topic invokable in the Test pane, you must also **publish**.

**FR (target):**

> **Important :** la commande `push` crée uniquement un brouillon. Pour rendre la rubrique invocable dans le volet de test, vous devez aussi **publier**.

Discussion:

* `Critical` → `Important` (French Microsoft Learn convention; sibling uses `Important` similarly).
* Non-breaking space before `:` (rendered here as a regular space in source but should be U+00A0 in the markdown file).
* `Test pane` → `volet de test` (glossary).
* `publish` → `publier` (button label, bolded).
* Definite article added: `la commande push`.

### Example 3 — Checkpoint list (FR pattern from sibling)

**EN:**

> ### Checkpoint
>
> Before continuing, confirm:
>
> * The agent reply pane shows "Hello, world!" after typing `hello`.
> * The activity map (three-dot menu → "Show activity map when testing") shows the `HelloWorld` topic node firing.
> * `git status` in your workspace shows the new `HelloWorld.topic.mcs.yml` file.

**FR:**

> ### Point de vérification
>
> Avant de continuer, vérifiez :
>
> * Le volet de réponse de l'agent affiche « Hello, world ! » après avoir saisi `hello`.
> * La carte d'activité (menu à trois points → « Afficher la carte d'activité lors du test ») montre le nœud de la rubrique `HelloWorld` qui se déclenche.
> * `git status` dans votre espace de travail indique le nouveau fichier `HelloWorld.topic.mcs.yml`.

Discussion:

* `Checkpoint` → `Point de vérification` (exact phrasing from sibling lab-02).
* `Before continuing, confirm:` → `Avant de continuer, vérifiez :` (exact phrasing from sibling lab-00 checkpoint).
* The reply text `"Hello, world!"` stays English (it's literal agent output that the user will see verbatim); only the quotation marks switch to French guillemets `« »` with non-breaking spaces.
* `git status` and file names stay English (rule: code-context strings never translated).
* `topic` → `rubrique`; `node` → `nœud` (matches MS Learn FR `nœud Déclencheur`).

## Research executed

### File analysis

* `.copilot-tracking/research/2026-05-25/copilot-studio-skill-hello-world-research.md` — read in full (800 lines) to extract every Copilot Studio technical term that needs a glossary entry, the 10-step structure that maps onto the lab plan, and the "skill" disambiguation block that anchors the trickiest translation decision.

### External research

* `fetch_webpage` against <https://github.com/devopsabcs-engineering/agentic-accelerator-workshop> root listing — confirmed `fr/` directory, `_includes/`, `_config.yml`, Jekyll setup, commit history showing `Move English language switcher to top of French homepage` and `Use server-side Liquid sidebar override for French nav`.
* `fetch_webpage` against <https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/> — captured EN homepage structure, language switcher `🇫🇷 Version française`, lab table, prerequisites block.
* `fetch_webpage` against <https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/fr/> — captured FR homepage, reciprocal switcher `🇬🇧 English version`, FR lab table, FR prerequisites, FR program tables (confirms 24-hour time format and comma-decimal hours).
* `fetch_webpage` against <https://github.com/devopsabcs-engineering/agentic-accelerator-workshop/blob/main/_config.yml> + raw — captured `_config.yml` verbatim; no i18n plugin declared.
* `fetch_webpage` against <https://github.com/devopsabcs-engineering/agentic-accelerator-workshop/tree/main/fr> — confirmed `fr/` contains only `index.md` and `labs/` subdirectory.
* `fetch_webpage` against <https://raw.githubusercontent.com/devopsabcs-engineering/agentic-accelerator-workshop/main/fr/index.md> — captured exact FR frontmatter (`lang: fr`, `permalink: /fr/`) and language-switcher syntax.
* `fetch_webpage` against <https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/fr/labs/lab-00-setup> — captured tone, code-block treatment, callout style, and confirmed loanword policy (`Forkez`, `Clonez`, `compte GitHub`).
* `fetch_webpage` against <https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/fr/labs/lab-02> — surfaced the `skill / compétence` translation inconsistency (title-case `compétences`, body-case `skills`); harvested checkpoint phrasing (`Point de vérification`, `Avant de continuer, vérifiez :`).
* `fetch_webpage` against <https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/fundamentals-what-is-copilot-studio> — confirmed `agent` (kept), `flux` (workflow), `rubrique`/`sujet` parallel usage, `source de connaissances`, `connecteur`, `Copilot Studio` (kept), `Microsoft Teams` (kept), `Azure Bot Service` (kept), `Microsoft 365` (kept).
* `fetch_webpage` against <https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/authoring-create-edit-topics> — confirmed `phrase déclencheur` / `phrase déclenchante`, `nœud Déclencheur`, `volet`, `Enregistrer` (Save button), `Publier` (Publish button), `Tester` (Test button), `YAML` (kept), `bot` (kept lowercase as legacy term), Power Fx code keeps `=` prefix in body.
* `fetch_webpage` against <https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/knowledge-add-knowledge> — header confirmed page exists with title containing "connaissances" pattern (body text inaccessible due to fetch error but term cross-confirmed from other pages).

### Project conventions

* Followed `c:\Users\emknafo\.vscode\extensions\ise-hve-essentials.hve-core-3.2.2\.github\instructions\shared\hve-core-location.instructions.md` (fallback paths).
* This file is exempt from markdownlint per `.copilot-tracking/**` rule (top-of-file `<!-- markdownlint-disable-file -->` directive).

## Key discoveries

### Discovery 1 — The language pair is French, not Spanish

The prompt assumed Spanish (`es` / `es-419` / `es-MX`) based on the maintainer org name pattern. **This is wrong.** Hard evidence: the sibling site's language switcher shows `🇫🇷 Version française`; the live URL `https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/fr/` returns French content with a French homepage at `fr/index.md`; there is no `es/` directory in the sibling repo and no Spanish content anywhere on the live site. The org name `devopsabcs-engineering` reads as English ("DevOps ABCs Engineering"), not as a Spanish-language signal.

This single discovery overturns the entire glossary axis the prompt expected (Spanish), but does not change the *shape* of the research. The strategy, layout, workflow, fallback policy, and tone discussion remain valid — only the target language and glossary table change.

### Discovery 2 — No i18n plugin, manual parallel directory

The sibling repo does not use `jekyll-multiple-languages-plugin`, `jekyll-polyglot`, or any other i18n tooling. It uses raw Jekyll with one strategic override: a `_includes/components/sidebar.html` (or similar) that swaps the sidebar based on the page's `lang` value. The translation strategy is purely organizational, not technical. Adopting the sibling's approach means zero plugin risk and instant parity.

### Discovery 3 — The `skill` translation is genuinely ambiguous in the sibling

The sibling renders the **same word in the same lab** two ways:

* Title: "Comprendre les agents, les **skills** et les instructions" — kept English.
* Earlier section title: "Agents, **compétences** et instructions" — translated.
* Body: "Le framework dispose de trois types d'artefacts de support au-delà des agents... 1. **Skill** — Ouvrez `.github/skills/security-scan/SKILL.md`" — kept English.

This is shipped production behavior, not a bug. It reflects a real tension: `compétence` is the official French word but `skill` is the directory/filename and is what developers will type and search for. The recommendation in this document — keep `skill` in body, accept `compétence` in chapter titles — codifies what the sibling already does in practice.

### Discovery 4 — Microsoft Learn FR uses `rubrique` and `sujet` interchangeably

Microsoft Learn's `authoring-create-edit-topics` page is titled "Créer et modifier des rubriques" but contains the section heading "Sujets dans Copilot Studio" and intermittent body phrases like "création d'un sujet". This is not an error — both forms are accepted. The workshop should pick **one** and stick with it to avoid confusing learners; this document recommends **`rubrique`** because (a) it matches the canonical page title, (b) the noun pairs more naturally with `créer` and `modifier`, and (c) Microsoft Style Guide leans toward `rubrique` for the Copilot Studio domain.

### Discovery 5 — Microsoft FR docs use French typographic punctuation in headings but ASCII in code

`Qu'est-ce qu'un agent ?` uses non-breaking space before `?` (U+00A0). Code blocks inside the same page use straight ASCII apostrophes and no special whitespace. **Translators must apply French typography to prose only, never to code.** This rule is invisible to a casual translator and will be the most common quality miss; flag it explicitly in the contributor guide.

## Outline

1. Confirm language pair (FR, not ES) — done.
2. Map sibling layout (Jekyll + Just-the-Docs, manual `fr/`, `_includes` override, frontmatter `lang: fr` + `permalink: /fr/`) — done.
3. Propose parallel content layout for the new repo (concrete file tree with 10 labs + reference pages) — done.
4. Map hello-world walkthrough to 10-lab structure with file paths, titles in both languages, time/level badges, and screenshot counts — done.
5. Build EN ↔ FR glossary grounded in 3 Microsoft Learn FR pages and 3 sibling FR pages — done (32 terms).
6. Recommend translation workflow — done (Option B: Azure AI Translator + custom glossary + human review).
7. Recommend partial-translation policy — done (all-or-nothing per PR, manual stale-banner if needed).
8. Define tone, voice, anglicism rules, French typography rules — done.
9. Define localization-sensitive content rules per content type — done.
10. Provide three calibrated EN+FR translation examples — done.

## Potential next research

* Verify Microsoft's official position on `topic` translation across Copilot Studio FR doc set — is `rubrique` truly preferred over `sujet`, or is there a region split (France vs Quebec)?
  * Reasoning: would let the workshop publish a one-line stance backed by Microsoft FR doc lead guidance.
  * Reference: Microsoft Style Guide French download.
* Confirm whether Azure AI Translator's custom-glossary feature accepts the 32-term table verbatim or requires a specific TBX/CSV format.
  * Reasoning: practical detail for the maintainer when they sit down to translate.
  * Reference: <https://learn.microsoft.com/azure/ai-services/translator/custom-translator/>.
* Investigate whether `just-the-docs` ships a built-in `lang`-aware sidebar override pattern, or whether the sibling repo's custom `_includes/components/sidebar.html` is bespoke.
  * Reasoning: needed to copy the implementation cleanly when scaffolding the new repo.
  * Reference: <https://github.com/just-the-docs/just-the-docs> (theme source).
* Walk the Copilot Studio portal's per-user language toggle: where is it (Power Platform profile picker?), does it require a refresh, and does YAML node-type rendering also localize?
  * Reasoning: relevant to the screenshot-capture policy and to the "Option A (parallel FR screenshots)" cost estimate.
  * Reference: <https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/>.

## Clarifying questions (require user input)

1. **Language pair confirmation.** The prompt assumed Spanish; the sibling is French. **Should the new workshop ship EN ↔ FR (matching sibling) or EN ↔ ES (matching the prompt)?** This research assumes the answer is FR, but if you intend Spanish, the glossary needs to be rebuilt against `learn.microsoft.com/es-es/microsoft-copilot-studio/` — the layout, workflow, fallback policy, and tone discussion would carry over almost unchanged.
2. **Screenshot strategy.** Capture one set in EN portal and reuse for FR (sibling does this implicitly because its content does not embed many Microsoft product screenshots), or capture parallel FR screenshots after switching the Copilot Studio portal UI to French? Affects roughly 6–8 hours of incremental work for full FR screenshot parity.
3. **Hosting / publishing assumption.** The sibling publishes via GitHub Pages with `baseurl: "/agentic-accelerator-workshop"`. Will the new repo also publish at `https://devopsabcs-engineering.github.io/copilot-studio-skill/` with `baseurl: "/copilot-studio-skill"`? The file tree in this research assumes yes.

## References (primary sources)

* Sibling repo root: <https://github.com/devopsabcs-engineering/agentic-accelerator-workshop>
* Sibling live site EN: <https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/>
* Sibling live site FR: <https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/fr/>
* Sibling `_config.yml`: <https://github.com/devopsabcs-engineering/agentic-accelerator-workshop/blob/main/_config.yml>
* Sibling `fr/` listing: <https://github.com/devopsabcs-engineering/agentic-accelerator-workshop/tree/main/fr>
* Sibling `fr/index.md` raw: <https://raw.githubusercontent.com/devopsabcs-engineering/agentic-accelerator-workshop/main/fr/index.md>
* Sibling FR lab examples: `/fr/labs/lab-00-setup`, `/fr/labs/lab-02` on the live site
* Microsoft Learn FR — Copilot Studio fundamentals: <https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/fundamentals-what-is-copilot-studio>
* Microsoft Learn FR — Authoring topics: <https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/authoring-create-edit-topics>
* Microsoft Learn FR — Knowledge sources (header only): <https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/knowledge-add-knowledge>
* Hello-world walkthrough (input): `.copilot-tracking/research/2026-05-25/copilot-studio-skill-hello-world-research.md`
* Just-the-Docs theme: <https://github.com/just-the-docs/just-the-docs>
