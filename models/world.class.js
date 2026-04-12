class World {
    character = new Character();
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    requestAnimation;
    statusbarHealth = new StatusbarHealth();
    statusbarCoin = new StatusBarCoin();
    statusbarBottle = new StatusBarBottle();
    statusbarHealthEndboss = new StatusbarHealthEndboss();
    winScreen = new Win();
    loseScreen = new Lose();
    throwableObject = [];
    bossCanTakeDmg = true;
    gameLost = false;
    gameWon = false;
    jumpedOnEnemy = false;
    collectedCoins = 0;
    collectedBottles = 0;
    throwCooldown = false;

    AUDIOS = []

    constructor(canvas, keyboard) {
        //speichert 2d Context Objekte in einer Klasse ab 
        this.ctx = canvas.getContext('2d');
        startLevel();
        this.level = level1;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.getAudios()
    };

    getAudios() {
        this.allCoinsCollected = new Audio('audio/coin_all_collected.mp3');
        this.coinCollected = new Audio('audio/coin_collected.mp3');
        this.salsaCollected = new Audio('audio/bottle_collected.mp3');

        this.AUDIOS = [
            this.allCoinsCollected,
            this.coinCollected,
            this.salsaCollected
        ];
    }

    canThrowBottles() {
        return this.keyboard.E && this.collectedBottles > 0 && !this.throwCooldown;
    };

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

    drawFixedObjects() {
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarHealthEndboss);
    };

    drawEndscreen() {
        if (this.gameLost) {
            this.addObjectsToMap(this.level.loseScreen);
        };
        if (this.gameWon) {
            this.addObjectsToMap(this.level.winScreen);
        };
    };

    setWorld() {
        this.character.world = this;
    };

    //Wird in constructor ausgeführt
    run() {
        this.character.createInterval(() => world.checkCollisions(), 1000 / 60);
        this.character.createInterval(() => world.checkThrowObjects(), 180);
        this.character.createInterval(() => world.checkCollectCoins(), 180);
        this.character.createInterval(() => world.checkCollectBottles(), 180);
    };

    generateBottle() {
        let bottle = new ThrowableObject(this.character.x, this.character.y, this);
        bottle.world = this;
        this.throwableObject.push(bottle);
        let intervalId = this.character.createInterval(() => this.checkBottleSplashed(bottle, intervalId))
    };

    checkBottleSplashed(bottle, intervalId) {
        if (bottle.isSplashed) {
            setTimeout(() => {
                this.throwableObject.splice(bottle, 1);
            }, 900);
            clearInterval(intervalId);
        }
    }

    setCoolDown() {
        this.throwCooldown = true;
        setTimeout(() => {
            this.throwCooldown = false;
        }, 2000);
    };





    updateInventory() {
        this.statusbarBottle.setPercentageOfBottles(
            this.collectedBottles,
            this.statusbarBottle.STATUSBAR_BOTTLE_IMAGES
        );
    };

    updateStatusbarCharacter() {
        this.statusbarHealth.setPercentage(
            this.character.energy,
            this.statusbarHealth.STATUS_HEALTH_IMAGES
        );
    };

    updateStatusbarEndboss() {
        this.statusbarHealthEndboss.setPercentage(
            this.level.endboss[0].energy,
            this.statusbarHealthEndboss.STATUS_HEALTH_ENDBOSS_IMAGES
        );
    };

    updateStatusbarCoin() {
        this.statusbarCoin.setPercentageOfCoins(
            this.collectedCoins,
            this.statusbarCoin.STATUSBAR_COIN_IMAGES
        );
    };

    updateStatusbarbottle() {
        this.statusbarBottle.setPercentageOfBottles(
            this.collectedBottles,
            this.statusbarBottle.STATUSBAR_BOTTLE_IMAGES
        );
    };





    //Wird von run() ausgeführt, läuft permanent
    checkCollisions() {
        this.collisionWithChicken();
        this.collisionWithBabyChicken();
        this.collisionWithEndboss();
    };

    checkThrowObjects() {
        if (this.canThrowBottles()) {
            this.collectedBottles -= 1;
            this.setCoolDown();
            this.updateInventory();
            this.generateBottle();
        };
    };

    collisionWithChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy, 40, 20, 20, 10)) {
                // evt kommt die If Abfrage raus wenn die toten enemys aus canvas verschwinden
                if (enemy.energy > 0) {
                    this.checkCollisionByJumpingOnEnemy(enemy, 20, 40, 10, 20, 18);
                    this.checkCollisionWithChicken(enemy);
                };
            };
            this.checkCollisionBottleWithEnemy(enemy, 40, 20, 20, 10);
        });
    };

    //ist fast gleich zum oberen
    collisionWithBabyChicken() {
        this.level.babyChicken.forEach((enemy) => {
            if (this.character.isColliding(enemy, 20, 20, 10, 10)) {
                // evt kommt die If Abfrage raus wenn die toten enemys aus canvas verschwinden
                if (enemy.energy > 0) {
                    this.checkCollisionByJumpingOnEnemy(enemy, 20, 20, 10, 10, 18);
                    this.checkCollisionWithChicken(enemy);
                };
            };
            this.checkCollisionBottleWithEnemy(enemy, 20, 20, 10, 10);
        });
    }

    collisionWithEndboss() {
        if (this.character.isColliding(this.level.endboss[0], 130, 100, 120, 60)) {
            this.character.hit(this.level.endboss[0], 40);
            this.updateStatusbarCharacter();
        };
        this.checkCollisionBottleWithEnemy(this.level.endboss[0], 70, 45, 60, 5);
    };

    checkCollisionByJumpingOnEnemy(enemy, w, h, wx, hy, jh) {
        if (this.character.characterIsJumpingOn(enemy, w, h, wx, hy) && this.character.canHitEnemys) {
            this.character.jump(jh);
            this.jumpedOnEnemy = true;
            enemy.energy = 0;
            enemy.AUDIOS.DEATH[0].play();
        };
    };

    checkCollisionWithChicken(enemy) {
        if (this.character.canHitEnemys) {
            this.character.hit(enemy, 20);
            resetSleepingTimer();
            this.updateStatusbarCharacter();
        };
    };

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

    hurtEndboss() {
        if (this.level.endboss[0].energy > 0) {
            this.level.endboss[0].energy -= 20;
            this.bossCanTakeDmg = false;
        }
        setTimeout(() => {
            this.bossCanTakeDmg = true;
        }, 2000);
    };

    killEnemy(enemy, t, h, w, hy, wx) {
        if (this.character.isCollidingByItem(enemy, t, h, w, hy, wx)) {
            enemy.energy = 0;
            enemy.AUDIOS.DEATH[0].play();
        };
    };

    checkCollectCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin, 110, 110, 55, 55)) {
                this.collectCoin(coin);
            };
        });
    };

    collectCoin(coin) {
        let index = this.level.coins.indexOf(coin)
        this.level.coins.splice(index, 1);
        this.collectedCoins += 1;
        this.updateStatusbarCoin();
        if (this.level.coins == 0) {
            this.AUDIOS[0].play();
        }else {
            this.AUDIOS[1].play();
        }
    };
    
    collectBottle(bottle) {
        let index = this.level.salsas.indexOf(bottle)
        this.level.salsas.splice(index, 1);
        this.collectedBottles += 1;
        this.updateStatusbarbottle();
        this.AUDIOS[2].play();
    };

    checkCollectBottles() {
        this.level.salsas.forEach((bottle) => {
            if (this.character.isColliding(bottle, 30, 60, 20, 30) && this.collectedBottles < 5) {
                this.collectBottle(bottle);
            };
        });
    };

    endGame(int) {
        if (int == 0) {
            this.gameLost = true;
        } else {
            this.gameWon = true;
        };
        DrawableObject.intervalArr.forEach(i => {
            clearInterval(i);
        });
        document.getElementById('start-button').disabled = true;
    };

    addObjectsToMap(object) {
        object.forEach(o => {
            this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            // o.drawFrame(this.ctx);
        });
    };

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

    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    };

    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    };
};