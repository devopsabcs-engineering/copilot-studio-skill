---
title: Glossary
description: Definitions of the domain terms used across the Copilot Studio Skill Workshop labs, including the two distinct meanings of the word "skill".
nav_order: 14
permalink: /labs/glossary
---

> 🇫🇷 **[Version française](../fr/labs/glossary.md)**

## Overview

This glossary defines the EN-only domain terms used across the workshop. The full EN↔FR translation glossary lives on the French side at [`fr/labs/glossary.md`](../fr/labs/glossary.md) because its primary audience is FR readers reconciling English tooling with French documentation.

## Terms

**Agent.**
A Copilot Studio entity that talks to users through one or more channels. Authored as YAML files under a cloned folder (for example, `HelloWorldAgent/agent.mcs.yml`).

**Topic.**
A unit of conversational logic inside an agent — a trigger plus the actions to run when it fires. Lives at `topics/<Name>.topic.mcs.yml`.

**Action.**
A step that an agent runs as part of a topic. Built-in kinds include `SendActivity`, `Question`, and `SetVariable`. Custom kinds back MCP servers, Power Automate flows, and connectors. Lives at `actions/<Name>.action.mcs.yml`.

**Knowledge source.**
A retrieval-augmented-generation source the agent grounds its replies in — a public URL, a SharePoint site, a Dataverse table, or a custom source. Lives at `knowledge/<Name>.knowledge.mcs.yml`.

**Variable.**
A typed value the agent can read and write across topic invocations. Global variables live at `variables/<Name>.variable.mcs.yml`; topic-scoped variables are inline inside the topic file.

**Trigger.**
The condition that starts a topic. The most common kind is `OnRecognizedIntent`, which fires when the user's message matches one of the topic's `triggerQueries`.

**Skill (in this workshop).**
A plugin capability inside an AI coding tool such as GitHub Copilot CLI or Claude Code. The repository `microsoft/skills-for-copilot-studio` ships several skills (`clone`, `push`, `author`, `add-knowledge`, and so on) that the four `@copilot-studio:*` sub-agents orchestrate.

**Skill (Copilot Studio "Skill", capital S).**
A separate, older Bot Framework feature where one agent calls another agent as a sub-conversation, registered in the portal under Settings → Skills. **This workshop does not use that feature.** It is mentioned here only to disambiguate the word "skill" — see the disambiguation table in the hello-world walkthrough.

**Sub-agent.**
A `@<plugin>:<name>` invocation inside `copilot` that delegates to a specific plugin capability. This workshop uses four: `@copilot-studio:copilot-studio-manage`, `@copilot-studio:copilot-studio-author`, `@copilot-studio:copilot-studio-test`, and `@copilot-studio:copilot-studio-advisor`.

**Plugin.**
A bundle of skills installed into an AI coding tool. The plugin marketplace entry for this workshop is `microsoft/skills-for-copilot-studio`; the installed plugin slug is `copilot-studio`.

**LSP binary.**
The `LanguageServerHost` executable that ships inside the Copilot Studio VS Code extension. The plugin shells out to it for every cloud-sync operation (`clone`, `push`, `pull`).

**Power Platform environment.**
A Microsoft Power Platform isolation boundary that hosts Copilot Studio agents, Power Apps, Power Automate flows, and Dataverse data. Pick one in the portal's top-right environment switcher.

**Clone.**
Download an existing cloud agent into a local folder as YAML. `@copilot-studio:copilot-studio-manage clone` is the workshop's entry point.

**Pull.**
Re-sync your local folder against the latest cloud version of the agent. Use this when `push` fails with `ConcurrencyVersionMismatch`.

**Push.**
Upload local YAML changes to the Copilot Studio cloud as a **draft** revision. The agent does not yet talk in the new shape until you publish.

**Publish.**
Promote the current draft revision so the Test pane and deployed channels invoke it. A required step after every `push` that you want to test.

**Test pane.**
The conversation panel inside the Copilot Studio portal that lets you talk to the published agent without leaving the editor. Opened via the **Test** button in the top-right of an agent edit view.

**Activity map.**
A debugging view inside the Test pane (three-dot menu → **Show activity map when testing**) that shows which trigger, actions, and generative-answers nodes fired in response to a message. The primary way to confirm that retrieval against a knowledge source is actually wired up.

**Adaptive Card.**
A JSON-described UI snippet the agent can return inside a `SendActivity` action. The Copilot Studio schema supports Adaptive Cards v1.6.

**Generative answers.**
Copilot Studio's name for retrieval-augmented generation: the agent grounds its response in attached knowledge sources rather than free-running model output.
