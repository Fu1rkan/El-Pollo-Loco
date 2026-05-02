/** Checks all relevant collisions in the world */
World.prototype.checkCollisions = function () {
    this.checkCollisionWithEnemies(this.level.enemies, 40, 20, 20, 10, 20, 40, 10, 20);
    this.checkCollisionWithEnemies(this.level.babyChicken, 20, 20, 10, 10, 20, 20, 10, 10);
    this.collisionWithEndboss();
};

/**
 * Checks collisions between the character, bottles and enemies
 * @param {MovableObject[]} enemies - Enemies to check
 * @param {number} h - Height offset for normal collision
 * @param {number} w - Width offset for normal collision
 * @param {number} hy - Y offset for normal collision
 * @param {number} wx - X offset for normal collision
 * @param {number} jumpW - Width offset for jumping collision
 * @param {number} jumpH - Height offset for jumping collision
 * @param {number} jumpWx - X offset for jumping collision
 * @param {number} jumpHy - Y offset for jumping collision
 */
World.prototype.checkCollisionWithEnemies = function (enemies, h, w, hy, wx, jumpW, jumpH, jumpWx, jumpHy) {
    enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy, h, w, hy, wx) && enemy.energy > 0) {
            this.checkCollisionByJumpingOnEnemy(enemy, jumpW, jumpH, jumpWx, jumpHy, 18);
            this.checkCollisionWithEnemy(enemy);
        };
        this.checkCollisionBottleWithEnemy(enemy, h, w, hy, wx);
    });
};

/** Checks collisions between the character, bottles and the endboss */
World.prototype.collisionWithEndboss = function () {
    let endboss = this.level.endboss[0];
    if (this.character.isColliding(endboss, 130, 100, 120, 60) && endboss.canAttackCharacter()) {
        this.character.hit(endboss, 40);
        endboss.startAttackCooldown();
        resetSleepingTimer();
        this.updateStatusbarCharacter();
    };
    this.checkCollisionBottleWithEnemy(endboss, 70, 45, 60, 5);
};

/**
 * Checks whether the character jumped on an enemy
 * @param {MovableObject} enemy - Enemy to check
 * @param {number} w - Width offset for jumping collision
 * @param {number} h - Height offset for jumping collision
 * @param {number} wx - X offset for jumping collision
 * @param {number} hy - Y offset for jumping collision
 * @param {number} jh - Jump height after hitting the enemy
 */
World.prototype.checkCollisionByJumpingOnEnemy = function (enemy, w, h, wx, hy, jh) {
    if (this.character.characterIsJumpingOn(enemy, w, h, wx, hy) && this.character.canHitEnemys) {
        this.character.jump(jh);
        this.jumpedOnEnemy = true;
        enemy.energy = 0;
        playPooledAudio(enemy.AUDIOS.DEATH[0], 1, 2);
    };
};

/**
 * Damages the character after colliding with an enemy
 * @param {MovableObject} enemy - Enemy that collided with the character
 */
World.prototype.checkCollisionWithEnemy = function (enemy) {
    if (this.character.canHitEnemys) {
        this.character.hit(enemy, 20);
        resetSleepingTimer();
        this.updateStatusbarCharacter();
    };
};

/**
 * Checks whether a thrown bottle hit an enemy
 * @param {MovableObject} enemy - Enemy to check
 * @param {number} h - Height offset for bottle collision
 * @param {number} w - Width offset for bottle collision
 * @param {number} hy - Y offset for bottle collision
 * @param {number} wx - X offset for bottle collision
 */
World.prototype.checkCollisionBottleWithEnemy = function (enemy, h, w, hy, wx) {
    this.throwableObject.forEach(t => {
        if (enemy == world.level.endboss[0]) {
            if (this.character.isCollidingByItem(this.level.endboss[0], t, 70, 45, 60, 5) && this.bossCanTakeDmg) {
                this.hurtEndboss();
                this.updateStatusbarEndboss();
            }
        } else {
            this.killEnemy(enemy, t, h, w, hy, wx);
        };
    });
};

/** Reduces endboss health and starts its damage cooldown */
World.prototype.hurtEndboss = function () {
    let endboss = this.level.endboss[0];
    if (endboss.energy > 0) {
        endboss.energy -= 20;
        endboss.startHurtAnimation();
        this.bossCanTakeDmg = false;
    }
    endboss.createTimeout(() => {
        this.bossCanTakeDmg = true;
    }, endboss.bottleDamageCooldown);
};

/**
 * Kills an enemy when it is hit by a bottle
 * @param {MovableObject} enemy - Enemy to kill
 * @param {ThrowableObject} t - Thrown bottle
 * @param {number} h - Height offset for bottle collision
 * @param {number} w - Width offset for bottle collision
 * @param {number} hy - Y offset for bottle collision
 * @param {number} wx - X offset for bottle collision
 */
World.prototype.killEnemy = function (enemy, t, h, w, hy, wx) {
    if (this.character.isCollidingByItem(enemy, t, h, w, hy, wx) && enemy.energy > 0) {
        enemy.energy = 0;
        playPooledAudio(enemy.AUDIOS.DEATH[0], 1, 2);
    };
};
