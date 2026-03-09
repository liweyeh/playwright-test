import { test, expect } from '@playwright/test';

test('test login: snapshot',{tag:'@snapshot'}, async ({ page }) => {  
  await page.goto('https://dataagent-demo.head.dataagent-staging.by-fw.jp/');

  // Click the get started link.
  await page.getByRole('button', { name: 'ログイン画面へ' }).click();

  // Expects to be redirected to the login page.
  await expect(page).toHaveTitle(/ログイン/);

  // Input email and password
  const username = page.locator('#username');
  const password = page.locator('#password');
  const submitButton = page.locator('button[type="submit"]');
  await username.fill(process.env.TEST_USER_ID || '');
  await password.fill(process.env.TEST_USER_PASSWORD || ''); 
  await submitButton.click();

  // Check login success by checking the welcome message
  await page.getByRole('main').waitFor({ state: 'visible' }); // wait for the page to load after login
  await expect(page).toHaveScreenshot(); // compare the screenshot with the baseline image
});
