class Chicken extends MovableObject {
    
    constructor(w, h){
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 1140;
        this.y = 425 - h;
        this.width = w;
        this.height = h;
    }
}