---
title: Lab 10 — (Avancé) Ajouter une source de connaissances
description: Extension facultative de 15 minutes qui utilise @copilot-studio:copilot-studio-author pour attacher une source de connaissances publique Microsoft Learn à HelloWorldAgent, puis re-pousse, republie, et vérifie les réponses génératives dans le volet de test.
nav_order: 12
permalink: /fr/labs/lab-10-advanced-add-knowledge-source
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/lab-10-advanced-add-knowledge-source.md)**

| Durée | Niveau | Prérequis |
|---|---|---|
| 15 min | Intermédiaire (facultatif) | Lab 09 terminé (hello-world de bout en bout fonctionnel) |

## Vue d'ensemble

Ce lab est **facultatif**. Le parcours hello-world est déjà terminé après le [Lab 09](lab-09-test-in-portal.md). Utilisez ce lab quand vous voulez voir la génération augmentée par récupération en action sans aucune nouvelle infrastructure ni configuration d'authentification. Le même sous-agent `author` qui a rédigé la rubrique dans le [Lab 07](lab-07-author-hello-world-topic.md) peut attacher une source de connaissances depuis une URL publique. Après re-push et republication, l'agent ancre ses réponses dans cette source — visible dans la carte d'activité du volet de test comme un nœud de réponses génératives qui se déclenche contre votre source de connaissances.

## Objectifs d'apprentissage

* Attacher une URL publique Microsoft Learn comme source de connaissances via `@copilot-studio:copilot-studio-author`.
* Re-pousser et republier l'agent pour que la nouvelle source de connaissances soit en service.
* Ouvrir la carte d'activité du volet de test et identifier le nœud de réponses génératives déclenché contre votre source de connaissances.

## Exercice 10.1 — Ajouter la source de connaissances

1. Dans votre session `copilot`, exécutez :

    ```text
    @copilot-studio:copilot-studio-author Add a knowledge source pointing to https://learn.microsoft.com/en-us/microsoft-copilot-studio/ named "Copilot Studio Docs"
    ```

2. Le sous-agent écrit un nouveau fichier à :

    ```text
    HelloWorldAgent/knowledge/CopilotStudioDocs.knowledge.mcs.yml
    ```

3. Ouvrez le fichier dans l'éditeur et confirmez qu'il référence l'URL publique Microsoft Learn que vous avez fournie.

![CLI Copilot invoquant @copilot-studio:copilot-studio-author avec l'invite Add a knowledge source](../../images/lab-10/lab-10-author-knowledge.png)

## Exercice 10.2 — Pousser et republier

1. Poussez la modification vers le cloud :

    ```text
    @copilot-studio:copilot-studio-manage push
    ```

2. Revenez au portail Copilot Studio, ouvrez la vue d'édition de `HelloWorldAgent`, et cliquez à nouveau sur **Publish**. Attendez le toast de succès.

> [!IMPORTANT]
> L'étape de republication est obligatoire. La source de connaissances est uniquement attachée à la version **publiée** de l'agent — sans republication, le volet de test s'exécute contre la version précédente et votre nouvelle source de connaissances n'a aucun effet.

## Exercice 10.3 — Tester les réponses génératives dans le volet de test

1. Dans le portail, ouvrez le volet **Test**.
2. Tapez une question à laquelle la nouvelle source de connaissances peut répondre :

    ```text
    What is a topic in Copilot Studio?
    ```

3. L'agent répond maintenant avec un contenu ancré dans la documentation publique Microsoft Learn au lieu de répondre uniquement à partir des données d'entraînement.

## Exercice 10.4 — Inspecter la carte d'activité

1. Dans le volet de test, ouvrez le menu à trois points et choisissez **Show activity map when testing**.
2. Renvoyez la question.
3. La carte d'activité affiche un nœud **Generative answers** qui se déclenche contre votre source de connaissances `Copilot Studio Docs`. C'est la confirmation visible que la génération augmentée par récupération est correctement câblée.

![Carte d'activité du volet de test Copilot Studio affichant un nœud de réponses génératives qui se déclenche contre la source de connaissances Copilot Studio Docs](../../images/lab-10/lab-10-activity-map-generative-answers-fr.png)

## Point de vérification

Avant de continuer, vérifiez :

* [ ] `HelloWorldAgent/knowledge/CopilotStudioDocs.knowledge.mcs.yml` existe dans votre espace de travail et référence l'URL publique Microsoft Learn.
* [ ] Le bouton **Publish** du portail a affiché un toast de succès après le second push.
* [ ] Le volet de test renvoie une réponse ancrée dans le contenu pour « What is a topic in Copilot Studio? ».
* [ ] La carte d'activité affiche un nœud **Generative answers** qui se déclenche contre la source de connaissances `Copilot Studio Docs`.

## Étapes suivantes

Une progression naturelle au-delà de ce lab est d'ajouter une **action** qui appelle un serveur MCP ou un flux Power Automate :

```text
@copilot-studio:copilot-studio-author Add an action ...
```

Cette étape introduit l'intégration d'API externe et est intentionnellement hors du périmètre de cet atelier. Voir [Références](references.md) pour des pointeurs vers les dépôts d'exemples Microsoft qui traitent les actions de serveur MCP de bout en bout.
