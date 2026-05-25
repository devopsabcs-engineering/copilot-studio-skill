// Captures relevant Microsoft Learn pages used under fair use in the workshop.
//
// Microsoft Learn auto-redirects based on the Accept-Language header set by each
// project's locale (en-US → /en-us/..., fr-FR → /fr-fr/...). We start at the
// locale-neutral URL and let Learn handle the redirect, then capture the localized
// result. Pin a ?wt.mc_id parameter and the capture date in alt text in lab markdown.
//
// Output convention (DD-03):
//   EN → screenshots/final/lab-NN/lab-NN-<descriptor>.png
//   FR → screenshots/final/lab-NN/lab-NN-<descriptor>-fr.png
import { test, expect } from '@playwright/test';
import path from 'node:path';

function outPath(lab: string, descriptor: string, projectName: string): string {
  const suffix = projectName.startsWith('fr-') ? '-fr' : '';
  return path.join('screenshots', 'final', lab, `${lab}-${descriptor}${suffix}.png`);
}

// Skeleton example capture. Add one test per Microsoft Learn page referenced from a
// lab (Copilot Studio overview, licensing, agent topics, etc.).
test('microsoft learn — copilot studio overview', async ({ page }, info) => {
  await page.goto('https://learn.microsoft.com/microsoft-copilot-studio/');

  // Wait for the localized hero heading before snapping.
  await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 });

  await page.screenshot({
    path: outPath('lab-00', 'learn-overview', info.project.name),
    fullPage: false,
    animations: 'disabled',
    caret: 'hide',
  });
});
