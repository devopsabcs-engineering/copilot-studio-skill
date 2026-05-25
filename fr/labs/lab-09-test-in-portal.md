---
title: Lab 09 — Tester dans le portail
description: Ouvrez le volet de test du portail Copilot Studio, envoyez « hello » à l'agent publié, et confirmez qu'il répond avec le message de la rubrique que vous avez rédigée.
nav_order: 11
permalink: /fr/labs/lab-09-test-in-portal
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/lab-09-test-in-portal.md)**

| Durée | Niveau | Prérequis |
|---|---|---|
| 5 min | Débutant | Lab 08 terminé (push et publish réussis) |

## Vue d'ensemble

Le volet **Test** intégré au portail est le moyen le plus rapide de confirmer que la rubrique fonctionne. Cliquez sur **Test**, tapez `hello`, et l'agent répond avec le message que vous avez rédigé dans le [Lab 07](lab-07-author-hello-world-topic.md). Un chemin de test alternatif basé sur le CLI existe via `@copilot-studio:copilot-studio-test`, mais il requiert une App Registration Azure qui est hors du périmètre de cet atelier ; le volet de test du portail ne nécessite aucune configuration supplémentaire.

## Objectifs d'apprentissage

* Ouvrir le volet de test dans le portail Copilot Studio.
* Envoyer `hello` et voir la réponse attendue.
* Identifier l'alternative de test basée sur le CLI et le prérequis App Registration qui la conditionne.

## Exercice 9.1 — Ouvrir le volet de test

1. Dans le portail Copilot Studio, sur la vue d'édition de `HelloWorldAgent`, cliquez sur **Test** en haut à droite.
2. Le volet de test s'ouvre comme un panneau latéral avec une boîte de saisie de conversation.

![Volet de test du portail Copilot Studio ouvert sur le côté droit de la vue d'édition de HelloWorldAgent](../../images/lab-09/lab-09-test-pane-open-fr.png)

## Exercice 9.2 — Envoyer « hello » et confirmer la réponse

1. Dans la boîte de saisie du volet de test, tapez :

    ```text
    hello
    ```

2. Appuyez sur **Entrée**.
3. L'agent répond avec le message de votre rubrique :

    ```text
    Hello, world! I'm a Copilot Studio agent authored from VS Code via the Copilot CLI plugin.
    ```

![Volet de test Copilot Studio affichant l'invite hello et la réponse de l'agent](../../images/lab-09/lab-09-test-pane-hello-reply-fr.png)

## Exercice 9.3 — (Facultatif) Tester depuis le CLI à la place

1. Le chemin CLI utilise `@copilot-studio:copilot-studio-test` :

    ```text
    @copilot-studio:copilot-studio-test Send "hello" to the published agent
    ```

2. La première invocation de `test` requiert une App Registration Azure configurée avec l'autorisation déléguée `CopilotStudio.Copilots.Invoke`. Suivez [SETUP_GUIDE.md étape 5 option A](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md) pour la configurer.

> [!NOTE]
> `clone` et `push` utilisent directement le binaire LSP et ne nécessitent aucune App Registration. Seul le sous-agent `test` a besoin de l'autorisation `CopilotStudio.Copilots.Invoke` parce qu'il agit comme appelant OBO (on-behalf-of) de l'agent publié.

![Volet de test Copilot Studio affichant la réponse de l'agent avec la carte d'activité ouverte](../../images/lab-09/lab-09-activity-map-fr.png)

## Point de vérification

Avant de continuer, vérifiez :

* [ ] Le volet de test est ouvert sur la vue d'édition de `HelloWorldAgent`.
* [ ] Envoyer `hello` produit la réponse de message de votre rubrique.
* [ ] Le texte de la réponse correspond à la chaîne `activity:` dans `HelloWorldAgent/topics/HelloWorld.topic.mcs.yml`.

## Étapes suivantes

Vous avez terminé le parcours hello-world. Continuez vers le [Lab 10 — (Avancé) Ajouter une source de connaissances](lab-10-advanced-add-knowledge-source.md) pour une extension facultative de 15 minutes qui ancre l'agent dans du contenu Microsoft Learn.
