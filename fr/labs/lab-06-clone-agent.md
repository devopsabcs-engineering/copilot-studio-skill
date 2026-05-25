---
title: Lab 06 — Cloner l'agent dans votre espace de travail
description: Utilisez @copilot-studio:copilot-studio-manage pour cloner HelloWorldAgent depuis le cloud Copilot Studio vers votre dossier d'espace de travail local, en sélectionnant l'environnement Power Platform et l'agent correct lorsqu'on vous y invite.
nav_order: 8
permalink: /fr/labs/lab-06-clone-agent
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/lab-06-clone-agent.md)**

| Durée | Niveau | Prérequis |
|---|---|---|
| 10 min | Débutant | Labs 03, 04 et 05 terminés |

## Vue d'ensemble

L'opération de clonage récupère le YAML de l'agent depuis le cloud Copilot Studio dans un dossier sur disque, où vous pouvez l'éditer comme du code source. Le sous-agent `@copilot-studio:copilot-studio-manage` orchestre la connexion Microsoft Entra ID, la sélection d'environnement, la sélection d'agent et la pose des fichiers. Lorsqu'il est terminé, votre dossier d'espace de travail contient une arborescence éditable représentant `HelloWorldAgent`.

## Objectifs d'apprentissage

* Déclencher un clone via le sous-agent `@copilot-studio:copilot-studio-manage` et compléter la connexion Microsoft Entra ID lorsqu'on vous y invite.
* Choisir le bon environnement Power Platform et `HelloWorldAgent` lorsque le sous-agent liste les choix disponibles.
* Inspecter la forme du dossier que le clone produit et confirmer le fichier `agent.mcs.yml`.

## Exercice 6.1 — Déclencher le clone

1. Dans votre session `copilot` du Lab 04, exécutez :

    ```text
    @copilot-studio:copilot-studio-manage clone
    ```

2. Le sous-agent affiche une invite de connexion Microsoft Entra ID. Suivez le flux navigateur ou code d'appareil, en vous connectant avec le **même compte professionnel ou scolaire** que vous avez utilisé pour vous inscrire à Copilot Studio dans le Lab 00.

![CLI Copilot exécutant @copilot-studio:copilot-studio-manage clone et affichant l'invite de connexion Entra ID](../../images/lab-06/lab-06-manage-clone.png)

## Exercice 6.2 — Choisir l'environnement et l'agent

1. Après l'authentification, le sous-agent liste les environnements Power Platform auxquels votre compte a accès.
2. Choisissez le même environnement que vous avez utilisé dans le [Lab 03](lab-03-create-blank-agent.md) lors de la création de `HelloWorldAgent`.
3. Le sous-agent liste ensuite les agents de cet environnement. Choisissez `HelloWorldAgent`.

![CLI Copilot listant les environnements puis les agents avec HelloWorldAgent en surbrillance](../../images/lab-06/lab-06-env-agent-pick.png)

## Exercice 6.3 — Inspecter le dossier cloné

1. Une fois le clone terminé, ouvrez le panneau Explorer de VS Code (`Ctrl+Shift+E`).
2. Confirmez la forme du dossier :

    ```text
    HelloWorldAgent/
      agent.mcs.yml
      settings.mcs.yml
      topics/
        Conversation Start.topic.mcs.yml
    ```

3. Ouvrez `HelloWorldAgent/agent.mcs.yml` dans l'éditeur. Le fichier déclare l'agent et fait référence à ses rubriques.

> [!NOTE]
> Le suffixe `.<kind>.mcs.yml` (par exemple `.topic.mcs.yml`, `.knowledge.mcs.yml`) indique au plug-in à quel artefact appartient chaque fichier YAML lors des opérations push et pull suivantes.

![Explorateur VS Code affichant le dossier HelloWorldAgent avec agent.mcs.yml visible](../../images/lab-06/lab-06-workspace-folder.png)

![Éditeur VS Code affichant le contenu de HelloWorldAgent/agent.mcs.yml](../../images/lab-06/lab-06-agent-yml-editor.png)

## Point de vérification

Avant de continuer, vérifiez :

* [ ] La connexion Microsoft Entra ID a réussi à l'intérieur du sous-agent `@copilot-studio:copilot-studio-manage`.
* [ ] Le dossier `HelloWorldAgent/` existe sous `C:\src\copilot-studio-work\`.
* [ ] `HelloWorldAgent/agent.mcs.yml` s'ouvre dans VS Code sans erreur de schéma.

## Étapes suivantes

Passez au [Lab 07 — Rédiger la rubrique Hello World](lab-07-author-hello-world-topic.md).
