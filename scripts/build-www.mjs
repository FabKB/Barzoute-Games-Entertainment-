// Prépare le dossier www/ que Capacitor met dans l'app : le jeu (index.html), la police,
// les icônes et le manifeste. Rien n'est transformé : c'est le même jeu que la version web.
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const out = 'www';
rmSync(out, { recursive: true, force: true });
mkdirSync(out);
for (const f of ['index.html', 'manifest.webmanifest', 'fonts', 'icons']) cpSync(f, `${out}/${f}`, { recursive: true });
console.log('www/ prêt');
