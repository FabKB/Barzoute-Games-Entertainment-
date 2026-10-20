// Doudou en photo : détourage, visage (yeux, bouche, clignement), trou d'un anneau, lumière.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium, URL, open, fixtureData } = require('./helpers.cjs');

let browser, page, errs, ctx;
before(async () => {
  browser = await chromium.launch();
  ({ ctx, page, errs } = await open(browser, { viewport: { width: 844, height: 390 } }));
  await page.goto(URL); await page.waitForTimeout(500);
});
after(async () => { await browser.close(); });

// Passe une photo dans l'atelier (sans toucher, réglages automatiques).
const run = (name, opts = {}) => page.evaluate(async ([src, o]) => {
  const img = new Image(); img.src = src; await img.decode();
  const r = __t.photoToRows(img, o.tol ?? null, o.seed ?? null, o.light ?? null);
  if (!r.rows) return { rows: null };
  const all = r.rows.join('');
  return { rows: r.rows, blink: r.blink, light: r.light, h: r.rows.length, w: r.rows[0].length,
    filled: all.replace(/[.K]/g, '').length, eyesDark: (all.match(/s/g) || []).length, eyesLight: (all.match(/u/g) || []).length };
}, [fixtureData(name), opts]);

for (const name of ['ours.jpg', 'ours-fond-raye.jpg', 'ours-parquet.jpg']) {
  test(`ourson détouré avec un visage : ${name}`, async () => {
    const r = await run(name);
    assert.ok(r.rows, 'doudou trouvé');
    assert.ok(r.h >= 20, 'personnage assez grand (' + r.h + ' lignes)');
    assert.ok(r.filled > 150, 'pas un simple morceau (' + r.filled + ' pixels)');
    assert.ok(r.eyesDark >= 2, 'deux yeux');
    assert.notDeepEqual(r.blink, r.rows, 'une image yeux fermés pour cligner');
  });
}

test('forme sans yeux : des yeux sont ajoutés', async () => {
  const r = await run('forme-sans-yeux.jpg');
  assert.ok(r.rows);
  assert.ok(r.eyesDark >= 2);
});

test("doudou noir sans yeux : yeux blancs ajoutés pour qu'on les voie", async () => {
  const r = await run('forme-noire.jpg');
  assert.ok(r.rows);
  assert.ok(r.eyesLight >= 2, 'yeux blancs');
});

test('doudou noir aux yeux blancs : ses yeux sont retrouvés', async () => {
  const r = await run('pingouin-noir.jpg');
  assert.ok(r.rows);
  assert.ok(r.eyesDark + r.eyesLight >= 2, 'deux yeux');
});

test("anneau : le trou du milieu reste ouvert", async () => {
  const r = await run('anneau.jpg');
  assert.ok(r.rows);
  // Sur la ligne du milieu : du doudou, puis du vide, puis de nouveau du doudou.
  const mid = r.rows[Math.floor(r.rows.length / 2)].replace(/K/g, '.');
  assert.match(mid, /[^.]+\.+[^.]+/, 'ligne du milieu : ' + mid);
});

test('photo sombre : la lumière automatique éclaircit ; photo claire : inchangée', async () => {
  assert.ok((await run('ours-sombre.jpg')).light > 60);
  assert.ok(Math.abs((await run('ours.jpg')).light - 50) <= 10);
});

test("aucune erreur pendant l'atelier", async () => {
  assert.deepEqual(errs, []);
});
