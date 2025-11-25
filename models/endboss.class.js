class Endboss extends MovableObject{

    IMAGES_STANDING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor(w, h){
        super();
        this.loadImg(this.IMAGES_STANDING[0]);
        this.loadImages(this.IMAGES_STANDING);
        this.x = 2880;
        this.y = 440 - h;
        this.width = w;
        this.height = h;
        this.animate();
    };

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_STANDING);
        }, 500);
    };
};