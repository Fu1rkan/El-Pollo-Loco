class Clouds extends MovableObject {

    constructor(url, w, h, x, y) {
        super();
        this.loadImg(url);
        this.width = w;
        this.height = h;
        this.x = x
        this.y = y;
        this.animate();
        this.speed = 0.1;
    };


    animate() {
        this.createInterval(() => this.moveLeft(), 1000 / 60)
    };
};