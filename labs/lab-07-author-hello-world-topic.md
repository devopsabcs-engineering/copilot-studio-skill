---
title: Lab 07 — Author the Hello World topic
description: Use @copilot-studio:copilot-studio-author to generate a new YAML topic that triggers on "hello" and replies with a fixed greeting, then optionally validate it with @copilot-studio:copilot-studio-advisor.
nav_order: 9
permalink: /labs/lab-07-author-hello-world-topic
---

> 🇫🇷 **[Version française](../fr/labs/lab-07-author-hello-world-topic.md)**

| Duration | Level | Prerequisites |
|---|---|---|
| 10 min | Beginner | Lab 06 complete (agent cloned into the workspace) |

## Overview

The `author` sub-agent translates a natural-language request into properly-shaped Copilot Studio YAML. Ask it to add a Hello World topic and it writes a new file at `HelloWorldAgent/topics/HelloWorld.topic.mcs.yml` containing an `OnRecognizedIntent` trigger and a `SendActivity` action. The generated YAML follows the schema documented in [`reference/bot.schema.yaml-authoring.json`](https://github.com/microsoft/skills-for-copilot-studio/blob/main/reference/bot.schema.yaml-authoring.json) so you can edit it by hand later.

## Learning objectives

* Author a YAML topic from a natural-language prompt to `@copilot-studio:copilot-studio-author`.
* Open the generated file and identify the `OnRecognizedIntent` trigger and the `SendActivity` action.
* Optionally validate every topic in the agent with `@copilot-studio:copilot-studio-advisor`.

## Exercise 7.1 — Author the topic

1. In your `copilot` session, run:

    ```text
    @copilot-studio:copilot-studio-author Create a new topic called "Hello World" that triggers on the phrases "hello", "hi", and "hello world", and replies with: "Hello, world! I'm a Copilot Studio agent authored from VS Code via the Copilot CLI plugin."
    ```

2. The sub-agent writes a new file at:

    ```text
    HelloWorldAgent/topics/HelloWorld.topic.mcs.yml
    ```

![Copilot CLI invoking @copilot-studio:copilot-studio-author with the Hello World prompt](../images/lab-07/lab-07-author-exchange.png)

## Exercise 7.2 — Inspect the generated YAML

1. Open `HelloWorldAgent/topics/HelloWorld.topic.mcs.yml` in the VS Code editor.
2. Confirm the file shape matches the expected pattern:

    ```yaml
    kind: AdaptiveDialog
    beginDialog:
      kind: OnRecognizedIntent
      id: main
      intent:
        triggerQueries:
          - hello
          - hi there
          - say hello
          - hello world
      actions:
        - kind: SendActivity
          id: sendHello
          activity: "Hello, world! I'm running from a YAML topic authored via GitHub Copilot CLI."
    ```

3. The exact wording of `triggerQueries` and `activity` may differ slightly from the snippet above because the sub-agent rewrites your natural-language request, but the structure (one `OnRecognizedIntent` trigger plus one `SendActivity` action) is the contract.

## Exercise 7.3 — (Optional) Validate every topic with the advisor

1. Still inside the `copilot` session, run:

    ```text
    @copilot-studio:copilot-studio-advisor Validate all topics in my agent
    ```

2. The advisor reports validation diagnostics. Fix any issues it reports before continuing to [Lab 08](lab-08-push-and-publish.md).

> [!TIP]
> If the advisor reports a `kind` name that "cannot be found", that is usually a casing mismatch in the YAML. Ask the advisor to suggest the canonical name, or check the schema linked in the [References](references.md).

## Verification Checkpoint

Before proceeding, verify:

* [ ] `HelloWorldAgent/topics/HelloWorld.topic.mcs.yml` exists in your workspace.
* [ ] The file contains an `OnRecognizedIntent` trigger with `hello` in `triggerQueries`.
* [ ] The file contains exactly one `SendActivity` action whose `activity` is the greeting string.

## Next Steps

Proceed to [Lab 08 — Push and publish](lab-08-push-and-publish.md).
