<!-- markdownlint-disable-file -->
# Research: Disambiguating "Copilot CLI" for microsoft/skills-for-copilot-studio

**Date:** 2026-05-25
**Status:** Complete
**Scope:** Identify which "Copilot CLI" the user means when proposing to "try out this skill" from the microsoft/skills-for-copilot-studio repo, and document exact Windows install + usage commands.

---

## 1. Research Questions

1. Which CLI does the user almost certainly mean by "copilot CLI" in the context of building/testing a Copilot Studio skill from [microsoft/skills-for-copilot-studio](https://github.com/microsoft/skills-for-copilot-studio)?
2. What does the repo README/SETUP_GUIDE actually name as the supported CLI host(s)?
3. For the correct CLI, what are the exact Windows install, verify, auth, and "test invoke" commands?
4. Why are the other candidate CLIs (`atk` / `pac` / a hypothetical `cps` / GitHub Copilot CLI / declarative-agent CLI) ruled in or out?

## 2. Decision Summary

| Item | Value |
|---|---|
| Recommended CLI | **GitHub Copilot CLI** (`copilot`, npm package `@github/copilot`, winget `GitHub.Copilot`) |
| Confidence | **Very high** — the repo README explicitly names it as one of three supported hosts and gives the exact `/plugin marketplace add` + `/plugin install` invocation. |
| Tie-breaker | Repo README beats brand-recognition guessing. The original prompt provisionally labelled GitHub Copilot CLI a "red herring"; the README contradicts that and is authoritative. |

The repo is a **plugin**, not a scaffolded project. There is no `npm run dev` / "scaffold + run locally" loop in the traditional sense. The flow is: install the plugin into Copilot CLI → `clone` a real Copilot Studio agent from the cloud → edit YAML → `push` → publish in the Copilot Studio web UI → `test` against the published agent.

## 3. Key Evidence — What the Repo README Says

Source: [microsoft/skills-for-copilot-studio README](https://github.com/microsoft/skills-for-copilot-studio) and [SETUP_GUIDE.md](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md).

### 3.1 Repo self-description (verbatim)

> A plugin for Claude Code, **GitHub Copilot CLI**, and VS Code that enables authoring, testing, and troubleshooting Microsoft Copilot Studio agents through YAML files — directly from your terminal or editor.

### 3.2 Prerequisites table (SETUP_GUIDE.md)

| Tool | Version | Verify |
|---|---|---|
| Node.js | 18+ | `node --version` |
| Claude Code **or GitHub Copilot CLI** | Latest | `claude --version` or **`copilot --version`** |
| Copilot Studio VS Code Extension | Latest | Install from marketplace (provides the `LanguageServerHost` binary used by clone/push/pull — VS Code does not need to be running) |

### 3.3 Install commands the repo prescribes (interactive slash commands inside `copilot`)

```text
/plugin marketplace add microsoft/skills-for-copilot-studio
/plugin install copilot-studio@skills-for-copilot-studio
```

### 3.4 Update command the repo prescribes (terminal, not interactive)

```text
copilot plugin update skills-for-copilot-studio
```

The `copilot plugin update ...` terminal verb is documented in the README's "Updating" table specifically under the **GitHub Copilot CLI** row — direct proof that the `copilot` binary referenced is GitHub Copilot CLI, not any other CLI.

### 3.5 The four sub-agents exposed by the plugin

Once installed, these are invocable inside the `copilot` interactive session (via `@` or `/` autocomplete):

| Sub-agent | Purpose |
|---|---|
| `copilot-studio:copilot-studio-manage` | Clone, push, pull, sync agent content between local files and cloud |
| `copilot-studio:copilot-studio-author` | Create/edit YAML (topics, actions, knowledge, triggers, variables) |
| `copilot-studio:copilot-studio-test` | Test published agents — point-test, batch suites, evaluation analysis |
| `copilot-studio:copilot-studio-advisor` | Design guidance, agent review, troubleshooting |

### 3.6 Caveat from SETUP_GUIDE.md (important)

> **Note:** The plugin works with Claude Code and GitHub Copilot CLI (terminal). VS Code Copilot Chat support is in progress — the embedded Copilot branch does not yet inject SessionStart hook context the same way the CLI does. See [#116](https://github.com/microsoft/skills-for-copilot-studio/issues/116) for updates.

So for the **terminal** workflow the user described, **GitHub Copilot CLI is the recommended host** (Claude Code is the other fully-supported option, but the user said "copilot CLI", not "Claude Code").

## 4. Exact Windows Commands for the Recommended CLI

Sources: [Installing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli), [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli), [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli).

### 4.1 Prerequisites

- An active GitHub Copilot subscription. If you receive Copilot from an org, the **Copilot CLI policy** must be enabled in org settings.
- **Windows: PowerShell v6 or higher** (the CLI also runs in WSL). PowerShell 5.1 is not supported.
- Node.js 22+ if installing via npm (the docs require 22; the skills-for-copilot-studio README lists Node 18+ for its own LSP — install Node 22+ to satisfy both).
- The **Copilot Studio VS Code extension** (from the VS Code marketplace) must be installed because the plugin uses the extension's bundled `LanguageServerHost` binary for clone/push/pull. VS Code itself does not need to be running.

### 4.2 Install (pick one)

PowerShell (winget — preferred on Windows):

```powershell
winget install GitHub.Copilot
```

Cross-platform (npm):

```powershell
npm install -g @github/copilot
```

If `~/.npmrc` has `ignore-scripts=true`, the docs require:

```powershell
$env:npm_config_ignore_scripts="false"; npm install -g @github/copilot
```

Prerelease variants: `winget install GitHub.Copilot.Prerelease` or `npm install -g @github/copilot@prerelease`.

### 4.3 Verify install

```powershell
copilot --version
```

(Matches the README's "Verify" column.)

### 4.4 Launch + authenticate

```powershell
cd C:\path\to\some\trusted\working-folder
copilot
```

On first launch:

1. Copilot asks you to confirm you trust the folder. Choose "Yes" or "Yes and remember" as appropriate.
2. If you are not already authenticated, you are prompted to run `/login` inside the interactive session. Enter `/login` and follow the device-code/browser flow.

Non-interactive auth alternative: set `COPILOT_GITHUB_TOKEN` (or `GH_TOKEN` / `GITHUB_TOKEN`, in that order of precedence) to a fine-grained PAT scoped to the user account with the **Copilot Requests** permission.

### 4.5 Install the skills-for-copilot-studio plugin (run **inside** the interactive `copilot` session)

```text
/plugin marketplace add microsoft/skills-for-copilot-studio
/plugin install copilot-studio@skills-for-copilot-studio
```

Verify: type `@` in the prompt — you should see the four `copilot-studio:*` sub-agents in autocomplete.

### 4.6 End-to-end "try it out" flow (inside `copilot`)

```text
@copilot-studio:copilot-studio-manage clone
@copilot-studio:copilot-studio-author Create a topic called "Product Information" that lists our top 3 products
@copilot-studio:copilot-studio-advisor Validate all topics in my agent
@copilot-studio:copilot-studio-manage push
```

Then publish the draft in [copilotstudio.microsoft.com](https://copilotstudio.microsoft.com/) (the plugin can't publish — pushing only creates a draft).

### 4.7 Test the published agent — this is the closest equivalent to "test invoke"

There is no offline `invoke` verb. Testing means sending a real message to the **published** agent:

```text
@copilot-studio:copilot-studio-test Send "What products do you offer?" to the published agent
```

Prerequisite for point-test invoke (first run only): an **Azure App Registration** in Entra ID with:

- Platform: **Public client / Native (mobile and desktop applications)**
- Redirect URI: `http://localhost` (HTTP, not HTTPS)
- API permission: **Power Platform API → Delegated → CopilotStudio → `CopilotStudio.Copilots.Invoke`** (admin consent optional but smoother)

The test sub-agent prompts for the Client ID on first use, authenticates via device code, and returns the agent's full response. Multi-turn is supported automatically.

Alternative test paths supported by the plugin:

- Batch suite via [Power CAT Copilot Studio Kit](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit) (requires Dataverse-scoped App Registration).
- Analyze a CSV exported from Copilot Studio's Evaluate feature: `@copilot-studio:copilot-studio-test Analyze my evaluation results from ~/Downloads/Evaluate MyAgent.csv`.

### 4.8 Required / useful environment variables

| Variable | Purpose |
|---|---|
| `COPILOT_GITHUB_TOKEN` / `GH_TOKEN` / `GITHUB_TOKEN` | Non-interactive auth (fine-grained PAT with **Copilot Requests** permission). Precedence is left-to-right. |
| `COPILOT_HOME` | Override the default `~/.copilot` config directory (where `settings.json`, `mcp-config.json`, and plugin state live). |
| `COPILOT_PROVIDER_BASE_URL` / `COPILOT_PROVIDER_TYPE` / `COPILOT_PROVIDER_API_KEY` / `COPILOT_MODEL` | Only needed if you bring your own model provider (OpenAI-compatible, Azure OpenAI, Anthropic, or local Ollama). Leave unset to use GitHub-hosted models. |

No special env vars are required by the **skills-for-copilot-studio** plugin itself — auth for the Copilot Studio side is handled interactively (browser sign-in on first clone/push, App Registration Client ID for first test invoke).

## 5. Why the Other Candidates Are NOT the Right CLI

### 5.1 Microsoft 365 Agents Toolkit CLI (`atk` / `teamsapp`)

- The repo README never mentions it.
- It targets **declarative agents and custom-engine agents for Microsoft 365 Copilot** (Teams, Office), not the Copilot Studio YAML-authored agents that this repo edits.
- The clone/push/pull surface here is `LanguageServerHost` from the Copilot Studio VS Code extension, not `teamsapp` / `atk`.
- **Verdict:** Wrong product family. Reject.

### 5.2 Power Platform CLI (`pac`)

- The repo README and SETUP_GUIDE never mention `pac` or `pac copilot`.
- `pac copilot` verbs (create, predict, export, list) target the **classic Power Virtual Agents / older Copilot Studio bot export model**, not the YAML-based authoring loop this plugin targets.
- The plugin instead relies on the **Copilot Studio VS Code extension's LSP binary** for clone/push/pull.
- **Verdict:** Adjacent but unrelated tooling. Reject.

### 5.3 Hypothetical "Copilot Studio CLI" / `cps`

- No official first-party standalone CLI named "Copilot Studio CLI" or `cps` exists from Microsoft as of 2026-05-25.
- Microsoft Learn does not document one; the Copilot Studio code-editing surface ships **as a VS Code extension + LSP binary**, consumed by Claude Code, GitHub Copilot CLI, and VS Code Copilot Chat via this plugin.
- **Verdict:** Doesn't exist as a first-party product. Reject.

### 5.4 GitHub Copilot CLI (`copilot`, `@github/copilot`)

- The **README explicitly lists it** as one of three supported hosts ("A plugin for Claude Code, GitHub Copilot CLI, and VS Code…").
- The README's "Updating" table has a dedicated **GitHub Copilot CLI** row showing `copilot plugin update skills-for-copilot-studio`.
- The SETUP_GUIDE's prerequisites verify command for the GitHub Copilot CLI row is **`copilot --version`** — same binary.
- **Verdict:** This is the answer. Accept. (The original prompt's hypothesis that this was a "red herring for shell suggestions" reflects the older `gh copilot suggest` extension. That `gh copilot` extension is a different, deprecated thing; the modern `copilot` CLI installed via `winget install GitHub.Copilot` is a full agent host with plugin/skill/MCP support.)

### 5.5 Copilot for Microsoft 365 plugin CLI / Declarative agent CLI

- Folds into the M365 Agents Toolkit CLI category. The repo never references it. Same rejection as 5.1.
- **Verdict:** Wrong product family. Reject.

## 6. Quick Reference — Drop-in Windows Setup Script

```powershell
# 1. Install (one of these)
winget install GitHub.Copilot
# or: npm install -g @github/copilot   (requires Node.js 22+)

# 2. Verify
copilot --version

# 3. Install the VS Code Copilot Studio extension (provides the LSP binary)
#    From the VS Code Marketplace: "Copilot Studio" by Microsoft
#    (VS Code itself does not need to be running afterward.)

# 4. cd into a folder you trust and launch the CLI
cd C:\src\copilot-studio-work
copilot

# 5. Inside the interactive session, authenticate and install the plugin:
#    /login
#    /plugin marketplace add microsoft/skills-for-copilot-studio
#    /plugin install copilot-studio@skills-for-copilot-studio

# 6. Verify the plugin loaded: type @ and look for copilot-studio:* sub-agents

# 7. Clone an existing Copilot Studio agent (opens browser for sign-in):
#    @copilot-studio:copilot-studio-manage clone

# 8. Author, push, publish in the web UI, then test:
#    @copilot-studio:copilot-studio-author Create a topic that handles laptop requests
#    @copilot-studio:copilot-studio-manage push
#    (publish via copilotstudio.microsoft.com)
#    @copilot-studio:copilot-studio-test Send "How do I request a new laptop?" to the published agent
```

## 7. References

- [microsoft/skills-for-copilot-studio README](https://github.com/microsoft/skills-for-copilot-studio)
- [microsoft/skills-for-copilot-studio SETUP_GUIDE.md](https://github.com/microsoft/skills-for-copilot-studio/blob/main/SETUP_GUIDE.md)
- [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
- [Installing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli)
- [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [Copilot Studio web portal](https://copilotstudio.microsoft.com/)
- [Power CAT Copilot Studio Kit](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit) (optional, for batch test suites)

## 8. Recommended Follow-on Research (Not Done This Session)

- [ ] Confirm whether VS Code Copilot Chat embedded host has shipped SessionStart hook parity since [issue #116](https://github.com/microsoft/skills-for-copilot-studio/issues/116) was filed — if yes, the user can also run this skill from inside VS Code chat without leaving the editor.
- [ ] Document the minimum Power Platform environment role required for the interactive browser sign-in on `clone` / `push` (the SETUP_GUIDE assumes the user already has a Copilot Studio environment with an existing agent).
- [ ] Walk the App Registration setup for `CopilotStudio.Copilots.Invoke` step-by-step with screenshots if the user has not previously set one up.
- [ ] Verify the exact Node.js floor: README says 18+, but `@github/copilot` npm install requires 22+. Installing Node 22+ satisfies both, so this is not a blocker — but it's worth documenting if the user has Node 18 pinned.

## 9. Clarifying Questions for the User

None — the user's intent ("copilot CLI to try out this skill") combined with the repo README's explicit naming of GitHub Copilot CLI as a supported host is unambiguous. If the user instead meant Claude Code, the same plugin works there; the install verb pattern (`/plugin marketplace add …` / `/plugin install …`) is identical.
