<!-- markdownlint-disable-file -->
# Research: microsoft/skills-for-copilot-studio — Deep Dive

## Research Topics and Questions

1. Repository overview (README, description, license, branch, structure, latest release, linked docs)
2. What the project actually is (SDK? template? scaffolder? samples? spec?)
3. Hello-world / quickstart (exact commands, entry points, sample files)
4. CLI integration (which CLI tools are referenced, exact commands)
5. Copilot Studio registration (manifest, endpoint, auth)
6. Examples and samples (list, smallest one, deployment-ready)
7. Gotchas / known issues from open issues and README warnings

## File Analysis

(N/A — this research targets an external GitHub repository, not workspace files.)

## External Research

### Source URLs

- https://github.com/microsoft/skills-for-copilot-studio (root + README)
- https://github.com/microsoft/skills-for-copilot-studio/blob/main/README.md
- https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md
- https://github.com/microsoft/skills-for-copilot-studio/blob/main/CONTRIBUTING.md
- https://github.com/microsoft/skills-for-copilot-studio/tree/main/agents
- https://github.com/microsoft/skills-for-copilot-studio/tree/main/skills
- https://github.com/microsoft/skills-for-copilot-studio/tree/main/templates
- https://github.com/microsoft/skills-for-copilot-studio/tree/main/reference
- https://github.com/microsoft/skills-for-copilot-studio/tree/main/.claude-plugin
- https://github.com/microsoft/skills-for-copilot-studio/issues
- https://github.com/microsoft/skills-for-copilot-studio/releases

## Key Discoveries

### Initial Headline Finding (CRITICAL CORRECTION TO USER'S MENTAL MODEL)

**This repository is NOT what the user's question implies.** It is **not** a Bot Framework skill SDK, not an MCP server template, not an agent-to-agent skill scaffolder, not a Copilot Studio "tool/plugin manifest" generator, and not a runtime that serves an endpoint to be registered as a "skill" in a Copilot Studio agent.

It is a **plugin for AI coding assistants** (Claude Code, GitHub Copilot CLI, VS Code GitHub Copilot) that helps a developer **author and manage Microsoft Copilot Studio agents as YAML files** from the terminal/editor. The "skills" in the repository name refers to **AI-assistant skills (sub-agents and prompts) that operate on Copilot Studio agent YAML**, not to Bot Framework "skills" or Copilot Studio "skill" capabilities exposed to other agents.

Direct README quote on what it is:

> A plugin for Claude Code, GitHub Copilot CLI, and VS Code that enables authoring, testing, and troubleshooting Microsoft Copilot Studio agents through YAML files — directly from your terminal or editor.

About blurb on the repo page:

> A skill for AI-coding tools to build and edit Microsoft Copilot Studio agents as YAML — with schema validation, templates, and AI-powered skills. Suited for Claude Code, GitHub Copilot CLI, and more.

### Project Structure (top level, evidence-backed)

Top-level folders and files observed from the GitHub root listing (latest commit `353b288`, "Release 1.0.11", 2 weeks ago as of fetch):

- `.claude-plugin/` — Plugin manifest for Claude Code marketplace (contains `plugin.json` bumped to 1.0.11)
- `.github/` — Repo workflows, including release cron (PR #145 about release-cron-week-calc)
- `agents/` — Sub-agent definitions (the four `/copilot-studio:*` sub-agents)
- `evals/` — Evaluation scenarios (e.g. lookup-schema)
- `hooks/` — Replaced "best-practices and known-issues" with "pattern library and Advisor"
- `img/` — Image assets (VS Code Store screenshot)
- `patterns/` — Pattern library (channel-aware behavior etc.)
- `reference/` — Reference material including bot schema
- `scripts/` — Build/runtime scripts (retry transient SSL failures during LSP requests)
- `skills/` — Skill definitions consumed by sub-agents (lookup-schema eval scenario)
- `templates/` — YAML templates (V1 of SPO actions update, last month)
- `tests/` — Tests (feat: identify agent from Copilot Studio URL `--url` flag)
- `.gitignore`
- `CONTRIBUTING.md`
- `LICENSE` — MIT
- `README.md`
- `RELEASE_PLAN.md` — weekly release branch workflow
- `SECURITY.md`
- `SETUP_GUIDE.md` — end-to-end walkthrough including validation, testing options, troubleshooting
- `requirements.txt` — switched to "modern Skills vs old Commands" 3 months ago

Repo metadata (from About / sidebar):

- Default branch: `main`
- License: MIT
- Stars: 258
- Forks: 57
- Watchers: 12
- Open issues: 19; Open PRs: 6
- Contributors: 11 (top: @GiorgioUghini, @claude bot, @adilei, @ericsche, @Copilot bot, @ChrisGarty)
- Languages: JavaScript 98.0%, Python 2.0%
- Latest release: **v1.0.11** (2 weeks ago at time of fetch); 4 total releases

### What the Project Actually Is — Precise Classification

| Question | Answer (evidence-backed) |
|---|---|
| SDK? | No |
| Template? | Partial — contains YAML templates in `/templates` for Copilot Studio agent constructs |
| Scaffolder? | Partial — provides commands to clone/pull/push Copilot Studio agents |
| Samples? | Not a samples repo per se; has eval scenarios under `/evals` and pattern library under `/patterns` |
| Spec? | References Copilot Studio's YAML schema in `/reference/bot schema` |
| **Primary role** | **AI-assistant plugin** with sub-agents, prompts, hooks, and YAML templates that drives Copilot Studio authoring via the **Copilot Studio Extension's LSP binary** |
| Runtime | Node.js 18+ on the developer machine (for the plugin scripts); the Copilot Studio agent itself runs in the cloud, not locally |
| Languages | JavaScript 98% (plugin/scripts), Python 2% (likely evals/tests) |
| Output artifact | Microsoft Copilot Studio agent YAML files (topics, actions, knowledge, triggers, variables) committed to a local folder, then pushed to Copilot Studio cloud |
| Does it produce a Bot Framework skill? | **No** |
| Does it produce an MCP server? | **No** |
| Does it produce an agent-to-agent skill? | **No — different meaning of "skill"** |
| Does it produce a Copilot Studio "tool"? | **No, it edits the Copilot Studio agent itself** (topics, actions, knowledge, triggers, variables) as YAML |

The word "skills" in the repo name refers to **Anthropic Claude Code Skills / GitHub Copilot CLI plugin "skills"** — AI-assistant capability units — not Microsoft Copilot Studio "skills" in the Bot Framework sense.

### Prerequisites (verbatim from README)

> - Claude Code, GitHub Copilot CLI, or VS Code
> - Node.js 18+
> - VS Code with the Copilot Studio Extension (required for push/pull/clone operations)

The "Copilot Studio Extension" linked is https://github.com/microsoft/vscode-copilotstudio. **This is a hard dependency for cloud sync** — the plugin invokes that extension's LSP binary to communicate with Copilot Studio.

### Installation Paths (verbatim from README)

Three installation methods:

1. **From marketplace (Claude Code / GitHub Copilot CLI):**

   ```text
   /plugin marketplace add microsoft/skills-for-copilot-studio
   /plugin install copilot-studio@skills-for-copilot-studio
   ```

2. **From VS Code Extensions Store (GitHub Copilot):** Search for "Skills for Copilot Studio" in the VS Code Extensions using the `@agentPlugins` filter, then click Install.

3. **From a local clone:**

   ```text
   git clone https://github.com/microsoft/skills-for-copilot-studio.git

   # Load for a single session
   claude --plugin-dir /path/to/skills-for-copilot-studio

   # Or install persistently (user-wide)
   claude plugin install /path/to/skills-for-copilot-studio --scope user

   # Or install for a specific project
   claude plugin install /path/to/skills-for-copilot-studio --scope project
   ```

### Sub-Agents Provided (verbatim from README)

The plugin provides four sub-agents:

```text
/copilot-studio:copilot-studio-manage   Clone, push, pull, and sync agent content between local files and the cloud
/copilot-studio:copilot-studio-author   Create and edit YAML (topics, actions, knowledge, triggers, variables)
/copilot-studio:copilot-studio-test     Test published agents — point-tests, batch suites, or evaluation analysis
/copilot-studio:copilot-studio-advisor  Design guidance, agent review, and troubleshooting
```

### Quick Start (verbatim from README)

```text
# Clone an agent from the cloud (guided flow — opens browser for sign-in)
/copilot-studio:copilot-studio-manage clone

# Design and build topics
/copilot-studio:copilot-studio-author Create a topic that handles IT service requests

# Pull latest, push your changes
/copilot-studio:copilot-studio-manage pull
/copilot-studio:copilot-studio-manage push

# Publish in Copilot Studio UI, then test
/copilot-studio:copilot-studio-test Send "How do I request a new laptop?" to the published agent

# Get design advice and review
/copilot-studio:copilot-studio-advisor Review my agent for improvements and known pitfalls
```

The README points beginners to `SETUP_GUIDE.md` for the full end-to-end walkthrough (validation, testing, troubleshooting).

### Updating Behavior (verbatim from README)

| Channel | Method | Detail |
|---|---|---|
| Claude Code CLI | Auto-update (recommended) | Marketplace plugins update automatically. No action needed. |
| GitHub Copilot CLI | Manual | Run `/plugin update skills-for-copilot-studio` in interactive session, or `copilot plugin update skills-for-copilot-studio` from terminal |
| VS Code | Extension auto-update | Handled automatically when extension auto-update is enabled |

### Disclaimer (verbatim)

> This plugin is an experimental research project, not an officially supported Microsoft product. The Copilot Studio YAML schema may change without notice. Always review and validate generated YAML before pushing to your environment — AI-generated output may contain errors or unsupported patterns.

### CLI Integration — Direct Answers to User's Question 4

| CLI | Mentioned in README? | How it's used |
|---|---|---|
| **Claude Code CLI** (`claude`) | YES | Primary supported host; `claude --plugin-dir`, `claude plugin install --scope user|project`, `/plugin marketplace add`, `/plugin install` |
| **GitHub Copilot CLI** (`copilot`) | YES | Supported host; `/plugin marketplace add`, `/plugin install`, `/plugin update`, `copilot plugin update` |
| **VS Code GitHub Copilot** | YES | Supported host; install via Extensions store with `@agentPlugins` filter |
| **Microsoft 365 Agents Toolkit CLI (`atk`)** | **NOT MENTIONED** in README at all |
| **Power Platform CLI (`pac`)** | **NOT MENTIONED** in README at all |
| **Microsoft Bot Framework CLI** | **NOT MENTIONED** in README at all |

The plugin's cloud sync (push/pull/clone) does **not** go through `pac` or `atk`. It goes through the **Copilot Studio VS Code Extension's LSP binary** (see `.gitignore` history: "Add manage-agent: push/pull/clone via LSP binary (#71)"), which is why the VS Code Copilot Studio Extension is a hard prerequisite even on Claude Code / Copilot CLI.

### Copilot Studio Registration — Direct Answers to User's Question 5

The model here is **inverted** from what the user's mental model assumes:

- The plugin does **not** produce an endpoint that you register as a "skill" inside a Copilot Studio agent.
- Instead, the plugin **edits the Copilot Studio agent itself** (its topics, actions, knowledge, triggers, variables) as YAML on disk and then **pushes** those YAML files back into the Copilot Studio cloud environment.
- Authentication: per README, `copilot-studio-manage clone` triggers a "guided flow — opens browser for sign-in", which is the Copilot Studio Extension's Entra ID interactive sign-in — there is no manifest.json / skill manifest XML / MCP manifest / plugin manifest published by this repo for a third-party agent to consume.
- The "manifest" produced is the **Copilot Studio agent YAML** (topics/actions/knowledge/triggers/variables) — not a Bot Framework v3 skill manifest or an MCP discovery manifest.

### Hello-World — Direct Answers to User's Question 3

The smallest happy path per README:

1. Install the plugin (one of the three methods above).
2. Run `/copilot-studio:copilot-studio-manage clone` — opens a browser to sign in to Copilot Studio, then clones an existing cloud agent into local YAML files.
3. Run `/copilot-studio:copilot-studio-author Create a topic that handles IT service requests` — the sub-agent edits YAML in place.
4. Run `/copilot-studio:copilot-studio-manage push` — pushes local YAML changes to Copilot Studio cloud.
5. Publish in the Copilot Studio web UI.
6. Run `/copilot-studio:copilot-studio-test Send "How do I request a new laptop?" to the published agent`.

There is **no local web server, no port to listen on, no devtunnel/ngrok, no manifest endpoint** — the developer never runs a long-lived process. All "running" happens in the Copilot Studio cloud after `push`. This is a critical distinction.

The "first capability" file the developer touches is a YAML topic/action under the agent folder created by `clone`, not a TypeScript/.NET/Python entry point.

### Plugin Manifest (`.claude-plugin/plugin.json`, verbatim)

```json
{
  "name": "copilot-studio",
  "version": "1.0.11",
  "description": "Microsoft Copilot Studio YAML authoring toolkit. Create, edit, validate, and test Copilot Studio agents using YAML files.",
  "author": { "name": "Microsoft Copilot Studio CAT Team" }
}
```

### Internal Project Structure (narrative from CONTRIBUTING.md)

```text
.claude-plugin/          # Plugin manifest and marketplace config (plugin.json)
.github/                 # Repo workflows including weekly release cron
  plugin/                # GitHub Copilot Plugin manifest to speed up discovery
agents/                  # Sub-agent definitions (advisor, author, manage, test)
evals/                   # Scenario-based eval framework (harness, report, fixtures)
  scenarios/             # Eval definitions per scenario (<name>.json)
  hooks/                 # Eval-only hooks (skill tracing via PreToolUse)
hooks/                   # Session hooks (agent routing)
img/                     # Image assets (e.g., VSCodeStore.png)
patterns/                # Reusable design patterns (JIT glossary, orchestrator vars, etc.)
reference/               # Copilot Studio YAML schema + connectors + adaptive-card schema
scripts/                 # Bundled tools (schema lookup, chat-with-agent) — built with esbuild
  src/                   # Source code for the bundled scripts
skills/                  # Skill definitions (entry points + internal skills)
  int-patterns/          # Internal skill indexing the pattern library
  ...                    # Other skills (add-knowledge, new-topic, etc.)
templates/               # YAML templates for common patterns
tests/                   # Test runner for Copilot Studio Kit integration
CONTRIBUTING.md
LICENSE                  # MIT
README.md
RELEASE_PLAN.md
SECURITY.md
SETUP_GUIDE.md
requirements.txt
```

### Sub-Agents (4 — files in `agents/`)

| Sub-agent file | User-facing command | Purpose |
|---|---|---|
| `copilot-studio-manage.md` | `/copilot-studio:copilot-studio-manage` | Clone, push, pull, sync between local YAML and Copilot Studio cloud — via the VS Code Copilot Studio Extension's LSP binary |
| `copilot-studio-author.md` | `/copilot-studio:copilot-studio-author` | Create and edit YAML (topics, actions, knowledge, triggers, variables) by orchestrating internal skills |
| `copilot-studio-test.md` | `/copilot-studio:copilot-studio-test` | Test published agents — point-tests, batch suites, eval analysis |
| `copilot-studio-advisor.md` | `/copilot-studio:copilot-studio-advisor` | Design guidance, agent review, troubleshooting (pulls from pattern library) |

In Claude Code, type `@` to discover these in autocomplete. Internal skills (under `skills/`) are **hidden from direct user invocation** (PR #34); only the four sub-agents above are user-facing.

### Internal Skills (~30 — directories in `skills/`)

`add-action`, `add-adaptive-card`, `add-generative-answers`, `add-global-variable`, `add-knowledge`, `add-node`, `add-other-agents`, `analyze-evals`, `chat-directline`, `chat-sdk`, `chat-with-agent`, `clone-agent`, `create-eval`, `create-eval-set`, `detect-mode`, `directline-chat`, `edit-action`, `edit-agent`, `edit-triggers`, `int-patterns`, `int-project-context`, `int-reference`, `list-kinds`, `list-topics`, `lookup-schema`, `manage-agent`, `new-topic`, `run-eval`, `run-tests-kit`, `test-auth`, `validate`.

### Templates (`templates/` — 5 subfolders)

- `actions/` — V1 of SPO (SharePoint Online) actions
- `agents/` — Reusable agent shells
- `knowledge/` — Knowledge-source templates
- `topics/` — Includes "Add CreateSearchQuery before genAI Answers" pattern
- `variables/` — `global-variable.variable.mcs.yml` with instructions

### Reference (`reference/`)

- `bot.schema.yaml-authoring.json` — Copilot Studio bot YAML authoring schema (the `lookup-schema` skill resolves against this; the `validate` skill performs LSP-based YAML validation against it, per PR #88)
- `adaptive-card.schema.json` — Adaptive Cards v1.6 schema (PR #38)
- `connectors/` — Connector definitions consumed by `edit-action` / connector-lookup tooling

### Complete End-to-End Walkthrough (verbatim from SETUP_GUIDE.md)

#### Step 1 — Install the plugin

Use one of the three installation paths from the README (above). To verify, type `@` in the input — you should see the four `copilot-studio:*` sub-agents in autocomplete.

Prerequisites checklist (from SETUP_GUIDE):

| Requirement | Version | Verification |
|---|---|---|
| Node.js | 18+ | `node --version` |
| Claude Code or GitHub Copilot CLI | Latest | `claude --version` or `copilot --version` |
| Copilot Studio VS Code Extension | Latest | Install from https://github.com/microsoft/vscode-copilotstudio |

> The VS Code extension provides the **LanguageServerHost binary** used for clone, push, and pull operations. **VS Code itself does not need to be running.**
>
> The plugin works with **Claude Code** and **GitHub Copilot CLI**. VS Code Copilot Chat support is in progress — the embedded Copilot branch does not yet inject `SessionStart` hook context the same way the CLI does. See [#116](https://github.com/microsoft/skills-for-copilot-studio/issues/116) for updates.
>
> You also need access to a Power Platform environment with Copilot Studio and an existing agent.

#### Step 2 — Clone an agent

```text
@copilot-studio:copilot-studio-manage clone
```

Walks through environment selection, agent selection, and downloads files — with **interactive browser auth (no app registration needed)**. After cloning, the on-disk shape is:

```text
<agent-folder>/
├── agent.mcs.yml            # Top-level agent definition
├── settings.mcs.yml         # Agent settings (display name, model, etc.)
├── topics/
│   └── *.topic.mcs.yml      # Each topic in its own YAML file
├── actions/
│   └── *.action.mcs.yml     # MCP actions, connector actions
├── knowledge/
│   └── *.knowledge.mcs.yml  # Knowledge sources (web, SharePoint, custom)
└── variables/               # (Created when needed)
    └── *.variable.mcs.yml   # Global variables
```

File naming convention: every Copilot Studio entity uses the `.<kind>.mcs.yml` suffix. Top-level files drop the kind segment: `agent.mcs.yml`, `settings.mcs.yml`.

Alternative: clone via the Copilot Studio VS Code Extension directly (Command Palette → `Copilot Studio: Clone Agent`).

#### Step 3 — Author changes

Open Claude Code (or your preferred host) in the cloned agent's directory.

Explore the agent:

```text
@copilot-studio:copilot-studio-author What topics does this agent have? Give me an overview.
```

Create a new topic:

```text
@copilot-studio:copilot-studio-author Create a new topic called "Product Information" that responds to questions about our products with a message listing our top 3 products.
```

Validate:

```text
@copilot-studio:copilot-studio-advisor Validate all topics in my agent
```

#### Step 4 — Push and publish

```text
@copilot-studio:copilot-studio-manage push
```

A browser window may open for sign-in on first use; tokens are cached after that. Or push via VS Code Command Palette → `Copilot Studio: Push`.

Then **publish** in the Copilot Studio UI at https://copilotstudio.microsoft.com:

> **Important**: Pushing creates a **draft**. You must also **publish** to make changes live and testable via the plugin.

#### Step 5 — Test the published agent

Three options:

**Option A — Point-test** (single utterance, requires Azure App Registration):

- **Platform**: Public client / Native (Mobile and desktop applications)
- **Redirect URI**: `http://localhost` (HTTP, not HTTPS)
- **API permissions**: Add a permission → APIs my organization uses → search **Power Platform API** → Delegated permissions → expand `CopilotStudio` → check `CopilotStudio.Copilots.Invoke` (optionally grant admin consent)

```text
@copilot-studio:copilot-studio-test Send "What products do you offer?" to the published agent
```

First use prompts for the App Registration Client ID, authenticates via **device code flow**, returns the full response. Multi-turn supported.

**Option B — Batch test suite (Copilot Studio Kit)**: requires Power CAT Copilot Studio Kit installed in the environment plus an Azure App Registration with Dataverse permissions.

```text
@copilot-studio:copilot-studio-test Run my test suite
```

**Option C — Analyze evaluation results**: run evals in Copilot Studio UI, export CSV, analyze failures.

```text
@copilot-studio:copilot-studio-test Analyze my evaluation results from ~/Downloads/Evaluate MyAgent.csv
```

#### Step 6 — Review and fix (advisor pattern)

```text
@copilot-studio:copilot-studio-advisor The agent is making up product details that aren't accurate. It seems to be hallucinating instead of using real data.
```

Then:

```text
@copilot-studio:copilot-studio-author Add a knowledge source pointing to our product catalog at https://contoso.com/products
```

### Troubleshooting Table (verbatim from SETUP_GUIDE.md)

| Issue | Possible Cause | Solution |
|---|---|---|
| Schema lookup returns "not found" | Definition name case mismatch | Use `search` to find the correct name |
| YAML parse error on import | Invalid YAML syntax | Check for indentation issues, missing colons |
| Topic doesn't render in canvas | Complex YAML not supported | Simplify the structure, use portal for complex edits |
| Duplicate ID error | Non-unique node IDs | Regenerate IDs for copied nodes |
| Power Fx error | Missing `=` prefix | Ensure expressions start with `=` |
| Plugin not found | Not installed or wrong path | Run `/plugin list` to verify |
| Extension not found (clone/push/pull) | Copilot Studio VS Code Extension not installed | Install from https://github.com/microsoft/vscode-copilotstudio |
| ConcurrencyVersionMismatch on push | Stale row versions | Pull first, then push |

> If something goes wrong, you can always re-clone the original agent with `@copilot-studio:copilot-studio-manage clone` or via the VS Code Extension.

### Examples and Samples — Direct Answer to User's Question 6

This is **not a samples repo** in the Bot Framework / Azure Functions sense — there are no deployment-ready Azure / Functions / Container Apps samples because **nothing in this repo deploys**. The Copilot Studio agent runs in the Copilot Studio cloud after `push` + `publish` in the portal.

The closest equivalents to "samples" in this repo:

| Asset | Type | Path | Purpose |
|---|---|---|---|
| Quick Start | Walkthrough | `README.md` Quick Start | 5-command happy path (assumes pre-existing cloud agent) — **smallest documented path** |
| SETUP_GUIDE walkthrough | Walkthrough | `SETUP_GUIDE.md` | Full hello-world: install → clone → author → push → publish → test → fix |
| `topic-creation` eval | YAML fixtures + checks | `evals/scenarios/topic-creation.json` | Creates topics with various trigger types |
| `agent-settings` eval | YAML fixtures + checks | `evals/scenarios/agent-settings.json` | Instructions, display name, starters, generative actions toggle |
| `knowledge-sources` eval | YAML fixtures + checks | `evals/scenarios/knowledge-sources.json` | Public website, SharePoint, custom-named knowledge sources |
| `action-creation` eval | YAML fixtures + checks | `evals/scenarios/action-creation.json` | MCP and connector action creation |
| `action-editing` eval | YAML fixtures + checks | `evals/scenarios/action-editing.json` | MCP display name, connection mode, structure preservation |
| `lookup-schema` eval | YAML fixtures + checks | `evals/scenarios/lookup-schema.json` | Schema lookup behaviour |
| `basic-agent` fixture | Starter YAML | Used by many evals | The true **"blank agent"** starter |
| Templates | YAML | `templates/{topics,actions,knowledge,variables,agents}/` | Reusable per-construct templates |
| Patterns | Markdown | `patterns/*.md` | Reusable design patterns (JIT glossary, orchestrator variables, channel-aware behavior, etc.) |

### Eval Framework (CONTRIBUTING.md)

The eval harness demonstrates how to test sub-agent routing and YAML output:

```bash
# Run evals for a single scenario
python3 evals/evaluate.py --scenario topic-creation --verbose

# Run all scenarios and generate HTML report
node evals/run.js

# Run with GitHub Copilot CLI instead of Claude Code
node evals/run.js --cli copilot

# Run a specific eval by ID
python3 evals/evaluate.py --scenario agent-settings --eval-id 1 --verbose
```

Available checks: `agent_invoked`, `agent_not_invoked`, `skill_invoked`, `skill_not_invoked`, `files_created`, `schema_validate`, `yaml_structure`, `content_contains`, `no_placeholders`, `yaml_unchanged`, `stdout_contains` / `stdout_not_contains`, `exit_code`.

Important caveat: `skill_invoked` / `skill_not_invoked` rely on a `PreToolUse` hook injected via `--settings`. **This only works with Claude Code CLI.** When using GitHub Copilot CLI (`--cli copilot`), skill tracing is unavailable — those checks are skipped with a warning.

Example scenario JSON (from CONTRIBUTING.md):

```json
{
  "scenario_name": "your-scenario",
  "evals": [
    {
      "id": 1,
      "name": "Short descriptive title",
      "prompt": "Add https://docs.contoso.com as a knowledge source for the agent.",
      "fixture": "basic-agent",
      "mock_scripts": [],
      "checks": {
        "agent_invoked": "copilot-studio:Copilot Studio Author",
        "skill_invoked": "copilot-studio:add-knowledge",
        "files_created": [
          { "pattern": "knowledge/*.knowledge.mcs.yml", "min_count": 1 }
        ],
        "schema_validate": true,
        "content_contains": ["docs.contoso.com"],
        "no_placeholders": true
      }
    }
  ]
}
```

Schema-validation checks (`schema_validate: true`) cover: `kind` field, required fields, unique IDs, Power Fx expression syntax (must start with `=`), variable scopes.

### Local Build of Bundled Scripts (CONTRIBUTING.md)

```bash
cd scripts
npm install
npm run build
```

Source lives in `scripts/src/`, bundles in `scripts/`. Build uses esbuild.

### Release Workflow (RELEASE_PLAN.md / CONTRIBUTING.md)

Weekly cadence: release branch `release/YYYY-WNN` cut every Thursday 09:00 UTC, merged to `main` on Wednesdays.

### Plugin Management Commands (CONTRIBUTING.md)

```bash
# Install user-wide
/plugin install copilot-studio@microsoft/skills-for-copilot-studio --scope user

# Install for a specific project (shared via version control)
/plugin install copilot-studio@microsoft/skills-for-copilot-studio --scope project

# Check installed plugins
/plugin list

# Temporarily disable
/plugin disable copilot-studio

# Re-enable
/plugin enable copilot-studio

# Uninstall
/plugin uninstall copilot-studio
```

### Gotchas / Known Issues — Direct Answers to User's Question 7

From the **README disclaimer**:

- Experimental research project, not officially supported.
- Copilot Studio YAML schema can change without notice.
- AI-generated output may contain errors or unsupported patterns — review YAML before pushing.

From **open issues** (snapshot of 19 open at time of fetch, beginner-relevant first):

| # | Title | Label | Relevance for a beginner |
|---|---|---|---|
| 116 | VS Code Support: Wait from fix from the Copilot branch embedded in VS Code | bug | **Major.** Verbatim from maintainer (@GiorgioUghini, opened Apr 1): *"VS Code at the moment does not seem to inject the context produced by SessionStart Hooks into the context the same way Claude Code and GitHub Copilot CLI are doing. In the meanwhile, please use either Claude Code or Copilot from the CLI. The version on VS Code might have some small glitch since it won't have our fine tuned system prompt."* PR #117 added a docs note. **Beginners on Windows should use Claude Code or Copilot CLI from a terminal — not VS Code Copilot Chat — until this is fixed.** |
| 155 | Manage Agent push blocked: clean cloned agent missing `CdsBotId` but validation requires it | pending-response | Reported by a user doing the "Agent Academy YAML Specialist" mission on macOS. Steps: clone, edit (variables/UserCountry, topics/ConversationInit, topics/ConversationStart, agent.mcs.yml), push → fails with `settings.mcs.yml is missing required property "CdsBotId"`; force push returned server error `Passed entity object cannot be null or empty`. Maintainer @GiorgioUghini (last week): *"I can push without problems an agent that has no CdsBotId in the agent settings (and by memory, I don't recall an agent having such property in the settings ever."* Status: pending screenshots. **Beginners on the YAML Specialist Academy mission may hit this** |
| 170 | Evaluation test set authoring path is broken end-to-end: YAML kinds silently dropped by sync, sub-agent emits wrong CSV format, MS Learn docs not consulted | (none) | Eval test set authoring has multiple defects |
| 127 | Bug: `add-action` sub-agent writes files despite skill being guide-only | bug | Sub-agent over-reaches and writes files when it should only guide |
| 131 | Feature gaps vs VS Code extension LSP usage | (none) | Parity gaps between plugin and underlying extension LSP |
| 132 | Double texting in agent-to-agent scenarios with GPT-5 as orchestrator | kb (known issue) | Multi-agent orchestration glitch |
| 48 | Agent leaks internal tool call explanations to user | kb (known issue) | Output hygiene issue |
| 50 | Better handling of tools and actions | enhancement, p1-important | Acknowledged limitation in tools/actions UX |
| 160 | Add Copilot Studio WorkData pattern for structured AI-assisted form and entity collection | enhancement, pending-response | Missing pattern coverage |
| 94 | Add OpenAI Codex support | enhancement | Codex CLI not yet a supported host |
| 151 | Add Conversational chatting sub agent | enhancement | New sub-agent proposed |
| 110 | Enhancement: Script mocking for integration skill evals | enhancement | Eval framework gap |
| 108 | Enhancement: Semantic grading for skill evals (LLM-as-judge) | enhancement | Eval framework gap |
| 82 | Analyzer skill: investigate App Insights with KQL queries | enhancement | Future analyzer skill |
| 45 | Add snapshot analysis capabilities to troubleshoot agent | enhancement / Feature | |
| 44 | Add analytics sub-agent for transcript data and public analytics APIs | enhancement | |

### Most Important Beginner Pitfalls (synthesised)

1. **Wrong mental model.** The "skills" in the repo name are AI-assistant skills, not Copilot Studio skills/tools. A beginner who comes here expecting to build a Bot Framework skill, an MCP server, or a Copilot Studio tool/plugin will not find what they want here.
2. **VS Code Copilot Chat is degraded.** Despite being listed as a supported host, the embedded VS Code Copilot does not currently inject the plugin's SessionStart hook context (issue #116). **On Windows, beginners should drop into a terminal and use Claude Code or GitHub Copilot CLI** until this is fixed.
3. **The VS Code Copilot Studio Extension is a hard prerequisite even on non-VS-Code hosts** because its LanguageServerHost binary is what actually clones/pushes/pulls. Install it from https://github.com/microsoft/vscode-copilotstudio even when using Claude Code CLI.
4. **No local server, no devtunnel, no manifest endpoint.** The hello-world cycle is: clone existing cloud agent → edit YAML → push → **publish in the portal** → test. The "publish in the portal" step is easy to miss and is required before `:test` can hit the agent.
5. **Point-testing requires an Azure App Registration**, not just sign-in. Type Public client / Native, redirect `http://localhost` (HTTP not HTTPS), delegated permission `Power Platform API → CopilotStudio.Copilots.Invoke`. Beginners hitting `:test` for the first time will be prompted for a Client ID.
6. **Push creates a draft only.** Per SETUP_GUIDE: *"You must also publish to make changes live and testable via the plugin."*
7. **`ConcurrencyVersionMismatch` on push** → pull first.
8. **Schema can drift.** Plugin ships its own copy of `bot.schema.yaml-authoring.json`; running against an environment that has moved ahead can produce validation errors.
9. **Power Fx expressions need `=` prefix** — common YAML hand-edit mistake.

### Microsoft Learn / External Docs References

The README and SETUP_GUIDE link only:

- `aka.ms/CopilotStudio` (Copilot Studio product landing)
- https://copilotstudio.microsoft.com (Copilot Studio web portal)
- https://github.com/microsoft/vscode-copilotstudio (the prerequisite VS Code extension repo)
- (Implicitly) Power CAT Copilot Studio Kit — referenced for batch test suite path

**No dedicated MS Learn quickstart page is referenced from this repo's README or SETUP_GUIDE.** Independent MS Learn pages on Copilot Studio YAML/MCS authoring may exist but are not linked from this project — see `learn.microsoft.com/microsoft-copilot-studio/` for that ecosystem separately.

## Status

**Complete** — all 7 research questions have been answered with direct quotes / evidence from the repository's README, SETUP_GUIDE.md, CONTRIBUTING.md, plugin.json, folder listings, and open issues (#116 and #155 fetched in full).

## Recommended Next Research (not completed in this session)

1. **VS Code Copilot Studio Extension internals (microsoft/vscode-copilotstudio)** — its LSP commands, its auth, its Command Palette surface; understanding this clarifies what the plugin can and cannot do on top.
2. **Copilot Studio YAML schema deep-dive** — reading `reference/bot.schema.yaml-authoring.json` to enumerate the supported `kind` values, required fields, and Power Fx semantics.
3. **Power CAT Copilot Studio Kit** (https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit) — required for Option B batch testing; auth model and Dataverse install steps.
4. **Adaptive Cards v1.6 integration** — how `add-adaptive-card` and `reference/adaptive-card.schema.json` are consumed at runtime.
5. **Sample `agent.mcs.yml` + `topic.mcs.yml` file contents** — actual YAML structure was inferred but not fetched. Reading one cloned agent's files would confirm the schema in practice.
6. **`clone-agent --url` flag** (recent test addition) — beginners may want to clone a specific agent by URL without going through interactive environment/agent selection.
7. **Comparison vs the `vscode-copilotstudio` extension's own authoring UI** — when should a beginner use the extension's WYSIWYG vs this plugin's YAML-first authoring?
8. **`.github/plugin/` Copilot CLI plugin manifest** — referenced in CONTRIBUTING but the tree URL returned 404; raw file URL would confirm the manifest shape used for GitHub Copilot CLI discovery.
9. **Sub-agent system prompts** — full content of the 4 `agents/*.md` files would explain exactly how each sub-agent decides which internal skill to call.
10. **Microsoft Learn coverage** — independent search of `learn.microsoft.com/microsoft-copilot-studio/` for YAML-authoring / MCS quickstart pages that may exist outside this repo.

## Clarifying Questions

The user's question framing (mentions of "tunneling/devtunnel/ngrok", "skill manifest", "endpoint URL the Copilot Studio agent needs", and "registering the skill to a Copilot Studio agent") strongly suggests they are thinking of a Bot Framework v3 skill or a Copilot Studio external-skill/MCP scenario. **None of those apply to this repository.** Before doing follow-on work, the user should confirm intent:

1. **Goal A — Author/edit a Copilot Studio agent's YAML from VS Code on Windows:** This repo is correct. The beginner happy path on Windows is: install Node 18+, install the VS Code Copilot Studio Extension (prereq), then use **Claude Code CLI or GitHub Copilot CLI in a terminal** (NOT VS Code Copilot Chat embedded host, due to issue #116) to run `/plugin marketplace add microsoft/skills-for-copilot-studio` → `/plugin install copilot-studio@skills-for-copilot-studio` → `@copilot-studio:copilot-studio-manage clone` → edit → `push` → publish in portal → `@copilot-studio:copilot-studio-test ...`.

2. **Goal B — Build a Copilot Studio "skill" (Bot Framework skill) that another Copilot Studio agent calls:** This repo will not help. Direct the user to **Microsoft 365 Agents Toolkit (`atk`)** or **Bot Framework skill templates** instead.

3. **Goal C — Build an MCP server that a Copilot Studio agent can call as an action:** This repo will not scaffold the MCP server. It *can* help author the `add-action` MCP-action entry on the Copilot Studio agent side that points at an externally hosted MCP server, but the MCP server itself must be built elsewhere (MCP SDKs / Azure MCP server templates).

4. **Goal D — Make a Copilot Studio agent callable from GitHub Copilot in VS Code as a "skill":** Out of scope for this repo. That is a separate Copilot extensibility scenario.

5. **Prerequisite check:** Does the user already have a Copilot Studio environment and at least one agent provisioned in a Power Platform tenant? **The repo does not bootstrap this** — `clone` assumes an existing cloud agent. Without it, the only viable starting action is to first create an agent in the Copilot Studio portal.

Please confirm which goal the user is actually pursuing before recommending next steps.


