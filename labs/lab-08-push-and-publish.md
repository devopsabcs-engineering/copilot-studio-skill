---
title: Lab 08 — Push and publish
description: Push the locally-authored Hello World topic to the Copilot Studio cloud with @copilot-studio:copilot-studio-manage push, then publish the agent from the portal so the topic becomes invokable in the Test pane.
nav_order: 10
permalink: /labs/lab-08-push-and-publish
---

> 🇫🇷 **[Version française](../fr/labs/lab-08-push-and-publish.md)**

| Duration | Level | Prerequisites |
|---|---|---|
| 10 min | Beginner | Lab 07 complete (Hello World topic exists locally) |

## Overview

`push` and `publish` are two distinct steps and both are required. `push` uploads the new topic to the Copilot Studio cloud as a draft revision; `publish` (from the portal) promotes that draft so the Test pane and any deployed channels can invoke it. Skipping `publish` is the single most common reason the Test pane in [Lab 09](lab-09-test-in-portal.md) does not see the Hello World topic.

## Learning objectives

* Push the local agent to the Copilot Studio cloud as a draft.
* Resolve a `ConcurrencyVersionMismatch` if the push reports one.
* Publish the draft from the portal and confirm the success toast.

## Exercise 8.1 — Push the local agent to the cloud

1. In your `copilot` session, run:

    ```text
    @copilot-studio:copilot-studio-manage push
    ```

2. On first push, the sub-agent may open a browser tab for Entra ID sign-in. Tokens are cached after that.
3. Wait for the sub-agent to report success.

![Copilot CLI invoking @copilot-studio:copilot-studio-manage push and reporting success](../images/lab-08/lab-08-manage-push.png)

> [!CAUTION]
> If the push fails with `ConcurrencyVersionMismatch`, your local row versions are stale. Run `@copilot-studio:copilot-studio-manage pull` first, reconcile any conflicts the pull surfaces, then re-run the push.

## Exercise 8.2 — Switch back to the portal

1. Return to the browser tab you left open in [Lab 03](lab-03-create-blank-agent.md) on the `HelloWorldAgent` edit view.
2. If the tab is closed, browse to [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com), pick the correct environment in the top-right switcher, and reopen the agent.

## Exercise 8.3 — Publish

1. In the top-right of the agent edit view, click **Publish**.
2. The portal runs a build-and-deploy and then displays a success toast.

> [!IMPORTANT]
> `push` creates a **draft** only. The Test pane and any deployed channels invoke the **published** version. If you skip the publish step, [Lab 09](lab-09-test-in-portal.md) will not see the Hello World topic.

![Copilot Studio portal showing the Publish button on the HelloWorldAgent edit view](../images/lab-08/lab-08-portal-publish-button.png)

![Copilot Studio portal showing the publish success toast for HelloWorldAgent](../images/lab-08/lab-08-publish-success-toast.png)

## Verification Checkpoint

Before proceeding, verify:

* [ ] `@copilot-studio:copilot-studio-manage push` reported success in the CLI.
* [ ] The portal **Publish** button reported a success toast.
* [ ] The agent edit view in the portal shows a recent successful publish timestamp.

## Next Steps

Proceed to [Lab 09 — Test in the portal](lab-09-test-in-portal.md).
