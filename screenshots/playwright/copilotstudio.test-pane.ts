// Captures Copilot Studio test pane in both EN and FR.
// Requires storageState seeded via `npm run screenshots:seed` (one-time, interactive MFA).
//
// REDACTION SELECTORS (DR-02 — Live verification required on first capture pass).
// See copilotstudio.create-agent.ts for the rationale. These selectors are mirrored
// across all copilotstudio.* specs; update both files if the live portal disagrees.
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

// Skeleton example capture. Lab 09 owns the "test in portal" flow.
test('lab-09 — test pane initial state', async ({ page }, info) => {
  await page.goto('https://copilotstudio.microsoft.com');

  // Defensive: wait for the portal chrome before snapping. Concrete navigation to the
  // test pane (Test → open) is added in the live capture pass per DR-02.
  await expect(page.getByRole('button', { name: /create|cr[eé]er/i })).toBeVisible({ timeout: 30_000 });

  await page.screenshot({
    path: outPath('lab-09', 'test-pane-initial', info.project.name),
    fullPage: false,
    animations: 'disabled',
    caret: 'hide',
    mask: REDACTION_SELECTORS.map((sel) => page.locator(sel)),
    style: '[data-testid="timestamp"], .last-edited, time { color: transparent !important; }',
  });
});
