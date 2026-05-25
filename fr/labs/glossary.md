---
title: Glossaire
description: Définitions des termes du domaine utilisés dans tous les labs du Copilot Studio Skill Workshop, plus le glossaire de traduction complet EN↔FR avec les deux sens distincts du mot « skill ».
nav_order: 14
permalink: /fr/labs/glossary
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/glossary.md)**

## Vue d'ensemble

Ce glossaire définit les termes du domaine utilisés dans tout l'atelier en français, puis fournit le tableau complet de traduction EN↔FR. La version anglaise du glossaire vit côté EN à [`labs/glossary.md`](../../labs/glossary.md) ; cette page-ci est canonique pour les lecteurs francophones qui réconcilient l'outillage en anglais avec la documentation en français.

## Glossaire de traduction EN↔FR

| Anglais (UI / docs Microsoft) | Français (UI / docs Microsoft fr-fr) | Note de traduction |
|---|---|---|
| Agent | Agent | Conservé tel quel (l'UI fr-fr utilise « Agent »). |
| Topic | Rubrique | UI fr-fr de Copilot Studio. **Ne pas** utiliser « sujet ». |
| Action | Action | Identique. |
| Knowledge source | Source de connaissances | UI fr-fr. |
| Variable | Variable | Identique. |
| Trigger | Déclencheur | « Phrase déclencheur » pour `triggerQueries` / `triggerPhrases`. |
| Skill (sens de cet atelier) | Skill | Conservé en anglais comme nom propre du concept de plug-in GitHub Copilot CLI. |
| Skill (Bot Framework, S majuscule) | Compétence (Bot Framework) | Traduction officielle Microsoft pour la fonctionnalité historique Bot Framework. Hors périmètre de cet atelier. |
| Sub-agent | Sous-agent | Composé avec trait d'union. |
| Plugin | Plug-in | Avec trait d'union (norme fr-fr). |
| LSP binary | Binaire LSP | LSP conservé comme acronyme. |
| Power Platform environment | Environnement Power Platform | « Power Platform » conservé comme nom de produit. |
| Clone | Cloner / Clone | Verbe « cloner » ; nom « clone ». |
| Pull | Tirer / Pull | Conservé en anglais dans les blocs de code ; verbe « tirer » dans la prose. |
| Push | Pousser / Push | Conservé en anglais dans les blocs de code ; verbe « pousser » dans la prose. |
| Publish | Publier / Publication | UI fr-fr du portail. |
| Test pane | Volet de test | UI fr-fr. |
| Activity map | Carte d'activité | UI fr-fr. |
| Adaptive Card | Carte adaptative | Traduction officielle Microsoft. |
| Generative answers | Réponses génératives | UI fr-fr. |
| Tenant | Tenant | Conservé en anglais (l'usage Microsoft fr-fr garde « tenant »). |
| Work or school account | Compte professionnel ou scolaire | Formulation officielle Microsoft fr-fr. |
| Repository / Repo | Dépôt | « Repo » conservé dans les contextes informels GitHub. |
| Fork | Fork / Forker | Conservé en anglais. |
| Frontmatter | Frontmatter | Conservé en anglais (terme Jekyll / Markdown). |
| Slash command | Commande slash | « Slash » conservé. |
| Handoff | Transfert / Passage de relais | « Transfert » dans le contexte conversationnel. |
| Plugin marketplace | Place de marché des plug-ins | Composé. |
| Login flow | Flux de connexion | UI fr-fr. |

## Termes du domaine

**Agent.**
Une entité Copilot Studio qui parle aux utilisateurs via un ou plusieurs canaux. Rédigée sous forme de fichiers YAML sous un dossier cloné (par exemple, `HelloWorldAgent/agent.mcs.yml`).

**Rubrique (Topic).**
Une unité de logique conversationnelle à l'intérieur d'un agent — un déclencheur plus les actions à exécuter quand il se déclenche. Vit à `topics/<Nom>.topic.mcs.yml`.

**Action.**
Une étape qu'un agent exécute dans le cadre d'une rubrique. Les types intégrés incluent `SendActivity`, `Question`, et `SetVariable`. Les types personnalisés soutiennent les serveurs MCP, les flux Power Automate, et les connecteurs. Vit à `actions/<Nom>.action.mcs.yml`.

**Source de connaissances (Knowledge source).**
Une source de génération augmentée par récupération dans laquelle l'agent ancre ses réponses — une URL publique, un site SharePoint, une table Dataverse, ou une source personnalisée. Vit à `knowledge/<Nom>.knowledge.mcs.yml`.

**Variable.**
Une valeur typée que l'agent peut lire et écrire à travers les invocations de rubrique. Les variables globales vivent à `variables/<Nom>.variable.mcs.yml` ; les variables limitées à une rubrique sont inline dans le fichier de la rubrique.

**Déclencheur (Trigger).**
La condition qui démarre une rubrique. Le type le plus courant est `OnRecognizedIntent`, qui se déclenche quand le message de l'utilisateur correspond à l'un des `triggerQueries` de la rubrique.

**Skill (au sens de cet atelier).**
Une capacité de plug-in à l'intérieur d'un outil de codage IA tel que GitHub Copilot CLI ou Claude Code. Le dépôt `microsoft/skills-for-copilot-studio` livre plusieurs skills (`clone`, `push`, `author`, `add-knowledge`, et ainsi de suite) que les quatre sous-agents `@copilot-studio:*` orchestrent.

**Compétence (Skill Copilot Studio, S majuscule).**
Une fonctionnalité Bot Framework distincte et plus ancienne où un agent appelle un autre agent comme sous-conversation, enregistrée dans le portail sous Settings → Skills. **Cet atelier n'utilise pas cette fonctionnalité.** Elle est mentionnée ici uniquement pour désambiguïser le mot « skill » — voir le tableau de désambiguïsation dans le parcours hello-world.

**Sous-agent (Sub-agent).**
Une invocation `@<plug-in>:<nom>` à l'intérieur de `copilot` qui délègue à une capacité de plug-in spécifique. Cet atelier en utilise quatre : `@copilot-studio:copilot-studio-manage`, `@copilot-studio:copilot-studio-author`, `@copilot-studio:copilot-studio-test`, et `@copilot-studio:copilot-studio-advisor`.

**Plug-in.**
Un paquet de skills installé dans un outil de codage IA. L'entrée de la place de marché des plug-ins pour cet atelier est `microsoft/skills-for-copilot-studio` ; le slug du plug-in installé est `copilot-studio`.

**Binaire LSP.**
L'exécutable `LanguageServerHost` qui est livré à l'intérieur de l'extension VS Code Copilot Studio. Le plug-in shellote vers lui pour chaque opération de synchronisation cloud (`clone`, `push`, `pull`).

**Environnement Power Platform.**
Une frontière d'isolation Microsoft Power Platform qui héberge les agents Copilot Studio, les Power Apps, les flux Power Automate, et les données Dataverse. Choisissez-en un dans le sélecteur d'environnement en haut à droite du portail.

**Clone.**
Télécharger un agent cloud existant dans un dossier local sous forme de YAML. `@copilot-studio:copilot-studio-manage clone` est le point d'entrée de l'atelier.

**Pull.**
Resynchroniser votre dossier local avec la version cloud la plus récente de l'agent. Utilisez-le quand `push` échoue avec `ConcurrencyVersionMismatch`.

**Push.**
Téléverser les modifications YAML locales vers le cloud Copilot Studio sous forme de révision **brouillon**. L'agent ne parle pas encore dans la nouvelle forme tant que vous n'avez pas publié.

**Publier (Publish).**
Promouvoir la révision brouillon courante afin que le volet de test et les canaux déployés l'invoquent. Une étape requise après chaque `push` que vous voulez tester.

**Volet de test (Test pane).**
Le panneau de conversation à l'intérieur du portail Copilot Studio qui vous permet de parler à l'agent publié sans quitter l'éditeur. Ouvert via le bouton **Test** en haut à droite d'une vue d'édition d'agent.

**Carte d'activité (Activity map).**
Une vue de débogage à l'intérieur du volet de test (menu à trois points → **Show activity map when testing**) qui affiche quel déclencheur, quelles actions, et quels nœuds de réponses génératives se sont déclenchés en réponse à un message. La façon principale de confirmer que la récupération contre une source de connaissances est réellement câblée.

**Carte adaptative (Adaptive Card).**
Un fragment d'UI décrit en JSON que l'agent peut renvoyer à l'intérieur d'une action `SendActivity`. Le schéma de Copilot Studio prend en charge les cartes adaptatives v1.6.

**Réponses génératives (Generative answers).**
Le nom donné par Copilot Studio à la génération augmentée par récupération : l'agent ancre sa réponse dans les sources de connaissances attachées plutôt que dans une sortie de modèle libre.
