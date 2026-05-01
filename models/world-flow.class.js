/** Starts the recurring game checks and background sounds */
World.prototype.run = function () {
    this.character.createInterval(() => world.checkCollisions(), 1000 / 60);
    this.character.createInterval(() => world.checkCollectCoins(), 180);
    this.character.createInterval(() => world.checkCollectBottles(), 180);
    this.character.createInterval(() => world.checkThrowObjects(), 180);
    this.AUDIOS[5].play();
    this.character.createTimeout(this.playBackgorundMusic, 15000)
};

/** Creates a throwable bottle and adds it to the world */
World.prototype.generateBottle = function () {
    let bottle = new ThrowableObject(this.character.x, this.character.y, this);
    bottle.world = this;
    this.throwableObject.push(bottle);
    let intervalId = this.character.createInterval(() => this.checkBottleSplashed(bottle, intervalId))
};

/**
 * Checks whether a bottle has splashed and removes it afterwards
 * @param {ThrowableObject} bottle - Bottle to check
 * @param {number} intervalId - Interval id of the splash check
 */
World.prototype.checkBottleSplashed = function (bottle, intervalId) {
    if (bottle.isSplashed) {
        setTimeout(() => {
            this.throwableObject.splice(bottle, 1);
        }, 900);
        clearInterval(intervalId);
    }
};

/** Activates the bottle throw cooldown */
World.prototype.setCoolDown = function () {
    this.throwCooldown = true;
    setTimeout(() => {
        this.throwCooldown = false;
    }, 2000);
};

/** Checks whether the character can throw a bottle */
World.prototype.checkThrowObjects = function () {
    if (!this.keyboard.THROW) return;
    if (this.canThrowBottles()) {
        this.throwBottle();
    };
    this.keyboard.THROW = false;
};

/** Throws one bottle and updates inventory and cooldown */
World.prototype.throwBottle = function () {
    this.collectedBottles -= 1;
    this.setCoolDown();
    this.updateInventory();
    this.generateBottle();
};

/**
 * Checks whether the character can throw a bottle
 * @returns {boolean} - true = character can throw, false = character cannot throw
 */
World.prototype.canThrowBottles = function () {
    return this.collectedBottles > 0 && !this.throwCooldown;
};

/**
 * Ends the game and shows the matching endscreen
 * @param {number} int - 0 = game lost, any other value = game won
 */
World.prototype.endGame = function (int) {
    if (int == 0) {
        this.gameLost = true;
        this.AUDIOS[4].play();
    } else {
        this.gameWon = true;
        this.AUDIOS[3].play();
    };
    DrawableObject.intervalArr.forEach(i => {
        clearInterval(i);
    });
    document.getElementById('start-button').disabled = true;
};
