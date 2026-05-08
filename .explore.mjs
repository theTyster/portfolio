import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

mkdirSync('/tmp/portfolio-explore/shots', { recursive: true });

const BASE = 'http://localhost:3000';
const ROUTES = ['/', '/cherry-lane-farms', '/jeopardy', '/does-not-exist'];

const report = { base: BASE, routes: {} };

const browser = await chromium.launch();

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const consoleMessages = [];
  const networkFailures = [];
  const pageErrors = [];

  page.on('console', m => consoleMessages.push({ type: m.type(), text: m.text().slice(0, 500) }));
  page.on('pageerror', e => pageErrors.push(String(e).slice(0, 800)));
  page.on('requestfailed', r => networkFailures.push({ url: r.url(), failure: r.failure()?.errorText }));
  page.on('response', resp => {
    if (resp.status() >= 400) networkFailures.push({ url: resp.url(), status: resp.status() });
  });

  const slug = route === '/' ? 'root' : route.replace(/\W+/g, '_').replace(/^_+|_+$/g, '');
  const r = { route, console: consoleMessages, network: networkFailures, errors: pageErrors };

  try {
    const resp = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
    r.status = resp?.status() ?? null;
    await page.waitForTimeout(1500); // let async hydration / fetches settle

    const checks = await page.evaluate(() => {
      const has = sel => !!document.querySelector(sel);
      const text = sel => document.querySelector(sel)?.textContent?.trim().slice(0, 200) ?? null;
      const bodyBg = getComputedStyle(document.body).backgroundColor;
      return {
        title: document.title,
        hasHeader: has('header'),
        hasNav: has('header #nav') || has('nav'),
        hasWaveLogo: has('header img[src*="splat-wave"]') || has('img[src*="splat-wave"]'),
        hasFooter: has('footer'),
        hasMain: has('main'),
        hasContent: has('#content'),
        bodyBg,
        h1: text('h1'),
        firstSectionHeading: text('main h2, #content h2'),
        recentPostsPresent: has('#recent-posts'),
        hobbiesPresent: has('.hobbies, #hobbies, [class*="hobbies"]'),
        bodyTextLen: document.body.innerText.length,
      };
    });
    r.checks = checks;
    await page.screenshot({ path: `/tmp/portfolio-explore/shots/${slug}.png`, fullPage: true });
  } catch (e) {
    r.error = String(e).slice(0, 500);
  }

  await ctx.close();
  report.routes[route] = r;
}

await browser.close();
writeFileSync('/tmp/portfolio-explore/report.json', JSON.stringify(report, null, 2));

// Compact summary
for (const [route, r] of Object.entries(report.routes)) {
  console.log(`\n=== ${route} (status: ${r.status}) ===`);
  if (r.error) console.log('ERROR:', r.error);
  if (r.checks) {
    console.log('checks:', JSON.stringify(r.checks, null, 2));
  }
  console.log(`pageErrors: ${r.errors.length}, networkFailures: ${r.network.length}, consoleErrors: ${r.console.filter(c => c.type === 'error').length}`);
  if (r.errors.length) console.log('first pageError:', r.errors[0]);
  const cErrs = r.console.filter(c => c.type === 'error').slice(0, 5);
  if (cErrs.length) console.log('console errors:', cErrs.map(c => c.text).join(' | '));
  const netErrs = r.network.slice(0, 8);
  if (netErrs.length) console.log('network failures:', netErrs.map(n => `${n.status || n.failure} ${n.url}`).join('\n  '));
}
