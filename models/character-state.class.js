/**
 * Checks whether the character is walking
 * @returns {boolean} - true = character is walking, false = character is not walking
 */
Character.prototype.isWalking = function () {
    return this.world.keyboard.RIGHT == true || this.world.keyboard.LEFT == true;
};

/**
 * Checks whether the character is sleeping
 * @returns {boolean} - true = character is sleeping, false = character is active
 */
Character.prototype.isSleeping = function () {
    return this.world.keyboard.ACTIVE == false;
};

/**
 * Checks whether the hurt animation should stop
 * @returns {boolean} - true = animation should stop, false = animation should continue
 */
Character.prototype.isNotHurtAnymore = function () {
    return !world.character.isHurt() || world.character.isDead();
};

/**
 * Checks whether the walking animation should stop
 * @returns {boolean} - true = animation should stop, false = animation should continue
 */
Character.prototype.isNotWalkingAnymore = function () {
    return !world.character.isWalking() || world.character.isHurt() || world.character.isAboutGround() || world.character.isDead() || world.character.x == 0 || world.character.x >= 4200;
};

/**
 * Checks whether the sleeping animation should stop
 * @returns {boolean} - true = animation should stop, false = animation should continue
 */
Character.prototype.isNotSleepingAnymore = function () {
    return !world.character.isSleeping() || world.character.isDead() || world.character.isHurt() || world.character.isAboutGround() || world.character.isWalking();
};

/**
 * Checks whether the standing animation should stop
 * @returns {boolean} - true = animation should stop, false = animation should continue
 */
Character.prototype.isNotStandingAnymore = function () {
    return world.character.isDead() ||
        world.character.isHurt() ||
        world.character.isAboutGround() ||
        world.character.isWalking() && world.character.x <= 4199 && world.character.x !== 0 ||
        world.character.isSleeping();
};

/**
 * Checks whether the character is inside the walking borders
 * @returns {boolean} - true = character is inside borders, false = character touches a border
 */
Character.prototype.isNotTouchingTheBorder = function () {
    return world.character.x <= 4199 && world.character.x !== 0;
};

/**
 * Checks whether the jump animation should stop
 * @returns {boolean} - true = animation should stop, false = animation should continue
 */
Character.prototype.isNotJumpingAnymore = function () {
    return !world.character.isAboutGround() || world.character.isHurt() || world.character.isDead() || world.character.world.jumpedOnEnemy;
};
