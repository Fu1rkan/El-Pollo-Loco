class Clouds extends MovableObject{
    constructor(url, w, h, x, y){
        super().loadImg(url);
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
    }
}