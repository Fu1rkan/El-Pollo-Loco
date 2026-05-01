/**
 * Represents a throwable salsa bottle
 */
class ThrowableObject extends MovableObject {

    /**
     * Bottle rotation animation images
     * @type {string[]}
     */
    IMAGES_THROW_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Bottle splash animation images
     * @type {string[]}
     */
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Bottle audio paths
     * @type {string[]}
     */
    AUDIOS = [];

    /**
     * Indicates whether the bottle has splashed
     * @type {boolean}
     */
    isSplashed = false;

    /**
     * Throw animation interval id
     * @type {number}
     */
    throwAnimationInterval;

    /**
     * Creates a throwable bottle
     * @param {number} x - Start x position
     * @param {number} y - Start y position
     * @param {World} world - Current game world
     */
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

    /**
     * Initializes all bottle audios
     */
    getAudios() {
        this.createAudios();
        this.AUDIOS = this.getAudioArray();
    };

    /**
     * Creates all audio paths used by the bottle
     */
    createAudios() {
        this.salsaThrowed = 'audio/bottle_throw.mp3';
        this.salsaSplashed = 'audio/bottle_splash_2.mp3';
    };

    /**
     * Gets all bottle audio paths in their playback order
     * @returns {string[]} - Bottle audio paths
     */
    getAudioArray() {
        return [
            this.salsaThrowed,
            this.salsaSplashed
        ];
    };

    /**
     * Checks whether the bottle should splash
     * @param {MovableObject} enemy - Enemy to check collision with
     * @param {number} h - Height offset
     * @param {number} w - Width offset
     * @param {number} hy - Y offset
     * @param {number} wx - X offset
     * @returns {boolean} - true = bottle splashes, false = bottle keeps flying
     */
    bottleGetSplashed(enemy, h, w, hy, wx) {
        return this.y >= 340 || this.isCollidingByItem(enemy, this, h, w, hy, wx);
    };

    /**
     * Starts the bottle throw movement and animations
     */
    trow() {
        setTimeout(() => {
            this.speedY = 15;
            let intervalId = this.createInterval(() => this.applyGravityBottle(intervalId), 1000 / 25);
            let intervalId2 = this.createInterval(() => this.animate(intervalId2), 75);
            let intervalId3 = this.createInterval(() => this.animateThrowingBottle(intervalId3), 25);
            this.throwAnimationInterval = intervalId2;
            playPooledAudio(this.AUDIOS[0], 1, 2);
        }, 10);
    };

    /**
     * Applies gravity to the thrown bottle
     * @param {number} id - Gravity interval id
     */
    applyGravityBottle(id) {
        if (this.isAboutGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            clearInterval(id);
            this.startBottleSplash(this.throwAnimationInterval);
        };
    };

    /**
     * Moves the thrown bottle forward
     * @param {number} id - Movement interval id
     */
    animateThrowingBottle(id) {
        if (this.y < 340) {
            this.x += 6;
        } else {
            clearInterval(id);
        };
    };

    /**
     * Plays the bottle splash animation
     * @param {number} id - Splash animation interval id
     */
    animateSplashedBottle(id) {
        this.playLimitedAnimation(this.IMAGES_BOTTLE_SPLASH, id);
    };

    /**
     * Plays the throw animation and checks enemy hits
     * @param {number} id - Throw animation interval id
     */
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

    /**
     * Checks whether the bottle hit an enemy and starts the splash animation
     * @param {MovableObject} enemy - Enemy to check
     * @param {number} id - Throw animation interval id
     * @param {number} h - Height offset
     * @param {number} w - Width offset
     * @param {number} hy - Y offset
     * @param {number} wx - X offset
     */
    checkSplashByHittingEnemy(enemy, id, h, w, hy, wx) {
        if (this.isSplashed) return;
        if (this.bottleGetSplashed(enemy, h, w, hy, wx)) {
            this.startBottleSplash(id);
        };
    };

    /**
     * Starts the bottle splash state and animation
     * @param {number} id - Throw animation interval id
     */
    startBottleSplash(id) {
        if (this.isSplashed) return;
        this.isSplashed = true;
        clearInterval(id);
        this.currentImage = 0;
        let intervalId = world.character.createInterval(() => this.animateSplashedBottle(intervalId), 105);
        this.playBottleSplashAudio();
    };

    /**
     * Stops the throw sound and plays the splash sound
     */
    playBottleSplashAudio() {
        stopPooledAudio(this.AUDIOS[0]);
        playPooledAudio(this.AUDIOS[1], 1, 2);
    };
};
