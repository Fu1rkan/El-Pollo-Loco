class World {
    character = new Character();
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoin = new StatusBarCoin();
    statusbarBottle = new StatusBarBottle();
    throwableObject = [];

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

        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);

        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };

    setWorld() {
        this.character.world = this;
    };

    //Wird in constructor ausgeführt
    run() {
        let intervalId = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 0);
        DrawableObject.intervalArr.push(intervalId);
    };

    checkThrowObjects() {
        if (this.keyboard.E) {
            let bottle = new ThrowableObject(this.character.x, this.character.y)
            this.throwableObject.push(bottle);
        };
    };

    //Wird von run() ausgeführt, läuft permanent
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy.energy > 0) {
                    if (this.characterIsJumpingOn(enemy)) {
                        this.character.jump();
                        enemy.energy = 0;
                    } else {
                        this.character.hit();
                        this.statusbarHealth.setPercentage(
                            this.character.energy,
                            this.statusbarHealth.STATUS_HEALTH_IMAGES
                        );
                    }
                } 
            }
        });
    }

    characterIsJumpingOn(object) {
        return this.character.x + this.character.width > object.x &&
            this.character.x < object.x + object.width &&
            this.character.y + this.character.height - 5 > object.y &&
            this.character.y + this.character.height < object.y + object.height
    }

    addObjectsToMap(object) {
        object.forEach(o => {
            this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            o.drawFrame(this.ctx);
        });
    };

    addToMap(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        };
        object.draw(this.ctx);
        object.drawFrame(this.ctx);
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