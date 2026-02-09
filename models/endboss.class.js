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
        return world.character.x + world.character.width >= this.x && this.x + this.width >= world.character.x;
    }

    characterDontTouchEndboss() {
        return world.character.x + world.character.width <= this.x || this.x + this.width <= world.character.x;
    }

    endbossIsDeath() {
        return this.energy <= 0;
    }

    endbossGetHurt() {
        return !world.bossCanTakeDmg;
    }

    animate() {
        this.playEndbossAnimation();

        //Interval => Endboss läuft
        let bossIsWalkingInterval = setInterval(() => {
            if (this.endbossIsAngry) {
                if (isRunning) {
                    this.moveLeft();
                }
            }
        }, 1000 / 60);

        //Interval => Endboss wird aktiviert wenn sich spieler nähert
        let checkCharacterApproachingEndbossInterval = setInterval(() => {
            if (world.character.x >= this.x - 400) {

                this.endbossAlert = true;

                setTimeout(() => {
                    this.endbossAlert = false
                }, 1500)

                clearInterval(checkCharacterApproachingEndbossInterval);
            }
        }, 50);

        // Intervale werden in all Interval Ordner gepusht
        DrawableObject.intervalArr.push(bossIsWalkingInterval, checkCharacterApproachingEndbossInterval);
    };


    playEndbossAnimation() {

        let intervalId = setInterval(() => {
            if (isRunning) {
                if (this.endbossIsAngry) {
                    if (this.endbossIsDeath()) {
                        this.deathEndbossAnimation(intervalId);
                    } else if (this.endbossGetHurt()) {
                        this.hurtEndbossAnimation(intervalId);
                    } else if (this.characterTouchEndboss()) {
                        this.attackEndbossAnimation(intervalId);
                    } else {
                        this.walkEndbossAnimation(intervalId);
                    }
                } else if (this.endbossAlert) {
                    this.alertEndbossAnimation(intervalId);
                } else {
                    this.standEndbossAnimation(intervalId);
                }
            }
        }, 1000 / 60);
        DrawableObject.intervalArr.push(intervalId);
    }

    deathEndbossAnimation(intervalId) {
        clearInterval(intervalId);

        this.currentImage = 0;

        let deathAnimationEndbossInterval = setInterval(() => {
            this.playLimitedAnimation(this.IMAGES_DEAD);
        }, 150);

        DrawableObject.intervalArr.push(deathAnimationEndbossInterval);

        setTimeout(() => {
            world.endGame(1);
        }, 600);
    }

    hurtEndbossAnimation(intervalId) {
        clearInterval(intervalId)

        this.currentImage = 0;

        let hurtAnimateEndbossInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT)
            if (world.bossCanTakeDmg) {
                clearInterval(hurtAnimateEndbossInterval)
                this.playEndbossAnimation()
            }
        }, 100)

        DrawableObject.intervalArr.push(hurtAnimateEndbossInterval);
    }

    attackEndbossAnimation(intervalId) {
        clearInterval(intervalId);

        this.currentImage = 0;

        let attackAnimateEndbossInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
            if (this.characterDontTouchEndboss() && this.animationIsDone) {
                clearInterval(attackAnimateEndbossInterval)
                this.playEndbossAnimation()
            }
        }, 150);

        DrawableObject.intervalArr.push(attackAnimateEndbossInterval);
    }

    walkEndbossAnimation(intervalId) {
        clearInterval(intervalId);

        this.currentImage = 0;

        let walkAnimateEndbossInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
            if (this.characterTouchEndboss() || this.endbossGetHurt() || this.endbossIsDeath()) {
                clearInterval(walkAnimateEndbossInterval)
                this.playEndbossAnimation()
            }
        }, 150);

        DrawableObject.intervalArr.push(walkAnimateEndbossInterval);
    }

    standEndbossAnimation(intervalId) {
        clearInterval(intervalId);

        this.currentImage = 0;

        let standingAnimationEndbossInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_STANDING);
            if (this.endbossAlert) {
                clearInterval(standingAnimationEndbossInterval);
                this.playEndbossAnimation();
            }
        }, 500);

        DrawableObject.intervalArr.push(standingAnimationEndbossInterval);
    }

    alertEndbossAnimation(intervalId) {
        clearInterval(intervalId);

        this.currentImage = 0;

        let alertAnimationEndbossInterval = setInterval(() => {
            this.playLimitedAnimation(this.IMAGES_ALERT);
            if (!this.endbossAlert) {
                clearInterval(alertAnimationEndbossInterval);
                this.endbossIsAngry = true;
                this.playEndbossAnimation();
            }
        }, 250);

        DrawableObject.intervalArr.push(alertAnimationEndbossInterval);
    }
};
