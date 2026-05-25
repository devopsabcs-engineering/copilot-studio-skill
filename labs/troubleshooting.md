---
title: Troubleshooting
description: Symptom-cause-fix reference for the most common errors encountered while completing the Copilot Studio Skill Workshop labs.
nav_order: 13
permalink: /labs/troubleshooting
---

> 🇫🇷 **[Version française](../fr/labs/troubleshooting.md)**

## Overview

When something fails mid-lab, scan the symptom column first. Every row points back to the specific lab and the underlying upstream issue when one exists.

## Symptom-cause-fix table

| Symptom | Likely cause | Fix |
|---|---|---|
| VS Code Copilot Chat does not see `@copilot-studio:*` sub-agents. | The embedded VS Code Copilot Chat host does not yet inject `SessionStart` hook context. See upstream [issue #116](https://github.com/microsoft/skills-for-copilot-studio/issues/116). | Run `copilot` in the VS Code **integrated terminal** as documented in [Lab 04](lab-04-setup-workspace-and-cli.md), not in the Copilot Chat side panel. |
| `copilot --version` reports `command not found` after `winget install GitHub.Copilot`. | The current terminal session is using the pre-install `PATH`. | Close the terminal, open a new PowerShell 7+ session, and re-run `copilot --version`. If the failure persists, use the `npm install -g @github/copilot` fallback in [Lab 01](lab-01-install-windows-tooling.md). |
| `winget install OpenJS.NodeJS.LTS` installs a version older than 22. | The Windows package manager cache is stale or the LTS pointer is lagging. | Run `winget upgrade OpenJS.NodeJS.LTS`. If that does not move you to 22+, install directly from [https://nodejs.org/](https://nodejs.org/) and re-run `node --version`. |
| GitHub Copilot CLI `/login` reports your account is not entitled. | Your GitHub Copilot subscription is missing or, if you are org-managed, the **Copilot CLI** policy is disabled in your organization. | Confirm the Copilot subscription in `https://github.com/settings/copilot`. If org-managed, ask an owner to enable the Copilot CLI policy as documented in [Lab 00](lab-00-prerequisites.md). |
| `clone` or `push` fails with **"Extension not found"**. | The Copilot Studio VS Code extension is not installed, so the `LanguageServerHost` binary it ships is unavailable to the plugin. | Install the Microsoft-published extension per [Lab 02](lab-02-install-copilot-studio-extension.md). VS Code itself does not need to be open, only installed. |
| `@copilot-studio:copilot-studio-manage push` reports `ConcurrencyVersionMismatch`. | The local row versions are stale relative to the cloud (someone or something edited the agent in the portal since your last sync). | Run `@copilot-studio:copilot-studio-manage pull` first, reconcile any conflicts, then re-run `push`. |
| After a clean `clone`, `settings.mcs.yml` reports it is missing the required `CdsBotId` property. | Active bug tracked as upstream [issue #155](https://github.com/microsoft/skills-for-copilot-studio/issues/155); affects some agent shapes. | Delete the cloned folder and re-clone. If the failure persists, check the linked issue for current status. |
| The `author` sub-agent reports a topic `kind` "cannot be found". | Casing mismatch in YAML — Copilot Studio's schema is case-sensitive. | Ask `@copilot-studio:copilot-studio-advisor` to validate the file and suggest the canonical `kind` name, or check the schema in [References](references.md). |
| A Power Fx expression in YAML is rejected with a syntax error. | Missing `=` prefix. Copilot Studio Power Fx expressions must start with `=`. | Prefix the expression value with `=`. For example, `=Topic.UserName & " (logged in)"`. |
| `@copilot-studio:copilot-studio-test` fails on first invocation. | Azure App Registration for the `CopilotStudio.Copilots.Invoke` delegated permission is not yet configured. Only the `test` sub-agent needs this — `clone` and `push` do not. | Follow [SETUP_GUIDE.md Step 5 Option A](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md) to create a public client App Registration with the `CopilotStudio.Copilots.Invoke` delegated permission. |
| Portal **Test** pane does not see the topic you authored, even after `push`. | `push` creates a **draft** revision; the Test pane invokes the **published** revision. | Click **Publish** in the portal as documented in [Lab 08](lab-08-push-and-publish.md) and wait for the success toast, then re-test. |
| Copilot Studio sign-up rejects your account. | You signed in with a personal Microsoft account or a Gmail address. Copilot Studio requires a work or school account. | Sign up with an M365 work or school account, or use a free Microsoft 365 developer tenant. |

## Where to look next

If your symptom is not listed, file or search upstream issues:

* [`microsoft/skills-for-copilot-studio` issues](https://github.com/microsoft/skills-for-copilot-studio/issues)
* [`microsoft/vscode-copilotstudio` issues](https://github.com/microsoft/vscode-copilotstudio/issues)
* [GitHub Copilot CLI feedback](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
