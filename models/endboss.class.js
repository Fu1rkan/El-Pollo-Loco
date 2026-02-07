class Endboss extends MovableObject {
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
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
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
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500;
        this.y = 140;
        this.width = 300;
        this.height = 300;
        this.energy = 100;
        this.speed = 0.5;
        this.animate();
    };

    animate() {
        this.playEndbossAnimation();
        let bossIsWalkingInterval = setInterval(() => {
            if (this.endbossIsAngry) {
                if (isRunning) {
                    this.moveLeft();
                }
            }
        }, 1000 / 60);
        DrawableObject.intervalArr.push(bossIsWalkingInterval);
    };
    playEndbossAnimation() {
        let intervalId = setInterval(() => {
            if (isRunning) {

                if (world.character.x >= this.x - 200) {
                    this.endbossIsAngry = true;
                }
                if (this.endbossIsAngry) {

                    if (this.energy <= 0) {
                        this.playAnimation(this.IMAGES_DEAD)
                    } else if (!world.bossCanTakeDmg) {
                        clearInterval(intervalId)
                        let hurtAnimateEndbossInterval = setInterval(() => {
                            this.playAnimation(this.IMAGES_HURT)
                            if (world.bossCanTakeDmg) {
                                clearInterval(hurtAnimateEndbossInterval)
                                this.playEndbossAnimation()
                            }
                        }, 100)
                    } else if (world.character.x + world.character.width >= this.x && this.x + this.width >= world.character.x) {
                        let attackAnimateEndbossInterval = setInterval(() => {
                            this.playAnimation(this.IMAGES_ATTACK);
                            if (world.character.x + world.character.width <= this.x || this.x + this.width <= world.character.x) {
                                clearInterval(attackAnimateEndbossInterval)
                                this.playEndbossAnimation()
                            }
                            DrawableObject.intervalArr.push(attackAnimateEndbossInterval);
                        }, 150);
                        clearInterval(intervalId)
                    } else {
                        this.playAnimation(this.IMAGES_WALK);
                    }
                } else {
                    this.playAnimation(this.IMAGES_STANDING);
                }
            }
        }, 250);
        DrawableObject.intervalArr.push(intervalId);
    }
};