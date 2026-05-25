---
title: Lab 01 — Installer l'outillage Windows
description: Installez PowerShell 7+, Node.js 22+ et GitHub Copilot CLI sur Windows à l'aide de winget, puis vérifiez que chaque outil rapporte la version attendue.
nav_order: 3
permalink: /fr/labs/lab-01-install-windows-tooling
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/lab-01-install-windows-tooling.md)**

| Durée | Niveau | Prérequis |
|---|---|---|
| 15 min | Débutant | Lab 00 terminé ; machine Windows avec `winget` disponible |

## Vue d'ensemble

GitHub Copilot CLI requiert PowerShell 7 ou supérieur sur Windows et Node.js 22 ou supérieur lorsqu'il est installé via npm. Le README officiel indique Node 18 comme minimum, mais le chemin d'installation par paquet npm exige Node 22+. Installez Node 22+ pour satisfaire les deux. Une fois ces prérequis en place, installez le CLI `copilot` lui-même via `winget`, ou rabattez-vous sur l'installation globale npm si `winget` n'est pas disponible sur votre machine.

## Objectifs d'apprentissage

* Vérifier que PowerShell 7+ est votre shell actif.
* Installer Node.js 22+ via `winget` et confirmer la version.
* Installer GitHub Copilot CLI via `winget` (ou la solution de repli npm) et exécuter `copilot --version`.

## Exercice 1.1 — Vérifier PowerShell 7+

1. Ouvrez **PowerShell 7+** (cherchez « PowerShell » dans le menu Démarrer et choisissez l'entrée qui n'est pas Windows PowerShell, ou exécutez `pwsh` depuis n'importe quel terminal).
2. Vérifiez la version :

    ```powershell
    $PSVersionTable.PSVersion
    ```

3. Confirmez que la colonne `Major` indique `7` ou supérieur. Si elle indique `5`, vous êtes dans Windows PowerShell 5.1, que GitHub Copilot CLI ne prend pas en charge — installez PowerShell 7 depuis le Microsoft Store ou exécutez `winget install Microsoft.PowerShell` d'abord.

![Session PowerShell affichant $PSVersionTable avec Major 7](../../images/lab-01/lab-01-pwsh-version.png)

## Exercice 1.2 — Installer Node.js 22+

1. Dans votre session PowerShell 7+, installez le Node.js LTS :

    ```powershell
    winget install OpenJS.NodeJS.LTS
    ```

2. Fermez et rouvrez le terminal afin que le `PATH` mis à jour soit chargé.
3. Confirmez que la version est `v22.x` ou supérieure :

    ```powershell
    node --version
    ```

![Terminal affichant node --version rapportant v22 ou supérieur](../../images/lab-01/lab-01-node-version.png)

## Exercice 1.3 — Installer GitHub Copilot CLI

1. Chemin préféré — installer via `winget` :

    ```powershell
    winget install GitHub.Copilot
    copilot --version
    ```

2. Chemin de repli — si `winget` n'est pas disponible sur votre machine, installez via npm après que l'exercice 1.2 du Lab 01 a réussi :

    ```powershell
    npm install -g @github/copilot
    copilot --version
    ```

3. Confirmez que `copilot --version` affiche une chaîne de version sans erreur.

![Terminal affichant la sortie de copilot --version](../../images/lab-01/lab-01-copilot-version.png)

## Point de vérification

Avant de continuer, vérifiez :

* [ ] `$PSVersionTable.PSVersion` rapporte un `Major` de 7 ou supérieur.
* [ ] `node --version` rapporte `v22.x` ou supérieur.
* [ ] `copilot --version` affiche une chaîne de version sans erreur.

## Étapes suivantes

Passez au [Lab 02 — Installer l'extension VS Code Copilot Studio](lab-02-install-copilot-studio-extension.md).
