import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT = '/tmp/portfolio-audit';
mkdirSync(OUT + '/shots', { recursive: true });

const EXPECTED_NEW_ASSETS = [
  '/static/img/fortyau-logo.svg',
  '/static/img/orbital-ss.svg',
  '/static/img/artemis-ss.svg',
  '/static/img/context-focused-agents-ss.svg',
  '/static/img/philosophy-essays-ss.svg',
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

const consoleMessages = [];
const networkFailures = [];
const pageErrors = [];
const assetResponses = {};

page.on('console', m => consoleMessages.push({ type: m.type(), text: m.text().slice(0, 500) }));
page.on('pageerror', e => pageErrors.push(String(e).slice(0, 800)));
page.on('requestfailed', r => networkFailures.push({ url: r.url(), failure: r.failure()?.errorText }));
page.on('response', resp => {
  const u = new URL(resp.url()).pathname;
  if (EXPECTED_NEW_ASSETS.some(a => u.endsWith(a))) assetResponses[u] = resp.status();
  if (resp.status() >= 400) networkFailures.push({ url: resp.url(), status: resp.status() });
});

const resp = await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
const status = resp?.status() ?? null;
await page.waitForTimeout(1500);

await page.screenshot({ path: OUT + '/shots/full-page.png', fullPage: true });

// Click Job History tab first (default tab is My Work)
const jobHistoryTab = page.getByRole('button', { name: /job history/i }).or(page.getByRole('tab', { name: /job history/i })).or(page.locator('a, button').filter({ hasText: /^Job History$/i })).first();
if (await jobHistoryTab.count() > 0) {
  await jobHistoryTab.click();
  await page.waitForTimeout(800);
}
const jobHistoryLocator = page.locator('.jobHistory').first();
const hasJobHistory = await jobHistoryLocator.count() > 0;
if (hasJobHistory) {
  await jobHistoryLocator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await jobHistoryLocator.screenshot({ path: OUT + '/shots/job-history.png' });
  const fortyAuLocator = page.locator('[class^="jobHistory-5-"], [class*=" jobHistory-5-"]').first();
  if (await fortyAuLocator.count() > 0) {
    await fortyAuLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const box = await fortyAuLocator.boundingBox();
    if (box) {
      await page.screenshot({
        path: OUT + '/shots/fortyau-entry.png',
        clip: { x: 0, y: Math.max(0, box.y - 20), width: 1280, height: Math.min(1500, box.height + 900) },
      });
    }
  }
}

// Click My Work tab to bring it back into the DOM
const myWorkTab = page.getByRole('button', { name: /^my work$/i }).or(page.getByRole('tab', { name: /^my work$/i })).or(page.locator('a, button').filter({ hasText: /^My Work$/i })).first();
if (await myWorkTab.count() > 0) {
  await myWorkTab.click();
  await page.waitForTimeout(800);
}
const myWorkLocator = page.locator('menu.my-work').first();
const hasMyWork = await myWorkLocator.count() > 0;
if (hasMyWork) {
  await myWorkLocator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await myWorkLocator.screenshot({ path: OUT + '/shots/my-work.png' });
}

const assetCheck = {};
for (const asset of EXPECTED_NEW_ASSETS) {
  const r = await page.request.get('http://localhost:3000' + asset);
  assetCheck[asset] = { status: r.status(), contentType: r.headers()['content-type'] };
}

const myWorkTiles = await page.locator('.showcase > *, .showcase a, .showcase button').evaluateAll(els => {
  return els.slice(0, 30).map(e => ({
    tag: e.tagName.toLowerCase(),
    id: e.dataset?.showcaseItemId || null,
    title: e.querySelector('h3')?.textContent?.trim() || null,
    href: e.getAttribute?.('href') || null,
    imgSrc: e.querySelector('img')?.getAttribute('src') || null,
    imgNaturalWidth: e.querySelector('img')?.naturalWidth ?? null,
    imgNaturalHeight: e.querySelector('img')?.naturalHeight ?? null,
  }));
});

const report = {
  base: 'http://localhost:3000',
  status,
  pageTitle: await page.title(),
  hasJobHistory,
  hasMyWork,
  consoleErrors: consoleMessages.filter(m => m.type === 'error'),
  consoleWarnings: consoleMessages.filter(m => m.type === 'warning'),
  networkFailures,
  pageErrors,
  assetResponses,
  assetCheck,
  myWorkTilesCount: myWorkTiles.length,
  myWorkTiles,
};

writeFileSync(OUT + '/report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

await browser.close();
