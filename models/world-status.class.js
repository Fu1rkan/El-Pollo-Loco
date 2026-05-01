/** Updates the bottle inventory statusbar */
World.prototype.updateInventory = function () {
    this.statusbarBottle.setPercentageOfBottles(
        this.collectedBottles,
        this.statusbarBottle.STATUSBAR_BOTTLE_IMAGES
    );
};

/** Updates the character health statusbar */
World.prototype.updateStatusbarCharacter = function () {
    this.statusbarHealth.setPercentage(
        this.character.energy,
        this.statusbarHealth.STATUS_HEALTH_IMAGES
    );
};

/** Updates the endboss health statusbar */
World.prototype.updateStatusbarEndboss = function () {
    this.statusbarHealthEndboss.setPercentage(
        this.level.endboss[0].energy,
        this.statusbarHealthEndboss.STATUS_HEALTH_ENDBOSS_IMAGES
    );
};

/** Updates the coin statusbar */
World.prototype.updateStatusbarCoin = function () {
    this.statusbarCoin.setPercentageOfCoins(
        this.collectedCoins,
        this.statusbarCoin.STATUSBAR_COIN_IMAGES
    );
};

/** Checks whether the character collects a coin */
World.prototype.checkCollectCoins = function () {
    this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin, 110, 110, 55, 55)) {
            this.collectCoin(coin);
        };
    });
};

/**
 * Collects a coin and updates the coin statusbar
 * @param {Coin} coin - Coin to collect
 */
World.prototype.collectCoin = function (coin) {
    let index = this.level.coins.indexOf(coin)
    this.level.coins.splice(index, 1);
    this.collectedCoins += 1;
    this.updateStatusbarCoin();
    if (this.level.coins == 0) {
        this.AUDIOS[0].play();
    } else {
        let sound = this.AUDIOS[1].cloneNode(true);
        sound.muted = isMuted;
        sound.play();
    }
};

/**
 * Collects a bottle and updates the bottle inventory
 * @param {Salsa} bottle - Bottle to collect
 */
World.prototype.collectBottle = function (bottle) {
    let index = this.level.salsas.indexOf(bottle)
    this.level.salsas.splice(index, 1);
    this.collectedBottles += 1;
    this.updateInventory();
    this.AUDIOS[2].play();
};

/** Checks whether the character collects a bottle */
World.prototype.checkCollectBottles = function () {
    this.level.salsas.forEach((bottle) => {
        if (this.character.isColliding(bottle, 30, 60, 20, 30) && this.collectedBottles < 5) {
            this.collectBottle(bottle);
        };
    });
};
