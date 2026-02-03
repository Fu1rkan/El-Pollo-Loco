class Coin extends MovableObject {

    constructor(url, w, h, x, y) {
        super();
        this.loadImg(url);
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
    };
};