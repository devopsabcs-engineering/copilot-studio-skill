---
title: Lab 03 — Créer votre premier agent vide dans le portail
description: Créez un agent Copilot Studio vide nommé HelloWorldAgent dans le portail afin que les labs suivants puissent le cloner dans un espace de travail local — le plug-in clone des agents existants et ne peut pas en amorcer un à partir de rien.
nav_order: 5
permalink: /fr/labs/lab-03-create-blank-agent
lang: fr
nav_exclude: true
---

> 🇬🇧 **[English version](../../labs/lab-03-create-blank-agent.md)**

| Durée | Niveau | Prérequis |
|---|---|---|
| 10 min | Débutant | Lab 00 terminé ; accès au portail Copilot Studio |

## Vue d'ensemble

Le plug-in `skills-for-copilot-studio` opère sur des agents cloud existants — il peut cloner, pousser, tirer et éditer, mais il n'amorce pas un agent neuf à partir d'un environnement vide. Créez d'abord cet agent initial dans le portail. Nommez-le `HelloWorldAgent` pour que le nom de dossier que le plug-in crée pendant le Lab 06 corresponde au texte du lab à l'identique.

## Objectifs d'apprentissage

* Choisir le bon environnement Power Platform dans le sélecteur d'environnement du portail.
* Créer un agent vide nommé `HelloWorldAgent`.
* Confirmer que le nouvel agent apparaît dans la liste Agents et s'ouvre proprement dans la vue d'édition du portail.

## Exercice 3.1 — Choisir l'environnement cible

1. Ouvrez [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com).
2. En haut à droite, ouvrez le sélecteur d'environnement.
3. Choisissez l'environnement qui doit héberger l'agent de l'atelier (par exemple `Contoso`, votre environnement d'essai par défaut, ou un environnement de développement dédié).

![Portail Copilot Studio avec le sélecteur d'environnement ouvert](../../images/lab-03/lab-03-env-switcher-fr.png)

## Exercice 3.2 — Créer l'agent vide

1. Depuis la liste **Agents**, cliquez sur **Create blank agent**. Si la liste est vide, le bouton apparaît sous la forme d'une grande carte d'état vide.
2. Dans la boîte de dialogue de création, définissez le nom sur :

    ```text
    HelloWorldAgent
    ```

3. Acceptez les valeurs par défaut pour la description, les instructions et les autres champs. Vous remplacerez le corps de l'agent via YAML dans les labs suivants.
4. Cliquez sur **Create**.

![Boîte de dialogue Create blank agent avec HelloWorldAgent saisi comme nom](../../images/lab-03/lab-03-create-blank-agent-fr.png)

## Exercice 3.3 — Confirmer que l'agent s'est ouvert

1. Après la création, le portail redirige vers la vue d'édition de l'agent `HelloWorldAgent`.
2. Laissez l'onglet du navigateur ouvert — vous y reviendrez dans le [Lab 08](lab-08-push-and-publish.md) pour publier, puis dans le [Lab 09](lab-09-test-in-portal.md) pour tester.

![Vue d'édition HelloWorldAgent dans le portail Copilot Studio immédiatement après la création](../../images/lab-03/lab-03-agent-edit-view-fr.png)

## Point de vérification

Avant de continuer, vérifiez :

* [ ] Le sélecteur d'environnement affiche l'environnement que vous comptez utiliser pour le reste de l'atelier.
* [ ] `HelloWorldAgent` apparaît dans la liste **Agents** de cet environnement.
* [ ] La vue d'édition de `HelloWorldAgent` se charge sans erreur.

## Étapes suivantes

Passez au [Lab 04 — Préparer l'espace de travail local et lancer Copilot CLI](lab-04-setup-workspace-and-cli.md).
