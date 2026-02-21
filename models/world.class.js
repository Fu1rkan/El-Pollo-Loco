class World {
    character = new Character();
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
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
    };

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);
        this.drawStaticObjects();
        this.ctx.translate(-this.cameraX, 0);

        this.drawFixedObjects();
        this.drawEndscreen();

        requestAnimationFrame(() => {
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
    }

    drawFixedObjects() {
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarHealthEndboss);
    }

    drawEndscreen() {
        if (this.gameLost) {
            this.addObjectsToMap(this.level.loseScreen);
        }
        if (this.gameWon) {
            this.addObjectsToMap(this.level.winScreen);
        }
    }

    setWorld() {
        this.character.world = this;
    };

    //Wird in constructor ausgeführt
    run() {
        this.character.createInterval(() => world.checkCollisions(), 1000 / 60)
        this.character.createInterval(() => world.checkThrowObjects(), 180)
        this.character.createInterval(() => world.checkCollectCoins(), 180)
        this.character.createInterval(() => world.checkCollectBottles(), 180)
    };

    canThrowBottles() {
        return this.keyboard.E && this.collectedBottles > 0 && !this.throwCooldown;
    }

    checkThrowObjects() {
        if (this.canThrowBottles()) {
            this.setCoolDown();
            this.updateInventory();
            this.generateBottle();
        };
    };

    generateBottle() {
        let bottle = new ThrowableObject(this.character.x, this.character.y, this);
        bottle.world = this;
        this.throwableObject.push(bottle);

        setTimeout(() => {
            this.throwableObject.splice(bottle, 1)
        }, 2000);
    }

    setCoolDown() {
        this.throwCooldown = true;
        setTimeout(() => {
            this.throwCooldown = false;
        }, 2000);
    };

    updateInventory() {
        this.collectedBottles -= 1;
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

    collisionWithChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                // evt kommt die If Abfrage raus wenn die toten enemys aus canvas verschwinden
                if (enemy.energy > 0) {
                    this.checkCollisionByJumpingOnEnemy(enemy, 20, 40, 10, 20);
                    this.checkCollisionWithChicken(enemy);
                };
            };
            this.checkCollisionBottleWithEnemy(enemy);
        });
    };
    
    //ist fast gleich zum oberen
    collisionWithBabyChicken() {
        this.level.babyChicken.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                // evt kommt die If Abfrage raus wenn die toten enemys aus canvas verschwinden
                if (enemy.energy > 0) {
                    this.checkCollisionByJumpingOnEnemy(enemy, 20, 20, 10, 10);
                    this.checkCollisionWithChicken(enemy);
                };
            };
            this.checkCollisionBottleWithEnemy(enemy);
        });
    }

    collisionWithEndboss() {
        if (this.character.isCollidingByBoss(this.level.endboss[0])) {
            this.character.hit(this.level.endboss[0]);
            this.statusbarHealth.setPercentage(
                this.character.energy,
                this.statusbarHealth.STATUS_HEALTH_IMAGES
            );
        };
    }

    checkCollisionByJumpingOnEnemy(enemy, w, h, wx, hy) {
        if (this.characterIsJumpingOn(enemy, w, h, wx, hy) && this.character.canHitEnemys) {
            this.character.jump(15);
            this.jumpedOnEnemy = true
            enemy.energy = 0;
        };
    }

    checkCollisionWithChicken(enemy) {
        if (this.character.canHitEnemys) {
            this.character.hit(enemy);
            resetSleepingTimer();
            this.statusbarHealth.setPercentage(
                this.character.energy,
                this.statusbarHealth.STATUS_HEALTH_IMAGES
            );
        };
    }

    checkCollisionBottleWithEnemy(enemy) {
        this.throwableObject.forEach(t => {
            if (this.character.isCollidingByItem(enemy, t)) {
                enemy.energy = 0;
            };
            if (this.character.bossIsCollidingByItem(this.level.endboss[0], t) && this.bossCanTakeDmg) {
                this.level.endboss[0].energy -= 20;
                if (this.level.endboss[0].energy > 0) {
                    this.bossCanTakeDmg = false;
                }
                setTimeout(() => {
                    this.bossCanTakeDmg = true;
                }, 2000);
                this.statusbarHealthEndboss.setPercentage(

                    this.level.endboss[0].energy,
                    this.statusbarHealthEndboss.STATUS_HEALTH_ENDBOSS_IMAGES
                );
            };
        });
    }

    checkCollectCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollidingToCoin(coin)) {
                let index = this.level.coins.indexOf(coin)
                this.level.coins.splice(index, 1);
                this.collectedCoins += 1;
                this.statusbarCoin.setPercentageOfCoins(
                    this.collectedCoins,
                    this.statusbarCoin.STATUSBAR_COIN_IMAGES
                );
            };
        });
    };

    checkCollectBottles() {
        this.level.salsas.forEach((salsa) => {
            if (this.character.isCollidingToBottle(salsa) && this.collectedBottles < 5) {
                let index = this.level.salsas.indexOf(salsa)
                this.level.salsas.splice(index, 1);
                this.collectedBottles += 1;
                this.statusbarBottle.setPercentageOfBottles(
                    this.collectedBottles,
                    this.statusbarBottle.STATUSBAR_BOTTLE_IMAGES
                );
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

    }

    characterIsJumpingOn(object, w, h, wx, hy) {
        return this.character.x + this.character.width - 40 > object.x + wx &&
            this.character.x + 15 < object.x + wx + object.width - w &&
            this.character.y + 80 + this.character.height - 85 > object.y + hy &&
            this.character.y + 80 + this.character.height - 85 < object.y + hy + object.height - h &&
            this.character.canTakeDamage;
    }

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
        object.x = object.x * -1
    };

    flipImageBack(object) {
        object.x = object.x * -1
        this.ctx.restore();
    };
};