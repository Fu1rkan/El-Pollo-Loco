/**
 * Holds the current first level instance
 * @type {Level}
 */
let level1;

/**
 * Cloud image path and x position data
 * @type {Array<[string, number]>}
 */
const CLOUD_DATA = [
    ['img/5_background/layers/4_clouds/2.png', -720],
    ['img/5_background/layers/4_clouds/1.png', 0],
    ['img/5_background/layers/4_clouds/2.png', 720],
    ['img/5_background/layers/4_clouds/1.png', 1440],
    ['img/5_background/layers/4_clouds/2.png', 2160],
    ['img/5_background/layers/4_clouds/1.png', 2880],
    ['img/5_background/layers/4_clouds/2.png', 2160],
    ['img/5_background/layers/4_clouds/1.png', 3600],
    ['img/5_background/layers/4_clouds/2.png', 4320],
    ['img/5_background/layers/4_clouds/1.png', 5040],
    ['img/5_background/layers/4_clouds/2.png', 5760],
    ['img/5_background/layers/4_clouds/1.png', 6480],
    ['img/5_background/layers/4_clouds/2.png', 7200],
];

/**
 * Background image path and x position data
 * @type {Array<[string, number]>}
 */
const BACKGROUND_DATA = [
    ['img/5_background/layers/air.png', -720],
    ['img/5_background/layers/3_third_layer/2.png', -720],
    ['img/5_background/layers/2_second_layer/2.png', -720],
    ['img/5_background/layers/1_first_layer/2.png', -720],
    ['img/5_background/layers/air.png', 0],
    ['img/5_background/layers/3_third_layer/1.png', 0],
    ['img/5_background/layers/2_second_layer/1.png', 0],
    ['img/5_background/layers/1_first_layer/1.png', 0],
    ['img/5_background/layers/air.png', 720],
    ['img/5_background/layers/3_third_layer/2.png', 720],
    ['img/5_background/layers/2_second_layer/2.png', 720],
    ['img/5_background/layers/1_first_layer/2.png', 720],
    ['img/5_background/layers/air.png', 1440],
    ['img/5_background/layers/3_third_layer/1.png', 1440],
    ['img/5_background/layers/2_second_layer/1.png', 1440],
    ['img/5_background/layers/1_first_layer/1.png', 1440],
    ['img/5_background/layers/air.png', 2160],
    ['img/5_background/layers/3_third_layer/2.png', 2160],
    ['img/5_background/layers/2_second_layer/2.png', 2160],
    ['img/5_background/layers/1_first_layer/2.png', 2160],
    ['img/5_background/layers/air.png', 2880],
    ['img/5_background/layers/3_third_layer/1.png', 2880],
    ['img/5_background/layers/2_second_layer/1.png', 2880],
    ['img/5_background/layers/1_first_layer/1.png', 2880],
    ['img/5_background/layers/air.png', 3600],
    ['img/5_background/layers/3_third_layer/2.png', 3600],
    ['img/5_background/layers/2_second_layer/2.png', 3600],
    ['img/5_background/layers/1_first_layer/2.png', 3600],
    ['img/5_background/layers/air.png', 4320],
    ['img/5_background/layers/3_third_layer/1.png', 4320],
    ['img/5_background/layers/2_second_layer/1.png', 4320],
    ['img/5_background/layers/1_first_layer/1.png', 4320],
];

/**
 * Coin x and y position data
 * @type {Array<[number, number]>}
 */
const COIN_DATA = [
    [400, 280], [500, 280], [600, 280], [900, 80],
    [1000, 80], [1100, 80], [1600, 280], [1700, 180],
    [1800, 80], [1900, 180], [2000, 280], [2600, 280],
    [2700, 180], [2800, 280], [3200, 280], [3200, 180],
    [3200, 80], [3400, 180], [3500, 180], [3600, 280],
];

/**
 * Salsa image path and x position data
 * @type {Array<[string, number]>}
 */
const SALSA_DATA = [
    ['img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350],
    ['img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1000],
    ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1800],
    ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 2200],
    ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 2700],
    ['img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 3000],
    ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 3500],
];

/**
 * Creates the first level with enemies, collectibles, background and endscreen objects
 */
function startLevel() {
    level1 = new Level(
        createEnemies(),
        createBabyChickens(),
        createEndboss(),
        createClouds(),
        createBackground(),
        createCoins(),
        createSalsas(),
        createWinScreen(),
        createLoseScreen()
    );
};

/**
 * Creates normal chicken enemies
 * @returns {Chicken[]} - Normal chicken enemies
 */
function createEnemies() {
    return Array.from({ length: 6 }, () => new Chicken());
};

/**
 * Creates small chicken enemies
 * @returns {BabyChicken[]} - Small chicken enemies
 */
function createBabyChickens() {
    return Array.from({ length: 6 }, () => new BabyChicken());
};

/**
 * Creates endboss enemies
 * @returns {Endboss[]} - Endboss enemies
 */
function createEndboss() {
    return [new Endboss()];
};

/**
 * Creates cloud objects
 * @returns {Clouds[]} - Cloud objects
 */
function createClouds() {
    return CLOUD_DATA.map(([url, x]) => new Clouds(url, 720, 480, x, 0));
};

/**
 * Creates background objects
 * @returns {Background[]} - Background objects
 */
function createBackground() {
    return BACKGROUND_DATA.map(([url, x]) => new Background(url, 720, 480, x, 0));
};

/**
 * Creates coin objects
 * @returns {Coin[]} - Coin objects
 */
function createCoins() {
    return COIN_DATA.map(([x, y]) => new Coin('img/8_coin/coin_1.png', 150, 150, x, y));
};

/**
 * Creates salsa bottle objects
 * @returns {Salsa[]} - Salsa bottle objects
 */
function createSalsas() {
    return SALSA_DATA.map(([url, x]) => new Salsa(url, 100, 100, x, 330));
};

/**
 * Creates the win screen
 * @returns {Win[]} - Win screen objects
 */
function createWinScreen() {
    return [new Win('img/You_won_you_lost/You_Win_A.png', 400, 200, 160, 140)];
};

/**
 * Creates the lose screen
 * @returns {Lose[]} - Lose screen objects
 */
function createLoseScreen() {
    return [new Lose('img/You_won_you_lost/You_lost.png', 400, 200, 160, 140)];
};
