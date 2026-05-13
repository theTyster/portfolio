import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const OUT = '/tmp/portfolio-audit/shots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.locator('.menu-toggle').click();
await page.waitForTimeout(400);

const menuLinks = await page.locator('.nav-drawer a').evaluateAll(els =>
  els.map(e => ({
    label: e.textContent?.trim() || null,
    href: e.getAttribute('href'),
    target: e.getAttribute('target'),
    external: e.getAttribute('target') === '_blank',
  }))
);
console.log('Menu items:', JSON.stringify(menuLinks, null, 2));

await page.screenshot({ path: OUT + '/menu-open.png', fullPage: false });
await browser.close();
