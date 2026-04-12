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

    AUDIOS = []

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
        this.getAudios();
        this.trow();
    };

    getAudios() {
        this.salsaThrowed = new Audio('audio/bottle_throw.mp3');
        this.salsaSplashed = new Audio('audio/bottle_splash_2.mp3');

        this.AUDIOS = [
            this.salsaThrowed,
            this.salsaSplashed
        ];
    }

    bottleGetSplashed(enemy, h, w, hy, wx) {
        return this.y >= 340 || this.isCollidingByItem(enemy, this, h, w, hy, wx);
    }

    trow() {
        setTimeout(() => {
            this.speedY = 15;
            let intervalId = this.createInterval(() => this.applyGravityBottle(intervalId), 1000 / 25);
            let intervalId2 = this.createInterval(() => this.animate(intervalId2), 75);
            let intervalId3 = this.createInterval(() => this.animateThrowingBottle(intervalId3), 25);
            this.AUDIOS[0].play();
        }, 10);
    };

    applyGravityBottle(id) {
        if (this.isAboutGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            clearInterval(id);
            this.AUDIOS[0].pause();
            this.AUDIOS[0].currentTime = 0;
            this.AUDIOS[1].play();
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
        world.level.enemies.forEach(enemy => {
            this.checkSplashByHittingEnemy(enemy, id, 40, 20, 20, 10);
        });
        world.level.babyChicken.forEach(enemy => {
            this.checkSplashByHittingEnemy(enemy, id, 20, 20, 10, 10);
        });
        this.checkSplashByHittingEnemy(world.level.endboss[0], id, 70, 45, 60, 5)
    };

    checkSplashByHittingEnemy(enemy, id, h, w, hy, wx) {
        if (this.bottleGetSplashed(enemy, h, w, hy, wx)) {
            this.isSplashed = true;
            clearInterval(id);
            this.currentImage = 0;
            let intervalId = world.character.createInterval(() => this.animateSplashedBottle(intervalId), 105);
        };
    }
};