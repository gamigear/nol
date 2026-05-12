const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('https://nol.gamigear.com/', { waitUntil: 'networkidle' });
  const firstBefore = await page.locator('.ranking-card dt a').first().innerText();
  await page.getByRole('button', { name: '콘서트' }).first().click();
  await page.waitForTimeout(300);
  const firstAfter = await page.locator('.ranking-card dt a').first().innerText();
  console.log(JSON.stringify({ firstBefore, firstAfter, changed: firstBefore !== firstAfter }, null, 2));
  await browser.close();
})().catch((error) => { console.error(error); process.exit(1); });
