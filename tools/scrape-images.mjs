// Scrapes content images (WordPress media library) from watillery.com into newimg/.
// Content only: restricted to /wp-content/uploads/ so theme and plugin chrome is skipped.
// Usage: node tools/scrape-images.mjs

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('newimg');
const ORIGIN = 'https://watillery.com';
const DELAY_MS = 250;

const PAGES = [
  '/', '/about/', '/products/', '/contact/', '/blog/',
  '/privacy-policy/', '/shipping-policy/', '/refund-returns/', '/shop/',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (watillery-migration image collector)' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function collectProductUrls() {
  const xml = await getText(`${ORIGIN}/product-sitemap.xml`);
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, ''));
}

function extractImages(html, pageUrl) {
  const found = new Set();
  const patterns = [
    /(?:src|data-src|data-large_image|href)=["']([^"']+?\/wp-content\/uploads\/[^"']+?\.(?:png|jpe?g|avif|webp|gif|svg))["']/gi,
    /srcset=["']([^"']+)["']/gi,
  ];
  for (const re of patterns) {
    for (const m of html.matchAll(re)) {
      const raw = m[1];
      if (re.source.startsWith('srcset')) {
        for (const part of raw.split(',')) {
          const u = part.trim().split(/\s+/)[0];
          if (/\/wp-content\/uploads\/.+\.(png|jpe?g|avif|webp|gif|svg)$/i.test(u)) found.add(abs(u));
        }
      } else {
        found.add(abs(raw));
      }
    }
  }
  return [...found].map((u) => ({ url: u, page: pageUrl }));
}

const abs = (u) => (u.startsWith('http') ? u : `${ORIGIN}${u.startsWith('/') ? '' : '/'}${u}`);

// Strip WordPress resize suffix: foo-300x300.jpg -> foo.jpg
function originalOf(u) {
  return u.replace(/-\d+x\d+(\.(png|jpe?g|avif|webp|gif|svg))$/i, '$1');
}

async function download(url, dir, taken) {
  let base = decodeURIComponent(path.basename(new URL(url).pathname));
  base = base.replace(/[^a-zA-Z0-9._-]/g, '_');
  let name = base;
  let i = 1;
  while (taken.has(name.toLowerCase())) {
    const ext = path.extname(base);
    name = `${path.basename(base, ext)}__${i++}${ext}`;
  }
  taken.add(name.toLowerCase());
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (watillery-migration image collector)' } });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(dir, name), buf);
  return { name, bytes: buf.length };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const productUrls = await collectProductUrls();
  const allPages = [...PAGES, ...productUrls];
  console.log(`Scanning ${allPages.length} pages...`);

  const imgMap = new Map(); // url -> Set(pages)
  for (const p of allPages) {
    const pageUrl = abs(p);
    try {
      const html = await getText(pageUrl);
      for (const { url } of extractImages(html, pageUrl)) {
        const key = originalOf(url);
        if (!imgMap.has(key)) imgMap.set(key, new Set());
        imgMap.get(key).add(pageUrl);
      }
      process.stdout.write('.');
    } catch (e) {
      process.stdout.write('x');
    }
    await sleep(DELAY_MS);
  }
  console.log(`\nFound ${imgMap.size} unique images. Downloading...`);

  const taken = new Set();
  const manifest = [['file', 'source_url', 'found_on']];
  let ok = 0;
  for (const [url, pages] of imgMap) {
    let result = await download(url, OUT_DIR, taken);
    let usedUrl = url;
    if (!result) {
      // fall back to a sized version seen in the wild
      const sized = url.replace(/(\.(png|jpe?g|avif|webp|gif|svg))$/i, '-1024x1024$1');
      result = await download(sized, OUT_DIR, taken);
      usedUrl = sized;
    }
    if (result) {
      ok++;
      manifest.push([result.name, usedUrl, [...pages].join(' | ')]);
      process.stdout.write('.');
    } else {
      process.stdout.write('x');
    }
    await sleep(DELAY_MS);
  }
  const csv = manifest.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  await writeFile(path.join(OUT_DIR, '_manifest.csv'), csv);
  console.log(`\nDone. ${ok}/${imgMap.size} downloaded into newimg/. Manifest: newimg/_manifest.csv`);
}

main().catch((e) => { console.error(e); process.exit(1); });
