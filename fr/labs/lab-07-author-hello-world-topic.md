---
title: Lab 07 — Rédiger la rubrique Hello World
description: Utilisez @copilot-studio:copilot-studio-author pour ajouter une rubrique YAML qui répond « Hello, world ! » et inspectez le fichier généré avant de le pousser vers le cloud.
nav_order: 9
permalink: /fr/labs/lab-07-author-hello-world-topic
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/lab-07-author-hello-world-topic.md)**

| Durée | Niveau | Prérequis |
|---|---|---|
| 10 min | Débutant | Lab 06 terminé (`HelloWorldAgent/` cloné localement) |

## Vue d'ensemble

Dans ce lab, vous allez utiliser le sous-agent `@copilot-studio:copilot-studio-author` dans GitHub Copilot CLI pour créer une nouvelle rubrique appelée *Hello World*. Le sous-agent écrit un fichier YAML sur le disque, que vous pouvez inspecter dans l'éditeur de VS Code avant de le pousser vers le cloud Copilot Studio. Aucune création dans le portail n'est nécessaire pour cette étape — toutes les modifications se produisent localement.

## Objectifs d'apprentissage

* Rédiger une rubrique via le sous-agent `@copilot-studio:copilot-studio-author` avec un prompt verbeux et explicite.
* Inspecter le YAML généré et confirmer la phrase déclencheur et le nœud de message.
* (Facultatif) Valider la rubrique via le sous-agent `@copilot-studio:copilot-studio-advisor`.

## Exercice 7.1 — Rédiger la rubrique

1. Dans votre session `copilot` du Lab 04, envoyez ce prompt :

    ```text
    @copilot-studio:copilot-studio-author create a topic called HelloWorld in HelloWorldAgent that triggers on the phrase "hello" and sends a single message: "Hello, world! I'm a Copilot Studio agent authored from VS Code via the Copilot CLI plugin."
    ```

2. Le sous-agent écrit `HelloWorldAgent/topics/HelloWorld.topic.mcs.yml` sur le disque et résume ce qu'il a fait.

![CLI Copilot affichant l'échange avec @copilot-studio:copilot-studio-author qui rédige la rubrique HelloWorld](../../images/lab-07/lab-07-author-exchange.png)

## Exercice 7.2 — Inspecter le YAML généré

1. Ouvrez `HelloWorldAgent/topics/HelloWorld.topic.mcs.yml` dans VS Code.
2. Confirmez que le fichier contient :

    * Une `triggerQueries` (ou `triggerPhrases`) listant `hello`.
    * Un seul nœud de type `SendActivity` (ou équivalent) dont la valeur de message est exactement `"Hello, world! I'm a Copilot Studio agent authored from VS Code via the Copilot CLI plugin."`.
3. Le schéma référencé est [`reference/bot.schema.yaml-authoring.json`](https://github.com/microsoft/PowerVirtualAgentsSamples/) — VS Code valide les clés YAML en arrière-plan.

> [!TIP]
> La casse du champ `kind` (par exemple `kind: TextNode`) est sensible. Si vous éditez le YAML manuellement plus tard, conservez le casing PascalCase exact que le sous-agent a généré.

## Exercice 7.3 — (Facultatif) Valider avec advisor

1. Pour une revue rapide de la rubrique avant de pousser, exécutez :

    ```text
    @copilot-studio:copilot-studio-advisor review HelloWorldAgent/topics/HelloWorld.topic.mcs.yml
    ```

2. Le sous-agent advisor signale les problèmes structurels, les références manquantes ou les écarts par rapport aux modèles recommandés. Pour cette rubrique minimale, attendez-vous à un retour « aucun problème détecté ».

## Point de vérification

Avant de continuer, vérifiez :

* [ ] `HelloWorldAgent/topics/HelloWorld.topic.mcs.yml` existe sur le disque.
* [ ] La rubrique déclare une phrase déclencheur `hello` et un seul nœud de message avec la chaîne `"Hello, world! I'm a Copilot Studio agent authored from VS Code via the Copilot CLI plugin."`.
* [ ] VS Code n'affiche aucune erreur de validation de schéma rouge dans l'éditeur.

## Étapes suivantes

Passez au [Lab 08 — Pousser et publier](lab-08-push-and-publish.md).
