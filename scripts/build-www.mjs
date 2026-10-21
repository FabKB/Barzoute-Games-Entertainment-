// Prépare le dossier www/ que Capacitor met dans l'app : le jeu (index.html), la police,
// les icônes, le manifeste et la bibliothèque d'achats. Rien n'est transformé : c'est le même jeu que la version web.
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const out = 'www';
rmSync(out, { recursive: true, force: true });
mkdirSync(out);
for (const f of ['index.html', 'manifest.webmanifest', 'fonts', 'icons']) cpSync(f, `${out}/${f}`, { recursive: true });
// Achats intégrés (app seulement) : la bibliothèque du plugin, chargée par le jeu quand il tourne dans l'app.
mkdirSync(`${out}/iap`);
for (const f of ['capacitor-plugin.js', 'store.js']) cpSync(`node_modules/capacitor-plugin-cdv-purchase/www/${f}`, `${out}/iap/${f}`);
console.log('www/ prêt');
