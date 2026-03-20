import { defineConfig } from '@playwright/test';

const BASE_URL = process.env['E2E_BASE_URL'] || 'https://rwrw01.github.io/full-vitaal/';

export default defineConfig({
  testDir: 'e2e',
  timeout: 30000,
  use: {
    baseURL: BASE_URL,
    headless: true,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
