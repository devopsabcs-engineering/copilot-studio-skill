---
title: Lab 08 — Pousser et publier
description: Poussez la rubrique Hello World rédigée localement vers le cloud Copilot Studio avec @copilot-studio:copilot-studio-manage push, puis publiez l'agent depuis le portail pour que la rubrique devienne invocable dans le volet de test.
nav_order: 10
permalink: /fr/labs/lab-08-push-and-publish
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/lab-08-push-and-publish.md)**

| Durée | Niveau | Prérequis |
|---|---|---|
| 10 min | Débutant | Lab 07 terminé (la rubrique Hello World existe localement) |

## Vue d'ensemble

`push` et `publish` sont deux étapes distinctes et toutes deux sont requises. `push` téléverse la nouvelle rubrique vers le cloud Copilot Studio sous forme de révision brouillon ; `publish` (depuis le portail) promeut ce brouillon afin que le volet de test et tous les canaux déployés puissent l'invoquer. Sauter `publish` est la raison la plus courante pour laquelle le volet de test du [Lab 09](lab-09-test-in-portal.md) ne voit pas la rubrique Hello World.

## Objectifs d'apprentissage

* Pousser l'agent local vers le cloud Copilot Studio en tant que brouillon.
* Résoudre un `ConcurrencyVersionMismatch` si le push en rapporte un.
* Publier le brouillon depuis le portail et confirmer le toast de succès.

## Exercice 8.1 — Pousser l'agent local vers le cloud

1. Dans votre session `copilot`, exécutez :

    ```text
    @copilot-studio:copilot-studio-manage push
    ```

2. Au premier push, le sous-agent peut ouvrir un onglet de navigateur pour la connexion Entra ID. Les jetons sont mis en cache ensuite.
3. Attendez que le sous-agent rapporte le succès.

![CLI Copilot invoquant @copilot-studio:copilot-studio-manage push et rapportant le succès](../../images/lab-08/lab-08-manage-push.png)

> [!CAUTION]
> Si le push échoue avec `ConcurrencyVersionMismatch`, vos versions de ligne locales sont obsolètes. Exécutez d'abord `@copilot-studio:copilot-studio-manage pull`, réconciliez les conflits que le pull fait remonter, puis relancez le push.

## Exercice 8.2 — Revenir au portail

1. Revenez à l'onglet de navigateur que vous avez laissé ouvert dans le [Lab 03](lab-03-create-blank-agent.md) sur la vue d'édition de `HelloWorldAgent`.
2. Si l'onglet est fermé, ouvrez [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com), choisissez le bon environnement dans le sélecteur en haut à droite, et rouvrez l'agent.

## Exercice 8.3 — Publier

1. En haut à droite de la vue d'édition de l'agent, cliquez sur **Publish**.
2. Le portail exécute un build-and-deploy puis affiche un toast de succès.

> [!IMPORTANT]
> `push` crée uniquement un **brouillon**. Le volet de test et tous les canaux déployés invoquent la version **publiée**. Si vous sautez l'étape de publication, le [Lab 09](lab-09-test-in-portal.md) ne verra pas la rubrique Hello World.

![Portail Copilot Studio affichant le bouton Publish sur la vue d'édition de HelloWorldAgent](../../images/lab-08/lab-08-portal-publish-button-fr.png)

![Portail Copilot Studio affichant le toast de succès de publication pour HelloWorldAgent](../../images/lab-08/lab-08-publish-success-toast-fr.png)

## Point de vérification

Avant de continuer, vérifiez :

* [ ] `@copilot-studio:copilot-studio-manage push` a rapporté un succès dans le CLI.
* [ ] Le bouton **Publish** du portail a affiché un toast de succès.
* [ ] La vue d'édition de l'agent dans le portail affiche un horodatage de publication réussie récent.

## Étapes suivantes

Passez au [Lab 09 — Tester dans le portail](lab-09-test-in-portal.md).
