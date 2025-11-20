class ThrowableObject extends MovableObject {

    IMAGES_THROW_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 100;
        this.loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROW_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.trow();
    }

    trow() {
        this.speedY = 30;
        this.applyGravity();
        this.animate();
        let throwing = setInterval(() => {
            if (this.y < 340) {
                this.x += 10
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            }
        }, 25)
    }

    animate() {
        let hihihi = setInterval(() => {
            this.playAnimation(this.IMAGES_THROW_BOTTLE);
            if (this.y >= 340) {
                console.log(hihihi);
                
                clearInterval(hihihi);
            }
        }, 75);
    }
}