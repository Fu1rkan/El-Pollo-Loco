/**
 * Represents an object that can move, jump, collide, take damage and play animations
 */
class MovableObject extends DrawableObject {
    /**
     * Horizontal movement speed
     * @type {number}
     */
    speed;

    /**
     * Indicates whether the object is facing left
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * Vertical movement speed
     * @type {number}
     */
    speedY = 0;

    /**
     * Gravity acceleration value
     * @type {number}
     */
    acceleration = 1.5;

    /**
     * Current health energy
     * @type {number}
     */
    energy = 100;

    /**
     * Timestamp of the last hit
     * @type {number}
     */
    lastHit = 0;

    /**
     * Indicates whether the object can currently take damage
     * @type {boolean}
     */
    canTakeDamage = true;

    /**
     * Indicates whether the object can currently kill enemies
     * @type {boolean}
     */
    canKillEnemys = true;

    /**
     * Indicates whether the object can currently hit enemies
     * @type {boolean}
     */
    canHitEnemys = true;

    /**
     * Indicates whether the current animation reached its last image
     * @type {boolean}
     */
    animationIsDone = false;

    /**
     * Indicates whether the object can currently walk
     * @type {boolean}
     */
    canWalk = true;

    /**
     * Counter used for recoil movement
     * @type {number}
     */
    recoilIndex = 0;


    /**
     * Creates a movable object
     */
    constructor() {
        super();
    };

    /**
     * Starts applying gravity to the object
     */
    applyGravity() {
        this.createInterval(() => this.checkGravity(), 1000 / 25)
    };

    /**
     * Updates the vertical position based on gravity
     */
    checkGravity() {
        if (this.isAboutGround() || this.speedY > 1.5) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        };
    };

    /**
     * Checks whether the object is above its ground limit
     * @returns {boolean} - true = object is above ground limit, false = object is below it
     */
    isAboutGround() {
        if (this instanceof ThrowableObject) {
            return this.y <= 340;
        } else {
            return this.y <= 228;
        };
    };

    /**
     * Checks whether the object is standing on the ground
     * @returns {boolean} - true = object is on ground, false = object is in the air
     */
    isOnGround() {
        return this.y >= 228;
    };

    /**
     * Plays an endless animation from an image list
     * @param {string[]} images - Image paths used for the animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        if (i + 1 == images.length) {
            this.animationIsDone = true;
        } else {
            this.animationIsDone = false;
        };
    };

    /**
     * Plays an animation until the last image is reached
     * @param {string[]} images - Image paths used for the animation
     * @param {number} [id] - Interval id that should be cleared after the animation
     */
    playLimitedAnimation(images, id) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        if (i + 1 !== images.length) {
            this.currentImage++;
        };
        if (id && i + 1 === images.length) {
            clearInterval(id);
        };
    };

    /**
     * Moves the object to the right
     */
    moveRight() {
        this.x += this.speed;
    };

    /**
     * Moves the object to the left
     */
    moveLeft() {
        this.x -= this.speed;
    };

    /**
     * Makes the object jump with the given vertical speed
     * @param {number} speed - Vertical jump speed
     */
    jump(speed) {
        this.speedY = speed;
    };

    /**
     * Checks whether this object collides with another object
     * @param {DrawableObject} object - Object to check collision with
     * @param {number} h - Height offset
     * @param {number} w - Width offset
     * @param {number} hy - Y offset
     * @param {number} wx - X offset
     * @returns {boolean} - true = objects collide, false = objects do not collide
     */
    isColliding(object, h, w, hy, wx) {
        return this.x + 15 + this.width - 40 > object.x + wx &&
            this.x + 15 < object.x + wx + object.width - w &&
            this.y + 80 + this.height - 85 > object.y + hy &&
            this.y + 80 < object.y + hy + object.height - h;
    };

    /**
     * Checks whether the character lands on top of another object
     * @param {DrawableObject} object - Object to check
     * @param {number} w - Width offset
     * @param {number} h - Height offset
     * @param {number} wx - X offset
     * @param {number} hy - Y offset
     * @returns {boolean} - true = character jumps on object, false = no jump hit
     */
    characterIsJumpingOn(object, w, h, wx, hy) {
        return this.x + this.width - 40 > object.x + wx &&
            this.x + 15 < object.x + wx + object.width - w &&
            this.y + 80 + this.height - 85 > object.y + hy &&
            this.y + 80 + this.height - 85 < object.y + hy + object.height - h &&
            this.canTakeDamage;
    };

    /**
     * Checks whether an item collides with another object
     * @param {DrawableObject} object - Object to check collision with
     * @param {DrawableObject} item - Item that may collide
     * @param {number} h - Height offset
     * @param {number} w - Width offset
     * @param {number} hy - Y offset
     * @param {number} wx - X offset
     * @returns {boolean} - true = item collides, false = item does not collide
     */
    isCollidingByItem(object, item, h, w, hy, wx) {
        return item.x + 30 + item.width - 60 > object.x + wx &&
            item.x + 30 < object.x + wx + object.width - w &&
            item.y + 20 + item.height + 30 > object.y + hy &&
            item.y + 20 < object.y + hy + object.height - h;
    };

    /**
     * Checks a vertical jump collision
     * @returns {boolean} - true = jump collision detected, false = no jump collision
     */
    isCollidingByJump() {
        return this.y + this.height > object.y &&
            this.y < object.y + object.height;
    };

    /**
     * Applies damage and recoil to this object
     * @param {MovableObject} enemy - Enemy that caused the hit
     * @param {number} dmg - Damage amount
     */
    hit(enemy, dmg) {
        this.recoilToCharacter(enemy, dmg);
        this.resetDamageCooldown();
    };

    /**
     * Reduces energy and starts recoil movement
     * @param {MovableObject} enemy - Enemy that caused the recoil
     * @param {number} dmg - Damage amount
     */
    recoilToCharacter(enemy, dmg) {
        if (!this.isHurt()) {
            this.energy -= dmg;
            let intervalId = this.createInterval(() => this.activateRecoil(enemy, intervalId), 1000 / 60);
        };
    };

    /**
     * Moves the object away from the enemy for a short time
     * @param {MovableObject} enemy - Enemy that caused the recoil
     * @param {number} intervalId - Interval id of the recoil movement
     */
    activateRecoil(enemy, intervalId) {
        if (this.x > 0 && this.x < enemy.x) {
            this.x -= 3;
        } else if (this.x > 0 && this.x > enemy.x) {
            this.x += 3;
        };
        this.recoilIndex++;
        if (this.recoilIndex > 30) {
            clearInterval(intervalId);
            this.recoilIndex = 0;
        };
    };

    /**
     * Updates the damage cooldown timestamp and prevents negative energy
     */
    resetDamageCooldown() {
        if (this.energy < 0) {
            this.energy = 0;
        } else if (this.canTakeDamage) {
            this.lastHit = new Date().getTime();
        };
    };

    /**
     * Checks whether the object is currently hurt
     * @returns {boolean} - true = object is hurt, false = object is not hurt
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        this.checkDamageCooldown(timepassed);
        return timepassed < 0.5;
    };

    /**
     * Updates damage and walking permissions based on cooldown time
     * @param {number} timepassed - Seconds passed since the last hit
     */
    checkDamageCooldown(timepassed) {
        if (timepassed < 0.5) {
            this.canTakeDamage = false;
            this.canWalk = false;
        } else {
            this.canTakeDamage = true;
            this.canWalk = true;
        };
    };

    /**
     * Checks whether the object has no energy left
     * @returns {boolean} - true = object is dead, false = object is alive
     */
    isDead() {
        return this.energy == 0;
    };
};
