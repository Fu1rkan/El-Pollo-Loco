/** Represents the endboss enemy and controls its states, animations and sounds */
class Endboss extends MovableObject {
    /**
     * Indicates whether the endboss alert animation is active
     * @type {boolean}
     */
    endbossAlert = false;

    /**
     * Indicates whether the endboss is walking toward the character
     * @type {boolean}
     */
    endbossIsAngry = false;

    /**
     * Indicates whether the endboss attack is currently on cooldown
     * @type {boolean}
     */
    attackCooldown = false;

    /**
     * Indicates whether the hurt animation is currently active
     * @type {boolean}
     */
    hurtAnimationActive = false;

    /**
     * Cooldown time after taking bottle damage
     * @type {number}
     */
    bottleDamageCooldown = 2000;

    /**
     * Base walking speed before the endboss loses health
     * @type {number}
     */
    baseSpeed = 2.4;

    /**
     * Walking speed after the endboss lost enough health
     * @type {number}
     */
    phaseTwoSpeed = 2.6;

    /**
     * Walking speed for the final low-health phase
     * @type {number}
     */
    phaseThreeSpeed = 3;

    /**
     * Walking animation images
     * @type {string[]}
     */
    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Standing animation images
     * @type {string[]}
     */
    IMAGES_STANDING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
    ];

    /**
     * Alert animation images
     * @type {string[]}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    /**
     * Attack animation images
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Hurt animation images
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Death animation images
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Endboss audio elements
     * @type {HTMLAudioElement[]}
     */
    AUDIOS = [];

    /** Creates the endboss and starts its behavior loops */
    constructor() {
        super();
        this.x = 4500;
        this.y = 140;
        this.width = 300;
        this.height = 300;
        this.energy = 100;
        this.speed = this.baseSpeed;
        this.getImages();
        this.animate();
        this.getAudios();
        this.createInterval(this.bossIsWalking, 1000 / 60);
        this.createInterval(this.checkCharacterApproachingEndboss, 50);
    };

    /** Starts the endboss animation loop */
    animate() {
        this.createInterval(this.playEndbossAnimation, 1000 / 60);
    }

    /**
     * Checks whether the character touches the endboss
     * @returns {boolean} - true = character touches endboss, false = no touch
     */
    characterTouchEndboss() {
        return world.character.x + world.character.width >= this.x + 5 && this.x + 5 + this.width - 45 >= world.character.x;
    };

    /**
     * Checks whether the character does not touch the endboss
     * @returns {boolean} - true = character does not touch endboss, false = character touches endboss
     */
    characterDontTouchEndboss() {
        return world.character.x + world.character.width <= this.x + 5 || this.x + 5 + this.width - 45 <= world.character.x;
    };

    /**
     * Checks whether the endboss is dead
     * @returns {boolean} - true = endboss is dead, false = endboss is alive
     */
    endbossIsDeath() {
        return this.energy == 0;
    };

    /**
     * Checks whether the endboss is hurt
     * @returns {boolean} - true = endboss is hurt, false = endboss is not hurt
     */
    endbossGetHurt() {
        return world.level.endboss[0].hurtAnimationActive;
    };

    /**
     * Checks whether the endboss is alerting
     * @returns {boolean} - true = endboss is alerting, false = endboss is not alerting
     */
    endbossIsAlerting() {
        return world.level.endboss[0].endbossAlert;
    }

    /**
     * Checks whether the endboss is not alerting
     * @returns {boolean} - true = endboss is not alerting, false = endboss is alerting
     */
    endbossIsNotAlerting() {
        return !world.level.endboss[0].endbossAlert;
    }

    /**
     * Checks whether the endboss hurt animation can stop
     * @returns {boolean} - true = hurt animation can stop, false = hurt animation continues
     */
    endbossIsHurt() {
        return !world.level.endboss[0].hurtAnimationActive;
    }

    /**
     * Checks whether the endboss can currently chase the character
     * @returns {boolean} - true = endboss can move, false = endboss pauses
     */
    canChaseCharacter() {
        return this.endbossIsAngry && this.x > 0 && !this.attackCooldown && !this.endbossIsDeath();
    };

    /**
     * Checks whether the endboss can damage the character
     * @returns {boolean} - true = endboss can attack, false = attack is on cooldown
     */
    canAttackCharacter() {
        return !this.attackCooldown && !this.endbossIsDeath();
    };

    /** Starts a short attack cooldown so the character can escape after a hit */
    startAttackCooldown() {
        this.attackCooldown = true;
        this.createTimeout(() => {
            this.attackCooldown = false;
        }, 1200);
    };

    /** Starts the hurt animation for the full bottle damage cooldown */
    startHurtAnimation() {
        this.hurtAnimationActive = true;
        this.createTimeout(() => {
            this.hurtAnimationActive = false;
        }, this.bottleDamageCooldown);
    };

    /** Updates the walking speed based on the current health phase */
    updateSpeedByHealth() {
        if (this.energy <= 20) {
            this.speed = this.phaseThreeSpeed;
        } else if (this.energy <= 60) {
            this.speed = this.phaseTwoSpeed;
        } else {
            this.speed = this.baseSpeed;
        };
    };

    /**
     * Checks whether the attack animation can stop
     * @returns {boolean} - true = attack animation can stop, false = attack animation continues
     */
    checkAttacking() {
        return world.level.endboss[0].endbossGetHurt() ||
            world.level.endboss[0].endbossIsDeath() ||
            (world.level.endboss[0].characterDontTouchEndboss() && world.level.endboss[0].animationIsDone);
    }

    /** Moves the endboss left when it is angry */
    bossIsWalking() {
        let endboss = world.level.endboss[0];
        if (endboss.canChaseCharacter()) {
            endboss.updateSpeedByHealth();
            endboss.moveLeft();
        };
    };

    /**
     * Checks whether the walking animation should stop
     * @returns {boolean} - true = interaction starts, false = walking continues
     */
    checkInteractions() {
        return world.level.endboss[0].characterTouchEndboss() || world.level.endboss[0].endbossGetHurt() || world.level.endboss[0].endbossIsDeath()
    }

    /**
     * Checks whether the character is close enough to trigger the endboss
     * @param {number} id - Approach check interval id
     */
    checkCharacterApproachingEndboss(id) {
        if (world.character.x >= world.level.endboss[0].x - 400) {
            world.level.endboss[0].endbossAlert = true;
            setTimeout(() => {
                world.level.endboss[0].endbossAlert = false;
                world.level.endboss[0].endbossIsAngry = true;
            }, 1500);
            clearInterval(id);
        };
    };

    /** Loads all endboss images */
    getImages() {
        this.loadImg(this.IMAGES_STANDING[0]);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    };

    /**
     * Plays the correct endboss animation based on its current state
     * @param {number} id - Current animation interval id
     */
    playEndbossAnimation(id) {
        if (world.level.endboss[0].endbossIsAngry) {
            world.level.endboss[0].checkEndbossActivity(id);
        } else if (world.level.endboss[0].endbossAlert) {
            world.level.endboss[0].animationEndboss(id, 1, world.level.endboss[0].playAlertAnimation, 250, world.level.endboss[0].endbossIsNotAlerting);
        } else {
            world.level.endboss[0].animationEndboss(id, -1, world.level.endboss[0].playStandAnimation, 500, world.level.endboss[0].endbossIsAlerting);
            world.character.createInterval(world.level.endboss[0].playBossSound, 2000);
        };
    };

    /**
     * Checks the current endboss activity
     * @param {number} id - Current animation interval id
     */
    checkEndbossActivity(id) {
        if (world.level.endboss[0].endbossIsDeath()) {
            world.level.endboss[0].animationEndboss(id, 3, world.level.endboss[0].playDeathAnimation, 150);
        } else if (world.level.endboss[0].endbossGetHurt()) {
            world.level.endboss[0].animationEndboss(id, 2, world.level.endboss[0].playHurtAnimation, 100, world.level.endboss[0].endbossIsHurt);
        } else if (world.level.endboss[0].characterTouchEndboss()) {
            world.level.endboss[0].animationEndboss(id, 4, world.level.endboss[0].playAttackAnimation, 150, world.level.endboss[0].checkAttacking);
        } else {
            world.level.endboss[0].animationEndboss(id, -1, world.level.endboss[0].playWalkAnimation, 150, world.level.endboss[0].checkInteractions);
        };
    };

    /**
     * Starts a specific endboss animation
     * @param {number} id - Current animation interval id
     * @param {number} audio - Audio index to play
     * @param {Function} interaction - Animation function to run
     * @param {number} time - Animation interval time in milliseconds
     * @param {Function} [func] - Stop condition function
     */
    animationEndboss(id, audio, interaction, time, func) {
        clearInterval(id);
        this.currentImage = 0;
        this.playEndbossAudio(audio);
        let intervalId = this.createInterval(interaction, time);
        let intervalId2 = this.createInterval(() => this.checkAnimationChance(intervalId, intervalId2, func), 1000 / 60);
    };

    /**
     * Checks whether the current endboss animation should stop
     * @param {number} id - Animation interval id
     * @param {number} intervalId2 - Watcher interval id
     * @param {Function} [func] - Stop condition function
     */
    checkAnimationChance(id, intervalId2, func) {
        if (func) {
            if (func()) {
                clearInterval(id);
                clearInterval(intervalId2);
                world.level.endboss[0].animate();
            };
        };
    };

    /** Plays the hurt animation */
    playHurtAnimation() {
        world.level.endboss[0].playAnimation(world.level.endboss[0].IMAGES_HURT);
    };

    /** Plays the attack animation */
    playAttackAnimation() {
        world.level.endboss[0].playAnimation(world.level.endboss[0].IMAGES_ATTACK);
    };

    /** Plays the walking animation */
    playWalkAnimation() {
        world.level.endboss[0].playAnimation(world.level.endboss[0].IMAGES_WALK);
    };

    /** Plays the standing animation */
    playStandAnimation() {
        world.level.endboss[0].playAnimation(world.level.endboss[0].IMAGES_STANDING);
    };

    /** Plays the alert animation */
    playAlertAnimation() {
        world.level.endboss[0].playLimitedAnimation(world.level.endboss[0].IMAGES_ALERT);
    };

    /**
     * Plays the death animation and ends the game afterwards
     */
    playDeathAnimation() {
        world.level.endboss[0].playLimitedAnimation(world.level.endboss[0].IMAGES_DEAD);
        setTimeout(() => {
            world.endGame(1);
        }, 600);
    };
};
