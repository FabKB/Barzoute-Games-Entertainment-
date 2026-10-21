// Vrai achat (dans l'app) : on simule Capacitor et le plugin d'achat pour vérifier le parcours
// prix de la boutique, annulation, paiement en attente, achat réussi et restauration.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium, devices, URL, open, tap, visible } = require('./helpers.cjs');

let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser.close(); });

// Faux téléphone Android avec un faux plugin d'achat. window.__iap.mode choisit ce que fait la boutique.
function fakeApp() {
  localStorage.setItem('glace-licorne:doudous', JSON.stringify([{ id: 'd1', name: 'A', rows: ['.KK.', 'KaaK', '.KK.'], pal: { a: '#c08040' } }]));
  const mem = {};
  window.Capacitor = {
    isNativePlatform: () => true, getPlatform: () => 'android', registerPlugin: () => ({}),
    Plugins: { Preferences: { keys: async () => ({ keys: Object.keys(mem) }), get: async ({ key }) => ({ value: mem[key] ?? null }), set: async ({ key, value }) => { mem[key] = value; } } }
  };
  const cbs = { productUpdated: [], approved: [], pending: [] };
  const fire = (k, v) => cbs[k].forEach(f => f(v));
  const iap = window.__iap = { mode: 'ok', registered: [], finished: 0, initialized: [] };
  const tx = id => ({ products: [{ id }], finish: async () => { iap.finished++; } });
  const product = id => ({ id, pricing: { price: '3,49 €' }, owned: false, getOffer: () => ({ order: async () => {
    if (iap.mode === 'cancel') return { isError: true, code: 6777006, message: 'annulé' };
    if (iap.mode === 'pending') { setTimeout(() => fire('pending', tx(id)), 50); return undefined; }
    setTimeout(() => fire('approved', tx(id)), 50); return undefined;
  } }) });
  const when = { productUpdated: f => (cbs.productUpdated.push(f), when), approved: f => (cbs.approved.push(f), when), pending: f => (cbs.pending.push(f), when) };
  window.CdvPurchase = {
    Platform: { APPLE_APPSTORE: 'ios-appstore', GOOGLE_PLAY: 'android-playstore' },
    ProductType: { NON_CONSUMABLE: 'non consumable' },
    ErrorCode: { PAYMENT_CANCELLED: 6777006 },
    store: {
      register: list => iap.registered.push(...list),
      when: () => when,
      initialize: async platforms => { iap.initialized = platforms; iap.registered.forEach(r => fire('productUpdated', product(r.id))); return []; },
      get: id => iap.registered.some(r => r.id === id) ? product(id) : undefined,
      restorePurchases: async () => undefined
    }
  };
}

test("dans l'app : prix de la boutique, annulation, attente, achat réussi", async () => {
  const { ctx, page, errs } = await open(browser, { ...devices['iPhone 13'] }, fakeApp);
  await page.goto(URL); await page.waitForTimeout(800);
  const iap = () => page.evaluate(() => ({ registered: __iap.registered, finished: __iap.finished, initialized: __iap.initialized }));
  const st = await iap();
  assert.deepEqual(st.registered, [{ id: 'atelier_illimite', type: 'non consumable', platform: 'android-playstore' }]);
  assert.deepEqual(st.initialized, ['android-playstore']);

  await page.evaluate(() => __t.newDoudou());
  assert.ok(await visible(page, '#gate'), 'contrôle parental avant l\'achat');
  const m = (await page.textContent('#gateQ')).match(/(\d+) × (\d+)/);
  await page.fill('#gateA', String(m[1] * m[2])); await tap(page, '#gateOk');
  assert.ok(await visible(page, '#paywall'));
  assert.equal(await page.textContent('#pwPrice'), '3,49 €', 'prix venu de la boutique');
  assert.equal(await page.textContent('#pwMsg'), '', 'pas de « mode test » dans l\'app');
  assert.ok(await page.isHidden('#gaReset'), 'pas de bouton « annuler l\'achat (test) »');

  await page.evaluate(() => { __iap.mode = 'cancel'; });
  await tap(page, '#pwBuy'); await page.waitForTimeout(300);
  assert.match(await page.textContent('#pwMsg'), /annulé/);
  assert.equal(await page.evaluate(() => localStorage.getItem('glace-licorne:atelier')), null);

  await page.evaluate(() => { __iap.mode = 'pending'; });
  await tap(page, '#pwBuy'); await page.waitForTimeout(300);
  assert.match(await page.textContent('#pwMsg'), /attente/);
  assert.ok(await visible(page, '#paywall'));

  await page.evaluate(() => { __iap.mode = 'ok'; });
  await tap(page, '#pwBuy'); await page.waitForTimeout(400);
  assert.equal(await page.evaluate(() => localStorage.getItem('glace-licorne:atelier')), '1', 'Atelier débloqué');
  assert.ok(!(await visible(page, '#paywall')) && await visible(page, '#creator'), 'atelier ouvert après l\'achat');
  assert.ok((await iap()).finished >= 1, 'transaction terminée (validée auprès de la boutique)');
  assert.deepEqual(errs, []);
  await ctx.close();
});

test("dans l'app : restaurer un achat", async () => {
  const { ctx, page, errs } = await open(browser, { ...devices['iPhone 13'] }, fakeApp);
  await page.goto(URL); await page.waitForTimeout(800);
  await page.evaluate(() => __t.openGallery());
  await tap(page, '#gaRestore'); await page.waitForTimeout(400);
  assert.match(await page.textContent('#gaInfo'), /Aucun achat/, 'pas d\'achat : rien à restaurer');
  assert.deepEqual(errs, []);
  await ctx.close();
});
