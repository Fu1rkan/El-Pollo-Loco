class Clouds extends MovableObject{


    constructor(url, w, h, x, y){
        super().loadImg(url);
        this.width = w;
        this.height = h;
        this.x = x 
        this.y = y;

        this.animate();
    }


    animate(){
        setInterval(() => {
            this.x += 0.15;
        }, 1000 / 60)
        
        // requestAnimationFrame(() => this.animate());
    }
}