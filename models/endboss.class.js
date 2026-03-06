class Endboss extends MovableObject {
    endbossAlert = false;
    endbossIsAngry = false;
    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_WALK/G1.png',
        'img/4_enemie_boss_chicken/1_WALK/G2.png',
        'img/4_enemie_boss_chicken/1_WALK/G3.png',
        'img/4_enemie_boss_chicken/1_WALK/G4.png'
    ];

    IMAGES_STANDING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        // 'img/4_enemie_boss_chicken/3_attack/G13.png',
        // 'img/4_enemie_boss_chicken/3_attack/G14.png',
        // 'img/4_enemie_boss_chicken/3_attack/G15.png',
        // 'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super();
        this.x = 4500;
        this.y = 140;
        this.width = 300;
        this.height = 300;
        this.energy = 100;
        this.speed = 2;
        this.getImages();
        this.animate();
        this.createInterval(this.bossIsWalking, 1000 / 60);
        this.createInterval(this.checkCharacterApproachingEndboss, 50);
    };

    animate() {
        this.createInterval(this.playEndbossAnimation, 1000 / 60);
    }

    characterTouchEndboss() {
        return world.character.x + world.character.width >= this.x + 5 && this.x + 5 + this.width - 45 >= world.character.x;
    };

    characterDontTouchEndboss() {
        return world.character.x + world.character.width <= this.x + 5 || this.x + 5 + this.width - 45 <= world.character.x;
    };

    endbossIsDeath() {
        return this.energy == 0;
    };

    endbossGetHurt() {
        return !world.bossCanTakeDmg;
    };

    endbossIsAlerting(){
        return world.level.endboss[0].endbossAlert;
    }

    endbossIsNotAlerting(){
        return !world.level.endboss[0].endbossAlert;
    }

    endbossIsHurt(){
        return world.bossCanTakeDmg;
    }

    checkAttacking(){
        return world.level.endboss[0].characterDontTouchEndboss() && world.level.endboss[0].animationIsDone;
    }

    bossIsWalking() {
        if (world.level.endboss[0].endbossIsAngry && world.level.endboss[0].x > 0) {
            world.level.endboss[0].moveLeft();
        };
    };

    checkInteractions() {
        return world.level.endboss[0].characterTouchEndboss() || world.level.endboss[0].endbossGetHurt() || world.level.endboss[0].endbossIsDeath()
    }

    checkCharacterApproachingEndboss(id) {
        if (world.character.x >= world.level.endboss[0].x - 400) {
            world.level.endboss[0].endbossAlert = true;
            setTimeout(() => {
                world.level.endboss[0].endbossAlert = false;
                world.level.endboss[0].endbossIsAngry = true;
            }, 1500);
            clearInterval(id);
        };
    };

    getImages() {
        this.loadImg(this.IMAGES_STANDING[0]);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    };

    playEndbossAnimation(id) {
        if (world.level.endboss[0].endbossIsAngry) {
            world.level.endboss[0].checkEndbossActivity(id);
        } else if (world.level.endboss[0].endbossAlert) {
            world.level.endboss[0].animationEndboss(id, world.level.endboss[0].playAlertAnimation, 250, world.level.endboss[0].endbossIsNotAlerting);
        } else {
            world.level.endboss[0].animationEndboss(id, world.level.endboss[0].playStandAnimation, 500, world.level.endboss[0].endbossIsAlerting);
        };
    };

    checkEndbossActivity(id) {
        if (world.level.endboss[0].endbossIsDeath()) {
            world.level.endboss[0].animationEndboss(id, world.level.endboss[0].playDeathAnimation, 150);
        } else if (world.level.endboss[0].endbossGetHurt()) {
            world.level.endboss[0].animationEndboss(id, world.level.endboss[0].playHurtAnimation, 100, world.level.endboss[0].endbossIsHurt);
        } else if (world.level.endboss[0].characterTouchEndboss()) {
            world.level.endboss[0].animationEndboss(id, world.level.endboss[0].playAttackAnimation, 150, world.level.endboss[0].checkAttacking);
        } else {
            world.level.endboss[0].animationEndboss(id, world.level.endboss[0].playWalkAnimation, 150, world.level.endboss[0].checkInteractions);
        };
    };

    animationEndboss(id, interaction, time, func) {
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
                world.level.endboss[0].animate();
            };
        };
    };

    playHurtAnimation() {
        world.level.endboss[0].playAnimation(world.level.endboss[0].IMAGES_HURT);
    };

    playAttackAnimation() {
        world.level.endboss[0].playAnimation(world.level.endboss[0].IMAGES_ATTACK);
    };

    playWalkAnimation() {
        world.level.endboss[0].playAnimation(world.level.endboss[0].IMAGES_WALK);
    };

    playStandAnimation() {
        world.level.endboss[0].playAnimation(world.level.endboss[0].IMAGES_STANDING);
    };

    playAlertAnimation() {
        world.level.endboss[0].playLimitedAnimation(world.level.endboss[0].IMAGES_ALERT);
    };

    playDeathAnimation() {
        world.level.endboss[0].playLimitedAnimation(world.level.endboss[0].IMAGES_DEAD);
        setTimeout(() => {
            world.endGame(1);
        }, 600);
    };
};
