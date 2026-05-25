<!-- markdownlint-disable-file -->
# Research: Custom Skill Registration & Consumption in Microsoft Copilot Studio (2025-2026)

## Research Topics & Questions

1. **What "skill" means in Copilot Studio today** — definition, distinction between Bot Framework Skills, Tools/Plugins, Connected Agents, and MCP servers; current preferred model.
2. **Registration flow in the Copilot Studio web UI** — step-by-step path from the Agents page (`https://copilotstudio.microsoft.com/environments/<envId>/bots`) to a working agent that calls a custom skill.
3. **Skill endpoint / manifest contract** — required schema, HTTP endpoints, local dev story (tunnel vs deploy vs localhost).
4. **Auth options for beginner hello-world** — lowest-friction auth setting; what works for `microsoft/skills-for-copilot-studio` scaffold.
5. **Testing path** — how to invoke from test pane, trigger utterances, log/trace visibility.
6. **Environment prerequisites** — license/trial, role requirements.

## Status

**Complete** — All six topics answered with current (2026-04 to 2026-05) Microsoft Learn evidence and active GitHub samples. One major correction to the user's premise was discovered (see Clarifying Questions).

## External Research

Microsoft Learn docs (all confirmed live and dated 2025-12 through 2026-05 last-updated):

- Configure skills for use in Copilot Studio agents — `https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-add-skills` (last updated 2026-04-29; canonical Settings → Skills flow).
- Use skills in Copilot Studio — `https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-use-skills` (last updated 2026-01-22; how a registered skill is invoked from a topic).
- Implement a skill for use in Copilot Studio — `https://learn.microsoft.com/en-us/azure/bot-service/skill-pva` (manifest restrictions, same-tenant + single-tenant rules, validation error codes).
- Write a skill manifest (Bot Framework v2.2 schema reference) — `https://learn.microsoft.com/en-us/azure/bot-service/skills-write-manifest?view=azure-bot-service-4.0` (full v2.2 schema with sample manifest).
- Implement a skill (Bot Framework SDK echo skill) — `https://learn.microsoft.com/en-us/azure/bot-service/skill-implement-skill?view=azure-bot-service-4.0` (Important note: Bot Framework SDK was archived 2025-12; net-new skills should use Microsoft 365 Agents SDK).
- Extend your agent with Model Context Protocol — `https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp` (last updated 2026-04-17; MCP overview and "preferred for new tooling" positioning).
- Connect your agent to an existing MCP server — `https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent` (last updated 2026-05-15; MCP onboarding wizard step-by-step, Streamable HTTP transport only, SSE deprecated after Aug 2025).
- Add tools and resources from an MCP server to your agent — `https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-components-to-agent` (last updated 2026-05-16; per-tool enable/disable in the agent).
- Create a new MCP server — `https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-create-new-server` (last updated 2026-03-12).
- Test your agent — `https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot` (last updated 2025-12-23).
- Review agent activity (activity map / chain of thought / historical activity) — `https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-review-activity` (last updated 2026-05-20).
- Get access to Copilot Studio (licensing + trial) — `https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing-subscriptions` (last updated 2026-05-15).

GitHub samples consulted:

- microsoft/CopilotStudioSamples — `https://github.com/microsoft/CopilotStudioSamples/tree/main/extensibility/mcp` (catalog of MCP sample servers).
- microsoft/CopilotStudioSamples/extensibility/mcp/search-species-resources-typescript — `https://github.com/microsoft/CopilotStudioSamples/tree/main/extensibility/mcp/search-species-resources-typescript` (Node 18+ MCP server hello world, devtunnel-based, None auth).
- microsoft/Agents/samples/dotnet/copilotstudio-skill — `https://github.com/microsoft/Agents/tree/main/samples/dotnet/copilotstudio-skill` (Microsoft 365 Agents SDK Echo Skill; the canonical Bot Framework-style skill sample as of 2026).
- microsoft/skills-for-copilot-studio — `https://github.com/microsoft/skills-for-copilot-studio` (**NOT** a skill scaffold — see Clarifying Questions).

URLs that 404'd during research (their content has been merged into the docs cited above or renamed); noted so the executive caller does not waste calls re-fetching them: `agent-mcp`, `configuration-add-skill` (singular), `advanced-connected-agents`, `agent-extend-action`, `authoring-add-tools`, `extend-with-tools`, `agent-extend-action-plugins`, `agent-extend-action-overview`, `requirements-licensing-trial`, `authoring-activity-map`, `authoring-multi-agent`, `connected-agents`.

## Key Discoveries

### Definition & Terminology

The word **"skill"** in the Copilot Studio product surface in 2026 still maps almost exclusively to the legacy **Bot Framework / Microsoft 365 Agents SDK Skills feature**, reached via **Settings → Skills → Add a skill** and configured by pasting a manifest URL. The UI label, the docs page title (`configuration-add-skills`), and the error codes (`MANIFEST_FETCH_FAILED`, `MANIFEST_MALFORMED`, `APPID_NOT_IN_TENANT`, etc.) all retain the original "Skill" terminology.

Microsoft now ships **four distinct extension mechanisms** for Copilot Studio agents. They live in two different parts of the UI and use different contracts:

| Mechanism | UI path | Contract | Underlying tech | 2026 status |
| --- | --- | --- | --- | --- |
| **Skills (classic)** | Settings → Skills → Add a skill | Bot Framework Skill Manifest JSON (schema v2.2) at an HTTPS URL | Bot Framework / Microsoft 365 Agents SDK bot deployed with an Entra app registration | Supported. New skills should be built on Microsoft 365 Agents SDK; Bot Framework SDK was archived on GitHub 2025-12-31. |
| **Tools — MCP server** | Tools → Add a tool → New tool → Model Context Protocol | MCP Streamable HTTP endpoint URL (SSE deprecated Aug 2025) | Any MCP-compliant server (Node, Python, .NET) | **Preferred new model.** Requires generative orchestration enabled on the agent. |
| **Tools — Custom connector / Flow / Prompt / Connector action** | Tools → Add a tool → New tool → Custom connector (or others) | OpenAPI 2.0/3.0 YAML/JSON spec imported via Power Apps custom connector | Power Platform connector infrastructure | Supported. Common path when you already have an HTTP API but no MCP server. |
| **Connected agents (agent-to-agent)** | Add a connected agent inside an agent | Other agent published in same/another environment | Another Copilot Studio agent | Supported. Used when the "skill" you want is itself an entire conversational agent, not a tool. |

For the user's stated goal — "developer builds a skill locally and connects it to an agent" — **the lowest-friction 2026 path is MCP, not the classic Skills feature**, because MCP supports `None` authentication, requires only a Streamable HTTPS URL (devtunnel works), and skips the Entra app registration / single-tenant configuration / Home-page-URL-matching ceremony required by classic Skills.

### Project Structure (Product Flow)

From the Agents page (`https://copilotstudio.microsoft.com/environments/<envId>/bots`) to a working extension, the two valid flows in 2026:

**Flow A — Classic Skills (Settings → Skills)**

1. Agents → pick or create the agent → open the agent.
2. Settings (gear icon) → **Skills** in the left sidebar.
3. **Add a skill**.
4. Dialog reveals the **agent ID** (copy this — give it to the skill developer so the skill can allow-list the calling agent).
5. Paste the **HTTPS URL of the skill manifest JSON** (e.g. `https://your-tunnel-3978.devtunnels.ms/manifest/echoskill-manifest-1.0.json`).
6. **Next** — Copilot Studio runs validation (manifest schema, same-tenant Entra app check, endpoint health-check ping).
7. After successful validation, open or create a topic → Add node → **Add a tool** → pick the registered skill action.
8. Map any inputs/outputs to topic variables.
9. **Test your agent** panel (right-hand pane) — send a trigger phrase that hits the topic.

**Flow B — MCP server (Tools → Add a tool) — recommended for a 2026 hello-world**

1. Agents → pick or create the agent → open the agent.
2. **Tools** tab (top of the agent edit view).
3. **Add a tool** → **New tool** → **Model Context Protocol**. The MCP onboarding wizard opens.
4. Fill **Server name**, **Server description**, **Server URL** (e.g. `https://your-tunnel-3000.devtunnels.ms/mcp`).
5. **Authentication** → pick **None** (or API key / OAuth 2.0 if needed). For None, click **Create**.
6. **Add tool** dialog appears → **Create a new connection** → **Add to agent**.
7. Agent's Tools tab now shows the MCP server card. Open it to see auto-discovered Tools and Resources; toggle individual tools off if needed.
8. Make sure **generative orchestration** is on (Settings → Generative AI → "Generative" — MCP requires this).
9. **Test your agent** panel — type a user utterance that the orchestrator will route to one of the MCP tool names/descriptions.

The URL form `https://copilotstudio.microsoft.com/environments/<envId>/bots` in the user's prompt is the **Agents list** for a given Power Platform environment (named "Contoso" in the screenshot). Selecting any agent navigates to that agent's edit experience where both Settings → Skills and Tools → Add a tool are reachable.

### Implementation Patterns

**Local development story (the question every beginner asks):**

- Copilot Studio is a SaaS that calls the user's endpoint **outbound from Microsoft's cloud**. It **cannot** call `localhost`, `127.0.0.1`, or any RFC1918 address. You always need a public HTTPS URL.
- The two supported local-dev options for both classic Skills and MCP servers:
  - **Microsoft Dev Tunnels** (`devtunnel host -p <port> --allow-anonymous`) — preferred by every current Microsoft sample.
  - **ngrok** — works equivalently; just not what the samples document.
- Deploying to Azure App Service / Container Apps is fine but **not required** for a hello-world.

**MCP dev-tunnel URL shape (gotcha):** Dev Tunnels embeds the port in the hostname with a **hyphen**, not a colon. Example: `https://abc123-3000.devtunnels.ms/mcp` (NOT `https://abc123.devtunnels.ms:3000/mcp`). The MCP TypeScript sample's README calls this out explicitly.

**Classic Skill dev-tunnel constraints:** The classic Skills flow validates that the manifest's `endpointUrl` origin matches either the **Publisher domain** or **Home page URL** of the skill's Entra app registration. When tunneling, you must update that Entra app's Home page URL each time the tunnel URL changes. Federated Credentials and User-Assigned Managed Identity auth types **do not work over a dev tunnel** — only Client Secret and Certificate work locally. (Source: `microsoft/Agents` dotnet copilotstudio-skill README.)

**The `microsoft/skills-for-copilot-studio` repo is not what its name suggests.** It is a **Claude Code / GitHub Copilot CLI / VS Code plugin** for authoring Copilot Studio **agents** as YAML files. It does not scaffold a "skill" in either of the senses above. The genuinely useful starter repos are:

- For the **MCP / Tools** path (recommended hello-world): `microsoft/CopilotStudioSamples` under `extensibility/mcp/search-species-resources-typescript` — runs `npm install && npm start`, exposes `/mcp` on port 3000, dev-tunnel, None auth, ~5 minutes to a working tool.
- For the **classic Skills** path: `microsoft/Agents` under `samples/dotnet/copilotstudio-skill` — .NET 8, devtunnel on port 3978, requires an Azure Bot resource and a single-tenant Entra app registration (~30 minutes plus an Azure subscription).

### Complete Examples (UI Steps)

**Hello-world Path A — MCP server (recommended; ~15 minutes; no Azure subscription required)**

Prerequisites: Node.js 18+, Dev Tunnels CLI, Copilot Studio trial (work/school account).

```text
# Clone and run the sample
git clone https://github.com/microsoft/CopilotStudioSamples.git
cd CopilotStudioSamples/extensibility/mcp/search-species-resources-typescript
npm install
npm run build
npm start    # listens on http://localhost:3000/mcp

# Expose it publicly
devtunnel host -p 3000 --allow-anonymous
# copy the printed URL, e.g. https://abc123-3000.devtunnels.ms
# the MCP endpoint is https://abc123-3000.devtunnels.ms/mcp
```

In Copilot Studio (`https://copilotstudio.microsoft.com`):

1. Pick or create the agent in environment **Contoso**.
2. **Tools** → **Add a tool** → **New tool** → **Model Context Protocol**.
3. Server name: `Species Lookup`. Description: `Look up biological species info`. Server URL: `https://abc123-3000.devtunnels.ms/mcp`. Authentication: **None**. **Create**.
4. **Add tool** → **Create a new connection** → **Add to agent**.
5. Open **Test your agent** → ask `Tell me about butterflies`. The agent calls the `searchSpeciesData` MCP tool; the activity map shows the call, inputs, and outputs.

**Hello-world Path B — Classic Skill via Microsoft 365 Agents SDK (~45 minutes; requires Azure subscription)**

Prerequisites: .NET 8 SDK, Dev Tunnels, Azure subscription (for an Azure Bot resource), Microsoft 365 Agents Toolkit.

```text
git clone https://github.com/microsoft/Agents.git
cd Agents/samples/dotnet/copilotstudio-skill
# Edit wwwroot/manifest/echoskill-manifest-1.0.json:
#   - privacyUrl  -> https://<tunnel>/privacy.html
#   - iconUrl     -> https://<tunnel>/icon.png
#   - msAppId     -> your Entra app registration's Application (client) ID
#   - endpointUrl -> https://<tunnel>/api/messages

devtunnel host -p 3978 --allow-anonymous
dotnet run
# manifest is now served at https://<tunnel>/manifest/echoskill-manifest-1.0.json
```

Azure portal:

1. Create or pick an Azure Bot resource (auth type: SingleTenant + Client Secret for tunnels).
2. Configuration → Messaging endpoint = `https://<tunnel>/api/messages`.
3. In the Entra app registration for that bot, set **Home page URL** = same tunnel URL (this satisfies the Copilot Studio `MANIFEST_ENDPOINT_ORIGIN_MISMATCH` check).

Copilot Studio:

1. Open the agent → **Settings** → **Skills** → **Add a skill**.
2. Copy the agent ID shown in the dialog → put it in the skill's `AllowedCallers` list in `appsettings.json` (or use `["*"]` for the hello-world).
3. Paste manifest URL → **Next** → wait for validation.
4. Open a topic → Add node → **Add a tool** → pick **Echo messages from user** (or whichever action the manifest declared).
5. **Test your agent** → say a trigger phrase that fires that topic.

### API/Schema Documentation (Manifest Contract)

**Classic Skills require a Bot Framework Skill Manifest v2.2 JSON document** (`$schema` = `https://schemas.botframework.com/schemas/skills/v2.2/skill-manifest.json`).

Required top-level properties: `$id`, `$schema`, `name`, `version`, `publisherName`, `endpoints[]`. Endpoint objects require `name`, `endpointUrl` (HTTPS), `msAppId` (GUID — the Entra app registration ID).

Activity types accepted: `message`, `event`, `invoke` (skills can **receive** invoke but cannot send it); `otherActivities` covers `conversationUpdate`, `typing`, etc.

Hello-world minimum (the `microsoft/Agents` dotnet sample ships exactly this):

```json
{
  "$schema": "https://schemas.botframework.com/schemas/skills/skill-manifest-2.0.0.json",
  "$id": "EchoSkillBot",
  "name": "Echo Skill bot",
  "version": "1.0",
  "description": "This is a sample echo skill",
  "publisherName": "Microsoft",
  "endpoints": [
    {
      "name": "default",
      "protocol": "BotFrameworkV3",
      "endpointUrl": "http://echoskillbot.contoso.com/api/messages",
      "msAppId": "00000000-0000-0000-0000-000000000000"
    }
  ]
}
```

Limits enforced at registration: ≤ 100 actions per manifest, ≤ 25 inputs and ≤ 25 outputs per action, manifest size ≤ 500 KB, ≤ 100 skills per agent.

Required HTTP endpoints the skill bot must expose: `/api/messages` (the Bot Framework activity handler); the manifest itself served as a static JSON file (commonly under `/manifest/...`). The bot must respond to a Bot Framework `EndOfConversation` activity ping during the health check.

**MCP servers require a Streamable HTTP endpoint** (one URL, typically `/mcp`). The MCP server itself advertises its tools and resources at runtime through the MCP protocol; **there is no static manifest URL to paste** — Copilot Studio just stores the server URL and re-discovers tools/resources on every refresh. If you choose the alternative "Custom connector" path (option 2 in the MCP onboarding doc) for a manual import, you provide a tiny **OpenAPI/Swagger 2.0 YAML** of this shape:

```yaml
swagger: '2.0'
info:
  title: Contoso
  description: MCP server
  version: 1.0.0
host: contoso.com
basePath: /
schemes:
  - https
paths:
  /mcp:
    post:
      summary: Contoso Lead Management Server
      x-ms-agentic-protocol: mcp-streamable-1.0
      operationId: InvokeMCP
      responses:
        '200':
          description: Success
```

The key marker is `x-ms-agentic-protocol: mcp-streamable-1.0` on the POST operation.

### Configuration Examples

**Auth choices — ranked by friction for first-run:**

1. **MCP + None auth** — zero credentials, fastest start. Use for any non-sensitive hello-world. UI: MCP wizard → Authentication = None.
2. **MCP + API key (header or query)** — add a single static secret. UI: MCP wizard → Authentication = API key → choose Header or Query → name it.
3. **MCP + OAuth 2.0 with Dynamic Discovery (DCR)** — server advertises its OAuth metadata; Copilot Studio auto-registers. Use when the MCP server supports OAuth 2.0 DCR. UI: MCP wizard → OAuth 2.0 → Dynamic discovery → Create.
4. **MCP + OAuth 2.0 Manual** — provide client ID, client secret, authorization URL, token URL template, refresh URL, scopes. Copilot Studio returns a callback URL you register with your IdP.
5. **Classic Skills** — always requires an Entra app registration in **the same tenant** as the signed-in user; must be single-tenant; the app's Home page URL must match the manifest endpoint origin. Hello-world friendly setting: `AllowedCallers: ["*"]` in the skill's `appsettings.json` to let any Copilot Studio agent call it.

The user's question 4 referenced the lowest-friction setting "for the absolute simplest scaffold from `microsoft/skills-for-copilot-studio`". That repo does not ship a skill scaffold (see Clarifying Questions). Mapping the intent to the closest real scaffold: **`microsoft/CopilotStudioSamples/extensibility/mcp/search-species-resources-typescript` runs with Authentication = None**, which is the absolute simplest setting available anywhere in the product.

**Testing path and where logs live:**

- **Test pane** opens via the **Test** button at the top of any agent page; it is a chat panel docked to the right.
- Trigger by typing any utterance whose intent matches a Tool description (MCP), a Topic trigger phrase (Skills via Topics), or a connected-agent description (Connected agents).
- **Activity map** (real-time) visually shows nodes/tools fired during the turn. Enable with the three-dot menu → **Show activity map when testing**.
- **Track between topics** (three-dot menu) follows the conversation across topic boundaries.
- **Chain of Thought** appears inline in the test pane when the agent uses a reasoning-capable model (GPT-5 Reasoning, Claude Sonnet, Claude Opus).
- **Snapshot** — three-dot menu → **Save snapshot** → downloads `botContent.zip` containing `dialog.json` (full conversational diagnostics including error detail) and `botContent.yml`.
- **Historical activity** lives under the **Activity** tab on the agent. Each turn is a node in a map; selecting a tool node shows inputs, outputs, the rationale the orchestrator generated for choosing that tool, and timing. Historical data is stored in Microsoft 365 (Exchange-backed) — viewing it requires an Exchange license.
- For **classic Skill bot** errors specifically, the test pane shows the activity-map failure node; deeper traces live in the bot's own Application Insights / log stream (the bot is a separately deployed web app).

**Environment prerequisites (consolidated):**

- **License**: Free **Copilot Studio trial** is enough to build and test (but not publish). Sign-up at `https://go.microsoft.com/fwlink/?LinkId=2107702` requires a **work or school account** — personal Microsoft accounts and Gmail are rejected. Trial lasts initially with one 30-day extension; created agents continue to function up to 90 days after expiry.
- **Standalone Copilot Studio subscription** is required to publish, and to use Bot Framework Skills from Copilot Studio for Teams plan. The Teams-bundled plan **cannot use Bot Framework Skills at all** — it's standalone-only.
- **Role**: To add a skill or tool, the user needs sufficient permissions in the **Power Platform environment** containing the agent — typically **Environment Maker** at minimum, **System Administrator** for tenant-wide actions. Sign-up self-service may be disabled by the tenant admin; if so the admin must enable Copilot Studio self-service sign-up first.
- **Browser**: Chrome 91+, Firefox 89+, or Safari 16.4+.
- **For classic Skills only** (extra prerequisites): Azure subscription (to host the bot), Entra app registration in the same tenant configured as **single-tenant**, Entra app's **Home page URL** must match the manifest's endpoint origin.
- **For MCP only**: the agent must have **generative orchestration** turned on (Settings → Generative AI).

## Follow-on Questions

These came up during research but were not in the original scope; flagging for the executive caller to decide whether to commission additional research:

- Connected Agents (agent-to-agent orchestration) doc page returned 404 at the URLs I tried; the feature clearly exists in the UI but the canonical Learn URL may have moved. If the user later asks for an A2A example, additional research is needed to locate the current doc.
- Power Platform Environment Maker vs System Administrator vs Copilot Studio User role mapping — confirmed Environment Maker is generally sufficient for add-skill, but the precise PPAC role surface in 2026 may have changed.
- The exact privacy/DLP impact of MCP servers under tenant **Data Loss Prevention (DLP)** policy — the docs note MCP traffic flows through the Power Platform connector layer and is therefore governed by DLP, but the specifics for a hello-world with an untrusted external MCP server should be confirmed if the user moves beyond Contoso-internal endpoints.

## Clarifying Questions

These need user input before any walkthrough can be confidently written:

1. **Major premise correction**: `microsoft/skills-for-copilot-studio` (referenced in the original request) is **not a hello-world skill scaffold** — it is a Claude Code / GitHub Copilot CLI / VS Code plugin for authoring Copilot Studio **agents** (YAML files), not for building a "skill" the agent calls. Did the user mean one of these instead?
   - `microsoft/CopilotStudioSamples` → `extensibility/mcp/search-species-resources-typescript` (MCP server hello-world, Node.js)
   - `microsoft/Agents` → `samples/dotnet/copilotstudio-skill` (classic Bot Framework Skill, .NET 8)
   - `microsoft/BotBuilder-Samples` → `samples/csharp_dotnetcore/80.skills-simple-bot-to-bot` (older Bot Framework SDK echo skill — note Bot Framework SDK was archived 2025-12)
2. **Which "skill" model does the user want the walkthrough to use** — the modern MCP path (no Azure subscription, None-auth-friendly) or the classic Skills path (manifest URL, requires Azure Bot + Entra single-tenant app)? They produce very different walkthroughs.
3. Does the user have a **work or school account** ready (required for the free Copilot Studio trial — personal Microsoft / Gmail accounts are rejected)?
4. If the classic Skills path is wanted, does the user have an **Azure subscription** and the rights to create an Azure Bot resource and an Entra app registration in their tenant?
