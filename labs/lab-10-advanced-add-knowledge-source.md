---
title: Lab 10 — (Advanced) Add a knowledge source
description: Optional 15-minute extension that uses @copilot-studio:copilot-studio-author to attach a public Microsoft Learn knowledge source to HelloWorldAgent, then re-pushes, republishes, and verifies generative answers in the Test pane.
nav_order: 12
permalink: /labs/lab-10-advanced-add-knowledge-source
---

> 🇫🇷 **[Version française](../fr/labs/lab-10-advanced-add-knowledge-source.md)**

| Duration | Level | Prerequisites |
|---|---|---|
| 15 min | Intermediate (optional) | Lab 09 complete (hello-world end-to-end working) |

## Overview

This lab is **optional**. The hello-world walkthrough is already complete after [Lab 09](lab-09-test-in-portal.md). Use this lab when you want to see retrieval-augmented generation in action without any new infrastructure or auth setup. The same `author` sub-agent that wrote the topic in [Lab 07](lab-07-author-hello-world-topic.md) can attach a knowledge source from a public URL. After re-pushing and republishing, the agent grounds its answers in that source — visible in the Test pane's activity map as a generative-answers node firing against your knowledge source.

## Learning objectives

* Attach a public Microsoft Learn URL as a knowledge source via `@copilot-studio:copilot-studio-author`.
* Re-push and republish the agent so the new knowledge source is live.
* Open the Test pane activity map and identify the generative-answers node fired against your knowledge source.

## Exercise 10.1 — Add the knowledge source

1. In your `copilot` session, run:

    ```text
    @copilot-studio:copilot-studio-author Add a knowledge source pointing to https://learn.microsoft.com/en-us/microsoft-copilot-studio/ named "Copilot Studio Docs"
    ```

2. The sub-agent writes a new file at:

    ```text
    HelloWorldAgent/knowledge/CopilotStudioDocs.knowledge.mcs.yml
    ```

3. Open the file in the editor and confirm it references the public Microsoft Learn URL you provided.

![Copilot CLI invoking @copilot-studio:copilot-studio-author with the Add a knowledge source prompt](../images/lab-10/lab-10-author-knowledge.png)

## Exercise 10.2 — Push and republish

1. Push the change to the cloud:

    ```text
    @copilot-studio:copilot-studio-manage push
    ```

2. Switch to the Copilot Studio portal, open the `HelloWorldAgent` edit view, and click **Publish** again. Wait for the success toast.

> [!IMPORTANT]
> The republish step is required. The knowledge source is only attached to the **published** version of the agent — without republishing, the Test pane runs against the previous version and your new knowledge source has no effect.

## Exercise 10.3 — Test generative answers in the Test pane

1. In the portal, open the **Test** pane.
2. Type a question that the new knowledge source can answer:

    ```text
    What is a topic in Copilot Studio?
    ```

3. The agent now replies with content grounded in the public Microsoft Learn docs instead of replying from training data alone.

## Exercise 10.4 — Inspect the activity map

1. In the Test pane, open the three-dot menu and pick **Show activity map when testing**.
2. Re-send the question.
3. The activity map shows a **Generative answers** node firing against your `Copilot Studio Docs` knowledge source. That is the visible confirmation that retrieval-augmented generation is wired up correctly.

![Copilot Studio Test pane activity map showing a generative-answers node firing against the Copilot Studio Docs knowledge source](../images/lab-10/lab-10-activity-map-generative-answers.png)

## Verification Checkpoint

Before proceeding, verify:

* [ ] `HelloWorldAgent/knowledge/CopilotStudioDocs.knowledge.mcs.yml` exists in your workspace and references the public Microsoft Learn URL.
* [ ] The portal **Publish** button reported a success toast after the second push.
* [ ] The Test pane returns a content-grounded answer to "What is a topic in Copilot Studio?".
* [ ] The activity map shows a **Generative answers** node firing against the `Copilot Studio Docs` knowledge source.

## Next Steps

A natural progression beyond this lab is to add an **action** that calls an MCP server or a Power Automate flow:

```text
@copilot-studio:copilot-studio-author Add an action ...
```

That step introduces external API integration and is intentionally out of scope for this workshop. See [References](references.md) for pointers to the Microsoft sample repositories that walk through MCP-server actions end to end.
