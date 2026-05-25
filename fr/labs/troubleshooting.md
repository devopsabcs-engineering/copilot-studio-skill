---
title: Dépannage
description: Référence symptôme-cause-correctif pour les erreurs les plus courantes rencontrées en complétant les labs du Copilot Studio Skill Workshop.
nav_order: 13
permalink: /fr/labs/troubleshooting
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/troubleshooting.md)**

## Vue d'ensemble

Quand quelque chose échoue en plein lab, parcourez d'abord la colonne symptôme. Chaque ligne renvoie au lab spécifique et à l'issue amont sous-jacente lorsqu'il en existe une.

## Tableau symptôme-cause-correctif

| Symptôme | Cause probable | Correctif |
|---|---|---|
| VS Code Copilot Chat ne voit pas les sous-agents `@copilot-studio:*`. | L'hôte VS Code Copilot Chat embarqué n'injecte pas encore le contexte du hook `SessionStart`. Voir l'[issue #116](https://github.com/microsoft/skills-for-copilot-studio/issues/116) en amont. | Exécutez `copilot` dans le **terminal intégré** de VS Code comme documenté dans le [Lab 04](lab-04-setup-workspace-and-cli.md), pas dans le panneau latéral Copilot Chat. |
| `copilot --version` rapporte `command not found` après `winget install GitHub.Copilot`. | La session de terminal courante utilise le `PATH` d'avant installation. | Fermez le terminal, ouvrez une nouvelle session PowerShell 7+, et relancez `copilot --version`. Si l'échec persiste, utilisez la solution de repli `npm install -g @github/copilot` dans le [Lab 01](lab-01-install-windows-tooling.md). |
| `winget install OpenJS.NodeJS.LTS` installe une version antérieure à 22. | Le cache du gestionnaire de paquets Windows est obsolète ou le pointeur LTS est en retard. | Exécutez `winget upgrade OpenJS.NodeJS.LTS`. Si cela ne vous fait pas passer à 22+, installez directement depuis [https://nodejs.org/](https://nodejs.org/) et relancez `node --version`. |
| `/login` de GitHub Copilot CLI rapporte que votre compte n'est pas habilité. | Votre abonnement GitHub Copilot est manquant ou, si vous êtes géré par une organisation, la stratégie **Copilot CLI** est désactivée dans votre organisation. | Confirmez l'abonnement Copilot dans `https://github.com/settings/copilot`. Si vous êtes géré par une organisation, demandez à un propriétaire d'activer la stratégie Copilot CLI comme documenté dans le [Lab 00](lab-00-prerequisites.md). |
| `clone` ou `push` échoue avec **« Extension not found »**. | L'extension VS Code Copilot Studio n'est pas installée, donc le binaire `LanguageServerHost` qu'elle embarque est indisponible pour le plug-in. | Installez l'extension publiée par Microsoft selon le [Lab 02](lab-02-install-copilot-studio-extension.md). VS Code lui-même n'a pas besoin d'être ouvert, seulement installé. |
| `@copilot-studio:copilot-studio-manage push` rapporte `ConcurrencyVersionMismatch`. | Les versions de ligne locales sont obsolètes par rapport au cloud (quelqu'un ou quelque chose a édité l'agent dans le portail depuis votre dernière synchronisation). | Exécutez d'abord `@copilot-studio:copilot-studio-manage pull`, réconciliez les conflits, puis relancez `push`. |
| Après un `clone` propre, `settings.mcs.yml` rapporte qu'il manque la propriété requise `CdsBotId`. | Bug actif suivi sous l'[issue #155](https://github.com/microsoft/skills-for-copilot-studio/issues/155) en amont ; affecte certaines formes d'agent. | Supprimez le dossier cloné et reclonez. Si l'échec persiste, vérifiez l'issue liée pour l'état actuel. |
| Le sous-agent `author` rapporte qu'un `kind` de rubrique « cannot be found ». | Mauvaise casse dans le YAML — le schéma de Copilot Studio est sensible à la casse. | Demandez à `@copilot-studio:copilot-studio-advisor` de valider le fichier et suggérer le nom `kind` canonique, ou vérifiez le schéma dans [Références](references.md). |
| Une expression Power Fx dans le YAML est rejetée avec une erreur de syntaxe. | Préfixe `=` manquant. Les expressions Power Fx de Copilot Studio doivent commencer par `=`. | Préfixez la valeur de l'expression avec `=`. Par exemple : `=Topic.UserName & " (logged in)"`. |
| `@copilot-studio:copilot-studio-test` échoue à la première invocation. | L'App Registration Azure pour l'autorisation déléguée `CopilotStudio.Copilots.Invoke` n'est pas encore configurée. Seul le sous-agent `test` en a besoin — `clone` et `push` non. | Suivez [SETUP_GUIDE.md étape 5 option A](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md) pour créer une App Registration client public avec l'autorisation déléguée `CopilotStudio.Copilots.Invoke`. |
| Le volet **Test** du portail ne voit pas la rubrique que vous avez rédigée, même après `push`. | `push` crée une révision **brouillon** ; le volet de test invoque la révision **publiée**. | Cliquez sur **Publish** dans le portail comme documenté dans le [Lab 08](lab-08-push-and-publish.md) et attendez le toast de succès, puis retestez. |
| L'inscription Copilot Studio rejette votre compte. | Vous vous êtes connecté avec un compte Microsoft personnel ou une adresse Gmail. Copilot Studio requiert un compte professionnel ou scolaire. | Inscrivez-vous avec un compte professionnel ou scolaire M365, ou utilisez un tenant développeur gratuit Microsoft 365. |

## Où chercher ensuite

Si votre symptôme n'est pas listé, ouvrez ou recherchez les issues amont :

* [Issues `microsoft/skills-for-copilot-studio`](https://github.com/microsoft/skills-for-copilot-studio/issues)
* [Issues `microsoft/vscode-copilotstudio`](https://github.com/microsoft/vscode-copilotstudio/issues)
* [Retours GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
