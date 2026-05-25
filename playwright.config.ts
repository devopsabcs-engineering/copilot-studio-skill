import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'screenshots/playwright',
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
    timezoneId: 'America/Los_Angeles',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'off',
    trace: 'off',
  },
  projects: [
    { name: 'seed-copilotstudio', testMatch: /seed\.copilotstudio\.ts/, grep: /@seed/ },
    {
      name: 'en-public',
      use: { ...devices['Desktop Chrome'], locale: 'en-US', extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' } },
      testMatch: /public\..*\.ts/,
    },
    {
      name: 'fr-public',
      use: { ...devices['Desktop Chrome'], locale: 'fr-FR', extraHTTPHeaders: { 'Accept-Language': 'fr-FR,fr;q=0.9' } },
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
    {
      name: 'fr-copilotstudio',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'fr-FR',
        extraHTTPHeaders: { 'Accept-Language': 'fr-FR,fr;q=0.9' },
        storageState: 'screenshots/.auth/copilotstudio.json',
      },
      testMatch: /copilotstudio\..*\.ts/,
    },
  ],
});
