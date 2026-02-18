class Character extends MovableObject {

    world;
    speed = 5;
    x = 0;
    y = 228;
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

    isNotHurtAnymore() {
        return !world.character.isHurt() || world.character.isDead();
    }

    isNotWalkingAnymore() {
        return !world.character.isWalking() || world.character.isHurt() || world.character.isAboutGround() || world.character.isDead() || world.character.x == 0 || world.character.x >= 4200;
    }

    isNotSleepingAnymore() {
        return world.character.isDead() || world.character.isHurt() || world.character.isAboutGround() || world.character.isWalking();
    }

    isNotStandingAnymore() {
        if (this.isDead() || this.isHurt() || this.isAboutGround() || this.isWalking() && world.character.x <= 4199 && !world.character.x == 0 || this.isSleeping()) {
            return true;
        } else {
            return false;
        }
    }

    isNotTouchingTheBorder() {
        return world.character.x <= 4199 && !world.character.x == 0;
    }

    isNotJumpingAnymore(){
        return !world.character.isAboutGround() || world.character.isHurt() || world.character.isDead() || world.character.world.jumpedOnEnemy;
    }

    animate() {
        this.playCharacterAnimation();
    };

    playCharacterAnimation() {
        this.createInterval(this.characterActivities, 10);
    }

    characterActivities(id) {
        if (world.character.isDead()) {
            world.character.animationCharacter(id, world.character.playDeathAnimation, 100);
        } else if (world.character.isHurt()) {
            world.character.animationCharacter(id, world.character.playHurtAnimation, 100);
        } else if (world.character.isAboutGround()) {
            world.character.animationCharacter(id, world.character.playJumpAnimation, 150);
        } else if (world.character.isWalking() && world.characterisNotTouchingTheBorder()) {
            world.character.animationCharacter(id, world.character.playWalkAnimation, 100)
        } else if (world.character.isSleeping()) {
            world.character.animationCharacter(id, world.character.playSleepingAnimation, 250);
        } else {
            world.character.animationCharacter(id, world.character.playStandAnimation, 250);
        }
    }

    animationCharacter(id, interaction, time) {
        clearInterval(id);
        this.currentImage = 0;
        this.createInterval(interaction, time);
    }

    //Startet die Jump animation neu, sobald der Character auf ein Enemy springt
    restartJumpAnimation(id) {
        if (world.character.world.jumpedOnEnemy) {
            world.character.world.jumpedOnEnemy = false
            clearInterval(id)
            world.character.animationCharacter(id, world.character.playJumpAnimation, 150);
        };
    }

    playJumpAnimation(id) {
        world.character.playLimitedAnimation(world.character.IMAGES_JUMPING);
        world.character.restartJumpAnimation(id);
        if (world.character.isNotJumpingAnymore()) {
            clearInterval(id)
            world.character.playCharacterAnimation()
        }
    }

    playDeathAnimation(id) {
        world.character.playLastAnimation(world.character.IMAGES_DEAD);
        setTimeout(() => {
            world.endGame(0);
        }, 600);
    }

    playHurtAnimation(id) {
        world.character.playLimitedAnimation(world.character.IMAGES_HURT);
        if (world.character.isNotHurtAnymore()) {
            clearInterval(id)
            world.character.playCharacterAnimation()
        }
    }

    playWalkAnimation(id) {
        world.character.playAnimation(world.character.IMAGES_WALKING);
        if (world.character.isNotWalkingAnymore()) {
            clearInterval(id)
            world.character.playCharacterAnimation()
        }
    }


    playSleepingAnimation(id) {
        world.character.playAnimation(world.character.IMAGES_SLEEPING);
        if (world.character.isNotSleepingAnymore()) {
            clearInterval(id);
            world.character.playCharacterAnimation();
        };
    };


    playStandAnimation(id) {
        world.character.playAnimation(world.character.IMAGES_STANDING);
        if (world.character.isNotStandingAnymore()) {
            clearInterval(id);
            world.character.playCharacterAnimation();
        }
    }

    moveCamera() {
        this.createInterval(this.checkMovement, 1000 / 60)
    };

    checkMovement() {
        if (world.character.isMovingRight()) {
            world.character.otherDirection = false;
            world.character.moveRight();
        };
        if (world.character.isMovingLeft()) {
            world.character.otherDirection = true;
            world.character.moveLeft();
        };
        if (world.character.isJumping()) {
            world.character.jump(21);
        };
        world.cameraX = -world.character.x + 100;
    }

    isMovingRight() {
        return world.keyboard.RIGHT == true && world.character.x < world.level.levelEndX && world.character.canWalk;
    }

    isMovingLeft() {
        return world.keyboard.LEFT == true && world.character.x > 0 && world.character.canWalk;
    }

    isJumping() {
        return world.keyboard.UP == true && world.character.isOnGround() || world.keyboard.SPACE == true && world.character.isOnGround();
    }
};