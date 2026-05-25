<!-- markdownlint-disable-file -->
# Task Research: Copilot Studio Agent — Hello World via `microsoft/skills-for-copilot-studio` + Copilot CLI in VS Code

A fully-documented, beginner-friendly walkthrough that takes a developer from an empty VS Code workspace on Windows to a working Microsoft Copilot Studio agent — authored locally as YAML using the [`microsoft/skills-for-copilot-studio`](https://github.com/microsoft/skills-for-copilot-studio) plugin running inside **GitHub Copilot CLI** — followed by a clearly-scoped "more advanced" next step.

## Task Implementation Requests

* Install all prerequisites (Node.js, GitHub Copilot CLI, Copilot Studio VS Code Extension) on Windows.
* Install the `microsoft/skills-for-copilot-studio` plugin into GitHub Copilot CLI.
* Create one blank Copilot Studio agent in the portal (the plugin clones an existing agent — it does not create one).
* Clone that agent to a local VS Code workspace.
* Use the plugin's authoring sub-agent to add a "Hello World" topic.
* Push the change back to Copilot Studio cloud.
* Publish in the portal and test in the agent's Test pane.
* Document a single "next step" that adds real capability (knowledge source from a public URL).

## Scope and Success Criteria

* **In scope:** local dev setup on Windows, plugin install, end-to-end hello-world (clone → author → push → publish → test), one advanced extension (add a knowledge source).
* **Out of scope:** building a Bot Framework Skill, building an MCP server, deploying to Azure, custom auth flows, multi-agent orchestration, production publishing/governance.
* **Assumptions (verified during research):**
  * The user has a Microsoft 365 tenant + Power Platform environment with Copilot Studio available (their screenshot confirms an environment named "Contoso" at `https://copilotstudio.microsoft.com/environments/<envId>/bots`).
  * The user has a **work or school account** (personal Microsoft / Gmail accounts are rejected by Copilot Studio sign-up).
  * The user has admin rights on their Windows machine to `winget install` and run PowerShell 6+.
  * The user has an active **GitHub Copilot subscription** (required to run GitHub Copilot CLI).
* **Success criteria:**
  * Every command is copy-pasteable and verified against the official README/SETUP_GUIDE.
  * A beginner can reach a working agent that replies "Hello World" in under 30 minutes (excluding subscription provisioning).
  * One recommended path is selected; alternatives retained with explicit rejection rationale.
  * The advanced extension is concrete (named sub-agent command, expected file change, why it's a natural next step).

## Critical Context — Read This First

The phrase "skill" in this workflow has **two different meanings**. Reconciling them up front prevents the most common beginner confusion:

| Meaning | Refers to | Used by |
|---|---|---|
| **AI-coding-tool "skill"** | A plugin capability inside Claude Code / GitHub Copilot CLI (analogous to a Claude Code Skill) | The repo `microsoft/skills-for-copilot-studio` and this walkthrough |
| **Copilot Studio "Skill"** (capital S) | A legacy Bot Framework feature where one agent calls another agent as a sub-conversation, registered via Settings → Skills | A *different* class of project (e.g. `microsoft/Agents/samples/dotnet/copilotstudio-skill`) |

**This walkthrough uses the first meaning.** The plugin edits the Copilot Studio agent itself (its YAML topics/actions/knowledge) — it does **not** build a Bot Framework Skill that you register inside another agent. There is no local server, no port, no devtunnel, no manifest URL to paste. All "running" happens in Copilot Studio's cloud after `push` + `publish`.

If the user later wants the *other* kind of skill (one agent calling another), see Alternatives Considered → "Bot Framework Skill route".

## Outline

1. Provision prerequisites (GitHub Copilot subscription, Copilot Studio trial, Power Platform environment).
2. Install Windows tooling (Node 22+, PowerShell 6+, GitHub Copilot CLI, Copilot Studio VS Code Extension).
3. Create the **one** blank Copilot Studio agent that the plugin will clone.
4. Install the plugin in GitHub Copilot CLI.
5. Clone the agent into a local VS Code workspace.
6. Use `@copilot-studio:copilot-studio-author` to add a Hello World topic.
7. Push, publish, test.
8. Advanced extension: add a knowledge source from a public URL.

## Potential Next Research

* Verify whether [issue #116](https://github.com/microsoft/skills-for-copilot-studio/issues/116) (VS Code Copilot Chat embedded host parity) has been resolved — if yes, the user can stay inside VS Code Chat instead of opening a terminal session.
  * Reasoning: would simplify the "stay in VS Code" experience by removing the terminal hop.
  * Reference: https://github.com/microsoft/skills-for-copilot-studio/issues/116
* Walk the Azure App Registration setup for `CopilotStudio.Copilots.Invoke` (required to use `@copilot-studio:copilot-studio-test` for point-test invocation from the CLI).
  * Reasoning: the in-CLI test step is the most friction-prone moment; first-run blocks on App Registration setup. Detailed screenshots would help.
  * Reference: [SETUP_GUIDE.md](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md) Step 5 Option A.
* Confirm minimum Power Platform environment role (Environment Maker vs System Administrator) for the browser-based `clone` / `push` sign-in.
  * Reasoning: needed for users in tenants where their role is unclear.
* Investigate the `add-action` sub-skill — how to wire an MCP-server-backed action or a custom connector action into a YAML-authored agent.
  * Reasoning: natural step beyond "add a knowledge source"; would extend the advanced section.

## Research Executed

### File Analysis

(N/A — local workspace was empty at research start; all evidence comes from the external repo and Microsoft Learn.)

### External Research

* `github_repo` + `fetch_webpage`: https://github.com/microsoft/skills-for-copilot-studio (README, SETUP_GUIDE.md, CONTRIBUTING.md, plugin.json, sub-agent/skill listings, issues).
  * Confirmed plugin nature, four sub-agents, exact slash commands, prerequisites, hello-world flow, troubleshooting table, eval framework.
  * Source: [README](https://github.com/microsoft/skills-for-copilot-studio), [SETUP_GUIDE](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md).
* `fetch_webpage`: https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli and `/copilot/how-tos/set-up/install-copilot-cli`.
  * Confirmed `winget install GitHub.Copilot` and `npm install -g @github/copilot`, PowerShell 6+ requirement on Windows, Node 22+ for npm install, `/login` for interactive auth, `COPILOT_GITHUB_TOKEN` for non-interactive.
* `fetch_webpage`: Microsoft Learn pages for Copilot Studio (`configuration-add-skills`, `advanced-use-skills`, `agent-extend-action-mcp`, `requirements-licensing-subscriptions`, `authoring-test-bot`, `authoring-review-activity`).
  * Confirmed: the word "Skill" in the portal UI means the Bot Framework feature (separate path); Copilot Studio is SaaS and cannot reach `localhost`; free trial requires work/school account; Environment Maker role is typically sufficient.
* GitHub issues: [#116 — VS Code Copilot Chat host not yet at parity](https://github.com/microsoft/skills-for-copilot-studio/issues/116), [#155 — clone-then-push `CdsBotId` regression](https://github.com/microsoft/skills-for-copilot-studio/issues/155).

### Project Conventions

* Conventions referenced: `.copilot-tracking/**` is exempt from `.mega-linter.yml`; research files include `<!-- markdownlint-disable-file -->`.
* Instructions followed: `.github/instructions/shared/hve-core-location.instructions.md` (fallback paths), Task Researcher mode (research-only, write only into `.copilot-tracking/research/`).

## Key Discoveries

### Project Identity (single most important finding)

`microsoft/skills-for-copilot-studio` is a **plugin** distributed via the Claude Code Plugin Marketplace and the GitHub Copilot CLI plugin system. It is **not** an SDK, scaffolder, or runtime. Direct README quote:

> A plugin for Claude Code, **GitHub Copilot CLI**, and VS Code that enables authoring, testing, and troubleshooting Microsoft Copilot Studio agents through YAML files — directly from your terminal or editor.

It ships **four user-facing sub-agents** invoked with `@copilot-studio:<sub-agent>`:

| Sub-agent command | Purpose |
|---|---|
| `@copilot-studio:copilot-studio-manage` | Clone, push, pull, sync agent content between local YAML and Copilot Studio cloud (via VS Code extension's LSP binary) |
| `@copilot-studio:copilot-studio-author` | Create and edit YAML (topics, actions, knowledge, triggers, variables) |
| `@copilot-studio:copilot-studio-test` | Test published agents — point-test, batch suites, eval analysis |
| `@copilot-studio:copilot-studio-advisor` | Design guidance, agent review, troubleshooting |

The plugin shells out to the **Copilot Studio VS Code Extension's `LanguageServerHost` binary** for all cloud sync operations. VS Code does not need to be running — only installed.

### Hard Prerequisites (every item below is mandatory)

| Item | Why | How to verify |
|---|---|---|
| Windows PowerShell 6+ | GitHub Copilot CLI does not support PowerShell 5.1 | `$PSVersionTable.PSVersion` (>= 6.0.0) |
| Node.js 22+ | Required by `@github/copilot` npm install; README says 18+, but install requires 22+ — install 22+ to satisfy both | `node --version` (>= v22.0.0) |
| GitHub Copilot subscription | Required for any GitHub Copilot CLI use (org-managed users also need the **Copilot CLI policy** enabled) | Sign in via `/login` succeeds |
| Copilot Studio VS Code Extension | Provides the LSP binary for `clone` / `push` / `pull` | Installable from [microsoft/vscode-copilotstudio](https://github.com/microsoft/vscode-copilotstudio); appears under VS Code Extensions |
| Microsoft 365 work or school account | Personal MS / Gmail accounts are rejected at Copilot Studio sign-up | Trial sign-up at https://go.microsoft.com/fwlink/?LinkId=2107702 succeeds |
| Power Platform environment with Copilot Studio | The plugin clones an existing cloud agent; it cannot bootstrap one | Browser sign-in at https://copilotstudio.microsoft.com shows an environment + the **Create blank agent** button is enabled |
| At least one existing Copilot Studio agent | `clone` operates on a real cloud agent | Visible in Agents list of the portal |

### Cloud Sync Architecture (mental model)

```mermaid
flowchart LR
    A[Developer in VS Code] -->|@copilot-studio:* slash commands| B[GitHub Copilot CLI]
    B -->|Loads plugin scripts| C[skills-for-copilot-studio plugin]
    C -->|Spawns subprocess| D[Copilot Studio VS Code Extension LSP binary]
    D -->|Authenticated HTTPS| E[(Copilot Studio cloud)]
    E -->|YAML files on disk| F[Local workspace folder]
    F -->|VS Code editor| A
```

No port. No tunnel. No skill manifest. The local workspace and the Copilot Studio cloud are kept in sync via the LSP binary.

### Folder Shape After `clone`

```text
<agent-folder>/
├── agent.mcs.yml                # Top-level agent definition
├── settings.mcs.yml             # Display name, model, generative settings
├── topics/
│   └── *.topic.mcs.yml          # One file per topic (e.g. HelloWorld.topic.mcs.yml)
├── actions/
│   └── *.action.mcs.yml         # MCP / connector / Flow actions
├── knowledge/
│   └── *.knowledge.mcs.yml      # Web / SharePoint / Dataverse / custom sources
└── variables/                   # Created on demand
    └── *.variable.mcs.yml       # Global variables
```

File naming convention: every entity uses the `.<kind>.mcs.yml` suffix.

### Known Issues to Pre-Warn the Learner

| Symptom | Cause | Fix |
|---|---|---|
| VS Code Copilot Chat does not see `@copilot-studio:*` sub-agents | Issue [#116](https://github.com/microsoft/skills-for-copilot-studio/issues/116) — embedded VS Code host does not yet inject `SessionStart` hook context | Use GitHub Copilot CLI in the VS Code **integrated terminal** instead of VS Code Copilot Chat (still in VS Code, just one panel over) |
| `ConcurrencyVersionMismatch` on `push` | Local row versions are stale | `@copilot-studio:copilot-studio-manage pull` first, then `push` |
| `settings.mcs.yml is missing required property CdsBotId` after a clean clone | Active bug in some agent shapes — issue [#155](https://github.com/microsoft/skills-for-copilot-studio/issues/155) | Re-clone; if it persists, see issue for status |
| Schema lookup returns "not found" on a kind name | Case-mismatch in YAML | Use `@copilot-studio:copilot-studio-advisor` and ask it to validate / suggest the correct name |
| Power Fx expression rejected | Missing `=` prefix on the expression | Prefix the expression with `=` |
| `clone` / `push` fails with "Extension not found" | Copilot Studio VS Code Extension is not installed | Install from [microsoft/vscode-copilotstudio](https://github.com/microsoft/vscode-copilotstudio) |
| First `@copilot-studio:copilot-studio-test` invocation fails | Azure App Registration not yet configured for `CopilotStudio.Copilots.Invoke` (testing only — not needed for clone/push) | Follow SETUP_GUIDE Step 5 Option A — Public client, redirect `http://localhost`, Power Platform API → `CopilotStudio.Copilots.Invoke` delegated permission |

### Complete Examples — Selected Approach Step-by-Step

See **Technical Scenarios → Hello World via GitHub Copilot CLI + Plugin** below for the full copy-pasteable walkthrough.

### API and Schema Documentation

* Copilot Studio agent YAML schema: `reference/bot.schema.yaml-authoring.json` in the repo. The plugin's `lookup-schema` skill resolves names against this; the `validate` skill performs LSP-based validation.
* Adaptive Cards v1.6 schema: `reference/adaptive-card.schema.json`.
* Plugin manifest: `.claude-plugin/plugin.json` (version 1.0.11 at time of research).

### Configuration Examples

**Minimal `HelloWorld.topic.mcs.yml`** (the kind of file the `author` sub-agent will generate; included here so the learner knows what to expect on disk):

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

(The plugin generates correctly-shaped YAML; this snippet is shown to set expectations, not to be hand-edited.)

## Technical Scenarios

### Hello World via GitHub Copilot CLI + Plugin (Selected Approach)

**Description.** The developer installs GitHub Copilot CLI on Windows, installs the Copilot Studio VS Code Extension (for its LSP binary), creates one blank agent in the Copilot Studio portal, then drives the entire authoring loop from VS Code's integrated terminal using `copilot` + the `skills-for-copilot-studio` plugin. The agent runs in the Copilot Studio cloud the entire time; the local workspace is just YAML the developer edits.

**Requirements (all confirmed during research):**

* Hard prerequisites table above — every item.
* The user owns at least one Power Platform environment with Copilot Studio enabled (their screenshot confirms "Contoso" exists).
* The user can create a blank agent in the portal at least once (the plugin can't bootstrap an agent from nothing).

**Preferred approach.** Use **GitHub Copilot CLI** as the host because (a) the repo README names it explicitly, (b) the user asked for "Copilot CLI" by name, and (c) it works today with no known parity gaps (unlike VS Code Copilot Chat — see issue #116).

**File tree changes (after the walkthrough):**

```text
C:\src\copilot-studio-work\
└── HelloWorldAgent\                    # Created by `clone` (folder name = agent display name)
    ├── agent.mcs.yml                   # From clone
    ├── settings.mcs.yml                # From clone
    └── topics\
        ├── Conversation Start.topic.mcs.yml    # From clone (default system topic)
        ├── ...                                 # Other default system topics
        └── HelloWorld.topic.mcs.yml            # Authored by @copilot-studio:copilot-studio-author
```

**Implementation Details — full hello-world step-by-step.**

#### Step 0 — One-time provisioning (skip if already done)

1. **GitHub Copilot subscription.** If not already active, enable it at https://github.com/settings/copilot . Organization users: ask an org owner to enable the **Copilot CLI policy** under Copilot → Policies.
2. **Copilot Studio trial.** Sign up at https://go.microsoft.com/fwlink/?LinkId=2107702 using a **work or school account**. The trial includes a default Power Platform environment.
3. **Confirm environment.** Navigate to https://copilotstudio.microsoft.com . The environment switcher in the top right should show a non-personal environment (the user's screenshot shows "Contoso").

#### Step 1 — Install Windows tooling

Open **PowerShell 6+ as a normal user** (not admin unless your machine requires it for `winget`):

```powershell
# 1.1 Verify PowerShell version (must be 6.0.0 or higher)
$PSVersionTable.PSVersion

# 1.2 Install Node.js 22+ (skip if already installed)
winget install OpenJS.NodeJS.LTS
# Re-open the terminal so PATH refreshes
node --version    # expect v22.x or higher

# 1.3 Install GitHub Copilot CLI
winget install GitHub.Copilot
copilot --version    # confirms install
```

If `winget` is not available on your machine, the npm fallback (after Node 22+ is installed):

```powershell
npm install -g @github/copilot
copilot --version
```

#### Step 2 — Install the Copilot Studio VS Code Extension

Open VS Code → Extensions panel (`Ctrl+Shift+X`) → search **"Copilot Studio"** → install the Microsoft-published extension (source: https://github.com/microsoft/vscode-copilotstudio ). This provides the `LanguageServerHost` binary the plugin invokes for cloud sync. VS Code does not need to be open afterwards; just installed.

#### Step 3 — Create your Hello World agent in the portal

The plugin **clones** an existing cloud agent. Your screenshot shows the Agents list is empty, so do this first:

1. At https://copilotstudio.microsoft.com , confirm the environment switcher (top-right) shows the environment you want to use (e.g. "Contoso").
2. Click **Create blank agent** (the button on the empty-state card).
3. Name it `HelloWorldAgent`. Accept defaults for everything else.
4. After creation, you land on the agent edit view. Leave the browser tab open — you will return to it later.

#### Step 4 — Set up the local workspace and launch Copilot CLI

```powershell
# 4.1 Create a working folder you trust and open it in VS Code
New-Item -ItemType Directory -Path C:\src\copilot-studio-work -Force | Out-Null
cd C:\src\copilot-studio-work
code .

# 4.2 In VS Code, open the integrated terminal (Ctrl+`)
# Make sure the terminal is PowerShell, then:
copilot
```

On first launch, Copilot CLI asks you to confirm you trust the folder. Choose **Yes**. If you are not yet authenticated, run inside the session:

```text
/login
```

…and follow the browser/device-code flow.

#### Step 5 — Install the plugin (run inside the `copilot` session)

```text
/plugin marketplace add microsoft/skills-for-copilot-studio
/plugin install copilot-studio@skills-for-copilot-studio
```

Verify installation by typing `@` at the prompt — autocomplete should now list the four `copilot-studio:*` sub-agents.

#### Step 6 — Clone the blank agent into the workspace

Still inside the `copilot` session:

```text
@copilot-studio:copilot-studio-manage clone
```

You will be prompted to:

1. Sign in via browser (interactive Entra ID — no Azure App Registration needed for clone/push).
2. Select your Power Platform environment.
3. Select the agent you just created (`HelloWorldAgent`).

The plugin downloads the YAML files into the current folder. After this, the workspace contains a new `HelloWorldAgent` directory matching the folder shape above.

#### Step 7 — Author the Hello World topic

```text
@copilot-studio:copilot-studio-author Create a new topic called "Hello World" that triggers on the phrases "hello", "hi", and "hello world", and replies with: "Hello, world! I'm a Copilot Studio agent authored from VS Code via the Copilot CLI plugin."
```

The sub-agent writes a new file at `HelloWorldAgent/topics/HelloWorld.topic.mcs.yml`. Open it in VS Code's editor to confirm — you should see an `OnRecognizedIntent` trigger and a `SendActivity` action.

Optional validation pass:

```text
@copilot-studio:copilot-studio-advisor Validate all topics in my agent
```

#### Step 8 — Push to the cloud

```text
@copilot-studio:copilot-studio-manage push
```

A browser tab may open for sign-in on first push; tokens are cached after. The plugin reports success.

#### Step 9 — Publish in the portal

> **Critical:** `push` creates a **draft** only. To make the topic invokable in the Test pane, you must also **publish**.

1. Return to the browser tab at https://copilotstudio.microsoft.com , on the `HelloWorldAgent` page.
2. Click **Publish** (top-right). Wait for the success toast.

#### Step 10 — Test

In the portal, click the **Test** button (top-right) to open the Test pane. Type:

```text
hello
```

The agent should reply:

> Hello, world! I'm a Copilot Studio agent authored from VS Code via the Copilot CLI plugin.

If you want to test from the CLI instead (single-utterance point-test), set up the Azure App Registration described in [SETUP_GUIDE.md Step 5 Option A](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md), then run:

```text
@copilot-studio:copilot-studio-test Send "hello" to the published agent
```

---

### Advanced Extension — Add a Knowledge Source (Recommended Next Step)

**Why this is the right "more advanced" step.** It uses a different sub-skill (`add-knowledge` orchestrated by the `author` sub-agent), demonstrates retrieval-augmented generation, requires no new infrastructure or auth setup, and immediately produces visibly different agent behaviour. Total time: under 5 minutes.

**Steps (inside the same `copilot` session, after the hello-world is working):**

```text
@copilot-studio:copilot-studio-author Add a knowledge source pointing to https://learn.microsoft.com/en-us/microsoft-copilot-studio/ named "Copilot Studio Docs"
```

The sub-agent creates `HelloWorldAgent/knowledge/CopilotStudioDocs.knowledge.mcs.yml`. Then:

```text
@copilot-studio:copilot-studio-manage push
```

Re-publish in the portal. In the Test pane:

```text
What is a topic in Copilot Studio?
```

The agent now grounds its answer in the public Copilot Studio docs site instead of replying from training data alone. The activity map (three-dot menu → "Show activity map when testing") confirms a generative-answers node fired against your knowledge source.

**Where to go after this:** add an **action** that calls an MCP server or a Power Automate flow (`@copilot-studio:copilot-studio-author Add an action ...`). That step introduces external API integration and is the natural follow-on; it is outside the scope of this research.

## Alternatives Considered

### A. VS Code Copilot Chat (embedded, not terminal) — Rejected

**Why considered:** Stays entirely inside VS Code's UI — no terminal hop. Visually simpler for beginners.

**Why rejected:** Active bug [#116](https://github.com/microsoft/skills-for-copilot-studio/issues/116). The embedded VS Code Copilot Chat host does not inject `SessionStart` hook context the way the CLI hosts do. Maintainer @GiorgioUghini's guidance (verbatim):

> VS Code at the moment does not seem to inject the context produced by SessionStart Hooks into the context the same way Claude Code and GitHub Copilot CLI are doing. In the meanwhile, please use either Claude Code or Copilot from the CLI.

The integrated terminal in VS Code with `copilot` running is the closest possible substitute and gives the same in-editor experience.

### B. Claude Code CLI — Acceptable, but user asked for "Copilot CLI"

**Why considered:** Equally first-class in the repo README; same `/plugin marketplace add` + `/plugin install` syntax. Some maintainers list Claude Code as the primary supported path.

**Why not selected:** The user's request specifies "copilot CLI". Claude Code is documented as a working alternative for anyone who prefers it.

### C. Power Platform CLI (`pac`) — Rejected

**Why considered:** Long-standing official CLI for Power Platform; brand similarity ("`pac copilot`" subcommands exist).

**Why rejected:** Repo README and SETUP_GUIDE never mention `pac`. `pac copilot` verbs target the legacy Power Virtual Agents / older bot export model, not the YAML authoring loop. The plugin uses the Copilot Studio VS Code Extension's LSP binary, not `pac`.

### D. Microsoft 365 Agents Toolkit CLI (`atk` / `teamsapp`) — Rejected

**Why considered:** Currently-active Microsoft tooling for "agents"; `atk` brand recognition.

**Why rejected:** Targets declarative agents and custom-engine agents for Microsoft 365 Copilot (Teams/Office), not Copilot Studio YAML-authored agents. Wrong product family. Repo never references it.

### E. Bot Framework Skill route (`microsoft/Agents/samples/dotnet/copilotstudio-skill`) — Different goal, retained as pointer

**Why considered:** This is what someone would build if they wanted Copilot Studio to call out to *another* bot as a "Skill" (the capital-S Bot Framework feature).

**Why not selected:** Different goal entirely. Requires .NET 8, Azure subscription, Azure Bot resource, Entra single-tenant app registration, devtunnel, manifest URL — ~30+ minutes setup just for the bot side. The user's request maps onto the `microsoft/skills-for-copilot-studio` plugin's primary use case (authoring the agent itself); this path is recorded only so the user knows where to look if they later want agent-to-agent invocation.

### F. MCP server route (`microsoft/CopilotStudioSamples/extensibility/mcp/search-species-resources-typescript`) — Different goal, recommended as future step

**Why considered:** Modern, low-friction (None auth) way to expose a custom tool to a Copilot Studio agent. Excellent "next-next" step.

**Why not selected as the hello-world:** Does not use the repo the user named, and requires Dev Tunnels + a running local Node server. The simpler "add a knowledge source" advanced step above achieves the same pedagogical goal (extending the agent with new capability) without any of that setup. Keep MCP as the natural progression after the advanced step in this walkthrough.

## References (Primary Sources)

* Repo & docs:
  * [README — microsoft/skills-for-copilot-studio](https://github.com/microsoft/skills-for-copilot-studio)
  * [SETUP_GUIDE.md](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md)
  * [CONTRIBUTING.md](https://github.com/microsoft/skills-for-copilot-studio/blob/main/CONTRIBUTING.md)
  * [microsoft/vscode-copilotstudio](https://github.com/microsoft/vscode-copilotstudio) (the LSP binary dependency)
* GitHub Copilot CLI:
  * [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
  * [Installing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli)
  * [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
* Copilot Studio product:
  * [Copilot Studio web portal](https://copilotstudio.microsoft.com/)
  * [Free trial sign-up](https://go.microsoft.com/fwlink/?LinkId=2107702)
  * [Test your agent (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot)
  * [Review agent activity (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-review-activity)
  * [Licensing & trial (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing-subscriptions)
* Related repositories (cited as alternatives, not used in selected path):
  * [microsoft/CopilotStudioSamples (MCP servers)](https://github.com/microsoft/CopilotStudioSamples/tree/main/extensibility/mcp)
  * [microsoft/Agents (Bot Framework Skill samples)](https://github.com/microsoft/Agents/tree/main/samples/dotnet/copilotstudio-skill)
* Sub-agent research documents (this session):
  * .copilot-tracking/research/subagents/2026-05-25/skills-repo-deep-dive-research.md
  * .copilot-tracking/research/subagents/2026-05-25/copilot-cli-disambiguation-research.md
  * .copilot-tracking/research/subagents/2026-05-25/copilot-studio-skill-registration-research.md
