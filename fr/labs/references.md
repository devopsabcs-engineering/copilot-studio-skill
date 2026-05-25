---
title: Références
description: Liste curée de liens vers la documentation amont, les dépôts source, l'atelier jumeau, et le thème just-the-docs qui propulse ce site.
nav_order: 15
permalink: /fr/labs/references
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/references.md)**

## Vue d'ensemble

Chaque lien ci-dessous a été utilisé lors de la rédaction de cet atelier. Chaque section est regroupée par audience : d'abord la famille de produit de l'atelier, puis l'outillage, puis les exemples Microsoft associés, puis les sites et thèmes sur lesquels cet atelier lui-même fonctionne.

## Produit Copilot Studio

* [Portail Copilot Studio](https://copilotstudio.microsoft.com/) — point d'entrée de connexion pour toutes les tâches d'édition, de publication, et de test.
* [Inscription à l'essai gratuit Copilot Studio](https://go.microsoft.com/fwlink/?LinkId=2107702) — compte professionnel ou scolaire requis.
* [Microsoft Learn — Microsoft Copilot Studio](https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/) — aperçu, concepts, et articles pratiques. Utilisé comme source de connaissances dans le [Lab 10](lab-10-advanced-add-knowledge-source.md).
* [Microsoft Learn — Tester votre agent](https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/authoring-test-bot) — référence du volet de test.
* [Microsoft Learn — Examiner l'activité de l'agent](https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/authoring-review-activity) — référence de la carte d'activité.
* [Microsoft Learn — Exigences de licence et d'essai](https://learn.microsoft.com/fr-fr/microsoft-copilot-studio/requirements-licensing-subscriptions) — matrice des abonnements.

## Source de l'outillage de l'atelier

* [`microsoft/skills-for-copilot-studio`](https://github.com/microsoft/skills-for-copilot-studio) — le plug-in installé dans le [Lab 05](lab-05-install-skills-plugin.md). README, SETUP_GUIDE, et manifeste du plug-in vivent ici.
* [`microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md`](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md) — le guide d'installation canonique, incluant l'App Registration Azure facultative pour `CopilotStudio.Copilots.Invoke` référencée depuis le [Lab 09](lab-09-test-in-portal.md) et le [Dépannage](troubleshooting.md).
* [`microsoft/vscode-copilotstudio`](https://github.com/microsoft/vscode-copilotstudio) — l'extension VS Code qui livre le binaire `LanguageServerHost` requis par le plug-in (installée dans le [Lab 02](lab-02-install-copilot-studio-extension.md)).
* [Issue amont #116 — parité avec l'hôte VS Code Copilot Chat](https://github.com/microsoft/skills-for-copilot-studio/issues/116) — explique pourquoi cet atelier utilise le terminal intégré de VS Code plutôt que le panneau latéral Copilot Chat.
* [Issue amont #155 — régression CdsBotId après clone-puis-push](https://github.com/microsoft/skills-for-copilot-studio/issues/155) — référencée dans le [Dépannage](troubleshooting.md).

## GitHub Copilot CLI

* [GitHub docs — À propos de GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli) — aperçu des fonctionnalités.
* [GitHub docs — Installer GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli) — chemins d'installation `winget` et npm utilisés dans le [Lab 01](lab-01-install-windows-tooling.md).
* [GitHub docs — Utiliser GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli) — référence pour `/login`, `/plugin`, et les sous-agents `@`.
* [Paramètres d'abonnement GitHub Copilot](https://github.com/settings/copilot) — point d'entrée pour confirmer l'état de l'abonnement et (si géré par une organisation) demander l'activation de la stratégie Copilot CLI.

## Exemples Microsoft associés

* [`microsoft/CopilotStudioSamples` — extensibilité / serveurs MCP](https://github.com/microsoft/CopilotStudioSamples/tree/main/extensibility/mcp) — suite naturelle une fois que vous comprenez la boucle YAML. Ajoute une action soutenue par un serveur MCP à l'agent.
* [`microsoft/Agents` — exemples de Skill Bot Framework](https://github.com/microsoft/Agents/tree/main/samples/dotnet/copilotstudio-skill) — pour l'**autre** type de « Skill » (un agent qui en appelle un autre). Hors du périmètre de cet atelier ; enregistré ici pour que vous sachiez où chercher si cela devient le but.

## Infrastructure propre de cet atelier

* [Atelier jumeau — `devopsabcs-engineering/agentic-accelerator-workshop`](https://github.com/devopsabcs-engineering/agentic-accelerator-workshop) — le modèle visuel et structurel que cet atelier reflète.
* [Site jumeau en ligne](https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/) — référence de parité pour la mise en page, la forme de la barre latérale, et la position du sélecteur de langue.
* [`just-the-docs/just-the-docs`](https://github.com/just-the-docs/just-the-docs) — le thème distant Jekyll que ce site utilise.
* [Documentation Playwright `storageState`](https://playwright.dev/docs/auth) — soutient le motif du harnais de captures d'écran documenté dans le `CONTRIBUTING.md` de l'atelier.
* [`charmbracelet/freeze`](https://github.com/charmbracelet/freeze) — outil de capture d'image de terminal utilisé par le harnais de captures d'écran pour les captures de terminal `lab-NN-*.png`.
