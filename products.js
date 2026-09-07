// Product catalogue. Image paths point at img/inventory/<product>/ which the
// team reorganised by hand. Colours reflect the variants we actually stock.
const IMG = 'img/inventory';

const products = [
    {
        id: 1,
        name: "Desert Eagle Water Gun with Attachments",
        price: 64.99,
        note: "Best Seller",
        category: "water-guns",
        description: "Equipped with a drum magazine for extended playtime, an LED suppressor, and a charging port in the reflex sight.",
        image: `${IMG}/desert_eagle/black.png`,
        images: [
            `${IMG}/desert_eagle/combo.png`,
            `${IMG}/desert_eagle/distance.png`,
            `${IMG}/desert_eagle/manual-shoot.png`,
            `${IMG}/desert_eagle/drum-magazine.png`,
            `${IMG}/desert_eagle/light-charger.png`,
            `${IMG}/desert_eagle/slide-action.png`,
        ],
        longDescription: "&bull; Motion-sensor LED lights in the suppressor<br>&bull; 500ml drum magazine<br>&bull; Rechargeable battery in the reflex sight<br>&bull; Durable, water-resistant construction<br>&bull; Fully customizable with other parts<br>&bull; Tactical feel with a realistic design",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/desert_eagle/black.png` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/desert_eagle/blue.png` },
        ],
        defaultColor: "Black",
    },
    {
        id: 2,
        name: "Double-Barrel Minigun Water Blaster",
        price: 129.99,
        note: "",
        category: "water-guns",
        description: "Two rotating barrels with a high-capacity water tank, motion-sensor LED lights, and a rechargeable battery pack.",
        image: `${IMG}/double_barrel_mini_gun/black.png`,
        images: [
            `${IMG}/double_barrel_mini_gun/cover.jpg`,
            `${IMG}/double_barrel_mini_gun/accessories.jpg`,
            `${IMG}/double_barrel_mini_gun/ammo.jpg`,
            `${IMG}/double_barrel_mini_gun/spin.jpg`,
            `${IMG}/double_barrel_mini_gun/range.jpg`,
        ],
        longDescription: "&bull; Motion-sensor LED lights on both barrels<br>&bull; High-capacity water tank worn on your back<br>&bull; Rechargeable battery pack<br>&bull; Durable, water-resistant construction<br>&bull; Large but light, portable design<br>&bull; Realistic design with rapid fire",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/double_barrel_mini_gun/black.png` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/double_barrel_mini_gun/blue.png` },
        ],
        defaultColor: "Black",
    },
    {
        id: 3,
        name: "Dual Wield Glock Water Guns with Attachments",
        price: 89.95,
        note: "Best Value",
        category: "water-guns",
        description: "Double the trouble in blue and black. Detachable drum mags for quick refills and motion-sensor LED lights.",
        image: `${IMG}/twin_kit/twin_kit.png`,
        images: [
            `${IMG}/twin_kit/twin_kit.png`,
            `${IMG}/twin_kit/black-accessories.png`,
            `${IMG}/twin_kit/blue-accessories.png`,
            `${IMG}/twin_kit/twin_kit_black_light.png`,
            `${IMG}/twin_kit/twin_kit_blue_light.jpg`,
            `${IMG}/twin_kit/battery.png`,
        ],
        longDescription: "&bull; A matched set of two tactical water guns<br>&bull; Motion-sensor LED lights in the compensators<br>&bull; Detachable drum magazines for quick refills<br>&bull; Realistic design for immersive play<br>&bull; Built for 1v1 battles or run-and-gun akimbo",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/twin_kit/twin_kit.png` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/twin_kit/twin_kit_blue.png` },
        ],
        defaultColor: "Black",
    },
    {
        id: 4,
        name: "Dynamic Submarine",
        price: 49.95,
        note: "",
        category: "toys",
        description: "Remote-controlled submarine for any water enthusiast. Set how deep it dives and watch it navigate.",
        image: `${IMG}/dynamic_submarine/blue.png`,
        images: [
            `${IMG}/dynamic_submarine/dynamic_submarine.png`,
            `${IMG}/dynamic_submarine/underwater.jpg`,
            `${IMG}/dynamic_submarine/lights.jpg`,
            `${IMG}/dynamic_submarine/charging.jpg`,
        ],
        longDescription: "&bull; Remote-controlled for easy navigation<br>&bull; Adjustable depth settings for exploration<br>&bull; Durable, water-resistant construction<br>&bull; Great for pools, lakes, and tubs<br>&bull; Fun for all ages",
        colors: [
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/dynamic_submarine/blue.png` },
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/dynamic_submarine/black.png` },
        ],
        defaultColor: "Blue",
    },
    {
        id: 5,
        name: "Futuristic All-In-One Soaker",
        price: 74.99,
        note: "",
        category: "water-guns",
        description: "Manual and automatic modes with a futuristic look. Long battery life and LED lights for accurate water levels.",
        image: `${IMG}/futuristic_all_in_one_soaker/white.png`,
        images: [
            `${IMG}/futuristic_all_in_one_soaker/white-bg.png`,
            `${IMG}/futuristic_all_in_one_soaker/black-bg.png`,
            `${IMG}/futuristic_all_in_one_soaker/reload.png`,
            `${IMG}/futuristic_all_in_one_soaker/double.png`,
        ],
        longDescription: "&bull; Full-auto and manual modes<br>&bull; Detachable sling for easy carrying<br>&bull; Long-lasting battery<br>&bull; LED indicators for water level<br>&bull; Sleek, futuristic design",
        colors: [
            { name: "White", value: "#f8fafc", hex: "#f8fafc", image: `${IMG}/futuristic_all_in_one_soaker/white.png` },
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/futuristic_all_in_one_soaker/black.png` },
        ],
        defaultColor: "White",
    },
    {
        id: 6,
        name: "UMP-45 Water Gun with Attachments",
        price: 67.99,
        note: "",
        category: "water-guns",
        description: "Light, mobile submachine gun with a drum magazine, a motion-sensor LED light in the suppressor, and a rechargeable battery.",
        image: `${IMG}/ump45/black.png`,
        images: [
            `${IMG}/ump45/size.png`,
            `${IMG}/ump45/function.png`,
            `${IMG}/ump45/distance.png`,
            `${IMG}/ump45/play.png`,
            `${IMG}/ump45/fun.png`,
        ],
        longDescription: "&bull; Motion-sensor LED light in the suppressor<br>&bull; 500ml drum magazine<br>&bull; Rechargeable battery<br>&bull; Durable, water-resistant construction<br>&bull; Fully customizable with other parts<br>&bull; Tactical feel with a realistic design",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/ump45/black.png` },
        ],
        defaultColor: "Black",
    },
    {
        id: 7,
        name: "Submersible Manta Ray",
        price: 45.00,
        note: "",
        category: "toys",
        description: "Remote-controlled manta ray that dives and glides through the water, mimicking the real thing along the bottom of the pool.",
        image: `${IMG}/manta_rays/blue.png`,
        images: [
            `${IMG}/manta_rays/manta_rays.png`,
            `${IMG}/manta_rays/tutorial.png`,
            `${IMG}/manta_rays/automatic.png`,
            `${IMG}/manta_rays/remote.png`,
            `${IMG}/manta_rays/motor.png`,
            `${IMG}/manta_rays/flap.png`,
        ],
        longDescription: "&bull; Remote-controlled for easy navigation<br>&bull; Adjustable depth settings<br>&bull; Durable, water-resistant construction<br>&bull; Great for pools, lakes, and tubs<br>&bull; Fun for all ages",
        colors: [
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/manta_rays/blue.png` },
            { name: "Pink", value: "#ec4899", hex: "#ec4899", image: `${IMG}/manta_rays/pink.png` },
            { name: "White", value: "#f8fafc", hex: "#f8fafc", image: `${IMG}/manta_rays/white.png` },
        ],
        defaultColor: "Blue",
    },
    {
        id: 8,
        name: "Fully Electronic Water Gun",
        price: 54.95,
        note: "",
        category: "water-guns",
        description: "No manual pumping. Point, hold the trigger, and soak. The future of water fights.",
        image: `${IMG}/fully_electronic_watergun/white.png`,
        images: [
            `${IMG}/fully_electronic_watergun/display.png`,
            `${IMG}/fully_electronic_watergun/time.jpg`,
            `${IMG}/fully_electronic_watergun/waterproof.jpg`,
        ],
        longDescription: "&bull; Fully electronic firing, no pumping<br>&bull; Rechargeable battery for long sessions<br>&bull; Simple design with an ergonomic grip<br>&bull; LED indicators for battery and water level<br>&bull; Built for epic water battles",
        colors: [
            { name: "White", value: "#f8fafc", hex: "#f8fafc", image: `${IMG}/fully_electronic_watergun/white.png` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/fully_electronic_watergun/blue.png` },
        ],
        defaultColor: "White",
    },
    {
        id: 9,
        name: "Motion Tracking Racing Game",
        price: 60.00,
        note: "",
        category: "misc",
        description: "Motion-tracking racing game. Steer with your hands and race through a world of speed and precision.",
        image: `${IMG}/motion_tracking_racing_game/blue.png`,
        images: [
            `${IMG}/motion_tracking_racing_game/motion.png`,
            `${IMG}/motion_tracking_racing_game/figurine.png`,
            `${IMG}/motion_tracking_racing_game/accessories.png`,
            `${IMG}/motion_tracking_racing_game/size.png`,
        ],
        longDescription: "&bull; Motion-tracking control<br>&bull; Bright graphics and sound effects<br>&bull; Multiple game modes<br>&bull; Great for racing fans of any age",
        colors: [
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/motion_tracking_racing_game/blue.png` },
            { name: "Pink", value: "#ec4899", hex: "#ec4899", image: `${IMG}/motion_tracking_racing_game/pink.png` },
        ],
        defaultColor: "Blue",
    },
    {
        id: 10,
        name: "DIY Balloon Set",
        price: 49.99,
        note: "Currently Unavailable",
        outOfStock: true,
        category: "misc",
        description: "Make your own water balloons fast. Great for craft nights, events, or a full day of backyard chaos.",
        image: `${IMG}/diy_balloon_set/pink.png`,
        images: [
            `${IMG}/diy_balloon_set/kit.png`,
            `${IMG}/diy_balloon_set/machine.png`,
            `${IMG}/diy_balloon_set/content.png`,
            `${IMG}/diy_balloon_set/steps.png`,
            `${IMG}/diy_balloon_set/balloon.png`,
        ],
        longDescription: "&bull; Fill and tie a bundle of balloons in seconds<br>&bull; Includes a range of colours and sizes<br>&bull; Built for parties and events<br>&bull; Easy and safe to use",
        colors: [
            { name: "Pink", value: "#ec4899", hex: "#ec4899", image: `${IMG}/diy_balloon_set/pink.png` },
        ],
        defaultColor: "Pink",
    },
    {
        id: 11,
        name: "All-Terrain Gel Pellet Sentry Turret",
        price: 69.99,
        note: "Currently Unavailable",
        outOfStock: true,
        category: "gel-pellet-shooters",
        description: "Remote-controlled all-terrain turret that fires gel pellets. Built for backyard battles and outdoor missions.",
        image: `${IMG}/all_terrain_gel_pellet_sentry_turret/rc_gel_pellet_sentry_turret.png`,
        images: [
            `${IMG}/all_terrain_gel_pellet_sentry_turret/display.png`,
            `${IMG}/all_terrain_gel_pellet_sentry_turret/remote.png`,
            `${IMG}/all_terrain_gel_pellet_sentry_turret/steps.png`,
            `${IMG}/all_terrain_gel_pellet_sentry_turret/gel-pellets.png`,
            `${IMG}/all_terrain_gel_pellet_sentry_turret/kid.png`,
        ],
        longDescription: "&bull; Remote-controlled operation<br>&bull; All-terrain wheels<br>&bull; Fires soft gel pellets<br>&bull; Durable build for outdoor use<br>&bull; Great for backyard battles and events",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/all_terrain_gel_pellet_sentry_turret/rc_gel_pellet_sentry_turret.png` },
        ],
        defaultColor: "Black",
    },
    {
        id: 12,
        name: "Hovering Submarine",
        price: 49.95,
        note: "",
        category: "toys",
        description: "Underwater explorer for pool parties and aquatic adventures.",
        image: `${IMG}/hovering_submarine/green.png`,
        images: [
            `${IMG}/hovering_submarine/hovering-submarine.png`,
            `${IMG}/hovering_submarine/water.png`,
            `${IMG}/hovering_submarine/wave.png`,
            `${IMG}/hovering_submarine/power.jpg`,
            `${IMG}/hovering_submarine/motor.jpg`,
            `${IMG}/hovering_submarine/box.png`,
        ],
        longDescription: "&bull; Remote-controlled for easy navigation<br>&bull; Adjustable depth settings<br>&bull; Durable, water-resistant construction<br>&bull; Great for pools, lakes, and tubs<br>&bull; Fun for all ages",
        colors: [
            { name: "Green", value: "#16a34a", hex: "#16a34a", image: `${IMG}/hovering_submarine/green.png` },
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/hovering_submarine/black.png` },
        ],
        defaultColor: "Green",
    },
    {
        id: 13,
        name: "IWI Uzi Pro Water Gun",
        price: 79.99,
        note: "Currently Unavailable",
        outOfStock: true,
        category: "water-guns",
        description: "Compact water SMG with a smoke kit for extra effect. Made for summer skirmishes.",
        image: `${IMG}/iwi_uzi_pro/black.jpg`,
        images: [
            `${IMG}/iwi_uzi_pro/tough.jpg`,
            `${IMG}/iwi_uzi_pro/range.png`,
            `${IMG}/iwi_uzi_pro/accessories.png`,
            `${IMG}/iwi_uzi_pro/effect.png`,
            `${IMG}/iwi_uzi_pro/duo.png`,
            `${IMG}/iwi_uzi_pro/iwi_uzi_pro_ice_blast.png`,
        ],
        longDescription: "&bull; LED lights in the suppressor<br>&bull; Water-mist smoke kit for effect<br>&bull; Rechargeable battery<br>&bull; Durable, water-resistant construction<br>&bull; Built for epic water battles",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/iwi_uzi_pro/black.jpg` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/iwi_uzi_pro/blue.png` },
        ],
        defaultColor: "Black",
    },
    {
        id: 14,
        name: "LED Pulse Electric Water Gun",
        price: 49.99,
        note: "",
        category: "water-guns",
        description: "Sleek electric blaster with pulsing LED lights. Made for summer fun and outdoor play.",
        image: `${IMG}/led_pulse/black.png`,
        images: [
            `${IMG}/led_pulse/pulse_electric.png`,
            `${IMG}/led_pulse/accessories.png`,
            `${IMG}/led_pulse/range.png`,
            `${IMG}/led_pulse/load.png`,
            `${IMG}/led_pulse/kid.png`,
            `${IMG}/led_pulse/beach.png`,
        ],
        longDescription: "&bull; Sleek, modern design<br>&bull; Pulsing LED lights<br>&bull; Rechargeable battery<br>&bull; Durable, water-resistant construction<br>&bull; Built for epic water battles",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/led_pulse/black.png` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/led_pulse/blue.png` },
        ],
        defaultColor: "Black",
    },
    {
        id: 15,
        name: "Minigun Soaker with Smoke Kit",
        price: 79.99,
        note: "Currently Unavailable",
        outOfStock: true,
        category: "water-guns",
        description: "Rapid-fire minigun soaker with a mist effect that simulates overheating.",
        image: `${IMG}/gatling/black.png`,
        images: [
            `${IMG}/gatling/mist.png`,
            `${IMG}/gatling/trigger.png`,
            `${IMG}/gatling/smoke.png`,
            `${IMG}/gatling/spin.png`,
            `${IMG}/gatling/size.png`,
        ],
        longDescription: "&bull; Motion-sensor LED lights<br>&bull; Mist effect to simulate overheating<br>&bull; Rechargeable battery pack<br>&bull; Durable, water-resistant construction<br>&bull; Large but light, portable design<br>&bull; Realistic design with rapid fire",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/gatling/black.png` },
        ],
        defaultColor: "Black",
    },
    {
        id: 16,
        name: "Spouting Whale",
        price: 49.95,
        note: "",
        category: "toys",
        description: "Remote-controlled whale that swims and spouts. Great for bath time and pool play.",
        image: `${IMG}/spouting_whale/gold.png`,
        images: [
            `${IMG}/spouting_whale/connection.png`,
            `${IMG}/spouting_whale/control.png`,
            `${IMG}/spouting_whale/info.png`,
            `${IMG}/spouting_whale/remote.png`,
            `${IMG}/spouting_whale/gold-box.png`,
            `${IMG}/spouting_whale/blue-box.png`,
        ],
        longDescription: "<ul><li>Aquatic toy with a whale design</li><li>Realistic swimming and spouting</li><li>Durable, child-safe materials</li><li>Fun in pools and tubs</li></ul>",
        colors: [
            { name: "Gold", value: "#d4a017", hex: "#d4a017", image: `${IMG}/spouting_whale/gold.png` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/spouting_whale/blue.png` },
        ],
        defaultColor: "Gold",
    },
    {
        id: 17,
        name: "Pussaint Soaker",
        price: 49.95,
        note: "",
        category: "water-guns",
        description: "Fast and accurate electric soaker. Built for water fights and beach days.",
        image: `${IMG}/pussaint_soaker/pussaint_soaker_red.jpg`,
        images: [
            `${IMG}/pussaint_soaker/pussaint.png`,
            `${IMG}/pussaint_soaker/pussaint_soaker_feature.png`,
            `${IMG}/pussaint_soaker/pussaint_soaker_range.png`,
            `${IMG}/pussaint_soaker/pussaint_soaker_capacity.png`,
            `${IMG}/pussaint_soaker/pussaint_soaker_blue_size.png`,
            `${IMG}/pussaint_soaker/display2.png`,
        ],
        longDescription: "&bull; Electric firing, no pumping<br>&bull; High-capacity tank<br>&bull; Long range for its size<br>&bull; Rechargeable battery<br>&bull; Built for water fights and beach days",
        colors: [
            { name: "Red", value: "#dc2626", hex: "#dc2626", image: `${IMG}/pussaint_soaker/pussaint_soaker_red.jpg` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/pussaint_soaker/pussaint_soaker_blue.jpg` },
        ],
        defaultColor: "Red",
    },
];

// Merge the built-in catalogue with anything added or edited through the
// developer panel (stored in localStorage).
function getAllProducts() {
    let overrides = {};
    let custom = [];
    try {
        overrides = JSON.parse(localStorage.getItem('watillery_products_overrides')) || {};
        custom = JSON.parse(localStorage.getItem('watillery_products_custom')) || [];
    } catch (e) {
        /* fall back to built-ins */
    }

    const base = products.map((p) => {
        const o = overrides[p.id];
        if (!o) return p;
        const merged = { ...p };
        if (o.price != null) merged.price = o.price;
        if (o.note != null) merged.note = o.note;
        if (o.outOfStock) merged.note = o.note || 'Currently Unavailable';
        merged.outOfStock = o.outOfStock != null ? !!o.outOfStock : !!p.outOfStock;
        return merged;
    });

    return [...base, ...custom];
}

function getFilteredProducts(filter = 'all', searchTerm = '') {
    let filtered = getAllProducts();

    if (filter && filter !== 'all') {
        filtered = filtered.filter((product) => product.category === filter);
    }

    if (searchTerm) {
        const q = searchTerm.toLowerCase();
        filtered = filtered.filter(
            (product) =>
                product.name.toLowerCase().includes(q) ||
                (product.description || '').toLowerCase().includes(q)
        );
    }

    return filtered;
}

function getProductById(id) {
    return getAllProducts().find((product) => String(product.id) === String(id));
}

// Called by the developer panel after it changes the catalogue.
function reloadCatalogue() {
    const grid = document.getElementById('productsGrid');
    if (!grid || typeof renderProducts !== 'function') return;
    const activeFilter =
        document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    const searchTerm = document.getElementById('searchInput')?.value || '';
    renderProducts(getFilteredProducts(activeFilter, searchTerm), 1);
}

window.getAllProducts = getAllProducts;
window.reloadCatalogue = reloadCatalogue;
