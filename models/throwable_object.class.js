class ThrowableObject extends MovableObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 100;
        this.loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.trow();
    }

    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10
        }, 25)
    }
}