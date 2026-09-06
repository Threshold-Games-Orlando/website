import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
const site = JSON.parse(readFileSync('src/content/site.json', 'utf8').replace(/^\uFEFF/, ''));

test('homepage is accessible and fits desktop and small screens', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 960 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(site.heroTitle);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
    if (width === 1440 || width === 390)
      await page.screenshot({ path: 'test-results/home-' + width + '.png', fullPage: true });
  }
  expect(errors).toEqual([]);
});

test('navigation and shop destinations work without client scripts', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  const shopLinks = page.locator('a[href="' + site.shopUrl + '"]');
  await expect(shopLinks).toHaveCount(3);
  await page.getByRole('link', { name: 'Our story' }).click();
  await expect(page).toHaveURL(/#about$/);
  await page.getByRole('link', { name: 'Connect', exact: true }).click();
  await expect(page).toHaveURL(/#connect$/);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await context.close();
});

test('CMS contact settings determine the rendered form and links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('form[name="contact"]')).toHaveCount(site.contactFormEnabled ? 1 : 0);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(site.contactEmail ? 1 : 0);
  await expect(page.locator('.socials a')).toHaveCount(site.socials.length);
  if (site.contactFormEnabled) {
    await page.getByLabel('Your name', { exact: true }).fill('Test Player');
    await page.getByLabel('Email address', { exact: true }).fill('player@example.com');
    await page.getByLabel('Your message', { exact: true }).fill('Checking the contact form.');
    expect(
      await page.locator('form').evaluate((form) => (form as HTMLFormElement).checkValidity()),
    ).toBe(true);
    await expect(page.locator('form')).toHaveAttribute('action', '/thank-you/');
    await expect(page.locator('input[name="form-name"]')).toHaveValue('contact');
  }
});

test('reduced motion and recovery pages work', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('.crystal').evaluate((el) => getComputedStyle(el).animationName)).toBe(
    'none',
  );
  await page.goto('/not-a-real-page/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A little off the map.');
  await page.getByRole('link', { name: 'Back to home' }).click();
  await expect(page).toHaveURL('/');
  await page.goto('/thank-you/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Message received.');
});
