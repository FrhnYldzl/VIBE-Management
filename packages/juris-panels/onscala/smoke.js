const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
  await page.goto('file://' + path.resolve('juris-panel-onscala.html'));
  await page.waitForTimeout(500);
  const views = ['home','insights','fn-PLAN','fn-İCRA','fn-DENETİM','fn-RAPORLAMA','as-A','as-B','as-C','as-D','as-E','as-F','ob-onboarding','ob-learn',
    'A1','A2','A3','A4','A5','B1','B2','B3','C1','C2','D1','D2','E1','E2','E3','E4','E5','E6','E7','F1','F2'];
  const report = [];
  for (const v of views) {
    await page.evaluate(v => go(v), v);
    await page.waitForTimeout(60);
    const html = await page.evaluate(() => document.getElementById('view').innerHTML);
    const bad = (html.match(/undefined|NaN|\[object Object\]/g) || []).length;
    report.push(`${v}: ${html.length} chars, bad=${bad}`);
    if (v === 'home' || v === 'as-B' || v === 'as-E') await page.screenshot({ path: `shot-${v}.png`, fullPage: false });
  }
  console.log(report.join('\n'));
  console.log('errors:', errors.length ? errors.join('\n') : 'none');
  await browser.close();
})();
