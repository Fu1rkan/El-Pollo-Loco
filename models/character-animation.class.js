/** Starts the character activity loop */
Character.prototype.animate = function () {
    this.createInterval(this.characterActivities, 10);
};

/**
 * Chooses the current character activity and animation
 * @param {number} id - Current animation interval id
 */
Character.prototype.characterActivities = function (id) {
    world.character.resetCharacterActivityState();
    if (world.character.handleDeathActivity(id)) return;
    if (world.character.handleHurtActivity(id)) return;
    if (world.character.handleJumpActivity(id)) return;
    if (world.character.handleWalkActivity(id)) return;
    if (world.character.handleSleepActivity(id)) return;
    world.character.handleStandActivity(id);
};

/** Resets character timers, audio intervals and active sounds */
Character.prototype.resetCharacterActivityState = function () {
    world.character.clearCharacterTimers();
    world.character.clearCharacterAudioIntervals();
    world.character.stopCharacterAudios();
};

/** Clears all stored character timeout ids */
Character.prototype.clearCharacterTimers = function () {
    world.character.timers.forEach(element => {
        clearTimeout(element)
    });
};

/** Clears all stored character audio interval ids */
Character.prototype.clearCharacterAudioIntervals = function () {
    world.character.audioIntervals.forEach(element => {
        clearInterval(element)
    });
};

/** Stops all currently active character audios */
Character.prototype.stopCharacterAudios = function () {
    world.character.AUDIOS.forEach(element => {
        stopAudio(element);
    });
};

/**
 * Handles the death activity
 * @param {number} id - Current animation interval id
 * @returns {boolean} - true = activity was handled, false = activity was skipped
 */
Character.prototype.handleDeathActivity = function (id) {
    if (!world.character.isDead()) return false;
    playAudio(world.character.AUDIOS[1]);
    world.character.animationCharacter(id, world.character.playDeathAnimation, 100);
    return true;
};

/**
 * Handles the hurt activity
 * @param {number} id - Current animation interval id
 * @returns {boolean} - true = activity was handled, false = activity was skipped
 */
Character.prototype.handleHurtActivity = function (id) {
    if (!world.character.isHurt()) return false;
    playAudio(world.character.AUDIOS[0]);
    world.character.animationCharacter(id, world.character.playHurtAnimation, 100, world.character.isNotHurtAnymore);
    return true;
};

/**
 * Handles the jump activity
 * @param {number} id - Current animation interval id
 * @returns {boolean} - true = activity was handled, false = activity was skipped
 */
Character.prototype.handleJumpActivity = function (id) {
    if (!world.character.isAboutGround()) return false;
    playAudio(world.character.AUDIOS[2]);
    world.character.animationCharacter(id, world.character.playJumpAnimation, 150, world.character.isNotJumpingAnymore);
    return true;
};

/**
 * Handles the walk activity
 * @param {number} id - Current animation interval id
 * @returns {boolean} - true = activity was handled, false = activity was skipped
 */
Character.prototype.handleWalkActivity = function (id) {
    if (!world.character.isWalking() || !world.character.isNotTouchingTheBorder()) return false;
    world.character.walkSound();
    world.character.animationCharacter(id, world.character.playWalkAnimation, 100, world.character.isNotWalkingAnymore)
    return true;
};

/**
 * Handles the sleep activity
 * @param {number} id - Current animation interval id
 * @returns {boolean} - true = activity was handled, false = activity was skipped
 */
Character.prototype.handleSleepActivity = function (id) {
    if (!world.character.isSleeping()) return false;
    world.character.sleepSound();
    world.character.animationCharacter(id, world.character.playSleepingAnimation, 250, world.character.isNotSleepingAnymore);
    return true;
};

/**
 * Handles the standing activity
 * @param {number} id - Current animation interval id
 */
Character.prototype.handleStandActivity = function (id) {
    world.character.whistleSound();
    world.character.animationCharacter(id, world.character.playStandAnimation, 250, world.character.isNotStandingAnymore);
};

/**
 * Starts a character animation and watches for its stop condition
 * @param {number} id - Current animation interval id
 * @param {Function} interaction - Animation function to run
 * @param {number} time - Animation interval time in milliseconds
 * @param {Function} [func] - Stop condition function
 */
Character.prototype.animationCharacter = function (id, interaction, time, func) {
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
Character.prototype.checkAnimationChance = function (id, intervalId2, func) {
    if (func && func()) {
        clearInterval(id);
        clearInterval(intervalId2);
        world.character.animate();
        world.character.world.jumpedOnEnemy = false;
    };
};

/** Plays the death animation and ends the game afterwards */
Character.prototype.playDeathAnimation = function () {
    world.character.playLimitedAnimation(world.character.IMAGES_DEAD);
    setTimeout(() => {
        world.endGame(0);
    }, 600);
};

/** Plays the jump animation */
Character.prototype.playJumpAnimation = function () {
    world.character.playLimitedAnimation(world.character.IMAGES_JUMPING);
};

/** Plays the hurt animation */
Character.prototype.playHurtAnimation = function () {
    world.character.playLimitedAnimation(world.character.IMAGES_HURT);
};

/** Plays the walking animation */
Character.prototype.playWalkAnimation = function () {
    world.character.playAnimation(world.character.IMAGES_WALKING);
};

/** Plays the sleeping animation */
Character.prototype.playSleepingAnimation = function () {
    world.character.playAnimation(world.character.IMAGES_SLEEPING);
};

/** Plays the standing animation */
Character.prototype.playStandAnimation = function () {
    world.character.playAnimation(world.character.IMAGES_STANDING);
};
