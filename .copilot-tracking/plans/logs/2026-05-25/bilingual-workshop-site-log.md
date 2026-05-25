<!-- markdownlint-disable-file -->
# Planning Log: Bilingual Copilot Studio Workshop Site

## Discrepancy Log

Gaps and differences identified between research findings and the implementation plan.

### Unaddressed Research Items

* DR-01: Sibling `_includes/components/sidebar.html` not inspected byte-for-byte; plan adopts the captured ~30-line snippet from the research doc.
  * Source: .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Potential Next Research, item 1)
  * Reason: Step 1.4 implements the override from the documented snippet; deeper inspection deferred to follow-on work (WI-01). Functionally equivalent for the lab IA we ship; subtle filter differences could affect ordering edge cases.
  * Impact: low (FR sidebar will work; minor ordering or class differences possible).

* DR-02: Copilot Studio portal `data-testid` / ARIA labels for redaction masks not verified live; documented masks are "likely; verify in DevTools".
  * Source: .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Potential Next Research, item 2)
  * Reason: Step 3.5 documents candidate selectors in a top-of-file comment; first capture pass refines them. Cannot verify selectors without running interactive seed against a live tenant.
  * Impact: medium (PII redaction must be visually verified on first capture run; failure mode is leaked tenant ID screenshots).

* DR-03: storageState cookie lifetime in the demo tenant not confirmed; some tenants enforce 1-hour token lifetimes.
  * Source: .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Potential Next Research, item 3)
  * Reason: Step 3.3 documents the seed/re-seed flow; if cookies expire mid-batch, maker re-runs `npm run screenshots:seed`. Cannot determine lifetime without testing in the actual tenant.
  * Impact: low (workflow accommodates re-seeding; only inconvenience, not correctness).

* DR-04: VS Code workbench vs `code` fence "80% rule" decision per lab not enumerated.
  * Source: .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Potential Next Research, item 4)
  * Reason: Step 1.8 codifies the rule in CONTRIBUTING.md as a policy; individual lab decisions made during Step 2.2 authoring.
  * Impact: low (decision is local to each lab and reversible).

* DR-05: GitHub Pages `Settings → Pages → Source` value on the sibling repo not verified.
  * Source: .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Potential Next Research, item 5)
  * Reason: Plan assumes "GitHub Actions" based on the sibling's `pages.yml` shape. Manual one-time repo setting tracked as WI-06.
  * Impact: medium (blocks deploy until set; documented in CONTRIBUTING.md so first deploy will catch it).

* DR-06: Translation depth for FR labs not produced in this plan — only strategy + glossary documented.
  * Source: .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Out of scope, item 2)
  * Reason: Plan creates the FR file scaffolding and translation workflow; actual prose translation is per-page Azure AI Translator + human review during Step 4.x. Out of scope is "translating the FR labs in this research doc" — Step 4 IS the translation step in the plan.
  * Impact: none (plan covers what research deferred; just naming consistency to confirm).

* DR-07: Final branding assets (favicon set + logo) not produced.
  * Source: .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Selected Approach → File tree changes → assets/branding/)
  * Reason: Step 1.5 commits placeholder binaries so favicon links resolve in preview; replacement with real branding tracked as WI-07.
  * Impact: low (cosmetic; site renders with placeholder favicons).

* DR-08: EN+FR parallel screenshot policy per lab not enumerated in CONTRIBUTING content list.
  * Source: .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Selected Approach → Implementation Details → step 5: Bilingual screenshot decision per lab)
  * Reason: Step 1.8 codifies the per-surface decision in CONTRIBUTING.md ("EN-only for Windows-English surfaces, parallel EN+FR for portal").
  * Impact: low (decision is documented; Step 3.5 portal-capture specs respect it).

* DR-09: Step 5.1 EN↔FR pair-completeness check omits the homepage (`index.md` ↔ `fr/index.md`) pair.
  * Source: .copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md (Step 5.1 PowerShell command globs only `labs/*.md, fr/labs/*.md`); .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Bilingual Mechanism specifies homepage AND lab counterparts).
  * Reason: Validation glob is scoped to `labs/` and `fr/labs/`; `index.md` (root) and `fr/index.md` (Step 4.1) are not enumerated by the pair-count command, so a missing or misnamed homepage on either side passes the check silently.
  * Impact: low (homepage is structurally required by Phase 1/4 success criteria; gap would surface visually during preview, but the automated check is incomplete).
  * **Resolution (applied):** Step 5.1 in both plan and details files now includes an explicit `Test-Path index.md, fr/index.md | Where-Object { $_ -eq $false }` check that must return empty, and the plan-file bullet enumerates `index.md` ↔ `fr/index.md` as a required pair. Step 4.5 verbiage extended to call out the homepage pair explicitly.

### Plan Deviations from Research

* DD-01: Plan defers `glossary.md` (full EN↔FR glossary table) to the FR side (`fr/labs/glossary.md`, Step 4.4) rather than the EN side.
  * Research recommends: Glossary table from bilingual-content-strategy research is referenced but not explicitly assigned a host page.
  * Plan implements: EN glossary at `labs/glossary.md` holds only EN domain terms; the bilingual EN↔FR table lives in `fr/labs/glossary.md` because it primarily serves FR readers needing to reconcile EN-language tooling with FR-language documentation.
  * Rationale: avoids duplicating the table across both languages while keeping it discoverable from the FR nav. Reversible — can mirror the full table on the EN side later if confusing.

* DD-02: Plan adds a CONTRIBUTING.md "One-time repo settings" section as the home for WI-06 (Pages source) and seed instructions, not anticipated in the research file tree.
  * Research recommends: `CONTRIBUTING.md` is listed in the file tree with no detailed content.
  * Plan implements: CONTRIBUTING.md is structured into three explicit sections: Translation policy, Screenshot harness, One-time repo settings.
  * Rationale: makes the manual steps from the research's "Potential Next Research" durable in the contributor handbook rather than relying on planning artifacts.

* DD-03: Image-path naming convention is internally inconsistent across Steps 2.2, 3.5, and 4.2 and deviates from the research's flat shared-image scheme.
  * Research recommends: A single shared image path `images/lab-NN/lab-NN-<descriptor>.png` (sibling pattern — flat, no `<lang>` subdirectory, no `-fr` filename suffix; both EN and FR markdown reference the same file).
  * Plan implements: Step 2.2 success criteria match research (`../images/lab-NN/lab-NN-<descriptor>.png`, shared across locales). Step 3.5 portal-capture specs write to `screenshots/final/<lang>/lab-NN/<descriptor>.png` (lang-subfolder + bare `<descriptor>.png`). Step 4.2 FR markdown references portal screenshots as `../images/lab-NN/lab-NN-<descriptor>-fr.png` (filename-suffix convention). Step 3.6 promote.ps1 specification does not enumerate how `screenshots/final/<lang>/lab-NN/<descriptor>.png` is renamed/relocated into `images/lab-NN/lab-NN-<descriptor>-fr.png`.
  * Rationale: Three competing conventions (shared, lang-subfolder, filename-suffix) coexist without a documented reconciliation step. Implementation impact: medium — promote.ps1 must either be rewritten to do the rename+relocation, or one of Steps 2.2/3.5/4.2 success criteria must be updated to converge on a single convention. Recommend choosing the `-fr` filename-suffix scheme (consistent with sibling pattern of flat `images/lab-NN/`) and updating Step 3.5 to write directly to that final path or Step 3.6 to do the rename.
  * **Resolution (applied):** Converged on a single flat-file convention with `-fr` filename suffix for portal-only FR variants. Step 3.4 and Step 3.5 now write directly to `screenshots/final/lab-NN/lab-NN-<descriptor>.png` (EN) and `screenshots/final/lab-NN/lab-NN-<descriptor>-fr.png` (FR portal). Step 3.6 `promote.ps1` is now specified as a flat 1:1 copy from `screenshots/final/lab-NN/*.png` into `images/lab-NN/`, preserving filenames — no rename, no language-subfolder removal. Step 2.2 and Step 4.2 success criteria are now consistent: EN pages reference `../images/lab-NN/lab-NN-<descriptor>.png`; FR pages reference the same file for Windows-English-only surfaces, or the `-fr` suffix variant for genuinely-localized portal surfaces.

* DD-04: Plan file line-number references to the details file are systematically inaccurate.
  * Research recommends: N/A — this is a plan-internal traceability deviation, not a research deviation. Logged here because Discrepancy Log is the documented surface for plan-vs-source-of-truth issues.
  * Plan implements: Every step in `## Implementation Checklist` (Steps 1.1 through 4.5) cites a line range in the details file (e.g., Step 4.1 → "Lines 825-860") that does not match the actual step header position. Verified via grep against `.copilot-tracking/details/2026-05-25/bilingual-workshop-site-details.md`: Step 1.1 actually starts at line 17 (plan claims 15-55 — drift -2), Step 1.4 at line 82 (plan claims 107-135 — drift -25), Step 2.5 at line 312 (plan claims 502-525 — drift -190), Step 3.7 at line 472 (plan claims 792-820 — drift -320), Step 4.5 at line 588 (plan claims 972-995 — drift -384). Drift grows monotonically and the details file is ~640 lines long (so several late-plan ranges point past EOF).
  * Rationale: details file evolved after plan line ranges were written; ranges were never re-synced. Implementation impact: medium — contributors using line ranges to navigate plan→details land in the wrong section or past EOF. Step IDs (`Step X.Y`) remain accurate and findable by header search, so navigation by ID is unaffected. Recommend either regenerating line ranges from the current details file or deleting the line-range parenthetical and citing only the step ID.
  * **Resolution (applied):** All 25 plan-file line-range citations regenerated from the live details file via `Select-String -Pattern '^### Step'`. Mapping (re-verified against current file state): 1.1 → 17-39; 1.2 → 40-60; 1.3 → 61-81; 1.4 → 82-104; 1.5 → 105-127; 1.6 → 128-150; 1.7 → 151-169; 1.8 → 170-198; 2.1 → 203-225; 2.2 → 226-266; 2.3 → 267-285; 2.4 → 286-311; 2.5 → 312-332; 3.1 → 345-364; 3.2 → 365-385; 3.3 → 386-409; 3.4 → 410-429; 3.5 → 430-452; 3.6 → 453-475; 3.7 → 476-495; 4.1 → 510-530; 4.2 → 531-555; 4.3 → 556-573; 4.4 → 574-593; 4.5 → 594-614. (Phase 3/4 ranges shifted ~6 lines from the initial resolution after subsequent details-file edits; the plan file's citations were re-synced and are now accurate against the live details file.)

* DD-05: Details file line-number references to the research file are mostly inaccurate.
  * Research recommends: N/A — plan-internal traceability deviation, same category as DD-04.
  * Plan implements: Per-step `Context references` blocks in `bilingual-workshop-site-details.md` cite research line ranges that do not match actual snippet positions. Verified against research grep: Step 1.1 cites research Lines 195-235 for `_config.yml`, but the `_config.yml` snippet is at lines 184-210; Step 1.3 cites Lines 256-285 for `head_custom.html`, actual lines 233-255; Step 1.4 cites Lines 237-254 for `sidebar.html`, actual lines 212-231; Step 1.6 cites Lines 287-330 for `pages.yml`, actual lines 257-300; Step 3.6 cites Lines 333-342 for `freeze invocation`, actual lines 355-369. Step 3.2 (Lines 305-358 for `playwright.config.ts`, actual 301-353) is the only reference within 5 lines of correct.
  * Rationale: research file was edited after details references were written. Implementation impact: low-medium — section headers (`#### Minimal _config.yml`, etc.) remain findable, but `(Lines A-B)` parentheticals mislead contributors. Recommend deleting the line-range parenthetical and citing the `####` subsection title instead, e.g., "Configuration Examples → Minimal `_config.yml`".
  * **Resolution (applied):** All affected research line-range citations corrected against the live research file: Step 1.1 → 184-210; Step 1.3 → 233-255; Step 1.4 → 212-231; Step 1.6 → 257-300; Step 1.8 → 469-477 + 546-549; Step 2.1 → 147-167 + 469-477; Step 2.2 → 478-523 + 147-167; Step 2.3 → 147-167; Step 2.5 → 390-465; Step 3.1 → 528-543; Step 3.2 → 301-353; Step 3.6 → 355-369; Step 3.7 → 390-465; Step 4.1 → 91-119; Step 4.2 → 525 + 546-549; Step 4.5 → 553-555.

* DD-07: Lab body H1 omitted from authored EN lab files (Phase 2 Step 2.2) despite plan template at details lines 478-523 showing an explicit `# Lab NN — Title` body H1.
  * Research recommends: Plan/details template shows body H1 after the FR-link blockquote.
  * Plan implements: Phase 2 implementor omitted body H1 in all 11 labs because `markdown.instructions.md` (hve-core) forbids body H1 when frontmatter declares `title:` (MD025/MD041 compliance). Just-the-docs renders the frontmatter `title` as the page H1, so visual output is unchanged.
  * Rationale: Instruction files take precedence over plan templates. Authoring lab files with body H1 would have caused MD025/MD041 failures if those rules were enabled.
  * Impact: low (visual parity preserved; future-authored labs need same convention).
  * **Resolution (applied):** Plan and details files SHOULD be updated to drop the body H1 from the canonical lab template so future authors get a consistent example. Tracked as WI-10.

* DD-08: `.markdownlint.json` added at repo root (Phase 2 Step 2.6) — not enumerated in plan or research.
  * Research recommends: No markdownlint config; relied on defaults.
  * Plan implements: Phase 2 implementor created `.markdownlint.json` disabling MD013 (line-length), MD033 (inline HTML), MD041 (first-line-h1), MD060 (table-column-style) so Step 2.6 `markdownlint-cli2` validation can pass. Without the config, even the Phase 1 `README.md` failed defaults.
  * Rationale: The disabled rules conflict with the hve-core `markdown.instructions.md` guidance ("reasonably short" lines, no table column-alignment requirement). The config is the minimum needed to make the project's lint config agree with its own instruction file.
  * Impact: low (config is workspace-aligned; documented in changes log).

* DD-09: `screenshots/scripts/capture-terminal.ps1` writes directly to `images/lab-NN/` (Phase 3 Step 3.6), bypassing the `promote.ps1`-as-sole-writer rule documented in the details file.
  * Research recommends: Step 3.6 success criteria state `promote.ps1` is the only script allowed to write into `images/lab-NN/`.
  * Plan implements: Phase 3 implementor routed `freeze` terminal-still output directly into `images/lab-NN/` because (a) terminal stills have no PII-redaction step, (b) `freeze` rendering is deterministic from committed text fixtures, (c) routing through `screenshots/final/` would add a no-op copy stage and a drift surface.
  * Rationale: The "single-writer" guarantee was rooted in the Playwright pipeline (raw → final → promote → images) needing redaction QA before promotion. Terminal stills don't share that risk profile.
  * Impact: low (the deviation is documented in the script header and the changes log; if strict pipeline uniformity is required later, the fix is one-line in capture-terminal.ps1 plus a transcript-aware branch in promote.ps1).

* DD-06: Phase-validation Steps 2.6 and 3.8 are marked skippable based on phase-parallelization timing.
  * Research recommends: N/A directly, but research's "Selected Approach → Implementation Details" enumerates per-phase validation as a required step before the next phase begins.
  * Plan implements: Step 2.6 ("Validate phase changes") and Step 3.8 ("Validate phase changes") both include success criteria guidance permitting the validation to be deferred or skipped when Phases 2 and 3 are running in parallel.
  * Rationale: Phase parallelism does not relax the per-phase validation gate — each phase must still be self-consistent before any dependent phase (Phase 4 depends on Phase 2; Phase 5 depends on both) begins. Implementation impact: low — Step 5.1 full-project validation catches most issues, but per-phase gates exist specifically to localize failures. Recommend removing the "skip if conflicts with timing" guidance and instead requiring Step 2.6/3.8 to complete before the corresponding phase is marked done in the planning log.
  * **Resolution (applied):** "Skip if conflicts with Phase X timing" language removed from Steps 2.6 and 3.8 in both plan and details files. Replaced with "Mandatory; do not skip even when Phase X runs in parallel. Phase cannot be marked complete until [commands] succeed." Per-phase validation is now strictly required regardless of parallel execution.

## Implementation Paths Considered

### Selected: Jekyll + just-the-docs sibling-parity site with three-tool screenshot harness

* Approach: Build a Jekyll site at the repo root that mirrors the sibling 1:1 (parallel `fr/` tree, Liquid sidebar override, manual language switcher, zero-padded lab filenames, shared `images/lab-NN/`). Generate screenshots with Playwright multi-project (EN/FR + storageState) for web/portal, `freeze` for terminal, manual snipping for VS Code chrome. Deploy via `actions/jekyll-build-pages@v1` → `actions/deploy-pages@v4`.
* Rationale: matches the sibling visually, navigationally, and operationally; zero-plugin i18n avoids the maintenance pit of Jekyll i18n plugins; three-tool screenshot strategy honors each surface's actual automation ceiling; pre-committed screenshots make every site deploy deterministic and CI-only.
* Evidence: .copilot-tracking/research/2026-05-25/bilingual-workshop-site-research.md (Selected Approach section, plus all four "Configuration Examples" subsections that produce ready-to-paste configs).

### IP-01: Docusaurus (TypeScript / Node) with first-class i18n

* Approach: Use Docusaurus's `i18n` block in `docusaurus.config.js` for automatic locale routing, translation-string extraction, Algolia search, dark mode, copy-button code blocks.
* Trade-offs: Visually slicker out of the box, first-class i18n; but introduces a Node toolchain in the publish path and a larger learning curve.
* Rejection rationale: diverges from sibling. The user's request is explicitly "modeled on `agentic-accelerator-workshop`" — adopting the sibling's stack 1:1 is the strongest interpretation. Contributors who know the sibling cannot trivially contribute here under a different SSG.

### IP-02: MkDocs Material with `i18n` plugin

* Approach: Python toolchain + MkDocs Material + first-class i18n plugin.
* Trade-offs: Great default theme; Python lighter than Node for Azure-aligned shops; first-class i18n.
* Rejection rationale: diverges from sibling; Python virtualenv setup is friction for Windows contributors.

### IP-03: Jekyll + `jekyll-multiple-languages-plugin`

* Approach: Stay on the sibling's Jekyll runtime but add a real i18n plugin with `_i18n/` translation strings, automatic locale routing.
* Trade-offs: Cleaner translation workflow; but plugin is not on the GitHub Pages allowlist.
* Rejection rationale: sibling explicitly does NOT use it; plugin would break compatibility with `actions/jekyll-build-pages@v1`'s pre-approved plugin list.

### IP-04: Playwright Electron driving VS Code Stable for screenshots

* Approach: Use Playwright's `_electron` driver to automate VS Code workbench screenshots.
* Trade-offs: Would fully automate VS Code screenshots.
* Rejection rationale: Brittle against shipping VS Code Stable on Windows (code signing + Fuses + workbench DOM instability across point releases). Manual snipping of a curated screenshots profile is the official recommendation.

### IP-05: Service-account M365 user with MFA disabled for headless portal screenshots

* Approach: Provision a service account without MFA so CI can headlessly capture Copilot Studio portal screenshots.
* Trade-offs: Removes human-in-the-loop.
* Rejection rationale: Against Microsoft security guidance; tenant admins typically prohibit MFA-exempt service accounts. The storage-state interactive-seed-then-headless-reuse pattern is the official Playwright recipe for conditional access.

### IP-06: `carbon-now-cli` or `silicon` for terminal stills

* Approach: Use either tool instead of `freeze` for terminal stills.
* Trade-offs: Comparable output quality.
* Rejection rationale: `carbon-now-cli` adds a network dependency and second hidden browser; `silicon` is PNG-only with fiddly Windows harfbuzz flags. `freeze` ships Windows binaries, supports SVG with embedded fonts, no browser dependency.

### IP-07: `asciinema + agg` for animated terminal GIFs

* Approach: Capture and render typed-out terminal sessions as animated GIFs.
* Trade-offs: Pedagogically valuable for autocomplete/streaming demos; but slower to load, harder to translate (alt text), harder to maintain.
* Rejection rationale: Reserve for the rare lab where seeing-the-typing genuinely matters (e.g., a future lab demoing `@copilot-studio:copilot-studio-author` streaming a long YAML response). Static `freeze` PNGs are the primary tool.

### IP-08: Reuse all sibling screenshots across EN+FR with no parallel FR capture

* Approach: Single `images/` shared between EN and FR locales, never capture FR-specific screenshots.
* Trade-offs: Cheapest capture workflow.
* Rejection rationale: Acceptable for VS Code/CLI/PowerShell/git (Windows-English-only surfaces) but NOT for the Copilot Studio portal which genuinely localizes. Plan partially adopts this approach — shared for English-only surfaces, parallel EN+FR for portal screens.

## Suggested Follow-On Work

Items identified during planning that fall outside current scope.

* WI-01: Byte-for-byte inspect sibling `_includes/components/sidebar.html` and reconcile any drift against the override implemented in Step 1.4 (medium priority).
  * Source: DR-01.
  * Dependency: post-Phase-1 verification (after sidebar override is in place and FR pages exist to render).

* WI-02: First capture pass against the Copilot Studio portal — refine `mask:` selectors in Step 3.5 specs against live DevTools and verify no tenant identifiers leak into the produced screenshots (high priority — blocks first portal-screenshot commits).
  * Source: DR-02.
  * Dependency: Phase 3 complete + maker has run `npm run screenshots:seed`.

* WI-03: Validate storageState cookie lifetime in the maker's M365 demo tenant; if cookies expire faster than a full capture batch, split capture into shorter runs or document the re-seed cadence in CONTRIBUTING.md (low priority).
  * Source: DR-03.
  * Dependency: WI-02 (first capture pass surfaces this).

* WI-04: Produce the actual FR translations for all 11 labs + 3 reference pages (high priority — site is bilingual in name only without this).
  * Source: DR-06 / Step 4.x workflow.
  * Dependency: Phase 2 EN labs final.

* WI-05: Evaluate `asciinema + agg` for a future lab that demos `@copilot-studio:copilot-studio-author` streaming a long YAML response (low priority).
  * Source: IP-07.
  * Dependency: Phase 2 complete; depends on whether such a lab is added later.

* WI-06: Set `Settings → Pages → Source = GitHub Actions` on the GitHub repo (high priority — blocks first deploy).
  * Source: DR-05.
  * Dependency: Phase 1 complete (workflow file exists); manual UI step only.

* WI-07: Replace placeholder branding assets in `assets/branding/` with final favicon set + logo PNG (medium priority — cosmetic).
  * Source: DR-07.
  * Dependency: Phase 1 complete; coordinate with design.

* WI-08: Author lab content for any future lab not on the 10-lab IA (e.g., a lab on registering the agent as a Bot Framework Skill, which the hello-world research alluded to but is out of scope here) — would extend `labs/` + `fr/labs/` + IA table on both homepages (low priority).
  * Source: research doc "Out of scope" implicitly.
  * Dependency: Phases 2 + 4 complete.

* WI-09: Wire a CI lint job that runs `markdownlint-cli2` and `lychee` (link checker) on every PR (medium priority).
  * Source: derived from Phase 5 validation pattern.
  * Dependency: Phase 5 baseline passing.

* WI-10: Update plan and details files to drop the body H1 from the canonical lab template (medium priority — prevents future authors from re-introducing MD025/MD041 violations).
  * Source: DD-07.
  * Dependency: none (planning-artifact edit).

* WI-11: First authenticated Copilot Studio portal capture pass — verify the six candidate `mask:` selectors in `screenshots/playwright/copilotstudio.*.ts` against live DevTools and confirm zero tenant/user/environment text leaks into captured PNGs (high priority — overlaps with WI-02 but enumerates the specific selectors to verify).
  * Source: Phase 3 implementor report.
  * Dependency: Phase 3 complete + maker has run `npm run screenshots:seed`.

* WI-12: Document in `CONTRIBUTING.md` (Screenshot harness section) that `screenshots/.auth/copilotstudio.json` is created on first `npm run screenshots:seed` (file does not pre-exist in the repo). Two-sentence discoverability note (low priority).
  * Source: Phase 3 implementor report.
  * Dependency: none.
