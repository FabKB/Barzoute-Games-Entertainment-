// Outils communs aux tests : une copie du jeu avec quelques « poignées » de test, et un navigateur.
const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');

const ROOT = path.join(__dirname, '..');
const FIX = path.join(__dirname, 'fixtures');
// La copie reste à la racine pour que les chemins relatifs (police, icônes) marchent.
const COPY = path.join(ROOT, '.test-index.html');
const HOOK_AT = "  window.addEventListener('pointerdown', e => {";
const HOOKS = "  window.__t = { openGallery, newDoudou, openCreator, photoToRows, makeSprite, OUT, earnStamp, openCarnet, stampArt };\n" +
  "  window.__g = { get launch() { return launch; }, get gems() { return gems; }, get player() { return player; }, get camX() { return camX; }, get PX() { return PX; }, setWorld(w) { genWorld = w; switchWorld(w); }, startEvent(w) { startEvent(w); }, set distStart(v) { distStart = v; }, set route(r) { route = r; }, get dist() { return Math.floor((player.x - distStart) / 16); } };\n";

function makeCopy() {
  const src = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const n = src.split(HOOK_AT).length - 1;
  if (n !== 1) throw new Error(`Point d'accroche des tests trouvé ${n} fois dans index.html (attendu : 1)`);
  fs.writeFileSync(COPY, src.replace(HOOK_AT, HOOKS + HOOK_AT));
  return 'file://' + COPY;
}

const URL = makeCopy();

// Ouvre une page du jeu ; errs reçoit les erreurs JavaScript de la page.
async function open(browser, ctxOpts = {}, init) {
  // Téléphone en français par défaut ; un test passe ctxOpts.locale = 'en-US' pour l'anglais.
  const ctx = await browser.newContext({ locale: 'fr-FR', ...ctxOpts });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  if (init) await page.addInitScript(init);
  return { ctx, page, errs };
}

// Toucher le milieu d'un élément, comme un doigt.
async function tap(page, sel) {
  const bx = await page.locator(sel).first().boundingBox();
  await page.touchscreen.tap(bx.x + bx.width / 2, bx.y + bx.height / 2);
  await page.waitForTimeout(250);
}

const visible = (page, sel) => page.evaluate(s => !document.querySelector(s).hidden, sel);
const fixture = name => path.join(FIX, name);
const fixtureData = name => 'data:image/jpeg;base64,' + fs.readFileSync(fixture(name)).toString('base64');

module.exports = { chromium, devices, URL, open, tap, visible, fixture, fixtureData };
