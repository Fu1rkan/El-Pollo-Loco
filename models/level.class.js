class Level {
    enemies;
    endboss;
    clouds;
    background;
    winScreen;
    loseScreen;
    levelEndX = 2880;

    constructor(enemies, endboss, clouds, background, winScreen, loseScreen){
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.endboss = endboss;
        this.winScreen = winScreen;
        this.loseScreen = loseScreen;
    };
};