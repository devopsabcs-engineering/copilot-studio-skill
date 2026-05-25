---
title: Lab 01 — Install Windows tooling
description: Install PowerShell 7+, Node.js 22+, and GitHub Copilot CLI on Windows using winget, then verify each tool reports the expected version.
nav_order: 3
permalink: /labs/lab-01-install-windows-tooling
---

> 🇫🇷 **[Version française](../fr/labs/lab-01-install-windows-tooling.md)**

| Duration | Level | Prerequisites |
|---|---|---|
| 15 min | Beginner | Lab 00 complete; Windows machine with `winget` available |

## Overview

GitHub Copilot CLI requires PowerShell 7 or higher on Windows and Node.js 22 or higher when installed via npm. The official README lists Node 18 as the minimum, but the npm package install path requires Node 22+. Install Node 22+ to satisfy both. After these prerequisites are in place, install the `copilot` CLI itself via `winget`, or fall back to the npm global install if `winget` is unavailable on your machine.

## Learning objectives

* Verify that PowerShell 7+ is your active shell.
* Install Node.js 22+ via `winget` and confirm the version.
* Install GitHub Copilot CLI via `winget` (or npm fallback) and run `copilot --version`.

## Exercise 1.1 — Verify PowerShell 7+

1. Open **PowerShell 7+** (search for "PowerShell" in the Start menu and pick the non-Windows-PowerShell entry, or run `pwsh` from any terminal).
2. Check the version:

    ```powershell
    $PSVersionTable.PSVersion
    ```

3. Confirm the `Major` column reports `7` or higher. If it reports `5`, you are in Windows PowerShell 5.1, which GitHub Copilot CLI does not support — install PowerShell 7 from the Microsoft Store or `winget install Microsoft.PowerShell` first.

![PowerShell session showing $PSVersionTable with Major 7](../images/lab-01/lab-01-pwsh-version.png)

## Exercise 1.2 — Install Node.js 22+

1. In your PowerShell 7+ session, install the Node.js LTS:

    ```powershell
    winget install OpenJS.NodeJS.LTS
    ```

2. Close and re-open the terminal so the updated `PATH` is loaded.
3. Confirm the version is `v22.x` or higher:

    ```powershell
    node --version
    ```

![Terminal showing node --version reporting v22 or higher](../images/lab-01/lab-01-node-version.png)

## Exercise 1.3 — Install GitHub Copilot CLI

1. Preferred path — install via `winget`:

    ```powershell
    winget install GitHub.Copilot
    copilot --version
    ```

2. Fallback path — if `winget` is not available on your machine, install via npm after Lab 01 Exercise 1.2 succeeds:

    ```powershell
    npm install -g @github/copilot
    copilot --version
    ```

3. Confirm `copilot --version` prints a version string without errors.

![Terminal showing copilot --version output](../images/lab-01/lab-01-copilot-version.png)

## Verification Checkpoint

Before proceeding, verify:

* [ ] `$PSVersionTable.PSVersion` reports a `Major` of 7 or higher.
* [ ] `node --version` reports `v22.x` or higher.
* [ ] `copilot --version` prints a version string without errors.

## Next Steps

Proceed to [Lab 02 — Install the Copilot Studio VS Code extension](lab-02-install-copilot-studio-extension.md).
