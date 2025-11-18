class Character extends MovableObject {

    world;
    speed = 5;
    x = 25;
    y = 225;
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
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    constructor() {

        super();
        this.loadImg('img/2_character_pepe/2_walk/W-21.png');

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT == true && this.x < this.world.level.levelEndX) {
                this.otherDirection = false;
                this.moveRight();
            };

            if (this.world.keyboard.LEFT == true && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();
            };

            if (this.world.keyboard.UP == true && this.isOnGround() || this.world.keyboard.SPACE == true && this.isOnGround()) {
                this.jump();
            }

            this.world.cameraX = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAboutGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT == true || this.world.keyboard.LEFT == true) {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 150)
    }
}