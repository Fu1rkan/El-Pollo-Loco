class World {
    character = new Character(25, 225, 100, 200);

    enemies = [
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80)
    ];

    clouds = [
        new Clouds('img/5_background/layers/4_clouds/1.png', 720, 480, 0, 0),
        new Clouds('img/5_background/layers/4_clouds/2.png', 720, 480, 720, 0),
        new Clouds('img/5_background/layers/4_clouds/1.png', 720, 480, 1440, 0),
        new Clouds('img/5_background/layers/4_clouds/2.png', 720, 480, 2160, 0)
    ];

    background = [
        new Background('img/5_background/layers/air.png', 720, 480, 0, 0),
        new Background('img/5_background/layers/3_third_layer/1.png', 720, 480, 0, 0),
        new Background('img/5_background/layers/2_second_layer/1.png', 720, 480, 0, 0),
        new Background('img/5_background/layers/1_first_layer/1.png', 720, 480, 0, 0),
        new Background('img/5_background/layers/air.png', 720, 480, 720, 0),
        new Background('img/5_background/layers/3_third_layer/2.png', 720, 480, 720, 0),
        new Background('img/5_background/layers/2_second_layer/2.png', 720, 480, 720, 0),
        new Background('img/5_background/layers/1_first_layer/2.png', 720, 480, 720, 0),
        new Background('img/5_background/layers/air.png', 720, 480, 1440, 0),
        new Background('img/5_background/layers/3_third_layer/1.png', 720, 480, 1440, 0),
        new Background('img/5_background/layers/2_second_layer/1.png', 720, 480, 1440, 0),
        new Background('img/5_background/layers/1_first_layer/1.png', 720, 480, 1440, 0),
        new Background('img/5_background/layers/air.png', 720, 480, 2160, 0),
        new Background('img/5_background/layers/3_third_layer/2.png', 720, 480, 2160, 0),
        new Background('img/5_background/layers/2_second_layer/2.png', 720, 480, 2160, 0),
        new Background('img/5_background/layers/1_first_layer/2.png', 720, 480, 2160, 0),
    ];

    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    };

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);
        
        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.cameraX, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(object) {
        object.forEach(o => {
            this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
        });
    }

    addToMap(object) {
        if (object.otherDirection) {
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1);
            object.x = object.x * -1
        }
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        if (object.otherDirection) {
            object.x = object.x * -1
            this.ctx.restore();
        }
        };
    }