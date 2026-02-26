class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;
    canTakeDamage = true;
    canKillEnemys = true;
    canHitEnemys = true;
    animationIsDone = false;
    canWalk = true;
    recoilIndex = 0;


    constructor() {
        super();
    };

    applyGravity() {
        this.createInterval(() => this.checkGravity(), 1000 / 25)
    };

    checkGravity() {
        if (this.isAboutGround() || this.speedY > 1.5) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        };
    };

    isAboutGround() {
        // checkt ob das von throwable object kommt
        if (this instanceof ThrowableObject) {
            return this.y <= 340;
        } else { //kommt vom character
            return this.y <= 228;
        };
    };

    isOnGround() {
        return this.y >= 228;
    };

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

    playLimitedAnimation(images, id) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];

        // Da currentImage nicht gleichgroß sein kann wie die image.length, wird eine 1 dazuaddiert
        if (i + 1 !== images.length) {
            this.currentImage++;
        };

        if (id && i + 1 === images.length) {
            clearInterval(id);
        };
    };

    moveRight() {
        this.x += this.speed;
    };

    moveLeft() {
        this.x -= this.speed;
    };

    jump(speed) {
        this.speedY = speed;
        this.world.level.enemies.forEach(e => {
            this.checkJumpingOnEnemies(e, 40, 20, 20, 10);
        });
        this.world.level.babyChicken.forEach(e => {
            this.checkJumpingOnEnemies(e, 20, 20, 10, 10);
        });
    };

    checkJumpingOnEnemies(e, h, w, hy, wx) {
        if (this.isColliding(e, h, w, hy, wx)) {
            this.canHitEnemys = false;
            this.canKillEnemys = false;
            setTimeout(() => {
                this.canHitEnemys = true;
                this.canKillEnemys = true;
            }, 100);
        };
    };

    //Wird von checkCollisions() ausgeführt
    isColliding(object, h, w, hy, wx) {
        return this.x + 15 + this.width - 40 > object.x + wx &&
            this.x + 15 < object.x + wx + object.width - w &&
            this.y + 80 + this.height - 85 > object.y + hy &&
            this.y + 80 < object.y + hy + object.height - h;
    };

    characterIsJumpingOn(object, w, h, wx, hy) {
        return this.x + this.width - 40 > object.x + wx &&
            this.x + 15 < object.x + wx + object.width - w &&
            this.y + 80 + this.height - 85 > object.y + hy &&
            this.y + 80 + this.height - 85 < object.y + hy + object.height - h &&
            this.canTakeDamage;
    };

    isCollidingByItem(object, item, h, w, hy, wx) {
        return item.x + 30 + item.width - 60 > object.x + wx &&
            item.x + 30 < object.x + wx + object.width - w &&
            item.y + 20 + item.height + 30 > object.y + hy &&
            item.y + 20 < object.y + hy + object.height - h;
    };

    //Muss überarbeitet werden
    isCollidingByJump() {
        return this.y + this.height > object.y &&
            this.y < object.y + object.height;
    };


    // Spieler Schaden wird hier hinzugefügt 
    //Wird von checkCollisions() ausgeführt
    hit(enemy, dmg) {
        this.recoilToCharacter(enemy, dmg);
        this.resetDamageCooldown()
    };

    recoilToCharacter(enemy, dmg) {
        if (!this.isHurt()) {
            this.energy -= dmg;
            let intervalId = this.createInterval(() => this.activateRecoil(enemy, intervalId), 1000 / 60)
        };
    };

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

    resetDamageCooldown() {
        if (this.energy < 0) {
            this.energy = 0;
        } else if (this.canTakeDamage) {
            this.lastHit = new Date().getTime();
        };
    };

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        // zählt ab jetzt von 0 wieder auf
        timepassed = timepassed / 1000;
        this.checkDamageCooldown(timepassed);
        return timepassed < 0.5;
    };

    checkDamageCooldown(timepassed) {
        if (timepassed < 0.5) {
            this.canTakeDamage = false;
            this.canWalk = false;
        } else {
            this.canTakeDamage = true;
            this.canWalk = true;
        };
    };

    isDead() {
        return this.energy == 0;
    };
};