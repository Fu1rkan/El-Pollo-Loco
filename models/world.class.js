class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Clouds(),
        new Clouds(),
    ];
    background = [
        new Background('img/5_background/layers/air.png', 720, 480),
        new Background('img/5_background/layers/3_third_layer/1.png', 720, 480),
        new Background('img/5_background/layers/2_second_layer/1.png', 720, 480),
        new Background('img/5_background/layers/1_first_layer/1.png', 720, 480)
    ]
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    };


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.clouds);

        
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        let self = this;
        requestAnimationFrame(function (){
            self.draw();
        });
    }

    addObjectsToMap(object){
        object.forEach(o => {
            this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
        });
    }

    addToMap(object){
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    };
}