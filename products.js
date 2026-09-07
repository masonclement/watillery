const products = [
    {
        id: 1,
        name: "Desert Eagle Water Gun with Attachments",
        price: 64.99,
        note: "Best Seller",
        category: "water-guns",
        description: "Equipped with a Drum Magazine for extended playtime, LED supressor, along with a charging port in the reflex sight.",
        image: "inventory/current/desert_eagle_drum_water_gun/black.png", // fallback for grid
        images: [
            "inventory/current/desert_eagle_drum_water_gun/combo.png",
            "inventory/current/desert_eagle_drum_water_gun/distance.png",
            "inventory/current/desert_eagle_drum_water_gun/manual-shoot.png",
            "inventory/current/desert_eagle_drum_water_gun/drum-magazine.png",
            "inventory/current/desert_eagle_drum_water_gun/light-charger.png",
            "inventory/current/desert_eagle_drum_water_gun/slide-action.png",
        ],
        longDescription: "• Motion Censor LED lights in the supressor<br>• 500ml Drum Magazine<br>• Rechargeable battery in the reflex sight<br>• Durable, water-resistant construction<br>• Fully customizable with other parts<br>• Tactical feeling with realistic design",
        colors: [
            {  name: "Black", value: "#333333", hex: "#333333", image: "inventory/current/desert_eagle_drum_water_gun/black.png" },
            {  name: "Blue", value: "#44D4FF", hex: "#44D4FF", image: "inventory/current/desert_eagle_drum_water_gun/blue.png" },
        ],
        defaultColor: "Black",
    },
    {
        id: 2,
        name: "Double-Barrel Minigun Water Blaster",
        price: 129.99,
        note: "",
        category: "water-guns",
        description: "Two rotating barrels with a high-capacity water tank, motion censor LED lights, as well as a chargeable battery pack.",
        image: "inventory/current/double_barrel_mini_gun/black.png",
        images: [
            "inventory/current/double_barrel_mini_gun/cover.jpg",
            "inventory/current/double_barrel_mini_gun/accessories.jpg",
            "inventory/current/double_barrel_mini_gun/ammo.jpg",
            "inventory/current/double_barrel_mini_gun/spin.jpg",
            "inventory/current/double_barrel_mini_gun/range.jpg",
        ],
        longDescription: "• Motion Censor LED lights on both barrels<br>• High-capacity water tank on your back<br>• Rechargeable battery pack for convenience<br>• Durable, water-resistant construction<br>• Large and light portable design<br>• Realistic design with rapid fire",
        colors: [
            {  name: "Black", value: "#333333", hex: "#333333", image: "inventory/current/double_barrel_mini_gun/black.png" },
            {  name: "Blue", value: "#44D4FF", hex: "#44D4FF", image: "inventory/current/double_barrel_mini_gun/blue.png" },
        ],
        defaultColor: "Black",
    },
    {
        id: 3,
        name: "Dual Wield Glock Water Guns with Attachments",
        price: 89.95,
        note: "Best Value",
        category: "water-guns",
        description: "Double the trouble in blue and black! Featuring detachable drum mags for easy refills and motion censor LED lights.",
        image: "inventory/current/dual_wield_glock_drum_water_gun/dual_wield_glock_drum_water_gun.png",
        images: [
            "inventory/current/dual_wield_glock_drum_water_gun/duo.png",
            "inventory/current/dual_wield_glock_drum_water_gun/black-accessories.png",
            "inventory/current/dual_wield_glock_drum_water_gun/blue-accessories.png",
            "inventory/current/dual_wield_glock_drum_water_gun/flash.png",
            "inventory/current/dual_wield_glock_drum_water_gun/battery.png",
        ],
        longDescription: "• Sleek set of two tactical water guns<br>• Motion Censor LED lights in compensators<br>• Detachable drum magazines for quick refills<br>• Realistic design for immersive play<br>• Perfect for 1v1 battles or run and gun akimbo",
        colors: [
            {  name: "Black & Blue Combo", value: "#333333", hex: "#333333", image: "inventory/current/dual_wield_glock_drum_water_gun/dual_wield_glock_drum_water_gun.png" },
        ],
        defaultColor: "Black & Blue",
    },
    {
        id: 4,
        name: "Dynamic Submarine",
        price: 49.95,
        note: "",
        category: "toys",
        description: "Our remote controlled submarine is a must-have for any water enthusiast! Choose how deep you want it to go, and watch it navigate through the water.",
        image: "inventory/current/dynamic_submarine/blue.png",
        images: [
            "inventory/current/dynamic_submarine/underwater.jpg",
            "inventory/current/dynamic_submarine/lights.jpg",
            "inventory/current/dynamic_submarine/charging.jpg",
        ],
        longDescription: "• Remote controlled for easy navigation<br>• Adjustable depth settings for exploration<br>• Durable, water-resistant construction<br>• Perfect for pools, lakes, and tubs<br>• Fun for all ages, from kids to adults",
        colors: [
            {  name: "Blue", value: "#008fb7", hex: "#008fb7", image: "inventory/current/dynamic_submarine/blue.png" },
            {  name: "Black", value: "#333333", hex: "#333333", image: "inventory/current/dynamic_submarine/black.png" },
        ],
        defaultColor: "Blue",
    },
    {
        id: 5,
        name: "Futuristic All-In-One Soaker",
        price: 74.99,
        note: "",
        category: "water-guns",
        description: "Both manual and automatic water gun with a futuristic feel. Incredible battery life and LED lights to indicate accurate water levels.",
        image: "inventory/current/futuristic_all_in_one_soaker/white.png",
        images: [
            "inventory/current/futuristic_all_in_one_soaker/black-bg.png",
            "inventory/current/futuristic_all_in_one_soaker/reload.png",
            "inventory/current/futuristic_all_in_one_soaker/double.png",
        ],
        longDescription: "• Full-Auto and manual modes<br>• Detachable sling for easy handling<br>• Battery lasts for long periods of time<br>• LED indicators for water levels<br>• Sleek and futuristic design",
        colors: [
            {  name: "White", value: "#FFFFFF", hex: "#FFFFFF", image: "inventory/current/futuristic_all_in_one_soaker/white.png" },
            {  name: "Black", value: "#333333", hex: "#333333", image: "inventory/current/futuristic_all_in_one_soaker/black.png" },
        ],
        defaultColor: "White",
    },
    {
        id: 6,
        name: "UMP-45 Water Gun with Attachments",
        price: 67.99,
        note: "",
        category: "water-guns",
        description: "Light and mobile submachine gun with a drum magazine. Motion censor LED light in the supressor, and a rechargeable battery.",
        image: "inventory/current/ump45_drum_water_gun/black.png",
        images: [
            "inventory/current/ump45_drum_water_gun/size.png",
            "inventory/current/ump45_drum_water_gun/function.png",
            "inventory/current/ump45_drum_water_gun/distance.png",
            "inventory/current/ump45_drum_water_gun/play.png",
            "inventory/current/ump45_drum_water_gun/fun.png",
        ],
        longDescription:  "• Motion Censor LED lights in the supressor<br>• 500ml Drum Magazine<br>• Rechargeable battery in the reflex sight<br>• Durable, water-resistant construction<br>• Fully customizable with other parts<br>• Tactical feeling with realistic design",
        colors: [
            {  name: "Black", value: "#333333", hex: "#333333", image: "inventory/current/ump45_drum_water_gun/black.png" },
        ],
        defaultColor: "Black",
    },
    {
        id: 7,
        name: "Submersible Manta Ray",
        price: 45.00,
        note: "",
        category: "toys",
        description: "Remote controlled manta ray that can dive and glide through water with ease. Watch as it mimics those graceful movements on the bottom of the tub.",
        image: "inventory/current/manta_rays/manta_rays.png",
        images: [
            "inventory/current/manta_rays/tutorial.png",
            "inventory/current/manta_rays/automatic.png",
            "inventory/current/manta_rays/remote.png",
            "inventory/current/manta_rays/motor.png",
        ],
        longDescription:  "• Remote controlled for easy navigation<br>• Adjustable depth settings for exploration<br>• Durable, water-resistant construction<br>• Perfect for pools, lakes, and tubs<br>• Fun for all ages, from kids to adults",
        colors: [
            {  name: "Blue", value: "#0000FF", hex: "#0000FF", image: "inventory/current/manta_rays/blue.png" },
            {  name: "Pink", value: "#FF69B4", hex: "#FF69B4", image: "inventory/current/manta_rays/pink.png" },
        ],
        defaultColor: "Blue",
    },
    {
        id: 8,
        name: "Fully Electronic Water Gun",
        price: 54.95,
        note: "",
        category: "water-guns",
        description: "Experience the future of water fights with our Fully Electronic Water Gun. No manual pumping required. Spray and Pray!",
        image: "inventory/current/fully_electronic_watergun/white.png",
        images: [
            "inventory/current/fully_electronic_watergun/display.png",
            "inventory/current/fully_electronic_watergun/time.jpg",
            "inventory/current/fully_electronic_watergun/waterproof.jpg",
        ],
        longDescription:  "• Fully electronic water gun for effortless play<br>• Rechargeable battery for long-lasting fun<br>• Simple design with ergonomic grip<br>• LED indicators for battery and water levels<br>• Perfect for epic water battles",
        colors: [
            { name: "White", value: "#FFFFFF", hex: "#FFFFFF", image: "inventory/current/fully_electronic_watergun/white.png" },
            { name: "Blue", value: "#0000FF", hex: "#2563EB", image: "inventory/current/fully_electronic_watergun/blue.png" },
        ],
        defaultColor: "White",
    },
    {
        id: 9,
        name: "Motion Tracking Racing Game",
        price: 60.00,
        note: "",
        category: "misc",
        description: "Experience the thrill of racing with our Motion Tracking Racing Game. Immerse yourself in a world of speed and precision!",
        image: "inventory/current/motion_tracking_racing_game/blue.png",
        images: [
            "inventory/current/motion_tracking_racing_game/motion.png",
            "inventory/current/motion_tracking_racing_game/figurine.png",
            "inventory/current/motion_tracking_racing_game/accessories.png",
            "inventory/current/motion_tracking_racing_game/size.png",
        ],
        longDescription:  "• Advanced motion tracking technology for precise control<br>• Realistic graphics and sound effects<br>• Multiple game modes for endless fun<br>• Compatible with VR headsets<br>• Perfect for racing enthusiasts",
        colors: [
            { name: "Blue", value: "#0000FF", hex: "#0000FF", image: "inventory/current/motion_tracking_racing_game/blue.png" },
            { name: "Pink", value: "#FF69B4", hex: "#FF69B4", image: "inventory/current/motion_tracking_racing_game/pink.png" },
        ],
        defaultColor: "Blue",
    },
    {
        id: 10,
        name: "DIY Balloon Set",
        price: 49.99,
        note: "Currently Unavailable",
        category: "misc",
        description: "Create your own fun with our DIY Balloon Set! Perfect for craft nights, events, or just a day of creativity.",
        image: "inventory/current/diy_balloon_set/pink.png",
        images: [
            "inventory/current/diy_balloon_set/kit.png",
            "inventory/current/diy_balloon_set/machine.png",
            "inventory/current/diy_balloon_set/content.png",
            "inventory/current/diy_balloon_set/steps.png",
            "inventory/current/diy_balloon_set/balloon.png",
        ],
        longDescription:  "• Create and customize your own balloon designs<br>• Includes a variety of colors and sizes<br>• Perfect for parties, events, or just for fun<br>• Easy to use and safe for all ages<br>• Get creative and let your imagination soar!",
        colors: [
            { name: "Pink", value: "#FF69B4", hex: "#FF69B4", image: "inventory/current/diy_balloon_set/pink.png" },
        ],
        defaultColor: "Pink",
    },
    {
        id: 11,
        name: "All-Terrain Gel Pellet Sentry Turret",
        price: 69.99,
        note: "Currently Unavailable",
        category: "misc",
        description: "Experience the ultimate in outdoor fun with our All-Terrain Gel Pellet Sentry Turret! Perfect for backyard battles and outdoor adventures.",
        image: "inventory/current/all_terrain_gel_pellet_sentry_turret/rc_gel_pellet_sentry_turret.png",
        images: [
            "inventory/current/all_terrain_gel_pellet_sentry_turret/display.png",
            "inventory/current/all_terrain_gel_pellet_sentry_turret/remote.png",
            "inventory/current/all_terrain_gel_pellet_sentry_turret/steps.png",
            "inventory/current/all_terrain_gel_pellet_sentry_turret/gel-pellets.png",
        ],
        longDescription:  "• Remote controlled for easy operation<br>• All-terrain design for versatile use<br>• Uses gel pellets for safe and fun play<br>• Durable construction for outdoor adventures<br>• Perfect for backyard battles or outdoor events",
        colors: [
            { name: "Black", value: "#000000", hex: "#000000", image: "inventory/current/all_terrain_gel_pellet_sentry_turret/rc_gel_pellet_sentry_turret.png" },
        ],
        defaultColor: "Black",
    },
    {
        id: 12,
        name: "Hovering Submarine",
        price: 49.95,
        note: "",
        category: "toys",
        description: "Experience the ultimate in underwater exploration with our Hovering Submarine! Perfect for pool parties and aquatic adventures.",
        image: "inventory/current/hovering_submarine/green.png",
        images: [
            "inventory/current/hovering_submarine/water.png",
            "inventory/current/hovering_submarine/wave.png",
            "inventory/current/hovering_submarine/power.jpg",
            "inventory/current/hovering_submarine/box.png",
            "inventory/current/hovering_submarine/hovering_submarine.png",
        ],
        longDescription:  "• Remote controlled for easy navigation<br>• Adjustable depth settings for exploration<br>• Durable, water-resistant construction<br>• Perfect for pools, lakes, and tubs<br>• Fun for all ages, from kids to adults",
        colors: [
            { name: "Green", value: "#266B06", hex: "#266B06", image: "inventory/current/hovering_submarine/green.png" },
            { name: "Black", value: "#000000", hex: "#000000", image: "inventory/current/hovering_submarine/black.png" },
        ],
        defaultColor: "Green",
    },
    {
        id: 13,
        name: "IWI Uzi Pro Water Gun",
        price: 79.99,
        note: "Currently Unavailable",
        category: "water-guns",
        description: "Experience the ultimate in water battles with our IWI Uzi Pro Water Gun! Equipped with a smoke kit! Perfect for summer fun and outdoor play.",
        image: "inventory/current/iwi_uzi_pro_water_gun/black.jpg",
        images: [
            "inventory/current/iwi_uzi_pro_water_gun/tough.jpg",
            "inventory/current/iwi_uzi_pro_water_gun/range.png",
            "inventory/current/iwi_uzi_pro_water_gun/podium.png",
            "inventory/current/iwi_uzi_pro_water_gun/accessories.png",
            "inventory/current/iwi_uzi_pro_water_gun/effect.png",
        ],
        longDescription:  "• LED Lights in the supressor<br>• Water mist smoke kit for added fun<br>• Rechargeable battery for long-lasting play<br>• Durable, water-resistant construction<br>• Perfect for epic water battles",
        colors: [
            { name: "Black", value: "#000000", hex: "#000000", image: "inventory/current/iwi_uzi_pro_water_gun/black.jpg" },
            { name: "Blue", value: "#0000FF", hex: "#0000FF", image: "inventory/current/iwi_uzi_pro_water_gun/blue.png" },
        ],
        defaultColor: "Black",
    },
    {
        id: 14,
        name: "LED Pulse Electric Water Gun",
        price: 49.99,
        note: "",
        category: "water-guns",
        description: "Experience the ultimate in water battles with our LED Pulse Electric Water Gun! Perfect for summer fun and outdoor play.",
        image: "inventory/current/led_pulse_electric_water_gun/black.png",
        images: [
            "inventory/current/led_pulse_electric_water_gun/accessories.png",
            "inventory/current/led_pulse_electric_water_gun/range.png",
            "inventory/current/led_pulse_electric_water_gun/load.png",
            "inventory/current/led_pulse_electric_water_gun/kid.png",
            "inventory/current/led_pulse_electric_water_gun/box.png",
        ],
        longDescription:  "• Sleek and modern design<br>• LED lights for added fun<br>• Rechargeable battery for long-lasting play<br>• Durable, water-resistant construction<br>• Perfect for epic water battles",
        colors: [
            { name: "Black", value: "#000000", hex: "#000000", image: "inventory/current/led_pulse_electric_water_gun/black.png" },
            { name: "Blue", value: "#0000FF", hex: "#0000FF", image: "inventory/current/led_pulse_electric_water_gun/blue.png" },
        ],
        defaultColor: "Black",
    },
    {
        id: 15,
        name: "Minigun Soaker with Smoke Kit",
        price: 79.99,
        note: "Currently Unavailable",
        category: "water-guns",
        description: "Experience the ultimate in water battles with our Minigun Soaker with Smoke Kit! Perfect for summer fun and outdoor play.",
        image: "inventory/current/minigun_soaker_with_smoke_kit/black.png",
        images: [
            "inventory/current/minigun_soaker_with_smoke_kit/mist.png",
            "inventory/current/minigun_soaker_with_smoke_kit/trigger.png",
            "inventory/current/minigun_soaker_with_smoke_kit/smoke.png",
            "inventory/current/minigun_soaker_with_smoke_kit/size.png",
        ],
        longDescription: "• Motion Censor LED lights<br>• Mist effect to simulate overheating<br>• Rechargeable battery pack for convenience<br>• Durable, water-resistant construction<br>• Large and light portable design<br>• Realistic design with rapid fire",
        colors: [
            { name: "Black", value: "#000000", hex: "#000000", image: "inventory/current/minigun_soaker_with_smoke_kit/black.png" },
        ],
        defaultColor: "Black",
    },
    {
        id: 16,
        name: "Spouting Whale",
        price: 49.95,
        note: "",
        category: "toys",
        description: "Experience joyful splashes in water fun with our Spouting Whale! Perfect for bath time and pool play..",
        image: "inventory/current/spouting_whale/gold.png",
        images: [
            "inventory/current/spouting_whale/connection.png",
            "inventory/current/spouting_whale/control.png",
            "inventory/current/spouting_whale/info.png",
            "inventory/current/spouting_whale/remote.png",
            "inventory/current/spouting_whale/gold-box.png",
            "inventory/current/spouting_whale/blue-box.png",
        ],
        longDescription: "<ul><li>Aquatic toy with whale design</li><li>Realistic movement action</li><li>Durable, child-safe materials</li><li>Fun in pools and tubs</li></ul>",
        colors: [
            { name: "Gold", value: "#FFD700", hex: "#FFD700", image: "inventory/current/spouting_whale/gold.png" },
            { name: "Blue", value: "#0000FF", hex: "#0000FF", image: "inventory/current/spouting_whale/blue.png" },
        ],
        defaultColor: "Gold",
    },
    {
        id: 17,
        name: "Pussaint Soaker",
        price: 49.95,
        note: "",
        category: "toys",
        description: "Battle your friends with the Pussaint Soaker! Insanely fast and accurate, this gun is perfect for water fights and beach days.",
        image: "inventory/current/pussaint_soaker/red.png",
        images: [
            "inventory/current/pussaint_soaker/connection.png",
            "inventory/current/pussaint_soaker/control.png",
            "inventory/current/pussaint_soaker/info.png",
            "inventory/current/spouting_whale/remote.png",
            "inventory/current/spouting_whale/gold-box.png",
            "inventory/current/spouting_whale/blue-box.png",
        ],
        longDescription: "<ul><li>Aquatic toy with whale design</li><li>Realistic movement action</li><li>Durable, child-safe materials</li><li>Fun in pools and tubs</li></ul>",
        colors: [
            { name: "Gold", value: "#FFD700", hex: "#FFD700", image: "inventory/current/spouting_whale/gold.png" },
            { name: "Blue", value: "#0000FF", hex: "#0000FF", image: "inventory/current/spouting_whale/blue.png" },
        ],
        defaultColor: "Gold",
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
        merged.outOfStock = !!o.outOfStock;
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