---
title: Lab 06 — Clone the agent into your workspace
description: Use @copilot-studio:copilot-studio-manage clone to download the HelloWorldAgent YAML into your local workspace, then inspect the canonical folder shape on disk.
nav_order: 8
permalink: /labs/lab-06-clone-agent
---

> 🇫🇷 **[Version française](../fr/labs/lab-06-clone-agent.md)**

| Duration | Level | Prerequisites |
|---|---|---|
| 10 min | Beginner | Lab 03 complete (agent exists in the portal); Lab 05 complete (plugin installed) |

## Overview

`@copilot-studio:copilot-studio-manage clone` walks an interactive sign-in to your tenant, lists your Power Platform environments, and lets you pick an agent to download as YAML. The clone places the agent at `<current-folder>/HelloWorldAgent/` and produces the canonical folder layout the rest of the workshop edits.

## Learning objectives

* Run the `clone` sub-agent from the active `copilot` session.
* Complete the interactive Entra ID sign-in for `clone` (no Azure App Registration is required for clone or push).
* Pick the environment and agent.
* Inspect the cloned folder shape on disk and identify each canonical file.

## Exercise 6.1 — Trigger the clone

1. With your `copilot` session still open in `C:\src\copilot-studio-work`, run:

    ```text
    @copilot-studio:copilot-studio-manage clone
    ```

2. The sub-agent opens a browser tab for Entra ID sign-in. Complete the sign-in.

![Copilot CLI invoking @copilot-studio:copilot-studio-manage clone](../images/lab-06/lab-06-manage-clone.png)

## Exercise 6.2 — Pick the environment and agent

1. After sign-in, the sub-agent lists your Power Platform environments. Pick the one you used in [Lab 03](lab-03-create-blank-agent.md) (for example, `Contoso`).
2. The sub-agent then lists the agents in that environment. Pick `HelloWorldAgent`.
3. The plugin downloads the agent YAML into your workspace.

![Copilot CLI prompting for environment and agent selection during clone](../images/lab-06/lab-06-env-agent-pick.png)

## Exercise 6.3 — Inspect the cloned folder shape

1. In VS Code's Explorer panel, expand the newly-created `HelloWorldAgent` folder. You should see:

    ```text
    HelloWorldAgent/
    ├── agent.mcs.yml                # Top-level agent definition
    ├── settings.mcs.yml             # Display name, model, generative settings
    └── topics/
        ├── Conversation Start.topic.mcs.yml    # Default system topic
        ├── ...                                 # Other default system topics
    ```

2. Open `agent.mcs.yml` to confirm it parses as YAML and references the agent you created in [Lab 03](lab-03-create-blank-agent.md).

![VS Code Explorer showing the cloned HelloWorldAgent folder with agent.mcs.yml open in the editor](../images/lab-06/lab-06-workspace-folder.png)

> [!NOTE]
> Naming convention: every entity uses the `.<kind>.mcs.yml` suffix. Topics live under `topics/`, actions under `actions/`, knowledge under `knowledge/`, and global variables under `variables/`. Each subfolder is created on demand by the `author` sub-agent.

![VS Code editor showing agent.mcs.yml content for HelloWorldAgent](../images/lab-06/lab-06-agent-yml-editor.png)

## Verification Checkpoint

Before proceeding, verify:

* [ ] A `HelloWorldAgent/` folder now exists under `C:\src\copilot-studio-work\`.
* [ ] `HelloWorldAgent/agent.mcs.yml` and `HelloWorldAgent/settings.mcs.yml` exist and parse as YAML.
* [ ] A `HelloWorldAgent/topics/` subfolder exists with at least one default system topic (for example, `Conversation Start.topic.mcs.yml`).

## Next Steps

Proceed to [Lab 07 — Author the Hello World topic](lab-07-author-hello-world-topic.md).
