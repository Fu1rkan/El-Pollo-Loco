class Clouds extends MovableObject{
    width = 400;
    height = 300

    constructor(){
        super().loadImg('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 320;
        this.y = 0;
    }
}