/**
 * Makes the character jump and checks enemy touch protection
 * @param {number} speed - Vertical jump speed
 */
Character.prototype.jump = function (speed) {
    MovableObject.prototype.jump.call(this, speed);
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
Character.prototype.checkJumpingOnEnemies = function (enemies, h, w, hy, wx) {
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
Character.prototype.disableHitWhileTouchingEnemy = function (enemy, h, w, hy, wx) {
    if (!this.isColliding(enemy, h, w, hy, wx)) return;
    this.canHitEnemys = false;
    this.canKillEnemys = false;
    setTimeout(() => {
        this.canHitEnemys = true;
        this.canKillEnemys = true;
    }, 100);
};

/** Starts the movement and camera loop */
Character.prototype.moveCamera = function () {
    this.createInterval(this.checkMovement, 1000 / 60);
};

/** Checks keyboard input and moves the character */
Character.prototype.checkMovement = function () {
    if (world.character.isMovingRight()) {
        world.character.otherDirection = false;
        world.character.moveRight();
    };
    if (world.character.isMovingLeft()) {
        world.character.otherDirection = true;
        world.character.moveLeft();
    };
    world.character.jumpIfNeeded();
    world.cameraX = -world.character.x + 100;
};

/** Makes the character jump if the current input allows it */
Character.prototype.jumpIfNeeded = function () {
    if (world.character.isJumping()) {
        world.character.jump(21);
    };
};

/**
 * Checks whether the character can move right
 * @returns {boolean} - true = character can move right, false = character cannot move right
 */
Character.prototype.isMovingRight = function () {
    return world.keyboard.RIGHT == true && world.character.x < world.level.levelEndX && world.character.canWalk;
};

/**
 * Checks whether the character can move left
 * @returns {boolean} - true = character can move left, false = character cannot move left
 */
Character.prototype.isMovingLeft = function () {
    return world.keyboard.LEFT == true && world.character.x > 0 && world.character.canWalk;
};

/**
 * Checks whether the character can jump
 * @returns {boolean} - true = character can jump, false = character cannot jump
 */
Character.prototype.isJumping = function () {
    return world.keyboard.UP == true && world.character.isOnGround() ||
        world.keyboard.SPACE == true && world.character.isOnGround();
};
