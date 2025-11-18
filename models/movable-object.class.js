class MovableObject extends DrawableObject{
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboutGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboutGround() {
        return this.y <= 225;
    }

    isOnGround() {
        return this.y >= 225;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    };

    moveLeft() {
        this.x -= this.speed;
    };

    jump() {
        this.speedY = 30;
    }

    isColliding(object) {
        return this.x + this.width > object.x &&
            this.x < object.x + object.width &&
            this.y + this.height > object.y &&
            this.y < object.y + object.height;
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.5;

    }

    isDead(){
        return this.energy == 0;
    }
}