class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    canTakeDamage = true;
    
    
    constructor(){
        super();
    }

    applyGravity() {
        let intervalId = setInterval(() => {
            if (this.isAboutGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            };
        }, 1000 / 25);
        DrawableObject.intervalArr.push(intervalId);
    };

    isAboutGround() {
        // checkt ob das von throwable object kommt
        if (this instanceof ThrowableObject) {
            return this.y <= 340;
            //kommt vom character
        } else {
            return this.y <= 225;
        };
    };

    isOnGround() {
        return this.y >= 225;
    };

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };

    playLimitedAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];

        // Da currentImage nicht gleichgroß sein kann wie die image.length, wird eine 1 dazuaddiert
        if (i + 1 !== images.length) {
            this.currentImage++;
        };
    };

    playLastAnimation(images) {
        let intervalId = setInterval(() => {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            if (i + 1 !== images.length) {
                this.currentImage++;
            }else{
                clearInterval(intervalId);
            };
        }, 100);
    };

    moveRight() {
        this.x += this.speed;
    };

    moveLeft() {
        this.x -= this.speed;
    };

    jump() {
        this.speedY = 30;
    };

    //Wird von checkCollisions() ausgeführt
    isColliding(object) {
        return this.x + this.width > object.x &&
            this.x < object.x + object.width &&
            this.y + this.height > object.y &&
            this.y < object.y + object.height;
    };


    //Muss überarbeitet werden
    isCollidingByJump() {
        return this.y + this.height > object.y &&
            this.y < object.y + object.height;
    };


    // Spieler Schaden wird hier hinzugefügt 
    //Wird von checkCollisions() ausgeführt
    hit() {
        if (!this.isHurt()) {
            this.energy -= 20;
        };
        if (this.energy < 0) {
            this.energy = 0
        } else if(this.canTakeDamage){
            this.lastHit = new Date().getTime();
        };
    };

    isHurt() {

        let timepassed = new Date().getTime() - this.lastHit;
        // zählt ab jetzt von 0 wieder auf
        timepassed = timepassed / 1000;
        //rechnet es in Sekunden um

        //länge einmal hier ändern und unten
        //               |
        if (timepassed < 1.5) {
            this.canTakeDamage = false;
        }else{
            this.canTakeDamage = true;
        };

        //hier die andere Länge
        //                   |
        return timepassed < 1.5;

    };

    isDead() {
        return this.energy == 0;
    };


    // Ist noch nicht in Betrieb. Zum pushen von Intervalen in einen Array
    // vll beim clean coden. Alles in einem Intzervall muss in eine Funktion umgelaggert werden
    // setStoppableInterval(fn, time) {
    //     const id = setInterval(fn, time);
    //     this.intervalIds.push(id);
    // }

    // stopInterval() {
    //     this.intervalIds.forEach(i => {
    //         clearInterval(i);
    //     });
    // };
};