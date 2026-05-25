---
title: Lab 04 — Préparer l'espace de travail local et lancer Copilot CLI
description: Créez un dossier de travail sur disque, ouvrez-le dans VS Code, lancez GitHub Copilot CLI depuis le terminal intégré et connectez-vous avec /login.
nav_order: 6
permalink: /fr/labs/lab-04-setup-workspace-and-cli
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/lab-04-setup-workspace-and-cli.md)**

| Durée | Niveau | Prérequis |
|---|---|---|
| 10 min | Débutant | Lab 01 terminé (PowerShell 7+, Node 22+, `copilot`) ; Lab 02 terminé (extension VS Code installée) |

## Vue d'ensemble

Le YAML de l'agent vit sur disque, dans un dossier que vous contrôlez. Choisissez un chemin de confiance, ouvrez-le dans VS Code, puis lancez `copilot` depuis le terminal intégré de VS Code. Utiliser le terminal intégré garde chaque commande d'éditeur, chaque diff de fichier et chaque invite CLI dans la même fenêtre — exactement l'expérience que VS Code Copilot Chat offrirait si l'[issue #116](https://github.com/microsoft/skills-for-copilot-studio/issues/116) était résolue. En attendant, le terminal intégré est le chemin pris en charge dans l'éditeur.

## Objectifs d'apprentissage

* Créer un dossier parent pour tous vos espaces de travail d'agents Copilot Studio.
* Ouvrir ce dossier dans VS Code et l'approuver.
* Lancer `copilot` dans le terminal intégré et compléter `/login`.

## Exercice 4.1 — Créer le dossier d'espace de travail et l'ouvrir

1. Ouvrez PowerShell 7+ et exécutez :

    ```powershell
    New-Item -ItemType Directory -Path C:\src\copilot-studio-work -Force | Out-Null
    Set-Location C:\src\copilot-studio-work
    code .
    ```

2. VS Code se lance dans le nouveau dossier. Si une invite apparaît, choisissez **Yes, I trust the authors** lorsque la boîte de dialogue d'approbation d'espace de travail s'affiche.

![Session PowerShell affichant les commandes New-Item et code .](../../images/lab-04/lab-04-create-workspace.png)

## Exercice 4.2 — Lancer Copilot CLI depuis le terminal intégré

1. Dans VS Code, ouvrez le terminal intégré avec `` Ctrl+` ``.
2. Confirmez que le terminal exécute PowerShell 7+ (le nom du shell apparaît dans la barre de titre du terminal ; s'il indique `powershell.exe`, utilisez la liste déroulante de profils de terminal pour choisir **PowerShell** à la place).
3. Dans le terminal intégré, exécutez :

    ```powershell
    copilot
    ```

4. Au premier lancement, `copilot` vous demande de confirmer que vous faites confiance au dossier. Choisissez **Yes**.

![Terminal intégré de VS Code exécutant copilot pour la première fois avec l'invite de confiance](../../images/lab-04/lab-04-copilot-trust-prompt.png)

## Exercice 4.3 — Se connecter avec `/login`

1. À l'intérieur de la session `copilot`, exécutez :

    ```text
    /login
    ```

2. Suivez le flux navigateur ou code d'appareil que `copilot` affiche. Une fois l'authentification réussie, la session vous indique comme connecté et l'invite redevient prête à recevoir une entrée.

## Point de vérification

Avant de continuer, vérifiez :

* [ ] `C:\src\copilot-studio-work` existe et est votre dossier de travail courant.
* [ ] VS Code est ouvert avec le dossier approuvé.
* [ ] Le terminal intégré affiche une session `copilot` interactive en attente d'entrée.
* [ ] `/login` s'est terminé avec succès (aucune bannière d'erreur visible).

## Étapes suivantes

Passez au [Lab 05 — Installer le plug-in `skills-for-copilot-studio`](lab-05-install-skills-plugin.md).
