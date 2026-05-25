---
title: Lab 09 — Test in the portal
description: Open the Copilot Studio portal Test pane, send "hello" to the published agent, and confirm it replies with the greeting from your authored topic.
nav_order: 11
permalink: /labs/lab-09-test-in-portal
---

> 🇫🇷 **[Version française](../fr/labs/lab-09-test-in-portal.md)**

| Duration | Level | Prerequisites |
|---|---|---|
| 5 min | Beginner | Lab 08 complete (push and publish succeeded) |

## Overview

The portal's built-in **Test** pane is the fastest way to confirm the topic works. Click **Test**, type `hello`, and the agent replies with the greeting you authored in [Lab 07](lab-07-author-hello-world-topic.md). An alternative CLI-based test path exists via `@copilot-studio:copilot-studio-test`, but it requires an Azure App Registration that is out of scope for this workshop; the portal Test pane needs no extra setup.

## Learning objectives

* Open the Test pane in the Copilot Studio portal.
* Send `hello` and see the expected reply.
* Identify the CLI-based test alternative and the App Registration prerequisite that gates it.

## Exercise 9.1 — Open the Test pane

1. In the Copilot Studio portal, on the `HelloWorldAgent` edit view, click **Test** in the top-right corner.
2. The Test pane opens as a side panel with a conversation input box.

![Copilot Studio portal Test pane open on the right side of the HelloWorldAgent edit view](../images/lab-09/lab-09-test-pane-open.png)

## Exercise 9.2 — Send "hello" and confirm the reply

1. In the Test pane input box, type:

    ```text
    hello
    ```

2. Press **Enter**.
3. The agent replies with the greeting from your topic:

    ```text
    Hello, world! I'm a Copilot Studio agent authored from VS Code via the Copilot CLI plugin.
    ```

![Copilot Studio Test pane showing the hello prompt and the agent reply](../images/lab-09/lab-09-test-pane-hello-reply.png)

## Exercise 9.3 — (Optional) Test from the CLI instead

1. The CLI path uses `@copilot-studio:copilot-studio-test`:

    ```text
    @copilot-studio:copilot-studio-test Send "hello" to the published agent
    ```

2. The first invocation of `test` requires an Azure App Registration configured with the `CopilotStudio.Copilots.Invoke` delegated permission. Follow [SETUP_GUIDE.md Step 5 Option A](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md) to set it up.

> [!NOTE]
> `clone` and `push` use the LSP binary directly and do not require any App Registration. Only the `test` sub-agent needs the `CopilotStudio.Copilots.Invoke` permission because it acts as an OBO (on-behalf-of) caller of the published agent.

![Copilot Studio Test pane showing the agent reply with the activity map open](../images/lab-09/lab-09-activity-map.png)

## Verification Checkpoint

Before proceeding, verify:

* [ ] The Test pane is open on the `HelloWorldAgent` edit view.
* [ ] Sending `hello` produces the greeting reply from your topic.
* [ ] The reply text matches the `activity:` string in `HelloWorldAgent/topics/HelloWorld.topic.mcs.yml`.

## Next Steps

You completed the hello-world walkthrough. Continue to [Lab 10 — (Advanced) Add a knowledge source](lab-10-advanced-add-knowledge-source.md) for an optional 15-minute extension that grounds the agent in Microsoft Learn content.
