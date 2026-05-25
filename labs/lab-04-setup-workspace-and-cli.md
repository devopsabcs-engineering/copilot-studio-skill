---
title: Lab 04 — Set up local workspace and launch Copilot CLI
description: Create a working folder on disk, open it in VS Code, launch GitHub Copilot CLI from the integrated terminal, and sign in with /login.
nav_order: 6
permalink: /labs/lab-04-setup-workspace-and-cli
---

> 🇫🇷 **[Version française](../fr/labs/lab-04-setup-workspace-and-cli.md)**

| Duration | Level | Prerequisites |
|---|---|---|
| 10 min | Beginner | Lab 01 complete (PowerShell 7+, Node 22+, `copilot`); Lab 02 complete (VS Code extension installed) |

## Overview

The agent YAML lives on disk in a folder you control. Pick a path you trust, open it in VS Code, then launch `copilot` from VS Code's integrated terminal. Using the integrated terminal keeps every editor command, file diff, and CLI prompt in one window — exactly the experience that VS Code Copilot Chat would offer if [issue #116](https://github.com/microsoft/skills-for-copilot-studio/issues/116) were resolved. Until then, the integrated terminal is the supported in-editor path.

## Learning objectives

* Create a parent folder for all Copilot Studio agent workspaces.
* Open that folder in VS Code and trust it.
* Launch `copilot` in the integrated terminal and complete `/login`.

## Exercise 4.1 — Create the workspace folder and open it

1. Open PowerShell 7+ and run:

    ```powershell
    New-Item -ItemType Directory -Path C:\src\copilot-studio-work -Force | Out-Null
    Set-Location C:\src\copilot-studio-work
    code .
    ```

2. VS Code launches into the new folder. If prompted, choose **Yes, I trust the authors** when the workspace trust dialog appears.

![PowerShell session showing New-Item and code . commands](../images/lab-04/lab-04-create-workspace.png)

## Exercise 4.2 — Launch Copilot CLI from the integrated terminal

1. In VS Code, open the integrated terminal with `` Ctrl+` ``.
2. Confirm the terminal is running PowerShell 7+ (the shell name appears in the terminal's title bar; if it reads `powershell.exe`, use the terminal-profile dropdown to pick **PowerShell** instead).
3. In the integrated terminal, run:

    ```powershell
    copilot
    ```

4. On first launch, `copilot` asks you to confirm you trust the folder. Choose **Yes**.

![VS Code integrated terminal running copilot for the first time with the trust prompt](../images/lab-04/lab-04-copilot-trust-prompt.png)

## Exercise 4.3 — Sign in with `/login`

1. Inside the `copilot` session, run:

    ```text
    /login
    ```

2. Follow the browser or device-code flow `copilot` prints. Once authentication succeeds, the session reports you as signed in and the prompt returns ready for input.

## Verification Checkpoint

Before proceeding, verify:

* [ ] `C:\src\copilot-studio-work` exists and is your current working folder.
* [ ] VS Code is open with the folder trusted.
* [ ] The integrated terminal shows an interactive `copilot` session waiting for input.
* [ ] `/login` completed successfully (no error banner visible).

## Next Steps

Proceed to [Lab 05 — Install the `skills-for-copilot-studio` plugin](lab-05-install-skills-plugin.md).
