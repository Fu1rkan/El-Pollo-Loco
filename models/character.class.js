class Character extends MovableObject {

    world;
    speed = 3;
    x = 0;
    y = 229.5;
    width = 100;
    height = 200;
    timers = [];
    audioIntervals = [];

    //Images vom Character beim laufen
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    //Images vom Character beim springen
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    //Images vom Character beim sterben
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    //Images vom Character beim verletzen
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    //Images vom Character beim stehen
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

    //Images vom Character beim schlafen
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

    AUDIOS;

    constructor() {
        super();
        this.getAudios();
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

    getAudios() {
        this.character_hurt = new Audio('audio/character_hurt.mp3');
        this.character_death = new Audio('audio/character_death.mp3');
        this.character_jump = new Audio('audio/character_jump.mp3');
        this.character_sleep = new Audio('audio/character_sleeping.mp3');
        this.character_whistle = new Audio('audio/character_whistle.mp3');
        this.character_walk = new Audio('audio/character_footsteps.mp3');

        this.AUDIOS = [
            this.character_hurt,
            this.character_death,
            this.character_jump,
            this.character_sleep,
            this.character_whistle,
            this.character_walk
        ];

        this.AUDIOS.forEach((audio) => {
            audio.muted = isMuted;
        });

        this.AUDIOS.forEach((audio) => {
            allAudios.push(audio);
        });
    };

    isWalking() {
        if (this.world.keyboard.RIGHT == true || this.world.keyboard.LEFT == true) {
            return true
        } else {
            return false
        };
    };

    isSleeping() {
        if (this.world.keyboard.KEY == false) {
            return true;
        } else {
            return false;
        };
    };

    animate() {
        this.createInterval(this.characterActivities, 10);
    };

    characterActivities(id) {
        world.character.timers.forEach(element => {
            clearTimeout(element)
        });
        world.character.audioIntervals.forEach(element => {
            clearInterval(element)
        });
        world.character.AUDIOS.forEach(element => {
            element.pause();
            element.currentTime = 0;
        });
        if (world.character.isDead()) {
            world.character.AUDIOS[1].play();
            world.character.animationCharacter(id, world.character.playDeathAnimation, 100);
        } else if (world.character.isHurt()) {
            world.character.AUDIOS[0].play();
            world.character.animationCharacter(id, world.character.playHurtAnimation, 100, world.character.isNotHurtAnymore);
        } else if (world.character.isAboutGround()) {
            world.character.AUDIOS[2].play();
            world.character.animationCharacter(id, world.character.playJumpAnimation, 150, world.character.isNotJumpingAnymore);
        } else if (world.character.isWalking() && world.character.isNotTouchingTheBorder()) {
            world.character.walkSound();
            world.character.animationCharacter(id, world.character.playWalkAnimation, 100, world.character.isNotWalkingAnymore)
        } else if (world.character.isSleeping()) {
            world.character.sleepSound();
            world.character.animationCharacter(id, world.character.playSleepingAnimation, 250, world.character.isNotSleepingAnymore);
        } else {
            world.character.whistleSound();
            world.character.animationCharacter(id, world.character.playStandAnimation, 250, world.character.isNotStandingAnymore);
        };
    };

    whistleSound() {
        let id = this.createTimeout(world.character.playWhistleSound, 8000)
        world.character.timers.push(id);
    };

    playWhistleSound() {
        world.character.AUDIOS[4].play();
    }

    sleepSound() {
        world.character.AUDIOS[3].play();
        let audioId = this.createInterval(world.character.playSleepSound, 1000)
        world.character.audioIntervals.push(audioId);
    };

    playSleepSound() {
        world.character.AUDIOS[3].play()
    }

    walkSound() {
        world.character.AUDIOS[5].play();
        let audioId = this.createInterval(world.character.playWalkSound, 600)
        world.character.audioIntervals.push(audioId);
    };

    playWalkSound() {
        let sound = world.character.AUDIOS[5].cloneNode(true);
        sound.muted = isMuted;
        sound.play();
    }

    animationCharacter(id, interaction, time, func) {
        clearInterval(id);
        this.currentImage = 0;
        let intervalId = this.createInterval(interaction, time);
        let intervalId2 = this.createInterval(() => this.checkAnimationChance(intervalId, intervalId2, func), 1000 / 60);
    };

    checkAnimationChance(id, intervalId2, func) {
        if (func) {
            if (func()) {
                clearInterval(id);
                clearInterval(intervalId2);
                world.character.animate();
                world.character.world.jumpedOnEnemy = false;
            };
        };
    };

    playDeathAnimation() {
        world.character.playLimitedAnimation(world.character.IMAGES_DEAD);
        setTimeout(() => {
            world.endGame(0);
        }, 600);
    };

    playJumpAnimation() {
        world.character.playLimitedAnimation(world.character.IMAGES_JUMPING);
    };

    playHurtAnimation() {
        world.character.playLimitedAnimation(world.character.IMAGES_HURT);
    };

    playWalkAnimation() {
        world.character.playAnimation(world.character.IMAGES_WALKING);
    };

    playSleepingAnimation() {
        world.character.playAnimation(world.character.IMAGES_SLEEPING);
    };

    playStandAnimation() {
        world.character.playAnimation(world.character.IMAGES_STANDING);
    };

    isNotHurtAnymore() {
        return !world.character.isHurt() || world.character.isDead();
    };

    isNotWalkingAnymore() {
        return !world.character.isWalking() || world.character.isHurt() || world.character.isAboutGround() || world.character.isDead() || world.character.x == 0 || world.character.x >= 4200;
    };

    isNotSleepingAnymore() {
        return world.character.isDead() || world.character.isHurt() || world.character.isAboutGround() || world.character.isWalking();
    };

    isNotStandingAnymore() {
        if (world.character.isDead() || world.character.isHurt() || world.character.isAboutGround() || world.character.isWalking() && world.character.x <= 4199 && !world.character.x == 0 || world.character.isSleeping()) {
            return true;
        } else {
            return false;
        };
    };

    isNotTouchingTheBorder() {
        return world.character.x <= 4199 && !world.character.x == 0;
    };

    isNotJumpingAnymore() {
        return !world.character.isAboutGround() || world.character.isHurt() || world.character.isDead() || world.character.world.jumpedOnEnemy;
    };

    moveCamera() {
        this.createInterval(this.checkMovement, 1000 / 60);
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
    };

    isMovingRight() {
        return world.keyboard.RIGHT == true && world.character.x < world.level.levelEndX && world.character.canWalk;
    };

    isMovingLeft() {
        return world.keyboard.LEFT == true && world.character.x > 0 && world.character.canWalk;
    };

    isJumping() {
        return world.keyboard.UP == true && world.character.isOnGround() || world.keyboard.SPACE == true && world.character.isOnGround();
    };
};