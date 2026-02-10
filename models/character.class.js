class Character extends MovableObject {

    world;
    speed = 5;
    x = 0;
    y = 223.5;
    width = 100;
    height = 200;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    constructor() {
        super();
        this.loadImg('img/2_character_pepe/2_walk/W-21.png');

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.moveCamera();
        this.animate();
    };

    isWalking() {
        if (this.world.keyboard.RIGHT == true || this.world.keyboard.LEFT == true) {
            return true
        } else {
            return false
        };
    }

    isSleeping() {
        if (this.world.keyboard.KEY == false) {
            return true;
        } else {
            return false;
        };
    }

    checkAllInteractions() {
        if (this.isDead() || this.isHurt() || this.isAboutGround() || this.isWalking() || this.isSleeping()) {
            return true;
        } else {
            return false;
        }
    }

    checkAllInteractions2() {
        if (this.isDead() || this.isHurt() || this.isAboutGround() || this.isWalking()) {
            return true;
        } else {
            return false;
        }
    }

    animate() {
        this.playCharacterAnimation();
    };

    playCharacterAnimation() {
        let intervalId = setInterval(() => {
            if (isRunning) {

                if (this.isDead()) {
                    this.deathAnimationCharacter(intervalId);
                } else if (this.isHurt()) {
                    this.hurtAnimationCharacter(intervalId);
                } else if (this.isAboutGround()) {
                    this.jumpAnimationCharacter(intervalId);
                } else if (this.isWalking() && !world.character.x == 0) {
                    this.walkAnimationCharacter(intervalId)
                } else if (this.isSleeping()) {
                    this.sleepAnimationCharacter(intervalId);
                } else {
                    this.standAnimationCharacter(intervalId);
                }
            }
        }, 10)
        DrawableObject.intervalArr.push(intervalId);
    }

    deathAnimationCharacter(intervalId) {
        clearInterval(intervalId);

        this.currentImage = 0;

        let deatAnimationCharacterInterval = setInterval(() => {
            this.playLastAnimation(this.IMAGES_DEAD);
        }, 100)

        DrawableObject.intervalArr.push(deatAnimationCharacterInterval);

        setTimeout(() => {
            world.endGame(0);
        }, 600);
    }

    hurtAnimationCharacter(intervalId) {
        clearInterval(intervalId)

        this.currentImage = 0;

        let hurtAnimationCharacterInterval = setInterval(() => {
            this.playLimitedAnimation(this.IMAGES_HURT);
            if (!this.isHurt() || this.isDead()) {
                clearInterval(hurtAnimationCharacterInterval)
                this.playCharacterAnimation()
            }
        }, 100)

        DrawableObject.intervalArr.push(hurtAnimationCharacterInterval);
    }

    jumpAnimationCharacter(intervalId) {
        clearInterval(intervalId)

        this.currentImage = 0;

        let jumpAnimationCharacterInterval = setInterval(() => {
            this.playLimitedAnimation(this.IMAGES_JUMPING);
            if (this.world.jumpedOnEnemy) {
                this.world.jumpedOnEnemy = false
                clearInterval(jumpAnimationCharacterInterval)
                this.jumpAnimationCharacter(intervalId);
            }

            if (!this.isAboutGround() || this.isHurt() || this.isDead() || this.world.jumpedOnEnemy) {
                clearInterval(jumpAnimationCharacterInterval)
                this.playCharacterAnimation()
            }
        }, 150)

        DrawableObject.intervalArr.push(jumpAnimationCharacterInterval);
    }

    walkAnimationCharacter(intervalId) {
        clearInterval(intervalId)

        this.currentImage = 0;

        let walkAnimationCharacterInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            if (!this.isWalking() || this.isHurt() || this.isAboutGround() || this.isDead() || world.character.x == 0) {
                clearInterval(walkAnimationCharacterInterval)
                this.playCharacterAnimation()
            }
        }, 100)

        DrawableObject.intervalArr.push(walkAnimationCharacterInterval);
    }

    sleepAnimationCharacter(intervalId) {
        clearInterval(intervalId)

        this.currentImage = 0;

        let sleepAnimationCharacterInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SLEEPING);
        }, 250)

        let checkInteractionsInterval = setInterval(() => {
            if (this.isDead() || this.isHurt() || this.isAboutGround() || this.isWalking()) {
                clearInterval(sleepAnimationCharacterInterval, checkInteractionsInterval);
                clearInterval(checkInteractionsInterval);
                this.playCharacterAnimation();
            }
        }, 10);

        DrawableObject.intervalArr.push(sleepAnimationCharacterInterval, checkInteractionsInterval);
    }

    standAnimationCharacter(intervalId) {
        clearInterval(intervalId)

        this.currentImage = 0;

        let standAnimationCharacterInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_STANDING);
        }, 250)

        let checkInteractionsInterval = setInterval(() => {
            if (this.checkAllInteractions()) {
                clearInterval(standAnimationCharacterInterval);
                clearInterval(checkInteractionsInterval);
                this.playCharacterAnimation();
            }
        }, 10);

        DrawableObject.intervalArr.push(standAnimationCharacterInterval, checkInteractionsInterval);
    }

    moveCamera() {
        let camera = setInterval(() => {
            if (isRunning) {

                if (this.world.keyboard.RIGHT == true && this.x < this.world.level.levelEndX) {
                    this.otherDirection = false;
                    this.moveRight();
                };

                if (this.world.keyboard.LEFT == true && this.x > 0) {
                    this.otherDirection = true;
                    this.moveLeft();
                };

                if (this.world.keyboard.UP == true && this.isOnGround() || this.world.keyboard.SPACE == true && this.isOnGround()) {
                    this.jump(21);
                }

                this.world.cameraX = -this.x + 100;
            }
        }, 1000 / 60);
        DrawableObject.intervalArr.push(camera);
    };
};