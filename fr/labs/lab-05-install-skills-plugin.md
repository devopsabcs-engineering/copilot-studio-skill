---
title: Lab 05 — Installer le plug-in skills-for-copilot-studio
description: Installez le plug-in microsoft/skills-for-copilot-studio dans GitHub Copilot CLI depuis la place de marché, vérifiez que les 31 compétences sont enregistrées, puis pilotez une compétence et un sous-agent de bout en bout sans quitter le terminal.
nav_order: 7
permalink: /fr/labs/lab-05-install-skills-plugin
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/lab-05-install-skills-plugin.md)**

| Durée | Niveau | Prérequis |
|---|---|---|
| 10 min | Débutant | Lab 04 terminé (session `copilot` interactive en cours) |

## Vue d'ensemble

Le plug-in est distribué via la place de marché des plug-ins GitHub Copilot CLI (la même surface qu'utilise Claude Code). Après `/plugin marketplace add` et `/plugin install`, le CLI rapporte `Installed 31 skills`, soit le catalogue complet de compétences fourni par le plug-in. Ces compétences sont regroupées en quatre sous-agents logiques :

| Sous-agent | Objectif |
|---|---|
| `copilot-studio-manage` | Cloner, pousser, tirer, synchroniser le contenu de l'agent entre le YAML local et le cloud Copilot Studio |
| `copilot-studio-author` | Créer et éditer le YAML (rubriques, actions, sources de connaissances, déclencheurs, variables) |
| `copilot-studio-test` | Tester les agents publiés (test ponctuel, suites par lot, analyse d'évaluation) |
| `copilot-studio-advisor` | Conseils de conception, revue d'agent, dépannage |

Comment y accéder dans le CLI `copilot` :

* Les 31 compétences portent `user-invocable: false` dans leurs métadonnées de plug-in. Vous ne tapez pas de commande slash pour appeler une compétence par son nom. Copilot CLI fait correspondre la **description de la compétence** à votre invite en langage naturel et charge la bonne compétence automatiquement.
* Les quatre sous-agents sont explicites. Utilisez la commande slash `/agent` pour ouvrir un sélecteur et épingler la conversation à l'un d'eux, ou référencez le sous-agent par son nom dans votre invite, ou passez `--agent=<nom>` sur la ligne de commande `copilot`.

Les quatre mêmes rôles apparaissent aussi dans le chat VS Code (extension du Lab 02) comme noms d'affichage conviviaux dans le sélecteur d'agents : **Copilot Studio Advisor**, **Copilot Studio Author**, **Copilot Studio Manage**, **Copilot Studio Test**. Le CLI est la surface principale de l'atelier ; le chat VS Code est présenté à la fin comme vérification facultative.

## Objectifs d'apprentissage

* Ajouter la place de marché des plug-ins et installer le plug-in depuis une session `copilot` active.
* Confirmer que les 31 compétences sont enregistrées avec `/skills list`.
* Piloter une compétence via une invite en langage naturel et observer Copilot CLI router automatiquement vers la bonne.
* Épingler l'un des quatre sous-agents avec `/agent` et le laisser exécuter sa compétence intégrée.

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

## Exercice 5.2 — Vérifier que les compétences sont enregistrées (CLI)

1. À l'invite `copilot`, exécutez :

    ```text
    /skills list
    ```

2. Le CLI imprime les 31 compétences fournies par le plug-in, regroupées par les quatre sous-agents (`manage`, `author`, `test`, `advisor`).

3. Pour confirmer que les quatre sous-agents sont également visibles, exécutez :

    ```text
    /agent
    ```

    Le sélecteur liste **Copilot Studio Advisor**, **Copilot Studio Author**, **Copilot Studio Manage** et **Copilot Studio Test** aux côtés des agents intégrés. Appuyez sur `Échap` pour fermer le sélecteur ; vous l'utiliserez à l'Exercice 5.4.

> Remarque : taper un simple `@` à l'invite `copilot` déclenche l'autocomplétion **de chemins de fichiers** (Copilot CLI utilise `@` pour joindre des fichiers, pas pour sélectionner des agents). La sélection d'un sous-agent se fait avec la commande slash `/agent`, l'option de ligne de commande `--agent=<nom>` ou une référence en langage naturel dans une invite.

![CLI Copilot affichant la sortie /skills list avec 31 compétences regroupées par sous-agent](../../images/lab-05/lab-05-skills-list.png)

## Exercice 5.3 — Utiliser une compétence : lister les kinds YAML

Les compétences de ce plug-in ne sont pas invocables par leur nom. Copilot CLI lit la description de chaque compétence et charge la bonne quand votre demande en langage naturel correspond. La compétence `list-kinds` est la preuve la moins coûteuse que le plug-in est bien câblé : elle lit un schéma JSON intégré au plug-in et imprime chaque valeur `kind` de YAML Copilot Studio, regroupée par catégorie. Aucun tenant, aucun agent, aucun appel à l'API Copilot Studio.

1. À l'invite `copilot`, demandez :

    ```text
    Liste tous les kinds disponibles dans le schéma YAML de Copilot Studio
    ```

2. Copilot CLI fait correspondre la requête à la description de la compétence `list-kinds` et charge la compétence. Quand la compétence doit exécuter son script Node intégré (`schema-lookup.bundle.js`), le CLI peut vous demander d'approuver l'appel shell. Choisissez **Yes** pour cette exécution.

3. La réponse est une liste catégorisée de valeurs `kind` YAML regroupées sous des en-têtes tels que **Triggers** (par exemple `OnRecognizedIntent`, `OnConversationStart`), **Actions** (`SendActivity`, `Question`, `SetVariable`), **Dialogs**, **Cards**, **Knowledge Sources** et **Inputs**.

![CLI Copilot exécutant la compétence list-kinds et retournant les valeurs kind YAML catégorisées](../../images/lab-05/lab-05-list-kinds.png)

> Astuce : c'est aussi le moyen le plus rapide de découvrir la valeur de discriminateur dont vous avez besoin quand vous commencez à rédiger des rubriques ou des actions dans les labs suivants. Gardez la compétence en tête comme référence de recherche.

## Exercice 5.4 — Épingler le sous-agent Advisor

Pour un travail plus long, multi-tours, vous pouvez épingler la session à l'un des quatre sous-agents. Copilot Studio Advisor est le plus sûr à essayer en premier : il possède les compétences de recherche de schéma et de validation, et il ne modifie jamais les fichiers YAML par lui-même.

1. À l'invite `copilot`, exécutez :

    ```text
    /agent
    ```

2. Dans le sélecteur, choisissez **Copilot Studio Advisor**. Les messages suivants sont routés vers ce sous-agent jusqu'à ce que vous changiez d'agent ou fermiez la session.

3. Demandez à l'Advisor :

    ```text
    Cherche la définition du schéma SendActivity
    ```

4. L'Advisor appelle sa compétence intégrée `lookup-schema` et retourne la définition de `SendActivity`, y compris les propriétés requises, les propriétés facultatives et tout type lié utile à connaître.

![CLI Copilot avec Copilot Studio Advisor épinglé, retournant la définition du schéma SendActivity](../../images/lab-05/lab-05-advisor-lookup-schema.png)

> Astuce : depuis l'extérieur d'une session interactive, vous pouvez faire la même chose en une seule commande avec `copilot --agent=copilot-studio-advisor --prompt "Look up the SendActivity schema definition"`. Les quatre sous-agents sont adressables par leur slug (`copilot-studio-manage`, `copilot-studio-author`, `copilot-studio-test`, `copilot-studio-advisor`).

## Exercice 5.5 — Facultatif : vérifier les mêmes agents dans le chat VS Code

Si vous avez installé l'extension VS Code dans le [Lab 02](lab-02-install-copilot-studio-extension.md), les quatre mêmes sous-agents apparaissent dans le sélecteur d'agents du chat VS Code sous des noms d'affichage conviviaux. Cette étape est informative ; l'atelier se poursuit dans le CLI `copilot`.

1. Dans VS Code, ouvrez la vue Chat et cliquez sur le sélecteur d'agents (la liste déroulante affichant l'agent actuel).
2. Faites défiler la liste. Vous devriez voir :

    * **Copilot Studio Advisor**
    * **Copilot Studio Author**
    * **Copilot Studio Manage**
    * **Copilot Studio Test**

![Sélecteur d'agents du chat VS Code listant les quatre agents Copilot Studio par nom d'affichage](../../images/lab-05/lab-05-vscode-agent-picker.png)

## Point de vérification

Avant de continuer, vérifiez :

* [ ] `/plugin marketplace add` a rapporté un succès sans erreur.
* [ ] `/plugin install copilot-studio@skills-for-copilot-studio` a rapporté un succès sans erreur.
* [ ] La confirmation d'installation indique `Installed 31 skills. Use /skills list to see them.`
* [ ] `/skills list` imprime les 31 compétences regroupées sous `manage`, `author`, `test` et `advisor`.
* [ ] `/agent` affiche **Copilot Studio Advisor**, **Copilot Studio Author**, **Copilot Studio Manage** et **Copilot Studio Test** dans le sélecteur.
* [ ] Demander à Copilot de lister les kinds disponibles dans le schéma YAML de Copilot Studio a produit une liste catégorisée (la compétence `list-kinds` s'est exécutée).
* [ ] Avec l'Advisor épinglé via `/agent`, demander la définition du schéma SendActivity a retourné le schéma (la compétence `lookup-schema` s'est exécutée à l'intérieur du sous-agent).

## Étapes suivantes

Passez au [Lab 06 — Cloner l'agent dans votre espace de travail](lab-06-clone-agent.md).
