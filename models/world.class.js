/**
 * Represents the game world and manages drawing, collisions, audio and game state
 */
class World {
    /**
     * Main playable character
     * @type {Character}
     */
    character = new Character();

    /**
     * Canvas element used to render the game
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * 2D rendering context of the canvas
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * Keyboard input handler
     * @type {Keyboard}
     */
    keyboard;

    /**
     * Horizontal camera offset
     * @type {number}
     */
    cameraX = 0;

    /**
     * Current animation frame request id
     * @type {number}
     */
    requestAnimation;

    /**
     * Health statusbar of the character
     * @type {StatusbarHealth}
     */
    statusbarHealth = new StatusbarHealth();

    /**
     * Coin statusbar
     * @type {StatusBarCoin}
     */
    statusbarCoin = new StatusBarCoin();

    /**
     * Bottle statusbar
     * @type {StatusBarBottle}
     */
    statusbarBottle = new StatusBarBottle();

    /**
     * Health statusbar of the endboss
     * @type {StatusbarHealthEndboss}
     */
    statusbarHealthEndboss = new StatusbarHealthEndboss();

    /**
     * Current game level
     * @type {Level}
     */
    level;

    /**
     * Active throwable bottles
     * @type {ThrowableObject[]}
     */
    throwableObject = [];

    /**
     * Indicates whether the endboss can currently take damage
     * @type {boolean}
     */
    bossCanTakeDmg = true;

    /**
     * Indicates whether the game is lost
     * @type {boolean}
     */
    gameLost = false;

    /**
     * Indicates whether the game is won
     * @type {boolean}
     */
    gameWon = false;

    /**
     * Amount of collected coins
     * @type {number}
     */
    collectedCoins = 0;

    /**
     * Amount of collected bottles
     * @type {number}
     */
    collectedBottles = 0;

    /**
     * Indicates whether the character jumped on an enemy
     * @type {boolean}
     */
    jumpedOnEnemy = false;

    /**
     * Indicates whether throwing bottles is on cooldown
     * @type {boolean}
     */
    throwCooldown = false;

    /**
     * Collects all world related audios
     * @type {HTMLAudioElement[]}
     */
    AUDIOS = [];

    /**
     * Creates the world, initializes the level and starts drawing and game checks
     * @param {HTMLCanvasElement} canvas - Canvas element used for rendering
     * @param {Keyboard} keyboard - Keyboard input handler
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        startLevel();
        this.level = level1;
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.draw();
        this.setWorld();
        this.getAudios()
        this.run();
    };

    /**
     * Clears and redraws the complete game world
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);
        this.drawStaticObjects();
        this.ctx.translate(-this.cameraX, 0);

        this.drawFixedObjects();
        this.drawEndscreen();

        this.requestAnimation = requestAnimationFrame(() => {
            this.draw();
        });
    };

    /**
     * Connects the character with the current world instance
     */
    setWorld() {
        this.character.world = this;
    };

    /**
     * Draws all camera moving game objects
     */
    drawStaticObjects() {
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

    /**
     * Draws fixed screen elements like statusbars
     */
    drawFixedObjects() {
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarHealthEndboss);
    };

    /**
     * Draws the win or lose screen when the game has ended
     */
    drawEndscreen() {
        if (this.gameLost) {
            this.addObjectsToMap(this.level.loseScreen);
        };
        if (this.gameWon) {
            this.addObjectsToMap(this.level.winScreen);
        };
    };

    /**
     * Draws multiple objects on the canvas
     * @param {DrawableObject[]} object - Objects to draw
     */
    addObjectsToMap(object) {
        object.forEach(o => {
            this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            // o.drawFrame(this.ctx);
        });
    };

    /**
     * Draws a single object on the canvas
     * @param {DrawableObject} object - Object to draw
     */
    addToMap(object) {
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
     * Initializes all world related audios
     */
    getAudios() {
        this.createAudios();
        this.AUDIOS = this.getAudioArray();
        this.muteAudios();
        this.addAudiosToGlobalArray();
    };

    /**
     * Creates all audio objects used by the world
     */
    createAudios() {
        this.allCoinsCollected = new Audio('audio/coin_all_collected.mp3');
        this.coinCollected = new Audio('audio/coin_collected.mp3');
        this.salsaCollected = new Audio('audio/bottle_collected.mp3');
        this.gameWonSound = new Audio('audio/game_win.mp3');
        this.gameLostSound = new Audio('audio/game_over.mp3');
        this.windAudio = new Audio('audio/wind.mp3');
        this.backgroundMusic = new Audio('audio/desert_storm_northside.mp3');
    };

    /**
     * Gets all world related audios in their playback order
     * @returns {HTMLAudioElement[]} - World audio elements
     */
    getAudioArray() {
        return [
            this.allCoinsCollected,
            this.coinCollected,
            this.salsaCollected,
            this.gameWonSound,
            this.gameLostSound,
            this.windAudio,
            this.backgroundMusic
        ];
    };

    /**
     * Applies the current mute status to all world audios
     */
    muteAudios() {
        this.AUDIOS.forEach((audio) => {
            audio.muted = isMuted;
        });
    };

    /**
     * Adds all world audios to the global audio collection
     */
    addAudiosToGlobalArray() {
        this.AUDIOS.forEach((audio) => {
            allAudios.push(audio);
        });
    };

    /**
     * Starts the recurring game checks and background sounds
     */
    run() {
        this.character.createInterval(() => world.checkCollisions(), 1000 / 60);
        this.character.createInterval(() => world.checkThrowObjects(), 180);
        this.character.createInterval(() => world.checkCollectCoins(), 180);
        this.character.createInterval(() => world.checkCollectBottles(), 180);
        this.AUDIOS[5].play();
        this.character.createTimeout(this.playBackgorundMusic, 15000)
    };

    /**
     * Plays the background music
     */
    playBackgorundMusic() {
        world.AUDIOS[6].play();
    }

    /**
     * Creates a throwable bottle and adds it to the world
     */
    generateBottle() {
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
    checkBottleSplashed(bottle, intervalId) {
        if (bottle.isSplashed) {
            setTimeout(() => {
                this.throwableObject.splice(bottle, 1);
            }, 900);
            clearInterval(intervalId);
        }
    }

    /**
     * Activates the bottle throw cooldown
     */
    setCoolDown() {
        this.throwCooldown = true;
        setTimeout(() => {
            this.throwCooldown = false;
        }, 2000);
    };

    /**
     * Updates the bottle inventory statusbar
     */
    updateInventory() {
        this.statusbarBottle.setPercentageOfBottles(
            this.collectedBottles,
            this.statusbarBottle.STATUSBAR_BOTTLE_IMAGES
        );
    };

    /**
     * Updates the character health statusbar
     */
    updateStatusbarCharacter() {
        this.statusbarHealth.setPercentage(
            this.character.energy,
            this.statusbarHealth.STATUS_HEALTH_IMAGES
        );
    };

    /**
     * Updates the endboss health statusbar
     */
    updateStatusbarEndboss() {
        this.statusbarHealthEndboss.setPercentage(
            this.level.endboss[0].energy,
            this.statusbarHealthEndboss.STATUS_HEALTH_ENDBOSS_IMAGES
        );
    };

    /**
     * Updates the coin statusbar
     */
    updateStatusbarCoin() {
        this.statusbarCoin.setPercentageOfCoins(
            this.collectedCoins,
            this.statusbarCoin.STATUSBAR_COIN_IMAGES
        );
    };

    /**
     * Checks all relevant collisions in the world
     */
    checkCollisions() {
        this.checkCollisionWithEnemies(this.level.enemies, 40, 20, 20, 10, 20, 40, 10, 20);
        this.checkCollisionWithEnemies(this.level.babyChicken, 20, 20, 10, 10, 20, 20, 10, 10);
        this.collisionWithEndboss();
    };

    /**
     * Checks whether the character can throw a bottle
     */
    checkThrowObjects() {
        if (this.canThrowBottles()) {
            this.collectedBottles -= 1;
            this.setCoolDown();
            this.updateInventory();
            this.generateBottle();
        };
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
    checkCollisionWithEnemies(enemies, h, w, hy, wx, jumpW, jumpH, jumpWx, jumpHy) {
        enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy, h, w, hy, wx) && enemy.energy > 0) {
                this.checkCollisionByJumpingOnEnemy(enemy, jumpW, jumpH, jumpWx, jumpHy, 18);
                this.checkCollisionWithEnemy(enemy);
            };
            this.checkCollisionBottleWithEnemy(enemy, h, w, hy, wx);
        });
    };

    /**
     * Checks collisions between the character, bottles and the endboss
     */
    collisionWithEndboss() {
        if (this.character.isColliding(this.level.endboss[0], 130, 100, 120, 60)) {
            this.character.hit(this.level.endboss[0], 40);
            this.updateStatusbarCharacter();
        };
        this.checkCollisionBottleWithEnemy(this.level.endboss[0], 70, 45, 60, 5);
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
    checkCollisionByJumpingOnEnemy(enemy, w, h, wx, hy, jh) {
        if (this.character.characterIsJumpingOn(enemy, w, h, wx, hy) && this.character.canHitEnemys) {
            this.character.jump(jh);
            this.jumpedOnEnemy = true;
            enemy.energy = 0;
            enemy.AUDIOS.DEATH[0].play();
        };
    };

    /**
     * Damages the character after colliding with an enemy
     * @param {MovableObject} enemy - Enemy that collided with the character
     */
    checkCollisionWithEnemy(enemy) {
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
    checkCollisionBottleWithEnemy(enemy, h, w, hy, wx) {
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

    /**
     * Reduces endboss health and starts its damage cooldown
     */
    hurtEndboss() {
        if (this.level.endboss[0].energy > 0) {
            this.level.endboss[0].energy -= 20;
            this.bossCanTakeDmg = false;
        }
        setTimeout(() => {
            this.bossCanTakeDmg = true;
        }, 2000);
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
    killEnemy(enemy, t, h, w, hy, wx) {
        if (this.character.isCollidingByItem(enemy, t, h, w, hy, wx) && enemy.energy > 0) {
            enemy.energy = 0;
            enemy.AUDIOS.DEATH[0].play();
        };
    };

    /**
     * Checks whether the character collects a coin
     */
    checkCollectCoins() {
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
    collectCoin(coin) {
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
    collectBottle(bottle) {
        let index = this.level.salsas.indexOf(bottle)
        this.level.salsas.splice(index, 1);
        this.collectedBottles += 1;
        this.updateInventory();
        this.AUDIOS[2].play();
    };

    /**
     * Checks whether the character collects a bottle
     */
    checkCollectBottles() {
        this.level.salsas.forEach((bottle) => {
            if (this.character.isColliding(bottle, 30, 60, 20, 30) && this.collectedBottles < 5) {
                this.collectBottle(bottle);
            };
        });
    };

    /**
     * Ends the game and shows the matching endscreen
     * @param {number} int - 0 = game lost, any other value = game won
     */
    endGame(int) {
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


    /**
     * Flips an object horizontally before drawing
     * @param {DrawableObject} object - Object to flip
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    };

    /**
     * Restores an object after horizontal flipping
     * @param {DrawableObject} object - Object to restore
     */
    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    };

    /**
     * Checks whether the character can throw a bottle
     * @returns {boolean} - true = character can throw, false = character cannot throw
     */
    canThrowBottles() {
        return this.keyboard.E && this.collectedBottles > 0 && !this.throwCooldown;
    };
};
