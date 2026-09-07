// Sorts the leftover files in newimg/ into img/inventory/<folder>/ by matching
// each image against the watillery.com product page it appears on.
// Files that can't be matched with confidence go to img/inventory/_unsorted/.
// Run: node tools/sort-newimg.mjs        (add --apply to actually move files)

import { readdir, readFile, writeFile, mkdir, rename, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const APPLY = process.argv.includes('--apply');
const ROOT = path.resolve('.');
const SRC = path.join(ROOT, 'newimg');
const DEST = path.join(ROOT, 'img', 'inventory');
const ORIGIN = 'https://watillery.com';

// watillery product slug -> local folder under img/inventory/
const SLUG_TO_FOLDER = {
    'interstellar-blazing-sword': 'misting_sword',
    'gel-pellet-shooting-glock': 'glock',
    'motion-running-toy': 'motion_tracking_racing_game',
    'hovering-submarine': 'hovering_submarine',
    'manta-rays': 'manta_rays',
    'dynamic-submarine': 'dynamic_submarine',
    'diy-balloon-set': 'diy_balloon_set',
    'all-terrain-gel-pellet-shooting-tank': 'all_terrain_gel_pellet_sentry_turret',
    'water-spouting-whale': 'spouting_whale',
    'yacht-space-water-gun': 'yacht_space',
    'water-bubble-combo-gun': 'double_bubble',
    's56-elite-handgun': 'mecca_classic',
    'mini-red-m416': 'm416_mini',
    'm416-automatic-water-gun': 'm416',
    'water-leopard-next-gen': 'water_leopard_2.0',
    'futuristic-long-gun': 'futuristic_all_in_one_soaker',
    'the-flood-dragon-folding-gun': 'flood_dragon',
    'tec9-electronic-water-gun': 'tec9',
    'handheld-superior-water-gun-with-digital-display': 'superior',
    'water-leopard': 'water_leopard_classic',
    'uzi-with-misting-feature-and-backpack-drop-line-extension-pack': 'iwi_uzi_pro_kit',
    'water-leopard-gatling': 'water_leopard_gatling',
    'uzi-with-misting-feature': 'iwi_uzi_pro',
    'ump45-automatic-water-gun': 'ump45',
    'twin-hand-water-gun-set': 'twin_kit',
    't13-viral-water-guns': 'pussaint_soaker',
    'single-barrel-gatling-with-misting-kit': 'gatling',
    'shark-mkx-pulse-electric-water-gun-with-lights': 'led_pulse',
    'ready-to-launch-water-gun': 'fully_electronic_watergun',
    'mk3-assult-rifle': 'mk3',
    'mini-glock-gun': 'glock',
    'double-barrel-gatling-gun': 'gatling',
    'desert-eagle-water-handgun': 'desert_eagle',
    '6-wheeled-mars-discover-rover-gel-pellet-shooting-version': 'motion_tracking_racing_game',
    'p90-elite-high-powered-water-gun-with-built-in-dropline': 'superior',
    'water-leopard-classic': 'water_leopard_classic',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Normalise an image filename to a comparison key:
// strip extension, strip WordPress -WxH and -N suffixes and Alibaba _720x720q50.
function keyOf(name) {
    let k = name.toLowerCase();
    k = k.replace(/\.(png|jpe?g|avif|webp|gif)(\?.*)?$/i, '');
    k = k.replace(/\.jpg_\d+x\d+q\d+$/i, '');
    k = k.replace(/_\d+x\d+q\d+$/i, '');
    k = k.replace(/-\d+x\d+$/i, '');
    k = k.replace(/-\d+$/i, '');
    return k;
}

async function getProductSlugs() {
    const xml = await (await fetch(`${ORIGIN}/product-sitemap.xml`)).text();
    return [...xml.matchAll(/<loc>https:\/\/watillery\.com\/product\/([^/]+)\/<\/loc>/g)].map((m) => m[1]);
}

async function buildKeyIndex(slugs) {
    const index = new Map(); // key -> Set(slug)
    for (const slug of slugs) {
        try {
            const html = await (await fetch(`${ORIGIN}/product/${slug}/`)).text();
            const urls = new Set(
                [...html.matchAll(/\/wp-content\/uploads\/[^"'\s)]+\.(?:png|jpe?g|avif|webp|gif)/gi)].map((m) => m[0])
            );
            for (const u of urls) {
                const k = keyOf(path.basename(u));
                if (!index.has(k)) index.set(k, new Set());
                index.get(k).add(slug);
            }
            process.stdout.write('.');
        } catch (e) {
            process.stdout.write('x');
        }
        await sleep(200);
    }
    console.log('');
    return index;
}

async function uniqueName(dir, name) {
    let out = name;
    let i = 1;
    while (existsSync(path.join(dir, out))) {
        const ext = path.extname(name);
        out = `${path.basename(name, ext)}__${i++}${ext}`;
    }
    return out;
}

async function main() {
    const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|avif|webp|gif)$/i.test(f));
    console.log(`Sorting ${files.length} files. Fetching product pages...`);
    const slugs = await getProductSlugs();
    const index = await buildKeyIndex(slugs);

    const report = [];
    const plan = [];
    for (const file of files) {
        const k = keyOf(file);
        const slugSet = index.get(k);
        if (slugSet && slugSet.size === 1) {
            const slug = [...slugSet][0];
            const folder = SLUG_TO_FOLDER[slug];
            if (folder) {
                plan.push({ file, to: path.join(DEST, folder), folder, slug });
                report.push([file, folder, slug, 'matched']);
                continue;
            }
            report.push([file, '_unsorted', slug, 'no folder mapping']);
        } else if (slugSet && slugSet.size > 1) {
            report.push([file, '_unsorted', [...slugSet].join('|'), 'ambiguous']);
        } else {
            report.push([file, '_unsorted', '', 'no match']);
        }
        plan.push({ file, to: path.join(DEST, '_unsorted'), folder: '_unsorted', slug: '' });
    }

    // Write the report next to the source.
    const csv = [['file', 'folder', 'slug', 'status'], ...report]
        .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
        .join('\n');
    await writeFile(path.join(SRC, '_sort-report.csv'), csv);

    const matched = report.filter((r) => r[3] === 'matched').length;
    console.log(`\nMatched ${matched}/${files.length}. Report: newimg/_sort-report.csv`);

    if (!APPLY) {
        console.log('Dry run. Re-run with --apply to move the files.');
        return;
    }

    for (const item of plan) {
        await mkdir(item.to, { recursive: true });
        const name = await uniqueName(item.to, item.file);
        await rename(path.join(SRC, item.file), path.join(item.to, name));
    }
    console.log(`Moved ${plan.length} files into img/inventory/. ${matched} into product folders, the rest into _unsorted/.`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
