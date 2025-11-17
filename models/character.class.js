class Character extends MovableObject {

    world;
    speed = 5;

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
    ]

    constructor(x, y, w, h) {

        super();
        this.loadImg('img/2_character_pepe/2_walk/W-21.png');

        this.loadImages(this.IMAGES_WALKING);

        this.animate();

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT == true && this.x < this.world.level.levelEndX) {
                this.x += this.speed;
                this.otherDirection = false;
            };
            if (this.world.keyboard.LEFT == true && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            };
            if (this.world.keyboard.UP == true || this.world.keyboard.SPACE == true) {
                this.y -= this.speed;
            };
            if (this.world.keyboard.DOWN == true) {
                if (this.y < 225) {
                    this.y += this.speed;
                }
            };
            this.world.cameraX = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT == true || this.world.keyboard.LEFT == true) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            };
            if (this.world.keyboard.DOWN == true) {
                if (this.y < 225) {
                    this.y += this.speed;
                }
            };
        }, 75)
    }

    jump() {

    }
}