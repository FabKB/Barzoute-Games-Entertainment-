// Le jeu : démarrage, rotation, stockage de l'app, fluidité à 90 Hz, étoiles de la piste de la fusée.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium, URL, open } = require('./helpers.cjs');

let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser.close(); });

const tinyDoudous = n => Array.from({ length: n }, (_, i) => ({
  id: 'd' + i, name: 'DOU' + (i + 1), rows: ['..KKK..', '.KaaaK.', '.KaKaK.', '.KaaaK.', '..KKK..'], pal: { a: '#c08040' }
}));

test('démarre sans erreur sur 4 formats, avec 0, 1 et 7 doudous', async () => {
  for (const nd of [0, 1, 7]) for (const [width, height] of [[844, 390], [390, 844], [470, 467], [1024, 768]]) {
    const { ctx, page, errs } = await open(browser, { viewport: { width, height } });
    await page.addInitScript(d => {
      localStorage.setItem('glace-licorne:doudous', JSON.stringify(d));
      localStorage.setItem('glace-licorne:perso-id', d.length ? d[d.length - 1].id : 'glace');
    }, tinyDoudous(nd));
    await page.goto(URL); await page.waitForTimeout(600);
    assert.deepEqual(errs, [], `${nd} doudou(s), ${width}x${height}`);
    await ctx.close();
  }
});

test('suit la rotation du téléphone', async () => {
  const { ctx, page, errs } = await open(browser, { viewport: { width: 390, height: 844 }, hasTouch: true });
  await page.goto(URL); await page.waitForTimeout(500);
  await page.keyboard.press('Space'); await page.waitForTimeout(800);
  const size = () => page.evaluate(() => { const c = document.getElementById('game'); return [parseFloat(c.style.width), parseFloat(c.style.height)]; });
  const [pw, ph] = await size();
  assert.ok(ph > pw, 'portrait : plus haut que large');
  await page.setViewportSize({ width: 844, height: 390 }); await page.waitForTimeout(700);
  const [lw, lh] = await size();
  assert.ok(lw > lh, 'paysage : plus large que haut');
  assert.deepEqual(errs, []);
  await ctx.close();
});

test("relit le stockage de l'app au lancement et y envoie les sauvegardes", async () => {
  const { ctx, page, errs } = await open(browser, { viewport: { width: 844, height: 390 } }, () => {
    localStorage.clear();
    const mem = {
      'glace-licorne:doudous': JSON.stringify([{ id: 'd1', name: 'NATIF', rows: ['..KKK..', '.KaaaK.', '..KKK..'], pal: { a: '#40a0c0' } }]),
      'glace-licorne:atelier': '1', 'glace-licorne:best': '777'
    };
    window.__mem = mem;
    const Preferences = {
      keys: async () => ({ keys: Object.keys(mem) }),
      get: async ({ key }) => ({ value: key in mem ? mem[key] : null }),
      set: async ({ key, value }) => { mem[key] = value; }
    };
    window.Capacitor = { isNativePlatform: () => true, Plugins: { Preferences } };
  });
  await page.goto(URL); await page.waitForTimeout(900);
  const read = await page.evaluate(() => [localStorage.getItem('glace-licorne:best'), localStorage.getItem('glace-licorne:atelier'), JSON.parse(localStorage.getItem('glace-licorne:doudous'))[0].name]);
  assert.deepEqual(read, ['777', '1', 'NATIF']);
  await page.keyboard.press('ArrowDown'); await page.waitForTimeout(300);
  assert.ok(await page.evaluate(() => window.__mem['glace-licorne:mode']), 'le changement de mode est envoyé au stockage de l\'app');
  assert.deepEqual(errs, []);
  await ctx.close();
});

test('avance régulièrement sur un écran à 90 Hz', async () => {
  const { ctx, page, errs } = await open(browser, { viewport: { width: 400, height: 860 }, deviceScaleFactor: 2.6 }, () => {
    let q = [], now = 0;
    window.requestAnimationFrame = cb => { q.push(cb); return q.length; };
    performance.now = () => now;
    window.__tick = hz => { now += 1000 / hz; const c = q; q = []; for (const f of c) f(now); };
  });
  await page.goto(URL);
  await page.evaluate(() => { for (let i = 0; i < 90; i++) __tick(90); });
  await page.keyboard.press('Space');
  const d = await page.evaluate(() => {
    for (let i = 0; i < 30; i++) __tick(90);
    const PX = __g.PX, out = [];
    let last = Math.round(__g.camX * PX);
    for (let i = 0; i < 60; i++) { __tick(90); const c = Math.round(__g.camX * PX); out.push(c - last); last = c; }
    // Si le personnage tombe, la caméra s'arrête : on ne garde que les images où l'on court.
    return out.filter(v => v > 0);
  });
  // Pixels d'écran parcourus par la caméra à chaque image : presque toujours le même nombre.
  assert.ok(d.length >= 40, 'assez d\'images mesurées pendant la course');
  assert.ok(Math.max(...d) - Math.min(...d) <= 2, 'écarts entre images : ' + d.join(' '));
  assert.deepEqual(errs, []);
  await ctx.close();
});

test('ramasse toutes les étoiles de la piste de la fusée et gagne les tampons du voyage', { timeout: 15 * 60 * 1000 }, async () => {
  const { ctx, page, errs } = await open(browser, { viewport: { width: 844, height: 390 } });
  await page.clock.install();
  await page.goto(URL); await page.clock.runFor(1500);
  await page.keyboard.press('Space');
  let total = 0; const missed = new Set(); let reached = false;
  for (let i = 0; i < 2400; i++) {
    await page.keyboard.down('Space'); await page.clock.runFor(150); await page.keyboard.up('Space'); await page.clock.runFor(350);
    const st = await page.evaluate(() => { const L = __g.launch; return L ? { phase: L.phase, x: L.pl.x, padX: L.padX } : null; });
    if (!st) continue;
    reached = true;
    const r = await page.evaluate(rw => ({
      all: __g.gems.filter(s => s.x > rw.x && s.x < rw.padX).length,
      missed: __g.gems.filter(s => !s.taken && s.x > rw.x && s.x < rw.padX && s.x < __g.player.x - 15).map(s => Math.round(s.x))
    }), st);
    if (!total) total = r.all;
    r.missed.forEach(x => missed.add(x));
    if (st.phase !== 'run') break;
  }
  assert.ok(reached, 'la fusée est atteinte');
  // Décollage : le tampon de Cap Canaveral s'ajoute à ceux des 4 mondes traversés.
  await page.clock.runFor(8000);
  const stamps = await page.evaluate(() => JSON.parse(localStorage.getItem('glace-licorne:tampons') || '[]'));
  assert.ok(stamps.includes(9), 'tampon de Cap Canaveral : ' + stamps);
  assert.equal(stamps.length, 5, '4 mondes + Cap Canaveral : ' + stamps);
  assert.ok(total > 0, 'il y a des étoiles sur la piste');
  assert.equal(missed.size, 0, 'étoiles ratées sur la piste');
  assert.deepEqual(errs, []);
  await ctx.close();
});
