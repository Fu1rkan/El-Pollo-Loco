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
        return world.throwableObject[0].y >= 340 || 
        world.throwableObject[0].isCollidingByItem(world.level.enemies[index], world.throwableObject[0], 20, 20, 10, 10) || 
        world.throwableObject[0].isCollidingByItem(world.level.endboss[0], world.throwableObject[0], 70, 45, 60, 5);
    }

    trow() {
        setTimeout(() => {
            this.speedY = 15;
            this.createInterval(world.throwableObject[0].applyGravityBottle, 1000 / 25);
            this.createInterval(world.throwableObject[0].animate, 75);
            this.createInterval(world.throwableObject[0].animateThrowingBottle, 25);
        }, 10);
    };

    applyGravityBottle(id) {
        if (world.throwableObject[0].isAboutGround() || world.throwableObject[0].speedY > 0) {
            world.throwableObject[0].y -= world.throwableObject[0].speedY;
            world.throwableObject[0].speedY -= world.throwableObject[0].acceleration;
        } else {
            clearInterval(id)
        };
    };

    animateThrowingBottle(id) {
        if (world.throwableObject[0].y < 340) {
            world.throwableObject[0].x += 6;
        } else {
            clearInterval(id);
        };

    };

    animateSplashedBottle(id) {
        if (isRunning) {
            world.throwableObject[0].playLimitedAnimation(world.throwableObject[0].IMAGES_BOTTLE_SPLASH, id);
        };
    };

    animate(id) {
        world.throwableObject[0].playAnimation(world.throwableObject[0].IMAGES_THROW_BOTTLE);
        for (let index = 0; index < world.level.enemies.length; index++) {
            if (world.throwableObject[0].bottleGetSplashed(index)) {
                clearInterval(id);
                world.throwableObject[0].currentImage = 0;
                world.character.createInterval(world.throwableObject[0].animateSplashedBottle, 105);
                break;
            };
        };
    };
};