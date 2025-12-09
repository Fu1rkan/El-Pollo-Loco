class Level {
    enemies;
    endboss;
    clouds;
    background;
    levelEndX = 2880;

    constructor(enemies, endboss, clouds, background){
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.endboss = endboss;
    };
};