<!-- markdownlint-disable-file -->
# Playwright Screenshot Strategy Research

> **Status:** Complete (pending validation against the final SSG choice from sibling-repo Subagent D).
>
> **Scope:** Workshop screenshot capture strategy for a bilingual (EN/ES) Microsoft Copilot Studio workshop site on Windows, covering three surfaces: (1) Copilot Studio web portal, (2) VS Code editor + integrated terminal, (3) GitHub Copilot CLI terminal output.

## Research questions (tracking)

- [x] **A. Playwright fundamentals** — install, browser projects, headed/headless, screenshot options, DPI.
- [x] **B. Surface 1 — Copilot Studio portal** — auth (storageState vs service account vs manual), MFA, redaction, locale switching, selectors, code samples.
- [x] **C. Surface 2 — VS Code** — Electron driver feasibility, manual capture, screenshot mode, code-block rendering alternative.
- [x] **D. Surface 3 — Terminal/CLI** — asciinema+agg, carbon-now-cli, freeze, silicon, Windows capture.
- [x] **E. Build-time integration** — repo layout, npm scripts, pre-commit vs CI regeneration, headless verification.
- [x] **F. Bilingual strategy** — one shot vs two, Copilot Studio language switching.
- [x] **G. Risks / TOS** — Microsoft automation policy, tenant leakage, UI drift cadence.

## Headline recommendation (TL;DR)

The workshop has **three structurally different capture surfaces** and the right answer is **three different tools**, not one Playwright harness for everything.

| Surface | Recommended primary | Why |
| --- | --- | --- |
| **Public web (workshop site itself, deployed sample web app, Microsoft Learn pages used under fair use)** | Playwright headless (`page.screenshot`) with project-per-language | Fully scriptable, deterministic, reruns on every release, can mask dynamic content. |
| **Copilot Studio portal (`copilotstudio.microsoft.com`)** | Playwright **headed**, one-time interactive login → reuse `storageState` until expiry | Entra MFA cannot be safely automated. Storage-state seeding is the official Playwright pattern and the only one that survives Microsoft conditional-access policies. |
| **VS Code editor + integrated terminal** | **Manual snipping** (or `Win+Shift+S`) of VS Code Insiders configured with Screencast Mode, Zen-ish layout, and a high-contrast theme. Render most code as plain `code` fences in the SSG and only screenshot the workbench when the chrome matters (CodeLens, extension panels, debug, GHCP chat side panel). | Playwright's `_electron` driver against shipping VS Code Stable is unsupported and breaks across point releases; the maintenance cost outweighs the value when ~80% of editor "screenshots" can be live-rendered code blocks. |
| **Pure terminal / CLI output (azd, dotnet, gh copilot, az)** | [`charmbracelet/freeze`](https://github.com/charmbracelet/freeze) (`freeze --execute "..."`) producing PNG/SVG | Native binary, Windows-supported, no browser dependency, themes match the workshop aesthetic, deterministic re-render from cached `.txt` transcripts. Use `asciinema + agg` only when a lab specifically needs an animated GIF. |

Two Playwright projects (`en`, `es`) emit to `screenshots/<lang>/<lab>/<step>.png`; terminal stills emit to `screenshots/terminal/<lang>/<lab>/<step>.png` from cached transcripts so they regenerate cheaply. **Do not** regenerate any of these on every CI build — regenerate on demand via a manually-triggered GitHub Action or local script, and commit the resulting PNGs.

## Surface map

| # | What | Source | Automatable? | Auth required | Drift cadence |
| --- | --- | --- | --- | --- | --- |
| 1a | **Workshop site itself** (the SSG output, navigation, language toggle, lab pages) | `localhost:3000` or the deployed `gh-pages` URL | Yes — Playwright headless | None | Tied to our own commits |
| 1b | **Deployed sample web app** built by the workshop (Hello World agent embedded page, etc.) | `https://<our-app>.azurewebsites.net` or similar | Yes — Playwright headless | Demo user only | Tied to our own commits |
| 1c | **Microsoft Learn / Copilot Studio docs pages** used under fair use in the workshop | `https://learn.microsoft.com/...` | Yes — Playwright headless | None | ~monthly; pin a `?wt.mc_id` and capture date in alt text |
| 2 | **Copilot Studio portal** (creating an agent, adding a topic, publishing) | `https://copilotstudio.microsoft.com` | Partially — `storageState` reuse only after interactive seed | Entra ID + MFA + conditional access | Roughly monthly UI changes |
| 3a | **VS Code editor** (file open, IntelliSense, Copilot chat panel, extension UI) | Local VS Code Insiders | **Not recommended** to automate; manual snip | None | Tied to VS Code releases (~monthly) |
| 3b | **VS Code integrated terminal** (when the surrounding chrome matters) | Same | Same as 3a — manual snip | None | Same |
| 4 | **Pure CLI output** (`azd up`, `dotnet build`, `gh copilot suggest`, `az login`) | Local shell, no editor chrome | Yes — `freeze --execute "..."` against a recorded transcript | None (run as demo user, scrub identifiers) | Low (changes when CLI versions bump) |

> **Translation:** roughly **2 of 4 surfaces** are fully scripted, **1 is semi-scripted** (Copilot Studio with seeded auth), **1 is fully manual** (VS Code). That bounds the harness ambition: aim for a small, sharp tool, not an everything-automation.

## Playwright on Windows — setup

### Install

```powershell
# in repo root, alongside the SSG
npm init playwright@latest -- --quiet --browser=chromium --gha=false
npx playwright install chromium      # only Chromium; we do not need WebKit/Firefox parity for screenshots
npx playwright install-deps          # Windows: largely a no-op, but harmless
```

Pick **TypeScript**, tests folder `screenshots/playwright`, and **decline** the GitHub Actions starter — we'll write a manually-triggered one later. The official quickstart and system requirements confirm Node 20.x/22.x/24.x on Windows 11+ and that the wizard is rerunnable without overwriting existing tests ([Playwright docs — Installation](https://playwright.dev/docs/intro)).

### Deterministic capture knobs (the ones that actually matter)

These knobs are the difference between "screenshots that change every run" and "screenshots that change only when content changes." All are documented on [`Page.screenshot()`](https://playwright.dev/docs/api/class-page#page-screenshot) and the [Screenshots guide](https://playwright.dev/docs/screenshots).

| Knob | Set to | Why |
| --- | --- | --- |
| `use.viewport` | `{ width: 1440, height: 900 }` for desktop chrome, `{ width: 390, height: 844 }` for the mobile lab if you have one | Pins layout |
| `use.deviceScaleFactor` | `2` | Retina-quality PNGs; matches what readers see on modern laptops |
| `use.colorScheme` | `'light'` (default) | Avoid system dark-mode contamination |
| `use.locale` | `'en-US'` / `'es-ES'` (per project) | Drives both `navigator.language` and `Accept-Language` headers |
| `use.timezoneId` | `'America/Los_Angeles'` (or pick one and stick) | Stops "Last edited 3 minutes ago" style timestamps from drifting |
| `page.screenshot({ fullPage: true })` | When you want the whole scrollable page | One image, no manual stitching |
| `page.screenshot({ clip: { x, y, width, height } })` | When you want a region | Lets you crop to a hero card without locator brittleness |
| `page.screenshot({ mask: [page.locator('.user-name'), ...] })` | Always, for anything tenant-flavored | Overlays `#FF00FF` (configurable via `maskColor`) over PII before the PNG is written |
| `page.screenshot({ style: '...' })` | To hide blinking carets, animations | Injected CSS pierces Shadow DOM |
| `page.screenshot({ animations: 'disabled' })` | Always | Pauses CSS animations and resets to start-state |
| `page.screenshot({ caret: 'hide' })` | Always for inputs | Removes the blinking caret artifact |

`mask`, `animations`, `caret`, `style`, `fullPage`, and `clip` are all documented as first-class options on `page.screenshot` and `locator.screenshot` ([Playwright API](https://playwright.dev/docs/api/class-page#page-screenshot)).

### Project layout (Playwright config)

Multi-project gives us per-language capture without duplicate test files.

```ts
// screenshots/playwright/playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  fullyParallel: false,                    // screenshots must be sequential to avoid race-y auth state
  workers: 1,
  reporter: [['list']],
  use: {
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
    timezoneId: 'America/Los_Angeles',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'off',                     // never capture on failure; we capture explicitly
    trace: 'off',
  },
  projects: [
    // Seed projects (manual auth). Tag with @seed so the default run skips them.
    { name: 'seed-copilotstudio', testMatch: /seed\.copilotstudio\.ts/, grep: /@seed/ },

    // EN capture
    {
      name: 'en-public',
      use: { ...devices['Desktop Chrome'], locale: 'en-US', extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' } },
      testMatch: /public\..*\.ts/,
    },
    {
      name: 'en-copilotstudio',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'en-US',
        extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' },
        storageState: 'screenshots/.auth/copilotstudio.json',
      },
      testMatch: /copilotstudio\..*\.ts/,
    },

    // ES capture — same tests, different locale
    {
      name: 'es-public',
      use: { ...devices['Desktop Chrome'], locale: 'es-ES', extraHTTPHeaders: { 'Accept-Language': 'es-ES,es;q=0.9' } },
      testMatch: /public\..*\.ts/,
    },
    {
      name: 'es-copilotstudio',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'es-ES',
        extraHTTPHeaders: { 'Accept-Language': 'es-ES,es;q=0.9' },
        storageState: 'screenshots/.auth/copilotstudio.json',
      },
      testMatch: /copilotstudio\..*\.ts/,
    },
  ],
});
```

Two design points worth pulling out:

* **`workers: 1` + `fullyParallel: false`** — screenshots are I/O-bound by the network, not CPU-bound; parallelism only buys flakes here.
* **A separate `seed-*` project** — Playwright's documented pattern for storageState is "auth in a setup project, reuse in test projects" ([Authentication guide](https://playwright.dev/docs/auth)). We keep the seed isolated so the default `npm run screenshots` never tries to re-login.

## Surface 1 — Copilot Studio portal

### The authentication shape (the hard part)

The portal at `https://copilotstudio.microsoft.com` requires a **Microsoft work or school account** with a Copilot Studio license and almost always **MFA**, gated by your tenant's conditional access policies ([Get access to Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing-subscriptions)). Three implications:

1. **No headless first-login.** MFA prompts (Authenticator app, FIDO2, SMS, number-matching) cannot be scripted from a CI runner without provisioning a service-principal-style account *and* having tenant admin disable MFA for it, which is **explicitly against Microsoft's security guidance** for any account that touches production data.
2. **Storage-state reuse is the right pattern.** The interactive first run is performed locally by a human, the resulting cookies + localStorage + IndexedDB blob is saved, and subsequent runs reuse it until the tokens expire (typically 24h for the session cookies, refresh tokens vary by tenant config) — this is exactly the [Playwright auth reuse pattern](https://playwright.dev/docs/auth) and it's the only one that survives conditional access.
3. **Treat the storage state file as a secret.** Playwright docs say it plainly: "The browser state file may contain sensitive cookies and headers that could be used to impersonate you or your test account. We strongly discourage checking them into private or public repositories." We put it in `screenshots/.auth/` and add that directory to `.gitignore` immediately.

### Seeding the storage state (one-time, on the maker's machine)

```ts
// screenshots/playwright/seed.copilotstudio.ts
import { test as setup, expect } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

const authFile = path.join(__dirname, '..', '.auth', 'copilotstudio.json');

setup('seed copilot studio auth @seed', async ({ page }) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  await page.goto('https://copilotstudio.microsoft.com');

  // The portal redirects to login.microsoftonline.com. We do not script the form
  // fill — we let the human do MFA. Just wait for the post-login redirect back.
  console.log('\n>>> Complete sign-in (including MFA) in the opened browser window.\n');

  await page.waitForURL(/copilotstudio\.microsoft\.com\/(home|environments)/, {
    timeout: 5 * 60_000, // five minutes is generous for MFA
  });

  // Defensive: confirm we see something only an authenticated session would render.
  await expect(page.getByRole('button', { name: /create|crear/i })).toBeVisible({ timeout: 30_000 });

  await page.context().storageState({ path: authFile });
  console.log(`\n>>> Saved auth state to ${authFile}\n`);
});
```

Run it once with the browser visible:

```powershell
npx playwright test --project=seed-copilotstudio --headed
```

After that, the `en-copilotstudio` and `es-copilotstudio` projects pick up the same file via `use.storageState` and run **headless** until the cookies expire.

### Capturing a flow (illustrative)

```ts
// screenshots/playwright/copilotstudio.create-agent.ts
import { test } from '@playwright/test';
import path from 'node:path';

const out = (name: string, info: import('@playwright/test').TestInfo) =>
  path.join('screenshots', 'final', info.project.name.split('-')[0], 'lab-01-create-agent', `${name}.png`);

test('Create agent — landing', async ({ page }, info) => {
  await page.goto('https://copilotstudio.microsoft.com');
  await page.getByRole('button', { name: /create|crear/i }).click();
  await page.screenshot({
    path: out('01-landing', info),
    fullPage: false,
    animations: 'disabled',
    caret: 'hide',
    mask: [
      page.locator('[data-testid="user-profile"]'),     // top-right avatar + UPN
      page.locator('[data-testid="environment-picker"]'),// tenant env name
    ],
  });
});
```

### Locale switching

Copilot Studio's UI **follows the browser language** ([Language support](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-language-support)). Setting Playwright's `use.locale: 'es-ES'` plus `Accept-Language: es-ES,es;q=0.9` is sufficient for the authoring canvas chrome. Caveats:

* The **agent's own content** (topics, generative answers) renders in the agent's *primary language*, which is set at agent creation. If your bilingual workshop has a single agent demo, you'll see English content in the Spanish UI screenshots — that's expected and arguably authentic.
* If a screenshot must show fully Spanish UX **including the agent**, create two agents (one per primary language) and route the ES project at the ES agent.
* Some legacy areas read the *Microsoft account language preference* rather than the browser header. If your seeded account is configured for English, those panels will stay English even in the ES project. Workaround: seed two separate auth files, one per account language preference. Usually overkill; only do this if a reviewer flags it.

### Required masks (the bare minimum)

| Element | Selector hint (likely; verify in DevTools) | Reason |
| --- | --- | --- |
| User avatar + UPN, top right | `[data-testid="user-profile"]`, `[aria-label*="account manager" i]` | PII |
| Environment picker | `[data-testid="environment-picker"]`, `[aria-label*="environment" i]` | Tenant name leakage |
| URL bar / page URL with env GUID | N/A in screenshot (the chrome is the browser chrome — keep `fullPage: false` to crop it out) | GUID leakage |
| Agent IDs / bot IDs in URLs and headers | `[data-field="botId"]`, etc. | GUID leakage |
| Any "Last edited by …" timestamps | `[data-testid="last-edited"]` | Noise, drift |

Use Playwright's `style` option to also blank out timestamps without a selector:

```ts
await page.screenshot({
  path: '...',
  style: '[data-testid="timestamp"], .last-edited, time { color: transparent !important; }',
});
```

### Selectors — keep them resilient

* Prefer `getByRole`, `getByLabel`, `getByText` over CSS / `data-testid` when the latter aren't promised to be stable. The Copilot Studio team ships UI updates **roughly monthly**, and CSS-class selectors break on every redesign. Role-based selectors survive purely visual refreshes.
* Wrap each step's locator in `await expect(locator).toBeVisible({ timeout: 30_000 })` before the screenshot — this both proves the screen reached the captured state and gives a far better error message than a blank PNG when the UI moves.

## Surface 2 — VS Code editor + integrated terminal

### Why we are not automating VS Code via Playwright

Playwright supports [Electron automation](https://playwright.dev/docs/api/class-electron) and it works against unsigned Electron apps (Code-OSS, custom builds). Against **shipping VS Code Stable on Windows**, it is brittle for three reasons:

1. **Code signing + Fuses.** VS Code Stable ships with `EnableNodeCliInspectArguments` set in a way that makes the Playwright Electron handshake unreliable across point releases. The Playwright docs themselves call this out as a known cause of launch timeouts.
2. **Workbench DOM is not a stable contract.** Internal CSS classes, ARIA roles, and `aria-label`s in the workbench change without notice. Tests written today break next month.
3. **The supported automation surface is `@vscode/test-electron`,** which is what VS Code's own integration tests and extension authors use — but it is geared at running extension test suites, not at giving you Playwright DOM ergonomics for the workbench chrome (file explorer, editor, terminal, side panels).

There **is** a category where Playwright-against-Electron is the right call: if you've packaged VS Code into a custom dev image and you want regression screenshots of *your own* extension's UI inside that image. The workshop's hello-world walkthrough does not fit that case.

### What we do instead

A two-track approach that costs roughly **one afternoon of setup** vs the **multi-week cycle** of fighting an Electron harness:

1. **Render most "editor screenshots" as plain code blocks** in the SSG. Docusaurus (Shiki/Prism), MkDocs Material (Pygments/Shiki), Hugo (Chroma), and Astro (Shiki) all produce typographically-superior, copy-pasteable, accessible code blocks that beat any screenshot. **Approximately 80% of "VS Code screenshots" in tutorials should be code blocks** — they only need to *look* like the editor.
2. **For the remaining 20%** (Copilot chat panel, extension marketplace, IntelliSense menu, debug breakpoint with variables panel, output panel), use **manual capture** with the following preflight.

### VS Code preflight for manual screenshots

Configure once in a dedicated "screenshots profile" so it doesn't pollute your daily editor.

```jsonc
// Settings (Preferences: Open Settings (JSON)) for the screenshots profile
{
  "workbench.colorTheme": "Default Light Modern",   // or your workshop's brand theme
  "editor.fontSize": 16,                            // bump from 14 — screenshots compress
  "editor.fontFamily": "Cascadia Code, Consolas, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.minimap.enabled": false,
  "editor.lineNumbers": "on",
  "editor.renderWhitespace": "none",
  "editor.scrollbar.vertical": "hidden",
  "editor.scrollbar.horizontal": "hidden",
  "workbench.activityBar.location": "hidden",       // optional, for tighter framing
  "workbench.statusBar.visible": false,             // optional
  "workbench.layoutControl.enabled": false,
  "explorer.compactFolders": false,
  "terminal.integrated.fontSize": 14,
  "window.zoomLevel": 1                             // larger fonts everywhere without resizing the window
}
```

Then:

* **Command Palette → `Developer: Toggle Screencast Mode`** when you want the keystroke overlay visible at the bottom (good for tutorial GIFs, distracting for stills — toggle it back off for stills).
* **Command Palette → `View: Zoom In`** (`Ctrl+=`) two or three times before capturing — VS Code rescales the entire workbench, including font, icons, and panels.
* **Snip with `Win+Shift+S`** (built-in Windows Snipping Tool) and save to `screenshots/raw/vscode/<lang>/<lab>/<step>.png`. Bilingual capture: switch the OS display language or the VS Code Display Language extension before the ES pass.
* **Crop to the meaningful chrome only** — full-window screenshots waste vertical space on the SSG.

### When you must show a terminal embedded in VS Code

Same rule: if the surrounding chrome (panel tabs, status bar, the file tree showing what the command operated on) is part of the lesson, snip it manually. If only the command + output matters, use **Surface 4** (freeze) and embed the resulting PNG — readers won't notice the difference and you regain regenerability.

## Surface 3 — Pure terminal / CLI session

### Primary: `freeze` (Charm)

[`charmbracelet/freeze`](https://github.com/charmbracelet/freeze) is a Go binary that produces PNG, SVG, and WebP from either a static file or the live output of a command. It ships **Windows binaries**, is installable via `winget`/`scoop`/`go install`, has no browser dependency, and exposes every styling knob the workshop will need.

```powershell
# Install (any one of these)
go install github.com/charmbracelet/freeze@latest
# or: scoop install freeze
# or: download from https://github.com/charmbracelet/freeze/releases

# Static file
freeze .\hello.cs --theme dracula --output .\screenshots\terminal\en\lab-02\hello.png

# Live command execution (captures stdout + stderr + ANSI colors)
freeze --execute "dotnet build" `
  --window --border.radius 8 --shadow.blur 20 --shadow.y 10 `
  --padding 20,40 --font.family "Cascadia Code" --font.size 14 `
  --output .\screenshots\terminal\en\lab-03\dotnet-build.png
```

Why it wins for this workshop:

* **Window chrome, padding, shadow, border-radius** out of the box — matches the look of the example sites in the Charm gallery, which is the de-facto modern terminal-still aesthetic.
* **Themes** include `dracula`, `monokai`, `github-dark`, `solarized-dark/-light`, `nord`, plus per-language Chroma syntax highlighting when reading a file.
* **`--execute`** captures the literal ANSI output, including colored `az`/`azd`/`gh` output, exactly as a user would see it. Deterministic if you `cd` into a fixture directory and pipe in a fixed input.
* **Outputs PNG/SVG/WebP**; **SVG embeds the font** when you pass `--font.file`, which means crisp at any zoom and tiny file size — ideal for a docs site.
* **No browser dependency** — independent of Playwright's headless Chromium.

For **non-executable transcripts** (output from a long-running interactive azd flow you don't want to rerun every time), capture once with `Start-Transcript`/`script`, scrub identifiers, save as `lab-04-azd-up.txt`, then `freeze lab-04-azd-up.txt --output lab-04-azd-up.png`. The PNG regenerates from the text file deterministically.

### Secondary, only when animation is required: `asciinema` + `agg`

* **`asciinema rec demo.cast`** records a terminal session (cast v2/v3). On Windows, run from WSL or use the Rust port if you need native.
* **[`asciinema/agg`](https://github.com/asciinema/agg)** converts the `.cast` to a GIF using `gifski` for high-quality output. Themes include `asciinema`, `dracula`, `monokai`, `github-dark`, etc. Ships Windows binaries.
* Use only when a lab specifically benefits from *seeing the typing* — adoption of an autocomplete suggestion, a TUI like `gh dash`, a progress bar. Otherwise the still PNG from `freeze` is faster to load, easier to translate (alt-text), and easier to maintain.

### Tools you can skip for this workshop

| Tool | Why we're not picking it |
| --- | --- |
| [`carbon-now-cli`](https://github.com/mixn/carbon-now-cli) | Beautiful output, but it drives Playwright against carbon.now.sh — adds a network dependency and a hidden second browser install just to render code. We already have one Playwright. Use only if you're committed to the Carbon aesthetic specifically. |
| [`Aloxaf/silicon`](https://github.com/Aloxaf/silicon) | Rust-native and fast, but PNG-only, no SVG, no animation, and on Windows the harfbuzz feature flag is fiddly — the project README explicitly suggests disabling it on Windows to ease the build. `freeze` covers the same use case with fewer build-time edges. |
| **Windows Terminal "Save Image"** | Manual, not scriptable, no theming controls beyond your live profile. Fine for one-offs, not for a regenerable workshop. |

## Build-time integration with the SSG

### Repo layout (concrete proposal — drop into the bilingual-workshop-site plan)

```
copilot-studio-skill/
├─ <ssg-folder>/                                  # whatever the sibling repo's SSG uses
│  ├─ docs/                                       # or content/ or src/pages/ depending on SSG
│  │  ├─ en/lab-01-create-agent.md
│  │  └─ es/lab-01-crear-agente.md
│  └─ static/screenshots/                         # served at /screenshots/* in the built site
│     ├─ en/lab-01-create-agent/01-landing.png
│     ├─ es/lab-01-create-agent/01-landing.png
│     └─ terminal/en/lab-03/dotnet-build.png
└─ screenshots/
   ├─ .auth/                                      # gitignored — storage state for Copilot Studio
   ├─ raw/                                        # gitignored — pre-mask, pre-crop intermediates
   ├─ final/                                      # gitignored locally, generated → copied into <ssg-folder>/static/screenshots/
   ├─ transcripts/                                # COMMITTED — text fixtures for freeze, scrubbed of PII
   │  ├─ lab-03-dotnet-build.txt
   │  └─ lab-04-azd-up.txt
   ├─ playwright/
   │  ├─ playwright.config.ts
   │  ├─ seed.copilotstudio.ts
   │  ├─ public.workshop-site.ts
   │  ├─ public.sample-app.ts
   │  └─ copilotstudio.create-agent.ts
   └─ scripts/
      ├─ capture-terminal.ps1                     # loops over transcripts/ → freeze → final/terminal/
      ├─ capture-web.ps1                          # npx playwright test (web project)
      ├─ capture-portal.ps1                       # npx playwright test (copilotstudio project)
      └─ promote.ps1                              # copies final/ → <ssg-folder>/static/screenshots/
```

### npm scripts (root `package.json`)

```jsonc
{
  "scripts": {
    "screenshots:seed":     "playwright test --config screenshots/playwright/playwright.config.ts --project=seed-copilotstudio --headed",
    "screenshots:web":      "playwright test --config screenshots/playwright/playwright.config.ts --project=en-public --project=es-public",
    "screenshots:portal":   "playwright test --config screenshots/playwright/playwright.config.ts --project=en-copilotstudio --project=es-copilotstudio",
    "screenshots:terminal": "pwsh screenshots/scripts/capture-terminal.ps1",
    "screenshots:promote":  "pwsh screenshots/scripts/promote.ps1",
    "screenshots":          "npm run screenshots:web && npm run screenshots:portal && npm run screenshots:terminal && npm run screenshots:promote"
  }
}
```

### CI policy

* **Do not** run any screenshot job on every push. The combinatorics are bad (auth, drift, flakes, secrets) and the value is low (no human reviews 200 PNGs in a PR).
* **Do** add a **manually-triggered** (`workflow_dispatch`) GitHub Action that runs `screenshots:web` against the deployed preview (no secrets needed) and uploads the diff as an artifact for human review.
* **Do not** put the Copilot Studio auth blob in GitHub secrets — refresh tokens rotate and conditional access may step up MFA mid-run. Keep portal capture on a maker's laptop and commit the PNGs.
* **Optionally**, gate the workshop's deploy workflow on `git diff --quiet -- '<ssg-folder>/static/screenshots/**'` to ensure committed PNGs match what's referenced — but that's a polish item.

### Visual regression (optional, not recommended at v1)

Playwright's `toHaveScreenshot()` does pixel diffing with sub-pixel tolerance. It's excellent for catching layout regressions in *your own* web app but creates noise when used against third-party UIs that change weekly (Copilot Studio). Use it for **Surface 1b** (your sample app) only.

## Bilingual screenshot strategy

### The pattern that scales

* **One test file per lab, parameterized by locale via project.** The `en-*` and `es-*` projects run the same `.ts` against the same flow with different `locale` / `Accept-Language`. Output paths are derived from `info.project.name`. No duplicated test code.
* **Filename mirroring.** Keep step names identical across languages: `en/lab-01-create-agent/01-landing.png` ↔ `es/lab-01-crear-agente/01-landing.png`. The slug can differ; the step name (`01-landing`) must not — that's what lets translators reuse the asset placement in the MD.
* **Markdown image references prefer language-relative paths** so a partial translation never resolves to the wrong screenshot:

  ```markdown
  ![Copilot Studio landing](./screenshots/01-landing.png)
  ```

  not

  ```markdown
  ![Copilot Studio landing](/screenshots/en/lab-01-create-agent/01-landing.png)
  ```

  Pick whichever resolution model the chosen SSG (Docusaurus / MkDocs Material / etc.) supports cleanly — Subagent D will lock that down.

### Capturing both languages in one harness run

```powershell
# Run all projects in sequence (workers:1 in config ensures sequential)
npx playwright test --config screenshots/playwright/playwright.config.ts
```

Playwright runs the EN project, then ES, against the same test sources. Total wall-time roughly 2x a single-language run.

### Copilot Studio agent-content language

As called out in **Surface 1 → Locale switching**, the chrome follows browser locale but agent topics render in the agent's primary language. Two recipes:

| Goal | Recipe |
| --- | --- |
| ES chrome + EN agent content (acceptable, common in tutorials) | One agent, two locales |
| Fully ES UX including agent content | Two agents (EN-primary + ES-primary), project routes to the correct one |

## Risks and TOS considerations

### Microsoft automation policy — what's actually fine

* **You may automate against your own tenant for legitimate documentation / training purposes** using a normal user account. The Microsoft Online Services Terms and the Acceptable Use Policy prohibit *unauthorized* access and abusive scraping, not legitimate use by a licensed user of their own tenant.
* **You may not** use a non-owned tenant, exceed normal-user request rates, attempt to bypass rate limits or conditional access, or store credentials in a way that allows them to be exfiltrated.
* **You may not** use service principal / app-only credentials to log into the *interactive* Copilot Studio portal — that's not a supported authentication path and is detected as anomalous. Service principals are for the *API/SDK* surface; the maker portal is interactive-account only.

### Tenant leakage — the per-screenshot checklist

| Item | Mitigation |
| --- | --- |
| UPN visible top-right | `mask` the user-profile area in every portal screenshot |
| Tenant ID / environment GUID in URL | Capture with `fullPage: false` and crop, or use Edge/Chrome with the address bar hidden |
| Tenant name in environment picker | `mask` the picker control |
| Internal app names / customer names in agent content | Use a dedicated **demo tenant** with neutral, fictitious content ("Contoso Pet Foods", "Fabrikam Retail") |
| Email addresses in any rendered data | Use `@example.com` / `@contoso.com` fixtures |
| API keys / connection strings in code samples | Use `***REDACTED***` placeholders; never let Copilot autocomplete a real secret into a fixture |

A dedicated demo tenant is the strongest control — many of the masking gymnastics become unnecessary when there's no real tenant data to leak.

### UI drift — the cadence

* Copilot Studio: **roughly monthly** material UI changes. Budget for a quarterly screenshot refresh of Surface 2 captures.
* VS Code: **monthly stable releases**, occasional bigger workbench changes (sidebar split, secondary sidebar). Manual recapture is fine because the inventory is small.
* CLI tools (`az`, `azd`, `gh`, `dotnet`): low drift. Bumping a tool version usually requires only re-running the `freeze --execute` line.

### Storage state hygiene

* `screenshots/.auth/` in `.gitignore` — non-negotiable.
* Add a top-level entry to the repo's `.gitignore` *before* the first seed run, not after — once a file is committed it's in the history forever.
* Rotate by deleting the JSON and re-running `screenshots:seed` every ~30 days, or whenever a Copilot Studio screenshot run starts redirecting to the login page (the cookies have expired).

## Recommended end-to-end workflow

1. **Decide once.** Add screenshot lifecycle to the repo's `CONTRIBUTING.md`: who reseeds Copilot Studio auth, who triggers regeneration, where final PNGs live, how to add a new lab's shots.
2. **Set up the harness** with the project layout in [Repo layout (concrete proposal)](#repo-layout-concrete-proposal--drop-into-the-bilingual-workshop-site-plan). One-time, perhaps a half-day.
3. **Seed Copilot Studio auth** locally with `npm run screenshots:seed`. Re-run when expired.
4. **Author the EN lab content** with code blocks for editor surfaces and `![](./screenshots/<step>.png)` placeholders for portal/terminal/web surfaces.
5. **Run `npm run screenshots`** locally. Inspect the resulting `screenshots/final/**` — eyeball for layout, masks, language correctness.
6. **`npm run screenshots:promote`** to copy into the SSG's static asset directory. Commit.
7. **Manually capture the small VS Code chrome shots** that must remain manual. Save to `screenshots/final/vscode/<lang>/<lab>/<step>.png`, run the promote script, commit.
8. **Translate the lab MD.** The image references in the ES version mirror the EN structure; the PNGs are already in `static/screenshots/es/...`.
9. **Ship.** GitHub Pages workflow deploys the SSG. No screenshot work runs in CI.
10. **Quarterly:** rerun the screenshot job (1–2 hours of human attention), commit deltas.

## Concrete code samples

### `screenshots/playwright/public.workshop-site.ts`

```ts
import { test } from '@playwright/test';
import path from 'node:path';

const BASE = process.env.WORKSHOP_BASE_URL ?? 'http://localhost:3000';

const out = (slug: string, name: string, info: import('@playwright/test').TestInfo) => {
  const lang = info.project.name.split('-')[0]; // 'en' | 'es'
  return path.join('screenshots', 'final', lang, slug, `${name}.png`);
};

test('home', async ({ page }, info) => {
  await page.goto(BASE);
  await page.screenshot({
    path: out('home', '01-hero', info),
    fullPage: false,
    animations: 'disabled',
    caret: 'hide',
  });
  await page.screenshot({
    path: out('home', '02-full', info),
    fullPage: true,
    animations: 'disabled',
  });
});

test('lab 01 page', async ({ page }, info) => {
  const slug = info.project.name.startsWith('es') ? 'es/lab-01-crear-agente' : 'en/lab-01-create-agent';
  await page.goto(`${BASE}/${slug}`);
  await page.screenshot({
    path: out('lab-01-create-agent', '01-page', info),
    fullPage: true,
    animations: 'disabled',
  });
});
```

### `screenshots/scripts/capture-terminal.ps1`

```powershell
# Loops every fixture in screenshots/transcripts/ → freeze → final/terminal/
# Bilingual: re-renders into both en/ and es/ paths; the *content* doesn't translate
# (terminal output is English), but path mirroring keeps the MD references stable.
$ErrorActionPreference = 'Stop'

$root = Resolve-Path "$PSScriptRoot\..\.."
$transcripts = Join-Path $root 'screenshots\transcripts'
$finalRoot = Join-Path $root 'screenshots\final\terminal'

$freezeArgs = @(
  '--window'
  '--border.radius', '8'
  '--shadow.blur', '20'
  '--shadow.y', '10'
  '--padding', '20,40'
  '--font.family', 'Cascadia Code'
  '--font.size', '14'
  '--theme', 'github-dark'
)

foreach ($lang in @('en','es')) {
  Get-ChildItem -Path $transcripts -Filter '*.txt' | ForEach-Object {
    $name = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
    # Filenames encode lab: e.g. lab-03-dotnet-build.txt → final/terminal/<lang>/lab-03/dotnet-build.png
    if ($name -match '^(lab-\d+)-(.+)$') {
      $lab = $matches[1]
      $step = $matches[2]
      $outDir = Join-Path $finalRoot "$lang\$lab"
      New-Item -ItemType Directory -Force -Path $outDir | Out-Null
      $outFile = Join-Path $outDir "$step.png"
      Write-Host "freeze $($_.FullName) → $outFile"
      & freeze $_.FullName @freezeArgs --output $outFile
    } else {
      Write-Warning "Skipping unrecognised transcript filename: $($_.Name)"
    }
  }
}
```

### Minimal `.gitignore` additions

```
screenshots/.auth/
screenshots/raw/
screenshots/final/
# the SSG copy in <ssg-folder>/static/screenshots/ IS committed
```

### Manually-triggered GitHub Action skeleton (web surfaces only)

```yaml
# .github/workflows/screenshots-web.yml
name: Capture web screenshots (web surfaces only)
on:
  workflow_dispatch:
    inputs:
      base_url:
        description: URL of the deployed workshop site to capture
        required: true
        default: 'https://devopsabcs-engineering.github.io/copilot-studio-skill'

jobs:
  capture:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run screenshots:web
        env:
          WORKSHOP_BASE_URL: ${{ inputs.base_url }}
      - uses: actions/upload-artifact@v4
        with:
          name: screenshots-web
          path: screenshots/final/
```

Note this workflow **does not** touch Copilot Studio — that surface stays on the maker's laptop because of the auth model.

## References

| # | Source | Used for |
| --- | --- | --- |
| 1 | [Playwright — Installation](https://playwright.dev/docs/intro) | Windows install, Node version, browser binaries, system requirements |
| 2 | [Playwright — Screenshots guide](https://playwright.dev/docs/screenshots) | `fullPage`, `clip`, `buffer`, element screenshot |
| 3 | [Playwright — `page.screenshot()` API](https://playwright.dev/docs/api/class-page#page-screenshot) | `mask`, `maskColor`, `style`, `animations`, `caret`, `type`, `quality` |
| 4 | [Playwright — Authentication](https://playwright.dev/docs/auth) | `storageState` pattern, "shared account in all tests", setup project, secret hygiene |
| 5 | [Playwright — Electron API](https://playwright.dev/docs/api/class-electron) | Why Electron driver is "experimental" + the `EnableNodeCliInspectArguments` fuse caveat |
| 6 | [Microsoft Learn — Copilot Studio overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio) | Portal URL (`https://copilotstudio.microsoft.com`), maker context |
| 7 | [Microsoft Learn — Get access to Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing-subscriptions) | Browser support matrix (Chrome 91+, Firefox 89+, Safari 16.4+), license types |
| 8 | [Microsoft Learn — Language support](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-language-support) | "Authoring canvas follows browser language" + `es-ES` is GA |
| 9 | [`charmbracelet/freeze`](https://github.com/charmbracelet/freeze) | Static terminal captures — PNG/SVG/WebP, themes, window chrome, `--execute` |
| 10 | [`asciinema/agg`](https://github.com/asciinema/agg) | Animated GIFs from cast files when stills are insufficient |
| 11 | [`mixn/carbon-now-cli`](https://github.com/mixn/carbon-now-cli) | Reference for why Carbon-driven Playwright is overkill here |
| 12 | [`Aloxaf/silicon`](https://github.com/Aloxaf/silicon) | Reference for why silicon is not the Windows-friendly choice |
| 13 | [VS Code User Interface docs](https://github.com/microsoft/vscode-docs/blob/main/docs/getstarted/userinterface.md) | Zen Mode, Screencast Mode, Settings sync — context for the manual-capture preflight |
| 14 | [VS Code Proposed API guide](https://code.visualstudio.com/api/advanced-topics/using-proposed-api) | Reference for why customising VS Code via proposed APIs / Insiders is not a screenshot-pipeline path |
