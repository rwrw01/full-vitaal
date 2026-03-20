import { test, expect, type Page, type BrowserContext } from '@playwright/test';

async function freshContext(page: Page): Promise<{ ctx: BrowserContext; p: Page }> {
  const ctx = await page.context().browser()!.newContext();
  const p = await ctx.newPage();
  return { ctx, p };
}

function base(page: Page): string {
  return page.context().browser()!.contexts()[0]!.pages()[0]!.url().split('#')[0] ?? '';
}

test.describe('Full E2E: Trainer → Student flow', () => {

  test('1. Trainer generates QR code and cohort link', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}#/trainer`);
    await expect(page.locator('h1')).toHaveText('Trainer Dashboard');

    const today = new Date().toISOString().split('T')[0]!;
    await page.fill('#start-input', today);
    await page.click('#generate-btn');

    await expect(page.locator('#qr-output')).toBeVisible();
    await expect(page.locator('#qr-canvas')).toBeVisible();

    const urlText = await page.locator('#qr-url').textContent();
    expect(urlText).toContain('/full-vitaal/');
    expect(urlText).toContain(`?start=${today}`);
  });

  test('2. Copy link works', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}#/trainer`);
    await expect(page.locator('h1')).toHaveText('Trainer Dashboard');

    const today = new Date().toISOString().split('T')[0]!;
    await page.fill('#start-input', today);
    await page.click('#generate-btn');
    await expect(page.locator('#qr-output')).toBeVisible();

    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.click('#copy-btn');
    await expect(page.locator('#copy-btn')).toHaveText('✓ Gekopieerd!');
  });

  test('3. Student opens cohort link and sees overview', async ({ page, baseURL }) => {
    const { ctx, p } = await freshContext(page);
    const today = new Date().toISOString().split('T')[0]!;
    await p.goto(`${baseURL}?start=${today}`);

    await expect(p.locator('h1')).toHaveText('Vitaal Na De Bootcamp');
    await expect(p.locator('.progress-bar')).toBeVisible();

    const cards = p.locator('.card');
    await expect(cards).toHaveCount(10);
    await expect(cards.first()).toContainText('Week 1');
    await expect(cards.first()).toHaveClass(/card--current/);
    await expect(cards.nth(1)).toHaveClass(/card--locked/);

    await ctx.close();
  });

  test('4. Student opens week 1 module', async ({ page, baseURL }) => {
    const { ctx, p } = await freshContext(page);
    const today = new Date().toISOString().split('T')[0]!;
    await p.goto(`${baseURL}?start=${today}`);
    await p.locator('.card').first().click();

    await expect(p.locator('h1')).toHaveText('Energie & ritme');
    await expect(p.locator('h2')).toContainText('Jouw energiepatroon begrijpen');
    await expect(p.locator('text=Checklist')).toBeVisible();
    await expect(p.locator('input[type="checkbox"]')).toHaveCount(4);
    await expect(p.locator('text=Test jezelf')).toBeVisible();
    await expect(p.locator('#reflection')).toBeVisible();
    await expect(p.locator('text=Challenge van de week')).toBeVisible();
    await expect(p.locator('#complete-btn')).toContainText('Week afronden');

    await ctx.close();
  });

  test('5. Student interacts with checklist', async ({ page, baseURL }) => {
    const { ctx, p } = await freshContext(page);
    const today = new Date().toISOString().split('T')[0]!;
    await p.goto(`${baseURL}?start=${today}`);
    await p.locator('.card').first().click();
    await expect(p.locator('#checklist-count')).toBeVisible();

    await p.locator('input[type="checkbox"]').first().check();
    await expect(p.locator('#checklist-count')).toHaveText('1/4');

    await p.locator('input[type="checkbox"]').nth(1).check();
    await expect(p.locator('#checklist-count')).toHaveText('2/4');

    // Reload — state should persist
    await p.goto(`${baseURL}#/week/1`);
    await expect(p.locator('#checklist-count')).toHaveText('2/4');
    await expect(p.locator('input[type="checkbox"]').first()).toBeChecked();

    await ctx.close();
  });

  test('6. Student answers quiz', async ({ page, baseURL }) => {
    const { ctx, p } = await freshContext(page);
    const today = new Date().toISOString().split('T')[0]!;
    await p.goto(`${baseURL}?start=${today}`);
    await p.locator('.card').first().click();
    await expect(p.locator('.quiz-option').first()).toBeVisible();

    await p.locator('.quiz-option[data-question="0"][data-option="b"]').click();
    await expect(p.locator('text=Regelmaat is krachtiger')).toBeVisible();

    // Reload — answer persists
    await p.goto(`${baseURL}#/week/1`);
    await expect(p.locator('text=Regelmaat is krachtiger')).toBeVisible();

    await ctx.close();
  });

  test('7. Student writes reflection', async ({ page, baseURL }) => {
    const { ctx, p } = await freshContext(page);
    const today = new Date().toISOString().split('T')[0]!;
    await p.goto(`${baseURL}?start=${today}`);
    await p.locator('.card').first().click();
    await expect(p.locator('#reflection')).toBeVisible();

    await p.fill('#reflection', 'Ik voel me het best rond 10 uur.');
    await p.waitForTimeout(700); // debounce

    await p.goto(`${baseURL}#/week/1`);
    await expect(p.locator('#reflection')).toHaveValue('Ik voel me het best rond 10 uur.');

    await ctx.close();
  });

  test('8. Student completes week 1', async ({ page, baseURL }) => {
    const { ctx, p } = await freshContext(page);
    const today = new Date().toISOString().split('T')[0]!;
    await p.goto(`${baseURL}?start=${today}`);
    await p.locator('.card').first().click();
    await expect(p.locator('#complete-btn')).toBeVisible();

    await p.click('#complete-btn');
    await expect(p.locator('#complete-btn')).toContainText('Afgerond');
    await expect(p.locator('#complete-btn')).toBeDisabled();

    await p.click('.back-link');
    await expect(p.locator('.card').first()).toHaveClass(/card--done/);
    await expect(p.locator('text=1 van 10 weken')).toBeVisible();

    await ctx.close();
  });

  test('9. Student without start date sees welcome screen', async ({ page, baseURL }) => {
    const { ctx, p } = await freshContext(page);
    await p.goto(baseURL!);

    await expect(p.locator('h1')).toHaveText('Vitaal Na De Bootcamp');
    await expect(p.locator('text=Scan de QR-code')).toBeVisible();

    await ctx.close();
  });

  test('10. Future cohort shows countdown', async ({ page, baseURL }) => {
    const { ctx, p } = await freshContext(page);
    const future = new Date();
    future.setDate(future.getDate() + 7);
    const futureStr = future.toISOString().split('T')[0]!;

    await p.goto(`${baseURL}?start=${futureStr}`);
    await expect(p.locator('h1')).toHaveText('Nog even geduld');
    await expect(p.locator('text=7 dagen')).toBeVisible();

    await ctx.close();
  });

  test('11. Back navigation works', async ({ page, baseURL }) => {
    const { ctx, p } = await freshContext(page);
    const today = new Date().toISOString().split('T')[0]!;
    await p.goto(`${baseURL}?start=${today}`);
    await p.locator('.card').first().click();
    await expect(p.locator('h1')).toHaveText('Energie & ritme');

    await p.click('.back-link');
    await expect(p.locator('h1')).toHaveText('Vitaal Na De Bootcamp');
    await expect(p.locator('.progress-bar')).toBeVisible();

    await ctx.close();
  });
});
