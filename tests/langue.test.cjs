// Langue : français si le téléphone est en français, anglais pour toute autre langue.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium, devices, URL, open } = require('./helpers.cjs');

let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser.close(); });

const texts = async (locale) => {
  const { ctx, page, errs } = await open(browser, { ...devices['iPhone 13'], locale });
  await page.goto(URL); await page.waitForTimeout(600);
  await page.evaluate(() => __t.newDoudou());
  const r = {
    lang: await page.evaluate(() => document.documentElement.lang),
    title: await page.textContent('#crTitle'),
    take: await page.textContent('label.cr-btn:not(.alt) span'),
    msg: await page.textContent('#crMsg'),
  };
  assert.deepEqual(errs, []);
  await ctx.close();
  return r;
};

test('téléphone en français : jeu en français', async () => {
  const r = await texts('fr-FR');
  assert.equal(r.lang, 'fr');
  assert.equal(r.title, 'NOUVEAU DOUDOU');
  assert.equal(r.take, 'PRENDRE UNE PHOTO');
  assert.match(r.msg, /Prends ton doudou/);
});

test('français du Canada ou de Belgique : jeu en français', async () => {
  assert.equal((await texts('fr-CA')).lang, 'fr');
  assert.equal((await texts('fr-BE')).lang, 'fr');
});

for (const locale of ['en-US', 'de-DE', 'zh-HK', 'it-IT']) {
  test(`téléphone en ${locale} : jeu en anglais`, async () => {
    const r = await texts(locale);
    assert.equal(r.lang, 'en');
    assert.equal(r.title, 'NEW TOY');
    assert.equal(r.take, 'TAKE A PHOTO');
    assert.match(r.msg, /Take a photo of your toy/);
  });
}
