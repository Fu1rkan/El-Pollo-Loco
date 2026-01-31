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
        let intervalId = setInterval(() => {
            if (isRunning) {   
                this.moveLeft();
            }
        }, 1000 / 60);
        DrawableObject.intervalArr.push(intervalId);
        // requestAnimationFrame(() => this.animate());
    };
};