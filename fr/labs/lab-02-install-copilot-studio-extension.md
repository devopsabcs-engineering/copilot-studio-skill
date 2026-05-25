---
title: Lab 02 — Installer l'extension VS Code Copilot Studio
description: Installez l'extension Copilot Studio publiée par Microsoft dans VS Code pour que le binaire LanguageServerHost qu'elle embarque soit disponible pour le plug-in skills-for-copilot-studio lors des opérations clone, push et pull.
nav_order: 4
permalink: /fr/labs/lab-02-install-copilot-studio-extension
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/lab-02-install-copilot-studio-extension.md)**

| Durée | Niveau | Prérequis |
|---|---|---|
| 5 min | Débutant | Lab 01 terminé ; VS Code installé |

## Vue d'ensemble

Le plug-in `skills-for-copilot-studio` ne communique pas directement avec le cloud Copilot Studio. Il fait appel à un petit binaire nommé `LanguageServerHost`, qui est embarqué dans l'extension VS Code **Copilot Studio** publiée par Microsoft. L'extension doit seulement être installée — VS Code lui-même n'a pas besoin d'être en cours d'exécution lorsque le plug-in s'exécute depuis le CLI. Dépôt source : [`microsoft/vscode-copilotstudio`](https://github.com/microsoft/vscode-copilotstudio).

## Objectifs d'apprentissage

* Installer l'extension VS Code Copilot Studio publiée par Microsoft.
* Confirmer que l'extension est activée dans votre installation VS Code.

## Exercice 2.1 — Installer l'extension depuis la place de marché

1. Ouvrez VS Code.
2. Ouvrez le panneau Extensions avec `Ctrl+Shift+X`.
3. Dans la zone de recherche, saisissez :

    ```text
    Copilot Studio
    ```

4. Dans les résultats, sélectionnez l'entrée publiée par **Microsoft** (recherchez le badge de l'éditeur vérifié). Cliquez sur **Install**.

![Panneau Extensions de VS Code mettant en évidence l'extension Copilot Studio publiée par Microsoft](../../images/lab-02/lab-02-extension-search.png)

## Exercice 2.2 — Confirmer que l'extension est activée

1. Ouvrez à nouveau le panneau Extensions (`Ctrl+Shift+X`).
2. Basculez vers la vue **Installed**.
3. Confirmez que **Copilot Studio** apparaît dans la liste sans aucune icône d'avertissement et sans invite « Reload Required » en attente.

![Vue Installed du panneau Extensions de VS Code affichant Copilot Studio activé](../../images/lab-02/lab-02-extension-installed.png)

## Point de vérification

Avant de continuer, vérifiez :

* [ ] L'extension Copilot Studio publiée par Microsoft apparaît dans la liste des extensions **Installed** de VS Code.
* [ ] Aucune invite « Reload Required » n'est en attente pour l'extension.

## Étapes suivantes

Passez au [Lab 03 — Créer votre premier agent vide dans le portail](lab-03-create-blank-agent.md).
