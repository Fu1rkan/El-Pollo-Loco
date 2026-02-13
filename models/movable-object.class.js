class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 1000;
    lastHit = 0;
    canTakeDamage = true;
    canKillEnemys = true;
    canHitEnemys = true;
    animationIsDone = false;
    
    
    constructor(){
        super();
    }

    applyGravity() {
        let intervalId = setInterval(() => {
            if (isRunning) {
                
                if (this.isAboutGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                };
            }
        }, 1000 / 25);
        DrawableObject.intervalArr.push(intervalId);
    };

    isAboutGround() {
        // checkt ob das von throwable object kommt
        if (this instanceof ThrowableObject) {
            return this.y <= 340;
        } else { //kommt vom character
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
        
        if (i+1 == images.length) {
            this.animationIsDone = true;
        } else{
            this.animationIsDone = false;
        }
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
        }
    };

    playLastAnimation(images) {
        let intervalId = setInterval(() => {
            if (isRunning) {
                let i = this.currentImage % images.length;
                let path = images[i];
                this.img = this.imageCache[path];
                if (i + 1 !== images.length) {
                    this.currentImage++;
                }else{
                    clearInterval(intervalId);
                };
            }            
        }, 100);
    };

    moveRight() {
        this.x += this.speed;
    };

    moveLeft() {
        this.x -= this.speed;
    };

    jump(speed) {
        this.speedY = speed;
        let enemy = this.world.level.enemies;
        enemy.forEach(e => {            
            if (this.isColliding(e)) {          
                this.canHitEnemys = false;
                this.canKillEnemys = false;
                setTimeout(() => {
                    this.canHitEnemys = true;
                    this.canKillEnemys = true;
                }, 100);
            };
        });        
    };

    //Wird von checkCollisions() ausgeführt
    isColliding(object) {
        return this.x + 15 + this.width - 40 > object.x &&
            this.x + 15 < object.x + object.width &&
            this.y + 80 + this.height - 85> object.y &&
            this.y + 80 < object.y + object.height;
    };

    isCollidingByItem(object, item){
        return item.x + item.width > object.x &&
            item.x < object.x + object.width &&
            item.y + item.height > object.y &&
            item.y < object.y + object.height;
    }

    bossIsCollidingByItem(object, item){
        return item.x + item.width > object.x + 5&&
            item.x < object.x + 5 + object.width -45 &&
            item.y + item.height > object.y + 60&&
            item.y < object.y + 60 + object.height -70;
    }


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