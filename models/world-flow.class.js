/** Starts the recurring game checks and background sounds */
World.prototype.run = function () {
    this.character.createInterval(() => world.checkCollisions(), 1000 / 60);
    this.character.createInterval(() => world.checkCollectCoins(), 1000 / 60);
    this.character.createInterval(() => world.checkCollectBottles(), 1000 / 60);
    this.character.createInterval(() => world.checkThrowObjects(), 180);
    playAudio(this.AUDIOS[5]);
    this.character.createTimeout(this.playBackgorundMusic, 15000)
};

/** Creates a throwable bottle and adds it to the world */
World.prototype.generateBottle = function () {
    let bottle = new ThrowableObject(this.character.x, this.character.y, this, this.character.otherDirection);
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
    if (this.gameEnded) return;
    this.gameEnded = true;
    this.setEndscreenState(int);
    this.playEndscreenAudio(int);
    this.clearEndGameTimers();
    document.getElementById('start-button').disabled = true;
};

/**
 * Sets the final game result
 * @param {number} result - 0 = game lost, any other value = game won
 */
World.prototype.setEndscreenState = function (result) {
    this.gameLost = result == 0;
    this.gameWon = result != 0;
};

/**
 * Plays the matching endscreen audio
 * @param {number} result - 0 = game lost, any other value = game won
 */
World.prototype.playEndscreenAudio = function (result) {
    if (result == 0) {
        this.playLoseAudio();
        return;
    };
    this.playWinAudio();
};

/** Plays lose sound and stops all background sounds */
World.prototype.playLoseAudio = function () {
    this.stopBackgroundSounds();
    playAudio(this.AUDIOS[4]);
};

/** Plays win sound and lowers the background music */
World.prototype.playWinAudio = function () {
    this.lowerBackgroundMusicForWin();
    playAudio(this.AUDIOS[3]);
};

/** Keeps background music audible but softer after winning */
World.prototype.lowerBackgroundMusicForWin = function () {
    setAudioVolume(this.backgroundMusic, WIN_BACKGROUND_MUSIC_VOLUME);
    playAudio(this.backgroundMusic);
};

/** Stops looping background sounds */
World.prototype.stopBackgroundSounds = function () {
    stopAudio(this.windAudio);
    stopAudio(this.backgroundMusic);
};

/** Clears active game intervals and timeouts after game end */
World.prototype.clearEndGameTimers = function () {
    DrawableObject.intervalArr.forEach(i => {
        clearInterval(i);
    });
    DrawableObject.timeoutArr.forEach(i => {
        clearTimeout(i);
    });
    DrawableObject.intervalArr = [];
    DrawableObject.timeoutArr = [];
};
