---
title: Lab 05 — Install the skills-for-copilot-studio plugin
description: Install the microsoft/skills-for-copilot-studio plugin into GitHub Copilot CLI from the marketplace, verify the 31 skills are registered, then drive one skill and one sub-agent end-to-end without leaving the terminal.
nav_order: 7
permalink: /labs/lab-05-install-skills-plugin
---

> 🇫🇷 **[Version française](../fr/labs/lab-05-install-skills-plugin.md)**

| Duration | Level | Prerequisites |
|---|---|---|
| 10 min | Beginner | Lab 04 complete (interactive `copilot` session running) |

## Overview

The plugin is distributed through the GitHub Copilot CLI plugin marketplace (the same surface Claude Code uses). After `/plugin marketplace add` and `/plugin install`, the CLI reports `Installed 31 skills`, which is the full skill catalog the plugin ships with. Those skills are grouped into four logical sub-agents:

| Sub-agent | Purpose |
|---|---|
| `copilot-studio-manage` | Clone, push, pull, sync agent content between local YAML and the Copilot Studio cloud |
| `copilot-studio-author` | Create and edit YAML (topics, actions, knowledge, triggers, variables) |
| `copilot-studio-test` | Test published agents (point-test, batch suites, eval analysis) |
| `copilot-studio-advisor` | Design guidance, agent review, troubleshooting |

How you reach them in the `copilot` CLI:

* The 31 skills carry `user-invocable: false` in their plugin metadata. You do not type a slash command to call a skill by name. Copilot CLI matches the **skill description** against your natural-language prompt and loads the right skill automatically.
* The four sub-agents are explicit. Use the `/agent` slash command to open a picker and pin the conversation to one of them, or reference the agent by name in your prompt, or pass `--agent=<name>` on the `copilot` command line.

The same four roles also surface in VS Code chat (Lab 02 extension) as friendly display names in the agent picker: **Copilot Studio Advisor**, **Copilot Studio Author**, **Copilot Studio Manage**, **Copilot Studio Test**. The CLI is the primary workshop surface; VS Code chat is shown at the end as an optional check.

## Learning objectives

* Add the plugin marketplace and install the plugin from inside an active `copilot` session.
* Confirm the 31 skills are registered with `/skills list`.
* Drive a skill via natural-language prompt and observe Copilot CLI auto-route to the right one.
* Pin one of the four sub-agents with `/agent` and have it run its bundled skill.

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

## Exercise 5.2 — Verify the skills are registered (CLI)

1. At the `copilot` prompt, run:

    ```text
    /skills list
    ```

2. The CLI prints the 31 skills the plugin ships with, grouped by the four sub-agents (`manage`, `author`, `test`, `advisor`).

3. To confirm the four sub-agents are also visible, run:

    ```text
    /agent
    ```

    The picker lists **Copilot Studio Advisor**, **Copilot Studio Author**, **Copilot Studio Manage**, and **Copilot Studio Test** alongside any built-in agents. Press `Esc` to dismiss the picker for now; you will use it in Exercise 5.4.

> Note: typing a bare `@` at the `copilot` prompt triggers **file path** completion (Copilot CLI uses `@` for attaching files, not for selecting agents). Agent selection uses the `/agent` slash command, the `--agent=<name>` command-line flag, or a natural-language reference inside a prompt.

![Copilot CLI showing /skills list output with 31 skills grouped by sub-agent](../images/lab-05/lab-05-skills-list.png)

## Exercise 5.3 — Use a skill: list the YAML kinds

Skills in this plugin are not user-invocable by name. Copilot CLI reads each skill's description and loads the matching one when your natural-language ask lines up. The `list-kinds` skill is the cheapest possible proof the plugin is wired: it reads a JSON schema bundled with the plugin and prints every Copilot Studio YAML `kind` value, grouped by category. No tenant, no agent, no Copilot Studio API call.

1. At the `copilot` prompt, ask:

    ```text
    List all available kinds in the Copilot Studio YAML schema
    ```

2. Copilot CLI matches the request against the `list-kinds` skill description and loads the skill. When the skill needs to run its bundled Node script (`schema-lookup.bundle.js`), the CLI may ask you to approve the shell call. Choose **Yes** for this run.

3. The response is a categorized list of YAML `kind` values grouped under headings such as **Triggers** (for example `OnRecognizedIntent`, `OnConversationStart`), **Actions** (`SendActivity`, `Question`, `SetVariable`), **Dialogs**, **Cards**, **Knowledge Sources**, and **Inputs**.

![Copilot CLI running the list-kinds skill and returning categorized YAML kind values](../images/lab-05/lab-05-list-kinds.png)

> Tip: this is also the fastest way to discover the discriminator value you need when you start authoring topics or actions in later labs. Keep the skill in mind as a reference lookup.

## Exercise 5.4 — Pin the Advisor sub-agent

For longer, multi-turn work you can pin the session to one of the four sub-agents. The Copilot Studio Advisor is the safest one to try first: it owns the schema-lookup and validation skills, and it never edits YAML files on its own.

1. At the `copilot` prompt, run:

    ```text
    /agent
    ```

2. In the picker, select **Copilot Studio Advisor**. Subsequent messages route to that sub-agent until you switch agents or close the session.

3. Ask the Advisor:

    ```text
    Look up the SendActivity schema definition
    ```

4. The Advisor calls its bundled `lookup-schema` skill and returns the `SendActivity` definition, including required properties, optional properties, and any related types worth knowing.

![Copilot CLI with Copilot Studio Advisor pinned, returning the SendActivity schema definition](../images/lab-05/lab-05-advisor-lookup-schema.png)

> Tip: from outside an interactive session you can do the same in one shot with `copilot --agent=copilot-studio-advisor --prompt "Look up the SendActivity schema definition"`. The four sub-agents are addressable by their slug (`copilot-studio-manage`, `copilot-studio-author`, `copilot-studio-test`, `copilot-studio-advisor`).

## Exercise 5.5 — Optional: verify the same agents in VS Code chat

If you installed the VS Code extension in [Lab 02](lab-02-install-copilot-studio-extension.md), the same four sub-agents appear in the VS Code chat agent picker as friendly display names. This step is informational; the workshop continues in the `copilot` CLI.

1. In VS Code, open the Chat view and click the agent picker (the dropdown showing the current agent).
2. Scroll the list. You should see:

    * **Copilot Studio Advisor**
    * **Copilot Studio Author**
    * **Copilot Studio Manage**
    * **Copilot Studio Test**

![VS Code chat agent picker listing the four Copilot Studio agents by display name](../images/lab-05/lab-05-vscode-agent-picker.png)

## Verification Checkpoint

Before proceeding, verify:

* [ ] `/plugin marketplace add` reported success without errors.
* [ ] `/plugin install copilot-studio@skills-for-copilot-studio` reported success without errors.
* [ ] The install confirmation reads `Installed 31 skills. Use /skills list to see them.`
* [ ] `/skills list` prints all 31 skills grouped under `manage`, `author`, `test`, and `advisor`.
* [ ] `/agent` shows **Copilot Studio Advisor**, **Copilot Studio Author**, **Copilot Studio Manage**, and **Copilot Studio Test** in the picker.
* [ ] Asking Copilot to list available kinds in the Copilot Studio YAML schema produced a categorized list (the `list-kinds` skill ran).
* [ ] With the Advisor pinned via `/agent`, asking for the SendActivity schema definition returned the schema (the `lookup-schema` skill ran inside the sub-agent).

## Next Steps

Proceed to [Lab 06 — Clone the agent into your workspace](lab-06-clone-agent.md).
