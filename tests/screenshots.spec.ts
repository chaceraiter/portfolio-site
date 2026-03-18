import { test } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

for (const vp of viewports) {
  test(`screenshot - ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');
    // Wait for any fonts/images to load
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: `screenshots/${vp.name}.png`,
      fullPage: true,
    });
  });
}
