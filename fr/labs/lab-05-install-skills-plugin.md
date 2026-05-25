---
title: Lab 05 — Installer le plug-in skills-for-copilot-studio
description: Installez le plug-in microsoft/skills-for-copilot-studio dans GitHub Copilot CLI depuis la place de marché, puis vérifiez que les quatre sous-agents @copilot-studio sont découvrables.
nav_order: 7
permalink: /fr/labs/lab-05-install-skills-plugin
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/lab-05-install-skills-plugin.md)**

| Durée | Niveau | Prérequis |
|---|---|---|
| 5 min | Débutant | Lab 04 terminé (session `copilot` interactive en cours) |

## Vue d'ensemble

Le plug-in est distribué via la place de marché des plug-ins GitHub Copilot CLI (la même surface qu'utilise Claude Code). Après `/plugin marketplace add` et `/plugin install`, quatre sous-agents apparaissent dans l'autocomplétion `@` :

| Sous-agent | Objectif |
|---|---|
| `@copilot-studio:copilot-studio-manage` | Cloner, pousser, tirer, synchroniser le contenu de l'agent entre le YAML local et le cloud Copilot Studio |
| `@copilot-studio:copilot-studio-author` | Créer et éditer le YAML (rubriques, actions, sources de connaissances, déclencheurs, variables) |
| `@copilot-studio:copilot-studio-test` | Tester les agents publiés — test ponctuel, suites par lot, analyse d'évaluation |
| `@copilot-studio:copilot-studio-advisor` | Conseils de conception, revue d'agent, dépannage |

Ce lab utilise `manage` et `author` ; `test` est mentionné comme chemin alternatif dans le [Lab 09](lab-09-test-in-portal.md) ; `advisor` est présenté comme étape de validation facultative dans le [Lab 07](lab-07-author-hello-world-topic.md).

## Objectifs d'apprentissage

* Ajouter la place de marché des plug-ins et installer le plug-in depuis une session `copilot` active.
* Confirmer que les quatre sous-agents `@copilot-studio:*` apparaissent dans l'autocomplétion `@`.

## Exercice 5.1 — Ajouter la place de marché et installer le plug-in

1. Avec votre session `copilot` du [Lab 04](lab-04-setup-workspace-and-cli.md) toujours ouverte, exécutez :

    ```text
    /plugin marketplace add microsoft/skills-for-copilot-studio
    ```

2. Puis installez le plug-in :

    ```text
    /plugin install copilot-studio@skills-for-copilot-studio
    ```

3. `copilot` rapporte une installation réussie. Le slug du plug-in est `copilot-studio` ; le slug de la place de marché est `skills-for-copilot-studio`.

![CLI Copilot affichant les commandes plugin marketplace add et plugin install qui ont réussi](../../images/lab-05/lab-05-plugin-install.png)

## Exercice 5.2 — Vérifier que les sous-agents sont découvrables

1. À l'invite `copilot`, tapez un seul caractère `@`.
2. La liste déroulante d'autocomplétion affiche les quatre sous-agents :

    * `@copilot-studio:copilot-studio-manage`
    * `@copilot-studio:copilot-studio-author`
    * `@copilot-studio:copilot-studio-test`
    * `@copilot-studio:copilot-studio-advisor`

![Autocomplétion @ du CLI Copilot listant les quatre sous-agents copilot-studio](../../images/lab-05/lab-05-subagent-autocomplete.png)

## Point de vérification

Avant de continuer, vérifiez :

* [ ] `/plugin marketplace add` a rapporté un succès sans erreur.
* [ ] `/plugin install copilot-studio@skills-for-copilot-studio` a rapporté un succès sans erreur.
* [ ] Taper `@` à l'invite liste les quatre sous-agents `@copilot-studio:*`.

## Étapes suivantes

Passez au [Lab 06 — Cloner l'agent dans votre espace de travail](lab-06-clone-agent.md).
