import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

mkdirSync('/tmp/portfolio-header', { recursive: true });
const BASE = 'http://localhost:3000';
const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'tablet',  width: 800,  height: 900 },
  { name: 'mobile',  width: 390,  height: 844 },
];
const ROUTES = ['/', '/cherry-lane-farms', '/does-not-exist'];

const browser = await chromium.launch();
const report = {};

for (const vp of VIEWPORTS) {
  for (const route of ROUTES) {
    const ctx = await browser.newContext({ viewport: vp });
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const slug = `${vp.name}_${route === '/' ? 'root' : route.replace(/\W+/g, '_').replace(/^_+|_+$/g, '')}`;

    // CLOSED state
    await page.screenshot({ path: `/tmp/portfolio-header/${slug}_closed.png`, clip: { x: 0, y: 0, width: vp.width, height: 200 } });

    const closedMetrics = await page.evaluate(() => {
      const h = document.querySelector('header');
      const toggle = document.querySelector('.menu-toggle');
      const brand = document.querySelector('.brand');
      const brandLogo = document.querySelector('.brand-logo');
      const drawer = document.querySelector('.nav-drawer');
      const skipLink = document.querySelector('.skip-link');
      if (!h) return null;
      const r = (el) => { if (!el) return null; const x = el.getBoundingClientRect(); return { x: Math.round(x.x), y: Math.round(x.y), w: Math.round(x.width), h: Math.round(x.height) }; };
      return {
        viewport: { w: window.innerWidth, h: window.innerHeight },
        header: r(h),
        headerBg: getComputedStyle(h).backgroundColor,
        toggle: r(toggle),
        toggleAriaExpanded: toggle?.getAttribute('aria-expanded'),
        toggleAriaControls: toggle?.getAttribute('aria-controls'),
        brand: r(brand),
        brandLogo: r(brandLogo),
        brandLogoAlt: brandLogo?.getAttribute('alt'),
        drawerDataOpen: drawer?.getAttribute('data-open'),
        drawerVisibility: drawer ? getComputedStyle(drawer).visibility : null,
        drawerMaxHeight: drawer ? getComputedStyle(drawer).maxHeight : null,
        skipLinkPresent: !!skipLink,
        linkCount: drawer?.querySelectorAll('a').length ?? 0,
      };
    });

    // OPEN state
    if (await page.$('.menu-toggle')) {
      await page.click('.menu-toggle');
      await page.waitForTimeout(450);
      await page.screenshot({ path: `/tmp/portfolio-header/${slug}_open.png`, clip: { x: 0, y: 0, width: vp.width, height: Math.min(700, vp.height) } });
    }

    const openMetrics = await page.evaluate(() => {
      const drawer = document.querySelector('.nav-drawer');
      const toggle = document.querySelector('.menu-toggle');
      if (!drawer) return null;
      const cs = getComputedStyle(drawer);
      const dr = drawer.getBoundingClientRect();
      const links = Array.from(drawer.querySelectorAll('a')).map(a => {
        const r = a.getBoundingClientRect();
        return {
          text: a.textContent.trim().slice(0, 40),
          href: a.getAttribute('href'),
          ariaCurrent: a.getAttribute('aria-current'),
          target: a.getAttribute('target'),
          rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        };
      });
      return {
        toggleAriaExpanded: toggle?.getAttribute('aria-expanded'),
        dataOpen: drawer.getAttribute('data-open'),
        visibility: cs.visibility,
        maxHeight: cs.maxHeight,
        actualHeight: Math.round(dr.height),
        linkCount: links.length,
        links,
      };
    });

    report[slug] = { route, viewport: vp, closedMetrics, openMetrics };

    await ctx.close();
  }
}

await browser.close();
writeFileSync('/tmp/portfolio-header/report.json', JSON.stringify(report, null, 2));

for (const [slug, r] of Object.entries(report)) {
  console.log(`\n=== ${slug} ===`);
  if (!r.closedMetrics) { console.log('NO HEADER FOUND'); continue; }
  const c = r.closedMetrics;
  console.log(`closed: header ${c.header.h}px, toggle@${c.toggle?.x},${c.toggle?.y} (${c.toggle?.w}×${c.toggle?.h}), brand@${c.brand?.x} logo ${c.brandLogo?.w}×${c.brandLogo?.h}, drawer data-open=${c.drawerDataOpen} max-h=${c.drawerMaxHeight}, skip-link=${c.skipLinkPresent}, aria-expanded=${c.toggleAriaExpanded} aria-controls=${c.toggleAriaControls}`);
  if (r.openMetrics) {
    const o = r.openMetrics;
    console.log(`open: drawer ${o.actualHeight}px, ${o.linkCount} links, aria-expanded=${o.toggleAriaExpanded}, data-open=${o.dataOpen}`);
    const current = o.links.filter(l => l.ariaCurrent === 'page');
    if (current.length) console.log(`  aria-current="page": ${current.map(l => l.text).join(', ')}`);
    const ext = o.links.filter(l => l.target === '_blank').length;
    console.log(`  externals: ${ext}`);
  }
}
console.log(`\nScreenshots: /tmp/portfolio-header/`);
