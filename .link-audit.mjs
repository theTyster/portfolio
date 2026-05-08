import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const ROUTES = ['/', '/cherry-lane-farms', '/jeopardy', '/does-not-exist'];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

const allLinks = new Map(); // href → { sources: Set<route>, status?: number, error?: string }

for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(800);
  // For the landing page, also visit each tab so the showcase / blog / contributions links render
  if (route === '/') {
    for (const tab of ['Job History', 'My Work', 'Contributions', 'Blog']) {
      try {
        await page.click(`button[aria-label="${tab}"]`);
        await page.waitForTimeout(400);
        const links = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href')));
        for (const h of links) {
          if (!allLinks.has(h)) allLinks.set(h, { sources: new Set() });
          allLinks.get(h).sources.add(`/ (tab: ${tab})`);
        }
      } catch (e) {
        console.error(`tab ${tab} failed:`, String(e).slice(0, 200));
      }
    }
  } else {
    const links = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href')));
    for (const h of links) {
      if (!allLinks.has(h)) allLinks.set(h, { sources: new Set() });
      allLinks.get(h).sources.add(route);
    }
  }
}

// Now check each non-anchor, non-mailto, non-tel link
const checked = [];
for (const [href, info] of allLinks) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
  let url;
  try {
    url = new URL(href, BASE);
  } catch (e) {
    info.error = `invalid URL: ${e.message}`;
    checked.push({ href, ...info, sources: [...info.sources] });
    continue;
  }
  // Only check same-origin internal links; external links we just list (no need to bombard)
  if (url.origin !== BASE) {
    info.external = true;
    checked.push({ href, resolved: url.href, ...info, sources: [...info.sources] });
    continue;
  }
  try {
    const resp = await page.request.fetch(url.href, { method: 'GET', maxRedirects: 5 });
    info.status = resp.status();
    info.finalUrl = resp.url();
  } catch (e) {
    info.error = String(e).slice(0, 200);
  }
  checked.push({ href, resolved: url.href, ...info, sources: [...info.sources] });
}

await browser.close();

const broken = checked.filter(c => !c.external && (c.error || (c.status && c.status >= 400)));
const internal = checked.filter(c => !c.external);
const external = checked.filter(c => c.external);

console.log(`\n=== INTERNAL LINKS (${internal.length}) ===`);
for (const c of internal) {
  const flag = c.error ? `ERR ${c.error}` : c.status >= 400 ? `❌ ${c.status}` : `✓ ${c.status}`;
  console.log(`${flag.padEnd(20)} ${c.href.padEnd(45)} ← ${c.sources.join(', ')}`);
}

console.log(`\n=== EXTERNAL LINKS (${external.length}) — not fetched ===`);
for (const c of external) {
  console.log(`${c.href.padEnd(60)} ← ${c.sources.join(', ')}`);
}

console.log(`\n=== SUMMARY ===`);
console.log(`broken internal: ${broken.length}`);
process.exit(broken.length ? 1 : 0);
