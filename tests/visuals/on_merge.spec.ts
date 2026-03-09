import { test, expect } from '@playwright/test';

test('test login: visual',{tag:'@visual'}, async ({ page }) => {  
  await page.goto('https://dataagent-demo.head.dataagent-staging.by-fw.jp/');

  // Click the get started link.
  await page.getByRole('button', { name: 'ログイン画面へ' }).waitFor({ state: 'visible' });
    
  await expect(page).toHaveScreenshot(); // compare the screenshot with the baseline image
});
