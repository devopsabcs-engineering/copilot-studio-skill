// Captures the workshop site's own pages (homepage, lab IA) in both languages.
//
// BASE_URL defaults to the local Jekyll preview (`bundle exec jekyll serve --baseurl ""`
// listens on http://localhost:4000 with no prefix). Override to capture against the
// deployed site, e.g. BASE_URL=https://devopsabcs-engineering.github.io/copilot-studio-skill.
//
// Output convention (DD-03):
//   EN → screenshots/final/lab-NN/lab-NN-<descriptor>.png
//   FR → screenshots/final/lab-NN/lab-NN-<descriptor>-fr.png
import { test, expect } from '@playwright/test';
import path from 'node:path';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4000';

function outPath(lab: string, descriptor: string, projectName: string): string {
  const suffix = projectName.startsWith('fr-') ? '-fr' : '';
  return path.join('screenshots', 'final', lab, `${lab}-${descriptor}${suffix}.png`);
}

function langPrefix(projectName: string): string {
  return projectName.startsWith('fr-') ? '/fr' : '';
}

// Skeleton example capture. Add one test per workshop-site surface that must be
// captured per language (homepage, lab index pages, navigation chrome).
test('workshop site homepage', async ({ page }, info) => {
  await page.goto(`${BASE_URL}${langPrefix(info.project.name)}/`);

  await expect(page.locator('body')).toBeVisible({ timeout: 15_000 });

  await page.screenshot({
    path: outPath('lab-00', 'workshop-home', info.project.name),
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
  });
});
