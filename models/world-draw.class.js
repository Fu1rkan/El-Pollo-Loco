/** Clears and redraws the complete game world */
World.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.drawStaticObjects();
    this.ctx.translate(-this.cameraX, 0);
    this.drawFixedObjects();
    this.drawEndscreen();
    this.requestAnimation = requestAnimationFrame(() => this.draw());
};

/** Connects the character with the current world instance */
World.prototype.setWorld = function () {
    this.character.world = this;
};

/** Draws all camera moving game objects */
World.prototype.drawStaticObjects = function () {
    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.salsas);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.babyChicken);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObject);
    this.addToMap(this.character);
};

/** Draws fixed screen elements like statusbars */
World.prototype.drawFixedObjects = function () {
    this.updateStatusbarPositions();
    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarCoin);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarHealthEndboss);
};

/** Updates statusbar positions for normal and compact canvas layouts */
World.prototype.updateStatusbarPositions = function () {
    let compactOffsetY = isCompactCanvasMode() ? 40 : 0;
    this.statusbarHealth.y = 5 + compactOffsetY;
    this.statusbarBottle.y = 35 + compactOffsetY;
    this.statusbarCoin.y = 65 + compactOffsetY;
    this.statusbarHealthEndboss.y = 5 + compactOffsetY;
};

/** Draws the win or lose screen when the game has ended */
World.prototype.drawEndscreen = function () {
    if (this.gameLost) {
        this.addObjectsToMap(this.level.loseScreen);
    } else if (this.gameWon) {
        this.addObjectsToMap(this.level.winScreen);
    };
};

/**
 * Draws multiple objects on the canvas
 * @param {DrawableObject[]} object - Objects to draw
 */
World.prototype.addObjectsToMap = function (object) {
    object.forEach(o => {
        this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
        // o.drawFrame(this.ctx);
    });
};

/**
 * Draws a single object on the canvas
 * @param {DrawableObject} object - Object to draw
 */
World.prototype.addToMap = function (object) {
    if (object.otherDirection) {
        this.flipImage(object);
    };
    object.draw(this.ctx);
    // object.drawFrame(this.ctx);
    if (object.otherDirection) {
        this.flipImageBack(object);
    };
};

/**
 * Flips an object horizontally before drawing
 * @param {DrawableObject} object - Object to flip
 */
World.prototype.flipImage = function (object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
};

/**
 * Restores an object after horizontal flipping
 * @param {DrawableObject} object - Object to restore
 */
World.prototype.flipImageBack = function (object) {
    object.x = object.x * -1;
    this.ctx.restore();
};
