import { test, expect } from '@playwright/test';

test('test login', {tag:'@assertion'},async ({ page }) => {  
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
  // You can either use a aria snapshot or check the presence of a specific element
  // Aria is generally more robust to changes in the UI, since you can customize how specific the check is
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - main:
      - heading "データを使い倒せ" [level=3]
      - list
      - textbox 
      - button "送信する"
      - paragraph
    `);
});
