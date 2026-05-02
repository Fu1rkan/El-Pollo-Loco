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
    let compactOffsetY = shouldLowerStatusbars() ? 55 : 0;
    this.statusbarHealth.y = 5 + compactOffsetY;
    this.statusbarBottle.y = 35 + compactOffsetY;
    this.statusbarCoin.y = 65 + compactOffsetY;
    this.statusbarHealthEndboss.y = 5 + compactOffsetY;
};

/** Draws the win or lose screen when the game has ended */
World.prototype.drawEndscreen = function () {
    if (this.gameLost) {
        this.addObjectsToMap(this.level.loseScreen);
        this.drawEndscreenActionButton();
    } else if (this.gameWon) {
        this.addObjectsToMap(this.level.winScreen);
        this.drawEndscreenActionButton();
    };
};

/** Draws the action button below the active endscreen image */
World.prototype.drawEndscreenActionButton = function () {
    this.updateEndscreenActionButtonImage();
    this.updateEndscreenActionButtonScale();
    this.updateEndscreenActionButtonPosition();
    this.addToMap(this.endscreenActionButton);
};

/** Updates the action button image for win and lose screens */
World.prototype.updateEndscreenActionButtonImage = function () {
    let imagePath = this.getEndscreenActionButtonImagePath();
    this.endscreenActionButton.img = this.endscreenActionButton.imageCache[imagePath];
};

/**
 * Gets the matching action button image path
 * @returns {string} Restart image on lose, home image on win
 */
World.prototype.getEndscreenActionButtonImagePath = function () {
    return this.gameLost ? 'img/buttons/restart_button.png' : 'img/buttons/home_button.png';
};

/** Updates the action button scale during its 250ms transition */
World.prototype.updateEndscreenActionButtonScale = function () {
    let elapsed = Date.now() - this.endscreenActionButtonTransitionStart;
    let progress = Math.min(1, elapsed / this.endscreenActionButtonTransitionDuration);
    let scaleDistance = this.endscreenActionButtonTargetScale - this.endscreenActionButtonStartScale;
    this.endscreenActionButtonScale = this.endscreenActionButtonStartScale + scaleDistance * progress;
};

/** Updates the action button position and size inside the canvas */
World.prototype.updateEndscreenActionButtonPosition = function () {
    let endscreen = this.getActiveEndscreen();
    let baseWidth = Math.max(96, Math.min(128, this.canvas.width * 0.17));
    let baseHeight = baseWidth * this.getEndscreenActionButtonRatio();
    this.endscreenActionButton.width = baseWidth * this.endscreenActionButtonScale;
    this.endscreenActionButton.height = baseHeight * this.endscreenActionButtonScale;
    this.endscreenActionButton.x = (this.canvas.width - this.endscreenActionButton.width) / 2;
    this.endscreenActionButton.y = Math.min(
        this.canvas.height - baseHeight - 18,
        endscreen.y + endscreen.height + 6
    ) - ((this.endscreenActionButton.height - baseHeight) / 2);
};

/**
 * Gets the matching image aspect ratio for the current action button
 * @returns {number} Height divided by width
 */
World.prototype.getEndscreenActionButtonRatio = function () {
    return this.gameLost ? 382 / 898 : 540 / 870;
};

/**
 * Gets the currently visible endscreen object
 * @returns {DrawableObject} Active win or lose screen
 */
World.prototype.getActiveEndscreen = function () {
    return this.gameLost ? this.level.loseScreen[0] : this.level.winScreen[0];
};

/**
 * Checks if a pointer event hits the endscreen action button
 * @param {PointerEvent} event - Pointer event on the canvas
 * @returns {boolean} - true = button was hit, false = outside
 */
World.prototype.isEndscreenActionButtonHit = function (event) {
    if (!this.gameEnded) return false;
    this.updateEndscreenActionButtonScale();
    this.updateEndscreenActionButtonPosition();
    let position = this.getCanvasPointerPosition(event);
    return this.isInsideEndscreenActionButton(position.x, position.y);
};

/**
 * Updates the endscreen action button hover state
 * @param {PointerEvent} event - Pointer event on the canvas
 */
World.prototype.updateEndscreenActionButtonHover = function (event) {
    if (!this.gameEnded) {
        this.setEndscreenActionButtonHover(false);
        return;
    };
    this.updateEndscreenActionButtonScale();
    this.updateEndscreenActionButtonPosition();
    let position = this.getCanvasPointerPosition(event);
    this.setEndscreenActionButtonHover(this.isInsideEndscreenActionButton(position.x, position.y));
};

/**
 * Starts a 250ms transition when the endscreen action button hover state changes
 * @param {boolean} isHovered - true = hovered, false = normal
 */
World.prototype.setEndscreenActionButtonHover = function (isHovered) {
    let targetScale = isHovered ? 1.06 : 1;
    if (targetScale == this.endscreenActionButtonTargetScale) return;
    this.updateEndscreenActionButtonScale();
    this.endscreenActionButtonStartScale = this.endscreenActionButtonScale;
    this.endscreenActionButtonTargetScale = targetScale;
    this.endscreenActionButtonTransitionStart = Date.now();
};

/**
 * Converts a browser pointer position into canvas coordinates
 * @param {PointerEvent} event - Pointer event on the canvas
 * @returns {{x: number, y: number}} Canvas position
 */
World.prototype.getCanvasPointerPosition = function (event) {
    let rect = this.canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) * (this.canvas.width / rect.width),
        y: (event.clientY - rect.top) * (this.canvas.height / rect.height)
    };
};

/**
 * Checks if a canvas coordinate is inside the endscreen action button
 * @param {number} x - Canvas x position
 * @param {number} y - Canvas y position
 * @returns {boolean} - true = inside button, false = outside button
 */
World.prototype.isInsideEndscreenActionButton = function (x, y) {
    let button = this.endscreenActionButton;
    return x >= button.x && x <= button.x + button.width &&
        y >= button.y && y <= button.y + button.height;
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
