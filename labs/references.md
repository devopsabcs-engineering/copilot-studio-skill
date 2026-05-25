---
title: References
description: Curated list of links to upstream documentation, source repositories, the sibling workshop, and the just-the-docs theme that powers this site.
nav_order: 15
permalink: /labs/references
---

> 🇫🇷 **[Version française](../fr/labs/references.md)**

## Overview

Every link below was used while authoring this workshop. Each section is grouped by audience: the workshop product family first, then the tooling, then the related Microsoft samples, then the sites and themes this workshop itself runs on.

## Copilot Studio product

* [Copilot Studio portal](https://copilotstudio.microsoft.com/) — sign-in entry point for all author, publish, and test work.
* [Copilot Studio free trial sign-up](https://go.microsoft.com/fwlink/?LinkId=2107702) — work or school account required.
* [Microsoft Learn — Microsoft Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/) — overview, concepts, and how-to articles. Used as the knowledge source in [Lab 10](lab-10-advanced-add-knowledge-source.md).
* [Microsoft Learn — Test your agent](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot) — Test pane reference.
* [Microsoft Learn — Review agent activity](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-review-activity) — activity map reference.
* [Microsoft Learn — Licensing and trial requirements](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing-subscriptions) — subscription matrix.

## Workshop tooling source

* [`microsoft/skills-for-copilot-studio`](https://github.com/microsoft/skills-for-copilot-studio) — the plugin installed in [Lab 05](lab-05-install-skills-plugin.md). README, SETUP_GUIDE, and plugin manifest live here.
* [`microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md`](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md) — the canonical install guide, including the optional Azure App Registration for `CopilotStudio.Copilots.Invoke` referenced from [Lab 09](lab-09-test-in-portal.md) and [Troubleshooting](troubleshooting.md).
* [`microsoft/vscode-copilotstudio`](https://github.com/microsoft/vscode-copilotstudio) — the VS Code extension that ships the `LanguageServerHost` binary required by the plugin (installed in [Lab 02](lab-02-install-copilot-studio-extension.md)).
* [Upstream issue #116 — VS Code Copilot Chat host parity](https://github.com/microsoft/skills-for-copilot-studio/issues/116) — explains why this workshop uses the VS Code integrated terminal instead of the Copilot Chat side panel.
* [Upstream issue #155 — clone-then-push CdsBotId regression](https://github.com/microsoft/skills-for-copilot-studio/issues/155) — referenced in [Troubleshooting](troubleshooting.md).

## GitHub Copilot CLI

* [GitHub docs — About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli) — feature overview.
* [GitHub docs — Install GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli) — `winget` and npm install paths used in [Lab 01](lab-01-install-windows-tooling.md).
* [GitHub docs — Use GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli) — `/login`, `/plugin`, and `@` sub-agent reference.
* [GitHub Copilot subscription settings](https://github.com/settings/copilot) — entry point to confirm subscription status and (if org-managed) ask for the Copilot CLI policy.

## Related Microsoft samples

* [`microsoft/CopilotStudioSamples` — extensibility / MCP servers](https://github.com/microsoft/CopilotStudioSamples/tree/main/extensibility/mcp) — natural follow-on once you understand the YAML loop. Adds an MCP-server-backed action to the agent.
* [`microsoft/Agents` — Bot Framework Skill samples](https://github.com/microsoft/Agents/tree/main/samples/dotnet/copilotstudio-skill) — for the **other** kind of "Skill" (one agent calling another). Out of scope for this workshop; recorded here so you know where to look if that becomes the goal.

## This workshop's own infrastructure

* [Sibling workshop — `devopsabcs-engineering/agentic-accelerator-workshop`](https://github.com/devopsabcs-engineering/agentic-accelerator-workshop) — the visual and structural template this workshop mirrors.
* [Live sibling site](https://devopsabcs-engineering.github.io/agentic-accelerator-workshop/) — parity reference for layout, sidebar shape, and language-switcher position.
* [`just-the-docs/just-the-docs`](https://github.com/just-the-docs/just-the-docs) — the Jekyll remote theme this site uses.
* [Playwright `storageState` documentation](https://playwright.dev/docs/auth) — backs the screenshot harness pattern documented in the workshop's `CONTRIBUTING.md`.
* [`charmbracelet/freeze`](https://github.com/charmbracelet/freeze) — terminal-still tool used by the screenshot harness for `lab-NN-*.png` terminal captures.
