---
title: Lab 02 — Install the Copilot Studio VS Code extension
description: Install the Microsoft-published Copilot Studio extension in VS Code so its bundled LanguageServerHost binary is available to the skills-for-copilot-studio plugin for clone, push, and pull operations.
nav_order: 4
permalink: /labs/lab-02-install-copilot-studio-extension
---

> 🇫🇷 **[Version française](../fr/labs/lab-02-install-copilot-studio-extension.md)**

| Duration | Level | Prerequisites |
|---|---|---|
| 5 min | Beginner | Lab 01 complete; VS Code installed |

## Overview

The `skills-for-copilot-studio` plugin does not talk to the Copilot Studio cloud directly. It shells out to a small binary called `LanguageServerHost`, which ships inside the Microsoft-published **Copilot Studio** VS Code extension. The extension only needs to be installed — VS Code itself does not need to be running when the plugin runs from the CLI. Source repository: [`microsoft/vscode-copilotstudio`](https://github.com/microsoft/vscode-copilotstudio).

## Learning objectives

* Install the Microsoft-published Copilot Studio VS Code extension.
* Confirm the extension is enabled in your VS Code installation.

## Exercise 2.1 — Install the extension from the marketplace

1. Open VS Code.
2. Open the Extensions panel with `Ctrl+Shift+X`.
3. In the search box, type:

    ```text
    Copilot Studio
    ```

4. In the results, select the entry published by **Microsoft** (look for the verified-publisher badge). Click **Install**.

![VS Code Extensions panel showing the Microsoft-published Copilot Studio extension highlighted](../images/lab-02/lab-02-extension-search.png)

## Exercise 2.2 — Confirm the extension is enabled

1. Open the Extensions panel again (`Ctrl+Shift+X`).
2. Switch to the **Installed** view.
3. Confirm **Copilot Studio** appears in the list with no warning icons and no "Reload Required" prompt outstanding.

![VS Code Extensions panel Installed view showing Copilot Studio enabled](../images/lab-02/lab-02-extension-installed.png)

## Verification Checkpoint

Before proceeding, verify:

* [ ] The Microsoft-published Copilot Studio extension appears under VS Code's **Installed** extensions list.
* [ ] No "Reload Required" prompt is outstanding for the extension.

## Next Steps

Proceed to [Lab 03 — Create your first blank agent in the portal](lab-03-create-blank-agent.md).
