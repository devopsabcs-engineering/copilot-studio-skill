// Captures Copilot Studio agent-creation flow in both EN and FR.
// Requires storageState seeded via `npm run screenshots:seed` (one-time, interactive MFA).
//
// REDACTION SELECTORS (DR-02 — Live verification required on first capture pass).
// These are candidate selectors based on Microsoft Power Platform UI conventions and
// the surface map in playwright-screenshot-strategy-research.md. Verify each against
// the live portal with DevTools and replace any that miss. PRs MUST update this list
// when the selectors change.
//
// Required masks:
//   [data-testid*="user"]            — User avatar + UPN, top right
//   [aria-label*="account"]          — "Account manager" labels around the user chip
//   [data-testid*="tenant"]          — Tenant-name surfaces
//   [aria-label*="environment"]      — Environment picker (tenant env name)
//   [data-testid*="environment-picker"] — Environment picker (explicit testid form)
//   [data-testid*="user-profile"]    — Profile flyout target
//
// Output convention (DD-03):
//   EN → screenshots/final/lab-NN/lab-NN-<descriptor>.png
//   FR → screenshots/final/lab-NN/lab-NN-<descriptor>-fr.png
//
// Note: portal captures are produced for BOTH languages because portal chrome
// localizes (DD-03 — labs 03/06/09/10 ship EN + FR parallel portal captures).
import { test, expect } from '@playwright/test';
import path from 'node:path';

const REDACTION_SELECTORS = [
  '[data-testid*="user"]',
  '[aria-label*="account"]',
  '[data-testid*="tenant"]',
  '[aria-label*="environment"]',
  '[data-testid*="environment-picker"]',
  '[data-testid*="user-profile"]',
];

function outPath(lab: string, descriptor: string, projectName: string): string {
  const suffix = projectName.startsWith('fr-') ? '-fr' : '';
  return path.join('screenshots', 'final', lab, `${lab}-${descriptor}${suffix}.png`);
}

// Skeleton example capture. Lab 03 owns the "create agent" flow.
test('lab-03 — create agent landing', async ({ page }, info) => {
  await page.goto('https://copilotstudio.microsoft.com');

  // Defensive: wait for the Create button (whose label localizes) before snapping.
  await expect(page.getByRole('button', { name: /create|cr[eé]er/i })).toBeVisible({ timeout: 30_000 });

  await page.screenshot({
    path: outPath('lab-03', 'create-agent-landing', info.project.name),
    fullPage: false,
    animations: 'disabled',
    caret: 'hide',
    mask: REDACTION_SELECTORS.map((sel) => page.locator(sel)),
    style: '[data-testid="timestamp"], .last-edited, time { color: transparent !important; }',
  });
});
