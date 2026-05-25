// Tagged @seed: only the `seed-copilotstudio` project (grep: /@seed/) runs this spec.
// Default `npm run screenshots` skips it; reseed via `npm run screenshots:seed`.
//
// Re-run when the saved cookies expire (the next portal capture run starts redirecting
// you back to login.microsoftonline.com). Cookies typically last 24h; refresh tokens vary.
//
// The script suspends with `page.pause()` so the human can complete Entra ID + MFA
// (Authenticator, FIDO2, SMS, number-matching) interactively. Press Resume in the
// Playwright Inspector once the Copilot Studio home page is fully loaded.
import { test as setup, expect } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs/promises';

const authFile = path.join(__dirname, '..', '.auth', 'copilotstudio.json');

setup('seed copilot studio auth @seed', async ({ page, context }) => {
  await fs.mkdir(path.dirname(authFile), { recursive: true });

  await page.goto('https://copilotstudio.microsoft.com');

  // Microsoft conditional access redirects to login.microsoftonline.com. Do NOT script
  // the form fill — MFA cannot be safely automated. Let the human drive sign-in.
  console.log('\n>>> Complete sign-in (including MFA) in the opened browser window.');
  console.log('>>> Press the Resume button in the Playwright Inspector when the portal loads.\n');
  await page.pause();

  // Defensive: confirm we see something only an authenticated session would render.
  await expect(page.getByRole('button', { name: /create|cr[eé]er/i })).toBeVisible({ timeout: 30_000 });

  await context.storageState({ path: authFile });
  console.log(`\n>>> Saved auth state to ${authFile}`);
  console.log('>>> Treat this file as a secret. It is git-ignored under screenshots/.auth/.\n');
});
