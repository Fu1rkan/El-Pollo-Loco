
/**
 * Represents a small chicken enemy
 */
class BabyChicken extends MovableObject {
    /**
     * Walking animation images
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Death animation images
     * @type {string[]}
     */
    IMAGES_DEATH = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    /**
     * Enemy and death audio groups
     * @type {{ENEMY: HTMLAudioElement[], DEATH: HTMLAudioElement[]}}
     */
    AUDIOS = {
        ENEMY: [],
        DEATH: []
    };

    /**
     * Creates a small chicken
     */
    constructor() {
        super();
        this.getImages();
        this.getAudios()
        this.setChickenProperties();
        this.startDelayedAnimation();
    };

    /**
     * Loads all small chicken images
     */
    getImages() {
        this.loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEATH);
    };

    /**
     * Sets the initial small chicken values
     */
    setChickenProperties() {
        this.x = 760 + Math.random() * 4000;
        this.y = 367;
        this.width = 60;
        this.height = 60;
        this.energy = 100;
        this.speed = 0.2 + Math.random() * 0.25;
    };

    /**
     * Starts the small chicken animation after a short delay
     */
    startDelayedAnimation() {
        setTimeout(() => {
            this.animate();
        }, 1);
    };

    /**
     * Indicates whether the small chicken is facing left
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
     * Initializes all small chicken audios
     */
    getAudios() {
        this.createAudios();
        this.AUDIOS.ENEMY = this.getEnemyAudioArray();
        this.AUDIOS.DEATH = this.getDeathAudioArray();
        this.muteAudios();
        this.addAudiosToGlobalArray();
    };

    /**
     * Creates all audio objects used by the small chicken
     */
    createAudios() {
        this.baby_chicken_sound = new Audio('audio/baby_chicken.mp3');
        this.baby_chicken_sound_2 = new Audio('audio/baby_chicken_2.mp3');
        this.baby_chicken_sound_death = new Audio('audio/baby_chicken_death.mp3');
    };

    /**
     * Gets all small chicken sound audios
     * @returns {HTMLAudioElement[]} - Small chicken sound audios
     */
    getEnemyAudioArray() {
        return [
            this.baby_chicken_sound,
            this.baby_chicken_sound_2
        ];
    };

    /**
     * Gets the small chicken death audio
     * @returns {HTMLAudioElement[]} - Small chicken death audio
     */
    getDeathAudioArray() {
        return [
            this.baby_chicken_sound_death
        ];
    };

    /**
     * Applies the current mute status to all small chicken audios
     */
    muteAudios() {
        this.AUDIOS.ENEMY.forEach((audio) => {
            audio.muted = isMuted;
        });

        this.AUDIOS.DEATH[0].muted = isMuted;
    };

    /**
     * Adds all small chicken audios to the global audio collection
     */
    addAudiosToGlobalArray() {
        this.AUDIOS.ENEMY.forEach((audio) => {
            allAudios.push(audio);
        });

        allAudios.push(this.AUDIOS.DEATH[0]);
    };

    /**
     * Starts movement, animation and sound intervals
     */
    animate() {
        this.moveInterval = this.createInterval(() => this.moveLeft(), 1000 / 60);
        this.animationInterval = this.createInterval(() => this.checkInteraction(), 500 - (this.speed * 1000));

        setTimeout(() => {
            let intervalId = world.character.createInterval(() => this.playChickenSound(this, intervalId), 4000)
        }, Math.random() * 2000)
    };


    /**
     * Plays a small chicken sound based on distance to the character
     * @param {BabyChicken} chicken - Small chicken that should play a sound
     * @param {number} intervalId - Sound interval id
     */
    playChickenSound(chicken, intervalId) {
        if (this.chickenIsDead(chicken, intervalId)) return;
        let distance = Math.abs(world.character.x - chicken.x);
        if (this.chickenIsTooFarAway(distance)) return;
        this.playChickenSoundByDistance(chicken, distance);
    }

    /**
     * Checks whether the small chicken is dead and clears its sound interval
     * @param {BabyChicken} chicken - Small chicken to check
     * @param {number} intervalId - Sound interval id
     * @returns {boolean} - true = small chicken is dead, false = small chicken is alive
     */
    chickenIsDead(chicken, intervalId) {
        if (chicken.energy > 0) return false;
        clearInterval(intervalId);
        return true;
    }

    /**
     * Checks whether the small chicken is too far away for sound playback
     * @param {number} distance - Distance to the character
     * @returns {boolean} - true = too far away, false = close enough
     */
    chickenIsTooFarAway(distance) {
        return distance >= 720;
    }

    /**
     * Plays a cloned small chicken sound with distance based volume
     * @param {BabyChicken} chicken - Small chicken that should play a sound
     * @param {number} distance - Distance to the character
     */
    playChickenSoundByDistance(chicken, distance) {
        let sound = chicken.AUDIOS.ENEMY[this.getRandomNumber()].cloneNode();
        sound.volume = 1 - (distance / 720);
        sound.muted = isMuted;
        sound.play();
    }

    /**
     * Gets a random small chicken sound index
     * @returns {number} - Random index between 0 and 1
     */
    getRandomNumber() {
        return Math.floor(Math.random() * 2);
    }

    /**
     * Checks whether the small chicken should walk or die
     */
    checkInteraction() {
        if (this.energy > 0) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playLimitedAnimation(this.IMAGES_DEATH);
            clearInterval(this.moveInterval);
            clearInterval(this.animationInterval);
            let index = world.level.babyChicken.indexOf(this);
            setTimeout(() => {
                world.level.babyChicken.splice(index, 1)
            }, 1000);
        };
    };
};