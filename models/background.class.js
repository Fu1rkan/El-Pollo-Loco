class Background extends MovableObject {

    constructor(url, w, h) {
        super().loadImg(url);
        this.width = w;
        this.height = h;
    }
}