/**
 * Represents all objects and settings of a level
 */
class Level {
    /**
     * Normal chicken enemies
     * @type {Chicken[]}
     */
    enemies;

    /**
     * Small chicken enemies
     * @type {BabyChicken[]}
     */
    babyChicken;

    /**
     * Endboss enemies
     * @type {Endboss[]}
     */
    endboss;

    /**
     * Cloud objects
     * @type {Clouds[]}
     */
    clouds;

    /**
     * Background objects
     * @type {Background[]}
     */
    background;

    /**
     * Coin objects
     * @type {Coin[]}
     */
    coins;

    /**
     * Salsa bottle objects
     * @type {Salsa[]}
     */
    salsas;

    /**
     * Win screen objects
     * @type {Win[]}
     */
    winScreen;

    /**
     * Lose screen objects
     * @type {Lose[]}
     */
    loseScreen;

    /**
     * Horizontal level end position
     * @type {number}
     */
    levelEndX = 4200;

    /**
     * Creates a level with all needed objects
     * @param {Chicken[]} enemies - Normal chicken enemies
     * @param {BabyChicken[]} babyChicken - Small chicken enemies
     * @param {Endboss[]} endboss - Endboss enemies
     * @param {Clouds[]} clouds - Cloud objects
     * @param {Background[]} background - Background objects
     * @param {Coin[]} coins - Coin objects
     * @param {Salsa[]} salsas - Salsa bottle objects
     * @param {Win[]} winScreen - Win screen objects
     * @param {Lose[]} loseScreen - Lose screen objects
     */
    constructor(enemies, babyChicken, endboss, clouds, background, coins, salsas, winScreen, loseScreen){
        this.enemies = enemies;
        this.babyChicken = babyChicken;
        this.clouds = clouds;
        this.background = background;
        this.coins = coins;
        this.salsas = salsas;
        this.endboss = endboss;
        this.winScreen = winScreen;
        this.loseScreen = loseScreen;
    };
};
