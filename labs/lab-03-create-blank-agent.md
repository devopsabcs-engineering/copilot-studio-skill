---
title: Lab 03 — Create your first blank agent in the portal
description: Create a blank Copilot Studio agent named HelloWorldAgent in the portal so subsequent labs can clone it into a local workspace — the plugin clones existing agents and cannot bootstrap one from nothing.
nav_order: 5
permalink: /labs/lab-03-create-blank-agent
---

> 🇫🇷 **[Version française](../fr/labs/lab-03-create-blank-agent.md)**

| Duration | Level | Prerequisites |
|---|---|---|
| 10 min | Beginner | Lab 00 complete; access to the Copilot Studio portal |

## Overview

The `skills-for-copilot-studio` plugin operates on existing cloud agents — it can clone, push, pull, and edit, but it does not bootstrap a brand-new agent from an empty environment. Create that initial agent in the portal first. Name it `HelloWorldAgent` so the folder name the plugin creates during Lab 06 matches the lab text verbatim.

## Learning objectives

* Pick the right Power Platform environment in the portal environment switcher.
* Create a blank agent named `HelloWorldAgent`.
* Confirm the new agent appears in the Agents list and opens cleanly in the portal edit view.

## Exercise 3.1 — Pick the target environment

1. Browse to [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com).
2. In the top-right corner, open the environment switcher.
3. Pick the environment you want to host the workshop agent (for example, `Contoso`, your default trial environment, or a dedicated developer environment).

![Copilot Studio portal with environment switcher open](../images/lab-03/lab-03-env-switcher.png)

## Exercise 3.2 — Create the blank agent

1. From the **Agents** list, click **Create blank agent**. If the list is empty, the button appears as a large empty-state card.
2. In the create dialog, set the name to:

    ```text
    HelloWorldAgent
    ```

3. Accept the defaults for description, instructions, and other fields. You will replace the agent body via YAML in later labs.
4. Click **Create**.

![Create blank agent dialog with HelloWorldAgent typed as the name](../images/lab-03/lab-03-create-blank-agent.png)

## Exercise 3.3 — Confirm the agent opened

1. After creation, the portal redirects to the agent edit view for `HelloWorldAgent`.
2. Leave the browser tab open — you will return to it in [Lab 08](lab-08-push-and-publish.md) to publish, and again in [Lab 09](lab-09-test-in-portal.md) to test.

![HelloWorldAgent edit view in the Copilot Studio portal immediately after creation](../images/lab-03/lab-03-agent-edit-view.png)

## Verification Checkpoint

Before proceeding, verify:

* [ ] The environment switcher shows the environment you intend to use for the rest of the workshop.
* [ ] `HelloWorldAgent` appears in the **Agents** list for that environment.
* [ ] The agent edit view for `HelloWorldAgent` loads without errors.

## Next Steps

Proceed to [Lab 04 — Set up local workspace and launch Copilot CLI](lab-04-setup-workspace-and-cli.md).
