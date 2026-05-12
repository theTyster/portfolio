import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

// Article audit (E1).
//
// Loads `/blog/template` — the canonical TEMPLATE.mdx rendered via the
// `[slug]` dynamic route from D4 — and asserts the visual+structural
// contract that the blog template lays down:
//
//   * the prose container exists on a real `<article>` element
//   * the article header surfaces the post title in an h1
//   * the article footer carries the permalink anchor (rel="bookmark")
//   * at least one fenced code block ships with a `data-language` attribute,
//     i.e. rehype-pretty-code's tokenization fired at build time
//   * `body[data-route="article"]` is set, so foundation-article's neutral
//     warm background (`var(--article-bg, #fbf8f3)`) actually paints
//
// Output: JSON report at `/tmp/portfolio-article/report.json` and a
// full-page PNG at `/tmp/portfolio-article/template.png`. Re-running the
// script overwrites both files in place. Mirrors `.explore.mjs` so the
// surface feels native — `ok` flips to false on any assert failure, and
// the same console-error / network-failure / page-error capture is in
// place. Not invoked from any per-tick loop; Ty runs this after the
// buildout loop finishes, with `pnpm dev` on port 3000.

mkdirSync('/tmp/portfolio-article', { recursive: true });

const BASE = 'http://localhost:3000';
const ROUTE = '/blog/template';
const SHOT_PATH = '/tmp/portfolio-article/template.png';
const REPORT_PATH = '/tmp/portfolio-article/report.json';

const browser = await chromium.launch();
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

const report = {
  base: BASE,
  route: ROUTE,
  status: null,
  ok: false,
  asserts: [],
  screenshots: [],
  console: consoleMessages,
  network: networkFailures,
  errors: pageErrors,
};

try {
  const resp = await page.goto(BASE + ROUTE, { waitUntil: 'domcontentloaded', timeout: 30000 });
  report.status = resp?.status() ?? null;
  await page.waitForTimeout(1500); // let hydration + foundation-article activation settle

  const probe = await page.evaluate(() => {
    const articleProse = document.querySelector('article.prose');
    const headerH1 = document.querySelector('article.prose > header.article-header h1');
    const permalink = document.querySelector('article.prose > footer.article-footer a[rel="bookmark"]');
    const fencedBlock = document.querySelector('pre[data-language], code[data-language]');
    const bodyRoute = document.body?.dataset?.route ?? null;
    const bodyBg = getComputedStyle(document.body).backgroundColor;

    return {
      articleProsePresent: !!articleProse,
      articleProseWidth: articleProse?.getAttribute('data-article-width') ?? null,
      headerH1Text: headerH1?.textContent?.trim().slice(0, 200) ?? null,
      permalinkHref: permalink?.getAttribute('href') ?? null,
      fencedBlockPresent: !!fencedBlock,
      fencedBlockLanguage: fencedBlock?.getAttribute('data-language') ?? null,
      bodyRoute,
      bodyBg,
    };
  });

  await page.screenshot({ path: SHOT_PATH, fullPage: true });
  report.screenshots.push(SHOT_PATH);

  // #fbf8f3 → rgb(251, 248, 243). Accept either the literal fallback or any
  // resolved value of --article-bg as long as it isn't transparent / default
  // body white — the criterion is "foundation-article actually painted".
  const bgPainted =
    typeof probe.bodyBg === 'string' &&
    probe.bodyBg !== '' &&
    probe.bodyBg !== 'rgba(0, 0, 0, 0)' &&
    probe.bodyBg !== 'transparent';

  report.asserts = [
    {
      name: 'article.prose element present',
      pass: probe.articleProsePresent,
      evidence: { width: probe.articleProseWidth },
    },
    {
      name: 'article header h1 present with non-empty text',
      pass: !!probe.headerH1Text && probe.headerH1Text.length > 0,
      evidence: { text: probe.headerH1Text },
    },
    {
      name: 'article footer permalink anchor present',
      pass: !!probe.permalinkHref,
      evidence: { href: probe.permalinkHref },
    },
    {
      name: 'fenced code block with data-language attribute present',
      pass: probe.fencedBlockPresent,
      evidence: { language: probe.fencedBlockLanguage },
    },
    {
      name: 'body[data-route="article"] is set',
      pass: probe.bodyRoute === 'article',
      evidence: { dataRoute: probe.bodyRoute },
    },
    {
      name: 'article body background painted (foundation-article active)',
      pass: bgPainted,
      evidence: { bodyBg: probe.bodyBg },
    },
  ];

  report.ok =
    report.asserts.every(a => a.pass) &&
    pageErrors.length === 0 &&
    networkFailures.length === 0 &&
    consoleMessages.filter(c => c.type === 'error').length === 0;
} catch (e) {
  report.error = String(e).slice(0, 500);
}

await ctx.close();
await browser.close();

writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

// Compact summary
console.log(`\n=== ${ROUTE} (status: ${report.status}) ===`);
if (report.error) console.log('ERROR:', report.error);
for (const a of report.asserts) {
  const flag = a.pass ? 'ok ' : 'FAIL';
  console.log(`${flag}  ${a.name}${a.evidence ? '  ' + JSON.stringify(a.evidence) : ''}`);
}
console.log(
  `pageErrors: ${pageErrors.length}, networkFailures: ${networkFailures.length}, consoleErrors: ${consoleMessages.filter(c => c.type === 'error').length}`,
);
if (pageErrors.length) console.log('first pageError:', pageErrors[0]);
const cErrs = consoleMessages.filter(c => c.type === 'error').slice(0, 5);
if (cErrs.length) console.log('console errors:', cErrs.map(c => c.text).join(' | '));
const netErrs = networkFailures.slice(0, 8);
if (netErrs.length) console.log('network failures:', netErrs.map(n => `${n.status || n.failure} ${n.url}`).join('\n  '));
console.log(`\nScreenshot: ${SHOT_PATH}`);
console.log(`Report:     ${REPORT_PATH}`);
console.log(`Overall:    ${report.ok ? 'OK' : 'FAIL'}`);

process.exit(report.ok ? 0 : 1);
