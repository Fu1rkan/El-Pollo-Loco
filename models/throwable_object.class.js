class ThrowableObject extends MovableObject {

    IMAGES_THROW_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    isSplashed = false;

    constructor(x, y, world) {
        super();
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 100;
        this.world = world;
        this.loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROW_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.trow();
    };

    bottleGetSplashed(index) {
        return this.y >= 340 ||
            this.isCollidingByItem(world.level.enemies[index], this, 20, 20, 10, 10) ||
            this.isCollidingByItem(world.level.endboss[0], this, 70, 45, 60, 5);
    }

    trow() {
        setTimeout(() => {
            this.speedY = 15;
            let intervalId = this.createInterval(() => this.applyGravityBottle(intervalId), 1000 / 25);
            let intervalId2 = this.createInterval(() => this.animate(intervalId2), 75);
            let intervalId3 = this.createInterval(() => this.animateThrowingBottle(intervalId3), 25);
        }, 10);
    };

    applyGravityBottle(id) {        
        if (this.isAboutGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            clearInterval(id);
        };
    };

    animateThrowingBottle(id) {        
        if (this.y < 340) {
            this.x += 6;
        } else {
            clearInterval(id);
        };
    };

    animateSplashedBottle(id) {        
        this.playLimitedAnimation(this.IMAGES_BOTTLE_SPLASH, id);
    };

    animate(id) {        
        this.playAnimation(this.IMAGES_THROW_BOTTLE);
        for (let index = 0; index < world.level.enemies.length; index++) {
            if (this.bottleGetSplashed(index)) {
                this.isSplashed = true;
                clearInterval(id);
                this.currentImage = 0;
                let intervalId = world.character.createInterval(() => this.animateSplashedBottle(intervalId), 105);
                break;
            };
        };
    };
};