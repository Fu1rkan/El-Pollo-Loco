class Chicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super();
        this.loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 760 + Math.random() * 2000;
        this.y = 347;
        this.width = 80;
        this.height = 80;

        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.2 + Math.random() * 0.25;
        this.animate();
    };

    animate() {
        let move = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        let animation = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        
        DrawableObject.intervalArr.push(move, animation);
    };
};