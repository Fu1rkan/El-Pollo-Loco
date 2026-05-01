/**
 * Represents a normal chicken enemy
 */
class Chicken extends MovableObject {
    /**
     * Walking animation images
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Death animation images
     * @type {string[]}
     */
    IMAGES_DEATH = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Enemy and death sound paths
     * @type {{ENEMY: string[], DEATH: string[]}}
     */
    AUDIOS = {
        ENEMY: [],
        DEATH: []
    };

    /**
     * Creates a normal chicken
     */
    constructor() {
        super();
        this.getImages();
        this.getAudios()
        this.setChickenProperties();
        this.startDelayedAnimation();
    };

    /**
     * Loads all chicken images
     */
    getImages() {
        this.loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEATH);
    };

    /**
     * Sets the initial chicken values
     */
    setChickenProperties() {
        this.x = 760 + Math.random() * 4000;
        this.y = 347;
        this.width = 80;
        this.height = 80;
        this.energy = 100;
        this.speed = 0.4 + Math.random() * 0.25;
    };

    /**
     * Starts the chicken animation after a short delay
     */
    startDelayedAnimation() {
        setTimeout(() => {
            this.animate();
        }, 1);
    };

    /**
     * Indicates whether the chicken is facing left
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * Movement interval id
     * @type {number}
     */
    moveInterval;

    /**
     * Animation interval id
     * @type {number}
     */
    animationInterval;

    /**
     * Initializes all chicken audios
     */
    getAudios() {
        this.AUDIOS.ENEMY = this.getEnemyAudioArray();
        this.AUDIOS.DEATH = this.getDeathAudioArray();
    };

    /**
     * Gets all chicken sound paths
     * @returns {string[]} - Chicken sound paths
     */
    getEnemyAudioArray() {
        return [
            'audio/normal_chicken.mp3',
            'audio/normal_chicken_2.mp3',
            'audio/normal_chicken_3.mp3',
            'audio/normal_chicken_4.mp3',
        ];
    };

    /**
     * Gets the chicken death audio path
     * @returns {string[]} - Chicken death audio path
     */
    getDeathAudioArray() {
        return [
            'audio/normal_chicken_death.mp3',
        ];
    };

    /**
     * Starts movement, animation and sound intervals
     */
    animate() {
        this.moveInterval = this.createInterval(() => this.moveLeft(), 1000 / 60);
        this.animationInterval = this.createInterval(() => this.checkInteraction(), 700 - (this.speed * 1000));

        setTimeout(() => {
            let intervalId = world.character.createInterval(() => this.playChickenSound(this, intervalId), 4000)
        }, Math.random() * 3000)
    };

    /**
     * Plays a chicken sound based on distance to the character
     * @param {Chicken} chicken - Chicken that should play a sound
     * @param {number} intervalId - Sound interval id
     */
    playChickenSound(chicken, intervalId) {
        if (this.chickenIsDead(chicken, intervalId)) return;
        let distance = Math.abs(world.character.x - chicken.x);
        if (this.chickenIsTooFarAway(distance)) return;
        this.playChickenSoundByDistance(chicken, distance);
    }

    /**
     * Checks whether the chicken is dead and clears its sound interval
     * @param {Chicken} chicken - Chicken to check
     * @param {number} intervalId - Sound interval id
     * @returns {boolean} - true = chicken is dead, false = chicken is alive
     */
    chickenIsDead(chicken, intervalId) {
        if (chicken.energy > 0) return false;
        clearInterval(intervalId);
        return true;
    }

    /**
     * Checks whether the chicken is too far away for sound playback
     * @param {number} distance - Distance to the character
     * @returns {boolean} - true = too far away, false = close enough
     */
    chickenIsTooFarAway(distance) {
        return distance >= 720;
    }

    /**
     * Plays a pooled chicken sound with distance based volume
     * @param {Chicken} chicken - Chicken that should play a sound
     * @param {number} distance - Distance to the character
     */
    playChickenSoundByDistance(chicken, distance) {
        let path = chicken.AUDIOS.ENEMY[this.getRandomNumber()];
        playPooledAudio(path, 1 - (distance / 720), 2);
    }

    /**
     * Gets a random chicken sound index
     * @returns {number} - Random index between 0 and 3
     */
    getRandomNumber() {
        return Math.floor(Math.random() * 4);
    }

    /**
     * Checks whether the chicken should walk or die
     */
    checkInteraction() {
        if (this.energy > 0) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playLimitedAnimation(this.IMAGES_DEATH);
            clearInterval(this.moveInterval);
            clearInterval(this.animationInterval);
            setTimeout(() => {
                let index = world.level.enemies.indexOf(this);
                world.level.enemies.splice(index, 1)
            }, 1000);
        };
    };
};
