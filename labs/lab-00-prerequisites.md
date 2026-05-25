---
title: Lab 00 — Prerequisites
description: Provision the accounts and subscriptions you need before installing any tooling — GitHub Copilot, a Microsoft 365 work or school account, and a Power Platform environment with Copilot Studio enabled.
nav_order: 2
permalink: /labs/lab-00-prerequisites
---

> 🇫🇷 **[Version française](../fr/labs/lab-00-prerequisites.md)**

| Duration | Level | Prerequisites |
|---|---|---|
| 15 min | Beginner | A Windows machine with admin rights for `winget` |

## Overview

Every later lab depends on three accounts being live: a GitHub Copilot subscription that grants you GitHub Copilot CLI access, a Microsoft 365 work or school identity, and a Power Platform environment that has Copilot Studio turned on. None of these can be substituted with a personal Microsoft account or a Gmail address — Copilot Studio sign-up rejects both. Provision them now so the tooling labs run uninterrupted.

## Learning objectives

* Confirm your GitHub Copilot subscription is active and that GitHub Copilot CLI usage is permitted for your account.
* Sign up for the Copilot Studio free trial with a work or school account.
* Confirm that a Power Platform environment with Copilot Studio is visible in the portal environment switcher.

## Exercise 0.1 — Confirm your GitHub Copilot subscription

1. Browse to [https://github.com/settings/copilot](https://github.com/settings/copilot) and confirm a Copilot plan is active on your account.
2. If your account is managed by an organization, ask an organization owner to enable the **Copilot CLI** policy under Copilot → Policies. GitHub Copilot CLI is gated by this policy independently of editor access.

![GitHub Copilot subscription settings page showing an active plan](../images/lab-00/lab-00-copilot-subscription.png)

## Exercise 0.2 — Sign up for the Copilot Studio trial

1. Browse to the trial sign-up link: [https://go.microsoft.com/fwlink/?LinkId=2107702](https://go.microsoft.com/fwlink/?LinkId=2107702).
2. Sign in with a **work or school** Microsoft 365 account. Personal Microsoft and Gmail accounts are rejected at this step.
3. Accept the trial. A default Power Platform environment is provisioned for your tenant if one does not already exist.

![Copilot Studio free trial sign-up page](../images/lab-00/lab-00-trial-signup.png)

## Exercise 0.3 — Confirm your Power Platform environment

1. Browse to [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com).
2. Open the environment switcher in the top-right corner.
3. Confirm at least one non-personal environment appears in the list (for example, `Contoso`, your tenant default, or a developer environment). You will return to this switcher in [Lab 03](lab-03-create-blank-agent.md) to create the agent.

![Copilot Studio portal environment switcher showing at least one environment](../images/lab-00/lab-00-env-switcher.png)

## Verification Checkpoint

Before proceeding, verify:

* [ ] `https://github.com/settings/copilot` shows an active Copilot plan.
* [ ] Your organization has enabled the Copilot CLI policy (if your Copilot subscription is org-managed).
* [ ] You signed in to [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com) with a work or school account and at least one environment is visible.

## Next Steps

Proceed to [Lab 01 — Install Windows tooling](lab-01-install-windows-tooling.md).
