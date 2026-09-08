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
    {
        id: 18,
        name: "Water Bubble Combo Gun",
        price: 64.95,
        note: "",
        category: "water-guns",
        description: "Shoots water and bubbles. Fully electronic and automatic, with a light-up muzzle, a water tank, and a 26 to 32 foot range.",
        image: `${IMG}/double_bubble/double_bubble_orange.png`,
        images: [
            `${IMG}/double_bubble/double_bubble_ad.jpg`,
            `${IMG}/double_bubble/double_bubble_orange_accessories.jpg`,
            `${IMG}/double_bubble/double_bubble_green_features.png`,
            `${IMG}/double_bubble/double_bubble_green_size.jpg`,
        ],
        longDescription: "&bull; Shoots both water and bubbles<br>&bull; Fully electronic and automatic firing<br>&bull; Light-up muzzle<br>&bull; Built-in water tank<br>&bull; 26 to 32 foot range<br>&bull; Choose from multiple colours",
        colors: [
            { name: "Orange", value: "#f2711c", hex: "#f2711c", image: `${IMG}/double_bubble/double_bubble_orange.png` },
            { name: "Green", value: "#16a34a", hex: "#16a34a", image: `${IMG}/double_bubble/double_bubble_green_size.jpg` },
            { name: "Pink", value: "#ec4899", hex: "#ec4899", image: `${IMG}/double_bubble/double_bubble_pink_accessories.png` },
        ],
        defaultColor: "Orange",
    },
    {
        id: 19,
        name: "The Flood Dragon Folding Gun",
        price: 59.95,
        note: "",
        category: "water-guns",
        description: "Handheld water gun with a folding stock and an adjustable grip. Fire it compact, or extend the stock for a stronger hold. Light-up muzzle and scope included.",
        image: `${IMG}/flood_dragon/flood_dragon.jpg`,
        images: [
            `${IMG}/flood_dragon/flood_dragon_ad.jpg`,
            `${IMG}/flood_dragon/flood_dragon_blue_range.jpg`,
            `${IMG}/flood_dragon/flood_dragon_black_features.jpg`,
            `${IMG}/flood_dragon/flood_dragon_blue_accessories.jpg`,
            `${IMG}/flood_dragon/flood_dragon_blue_battery.jpg`,
        ],
        longDescription: "&bull; Folding stock and adjustable hand grip<br>&bull; Use it compact or extended for a stronger hold<br>&bull; Light-up muzzle and light-up scope<br>&bull; Designed for rapid action<br>&bull; Rechargeable battery",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/flood_dragon/flood_dragon_black.jpg` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/flood_dragon/flood_dragon_blue.jpg` },
            { name: "Green", value: "#16a34a", hex: "#16a34a", image: `${IMG}/flood_dragon/flood_dragon_green_blue.jpg` },
        ],
        defaultColor: "Black",
    },
    {
        id: 20,
        name: "Gel Pellet Shooting Glock",
        price: 79.95,
        note: "",
        category: "gel-pellet-shooters",
        description: "Fires gel pellets (Orbeez style). Comes with small, long and drum magazines, a light-up target, a working flashlight, and 5000 gel pellets. 45 to 60 foot range.",
        image: `${IMG}/glock/glock.jpg`,
        images: [
            `${IMG}/glock/glock_black_accessories.jpg`,
            `${IMG}/glock/glock_black_range.jpg`,
            `${IMG}/glock/glock_blue_feature.jpg`,
            `${IMG}/glock/glock_blue_battery.png`,
        ],
        longDescription: "&bull; Shoots gel pellets, commonly known as Orbeez<br>&bull; Three magazines included: small, long and drum<br>&bull; Light-up target and working flashlight for night play<br>&bull; 45 to 60 foot range<br>&bull; 5000 gel pellets included",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/glock/glock.jpg` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/glock/glock_blue_feature.jpg` },
        ],
        defaultColor: "Black",
    },
    {
        id: 21,
        name: "Uzi with Misting Feature - Backpack & Drop-line Kit",
        price: 99.95,
        note: "",
        category: "water-guns",
        description: "The misting Uzi with the full extension pack: a backpack tank and a drop-line hose so you can keep firing without stopping to refill.",
        image: `${IMG}/iwi_uzi_pro_kit/iwi_uzi_pro_kit_black.jpg`,
        images: [
            `${IMG}/iwi_uzi_pro_kit/iwi_uzi_pro_kit_ad.jpg`,
            `${IMG}/iwi_uzi_pro_kit/iwi_uzi_pro_kit_blue.png`,
        ],
        longDescription: "&bull; Uzi water gun with a water-mist smoke effect<br>&bull; Includes a wearable backpack tank<br>&bull; Drop-line hose feeds the gun so you never stop to refill<br>&bull; Rechargeable battery<br>&bull; Built for long skirmishes",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/iwi_uzi_pro_kit/iwi_uzi_pro_kit_black.jpg` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/iwi_uzi_pro_kit/iwi_uzi_pro_kit_blue.png` },
        ],
        defaultColor: "Black",
    },
    {
        id: 22,
        name: "M416 Automatic Water Gun",
        price: 69.95,
        note: "",
        category: "water-guns",
        description: "Shoots far, hard and fast, up to 36 feet, water-bullet style. Big blasts with few shots. Li-ion rechargeable.",
        image: `${IMG}/m416/m416.jpg`,
        images: [
            `${IMG}/m416/m416_black_ad.jpg`,
            `${IMG}/m416/m416_black_range.jpg`,
            `${IMG}/m416/m416_black_capacity.jpg`,
            `${IMG}/m416/m416_black_im.jpg`,
        ],
        longDescription: "&bull; Water-bullet style firing<br>&bull; Range up to 36 feet<br>&bull; Big blasts, few shots needed<br>&bull; Li-ion rechargeable battery<br>&bull; Shoots far, hard and fast",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/m416/m416_black.jpg` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/m416/m416_blue.jpg` },
        ],
        defaultColor: "Black",
    },
    {
        id: 23,
        name: "Mini Red M416",
        price: 49.95,
        note: "",
        category: "water-guns",
        description: "Our desktop shooter. Small, super fast, and still reaches about 26 feet. Modeled on the Mini Glock for light-weight surprise attacks. Light-up muzzle.",
        image: `${IMG}/m416_mini/m416_mini_red.png`,
        images: [
            `${IMG}/m416_mini/m416_mini_red_accessories.png`,
        ],
        longDescription: "&bull; Compact desktop shooter<br>&bull; Small, fast and light<br>&bull; Still reaches about 26 feet<br>&bull; Light-up muzzle<br>&bull; Built for surprise attacks",
        colors: [
            { name: "Red", value: "#dc2626", hex: "#dc2626", image: `${IMG}/m416_mini/m416_mini_red.png` },
        ],
        defaultColor: "Red",
    },
    {
        id: 24,
        name: "S56 Elite Handgun",
        price: 59.95,
        note: "",
        category: "water-guns",
        description: "One of our fastest, brightest handguns. Ergonomic grip, days of play on a single charge, and a big tank.",
        image: `${IMG}/mecca_classic/mecca_classic_black.jpg`,
        images: [
            `${IMG}/mecca_classic/mecca_classic_ad.jpg`,
            `${IMG}/mecca_classic/Hba1139432fa647c4a40599f40a7b4016s.jpg`,
            `${IMG}/mecca_classic/Hde55869a76984b00a1c3a0187640d1d36.jpg`,
            `${IMG}/mecca_classic/Hf7dd8f8b26ec45f6a07979bbc5296933B.jpg`,
        ],
        longDescription: "&bull; Fast shooting with a bright light-up muzzle<br>&bull; Ergonomic grip, easy to hold and shoot<br>&bull; Days of play-time on a single charge<br>&bull; High-capacity tank",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/mecca_classic/mecca_classic_black.jpg` },
        ],
        defaultColor: "Black",
    },
    {
        id: 25,
        name: "Interstellar Blazing Sword",
        price: 69.95,
        note: "",
        category: "misc",
        description: "Draw it from the sheath and watch the sparks fly. Seven LED modes, a misting effect with a few drops of water, and sound effects on every swing.",
        image: `${IMG}/misting_sword/misting_sword_ad.jpg`,
        images: [
            `${IMG}/misting_sword/misting_sword_spark.jpg`,
            `${IMG}/misting_sword/misting_sword_mist.jpg`,
            `${IMG}/misting_sword/misting_sword_feature.jpg`,
            `${IMG}/misting_sword/misting_sword_ad2.jpg`,
        ],
        longDescription: "&bull; Sparks fly when you draw it from the sheath<br>&bull; 7 LED light-up modes<br>&bull; Add a few drops of water for a misting effect<br>&bull; Sound effects on every interaction<br>&bull; 5 spare flints included<br>&bull; USB-C charging",
        colors: [
            { name: "Standard", value: "#8b5cf6", hex: "#8b5cf6", image: `${IMG}/misting_sword/misting_sword_ad.jpg` },
        ],
        defaultColor: "Standard",
    },
    {
        id: 26,
        name: "MK3 Assault Rifle with Tactical Upgrade Kit",
        price: 99.95,
        note: "Best Value",
        category: "water-guns",
        description: "One of our most famous blasters, now at a reduced price. Auto water suction, 35 to 40 foot range, 630ml drum, plus a tactical upgrade kit: laser, flashlight and light-up sight.",
        image: `${IMG}/mk3/mk3_black.jpg`,
        images: [
            `${IMG}/mk3/mk3_black_feature.jpg`,
            `${IMG}/mk3/Hcf30602a69b64bf7992810e1c17fa0a9l.jpg`,
            `${IMG}/mk3/He9c78c7d3e884019b3b808dfb96376a81.jpg`,
            `${IMG}/mk3/H25380aee92384a9cb8b2055bec8ffe76G.jpg`,
        ],
        longDescription: "&bull; Auto water suction<br>&bull; 35 to 40 foot shooting range<br>&bull; 630ml water drum included<br>&bull; Tactical upgrade kit: laser target, flashlight and light-up sight<br>&bull; Available in blue and black",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/mk3/mk3_black.jpg` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/mk3/Hbb72f1334e1647aea2ee4d3ade87403cm.jpg` },
        ],
        defaultColor: "Black",
    },
    {
        id: 27,
        name: "Handheld Superior Water Gun with Digital Display",
        price: 74.95,
        note: "",
        category: "water-guns",
        description: "Mid-size handheld that shoots fast and far, with a digital battery display and auto water absorption. Dip the barrel and push the trigger forward to fill.",
        image: `${IMG}/superior/superior.jpg`,
        images: [
            `${IMG}/superior/superior_blue_ad.jpg`,
            `${IMG}/superior/superior_blue_features.jpg`,
            `${IMG}/superior/Ha3136af46c5d4f6d928dc6300f22786dx.jpg`,
            `${IMG}/superior/Hc74d88e88bc04a419e1a2ec3b2de53c1s.jpg`,
        ],
        longDescription: "&bull; Fast, far-shooting mid-size handheld<br>&bull; Integrated digital display for remaining battery<br>&bull; Auto water absorption: barrel in water, push trigger forward<br>&bull; Rechargeable battery",
        colors: [
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/superior/superior_blue.jpg` },
            { name: "Red", value: "#dc2626", hex: "#dc2626", image: `${IMG}/superior/superior_red.jpg` },
        ],
        defaultColor: "Blue",
    },
    {
        id: 28,
        name: "Tec9 Electronic Water Gun",
        price: 79.95,
        note: "",
        category: "water-guns",
        description: "Retro looks, modern internals. About 32+ foot range, a multi-function flashlight on the front handle, and a muzzle that lights up with every shot.",
        image: `${IMG}/tec9/tec9_blue.png`,
        images: [
            `${IMG}/tec9/tec9_black_ad.png`,
            `${IMG}/tec9/tec9_blue_light.png`,
            `${IMG}/tec9/tec9_black_light.png`,
            `${IMG}/tec9/tec9_black_capacity.png`,
        ],
        longDescription: "&bull; Retro styling with modern internals<br>&bull; 32+ foot range<br>&bull; Multi-function flashlight on the front handle<br>&bull; Muzzle lights up with every shot<br>&bull; Li-ion battery, about 30 minutes of continuous play<br>&bull; Green light-up target included",
        colors: [
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/tec9/tec9_blue.png` },
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/tec9/tec9_black_ad.png` },
        ],
        defaultColor: "Blue",
    },
    {
        id: 29,
        name: "Water Leopard - Next Gen",
        price: 99.95,
        note: "",
        category: "water-guns",
        description: "The redesigned Water Leopard. On/off button, built-in battery with USB-C charging, and one-tap auto water absorption.",
        image: `${IMG}/water_leopard_2.0/Ha2034e7b5a1b427eb07775f466657e262.png`,
        images: [
            `${IMG}/water_leopard_2.0/water_leopard_2.0_feature.jpg`,
            `${IMG}/water_leopard_2.0/water_leopard_2.0_feature2.jpg`,
            `${IMG}/water_leopard_2.0/water_leopard_2.0_capacity.jpg`,
            `${IMG}/water_leopard_2.0/water_leopard_2.0_size.jpg`,
        ],
        longDescription: "&bull; Redesigned version of our most popular water gun<br>&bull; On / Off power button<br>&bull; Built-in battery, no need to remove it to charge<br>&bull; USB-C charging port<br>&bull; One-tap auto water absorption",
        colors: [
            { name: "Red", value: "#dc2626", hex: "#dc2626", image: `${IMG}/water_leopard_2.0/Ha2034e7b5a1b427eb07775f466657e262.png` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/water_leopard_2.0/Ha2034e7b5a1b427eb07775f466657e262.png` },
            { name: "Green", value: "#16a34a", hex: "#16a34a", image: `${IMG}/water_leopard_2.0/Ha2034e7b5a1b427eb07775f466657e262.png` },
        ],
        defaultColor: "Blue",
    },
    {
        id: 30,
        name: "Water Leopard",
        price: 99.99,
        note: "Best Seller",
        category: "water-guns",
        description: "Our most viral and highest-powered blaster. Over 45 feet of range and 40+ minutes of continuous fire. Switches between red, blue and green, and turns yellow when the battery runs low.",
        image: `${IMG}/water_leopard_classic/water_leopard.png`,
        images: [
            `${IMG}/water_leopard_classic/water_leopard_feature.jpg`,
            `${IMG}/water_leopard_classic/water_leopard_classic_feature.jpg`,
            `${IMG}/water_leopard_classic/water_leopard_classic_range.jpg`,
        ],
        longDescription: "&bull; Our most viral, highest-powered water gun<br>&bull; Shoots over 45 feet<br>&bull; Li-ion battery, 40+ minutes of continuous shooting<br>&bull; Switch between red, blue and green<br>&bull; Turns yellow when the battery is low",
        colors: [
            { name: "Red", value: "#dc2626", hex: "#dc2626", image: `${IMG}/water_leopard_classic/water_leopard.png` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/water_leopard_classic/water_leopard.png` },
            { name: "Green", value: "#16a34a", hex: "#16a34a", image: `${IMG}/water_leopard_classic/water_leopard.png` },
        ],
        defaultColor: "Red",
    },
    {
        id: 31,
        name: "Water Leopard Gatling",
        price: 89.95,
        note: "",
        category: "water-guns",
        description: "Gatling design with a light-up rotating barrel. One-tap auto water absorption, 40+ foot range, and 35+ minutes of continuous shooting.",
        image: `${IMG}/water_leopard_gatling/water_leopard_gatling_black.jpg`,
        images: [
            `${IMG}/water_leopard_gatling/water_leopard_gatling_black_feature.jpg`,
            `${IMG}/water_leopard_gatling/water_leopard_gatling_range.jpg`,
            `${IMG}/water_leopard_gatling/water_leopard_gatling_black_size.jpg`,
        ],
        longDescription: "&bull; Gatling design with a light-up rotating barrel<br>&bull; LED colours: red, blue, green, purple, yellow and light blue<br>&bull; One-tap auto water absorption<br>&bull; Shoots 40+ feet<br>&bull; Li-ion battery, 35+ minutes of continuous shooting",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/water_leopard_gatling/water_leopard_gatling_black.jpg` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/water_leopard_gatling/water_leopard_gatling_blue.jpg` },
        ],
        defaultColor: "Black",
    },
    {
        id: 32,
        name: "Yacht Space Water Gun",
        price: 59.95,
        note: "",
        category: "water-guns",
        description: "Light and made for younger kids. Three firing modes, a light-up body and muzzle, one-button auto fill, and it's fully submersible. 19 to 26 foot range.",
        image: `${IMG}/yacht_space/yacht_space.jpg`,
        images: [
            `${IMG}/yacht_space/yacht_space_black_features.jpg`,
            `${IMG}/yacht_space/yacht_space_blue_features.jpg`,
            `${IMG}/yacht_space/yacht_space_blue_capacity.jpg`,
            `${IMG}/yacht_space/yacht_space_size.jpg`,
            `${IMG}/yacht_space/yacht_space_blue_box.jpg`,
        ],
        longDescription: "&bull; Three firing modes: auto, manual and combined<br>&bull; Light-weight, designed for young children<br>&bull; Body and muzzle both light up<br>&bull; One-button auto water absorption<br>&bull; Fully submersible and waterproof<br>&bull; 19 to 26 foot range",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/yacht_space/yacht_space_black.jpg` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/yacht_space/yacht_space_blue.jpg` },
        ],
        defaultColor: "Black",
    },
    {
        id: 33,
        name: "Alien Pistol Water Gun",
        price: 54.95,
        note: "",
        category: "water-guns",
        description: "Compact sci-fi styled electric pistol with a light-up muzzle. Fast, light, and easy for smaller hands. Comes in black, blue and green.",
        image: `${IMG}/alien_pistol/alien_pistol_black.jpg`,
        images: [
            `${IMG}/alien_pistol/alien_pistol_black_feature.jpg`,
            `${IMG}/alien_pistol/alien_pistol_blue_feature.jpg`,
            `${IMG}/alien_pistol/alien_pistol_green_feature.jpg`,
            `${IMG}/alien_pistol/alien_pistol_range.jpg`,
            `${IMG}/alien_pistol/alien_pistol_battery.jpg`,
        ],
        longDescription: "&bull; Compact sci-fi styling<br>&bull; Electric firing with a light-up muzzle<br>&bull; Fast and light, easy for smaller hands<br>&bull; Rechargeable battery<br>&bull; Available in black, blue and green",
        colors: [
            { name: "Black", value: "#1f2937", hex: "#1f2937", image: `${IMG}/alien_pistol/alien_pistol_black.jpg` },
            { name: "Blue", value: "#2563EB", hex: "#2563EB", image: `${IMG}/alien_pistol/alien_pistol_blue.jpg` },
            { name: "Green", value: "#16a34a", hex: "#16a34a", image: `${IMG}/alien_pistol/alien_pistol_green.jpg` },
        ],
        defaultColor: "Black",
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
