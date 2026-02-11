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

    isSplashed = false;

    trow() {
        this.speedY = 15;
        this.applyGravityBottle();
        this.animate();
        this.animateThrowingBottle();
    };

    applyGravityBottle() {
        let intervalId = setInterval(() => {
            if (isRunning) {

                if (this.isAboutGround() && !this.isSplashed || this.speedY > 0 && !this.isSplashed) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                };
            }
        }, 1000 / 25);
        DrawableObject.intervalArr.push(intervalId);
    };

    animateThrowingBottle() {
        let intervalId = setInterval(() => {
            if (isRunning) {

                if (this.y < 340 && !this.isSplashed) {
                    this.x += 10;
                } else {
                    clearInterval(intervalId);
                };
            }
        }, 25);
        DrawableObject.intervalArr.push(intervalId);

    };

    animateSplashedBottle() {
        this.currentImage = 0;
        let intervalId = setInterval(() => {
            if (isRunning) {
                this.playLimitedAnimation(this.IMAGES_BOTTLE_SPLASH, intervalId);
            }
        }, 25);
        DrawableObject.intervalArr.push(intervalId);
    };

    animate() {
        let intervalId = setInterval(() => {
            if (isRunning) {
                this.playAnimation(this.IMAGES_THROW_BOTTLE);
                world.level.enemies.forEach((e) => {
                    if (this.y >= 340 || this.isCollidingByItem(e, this) || this.isColliding(this.world.level.endboss[0], this)) {
                        this.isSplashed = true;
                        clearInterval(intervalId);
                        this.animateSplashedBottle();
                    };
                });
            };
        }, 75);
        DrawableObject.intervalArr.push(intervalId);
    };
};