class Endboss extends MovableObject {
    endbossAlert = false;
    endbossIsAngry = false;
    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_WALK/G1.png',
        'img/4_enemie_boss_chicken/1_WALK/G2.png',
        'img/4_enemie_boss_chicken/1_WALK/G3.png',
        'img/4_enemie_boss_chicken/1_WALK/G4.png'
    ]

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
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    constructor() {
        super();
        this.loadImg(this.IMAGES_STANDING[0]);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4500;
        this.y = 140;
        this.width = 300;
        this.height = 300;
        this.energy = 100;
        this.speed = 2;
        this.animate();
    };

    characterTouchEndboss() {
        return world.character.x + world.character.width >= this.x + 5 && this.x + 5 + this.width - 45 >= world.character.x;
    }

    characterDontTouchEndboss() {
        return world.character.x + world.character.width <= this.x + 5 || this.x + 5 + this.width - 45 <= world.character.x;
    }

    endbossIsDeath() {
        return this.energy == 0;
    }

    endbossGetHurt() {
        return !world.bossCanTakeDmg;
    }

    bossIsWalking() {
        if (world.level.endboss[0].endbossIsAngry && world.level.endboss[0].x > 0) {
            world.level.endboss[0].moveLeft();
        }
    }

    checkCharacterApproachingEndboss(id) {
        if (world.character.x >= world.level.endboss[0].x - 400) {
            world.level.endboss[0].endbossAlert = true;
            setTimeout(() => {
                world.level.endboss[0].endbossAlert = false
            }, 1500)
            clearInterval(id);
        }
    }

    animate() {
        this.createInterval(this.playEndbossAnimation, 1000 / 60)
        this.createInterval(this.bossIsWalking, 1000 / 60)
        this.createInterval(this.checkCharacterApproachingEndboss, 50)
    };


    playEndbossAnimation(id) {
        if (world.level.endboss[0].endbossIsAngry) {
            world.level.endboss[0].checkEndbossActivity(id);
        } else if (world.level.endboss[0].endbossAlert) {
            world.level.endboss[0].animationEndboss(id, world.level.endboss[0].playAlertAnimation, 250);
        } else {
            world.level.endboss[0].animationEndboss(id, world.level.endboss[0].playStandAnimation, 500);
        }
    }

    checkEndbossActivity(id) {
        if (world.level.endboss[0].endbossIsDeath()) {
            world.level.endboss[0].animationEndboss(id, world.level.endboss[0].playDeathAnimation, 150);
        } else if (world.level.endboss[0].endbossGetHurt()) {
            world.level.endboss[0].animationEndboss(id, world.level.endboss[0].playHurtAnimation, 100);
        } else if (world.level.endboss[0].characterTouchEndboss()) {
            world.level.endboss[0].animationEndboss(id, world.level.endboss[0].playAttackAnimation, 150);
        } else {
            world.level.endboss[0].animationEndboss(id, world.level.endboss[0].playWalkAnimation, 150);
        }
    }

    animationEndboss(id, interaction, time) {
        clearInterval(id);
        this.currentImage = 0;
        this.createInterval(interaction, time);
    }

    playHurtAnimation(id) {
        world.level.endboss[0].playAnimation(world.level.endboss[0].IMAGES_HURT)
        if (world.bossCanTakeDmg) {
            clearInterval(id);
            world.level.endboss[0].playEndbossAnimation();
        };
    };

    playAttackAnimation(id) {
        world.level.endboss[0].playAnimation(world.level.endboss[0].IMAGES_ATTACK);
        if (world.level.endboss[0].characterDontTouchEndboss() && world.level.endboss[0].animationIsDone) {
            clearInterval(id);
            world.level.endboss[0].playEndbossAnimation();
        };
    };

    playWalkAnimation(id) {
        world.level.endboss[0].playAnimation(world.level.endboss[0].IMAGES_WALK);
        if (world.level.endboss[0].characterTouchEndboss() || world.level.endboss[0].endbossGetHurt() || world.level.endboss[0].endbossIsDeath()) {
            clearInterval(id);
            world.level.endboss[0].playEndbossAnimation();
        };
    };

    playStandAnimation(id) {
        world.level.endboss[0].playAnimation(world.level.endboss[0].IMAGES_STANDING);
        if (world.level.endboss[0].endbossAlert) {
            clearInterval(id);
            world.level.endboss[0].playEndbossAnimation();
        };
    };

    playAlertAnimation(id) {
        world.level.endboss[0].playLimitedAnimation(world.level.endboss[0].IMAGES_ALERT);
        if (!world.level.endboss[0].endbossAlert) {
            clearInterval(id);
            world.level.endboss[0].endbossIsAngry = true;
            world.level.endboss[0].playEndbossAnimation();
        };
    };

    playDeathAnimation() {
        world.level.endboss[0].playLimitedAnimation(world.level.endboss[0].IMAGES_DEAD);
        setTimeout(() => {
            world.endGame(1);
        }, 600);
    }
};
