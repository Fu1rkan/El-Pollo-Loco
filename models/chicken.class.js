class Chicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEATH = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEATH);
        this.x = 760 + Math.random() * 3800;
        this.y = 347;
        this.width = 80;
        this.height = 80;
        this.energy = 100;
        this.speed = 0.2 + Math.random() * 0.25;
        setTimeout(() => {
            this.animate();
        }, 1);
    };

    otherDirection = false;
    moveInterval;
    animationInterval;

    animate() {
        this.moveInterval = this.createInterval(() => this.moveLeft(), 1000 / 60);
        this.animationInterval = this.createInterval(() => this.checkInteraction(), 200);
    };

    checkInteraction(id) {
        if (this.energy > 0) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playLimitedAnimation(this.IMAGES_DEATH);
            clearInterval(this.moveInterval);
            clearInterval(this.animationInterval);
        };
    };
};

class BabyChicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEATH = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEATH);
        this.x = 760 + Math.random() * 3800;
        this.y = 367;
        this.width = 60;
        this.height = 60;
        this.energy = 100;
        this.speed = 0.2 + Math.random() * 0.25;
        setTimeout(() => {
            this.animate();
        }, 1);
    };

    otherDirection = false;
    moveInterval;
    animationInterval;

    animate() {
        this.moveInterval = this.createInterval(() => this.moveLeft(), 1000 / 60);
        this.animationInterval = this.createInterval(() => this.checkInteraction(), 200);
    };

    checkInteraction(id) {
        if (this.energy > 0) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playLimitedAnimation(this.IMAGES_DEATH);
            clearInterval(this.moveInterval);
            clearInterval(this.animationInterval);
        };
    };
};