import { readFileSync, existsSync } from 'node:fs';

const src = readFileSync('products.js', 'utf8');
const refs = [...src.matchAll(/\$\{IMG\}\/([^`]+)`/g)].map((m) => 'img/inventory/' + m[1]);
const missing = refs.filter((p) => !existsSync(p));
console.log(`total refs: ${refs.length}, missing: ${missing.length}`);
missing.forEach((m) => console.log('  MISSING ' + m));
