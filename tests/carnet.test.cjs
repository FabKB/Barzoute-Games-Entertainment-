// Carnet de voyage : tampons gagnés, gardés une seule fois, fenêtre du carnet en français et en anglais.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium, devices, URL, open, tap, visible } = require('./helpers.cjs');

let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser.close(); });

const saved = page => page.evaluate(() => JSON.parse(localStorage.getItem('glace-licorne:tampons') || '[]'));

test('un tampon gagné est gardé une seule fois, même après rechargement', async () => {
  const { ctx, page, errs } = await open(browser, { ...devices['iPhone 13'] });
  await page.goto(URL); await page.waitForTimeout(500);
  await page.evaluate(() => { __t.earnStamp(4); __t.earnStamp(4); __t.earnStamp(9); __t.earnStamp(42); });
  assert.deepEqual(await saved(page), [4, 9], 'Paris et Cap Canaveral, sans doublon ni monde inconnu');
  await page.reload(); await page.waitForTimeout(500);
  await page.evaluate(() => __t.earnStamp(4));
  assert.deepEqual(await saved(page), [4, 9]);
  assert.deepEqual(errs, []);
  await ctx.close();
});

for (const [locale, title, count] of [['fr-FR', 'MON CARNET DE VOYAGE', '3 tampons sur 13'], ['en-US', 'MY TRAVEL BOOK', '3 of 13 stamps']]) {
  test(`le bouton carnet ouvre le carnet (${locale})`, async () => {
    for (const dev of ['iPhone 13', 'iPhone 13 landscape']) {
      const { ctx, page, errs } = await open(browser, { ...devices[dev], locale }, () => localStorage.setItem('glace-licorne:tampons', '[1,6,5]'));
      await page.goto(URL); await page.waitForTimeout(600);
      assert.ok(await page.isVisible('#btnBook'), 'bouton visible sur l\'écran titre');
      await tap(page, '#btnBook');
      assert.ok(await visible(page, '#carnet'));
      assert.equal(await page.textContent('#caTitle'), title);
      assert.equal(await page.textContent('#caCount'), count);
      const box = await page.locator('#caPage').boundingBox();
      const vp = page.viewportSize();
      assert.ok(box.width <= vp.width && box.y + box.height <= vp.height + 1, 'la page tient dans l\'écran');
      await tap(page, '#caClose');
      assert.ok(!(await visible(page, '#carnet')));
      await page.keyboard.press('Space'); await page.waitForTimeout(400);
      assert.ok(!(await page.isVisible('#btnBook')), 'bouton caché pendant la partie');
      assert.deepEqual(errs, []);
      await ctx.close();
    }
  });
}
