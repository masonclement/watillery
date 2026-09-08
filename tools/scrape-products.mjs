// Pulls name / price / short description for the products not yet in
// products.js from the live watillery.com product pages, so we can add them.
// Run: node tools/scrape-products.mjs

const ORIGIN = 'https://watillery.com';

const FOLDER_TO_SLUG = {
    double_bubble: 'water-bubble-combo-gun',
    flood_dragon: 'the-flood-dragon-folding-gun',
    glock: 'gel-pellet-shooting-glock',
    iwi_uzi_pro_kit: 'uzi-with-misting-feature-and-backpack-drop-line-extension-pack',
    m416: 'm416-automatic-water-gun',
    m416_mini: 'mini-red-m416',
    mecca_classic: 's56-elite-handgun',
    misting_sword: 'interstellar-blazing-sword',
    mk3: 'mk3-assult-rifle',
    superior: 'handheld-superior-water-gun-with-digital-display',
    tec9: 'tec9-electronic-water-gun',
    'water_leopard_2.0': 'water-leopard-next-gen',
    water_leopard_classic: 'water-leopard',
    water_leopard_gatling: 'water-leopard-gatling',
    yacht_space: 'yacht-space-water-gun',
};

const decode = (s) =>
    s
        .replace(/&amp;/g, '&')
        .replace(/&#8217;/g, "'")
        .replace(/&#8211;/g, '-')
        .replace(/&#8230;/g, '...')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

function pick(re, html) {
    const m = html.match(re);
    return m ? decode(m[1]) : '';
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
    const out = {};
    for (const [folder, slug] of Object.entries(FOLDER_TO_SLUG)) {
        try {
            const html = await (await fetch(`${ORIGIN}/product/${slug}/`)).text();
            const name =
                pick(/<meta property="og:title" content="([^"]+)"/, html).replace(/ [-–|] Watillery.*$/i, '') ||
                pick(/<h1[^>]*class="product_title[^"]*"[^>]*>([\s\S]*?)<\/h1>/, html);
            const price =
                pick(/"price":"?([0-9]+(?:\.[0-9]+)?)"?/, html) ||
                pick(/<meta property="product:price:amount" content="([^"]+)"/, html) ||
                pick(/woocommerce-Price-amount[^>]*>[\s\S]*?([0-9]+(?:\.[0-9]{2})?)</, html);
            const short =
                pick(/<div[^>]*class="woocommerce-product-details__short-description"[^>]*>([\s\S]*?)<\/div>/, html) ||
                pick(/<meta property="og:description" content="([^"]+)"/, html) ||
                pick(/<meta name="description" content="([^"]+)"/, html);
            out[folder] = { slug, name, price, short };
            process.stdout.write('.');
        } catch (e) {
            out[folder] = { slug, error: String(e) };
            process.stdout.write('x');
        }
        await sleep(200);
    }
    console.log('\n' + JSON.stringify(out, null, 2));
}

main();
