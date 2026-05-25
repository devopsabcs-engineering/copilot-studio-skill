---
title: Lab 00 — Prérequis
description: Provisionnez les comptes et abonnements nécessaires avant d'installer le moindre outil — GitHub Copilot, un compte professionnel ou scolaire Microsoft 365, et un environnement Power Platform avec Copilot Studio activé.
nav_order: 2
permalink: /fr/labs/lab-00-prerequisites
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/lab-00-prerequisites.md)**

| Durée | Niveau | Prérequis |
|---|---|---|
| 15 min | Débutant | Une machine Windows avec droits d'administration pour `winget` |

## Vue d'ensemble

Chaque lab ultérieur dépend de trois comptes actifs : un abonnement GitHub Copilot qui vous donne accès à GitHub Copilot CLI, une identité professionnelle ou scolaire Microsoft 365, et un environnement Power Platform où Copilot Studio est activé. Aucun de ces trois ne peut être remplacé par un compte Microsoft personnel ou une adresse Gmail — l'inscription à Copilot Studio rejette les deux. Provisionnez-les maintenant pour que les labs d'outillage s'enchaînent sans interruption.

## Objectifs d'apprentissage

* Confirmer que votre abonnement GitHub Copilot est actif et que l'usage de GitHub Copilot CLI est autorisé pour votre compte.
* Vous inscrire à l'essai gratuit Copilot Studio avec un compte professionnel ou scolaire.
* Confirmer qu'un environnement Power Platform avec Copilot Studio est visible dans le sélecteur d'environnement du portail.

## Exercice 0.1 — Confirmer votre abonnement GitHub Copilot

1. Ouvrez [https://github.com/settings/copilot](https://github.com/settings/copilot) et confirmez qu'un plan Copilot est actif sur votre compte.
2. Si votre compte est géré par une organisation, demandez à un propriétaire de l'organisation d'activer la stratégie **Copilot CLI** sous Copilot → Stratégies. GitHub Copilot CLI est conditionné par cette stratégie, indépendamment de l'accès à l'éditeur.

![Page des paramètres d'abonnement GitHub Copilot affichant un plan actif](../../images/lab-00/lab-00-copilot-subscription.png)

## Exercice 0.2 — S'inscrire à l'essai Copilot Studio

1. Ouvrez le lien d'inscription à l'essai : [https://go.microsoft.com/fwlink/?LinkId=2107702](https://go.microsoft.com/fwlink/?LinkId=2107702).
2. Connectez-vous avec un compte **professionnel ou scolaire** Microsoft 365. Les comptes Microsoft personnels et Gmail sont rejetés à cette étape.
3. Acceptez l'essai. Un environnement Power Platform par défaut est provisionné pour votre tenant s'il n'en existe pas déjà un.

![Page d'inscription à l'essai gratuit Copilot Studio](../../images/lab-00/lab-00-trial-signup-fr.png)

## Exercice 0.3 — Confirmer votre environnement Power Platform

1. Ouvrez [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com).
2. Ouvrez le sélecteur d'environnement en haut à droite.
3. Confirmez qu'au moins un environnement non personnel apparaît dans la liste (par exemple `Contoso`, l'environnement par défaut de votre tenant ou un environnement de développement). Vous reviendrez sur ce sélecteur dans le [Lab 03](lab-03-create-blank-agent.md) pour créer l'agent.

![Sélecteur d'environnement du portail Copilot Studio affichant au moins un environnement](../../images/lab-00/lab-00-env-switcher-fr.png)

## Point de vérification

Avant de continuer, vérifiez :

* [ ] `https://github.com/settings/copilot` affiche un plan Copilot actif.
* [ ] Votre organisation a activé la stratégie Copilot CLI (si votre abonnement Copilot est géré par l'organisation).
* [ ] Vous vous êtes connecté à [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com) avec un compte professionnel ou scolaire et au moins un environnement est visible.

## Étapes suivantes

Passez au [Lab 01 — Installer l'outillage Windows](lab-01-install-windows-tooling.md).
