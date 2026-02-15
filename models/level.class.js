class Level {
    enemies;
    babyChicken;
    endboss;
    clouds;
    background;
    coins;
    salsas;
    winScreen;
    loseScreen;
    levelEndX = 4200;

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