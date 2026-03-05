import { test, expect } from '@playwright/test';

test('test login', async ({ page }) => {
  await page.goto('https://dataagent-demo.head.dataagent-staging.by-fw.jp/');

  // Click the get started link.
  await page.getByRole('button', { name: 'ログイン画面へ' }).click();

  // Expects to be redirected to the login page.
  await expect(page).toHaveTitle(/ログイン/);

  // Input email and password
  const username = page.locator('#username');
  const password = page.locator('#password');
  const submitButton = page.locator('button[type="submit"]');
  await username.fill(''); // just sample, will not commit this to repo
  await password.fill(''); // just sample, will not commit this to repo
  await submitButton.click();

  // Check login success by checking the welcome message
  const welcomeMsg = page.locator('text=データを使い倒せ');
  await expect(welcomeMsg).toBeVisible();
});
