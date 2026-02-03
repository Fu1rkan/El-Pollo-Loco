class Level {
    enemies;
    endboss;
    clouds;
    background;
    coins;
    salsas;
    winScreen;
    loseScreen;
    levelEndX = 3880;

    constructor(enemies, endboss, clouds, background, coins, salsas, winScreen, loseScreen){
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.coins = coins;
        this.salsas = salsas;
        this.endboss = endboss;
        this.winScreen = winScreen;
        this.loseScreen = loseScreen;
    };
};