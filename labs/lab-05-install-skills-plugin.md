---
title: Lab 05 — Install the skills-for-copilot-studio plugin
description: Install the microsoft/skills-for-copilot-studio plugin into GitHub Copilot CLI from the marketplace, then verify the four @copilot-studio sub-agents are discoverable.
nav_order: 7
permalink: /labs/lab-05-install-skills-plugin
---

> 🇫🇷 **[Version française](../fr/labs/lab-05-install-skills-plugin.md)**

| Duration | Level | Prerequisites |
|---|---|---|
| 5 min | Beginner | Lab 04 complete (interactive `copilot` session running) |

## Overview

The plugin is distributed through the GitHub Copilot CLI plugin marketplace (the same surface Claude Code uses). After `/plugin marketplace add` and `/plugin install`, four sub-agents appear in `@`-completion:

| Sub-agent | Purpose |
|---|---|
| `@copilot-studio:copilot-studio-manage` | Clone, push, pull, sync agent content between local YAML and the Copilot Studio cloud |
| `@copilot-studio:copilot-studio-author` | Create and edit YAML (topics, actions, knowledge, triggers, variables) |
| `@copilot-studio:copilot-studio-test` | Test published agents — point-test, batch suites, eval analysis |
| `@copilot-studio:copilot-studio-advisor` | Design guidance, agent review, troubleshooting |

This lab uses `manage` and `author`; `test` is mentioned as an alternative path in [Lab 09](lab-09-test-in-portal.md); `advisor` is shown as an optional validation step in [Lab 07](lab-07-author-hello-world-topic.md).

## Learning objectives

* Add the plugin marketplace and install the plugin from inside an active `copilot` session.
* Confirm the four `@copilot-studio:*` sub-agents appear in `@`-completion.

## Exercise 5.1 — Add the marketplace and install the plugin

1. With your `copilot` session from [Lab 04](lab-04-setup-workspace-and-cli.md) still open, run:

    ```text
    /plugin marketplace add microsoft/skills-for-copilot-studio
    ```

2. Then install the plugin:

    ```text
    /plugin install copilot-studio@skills-for-copilot-studio
    ```

3. `copilot` reports a successful install. The plugin slug is `copilot-studio`; the marketplace slug is `skills-for-copilot-studio`.

![Copilot CLI showing the plugin marketplace add and plugin install commands succeeding](../images/lab-05/lab-05-plugin-install.png)

## Exercise 5.2 — Verify the sub-agents are discoverable

1. At the `copilot` prompt, type a single `@` character.
2. The autocomplete dropdown shows the four sub-agents:

    * `@copilot-studio:copilot-studio-manage`
    * `@copilot-studio:copilot-studio-author`
    * `@copilot-studio:copilot-studio-test`
    * `@copilot-studio:copilot-studio-advisor`

![Copilot CLI @ autocomplete listing the four copilot-studio sub-agents](../images/lab-05/lab-05-subagent-autocomplete.png)

## Verification Checkpoint

Before proceeding, verify:

* [ ] `/plugin marketplace add` reported success without errors.
* [ ] `/plugin install copilot-studio@skills-for-copilot-studio` reported success without errors.
* [ ] Typing `@` at the prompt lists all four `@copilot-studio:*` sub-agents.

## Next Steps

Proceed to [Lab 06 — Clone the agent into your workspace](lab-06-clone-agent.md).
