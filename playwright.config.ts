import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  reporter: [['html', { outputFolder: './playwright-report' }]],
  use: {
    baseURL: 'https://www.chaceraiter.com',
  },
});
