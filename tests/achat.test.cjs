// Doudous et achat (mode test) : 1er doudou offert, 2e derrière le contrôle parental et l'écran d'achat,
// galerie (renommer, supprimer), restaurer, et tout est gardé après rechargement.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium, devices, URL, open, tap, visible, fixture } = require('./helpers.cjs');

let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser.close(); });

const doudous = page => page.evaluate(() => JSON.parse(localStorage.getItem('glace-licorne:doudous') || '[]').map(d => d.name));

for (const dev of ['iPhone 13', 'iPhone 13 landscape']) {
  test(`parcours complet doudous et achat (${dev})`, async () => {
    const { ctx, page, errs } = await open(browser, { ...devices[dev] });
    await page.goto(URL); await page.waitForTimeout(700);
    const create = async name => {
      const fc = page.waitForEvent('filechooser'); await tap(page, 'label.cr-btn.alt'); await (await fc).setFiles(fixture('ours.jpg'));
      await page.waitForTimeout(700);
      assert.equal(await page.isDisabled('#crOk'), false, 'VALIDER actif après la photo');
      await page.fill('#crName', name); await tap(page, '#crOk');
    };

    await page.evaluate(() => __t.newDoudou());
    assert.ok(await visible(page, '#creator'), '1er doudou : atelier ouvert directement');
    await create('nounours');
    assert.deepEqual(await doudous(page), ['NOUNOUR']);

    await page.evaluate(() => __t.openGallery());
    await tap(page, '#gaNew');
    assert.ok(await visible(page, '#gate'), '2e doudou : contrôle parental');
    assert.ok(!(await visible(page, '#creator')), "pas d'atelier sans achat");

    await page.fill('#gateA', '1'); await tap(page, '#gateOk');
    assert.ok(!(await visible(page, '#paywall')), 'mauvaise réponse : pas d\'écran d\'achat');
    const m = (await page.textContent('#gateQ')).match(/(\d+) × (\d+)/);
    assert.ok(m, 'question en chiffres « a × b »');
    await page.fill('#gateA', String(m[1] * m[2])); await tap(page, '#gateOk');
    assert.ok(await visible(page, '#paywall'), 'bonne réponse : écran d\'achat');

    await tap(page, '#pwRestore'); await page.waitForTimeout(600);
    assert.match(await page.textContent('#pwMsg'), /Aucun achat/);
    await tap(page, '#pwBuy'); await page.waitForTimeout(1000);
    assert.ok(!(await visible(page, '#paywall')) && await visible(page, '#creator'), 'après achat : atelier ouvert');
    await create('ours2');
    assert.deepEqual(await doudous(page), ['NOUNOUR', 'OURS2']);

    await tap(page, '.ga-item:nth-child(1) .ga-acts button.alt'); await page.fill('.ga-item:nth-child(1) input', 'teddy'); await tap(page, '.ga-item:nth-child(1) .ga-acts button');
    await tap(page, '.ga-item:nth-child(2) button.del'); await tap(page, '.ga-item:nth-child(2) button.del');
    assert.deepEqual(await doudous(page), ['TEDDY'], 'renommer puis supprimer (deux touchers)');

    await tap(page, '#gaRestore'); await page.waitForTimeout(600);
    assert.match(await page.textContent('#gaInfo'), /retrouvé/);
    await page.waitForTimeout(1000);
    await tap(page, '.ga-item:nth-child(1) .ga-acts button');
    assert.ok(!(await visible(page, '#gallery')), 'CHOISIR ferme la galerie');

    await page.reload(); await page.waitForTimeout(800);
    assert.deepEqual(await doudous(page), ['TEDDY']);
    assert.equal(await page.evaluate(() => localStorage.getItem('glace-licorne:atelier')), '1');
    assert.deepEqual(errs, []);
    await ctx.close();
  });
}

test('case « + » au toucher : atelier pour le 1er doudou, contrôle parental pour le 2e', async () => {
  const { ctx, page, errs } = await open(browser, { ...devices['iPhone 13 landscape'] });
  await page.goto(URL); await page.waitForTimeout(700);
  const vp = page.viewportSize();
  // La case « + » est la dernière carte : on balaie la rangée de droite à gauche jusqu'à ouvrir une fenêtre.
  const tapPlus = async () => {
    for (let fx = 0.75; fx > 0.4; fx -= 0.04) {
      await page.touchscreen.tap(vp.width * fx, vp.height * 0.6); await page.waitForTimeout(200);
      if (await visible(page, '#creator') || await visible(page, '#gate')) return;
      await page.evaluate(() => { const h = document.getElementById('btnHome'); if (!h.hidden) h.click(); }); await page.waitForTimeout(150);
    }
  };
  await tapPlus();
  assert.ok(await visible(page, '#creator') && !(await visible(page, '#gate')), '0 doudou : atelier');
  const fc = page.waitForEvent('filechooser'); await tap(page, 'label.cr-btn.alt'); await (await fc).setFiles(fixture('ours-fond-raye.jpg'));
  await page.waitForTimeout(800);
  const cv = await page.locator('#crView').boundingBox();
  await page.touchscreen.tap(cv.x + cv.width * 0.25, cv.y + cv.height * 0.5); await page.waitForTimeout(400);
  await tap(page, '#crOk');
  assert.equal((await doudous(page)).length, 1);
  await tapPlus();
  assert.ok(await visible(page, '#gate') && !(await visible(page, '#creator')), '1 doudou : contrôle parental');
  assert.deepEqual(errs, []);
  await ctx.close();
});
