/**
 * Represents the playable character and controls movement, animations and sounds
 */
class Character extends MovableObject {

    /**
     * Current game world
     * @type {World}
     */
    world;

    /**
     * Horizontal movement speed
     * @type {number}
     */
    speed = 3;

    /**
     * Horizontal position
     * @type {number}
     */
    x = 0;

    /**
     * Vertical position
     * @type {number}
     */
    y = 229.5;

    /**
     * Character width
     * @type {number}
     */
    width = 100;

    /**
     * Character height
     * @type {number}
     */
    height = 200;

    /**
     * Timeout ids used by character sounds
     * @type {number[]}
     */
    timers = [];

    /**
     * Interval ids used by character sounds
     * @type {number[]}
     */
    audioIntervals = [];

    /**
     * Walking animation images
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Jumping animation images
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Death animation images
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Hurt animation images
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Standing animation images
     * @type {string[]}
     */
    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
     * Sleeping animation images
     * @type {string[]}
     */
    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Character audio elements
     * @type {HTMLAudioElement[]}
     */
    AUDIOS;

    /**
     * Creates the character and initializes images, audio, gravity and animation loops
     */
    constructor() {
        super();
        this.getAudios();
        this.loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.moveCamera();
        this.animate();
    };

    /**
     * Initializes all character audios
     */
    getAudios() {
        this.createAudios();
        this.AUDIOS = this.getAudioArray();
        this.muteAudios();
        this.addAudiosToGlobalArray();
    };

    /**
     * Creates all audio objects used by the character
     */
    createAudios() {
        this.character_hurt = new Audio('audio/character_hurt.mp3');
        this.character_death = new Audio('audio/character_death.mp3');
        this.character_jump = new Audio('audio/character_jump.mp3');
        this.character_sleep = new Audio('audio/character_sleeping.mp3');
        this.character_whistle = new Audio('audio/character_whistle.mp3');
        this.character_walk = new Audio('audio/character_footsteps.mp3');
    };

    /**
     * Gets all character audios in their playback order
     * @returns {HTMLAudioElement[]} - Character audio elements
     */
    getAudioArray() {
        return [
            this.character_hurt,
            this.character_death,
            this.character_jump,
            this.character_sleep,
            this.character_whistle,
            this.character_walk
        ];
    };

    /**
     * Applies the current mute status to all character audios
     */
    muteAudios() {
        this.AUDIOS.forEach((audio) => {
            audio.muted = isMuted;
        });
    };

    /**
     * Adds all character audios to the global audio collection
     */
    addAudiosToGlobalArray() {
        this.AUDIOS.forEach((audio) => {
            allAudios.push(audio);
        });
    };

    /**
     * Checks whether the character is walking
     * @returns {boolean} - true = character is walking, false = character is not walking
     */
    isWalking() {
        if (this.world.keyboard.RIGHT == true || this.world.keyboard.LEFT == true) {
            return true
        } else {
            return false
        };
    };

    /**
     * Checks whether the character is sleeping
     * @returns {boolean} - true = character is sleeping, false = character is active
     */
    isSleeping() {
        if (this.world.keyboard.ACTIVE == false) {
            return true;
        } else {
            return false;
        };
    };

    /**
     * Starts the character activity loop
     */
    animate() {
        this.createInterval(this.characterActivities, 10);
    };

    /**
     * Chooses the current character activity and animation
     * @param {number} id - Current animation interval id
     */
    characterActivities(id) {
        world.character.resetCharacterActivityState();
        if (world.character.handleDeathActivity(id)) return;
        if (world.character.handleHurtActivity(id)) return;
        if (world.character.handleJumpActivity(id)) return;
        if (world.character.handleWalkActivity(id)) return;
        if (world.character.handleSleepActivity(id)) return;
        world.character.handleStandActivity(id);
    };

    /**
     * Resets character timers, audio intervals and active sounds
     */
    resetCharacterActivityState() {
        world.character.clearCharacterTimers();
        world.character.clearCharacterAudioIntervals();
        world.character.stopCharacterAudios();
    };

    /**
     * Clears all stored character timeout ids
     */
    clearCharacterTimers() {
        world.character.timers.forEach(element => {
            clearTimeout(element)
        });
    };

    /**
     * Clears all stored character audio interval ids
     */
    clearCharacterAudioIntervals() {
        world.character.audioIntervals.forEach(element => {
            clearInterval(element)
        });
    };

    /**
     * Stops all currently active character audios
     */
    stopCharacterAudios() {
        world.character.AUDIOS.forEach(element => {
            element.pause();
            element.currentTime = 0;
        });
    };

    /**
     * Handles the death activity
     * @param {number} id - Current animation interval id
     * @returns {boolean} - true = activity was handled, false = activity was skipped
     */
    handleDeathActivity(id) {
        if (world.character.isDead()) {
            world.character.AUDIOS[1].play();
            world.character.animationCharacter(id, world.character.playDeathAnimation, 100);
            return true;
        };
        return false;
    };

    /**
     * Handles the hurt activity
     * @param {number} id - Current animation interval id
     * @returns {boolean} - true = activity was handled, false = activity was skipped
     */
    handleHurtActivity(id) {
        if (world.character.isHurt()) {
            world.character.AUDIOS[0].play();
            world.character.animationCharacter(id, world.character.playHurtAnimation, 100, world.character.isNotHurtAnymore);
            return true;
        };
        return false;
    };

    /**
     * Handles the jump activity
     * @param {number} id - Current animation interval id
     * @returns {boolean} - true = activity was handled, false = activity was skipped
     */
    handleJumpActivity(id) {
        if (world.character.isAboutGround()) {
            world.character.AUDIOS[2].play();
            world.character.animationCharacter(id, world.character.playJumpAnimation, 150, world.character.isNotJumpingAnymore);
            return true;
        };
        return false;
    };

    /**
     * Handles the walk activity
     * @param {number} id - Current animation interval id
     * @returns {boolean} - true = activity was handled, false = activity was skipped
     */
    handleWalkActivity(id) {
        if (world.character.isWalking() && world.character.isNotTouchingTheBorder()) {
            world.character.walkSound();
            world.character.animationCharacter(id, world.character.playWalkAnimation, 100, world.character.isNotWalkingAnymore)
            return true;
        };
        return false;
    };

    /**
     * Handles the sleep activity
     * @param {number} id - Current animation interval id
     * @returns {boolean} - true = activity was handled, false = activity was skipped
     */
    handleSleepActivity(id) {
        if (world.character.isSleeping()) {
            world.character.sleepSound();
            world.character.animationCharacter(id, world.character.playSleepingAnimation, 250, world.character.isNotSleepingAnymore);
            return true;
        };
        return false;
    };

    /**
     * Handles the standing activity
     * @param {number} id - Current animation interval id
     */
    handleStandActivity(id) {
        world.character.whistleSound();
        world.character.animationCharacter(id, world.character.playStandAnimation, 250, world.character.isNotStandingAnymore);
    };

    /**
     * Starts the delayed whistle sound
     */
    whistleSound() {
        let id = this.createTimeout(world.character.playWhistleSound, 8000)
        world.character.timers.push(id);
    };

    /**
     * Plays the whistle sound
     */
    playWhistleSound() {
        world.character.AUDIOS[4].play();
    }

    /**
     * Starts the sleep sound loop
     */
    sleepSound() {
        world.character.AUDIOS[3].play();
        let audioId = this.createInterval(world.character.playSleepSound, 1000)
        world.character.audioIntervals.push(audioId);
    };

    /**
     * Plays the sleep sound
     */
    playSleepSound() {
        world.character.AUDIOS[3].play()
    }

    /**
     * Starts the walking sound loop
     */
    walkSound() {
        world.character.AUDIOS[5].play();
        let audioId = this.createInterval(world.character.playWalkSound, 600)
        world.character.audioIntervals.push(audioId);
    };

    /**
     * Plays one walking step sound
     */
    playWalkSound() {
        let sound = world.character.AUDIOS[5].cloneNode(true);
        sound.muted = isMuted;
        sound.play();
    }

    /**
     * Starts a character animation and watches for its stop condition
     * @param {number} id - Current animation interval id
     * @param {Function} interaction - Animation function to run
     * @param {number} time - Animation interval time in milliseconds
     * @param {Function} [func] - Stop condition function
     */
    animationCharacter(id, interaction, time, func) {
        clearInterval(id);
        this.currentImage = 0;
        let intervalId = this.createInterval(interaction, time);
        let intervalId2 = this.createInterval(() => this.checkAnimationChance(intervalId, intervalId2, func), 1000 / 60);
    };

    /**
     * Checks whether the current animation should stop
     * @param {number} id - Animation interval id
     * @param {number} intervalId2 - Watcher interval id
     * @param {Function} [func] - Stop condition function
     */
    checkAnimationChance(id, intervalId2, func) {
        if (func) {
            if (func()) {
                clearInterval(id);
                clearInterval(intervalId2);
                world.character.animate();
                world.character.world.jumpedOnEnemy = false;
            };
        };
    };

    /**
     * Plays the death animation and ends the game afterwards
     */
    playDeathAnimation() {
        world.character.playLimitedAnimation(world.character.IMAGES_DEAD);
        setTimeout(() => {
            world.endGame(0);
        }, 600);
    };

    /**
     * Plays the jump animation
     */
    playJumpAnimation() {
        world.character.playLimitedAnimation(world.character.IMAGES_JUMPING);
    };

    /**
     * Plays the hurt animation
     */
    playHurtAnimation() {
        world.character.playLimitedAnimation(world.character.IMAGES_HURT);
    };

    /**
     * Plays the walking animation
     */
    playWalkAnimation() {
        world.character.playAnimation(world.character.IMAGES_WALKING);
    };

    /**
     * Plays the sleeping animation
     */
    playSleepingAnimation() {
        world.character.playAnimation(world.character.IMAGES_SLEEPING);
    };

    /**
     * Plays the standing animation
     */
    playStandAnimation() {
        world.character.playAnimation(world.character.IMAGES_STANDING);
    };

    /**
     * Checks whether the hurt animation should stop
     * @returns {boolean} - true = animation should stop, false = animation should continue
     */
    isNotHurtAnymore() {
        return !world.character.isHurt() || world.character.isDead();
    };

    /**
     * Checks whether the walking animation should stop
     * @returns {boolean} - true = animation should stop, false = animation should continue
     */
    isNotWalkingAnymore() {
        return !world.character.isWalking() || world.character.isHurt() || world.character.isAboutGround() || world.character.isDead() || world.character.x == 0 || world.character.x >= 4200;
    };

    /**
     * Checks whether the sleeping animation should stop
     * @returns {boolean} - true = animation should stop, false = animation should continue
     */
    isNotSleepingAnymore() {
        return world.character.isDead() || world.character.isHurt() || world.character.isAboutGround() || world.character.isWalking();
    };

    /**
     * Checks whether the standing animation should stop
     * @returns {boolean} - true = animation should stop, false = animation should continue
     */
    isNotStandingAnymore() {
        if (world.character.isDead() || world.character.isHurt() || world.character.isAboutGround() || world.character.isWalking() && world.character.x <= 4199 && !world.character.x == 0 || world.character.isSleeping()) {
            return true;
        } else {
            return false;
        };
    };

    /**
     * Checks whether the character is inside the walking borders
     * @returns {boolean} - true = character is inside borders, false = character touches a border
     */
    isNotTouchingTheBorder() {
        return world.character.x <= 4199 && !world.character.x == 0;
    };

    /**
     * Checks whether the jump animation should stop
     * @returns {boolean} - true = animation should stop, false = animation should continue
     */
    isNotJumpingAnymore() {
        return !world.character.isAboutGround() || world.character.isHurt() || world.character.isDead() || world.character.world.jumpedOnEnemy;
    };

    /**
     * Makes the character jump and checks enemy touch protection
     * @param {number} speed - Vertical jump speed
     */
    jump(speed) {
        super.jump(speed);
        this.checkJumpingOnEnemies(this.world.level.enemies, 40, 20, 20, 10);
        this.checkJumpingOnEnemies(this.world.level.babyChicken, 20, 20, 10, 10);
    };

    /**
     * Checks whether the character touches enemies while jumping
     * @param {MovableObject[]} enemies - Enemies to check
     * @param {number} h - Height offset
     * @param {number} w - Width offset
     * @param {number} hy - Y offset
     * @param {number} wx - X offset
     */
    checkJumpingOnEnemies(enemies, h, w, hy, wx) {
        enemies.forEach(enemy => {
            this.disableHitWhileTouchingEnemy(enemy, h, w, hy, wx);
        });
    };

    /**
     * Temporarily disables enemy hits while the character touches an enemy
     * @param {MovableObject} enemy - Enemy to check
     * @param {number} h - Height offset
     * @param {number} w - Width offset
     * @param {number} hy - Y offset
     * @param {number} wx - X offset
     */
    disableHitWhileTouchingEnemy(enemy, h, w, hy, wx) {
        if (this.isColliding(enemy, h, w, hy, wx)) {
            this.canHitEnemys = false;
            this.canKillEnemys = false;
            setTimeout(() => {
                this.canHitEnemys = true;
                this.canKillEnemys = true;
            }, 100);
        };
    };

    /**
     * Starts the movement and camera loop
     */
    moveCamera() {
        this.createInterval(this.checkMovement, 1000 / 60);
    };

    /**
     * Checks keyboard input and moves the character
     */
    checkMovement() {
        if (world.character.isMovingRight()) {
            world.character.otherDirection = false;
            world.character.moveRight();
        };
        if (world.character.isMovingLeft()) {
            world.character.otherDirection = true;
            world.character.moveLeft();
        };
        if (world.character.isJumping()) {
            world.character.jump(21);
        };
        world.cameraX = -world.character.x + 100;
    };

    /**
     * Checks whether the character can move right
     * @returns {boolean} - true = character can move right, false = character cannot move right
     */
    isMovingRight() {
        return world.keyboard.RIGHT == true && world.character.x < world.level.levelEndX && world.character.canWalk;
    };

    /**
     * Checks whether the character can move left
     * @returns {boolean} - true = character can move left, false = character cannot move left
     */
    isMovingLeft() {
        return world.keyboard.LEFT == true && world.character.x > 0 && world.character.canWalk;
    };

    /**
     * Checks whether the character can jump
     * @returns {boolean} - true = character can jump, false = character cannot jump
     */
    isJumping() {
        return world.keyboard.UP == true && world.character.isOnGround() || world.keyboard.SPACE == true && world.character.isOnGround();
    };
};
