import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:4323',
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  },
  webServer: {
    command: 'npm run build && node scripts/test-server.mjs',
    url: 'http://127.0.0.1:4323',
    reuseExistingServer: false,
    timeout: 120000,
  },
});
