class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    intervalIds = [];

    applyGravity() {
        setInterval(() => {
            if (this.isAboutGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboutGround() {
        // checkt ob das von throwable object kommt
        if (this instanceof ThrowableObject) {
            return this.y <= 340;
            //kommt vom character
        } else {
            return this.y <= 225;
        }
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

    playLimitedAnimation(images, intervalId) {        
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        
        // Da currentImage nicht gleichgroß sein kann wie die image.length, wird eine 1 dazuaddiert
        if (i + 1 === images.length) {
            clearInterval(intervalId);
        }else{            
            this.currentImage++;
        }
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

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.5;

    }

    isDead() {
        return this.energy == 0;
    }


    // Ist noch nicht in Betrieb. Zum pushen von Intervalen in einen Array
    setStoppableInterval(fn, time) {      
        const id = setInterval(fn, time);
        this.intervalIds.push(id);        
    }
}