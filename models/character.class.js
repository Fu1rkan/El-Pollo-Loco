class Character extends MovableObject {

    world;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

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
        setInterval(() =>{
            if(this.world.keyboard.RIGHT == true){
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
                this.x += 5;
            };
            if(this.world.keyboard.LEFT == true){
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
                this.x -= 5;
            };
            if(this.world.keyboard.UP == true){
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
                this.y -= 5;
            };
            if(this.world.keyboard.DOWN == true){
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
                if (this.y < 225) {
                    this.y += 5;
                }
            };
        }, 100)
    }

    jump() {

    }
}